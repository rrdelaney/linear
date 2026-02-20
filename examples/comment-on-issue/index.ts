import { LinearClient } from "@linear/sdk";

/**
 * Create a comment on a Linear issue.
 *
 * Usage:
 *   LINEAR_API_KEY=<key> npx ts-node index.ts <issueId> <body>
 *
 * Where `issueId` is a UUID or issue identifier (e.g. "ENG-123") and `body`
 * is the markdown content of the comment.
 */
async function main() {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    console.error("Set LINEAR_API_KEY environment variable");
    process.exit(1);
  }

  const [issueId, ...rest] = process.argv.slice(2);
  const body = rest.join(" ");

  if (!issueId || !body) {
    console.error("Usage: npx ts-node index.ts <issueId> <comment body>");
    process.exit(1);
  }

  const client = new LinearClient({ apiKey });
  const payload = await client.commentCreate({ issueId, body });

  if (payload.success) {
    const comment = await payload.comment;
    console.log(`Comment created: ${comment?.url}`);
  } else {
    console.error("Failed to create comment");
    process.exit(1);
  }
}

main();
