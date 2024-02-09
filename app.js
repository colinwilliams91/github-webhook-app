import dotenv from "dotenv";
import { App } from "octokit";
import { createNodeMiddleware } from "@octokit/webhooks";
import fs from "fs";
import http from "http";

dotenv.config();


const appId = process.env.APP_ID;
const webHookSecret = process.env.WEBHOOK_SECRET;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;

const privateKey = fs.readFileSync(privateKeyPath, "utf-8");

/* Octokit App Class */
const app = new App({
  appId: appId,
  privateKey: privateKey,
  webhooks: {
    secret: webHookSecret
  },
});

const messageForNewPRs = "Thanks for opening a new PR! Please follow our contributing guidelines to make your PR easier to review.";

const handlePullRequestOpened = async ({octokit, payload}) => {
  console.log(`Received a pull request event for #${payload.pull_request.number}`);
  try {
    await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.pull_request.number,
      body: messageForNewPRs,
      headers: {
        "x-github-api-version": "2022-11-28", // X-Accepted-GitHub-Permissions <-- add this header as well to get a response of all required permissions for the GH API request!
      },
    });
  } catch (error) {
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
    }
    console.error(error)
  }
};

app.webhooks.on("pull_request.opened", handlePullRequestOpened);

app.webhooks.on("issues.opened", ({ octokit, payload }) => {
  return octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    body: "Hello, World!",
  });
});

app.webhooks.onError((error) => {
  if (error.name === "AggregateError") {
    console.error(`Error processing request: ${error.event}`);
  } else {
    console.error(error);
  }
});

/* Server Set Up */
const port = process.env.PORT;
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
const path = process.env.PATH;
const localWebhookUrl = `http://${host}:${port}${path}`;


/* Handles Incoming Webhook Events (Octokit) */
const middleware = createNodeMiddleware(app.webhooks, {path});
/**
 * Checks the signature of the incoming webhook event to make sure that it matches your webhook secret.
 * - This verifies that the incoming webhook event is a valid GitHub event.
 * - Parse the webhook event payload and identify the type of event.
 * - Trigger the corresponding webhook event handler.
*/

http.createServer(middleware).listen(port, () => {
  console.log(`Server is listening for events at: ${localWebhookUrl}`);
  console.log("Press Ctrl + C to quit.");
});
