/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render as inkRender, Box, Text } from "ink";
import InkLink from "ink-link";
import { formatDistanceToNow } from "date-fns";
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
  width?: number; // Optional fixed width
  minWidth?: number; // Minimum width constraint
  maxWidth?: number; // Maximum width constraint
  padding?: number; // Padding around content (default: 2)
  render: (row: T, index: number) => React.ReactNode;
}

/**
 * Strip ANSI codes and calculate visual width of text.
 * This handles colored text and other ANSI escape sequences.
 */
function getVisualWidth(text: string): number {
  // Remove ANSI escape codes
  const stripped = text.replace(/\x1b\[[0-9;]*m/g, "");
  return stripped.length;
}

/**
 * Calculate optimal column widths based on content.
 * Returns an array of widths corresponding to each column.
 */
function calculateColumnWidths<T>(columns: TableColumn<T>[], data: T[]): number[] {
  return columns.map((column, _colIndex) => {
    // If width is explicitly set, use it
    if (column.width !== undefined) {
      return column.width;
    }

    const padding = column.padding ?? 2;

    // Start with header width
    let maxWidth = getVisualWidth(column.header) + padding;

    // Check all data rows for this column
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];
      const rendered = column.render(row, rowIndex);

      // Extract text content from React node
      let textContent = "";
      if (rendered && typeof rendered === "object" && "props" in rendered) {
        const props = (rendered as any).props;
        if (props.children) {
          // Handle nested Text components and strings
          const extractText = (node: any): string => {
            if (typeof node === "string") {
              return node;
            }
            if (typeof node === "number") {
              return String(node);
            }
            if (Array.isArray(node)) {
              return node.map(extractText).join("");
            }
            if (node && typeof node === "object" && "props" in node && node.props.children) {
              return extractText(node.props.children);
            }
            return "";
          };
          textContent = extractText(props.children);
        }
      } else if (typeof rendered === "string") {
        textContent = rendered;
      } else if (typeof rendered === "number") {
        textContent = String(rendered);
      }

      const contentWidth = getVisualWidth(textContent) + padding;
      if (contentWidth > maxWidth) {
        maxWidth = contentWidth;
      }
    }

    // Apply min/max constraints
    if (column.minWidth !== undefined && maxWidth < column.minWidth) {
      maxWidth = column.minWidth;
    }
    if (column.maxWidth !== undefined && maxWidth > column.maxWidth) {
      maxWidth = column.maxWidth;
    }

    return maxWidth;
  });
}

/**
 * Generic table component for rendering data in columns.
 */
