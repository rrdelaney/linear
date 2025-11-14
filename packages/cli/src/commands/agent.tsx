import { LinearClient } from "@linear/sdk";
import { Args, Flags } from "@oclif/core";
import { EventSourceParserStream } from "eventsource-parser/stream";
import { Box, render as inkRender, Text, useInput } from "ink";
import InkLink from "ink-link";
import Spinner from "ink-spinner";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { fetch } from "undici";
import { z } from "zod";
import TextInput from "../input.js";
import { LinearCommand } from "../linear_command.js";

const AiMessagePartSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("reasoning"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("text"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("toolCall"),
    args: z.unknown(),
    result: z.string(),
    toolName: z.string(),
  }),
]);

const AiConversationCreateInputSchema = z.object({
  userId: z.string(),
  context: z.unknown(),
});

const AiMessageCreateInputSchema = z.object({
  conversationId: z.string(),
  role: z.enum(["user", "assistant"]),
  parts: z.array(AiMessagePartSchema).optional(),
  context: z.unknown(),
});

const AiMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  createdAt: z.string(),
  parts: z.array(AiMessagePartSchema),
});

const AiConversationSchema = z.object({
  id: z.string(),
  messages: z.object({
    nodes: z.array(AiMessageSchema),
  }),
});

export type AiMessagePart = z.infer<typeof AiMessagePartSchema>;
export type AiConversationCreateInput = z.infer<typeof AiConversationCreateInputSchema>;
export type AiMessageCreateInput = z.infer<typeof AiMessageCreateInputSchema>;
export type AiMessage = z.infer<typeof AiMessageSchema>;
export type AiConversation = z.infer<typeof AiConversationSchema>;

// Forked from https://github.com/vercel/ai/blob/main/packages/ai/src/ui-message-stream/ui-message-chunks.ts
const AiMessageReponseChunkData = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text-start"),
    id: z.string(),
  }),
  z.object({
    type: z.literal("text-delta"),
    id: z.string(),
    delta: z.string(),
  }),
  z.object({
    type: z.literal("text-end"),
    id: z.string(),
  }),
  z.object({
    type: z.literal("error"),
    errorText: z.string(),
  }),
  z.object({
    type: z.literal("tool-input-start"),
    toolCallId: z.string(),
    toolName: z.string(),
    providerExecuted: z.boolean().optional(),
    dynamic: z.boolean().optional(),
    title: z.string().optional(),
  }),
  z.object({
    type: z.literal("tool-input-delta"),
    toolCallId: z.string(),
    inputTextDelta: z.string(),
  }),
  z.object({
    type: z.literal("tool-input-available"),
    toolCallId: z.string(),
    toolName: z.string(),
    input: z.unknown(),
    providerExecuted: z.boolean().optional(),
    dynamic: z.boolean().optional(),
    title: z.string().optional(),
  }),
  z.object({
    type: z.literal("tool-input-error"),
    toolCallId: z.string(),
    toolName: z.string(),
    input: z.unknown(),
    providerExecuted: z.boolean().optional(),
    dynamic: z.boolean().optional(),
    errorText: z.string(),
    title: z.string().optional(),
  }),
  z.object({
    type: z.literal("tool-approval-request"),
    approvalId: z.string(),
    toolCallId: z.string(),
  }),
  z.object({
    type: z.literal("tool-output-available"),
    toolCallId: z.string(),
    output: z.unknown(),
    providerExecuted: z.boolean().optional(),
    dynamic: z.boolean().optional(),
    preliminary: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("tool-output-error"),
    toolCallId: z.string(),
    errorText: z.string(),
    providerExecuted: z.boolean().optional(),
    dynamic: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("tool-output-denied"),
    toolCallId: z.string(),
  }),
  z.object({
    type: z.literal("reasoning-start"),
    id: z.string(),
  }),
  z.object({
    type: z.literal("reasoning-delta"),
    id: z.string(),
    delta: z.string(),
  }),
  z.object({
    type: z.literal("reasoning-end"),
    id: z.string(),
  }),
  z.object({
    type: z.literal("source-url"),
    sourceId: z.string(),
    url: z.string(),
    title: z.string().optional(),
  }),
  z.object({
    type: z.literal("source-document"),
    sourceId: z.string(),
    mediaType: z.string(),
    title: z.string(),
    filename: z.string().optional(),
  }),
  z.object({
    type: z.literal("file"),
    url: z.string(),
    mediaType: z.string(),
  }),
  z.object({
    type: z.literal("start-step"),
  }),
  z.object({
    type: z.literal("finish-step"),
  }),
  z.object({
    type: z.literal("start"),
    messageId: z.string().optional(),
    messageMetadata: z.unknown().optional(),
  }),
  z.object({
    type: z.literal("finish"),
    finishReason: z
      .enum(["stop", "length", "content-filter", "tool-calls", "error", "other", "unknown"] as const)
      .optional(),
    messageMetadata: z.unknown().optional(),
  }),
  z.object({
    type: z.literal("abort"),
  }),
  z.object({
    type: z.literal("message-metadata"),
    messageMetadata: z.unknown(),
  }),
]);

