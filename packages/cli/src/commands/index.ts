import { Command } from "@oclif/core";
import AuthLogin from "./auth/login.js";
import AuthLogout from "./auth/logout.js";
import AuthStatus from "./auth/status.js";
import Graphql from "./graphql.js";
import { COMMANDS as GENERATED_COMMANDS } from "./_generated_commands.js";

export const COMMANDS: Record<string, Command.Class> = {
  ...GENERATED_COMMANDS,
  "auth:login": AuthLogin,
  "auth:logout": AuthLogout,
  "auth:status": AuthStatus,
  graphql: Graphql,
};
