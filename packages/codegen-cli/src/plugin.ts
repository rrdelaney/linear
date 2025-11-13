import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { logger } from "@linear/codegen-doc";
import {
  DocumentNode,
  FieldNode,
  FragmentDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
  print,
  SelectionSetNode,
  TypeInfo,
  TypeNode,
  visit,
  visitWithTypeInfo,
} from "graphql";
import { CliPluginConfig } from "./types";

const log = "codegen-cli:plugin:";

export const plugin: PluginFunction<CliPluginConfig> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: CliPluginConfig
) => {
  const operationDefinitions = new Map<string, OperationDefinitionNode>();
  const fragmentDefinitions = new Map<string, FragmentDefinitionNode>();
  documents
    .flatMap(doc => doc.document?.definitions ?? [])
    .forEach(def => {
      switch (def.kind) {
        case "FragmentDefinition":
          fragmentDefinitions.set(def.name.value, def);
          return;

        case "OperationDefinition":
          // TODO: Remove that this is only for queries.
          if (def.name && def.operation === "query") {
            operationDefinitions.set(def.name.value, def);
          }
          return;

        default:
          return;
      }
    });

  const commandDefinitions = new Map<string, string>();
  operationDefinitions.forEach(def => {
    const commandName = commandNameForOperation(def, config);
    if (!commandName) {
      return;
    }

    try {
      logger.info(log, `Creating command: ${commandName} from ${def.name?.value}`);
      commandDefinitions.set(commandName, classDefinitionForOperation(def, schema, fragmentDefinitions));
    } catch (e: unknown) {
      logger.info(log, `Could not create command for ${commandName}: ${(e as Error).message}`);
    }
  });

  return `
/* eslint-disable @typescript-eslint/dot-notation */
import { Args, Command, Flags } from "@oclif/core";
import set from 'lodash.set';
import { LinearCommand } from "../linear_command.js";

const COMMANDS: Record<string, Command.Class> = {};

${Array.from(commandDefinitions)
  .map(([commandName, classDefinition]) => {
    return `COMMANDS["${commandName}"] = ${classDefinition};`;
  })
  .join("\n\n")}

export { COMMANDS };
`;
};

/** Creates a new class representing an OClif command for a given operation. */
function classDefinitionForOperation(
  operation: OperationDefinitionNode,
  schema: GraphQLSchema,
  fragmentDefinitions: Map<string, FragmentDefinitionNode>
): string {
  const opName = operation.name?.value;
  if (!opName) {
    throw new Error("Cannot create command class for anonymous operation definition!");
  }

  const documentNode = createDocumentForOperation(operation, schema, fragmentDefinitions);
  const allFlags = getFlagsForOperation(operation, schema);

  // Check if there's exactly one required flag - if so, make it a positional argument
  const requiredFlags = allFlags.filter(flag => flag.required);
  const hasPositionalArg = requiredFlags.length === 1;
  const positionalArg = hasPositionalArg ? requiredFlags[0] : undefined;
  const flags = hasPositionalArg ? allFlags.filter(flag => !flag.required) : allFlags;

  const argsSection = positionalArg
    ? `
  public static override args = {
    "${positionalArg.name}": Args.${positionalArg.type}(${JSON.stringify({
      required: true,
      options: positionalArg.options,
    })}),
  };
`
    : "";

  const flagsSection =
    flags.length > 0
      ? `
  public static override flags = {
${flags
  .map(flag => {
    return `"${flag.name}": Flags.${flag.type}(${JSON.stringify({
      multiple: flag.multiple,
      required: flag.required,
      options: flag.options,
    })}),`;
  })
  .join("\n")}
  };
`
      : "";

  return `class LinearCommand_${opName} extends LinearCommand {
  public static override description = 'Runs ${opName}';
  public static override enableJsonFlag = true;
  public static override examples = ['<%= config.bin %> <%= command.id %>'];
${argsSection}${flagsSection}
  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_${opName});
    const linearClient = await this.getLinearClient();


    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith('api-') || path === 'json') {
        continue;
      }

      set(variables, path, value);
    }

    const query = \`${print(documentNode)}\`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
}`;
}