function DataTable<T>({ columns, data }: { columns: TableColumn<T>[]; data: T[] }) {
  // Calculate dynamic widths based on content
  const columnWidths = calculateColumnWidths(columns, data);

  return (
    <Box flexDirection="column">
      {/* Table Header */}
      <Box>
        {columns.map((column, index) => (
          <Box key={index} width={columnWidths[index]}>
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
            <Box key={colIndex} width={columnWidths[colIndex]}>
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
    <Box flexDirection="column" paddingY={1}>
      {/* Title header */}
      <Box marginBottom={1}>
        <Text bold>{issue.identifier}</Text>
        <Text bold> • </Text>
        <Text bold>{issue.title}</Text>
      </Box>

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
    </Box>
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
      <Box flexDirection="column" paddingY={1}>
        {/* Title header */}
        <Box marginBottom={1}>
          <Text bold>{project.name}</Text>
        </Box>

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
      </Box>
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
      maxWidth: 40,
      render: (project: any) => (
        <InkLink url={project.url}>
          <Text bold>{truncateText(project.name, 40)}</Text>
        </InkLink>
      ),
    },
    {
      header: "LEAD",
      maxWidth: 25,
      render: (project: any) => <Text>{truncateText(project.lead?.displayName || "-", 25)}</Text>,
    },
    {
      header: "HEALTH",
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
      render: (project: any) => {
        const progressPercent = Math.round((project.progress || 0) * 100);
        return <Text>{progressPercent}%</Text>;
      },
    },
    {
      header: "UPDATED",
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
      <Box flexDirection="column" paddingY={1}>
        {/* Title header */}
        <Box marginBottom={1}>
          <Text bold>{user.displayName}</Text>
        </Box>

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
      </Box>
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

  // Define table columns with dynamic widths
  const columns: TableColumn<any>[] = [
    {
      header: "NAME",
      maxWidth: 30,
      render: user => (
        <InkLink url={user.url}>
          <Text color="green">{truncateText(user.displayName, 30)}</Text>
        </InkLink>
      ),
    },
    {
      header: "EMAIL",
      maxWidth: 40,
      render: user => <Text>{truncateText(user.email, 40)}</Text>,
    },
    {
      header: "ROLE",
      render: user => {
        const role = getUserRole(user);
        return <Text color={role.color}>{role.label}</Text>;
      },
    },
    {
      header: "STATUS",
      render: user => <Text color={user.active ? "green" : "red"}>{user.active ? "Active" : "Inactive"}</Text>,
    },
    {
      header: "LAST SEEN",
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

  const CommentItem = ({ comment, depth = 0, isLast = false }: { comment: any; depth?: number; isLast?: boolean }) => {
    const childReplies = repliesByParent.get(comment.id) || [];
    const reactionSummary =
      comment.reactionData && comment.reactionData.length > 0
        ? comment.reactionData.map((r: any) => `${r.emoji} ${r.reactions.length}`).join(" ")
        : null;

    const authorName = comment.user?.displayName || "Unknown";
    const timestamp = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
    const isReply = depth > 0;

    return (
      <Box flexDirection="column" marginLeft={depth * 2}>
        <Box flexDirection="column">
          {/* Author and timestamp header - compact */}
          <Box marginBottom={1}>
            {isReply && <Text dimColor>↳ </Text>}
            <Text bold>{authorName}</Text>
            <Text dimColor> • </Text>
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

          {/* Comment body - indented */}
          <Box flexDirection="column">
            <Box paddingLeft={2}>
              <Markdown>{comment.body}</Markdown>
            </Box>
          </Box>

          {/* Reactions */}
          {reactionSummary && (
            <Box marginTop={1}>
              <Text dimColor>{reactionSummary}</Text>
            </Box>
          )}
        </Box>

        {/* Replies */}
        {childReplies.length > 0 && (
          <Box flexDirection="column" marginTop={1}>
            {childReplies.map((reply: any) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </Box>
        )}

        {/* Separator between top-level comments */}
        {depth === 0 && !isLast && (
          <Box marginTop={1} marginBottom={1}>
            <Text dimColor>{"─".repeat(80)}</Text>
          </Box>
        )}
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

      {topLevelComments.map((comment: any, index: number) => (
        <CommentItem key={comment.id} comment={comment} depth={0} isLast={index === topLevelComments.length - 1} />
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
    <Box flexDirection="column" paddingY={1}>
      {/* Title header */}
      <Box marginBottom={1}>
        <Text bold>{projectUpdate.project?.name || "Project Update"}</Text>
      </Box>

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
    </Box>
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

  const UpdateItem = ({ update, isLast }: { update: any; isLast: boolean }) => {
    const healthColor = healthColors[update.health] || "gray";
    const healthLabel = healthLabels[update.health] || update.health;

    const reactionSummary =
      update.reactionData && update.reactionData.length > 0
        ? update.reactionData.map((r: any) => `${r.emoji} ${r.reactions.length}`).join(" ")
        : null;

    return (
      <Box flexDirection="column">
        {/* Project name header */}
        <Box marginBottom={1}>
          <Text bold>{update.project?.name || "Project Update"}</Text>
        </Box>

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
          <Box flexDirection="column">
            <Box paddingLeft={2}>
              <Markdown>{update.body}</Markdown>
            </Box>
          </Box>
        )}

        {/* Reactions */}
        {reactionSummary && (
          <Box marginTop={1}>
            <Text dimColor>{reactionSummary}</Text>
          </Box>
        )}

        {/* Separator line */}
        {!isLast && (
          <Box marginTop={1} marginBottom={1}>
            <Text dimColor>{"─".repeat(80)}</Text>
          </Box>
        )}
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

      {nodes.map((update: any, index: number) => (
        <UpdateItem key={update.id} update={update} isLast={index === nodes.length - 1} />
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
    <Box flexDirection="column" paddingY={1}>
      {/* Title header */}
      <Box marginBottom={1}>
        <Text bold>{document.title || "Document"}</Text>
      </Box>

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
    </Box>
  );

  inkRender(<DocumentComponent />);
}

/**
 * Renders a DocumentConnection (list of documents) as a table.
 *
 * @param connection - The DocumentConnection object to render
 */
export function renderDocumentConnection(connection: any): void {
  const nodes = connection.nodes || [];

  const columns: TableColumn<any>[] = [
    {
      header: "TITLE",
      maxWidth: 40,
      render: (document: any) => (
        <InkLink url={document.url}>
          <Text bold color="green">
            {truncateText(document.title || "Document", 40)}
          </Text>
        </InkLink>
      ),
    },
    {
      header: "CREATOR",
      maxWidth: 25,
      render: (document: any) => <Text>{truncateText(document.creator?.displayName || "-", 25)}</Text>,
    },
    {
      header: "PROJECT",
      maxWidth: 30,
      render: (document: any) =>
        document.project ? (
          <InkLink url={document.project.url}>
            <Text>{truncateText(document.project.name, 30)}</Text>
          </InkLink>
        ) : (
          <Text dimColor>-</Text>
        ),
    },
    {
      header: "UPDATED",
      render: (document: any) => (
        <Text dimColor>{formatDistanceToNow(new Date(document.updatedAt), { addSuffix: true })}</Text>
      ),
    },
  ];

  const DocumentTableComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      <DataTable columns={columns} data={nodes} />
    </Box>
  );

  inkRender(<DocumentTableComponent />);
}

/**
 * Renders a Team using Ink components.
 *
 * @param team - The Team object to render
 */
export function renderTeam(team: any): void {
  const TeamComponent = () => (
    <Box flexDirection="column" paddingY={1}>
      {/* Title header */}
      <Box marginBottom={1}>
        <Text bold>{team.key}</Text>
        <Text bold> • </Text>
        <Text bold>{team.displayName || team.name}</Text>
      </Box>

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
    </Box>
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
      render: (team: any) => <Text bold>{team.key}</Text>,
    },
    {
      header: "NAME",
      maxWidth: 40,
      render: (team: any) => <Text>{truncateText(team.displayName || team.name, 40)}</Text>,
    },
    {
      header: "ISSUES",
      render: (team: any) => <Text>{team.issueCount}</Text>,
    },
    {
      header: "PRIVATE",
      render: (team: any) => <Text>{team.private ? "Yes" : "No"}</Text>,
    },
    {
      header: "UPDATED",
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
 * Helper to truncate text to a given width based on visual width.
 * This accounts for ANSI codes and ensures accurate truncation.
 */
function truncateText(text: string, width: number): string {
  const visualWidth = getVisualWidth(text);
  if (visualWidth <= width) {
    return text;
  }

  // Strip ANSI codes for accurate slicing
  const stripped = text.replace(/\x1b\[[0-9;]*m/g, "");
  const truncated = stripped.slice(0, width - 3) + "...";
  return truncated;
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

  // Define table columns with dynamic widths
  const columns: TableColumn<any>[] = [
    {
      header: "ID",
      render: issue => (
        <InkLink url={issue.url}>
          <Text color="green">{issue.identifier}</Text>
        </InkLink>
      ),
    },
    {
      header: "STATUS",
      render: issue => {
        const status = getIssueStatus(issue);
        return <Text color={status.color}>{status.label}</Text>;
      },
    },
    {
      header: "TITLE",
      maxWidth: 60,
      render: issue => <Text>{truncateText(issue.title, 60)}</Text>,
    },
    {
      header: "PRIORITY",
      render: issue => <Text>{issue.priorityLabel || "None"}</Text>,
    },
    {
      header: "ASSIGNEE",
      maxWidth: 20,
      render: issue => <Text>{truncateText(issue.assignee?.displayName || "Unassigned", 20)}</Text>,
    },
    {
      header: "UPDATED",
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
