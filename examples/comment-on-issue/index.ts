import { LinearClient } from "@linear/sdk";

/**
 * Create a comment on a Linear issue.
 *
 * Required environment variable:
 *   LINEAR_API_KEY - A Linear API key with write access.
 *
 * Usage:
 *   LINEAR_API_KEY=lin_api_xxx npx ts-node index.ts <issueId> "Your comment body"
 */
async function main() {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    console.error("Error: LINEAR_API_KEY environment variable is required");
    process.exit(1);
  }

  const [issueId, body] = process.argv.slice(2);
  if (!issueId || !body) {
    console.error("Usage: npx ts-node index.ts <issueId> <body>");
    process.exit(1);
  }

  const client = new LinearClient({ apiKey });

  const payload = await client.createComment({ issueId, body });

  if (!payload.success) {
    console.error("Failed to create comment");
    process.exit(1);
  }

  const comment = await payload.comment;
  if (comment) {
    console.log(`Comment created: ${comment.id}`);
  }
}

main();