interface CommandFlag {
  name: string;
  type: "string" | "integer" | "boolean";

  // Passed along to OClif configuration.
  // See https://oclif.io/docs/flags
  required: boolean;
  multiple: undefined | true;
  options: string[] | undefined;
}

function getFlagsForOperation(operation: OperationDefinitionNode, schema: GraphQLSchema): CommandFlag[] {
  return (
    operation.variableDefinitions?.flatMap(def =>
      flagsFromVariable(def.type, schema, operation, [def.variable.name.value])
    ) ?? []
  );
}

/** Defines how a given GraphQL type maps to an OClif flag type. */
const primitiveToFlagType = new Map<string, CommandFlag["type"]>([
  ["Float", "integer"],
  ["Int", "integer"],
  ["String", "string"],
  ["Boolean", "boolean"],
]);

/**
 * For a given GraphQL NamedType, what type of flag should be used to represent it.
 * Array values represent an enum of strings.
 */
function getFlagTypeForNamedType(
  typeName: string,
  schema: GraphQLSchema
): Pick<CommandFlag, "type" | "options"> | undefined {
  const schemaDefinedType = schema.getType(typeName)?.astNode;
  if (schemaDefinedType?.kind === "EnumTypeDefinition") {
    const options = schemaDefinedType.values?.map(value => value.name.value) ?? [];
    return { type: "string", options };
  }

  const primitiveType = primitiveToFlagType.get(typeName);
  if (primitiveType) {
    return { type: primitiveType, options: undefined };
  }

  return undefined;
}

/** Generate a set of flag defintions for a given GraphQL type node. */
function flagsFromVariable(
  t: TypeNode,
  schema: GraphQLSchema,
  operation: OperationDefinitionNode,
  path: string[]
): CommandFlag[] {
  // Prevent creation of infinitely nested types.
  if (path.length > 3) {
    return [];
  }

  const pathForError = [operation.name?.value ?? "<anonymous>", ...path].join(".");

  switch (t.kind) {
    // We only support lists of primitives and non-null primitives at the moment.
    case "ListType": {
      let innerType: string;

      if (t.type.kind === "ListType") {
        throw new Error(`Could not handle ListType[ListType] at ${pathForError}`);
      } else if (t.type.kind === "NonNullType") {
        if (t.type.type.kind === "NamedType") {
          innerType = t.type.type.name.value;
        } else {
          throw new Error(`Could not handle ListType[NonNullType[ListType]] at ${pathForError}`);
        }
      } else {
        innerType = t.type.name.value;
      }

      const flagType = getFlagTypeForNamedType(innerType, schema);
      if (!flagType) {
        // Hard fail when we cannot generate the type for a mutation.
        if (operation.operation === "mutation") {
          throw new Error(`Could not handle ListType[${innerType}] at ${pathForError}`);
        } else {
          // logger.info(log, `Skipping ${pathForError}: ListType[${innerType}]`);
          return [];
        }
      }

      return [
        {
          ...flagType,
          name: path.join("."),
          multiple: true,
          required: false,
        },
      ];
    }

    case "NonNullType": {
      if (t.type.kind === "ListType") {
        throw new Error(`Could not handle NonNullType[ListType] at ${pathForError}}`);
      }

      const flagType = getFlagTypeForNamedType(t.type.name.value, schema);
      if (!flagType) {
        throw new Error(`Could not handle NonNullType[${t.type.name.value}] at ${pathForError}`);
      }

      return [
        {
          ...flagType,
          name: path.join("."),
          multiple: undefined,
          required: true,
        },
      ];
    }

    case "NamedType": {
      const flagType = getFlagTypeForNamedType(t.name.value, schema);
      if (flagType) {
        return [
          {
            ...flagType,
            name: path.join("."),
            multiple: undefined,
            required: false,
          },
        ];
      }

      const namedType = schema.getType(t.name.value)?.astNode;
      if (!namedType || namedType.kind !== "InputObjectTypeDefinition") {
        // Hard fail when we cannot generate the type for a mutation.
        if (operation.operation === "mutation") {
          throw new Error(`Could not handle ${t.name.value} at ${pathForError}`);
        } else {
          // logger.info(log, `Skipping ${pathForError}: [${namedType}]`);
          return [];
        }
      }

      return (
        namedType.fields?.flatMap(field => {
          return flagsFromVariable(field.type, schema, operation, [...path, field.name.value]);
        }) ?? []
      );
    }

    default:
      return [];
  }
}

