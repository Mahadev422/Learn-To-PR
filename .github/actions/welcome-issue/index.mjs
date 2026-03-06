import fs from "fs";
import { Octokit } from "@octokit/rest";

const token = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: token });

const event = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

const issueNumber = event.issue.number;
const owner = event.repository.owner.login;
const repo = event.repository.name;

const message = fs.readFileSync(".github/messages/welcome-message.md", "utf8");

// 1️⃣ Add label
await octokit.issues.addLabels({
  owner,
  repo,
  issue_number: issueNumber,
  labels: ["good-first-issue"]
});

// 2️⃣ Add welcome comment
await octokit.issues.createComment({
  owner,
  repo,
  issue_number: issueNumber,
  body: message
});