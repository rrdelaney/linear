import { ux } from "@oclif/core";
import { LinearCommand } from "../../linear_command.js";

/** Displays the current authentication status for Linear */
export default class AuthStatus extends LinearCommand {
  public static override description = "Displays the current authentication status for Linear";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  // eslint-disable-next-line jsdoc/require-jsdoc
  public async run(): Promise<unknown> {
    await this.parse(AuthStatus);

    try {
      const linearClient = await this.getLinearClient();
      const viewer = await linearClient.viewer;

      return this.displayTable([
        { key: "email", label: "Email", value: viewer.email },
        { key: "name", label: "Name", value: viewer.displayName },
      ]);
    } catch {
      this.error("You are not currently logged in to Linear.", {
        suggestions: [`Log in by running ${ux.colorize("cyanBright", "linear auth login")}`],
      });
    }
  }
}
