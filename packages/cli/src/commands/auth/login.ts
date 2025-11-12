import { Flags, ux } from "@oclif/core";
import { randomBytes } from "node:crypto";
import { createServer } from "node:http";
import open from "open";
import terminalLink from "terminal-link";
import { fetch } from "undici";
import { LinearCommand } from "../../linear_command.js";
import {
  accessTokenSchema,
  CLIENT_ID,
  CLIENT_SECRET,
  OAUTH_SUCCESS_TEMPLATE,
  type AccessTokenSchema,
} from "../../oauth.js";

/** Logs in to Linear using a browser-based OAuth flow. */
export default class AuthLogin extends LinearCommand {
  public static override description = "Logs in to Linear using a browser-based OAuth flow.";
  public static override enableJsonFlag = false;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    "linear-url": Flags.string({
      default: "https://linear.app",
      description: "Linear instance to authorize against",
      env: "LINEAR_URL",
    }),
  };

  private readonly oauthCallbackUrl = new URL("/callback", "http://localhost:11347");

  private getRedirectUri(linearUrl: string, authState: string) {
    const oauthRedirectUrl = new URL("/oauth/authorize", linearUrl);
    oauthRedirectUrl.searchParams.set("client_id", CLIENT_ID);
    oauthRedirectUrl.searchParams.set("redirect_uri", this.oauthCallbackUrl.href);
    oauthRedirectUrl.searchParams.set("response_type", "code");
    oauthRedirectUrl.searchParams.set("scope", "read,write");
    oauthRedirectUrl.searchParams.set("state", authState);
    oauthRedirectUrl.searchParams.set("prompt", "consent");

    return oauthRedirectUrl;
  }

  /** Grabs an OAuth code following the flow outlined at https://linear.app/developers/oauth-2-0-authentication */
  private async getAuthCode(redirectUrl: URL, authState: string): Promise<string> {
    let oauthCode = "";
    const server = createServer((req, res) => {
      const url = new URL(req.url || "/", this.oauthCallbackUrl.origin);

      if (req.method !== "GET" && url.pathname !== "/callback") {
        res.writeHead(404).write("Not found");
        res.end();
        return;
      }

      if (url.searchParams.get("state") !== authState) {
        res.writeHead(400).write("Found mismatched OAuth state");
        res.end();
        return;
      }

      if (!url.searchParams.has("code")) {
        res.writeHead(400).write("OAuth response missing code");
        res.end();
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      oauthCode = url.searchParams.get("code")!;
      res.writeHead(200, { "content-type": "text/html" }).write(OAUTH_SUCCESS_TEMPLATE);
      res.end(() => {
        server.close();
      });
    });

    server.listen(Number(this.oauthCallbackUrl.port), () => {
      const linkText = ux.colorize("yellow", "\u001B[4mClick here to authenticate\u001B[24m");
      const link = terminalLink(linkText, redirectUrl.href, {
        fallback: () => ux.colorize("yellow", redirectUrl.href),
      });
      this.debug(`Listening for OAuth callback at ${ux.colorize("cyan", redirectUrl.origin)}`);
      this.log(`Opening your browser to authenticate. ${link}`);
      open(redirectUrl.href);
    });

    return new Promise((resolve, reject) => {
      server.on("close", (err: Error) => {
        if (err) {
          reject(err);
        } else {
          resolve(oauthCode);
        }
      });
    });
  }

  private async accessTokenFromCode(apiUrl: string, code: string): Promise<AccessTokenSchema> {
    const reqBody = new URLSearchParams();
    reqBody.set("code", code);
    reqBody.set("redirect_uri", this.oauthCallbackUrl.href);
    reqBody.set("client_id", CLIENT_ID);
    reqBody.set("client_secret", CLIENT_SECRET);
    reqBody.set("grant_type", "authorization_code");

    this.debug("Requesting token from %s", apiUrl);
    const res = await fetch(new URL("/oauth/token", apiUrl), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: reqBody,
    });

    if (!res.ok) {
      throw new Error(`Could not get access token: ${res.status} ${res.statusText}. ${await res.text()}`);
    }

    return accessTokenSchema.parse(await res.json());
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public async run(): Promise<void> {
    const { flags } = await this.parse(AuthLogin);

    let isLoggedIn = false;
    try {
      await this.getLinearClient();
      isLoggedIn = true;
    } catch {
      this.debug("User is already logged in, skipping oauth flow.");
    }

    if (isLoggedIn) {
      this.error("You're already logged in!", {
        suggestions: ["Run linear auth logout to reset login information"],
      });
    }

    const linearUrl = flags["linear-url"];
    const apiUrl = flags["api-url"];
    const authState = randomBytes(32).toString("base64url");

    const redirectUrl = this.getRedirectUri(linearUrl, authState);

    ux.action.start("Waiting for authentication code");
    const oauthCode = await this.getAuthCode(redirectUrl, authState);
    ux.action.stop();

    const {
      refresh_token: refreshToken,
      access_token: accessToken,
      expires_in: expiresIn,
    } = await this.accessTokenFromCode(apiUrl, oauthCode);

    await this.saveAuthTokens(refreshToken, accessToken, expiresIn);

    const linearClient = await this.getLinearClient(accessToken);
    const viewer = await linearClient.viewer;

    this.log(ux.colorize("green", "Successfully authenticated with Linear as %s"), viewer.email);
  }
}
