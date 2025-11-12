/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render as inkRender, Box, Text } from "ink";
import InkLink from "ink-link";
import { formatDistanceToNow } from "date-fns";
import { TitledBox, titleStyles } from "@mishieck/ink-titled-box";
import { marked } from "marked";
import { markedTerminal } from "marked-terminal";

// Configure marked to use terminal renderer
marked.use(markedTerminal() as any);

/**
 * Generic Markdown component that renders markdown text to terminal format.
 */
function Markdown({ children }: { children: string }) {
  const rendered = marked(children) as string;
  // Remove trailing newline added by marked
  const trimmed = rendered.replace(/\n$/, "");
  return <Text>{trimmed}</Text>;
}

/**
 * Column definition for the DataTable component.
 */
interface TableColumn<T> {
  header: string;
  width: number;
  render: (row: T, index: number) => React.ReactNode;
}

/**
 * Generic table component for rendering data in columns.
 */
function DataTable<T>({ columns, data }: { columns: TableColumn<T>[]; data: T[] }) {
  return (
    <Box flexDirection="column">
      {/* Table Header */}
      <Box>
        {columns.map((column, index) => (
          <Box key={index} width={column.width}>
            <Text bold underline>
              {column.header}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Table Rows */}
      {data.map((row, rowIndex) => (
        <Box key={rowIndex}>
          {columns.map((column, colIndex) => (
            <Box key={colIndex} width={column.width}>
              {column.render(row, rowIndex)}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

/**
 * Renders an Issue using Ink components.
 *
 * @param issue - The Issue object to render
 */
export function renderIssue(issue: any): void {
  const IssueComponent = () => (
    <TitledBox
      titles={[issue.identifier, issue.title]}
      flexDirection="column"
      padding={1}
      borderStyle="bold"
      titleStyles={titleStyles.pill}
    >
      {/* Status line */}
      <Box marginBottom={1}>
        <Text color={issue.completedAt ? "magenta" : "green"}>{issue.completedAt ? "Closed" : "Open"}</Text>
        {issue.creator && (
          <>
            <Text dimColor> • </Text>
            <Text>
              {issue.creator.displayName} opened {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
            </Text>
          </>
        )}
      </Box>

      {/* Priority */}
      {issue.priorityLabel && (
        <Box>
          <Text bold>Priority: </Text>
          <Text>{issue.priorityLabel}</Text>
        </Box>
      )}

      {/* Assignee */}
      {issue.assignee && (
        <Box>
          <Text bold>Assignee: </Text>
          <Text>{issue.assignee.displayName}</Text>
        </Box>
      )}

      {/* Project */}
      {issue.project && (
        <Box>
          <Text bold>Project: </Text>
          <InkLink url={issue.project.url}>
            <Text>{issue.project.name}</Text>
          </InkLink>
        </Box>
      )}

      {/* Description */}
      {issue.description && (
        <Box marginTop={2} flexDirection="column">
          <Box paddingLeft={2}>
            <Markdown>{issue.description}</Markdown>
          </Box>
        </Box>
      )}

      {/* Footer with URL */}
      <Box marginTop={1}>
        <Text dimColor>View this issue on Linear: </Text>
        <InkLink url={issue.url}>
          <Text color="cyan">{issue.url}</Text>
        </InkLink>
      </Box>
    </TitledBox>
  );

  inkRender(<IssueComponent />);
}

/**
 * Renders a Project using Ink components.
 *
 * @param project - The Project object to render
 */
export function renderProject(project: any): void {
  const getProjectStateInfo = () => {
    if (project.completedAt) {
      return { label: "Completed", color: "green" as const };
    }
    if (project.canceledAt) {
      return { label: "Canceled", color: "red" as const };
    }
    if (project.startedAt) {
      return { label: "Started", color: "yellow" as const };
    }
    // Map state string to display
    const stateMap: Record<string, string> = {
      backlog: "Backlog",
      planned: "Planned",
      started: "Started",
      paused: "Paused",
      completed: "Completed",
      canceled: "Canceled",
    };
    return { label: stateMap[project.state] || project.state, color: undefined };
  };

  const ProjectComponent = () => {
    const stateInfo = getProjectStateInfo();
    const progressPercent = Math.round((project.progress || 0) * 100);

    return (
      <TitledBox
        titles={[project.name]}
        flexDirection="column"
        padding={1}
        borderStyle="bold"
        titleStyles={titleStyles.pill}
      >
        {/* Status line */}
        <Box marginBottom={1}>
          <Text color={stateInfo.color}>{stateInfo.label}</Text>
          {project.creator && (
            <>
              <Text dimColor> • </Text>
              <Text>
                {project.creator.displayName} created{" "}
                {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
              </Text>
            </>
          )}
        </Box>

        {/* Progress and Scope */}
        <Box>
          <Text bold>Progress: </Text>
          <Text>{progressPercent}%</Text>
          <Text> | </Text>
          <Text bold>Scope: </Text>
          <Text>{project.scope || 0} issues</Text>
        </Box>

        {/* Priority */}
        {project.priorityLabel && (
          <Box>
            <Text bold>Priority: </Text>
            <Text>{project.priorityLabel}</Text>
          </Box>
        )}

        {/* Lead */}
        {project.lead && (
          <Box>
            <Text bold>Lead: </Text>
            <Text>{project.lead.displayName}</Text>
          </Box>
        )}

        {/* Description */}
        {project.description && (
          <Box marginTop={2} flexDirection="column">
            <Box paddingLeft={2}>
              <Markdown>{project.description}</Markdown>
            </Box>
          </Box>
        )}

        {/* Footer with URL */}
        <Box marginTop={1}>
          <Text dimColor>View this project on Linear: </Text>
          <InkLink url={project.url}>
            <Text color="cyan">{project.url}</Text>
          </InkLink>
        </Box>
      </TitledBox>
    );
  };

  inkRender(<ProjectComponent />);
}

/**
 * Renders a ProjectConnection (list of projects) as a table.
 *
 * @param connection - The ProjectConnection object to render
 */
export function renderProjectConnection(connection: any): void {
  const nodes = connection.nodes || [];

  const healthColors: Record<string, string> = {
    onTrack: "green",
    atRisk: "yellow",
    offTrack: "red",
  };

  const columns: TableColumn<any>[] = [
    {
      header: "NAME",
      width: 30,
      render: (project: any) => (
        <InkLink url={project.url}>
          <Text bold>{project.name}</Text>
        </InkLink>
      ),
    },
    {
      header: "LEAD",
      width: 20,
      render: (project: any) => <Text>{project.lead?.displayName || "-"}</Text>,
    },
    {
      header: "HEALTH",
      width: 12,
      render: (project: any) => {
        const healthLabels: Record<string, string> = {
          onTrack: "On Track",
          atRisk: "At Risk",
          offTrack: "Off Track",
        };
        const color = healthColors[project.health] || undefined;
        const label = healthLabels[project.health] || project.health || "-";
        return <Text color={color}>{label}</Text>;
      },
    },
    {
      header: "PROGRESS",
      width: 10,
      render: (project: any) => {
        const progressPercent = Math.round((project.progress || 0) * 100);
        return <Text>{progressPercent}%</Text>;
      },
    },
    {
      header: "UPDATED",
      width: 20,
      render: (project: any) => (
        <Text dimColor>{formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}</Text>
      ),
    },
  ];

  const ProjectTableComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      <DataTable columns={columns} data={nodes} />
    </Box>
  );

  inkRender(<ProjectTableComponent />);
}

/**
 * Renders a User using Ink components.
 *
 * @param user - The User object to render
 */
export function renderUser(user: any): void {
  const getRoleInfo = () => {
    if (user.owner) {
      return { label: "Owner", color: "magenta" as const };
    } else if (user.admin) {
      return { label: "Admin", color: "yellow" as const };
    } else if (user.guest) {
      return { label: "Guest", color: "blue" as const };
    } else if (user.app) {
      return { label: "App", color: "cyan" as const };
    } else {
      return { label: "Member", color: undefined };
    }
  };

  const UserComponent = () => {
    const roleInfo = getRoleInfo();

    return (
      <TitledBox
        titles={[user.displayName]}
        flexDirection="column"
        padding={1}
        borderStyle="bold"
        titleStyles={titleStyles.pill}
      >
        {/* Role and Status */}
        <Box marginBottom={1}>
          <Text color={roleInfo.color}>{roleInfo.label}</Text>
          {!user.active && (
            <>
              <Text dimColor> • </Text>
              <Text color="red">Inactive</Text>
            </>
          )}
        </Box>

        {/* Email */}
        <Box>
          <Text bold>Email: </Text>
          <Text>{user.email}</Text>
        </Box>

        {/* Timezone */}
        {user.timezone && (
          <Box>
            <Text bold>Timezone: </Text>
            <Text>{user.timezone}</Text>
          </Box>
        )}

        {/* Last Seen */}
        {user.lastSeen && (
          <Box>
            <Text bold>Last seen: </Text>
            <Text>{formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true })}</Text>
          </Box>
        )}

        {/* Created Issues Count */}
        {user.createdIssueCount !== undefined && (
          <Box>
            <Text bold>Created issues: </Text>
            <Text>{user.createdIssueCount}</Text>
          </Box>
        )}

        {/* Description */}
        {user.description && (
          <Box marginTop={2} flexDirection="column">
            <Box paddingLeft={2}>
              <Markdown>{user.description}</Markdown>
            </Box>
          </Box>
        )}

        {/* Footer with URL */}
        <Box marginTop={1}>
          <Text dimColor>View this profile on Linear: </Text>
          <InkLink url={user.url}>
            <Text color="cyan">{user.url}</Text>
          </InkLink>
        </Box>
      </TitledBox>
    );
  };

  inkRender(<UserComponent />);
}

/**
 * Get user role with color.
 */
function getUserRole(user: any) {
  if (user.owner) {
    return { label: "Owner", color: "magenta" as const };
  } else if (user.admin) {
    return { label: "Admin", color: "yellow" as const };
  } else if (user.guest) {
    return { label: "Guest", color: "blue" as const };
  } else if (user.app) {
    return { label: "App", color: "cyan" as const };
  } else {
    return { label: "Member", color: undefined };
  }
}

/**
 * Renders a UserConnection (list of users) as a table.
 *
 * @param connection - The UserConnection object to render
 */
export function renderUserConnection(connection: any): void {
  const nodes = connection.nodes || [];
  const totalUsers = nodes.length;
  const activeUsers = nodes.filter((user: any) => user.active);

  // Define table columns
  const columns: TableColumn<any>[] = [
    {
      header: "NAME",
      width: 25,
      render: user => (
        <InkLink url={user.url}>
          <Text color="green">{truncateText(user.displayName, 25)}</Text>
        </InkLink>
      ),
    },
    {
      header: "EMAIL",
      width: 30,
      render: user => <Text>{truncateText(user.email, 30)}</Text>,
    },
    {
      header: "ROLE",
      width: 10,
      render: user => {
        const role = getUserRole(user);
        return <Text color={role.color}>{role.label}</Text>;
      },
    },
    {
      header: "STATUS",
      width: 10,
      render: user => <Text color={user.active ? "green" : "red"}>{user.active ? "Active" : "Inactive"}</Text>,
    },
    {
      header: "LAST SEEN",
      width: 20,
      render: user => (
        <Text dimColor>
          {user.lastSeen ? formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true }) : "Never"}
        </Text>
      ),
    },
  ];

  const UserListComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text dimColor>
          Showing {totalUsers} of {totalUsers} users ({activeUsers.length} active)
        </Text>
      </Box>
      <DataTable columns={columns} data={nodes} />
    </Box>
  );

  inkRender(<UserListComponent />);
}

/**
 * Renders a CommentConnection (list of comments) as a thread.
 *
 * @param connection - The CommentConnection object to render
 */
export function renderCommentConnection(connection: any): void {
  const nodes = connection.nodes || [];
  const totalComments = nodes.length;

  // Build a map of comments by ID for easy lookup
  const commentMap = new Map();
  for (const comment of nodes) {
    commentMap.set(comment.id, comment);
  }

  // Separate top-level comments from replies
  const topLevelComments = nodes.filter((comment: any) => !comment.parentId);
  const replies = nodes.filter((comment: any) => comment.parentId);

  // Group replies by parent ID
  const repliesByParent = new Map();
  for (const reply of replies) {
    if (!repliesByParent.has(reply.parentId)) {
      repliesByParent.set(reply.parentId, []);
    }
    repliesByParent.get(reply.parentId).push(reply);
  }

  const CommentItem = ({ comment, depth = 0 }: { comment: any; depth?: number }) => {
    const childReplies = repliesByParent.get(comment.id) || [];
    const reactionSummary =
      comment.reactionData && comment.reactionData.length > 0
        ? comment.reactionData.map((r: any) => `${r.emoji} ${r.reactions.length}`).join(" ")
        : null;

    const authorName = comment.user?.displayName || "Unknown";
    const timestamp = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

    return (
      <Box flexDirection="column" marginLeft={depth * 4}>
        <TitledBox titles={[authorName]} borderStyle="round" padding={depth === 0 ? 1 : 0}>
          <Box flexDirection="column">
            {/* Timestamp and edited status */}
            <Box marginBottom={1}>
              <Text dimColor>{timestamp}</Text>
              {comment.editedAt && (
                <>
                  <Text dimColor> • </Text>
                  <Text dimColor italic>
                    edited
                  </Text>
                </>
              )}
            </Box>

            {/* Comment body */}
            <Box>
              <Markdown>{comment.body}</Markdown>
            </Box>

            {/* Reactions */}
            {reactionSummary && (
              <Box marginTop={1}>
                <Text dimColor>{reactionSummary}</Text>
              </Box>
            )}
          </Box>
        </TitledBox>

        {/* Replies */}
        {childReplies.length > 0 && (
          <Box flexDirection="column" marginTop={1}>
            {childReplies.map((reply: any) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </Box>
        )}

        {/* Separator between top-level comments */}
        {depth === 0 && <Box marginBottom={1} />}
      </Box>
    );
  };

  const CommentThreadComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text dimColor>
          {totalComments} {totalComments === 1 ? "comment" : "comments"}
        </Text>
      </Box>

      {topLevelComments.map((comment: any) => (
        <CommentItem key={comment.id} comment={comment} depth={0} />
      ))}
    </Box>
  );

  inkRender(<CommentThreadComponent />);
}

/**
 * Renders a ProjectUpdate using Ink components.
 *
 * @param projectUpdate - The ProjectUpdate object to render
 */
export function renderProjectUpdate(projectUpdate: any): void {
  const healthColors: Record<string, string> = {
    onTrack: "green",
    atRisk: "yellow",
    offTrack: "red",
  };

  const healthLabels: Record<string, string> = {
    onTrack: "On Track",
    atRisk: "At Risk",
    offTrack: "Off Track",
  };

  const healthColor = healthColors[projectUpdate.health] || "gray";
  const healthLabel = healthLabels[projectUpdate.health] || projectUpdate.health;

  const reactionSummary =
    projectUpdate.reactionData && projectUpdate.reactionData.length > 0
      ? projectUpdate.reactionData.map((r: any) => `${r.emoji} ${r.reactions.length}`).join(" ")
      : null;

  const ProjectUpdateComponent = () => (
    <TitledBox
      titles={[projectUpdate.project?.name || "Project Update"]}
      flexDirection="column"
      padding={1}
      borderStyle="bold"
      titleStyles={titleStyles.pill}
    >
      {/* Health and author line */}
      <Box marginBottom={1}>
        <Text color={healthColor}>{healthLabel}</Text>
        {projectUpdate.user && (
          <>
            <Text dimColor> • </Text>
            <Text>
              {projectUpdate.user.displayName} updated{" "}
              {formatDistanceToNow(new Date(projectUpdate.createdAt), { addSuffix: true })}
            </Text>
          </>
        )}
        {projectUpdate.editedAt && (
          <>
            <Text dimColor> • </Text>
            <Text dimColor italic>
              edited
            </Text>
          </>
        )}
      </Box>

      {/* Project link */}
      {projectUpdate.project && (
        <Box marginBottom={1}>
          <Text bold>Project: </Text>
          <InkLink url={projectUpdate.project.url}>
            <Text>{projectUpdate.project.name}</Text>
          </InkLink>
        </Box>
      )}

      {/* Stale indicator */}
      {projectUpdate.isStale && (
        <Box marginBottom={1}>
          <Text color="yellow">⚠ This update is stale</Text>
        </Box>
      )}

      {/* Body */}
      {projectUpdate.body && (
        <Box marginTop={1} marginBottom={1} flexDirection="column">
          <Box paddingLeft={2}>
            <Markdown>{projectUpdate.body}</Markdown>
          </Box>
        </Box>
      )}

      {/* Reactions */}
      {reactionSummary && (
        <Box marginBottom={1}>
          <Text dimColor>{reactionSummary}</Text>
        </Box>
      )}

      {/* Footer with URL */}
      <Box marginTop={1}>
        <Text dimColor>View this update on Linear: </Text>
        <InkLink url={projectUpdate.url}>
          <Text color="cyan">{projectUpdate.url}</Text>
        </InkLink>
      </Box>
    </TitledBox>
  );

  inkRender(<ProjectUpdateComponent />);
}

/**
 * Renders a ProjectUpdateConnection (list of project updates) as a list of boxes.
 *
 * @param connection - The ProjectUpdateConnection object to render
 */
export function renderProjectUpdateConnection(connection: any): void {
  const nodes = connection.nodes || [];
  const totalUpdates = nodes.length;

  const healthColors: Record<string, string> = {
    onTrack: "green",
    atRisk: "yellow",
    offTrack: "red",
  };

  const healthLabels: Record<string, string> = {
    onTrack: "On Track",
    atRisk: "At Risk",
    offTrack: "Off Track",
  };

  const UpdateItem = ({ update }: { update: any }) => {
    const healthColor = healthColors[update.health] || "gray";
    const healthLabel = healthLabels[update.health] || update.health;

    const reactionSummary =
      update.reactionData && update.reactionData.length > 0
        ? update.reactionData.map((r: any) => `${r.emoji} ${r.reactions.length}`).join(" ")
        : null;

    return (
      <Box flexDirection="column" marginBottom={1}>
        <TitledBox titles={[update.project?.name || "Project Update"]} borderStyle="round" padding={1}>
          <Box flexDirection="column">
            {/* Health and timestamp */}
            <Box marginBottom={1}>
              <Text color={healthColor}>{healthLabel}</Text>
              <Text dimColor> • </Text>
              <Text dimColor>{update.user?.displayName || "Unknown"}</Text>
              <Text dimColor> • </Text>
              <Text dimColor>{formatDistanceToNow(new Date(update.createdAt), { addSuffix: true })}</Text>
              {update.editedAt && (
                <>
                  <Text dimColor> • </Text>
                  <Text dimColor italic>
                    edited
                  </Text>
                </>
              )}
            </Box>

            {/* Body */}
            {update.body && (
              <Box marginBottom={1}>
                <Markdown>{update.body}</Markdown>
              </Box>
            )}

            {/* Reactions */}
            {reactionSummary && (
              <Box>
                <Text dimColor>{reactionSummary}</Text>
              </Box>
            )}
          </Box>
        </TitledBox>
      </Box>
    );
  };

  const ProjectUpdateListComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text dimColor>
          {totalUpdates} {totalUpdates === 1 ? "update" : "updates"}
        </Text>
      </Box>

      {nodes.map((update: any) => (
        <UpdateItem key={update.id} update={update} />
      ))}
    </Box>
  );

  inkRender(<ProjectUpdateListComponent />);
}

/**
 * Renders a Document using Ink components.
 *
 * @param document - The Document object to render
 */
export function renderDocument(document: any): void {
  const DocumentComponent = () => (
    <TitledBox
      titles={[document.title || "Document"]}
      flexDirection="column"
      padding={1}
      borderStyle="bold"
      titleStyles={titleStyles.pill}
    >
      {/* Creator and timestamp line */}
      <Box marginBottom={1}>
        {document.creator && (
          <>
            <Text>
              {document.creator.displayName} created{" "}
              {formatDistanceToNow(new Date(document.createdAt), { addSuffix: true })}
            </Text>
          </>
        )}
      </Box>

      {/* Last updated by */}
      {document.updatedBy && document.updatedAt && (
        <Box marginBottom={1}>
          <Text dimColor>
            Last updated by {document.updatedBy.displayName}{" "}
            {formatDistanceToNow(new Date(document.updatedAt), { addSuffix: true })}
          </Text>
        </Box>
      )}

      {/* Project */}
      {document.project && (
        <Box marginBottom={1}>
          <Text bold>Project: </Text>
          <InkLink url={document.project.url}>
            <Text>{document.project.name}</Text>
          </InkLink>
        </Box>
      )}

      {/* Content */}
      {document.content && (
        <Box marginTop={2} flexDirection="column">
          <Box paddingLeft={2}>
            <Markdown>{document.content}</Markdown>
          </Box>
        </Box>
      )}

      {/* Footer with URL */}
      <Box marginTop={1}>
        <Text dimColor>View this document on Linear: </Text>
        <InkLink url={document.url}>
          <Text color="cyan">{document.url}</Text>
        </InkLink>
      </Box>
    </TitledBox>
  );

  inkRender(<DocumentComponent />);
}

/**
 * Renders a DocumentConnection (list of documents) as a list of boxes.
 *
 * @param connection - The DocumentConnection object to render
 */
export function renderDocumentConnection(connection: any): void {
  const nodes = connection.nodes || [];
  const totalDocuments = nodes.length;

  const DocumentItem = ({ document }: { document: any }) => {
    return (
      <Box flexDirection="column" marginBottom={1}>
        <TitledBox titles={[document.title || "Document"]} borderStyle="round" padding={1}>
          <Box flexDirection="column">
            {/* Creator and updated info */}
            <Box marginBottom={1}>
              {document.creator && (
                <>
                  <Text dimColor>{document.creator.displayName}</Text>
                  <Text dimColor> • </Text>
                </>
              )}
              <Text dimColor>Updated {formatDistanceToNow(new Date(document.updatedAt), { addSuffix: true })}</Text>
            </Box>

            {/* Project */}
            {document.project && (
              <Box marginBottom={1}>
                <Text dimColor>Project: </Text>
                <InkLink url={document.project.url}>
                  <Text>{document.project.name}</Text>
                </InkLink>
              </Box>
            )}

            {/* URL */}
            <Box>
              <InkLink url={document.url}>
                <Text color="cyan">{document.url}</Text>
              </InkLink>
            </Box>
          </Box>
        </TitledBox>
      </Box>
    );
  };

  const DocumentListComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text dimColor>
          {totalDocuments} {totalDocuments === 1 ? "document" : "documents"}
        </Text>
      </Box>

      {nodes.map((document: any) => (
        <DocumentItem key={document.id} document={document} />
      ))}
    </Box>
  );

  inkRender(<DocumentListComponent />);
}

/**
 * Renders a Team using Ink components.
 *
 * @param team - The Team object to render
 */
export function renderTeam(team: any): void {
  const TeamComponent = () => (
    <TitledBox
      titles={[team.key, team.displayName || team.name]}
      flexDirection="column"
      padding={1}
      borderStyle="bold"
      titleStyles={titleStyles.pill}
    >
      {/* Created timestamp */}
      <Box marginBottom={1}>
        <Text dimColor>Created {formatDistanceToNow(new Date(team.createdAt), { addSuffix: true })}</Text>
      </Box>

      {/* Issue count */}
      <Box>
        <Text bold>Issues: </Text>
        <Text>{team.issueCount}</Text>
      </Box>

      {/* Timezone */}
      {team.timezone && (
        <Box>
          <Text bold>Timezone: </Text>
          <Text>{team.timezone}</Text>
        </Box>
      )}

      {/* Private status */}
      <Box>
        <Text bold>Private: </Text>
        <Text>{team.private ? "Yes" : "No"}</Text>
      </Box>

      {/* Cycles enabled */}
      <Box>
        <Text bold>Cycles: </Text>
        <Text>{team.cyclesEnabled ? "Enabled" : "Disabled"}</Text>
      </Box>

      {/* Triage enabled */}
      <Box>
        <Text bold>Triage: </Text>
        <Text>{team.triageEnabled ? "Enabled" : "Disabled"}</Text>
      </Box>

      {/* Description */}
      {team.description && (
        <Box marginTop={2} flexDirection="column">
          <Box paddingLeft={2}>
            <Markdown>{team.description}</Markdown>
          </Box>
        </Box>
      )}
    </TitledBox>
  );

  inkRender(<TeamComponent />);
}

/**
 * Renders a TeamConnection (list of teams) as a table.
 *
 * @param connection - The TeamConnection object to render
 */
export function renderTeamConnection(connection: any): void {
  const nodes = connection.nodes || [];

  const columns: TableColumn<any>[] = [
    {
      header: "KEY",
      width: 8,
      render: (team: any) => <Text bold>{team.key}</Text>,
    },
    {
      header: "NAME",
      width: 30,
      render: (team: any) => <Text>{team.displayName || team.name}</Text>,
    },
    {
      header: "ISSUES",
      width: 10,
      render: (team: any) => <Text>{team.issueCount}</Text>,
    },
    {
      header: "PRIVATE",
      width: 10,
      render: (team: any) => <Text>{team.private ? "Yes" : "No"}</Text>,
    },
    {
      header: "UPDATED",
      width: 20,
      render: (team: any) => <Text dimColor>{formatDistanceToNow(new Date(team.updatedAt), { addSuffix: true })}</Text>,
    },
  ];

  const TeamTableComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      <DataTable columns={columns} data={nodes} />
    </Box>
  );

  inkRender(<TeamTableComponent />);
}

/**
 * Helper to truncate text to a given width.
 */
function truncateText(text: string, width: number): string {
  if (text.length <= width) {
    return text;
  }
  return text.slice(0, width - 3) + "...";
}

/**
 * Get issue status with appropriate color.
 */
function getIssueStatus(issue: any) {
  if (issue.completedAt) {
    return { label: "Done", color: "green" as const };
  }
  if (issue.canceledAt) {
    return { label: "Canceled", color: "red" as const };
  }
  if (issue.startedAt) {
    return { label: "In Progress", color: "yellow" as const };
  }
  return { label: "Todo", color: undefined };
}

/**
 * Renders an IssueConnection (list of issues) as a table.
 *
 * @param connection - The IssueConnection object to render
 */
export function renderIssueConnection(connection: any): void {
  const nodes = connection.nodes || [];

  // Count open and total issues
  const openIssues = nodes.filter((issue: any) => !issue.completedAt && !issue.canceledAt);
  const totalIssues = nodes.length;

  // Define table columns
  const columns: TableColumn<any>[] = [
    {
      header: "ID",
      width: 8,
      render: issue => (
        <InkLink url={issue.url}>
          <Text color="green">{issue.identifier}</Text>
        </InkLink>
      ),
    },
    {
      header: "STATUS",
      width: 15,
      render: issue => {
        const status = getIssueStatus(issue);
        return <Text color={status.color}>{truncateText(status.label, 15)}</Text>;
      },
    },
    {
      header: "TITLE",
      width: 35,
      render: issue => <Text>{truncateText(issue.title, 35)}</Text>,
    },
    {
      header: "PRIORITY",
      width: 12,
      render: issue => <Text>{truncateText(issue.priorityLabel || "None", 12)}</Text>,
    },
    {
      header: "ASSIGNEE",
      width: 15,
      render: issue => <Text>{truncateText(issue.assignee?.displayName || "Unassigned", 15)}</Text>,
    },
    {
      header: "UPDATED",
      width: 20,
      render: issue => <Text dimColor>{formatDistanceToNow(new Date(issue.updatedAt), { addSuffix: true })}</Text>,
    },
  ];

  const IssueListComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text dimColor>
          Showing {totalIssues} of {totalIssues} issues ({openIssues.length} open)
        </Text>
      </Box>
      <DataTable columns={columns} data={nodes} />
    </Box>
  );

  inkRender(<IssueListComponent />);
}
