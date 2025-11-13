/* eslint-disable @typescript-eslint/dot-notation */
import { Args, Command, Flags } from "@oclif/core";
import set from "lodash.set";
import { LinearCommand } from "../linear_command.js";

const COMMANDS: Record<string, Command.Class> = {};

COMMANDS["comment:view"] = class LinearCommand_comment extends LinearCommand {
  public static override description = "Runs comment";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false }),
    id: Flags.string({ required: false }),
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
  public static override description = "Runs comment_children";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false }),
    id: Flags.string({ required: false }),
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.body.contains": Flags.string({ required: false }),
    "filter.body.containsIgnoreCase": Flags.string({ required: false }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.body.endsWith": Flags.string({ required: false }),
    "filter.body.eq": Flags.string({ required: false }),
    "filter.body.eqIgnoreCase": Flags.string({ required: false }),
    "filter.body.in": Flags.string({ multiple: true, required: false }),
    "filter.body.neq": Flags.string({ required: false }),
    "filter.body.neqIgnoreCase": Flags.string({ required: false }),
    "filter.body.nin": Flags.string({ multiple: true, required: false }),
    "filter.body.notContains": Flags.string({ required: false }),
    "filter.body.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.body.notEndsWith": Flags.string({ required: false }),
    "filter.body.notStartsWith": Flags.string({ required: false }),
    "filter.body.startsWith": Flags.string({ required: false }),
    "filter.body.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.documentContent.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.projectUpdate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs comment_createdIssues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false }),
    id: Flags.string({ required: false }),
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs comment_documentContent";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false }),
    id: Flags.string({ required: false }),
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
    public static override description = "Runs comment_documentContent_aiPromptRules";
    public static override enableJsonFlag = true;
    public static override examples = ["<%= config.bin %> <%= command.id %>"];

    public static override flags = {
      hash: Flags.string({ required: false }),
      id: Flags.string({ required: false }),
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
  public static override description = "Runs comment_externalThread";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    hash: Flags.string({ required: false }),
    id: Flags.string({ required: false }),
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
  public static override description = "Runs comments";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.body.contains": Flags.string({ required: false }),
    "filter.body.containsIgnoreCase": Flags.string({ required: false }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.body.endsWith": Flags.string({ required: false }),
    "filter.body.eq": Flags.string({ required: false }),
    "filter.body.eqIgnoreCase": Flags.string({ required: false }),
    "filter.body.in": Flags.string({ multiple: true, required: false }),
    "filter.body.neq": Flags.string({ required: false }),
    "filter.body.neqIgnoreCase": Flags.string({ required: false }),
    "filter.body.nin": Flags.string({ multiple: true, required: false }),
    "filter.body.notContains": Flags.string({ required: false }),
    "filter.body.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.body.notEndsWith": Flags.string({ required: false }),
    "filter.body.notStartsWith": Flags.string({ required: false }),
    "filter.body.startsWith": Flags.string({ required: false }),
    "filter.body.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.documentContent.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.projectUpdate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs cycle";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs cycle_issues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs cycle_uncompletedIssuesUponClose";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs cycles";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.isActive.eq": Flags.boolean({ required: false }),
    "filter.isActive.neq": Flags.boolean({ required: false }),
    "filter.isFuture.eq": Flags.boolean({ required: false }),
    "filter.isFuture.neq": Flags.boolean({ required: false }),
    "filter.isInCooldown.eq": Flags.boolean({ required: false }),
    "filter.isInCooldown.neq": Flags.boolean({ required: false }),
    "filter.isNext.eq": Flags.boolean({ required: false }),
    "filter.isNext.neq": Flags.boolean({ required: false }),
    "filter.isPast.eq": Flags.boolean({ required: false }),
    "filter.isPast.neq": Flags.boolean({ required: false }),
    "filter.isPrevious.eq": Flags.boolean({ required: false }),
    "filter.isPrevious.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs document";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs document_comments";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.body.contains": Flags.string({ required: false }),
    "filter.body.containsIgnoreCase": Flags.string({ required: false }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.body.endsWith": Flags.string({ required: false }),
    "filter.body.eq": Flags.string({ required: false }),
    "filter.body.eqIgnoreCase": Flags.string({ required: false }),
    "filter.body.in": Flags.string({ multiple: true, required: false }),
    "filter.body.neq": Flags.string({ required: false }),
    "filter.body.neqIgnoreCase": Flags.string({ required: false }),
    "filter.body.nin": Flags.string({ multiple: true, required: false }),
    "filter.body.notContains": Flags.string({ required: false }),
    "filter.body.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.body.notEndsWith": Flags.string({ required: false }),
    "filter.body.notStartsWith": Flags.string({ required: false }),
    "filter.body.startsWith": Flags.string({ required: false }),
    "filter.body.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.documentContent.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.projectUpdate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs documents";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs initiative";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs initiative_documentContent";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
    public static override description = "Runs initiative_documentContent_aiPromptRules";
    public static override enableJsonFlag = true;
    public static override examples = ["<%= config.bin %> <%= command.id %>"];

    public static override args = {
      id: Args.string({ required: true }),
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
  public static override description = "Runs initiative_documents";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs initiative_history";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs initiative_links";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs initiative_projects";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.activityType.contains": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.activityType.endsWith": Flags.string({ required: false }),
    "filter.activityType.eq": Flags.string({ required: false }),
    "filter.activityType.eqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false }),
    "filter.activityType.neq": Flags.string({ required: false }),
    "filter.activityType.neqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.nin": Flags.string({ multiple: true, required: false }),
    "filter.activityType.notContains": Flags.string({ required: false }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.notEndsWith": Flags.string({ required: false }),
    "filter.activityType.notStartsWith": Flags.string({ required: false }),
    "filter.activityType.startsWith": Flags.string({ required: false }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDependedOnByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDependedOnByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDependsOnRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDependsOnRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasViolatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasViolatedRelations.neq": Flags.boolean({ required: false }),
    "filter.health.contains": Flags.string({ required: false }),
    "filter.health.containsIgnoreCase": Flags.string({ required: false }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.health.endsWith": Flags.string({ required: false }),
    "filter.health.eq": Flags.string({ required: false }),
    "filter.health.eqIgnoreCase": Flags.string({ required: false }),
    "filter.health.in": Flags.string({ multiple: true, required: false }),
    "filter.health.neq": Flags.string({ required: false }),
    "filter.health.neqIgnoreCase": Flags.string({ required: false }),
    "filter.health.nin": Flags.string({ multiple: true, required: false }),
    "filter.health.notContains": Flags.string({ required: false }),
    "filter.health.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.health.notEndsWith": Flags.string({ required: false }),
    "filter.health.notStartsWith": Flags.string({ required: false }),
    "filter.health.startsWith": Flags.string({ required: false }),
    "filter.health.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.contains": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.healthWithAge.endsWith": Flags.string({ required: false }),
    "filter.healthWithAge.eq": Flags.string({ required: false }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.neq": Flags.string({ required: false }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.nin": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.notContains": Flags.string({ required: false }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.notEndsWith": Flags.string({ required: false }),
    "filter.healthWithAge.notStartsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.lead.null": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.startDate.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.state.contains": Flags.string({ required: false }),
    "filter.state.containsIgnoreCase": Flags.string({ required: false }),
    "filter.state.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.state.endsWith": Flags.string({ required: false }),
    "filter.state.eq": Flags.string({ required: false }),
    "filter.state.eqIgnoreCase": Flags.string({ required: false }),
    "filter.state.in": Flags.string({ multiple: true, required: false }),
    "filter.state.neq": Flags.string({ required: false }),
    "filter.state.neqIgnoreCase": Flags.string({ required: false }),
    "filter.state.nin": Flags.string({ multiple: true, required: false }),
    "filter.state.notContains": Flags.string({ required: false }),
    "filter.state.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.state.notEndsWith": Flags.string({ required: false }),
    "filter.state.notStartsWith": Flags.string({ required: false }),
    "filter.state.startsWith": Flags.string({ required: false }),
    "filter.state.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.targetDate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    includeSubInitiatives: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs initiative_subInitiatives";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.activityType.contains": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.activityType.endsWith": Flags.string({ required: false }),
    "filter.activityType.eq": Flags.string({ required: false }),
    "filter.activityType.eqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false }),
    "filter.activityType.neq": Flags.string({ required: false }),
    "filter.activityType.neqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.nin": Flags.string({ multiple: true, required: false }),
    "filter.activityType.notContains": Flags.string({ required: false }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.notEndsWith": Flags.string({ required: false }),
    "filter.activityType.notStartsWith": Flags.string({ required: false }),
    "filter.activityType.startsWith": Flags.string({ required: false }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.health.contains": Flags.string({ required: false }),
    "filter.health.containsIgnoreCase": Flags.string({ required: false }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.health.endsWith": Flags.string({ required: false }),
    "filter.health.eq": Flags.string({ required: false }),
    "filter.health.eqIgnoreCase": Flags.string({ required: false }),
    "filter.health.in": Flags.string({ multiple: true, required: false }),
    "filter.health.neq": Flags.string({ required: false }),
    "filter.health.neqIgnoreCase": Flags.string({ required: false }),
    "filter.health.nin": Flags.string({ multiple: true, required: false }),
    "filter.health.notContains": Flags.string({ required: false }),
    "filter.health.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.health.notEndsWith": Flags.string({ required: false }),
    "filter.health.notStartsWith": Flags.string({ required: false }),
    "filter.health.startsWith": Flags.string({ required: false }),
    "filter.health.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.contains": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.healthWithAge.endsWith": Flags.string({ required: false }),
    "filter.healthWithAge.eq": Flags.string({ required: false }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.neq": Flags.string({ required: false }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.nin": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.notContains": Flags.string({ required: false }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.notEndsWith": Flags.string({ required: false }),
    "filter.healthWithAge.notStartsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.owner.null": Flags.boolean({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.status.contains": Flags.string({ required: false }),
    "filter.status.containsIgnoreCase": Flags.string({ required: false }),
    "filter.status.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.status.endsWith": Flags.string({ required: false }),
    "filter.status.eq": Flags.string({ required: false }),
    "filter.status.eqIgnoreCase": Flags.string({ required: false }),
    "filter.status.in": Flags.string({ multiple: true, required: false }),
    "filter.status.neq": Flags.string({ required: false }),
    "filter.status.neqIgnoreCase": Flags.string({ required: false }),
    "filter.status.nin": Flags.string({ multiple: true, required: false }),
    "filter.status.notContains": Flags.string({ required: false }),
    "filter.status.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.status.notEndsWith": Flags.string({ required: false }),
    "filter.status.notStartsWith": Flags.string({ required: false }),
    "filter.status.startsWith": Flags.string({ required: false }),
    "filter.status.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.targetDate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs initiativeUpdate";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs initiativeUpdate_comments";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.body.contains": Flags.string({ required: false }),
    "filter.body.containsIgnoreCase": Flags.string({ required: false }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.body.endsWith": Flags.string({ required: false }),
    "filter.body.eq": Flags.string({ required: false }),
    "filter.body.eqIgnoreCase": Flags.string({ required: false }),
    "filter.body.in": Flags.string({ multiple: true, required: false }),
    "filter.body.neq": Flags.string({ required: false }),
    "filter.body.neqIgnoreCase": Flags.string({ required: false }),
    "filter.body.nin": Flags.string({ multiple: true, required: false }),
    "filter.body.notContains": Flags.string({ required: false }),
    "filter.body.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.body.notEndsWith": Flags.string({ required: false }),
    "filter.body.notStartsWith": Flags.string({ required: false }),
    "filter.body.startsWith": Flags.string({ required: false }),
    "filter.body.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.documentContent.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.projectUpdate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs initiativeUpdates";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs initiatives";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.activityType.contains": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.activityType.endsWith": Flags.string({ required: false }),
    "filter.activityType.eq": Flags.string({ required: false }),
    "filter.activityType.eqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false }),
    "filter.activityType.neq": Flags.string({ required: false }),
    "filter.activityType.neqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.nin": Flags.string({ multiple: true, required: false }),
    "filter.activityType.notContains": Flags.string({ required: false }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.notEndsWith": Flags.string({ required: false }),
    "filter.activityType.notStartsWith": Flags.string({ required: false }),
    "filter.activityType.startsWith": Flags.string({ required: false }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.health.contains": Flags.string({ required: false }),
    "filter.health.containsIgnoreCase": Flags.string({ required: false }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.health.endsWith": Flags.string({ required: false }),
    "filter.health.eq": Flags.string({ required: false }),
    "filter.health.eqIgnoreCase": Flags.string({ required: false }),
    "filter.health.in": Flags.string({ multiple: true, required: false }),
    "filter.health.neq": Flags.string({ required: false }),
    "filter.health.neqIgnoreCase": Flags.string({ required: false }),
    "filter.health.nin": Flags.string({ multiple: true, required: false }),
    "filter.health.notContains": Flags.string({ required: false }),
    "filter.health.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.health.notEndsWith": Flags.string({ required: false }),
    "filter.health.notStartsWith": Flags.string({ required: false }),
    "filter.health.startsWith": Flags.string({ required: false }),
    "filter.health.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.contains": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.healthWithAge.endsWith": Flags.string({ required: false }),
    "filter.healthWithAge.eq": Flags.string({ required: false }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.neq": Flags.string({ required: false }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.nin": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.notContains": Flags.string({ required: false }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.notEndsWith": Flags.string({ required: false }),
    "filter.healthWithAge.notStartsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.owner.null": Flags.boolean({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.status.contains": Flags.string({ required: false }),
    "filter.status.containsIgnoreCase": Flags.string({ required: false }),
    "filter.status.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.status.endsWith": Flags.string({ required: false }),
    "filter.status.eq": Flags.string({ required: false }),
    "filter.status.eqIgnoreCase": Flags.string({ required: false }),
    "filter.status.in": Flags.string({ multiple: true, required: false }),
    "filter.status.neq": Flags.string({ required: false }),
    "filter.status.neqIgnoreCase": Flags.string({ required: false }),
    "filter.status.nin": Flags.string({ multiple: true, required: false }),
    "filter.status.notContains": Flags.string({ required: false }),
    "filter.status.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.status.notEndsWith": Flags.string({ required: false }),
    "filter.status.notStartsWith": Flags.string({ required: false }),
    "filter.status.startsWith": Flags.string({ required: false }),
    "filter.status.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.targetDate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs issue_attachments";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.sourceType.contains": Flags.string({ required: false }),
    "filter.sourceType.containsIgnoreCase": Flags.string({ required: false }),
    "filter.sourceType.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.sourceType.endsWith": Flags.string({ required: false }),
    "filter.sourceType.eq": Flags.string({ required: false }),
    "filter.sourceType.eqIgnoreCase": Flags.string({ required: false }),
    "filter.sourceType.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceType.neq": Flags.string({ required: false }),
    "filter.sourceType.neqIgnoreCase": Flags.string({ required: false }),
    "filter.sourceType.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceType.notContains": Flags.string({ required: false }),
    "filter.sourceType.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.sourceType.notEndsWith": Flags.string({ required: false }),
    "filter.sourceType.notStartsWith": Flags.string({ required: false }),
    "filter.sourceType.startsWith": Flags.string({ required: false }),
    "filter.sourceType.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.contains": Flags.string({ required: false }),
    "filter.subtitle.containsIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.subtitle.endsWith": Flags.string({ required: false }),
    "filter.subtitle.eq": Flags.string({ required: false }),
    "filter.subtitle.eqIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.in": Flags.string({ multiple: true, required: false }),
    "filter.subtitle.neq": Flags.string({ required: false }),
    "filter.subtitle.neqIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.nin": Flags.string({ multiple: true, required: false }),
    "filter.subtitle.notContains": Flags.string({ required: false }),
    "filter.subtitle.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.notEndsWith": Flags.string({ required: false }),
    "filter.subtitle.notStartsWith": Flags.string({ required: false }),
    "filter.subtitle.null": Flags.boolean({ required: false }),
    "filter.subtitle.startsWith": Flags.string({ required: false }),
    "filter.subtitle.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.url.contains": Flags.string({ required: false }),
    "filter.url.containsIgnoreCase": Flags.string({ required: false }),
    "filter.url.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.url.endsWith": Flags.string({ required: false }),
    "filter.url.eq": Flags.string({ required: false }),
    "filter.url.eqIgnoreCase": Flags.string({ required: false }),
    "filter.url.in": Flags.string({ multiple: true, required: false }),
    "filter.url.neq": Flags.string({ required: false }),
    "filter.url.neqIgnoreCase": Flags.string({ required: false }),
    "filter.url.nin": Flags.string({ multiple: true, required: false }),
    "filter.url.notContains": Flags.string({ required: false }),
    "filter.url.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.url.notEndsWith": Flags.string({ required: false }),
    "filter.url.notStartsWith": Flags.string({ required: false }),
    "filter.url.startsWith": Flags.string({ required: false }),
    "filter.url.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_botActor";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs issue_children";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_comments";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.body.contains": Flags.string({ required: false }),
    "filter.body.containsIgnoreCase": Flags.string({ required: false }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.body.endsWith": Flags.string({ required: false }),
    "filter.body.eq": Flags.string({ required: false }),
    "filter.body.eqIgnoreCase": Flags.string({ required: false }),
    "filter.body.in": Flags.string({ multiple: true, required: false }),
    "filter.body.neq": Flags.string({ required: false }),
    "filter.body.neqIgnoreCase": Flags.string({ required: false }),
    "filter.body.nin": Flags.string({ multiple: true, required: false }),
    "filter.body.notContains": Flags.string({ required: false }),
    "filter.body.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.body.notEndsWith": Flags.string({ required: false }),
    "filter.body.notStartsWith": Flags.string({ required: false }),
    "filter.body.startsWith": Flags.string({ required: false }),
    "filter.body.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.documentContent.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.projectUpdate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_documents";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_formerAttachments";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.sourceType.contains": Flags.string({ required: false }),
    "filter.sourceType.containsIgnoreCase": Flags.string({ required: false }),
    "filter.sourceType.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.sourceType.endsWith": Flags.string({ required: false }),
    "filter.sourceType.eq": Flags.string({ required: false }),
    "filter.sourceType.eqIgnoreCase": Flags.string({ required: false }),
    "filter.sourceType.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceType.neq": Flags.string({ required: false }),
    "filter.sourceType.neqIgnoreCase": Flags.string({ required: false }),
    "filter.sourceType.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceType.notContains": Flags.string({ required: false }),
    "filter.sourceType.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.sourceType.notEndsWith": Flags.string({ required: false }),
    "filter.sourceType.notStartsWith": Flags.string({ required: false }),
    "filter.sourceType.startsWith": Flags.string({ required: false }),
    "filter.sourceType.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.contains": Flags.string({ required: false }),
    "filter.subtitle.containsIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.subtitle.endsWith": Flags.string({ required: false }),
    "filter.subtitle.eq": Flags.string({ required: false }),
    "filter.subtitle.eqIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.in": Flags.string({ multiple: true, required: false }),
    "filter.subtitle.neq": Flags.string({ required: false }),
    "filter.subtitle.neqIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.nin": Flags.string({ multiple: true, required: false }),
    "filter.subtitle.notContains": Flags.string({ required: false }),
    "filter.subtitle.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.subtitle.notEndsWith": Flags.string({ required: false }),
    "filter.subtitle.notStartsWith": Flags.string({ required: false }),
    "filter.subtitle.null": Flags.boolean({ required: false }),
    "filter.subtitle.startsWith": Flags.string({ required: false }),
    "filter.subtitle.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.url.contains": Flags.string({ required: false }),
    "filter.url.containsIgnoreCase": Flags.string({ required: false }),
    "filter.url.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.url.endsWith": Flags.string({ required: false }),
    "filter.url.eq": Flags.string({ required: false }),
    "filter.url.eqIgnoreCase": Flags.string({ required: false }),
    "filter.url.in": Flags.string({ multiple: true, required: false }),
    "filter.url.neq": Flags.string({ required: false }),
    "filter.url.neqIgnoreCase": Flags.string({ required: false }),
    "filter.url.nin": Flags.string({ multiple: true, required: false }),
    "filter.url.notContains": Flags.string({ required: false }),
    "filter.url.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.url.notEndsWith": Flags.string({ required: false }),
    "filter.url.notStartsWith": Flags.string({ required: false }),
    "filter.url.startsWith": Flags.string({ required: false }),
    "filter.url.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_formerNeeds";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.comment.null": Flags.boolean({ required: false }),
    "filter.customer.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_history";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_inverseRelations";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_labels";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.isGroup.eq": Flags.boolean({ required: false }),
    "filter.isGroup.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.team.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_needs";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.comment.null": Flags.boolean({ required: false }),
    "filter.customer.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_relations";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issue_subscribers";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.active.eq": Flags.boolean({ required: false }),
    "filter.active.neq": Flags.boolean({ required: false }),
    "filter.admin.eq": Flags.boolean({ required: false }),
    "filter.admin.neq": Flags.boolean({ required: false }),
    "filter.app.eq": Flags.boolean({ required: false }),
    "filter.app.neq": Flags.boolean({ required: false }),
    "filter.displayName.contains": Flags.string({ required: false }),
    "filter.displayName.containsIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.displayName.endsWith": Flags.string({ required: false }),
    "filter.displayName.eq": Flags.string({ required: false }),
    "filter.displayName.eqIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.in": Flags.string({ multiple: true, required: false }),
    "filter.displayName.neq": Flags.string({ required: false }),
    "filter.displayName.neqIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.nin": Flags.string({ multiple: true, required: false }),
    "filter.displayName.notContains": Flags.string({ required: false }),
    "filter.displayName.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.notEndsWith": Flags.string({ required: false }),
    "filter.displayName.notStartsWith": Flags.string({ required: false }),
    "filter.displayName.startsWith": Flags.string({ required: false }),
    "filter.displayName.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.email.contains": Flags.string({ required: false }),
    "filter.email.containsIgnoreCase": Flags.string({ required: false }),
    "filter.email.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.email.endsWith": Flags.string({ required: false }),
    "filter.email.eq": Flags.string({ required: false }),
    "filter.email.eqIgnoreCase": Flags.string({ required: false }),
    "filter.email.in": Flags.string({ multiple: true, required: false }),
    "filter.email.neq": Flags.string({ required: false }),
    "filter.email.neqIgnoreCase": Flags.string({ required: false }),
    "filter.email.nin": Flags.string({ multiple: true, required: false }),
    "filter.email.notContains": Flags.string({ required: false }),
    "filter.email.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.email.notEndsWith": Flags.string({ required: false }),
    "filter.email.notStartsWith": Flags.string({ required: false }),
    "filter.email.startsWith": Flags.string({ required: false }),
    "filter.email.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.invited.eq": Flags.boolean({ required: false }),
    "filter.invited.neq": Flags.boolean({ required: false }),
    "filter.isInvited.eq": Flags.boolean({ required: false }),
    "filter.isInvited.neq": Flags.boolean({ required: false }),
    "filter.isMe.eq": Flags.boolean({ required: false }),
    "filter.isMe.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.owner.eq": Flags.boolean({ required: false }),
    "filter.owner.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    includeDisabled: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs issues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs organization";
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
  public static override description = "Runs organization_integrations";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs organization_labels";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.isGroup.eq": Flags.boolean({ required: false }),
    "filter.isGroup.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.team.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs organization_projectLabels";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.isGroup.eq": Flags.boolean({ required: false }),
    "filter.isGroup.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs organization_subscription";
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
  public static override description = "Runs organization_teams";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.key.contains": Flags.string({ required: false }),
    "filter.key.containsIgnoreCase": Flags.string({ required: false }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.key.endsWith": Flags.string({ required: false }),
    "filter.key.eq": Flags.string({ required: false }),
    "filter.key.eqIgnoreCase": Flags.string({ required: false }),
    "filter.key.in": Flags.string({ multiple: true, required: false }),
    "filter.key.neq": Flags.string({ required: false }),
    "filter.key.neqIgnoreCase": Flags.string({ required: false }),
    "filter.key.nin": Flags.string({ multiple: true, required: false }),
    "filter.key.notContains": Flags.string({ required: false }),
    "filter.key.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.key.notEndsWith": Flags.string({ required: false }),
    "filter.key.notStartsWith": Flags.string({ required: false }),
    "filter.key.startsWith": Flags.string({ required: false }),
    "filter.key.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.private.eq": Flags.boolean({ required: false }),
    "filter.private.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs organization_templates";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.null": Flags.boolean({ required: false }),
    "filter.type.contains": Flags.string({ required: false }),
    "filter.type.containsIgnoreCase": Flags.string({ required: false }),
    "filter.type.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.type.endsWith": Flags.string({ required: false }),
    "filter.type.eq": Flags.string({ required: false }),
    "filter.type.eqIgnoreCase": Flags.string({ required: false }),
    "filter.type.in": Flags.string({ multiple: true, required: false }),
    "filter.type.neq": Flags.string({ required: false }),
    "filter.type.neqIgnoreCase": Flags.string({ required: false }),
    "filter.type.nin": Flags.string({ multiple: true, required: false }),
    "filter.type.notContains": Flags.string({ required: false }),
    "filter.type.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.type.notEndsWith": Flags.string({ required: false }),
    "filter.type.notStartsWith": Flags.string({ required: false }),
    "filter.type.startsWith": Flags.string({ required: false }),
    "filter.type.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs organization_users";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    includeDisabled: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs project_comments";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.body.contains": Flags.string({ required: false }),
    "filter.body.containsIgnoreCase": Flags.string({ required: false }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.body.endsWith": Flags.string({ required: false }),
    "filter.body.eq": Flags.string({ required: false }),
    "filter.body.eqIgnoreCase": Flags.string({ required: false }),
    "filter.body.in": Flags.string({ multiple: true, required: false }),
    "filter.body.neq": Flags.string({ required: false }),
    "filter.body.neqIgnoreCase": Flags.string({ required: false }),
    "filter.body.nin": Flags.string({ multiple: true, required: false }),
    "filter.body.notContains": Flags.string({ required: false }),
    "filter.body.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.body.notEndsWith": Flags.string({ required: false }),
    "filter.body.notStartsWith": Flags.string({ required: false }),
    "filter.body.startsWith": Flags.string({ required: false }),
    "filter.body.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.documentContent.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.projectUpdate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_documentContent";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
    public static override description = "Runs project_documentContent_aiPromptRules";
    public static override enableJsonFlag = true;
    public static override examples = ["<%= config.bin %> <%= command.id %>"];

    public static override args = {
      id: Args.string({ required: true }),
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
  public static override description = "Runs project_documents";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_externalLinks";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_history";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_initiatives";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_issues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_labels";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.isGroup.eq": Flags.boolean({ required: false }),
    "filter.isGroup.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_members";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.active.eq": Flags.boolean({ required: false }),
    "filter.active.neq": Flags.boolean({ required: false }),
    "filter.admin.eq": Flags.boolean({ required: false }),
    "filter.admin.neq": Flags.boolean({ required: false }),
    "filter.app.eq": Flags.boolean({ required: false }),
    "filter.app.neq": Flags.boolean({ required: false }),
    "filter.displayName.contains": Flags.string({ required: false }),
    "filter.displayName.containsIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.displayName.endsWith": Flags.string({ required: false }),
    "filter.displayName.eq": Flags.string({ required: false }),
    "filter.displayName.eqIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.in": Flags.string({ multiple: true, required: false }),
    "filter.displayName.neq": Flags.string({ required: false }),
    "filter.displayName.neqIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.nin": Flags.string({ multiple: true, required: false }),
    "filter.displayName.notContains": Flags.string({ required: false }),
    "filter.displayName.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.notEndsWith": Flags.string({ required: false }),
    "filter.displayName.notStartsWith": Flags.string({ required: false }),
    "filter.displayName.startsWith": Flags.string({ required: false }),
    "filter.displayName.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.email.contains": Flags.string({ required: false }),
    "filter.email.containsIgnoreCase": Flags.string({ required: false }),
    "filter.email.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.email.endsWith": Flags.string({ required: false }),
    "filter.email.eq": Flags.string({ required: false }),
    "filter.email.eqIgnoreCase": Flags.string({ required: false }),
    "filter.email.in": Flags.string({ multiple: true, required: false }),
    "filter.email.neq": Flags.string({ required: false }),
    "filter.email.neqIgnoreCase": Flags.string({ required: false }),
    "filter.email.nin": Flags.string({ multiple: true, required: false }),
    "filter.email.notContains": Flags.string({ required: false }),
    "filter.email.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.email.notEndsWith": Flags.string({ required: false }),
    "filter.email.notStartsWith": Flags.string({ required: false }),
    "filter.email.startsWith": Flags.string({ required: false }),
    "filter.email.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.invited.eq": Flags.boolean({ required: false }),
    "filter.invited.neq": Flags.boolean({ required: false }),
    "filter.isInvited.eq": Flags.boolean({ required: false }),
    "filter.isInvited.neq": Flags.boolean({ required: false }),
    "filter.isMe.eq": Flags.boolean({ required: false }),
    "filter.isMe.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.owner.eq": Flags.boolean({ required: false }),
    "filter.owner.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    includeDisabled: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_needs";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.comment.null": Flags.boolean({ required: false }),
    "filter.customer.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_projectMilestones";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.null": Flags.boolean({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.targetDate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_projectUpdates";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_relations";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs project_teams";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.key.contains": Flags.string({ required: false }),
    "filter.key.containsIgnoreCase": Flags.string({ required: false }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.key.endsWith": Flags.string({ required: false }),
    "filter.key.eq": Flags.string({ required: false }),
    "filter.key.eqIgnoreCase": Flags.string({ required: false }),
    "filter.key.in": Flags.string({ multiple: true, required: false }),
    "filter.key.neq": Flags.string({ required: false }),
    "filter.key.neqIgnoreCase": Flags.string({ required: false }),
    "filter.key.nin": Flags.string({ multiple: true, required: false }),
    "filter.key.notContains": Flags.string({ required: false }),
    "filter.key.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.key.notEndsWith": Flags.string({ required: false }),
    "filter.key.notStartsWith": Flags.string({ required: false }),
    "filter.key.startsWith": Flags.string({ required: false }),
    "filter.key.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.private.eq": Flags.boolean({ required: false }),
    "filter.private.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs projectStatus";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs projectStatuses";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs projectUpdate";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs projectUpdate_comments";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.body.contains": Flags.string({ required: false }),
    "filter.body.containsIgnoreCase": Flags.string({ required: false }),
    "filter.body.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.body.endsWith": Flags.string({ required: false }),
    "filter.body.eq": Flags.string({ required: false }),
    "filter.body.eqIgnoreCase": Flags.string({ required: false }),
    "filter.body.in": Flags.string({ multiple: true, required: false }),
    "filter.body.neq": Flags.string({ required: false }),
    "filter.body.neqIgnoreCase": Flags.string({ required: false }),
    "filter.body.nin": Flags.string({ multiple: true, required: false }),
    "filter.body.notContains": Flags.string({ required: false }),
    "filter.body.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.body.notEndsWith": Flags.string({ required: false }),
    "filter.body.notStartsWith": Flags.string({ required: false }),
    "filter.body.startsWith": Flags.string({ required: false }),
    "filter.body.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.documentContent.null": Flags.boolean({ required: false }),
    "filter.issue.null": Flags.boolean({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.projectUpdate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs projectUpdates";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs projects";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.activityType.contains": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.activityType.endsWith": Flags.string({ required: false }),
    "filter.activityType.eq": Flags.string({ required: false }),
    "filter.activityType.eqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false }),
    "filter.activityType.neq": Flags.string({ required: false }),
    "filter.activityType.neqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.nin": Flags.string({ multiple: true, required: false }),
    "filter.activityType.notContains": Flags.string({ required: false }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.notEndsWith": Flags.string({ required: false }),
    "filter.activityType.notStartsWith": Flags.string({ required: false }),
    "filter.activityType.startsWith": Flags.string({ required: false }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDependedOnByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDependedOnByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDependsOnRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDependsOnRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasViolatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasViolatedRelations.neq": Flags.boolean({ required: false }),
    "filter.health.contains": Flags.string({ required: false }),
    "filter.health.containsIgnoreCase": Flags.string({ required: false }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.health.endsWith": Flags.string({ required: false }),
    "filter.health.eq": Flags.string({ required: false }),
    "filter.health.eqIgnoreCase": Flags.string({ required: false }),
    "filter.health.in": Flags.string({ multiple: true, required: false }),
    "filter.health.neq": Flags.string({ required: false }),
    "filter.health.neqIgnoreCase": Flags.string({ required: false }),
    "filter.health.nin": Flags.string({ multiple: true, required: false }),
    "filter.health.notContains": Flags.string({ required: false }),
    "filter.health.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.health.notEndsWith": Flags.string({ required: false }),
    "filter.health.notStartsWith": Flags.string({ required: false }),
    "filter.health.startsWith": Flags.string({ required: false }),
    "filter.health.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.contains": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.healthWithAge.endsWith": Flags.string({ required: false }),
    "filter.healthWithAge.eq": Flags.string({ required: false }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.neq": Flags.string({ required: false }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.nin": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.notContains": Flags.string({ required: false }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.notEndsWith": Flags.string({ required: false }),
    "filter.healthWithAge.notStartsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.lead.null": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.startDate.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.state.contains": Flags.string({ required: false }),
    "filter.state.containsIgnoreCase": Flags.string({ required: false }),
    "filter.state.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.state.endsWith": Flags.string({ required: false }),
    "filter.state.eq": Flags.string({ required: false }),
    "filter.state.eqIgnoreCase": Flags.string({ required: false }),
    "filter.state.in": Flags.string({ multiple: true, required: false }),
    "filter.state.neq": Flags.string({ required: false }),
    "filter.state.neqIgnoreCase": Flags.string({ required: false }),
    "filter.state.nin": Flags.string({ multiple: true, required: false }),
    "filter.state.notContains": Flags.string({ required: false }),
    "filter.state.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.state.notEndsWith": Flags.string({ required: false }),
    "filter.state.notStartsWith": Flags.string({ required: false }),
    "filter.state.startsWith": Flags.string({ required: false }),
    "filter.state.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.targetDate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs roadmap";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs roadmap_projects";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.activityType.contains": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.activityType.endsWith": Flags.string({ required: false }),
    "filter.activityType.eq": Flags.string({ required: false }),
    "filter.activityType.eqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false }),
    "filter.activityType.neq": Flags.string({ required: false }),
    "filter.activityType.neqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.nin": Flags.string({ multiple: true, required: false }),
    "filter.activityType.notContains": Flags.string({ required: false }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.notEndsWith": Flags.string({ required: false }),
    "filter.activityType.notStartsWith": Flags.string({ required: false }),
    "filter.activityType.startsWith": Flags.string({ required: false }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDependedOnByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDependedOnByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDependsOnRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDependsOnRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasViolatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasViolatedRelations.neq": Flags.boolean({ required: false }),
    "filter.health.contains": Flags.string({ required: false }),
    "filter.health.containsIgnoreCase": Flags.string({ required: false }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.health.endsWith": Flags.string({ required: false }),
    "filter.health.eq": Flags.string({ required: false }),
    "filter.health.eqIgnoreCase": Flags.string({ required: false }),
    "filter.health.in": Flags.string({ multiple: true, required: false }),
    "filter.health.neq": Flags.string({ required: false }),
    "filter.health.neqIgnoreCase": Flags.string({ required: false }),
    "filter.health.nin": Flags.string({ multiple: true, required: false }),
    "filter.health.notContains": Flags.string({ required: false }),
    "filter.health.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.health.notEndsWith": Flags.string({ required: false }),
    "filter.health.notStartsWith": Flags.string({ required: false }),
    "filter.health.startsWith": Flags.string({ required: false }),
    "filter.health.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.contains": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.healthWithAge.endsWith": Flags.string({ required: false }),
    "filter.healthWithAge.eq": Flags.string({ required: false }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.neq": Flags.string({ required: false }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.nin": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.notContains": Flags.string({ required: false }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.notEndsWith": Flags.string({ required: false }),
    "filter.healthWithAge.notStartsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.lead.null": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.startDate.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.state.contains": Flags.string({ required: false }),
    "filter.state.containsIgnoreCase": Flags.string({ required: false }),
    "filter.state.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.state.endsWith": Flags.string({ required: false }),
    "filter.state.eq": Flags.string({ required: false }),
    "filter.state.eqIgnoreCase": Flags.string({ required: false }),
    "filter.state.in": Flags.string({ multiple: true, required: false }),
    "filter.state.neq": Flags.string({ required: false }),
    "filter.state.neqIgnoreCase": Flags.string({ required: false }),
    "filter.state.nin": Flags.string({ multiple: true, required: false }),
    "filter.state.notContains": Flags.string({ required: false }),
    "filter.state.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.state.notEndsWith": Flags.string({ required: false }),
    "filter.state.notStartsWith": Flags.string({ required: false }),
    "filter.state.startsWith": Flags.string({ required: false }),
    "filter.state.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.targetDate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs roadmaps";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs team_cycles";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.isActive.eq": Flags.boolean({ required: false }),
    "filter.isActive.neq": Flags.boolean({ required: false }),
    "filter.isFuture.eq": Flags.boolean({ required: false }),
    "filter.isFuture.neq": Flags.boolean({ required: false }),
    "filter.isInCooldown.eq": Flags.boolean({ required: false }),
    "filter.isInCooldown.neq": Flags.boolean({ required: false }),
    "filter.isNext.eq": Flags.boolean({ required: false }),
    "filter.isNext.neq": Flags.boolean({ required: false }),
    "filter.isPast.eq": Flags.boolean({ required: false }),
    "filter.isPast.neq": Flags.boolean({ required: false }),
    "filter.isPrevious.eq": Flags.boolean({ required: false }),
    "filter.isPrevious.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team_gitAutomationStates";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team_issues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    includeSubTeams: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team_labels";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.isGroup.eq": Flags.boolean({ required: false }),
    "filter.isGroup.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.team.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team_members";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.active.eq": Flags.boolean({ required: false }),
    "filter.active.neq": Flags.boolean({ required: false }),
    "filter.admin.eq": Flags.boolean({ required: false }),
    "filter.admin.neq": Flags.boolean({ required: false }),
    "filter.app.eq": Flags.boolean({ required: false }),
    "filter.app.neq": Flags.boolean({ required: false }),
    "filter.displayName.contains": Flags.string({ required: false }),
    "filter.displayName.containsIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.displayName.endsWith": Flags.string({ required: false }),
    "filter.displayName.eq": Flags.string({ required: false }),
    "filter.displayName.eqIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.in": Flags.string({ multiple: true, required: false }),
    "filter.displayName.neq": Flags.string({ required: false }),
    "filter.displayName.neqIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.nin": Flags.string({ multiple: true, required: false }),
    "filter.displayName.notContains": Flags.string({ required: false }),
    "filter.displayName.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.notEndsWith": Flags.string({ required: false }),
    "filter.displayName.notStartsWith": Flags.string({ required: false }),
    "filter.displayName.startsWith": Flags.string({ required: false }),
    "filter.displayName.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.email.contains": Flags.string({ required: false }),
    "filter.email.containsIgnoreCase": Flags.string({ required: false }),
    "filter.email.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.email.endsWith": Flags.string({ required: false }),
    "filter.email.eq": Flags.string({ required: false }),
    "filter.email.eqIgnoreCase": Flags.string({ required: false }),
    "filter.email.in": Flags.string({ multiple: true, required: false }),
    "filter.email.neq": Flags.string({ required: false }),
    "filter.email.neqIgnoreCase": Flags.string({ required: false }),
    "filter.email.nin": Flags.string({ multiple: true, required: false }),
    "filter.email.notContains": Flags.string({ required: false }),
    "filter.email.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.email.notEndsWith": Flags.string({ required: false }),
    "filter.email.notStartsWith": Flags.string({ required: false }),
    "filter.email.startsWith": Flags.string({ required: false }),
    "filter.email.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.invited.eq": Flags.boolean({ required: false }),
    "filter.invited.neq": Flags.boolean({ required: false }),
    "filter.isInvited.eq": Flags.boolean({ required: false }),
    "filter.isInvited.neq": Flags.boolean({ required: false }),
    "filter.isMe.eq": Flags.boolean({ required: false }),
    "filter.isMe.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.owner.eq": Flags.boolean({ required: false }),
    "filter.owner.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    includeDisabled: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team_memberships";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team_projects";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.activityType.contains": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.activityType.endsWith": Flags.string({ required: false }),
    "filter.activityType.eq": Flags.string({ required: false }),
    "filter.activityType.eqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.in": Flags.string({ multiple: true, required: false }),
    "filter.activityType.neq": Flags.string({ required: false }),
    "filter.activityType.neqIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.nin": Flags.string({ multiple: true, required: false }),
    "filter.activityType.notContains": Flags.string({ required: false }),
    "filter.activityType.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.activityType.notEndsWith": Flags.string({ required: false }),
    "filter.activityType.notStartsWith": Flags.string({ required: false }),
    "filter.activityType.startsWith": Flags.string({ required: false }),
    "filter.activityType.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDependedOnByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDependedOnByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDependsOnRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDependsOnRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasViolatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasViolatedRelations.neq": Flags.boolean({ required: false }),
    "filter.health.contains": Flags.string({ required: false }),
    "filter.health.containsIgnoreCase": Flags.string({ required: false }),
    "filter.health.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.health.endsWith": Flags.string({ required: false }),
    "filter.health.eq": Flags.string({ required: false }),
    "filter.health.eqIgnoreCase": Flags.string({ required: false }),
    "filter.health.in": Flags.string({ multiple: true, required: false }),
    "filter.health.neq": Flags.string({ required: false }),
    "filter.health.neqIgnoreCase": Flags.string({ required: false }),
    "filter.health.nin": Flags.string({ multiple: true, required: false }),
    "filter.health.notContains": Flags.string({ required: false }),
    "filter.health.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.health.notEndsWith": Flags.string({ required: false }),
    "filter.health.notStartsWith": Flags.string({ required: false }),
    "filter.health.startsWith": Flags.string({ required: false }),
    "filter.health.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.contains": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.healthWithAge.endsWith": Flags.string({ required: false }),
    "filter.healthWithAge.eq": Flags.string({ required: false }),
    "filter.healthWithAge.eqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.in": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.neq": Flags.string({ required: false }),
    "filter.healthWithAge.neqIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.nin": Flags.string({ multiple: true, required: false }),
    "filter.healthWithAge.notContains": Flags.string({ required: false }),
    "filter.healthWithAge.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.healthWithAge.notEndsWith": Flags.string({ required: false }),
    "filter.healthWithAge.notStartsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWith": Flags.string({ required: false }),
    "filter.healthWithAge.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.lead.null": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slugId.contains": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.slugId.endsWith": Flags.string({ required: false }),
    "filter.slugId.eq": Flags.string({ required: false }),
    "filter.slugId.eqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.in": Flags.string({ multiple: true, required: false }),
    "filter.slugId.neq": Flags.string({ required: false }),
    "filter.slugId.neqIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.nin": Flags.string({ multiple: true, required: false }),
    "filter.slugId.notContains": Flags.string({ required: false }),
    "filter.slugId.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.slugId.notEndsWith": Flags.string({ required: false }),
    "filter.slugId.notStartsWith": Flags.string({ required: false }),
    "filter.slugId.startsWith": Flags.string({ required: false }),
    "filter.slugId.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.startDate.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.state.contains": Flags.string({ required: false }),
    "filter.state.containsIgnoreCase": Flags.string({ required: false }),
    "filter.state.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.state.endsWith": Flags.string({ required: false }),
    "filter.state.eq": Flags.string({ required: false }),
    "filter.state.eqIgnoreCase": Flags.string({ required: false }),
    "filter.state.in": Flags.string({ multiple: true, required: false }),
    "filter.state.neq": Flags.string({ required: false }),
    "filter.state.neqIgnoreCase": Flags.string({ required: false }),
    "filter.state.nin": Flags.string({ multiple: true, required: false }),
    "filter.state.notContains": Flags.string({ required: false }),
    "filter.state.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.state.notEndsWith": Flags.string({ required: false }),
    "filter.state.notStartsWith": Flags.string({ required: false }),
    "filter.state.startsWith": Flags.string({ required: false }),
    "filter.state.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.targetDate.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    includeSubTeams: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team_states";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.position.eq": Flags.integer({ required: false }),
    "filter.position.gt": Flags.integer({ required: false }),
    "filter.position.gte": Flags.integer({ required: false }),
    "filter.position.in": Flags.integer({ multiple: true, required: false }),
    "filter.position.lt": Flags.integer({ required: false }),
    "filter.position.lte": Flags.integer({ required: false }),
    "filter.position.neq": Flags.integer({ required: false }),
    "filter.position.nin": Flags.integer({ multiple: true, required: false }),
    "filter.type.contains": Flags.string({ required: false }),
    "filter.type.containsIgnoreCase": Flags.string({ required: false }),
    "filter.type.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.type.endsWith": Flags.string({ required: false }),
    "filter.type.eq": Flags.string({ required: false }),
    "filter.type.eqIgnoreCase": Flags.string({ required: false }),
    "filter.type.in": Flags.string({ multiple: true, required: false }),
    "filter.type.neq": Flags.string({ required: false }),
    "filter.type.neqIgnoreCase": Flags.string({ required: false }),
    "filter.type.nin": Flags.string({ multiple: true, required: false }),
    "filter.type.notContains": Flags.string({ required: false }),
    "filter.type.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.type.notEndsWith": Flags.string({ required: false }),
    "filter.type.notStartsWith": Flags.string({ required: false }),
    "filter.type.startsWith": Flags.string({ required: false }),
    "filter.type.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs team_templates";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.null": Flags.boolean({ required: false }),
    "filter.type.contains": Flags.string({ required: false }),
    "filter.type.containsIgnoreCase": Flags.string({ required: false }),
    "filter.type.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.type.endsWith": Flags.string({ required: false }),
    "filter.type.eq": Flags.string({ required: false }),
    "filter.type.eqIgnoreCase": Flags.string({ required: false }),
    "filter.type.in": Flags.string({ multiple: true, required: false }),
    "filter.type.neq": Flags.string({ required: false }),
    "filter.type.neqIgnoreCase": Flags.string({ required: false }),
    "filter.type.nin": Flags.string({ multiple: true, required: false }),
    "filter.type.notContains": Flags.string({ required: false }),
    "filter.type.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.type.notEndsWith": Flags.string({ required: false }),
    "filter.type.notStartsWith": Flags.string({ required: false }),
    "filter.type.startsWith": Flags.string({ required: false }),
    "filter.type.startsWithIgnoreCase": Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs teams";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.key.contains": Flags.string({ required: false }),
    "filter.key.containsIgnoreCase": Flags.string({ required: false }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.key.endsWith": Flags.string({ required: false }),
    "filter.key.eq": Flags.string({ required: false }),
    "filter.key.eqIgnoreCase": Flags.string({ required: false }),
    "filter.key.in": Flags.string({ multiple: true, required: false }),
    "filter.key.neq": Flags.string({ required: false }),
    "filter.key.neqIgnoreCase": Flags.string({ required: false }),
    "filter.key.nin": Flags.string({ multiple: true, required: false }),
    "filter.key.notContains": Flags.string({ required: false }),
    "filter.key.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.key.notEndsWith": Flags.string({ required: false }),
    "filter.key.notStartsWith": Flags.string({ required: false }),
    "filter.key.startsWith": Flags.string({ required: false }),
    "filter.key.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.private.eq": Flags.boolean({ required: false }),
    "filter.private.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs user";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
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
  public static override description = "Runs user_assignedIssues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs user_createdIssues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs user_delegatedIssues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs user_drafts";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs user_teamMemberships";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs user_teams";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override args = {
    id: Args.string({ required: true }),
  };

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.key.contains": Flags.string({ required: false }),
    "filter.key.containsIgnoreCase": Flags.string({ required: false }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.key.endsWith": Flags.string({ required: false }),
    "filter.key.eq": Flags.string({ required: false }),
    "filter.key.eqIgnoreCase": Flags.string({ required: false }),
    "filter.key.in": Flags.string({ multiple: true, required: false }),
    "filter.key.neq": Flags.string({ required: false }),
    "filter.key.neqIgnoreCase": Flags.string({ required: false }),
    "filter.key.nin": Flags.string({ multiple: true, required: false }),
    "filter.key.notContains": Flags.string({ required: false }),
    "filter.key.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.key.notEndsWith": Flags.string({ required: false }),
    "filter.key.notStartsWith": Flags.string({ required: false }),
    "filter.key.startsWith": Flags.string({ required: false }),
    "filter.key.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.private.eq": Flags.boolean({ required: false }),
    "filter.private.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs users";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.active.eq": Flags.boolean({ required: false }),
    "filter.active.neq": Flags.boolean({ required: false }),
    "filter.admin.eq": Flags.boolean({ required: false }),
    "filter.admin.neq": Flags.boolean({ required: false }),
    "filter.app.eq": Flags.boolean({ required: false }),
    "filter.app.neq": Flags.boolean({ required: false }),
    "filter.displayName.contains": Flags.string({ required: false }),
    "filter.displayName.containsIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.displayName.endsWith": Flags.string({ required: false }),
    "filter.displayName.eq": Flags.string({ required: false }),
    "filter.displayName.eqIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.in": Flags.string({ multiple: true, required: false }),
    "filter.displayName.neq": Flags.string({ required: false }),
    "filter.displayName.neqIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.nin": Flags.string({ multiple: true, required: false }),
    "filter.displayName.notContains": Flags.string({ required: false }),
    "filter.displayName.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.displayName.notEndsWith": Flags.string({ required: false }),
    "filter.displayName.notStartsWith": Flags.string({ required: false }),
    "filter.displayName.startsWith": Flags.string({ required: false }),
    "filter.displayName.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.email.contains": Flags.string({ required: false }),
    "filter.email.containsIgnoreCase": Flags.string({ required: false }),
    "filter.email.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.email.endsWith": Flags.string({ required: false }),
    "filter.email.eq": Flags.string({ required: false }),
    "filter.email.eqIgnoreCase": Flags.string({ required: false }),
    "filter.email.in": Flags.string({ multiple: true, required: false }),
    "filter.email.neq": Flags.string({ required: false }),
    "filter.email.neqIgnoreCase": Flags.string({ required: false }),
    "filter.email.nin": Flags.string({ multiple: true, required: false }),
    "filter.email.notContains": Flags.string({ required: false }),
    "filter.email.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.email.notEndsWith": Flags.string({ required: false }),
    "filter.email.notStartsWith": Flags.string({ required: false }),
    "filter.email.startsWith": Flags.string({ required: false }),
    "filter.email.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.invited.eq": Flags.boolean({ required: false }),
    "filter.invited.neq": Flags.boolean({ required: false }),
    "filter.isInvited.eq": Flags.boolean({ required: false }),
    "filter.isInvited.neq": Flags.boolean({ required: false }),
    "filter.isMe.eq": Flags.boolean({ required: false }),
    "filter.isMe.neq": Flags.boolean({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.owner.eq": Flags.boolean({ required: false }),
    "filter.owner.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    includeDisabled: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs viewer";
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
  public static override description = "Runs viewer_assignedIssues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs viewer_createdIssues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs viewer_delegatedIssues";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.accumulatedStateUpdatedAt.null": Flags.boolean({ required: false }),
    "filter.addedToCycleAt.null": Flags.boolean({ required: false }),
    "filter.addedToCyclePeriod.eq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.in": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.neq": Flags.string({ required: false, options: ["after", "before", "during"] }),
    "filter.addedToCyclePeriod.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["after", "before", "during"],
    }),
    "filter.addedToCyclePeriod.null": Flags.boolean({ required: false }),
    "filter.ageTime.null": Flags.boolean({ required: false }),
    "filter.archivedAt.null": Flags.boolean({ required: false }),
    "filter.assignee.null": Flags.boolean({ required: false }),
    "filter.autoArchivedAt.null": Flags.boolean({ required: false }),
    "filter.autoClosedAt.null": Flags.boolean({ required: false }),
    "filter.canceledAt.null": Flags.boolean({ required: false }),
    "filter.completedAt.null": Flags.boolean({ required: false }),
    "filter.creator.null": Flags.boolean({ required: false }),
    "filter.customerCount.eq": Flags.integer({ required: false }),
    "filter.customerCount.gt": Flags.integer({ required: false }),
    "filter.customerCount.gte": Flags.integer({ required: false }),
    "filter.customerCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerCount.lt": Flags.integer({ required: false }),
    "filter.customerCount.lte": Flags.integer({ required: false }),
    "filter.customerCount.neq": Flags.integer({ required: false }),
    "filter.customerCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.eq": Flags.integer({ required: false }),
    "filter.customerImportantCount.gt": Flags.integer({ required: false }),
    "filter.customerImportantCount.gte": Flags.integer({ required: false }),
    "filter.customerImportantCount.in": Flags.integer({ multiple: true, required: false }),
    "filter.customerImportantCount.lt": Flags.integer({ required: false }),
    "filter.customerImportantCount.lte": Flags.integer({ required: false }),
    "filter.customerImportantCount.neq": Flags.integer({ required: false }),
    "filter.customerImportantCount.nin": Flags.integer({ multiple: true, required: false }),
    "filter.cycle.null": Flags.boolean({ required: false }),
    "filter.cycleTime.null": Flags.boolean({ required: false }),
    "filter.delegate.null": Flags.boolean({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.dueDate.null": Flags.boolean({ required: false }),
    "filter.estimate.eq": Flags.integer({ required: false }),
    "filter.estimate.gt": Flags.integer({ required: false }),
    "filter.estimate.gte": Flags.integer({ required: false }),
    "filter.estimate.in": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.lt": Flags.integer({ required: false }),
    "filter.estimate.lte": Flags.integer({ required: false }),
    "filter.estimate.neq": Flags.integer({ required: false }),
    "filter.estimate.nin": Flags.integer({ multiple: true, required: false }),
    "filter.estimate.null": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockedByRelations.neq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.eq": Flags.boolean({ required: false }),
    "filter.hasBlockingRelations.neq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.eq": Flags.boolean({ required: false }),
    "filter.hasDuplicateRelations.neq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.eq": Flags.boolean({ required: false }),
    "filter.hasRelatedRelations.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedAssignees.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedLabels.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedProjects.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedRelatedIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedSimilarIssues.neq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.eq": Flags.boolean({ required: false }),
    "filter.hasSuggestedTeams.neq": Flags.boolean({ required: false }),
    "filter.labels.null": Flags.boolean({ required: false }),
    "filter.lastAppliedTemplate.null": Flags.boolean({ required: false }),
    "filter.leadTime.null": Flags.boolean({ required: false }),
    "filter.number.eq": Flags.integer({ required: false }),
    "filter.number.gt": Flags.integer({ required: false }),
    "filter.number.gte": Flags.integer({ required: false }),
    "filter.number.in": Flags.integer({ multiple: true, required: false }),
    "filter.number.lt": Flags.integer({ required: false }),
    "filter.number.lte": Flags.integer({ required: false }),
    "filter.number.neq": Flags.integer({ required: false }),
    "filter.number.nin": Flags.integer({ multiple: true, required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.priority.eq": Flags.integer({ required: false }),
    "filter.priority.gt": Flags.integer({ required: false }),
    "filter.priority.gte": Flags.integer({ required: false }),
    "filter.priority.in": Flags.integer({ multiple: true, required: false }),
    "filter.priority.lt": Flags.integer({ required: false }),
    "filter.priority.lte": Flags.integer({ required: false }),
    "filter.priority.neq": Flags.integer({ required: false }),
    "filter.priority.nin": Flags.integer({ multiple: true, required: false }),
    "filter.priority.null": Flags.boolean({ required: false }),
    "filter.project.null": Flags.boolean({ required: false }),
    "filter.projectMilestone.null": Flags.boolean({ required: false }),
    "filter.recurringIssueTemplate.null": Flags.boolean({ required: false }),
    "filter.searchableContent.contains": Flags.string({ required: false }),
    "filter.searchableContent.notContains": Flags.string({ required: false }),
    "filter.slaStatus.eq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.in": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.neq": Flags.string({
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.nin": Flags.string({
      multiple: true,
      required: false,
      options: ["Breached", "Completed", "Failed", "HighRisk", "LowRisk", "MediumRisk"],
    }),
    "filter.slaStatus.null": Flags.boolean({ required: false }),
    "filter.snoozedBy.null": Flags.boolean({ required: false }),
    "filter.snoozedUntilAt.null": Flags.boolean({ required: false }),
    "filter.sourceMetadata.eq": Flags.string({ required: false }),
    "filter.sourceMetadata.in": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.neq": Flags.string({ required: false }),
    "filter.sourceMetadata.nin": Flags.string({ multiple: true, required: false }),
    "filter.sourceMetadata.null": Flags.boolean({ required: false }),
    "filter.startedAt.null": Flags.boolean({ required: false }),
    "filter.title.contains": Flags.string({ required: false }),
    "filter.title.containsIgnoreCase": Flags.string({ required: false }),
    "filter.title.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.title.endsWith": Flags.string({ required: false }),
    "filter.title.eq": Flags.string({ required: false }),
    "filter.title.eqIgnoreCase": Flags.string({ required: false }),
    "filter.title.in": Flags.string({ multiple: true, required: false }),
    "filter.title.neq": Flags.string({ required: false }),
    "filter.title.neqIgnoreCase": Flags.string({ required: false }),
    "filter.title.nin": Flags.string({ multiple: true, required: false }),
    "filter.title.notContains": Flags.string({ required: false }),
    "filter.title.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.title.notEndsWith": Flags.string({ required: false }),
    "filter.title.notStartsWith": Flags.string({ required: false }),
    "filter.title.startsWith": Flags.string({ required: false }),
    "filter.title.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.triageTime.null": Flags.boolean({ required: false }),
    "filter.triagedAt.null": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs viewer_drafts";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs viewer_teamMemberships";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs viewer_teams";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    after: Flags.string({ required: false }),
    before: Flags.string({ required: false }),
    "filter.description.contains": Flags.string({ required: false }),
    "filter.description.containsIgnoreCase": Flags.string({ required: false }),
    "filter.description.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.description.endsWith": Flags.string({ required: false }),
    "filter.description.eq": Flags.string({ required: false }),
    "filter.description.eqIgnoreCase": Flags.string({ required: false }),
    "filter.description.in": Flags.string({ multiple: true, required: false }),
    "filter.description.neq": Flags.string({ required: false }),
    "filter.description.neqIgnoreCase": Flags.string({ required: false }),
    "filter.description.nin": Flags.string({ multiple: true, required: false }),
    "filter.description.notContains": Flags.string({ required: false }),
    "filter.description.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.description.notEndsWith": Flags.string({ required: false }),
    "filter.description.notStartsWith": Flags.string({ required: false }),
    "filter.description.null": Flags.boolean({ required: false }),
    "filter.description.startsWith": Flags.string({ required: false }),
    "filter.description.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.key.contains": Flags.string({ required: false }),
    "filter.key.containsIgnoreCase": Flags.string({ required: false }),
    "filter.key.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.key.endsWith": Flags.string({ required: false }),
    "filter.key.eq": Flags.string({ required: false }),
    "filter.key.eqIgnoreCase": Flags.string({ required: false }),
    "filter.key.in": Flags.string({ multiple: true, required: false }),
    "filter.key.neq": Flags.string({ required: false }),
    "filter.key.neqIgnoreCase": Flags.string({ required: false }),
    "filter.key.nin": Flags.string({ multiple: true, required: false }),
    "filter.key.notContains": Flags.string({ required: false }),
    "filter.key.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.key.notEndsWith": Flags.string({ required: false }),
    "filter.key.notStartsWith": Flags.string({ required: false }),
    "filter.key.startsWith": Flags.string({ required: false }),
    "filter.key.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.name.contains": Flags.string({ required: false }),
    "filter.name.containsIgnoreCase": Flags.string({ required: false }),
    "filter.name.containsIgnoreCaseAndAccent": Flags.string({ required: false }),
    "filter.name.endsWith": Flags.string({ required: false }),
    "filter.name.eq": Flags.string({ required: false }),
    "filter.name.eqIgnoreCase": Flags.string({ required: false }),
    "filter.name.in": Flags.string({ multiple: true, required: false }),
    "filter.name.neq": Flags.string({ required: false }),
    "filter.name.neqIgnoreCase": Flags.string({ required: false }),
    "filter.name.nin": Flags.string({ multiple: true, required: false }),
    "filter.name.notContains": Flags.string({ required: false }),
    "filter.name.notContainsIgnoreCase": Flags.string({ required: false }),
    "filter.name.notEndsWith": Flags.string({ required: false }),
    "filter.name.notStartsWith": Flags.string({ required: false }),
    "filter.name.startsWith": Flags.string({ required: false }),
    "filter.name.startsWithIgnoreCase": Flags.string({ required: false }),
    "filter.parent.null": Flags.boolean({ required: false }),
    "filter.private.eq": Flags.boolean({ required: false }),
    "filter.private.neq": Flags.boolean({ required: false }),
    first: Flags.integer({ required: false }),
    includeArchived: Flags.boolean({ required: false }),
    last: Flags.integer({ required: false }),
    orderBy: Flags.string({ required: false, options: ["createdAt", "updatedAt"] }),
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
  public static override description = "Runs createComment";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    body: Flags.string({ required: false }),
    createAsUser: Flags.string({ required: false }),
    createOnSyncedSlackThread: Flags.boolean({ required: false }),
    displayIconUrl: Flags.string({ required: false }),
    doNotSubscribeToIssue: Flags.boolean({ required: false }),
    documentContentId: Flags.string({ required: false }),
    id: Flags.string({ required: false }),
    initiativeUpdateId: Flags.string({ required: false }),
    issueId: Flags.string({ required: false }),
    parentId: Flags.string({ required: false }),
    postId: Flags.string({ required: false }),
    projectUpdateId: Flags.string({ required: false }),
    quotedText: Flags.string({ required: false }),
    subscriberIds: Flags.string({ multiple: true, required: false }),
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
  public static override description = "Runs createIssue";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    assigneeId: Flags.string({ required: false }),
    createAsUser: Flags.string({ required: false }),
    cycleId: Flags.string({ required: false }),
    delegateId: Flags.string({ required: false }),
    description: Flags.string({ required: false }),
    displayIconUrl: Flags.string({ required: false }),
    estimate: Flags.integer({ required: false }),
    id: Flags.string({ required: false }),
    labelIds: Flags.string({ multiple: true, required: false }),
    lastAppliedTemplateId: Flags.string({ required: false }),
    parentId: Flags.string({ required: false }),
    preserveSortOrderOnCreate: Flags.boolean({ required: false }),
    priority: Flags.integer({ required: false }),
    prioritySortOrder: Flags.integer({ required: false }),
    projectId: Flags.string({ required: false }),
    projectMilestoneId: Flags.string({ required: false }),
    referenceCommentId: Flags.string({ required: false }),
    slaType: Flags.string({ required: false, options: ["all", "onlyBusinessDays"] }),
    sortOrder: Flags.integer({ required: false }),
    sourceCommentId: Flags.string({ required: false }),
    sourcePullRequestCommentId: Flags.string({ required: false }),
    stateId: Flags.string({ required: false }),
    subIssueSortOrder: Flags.integer({ required: false }),
    subscriberIds: Flags.string({ multiple: true, required: false }),
    teamId: Flags.string({ required: true }),
    templateId: Flags.string({ required: false }),
    title: Flags.string({ required: false }),
    useDefaultTemplate: Flags.boolean({ required: false }),
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
  public static override description = "Runs updateIssue";
  public static override enableJsonFlag = true;
  public static override examples = ["<%= config.bin %> <%= command.id %>"];

  public static override flags = {
    id: Flags.string({ required: true }),
    "input.addedLabelIds": Flags.string({ multiple: true, required: false }),
    "input.assigneeId": Flags.string({ required: false }),
    "input.autoClosedByParentClosing": Flags.boolean({ required: false }),
    "input.cycleId": Flags.string({ required: false }),
    "input.delegateId": Flags.string({ required: false }),
    "input.description": Flags.string({ required: false }),
    "input.estimate": Flags.integer({ required: false }),
    "input.labelIds": Flags.string({ multiple: true, required: false }),
    "input.lastAppliedTemplateId": Flags.string({ required: false }),
    "input.parentId": Flags.string({ required: false }),
    "input.priority": Flags.integer({ required: false }),
    "input.prioritySortOrder": Flags.integer({ required: false }),
    "input.projectId": Flags.string({ required: false }),
    "input.projectMilestoneId": Flags.string({ required: false }),
    "input.removedLabelIds": Flags.string({ multiple: true, required: false }),
    "input.slaType": Flags.string({ required: false, options: ["all", "onlyBusinessDays"] }),
    "input.snoozedById": Flags.string({ required: false }),
    "input.sortOrder": Flags.integer({ required: false }),
    "input.stateId": Flags.string({ required: false }),
    "input.subIssueSortOrder": Flags.integer({ required: false }),
    "input.subscriberIds": Flags.string({ multiple: true, required: false }),
    "input.teamId": Flags.string({ required: false }),
    "input.title": Flags.string({ required: false }),
    "input.trashed": Flags.boolean({ required: false }),
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
