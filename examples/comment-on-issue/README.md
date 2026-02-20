# Comment on a Linear Issue

A minimal example showing how to create a comment on a Linear issue using the `@linear/sdk`.

## Setup

```bash
npm install @linear/sdk ts-node typescript
```

## Usage

```bash
LINEAR_API_KEY=lin_api_... npx ts-node index.ts <issueId> <comment body>
```

`issueId` accepts either a UUID or an issue identifier like `ENG-123`.

## Example

```bash
LINEAR_API_KEY=lin_api_... npx ts-node index.ts RYA-2 "Acknowledging task RYA-1 — this comment was created via the Linear SDK."
```
