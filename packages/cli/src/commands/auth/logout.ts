import { ux } from "@oclif/core";
import { unlink } from "node:fs/promises";
import { LinearCommand } from "../../linear_command.js";

/** Logs out of Linear by removing stored authentication credentials. */
export default class AuthLogout extends LinearCommand {
  public static override description = "Logs out of Linear by removing stored authentication credentials";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  // eslint-disable-next-line jsdoc/require-jsdoc
  public async run(): Promise<unknown> {
    await this.parse(AuthLogout);

    const authConfigFile = this.authConfigFile();

    try {
      await unlink(authConfigFile);
      this.log(ux.colorize("green", "Successfully logged out of Linear."));
      this.log(`Your authentication credentials have been removed from ${ux.colorize("dim", authConfigFile)}`);

      return {
        success: true,
        message: "Logged out successfully",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        this.log(ux.colorize("yellow", "You are not currently logged in to Linear."));

        return {
          success: false,
          message: "Not logged in",
        };
      }

      throw error;
    }
  }
}
