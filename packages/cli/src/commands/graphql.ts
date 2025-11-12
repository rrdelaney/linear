import { Args, Flags, ux } from "@oclif/core";
import { LinearCommand } from "../linear_command.js";

/**
 * Executes a GraphQL query against the Linear APÒI.
 *
 * This command allows you to run arbitrary GraphQL queries against the Linear API
 * using your authenticated credentials.
 */
export default class Graphql extends LinearCommand {
  public static override description = "Execute a GraphQL query against the Linear API";
  public static override enableJsonFlag = true;
  public static override examples = [
    '<%= config.bin %> <%= command.id %> "{ viewer { id name email } }"',
    '<%= config.bin %> <%= command.id %> "{ issues { nodes { id title } } }"',
    'echo "{ viewer { id name email } }" | <%= config.bin %> <%= command.id %>',
  ];

  public static override args = {
    query: Args.string({
      description: "GraphQL query to execute",
      required: true,
    }),
  };

  public static override flags = {
    variables: Flags.string({
      char: "v",
      description: "JSON string of variables to pass to the query",
    }),
  };

  // eslint-disable-next-line jsdoc/require-jsdoc
  public async run(): Promise<unknown> {
    const {
      args: { query },
      flags,
    } = await this.parse(Graphql);

    let variables: Record<string, unknown> | undefined;
    if (flags.variables) {
      try {
        variables = JSON.parse(flags.variables);
      } catch (error) {
        this.error("Invalid JSON for variables", {
          message: error instanceof Error ? error.message : String(error),
          suggestions: ['Ensure variables is valid JSON: --variables \'{"id": "123"}\''],
        });
      }
    }

    const linearClient = await this.getLinearClient();
    this.debug("Executing GraphQL query: %s", query);
    this.debug("Variables: %O", variables);

    // Use rawRequest to execute the GraphQL query with a raw string
    const response = await linearClient.client.rawRequest(query, variables);

    this.log(ux.colorize("green", "✓ Query executed successfully\n"));
    this.log(
      ux.colorizeJson(response.data, {
        theme: {
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
        },
      })
    );

    return response.data;
  }
}
