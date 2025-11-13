import { PluginConfig } from "@linear/codegen-doc";

/**
 * Parsed sdk plugin config
 */
export interface CliPluginConfig extends PluginConfig {
  mutations?: Record<string, string>;
  overrides?: Record<string, string>;
  ignoreOperations?: string[];
  ignoreTopics?: string[];
}
