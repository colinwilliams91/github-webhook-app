# github-webhook-app
practice making an app integrating with github


## Headers for Requests to GH API

- `X-Accepted-GitHub-Permissions` you can use this header to identify the permissions required to access the REST API endpoint. (ex below)
  - [Docs](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28#resource-not-accessible)
- `User-Agent` errors mean your username or the name of your application need to be applied as the `User-Agent` header value
  - [Docs](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28#user-agent-required)
- Validation Failed error: response body will include a `code` which correlate to the table in below documentation:
  - [Docs](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28#validation-failed)


  ## GitHub App Auth
  - [Example](https://github.com/octokit/octokit.js?tab=readme-ov-file#authentication)

  ## Deploying
- [Update the webhook URL](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-github-app-that-responds-to-webhook-events#update-the-webhook-url)
  - Once you have a server that is set up to receive webhook traffic from GitHub, update the webhook URL in your app settings. You should not use Smee.io to forward your webhooks in production.
  - [Share on marketplace](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-github-app-that-responds-to-webhook-events#share-your-app)