/** Defines the minimum fields that should be queried for a given type. */
const REQUIRED_FIELDS_FOR_TYPE = new Map<string, ReadonlySet<string>>([
  ["User", new Set(["displayName", "email"])],
  ["Project", new Set(["name", "url"])],
  ["Team", new Set(["name"])],
  ["Issue", new Set(["title", "url"])],
]);

/** Creates a GraphQL document suitable to be sent to the Linear API for a given operation. */
function createDocumentForOperation(
  operation: OperationDefinitionNode,
  schema: GraphQLSchema,
  fragmentDefinitions: Map<string, FragmentDefinitionNode>
): DocumentNode {
  const consumedFragments = new Set<string>();
  function collectedUsedFragments(selectionSet: SelectionSetNode) {
    selectionSet.selections.forEach(selection => {
      switch (selection.kind) {
        case "FragmentSpread": {
          consumedFragments.add(selection.name.value);
          const fragmentDef = fragmentDefinitions.get(selection.name.value);
          if (fragmentDef) {
            collectedUsedFragments(fragmentDef.selectionSet);
          }
          return;
        }

        case "InlineFragment":
          collectedUsedFragments(selection.selectionSet);
          return;

        case "Field":
          if (selection.selectionSet) {
            collectedUsedFragments(selection.selectionSet);
          }
          return;

        default:
          return;
      }
    });
  }

  // The operation we get only contains a query. We need to send any fragments that
  // query references along in the request as well, so we recurively look for queries
  // referenced, and collect those into a new "slim" DocumentNode.
  collectedUsedFragments(operation.selectionSet);
  const documentNode: DocumentNode = {
    kind: "Document",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    definitions: [...Array.from(consumedFragments).map(fragment => fragmentDefinitions.get(fragment)!), operation],
  };

  // To make the returned output human-friendly there's a minimum set of fields we should add
  // to each type, e.g. User.displayName. To do that we visit each selection set in the AST,
  // find the parent type, and add out display fields if not yet present.
  const typeInfo = new TypeInfo(schema);
  return visit(
    documentNode,
    visitWithTypeInfo(typeInfo, {
      SelectionSet: {
        leave: node => {
          const selectedType = typeInfo.getParentType();
          if (!selectedType) {
            return undefined;
          }

          // Set of fields already selected on this type.
          const selectedFields = new Set(
            node.selections.filter((s): s is FieldNode => s.kind === "Field").map(s => s.name.value)
          );

          // Additional selections we need to add to display this type.
          const requiredFields = REQUIRED_FIELDS_FOR_TYPE.get(selectedType.name);
          if (!requiredFields) {
            return undefined;
          }

          // Add the required fields to the selection set and return the updated value.
          const requiedFieldNodes = Array.from(requiredFields)
            .filter(fieldName => !selectedFields.has(fieldName))
            .map((fieldName): FieldNode => {
              return {
                kind: "Field",
                name: { kind: "Name", value: fieldName },
              };
            });

          const updatedNode: SelectionSetNode = {
            ...node,
            selections: [...node.selections, ...requiedFieldNodes],
          };

          return updatedNode;
        },
      },
    })
  );
}

function commandNameForOperation(operation: OperationDefinitionNode, config: CliPluginConfig): string | undefined {
  const opName = operation.name?.value;
  if (!opName) {
    return undefined;
  }

  if (config.overrides?.[opName]) {
    return config.overrides[opName];
  } else if (config.ignoreOperations?.includes(opName)) {
    return undefined;
  }

  const commandParts = opName.split("_").filter(Boolean).map(kebabify);
  if (config.ignoreTopics?.includes(commandParts[0])) {
    return undefined;
  }

  return commandParts.join(":");
}

function kebabify(str: string): string {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}
