import { PluginConfig } from "@linear/codegen-doc";

/**
 * Parsed sdk plugin config
 */
export interface CliPluginConfig extends PluginConfig {
  overrides?: Record<string, string>;
  ignoreOperations?: string[];
  ignoreTopics?: string[];
}
