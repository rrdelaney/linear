/* eslint-disable no-console */
import dotenv from "dotenv";
import { LinearClient } from "../index.js";

/** Load environment variables */
dotenv.config();

/**
 * Script to comment on Linear issue RYA-2 (ca1deb13-a0e9-4922-9943-20e79729b1a9)
 * acknowledging task RYA-1.
 *
 * Usage:
 *   API_KEY=<your-linear-api-key> npx ts-node --esm packages/sdk/src/_tests/comment-on-issue.ts
 */
async function main() {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is required. Set it to your Linear API key.");
  }

  const linearClient = new LinearClient({ apiKey });

  const issueId = "ca1deb13-a0e9-4922-9943-20e79729b1a9";

  const commentPayload = await linearClient.createComment({
    issueId,
    body: "Acknowledging task RYA-1: This comment was left on RYA-2 as requested by the issue RYA-1 — _Comment on an issue_.",
  });

  if (commentPayload.success) {
    const comment = await commentPayload.comment;
    console.log(`Comment created successfully (id: ${comment?.id})`);
  } else {
    throw new Error("Failed to create comment on issue RYA-2");
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
