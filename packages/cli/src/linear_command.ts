import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { Command, Flags, ux } from "@oclif/core";
import { LinearClient } from "@linear/sdk";
import { accessTokenSchema, authDataSchema, type AuthDataSchema, CLIENT_ID, CLIENT_SECRET } from "./oauth.js";

/** Base command class for Linear CLI that exposes a Linear SDK instance. */
export abstract class LinearCommand extends Command {
  /** Global flags for all Linear CLI commands. */
  public static baseFlags = {
    "api-key": Flags.string({
      description: "Use the given API key for authentication.",
      env: "LINEAR_API_KEY",
      helpGroup: "GLOBAL",
    }),
    "api-url": Flags.string({
      default: "https://api.linear.app",
      description: "Linear API server URL",
      env: "LINEAR_API_URL",
      helpGroup: "GLOBAL",
    }),
  };
  public static override enableJsonFlag = true;

  /** Path to the authentication config file for the user. */
  protected authConfigFile(): string {
    return path.join(this.config.configDir, "auth.json");
  }

  /**
   * Display data in a table-like format with colored labels and return it as an object.
   *
   * @param rows - Array of rows to display, each with a label, value, and optional key for JSON output
   * @param options - Optional configuration
   * @param options.labelColor - Optional configuration for label color
   * @returns Object with the data keyed by the provided keys (or labels if keys not provided)
   *
   * @example
   * ```typescript
   * return this.displayTable([
   *   { label: 'Email', value: user.email, key: 'email' },
   *   { label: 'Name', value: user.name, key: 'name' }
   * ]);
   * ```
   */
  protected displayTable(
    rows: { key?: string; label: string; value: unknown }[],
    options?: { labelColor?: string }
  ): Record<string, unknown> {
    const labelColor = options?.labelColor ?? "yellow";

    // Find the longest label to align the values
    const maxLabelLength = Math.max(...rows.map(row => row.label.length));

    // Build the format string and values array
    const formatLines: string[] = [];
    const values: unknown[] = [];

    for (const row of rows) {
      const paddedLabel = row.label.padEnd(maxLabelLength);
      formatLines.push(`${ux.colorize(labelColor, `${paddedLabel}: `)} %s`);
      values.push(row.value);
    }

    // Log the formatted output
    this.log(formatLines.join("\n").trim(), ...values);

    // Build and return the result object
    const result: Record<string, unknown> = {};
    for (const row of rows) {
      const key = row.key ?? row.label.toLowerCase().replace(/\s+/g, "_");
      result[key] = row.value;
    }

    return result;
  }

  /** Returns a LinearClient initialized from flags and env vars. */
  protected async getLinearClient(accessToken?: string): Promise<LinearClient> {
    const { flags } = await this.parse({
      baseFlags: LinearCommand.baseFlags,
      flags: this.ctor.flags,
      args: this.ctor.args,
      enableJsonFlag: this.ctor.enableJsonFlag,
    });
    const apiKey = flags["api-key"];
    const apiUrl = new URL("/graphql", flags["api-url"]).href;

    if (apiKey) {
      this.debug("Using API key authentication");
      return new LinearClient({ apiKey, apiUrl });
    }

    if (!accessToken) {
      accessToken = await this.getAccessToken(apiUrl);
    }

    this.debug("Using access token authentication");
    return new LinearClient({ accessToken, apiUrl });
  }

  /**
   * Persists authentication tokens to the user's config file.
   *
   * @param refreshToken - The refresh token to persist.
   * @param accessToken - The access token to persist (optional).
   * @param expiresIn - The number of seconds until the access token expires (optional).
   */
  protected async saveAuthTokens(refreshToken: string, accessToken?: string, expiresIn?: number): Promise<void> {
    this.debug("Persisting auth tokens");
    await mkdir(this.config.configDir, { recursive: true });

    const authData: AuthDataSchema = {
      refresh_token: refreshToken,
    };

    if (accessToken && expiresIn) {
      authData.access_token = accessToken;
      // Calculate expiration timestamp (current time + expires_in, with 60 second buffer for safety)
      authData.expires_at = Date.now() + (expiresIn - 60) * 1000;
    }

    await writeFile(this.authConfigFile(), JSON.stringify(authData, null, 2));
  }

  /** @deprecated Use saveAuthTokens instead */
  protected async saveRefreshToken(refreshToken: string): Promise<void> {
    return this.saveAuthTokens(refreshToken);
  }

  /**
   * Gets a valid access token, either from cache or by refreshing.
   *
   * @param apiUrl - The Linear API URL.
   * @returns A valid access token.
   */
  private async getAccessToken(apiUrl: string): Promise<string> {
    const authConfigFile = this.authConfigFile();
    let authData: AuthDataSchema;

    try {
      const authDataJson = await readFile(authConfigFile, "utf8");
      authData = authDataSchema.parse(JSON.parse(authDataJson));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.error(`Could not load auth data from: ${ux.colorize("yellow", authConfigFile)}\n${message}`, {
        suggestions: [`Log in by running ${ux.colorize("cyanBright", "linear auth login")}`],
      });
    }

    // Check if we have a cached access token that's still valid
    if (authData.access_token && authData.expires_at && authData.expires_at > Date.now()) {
      this.debug(
        "Using cached access token (expires in %d seconds)",
        Math.floor((authData.expires_at - Date.now()) / 1000)
      );
      return authData.access_token;
    }

    // Need to refresh the access token
    return this.refreshAccessToken(apiUrl, authData.refresh_token);
  }

  /**
   * Refreshes the access token using the refresh token.
   *
   * @param apiUrl - The Linear API URL.
   * @param refreshToken - The refresh token to use.
   * @returns A new access token.
   */
  private async refreshAccessToken(apiUrl: string, refreshToken: string): Promise<string> {
    const reqBody = new URLSearchParams();
    reqBody.set("refresh_token", refreshToken);
    reqBody.set("grant_type", "refresh_token");
    reqBody.set("client_id", CLIENT_ID);
    reqBody.set("client_secret", CLIENT_SECRET);

    this.debug("Refreshing access token from %s", apiUrl);
    const res = await fetch(new URL("/oauth/token", apiUrl), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: reqBody,
    });

    if (!res.ok) {
      throw new Error(`Could not get access token: ${res.status} ${res.statusText}. ${await res.text()}`);
    }

    const {
      access_token: accessToken,
      refresh_token: updatedRefreshToken,
      expires_in: expiresIn,
    } = accessTokenSchema.parse(await res.json());

    await this.saveAuthTokens(updatedRefreshToken, accessToken, expiresIn);
    return accessToken;
  }
}
