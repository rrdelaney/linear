import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { logger } from "@linear/codegen-doc";
import {
  DocumentNode,
  FragmentDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
  print,
  SelectionSetNode,
  TypeNode,
} from "graphql";
import { CliPluginConfig } from "./types";

const log = "codegen-cli:plugin:";

export const plugin: PluginFunction<CliPluginConfig> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _config: CliPluginConfig
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
    const commandName = commandNameForOperation(def);
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
import { Command, Flags, ux } from "@oclif/core";
import set from 'lodash.set';
import { LinearCommand } from "../linear_command.js";

const theme = {
  brace: "magenta",
  bracket: "magenta",
  colon: "dim",
  comma: "dim",
  key: "yellow",
  // eslint-disable-next-line id-denylist, id-blacklist
  string: "green",
  number: "green",
  // eslint-disable-next-line id-denylist, id-blacklist
  boolean: "green",
  null: "red",
};

const COMMANDS: Record<string, Command.Class> = {};

${Array.from(commandDefinitions)
  .map(([commandName, classDefinition]) => {
    return `COMMANDS["${commandName}"] = ${classDefinition};`;
  })
  .join("\n\n")}

export { COMMANDS };
`;
};

function classDefinitionForOperation(
  operation: OperationDefinitionNode,
  schema: GraphQLSchema,
  fragmentDefinitions: Map<string, FragmentDefinitionNode>
): string {
  const opName = operation.name?.value;
  if (!opName) {
    throw new Error("Cannot create command class for anonymous operation definition!");
  }

  const documentNode = createDocumentForOperation(operation, fragmentDefinitions);
  const flags = getFlagsForOperation(operation, schema);

  return `class LinearCommand_${opName} extends LinearCommand {
  public static override description = 'Runs ${opName}';
  public static override enableJsonFlag = true;
  public static override examples = ['<%= config.bin %> <%= command.id %>'];

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

  public async run(): Promise<unknown> {
    const { flags } = await this.parse(LinearCommand_${opName});
    const linearClient = await this.getLinearClient();


    const variables: Record<string, unknown> = {};
    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith('api-') || path === 'json') {
        continue;
      }

      set(variables, path, value);
    }

    const query = \`${print(documentNode)}\`;

    const response = await linearClient.client.rawRequest(query, variables);
    this.log(ux.colorizeJson(response.data, { theme }));
    return response.data;
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
          logger.info(log, `Skipping ${pathForError}: ListType[${innerType}]`);
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
          logger.info(log, `Skipping ${pathForError}: [${namedType}]`);
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

function createDocumentForOperation(
  operation: OperationDefinitionNode,
  fragmentDefinitions: Map<string, FragmentDefinitionNode>
): DocumentNode {
  const consumedFragments = new Set<string>();

  function visitFragments(selectionSet: SelectionSetNode) {
    selectionSet.selections.forEach(selection => {
      switch (selection.kind) {
        case "FragmentSpread": {
          consumedFragments.add(selection.name.value);
          const fragmentDef = fragmentDefinitions.get(selection.name.value);
          if (fragmentDef) {
            visitFragments(fragmentDef.selectionSet);
          }
          return;
        }

        case "InlineFragment":
          visitFragments(selection.selectionSet);
          return;

        case "Field":
          if (selection.selectionSet) {
            visitFragments(selection.selectionSet);
          }
          return;

        default:
          return;
      }
    });
  }

  visitFragments(operation.selectionSet);
  const documentNode: DocumentNode = {
    kind: "Document",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    definitions: [...Array.from(consumedFragments).map(fragment => fragmentDefinitions.get(fragment)!), operation],
  };

  return documentNode;
}

function commandNameForOperation(operation: OperationDefinitionNode): string | undefined {
  return operation.name?.value.split("_").filter(Boolean).map(kebabify).join(":");
}

function kebabify(str: string): string {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}