export default class LinearAgent extends LinearCommand {
  public static override enableJsonFlag = true;
  public static override args = {
    prompt: Args.string({ required: false }),
  };
  public static override flags = {
    conversation: Flags.string({ description: "What conversation to continue using" }),
  };

  private async createConversation() {
    const linearClient = await this.getLinearClient();
    const { id: userId } = await linearClient.viewer;

    const response = await linearClient.client.request<
      { aiConversationCreate: { success: boolean; aiConversation: AiConversation } },
      { input: AiConversationCreateInput }
    >(
      `mutation CreateAiConversation($input: AiConversationCreateInput!) {
        aiConversationCreate(input: $input) {
          success
          aiConversation {
            id
            createdAt
          }
        }
      }`,
      { input: { userId, context: [] } }
    );

    return response.aiConversationCreate;
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(LinearAgent);

    const linearClient = await this.getLinearClient();
    const conversationId = flags.conversation ?? (await this.createConversation()).aiConversation.id;
    const linearUrl = flags["linear-url"];

    if (this.jsonEnabled()) {
      if (!args.prompt) {
        this.error("Must provide an initial prompt when using --json");
      }

      for await (const chunk of runPrompt(conversationId, args.prompt, linearClient)) {
        if (chunk) {
          this.logJson(chunk);
        }
      }
    } else {
      const { waitUntilExit } = inkRender(
        <MessagesApp
          linearClient={linearClient}
          conversationId={conversationId}
          initialPrompt={args.prompt}
          linearUrl={linearUrl}
        />
      );
      await waitUntilExit();
    }
  }
}

