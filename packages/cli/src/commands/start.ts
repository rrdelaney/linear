import { Args, ux } from "@oclif/core";
import { LinearCommand } from "../linear_command.js";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { Issue } from "@linear/sdk";

const execAsync = promisify(exec);

/**
 * Start working on a Linear issue by updating its status and creating/switching to its git branch.
 */
export default class Start extends LinearCommand {
  public static override description =
    "Start working on an issue: updates status to In Progress, creates/switches to the git branch, and displays the issue.";

  public static override examples = [
    "<%= config.bin %> <%= command.id %> WT-123",
    "<%= config.bin %> <%= command.id %> LIN-456",
  ];

  public static override args = {
    issue: Args.string({
      description: "Issue ID (e.g., WT-123)",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args } = await this.parse(Start);
    const issueId = args.issue;

    // Step 1: Check git status
    await this.checkGitStatus();

    // Step 2: Fetch the issue
    ux.action.start(`Fetching issue ${ux.colorize("cyan", issueId)}`);
    const linearClient = await this.getLinearClient();
    const issue = await linearClient.issue(issueId);
    ux.action.stop();

    if (!issue) {
      this.error(`Issue ${ux.colorize("red", issueId)} not found`);
    }

    // Step 3: Update issue status if needed
    await this.updateIssueStatus(issue);

    // Step 4: Create or switch to branch
    await this.switchToBranch(issue.branchName);

    // Step 5: Display issue details
    this.log("");
    this.displayTable([
      { label: "Issue", value: ux.colorize("cyan", issue.identifier) },
      { label: "Title", value: issue.title },
      { label: "URL", value: ux.colorize("dim", issue.url) },
    ]);

    if (issue.description) {
      this.log("");
      this.log(ux.colorize("yellow", "Description:"));
      this.log(issue.description);
    }

    this.log("");
    this.log(ux.colorize("green", "✓ Ready to start working on %s"), issue.identifier);
  }

  /**
   * Checks if the git working directory is clean.
   * Throws an error if there are uncommitted changes.
   */
  private async checkGitStatus(): Promise<void> {
    try {
      const { stdout } = await execAsync("git status --porcelain");
      if (stdout.trim()) {
        this.error("Git working directory is dirty. Please commit or stash your changes before starting a new issue.", {
          suggestions: [
            "Run 'git status' to see what changes need to be committed",
            "Run 'git stash' to temporarily save your changes",
            "Run 'git commit' to commit your changes",
          ],
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.error(`Failed to check git status: ${message}`, {
        suggestions: ["Make sure you are in a git repository"],
      });
    }
  }

  /**
   * Updates the issue status to "In Progress" if it's currently in "Backlog" or "Todo".
   */
  private async updateIssueStatus(issue: Issue): Promise<void> {
    const state = await issue.state;
    if (!state) {
      this.warn("Could not determine issue state");
      return;
    }

    const stateType = state.type.toLowerCase();

    // Check if the issue is in Backlog or Todo
    if (stateType === "backlog" || stateType === "unstarted") {
      ux.action.start(`Updating issue status to ${ux.colorize("cyan", "In Progress")}`);

      // Find the "In Progress" state for this team
      const team = await issue.team;
      if (!team) {
        ux.action.stop(ux.colorize("yellow", "skipped (no team found)"));
        return;
      }

      const states = await team.states();
      const inProgressState = states.nodes.find(s => s.type.toLowerCase() === "started");

      if (!inProgressState) {
        ux.action.stop(ux.colorize("yellow", "skipped (no In Progress state found)"));
        return;
      }

      try {
        await issue.update({ stateId: inProgressState.id });
        ux.action.stop(ux.colorize("green", "done"));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        ux.action.stop(ux.colorize("red", "failed"));
        this.warn(`Could not update issue status: ${message}`);
      }
    } else {
      this.debug(`Issue is already in ${state.name} state, not updating`);
    }
  }

  /**
   * Creates or switches to the git branch for this issue.
   */
  private async switchToBranch(branchName: string): Promise<void> {
    if (!branchName) {
      this.warn("No branch name found for this issue, skipping branch creation");
      return;
    }

    try {
      // Check if branch already exists
      const { stdout: existingBranches } = await execAsync("git branch --list");
      const branchExists = existingBranches
        .split("\n")
        .some(line => line.trim() === branchName || line.trim() === `* ${branchName}`);

      if (branchExists) {
        // Branch exists, switch to it
        ux.action.start(`Switching to branch ${ux.colorize("cyan", branchName)}`);
        await execAsync(`git checkout "${branchName}"`);
        ux.action.stop(ux.colorize("green", "done"));
      } else {
        // Branch doesn't exist, create it
        ux.action.start(`Creating and switching to branch ${ux.colorize("cyan", branchName)}`);
        await execAsync(`git checkout -b "${branchName}"`);
        ux.action.stop(ux.colorize("green", "done"));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.error(`Failed to create/switch branch: ${message}`);
    }
  }
}
