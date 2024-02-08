import dotenv from "dotenv";
import { App } from "octokit";
import { createNodeMiddleware } from "octokit";
import fs from "fs";
import http from "http";

dotenv.config();


const appId = process.env.APP_ID;
const webHookSecret = process.env.WEBHOOK_SECRET;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;

const privateKey = fs.readFileSync(privateKeyPath, "utf-8");

const app = new App({
  appId: appId,
  privateKey: privateKey,
  webhooks: {
    secret: webHookSecret
  },
});

