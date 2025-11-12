import type { Hook } from "@oclif/core";
import { config as loadDotenvConfig } from "dotenv";

/** Loads environment variables from .env before executing commands. */
const hook: Hook<"init"> = async function () {
  loadDotenvConfig();
};

// eslint-disable-next-line jsdoc/require-jsdoc
export default hook;
