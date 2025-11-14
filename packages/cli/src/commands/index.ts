import { Command } from "@oclif/core";
import LinearAgent from "./agent.js";
import AuthLogin from "./auth/login.js";
import AuthLogout from "./auth/logout.js";
import AuthStatus from "./auth/status.js";
import Graphql from "./graphql.js";
import Start from "./start.js";
import { COMMANDS as GENERATED_COMMANDS } from "./_generated_commands.js";

export const COMMANDS: Record<string, Command.Class> = {
  ...GENERATED_COMMANDS,
  "auth:login": AuthLogin,
  "auth:logout": AuthLogout,
  "auth:status": AuthStatus,
  agent: LinearAgent,
  graphql: Graphql,
  start: Start,
};
