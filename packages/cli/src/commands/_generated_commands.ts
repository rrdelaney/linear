/* eslint-disable @typescript-eslint/dot-notation */
import { Args, Command, Flags } from "@oclif/core";
import set from "lodash.set";
import { LinearCommand } from "../linear_command.js";

const COMMANDS: Record<string, Command.Class> = {};

COMMANDS["comment:view"] = class LinearCommand_comment extends LinearCommand {
  public static override description = "A specific comment.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false, description: "The hash of the comment to retrieve." }),
    id: Flags.string({ required: false, description: "The identifier of the comment to retrieve." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_comment);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Comment on Comment {
  __typename
  agentSession {
    id
  }
  url
  reactionData
  reactions {
    ...Reaction
  }
  resolvingCommentId
  documentContentId
  initiativeUpdateId
  issueId
  parentId
  projectUpdateId
  botActor {
    ...ActorBot
  }
  body
  resolvingComment {
    id
  }
  documentContent {
    ...DocumentContent
  }
  syncedWith {
    ...ExternalEntityInfo
  }
  externalThread {
    ...SyncedExternalThread
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  parent {
    id
  }
  projectUpdate {
    id
  }
  quotedText
  archivedAt
  createdAt
  resolvedAt
  editedAt
  id
  resolvingUser {
    id
    displayName
    email
  }
  user {
    id
    displayName
    email
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

query comment($hash: String, $id: String) {
  comment(hash: $hash, id: $id) {
    ...Comment
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["comment:children"] = class LinearCommand_comment_children extends LinearCommand {
  public static override description = "The children of the comment.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false, description: "The hash of the comment to retrieve." }),
    id: Flags.string({ required: false, description: "The identifier of the comment to retrieve." }),
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.body.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.body.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.body.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.body.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.body.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.body.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.body.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.body.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.body.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.body.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.body.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.body.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.body.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.body.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.body.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.documentContent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectUpdate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_comment_children);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CommentConnection on CommentConnection {
  __typename
  nodes {
    ...Comment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Comment on Comment {
  __typename
  agentSession {
    id
  }
  url
  reactionData
  reactions {
    ...Reaction
  }
  resolvingCommentId
  documentContentId
  initiativeUpdateId
  issueId
  parentId
  projectUpdateId
  botActor {
    ...ActorBot
  }
  body
  resolvingComment {
    id
  }
  documentContent {
    ...DocumentContent
  }
  syncedWith {
    ...ExternalEntityInfo
  }
  externalThread {
    ...SyncedExternalThread
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  parent {
    id
  }
  projectUpdate {
    id
  }
  quotedText
  archivedAt
  createdAt
  resolvedAt
  editedAt
  id
  resolvingUser {
    id
    displayName
    email
  }
  user {
    id
    displayName
    email
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query comment_children($hash: String, $id: String, $after: String, $before: String, $filter: CommentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  comment(hash: $hash, id: $id) {
    children(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CommentConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["comment:created-issues"] = class LinearCommand_comment_createdIssues extends LinearCommand {
  public static override description = "Issues created from this comment.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false, description: "The hash of the comment to retrieve." }),
    id: Flags.string({ required: false, description: "The identifier of the comment to retrieve." }),
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_comment_createdIssues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query comment_createdIssues($hash: String, $id: String, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  comment(hash: $hash, id: $id) {
    createdIssues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["comment:document-content"] = class LinearCommand_comment_documentContent extends LinearCommand {
  public static override description = "The document content that the comment is associated with.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false, description: "The hash of the comment to retrieve." }),
    id: Flags.string({ required: false, description: "The identifier of the comment to retrieve." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_comment_documentContent);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

query comment_documentContent($hash: String, $id: String) {
  comment(hash: $hash, id: $id) {
    documentContent {
      ...DocumentContent
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["comment:document-content:ai-prompt-rules"] =
  class LinearCommand_comment_documentContent_aiPromptRules extends LinearCommand {
    public static override description = "The AI prompt rules that the content is associated with.";
    public static override enableJsonFlag = true;
    public static override examples = ["<%= config.bin %> <%= command.id %>"];

    public static override flags = {
      hash: Flags.string({ required: false, description: "The hash of the comment to retrieve." }),
      id: Flags.string({ required: false, description: "The identifier of the comment to retrieve." }),
    };

    public async run(): Promise<unknown> {
      const { args, flags } = await this.parse(LinearCommand_comment_documentContent_aiPromptRules);
      const linearClient = await this.getLinearClient();

      const rootVariableName = "";
      const variables: Record<string, unknown> = {};

      for (const [path, value] of Object.entries(args)) {
        set(variables, rootVariableName + path, value);
      }

      for (const [path, value] of Object.entries(flags)) {
        if (path.startsWith("api-") || path === "json") {
          continue;
        }

        set(variables, rootVariableName + path, value);
      }

      const query = `fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

query comment_documentContent_aiPromptRules($hash: String, $id: String) {
  comment(hash: $hash, id: $id) {
    documentContent {
      aiPromptRules {
        ...AiPromptRules
      }
    }
  }
}
`;

      const response = await linearClient.client.rawRequest(query, variables);
      return this.render(response.data);
    }
  };

COMMANDS["comment:external-thread"] = class LinearCommand_comment_externalThread extends LinearCommand {
  public static override description = "The external thread that the comment is synced with.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false, description: "The hash of the comment to retrieve." }),
    id: Flags.string({ required: false, description: "The identifier of the comment to retrieve." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_comment_externalThread);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

query comment_externalThread($hash: String, $id: String) {
  comment(hash: $hash, id: $id) {
    externalThread {
      ...SyncedExternalThread
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["comment:list"] = class LinearCommand_comments extends LinearCommand {
  public static override description = "All comments.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.body.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.body.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.body.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.body.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.body.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.body.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.body.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.body.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.body.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.body.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.body.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.body.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.body.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.body.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.body.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.documentContent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectUpdate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_comments);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CommentConnection on CommentConnection {
  __typename
  nodes {
    ...Comment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Comment on Comment {
  __typename
  agentSession {
    id
  }
  url
  reactionData
  reactions {
    ...Reaction
  }
  resolvingCommentId
  documentContentId
  initiativeUpdateId
  issueId
  parentId
  projectUpdateId
  botActor {
    ...ActorBot
  }
  body
  resolvingComment {
    id
  }
  documentContent {
    ...DocumentContent
  }
  syncedWith {
    ...ExternalEntityInfo
  }
  externalThread {
    ...SyncedExternalThread
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  parent {
    id
  }
  projectUpdate {
    id
  }
  quotedText
  archivedAt
  createdAt
  resolvedAt
  editedAt
  id
  resolvingUser {
    id
    displayName
    email
  }
  user {
    id
    displayName
    email
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query comments($after: String, $before: String, $filter: CommentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  comments(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
  ) {
    ...CommentConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["cycle:view"] = class LinearCommand_cycle extends LinearCommand {
  public static override description = "One specific cycle.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "One specific cycle." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_cycle);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Cycle on Cycle {
  __typename
  completedAt
  name
  inheritedFrom {
    id
  }
  description
  endsAt
  updatedAt
  completedScopeHistory
  completedIssueCountHistory
  inProgressScopeHistory
  number
  progress
  startsAt
  team {
    id
    name
  }
  autoArchivedAt
  archivedAt
  createdAt
  scopeHistory
  issueCountHistory
  id
  isActive
  isFuture
  isPast
  isNext
  isPrevious
}

query cycle($id: String!) {
  cycle(id: $id) {
    ...Cycle
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["cycle:issues"] = class LinearCommand_cycle_issues extends LinearCommand {
  public static override description = "Issues associated with the cycle.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_cycle_issues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query cycle_issues($id: String!, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  cycle(id: $id) {
    issues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["cycle:uncompleted-issues-upon-close"] = class LinearCommand_cycle_uncompletedIssuesUponClose extends (
  LinearCommand
) {
  public static override description = "Issues that weren't completed when the cycle was closed.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_cycle_uncompletedIssuesUponClose);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query cycle_uncompletedIssuesUponClose($id: String!, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  cycle(id: $id) {
    uncompletedIssuesUponClose(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["cycle:list"] = class LinearCommand_cycles extends LinearCommand {
  public static override description = "All cycles.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.isActive.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isActive.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isFuture.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isFuture.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isInCooldown.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isInCooldown.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isNext.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isNext.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isPast.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isPast.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isPrevious.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isPrevious.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_cycles);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CycleConnection on CycleConnection {
  __typename
  nodes {
    ...Cycle
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Cycle on Cycle {
  __typename
  completedAt
  name
  inheritedFrom {
    id
  }
  description
  endsAt
  updatedAt
  completedScopeHistory
  completedIssueCountHistory
  inProgressScopeHistory
  number
  progress
  startsAt
  team {
    id
    name
  }
  autoArchivedAt
  archivedAt
  createdAt
  scopeHistory
  issueCountHistory
  id
  isActive
  isFuture
  isPast
  isNext
  isPrevious
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query cycles($after: String, $before: String, $filter: CycleFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  cycles(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
  ) {
    ...CycleConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["document:view"] = class LinearCommand_document extends LinearCommand {
  public static override description = "One specific document.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "One specific document." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_document);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Document on Document {
  __typename
  trashed
  documentContentId
  url
  color
  title
  slugId
  content
  icon
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  sortOrder
  project {
    id
    name
    url
  }
  hiddenAt
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  updatedBy {
    id
    displayName
    email
  }
}

query document($id: String!) {
  document(id: $id) {
    ...Document
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["document:comments"] = class LinearCommand_document_comments extends LinearCommand {
  public static override description = "Comments associated with the document.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.body.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.body.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.body.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.body.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.body.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.body.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.body.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.body.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.body.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.body.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.body.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.body.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.body.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.body.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.body.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.documentContent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectUpdate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_document_comments);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CommentConnection on CommentConnection {
  __typename
  nodes {
    ...Comment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Comment on Comment {
  __typename
  agentSession {
    id
  }
  url
  reactionData
  reactions {
    ...Reaction
  }
  resolvingCommentId
  documentContentId
  initiativeUpdateId
  issueId
  parentId
  projectUpdateId
  botActor {
    ...ActorBot
  }
  body
  resolvingComment {
    id
  }
  documentContent {
    ...DocumentContent
  }
  syncedWith {
    ...ExternalEntityInfo
  }
  externalThread {
    ...SyncedExternalThread
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  parent {
    id
  }
  projectUpdate {
    id
  }
  quotedText
  archivedAt
  createdAt
  resolvedAt
  editedAt
  id
  resolvingUser {
    id
    displayName
    email
  }
  user {
    id
    displayName
    email
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query document_comments($id: String!, $after: String, $before: String, $filter: CommentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  document(id: $id) {
    comments(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CommentConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["document:list"] = class LinearCommand_documents extends LinearCommand {
  public static override description = "All documents in the workspace.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_documents);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DocumentConnection on DocumentConnection {
  __typename
  nodes {
    ...Document
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Document on Document {
  __typename
  trashed
  documentContentId
  url
  color
  title
  slugId
  content
  icon
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  sortOrder
  project {
    id
    name
    url
  }
  hiddenAt
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query documents($after: String, $before: String, $filter: DocumentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  documents(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
  ) {
    ...DocumentConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative:view"] = class LinearCommand_initiative extends LinearCommand {
  public static override description = "One specific initiative.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "One specific initiative." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiative);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Initiative on Initiative {
  __typename
  trashed
  url
  parentInitiative {
    id
  }
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  description
  targetDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  color
  content
  slugId
  lastUpdate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  name
  targetDateResolution
  frequencyResolution
  sortOrder
  status
  archivedAt
  createdAt
  healthUpdatedAt
  startedAt
  completedAt
  id
  creator {
    id
    displayName
    email
  }
  owner {
    id
    displayName
    email
  }
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

query initiative($id: String!) {
  initiative(id: $id) {
    ...Initiative
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative:document-content"] = class LinearCommand_initiative_documentContent extends LinearCommand {
  public static override description = "The content of the initiative description.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "The content of the initiative description." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiative_documentContent);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

query initiative_documentContent($id: String!) {
  initiative(id: $id) {
    documentContent {
      ...DocumentContent
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative:document-content:ai-prompt-rules"] =
  class LinearCommand_initiative_documentContent_aiPromptRules extends LinearCommand {
    public static override description = "The AI prompt rules that the content is associated with.";
    public static override enableJsonFlag = true;
    public static override examples = ["<%= config.bin %> <%= command.id %>"];

    public static override args = {
      id: Args.string({ required: true, description: "The AI prompt rules that the content is associated with." }),
    };

    public async run(): Promise<unknown> {
      const { args, flags } = await this.parse(LinearCommand_initiative_documentContent_aiPromptRules);
      const linearClient = await this.getLinearClient();

      const rootVariableName = "";
      const variables: Record<string, unknown> = {};

      for (const [path, value] of Object.entries(args)) {
        set(variables, rootVariableName + path, value);
      }

      for (const [path, value] of Object.entries(flags)) {
        if (path.startsWith("api-") || path === "json") {
          continue;
        }

        set(variables, rootVariableName + path, value);
      }

      const query = `fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

query initiative_documentContent_aiPromptRules($id: String!) {
  initiative(id: $id) {
    documentContent {
      aiPromptRules {
        ...AiPromptRules
      }
    }
  }
}
`;

      const response = await linearClient.client.rawRequest(query, variables);
      return this.render(response.data);
    }
  };

COMMANDS["initiative:documents"] = class LinearCommand_initiative_documents extends LinearCommand {
  public static override description = "Documents associated with the initiative.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiative_documents);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DocumentConnection on DocumentConnection {
  __typename
  nodes {
    ...Document
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Document on Document {
  __typename
  trashed
  documentContentId
  url
  color
  title
  slugId
  content
  icon
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  sortOrder
  project {
    id
    name
    url
  }
  hiddenAt
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query initiative_documents($id: String!, $after: String, $before: String, $filter: DocumentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  initiative(id: $id) {
    documents(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...DocumentConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative:history"] = class LinearCommand_initiative_history extends LinearCommand {
  public static override description = "History entries associated with the initiative.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiative_history);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment InitiativeHistoryConnection on InitiativeHistoryConnection {
  __typename
  nodes {
    ...InitiativeHistory
  }
  pageInfo {
    ...PageInfo
  }
}

fragment InitiativeHistory on InitiativeHistory {
  __typename
  entries
  initiative {
    id
  }
  updatedAt
  archivedAt
  createdAt
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query initiative_history($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  initiative(id: $id) {
    history(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...InitiativeHistoryConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative:links"] = class LinearCommand_initiative_links extends LinearCommand {
  public static override description = "Links associated with the initiative.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiative_links);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment EntityExternalLinkConnection on EntityExternalLinkConnection {
  __typename
  nodes {
    ...EntityExternalLink
  }
  pageInfo {
    ...PageInfo
  }
}

fragment EntityExternalLink on EntityExternalLink {
  __typename
  initiative {
    id
  }
  updatedAt
  url
  label
  sortOrder
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query initiative_links($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  initiative(id: $id) {
    links(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...EntityExternalLinkConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative:projects"] = class LinearCommand_initiative_projects extends LinearCommand {
  public static override description = "Projects associated with the initiative.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.activityType.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.activityType.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.activityType.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.activityType.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.activityType.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.activityType.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.activityType.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.activityType.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.activityType.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.activityType.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.activityType.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.activityType.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDependedOnByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDependedOnByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDependsOnRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDependsOnRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasViolatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasViolatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.health.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.health.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.health.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.health.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.health.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.health.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.health.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.health.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.health.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.health.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.health.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.health.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.health.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.health.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.health.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.healthWithAge.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.healthWithAge.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.healthWithAge.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.healthWithAge.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.healthWithAge.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.healthWithAge.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.healthWithAge.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.healthWithAge.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lead.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.startDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.state.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.state.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.state.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.state.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.state.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.state.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.state.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.state.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.state.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.state.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.state.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.state.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.state.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.state.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.state.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.state.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.targetDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    includeSubInitiatives: Flags.boolean({
      required: false,
      description: "Whether to include projects from sub-initiatives. Defaults to true.",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiative_projects);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectConnection on ProjectConnection {
  __typename
  nodes {
    ...Project
    name
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Project on Project {
  __typename
  trashed
  labelIds
  url
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  targetDate
  startDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  lastUpdate {
    id
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  completedScopeHistory
  completedIssueCountHistory
  inProgressScopeHistory
  progress
  scope
  priorityLabel
  priority
  lead {
    id
    displayName
    email
  }
  convertedFromIssue {
    id
    title
    url
  }
  color
  content
  description
  name
  slugId
  targetDateResolution
  startDateResolution
  frequencyResolution
  prioritySortOrder
  sortOrder
  status {
    id
  }
  archivedAt
  createdAt
  healthUpdatedAt
  autoArchivedAt
  canceledAt
  completedAt
  startedAt
  projectUpdateRemindersPausedUntilAt
  scopeHistory
  issueCountHistory
  id
  creator {
    id
    displayName
    email
  }
  favorite {
    id
  }
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  state
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query initiative_projects($id: String!, $after: String, $before: String, $filter: ProjectFilter, $first: Int, $includeArchived: Boolean, $includeSubInitiatives: Boolean, $last: Int, $orderBy: PaginationOrderBy, $sort: [ProjectSortInput!]) {
  initiative(id: $id) {
    projects(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      includeSubInitiatives: $includeSubInitiatives
      last: $last
      orderBy: $orderBy
      sort: $sort
    ) {
      ...ProjectConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative:sub-initiatives"] = class LinearCommand_initiative_subInitiatives extends LinearCommand {
  public static override description = "Sub-initiatives associated with the initiative.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.activityType.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.activityType.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.activityType.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.activityType.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.activityType.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.activityType.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.activityType.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.activityType.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.activityType.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.activityType.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.activityType.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.activityType.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.health.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.health.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.health.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.health.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.health.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.health.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.health.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.health.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.health.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.health.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.health.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.health.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.health.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.health.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.health.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.healthWithAge.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.healthWithAge.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.healthWithAge.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.healthWithAge.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.healthWithAge.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.healthWithAge.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.healthWithAge.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.healthWithAge.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.owner.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.status.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.status.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.status.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.status.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.status.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.status.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.status.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.status.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.status.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.status.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.status.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.status.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.status.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.status.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.status.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.status.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.targetDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiative_subInitiatives);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment InitiativeConnection on InitiativeConnection {
  __typename
  nodes {
    ...Initiative
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Initiative on Initiative {
  __typename
  trashed
  url
  parentInitiative {
    id
  }
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  description
  targetDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  color
  content
  slugId
  lastUpdate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  name
  targetDateResolution
  frequencyResolution
  sortOrder
  status
  archivedAt
  createdAt
  healthUpdatedAt
  startedAt
  completedAt
  id
  creator {
    id
    displayName
    email
  }
  owner {
    id
    displayName
    email
  }
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query initiative_subInitiatives($id: String!, $after: String, $before: String, $filter: InitiativeFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy, $sort: [InitiativeSortInput!]) {
  initiative(id: $id) {
    subInitiatives(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
      sort: $sort
    ) {
      ...InitiativeConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative-update:view"] = class LinearCommand_initiativeUpdate extends LinearCommand {
  public static override description = "A specific  initiative update.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "The identifier of the  initiative update to retrieve." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiativeUpdate);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment InitiativeUpdate on InitiativeUpdate {
  __typename
  reactionData
  reactions {
    ...Reaction
  }
  url
  diffMarkdown
  diff
  health
  initiative {
    id
  }
  updatedAt
  archivedAt
  createdAt
  editedAt
  id
  body
  slugId
  user {
    id
    displayName
    email
  }
  isDiffHidden
  isStale
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

query initiativeUpdate($id: String!) {
  initiativeUpdate(id: $id) {
    ...InitiativeUpdate
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative-update:comments"] = class LinearCommand_initiativeUpdate_comments extends LinearCommand {
  public static override description = "Comments associated with the initiative update.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "The identifier of the  initiative update to retrieve." }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.body.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.body.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.body.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.body.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.body.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.body.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.body.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.body.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.body.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.body.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.body.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.body.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.body.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.body.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.body.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.documentContent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectUpdate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiativeUpdate_comments);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CommentConnection on CommentConnection {
  __typename
  nodes {
    ...Comment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Comment on Comment {
  __typename
  agentSession {
    id
  }
  url
  reactionData
  reactions {
    ...Reaction
  }
  resolvingCommentId
  documentContentId
  initiativeUpdateId
  issueId
  parentId
  projectUpdateId
  botActor {
    ...ActorBot
  }
  body
  resolvingComment {
    id
  }
  documentContent {
    ...DocumentContent
  }
  syncedWith {
    ...ExternalEntityInfo
  }
  externalThread {
    ...SyncedExternalThread
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  parent {
    id
  }
  projectUpdate {
    id
  }
  quotedText
  archivedAt
  createdAt
  resolvedAt
  editedAt
  id
  resolvingUser {
    id
    displayName
    email
  }
  user {
    id
    displayName
    email
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query initiativeUpdate_comments($id: String!, $after: String, $before: String, $filter: CommentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  initiativeUpdate(id: $id) {
    comments(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CommentConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative-update:list"] = class LinearCommand_initiativeUpdates extends LinearCommand {
  public static override description = "All  InitiativeUpdates.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiativeUpdates);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment InitiativeUpdateConnection on InitiativeUpdateConnection {
  __typename
  nodes {
    ...InitiativeUpdate
  }
  pageInfo {
    ...PageInfo
  }
}

fragment InitiativeUpdate on InitiativeUpdate {
  __typename
  reactionData
  reactions {
    ...Reaction
  }
  url
  diffMarkdown
  diff
  health
  initiative {
    id
  }
  updatedAt
  archivedAt
  createdAt
  editedAt
  id
  body
  slugId
  user {
    id
    displayName
    email
  }
  isDiffHidden
  isStale
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query initiativeUpdates($after: String, $before: String, $filter: InitiativeUpdateFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  initiativeUpdates(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
  ) {
    ...InitiativeUpdateConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["initiative:list"] = class LinearCommand_initiatives extends LinearCommand {
  public static override description = "All initiatives in the workspace.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.activityType.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.activityType.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.activityType.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.activityType.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.activityType.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.activityType.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.activityType.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.activityType.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.activityType.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.activityType.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.activityType.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.activityType.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.health.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.health.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.health.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.health.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.health.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.health.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.health.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.health.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.health.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.health.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.health.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.health.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.health.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.health.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.health.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.healthWithAge.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.healthWithAge.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.healthWithAge.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.healthWithAge.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.healthWithAge.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.healthWithAge.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.healthWithAge.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.healthWithAge.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.owner.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.status.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.status.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.status.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.status.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.status.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.status.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.status.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.status.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.status.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.status.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.status.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.status.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.status.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.status.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.status.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.status.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.targetDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_initiatives);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment InitiativeConnection on InitiativeConnection {
  __typename
  nodes {
    ...Initiative
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Initiative on Initiative {
  __typename
  trashed
  url
  parentInitiative {
    id
  }
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  description
  targetDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  color
  content
  slugId
  lastUpdate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  name
  targetDateResolution
  frequencyResolution
  sortOrder
  status
  archivedAt
  createdAt
  healthUpdatedAt
  startedAt
  completedAt
  id
  creator {
    id
    displayName
    email
  }
  owner {
    id
    displayName
    email
  }
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query initiatives($after: String, $before: String, $filter: InitiativeFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy, $sort: [InitiativeSortInput!]) {
  initiatives(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
    sort: $sort
  ) {
    ...InitiativeConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:view"] = class LinearCommand_issue extends LinearCommand {
  public static override description = "One specific issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "One specific issue." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

query issue($id: String!) {
  issue(id: $id) {
    ...Issue
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:attachments"] = class LinearCommand_issue_attachments extends LinearCommand {
  public static override description = "Attachments associated with the issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.sourceType.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.sourceType.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.sourceType.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.sourceType.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.sourceType.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceType.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.sourceType.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceType.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceType.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.sourceType.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.sourceType.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.sourceType.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.sourceType.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.sourceType.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.sourceType.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.sourceType.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.subtitle.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.subtitle.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.subtitle.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.subtitle.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.subtitle.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.subtitle.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.subtitle.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.subtitle.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.subtitle.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.subtitle.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.subtitle.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.subtitle.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.subtitle.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.subtitle.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.subtitle.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.subtitle.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.subtitle.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.url.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.url.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.url.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.url.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.url.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.url.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.url.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.url.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.url.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.url.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.url.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.url.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.url.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.url.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.url.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.url.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_attachments);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment AttachmentConnection on AttachmentConnection {
  __typename
  nodes {
    ...Attachment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Attachment on Attachment {
  __typename
  sourceType
  subtitle
  title
  metadata
  groupBySource
  source
  url
  bodyData
  creator {
    id
    displayName
    email
  }
  issue {
    id
    title
    url
  }
  originalIssue {
    id
    title
    url
  }
  updatedAt
  externalUserCreator {
    id
  }
  archivedAt
  createdAt
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_attachments($id: String!, $after: String, $before: String, $filter: AttachmentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    attachments(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...AttachmentConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:bot-actor"] = class LinearCommand_issue_botActor extends LinearCommand {
  public static override description = "The bot that created the issue, if applicable.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "The bot that created the issue, if applicable." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_botActor);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

query issue_botActor($id: String!) {
  issue(id: $id) {
    botActor {
      ...ActorBot
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:children"] = class LinearCommand_issue_children extends LinearCommand {
  public static override description = "Children of the issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_children);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_children($id: String!, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    children(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:comments"] = class LinearCommand_issue_comments extends LinearCommand {
  public static override description = "Comments associated with the issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.body.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.body.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.body.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.body.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.body.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.body.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.body.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.body.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.body.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.body.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.body.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.body.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.body.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.body.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.body.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.documentContent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectUpdate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_comments);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CommentConnection on CommentConnection {
  __typename
  nodes {
    ...Comment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Comment on Comment {
  __typename
  agentSession {
    id
  }
  url
  reactionData
  reactions {
    ...Reaction
  }
  resolvingCommentId
  documentContentId
  initiativeUpdateId
  issueId
  parentId
  projectUpdateId
  botActor {
    ...ActorBot
  }
  body
  resolvingComment {
    id
  }
  documentContent {
    ...DocumentContent
  }
  syncedWith {
    ...ExternalEntityInfo
  }
  externalThread {
    ...SyncedExternalThread
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  parent {
    id
  }
  projectUpdate {
    id
  }
  quotedText
  archivedAt
  createdAt
  resolvedAt
  editedAt
  id
  resolvingUser {
    id
    displayName
    email
  }
  user {
    id
    displayName
    email
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_comments($id: String!, $after: String, $before: String, $filter: CommentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    comments(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CommentConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:documents"] = class LinearCommand_issue_documents extends LinearCommand {
  public static override description = "Documents associated with the issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_documents);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DocumentConnection on DocumentConnection {
  __typename
  nodes {
    ...Document
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Document on Document {
  __typename
  trashed
  documentContentId
  url
  color
  title
  slugId
  content
  icon
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  sortOrder
  project {
    id
    name
    url
  }
  hiddenAt
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_documents($id: String!, $after: String, $before: String, $filter: DocumentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    documents(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...DocumentConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:former-attachments"] = class LinearCommand_issue_formerAttachments extends LinearCommand {
  public static override description =
    "Attachments previously associated with the issue before being moved to another issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.sourceType.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.sourceType.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.sourceType.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.sourceType.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.sourceType.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceType.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.sourceType.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceType.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceType.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.sourceType.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.sourceType.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.sourceType.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.sourceType.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.sourceType.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.sourceType.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.sourceType.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.subtitle.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.subtitle.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.subtitle.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.subtitle.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.subtitle.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.subtitle.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.subtitle.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.subtitle.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.subtitle.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.subtitle.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.subtitle.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.subtitle.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.subtitle.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.subtitle.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.subtitle.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.subtitle.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.subtitle.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.url.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.url.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.url.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.url.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.url.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.url.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.url.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.url.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.url.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.url.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.url.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.url.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.url.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.url.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.url.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.url.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_formerAttachments);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment AttachmentConnection on AttachmentConnection {
  __typename
  nodes {
    ...Attachment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Attachment on Attachment {
  __typename
  sourceType
  subtitle
  title
  metadata
  groupBySource
  source
  url
  bodyData
  creator {
    id
    displayName
    email
  }
  issue {
    id
    title
    url
  }
  originalIssue {
    id
    title
    url
  }
  updatedAt
  externalUserCreator {
    id
  }
  archivedAt
  createdAt
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_formerAttachments($id: String!, $after: String, $before: String, $filter: AttachmentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    formerAttachments(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...AttachmentConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:former-needs"] = class LinearCommand_issue_formerNeeds extends LinearCommand {
  public static override description =
    "Customer needs previously associated with the issue before being moved to another issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.comment.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customer.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_formerNeeds);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CustomerNeedConnection on CustomerNeedConnection {
  __typename
  nodes {
    ...CustomerNeed
  }
  pageInfo {
    ...PageInfo
  }
}

fragment CustomerNeed on CustomerNeed {
  __typename
  url
  attachment {
    id
  }
  comment {
    id
  }
  creator {
    id
    displayName
    email
  }
  customer {
    id
  }
  originalIssue {
    id
    title
    url
  }
  issue {
    id
    title
    url
  }
  updatedAt
  body
  projectAttachment {
    ...ProjectAttachment
  }
  project {
    id
    name
    url
  }
  archivedAt
  createdAt
  id
  priority
}

fragment ProjectAttachment on ProjectAttachment {
  __typename
  sourceType
  metadata
  source
  subtitle
  creator {
    id
    displayName
    email
  }
  updatedAt
  archivedAt
  createdAt
  id
  title
  url
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_formerNeeds($id: String!, $after: String, $before: String, $filter: CustomerNeedFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    formerNeeds(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CustomerNeedConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:history"] = class LinearCommand_issue_history extends LinearCommand {
  public static override description = "History entries associated with the issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_history);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueHistoryConnection on IssueHistoryConnection {
  __typename
  nodes {
    ...IssueHistory
  }
  pageInfo {
    ...PageInfo
  }
}

fragment IssueHistory on IssueHistory {
  __typename
  triageResponsibilityAutoAssigned
  relationChanges {
    ...IssueRelationHistoryPayload
  }
  addedLabelIds
  removedLabelIds
  actor {
    id
    displayName
    email
  }
  descriptionUpdatedBy {
    ...User
    displayName
    email
  }
  actors {
    ...User
    displayName
    email
  }
  fromDelegate {
    id
    displayName
    email
  }
  toDelegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  fromCycle {
    id
  }
  toCycle {
    id
  }
  attachmentId
  customerNeedId
  toCycleId
  toParentId
  toConvertedProjectId
  toProjectId
  toStateId
  fromCycleId
  fromParentId
  fromProjectId
  fromStateId
  fromTeamId
  toTeamId
  fromAssigneeId
  toAssigneeId
  actorId
  issueImport {
    ...IssueImport
  }
  issue {
    id
    title
    url
  }
  addedLabels {
    ...IssueLabel
  }
  removedLabels {
    ...IssueLabel
  }
  updatedAt
  attachment {
    id
  }
  toConvertedProject {
    id
    name
    url
  }
  fromParent {
    id
    title
    url
  }
  toParent {
    id
    title
    url
  }
  fromProject {
    id
    name
    url
  }
  toProject {
    id
    name
    url
  }
  fromState {
    id
  }
  toState {
    id
  }
  fromTeam {
    id
    name
  }
  toTeam {
    id
    name
  }
  archivedAt
  createdAt
  id
  toAssignee {
    id
    displayName
    email
  }
  fromAssignee {
    id
    displayName
    email
  }
  triageResponsibilityNotifiedUsers {
    ...User
    displayName
    email
  }
  fromDueDate
  toDueDate
  fromEstimate
  toEstimate
  fromPriority
  toPriority
  fromTitle
  toTitle
  archived
  autoArchived
  autoClosed
  trashed
  updatedDescription
}

fragment IssueRelationHistoryPayload on IssueRelationHistoryPayload {
  __typename
  identifier
  type
}

fragment User on User {
  __typename
  statusUntilAt
  description
  avatarUrl
  createdIssueCount
  disableReason
  avatarBackgroundColor
  statusEmoji
  initials
  statusLabel
  updatedAt
  lastSeen
  timezone
  archivedAt
  createdAt
  id
  gitHubUserId
  displayName
  email
  name
  url
  active
  guest
  app
  admin
  owner
  isAssignable
  isMentionable
  isMe
  supportsAgentSessions
  canAccessAnyPublicTeam
  calendarHash
  inviteHash
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment IssueImport on IssueImport {
  __typename
  progress
  errorMetadata
  csvFileUrl
  serviceMetadata
  teamName
  mapping
  displayName
  creatorId
  updatedAt
  service
  status
  archivedAt
  createdAt
  id
  error
}

fragment IssueLabel on IssueLabel {
  __typename
  lastAppliedAt
  color
  description
  name
  updatedAt
  inheritedFrom {
    id
  }
  parent {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  retiredBy {
    id
    displayName
    email
  }
  isGroup
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_history($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    history(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueHistoryConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:inverse-relations"] = class LinearCommand_issue_inverseRelations extends LinearCommand {
  public static override description = "Inverse relations associated with this issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_inverseRelations);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueRelationConnection on IssueRelationConnection {
  __typename
  nodes {
    ...IssueRelation
  }
  pageInfo {
    ...PageInfo
  }
}

fragment IssueRelation on IssueRelation {
  __typename
  issue {
    id
    title
    url
  }
  updatedAt
  relatedIssue {
    id
    title
    url
  }
  type
  archivedAt
  createdAt
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_inverseRelations($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    inverseRelations(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueRelationConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:labels"] = class LinearCommand_issue_labels extends LinearCommand {
  public static override description = "Labels associated with this issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.isGroup.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isGroup.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.team.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_labels);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueLabelConnection on IssueLabelConnection {
  __typename
  nodes {
    ...IssueLabel
  }
  pageInfo {
    ...PageInfo
  }
}

fragment IssueLabel on IssueLabel {
  __typename
  lastAppliedAt
  color
  description
  name
  updatedAt
  inheritedFrom {
    id
  }
  parent {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  retiredBy {
    id
    displayName
    email
  }
  isGroup
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_labels($id: String!, $after: String, $before: String, $filter: IssueLabelFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    labels(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueLabelConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:needs"] = class LinearCommand_issue_needs extends LinearCommand {
  public static override description = "Customer needs associated with the issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.comment.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customer.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_needs);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CustomerNeedConnection on CustomerNeedConnection {
  __typename
  nodes {
    ...CustomerNeed
  }
  pageInfo {
    ...PageInfo
  }
}

fragment CustomerNeed on CustomerNeed {
  __typename
  url
  attachment {
    id
  }
  comment {
    id
  }
  creator {
    id
    displayName
    email
  }
  customer {
    id
  }
  originalIssue {
    id
    title
    url
  }
  issue {
    id
    title
    url
  }
  updatedAt
  body
  projectAttachment {
    ...ProjectAttachment
  }
  project {
    id
    name
    url
  }
  archivedAt
  createdAt
  id
  priority
}

fragment ProjectAttachment on ProjectAttachment {
  __typename
  sourceType
  metadata
  source
  subtitle
  creator {
    id
    displayName
    email
  }
  updatedAt
  archivedAt
  createdAt
  id
  title
  url
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_needs($id: String!, $after: String, $before: String, $filter: CustomerNeedFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    needs(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CustomerNeedConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:relations"] = class LinearCommand_issue_relations extends LinearCommand {
  public static override description = "Relations associated with this issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_relations);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueRelationConnection on IssueRelationConnection {
  __typename
  nodes {
    ...IssueRelation
  }
  pageInfo {
    ...PageInfo
  }
}

fragment IssueRelation on IssueRelation {
  __typename
  issue {
    id
    title
    url
  }
  updatedAt
  relatedIssue {
    id
    title
    url
  }
  type
  archivedAt
  createdAt
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_relations($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    relations(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueRelationConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:subscribers"] = class LinearCommand_issue_subscribers extends LinearCommand {
  public static override description = "Users who are subscribed to the issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.active.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.active.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.admin.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.admin.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.app.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.app.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.displayName.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.displayName.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.displayName.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.displayName.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.displayName.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.displayName.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.displayName.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.displayName.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.displayName.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.displayName.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.displayName.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.displayName.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.displayName.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.displayName.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.displayName.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.displayName.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.email.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.email.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.email.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.email.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.email.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.email.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.email.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.email.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.email.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.email.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.email.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.email.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.email.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.email.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.email.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.email.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.invited.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.invited.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isInvited.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isInvited.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isMe.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isMe.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.owner.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.owner.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    includeDisabled: Flags.boolean({
      required: false,
      description: "Should query return disabled/suspended users (default: false).",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issue_subscribers);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment UserConnection on UserConnection {
  __typename
  nodes {
    ...User
    displayName
    email
  }
  pageInfo {
    ...PageInfo
  }
}

fragment User on User {
  __typename
  statusUntilAt
  description
  avatarUrl
  createdIssueCount
  disableReason
  avatarBackgroundColor
  statusEmoji
  initials
  statusLabel
  updatedAt
  lastSeen
  timezone
  archivedAt
  createdAt
  id
  gitHubUserId
  displayName
  email
  name
  url
  active
  guest
  app
  admin
  owner
  isAssignable
  isMentionable
  isMe
  supportsAgentSessions
  canAccessAnyPublicTeam
  calendarHash
  inviteHash
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issue_subscribers($id: String!, $after: String, $before: String, $filter: UserFilter, $first: Int, $includeArchived: Boolean, $includeDisabled: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  issue(id: $id) {
    subscribers(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      includeDisabled: $includeDisabled
      last: $last
      orderBy: $orderBy
    ) {
      ...UserConnection
    }
    title
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:list"] = class LinearCommand_issues extends LinearCommand {
  public static override description = "All issues.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_issues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query issues($after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy, $sort: [IssueSortInput!]) {
  issues(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
    sort: $sort
  ) {
    ...IssueConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["organization"] = class LinearCommand_organization extends LinearCommand {
  public static override description = "The user's organization.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_organization);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Organization on Organization {
  __typename
  allowedAuthServices
  allowedFileUploadContentTypes
  createdIssueCount
  customersConfiguration
  defaultFeedSummarySchedule
  gitBranchFormat
  ipRestrictions {
    ...OrganizationIpRestriction
  }
  userCount
  customerCount
  previousUrlKeys
  periodUploadVolume
  securitySettings
  initiativeUpdateRemindersDay
  projectUpdateRemindersDay
  releaseChannel
  initiativeUpdateRemindersHour
  projectUpdateRemindersHour
  updatedAt
  fiscalYearStartMonth
  initiativeUpdateReminderFrequencyInWeeks
  projectUpdateReminderFrequencyInWeeks
  logoUrl
  name
  projectStatuses {
    ...ProjectStatus
  }
  subscription {
    ...PaidSubscription
  }
  urlKey
  deletionRequestedAt
  archivedAt
  createdAt
  trialEndsAt
  id
  hipaaComplianceEnabled
  samlEnabled
  scimEnabled
  allowMembersToInvite
  restrictTeamCreationToAdmins
  gitLinkbackMessagesEnabled
  gitPublicLinkbackMessagesEnabled
  aiDiscussionSummariesEnabled
  aiThreadSummariesEnabled
  feedEnabled
  customersEnabled
  roadmapEnabled
  restrictLabelManagementToAdmins
  projectUpdatesReminderFrequency
  slaDayCount
}

fragment OrganizationIpRestriction on OrganizationIpRestriction {
  __typename
  range
  description
  type
  enabled
}

fragment ProjectStatus on ProjectStatus {
  __typename
  description
  color
  updatedAt
  name
  position
  archivedAt
  createdAt
  type
  id
  indefinite
}

fragment PaidSubscription on PaidSubscription {
  __typename
  collectionMethod
  creator {
    id
    displayName
    email
  }
  cancelAt
  canceledAt
  nextBillingAt
  updatedAt
  seatsMaximum
  seatsMinimum
  seats
  pendingChangeType
  type
  archivedAt
  createdAt
  id
}

query organization {
  organization {
    ...Organization
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["organization:integrations"] = class LinearCommand_organization_integrations extends LinearCommand {
  public static override description = "Integrations associated with the organization.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_organization_integrations);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IntegrationConnection on IntegrationConnection {
  __typename
  nodes {
    ...Integration
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Integration on Integration {
  __typename
  service
  updatedAt
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query organization_integrations($after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  organization {
    integrations(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IntegrationConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["organization:labels"] = class LinearCommand_organization_labels extends LinearCommand {
  public static override description = "Labels associated with the organization.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.isGroup.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isGroup.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.team.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_organization_labels);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueLabelConnection on IssueLabelConnection {
  __typename
  nodes {
    ...IssueLabel
  }
  pageInfo {
    ...PageInfo
  }
}

fragment IssueLabel on IssueLabel {
  __typename
  lastAppliedAt
  color
  description
  name
  updatedAt
  inheritedFrom {
    id
  }
  parent {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  retiredBy {
    id
    displayName
    email
  }
  isGroup
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query organization_labels($after: String, $before: String, $filter: IssueLabelFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  organization {
    labels(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueLabelConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["organization:project-labels"] = class LinearCommand_organization_projectLabels extends LinearCommand {
  public static override description = "Project labels associated with the organization.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.isGroup.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isGroup.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_organization_projectLabels);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectLabelConnection on ProjectLabelConnection {
  __typename
  nodes {
    ...ProjectLabel
  }
  pageInfo {
    ...PageInfo
  }
}

fragment ProjectLabel on ProjectLabel {
  __typename
  lastAppliedAt
  color
  description
  name
  updatedAt
  parent {
    id
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  retiredBy {
    id
    displayName
    email
  }
  isGroup
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query organization_projectLabels($after: String, $before: String, $filter: ProjectLabelFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  organization {
    projectLabels(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...ProjectLabelConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["organization:subscription"] = class LinearCommand_organization_subscription extends LinearCommand {
  public static override description = "The organization's subscription to a paid plan.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_organization_subscription);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment PaidSubscription on PaidSubscription {
  __typename
  collectionMethod
  creator {
    id
    displayName
    email
  }
  cancelAt
  canceledAt
  nextBillingAt
  updatedAt
  seatsMaximum
  seatsMinimum
  seats
  pendingChangeType
  type
  archivedAt
  createdAt
  id
}

query organization_subscription {
  organization {
    subscription {
      ...PaidSubscription
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["organization:teams"] = class LinearCommand_organization_teams extends LinearCommand {
  public static override description = "Teams associated with the organization.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.key.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.key.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.key.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.key.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.key.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.key.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.key.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.key.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.key.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.key.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.key.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.key.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.key.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.key.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.key.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.private.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.private.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_organization_teams);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TeamConnection on TeamConnection {
  __typename
  nodes {
    ...Team
    name
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Team on Team {
  __typename
  cycleIssueAutoAssignCompleted
  cycleLockToActive
  cycleIssueAutoAssignStarted
  cycleCalenderUrl
  upcomingCycleCount
  issueCount
  autoArchivePeriod
  autoClosePeriod
  integrationsSettings {
    id
  }
  activeCycle {
    id
  }
  triageResponsibility {
    id
  }
  scimGroupName
  autoCloseStateId
  cycleCooldownTime
  cycleStartDay
  defaultTemplateForMembers {
    id
  }
  defaultTemplateForNonMembers {
    id
  }
  defaultProjectTemplate {
    id
  }
  defaultIssueState {
    id
  }
  cycleDuration
  icon
  defaultTemplateForMembersId
  defaultTemplateForNonMembersId
  issueEstimationType
  updatedAt
  displayName
  color
  description
  name
  key
  archivedAt
  createdAt
  timezone
  id
  mergeWorkflowState {
    id
  }
  draftWorkflowState {
    id
  }
  startWorkflowState {
    id
  }
  mergeableWorkflowState {
    id
  }
  reviewWorkflowState {
    id
  }
  markedAsDuplicateWorkflowState {
    id
  }
  triageIssueState {
    id
  }
  inviteHash
  defaultIssueEstimate
  setIssueSortOrderOnStateChange
  requirePriorityToLeaveTriage
  autoCloseChildIssues
  autoCloseParentIssues
  scimManaged
  private
  inheritIssueEstimation
  inheritWorkflowStatuses
  cyclesEnabled
  issueEstimationExtended
  issueEstimationAllowZero
  aiDiscussionSummariesEnabled
  aiThreadSummariesEnabled
  groupIssueHistory
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  triageEnabled
  issueOrderingNoPriorityFirst
  issueSortOrderDefaultToBottom
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query organization_teams($after: String, $before: String, $filter: TeamFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  organization {
    teams(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TeamConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["organization:templates"] = class LinearCommand_organization_templates extends LinearCommand {
  public static override description = "Templates associated with the organization.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.null": Flags.boolean({ required: false, description: "Filter based on the existence of the relation." }),
    "filter.type.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.type.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.type.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.type.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.type.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.type.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.type.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.type.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.type.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.type.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.type.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.type.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.type.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.type.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.type.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.type.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_organization_templates);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TemplateConnection on TemplateConnection {
  __typename
  nodes {
    ...Template
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Template on Template {
  __typename
  templateData
  description
  type
  updatedAt
  name
  inheritedFrom {
    id
  }
  sortOrder
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  lastUpdatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query organization_templates($after: String, $before: String, $filter: NullableTemplateFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  organization {
    templates(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TemplateConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["organization:users"] = class LinearCommand_organization_users extends LinearCommand {
  public static override description = "Users associated with the organization.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    includeDisabled: Flags.boolean({
      required: false,
      description: "Should query return disabled/suspended users (default: false).",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_organization_users);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment UserConnection on UserConnection {
  __typename
  nodes {
    ...User
    displayName
    email
  }
  pageInfo {
    ...PageInfo
  }
}

fragment User on User {
  __typename
  statusUntilAt
  description
  avatarUrl
  createdIssueCount
  disableReason
  avatarBackgroundColor
  statusEmoji
  initials
  statusLabel
  updatedAt
  lastSeen
  timezone
  archivedAt
  createdAt
  id
  gitHubUserId
  displayName
  email
  name
  url
  active
  guest
  app
  admin
  owner
  isAssignable
  isMentionable
  isMe
  supportsAgentSessions
  canAccessAnyPublicTeam
  calendarHash
  inviteHash
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query organization_users($after: String, $before: String, $first: Int, $includeArchived: Boolean, $includeDisabled: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  organization {
    users(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      includeDisabled: $includeDisabled
      last: $last
      orderBy: $orderBy
    ) {
      ...UserConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:view"] = class LinearCommand_project extends LinearCommand {
  public static override description = "One specific project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "One specific project." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Project on Project {
  __typename
  trashed
  labelIds
  url
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  targetDate
  startDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  lastUpdate {
    id
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  completedScopeHistory
  completedIssueCountHistory
  inProgressScopeHistory
  progress
  scope
  priorityLabel
  priority
  lead {
    id
    displayName
    email
  }
  convertedFromIssue {
    id
    title
    url
  }
  color
  content
  description
  name
  slugId
  targetDateResolution
  startDateResolution
  frequencyResolution
  prioritySortOrder
  sortOrder
  status {
    id
  }
  archivedAt
  createdAt
  healthUpdatedAt
  autoArchivedAt
  canceledAt
  completedAt
  startedAt
  projectUpdateRemindersPausedUntilAt
  scopeHistory
  issueCountHistory
  id
  creator {
    id
    displayName
    email
  }
  favorite {
    id
  }
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  state
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

query project($id: String!) {
  project(id: $id) {
    ...Project
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:comments"] = class LinearCommand_project_comments extends LinearCommand {
  public static override description = "Comments associated with the project overview.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.body.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.body.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.body.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.body.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.body.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.body.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.body.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.body.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.body.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.body.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.body.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.body.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.body.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.body.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.body.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.documentContent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectUpdate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_comments);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CommentConnection on CommentConnection {
  __typename
  nodes {
    ...Comment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Comment on Comment {
  __typename
  agentSession {
    id
  }
  url
  reactionData
  reactions {
    ...Reaction
  }
  resolvingCommentId
  documentContentId
  initiativeUpdateId
  issueId
  parentId
  projectUpdateId
  botActor {
    ...ActorBot
  }
  body
  resolvingComment {
    id
  }
  documentContent {
    ...DocumentContent
  }
  syncedWith {
    ...ExternalEntityInfo
  }
  externalThread {
    ...SyncedExternalThread
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  parent {
    id
  }
  projectUpdate {
    id
  }
  quotedText
  archivedAt
  createdAt
  resolvedAt
  editedAt
  id
  resolvingUser {
    id
    displayName
    email
  }
  user {
    id
    displayName
    email
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_comments($id: String!, $after: String, $before: String, $filter: CommentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    comments(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CommentConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:document-content"] = class LinearCommand_project_documentContent extends LinearCommand {
  public static override description = "The content of the project description.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "The content of the project description." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_documentContent);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

query project_documentContent($id: String!) {
  project(id: $id) {
    documentContent {
      ...DocumentContent
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:document-content:ai-prompt-rules"] =
  class LinearCommand_project_documentContent_aiPromptRules extends LinearCommand {
    public static override description = "The AI prompt rules that the content is associated with.";
    public static override enableJsonFlag = true;
    public static override examples = ["<%= config.bin %> <%= command.id %>"];

    public static override args = {
      id: Args.string({ required: true, description: "The AI prompt rules that the content is associated with." }),
    };

    public async run(): Promise<unknown> {
      const { args, flags } = await this.parse(LinearCommand_project_documentContent_aiPromptRules);
      const linearClient = await this.getLinearClient();

      const rootVariableName = "";
      const variables: Record<string, unknown> = {};

      for (const [path, value] of Object.entries(args)) {
        set(variables, rootVariableName + path, value);
      }

      for (const [path, value] of Object.entries(flags)) {
        if (path.startsWith("api-") || path === "json") {
          continue;
        }

        set(variables, rootVariableName + path, value);
      }

      const query = `fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

query project_documentContent_aiPromptRules($id: String!) {
  project(id: $id) {
    documentContent {
      aiPromptRules {
        ...AiPromptRules
      }
    }
    name
    url
  }
}
`;

      const response = await linearClient.client.rawRequest(query, variables);
      return this.render(response.data);
    }
  };

COMMANDS["project:documents"] = class LinearCommand_project_documents extends LinearCommand {
  public static override description = "Documents associated with the project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_documents);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DocumentConnection on DocumentConnection {
  __typename
  nodes {
    ...Document
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Document on Document {
  __typename
  trashed
  documentContentId
  url
  color
  title
  slugId
  content
  icon
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  sortOrder
  project {
    id
    name
    url
  }
  hiddenAt
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_documents($id: String!, $after: String, $before: String, $filter: DocumentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    documents(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...DocumentConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:external-links"] = class LinearCommand_project_externalLinks extends LinearCommand {
  public static override description = "External links associated with the project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_externalLinks);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment EntityExternalLinkConnection on EntityExternalLinkConnection {
  __typename
  nodes {
    ...EntityExternalLink
  }
  pageInfo {
    ...PageInfo
  }
}

fragment EntityExternalLink on EntityExternalLink {
  __typename
  initiative {
    id
  }
  updatedAt
  url
  label
  sortOrder
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_externalLinks($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    externalLinks(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...EntityExternalLinkConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:history"] = class LinearCommand_project_history extends LinearCommand {
  public static override description = "History entries associated with the project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_history);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectHistoryConnection on ProjectHistoryConnection {
  __typename
  nodes {
    ...ProjectHistory
  }
  pageInfo {
    ...PageInfo
  }
}

fragment ProjectHistory on ProjectHistory {
  __typename
  entries
  updatedAt
  project {
    id
    name
    url
  }
  archivedAt
  createdAt
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_history($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    history(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...ProjectHistoryConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:initiatives"] = class LinearCommand_project_initiatives extends LinearCommand {
  public static override description = "Initiatives that this project belongs to.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_initiatives);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment InitiativeConnection on InitiativeConnection {
  __typename
  nodes {
    ...Initiative
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Initiative on Initiative {
  __typename
  trashed
  url
  parentInitiative {
    id
  }
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  description
  targetDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  color
  content
  slugId
  lastUpdate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  name
  targetDateResolution
  frequencyResolution
  sortOrder
  status
  archivedAt
  createdAt
  healthUpdatedAt
  startedAt
  completedAt
  id
  creator {
    id
    displayName
    email
  }
  owner {
    id
    displayName
    email
  }
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_initiatives($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    initiatives(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...InitiativeConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:issues"] = class LinearCommand_project_issues extends LinearCommand {
  public static override description = "Issues associated with the project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_issues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_issues($id: String!, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    issues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:labels"] = class LinearCommand_project_labels extends LinearCommand {
  public static override description = "Labels associated with this project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.isGroup.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isGroup.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_labels);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectLabelConnection on ProjectLabelConnection {
  __typename
  nodes {
    ...ProjectLabel
  }
  pageInfo {
    ...PageInfo
  }
}

fragment ProjectLabel on ProjectLabel {
  __typename
  lastAppliedAt
  color
  description
  name
  updatedAt
  parent {
    id
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  retiredBy {
    id
    displayName
    email
  }
  isGroup
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_labels($id: String!, $after: String, $before: String, $filter: ProjectLabelFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    labels(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...ProjectLabelConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:members"] = class LinearCommand_project_members extends LinearCommand {
  public static override description = "Users that are members of the project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.active.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.active.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.admin.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.admin.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.app.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.app.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.displayName.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.displayName.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.displayName.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.displayName.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.displayName.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.displayName.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.displayName.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.displayName.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.displayName.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.displayName.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.displayName.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.displayName.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.displayName.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.displayName.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.displayName.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.displayName.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.email.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.email.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.email.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.email.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.email.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.email.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.email.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.email.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.email.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.email.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.email.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.email.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.email.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.email.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.email.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.email.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.invited.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.invited.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isInvited.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isInvited.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isMe.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isMe.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.owner.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.owner.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    includeDisabled: Flags.boolean({
      required: false,
      description: "Should query return disabled/suspended users (default: false).",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_members);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment UserConnection on UserConnection {
  __typename
  nodes {
    ...User
    displayName
    email
  }
  pageInfo {
    ...PageInfo
  }
}

fragment User on User {
  __typename
  statusUntilAt
  description
  avatarUrl
  createdIssueCount
  disableReason
  avatarBackgroundColor
  statusEmoji
  initials
  statusLabel
  updatedAt
  lastSeen
  timezone
  archivedAt
  createdAt
  id
  gitHubUserId
  displayName
  email
  name
  url
  active
  guest
  app
  admin
  owner
  isAssignable
  isMentionable
  isMe
  supportsAgentSessions
  canAccessAnyPublicTeam
  calendarHash
  inviteHash
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_members($id: String!, $after: String, $before: String, $filter: UserFilter, $first: Int, $includeArchived: Boolean, $includeDisabled: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    members(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      includeDisabled: $includeDisabled
      last: $last
      orderBy: $orderBy
    ) {
      ...UserConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:needs"] = class LinearCommand_project_needs extends LinearCommand {
  public static override description = "Customer needs associated with the project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.comment.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customer.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_needs);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CustomerNeedConnection on CustomerNeedConnection {
  __typename
  nodes {
    ...CustomerNeed
  }
  pageInfo {
    ...PageInfo
  }
}

fragment CustomerNeed on CustomerNeed {
  __typename
  url
  attachment {
    id
  }
  comment {
    id
  }
  creator {
    id
    displayName
    email
  }
  customer {
    id
  }
  originalIssue {
    id
    title
    url
  }
  issue {
    id
    title
    url
  }
  updatedAt
  body
  projectAttachment {
    ...ProjectAttachment
  }
  project {
    id
    name
    url
  }
  archivedAt
  createdAt
  id
  priority
}

fragment ProjectAttachment on ProjectAttachment {
  __typename
  sourceType
  metadata
  source
  subtitle
  creator {
    id
    displayName
    email
  }
  updatedAt
  archivedAt
  createdAt
  id
  title
  url
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_needs($id: String!, $after: String, $before: String, $filter: CustomerNeedFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    needs(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CustomerNeedConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:milestones"] = class LinearCommand_project_projectMilestones extends LinearCommand {
  public static override description = "Milestones associated with the project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.targetDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_projectMilestones);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectMilestoneConnection on ProjectMilestoneConnection {
  __typename
  nodes {
    ...ProjectMilestone
  }
  pageInfo {
    ...PageInfo
  }
}

fragment ProjectMilestone on ProjectMilestone {
  __typename
  documentContent {
    ...DocumentContent
  }
  updatedAt
  name
  sortOrder
  targetDate
  progress
  description
  project {
    id
    name
    url
  }
  status
  archivedAt
  createdAt
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_projectMilestones($id: String!, $after: String, $before: String, $filter: ProjectMilestoneFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    projectMilestones(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...ProjectMilestoneConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:updates"] = class LinearCommand_project_projectUpdates extends LinearCommand {
  public static override description = "Project updates associated with the project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_projectUpdates);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectUpdateConnection on ProjectUpdateConnection {
  __typename
  nodes {
    ...ProjectUpdate
  }
  pageInfo {
    ...PageInfo
  }
}

fragment ProjectUpdate on ProjectUpdate {
  __typename
  reactionData
  reactions {
    ...Reaction
  }
  url
  diffMarkdown
  diff
  health
  updatedAt
  project {
    id
    name
    url
  }
  archivedAt
  createdAt
  editedAt
  id
  body
  slugId
  user {
    id
    displayName
    email
  }
  isDiffHidden
  isStale
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_projectUpdates($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    projectUpdates(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...ProjectUpdateConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:relations"] = class LinearCommand_project_relations extends LinearCommand {
  public static override description = "Relations associated with this project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_relations);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectRelationConnection on ProjectRelationConnection {
  __typename
  nodes {
    ...ProjectRelation
  }
  pageInfo {
    ...PageInfo
  }
}

fragment ProjectRelation on ProjectRelation {
  __typename
  updatedAt
  user {
    id
    displayName
    email
  }
  projectMilestone {
    id
  }
  relatedProjectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  relatedProject {
    id
    name
    url
  }
  type
  archivedAt
  createdAt
  anchorType
  relatedAnchorType
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_relations($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    relations(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...ProjectRelationConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:teams"] = class LinearCommand_project_teams extends LinearCommand {
  public static override description = "Teams associated with this project.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.key.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.key.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.key.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.key.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.key.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.key.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.key.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.key.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.key.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.key.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.key.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.key.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.key.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.key.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.key.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.private.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.private.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_project_teams);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TeamConnection on TeamConnection {
  __typename
  nodes {
    ...Team
    name
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Team on Team {
  __typename
  cycleIssueAutoAssignCompleted
  cycleLockToActive
  cycleIssueAutoAssignStarted
  cycleCalenderUrl
  upcomingCycleCount
  issueCount
  autoArchivePeriod
  autoClosePeriod
  integrationsSettings {
    id
  }
  activeCycle {
    id
  }
  triageResponsibility {
    id
  }
  scimGroupName
  autoCloseStateId
  cycleCooldownTime
  cycleStartDay
  defaultTemplateForMembers {
    id
  }
  defaultTemplateForNonMembers {
    id
  }
  defaultProjectTemplate {
    id
  }
  defaultIssueState {
    id
  }
  cycleDuration
  icon
  defaultTemplateForMembersId
  defaultTemplateForNonMembersId
  issueEstimationType
  updatedAt
  displayName
  color
  description
  name
  key
  archivedAt
  createdAt
  timezone
  id
  mergeWorkflowState {
    id
  }
  draftWorkflowState {
    id
  }
  startWorkflowState {
    id
  }
  mergeableWorkflowState {
    id
  }
  reviewWorkflowState {
    id
  }
  markedAsDuplicateWorkflowState {
    id
  }
  triageIssueState {
    id
  }
  inviteHash
  defaultIssueEstimate
  setIssueSortOrderOnStateChange
  requirePriorityToLeaveTriage
  autoCloseChildIssues
  autoCloseParentIssues
  scimManaged
  private
  inheritIssueEstimation
  inheritWorkflowStatuses
  cyclesEnabled
  issueEstimationExtended
  issueEstimationAllowZero
  aiDiscussionSummariesEnabled
  aiThreadSummariesEnabled
  groupIssueHistory
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  triageEnabled
  issueOrderingNoPriorityFirst
  issueSortOrderDefaultToBottom
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query project_teams($id: String!, $after: String, $before: String, $filter: TeamFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  project(id: $id) {
    teams(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TeamConnection
    }
    name
    url
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project-status:view"] = class LinearCommand_projectStatus extends LinearCommand {
  public static override description = "One specific project status.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "One specific project status." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_projectStatus);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectStatus on ProjectStatus {
  __typename
  description
  color
  updatedAt
  name
  position
  archivedAt
  createdAt
  type
  id
  indefinite
}

query projectStatus($id: String!) {
  projectStatus(id: $id) {
    ...ProjectStatus
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project-status:list"] = class LinearCommand_projectStatuses extends LinearCommand {
  public static override description = "All project statuses.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_projectStatuses);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectStatusConnection on ProjectStatusConnection {
  __typename
  nodes {
    ...ProjectStatus
  }
  pageInfo {
    ...PageInfo
  }
}

fragment ProjectStatus on ProjectStatus {
  __typename
  description
  color
  updatedAt
  name
  position
  archivedAt
  createdAt
  type
  id
  indefinite
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query projectStatuses($after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  projectStatuses(
    after: $after
    before: $before
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
  ) {
    ...ProjectStatusConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project-update:view"] = class LinearCommand_projectUpdate extends LinearCommand {
  public static override description = "A specific project update.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "The identifier of the project update to retrieve." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_projectUpdate);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectUpdate on ProjectUpdate {
  __typename
  reactionData
  reactions {
    ...Reaction
  }
  url
  diffMarkdown
  diff
  health
  updatedAt
  project {
    id
    name
    url
  }
  archivedAt
  createdAt
  editedAt
  id
  body
  slugId
  user {
    id
    displayName
    email
  }
  isDiffHidden
  isStale
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

query projectUpdate($id: String!) {
  projectUpdate(id: $id) {
    ...ProjectUpdate
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project-update:comments"] = class LinearCommand_projectUpdate_comments extends LinearCommand {
  public static override description = "Comments associated with the project update.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "The identifier of the project update to retrieve." }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.body.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.body.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.body.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.body.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.body.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.body.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.body.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.body.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.body.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.body.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.body.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.body.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.body.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.body.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.body.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.documentContent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.issue.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectUpdate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_projectUpdate_comments);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CommentConnection on CommentConnection {
  __typename
  nodes {
    ...Comment
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Comment on Comment {
  __typename
  agentSession {
    id
  }
  url
  reactionData
  reactions {
    ...Reaction
  }
  resolvingCommentId
  documentContentId
  initiativeUpdateId
  issueId
  parentId
  projectUpdateId
  botActor {
    ...ActorBot
  }
  body
  resolvingComment {
    id
  }
  documentContent {
    ...DocumentContent
  }
  syncedWith {
    ...ExternalEntityInfo
  }
  externalThread {
    ...SyncedExternalThread
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  parent {
    id
  }
  projectUpdate {
    id
  }
  quotedText
  archivedAt
  createdAt
  resolvedAt
  editedAt
  id
  resolvingUser {
    id
    displayName
    email
  }
  user {
    id
    displayName
    email
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment SyncedExternalThread on SyncedExternalThread {
  __typename
  name
  displayName
  url
  subType
  type
  isPersonalIntegrationRequired
  isPersonalIntegrationConnected
  isConnected
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query projectUpdate_comments($id: String!, $after: String, $before: String, $filter: CommentFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  projectUpdate(id: $id) {
    comments(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CommentConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project-update:list"] = class LinearCommand_projectUpdates extends LinearCommand {
  public static override description = "All project updates.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_projectUpdates);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectUpdateConnection on ProjectUpdateConnection {
  __typename
  nodes {
    ...ProjectUpdate
  }
  pageInfo {
    ...PageInfo
  }
}

fragment ProjectUpdate on ProjectUpdate {
  __typename
  reactionData
  reactions {
    ...Reaction
  }
  url
  diffMarkdown
  diff
  health
  updatedAt
  project {
    id
    name
    url
  }
  archivedAt
  createdAt
  editedAt
  id
  body
  slugId
  user {
    id
    displayName
    email
  }
  isDiffHidden
  isStale
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query projectUpdates($after: String, $before: String, $filter: ProjectUpdateFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  projectUpdates(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
  ) {
    ...ProjectUpdateConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["project:list"] = class LinearCommand_projects extends LinearCommand {
  public static override description = "All projects.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.activityType.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.activityType.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.activityType.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.activityType.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.activityType.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.activityType.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.activityType.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.activityType.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.activityType.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.activityType.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.activityType.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.activityType.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDependedOnByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDependedOnByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDependsOnRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDependsOnRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasViolatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasViolatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.health.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.health.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.health.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.health.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.health.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.health.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.health.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.health.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.health.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.health.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.health.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.health.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.health.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.health.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.health.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.healthWithAge.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.healthWithAge.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.healthWithAge.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.healthWithAge.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.healthWithAge.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.healthWithAge.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.healthWithAge.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.healthWithAge.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lead.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.startDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.state.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.state.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.state.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.state.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.state.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.state.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.state.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.state.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.state.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.state.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.state.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.state.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.state.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.state.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.state.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.state.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.targetDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_projects);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectConnection on ProjectConnection {
  __typename
  nodes {
    ...Project
    name
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Project on Project {
  __typename
  trashed
  labelIds
  url
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  targetDate
  startDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  lastUpdate {
    id
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  completedScopeHistory
  completedIssueCountHistory
  inProgressScopeHistory
  progress
  scope
  priorityLabel
  priority
  lead {
    id
    displayName
    email
  }
  convertedFromIssue {
    id
    title
    url
  }
  color
  content
  description
  name
  slugId
  targetDateResolution
  startDateResolution
  frequencyResolution
  prioritySortOrder
  sortOrder
  status {
    id
  }
  archivedAt
  createdAt
  healthUpdatedAt
  autoArchivedAt
  canceledAt
  completedAt
  startedAt
  projectUpdateRemindersPausedUntilAt
  scopeHistory
  issueCountHistory
  id
  creator {
    id
    displayName
    email
  }
  favorite {
    id
  }
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  state
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query projects($after: String, $before: String, $filter: ProjectFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy, $sort: [ProjectSortInput!]) {
  projects(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
    sort: $sort
  ) {
    ...ProjectConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["roadmap:view"] = class LinearCommand_roadmap extends LinearCommand {
  public static override description = "One specific roadmap.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "One specific roadmap." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_roadmap);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Roadmap on Roadmap {
  __typename
  url
  description
  updatedAt
  name
  color
  slugId
  sortOrder
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  owner {
    id
    displayName
    email
  }
}

query roadmap($id: String!) {
  roadmap(id: $id) {
    ...Roadmap
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["roadmap:projects"] = class LinearCommand_roadmap_projects extends LinearCommand {
  public static override description = "Projects associated with the roadmap.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.activityType.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.activityType.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.activityType.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.activityType.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.activityType.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.activityType.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.activityType.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.activityType.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.activityType.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.activityType.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.activityType.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.activityType.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDependedOnByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDependedOnByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDependsOnRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDependsOnRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasViolatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasViolatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.health.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.health.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.health.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.health.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.health.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.health.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.health.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.health.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.health.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.health.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.health.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.health.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.health.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.health.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.health.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.healthWithAge.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.healthWithAge.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.healthWithAge.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.healthWithAge.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.healthWithAge.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.healthWithAge.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.healthWithAge.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.healthWithAge.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lead.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.startDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.state.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.state.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.state.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.state.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.state.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.state.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.state.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.state.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.state.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.state.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.state.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.state.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.state.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.state.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.state.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.state.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.targetDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_roadmap_projects);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectConnection on ProjectConnection {
  __typename
  nodes {
    ...Project
    name
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Project on Project {
  __typename
  trashed
  labelIds
  url
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  targetDate
  startDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  lastUpdate {
    id
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  completedScopeHistory
  completedIssueCountHistory
  inProgressScopeHistory
  progress
  scope
  priorityLabel
  priority
  lead {
    id
    displayName
    email
  }
  convertedFromIssue {
    id
    title
    url
  }
  color
  content
  description
  name
  slugId
  targetDateResolution
  startDateResolution
  frequencyResolution
  prioritySortOrder
  sortOrder
  status {
    id
  }
  archivedAt
  createdAt
  healthUpdatedAt
  autoArchivedAt
  canceledAt
  completedAt
  startedAt
  projectUpdateRemindersPausedUntilAt
  scopeHistory
  issueCountHistory
  id
  creator {
    id
    displayName
    email
  }
  favorite {
    id
  }
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  state
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query roadmap_projects($id: String!, $after: String, $before: String, $filter: ProjectFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  roadmap(id: $id) {
    projects(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...ProjectConnection
    }
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["roadmap:list"] = class LinearCommand_roadmaps extends LinearCommand {
  public static override description = "All roadmaps in the workspace.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_roadmaps);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment RoadmapConnection on RoadmapConnection {
  __typename
  nodes {
    ...Roadmap
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Roadmap on Roadmap {
  __typename
  url
  description
  updatedAt
  name
  color
  slugId
  sortOrder
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  owner {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query roadmaps($after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  roadmaps(
    after: $after
    before: $before
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
  ) {
    ...RoadmapConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:view"] = class LinearCommand_team extends LinearCommand {
  public static override description = "One specific team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true, description: "One specific team." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment Team on Team {
  __typename
  cycleIssueAutoAssignCompleted
  cycleLockToActive
  cycleIssueAutoAssignStarted
  cycleCalenderUrl
  upcomingCycleCount
  issueCount
  autoArchivePeriod
  autoClosePeriod
  integrationsSettings {
    id
  }
  activeCycle {
    id
  }
  triageResponsibility {
    id
  }
  scimGroupName
  autoCloseStateId
  cycleCooldownTime
  cycleStartDay
  defaultTemplateForMembers {
    id
  }
  defaultTemplateForNonMembers {
    id
  }
  defaultProjectTemplate {
    id
  }
  defaultIssueState {
    id
  }
  cycleDuration
  icon
  defaultTemplateForMembersId
  defaultTemplateForNonMembersId
  issueEstimationType
  updatedAt
  displayName
  color
  description
  name
  key
  archivedAt
  createdAt
  timezone
  id
  mergeWorkflowState {
    id
  }
  draftWorkflowState {
    id
  }
  startWorkflowState {
    id
  }
  mergeableWorkflowState {
    id
  }
  reviewWorkflowState {
    id
  }
  markedAsDuplicateWorkflowState {
    id
  }
  triageIssueState {
    id
  }
  inviteHash
  defaultIssueEstimate
  setIssueSortOrderOnStateChange
  requirePriorityToLeaveTriage
  autoCloseChildIssues
  autoCloseParentIssues
  scimManaged
  private
  inheritIssueEstimation
  inheritWorkflowStatuses
  cyclesEnabled
  issueEstimationExtended
  issueEstimationAllowZero
  aiDiscussionSummariesEnabled
  aiThreadSummariesEnabled
  groupIssueHistory
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  triageEnabled
  issueOrderingNoPriorityFirst
  issueSortOrderDefaultToBottom
}

query team($id: String!) {
  team(id: $id) {
    ...Team
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:cycles"] = class LinearCommand_team_cycles extends LinearCommand {
  public static override description = "Cycles associated with the team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.isActive.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isActive.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isFuture.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isFuture.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isInCooldown.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isInCooldown.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isNext.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isNext.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isPast.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isPast.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isPrevious.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isPrevious.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_cycles);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CycleConnection on CycleConnection {
  __typename
  nodes {
    ...Cycle
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Cycle on Cycle {
  __typename
  completedAt
  name
  inheritedFrom {
    id
  }
  description
  endsAt
  updatedAt
  completedScopeHistory
  completedIssueCountHistory
  inProgressScopeHistory
  number
  progress
  startsAt
  team {
    id
    name
  }
  autoArchivedAt
  archivedAt
  createdAt
  scopeHistory
  issueCountHistory
  id
  isActive
  isFuture
  isPast
  isNext
  isPrevious
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_cycles($id: String!, $after: String, $before: String, $filter: CycleFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  team(id: $id) {
    cycles(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...CycleConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:git-automation-states"] = class LinearCommand_team_gitAutomationStates extends LinearCommand {
  public static override description = "The Git automation states for the team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_gitAutomationStates);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment GitAutomationStateConnection on GitAutomationStateConnection {
  __typename
  nodes {
    ...GitAutomationState
  }
  pageInfo {
    ...PageInfo
  }
}

fragment GitAutomationState on GitAutomationState {
  __typename
  state {
    id
  }
  event
  updatedAt
  targetBranch {
    ...GitAutomationTargetBranch
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  branchPattern
}

fragment GitAutomationTargetBranch on GitAutomationTargetBranch {
  __typename
  updatedAt
  branchPattern
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  isRegex
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_gitAutomationStates($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  team(id: $id) {
    gitAutomationStates(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...GitAutomationStateConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:issues"] = class LinearCommand_team_issues extends LinearCommand {
  public static override description = "Issues associated with the team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    includeSubTeams: Flags.boolean({ required: false, description: "Include issues from sub-teams." }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_issues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_issues($id: String!, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $includeSubTeams: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  team(id: $id) {
    issues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      includeSubTeams: $includeSubTeams
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:labels"] = class LinearCommand_team_labels extends LinearCommand {
  public static override description = "Labels associated with the team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.isGroup.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isGroup.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.team.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_labels);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueLabelConnection on IssueLabelConnection {
  __typename
  nodes {
    ...IssueLabel
  }
  pageInfo {
    ...PageInfo
  }
}

fragment IssueLabel on IssueLabel {
  __typename
  lastAppliedAt
  color
  description
  name
  updatedAt
  inheritedFrom {
    id
  }
  parent {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  retiredBy {
    id
    displayName
    email
  }
  isGroup
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_labels($id: String!, $after: String, $before: String, $filter: IssueLabelFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  team(id: $id) {
    labels(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueLabelConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:members"] = class LinearCommand_team_members extends LinearCommand {
  public static override description = "Users who are members of this team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.active.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.active.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.admin.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.admin.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.app.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.app.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.displayName.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.displayName.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.displayName.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.displayName.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.displayName.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.displayName.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.displayName.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.displayName.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.displayName.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.displayName.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.displayName.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.displayName.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.displayName.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.displayName.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.displayName.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.displayName.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.email.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.email.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.email.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.email.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.email.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.email.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.email.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.email.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.email.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.email.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.email.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.email.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.email.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.email.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.email.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.email.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.invited.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.invited.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isInvited.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isInvited.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isMe.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isMe.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.owner.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.owner.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    includeDisabled: Flags.boolean({
      required: false,
      description: "Should query return disabled/suspended users (default: false).",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_members);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment UserConnection on UserConnection {
  __typename
  nodes {
    ...User
    displayName
    email
  }
  pageInfo {
    ...PageInfo
  }
}

fragment User on User {
  __typename
  statusUntilAt
  description
  avatarUrl
  createdIssueCount
  disableReason
  avatarBackgroundColor
  statusEmoji
  initials
  statusLabel
  updatedAt
  lastSeen
  timezone
  archivedAt
  createdAt
  id
  gitHubUserId
  displayName
  email
  name
  url
  active
  guest
  app
  admin
  owner
  isAssignable
  isMentionable
  isMe
  supportsAgentSessions
  canAccessAnyPublicTeam
  calendarHash
  inviteHash
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_members($id: String!, $after: String, $before: String, $filter: UserFilter, $first: Int, $includeArchived: Boolean, $includeDisabled: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  team(id: $id) {
    members(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      includeDisabled: $includeDisabled
      last: $last
      orderBy: $orderBy
    ) {
      ...UserConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:memberships"] = class LinearCommand_team_memberships extends LinearCommand {
  public static override description =
    "Memberships associated with the team. For easier access of the same data, use `members` query.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_memberships);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TeamMembershipConnection on TeamMembershipConnection {
  __typename
  nodes {
    ...TeamMembership
  }
  pageInfo {
    ...PageInfo
  }
}

fragment TeamMembership on TeamMembership {
  __typename
  updatedAt
  sortOrder
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
  owner
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_memberships($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  team(id: $id) {
    memberships(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TeamMembershipConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:projects"] = class LinearCommand_team_projects extends LinearCommand {
  public static override description = "Projects associated with the team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.activityType.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.activityType.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.activityType.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.activityType.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.activityType.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.activityType.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.activityType.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.activityType.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.activityType.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.activityType.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.activityType.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.activityType.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDependedOnByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDependedOnByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDependsOnRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDependsOnRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasViolatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasViolatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.health.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.health.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.health.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.health.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.health.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.health.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.health.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.health.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.health.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.health.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.health.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.health.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.health.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.health.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.health.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.healthWithAge.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.healthWithAge.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.healthWithAge.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.healthWithAge.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.healthWithAge.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.healthWithAge.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.healthWithAge.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.healthWithAge.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lead.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slugId.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.slugId.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.slugId.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.slugId.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.slugId.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.slugId.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.slugId.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.slugId.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.slugId.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.slugId.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.slugId.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.startDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.state.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.state.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.state.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.state.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.state.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.state.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.state.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.state.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.state.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.state.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.state.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.state.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.state.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.state.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.state.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.state.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.targetDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    includeSubTeams: Flags.boolean({ required: false, description: "Include projects from sub-teams." }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_projects);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment ProjectConnection on ProjectConnection {
  __typename
  nodes {
    ...Project
    name
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Project on Project {
  __typename
  trashed
  labelIds
  url
  integrationsSettings {
    id
  }
  documentContent {
    ...DocumentContent
  }
  updateRemindersDay
  targetDate
  startDate
  updateReminderFrequency
  health
  updateRemindersHour
  icon
  lastUpdate {
    id
  }
  lastAppliedTemplate {
    id
  }
  updatedAt
  updateReminderFrequencyInWeeks
  completedScopeHistory
  completedIssueCountHistory
  inProgressScopeHistory
  progress
  scope
  priorityLabel
  priority
  lead {
    id
    displayName
    email
  }
  convertedFromIssue {
    id
    title
    url
  }
  color
  content
  description
  name
  slugId
  targetDateResolution
  startDateResolution
  frequencyResolution
  prioritySortOrder
  sortOrder
  status {
    id
  }
  archivedAt
  createdAt
  healthUpdatedAt
  autoArchivedAt
  canceledAt
  completedAt
  startedAt
  projectUpdateRemindersPausedUntilAt
  scopeHistory
  issueCountHistory
  id
  creator {
    id
    displayName
    email
  }
  favorite {
    id
  }
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  state
}

fragment DocumentContent on DocumentContent {
  __typename
  aiPromptRules {
    ...AiPromptRules
  }
  content
  contentState
  document {
    id
  }
  initiative {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectMilestone {
    id
  }
  project {
    id
    name
    url
  }
  restoredAt
  archivedAt
  createdAt
  id
}

fragment AiPromptRules on AiPromptRules {
  __typename
  updatedAt
  archivedAt
  createdAt
  id
  updatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_projects($id: String!, $after: String, $before: String, $filter: ProjectFilter, $first: Int, $includeArchived: Boolean, $includeSubTeams: Boolean, $last: Int, $orderBy: PaginationOrderBy, $sort: [ProjectSortInput!]) {
  team(id: $id) {
    projects(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      includeSubTeams: $includeSubTeams
      last: $last
      orderBy: $orderBy
      sort: $sort
    ) {
      ...ProjectConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:states"] = class LinearCommand_team_states extends LinearCommand {
  public static override description = "The states that define the workflow associated with the team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.position.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.position.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.position.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.position.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.position.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.position.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.position.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.position.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.type.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.type.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.type.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.type.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.type.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.type.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.type.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.type.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.type.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.type.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.type.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.type.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.type.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.type.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.type.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.type.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_states);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment WorkflowStateConnection on WorkflowStateConnection {
  __typename
  nodes {
    ...WorkflowState
  }
  pageInfo {
    ...PageInfo
  }
}

fragment WorkflowState on WorkflowState {
  __typename
  description
  updatedAt
  position
  inheritedFrom {
    id
  }
  color
  name
  team {
    id
    name
  }
  archivedAt
  createdAt
  type
  id
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_states($id: String!, $after: String, $before: String, $filter: WorkflowStateFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  team(id: $id) {
    states(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...WorkflowStateConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:templates"] = class LinearCommand_team_templates extends LinearCommand {
  public static override description = "Templates associated with the team.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.null": Flags.boolean({ required: false, description: "Filter based on the existence of the relation." }),
    "filter.type.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.type.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.type.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.type.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.type.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.type.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.type.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.type.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.type.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.type.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.type.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.type.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.type.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.type.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.type.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.type.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_team_templates);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TemplateConnection on TemplateConnection {
  __typename
  nodes {
    ...Template
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Template on Template {
  __typename
  templateData
  description
  type
  updatedAt
  name
  inheritedFrom {
    id
  }
  sortOrder
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  creator {
    id
    displayName
    email
  }
  lastUpdatedBy {
    id
    displayName
    email
  }
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query team_templates($id: String!, $after: String, $before: String, $filter: NullableTemplateFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  team(id: $id) {
    templates(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TemplateConnection
    }
    name
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["team:list"] = class LinearCommand_teams extends LinearCommand {
  public static override description =
    "`administrableTeams`, which also includes teams whose settings can be changed by the user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.key.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.key.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.key.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.key.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.key.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.key.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.key.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.key.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.key.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.key.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.key.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.key.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.key.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.key.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.key.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.private.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.private.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_teams);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TeamConnection on TeamConnection {
  __typename
  nodes {
    ...Team
    name
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Team on Team {
  __typename
  cycleIssueAutoAssignCompleted
  cycleLockToActive
  cycleIssueAutoAssignStarted
  cycleCalenderUrl
  upcomingCycleCount
  issueCount
  autoArchivePeriod
  autoClosePeriod
  integrationsSettings {
    id
  }
  activeCycle {
    id
  }
  triageResponsibility {
    id
  }
  scimGroupName
  autoCloseStateId
  cycleCooldownTime
  cycleStartDay
  defaultTemplateForMembers {
    id
  }
  defaultTemplateForNonMembers {
    id
  }
  defaultProjectTemplate {
    id
  }
  defaultIssueState {
    id
  }
  cycleDuration
  icon
  defaultTemplateForMembersId
  defaultTemplateForNonMembersId
  issueEstimationType
  updatedAt
  displayName
  color
  description
  name
  key
  archivedAt
  createdAt
  timezone
  id
  mergeWorkflowState {
    id
  }
  draftWorkflowState {
    id
  }
  startWorkflowState {
    id
  }
  mergeableWorkflowState {
    id
  }
  reviewWorkflowState {
    id
  }
  markedAsDuplicateWorkflowState {
    id
  }
  triageIssueState {
    id
  }
  inviteHash
  defaultIssueEstimate
  setIssueSortOrderOnStateChange
  requirePriorityToLeaveTriage
  autoCloseChildIssues
  autoCloseParentIssues
  scimManaged
  private
  inheritIssueEstimation
  inheritWorkflowStatuses
  cyclesEnabled
  issueEstimationExtended
  issueEstimationAllowZero
  aiDiscussionSummariesEnabled
  aiThreadSummariesEnabled
  groupIssueHistory
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  triageEnabled
  issueOrderingNoPriorityFirst
  issueSortOrderDefaultToBottom
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query teams($after: String, $before: String, $filter: TeamFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  teams(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    last: $last
    orderBy: $orderBy
  ) {
    ...TeamConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["user:view"] = class LinearCommand_user extends LinearCommand {
  public static override description = "One specific user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({
      required: true,
      description: "The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_user);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment User on User {
  __typename
  statusUntilAt
  description
  avatarUrl
  createdIssueCount
  disableReason
  avatarBackgroundColor
  statusEmoji
  initials
  statusLabel
  updatedAt
  lastSeen
  timezone
  archivedAt
  createdAt
  id
  gitHubUserId
  displayName
  email
  name
  url
  active
  guest
  app
  admin
  owner
  isAssignable
  isMentionable
  isMe
  supportsAgentSessions
  canAccessAnyPublicTeam
  calendarHash
  inviteHash
}

query user($id: String!) {
  user(id: $id) {
    ...User
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["user:assigned-issues"] = class LinearCommand_user_assignedIssues extends LinearCommand {
  public static override description = "Issues assigned to the user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({
      required: true,
      description: "The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.",
    }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_user_assignedIssues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query user_assignedIssues($id: String!, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  user(id: $id) {
    assignedIssues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["user:created-issues"] = class LinearCommand_user_createdIssues extends LinearCommand {
  public static override description = "Issues created by the user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({
      required: true,
      description: "The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.",
    }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_user_createdIssues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query user_createdIssues($id: String!, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  user(id: $id) {
    createdIssues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["user:delegated-issues"] = class LinearCommand_user_delegatedIssues extends LinearCommand {
  public static override description = "Issues delegated to this user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({
      required: true,
      description: "The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.",
    }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_user_delegatedIssues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query user_delegatedIssues($id: String!, $after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  user(id: $id) {
    delegatedIssues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["user:drafts"] = class LinearCommand_user_drafts extends LinearCommand {
  public static override description = "The user's drafts";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({
      required: true,
      description: "The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.",
    }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_user_drafts);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DraftConnection on DraftConnection {
  __typename
  nodes {
    ...Draft
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Draft on Draft {
  __typename
  data
  parentComment {
    id
  }
  customerNeed {
    id
  }
  initiative {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  project {
    id
    name
    url
  }
  projectUpdate {
    id
  }
  team {
    id
    name
  }
  bodyData
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
  isAutogenerated
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query user_drafts($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  user(id: $id) {
    drafts(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...DraftConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["user:team-memberships"] = class LinearCommand_user_teamMemberships extends LinearCommand {
  public static override description =
    "Memberships associated with the user. For easier access of the same data, use `teams` query.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({
      required: true,
      description: "The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.",
    }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_user_teamMemberships);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TeamMembershipConnection on TeamMembershipConnection {
  __typename
  nodes {
    ...TeamMembership
  }
  pageInfo {
    ...PageInfo
  }
}

fragment TeamMembership on TeamMembership {
  __typename
  updatedAt
  sortOrder
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
  owner
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query user_teamMemberships($id: String!, $after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  user(id: $id) {
    teamMemberships(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TeamMembershipConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["user:teams"] = class LinearCommand_user_teams extends LinearCommand {
  public static override description = "Teams the user is part of.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({
      required: true,
      description: "The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.",
    }),
  };

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.key.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.key.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.key.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.key.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.key.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.key.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.key.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.key.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.key.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.key.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.key.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.key.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.key.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.key.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.key.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.private.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.private.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_user_teams);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TeamConnection on TeamConnection {
  __typename
  nodes {
    ...Team
    name
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Team on Team {
  __typename
  cycleIssueAutoAssignCompleted
  cycleLockToActive
  cycleIssueAutoAssignStarted
  cycleCalenderUrl
  upcomingCycleCount
  issueCount
  autoArchivePeriod
  autoClosePeriod
  integrationsSettings {
    id
  }
  activeCycle {
    id
  }
  triageResponsibility {
    id
  }
  scimGroupName
  autoCloseStateId
  cycleCooldownTime
  cycleStartDay
  defaultTemplateForMembers {
    id
  }
  defaultTemplateForNonMembers {
    id
  }
  defaultProjectTemplate {
    id
  }
  defaultIssueState {
    id
  }
  cycleDuration
  icon
  defaultTemplateForMembersId
  defaultTemplateForNonMembersId
  issueEstimationType
  updatedAt
  displayName
  color
  description
  name
  key
  archivedAt
  createdAt
  timezone
  id
  mergeWorkflowState {
    id
  }
  draftWorkflowState {
    id
  }
  startWorkflowState {
    id
  }
  mergeableWorkflowState {
    id
  }
  reviewWorkflowState {
    id
  }
  markedAsDuplicateWorkflowState {
    id
  }
  triageIssueState {
    id
  }
  inviteHash
  defaultIssueEstimate
  setIssueSortOrderOnStateChange
  requirePriorityToLeaveTriage
  autoCloseChildIssues
  autoCloseParentIssues
  scimManaged
  private
  inheritIssueEstimation
  inheritWorkflowStatuses
  cyclesEnabled
  issueEstimationExtended
  issueEstimationAllowZero
  aiDiscussionSummariesEnabled
  aiThreadSummariesEnabled
  groupIssueHistory
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  triageEnabled
  issueOrderingNoPriorityFirst
  issueSortOrderDefaultToBottom
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query user_teams($id: String!, $after: String, $before: String, $filter: TeamFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  user(id: $id) {
    teams(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TeamConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["user:list"] = class LinearCommand_users extends LinearCommand {
  public static override description = "All users for the organization.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.active.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.active.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.admin.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.admin.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.app.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.app.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.displayName.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.displayName.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.displayName.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.displayName.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.displayName.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.displayName.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.displayName.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.displayName.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.displayName.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.displayName.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.displayName.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.displayName.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.displayName.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.displayName.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.displayName.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.displayName.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.email.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.email.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.email.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.email.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.email.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.email.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.email.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.email.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.email.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.email.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.email.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.email.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.email.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.email.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.email.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.email.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.invited.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.invited.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isInvited.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isInvited.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.isMe.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.isMe.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.owner.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.owner.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    includeDisabled: Flags.boolean({
      required: false,
      description: "Should query return disabled/suspended users (default: false).",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_users);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment UserConnection on UserConnection {
  __typename
  nodes {
    ...User
    displayName
    email
  }
  pageInfo {
    ...PageInfo
  }
}

fragment User on User {
  __typename
  statusUntilAt
  description
  avatarUrl
  createdIssueCount
  disableReason
  avatarBackgroundColor
  statusEmoji
  initials
  statusLabel
  updatedAt
  lastSeen
  timezone
  archivedAt
  createdAt
  id
  gitHubUserId
  displayName
  email
  name
  url
  active
  guest
  app
  admin
  owner
  isAssignable
  isMentionable
  isMe
  supportsAgentSessions
  canAccessAnyPublicTeam
  calendarHash
  inviteHash
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query users($after: String, $before: String, $filter: UserFilter, $first: Int, $includeArchived: Boolean, $includeDisabled: Boolean, $last: Int, $orderBy: PaginationOrderBy, $sort: [UserSortInput!]) {
  users(
    after: $after
    before: $before
    filter: $filter
    first: $first
    includeArchived: $includeArchived
    includeDisabled: $includeDisabled
    last: $last
    orderBy: $orderBy
    sort: $sort
  ) {
    ...UserConnection
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["viewer"] = class LinearCommand_viewer extends LinearCommand {
  public static override description = "The currently authenticated user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_viewer);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment User on User {
  __typename
  statusUntilAt
  description
  avatarUrl
  createdIssueCount
  disableReason
  avatarBackgroundColor
  statusEmoji
  initials
  statusLabel
  updatedAt
  lastSeen
  timezone
  archivedAt
  createdAt
  id
  gitHubUserId
  displayName
  email
  name
  url
  active
  guest
  app
  admin
  owner
  isAssignable
  isMentionable
  isMe
  supportsAgentSessions
  canAccessAnyPublicTeam
  calendarHash
  inviteHash
}

query viewer {
  viewer {
    ...User
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["viewer:assigned-issues"] = class LinearCommand_viewer_assignedIssues extends LinearCommand {
  public static override description = "Issues assigned to the user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_viewer_assignedIssues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query viewer_assignedIssues($after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  viewer {
    assignedIssues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["viewer:created-issues"] = class LinearCommand_viewer_createdIssues extends LinearCommand {
  public static override description = "Issues created by the user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_viewer_createdIssues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query viewer_createdIssues($after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  viewer {
    createdIssues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["viewer:delegated-issues"] = class LinearCommand_viewer_delegatedIssues extends LinearCommand {
  public static override description = "Issues delegated to this user.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCycleAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.addedToCyclePeriod.eq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Equals constraint.",
    }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "In-array constraint.",
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({
      required: false,
      options: ["after", "before", "during"],
      description: "Not-equals constraint.",
    }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
      description: "Not-in-array constraint.",
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.ageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.archivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.assignee.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.autoArchivedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.autoClosedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.canceledAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.completedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.creator.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.customerCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.customerCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.customerImportantCount.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.customerImportantCount.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.customerImportantCount.in": Flags.integer({
      multiple: true,
      required: false,
      description: "In-array constraint.",
    }),
    "filter.customerImportantCount.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.customerImportantCount.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.customerImportantCount.nin": Flags.integer({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.cycle.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.cycleTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.delegate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.dueDate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.estimate.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.estimate.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.estimate.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.estimate.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.estimate.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.estimate.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.estimate.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    "filter.labels.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.lastAppliedTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.leadTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.number.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.number.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.number.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.number.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.number.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.number.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.number.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.priority.eq": Flags.integer({ required: false, description: "Equals constraint." }),
    "filter.priority.gt": Flags.integer({
      required: false,
      description: "Greater-than constraint. Matches any values that are greater than the given value.",
    }),
    "filter.priority.gte": Flags.integer({
      required: false,
      description:
        "Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.",
    }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.priority.lt": Flags.integer({
      required: false,
      description: "Less-than constraint. Matches any values that are less than the given value.",
    }),
    "filter.priority.lte": Flags.integer({
      required: false,
      description: "Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.",
    }),
    "filter.priority.neq": Flags.integer({ required: false, description: "Not-equals constraint." }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.priority.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.project.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.projectMilestone.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.recurringIssueTemplate.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.searchableContent.contains": Flags.string({
      required: false,
      description: "[Internal] Contains constraint.",
    }),
    "filter.searchableContent.notContains": Flags.string({
      required: false,
      description: "[Internal] Not-contains constraint.",
    }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Equals constraint.",
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "In-array constraint.",
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-equals constraint.",
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
      description: "Not-in-array constraint.",
    }),
    "filter.slaStatus.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.snoozedBy.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.snoozedUntilAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.sourceMetadata.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.sourceMetadata.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.sourceMetadata.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.sourceMetadata.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.startedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.title.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.title.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.title.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.title.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.title.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.title.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.title.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.title.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.title.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.title.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.title.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.title.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.title.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.title.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.title.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.triageTime.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.triagedAt.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_viewer_delegatedIssues);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssueConnection on IssueConnection {
  __typename
  nodes {
    ...Issue
    title
    url
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Issue on Issue {
  __typename
  trashed
  reactionData
  labelIds
  integrationSourceType
  url
  identifier
  priorityLabel
  previousIdentifiers
  reactions {
    ...Reaction
  }
  customerTicketCount
  branchName
  delegate {
    id
    displayName
    email
  }
  botActor {
    ...ActorBot
  }
  sourceComment {
    id
  }
  cycle {
    id
  }
  dueDate
  estimate
  syncedWith {
    ...ExternalEntityInfo
  }
  externalUserCreator {
    id
  }
  asksExternalUserRequester {
    id
  }
  asksRequester {
    id
    displayName
    email
  }
  description
  title
  number
  lastAppliedTemplate {
    id
  }
  updatedAt
  boardOrder
  prioritySortOrder
  sortOrder
  subIssueSortOrder
  parent {
    id
    title
    url
  }
  priority
  project {
    id
    name
    url
  }
  projectMilestone {
    id
  }
  recurringIssueTemplate {
    id
  }
  team {
    id
    name
  }
  archivedAt
  createdAt
  startedTriageAt
  triagedAt
  addedToCycleAt
  addedToProjectAt
  addedToTeamAt
  autoArchivedAt
  autoClosedAt
  canceledAt
  completedAt
  startedAt
  slaStartedAt
  slaBreachesAt
  slaHighRiskAt
  slaMediumRiskAt
  snoozedUntilAt
  slaType
  id
  assignee {
    id
    displayName
    email
  }
  creator {
    id
    displayName
    email
  }
  snoozedBy {
    id
    displayName
    email
  }
  favorite {
    id
  }
  state {
    id
  }
}

fragment Reaction on Reaction {
  __typename
  emoji
  comment {
    id
  }
  externalUser {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  projectUpdate {
    id
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
}

fragment ActorBot on ActorBot {
  __typename
  avatarUrl
  name
  userDisplayName
  subType
  type
  id
}

fragment ExternalEntityInfo on ExternalEntityInfo {
  __typename
  metadata {
    ... on ExternalEntityInfoGithubMetadata {
      ...ExternalEntityInfoGithubMetadata
    }
    ... on ExternalEntityInfoJiraMetadata {
      ...ExternalEntityInfoJiraMetadata
    }
    ... on ExternalEntitySlackMetadata {
      ...ExternalEntitySlackMetadata
    }
  }
  id
  service
}

fragment ExternalEntityInfoGithubMetadata on ExternalEntityInfoGithubMetadata {
  __typename
  number
  owner
  repo
}

fragment ExternalEntityInfoJiraMetadata on ExternalEntityInfoJiraMetadata {
  __typename
  issueTypeId
  projectId
  issueKey
}

fragment ExternalEntitySlackMetadata on ExternalEntitySlackMetadata {
  __typename
  messageUrl
  channelId
  channelName
  isFromSlack
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query viewer_delegatedIssues($after: String, $before: String, $filter: IssueFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  viewer {
    delegatedIssues(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...IssueConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["viewer:drafts"] = class LinearCommand_viewer_drafts extends LinearCommand {
  public static override description = "The user's drafts";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_viewer_drafts);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment DraftConnection on DraftConnection {
  __typename
  nodes {
    ...Draft
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Draft on Draft {
  __typename
  data
  parentComment {
    id
  }
  customerNeed {
    id
  }
  initiative {
    id
  }
  initiativeUpdate {
    id
  }
  issue {
    id
    title
    url
  }
  updatedAt
  project {
    id
    name
    url
  }
  projectUpdate {
    id
  }
  team {
    id
    name
  }
  bodyData
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
  isAutogenerated
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query viewer_drafts($after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  viewer {
    drafts(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...DraftConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["viewer:team-memberships"] = class LinearCommand_viewer_teamMemberships extends LinearCommand {
  public static override description =
    "Memberships associated with the user. For easier access of the same data, use `teams` query.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_viewer_teamMemberships);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TeamMembershipConnection on TeamMembershipConnection {
  __typename
  nodes {
    ...TeamMembership
  }
  pageInfo {
    ...PageInfo
  }
}

fragment TeamMembership on TeamMembership {
  __typename
  updatedAt
  sortOrder
  team {
    id
    name
  }
  archivedAt
  createdAt
  id
  user {
    id
    displayName
    email
  }
  owner
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query viewer_teamMemberships($after: String, $before: String, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  viewer {
    teamMemberships(
      after: $after
      before: $before
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TeamMembershipConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["viewer:teams"] = class LinearCommand_viewer_teams extends LinearCommand {
  public static override description = "Teams the user is part of.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false, description: "A cursor to be used with first for forward pagination" }),
    before: Flags.string({ required: false, description: "A cursor to be used with last for backward pagination." }),
    "filter.description.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.description.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.description.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.description.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.description.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.description.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.description.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.description.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.description.nin": Flags.string({
      multiple: true,
      required: false,
      description: "Not-in-array constraint.",
    }),
    "filter.description.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.description.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.description.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.description.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.description.null": Flags.boolean({
      required: false,
      description:
        "Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.",
    }),
    "filter.description.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.description.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.key.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.key.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.key.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.key.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.key.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.key.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.key.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.key.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.key.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.key.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.key.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.key.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.key.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.key.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.key.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.name.contains": Flags.string({
      required: false,
      description: "Contains constraint. Matches any values that contain the given string.",
    }),
    "filter.name.containsIgnoreCase": Flags.string({
      required: false,
      description:
        "Contains case insensitive constraint. Matches any values that contain the given string case insensitive.",
    }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({
      required: false,
      description:
        "Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.",
    }),
    "filter.name.endsWith": Flags.string({
      required: false,
      description: "Ends with constraint. Matches any values that end with the given string.",
    }),
    "filter.name.eq": Flags.string({ required: false, description: "Equals constraint." }),
    "filter.name.eqIgnoreCase": Flags.string({
      required: false,
      description: "Equals case insensitive. Matches any values that matches the given string case insensitive.",
    }),
    "filter.name.in": Flags.string({ multiple: true, required: false, description: "In-array constraint." }),
    "filter.name.neq": Flags.string({ required: false, description: "Not-equals constraint." }),
    "filter.name.neqIgnoreCase": Flags.string({
      required: false,
      description:
        "Not-equals case insensitive. Matches any values that don't match the given string case insensitive.",
    }),
    "filter.name.nin": Flags.string({ multiple: true, required: false, description: "Not-in-array constraint." }),
    "filter.name.notContains": Flags.string({
      required: false,
      description: "Doesn't contain constraint. Matches any values that don't contain the given string.",
    }),
    "filter.name.notContainsIgnoreCase": Flags.string({
      required: false,
      description:
        "Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.",
    }),
    "filter.name.notEndsWith": Flags.string({
      required: false,
      description: "Doesn't end with constraint. Matches any values that don't end with the given string.",
    }),
    "filter.name.notStartsWith": Flags.string({
      required: false,
      description: "Doesn't start with constraint. Matches any values that don't start with the given string.",
    }),
    "filter.name.startsWith": Flags.string({
      required: false,
      description: "Starts with constraint. Matches any values that start with the given string.",
    }),
    "filter.name.startsWithIgnoreCase": Flags.string({
      required: false,
      description: "Starts with case insensitive constraint. Matches any values that start with the given string.",
    }),
    "filter.parent.null": Flags.boolean({
      required: false,
      description: "Filter based on the existence of the relation.",
    }),
    "filter.private.eq": Flags.boolean({ required: false, description: "Equals constraint." }),
    "filter.private.neq": Flags.boolean({ required: false, description: "Not equals constraint." }),
    first: Flags.integer({
      required: false,
      description: "The number of items to forward paginate (used with after). Defaults to 50.",
    }),
    includeArchived: Flags.boolean({
      required: false,
      description: "Should archived resources be included (default: false)",
    }),
    last: Flags.integer({
      required: false,
      description: "The number of items to backward paginate (used with before). Defaults to 50.",
    }),
    orderBy: Flags.string({
      required: false,
      options: ["createdAt", "updatedAt"],
      description:
        "By which field should the pagination order by. Available options are createdAt (default) and updatedAt.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_viewer_teams);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment TeamConnection on TeamConnection {
  __typename
  nodes {
    ...Team
    name
  }
  pageInfo {
    ...PageInfo
  }
}

fragment Team on Team {
  __typename
  cycleIssueAutoAssignCompleted
  cycleLockToActive
  cycleIssueAutoAssignStarted
  cycleCalenderUrl
  upcomingCycleCount
  issueCount
  autoArchivePeriod
  autoClosePeriod
  integrationsSettings {
    id
  }
  activeCycle {
    id
  }
  triageResponsibility {
    id
  }
  scimGroupName
  autoCloseStateId
  cycleCooldownTime
  cycleStartDay
  defaultTemplateForMembers {
    id
  }
  defaultTemplateForNonMembers {
    id
  }
  defaultProjectTemplate {
    id
  }
  defaultIssueState {
    id
  }
  cycleDuration
  icon
  defaultTemplateForMembersId
  defaultTemplateForNonMembersId
  issueEstimationType
  updatedAt
  displayName
  color
  description
  name
  key
  archivedAt
  createdAt
  timezone
  id
  mergeWorkflowState {
    id
  }
  draftWorkflowState {
    id
  }
  startWorkflowState {
    id
  }
  mergeableWorkflowState {
    id
  }
  reviewWorkflowState {
    id
  }
  markedAsDuplicateWorkflowState {
    id
  }
  triageIssueState {
    id
  }
  inviteHash
  defaultIssueEstimate
  setIssueSortOrderOnStateChange
  requirePriorityToLeaveTriage
  autoCloseChildIssues
  autoCloseParentIssues
  scimManaged
  private
  inheritIssueEstimation
  inheritWorkflowStatuses
  cyclesEnabled
  issueEstimationExtended
  issueEstimationAllowZero
  aiDiscussionSummariesEnabled
  aiThreadSummariesEnabled
  groupIssueHistory
  slackIssueComments
  slackNewIssue
  slackIssueStatuses
  triageEnabled
  issueOrderingNoPriorityFirst
  issueSortOrderDefaultToBottom
}

fragment PageInfo on PageInfo {
  __typename
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}

query viewer_teams($after: String, $before: String, $filter: TeamFilter, $first: Int, $includeArchived: Boolean, $last: Int, $orderBy: PaginationOrderBy) {
  viewer {
    teams(
      after: $after
      before: $before
      filter: $filter
      first: $first
      includeArchived: $includeArchived
      last: $last
      orderBy: $orderBy
    ) {
      ...TeamConnection
    }
    displayName
    email
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["comment:create"] = class LinearCommand_createComment extends LinearCommand {
  public static override description = "Creates a new comment.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    body: Flags.string({ required: false, description: "The comment content in markdown format." }),
    createAsUser: Flags.string({
      required: false,
      description:
        "Create comment as a user with the provided name. This option is only available to OAuth applications creating comments in `actor=app` mode.",
    }),
    createOnSyncedSlackThread: Flags.boolean({
      required: false,
      description:
        "Flag to indicate this comment should be created on the issue's synced Slack comment thread. If no synced Slack comment thread exists, the mutation will fail.",
    }),
    displayIconUrl: Flags.string({
      required: false,
      description:
        "Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.",
    }),
    doNotSubscribeToIssue: Flags.boolean({
      required: false,
      description: "Flag to prevent auto subscription to the issue the comment is created on.",
    }),
    documentContentId: Flags.string({
      required: false,
      description: "The document content to associate the comment with.",
    }),
    id: Flags.string({
      required: false,
      description: "The identifier in UUID v4 format. If none is provided, the backend will generate one.",
    }),
    initiativeUpdateId: Flags.string({
      required: false,
      description: "The initiative update to associate the comment with.",
    }),
    issueId: Flags.string({ required: false, description: "The issue to associate the comment with." }),
    parentId: Flags.string({
      required: false,
      description: "The parent comment under which to nest a current comment.",
    }),
    postId: Flags.string({ required: false, description: "The post to associate the comment with." }),
    projectUpdateId: Flags.string({
      required: false,
      description: "The project update to associate the comment with.",
    }),
    quotedText: Flags.string({
      required: false,
      description: "The text that this comment references. Only defined for inline comments.",
    }),
    subscriberIds: Flags.string({
      multiple: true,
      required: false,
      description: "[INTERNAL] The identifiers of the users subscribing to this comment thread.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_createComment);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "input.";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment CommentPayload on CommentPayload {
  __typename
  comment {
    id
  }
  lastSyncId
  success
}

mutation createComment($input: CommentCreateInput!) {
  commentCreate(input: $input) {
    ...CommentPayload
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:create"] = class LinearCommand_createIssue extends LinearCommand {
  public static override description = "Creates a new issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    assigneeId: Flags.string({ required: false, description: "The identifier of the user to assign the issue to." }),
    createAsUser: Flags.string({
      required: false,
      description:
        "Create issue as a user with the provided name. This option is only available to OAuth applications creating issues in `actor=app` mode.",
    }),
    cycleId: Flags.string({ required: false, description: "The cycle associated with the issue." }),
    delegateId: Flags.string({
      required: false,
      description: "The identifier of the agent user to delegate the issue to.",
    }),
    description: Flags.string({ required: false, description: "The issue description in markdown format." }),
    displayIconUrl: Flags.string({
      required: false,
      description:
        "Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.",
    }),
    estimate: Flags.integer({ required: false, description: "The estimated complexity of the issue." }),
    id: Flags.string({
      required: false,
      description: "The identifier in UUID v4 format. If none is provided, the backend will generate one.",
    }),
    labelIds: Flags.string({
      multiple: true,
      required: false,
      description: "The identifiers of the issue labels associated with this ticket.",
    }),
    lastAppliedTemplateId: Flags.string({
      required: false,
      description: "The ID of the last template applied to the issue.",
    }),
    parentId: Flags.string({ required: false, description: "The identifier of the parent issue." }),
    preserveSortOrderOnCreate: Flags.boolean({
      required: false,
      description: "Whether the passed sort order should be preserved.",
    }),
    priority: Flags.integer({
      required: false,
      description: "The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.",
    }),
    prioritySortOrder: Flags.integer({
      required: false,
      description: "The position of the issue related to other issues, when ordered by priority.",
    }),
    projectId: Flags.string({ required: false, description: "The project associated with the issue." }),
    projectMilestoneId: Flags.string({
      required: false,
      description: "The project milestone associated with the issue.",
    }),
    referenceCommentId: Flags.string({ required: false, description: "The comment the issue is referencing." }),
    slaType: Flags.string({
      required: false,
      options: ["all", "onlyBusinessDays"],
      description:
        "The SLA day count type for the issue. Whether SLA should be business days only or calendar days (default).",
    }),
    sortOrder: Flags.integer({ required: false, description: "The position of the issue related to other issues." }),
    sourceCommentId: Flags.string({ required: false, description: "The comment the issue is created from." }),
    sourcePullRequestCommentId: Flags.string({
      required: false,
      description: "[Internal] The pull request comment the issue is created from.",
    }),
    stateId: Flags.string({ required: false, description: "The team state of the issue." }),
    subIssueSortOrder: Flags.integer({
      required: false,
      description: "The position of the issue in parent's sub-issue list.",
    }),
    subscriberIds: Flags.string({
      multiple: true,
      required: false,
      description: "The identifiers of the users subscribing to this ticket.",
    }),
    teamId: Flags.string({ required: true, description: "The identifier of the team associated with the issue." }),
    templateId: Flags.string({
      required: false,
      description:
        "The identifier of a template the issue should be created from. If other values are provided in the input, they will override template values.",
    }),
    title: Flags.string({ required: false, description: "The title of the issue." }),
    useDefaultTemplate: Flags.boolean({
      required: false,
      description:
        "Whether to use the default template for the team. When set to true, the default template of this team based on user's membership will be applied.",
    }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_createIssue);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "input.";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssuePayload on IssuePayload {
  __typename
  lastSyncId
  issue {
    id
    title
    url
  }
  success
}

mutation createIssue($input: IssueCreateInput!) {
  issueCreate(input: $input) {
    ...IssuePayload
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

COMMANDS["issue:update"] = class LinearCommand_updateIssue extends LinearCommand {
  public static override description = "Updates an issue.";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    id: Flags.string({ required: true, description: "The identifier of the issue to update." }),
    "input.addedLabelIds": Flags.string({
      multiple: true,
      required: false,
      description: "The identifiers of the issue labels to be added to this issue.",
    }),
    "input.assigneeId": Flags.string({
      required: false,
      description: "The identifier of the user to assign the issue to.",
    }),
    "input.autoClosedByParentClosing": Flags.boolean({
      required: false,
      description: "Whether the issue was automatically closed because its parent issue was closed.",
    }),
    "input.cycleId": Flags.string({ required: false, description: "The cycle associated with the issue." }),
    "input.delegateId": Flags.string({
      required: false,
      description: "The identifier of the agent user to delegate the issue to.",
    }),
    "input.description": Flags.string({ required: false, description: "The issue description in markdown format." }),
    "input.estimate": Flags.integer({ required: false, description: "The estimated complexity of the issue." }),
    "input.labelIds": Flags.string({
      multiple: true,
      required: false,
      description: "The identifiers of the issue labels associated with this ticket.",
    }),
    "input.lastAppliedTemplateId": Flags.string({
      required: false,
      description: "The ID of the last template applied to the issue.",
    }),
    "input.parentId": Flags.string({ required: false, description: "The identifier of the parent issue." }),
    "input.priority": Flags.integer({
      required: false,
      description: "The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.",
    }),
    "input.prioritySortOrder": Flags.integer({
      required: false,
      description: "The position of the issue related to other issues, when ordered by priority.",
    }),
    "input.projectId": Flags.string({ required: false, description: "The project associated with the issue." }),
    "input.projectMilestoneId": Flags.string({
      required: false,
      description: "The project milestone associated with the issue.",
    }),
    "input.removedLabelIds": Flags.string({
      multiple: true,
      required: false,
      description: "The identifiers of the issue labels to be removed from this issue.",
    }),
    "input.slaType": Flags.string({
      required: false,
      options: ["all", "onlyBusinessDays"],
      description:
        "The SLA day count type for the issue. Whether SLA should be business days only or calendar days (default).",
    }),
    "input.snoozedById": Flags.string({
      required: false,
      description: "The identifier of the user who snoozed the issue.",
    }),
    "input.sortOrder": Flags.integer({
      required: false,
      description: "The position of the issue related to other issues.",
    }),
    "input.stateId": Flags.string({ required: false, description: "The team state of the issue." }),
    "input.subIssueSortOrder": Flags.integer({
      required: false,
      description: "The position of the issue in parent's sub-issue list.",
    }),
    "input.subscriberIds": Flags.string({
      multiple: true,
      required: false,
      description: "The identifiers of the users subscribing to this ticket.",
    }),
    "input.teamId": Flags.string({
      required: false,
      description: "The identifier of the team associated with the issue.",
    }),
    "input.title": Flags.string({ required: false, description: "The issue title." }),
    "input.trashed": Flags.boolean({ required: false, description: "Whether the issue has been trashed." }),
  };

  public async run(): Promise<unknown> {
    const { args, flags } = await this.parse(LinearCommand_updateIssue);
    const linearClient = await this.getLinearClient();

    const rootVariableName = "";
    const variables: Record<string, unknown> = {};

    for (const [path, value] of Object.entries(args)) {
      set(variables, rootVariableName + path, value);
    }

    for (const [path, value] of Object.entries(flags)) {
      if (path.startsWith("api-") || path === "json") {
        continue;
      }

      set(variables, rootVariableName + path, value);
    }

    const query = `fragment IssuePayload on IssuePayload {
  __typename
  lastSyncId
  issue {
    id
    title
    url
  }
  success
}

mutation updateIssue($id: String!, $input: IssueUpdateInput!) {
  issueUpdate(id: $id, input: $input) {
    ...IssuePayload
  }
}
`;

    const response = await linearClient.client.rawRequest(query, variables);
    return this.render(response.data);
  }
};

export { COMMANDS };
