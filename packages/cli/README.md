# @linear/cli

CLI interface for Linear

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@linear/cli.svg)](https://npmjs.org/package/@linear/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@linear/cli.svg)](https://npmjs.org/package/@linear/cli)

<!-- toc -->
* [@linear/cli](#linearcli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @linear/cli
$ linear COMMAND
running command...
$ linear (--version)
@linear/cli/0.0.0 darwin-arm64 node-v24.11.0
$ linear --help [COMMAND]
USAGE
  $ linear COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`linear agent-activity list`](#linear-agent-activity-list)
* [`linear agent-activity view ID`](#linear-agent-activity-view-id)
* [`linear agent-session activities ID`](#linear-agent-session-activities-id)
* [`linear agent-session list`](#linear-agent-session-list)
* [`linear agent-session view ID`](#linear-agent-session-view-id)
* [`linear auth login`](#linear-auth-login)
* [`linear auth logout`](#linear-auth-logout)
* [`linear auth status`](#linear-auth-status)
* [`linear autocomplete [SHELL]`](#linear-autocomplete-shell)
* [`linear comment children`](#linear-comment-children)
* [`linear comment created-issues`](#linear-comment-created-issues)
* [`linear comment document-content`](#linear-comment-document-content)
* [`linear comment document-content ai-prompt-rules`](#linear-comment-document-content-ai-prompt-rules)
* [`linear comment external-thread`](#linear-comment-external-thread)
* [`linear comment list`](#linear-comment-list)
* [`linear comment view`](#linear-comment-view)
* [`linear cycle issues ID`](#linear-cycle-issues-id)
* [`linear cycle list`](#linear-cycle-list)
* [`linear cycle uncompleted-issues-upon-close ID`](#linear-cycle-uncompleted-issues-upon-close-id)
* [`linear cycle view ID`](#linear-cycle-view-id)
* [`linear document comments ID`](#linear-document-comments-id)
* [`linear document list`](#linear-document-list)
* [`linear document view ID`](#linear-document-view-id)
* [`linear graphql QUERY`](#linear-graphql-query)
* [`linear help [COMMAND]`](#linear-help-command)
* [`linear initiative-update comments ID`](#linear-initiative-update-comments-id)
* [`linear initiative-update list`](#linear-initiative-update-list)
* [`linear initiative-update view ID`](#linear-initiative-update-view-id)
* [`linear initiative document-content ID`](#linear-initiative-document-content-id)
* [`linear initiative document-content ai-prompt-rules ID`](#linear-initiative-document-content-ai-prompt-rules-id)
* [`linear initiative documents ID`](#linear-initiative-documents-id)
* [`linear initiative history ID`](#linear-initiative-history-id)
* [`linear initiative links ID`](#linear-initiative-links-id)
* [`linear initiative list`](#linear-initiative-list)
* [`linear initiative projects ID`](#linear-initiative-projects-id)
* [`linear initiative sub-initiatives ID`](#linear-initiative-sub-initiatives-id)
* [`linear initiative view ID`](#linear-initiative-view-id)
* [`linear issue attachments ID`](#linear-issue-attachments-id)
* [`linear issue bot-actor ID`](#linear-issue-bot-actor-id)
* [`linear issue children ID`](#linear-issue-children-id)
* [`linear issue comments ID`](#linear-issue-comments-id)
* [`linear issue documents ID`](#linear-issue-documents-id)
* [`linear issue former-attachments ID`](#linear-issue-former-attachments-id)
* [`linear issue former-needs ID`](#linear-issue-former-needs-id)
* [`linear issue history ID`](#linear-issue-history-id)
* [`linear issue inverse-relations ID`](#linear-issue-inverse-relations-id)
* [`linear issue labels ID`](#linear-issue-labels-id)
* [`linear issue list`](#linear-issue-list)
* [`linear issue needs ID`](#linear-issue-needs-id)
* [`linear issue relations ID`](#linear-issue-relations-id)
* [`linear issue subscribers ID`](#linear-issue-subscribers-id)
* [`linear issue view ID`](#linear-issue-view-id)
* [`linear organization`](#linear-organization)
* [`linear organization integrations`](#linear-organization-integrations)
* [`linear organization labels`](#linear-organization-labels)
* [`linear organization project-labels`](#linear-organization-project-labels)
* [`linear organization subscription`](#linear-organization-subscription)
* [`linear organization teams`](#linear-organization-teams)
* [`linear organization templates`](#linear-organization-templates)
* [`linear organization users`](#linear-organization-users)
* [`linear project-status list`](#linear-project-status-list)
* [`linear project-status view ID`](#linear-project-status-view-id)
* [`linear project-update comments ID`](#linear-project-update-comments-id)
* [`linear project-update list`](#linear-project-update-list)
* [`linear project-update view ID`](#linear-project-update-view-id)
* [`linear project comments ID`](#linear-project-comments-id)
* [`linear project document-content ID`](#linear-project-document-content-id)
* [`linear project document-content ai-prompt-rules ID`](#linear-project-document-content-ai-prompt-rules-id)
* [`linear project documents ID`](#linear-project-documents-id)
* [`linear project external-links ID`](#linear-project-external-links-id)
* [`linear project history ID`](#linear-project-history-id)
* [`linear project initiatives ID`](#linear-project-initiatives-id)
* [`linear project issues ID`](#linear-project-issues-id)
* [`linear project labels ID`](#linear-project-labels-id)
* [`linear project list`](#linear-project-list)
* [`linear project members ID`](#linear-project-members-id)
* [`linear project milestones ID`](#linear-project-milestones-id)
* [`linear project needs ID`](#linear-project-needs-id)
* [`linear project relations ID`](#linear-project-relations-id)
* [`linear project teams ID`](#linear-project-teams-id)
* [`linear project updates ID`](#linear-project-updates-id)
* [`linear project view ID`](#linear-project-view-id)
* [`linear roadmap list`](#linear-roadmap-list)
* [`linear roadmap projects ID`](#linear-roadmap-projects-id)
* [`linear roadmap view ID`](#linear-roadmap-view-id)
* [`linear team cycles ID`](#linear-team-cycles-id)
* [`linear team git-automation-states ID`](#linear-team-git-automation-states-id)
* [`linear team issues ID`](#linear-team-issues-id)
* [`linear team labels ID`](#linear-team-labels-id)
* [`linear team list`](#linear-team-list)
* [`linear team members ID`](#linear-team-members-id)
* [`linear team memberships ID`](#linear-team-memberships-id)
* [`linear team projects ID`](#linear-team-projects-id)
* [`linear team states ID`](#linear-team-states-id)
* [`linear team templates ID`](#linear-team-templates-id)
* [`linear team view ID`](#linear-team-view-id)
* [`linear user assigned-issues ID`](#linear-user-assigned-issues-id)
* [`linear user created-issues ID`](#linear-user-created-issues-id)
* [`linear user delegated-issues ID`](#linear-user-delegated-issues-id)
* [`linear user drafts ID`](#linear-user-drafts-id)
* [`linear user list`](#linear-user-list)
* [`linear user team-memberships ID`](#linear-user-team-memberships-id)
* [`linear user teams ID`](#linear-user-teams-id)
* [`linear user view ID`](#linear-user-view-id)
* [`linear viewer`](#linear-viewer)
* [`linear viewer assigned-issues`](#linear-viewer-assigned-issues)
* [`linear viewer created-issues`](#linear-viewer-created-issues)
* [`linear viewer delegated-issues`](#linear-viewer-delegated-issues)
* [`linear viewer drafts`](#linear-viewer-drafts)
* [`linear viewer team-memberships`](#linear-viewer-team-memberships)
* [`linear viewer teams`](#linear-viewer-teams)

## `linear agent-activity list`

Runs agentActivities

```
USAGE
  $ linear agent-activity list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.agentSessionId.contains <value>] [--filter.agentSessionId.containsIgnoreCase <value>]
    [--filter.agentSessionId.containsIgnoreCaseAndAccent <value>] [--filter.agentSessionId.endsWith <value>]
    [--filter.agentSessionId.eq <value>] [--filter.agentSessionId.eqIgnoreCase <value>] [--filter.agentSessionId.in
    <value>...] [--filter.agentSessionId.neq <value>] [--filter.agentSessionId.neqIgnoreCase <value>]
    [--filter.agentSessionId.nin <value>...] [--filter.agentSessionId.notContains <value>]
    [--filter.agentSessionId.notContainsIgnoreCase <value>] [--filter.agentSessionId.notEndsWith <value>]
    [--filter.agentSessionId.notStartsWith <value>] [--filter.agentSessionId.startsWith <value>]
    [--filter.agentSessionId.startsWithIgnoreCase <value>] [--filter.sourceComment.null] [--filter.type.contains
    <value>] [--filter.type.containsIgnoreCase <value>] [--filter.type.containsIgnoreCaseAndAccent <value>]
    [--filter.type.endsWith <value>] [--filter.type.eq <value>] [--filter.type.eqIgnoreCase <value>] [--filter.type.in
    <value>...] [--filter.type.neq <value>] [--filter.type.neqIgnoreCase <value>] [--filter.type.nin <value>...]
    [--filter.type.notContains <value>] [--filter.type.notContainsIgnoreCase <value>] [--filter.type.notEndsWith
    <value>] [--filter.type.notStartsWith <value>] [--filter.type.startsWith <value>]
    [--filter.type.startsWithIgnoreCase <value>] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.agentSessionId.contains=<value>
  --filter.agentSessionId.containsIgnoreCase=<value>
  --filter.agentSessionId.containsIgnoreCaseAndAccent=<value>
  --filter.agentSessionId.endsWith=<value>
  --filter.agentSessionId.eq=<value>
  --filter.agentSessionId.eqIgnoreCase=<value>
  --filter.agentSessionId.in=<value>...
  --filter.agentSessionId.neq=<value>
  --filter.agentSessionId.neqIgnoreCase=<value>
  --filter.agentSessionId.nin=<value>...
  --filter.agentSessionId.notContains=<value>
  --filter.agentSessionId.notContainsIgnoreCase=<value>
  --filter.agentSessionId.notEndsWith=<value>
  --filter.agentSessionId.notStartsWith=<value>
  --filter.agentSessionId.startsWith=<value>
  --filter.agentSessionId.startsWithIgnoreCase=<value>
  --filter.sourceComment.null
  --filter.type.contains=<value>
  --filter.type.containsIgnoreCase=<value>
  --filter.type.containsIgnoreCaseAndAccent=<value>
  --filter.type.endsWith=<value>
  --filter.type.eq=<value>
  --filter.type.eqIgnoreCase=<value>
  --filter.type.in=<value>...
  --filter.type.neq=<value>
  --filter.type.neqIgnoreCase=<value>
  --filter.type.nin=<value>...
  --filter.type.notContains=<value>
  --filter.type.notContainsIgnoreCase=<value>
  --filter.type.notEndsWith=<value>
  --filter.type.notStartsWith=<value>
  --filter.type.startsWith=<value>
  --filter.type.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                           <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs agentActivities

EXAMPLES
  $ linear agent-activity list
```

## `linear agent-activity view ID`

Runs agentActivity

```
USAGE
  $ linear agent-activity view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs agentActivity

EXAMPLES
  $ linear agent-activity view
```

## `linear agent-session activities ID`

Runs agentSession_activities

```
USAGE
  $ linear agent-session activities ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.agentSessionId.contains <value>] [--filter.agentSessionId.containsIgnoreCase <value>]
    [--filter.agentSessionId.containsIgnoreCaseAndAccent <value>] [--filter.agentSessionId.endsWith <value>]
    [--filter.agentSessionId.eq <value>] [--filter.agentSessionId.eqIgnoreCase <value>] [--filter.agentSessionId.in
    <value>...] [--filter.agentSessionId.neq <value>] [--filter.agentSessionId.neqIgnoreCase <value>]
    [--filter.agentSessionId.nin <value>...] [--filter.agentSessionId.notContains <value>]
    [--filter.agentSessionId.notContainsIgnoreCase <value>] [--filter.agentSessionId.notEndsWith <value>]
    [--filter.agentSessionId.notStartsWith <value>] [--filter.agentSessionId.startsWith <value>]
    [--filter.agentSessionId.startsWithIgnoreCase <value>] [--filter.sourceComment.null] [--filter.type.contains
    <value>] [--filter.type.containsIgnoreCase <value>] [--filter.type.containsIgnoreCaseAndAccent <value>]
    [--filter.type.endsWith <value>] [--filter.type.eq <value>] [--filter.type.eqIgnoreCase <value>] [--filter.type.in
    <value>...] [--filter.type.neq <value>] [--filter.type.neqIgnoreCase <value>] [--filter.type.nin <value>...]
    [--filter.type.notContains <value>] [--filter.type.notContainsIgnoreCase <value>] [--filter.type.notEndsWith
    <value>] [--filter.type.notStartsWith <value>] [--filter.type.startsWith <value>]
    [--filter.type.startsWithIgnoreCase <value>] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.agentSessionId.contains=<value>
  --filter.agentSessionId.containsIgnoreCase=<value>
  --filter.agentSessionId.containsIgnoreCaseAndAccent=<value>
  --filter.agentSessionId.endsWith=<value>
  --filter.agentSessionId.eq=<value>
  --filter.agentSessionId.eqIgnoreCase=<value>
  --filter.agentSessionId.in=<value>...
  --filter.agentSessionId.neq=<value>
  --filter.agentSessionId.neqIgnoreCase=<value>
  --filter.agentSessionId.nin=<value>...
  --filter.agentSessionId.notContains=<value>
  --filter.agentSessionId.notContainsIgnoreCase=<value>
  --filter.agentSessionId.notEndsWith=<value>
  --filter.agentSessionId.notStartsWith=<value>
  --filter.agentSessionId.startsWith=<value>
  --filter.agentSessionId.startsWithIgnoreCase=<value>
  --filter.sourceComment.null
  --filter.type.contains=<value>
  --filter.type.containsIgnoreCase=<value>
  --filter.type.containsIgnoreCaseAndAccent=<value>
  --filter.type.endsWith=<value>
  --filter.type.eq=<value>
  --filter.type.eqIgnoreCase=<value>
  --filter.type.in=<value>...
  --filter.type.neq=<value>
  --filter.type.neqIgnoreCase=<value>
  --filter.type.nin=<value>...
  --filter.type.notContains=<value>
  --filter.type.notContainsIgnoreCase=<value>
  --filter.type.notEndsWith=<value>
  --filter.type.notStartsWith=<value>
  --filter.type.startsWith=<value>
  --filter.type.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                           <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs agentSession_activities

EXAMPLES
  $ linear agent-session activities
```

## `linear agent-session list`

Runs agentSessions

```
USAGE
  $ linear agent-session list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs agentSessions

EXAMPLES
  $ linear agent-session list
```

## `linear agent-session view ID`

Runs agentSession

```
USAGE
  $ linear agent-session view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs agentSession

EXAMPLES
  $ linear agent-session view
```

## `linear auth login`

Logs in to Linear using a browser-based OAuth flow.

```
USAGE
  $ linear auth login [--api-key <value>] [--api-url <value>] [--linear-url <value>]

FLAGS
  --linear-url=<value>  [default: https://linear.app, env: LINEAR_URL] Linear instance to authorize against

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL

DESCRIPTION
  Logs in to Linear using a browser-based OAuth flow.

EXAMPLES
  $ linear auth login
```

## `linear auth logout`

Logs out of Linear by removing stored authentication credentials

```
USAGE
  $ linear auth logout [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Logs out of Linear by removing stored authentication credentials

EXAMPLES
  $ linear auth logout
```

## `linear auth status`

Displays the current authentication status for Linear

```
USAGE
  $ linear auth status [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Displays the current authentication status for Linear

EXAMPLES
  $ linear auth status
```

## `linear autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ linear autocomplete [SHELL] [-r]

ARGUMENTS
  [SHELL]  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ linear autocomplete

  $ linear autocomplete bash

  $ linear autocomplete zsh

  $ linear autocomplete powershell

  $ linear autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.39/src/commands/autocomplete/index.ts)_

## `linear comment children`

Runs comment_children

```
USAGE
  $ linear comment children [--json] [--api-key <value>] [--api-url <value>] [--hash <value>] [--id <value>] [--after
    <value>] [--before <value>] [--filter.body.contains <value>] [--filter.body.containsIgnoreCase <value>]
    [--filter.body.containsIgnoreCaseAndAccent <value>] [--filter.body.endsWith <value>] [--filter.body.eq <value>]
    [--filter.body.eqIgnoreCase <value>] [--filter.body.in <value>...] [--filter.body.neq <value>]
    [--filter.body.neqIgnoreCase <value>] [--filter.body.nin <value>...] [--filter.body.notContains <value>]
    [--filter.body.notContainsIgnoreCase <value>] [--filter.body.notEndsWith <value>] [--filter.body.notStartsWith
    <value>] [--filter.body.startsWith <value>] [--filter.body.startsWithIgnoreCase <value>]
    [--filter.documentContent.null] [--filter.issue.null] [--filter.parent.null] [--filter.projectUpdate.null] [--first
    <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.body.contains=<value>
  --filter.body.containsIgnoreCase=<value>
  --filter.body.containsIgnoreCaseAndAccent=<value>
  --filter.body.endsWith=<value>
  --filter.body.eq=<value>
  --filter.body.eqIgnoreCase=<value>
  --filter.body.in=<value>...
  --filter.body.neq=<value>
  --filter.body.neqIgnoreCase=<value>
  --filter.body.nin=<value>...
  --filter.body.notContains=<value>
  --filter.body.notContainsIgnoreCase=<value>
  --filter.body.notEndsWith=<value>
  --filter.body.notStartsWith=<value>
  --filter.body.startsWith=<value>
  --filter.body.startsWithIgnoreCase=<value>
  --filter.documentContent.null
  --filter.issue.null
  --filter.parent.null
  --filter.projectUpdate.null
  --first=<value>
  --hash=<value>
  --id=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs comment_children

EXAMPLES
  $ linear comment children
```

## `linear comment created-issues`

Runs comment_createdIssues

```
USAGE
  $ linear comment created-issues [--json] [--api-key <value>] [--api-url <value>] [--hash <value>] [--id <value>] [--after
    <value>] [--before <value>] [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null]
    [--filter.addedToCyclePeriod.eq after|before|during] [--filter.addedToCyclePeriod.in after|before|during...]
    [--filter.addedToCyclePeriod.neq after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...]
    [--filter.addedToCyclePeriod.null] [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null]
    [--filter.autoArchivedAt.null] [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null]
    [--filter.creator.null] [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>]
    [--filter.customerCount.gte <value>] [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>]
    [--filter.customerCount.lte <value>] [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...]
    [--filter.customerImportantCount.eq <value>] [--filter.customerImportantCount.gt <value>]
    [--filter.customerImportantCount.gte <value>] [--filter.customerImportantCount.in <value>...]
    [--filter.customerImportantCount.lt <value>] [--filter.customerImportantCount.lte <value>]
    [--filter.customerImportantCount.neq <value>] [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null]
    [--filter.cycleTime.null] [--filter.delegate.null] [--filter.description.contains <value>]
    [--filter.description.containsIgnoreCase <value>] [--filter.description.containsIgnoreCaseAndAccent <value>]
    [--filter.description.endsWith <value>] [--filter.description.eq <value>] [--filter.description.eqIgnoreCase
    <value>] [--filter.description.in <value>...] [--filter.description.neq <value>] [--filter.description.neqIgnoreCase
    <value>] [--filter.description.nin <value>...] [--filter.description.notContains <value>]
    [--filter.description.notContainsIgnoreCase <value>] [--filter.description.notEndsWith <value>]
    [--filter.description.notStartsWith <value>] [--filter.description.null] [--filter.description.startsWith <value>]
    [--filter.description.startsWithIgnoreCase <value>] [--filter.dueDate.null] [--filter.estimate.eq <value>]
    [--filter.estimate.gt <value>] [--filter.estimate.gte <value>] [--filter.estimate.in <value>...]
    [--filter.estimate.lt <value>] [--filter.estimate.lte <value>] [--filter.estimate.neq <value>]
    [--filter.estimate.nin <value>...] [--filter.estimate.null] [--filter.hasBlockedByRelations.eq]
    [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq] [--filter.hasBlockingRelations.neq]
    [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq] [--filter.hasRelatedRelations.eq]
    [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq] [--filter.hasSuggestedAssignees.neq]
    [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq] [--filter.hasSuggestedProjects.eq]
    [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq] [--filter.hasSuggestedRelatedIssues.neq]
    [--filter.hasSuggestedSimilarIssues.eq] [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq]
    [--filter.hasSuggestedTeams.neq] [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null]
    [--filter.number.eq <value>] [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in
    <value>...] [--filter.number.lt <value>] [--filter.number.lte <value>] [--filter.number.neq <value>]
    [--filter.number.nin <value>...] [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt
    <value>] [--filter.priority.gte <value>] [--filter.priority.in <value>...] [--filter.priority.lt <value>]
    [--filter.priority.lte <value>] [--filter.priority.neq <value>] [--filter.priority.nin <value>...]
    [--filter.priority.null] [--filter.project.null] [--filter.projectMilestone.null]
    [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains <value>]
    [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --hash=<value>
  --id=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs comment_createdIssues

EXAMPLES
  $ linear comment created-issues
```

## `linear comment document-content`

Runs comment_documentContent

```
USAGE
  $ linear comment document-content [--json] [--api-key <value>] [--api-url <value>] [--hash <value>] [--id <value>]

FLAGS
  --hash=<value>
  --id=<value>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs comment_documentContent

EXAMPLES
  $ linear comment document-content
```

## `linear comment document-content ai-prompt-rules`

Runs comment_documentContent_aiPromptRules

```
USAGE
  $ linear comment document-content ai-prompt-rules [--json] [--api-key <value>] [--api-url <value>] [--hash <value>]
  [--id <value>]

FLAGS
  --hash=<value>
  --id=<value>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs comment_documentContent_aiPromptRules

EXAMPLES
  $ linear comment document-content ai-prompt-rules
```

## `linear comment external-thread`

Runs comment_externalThread

```
USAGE
  $ linear comment external-thread [--json] [--api-key <value>] [--api-url <value>] [--hash <value>] [--id <value>]

FLAGS
  --hash=<value>
  --id=<value>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs comment_externalThread

EXAMPLES
  $ linear comment external-thread
```

## `linear comment list`

Runs comments

```
USAGE
  $ linear comment list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.body.contains <value>] [--filter.body.containsIgnoreCase <value>]
    [--filter.body.containsIgnoreCaseAndAccent <value>] [--filter.body.endsWith <value>] [--filter.body.eq <value>]
    [--filter.body.eqIgnoreCase <value>] [--filter.body.in <value>...] [--filter.body.neq <value>]
    [--filter.body.neqIgnoreCase <value>] [--filter.body.nin <value>...] [--filter.body.notContains <value>]
    [--filter.body.notContainsIgnoreCase <value>] [--filter.body.notEndsWith <value>] [--filter.body.notStartsWith
    <value>] [--filter.body.startsWith <value>] [--filter.body.startsWithIgnoreCase <value>]
    [--filter.documentContent.null] [--filter.issue.null] [--filter.parent.null] [--filter.projectUpdate.null] [--first
    <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.body.contains=<value>
  --filter.body.containsIgnoreCase=<value>
  --filter.body.containsIgnoreCaseAndAccent=<value>
  --filter.body.endsWith=<value>
  --filter.body.eq=<value>
  --filter.body.eqIgnoreCase=<value>
  --filter.body.in=<value>...
  --filter.body.neq=<value>
  --filter.body.neqIgnoreCase=<value>
  --filter.body.nin=<value>...
  --filter.body.notContains=<value>
  --filter.body.notContainsIgnoreCase=<value>
  --filter.body.notEndsWith=<value>
  --filter.body.notStartsWith=<value>
  --filter.body.startsWith=<value>
  --filter.body.startsWithIgnoreCase=<value>
  --filter.documentContent.null
  --filter.issue.null
  --filter.parent.null
  --filter.projectUpdate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs comments

EXAMPLES
  $ linear comment list
```

## `linear comment view`

Runs comment

```
USAGE
  $ linear comment view [--json] [--api-key <value>] [--api-url <value>] [--hash <value>] [--id <value>]

FLAGS
  --hash=<value>
  --id=<value>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs comment

EXAMPLES
  $ linear comment view
```

## `linear cycle issues ID`

Runs cycle_issues

```
USAGE
  $ linear cycle issues ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs cycle_issues

EXAMPLES
  $ linear cycle issues
```

## `linear cycle list`

Runs cycles

```
USAGE
  $ linear cycle list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.isActive.eq] [--filter.isActive.neq] [--filter.isFuture.eq] [--filter.isFuture.neq]
    [--filter.isInCooldown.eq] [--filter.isInCooldown.neq] [--filter.isNext.eq] [--filter.isNext.neq]
    [--filter.isPast.eq] [--filter.isPast.neq] [--filter.isPrevious.eq] [--filter.isPrevious.neq]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.number.eq
    <value>] [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...]
    [--filter.number.lt <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin
    <value>...] [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.isActive.eq
  --filter.isActive.neq
  --filter.isFuture.eq
  --filter.isFuture.neq
  --filter.isInCooldown.eq
  --filter.isInCooldown.neq
  --filter.isNext.eq
  --filter.isNext.neq
  --filter.isPast.eq
  --filter.isPast.neq
  --filter.isPrevious.eq
  --filter.isPrevious.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs cycles

EXAMPLES
  $ linear cycle list
```

## `linear cycle uncompleted-issues-upon-close ID`

Runs cycle_uncompletedIssuesUponClose

```
USAGE
  $ linear cycle uncompleted-issues-upon-close ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs cycle_uncompletedIssuesUponClose

EXAMPLES
  $ linear cycle uncompleted-issues-upon-close
```

## `linear cycle view ID`

Runs cycle

```
USAGE
  $ linear cycle view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs cycle

EXAMPLES
  $ linear cycle view
```

## `linear document comments ID`

Runs document_comments

```
USAGE
  $ linear document comments ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.body.contains <value>] [--filter.body.containsIgnoreCase <value>]
    [--filter.body.containsIgnoreCaseAndAccent <value>] [--filter.body.endsWith <value>] [--filter.body.eq <value>]
    [--filter.body.eqIgnoreCase <value>] [--filter.body.in <value>...] [--filter.body.neq <value>]
    [--filter.body.neqIgnoreCase <value>] [--filter.body.nin <value>...] [--filter.body.notContains <value>]
    [--filter.body.notContainsIgnoreCase <value>] [--filter.body.notEndsWith <value>] [--filter.body.notStartsWith
    <value>] [--filter.body.startsWith <value>] [--filter.body.startsWithIgnoreCase <value>]
    [--filter.documentContent.null] [--filter.issue.null] [--filter.parent.null] [--filter.projectUpdate.null] [--first
    <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.body.contains=<value>
  --filter.body.containsIgnoreCase=<value>
  --filter.body.containsIgnoreCaseAndAccent=<value>
  --filter.body.endsWith=<value>
  --filter.body.eq=<value>
  --filter.body.eqIgnoreCase=<value>
  --filter.body.in=<value>...
  --filter.body.neq=<value>
  --filter.body.neqIgnoreCase=<value>
  --filter.body.nin=<value>...
  --filter.body.notContains=<value>
  --filter.body.notContainsIgnoreCase=<value>
  --filter.body.notEndsWith=<value>
  --filter.body.notStartsWith=<value>
  --filter.body.startsWith=<value>
  --filter.body.startsWithIgnoreCase=<value>
  --filter.documentContent.null
  --filter.issue.null
  --filter.parent.null
  --filter.projectUpdate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs document_comments

EXAMPLES
  $ linear document comments
```

## `linear document list`

Runs documents

```
USAGE
  $ linear document list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>] [--first <value>]
    [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                   <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs documents

EXAMPLES
  $ linear document list
```

## `linear document view ID`

Runs document

```
USAGE
  $ linear document view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs document

EXAMPLES
  $ linear document view
```

## `linear graphql QUERY`

Execute a GraphQL query against the Linear API

```
USAGE
  $ linear graphql QUERY [--json] [--api-key <value>] [--api-url <value>] [-v <value>]

ARGUMENTS
  QUERY  GraphQL query to execute

FLAGS
  -v, --variables=<value>  JSON string of variables to pass to the query

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Execute a GraphQL query against the Linear API

EXAMPLES
  $ linear graphql "{ viewer { id name email } }"

  $ linear graphql "{ issues { nodes { id title } } }"

  echo "{ viewer { id name email } }" | linear graphql
```

## `linear help [COMMAND]`

Display help for linear.

```
USAGE
  $ linear help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for linear.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.35/src/commands/help.ts)_

## `linear initiative-update comments ID`

Runs initiativeUpdate_comments

```
USAGE
  $ linear initiative-update comments ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.body.contains <value>] [--filter.body.containsIgnoreCase <value>]
    [--filter.body.containsIgnoreCaseAndAccent <value>] [--filter.body.endsWith <value>] [--filter.body.eq <value>]
    [--filter.body.eqIgnoreCase <value>] [--filter.body.in <value>...] [--filter.body.neq <value>]
    [--filter.body.neqIgnoreCase <value>] [--filter.body.nin <value>...] [--filter.body.notContains <value>]
    [--filter.body.notContainsIgnoreCase <value>] [--filter.body.notEndsWith <value>] [--filter.body.notStartsWith
    <value>] [--filter.body.startsWith <value>] [--filter.body.startsWithIgnoreCase <value>]
    [--filter.documentContent.null] [--filter.issue.null] [--filter.parent.null] [--filter.projectUpdate.null] [--first
    <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.body.contains=<value>
  --filter.body.containsIgnoreCase=<value>
  --filter.body.containsIgnoreCaseAndAccent=<value>
  --filter.body.endsWith=<value>
  --filter.body.eq=<value>
  --filter.body.eqIgnoreCase=<value>
  --filter.body.in=<value>...
  --filter.body.neq=<value>
  --filter.body.neqIgnoreCase=<value>
  --filter.body.nin=<value>...
  --filter.body.notContains=<value>
  --filter.body.notContainsIgnoreCase=<value>
  --filter.body.notEndsWith=<value>
  --filter.body.notStartsWith=<value>
  --filter.body.startsWith=<value>
  --filter.body.startsWithIgnoreCase=<value>
  --filter.documentContent.null
  --filter.issue.null
  --filter.parent.null
  --filter.projectUpdate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiativeUpdate_comments

EXAMPLES
  $ linear initiative-update comments
```

## `linear initiative-update list`

Runs initiativeUpdates

```
USAGE
  $ linear initiative-update list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiativeUpdates

EXAMPLES
  $ linear initiative-update list
```

## `linear initiative-update view ID`

Runs initiativeUpdate

```
USAGE
  $ linear initiative-update view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiativeUpdate

EXAMPLES
  $ linear initiative-update view
```

## `linear initiative document-content ID`

Runs initiative_documentContent

```
USAGE
  $ linear initiative document-content ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiative_documentContent

EXAMPLES
  $ linear initiative document-content
```

## `linear initiative document-content ai-prompt-rules ID`

Runs initiative_documentContent_aiPromptRules

```
USAGE
  $ linear initiative document-content ai-prompt-rules ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiative_documentContent_aiPromptRules

EXAMPLES
  $ linear initiative document-content ai-prompt-rules
```

## `linear initiative documents ID`

Runs initiative_documents

```
USAGE
  $ linear initiative documents ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>] [--first <value>]
    [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                   <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiative_documents

EXAMPLES
  $ linear initiative documents
```

## `linear initiative history ID`

Runs initiative_history

```
USAGE
  $ linear initiative history ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiative_history

EXAMPLES
  $ linear initiative history
```

## `linear initiative links ID`

Runs initiative_links

```
USAGE
  $ linear initiative links ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiative_links

EXAMPLES
  $ linear initiative links
```

## `linear initiative list`

Runs initiatives

```
USAGE
  $ linear initiative list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.activityType.contains <value>] [--filter.activityType.containsIgnoreCase <value>]
    [--filter.activityType.containsIgnoreCaseAndAccent <value>] [--filter.activityType.endsWith <value>]
    [--filter.activityType.eq <value>] [--filter.activityType.eqIgnoreCase <value>] [--filter.activityType.in
    <value>...] [--filter.activityType.neq <value>] [--filter.activityType.neqIgnoreCase <value>]
    [--filter.activityType.nin <value>...] [--filter.activityType.notContains <value>]
    [--filter.activityType.notContainsIgnoreCase <value>] [--filter.activityType.notEndsWith <value>]
    [--filter.activityType.notStartsWith <value>] [--filter.activityType.startsWith <value>]
    [--filter.activityType.startsWithIgnoreCase <value>] [--filter.creator.null] [--filter.health.contains <value>]
    [--filter.health.containsIgnoreCase <value>] [--filter.health.containsIgnoreCaseAndAccent <value>]
    [--filter.health.endsWith <value>] [--filter.health.eq <value>] [--filter.health.eqIgnoreCase <value>]
    [--filter.health.in <value>...] [--filter.health.neq <value>] [--filter.health.neqIgnoreCase <value>]
    [--filter.health.nin <value>...] [--filter.health.notContains <value>] [--filter.health.notContainsIgnoreCase
    <value>] [--filter.health.notEndsWith <value>] [--filter.health.notStartsWith <value>] [--filter.health.startsWith
    <value>] [--filter.health.startsWithIgnoreCase <value>] [--filter.healthWithAge.contains <value>]
    [--filter.healthWithAge.containsIgnoreCase <value>] [--filter.healthWithAge.containsIgnoreCaseAndAccent <value>]
    [--filter.healthWithAge.endsWith <value>] [--filter.healthWithAge.eq <value>] [--filter.healthWithAge.eqIgnoreCase
    <value>] [--filter.healthWithAge.in <value>...] [--filter.healthWithAge.neq <value>]
    [--filter.healthWithAge.neqIgnoreCase <value>] [--filter.healthWithAge.nin <value>...]
    [--filter.healthWithAge.notContains <value>] [--filter.healthWithAge.notContainsIgnoreCase <value>]
    [--filter.healthWithAge.notEndsWith <value>] [--filter.healthWithAge.notStartsWith <value>]
    [--filter.healthWithAge.startsWith <value>] [--filter.healthWithAge.startsWithIgnoreCase <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.owner.null]
    [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.status.contains <value>] [--filter.status.containsIgnoreCase <value>]
    [--filter.status.containsIgnoreCaseAndAccent <value>] [--filter.status.endsWith <value>] [--filter.status.eq
    <value>] [--filter.status.eqIgnoreCase <value>] [--filter.status.in <value>...] [--filter.status.neq <value>]
    [--filter.status.neqIgnoreCase <value>] [--filter.status.nin <value>...] [--filter.status.notContains <value>]
    [--filter.status.notContainsIgnoreCase <value>] [--filter.status.notEndsWith <value>] [--filter.status.notStartsWith
    <value>] [--filter.status.startsWith <value>] [--filter.status.startsWithIgnoreCase <value>]
    [--filter.targetDate.null] [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.activityType.contains=<value>
  --filter.activityType.containsIgnoreCase=<value>
  --filter.activityType.containsIgnoreCaseAndAccent=<value>
  --filter.activityType.endsWith=<value>
  --filter.activityType.eq=<value>
  --filter.activityType.eqIgnoreCase=<value>
  --filter.activityType.in=<value>...
  --filter.activityType.neq=<value>
  --filter.activityType.neqIgnoreCase=<value>
  --filter.activityType.nin=<value>...
  --filter.activityType.notContains=<value>
  --filter.activityType.notContainsIgnoreCase=<value>
  --filter.activityType.notEndsWith=<value>
  --filter.activityType.notStartsWith=<value>
  --filter.activityType.startsWith=<value>
  --filter.activityType.startsWithIgnoreCase=<value>
  --filter.creator.null
  --filter.health.contains=<value>
  --filter.health.containsIgnoreCase=<value>
  --filter.health.containsIgnoreCaseAndAccent=<value>
  --filter.health.endsWith=<value>
  --filter.health.eq=<value>
  --filter.health.eqIgnoreCase=<value>
  --filter.health.in=<value>...
  --filter.health.neq=<value>
  --filter.health.neqIgnoreCase=<value>
  --filter.health.nin=<value>...
  --filter.health.notContains=<value>
  --filter.health.notContainsIgnoreCase=<value>
  --filter.health.notEndsWith=<value>
  --filter.health.notStartsWith=<value>
  --filter.health.startsWith=<value>
  --filter.health.startsWithIgnoreCase=<value>
  --filter.healthWithAge.contains=<value>
  --filter.healthWithAge.containsIgnoreCase=<value>
  --filter.healthWithAge.containsIgnoreCaseAndAccent=<value>
  --filter.healthWithAge.endsWith=<value>
  --filter.healthWithAge.eq=<value>
  --filter.healthWithAge.eqIgnoreCase=<value>
  --filter.healthWithAge.in=<value>...
  --filter.healthWithAge.neq=<value>
  --filter.healthWithAge.neqIgnoreCase=<value>
  --filter.healthWithAge.nin=<value>...
  --filter.healthWithAge.notContains=<value>
  --filter.healthWithAge.notContainsIgnoreCase=<value>
  --filter.healthWithAge.notEndsWith=<value>
  --filter.healthWithAge.notStartsWith=<value>
  --filter.healthWithAge.startsWith=<value>
  --filter.healthWithAge.startsWithIgnoreCase=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.owner.null
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.status.contains=<value>
  --filter.status.containsIgnoreCase=<value>
  --filter.status.containsIgnoreCaseAndAccent=<value>
  --filter.status.endsWith=<value>
  --filter.status.eq=<value>
  --filter.status.eqIgnoreCase=<value>
  --filter.status.in=<value>...
  --filter.status.neq=<value>
  --filter.status.neqIgnoreCase=<value>
  --filter.status.nin=<value>...
  --filter.status.notContains=<value>
  --filter.status.notContainsIgnoreCase=<value>
  --filter.status.notEndsWith=<value>
  --filter.status.notStartsWith=<value>
  --filter.status.startsWith=<value>
  --filter.status.startsWithIgnoreCase=<value>
  --filter.targetDate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                          <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiatives

EXAMPLES
  $ linear initiative list
```

## `linear initiative projects ID`

Runs initiative_projects

```
USAGE
  $ linear initiative projects ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.activityType.contains <value>] [--filter.activityType.containsIgnoreCase <value>]
    [--filter.activityType.containsIgnoreCaseAndAccent <value>] [--filter.activityType.endsWith <value>]
    [--filter.activityType.eq <value>] [--filter.activityType.eqIgnoreCase <value>] [--filter.activityType.in
    <value>...] [--filter.activityType.neq <value>] [--filter.activityType.neqIgnoreCase <value>]
    [--filter.activityType.nin <value>...] [--filter.activityType.notContains <value>]
    [--filter.activityType.notContainsIgnoreCase <value>] [--filter.activityType.notEndsWith <value>]
    [--filter.activityType.notStartsWith <value>] [--filter.activityType.startsWith <value>]
    [--filter.activityType.startsWithIgnoreCase <value>] [--filter.canceledAt.null] [--filter.completedAt.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.hasBlockedByRelations.eq]
    [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq] [--filter.hasBlockingRelations.neq]
    [--filter.hasDependedOnByRelations.eq] [--filter.hasDependedOnByRelations.neq] [--filter.hasDependsOnRelations.eq]
    [--filter.hasDependsOnRelations.neq] [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq]
    [--filter.hasViolatedRelations.eq] [--filter.hasViolatedRelations.neq] [--filter.health.contains <value>]
    [--filter.health.containsIgnoreCase <value>] [--filter.health.containsIgnoreCaseAndAccent <value>]
    [--filter.health.endsWith <value>] [--filter.health.eq <value>] [--filter.health.eqIgnoreCase <value>]
    [--filter.health.in <value>...] [--filter.health.neq <value>] [--filter.health.neqIgnoreCase <value>]
    [--filter.health.nin <value>...] [--filter.health.notContains <value>] [--filter.health.notContainsIgnoreCase
    <value>] [--filter.health.notEndsWith <value>] [--filter.health.notStartsWith <value>] [--filter.health.startsWith
    <value>] [--filter.health.startsWithIgnoreCase <value>] [--filter.healthWithAge.contains <value>]
    [--filter.healthWithAge.containsIgnoreCase <value>] [--filter.healthWithAge.containsIgnoreCaseAndAccent <value>]
    [--filter.healthWithAge.endsWith <value>] [--filter.healthWithAge.eq <value>] [--filter.healthWithAge.eqIgnoreCase
    <value>] [--filter.healthWithAge.in <value>...] [--filter.healthWithAge.neq <value>]
    [--filter.healthWithAge.neqIgnoreCase <value>] [--filter.healthWithAge.nin <value>...]
    [--filter.healthWithAge.notContains <value>] [--filter.healthWithAge.notContainsIgnoreCase <value>]
    [--filter.healthWithAge.notEndsWith <value>] [--filter.healthWithAge.notStartsWith <value>]
    [--filter.healthWithAge.startsWith <value>] [--filter.healthWithAge.startsWithIgnoreCase <value>]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.lead.null] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--filter.priority.eq <value>] [--filter.priority.gt <value>]
    [--filter.priority.gte <value>] [--filter.priority.in <value>...] [--filter.priority.lt <value>]
    [--filter.priority.lte <value>] [--filter.priority.neq <value>] [--filter.priority.nin <value>...]
    [--filter.priority.null] [--filter.searchableContent.contains <value>] [--filter.searchableContent.notContains
    <value>] [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.startDate.null] [--filter.startedAt.null] [--filter.state.contains <value>]
    [--filter.state.containsIgnoreCase <value>] [--filter.state.containsIgnoreCaseAndAccent <value>]
    [--filter.state.endsWith <value>] [--filter.state.eq <value>] [--filter.state.eqIgnoreCase <value>]
    [--filter.state.in <value>...] [--filter.state.neq <value>] [--filter.state.neqIgnoreCase <value>]
    [--filter.state.nin <value>...] [--filter.state.notContains <value>] [--filter.state.notContainsIgnoreCase <value>]
    [--filter.state.notEndsWith <value>] [--filter.state.notStartsWith <value>] [--filter.state.startsWith <value>]
    [--filter.state.startsWithIgnoreCase <value>] [--filter.targetDate.null] [--first <value>] [--includeArchived]
    [--includeSubInitiatives] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.activityType.contains=<value>
  --filter.activityType.containsIgnoreCase=<value>
  --filter.activityType.containsIgnoreCaseAndAccent=<value>
  --filter.activityType.endsWith=<value>
  --filter.activityType.eq=<value>
  --filter.activityType.eqIgnoreCase=<value>
  --filter.activityType.in=<value>...
  --filter.activityType.neq=<value>
  --filter.activityType.neqIgnoreCase=<value>
  --filter.activityType.nin=<value>...
  --filter.activityType.notContains=<value>
  --filter.activityType.notContainsIgnoreCase=<value>
  --filter.activityType.notEndsWith=<value>
  --filter.activityType.notStartsWith=<value>
  --filter.activityType.startsWith=<value>
  --filter.activityType.startsWithIgnoreCase=<value>
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDependedOnByRelations.eq
  --filter.hasDependedOnByRelations.neq
  --filter.hasDependsOnRelations.eq
  --filter.hasDependsOnRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasViolatedRelations.eq
  --filter.hasViolatedRelations.neq
  --filter.health.contains=<value>
  --filter.health.containsIgnoreCase=<value>
  --filter.health.containsIgnoreCaseAndAccent=<value>
  --filter.health.endsWith=<value>
  --filter.health.eq=<value>
  --filter.health.eqIgnoreCase=<value>
  --filter.health.in=<value>...
  --filter.health.neq=<value>
  --filter.health.neqIgnoreCase=<value>
  --filter.health.nin=<value>...
  --filter.health.notContains=<value>
  --filter.health.notContainsIgnoreCase=<value>
  --filter.health.notEndsWith=<value>
  --filter.health.notStartsWith=<value>
  --filter.health.startsWith=<value>
  --filter.health.startsWithIgnoreCase=<value>
  --filter.healthWithAge.contains=<value>
  --filter.healthWithAge.containsIgnoreCase=<value>
  --filter.healthWithAge.containsIgnoreCaseAndAccent=<value>
  --filter.healthWithAge.endsWith=<value>
  --filter.healthWithAge.eq=<value>
  --filter.healthWithAge.eqIgnoreCase=<value>
  --filter.healthWithAge.in=<value>...
  --filter.healthWithAge.neq=<value>
  --filter.healthWithAge.neqIgnoreCase=<value>
  --filter.healthWithAge.nin=<value>...
  --filter.healthWithAge.notContains=<value>
  --filter.healthWithAge.notContainsIgnoreCase=<value>
  --filter.healthWithAge.notEndsWith=<value>
  --filter.healthWithAge.notStartsWith=<value>
  --filter.healthWithAge.startsWith=<value>
  --filter.healthWithAge.startsWithIgnoreCase=<value>
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.lead.null
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.startDate.null
  --filter.startedAt.null
  --filter.state.contains=<value>
  --filter.state.containsIgnoreCase=<value>
  --filter.state.containsIgnoreCaseAndAccent=<value>
  --filter.state.endsWith=<value>
  --filter.state.eq=<value>
  --filter.state.eqIgnoreCase=<value>
  --filter.state.in=<value>...
  --filter.state.neq=<value>
  --filter.state.neqIgnoreCase=<value>
  --filter.state.nin=<value>...
  --filter.state.notContains=<value>
  --filter.state.notContainsIgnoreCase=<value>
  --filter.state.notEndsWith=<value>
  --filter.state.notStartsWith=<value>
  --filter.state.startsWith=<value>
  --filter.state.startsWithIgnoreCase=<value>
  --filter.targetDate.null
  --first=<value>
  --includeArchived
  --includeSubInitiatives
  --last=<value>
  --orderBy=<option>                                          <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiative_projects

EXAMPLES
  $ linear initiative projects
```

## `linear initiative sub-initiatives ID`

Runs initiative_subInitiatives

```
USAGE
  $ linear initiative sub-initiatives ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.activityType.contains <value>] [--filter.activityType.containsIgnoreCase <value>]
    [--filter.activityType.containsIgnoreCaseAndAccent <value>] [--filter.activityType.endsWith <value>]
    [--filter.activityType.eq <value>] [--filter.activityType.eqIgnoreCase <value>] [--filter.activityType.in
    <value>...] [--filter.activityType.neq <value>] [--filter.activityType.neqIgnoreCase <value>]
    [--filter.activityType.nin <value>...] [--filter.activityType.notContains <value>]
    [--filter.activityType.notContainsIgnoreCase <value>] [--filter.activityType.notEndsWith <value>]
    [--filter.activityType.notStartsWith <value>] [--filter.activityType.startsWith <value>]
    [--filter.activityType.startsWithIgnoreCase <value>] [--filter.creator.null] [--filter.health.contains <value>]
    [--filter.health.containsIgnoreCase <value>] [--filter.health.containsIgnoreCaseAndAccent <value>]
    [--filter.health.endsWith <value>] [--filter.health.eq <value>] [--filter.health.eqIgnoreCase <value>]
    [--filter.health.in <value>...] [--filter.health.neq <value>] [--filter.health.neqIgnoreCase <value>]
    [--filter.health.nin <value>...] [--filter.health.notContains <value>] [--filter.health.notContainsIgnoreCase
    <value>] [--filter.health.notEndsWith <value>] [--filter.health.notStartsWith <value>] [--filter.health.startsWith
    <value>] [--filter.health.startsWithIgnoreCase <value>] [--filter.healthWithAge.contains <value>]
    [--filter.healthWithAge.containsIgnoreCase <value>] [--filter.healthWithAge.containsIgnoreCaseAndAccent <value>]
    [--filter.healthWithAge.endsWith <value>] [--filter.healthWithAge.eq <value>] [--filter.healthWithAge.eqIgnoreCase
    <value>] [--filter.healthWithAge.in <value>...] [--filter.healthWithAge.neq <value>]
    [--filter.healthWithAge.neqIgnoreCase <value>] [--filter.healthWithAge.nin <value>...]
    [--filter.healthWithAge.notContains <value>] [--filter.healthWithAge.notContainsIgnoreCase <value>]
    [--filter.healthWithAge.notEndsWith <value>] [--filter.healthWithAge.notStartsWith <value>]
    [--filter.healthWithAge.startsWith <value>] [--filter.healthWithAge.startsWithIgnoreCase <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.owner.null]
    [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.status.contains <value>] [--filter.status.containsIgnoreCase <value>]
    [--filter.status.containsIgnoreCaseAndAccent <value>] [--filter.status.endsWith <value>] [--filter.status.eq
    <value>] [--filter.status.eqIgnoreCase <value>] [--filter.status.in <value>...] [--filter.status.neq <value>]
    [--filter.status.neqIgnoreCase <value>] [--filter.status.nin <value>...] [--filter.status.notContains <value>]
    [--filter.status.notContainsIgnoreCase <value>] [--filter.status.notEndsWith <value>] [--filter.status.notStartsWith
    <value>] [--filter.status.startsWith <value>] [--filter.status.startsWithIgnoreCase <value>]
    [--filter.targetDate.null] [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.activityType.contains=<value>
  --filter.activityType.containsIgnoreCase=<value>
  --filter.activityType.containsIgnoreCaseAndAccent=<value>
  --filter.activityType.endsWith=<value>
  --filter.activityType.eq=<value>
  --filter.activityType.eqIgnoreCase=<value>
  --filter.activityType.in=<value>...
  --filter.activityType.neq=<value>
  --filter.activityType.neqIgnoreCase=<value>
  --filter.activityType.nin=<value>...
  --filter.activityType.notContains=<value>
  --filter.activityType.notContainsIgnoreCase=<value>
  --filter.activityType.notEndsWith=<value>
  --filter.activityType.notStartsWith=<value>
  --filter.activityType.startsWith=<value>
  --filter.activityType.startsWithIgnoreCase=<value>
  --filter.creator.null
  --filter.health.contains=<value>
  --filter.health.containsIgnoreCase=<value>
  --filter.health.containsIgnoreCaseAndAccent=<value>
  --filter.health.endsWith=<value>
  --filter.health.eq=<value>
  --filter.health.eqIgnoreCase=<value>
  --filter.health.in=<value>...
  --filter.health.neq=<value>
  --filter.health.neqIgnoreCase=<value>
  --filter.health.nin=<value>...
  --filter.health.notContains=<value>
  --filter.health.notContainsIgnoreCase=<value>
  --filter.health.notEndsWith=<value>
  --filter.health.notStartsWith=<value>
  --filter.health.startsWith=<value>
  --filter.health.startsWithIgnoreCase=<value>
  --filter.healthWithAge.contains=<value>
  --filter.healthWithAge.containsIgnoreCase=<value>
  --filter.healthWithAge.containsIgnoreCaseAndAccent=<value>
  --filter.healthWithAge.endsWith=<value>
  --filter.healthWithAge.eq=<value>
  --filter.healthWithAge.eqIgnoreCase=<value>
  --filter.healthWithAge.in=<value>...
  --filter.healthWithAge.neq=<value>
  --filter.healthWithAge.neqIgnoreCase=<value>
  --filter.healthWithAge.nin=<value>...
  --filter.healthWithAge.notContains=<value>
  --filter.healthWithAge.notContainsIgnoreCase=<value>
  --filter.healthWithAge.notEndsWith=<value>
  --filter.healthWithAge.notStartsWith=<value>
  --filter.healthWithAge.startsWith=<value>
  --filter.healthWithAge.startsWithIgnoreCase=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.owner.null
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.status.contains=<value>
  --filter.status.containsIgnoreCase=<value>
  --filter.status.containsIgnoreCaseAndAccent=<value>
  --filter.status.endsWith=<value>
  --filter.status.eq=<value>
  --filter.status.eqIgnoreCase=<value>
  --filter.status.in=<value>...
  --filter.status.neq=<value>
  --filter.status.neqIgnoreCase=<value>
  --filter.status.nin=<value>...
  --filter.status.notContains=<value>
  --filter.status.notContainsIgnoreCase=<value>
  --filter.status.notEndsWith=<value>
  --filter.status.notStartsWith=<value>
  --filter.status.startsWith=<value>
  --filter.status.startsWithIgnoreCase=<value>
  --filter.targetDate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                          <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiative_subInitiatives

EXAMPLES
  $ linear initiative sub-initiatives
```

## `linear initiative view ID`

Runs initiative

```
USAGE
  $ linear initiative view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs initiative

EXAMPLES
  $ linear initiative view
```

## `linear issue attachments ID`

Runs issue_attachments

```
USAGE
  $ linear issue attachments ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.creator.null] [--filter.sourceType.contains <value>] [--filter.sourceType.containsIgnoreCase <value>]
    [--filter.sourceType.containsIgnoreCaseAndAccent <value>] [--filter.sourceType.endsWith <value>]
    [--filter.sourceType.eq <value>] [--filter.sourceType.eqIgnoreCase <value>] [--filter.sourceType.in <value>...]
    [--filter.sourceType.neq <value>] [--filter.sourceType.neqIgnoreCase <value>] [--filter.sourceType.nin <value>...]
    [--filter.sourceType.notContains <value>] [--filter.sourceType.notContainsIgnoreCase <value>]
    [--filter.sourceType.notEndsWith <value>] [--filter.sourceType.notStartsWith <value>]
    [--filter.sourceType.startsWith <value>] [--filter.sourceType.startsWithIgnoreCase <value>]
    [--filter.subtitle.contains <value>] [--filter.subtitle.containsIgnoreCase <value>]
    [--filter.subtitle.containsIgnoreCaseAndAccent <value>] [--filter.subtitle.endsWith <value>] [--filter.subtitle.eq
    <value>] [--filter.subtitle.eqIgnoreCase <value>] [--filter.subtitle.in <value>...] [--filter.subtitle.neq <value>]
    [--filter.subtitle.neqIgnoreCase <value>] [--filter.subtitle.nin <value>...] [--filter.subtitle.notContains <value>]
    [--filter.subtitle.notContainsIgnoreCase <value>] [--filter.subtitle.notEndsWith <value>]
    [--filter.subtitle.notStartsWith <value>] [--filter.subtitle.null] [--filter.subtitle.startsWith <value>]
    [--filter.subtitle.startsWithIgnoreCase <value>] [--filter.title.contains <value>]
    [--filter.title.containsIgnoreCase <value>] [--filter.title.containsIgnoreCaseAndAccent <value>]
    [--filter.title.endsWith <value>] [--filter.title.eq <value>] [--filter.title.eqIgnoreCase <value>]
    [--filter.title.in <value>...] [--filter.title.neq <value>] [--filter.title.neqIgnoreCase <value>]
    [--filter.title.nin <value>...] [--filter.title.notContains <value>] [--filter.title.notContainsIgnoreCase <value>]
    [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith <value>] [--filter.title.startsWith <value>]
    [--filter.title.startsWithIgnoreCase <value>] [--filter.url.contains <value>] [--filter.url.containsIgnoreCase
    <value>] [--filter.url.containsIgnoreCaseAndAccent <value>] [--filter.url.endsWith <value>] [--filter.url.eq
    <value>] [--filter.url.eqIgnoreCase <value>] [--filter.url.in <value>...] [--filter.url.neq <value>]
    [--filter.url.neqIgnoreCase <value>] [--filter.url.nin <value>...] [--filter.url.notContains <value>]
    [--filter.url.notContainsIgnoreCase <value>] [--filter.url.notEndsWith <value>] [--filter.url.notStartsWith <value>]
    [--filter.url.startsWith <value>] [--filter.url.startsWithIgnoreCase <value>] [--first <value>] [--includeArchived]
    [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.creator.null
  --filter.sourceType.contains=<value>
  --filter.sourceType.containsIgnoreCase=<value>
  --filter.sourceType.containsIgnoreCaseAndAccent=<value>
  --filter.sourceType.endsWith=<value>
  --filter.sourceType.eq=<value>
  --filter.sourceType.eqIgnoreCase=<value>
  --filter.sourceType.in=<value>...
  --filter.sourceType.neq=<value>
  --filter.sourceType.neqIgnoreCase=<value>
  --filter.sourceType.nin=<value>...
  --filter.sourceType.notContains=<value>
  --filter.sourceType.notContainsIgnoreCase=<value>
  --filter.sourceType.notEndsWith=<value>
  --filter.sourceType.notStartsWith=<value>
  --filter.sourceType.startsWith=<value>
  --filter.sourceType.startsWithIgnoreCase=<value>
  --filter.subtitle.contains=<value>
  --filter.subtitle.containsIgnoreCase=<value>
  --filter.subtitle.containsIgnoreCaseAndAccent=<value>
  --filter.subtitle.endsWith=<value>
  --filter.subtitle.eq=<value>
  --filter.subtitle.eqIgnoreCase=<value>
  --filter.subtitle.in=<value>...
  --filter.subtitle.neq=<value>
  --filter.subtitle.neqIgnoreCase=<value>
  --filter.subtitle.nin=<value>...
  --filter.subtitle.notContains=<value>
  --filter.subtitle.notContainsIgnoreCase=<value>
  --filter.subtitle.notEndsWith=<value>
  --filter.subtitle.notStartsWith=<value>
  --filter.subtitle.null
  --filter.subtitle.startsWith=<value>
  --filter.subtitle.startsWithIgnoreCase=<value>
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.url.contains=<value>
  --filter.url.containsIgnoreCase=<value>
  --filter.url.containsIgnoreCaseAndAccent=<value>
  --filter.url.endsWith=<value>
  --filter.url.eq=<value>
  --filter.url.eqIgnoreCase=<value>
  --filter.url.in=<value>...
  --filter.url.neq=<value>
  --filter.url.neqIgnoreCase=<value>
  --filter.url.nin=<value>...
  --filter.url.notContains=<value>
  --filter.url.notContainsIgnoreCase=<value>
  --filter.url.notEndsWith=<value>
  --filter.url.notStartsWith=<value>
  --filter.url.startsWith=<value>
  --filter.url.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                       <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_attachments

EXAMPLES
  $ linear issue attachments
```

## `linear issue bot-actor ID`

Runs issue_botActor

```
USAGE
  $ linear issue bot-actor ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_botActor

EXAMPLES
  $ linear issue bot-actor
```

## `linear issue children ID`

Runs issue_children

```
USAGE
  $ linear issue children ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_children

EXAMPLES
  $ linear issue children
```

## `linear issue comments ID`

Runs issue_comments

```
USAGE
  $ linear issue comments ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.body.contains <value>] [--filter.body.containsIgnoreCase <value>]
    [--filter.body.containsIgnoreCaseAndAccent <value>] [--filter.body.endsWith <value>] [--filter.body.eq <value>]
    [--filter.body.eqIgnoreCase <value>] [--filter.body.in <value>...] [--filter.body.neq <value>]
    [--filter.body.neqIgnoreCase <value>] [--filter.body.nin <value>...] [--filter.body.notContains <value>]
    [--filter.body.notContainsIgnoreCase <value>] [--filter.body.notEndsWith <value>] [--filter.body.notStartsWith
    <value>] [--filter.body.startsWith <value>] [--filter.body.startsWithIgnoreCase <value>]
    [--filter.documentContent.null] [--filter.issue.null] [--filter.parent.null] [--filter.projectUpdate.null] [--first
    <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.body.contains=<value>
  --filter.body.containsIgnoreCase=<value>
  --filter.body.containsIgnoreCaseAndAccent=<value>
  --filter.body.endsWith=<value>
  --filter.body.eq=<value>
  --filter.body.eqIgnoreCase=<value>
  --filter.body.in=<value>...
  --filter.body.neq=<value>
  --filter.body.neqIgnoreCase=<value>
  --filter.body.nin=<value>...
  --filter.body.notContains=<value>
  --filter.body.notContainsIgnoreCase=<value>
  --filter.body.notEndsWith=<value>
  --filter.body.notStartsWith=<value>
  --filter.body.startsWith=<value>
  --filter.body.startsWithIgnoreCase=<value>
  --filter.documentContent.null
  --filter.issue.null
  --filter.parent.null
  --filter.projectUpdate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_comments

EXAMPLES
  $ linear issue comments
```

## `linear issue documents ID`

Runs issue_documents

```
USAGE
  $ linear issue documents ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>] [--first <value>]
    [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                   <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_documents

EXAMPLES
  $ linear issue documents
```

## `linear issue former-attachments ID`

Runs issue_formerAttachments

```
USAGE
  $ linear issue former-attachments ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.creator.null] [--filter.sourceType.contains <value>] [--filter.sourceType.containsIgnoreCase <value>]
    [--filter.sourceType.containsIgnoreCaseAndAccent <value>] [--filter.sourceType.endsWith <value>]
    [--filter.sourceType.eq <value>] [--filter.sourceType.eqIgnoreCase <value>] [--filter.sourceType.in <value>...]
    [--filter.sourceType.neq <value>] [--filter.sourceType.neqIgnoreCase <value>] [--filter.sourceType.nin <value>...]
    [--filter.sourceType.notContains <value>] [--filter.sourceType.notContainsIgnoreCase <value>]
    [--filter.sourceType.notEndsWith <value>] [--filter.sourceType.notStartsWith <value>]
    [--filter.sourceType.startsWith <value>] [--filter.sourceType.startsWithIgnoreCase <value>]
    [--filter.subtitle.contains <value>] [--filter.subtitle.containsIgnoreCase <value>]
    [--filter.subtitle.containsIgnoreCaseAndAccent <value>] [--filter.subtitle.endsWith <value>] [--filter.subtitle.eq
    <value>] [--filter.subtitle.eqIgnoreCase <value>] [--filter.subtitle.in <value>...] [--filter.subtitle.neq <value>]
    [--filter.subtitle.neqIgnoreCase <value>] [--filter.subtitle.nin <value>...] [--filter.subtitle.notContains <value>]
    [--filter.subtitle.notContainsIgnoreCase <value>] [--filter.subtitle.notEndsWith <value>]
    [--filter.subtitle.notStartsWith <value>] [--filter.subtitle.null] [--filter.subtitle.startsWith <value>]
    [--filter.subtitle.startsWithIgnoreCase <value>] [--filter.title.contains <value>]
    [--filter.title.containsIgnoreCase <value>] [--filter.title.containsIgnoreCaseAndAccent <value>]
    [--filter.title.endsWith <value>] [--filter.title.eq <value>] [--filter.title.eqIgnoreCase <value>]
    [--filter.title.in <value>...] [--filter.title.neq <value>] [--filter.title.neqIgnoreCase <value>]
    [--filter.title.nin <value>...] [--filter.title.notContains <value>] [--filter.title.notContainsIgnoreCase <value>]
    [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith <value>] [--filter.title.startsWith <value>]
    [--filter.title.startsWithIgnoreCase <value>] [--filter.url.contains <value>] [--filter.url.containsIgnoreCase
    <value>] [--filter.url.containsIgnoreCaseAndAccent <value>] [--filter.url.endsWith <value>] [--filter.url.eq
    <value>] [--filter.url.eqIgnoreCase <value>] [--filter.url.in <value>...] [--filter.url.neq <value>]
    [--filter.url.neqIgnoreCase <value>] [--filter.url.nin <value>...] [--filter.url.notContains <value>]
    [--filter.url.notContainsIgnoreCase <value>] [--filter.url.notEndsWith <value>] [--filter.url.notStartsWith <value>]
    [--filter.url.startsWith <value>] [--filter.url.startsWithIgnoreCase <value>] [--first <value>] [--includeArchived]
    [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.creator.null
  --filter.sourceType.contains=<value>
  --filter.sourceType.containsIgnoreCase=<value>
  --filter.sourceType.containsIgnoreCaseAndAccent=<value>
  --filter.sourceType.endsWith=<value>
  --filter.sourceType.eq=<value>
  --filter.sourceType.eqIgnoreCase=<value>
  --filter.sourceType.in=<value>...
  --filter.sourceType.neq=<value>
  --filter.sourceType.neqIgnoreCase=<value>
  --filter.sourceType.nin=<value>...
  --filter.sourceType.notContains=<value>
  --filter.sourceType.notContainsIgnoreCase=<value>
  --filter.sourceType.notEndsWith=<value>
  --filter.sourceType.notStartsWith=<value>
  --filter.sourceType.startsWith=<value>
  --filter.sourceType.startsWithIgnoreCase=<value>
  --filter.subtitle.contains=<value>
  --filter.subtitle.containsIgnoreCase=<value>
  --filter.subtitle.containsIgnoreCaseAndAccent=<value>
  --filter.subtitle.endsWith=<value>
  --filter.subtitle.eq=<value>
  --filter.subtitle.eqIgnoreCase=<value>
  --filter.subtitle.in=<value>...
  --filter.subtitle.neq=<value>
  --filter.subtitle.neqIgnoreCase=<value>
  --filter.subtitle.nin=<value>...
  --filter.subtitle.notContains=<value>
  --filter.subtitle.notContainsIgnoreCase=<value>
  --filter.subtitle.notEndsWith=<value>
  --filter.subtitle.notStartsWith=<value>
  --filter.subtitle.null
  --filter.subtitle.startsWith=<value>
  --filter.subtitle.startsWithIgnoreCase=<value>
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.url.contains=<value>
  --filter.url.containsIgnoreCase=<value>
  --filter.url.containsIgnoreCaseAndAccent=<value>
  --filter.url.endsWith=<value>
  --filter.url.eq=<value>
  --filter.url.eqIgnoreCase=<value>
  --filter.url.in=<value>...
  --filter.url.neq=<value>
  --filter.url.neqIgnoreCase=<value>
  --filter.url.nin=<value>...
  --filter.url.notContains=<value>
  --filter.url.notContainsIgnoreCase=<value>
  --filter.url.notEndsWith=<value>
  --filter.url.notStartsWith=<value>
  --filter.url.startsWith=<value>
  --filter.url.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                       <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_formerAttachments

EXAMPLES
  $ linear issue former-attachments
```

## `linear issue former-needs ID`

Runs issue_formerNeeds

```
USAGE
  $ linear issue former-needs ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.comment.null] [--filter.customer.null] [--filter.issue.null] [--filter.priority.eq <value>]
    [--filter.priority.gt <value>] [--filter.priority.gte <value>] [--filter.priority.in <value>...]
    [--filter.priority.lt <value>] [--filter.priority.lte <value>] [--filter.priority.neq <value>]
    [--filter.priority.nin <value>...] [--filter.project.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.comment.null
  --filter.customer.null
  --filter.issue.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.project.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_formerNeeds

EXAMPLES
  $ linear issue former-needs
```

## `linear issue history ID`

Runs issue_history

```
USAGE
  $ linear issue history ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_history

EXAMPLES
  $ linear issue history
```

## `linear issue inverse-relations ID`

Runs issue_inverseRelations

```
USAGE
  $ linear issue inverse-relations ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_inverseRelations

EXAMPLES
  $ linear issue inverse-relations
```

## `linear issue labels ID`

Runs issue_labels

```
USAGE
  $ linear issue labels ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.creator.null] [--filter.isGroup.eq] [--filter.isGroup.neq] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--filter.team.null] [--first <value>] [--includeArchived] [--last
    <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.creator.null
  --filter.isGroup.eq
  --filter.isGroup.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.team.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_labels

EXAMPLES
  $ linear issue labels
```

## `linear issue list`

Runs issues

```
USAGE
  $ linear issue list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issues

EXAMPLES
  $ linear issue list
```

## `linear issue needs ID`

Runs issue_needs

```
USAGE
  $ linear issue needs ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.comment.null] [--filter.customer.null] [--filter.issue.null] [--filter.priority.eq <value>]
    [--filter.priority.gt <value>] [--filter.priority.gte <value>] [--filter.priority.in <value>...]
    [--filter.priority.lt <value>] [--filter.priority.lte <value>] [--filter.priority.neq <value>]
    [--filter.priority.nin <value>...] [--filter.project.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.comment.null
  --filter.customer.null
  --filter.issue.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.project.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_needs

EXAMPLES
  $ linear issue needs
```

## `linear issue relations ID`

Runs issue_relations

```
USAGE
  $ linear issue relations ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_relations

EXAMPLES
  $ linear issue relations
```

## `linear issue subscribers ID`

Runs issue_subscribers

```
USAGE
  $ linear issue subscribers ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.active.eq] [--filter.active.neq] [--filter.admin.eq] [--filter.admin.neq] [--filter.app.eq]
    [--filter.app.neq] [--filter.displayName.contains <value>] [--filter.displayName.containsIgnoreCase <value>]
    [--filter.displayName.containsIgnoreCaseAndAccent <value>] [--filter.displayName.endsWith <value>]
    [--filter.displayName.eq <value>] [--filter.displayName.eqIgnoreCase <value>] [--filter.displayName.in <value>...]
    [--filter.displayName.neq <value>] [--filter.displayName.neqIgnoreCase <value>] [--filter.displayName.nin
    <value>...] [--filter.displayName.notContains <value>] [--filter.displayName.notContainsIgnoreCase <value>]
    [--filter.displayName.notEndsWith <value>] [--filter.displayName.notStartsWith <value>]
    [--filter.displayName.startsWith <value>] [--filter.displayName.startsWithIgnoreCase <value>]
    [--filter.email.contains <value>] [--filter.email.containsIgnoreCase <value>]
    [--filter.email.containsIgnoreCaseAndAccent <value>] [--filter.email.endsWith <value>] [--filter.email.eq <value>]
    [--filter.email.eqIgnoreCase <value>] [--filter.email.in <value>...] [--filter.email.neq <value>]
    [--filter.email.neqIgnoreCase <value>] [--filter.email.nin <value>...] [--filter.email.notContains <value>]
    [--filter.email.notContainsIgnoreCase <value>] [--filter.email.notEndsWith <value>] [--filter.email.notStartsWith
    <value>] [--filter.email.startsWith <value>] [--filter.email.startsWithIgnoreCase <value>] [--filter.invited.eq]
    [--filter.invited.neq] [--filter.isInvited.eq] [--filter.isInvited.neq] [--filter.isMe.eq] [--filter.isMe.neq]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.owner.eq]
    [--filter.owner.neq] [--first <value>] [--includeArchived] [--includeDisabled] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.active.eq
  --filter.active.neq
  --filter.admin.eq
  --filter.admin.neq
  --filter.app.eq
  --filter.app.neq
  --filter.displayName.contains=<value>
  --filter.displayName.containsIgnoreCase=<value>
  --filter.displayName.containsIgnoreCaseAndAccent=<value>
  --filter.displayName.endsWith=<value>
  --filter.displayName.eq=<value>
  --filter.displayName.eqIgnoreCase=<value>
  --filter.displayName.in=<value>...
  --filter.displayName.neq=<value>
  --filter.displayName.neqIgnoreCase=<value>
  --filter.displayName.nin=<value>...
  --filter.displayName.notContains=<value>
  --filter.displayName.notContainsIgnoreCase=<value>
  --filter.displayName.notEndsWith=<value>
  --filter.displayName.notStartsWith=<value>
  --filter.displayName.startsWith=<value>
  --filter.displayName.startsWithIgnoreCase=<value>
  --filter.email.contains=<value>
  --filter.email.containsIgnoreCase=<value>
  --filter.email.containsIgnoreCaseAndAccent=<value>
  --filter.email.endsWith=<value>
  --filter.email.eq=<value>
  --filter.email.eqIgnoreCase=<value>
  --filter.email.in=<value>...
  --filter.email.neq=<value>
  --filter.email.neqIgnoreCase=<value>
  --filter.email.nin=<value>...
  --filter.email.notContains=<value>
  --filter.email.notContainsIgnoreCase=<value>
  --filter.email.notEndsWith=<value>
  --filter.email.notStartsWith=<value>
  --filter.email.startsWith=<value>
  --filter.email.startsWithIgnoreCase=<value>
  --filter.invited.eq
  --filter.invited.neq
  --filter.isInvited.eq
  --filter.isInvited.neq
  --filter.isMe.eq
  --filter.isMe.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.owner.eq
  --filter.owner.neq
  --first=<value>
  --includeArchived
  --includeDisabled
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue_subscribers

EXAMPLES
  $ linear issue subscribers
```

## `linear issue view ID`

Runs issue

```
USAGE
  $ linear issue view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs issue

EXAMPLES
  $ linear issue view
```

## `linear organization`

Runs organization

```
USAGE
  $ linear organization [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs organization

EXAMPLES
  $ linear organization
```

## `linear organization integrations`

Runs organization_integrations

```
USAGE
  $ linear organization integrations [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs organization_integrations

EXAMPLES
  $ linear organization integrations
```

## `linear organization labels`

Runs organization_labels

```
USAGE
  $ linear organization labels [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.creator.null] [--filter.isGroup.eq] [--filter.isGroup.neq] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--filter.team.null] [--first <value>] [--includeArchived] [--last
    <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.creator.null
  --filter.isGroup.eq
  --filter.isGroup.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.team.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs organization_labels

EXAMPLES
  $ linear organization labels
```

## `linear organization project-labels`

Runs organization_projectLabels

```
USAGE
  $ linear organization project-labels [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.creator.null] [--filter.isGroup.eq] [--filter.isGroup.neq] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.creator.null
  --filter.isGroup.eq
  --filter.isGroup.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs organization_projectLabels

EXAMPLES
  $ linear organization project-labels
```

## `linear organization subscription`

Runs organization_subscription

```
USAGE
  $ linear organization subscription [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs organization_subscription

EXAMPLES
  $ linear organization subscription
```

## `linear organization teams`

Runs organization_teams

```
USAGE
  $ linear organization teams [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>] [--filter.key.contains
    <value>] [--filter.key.containsIgnoreCase <value>] [--filter.key.containsIgnoreCaseAndAccent <value>]
    [--filter.key.endsWith <value>] [--filter.key.eq <value>] [--filter.key.eqIgnoreCase <value>] [--filter.key.in
    <value>...] [--filter.key.neq <value>] [--filter.key.neqIgnoreCase <value>] [--filter.key.nin <value>...]
    [--filter.key.notContains <value>] [--filter.key.notContainsIgnoreCase <value>] [--filter.key.notEndsWith <value>]
    [--filter.key.notStartsWith <value>] [--filter.key.startsWith <value>] [--filter.key.startsWithIgnoreCase <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.parent.null]
    [--filter.private.eq] [--filter.private.neq] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.key.contains=<value>
  --filter.key.containsIgnoreCase=<value>
  --filter.key.containsIgnoreCaseAndAccent=<value>
  --filter.key.endsWith=<value>
  --filter.key.eq=<value>
  --filter.key.eqIgnoreCase=<value>
  --filter.key.in=<value>...
  --filter.key.neq=<value>
  --filter.key.neqIgnoreCase=<value>
  --filter.key.nin=<value>...
  --filter.key.notContains=<value>
  --filter.key.notContainsIgnoreCase=<value>
  --filter.key.notEndsWith=<value>
  --filter.key.notStartsWith=<value>
  --filter.key.startsWith=<value>
  --filter.key.startsWithIgnoreCase=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.parent.null
  --filter.private.eq
  --filter.private.neq
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs organization_teams

EXAMPLES
  $ linear organization teams
```

## `linear organization templates`

Runs organization_templates

```
USAGE
  $ linear organization templates [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.null]
    [--filter.type.contains <value>] [--filter.type.containsIgnoreCase <value>]
    [--filter.type.containsIgnoreCaseAndAccent <value>] [--filter.type.endsWith <value>] [--filter.type.eq <value>]
    [--filter.type.eqIgnoreCase <value>] [--filter.type.in <value>...] [--filter.type.neq <value>]
    [--filter.type.neqIgnoreCase <value>] [--filter.type.nin <value>...] [--filter.type.notContains <value>]
    [--filter.type.notContainsIgnoreCase <value>] [--filter.type.notEndsWith <value>] [--filter.type.notStartsWith
    <value>] [--filter.type.startsWith <value>] [--filter.type.startsWithIgnoreCase <value>] [--first <value>]
    [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.null
  --filter.type.contains=<value>
  --filter.type.containsIgnoreCase=<value>
  --filter.type.containsIgnoreCaseAndAccent=<value>
  --filter.type.endsWith=<value>
  --filter.type.eq=<value>
  --filter.type.eqIgnoreCase=<value>
  --filter.type.in=<value>...
  --filter.type.neq=<value>
  --filter.type.neqIgnoreCase=<value>
  --filter.type.nin=<value>...
  --filter.type.notContains=<value>
  --filter.type.notContainsIgnoreCase=<value>
  --filter.type.notEndsWith=<value>
  --filter.type.notStartsWith=<value>
  --filter.type.startsWith=<value>
  --filter.type.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs organization_templates

EXAMPLES
  $ linear organization templates
```

## `linear organization users`

Runs organization_users

```
USAGE
  $ linear organization users [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--includeDisabled] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --includeDisabled
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs organization_users

EXAMPLES
  $ linear organization users
```

## `linear project-status list`

Runs projectStatuses

```
USAGE
  $ linear project-status list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs projectStatuses

EXAMPLES
  $ linear project-status list
```

## `linear project-status view ID`

Runs projectStatus

```
USAGE
  $ linear project-status view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs projectStatus

EXAMPLES
  $ linear project-status view
```

## `linear project-update comments ID`

Runs projectUpdate_comments

```
USAGE
  $ linear project-update comments ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.body.contains <value>] [--filter.body.containsIgnoreCase <value>]
    [--filter.body.containsIgnoreCaseAndAccent <value>] [--filter.body.endsWith <value>] [--filter.body.eq <value>]
    [--filter.body.eqIgnoreCase <value>] [--filter.body.in <value>...] [--filter.body.neq <value>]
    [--filter.body.neqIgnoreCase <value>] [--filter.body.nin <value>...] [--filter.body.notContains <value>]
    [--filter.body.notContainsIgnoreCase <value>] [--filter.body.notEndsWith <value>] [--filter.body.notStartsWith
    <value>] [--filter.body.startsWith <value>] [--filter.body.startsWithIgnoreCase <value>]
    [--filter.documentContent.null] [--filter.issue.null] [--filter.parent.null] [--filter.projectUpdate.null] [--first
    <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.body.contains=<value>
  --filter.body.containsIgnoreCase=<value>
  --filter.body.containsIgnoreCaseAndAccent=<value>
  --filter.body.endsWith=<value>
  --filter.body.eq=<value>
  --filter.body.eqIgnoreCase=<value>
  --filter.body.in=<value>...
  --filter.body.neq=<value>
  --filter.body.neqIgnoreCase=<value>
  --filter.body.nin=<value>...
  --filter.body.notContains=<value>
  --filter.body.notContainsIgnoreCase=<value>
  --filter.body.notEndsWith=<value>
  --filter.body.notStartsWith=<value>
  --filter.body.startsWith=<value>
  --filter.body.startsWithIgnoreCase=<value>
  --filter.documentContent.null
  --filter.issue.null
  --filter.parent.null
  --filter.projectUpdate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs projectUpdate_comments

EXAMPLES
  $ linear project-update comments
```

## `linear project-update list`

Runs projectUpdates

```
USAGE
  $ linear project-update list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs projectUpdates

EXAMPLES
  $ linear project-update list
```

## `linear project-update view ID`

Runs projectUpdate

```
USAGE
  $ linear project-update view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs projectUpdate

EXAMPLES
  $ linear project-update view
```

## `linear project comments ID`

Runs project_comments

```
USAGE
  $ linear project comments ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.body.contains <value>] [--filter.body.containsIgnoreCase <value>]
    [--filter.body.containsIgnoreCaseAndAccent <value>] [--filter.body.endsWith <value>] [--filter.body.eq <value>]
    [--filter.body.eqIgnoreCase <value>] [--filter.body.in <value>...] [--filter.body.neq <value>]
    [--filter.body.neqIgnoreCase <value>] [--filter.body.nin <value>...] [--filter.body.notContains <value>]
    [--filter.body.notContainsIgnoreCase <value>] [--filter.body.notEndsWith <value>] [--filter.body.notStartsWith
    <value>] [--filter.body.startsWith <value>] [--filter.body.startsWithIgnoreCase <value>]
    [--filter.documentContent.null] [--filter.issue.null] [--filter.parent.null] [--filter.projectUpdate.null] [--first
    <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.body.contains=<value>
  --filter.body.containsIgnoreCase=<value>
  --filter.body.containsIgnoreCaseAndAccent=<value>
  --filter.body.endsWith=<value>
  --filter.body.eq=<value>
  --filter.body.eqIgnoreCase=<value>
  --filter.body.in=<value>...
  --filter.body.neq=<value>
  --filter.body.neqIgnoreCase=<value>
  --filter.body.nin=<value>...
  --filter.body.notContains=<value>
  --filter.body.notContainsIgnoreCase=<value>
  --filter.body.notEndsWith=<value>
  --filter.body.notStartsWith=<value>
  --filter.body.startsWith=<value>
  --filter.body.startsWithIgnoreCase=<value>
  --filter.documentContent.null
  --filter.issue.null
  --filter.parent.null
  --filter.projectUpdate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_comments

EXAMPLES
  $ linear project comments
```

## `linear project document-content ID`

Runs project_documentContent

```
USAGE
  $ linear project document-content ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_documentContent

EXAMPLES
  $ linear project document-content
```

## `linear project document-content ai-prompt-rules ID`

Runs project_documentContent_aiPromptRules

```
USAGE
  $ linear project document-content ai-prompt-rules ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_documentContent_aiPromptRules

EXAMPLES
  $ linear project document-content ai-prompt-rules
```

## `linear project documents ID`

Runs project_documents

```
USAGE
  $ linear project documents ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>] [--first <value>]
    [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                   <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_documents

EXAMPLES
  $ linear project documents
```

## `linear project external-links ID`

Runs project_externalLinks

```
USAGE
  $ linear project external-links ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_externalLinks

EXAMPLES
  $ linear project external-links
```

## `linear project history ID`

Runs project_history

```
USAGE
  $ linear project history ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_history

EXAMPLES
  $ linear project history
```

## `linear project initiatives ID`

Runs project_initiatives

```
USAGE
  $ linear project initiatives ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_initiatives

EXAMPLES
  $ linear project initiatives
```

## `linear project issues ID`

Runs project_issues

```
USAGE
  $ linear project issues ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_issues

EXAMPLES
  $ linear project issues
```

## `linear project labels ID`

Runs project_labels

```
USAGE
  $ linear project labels ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.creator.null] [--filter.isGroup.eq] [--filter.isGroup.neq] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.creator.null
  --filter.isGroup.eq
  --filter.isGroup.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_labels

EXAMPLES
  $ linear project labels
```

## `linear project list`

Runs projects

```
USAGE
  $ linear project list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.activityType.contains <value>] [--filter.activityType.containsIgnoreCase <value>]
    [--filter.activityType.containsIgnoreCaseAndAccent <value>] [--filter.activityType.endsWith <value>]
    [--filter.activityType.eq <value>] [--filter.activityType.eqIgnoreCase <value>] [--filter.activityType.in
    <value>...] [--filter.activityType.neq <value>] [--filter.activityType.neqIgnoreCase <value>]
    [--filter.activityType.nin <value>...] [--filter.activityType.notContains <value>]
    [--filter.activityType.notContainsIgnoreCase <value>] [--filter.activityType.notEndsWith <value>]
    [--filter.activityType.notStartsWith <value>] [--filter.activityType.startsWith <value>]
    [--filter.activityType.startsWithIgnoreCase <value>] [--filter.canceledAt.null] [--filter.completedAt.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.hasBlockedByRelations.eq]
    [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq] [--filter.hasBlockingRelations.neq]
    [--filter.hasDependedOnByRelations.eq] [--filter.hasDependedOnByRelations.neq] [--filter.hasDependsOnRelations.eq]
    [--filter.hasDependsOnRelations.neq] [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq]
    [--filter.hasViolatedRelations.eq] [--filter.hasViolatedRelations.neq] [--filter.health.contains <value>]
    [--filter.health.containsIgnoreCase <value>] [--filter.health.containsIgnoreCaseAndAccent <value>]
    [--filter.health.endsWith <value>] [--filter.health.eq <value>] [--filter.health.eqIgnoreCase <value>]
    [--filter.health.in <value>...] [--filter.health.neq <value>] [--filter.health.neqIgnoreCase <value>]
    [--filter.health.nin <value>...] [--filter.health.notContains <value>] [--filter.health.notContainsIgnoreCase
    <value>] [--filter.health.notEndsWith <value>] [--filter.health.notStartsWith <value>] [--filter.health.startsWith
    <value>] [--filter.health.startsWithIgnoreCase <value>] [--filter.healthWithAge.contains <value>]
    [--filter.healthWithAge.containsIgnoreCase <value>] [--filter.healthWithAge.containsIgnoreCaseAndAccent <value>]
    [--filter.healthWithAge.endsWith <value>] [--filter.healthWithAge.eq <value>] [--filter.healthWithAge.eqIgnoreCase
    <value>] [--filter.healthWithAge.in <value>...] [--filter.healthWithAge.neq <value>]
    [--filter.healthWithAge.neqIgnoreCase <value>] [--filter.healthWithAge.nin <value>...]
    [--filter.healthWithAge.notContains <value>] [--filter.healthWithAge.notContainsIgnoreCase <value>]
    [--filter.healthWithAge.notEndsWith <value>] [--filter.healthWithAge.notStartsWith <value>]
    [--filter.healthWithAge.startsWith <value>] [--filter.healthWithAge.startsWithIgnoreCase <value>]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.lead.null] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--filter.priority.eq <value>] [--filter.priority.gt <value>]
    [--filter.priority.gte <value>] [--filter.priority.in <value>...] [--filter.priority.lt <value>]
    [--filter.priority.lte <value>] [--filter.priority.neq <value>] [--filter.priority.nin <value>...]
    [--filter.priority.null] [--filter.searchableContent.contains <value>] [--filter.searchableContent.notContains
    <value>] [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.startDate.null] [--filter.startedAt.null] [--filter.state.contains <value>]
    [--filter.state.containsIgnoreCase <value>] [--filter.state.containsIgnoreCaseAndAccent <value>]
    [--filter.state.endsWith <value>] [--filter.state.eq <value>] [--filter.state.eqIgnoreCase <value>]
    [--filter.state.in <value>...] [--filter.state.neq <value>] [--filter.state.neqIgnoreCase <value>]
    [--filter.state.nin <value>...] [--filter.state.notContains <value>] [--filter.state.notContainsIgnoreCase <value>]
    [--filter.state.notEndsWith <value>] [--filter.state.notStartsWith <value>] [--filter.state.startsWith <value>]
    [--filter.state.startsWithIgnoreCase <value>] [--filter.targetDate.null] [--first <value>] [--includeArchived]
    [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.activityType.contains=<value>
  --filter.activityType.containsIgnoreCase=<value>
  --filter.activityType.containsIgnoreCaseAndAccent=<value>
  --filter.activityType.endsWith=<value>
  --filter.activityType.eq=<value>
  --filter.activityType.eqIgnoreCase=<value>
  --filter.activityType.in=<value>...
  --filter.activityType.neq=<value>
  --filter.activityType.neqIgnoreCase=<value>
  --filter.activityType.nin=<value>...
  --filter.activityType.notContains=<value>
  --filter.activityType.notContainsIgnoreCase=<value>
  --filter.activityType.notEndsWith=<value>
  --filter.activityType.notStartsWith=<value>
  --filter.activityType.startsWith=<value>
  --filter.activityType.startsWithIgnoreCase=<value>
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDependedOnByRelations.eq
  --filter.hasDependedOnByRelations.neq
  --filter.hasDependsOnRelations.eq
  --filter.hasDependsOnRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasViolatedRelations.eq
  --filter.hasViolatedRelations.neq
  --filter.health.contains=<value>
  --filter.health.containsIgnoreCase=<value>
  --filter.health.containsIgnoreCaseAndAccent=<value>
  --filter.health.endsWith=<value>
  --filter.health.eq=<value>
  --filter.health.eqIgnoreCase=<value>
  --filter.health.in=<value>...
  --filter.health.neq=<value>
  --filter.health.neqIgnoreCase=<value>
  --filter.health.nin=<value>...
  --filter.health.notContains=<value>
  --filter.health.notContainsIgnoreCase=<value>
  --filter.health.notEndsWith=<value>
  --filter.health.notStartsWith=<value>
  --filter.health.startsWith=<value>
  --filter.health.startsWithIgnoreCase=<value>
  --filter.healthWithAge.contains=<value>
  --filter.healthWithAge.containsIgnoreCase=<value>
  --filter.healthWithAge.containsIgnoreCaseAndAccent=<value>
  --filter.healthWithAge.endsWith=<value>
  --filter.healthWithAge.eq=<value>
  --filter.healthWithAge.eqIgnoreCase=<value>
  --filter.healthWithAge.in=<value>...
  --filter.healthWithAge.neq=<value>
  --filter.healthWithAge.neqIgnoreCase=<value>
  --filter.healthWithAge.nin=<value>...
  --filter.healthWithAge.notContains=<value>
  --filter.healthWithAge.notContainsIgnoreCase=<value>
  --filter.healthWithAge.notEndsWith=<value>
  --filter.healthWithAge.notStartsWith=<value>
  --filter.healthWithAge.startsWith=<value>
  --filter.healthWithAge.startsWithIgnoreCase=<value>
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.lead.null
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.startDate.null
  --filter.startedAt.null
  --filter.state.contains=<value>
  --filter.state.containsIgnoreCase=<value>
  --filter.state.containsIgnoreCaseAndAccent=<value>
  --filter.state.endsWith=<value>
  --filter.state.eq=<value>
  --filter.state.eqIgnoreCase=<value>
  --filter.state.in=<value>...
  --filter.state.neq=<value>
  --filter.state.neqIgnoreCase=<value>
  --filter.state.nin=<value>...
  --filter.state.notContains=<value>
  --filter.state.notContainsIgnoreCase=<value>
  --filter.state.notEndsWith=<value>
  --filter.state.notStartsWith=<value>
  --filter.state.startsWith=<value>
  --filter.state.startsWithIgnoreCase=<value>
  --filter.targetDate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                          <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs projects

EXAMPLES
  $ linear project list
```

## `linear project members ID`

Runs project_members

```
USAGE
  $ linear project members ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.active.eq] [--filter.active.neq] [--filter.admin.eq] [--filter.admin.neq] [--filter.app.eq]
    [--filter.app.neq] [--filter.displayName.contains <value>] [--filter.displayName.containsIgnoreCase <value>]
    [--filter.displayName.containsIgnoreCaseAndAccent <value>] [--filter.displayName.endsWith <value>]
    [--filter.displayName.eq <value>] [--filter.displayName.eqIgnoreCase <value>] [--filter.displayName.in <value>...]
    [--filter.displayName.neq <value>] [--filter.displayName.neqIgnoreCase <value>] [--filter.displayName.nin
    <value>...] [--filter.displayName.notContains <value>] [--filter.displayName.notContainsIgnoreCase <value>]
    [--filter.displayName.notEndsWith <value>] [--filter.displayName.notStartsWith <value>]
    [--filter.displayName.startsWith <value>] [--filter.displayName.startsWithIgnoreCase <value>]
    [--filter.email.contains <value>] [--filter.email.containsIgnoreCase <value>]
    [--filter.email.containsIgnoreCaseAndAccent <value>] [--filter.email.endsWith <value>] [--filter.email.eq <value>]
    [--filter.email.eqIgnoreCase <value>] [--filter.email.in <value>...] [--filter.email.neq <value>]
    [--filter.email.neqIgnoreCase <value>] [--filter.email.nin <value>...] [--filter.email.notContains <value>]
    [--filter.email.notContainsIgnoreCase <value>] [--filter.email.notEndsWith <value>] [--filter.email.notStartsWith
    <value>] [--filter.email.startsWith <value>] [--filter.email.startsWithIgnoreCase <value>] [--filter.invited.eq]
    [--filter.invited.neq] [--filter.isInvited.eq] [--filter.isInvited.neq] [--filter.isMe.eq] [--filter.isMe.neq]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.owner.eq]
    [--filter.owner.neq] [--first <value>] [--includeArchived] [--includeDisabled] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.active.eq
  --filter.active.neq
  --filter.admin.eq
  --filter.admin.neq
  --filter.app.eq
  --filter.app.neq
  --filter.displayName.contains=<value>
  --filter.displayName.containsIgnoreCase=<value>
  --filter.displayName.containsIgnoreCaseAndAccent=<value>
  --filter.displayName.endsWith=<value>
  --filter.displayName.eq=<value>
  --filter.displayName.eqIgnoreCase=<value>
  --filter.displayName.in=<value>...
  --filter.displayName.neq=<value>
  --filter.displayName.neqIgnoreCase=<value>
  --filter.displayName.nin=<value>...
  --filter.displayName.notContains=<value>
  --filter.displayName.notContainsIgnoreCase=<value>
  --filter.displayName.notEndsWith=<value>
  --filter.displayName.notStartsWith=<value>
  --filter.displayName.startsWith=<value>
  --filter.displayName.startsWithIgnoreCase=<value>
  --filter.email.contains=<value>
  --filter.email.containsIgnoreCase=<value>
  --filter.email.containsIgnoreCaseAndAccent=<value>
  --filter.email.endsWith=<value>
  --filter.email.eq=<value>
  --filter.email.eqIgnoreCase=<value>
  --filter.email.in=<value>...
  --filter.email.neq=<value>
  --filter.email.neqIgnoreCase=<value>
  --filter.email.nin=<value>...
  --filter.email.notContains=<value>
  --filter.email.notContainsIgnoreCase=<value>
  --filter.email.notEndsWith=<value>
  --filter.email.notStartsWith=<value>
  --filter.email.startsWith=<value>
  --filter.email.startsWithIgnoreCase=<value>
  --filter.invited.eq
  --filter.invited.neq
  --filter.isInvited.eq
  --filter.isInvited.neq
  --filter.isMe.eq
  --filter.isMe.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.owner.eq
  --filter.owner.neq
  --first=<value>
  --includeArchived
  --includeDisabled
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_members

EXAMPLES
  $ linear project members
```

## `linear project milestones ID`

Runs project_projectMilestones

```
USAGE
  $ linear project milestones ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.null] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>]
    [--filter.targetDate.null] [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.null
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.targetDate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_projectMilestones

EXAMPLES
  $ linear project milestones
```

## `linear project needs ID`

Runs project_needs

```
USAGE
  $ linear project needs ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.comment.null] [--filter.customer.null] [--filter.issue.null] [--filter.priority.eq <value>]
    [--filter.priority.gt <value>] [--filter.priority.gte <value>] [--filter.priority.in <value>...]
    [--filter.priority.lt <value>] [--filter.priority.lte <value>] [--filter.priority.neq <value>]
    [--filter.priority.nin <value>...] [--filter.project.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.comment.null
  --filter.customer.null
  --filter.issue.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.project.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_needs

EXAMPLES
  $ linear project needs
```

## `linear project relations ID`

Runs project_relations

```
USAGE
  $ linear project relations ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_relations

EXAMPLES
  $ linear project relations
```

## `linear project teams ID`

Runs project_teams

```
USAGE
  $ linear project teams ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>] [--filter.key.contains
    <value>] [--filter.key.containsIgnoreCase <value>] [--filter.key.containsIgnoreCaseAndAccent <value>]
    [--filter.key.endsWith <value>] [--filter.key.eq <value>] [--filter.key.eqIgnoreCase <value>] [--filter.key.in
    <value>...] [--filter.key.neq <value>] [--filter.key.neqIgnoreCase <value>] [--filter.key.nin <value>...]
    [--filter.key.notContains <value>] [--filter.key.notContainsIgnoreCase <value>] [--filter.key.notEndsWith <value>]
    [--filter.key.notStartsWith <value>] [--filter.key.startsWith <value>] [--filter.key.startsWithIgnoreCase <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.parent.null]
    [--filter.private.eq] [--filter.private.neq] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.key.contains=<value>
  --filter.key.containsIgnoreCase=<value>
  --filter.key.containsIgnoreCaseAndAccent=<value>
  --filter.key.endsWith=<value>
  --filter.key.eq=<value>
  --filter.key.eqIgnoreCase=<value>
  --filter.key.in=<value>...
  --filter.key.neq=<value>
  --filter.key.neqIgnoreCase=<value>
  --filter.key.nin=<value>...
  --filter.key.notContains=<value>
  --filter.key.notContainsIgnoreCase=<value>
  --filter.key.notEndsWith=<value>
  --filter.key.notStartsWith=<value>
  --filter.key.startsWith=<value>
  --filter.key.startsWithIgnoreCase=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.parent.null
  --filter.private.eq
  --filter.private.neq
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_teams

EXAMPLES
  $ linear project teams
```

## `linear project updates ID`

Runs project_projectUpdates

```
USAGE
  $ linear project updates ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project_projectUpdates

EXAMPLES
  $ linear project updates
```

## `linear project view ID`

Runs project

```
USAGE
  $ linear project view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs project

EXAMPLES
  $ linear project view
```

## `linear roadmap list`

Runs roadmaps

```
USAGE
  $ linear roadmap list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs roadmaps

EXAMPLES
  $ linear roadmap list
```

## `linear roadmap projects ID`

Runs roadmap_projects

```
USAGE
  $ linear roadmap projects ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.activityType.contains <value>] [--filter.activityType.containsIgnoreCase <value>]
    [--filter.activityType.containsIgnoreCaseAndAccent <value>] [--filter.activityType.endsWith <value>]
    [--filter.activityType.eq <value>] [--filter.activityType.eqIgnoreCase <value>] [--filter.activityType.in
    <value>...] [--filter.activityType.neq <value>] [--filter.activityType.neqIgnoreCase <value>]
    [--filter.activityType.nin <value>...] [--filter.activityType.notContains <value>]
    [--filter.activityType.notContainsIgnoreCase <value>] [--filter.activityType.notEndsWith <value>]
    [--filter.activityType.notStartsWith <value>] [--filter.activityType.startsWith <value>]
    [--filter.activityType.startsWithIgnoreCase <value>] [--filter.canceledAt.null] [--filter.completedAt.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.hasBlockedByRelations.eq]
    [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq] [--filter.hasBlockingRelations.neq]
    [--filter.hasDependedOnByRelations.eq] [--filter.hasDependedOnByRelations.neq] [--filter.hasDependsOnRelations.eq]
    [--filter.hasDependsOnRelations.neq] [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq]
    [--filter.hasViolatedRelations.eq] [--filter.hasViolatedRelations.neq] [--filter.health.contains <value>]
    [--filter.health.containsIgnoreCase <value>] [--filter.health.containsIgnoreCaseAndAccent <value>]
    [--filter.health.endsWith <value>] [--filter.health.eq <value>] [--filter.health.eqIgnoreCase <value>]
    [--filter.health.in <value>...] [--filter.health.neq <value>] [--filter.health.neqIgnoreCase <value>]
    [--filter.health.nin <value>...] [--filter.health.notContains <value>] [--filter.health.notContainsIgnoreCase
    <value>] [--filter.health.notEndsWith <value>] [--filter.health.notStartsWith <value>] [--filter.health.startsWith
    <value>] [--filter.health.startsWithIgnoreCase <value>] [--filter.healthWithAge.contains <value>]
    [--filter.healthWithAge.containsIgnoreCase <value>] [--filter.healthWithAge.containsIgnoreCaseAndAccent <value>]
    [--filter.healthWithAge.endsWith <value>] [--filter.healthWithAge.eq <value>] [--filter.healthWithAge.eqIgnoreCase
    <value>] [--filter.healthWithAge.in <value>...] [--filter.healthWithAge.neq <value>]
    [--filter.healthWithAge.neqIgnoreCase <value>] [--filter.healthWithAge.nin <value>...]
    [--filter.healthWithAge.notContains <value>] [--filter.healthWithAge.notContainsIgnoreCase <value>]
    [--filter.healthWithAge.notEndsWith <value>] [--filter.healthWithAge.notStartsWith <value>]
    [--filter.healthWithAge.startsWith <value>] [--filter.healthWithAge.startsWithIgnoreCase <value>]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.lead.null] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--filter.priority.eq <value>] [--filter.priority.gt <value>]
    [--filter.priority.gte <value>] [--filter.priority.in <value>...] [--filter.priority.lt <value>]
    [--filter.priority.lte <value>] [--filter.priority.neq <value>] [--filter.priority.nin <value>...]
    [--filter.priority.null] [--filter.searchableContent.contains <value>] [--filter.searchableContent.notContains
    <value>] [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.startDate.null] [--filter.startedAt.null] [--filter.state.contains <value>]
    [--filter.state.containsIgnoreCase <value>] [--filter.state.containsIgnoreCaseAndAccent <value>]
    [--filter.state.endsWith <value>] [--filter.state.eq <value>] [--filter.state.eqIgnoreCase <value>]
    [--filter.state.in <value>...] [--filter.state.neq <value>] [--filter.state.neqIgnoreCase <value>]
    [--filter.state.nin <value>...] [--filter.state.notContains <value>] [--filter.state.notContainsIgnoreCase <value>]
    [--filter.state.notEndsWith <value>] [--filter.state.notStartsWith <value>] [--filter.state.startsWith <value>]
    [--filter.state.startsWithIgnoreCase <value>] [--filter.targetDate.null] [--first <value>] [--includeArchived]
    [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.activityType.contains=<value>
  --filter.activityType.containsIgnoreCase=<value>
  --filter.activityType.containsIgnoreCaseAndAccent=<value>
  --filter.activityType.endsWith=<value>
  --filter.activityType.eq=<value>
  --filter.activityType.eqIgnoreCase=<value>
  --filter.activityType.in=<value>...
  --filter.activityType.neq=<value>
  --filter.activityType.neqIgnoreCase=<value>
  --filter.activityType.nin=<value>...
  --filter.activityType.notContains=<value>
  --filter.activityType.notContainsIgnoreCase=<value>
  --filter.activityType.notEndsWith=<value>
  --filter.activityType.notStartsWith=<value>
  --filter.activityType.startsWith=<value>
  --filter.activityType.startsWithIgnoreCase=<value>
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDependedOnByRelations.eq
  --filter.hasDependedOnByRelations.neq
  --filter.hasDependsOnRelations.eq
  --filter.hasDependsOnRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasViolatedRelations.eq
  --filter.hasViolatedRelations.neq
  --filter.health.contains=<value>
  --filter.health.containsIgnoreCase=<value>
  --filter.health.containsIgnoreCaseAndAccent=<value>
  --filter.health.endsWith=<value>
  --filter.health.eq=<value>
  --filter.health.eqIgnoreCase=<value>
  --filter.health.in=<value>...
  --filter.health.neq=<value>
  --filter.health.neqIgnoreCase=<value>
  --filter.health.nin=<value>...
  --filter.health.notContains=<value>
  --filter.health.notContainsIgnoreCase=<value>
  --filter.health.notEndsWith=<value>
  --filter.health.notStartsWith=<value>
  --filter.health.startsWith=<value>
  --filter.health.startsWithIgnoreCase=<value>
  --filter.healthWithAge.contains=<value>
  --filter.healthWithAge.containsIgnoreCase=<value>
  --filter.healthWithAge.containsIgnoreCaseAndAccent=<value>
  --filter.healthWithAge.endsWith=<value>
  --filter.healthWithAge.eq=<value>
  --filter.healthWithAge.eqIgnoreCase=<value>
  --filter.healthWithAge.in=<value>...
  --filter.healthWithAge.neq=<value>
  --filter.healthWithAge.neqIgnoreCase=<value>
  --filter.healthWithAge.nin=<value>...
  --filter.healthWithAge.notContains=<value>
  --filter.healthWithAge.notContainsIgnoreCase=<value>
  --filter.healthWithAge.notEndsWith=<value>
  --filter.healthWithAge.notStartsWith=<value>
  --filter.healthWithAge.startsWith=<value>
  --filter.healthWithAge.startsWithIgnoreCase=<value>
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.lead.null
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.startDate.null
  --filter.startedAt.null
  --filter.state.contains=<value>
  --filter.state.containsIgnoreCase=<value>
  --filter.state.containsIgnoreCaseAndAccent=<value>
  --filter.state.endsWith=<value>
  --filter.state.eq=<value>
  --filter.state.eqIgnoreCase=<value>
  --filter.state.in=<value>...
  --filter.state.neq=<value>
  --filter.state.neqIgnoreCase=<value>
  --filter.state.nin=<value>...
  --filter.state.notContains=<value>
  --filter.state.notContainsIgnoreCase=<value>
  --filter.state.notEndsWith=<value>
  --filter.state.notStartsWith=<value>
  --filter.state.startsWith=<value>
  --filter.state.startsWithIgnoreCase=<value>
  --filter.targetDate.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                          <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs roadmap_projects

EXAMPLES
  $ linear roadmap projects
```

## `linear roadmap view ID`

Runs roadmap

```
USAGE
  $ linear roadmap view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs roadmap

EXAMPLES
  $ linear roadmap view
```

## `linear team cycles ID`

Runs team_cycles

```
USAGE
  $ linear team cycles ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.isActive.eq] [--filter.isActive.neq] [--filter.isFuture.eq] [--filter.isFuture.neq]
    [--filter.isInCooldown.eq] [--filter.isInCooldown.neq] [--filter.isNext.eq] [--filter.isNext.neq]
    [--filter.isPast.eq] [--filter.isPast.neq] [--filter.isPrevious.eq] [--filter.isPrevious.neq]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.number.eq
    <value>] [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...]
    [--filter.number.lt <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin
    <value>...] [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.isActive.eq
  --filter.isActive.neq
  --filter.isFuture.eq
  --filter.isFuture.neq
  --filter.isInCooldown.eq
  --filter.isInCooldown.neq
  --filter.isNext.eq
  --filter.isNext.neq
  --filter.isPast.eq
  --filter.isPast.neq
  --filter.isPrevious.eq
  --filter.isPrevious.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_cycles

EXAMPLES
  $ linear team cycles
```

## `linear team git-automation-states ID`

Runs team_gitAutomationStates

```
USAGE
  $ linear team git-automation-states ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_gitAutomationStates

EXAMPLES
  $ linear team git-automation-states
```

## `linear team issues ID`

Runs team_issues

```
USAGE
  $ linear team issues ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--includeSubTeams]
    [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --includeSubTeams
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_issues

EXAMPLES
  $ linear team issues
```

## `linear team labels ID`

Runs team_labels

```
USAGE
  $ linear team labels ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.creator.null] [--filter.isGroup.eq] [--filter.isGroup.neq] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--filter.team.null] [--first <value>] [--includeArchived] [--last
    <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.creator.null
  --filter.isGroup.eq
  --filter.isGroup.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.team.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_labels

EXAMPLES
  $ linear team labels
```

## `linear team list`

Runs teams

```
USAGE
  $ linear team list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>] [--filter.key.contains
    <value>] [--filter.key.containsIgnoreCase <value>] [--filter.key.containsIgnoreCaseAndAccent <value>]
    [--filter.key.endsWith <value>] [--filter.key.eq <value>] [--filter.key.eqIgnoreCase <value>] [--filter.key.in
    <value>...] [--filter.key.neq <value>] [--filter.key.neqIgnoreCase <value>] [--filter.key.nin <value>...]
    [--filter.key.notContains <value>] [--filter.key.notContainsIgnoreCase <value>] [--filter.key.notEndsWith <value>]
    [--filter.key.notStartsWith <value>] [--filter.key.startsWith <value>] [--filter.key.startsWithIgnoreCase <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.parent.null]
    [--filter.private.eq] [--filter.private.neq] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.key.contains=<value>
  --filter.key.containsIgnoreCase=<value>
  --filter.key.containsIgnoreCaseAndAccent=<value>
  --filter.key.endsWith=<value>
  --filter.key.eq=<value>
  --filter.key.eqIgnoreCase=<value>
  --filter.key.in=<value>...
  --filter.key.neq=<value>
  --filter.key.neqIgnoreCase=<value>
  --filter.key.nin=<value>...
  --filter.key.notContains=<value>
  --filter.key.notContainsIgnoreCase=<value>
  --filter.key.notEndsWith=<value>
  --filter.key.notStartsWith=<value>
  --filter.key.startsWith=<value>
  --filter.key.startsWithIgnoreCase=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.parent.null
  --filter.private.eq
  --filter.private.neq
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs teams

EXAMPLES
  $ linear team list
```

## `linear team members ID`

Runs team_members

```
USAGE
  $ linear team members ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.active.eq] [--filter.active.neq] [--filter.admin.eq] [--filter.admin.neq] [--filter.app.eq]
    [--filter.app.neq] [--filter.displayName.contains <value>] [--filter.displayName.containsIgnoreCase <value>]
    [--filter.displayName.containsIgnoreCaseAndAccent <value>] [--filter.displayName.endsWith <value>]
    [--filter.displayName.eq <value>] [--filter.displayName.eqIgnoreCase <value>] [--filter.displayName.in <value>...]
    [--filter.displayName.neq <value>] [--filter.displayName.neqIgnoreCase <value>] [--filter.displayName.nin
    <value>...] [--filter.displayName.notContains <value>] [--filter.displayName.notContainsIgnoreCase <value>]
    [--filter.displayName.notEndsWith <value>] [--filter.displayName.notStartsWith <value>]
    [--filter.displayName.startsWith <value>] [--filter.displayName.startsWithIgnoreCase <value>]
    [--filter.email.contains <value>] [--filter.email.containsIgnoreCase <value>]
    [--filter.email.containsIgnoreCaseAndAccent <value>] [--filter.email.endsWith <value>] [--filter.email.eq <value>]
    [--filter.email.eqIgnoreCase <value>] [--filter.email.in <value>...] [--filter.email.neq <value>]
    [--filter.email.neqIgnoreCase <value>] [--filter.email.nin <value>...] [--filter.email.notContains <value>]
    [--filter.email.notContainsIgnoreCase <value>] [--filter.email.notEndsWith <value>] [--filter.email.notStartsWith
    <value>] [--filter.email.startsWith <value>] [--filter.email.startsWithIgnoreCase <value>] [--filter.invited.eq]
    [--filter.invited.neq] [--filter.isInvited.eq] [--filter.isInvited.neq] [--filter.isMe.eq] [--filter.isMe.neq]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.owner.eq]
    [--filter.owner.neq] [--first <value>] [--includeArchived] [--includeDisabled] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.active.eq
  --filter.active.neq
  --filter.admin.eq
  --filter.admin.neq
  --filter.app.eq
  --filter.app.neq
  --filter.displayName.contains=<value>
  --filter.displayName.containsIgnoreCase=<value>
  --filter.displayName.containsIgnoreCaseAndAccent=<value>
  --filter.displayName.endsWith=<value>
  --filter.displayName.eq=<value>
  --filter.displayName.eqIgnoreCase=<value>
  --filter.displayName.in=<value>...
  --filter.displayName.neq=<value>
  --filter.displayName.neqIgnoreCase=<value>
  --filter.displayName.nin=<value>...
  --filter.displayName.notContains=<value>
  --filter.displayName.notContainsIgnoreCase=<value>
  --filter.displayName.notEndsWith=<value>
  --filter.displayName.notStartsWith=<value>
  --filter.displayName.startsWith=<value>
  --filter.displayName.startsWithIgnoreCase=<value>
  --filter.email.contains=<value>
  --filter.email.containsIgnoreCase=<value>
  --filter.email.containsIgnoreCaseAndAccent=<value>
  --filter.email.endsWith=<value>
  --filter.email.eq=<value>
  --filter.email.eqIgnoreCase=<value>
  --filter.email.in=<value>...
  --filter.email.neq=<value>
  --filter.email.neqIgnoreCase=<value>
  --filter.email.nin=<value>...
  --filter.email.notContains=<value>
  --filter.email.notContainsIgnoreCase=<value>
  --filter.email.notEndsWith=<value>
  --filter.email.notStartsWith=<value>
  --filter.email.startsWith=<value>
  --filter.email.startsWithIgnoreCase=<value>
  --filter.invited.eq
  --filter.invited.neq
  --filter.isInvited.eq
  --filter.isInvited.neq
  --filter.isMe.eq
  --filter.isMe.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.owner.eq
  --filter.owner.neq
  --first=<value>
  --includeArchived
  --includeDisabled
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_members

EXAMPLES
  $ linear team members
```

## `linear team memberships ID`

Runs team_memberships

```
USAGE
  $ linear team memberships ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_memberships

EXAMPLES
  $ linear team memberships
```

## `linear team projects ID`

Runs team_projects

```
USAGE
  $ linear team projects ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.activityType.contains <value>] [--filter.activityType.containsIgnoreCase <value>]
    [--filter.activityType.containsIgnoreCaseAndAccent <value>] [--filter.activityType.endsWith <value>]
    [--filter.activityType.eq <value>] [--filter.activityType.eqIgnoreCase <value>] [--filter.activityType.in
    <value>...] [--filter.activityType.neq <value>] [--filter.activityType.neqIgnoreCase <value>]
    [--filter.activityType.nin <value>...] [--filter.activityType.notContains <value>]
    [--filter.activityType.notContainsIgnoreCase <value>] [--filter.activityType.notEndsWith <value>]
    [--filter.activityType.notStartsWith <value>] [--filter.activityType.startsWith <value>]
    [--filter.activityType.startsWithIgnoreCase <value>] [--filter.canceledAt.null] [--filter.completedAt.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.hasBlockedByRelations.eq]
    [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq] [--filter.hasBlockingRelations.neq]
    [--filter.hasDependedOnByRelations.eq] [--filter.hasDependedOnByRelations.neq] [--filter.hasDependsOnRelations.eq]
    [--filter.hasDependsOnRelations.neq] [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq]
    [--filter.hasViolatedRelations.eq] [--filter.hasViolatedRelations.neq] [--filter.health.contains <value>]
    [--filter.health.containsIgnoreCase <value>] [--filter.health.containsIgnoreCaseAndAccent <value>]
    [--filter.health.endsWith <value>] [--filter.health.eq <value>] [--filter.health.eqIgnoreCase <value>]
    [--filter.health.in <value>...] [--filter.health.neq <value>] [--filter.health.neqIgnoreCase <value>]
    [--filter.health.nin <value>...] [--filter.health.notContains <value>] [--filter.health.notContainsIgnoreCase
    <value>] [--filter.health.notEndsWith <value>] [--filter.health.notStartsWith <value>] [--filter.health.startsWith
    <value>] [--filter.health.startsWithIgnoreCase <value>] [--filter.healthWithAge.contains <value>]
    [--filter.healthWithAge.containsIgnoreCase <value>] [--filter.healthWithAge.containsIgnoreCaseAndAccent <value>]
    [--filter.healthWithAge.endsWith <value>] [--filter.healthWithAge.eq <value>] [--filter.healthWithAge.eqIgnoreCase
    <value>] [--filter.healthWithAge.in <value>...] [--filter.healthWithAge.neq <value>]
    [--filter.healthWithAge.neqIgnoreCase <value>] [--filter.healthWithAge.nin <value>...]
    [--filter.healthWithAge.notContains <value>] [--filter.healthWithAge.notContainsIgnoreCase <value>]
    [--filter.healthWithAge.notEndsWith <value>] [--filter.healthWithAge.notStartsWith <value>]
    [--filter.healthWithAge.startsWith <value>] [--filter.healthWithAge.startsWithIgnoreCase <value>]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.lead.null] [--filter.name.contains <value>]
    [--filter.name.containsIgnoreCase <value>] [--filter.name.containsIgnoreCaseAndAccent <value>]
    [--filter.name.endsWith <value>] [--filter.name.eq <value>] [--filter.name.eqIgnoreCase <value>] [--filter.name.in
    <value>...] [--filter.name.neq <value>] [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...]
    [--filter.name.notContains <value>] [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith
    <value>] [--filter.name.notStartsWith <value>] [--filter.name.startsWith <value>]
    [--filter.name.startsWithIgnoreCase <value>] [--filter.priority.eq <value>] [--filter.priority.gt <value>]
    [--filter.priority.gte <value>] [--filter.priority.in <value>...] [--filter.priority.lt <value>]
    [--filter.priority.lte <value>] [--filter.priority.neq <value>] [--filter.priority.nin <value>...]
    [--filter.priority.null] [--filter.searchableContent.contains <value>] [--filter.searchableContent.notContains
    <value>] [--filter.slugId.contains <value>] [--filter.slugId.containsIgnoreCase <value>]
    [--filter.slugId.containsIgnoreCaseAndAccent <value>] [--filter.slugId.endsWith <value>] [--filter.slugId.eq
    <value>] [--filter.slugId.eqIgnoreCase <value>] [--filter.slugId.in <value>...] [--filter.slugId.neq <value>]
    [--filter.slugId.neqIgnoreCase <value>] [--filter.slugId.nin <value>...] [--filter.slugId.notContains <value>]
    [--filter.slugId.notContainsIgnoreCase <value>] [--filter.slugId.notEndsWith <value>] [--filter.slugId.notStartsWith
    <value>] [--filter.slugId.startsWith <value>] [--filter.slugId.startsWithIgnoreCase <value>]
    [--filter.startDate.null] [--filter.startedAt.null] [--filter.state.contains <value>]
    [--filter.state.containsIgnoreCase <value>] [--filter.state.containsIgnoreCaseAndAccent <value>]
    [--filter.state.endsWith <value>] [--filter.state.eq <value>] [--filter.state.eqIgnoreCase <value>]
    [--filter.state.in <value>...] [--filter.state.neq <value>] [--filter.state.neqIgnoreCase <value>]
    [--filter.state.nin <value>...] [--filter.state.notContains <value>] [--filter.state.notContainsIgnoreCase <value>]
    [--filter.state.notEndsWith <value>] [--filter.state.notStartsWith <value>] [--filter.state.startsWith <value>]
    [--filter.state.startsWithIgnoreCase <value>] [--filter.targetDate.null] [--first <value>] [--includeArchived]
    [--includeSubTeams] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.activityType.contains=<value>
  --filter.activityType.containsIgnoreCase=<value>
  --filter.activityType.containsIgnoreCaseAndAccent=<value>
  --filter.activityType.endsWith=<value>
  --filter.activityType.eq=<value>
  --filter.activityType.eqIgnoreCase=<value>
  --filter.activityType.in=<value>...
  --filter.activityType.neq=<value>
  --filter.activityType.neqIgnoreCase=<value>
  --filter.activityType.nin=<value>...
  --filter.activityType.notContains=<value>
  --filter.activityType.notContainsIgnoreCase=<value>
  --filter.activityType.notEndsWith=<value>
  --filter.activityType.notStartsWith=<value>
  --filter.activityType.startsWith=<value>
  --filter.activityType.startsWithIgnoreCase=<value>
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDependedOnByRelations.eq
  --filter.hasDependedOnByRelations.neq
  --filter.hasDependsOnRelations.eq
  --filter.hasDependsOnRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasViolatedRelations.eq
  --filter.hasViolatedRelations.neq
  --filter.health.contains=<value>
  --filter.health.containsIgnoreCase=<value>
  --filter.health.containsIgnoreCaseAndAccent=<value>
  --filter.health.endsWith=<value>
  --filter.health.eq=<value>
  --filter.health.eqIgnoreCase=<value>
  --filter.health.in=<value>...
  --filter.health.neq=<value>
  --filter.health.neqIgnoreCase=<value>
  --filter.health.nin=<value>...
  --filter.health.notContains=<value>
  --filter.health.notContainsIgnoreCase=<value>
  --filter.health.notEndsWith=<value>
  --filter.health.notStartsWith=<value>
  --filter.health.startsWith=<value>
  --filter.health.startsWithIgnoreCase=<value>
  --filter.healthWithAge.contains=<value>
  --filter.healthWithAge.containsIgnoreCase=<value>
  --filter.healthWithAge.containsIgnoreCaseAndAccent=<value>
  --filter.healthWithAge.endsWith=<value>
  --filter.healthWithAge.eq=<value>
  --filter.healthWithAge.eqIgnoreCase=<value>
  --filter.healthWithAge.in=<value>...
  --filter.healthWithAge.neq=<value>
  --filter.healthWithAge.neqIgnoreCase=<value>
  --filter.healthWithAge.nin=<value>...
  --filter.healthWithAge.notContains=<value>
  --filter.healthWithAge.notContainsIgnoreCase=<value>
  --filter.healthWithAge.notEndsWith=<value>
  --filter.healthWithAge.notStartsWith=<value>
  --filter.healthWithAge.startsWith=<value>
  --filter.healthWithAge.startsWithIgnoreCase=<value>
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.lead.null
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slugId.contains=<value>
  --filter.slugId.containsIgnoreCase=<value>
  --filter.slugId.containsIgnoreCaseAndAccent=<value>
  --filter.slugId.endsWith=<value>
  --filter.slugId.eq=<value>
  --filter.slugId.eqIgnoreCase=<value>
  --filter.slugId.in=<value>...
  --filter.slugId.neq=<value>
  --filter.slugId.neqIgnoreCase=<value>
  --filter.slugId.nin=<value>...
  --filter.slugId.notContains=<value>
  --filter.slugId.notContainsIgnoreCase=<value>
  --filter.slugId.notEndsWith=<value>
  --filter.slugId.notStartsWith=<value>
  --filter.slugId.startsWith=<value>
  --filter.slugId.startsWithIgnoreCase=<value>
  --filter.startDate.null
  --filter.startedAt.null
  --filter.state.contains=<value>
  --filter.state.containsIgnoreCase=<value>
  --filter.state.containsIgnoreCaseAndAccent=<value>
  --filter.state.endsWith=<value>
  --filter.state.eq=<value>
  --filter.state.eqIgnoreCase=<value>
  --filter.state.in=<value>...
  --filter.state.neq=<value>
  --filter.state.neqIgnoreCase=<value>
  --filter.state.nin=<value>...
  --filter.state.notContains=<value>
  --filter.state.notContainsIgnoreCase=<value>
  --filter.state.notEndsWith=<value>
  --filter.state.notStartsWith=<value>
  --filter.state.startsWith=<value>
  --filter.state.startsWithIgnoreCase=<value>
  --filter.targetDate.null
  --first=<value>
  --includeArchived
  --includeSubTeams
  --last=<value>
  --orderBy=<option>                                          <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_projects

EXAMPLES
  $ linear team projects
```

## `linear team states ID`

Runs team_states

```
USAGE
  $ linear team states ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.position.eq
    <value>] [--filter.position.gt <value>] [--filter.position.gte <value>] [--filter.position.in <value>...]
    [--filter.position.lt <value>] [--filter.position.lte <value>] [--filter.position.neq <value>]
    [--filter.position.nin <value>...] [--filter.type.contains <value>] [--filter.type.containsIgnoreCase <value>]
    [--filter.type.containsIgnoreCaseAndAccent <value>] [--filter.type.endsWith <value>] [--filter.type.eq <value>]
    [--filter.type.eqIgnoreCase <value>] [--filter.type.in <value>...] [--filter.type.neq <value>]
    [--filter.type.neqIgnoreCase <value>] [--filter.type.nin <value>...] [--filter.type.notContains <value>]
    [--filter.type.notContainsIgnoreCase <value>] [--filter.type.notEndsWith <value>] [--filter.type.notStartsWith
    <value>] [--filter.type.startsWith <value>] [--filter.type.startsWithIgnoreCase <value>] [--first <value>]
    [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.position.eq=<value>
  --filter.position.gt=<value>
  --filter.position.gte=<value>
  --filter.position.in=<value>...
  --filter.position.lt=<value>
  --filter.position.lte=<value>
  --filter.position.neq=<value>
  --filter.position.nin=<value>...
  --filter.type.contains=<value>
  --filter.type.containsIgnoreCase=<value>
  --filter.type.containsIgnoreCaseAndAccent=<value>
  --filter.type.endsWith=<value>
  --filter.type.eq=<value>
  --filter.type.eqIgnoreCase=<value>
  --filter.type.in=<value>...
  --filter.type.neq=<value>
  --filter.type.neqIgnoreCase=<value>
  --filter.type.nin=<value>...
  --filter.type.notContains=<value>
  --filter.type.notContainsIgnoreCase=<value>
  --filter.type.notEndsWith=<value>
  --filter.type.notStartsWith=<value>
  --filter.type.startsWith=<value>
  --filter.type.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_states

EXAMPLES
  $ linear team states
```

## `linear team templates ID`

Runs team_templates

```
USAGE
  $ linear team templates ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.null]
    [--filter.type.contains <value>] [--filter.type.containsIgnoreCase <value>]
    [--filter.type.containsIgnoreCaseAndAccent <value>] [--filter.type.endsWith <value>] [--filter.type.eq <value>]
    [--filter.type.eqIgnoreCase <value>] [--filter.type.in <value>...] [--filter.type.neq <value>]
    [--filter.type.neqIgnoreCase <value>] [--filter.type.nin <value>...] [--filter.type.notContains <value>]
    [--filter.type.notContainsIgnoreCase <value>] [--filter.type.notEndsWith <value>] [--filter.type.notStartsWith
    <value>] [--filter.type.startsWith <value>] [--filter.type.startsWithIgnoreCase <value>] [--first <value>]
    [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.null
  --filter.type.contains=<value>
  --filter.type.containsIgnoreCase=<value>
  --filter.type.containsIgnoreCaseAndAccent=<value>
  --filter.type.endsWith=<value>
  --filter.type.eq=<value>
  --filter.type.eqIgnoreCase=<value>
  --filter.type.in=<value>...
  --filter.type.neq=<value>
  --filter.type.neqIgnoreCase=<value>
  --filter.type.nin=<value>...
  --filter.type.notContains=<value>
  --filter.type.notContainsIgnoreCase=<value>
  --filter.type.notEndsWith=<value>
  --filter.type.notStartsWith=<value>
  --filter.type.startsWith=<value>
  --filter.type.startsWithIgnoreCase=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                 <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team_templates

EXAMPLES
  $ linear team templates
```

## `linear team view ID`

Runs team

```
USAGE
  $ linear team view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs team

EXAMPLES
  $ linear team view
```

## `linear user assigned-issues ID`

Runs user_assignedIssues

```
USAGE
  $ linear user assigned-issues ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs user_assignedIssues

EXAMPLES
  $ linear user assigned-issues
```

## `linear user created-issues ID`

Runs user_createdIssues

```
USAGE
  $ linear user created-issues ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs user_createdIssues

EXAMPLES
  $ linear user created-issues
```

## `linear user delegated-issues ID`

Runs user_delegatedIssues

```
USAGE
  $ linear user delegated-issues ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs user_delegatedIssues

EXAMPLES
  $ linear user delegated-issues
```

## `linear user drafts ID`

Runs user_drafts

```
USAGE
  $ linear user drafts ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs user_drafts

EXAMPLES
  $ linear user drafts
```

## `linear user list`

Runs users

```
USAGE
  $ linear user list [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.active.eq] [--filter.active.neq] [--filter.admin.eq] [--filter.admin.neq] [--filter.app.eq]
    [--filter.app.neq] [--filter.displayName.contains <value>] [--filter.displayName.containsIgnoreCase <value>]
    [--filter.displayName.containsIgnoreCaseAndAccent <value>] [--filter.displayName.endsWith <value>]
    [--filter.displayName.eq <value>] [--filter.displayName.eqIgnoreCase <value>] [--filter.displayName.in <value>...]
    [--filter.displayName.neq <value>] [--filter.displayName.neqIgnoreCase <value>] [--filter.displayName.nin
    <value>...] [--filter.displayName.notContains <value>] [--filter.displayName.notContainsIgnoreCase <value>]
    [--filter.displayName.notEndsWith <value>] [--filter.displayName.notStartsWith <value>]
    [--filter.displayName.startsWith <value>] [--filter.displayName.startsWithIgnoreCase <value>]
    [--filter.email.contains <value>] [--filter.email.containsIgnoreCase <value>]
    [--filter.email.containsIgnoreCaseAndAccent <value>] [--filter.email.endsWith <value>] [--filter.email.eq <value>]
    [--filter.email.eqIgnoreCase <value>] [--filter.email.in <value>...] [--filter.email.neq <value>]
    [--filter.email.neqIgnoreCase <value>] [--filter.email.nin <value>...] [--filter.email.notContains <value>]
    [--filter.email.notContainsIgnoreCase <value>] [--filter.email.notEndsWith <value>] [--filter.email.notStartsWith
    <value>] [--filter.email.startsWith <value>] [--filter.email.startsWithIgnoreCase <value>] [--filter.invited.eq]
    [--filter.invited.neq] [--filter.isInvited.eq] [--filter.isInvited.neq] [--filter.isMe.eq] [--filter.isMe.neq]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.owner.eq]
    [--filter.owner.neq] [--first <value>] [--includeArchived] [--includeDisabled] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.active.eq
  --filter.active.neq
  --filter.admin.eq
  --filter.admin.neq
  --filter.app.eq
  --filter.app.neq
  --filter.displayName.contains=<value>
  --filter.displayName.containsIgnoreCase=<value>
  --filter.displayName.containsIgnoreCaseAndAccent=<value>
  --filter.displayName.endsWith=<value>
  --filter.displayName.eq=<value>
  --filter.displayName.eqIgnoreCase=<value>
  --filter.displayName.in=<value>...
  --filter.displayName.neq=<value>
  --filter.displayName.neqIgnoreCase=<value>
  --filter.displayName.nin=<value>...
  --filter.displayName.notContains=<value>
  --filter.displayName.notContainsIgnoreCase=<value>
  --filter.displayName.notEndsWith=<value>
  --filter.displayName.notStartsWith=<value>
  --filter.displayName.startsWith=<value>
  --filter.displayName.startsWithIgnoreCase=<value>
  --filter.email.contains=<value>
  --filter.email.containsIgnoreCase=<value>
  --filter.email.containsIgnoreCaseAndAccent=<value>
  --filter.email.endsWith=<value>
  --filter.email.eq=<value>
  --filter.email.eqIgnoreCase=<value>
  --filter.email.in=<value>...
  --filter.email.neq=<value>
  --filter.email.neqIgnoreCase=<value>
  --filter.email.nin=<value>...
  --filter.email.notContains=<value>
  --filter.email.notContainsIgnoreCase=<value>
  --filter.email.notEndsWith=<value>
  --filter.email.notStartsWith=<value>
  --filter.email.startsWith=<value>
  --filter.email.startsWithIgnoreCase=<value>
  --filter.invited.eq
  --filter.invited.neq
  --filter.isInvited.eq
  --filter.isInvited.neq
  --filter.isMe.eq
  --filter.isMe.neq
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.owner.eq
  --filter.owner.neq
  --first=<value>
  --includeArchived
  --includeDisabled
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs users

EXAMPLES
  $ linear user list
```

## `linear user team-memberships ID`

Runs user_teamMemberships

```
USAGE
  $ linear user team-memberships ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs user_teamMemberships

EXAMPLES
  $ linear user team-memberships
```

## `linear user teams ID`

Runs user_teams

```
USAGE
  $ linear user teams ID [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>] [--filter.key.contains
    <value>] [--filter.key.containsIgnoreCase <value>] [--filter.key.containsIgnoreCaseAndAccent <value>]
    [--filter.key.endsWith <value>] [--filter.key.eq <value>] [--filter.key.eqIgnoreCase <value>] [--filter.key.in
    <value>...] [--filter.key.neq <value>] [--filter.key.neqIgnoreCase <value>] [--filter.key.nin <value>...]
    [--filter.key.notContains <value>] [--filter.key.notContainsIgnoreCase <value>] [--filter.key.notEndsWith <value>]
    [--filter.key.notStartsWith <value>] [--filter.key.startsWith <value>] [--filter.key.startsWithIgnoreCase <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.parent.null]
    [--filter.private.eq] [--filter.private.neq] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.key.contains=<value>
  --filter.key.containsIgnoreCase=<value>
  --filter.key.containsIgnoreCaseAndAccent=<value>
  --filter.key.endsWith=<value>
  --filter.key.eq=<value>
  --filter.key.eqIgnoreCase=<value>
  --filter.key.in=<value>...
  --filter.key.neq=<value>
  --filter.key.neqIgnoreCase=<value>
  --filter.key.nin=<value>...
  --filter.key.notContains=<value>
  --filter.key.notContainsIgnoreCase=<value>
  --filter.key.notEndsWith=<value>
  --filter.key.notStartsWith=<value>
  --filter.key.startsWith=<value>
  --filter.key.startsWithIgnoreCase=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.parent.null
  --filter.private.eq
  --filter.private.neq
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs user_teams

EXAMPLES
  $ linear user teams
```

## `linear user view ID`

Runs user

```
USAGE
  $ linear user view ID [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs user

EXAMPLES
  $ linear user view
```

## `linear viewer`

Runs viewer

```
USAGE
  $ linear viewer [--json] [--api-key <value>] [--api-url <value>]

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs viewer

EXAMPLES
  $ linear viewer
```

## `linear viewer assigned-issues`

Runs viewer_assignedIssues

```
USAGE
  $ linear viewer assigned-issues [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs viewer_assignedIssues

EXAMPLES
  $ linear viewer assigned-issues
```

## `linear viewer created-issues`

Runs viewer_createdIssues

```
USAGE
  $ linear viewer created-issues [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs viewer_createdIssues

EXAMPLES
  $ linear viewer created-issues
```

## `linear viewer delegated-issues`

Runs viewer_delegatedIssues

```
USAGE
  $ linear viewer delegated-issues [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.accumulatedStateUpdatedAt.null] [--filter.addedToCycleAt.null] [--filter.addedToCyclePeriod.eq
    after|before|during] [--filter.addedToCyclePeriod.in after|before|during...] [--filter.addedToCyclePeriod.neq
    after|before|during] [--filter.addedToCyclePeriod.nin after|before|during...] [--filter.addedToCyclePeriod.null]
    [--filter.ageTime.null] [--filter.archivedAt.null] [--filter.assignee.null] [--filter.autoArchivedAt.null]
    [--filter.autoClosedAt.null] [--filter.canceledAt.null] [--filter.completedAt.null] [--filter.creator.null]
    [--filter.customerCount.eq <value>] [--filter.customerCount.gt <value>] [--filter.customerCount.gte <value>]
    [--filter.customerCount.in <value>...] [--filter.customerCount.lt <value>] [--filter.customerCount.lte <value>]
    [--filter.customerCount.neq <value>] [--filter.customerCount.nin <value>...] [--filter.customerImportantCount.eq
    <value>] [--filter.customerImportantCount.gt <value>] [--filter.customerImportantCount.gte <value>]
    [--filter.customerImportantCount.in <value>...] [--filter.customerImportantCount.lt <value>]
    [--filter.customerImportantCount.lte <value>] [--filter.customerImportantCount.neq <value>]
    [--filter.customerImportantCount.nin <value>...] [--filter.cycle.null] [--filter.cycleTime.null]
    [--filter.delegate.null] [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>]
    [--filter.dueDate.null] [--filter.estimate.eq <value>] [--filter.estimate.gt <value>] [--filter.estimate.gte
    <value>] [--filter.estimate.in <value>...] [--filter.estimate.lt <value>] [--filter.estimate.lte <value>]
    [--filter.estimate.neq <value>] [--filter.estimate.nin <value>...] [--filter.estimate.null]
    [--filter.hasBlockedByRelations.eq] [--filter.hasBlockedByRelations.neq] [--filter.hasBlockingRelations.eq]
    [--filter.hasBlockingRelations.neq] [--filter.hasDuplicateRelations.eq] [--filter.hasDuplicateRelations.neq]
    [--filter.hasRelatedRelations.eq] [--filter.hasRelatedRelations.neq] [--filter.hasSuggestedAssignees.eq]
    [--filter.hasSuggestedAssignees.neq] [--filter.hasSuggestedLabels.eq] [--filter.hasSuggestedLabels.neq]
    [--filter.hasSuggestedProjects.eq] [--filter.hasSuggestedProjects.neq] [--filter.hasSuggestedRelatedIssues.eq]
    [--filter.hasSuggestedRelatedIssues.neq] [--filter.hasSuggestedSimilarIssues.eq]
    [--filter.hasSuggestedSimilarIssues.neq] [--filter.hasSuggestedTeams.eq] [--filter.hasSuggestedTeams.neq]
    [--filter.labels.null] [--filter.lastAppliedTemplate.null] [--filter.leadTime.null] [--filter.number.eq <value>]
    [--filter.number.gt <value>] [--filter.number.gte <value>] [--filter.number.in <value>...] [--filter.number.lt
    <value>] [--filter.number.lte <value>] [--filter.number.neq <value>] [--filter.number.nin <value>...]
    [--filter.parent.null] [--filter.priority.eq <value>] [--filter.priority.gt <value>] [--filter.priority.gte <value>]
    [--filter.priority.in <value>...] [--filter.priority.lt <value>] [--filter.priority.lte <value>]
    [--filter.priority.neq <value>] [--filter.priority.nin <value>...] [--filter.priority.null] [--filter.project.null]
    [--filter.projectMilestone.null] [--filter.recurringIssueTemplate.null] [--filter.searchableContent.contains
    <value>] [--filter.searchableContent.notContains <value>] [--filter.slaStatus.eq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.in
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.neq
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk] [--filter.slaStatus.nin
    Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk...] [--filter.slaStatus.null] [--filter.snoozedBy.null]
    [--filter.snoozedUntilAt.null] [--filter.sourceMetadata.eq <value>] [--filter.sourceMetadata.in <value>...]
    [--filter.sourceMetadata.neq <value>] [--filter.sourceMetadata.nin <value>...] [--filter.sourceMetadata.null]
    [--filter.startedAt.null] [--filter.title.contains <value>] [--filter.title.containsIgnoreCase <value>]
    [--filter.title.containsIgnoreCaseAndAccent <value>] [--filter.title.endsWith <value>] [--filter.title.eq <value>]
    [--filter.title.eqIgnoreCase <value>] [--filter.title.in <value>...] [--filter.title.neq <value>]
    [--filter.title.neqIgnoreCase <value>] [--filter.title.nin <value>...] [--filter.title.notContains <value>]
    [--filter.title.notContainsIgnoreCase <value>] [--filter.title.notEndsWith <value>] [--filter.title.notStartsWith
    <value>] [--filter.title.startsWith <value>] [--filter.title.startsWithIgnoreCase <value>]
    [--filter.triageTime.null] [--filter.triagedAt.null] [--first <value>] [--includeArchived] [--last <value>]
    [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.accumulatedStateUpdatedAt.null
  --filter.addedToCycleAt.null
  --filter.addedToCyclePeriod.eq=<option>                   <options: after|before|during>
  --filter.addedToCyclePeriod.in=<option>...                <options: after|before|during>
  --filter.addedToCyclePeriod.neq=<option>                  <options: after|before|during>
  --filter.addedToCyclePeriod.nin=<option>...               <options: after|before|during>
  --filter.addedToCyclePeriod.null
  --filter.ageTime.null
  --filter.archivedAt.null
  --filter.assignee.null
  --filter.autoArchivedAt.null
  --filter.autoClosedAt.null
  --filter.canceledAt.null
  --filter.completedAt.null
  --filter.creator.null
  --filter.customerCount.eq=<value>
  --filter.customerCount.gt=<value>
  --filter.customerCount.gte=<value>
  --filter.customerCount.in=<value>...
  --filter.customerCount.lt=<value>
  --filter.customerCount.lte=<value>
  --filter.customerCount.neq=<value>
  --filter.customerCount.nin=<value>...
  --filter.customerImportantCount.eq=<value>
  --filter.customerImportantCount.gt=<value>
  --filter.customerImportantCount.gte=<value>
  --filter.customerImportantCount.in=<value>...
  --filter.customerImportantCount.lt=<value>
  --filter.customerImportantCount.lte=<value>
  --filter.customerImportantCount.neq=<value>
  --filter.customerImportantCount.nin=<value>...
  --filter.cycle.null
  --filter.cycleTime.null
  --filter.delegate.null
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.dueDate.null
  --filter.estimate.eq=<value>
  --filter.estimate.gt=<value>
  --filter.estimate.gte=<value>
  --filter.estimate.in=<value>...
  --filter.estimate.lt=<value>
  --filter.estimate.lte=<value>
  --filter.estimate.neq=<value>
  --filter.estimate.nin=<value>...
  --filter.estimate.null
  --filter.hasBlockedByRelations.eq
  --filter.hasBlockedByRelations.neq
  --filter.hasBlockingRelations.eq
  --filter.hasBlockingRelations.neq
  --filter.hasDuplicateRelations.eq
  --filter.hasDuplicateRelations.neq
  --filter.hasRelatedRelations.eq
  --filter.hasRelatedRelations.neq
  --filter.hasSuggestedAssignees.eq
  --filter.hasSuggestedAssignees.neq
  --filter.hasSuggestedLabels.eq
  --filter.hasSuggestedLabels.neq
  --filter.hasSuggestedProjects.eq
  --filter.hasSuggestedProjects.neq
  --filter.hasSuggestedRelatedIssues.eq
  --filter.hasSuggestedRelatedIssues.neq
  --filter.hasSuggestedSimilarIssues.eq
  --filter.hasSuggestedSimilarIssues.neq
  --filter.hasSuggestedTeams.eq
  --filter.hasSuggestedTeams.neq
  --filter.labels.null
  --filter.lastAppliedTemplate.null
  --filter.leadTime.null
  --filter.number.eq=<value>
  --filter.number.gt=<value>
  --filter.number.gte=<value>
  --filter.number.in=<value>...
  --filter.number.lt=<value>
  --filter.number.lte=<value>
  --filter.number.neq=<value>
  --filter.number.nin=<value>...
  --filter.parent.null
  --filter.priority.eq=<value>
  --filter.priority.gt=<value>
  --filter.priority.gte=<value>
  --filter.priority.in=<value>...
  --filter.priority.lt=<value>
  --filter.priority.lte=<value>
  --filter.priority.neq=<value>
  --filter.priority.nin=<value>...
  --filter.priority.null
  --filter.project.null
  --filter.projectMilestone.null
  --filter.recurringIssueTemplate.null
  --filter.searchableContent.contains=<value>
  --filter.searchableContent.notContains=<value>
  --filter.slaStatus.eq=<option>                            <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.in=<option>...                         <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.neq=<option>                           <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.nin=<option>...                        <options:
                                                            Breached|Completed|Failed|HighRisk|LowRisk|MediumRisk>
  --filter.slaStatus.null
  --filter.snoozedBy.null
  --filter.snoozedUntilAt.null
  --filter.sourceMetadata.eq=<value>
  --filter.sourceMetadata.in=<value>...
  --filter.sourceMetadata.neq=<value>
  --filter.sourceMetadata.nin=<value>...
  --filter.sourceMetadata.null
  --filter.startedAt.null
  --filter.title.contains=<value>
  --filter.title.containsIgnoreCase=<value>
  --filter.title.containsIgnoreCaseAndAccent=<value>
  --filter.title.endsWith=<value>
  --filter.title.eq=<value>
  --filter.title.eqIgnoreCase=<value>
  --filter.title.in=<value>...
  --filter.title.neq=<value>
  --filter.title.neqIgnoreCase=<value>
  --filter.title.nin=<value>...
  --filter.title.notContains=<value>
  --filter.title.notContainsIgnoreCase=<value>
  --filter.title.notEndsWith=<value>
  --filter.title.notStartsWith=<value>
  --filter.title.startsWith=<value>
  --filter.title.startsWithIgnoreCase=<value>
  --filter.triageTime.null
  --filter.triagedAt.null
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs viewer_delegatedIssues

EXAMPLES
  $ linear viewer delegated-issues
```

## `linear viewer drafts`

Runs viewer_drafts

```
USAGE
  $ linear viewer drafts [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs viewer_drafts

EXAMPLES
  $ linear viewer drafts
```

## `linear viewer team-memberships`

Runs viewer_teamMemberships

```
USAGE
  $ linear viewer team-memberships [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--first <value>] [--includeArchived] [--last <value>] [--orderBy createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>  <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs viewer_teamMemberships

EXAMPLES
  $ linear viewer team-memberships
```

## `linear viewer teams`

Runs viewer_teams

```
USAGE
  $ linear viewer teams [--json] [--api-key <value>] [--api-url <value>] [--after <value>] [--before <value>]
    [--filter.description.contains <value>] [--filter.description.containsIgnoreCase <value>]
    [--filter.description.containsIgnoreCaseAndAccent <value>] [--filter.description.endsWith <value>]
    [--filter.description.eq <value>] [--filter.description.eqIgnoreCase <value>] [--filter.description.in <value>...]
    [--filter.description.neq <value>] [--filter.description.neqIgnoreCase <value>] [--filter.description.nin
    <value>...] [--filter.description.notContains <value>] [--filter.description.notContainsIgnoreCase <value>]
    [--filter.description.notEndsWith <value>] [--filter.description.notStartsWith <value>] [--filter.description.null]
    [--filter.description.startsWith <value>] [--filter.description.startsWithIgnoreCase <value>] [--filter.key.contains
    <value>] [--filter.key.containsIgnoreCase <value>] [--filter.key.containsIgnoreCaseAndAccent <value>]
    [--filter.key.endsWith <value>] [--filter.key.eq <value>] [--filter.key.eqIgnoreCase <value>] [--filter.key.in
    <value>...] [--filter.key.neq <value>] [--filter.key.neqIgnoreCase <value>] [--filter.key.nin <value>...]
    [--filter.key.notContains <value>] [--filter.key.notContainsIgnoreCase <value>] [--filter.key.notEndsWith <value>]
    [--filter.key.notStartsWith <value>] [--filter.key.startsWith <value>] [--filter.key.startsWithIgnoreCase <value>]
    [--filter.name.contains <value>] [--filter.name.containsIgnoreCase <value>]
    [--filter.name.containsIgnoreCaseAndAccent <value>] [--filter.name.endsWith <value>] [--filter.name.eq <value>]
    [--filter.name.eqIgnoreCase <value>] [--filter.name.in <value>...] [--filter.name.neq <value>]
    [--filter.name.neqIgnoreCase <value>] [--filter.name.nin <value>...] [--filter.name.notContains <value>]
    [--filter.name.notContainsIgnoreCase <value>] [--filter.name.notEndsWith <value>] [--filter.name.notStartsWith
    <value>] [--filter.name.startsWith <value>] [--filter.name.startsWithIgnoreCase <value>] [--filter.parent.null]
    [--filter.private.eq] [--filter.private.neq] [--first <value>] [--includeArchived] [--last <value>] [--orderBy
    createdAt|updatedAt]

FLAGS
  --after=<value>
  --before=<value>
  --filter.description.contains=<value>
  --filter.description.containsIgnoreCase=<value>
  --filter.description.containsIgnoreCaseAndAccent=<value>
  --filter.description.endsWith=<value>
  --filter.description.eq=<value>
  --filter.description.eqIgnoreCase=<value>
  --filter.description.in=<value>...
  --filter.description.neq=<value>
  --filter.description.neqIgnoreCase=<value>
  --filter.description.nin=<value>...
  --filter.description.notContains=<value>
  --filter.description.notContainsIgnoreCase=<value>
  --filter.description.notEndsWith=<value>
  --filter.description.notStartsWith=<value>
  --filter.description.null
  --filter.description.startsWith=<value>
  --filter.description.startsWithIgnoreCase=<value>
  --filter.key.contains=<value>
  --filter.key.containsIgnoreCase=<value>
  --filter.key.containsIgnoreCaseAndAccent=<value>
  --filter.key.endsWith=<value>
  --filter.key.eq=<value>
  --filter.key.eqIgnoreCase=<value>
  --filter.key.in=<value>...
  --filter.key.neq=<value>
  --filter.key.neqIgnoreCase=<value>
  --filter.key.nin=<value>...
  --filter.key.notContains=<value>
  --filter.key.notContainsIgnoreCase=<value>
  --filter.key.notEndsWith=<value>
  --filter.key.notStartsWith=<value>
  --filter.key.startsWith=<value>
  --filter.key.startsWithIgnoreCase=<value>
  --filter.name.contains=<value>
  --filter.name.containsIgnoreCase=<value>
  --filter.name.containsIgnoreCaseAndAccent=<value>
  --filter.name.endsWith=<value>
  --filter.name.eq=<value>
  --filter.name.eqIgnoreCase=<value>
  --filter.name.in=<value>...
  --filter.name.neq=<value>
  --filter.name.neqIgnoreCase=<value>
  --filter.name.nin=<value>...
  --filter.name.notContains=<value>
  --filter.name.notContainsIgnoreCase=<value>
  --filter.name.notEndsWith=<value>
  --filter.name.notStartsWith=<value>
  --filter.name.startsWith=<value>
  --filter.name.startsWithIgnoreCase=<value>
  --filter.parent.null
  --filter.private.eq
  --filter.private.neq
  --first=<value>
  --includeArchived
  --last=<value>
  --orderBy=<option>                                        <options: createdAt|updatedAt>

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.
  --api-url=<value>  [default: https://api.linear.app, env: LINEAR_API_URL] Linear API server URL
  --json             Format output as json.

DESCRIPTION
  Runs viewer_teams

EXAMPLES
  $ linear viewer teams
```
<!-- commandsstop -->