async function* runPrompt(conversationId: string, message: string, linearClient: LinearClient) {
  async function createMessage(input: Omit<AiMessageCreateInput, "context">) {
    const createResponse = await linearClient.client.request<
      { aiMessageCreate: { success: boolean; aiMessage: AiMessage } },
      { input: AiMessageCreateInput }
    >(
      `mutation CreateAiMessage($input: AiMessageCreateInput!) {
        aiMessageCreate(input: $input) {
          success
          aiMessage {
            id
            role
            parts
            createdAt
          }
        }
      }`,
      { input: { ...input, context: [] } }
    );

    return createResponse.aiMessageCreate;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { aiMessage: _userMessage } = await createMessage({
    conversationId,
    role: "user",
    parts: [{ type: "text", text: message }],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { aiMessage: _assistantMessage } = await createMessage({
    conversationId,
    role: "assistant",
  });

  const messagesResponse = await (fetch as typeof globalThis.fetch)(
    new URL("/ai/stream-message", linearClient.options.apiUrl),
    {
      method: "POST",
      headers: linearClient.options.headers as Record<string, string>,
      body: JSON.stringify({ conversationId }),
    }
  );

  if (!messagesResponse.ok || !messagesResponse.body) {
    throw new Error(`Could not get AI messages: ${JSON.stringify(await messagesResponse.json(), null, 2)}`);
  }

  const messageStreamReader = messagesResponse.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new EventSourceParserStream())
    .getReader();

  while (true) {
    const { done, value: chunk } = await messageStreamReader.read();
    if (done) {
      break;
    }

    if (!chunk.data) {
      continue;
    } else if (chunk.data === "[DONE]") {
      break;
    } else {
      const { success, data } = AiMessageReponseChunkData.safeParse(JSON.parse(chunk.data));
      if (!success) {
        this.log(`Could not parse data chunk: ${chunk.data}`);
      }

      yield data;
    }
  }
}

interface ConversationMessage {
  type: "text" | "reasoning" | "user";
  text: string;
}

interface ConversationState {
  isStreaming: boolean;
  messageIds: string[];
  messages: Record<string, ConversationMessage>;
}

function conversationStateReducer(
  state: ConversationState,
  chunk: z.infer<typeof AiMessageReponseChunkData> | { id: string; type: "user-prompt"; text: string }
): ConversationState {
  switch (chunk.type) {
    case "user-prompt":
      return {
        ...state,
        isStreaming: true,
        messages: { ...state.messages, [chunk.id]: { type: "user" as const, text: chunk.text } },
        messageIds: state.messageIds.includes(chunk.id) ? state.messageIds : [...state.messageIds, chunk.id],
      };
    case "start":
      return { ...state, isStreaming: true };
    case "finish":
      return { ...state, isStreaming: false };
    case "text-start":
      return {
        ...state,
        messages: { ...state.messages, [chunk.id]: { type: "text" as const, text: "" } },
        messageIds: state.messageIds.includes(chunk.id) ? state.messageIds : [...state.messageIds, chunk.id],
      };
    case "reasoning-start":
      return {
        ...state,
        messages: { ...state.messages, [chunk.id]: { type: "reasoning" as const, text: "" } },
        messageIds: state.messageIds.includes(chunk.id) ? state.messageIds : [...state.messageIds, chunk.id],
      };
    case "text-delta":
    case "reasoning-delta":
      const message = state.messages[chunk.id];
      return {
        ...state,
        messages: { ...state.messages, [chunk.id]: { ...message, text: message.text + chunk.delta } },
      };
    default:
      return state;
  }
}

function MessagesApp({
  conversationId,
  linearClient,
  initialPrompt,
  linearUrl,
}: {
  conversationId: string;
  linearClient: LinearClient;
  initialPrompt?: string;
  linearUrl: string;
}) {
  const [{ isStreaming, messageIds, messages }, handleChunk] = useReducer(conversationStateReducer, {
    isStreaming: !!initialPrompt,
    messages: {},
    messageIds: [],
  });

  const handlePrompt = useCallback(async (inputUserPrompt: string) => {
    const userMessageId = crypto.randomUUID();
    handleChunk({ type: "user-prompt", id: userMessageId, text: inputUserPrompt });

    for await (const chunk of runPrompt(conversationId, inputUserPrompt, linearClient)) {
      if (chunk) {
        handleChunk(chunk);
      }
    }
  }, []);

  useEffect(() => {
    if (!initialPrompt) {
      return;
    }

    handlePrompt(initialPrompt);
  }, [initialPrompt]);

  const [showReasoning, setShowReasoning] = useState(false);
  useInput((input, key) => {
    if (key.ctrl && input === "o") {
      setShowReasoning(show => !show);
    }
  });

  const [userPrompt, setUserPrompt] = useState("");

  return (
    <Box flexDirection="column" rowGap={1}>
      <LinearAgentInfo />

      {messageIds.map(messageId => {
        const message = messages[messageId];

        if (!showReasoning && message.type === "reasoning") {
          return null;
        }

        return (
          <Box key={messageId} flexDirection="row">
            {message.type === "user" && <UserMessage message={message} />}
            {message.type === "text" && <AssistantMessage message={message} linearUrl={linearUrl} />}
            {message.type === "reasoning" && <ReasoningMessage message={message} />}
          </Box>
        );
      })}

      {isStreaming && <LoadingMessage />}

      <Box flexDirection="column">
        <Box borderStyle="single" borderLeft={false} borderRight={false} flexDirection="row">
          <Text>{"> "}</Text>
          <TextInput
            placeholder="Ask me to create an issue!"
            value={userPrompt}
            onChange={setUserPrompt}
            onSubmit={submittedPrompt => {
              if (isStreaming) {
                return;
              }

              handlePrompt(submittedPrompt);
              setUserPrompt("");
            }}
          />
        </Box>

        <Box flexDirection="row">
          <Text color="grey">ctrl + o = toggle reasoning {showReasoning ? "(shown)" : "(hidden)"}</Text>
        </Box>
      </Box>
    </Box>
  );
}

function UserMessage({ message }: { message: ConversationMessage }) {
  return (
    <Box backgroundColor="blackBright" flexDirection="row" columnGap={1} alignItems="flex-start">
      <Box width={1}>
        <Text color="white">{">"}</Text>
      </Box>
      <Box>
        <Text color="white">{message.text}</Text>
      </Box>
    </Box>
  );
}

interface EntitySegment {
  type: "text" | "entity";
  content: string;
  entityType?: string;
  entityId?: string;
}

function parseEntityTags(text: string): EntitySegment[] {
  const segments: EntitySegment[] = [];
  let i = 0;

  while (i < text.length) {
    // Look for opening tag
    const openTagStart = text.indexOf("<", i);

    if (openTagStart === -1) {
      // No more tags, rest is plain text
      if (i < text.length) {
        segments.push({ type: "text", content: text.substring(i) });
      }
      break;
    }

    // Add text before tag
    if (openTagStart > i) {
      segments.push({ type: "text", content: text.substring(i, openTagStart) });
    }

    // Try to parse the opening tag: <entityType id="uuid">
    const tagMatch = text.substring(openTagStart).match(/^<(\w+)\s+id="([^"]+)">/);

    if (!tagMatch) {
      // Not a valid entity tag, treat as plain text
      segments.push({ type: "text", content: text.substring(openTagStart, openTagStart + 1) });
      i = openTagStart + 1;
      continue;
    }

    const entityType = tagMatch[1];
    const entityId = tagMatch[2];
    const tagEnd = openTagStart + tagMatch[0].length;

    // Find closing tag
    const closingTag = `</${entityType}>`;
    const closeTagStart = text.indexOf(closingTag, tagEnd);

    let entityContent: string;
    let nextIndex: number;

    if (closeTagStart === -1) {
      // No closing tag yet (streaming), take everything after opening tag
      entityContent = text.substring(tagEnd);
      nextIndex = text.length;
    } else {
      // Found closing tag
      entityContent = text.substring(tagEnd, closeTagStart);
      nextIndex = closeTagStart + closingTag.length;
    }

    segments.push({
      type: "entity",
      content: entityContent,
      entityType,
      entityId,
    });

    i = nextIndex;
  }

  return segments;
}

function AssistantMessage({ message, linearUrl }: { message: ConversationMessage; linearUrl: string }) {
  const segments = parseEntityTags(message.text);

  return (
    <Box flexDirection="row" columnGap={1} alignItems="flex-start">
      <Box width={1}>
        <Text>{"⬤"}</Text>
      </Box>
      <Box>
        {segments.map((segment, index) => {
          if (segment.type === "text") {
            return <Text key={index}>{segment.content}</Text>;
          }

          // Entity segment - render with color and bold
          if (segment.entityType === "issue") {
            const link = new URL(`/issue/${segment.entityId}`, linearUrl).href;
            return (
              <InkLink key={index} url={link}>
                <Text color="cyan" bold>
                  {segment.content}
                </Text>
              </InkLink>
            );
          }

          // For other entity types, just render as colored and bold without link
          return (
            <Text key={index} color="cyan" bold>
              {segment.content}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}

function ReasoningMessage({ message }: { message: ConversationMessage }) {
  return (
    <Box flexDirection="row" columnGap={1} alignItems="flex-start">
      <Box width={1}>
        <Text color="gray">{"+"}</Text>
      </Box>
      <Box>
        <Text color="gray" italic>
          {message.text}
        </Text>
      </Box>
    </Box>
  );
}

function getFunValue(current?: string) {
  const options = ["Linearizing", "Ideating", "Pondering"].filter(s => s !== current);
  return options[Math.floor(Math.random() * options.length)];
}

function LoadingMessage() {
  const [funMessage, setFunMessage] = useState(getFunValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFunMessage(getFunValue);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <Box flexDirection="row" columnGap={2}>
      <Box width={3}>
        <Spinner type="point" />
      </Box>
      <Box>
        <Text>{funMessage}...</Text>
      </Box>
    </Box>
  );
}

function LinearAgentInfo() {
  return (
    <Box borderStyle="single" paddingX={1} flexShrink={1} width={18}>
      <Text color="whiteBright" bold>
        ⬤ Linear Agent
      </Text>
    </Box>
  );
}
