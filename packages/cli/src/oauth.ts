import z from "zod";

/** Appplication's OAuth client ID. */
export const CLIENT_ID = "a2641d63e56b4fe7989fc743488a4086";

// Not great, but apparently industry standard
// https://linear-app.slack.com/archives/CSANH02G6/p1710782153800999?thread_ts=1710620628.021949&cid=CSANH02G6
/** Appplication's OAuth client secret. */
export const CLIENT_SECRET = "1326b55cdaa01c29015d6271a5352c31";

/** Response type from Linear API when requesting an access token. */
export type AccessTokenSchema = z.infer<typeof accessTokenSchema>;
// eslint-disable-next-line jsdoc/require-jsdoc
export const accessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z.number().int(),
  scope: z.string(),
  refresh_token: z.string(),
});

/** Auth data stored in auth.json config file. */
export type AuthDataSchema = z.infer<typeof authDataSchema>;
// eslint-disable-next-line jsdoc/require-jsdoc
export const authDataSchema = z.object({
  refresh_token: z.string(),
  access_token: z.string().optional(),
  expires_at: z.number().int().optional(),
});

/** HTML template displayed to the user after successful OAuth authentication. */
export const OAUTH_SUCCESS_TEMPLATE = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authentication Successful - Linear CLI</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 20px;
    }
    .container {
      text-align: center;
      max-width: 500px;
    }
    .checkmark {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 32px;
      animation: scaleIn 0.3s ease-out;
    }
    .checkmark svg {
      width: 48px;
      height: 48px;
      stroke: #fff;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      animation: drawCheck 0.5s ease-out 0.2s forwards;
      stroke-dasharray: 50;
      stroke-dashoffset: 50;
    }
    @keyframes scaleIn {
      from {
        transform: scale(0);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    @keyframes drawCheck {
      to {
        stroke-dashoffset: 0;
      }
    }
    h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }
    p {
      font-size: 18px;
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: 12px;
    }
    .terminal-hint {
      font-size: 16px;
      opacity: 0.7;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="checkmark">
      <svg viewBox="0 0 52 52">
        <polyline points="14 27 22 35 38 19" />
      </svg>
    </div>
    <h1>Authentication successful!</h1>
    <p>You've been successfully authenticated with Linear.</p>
    <p class="terminal-hint">You can now close this window and return to your terminal.</p>
  </div>
</body>
</html>
`;
