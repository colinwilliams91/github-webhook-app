# github-webhook-app
practice making an app integrating with github


## Headers for Requests to GH API

- `X-Accepted-GitHub-Permissions` you can use this header to identify the permissions required to access the REST API endpoint. (ex below)
  - [Docs](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28#resource-not-accessible)
- `User-Agent` errors mean your username or the name of your application need to be applied as the `User-Agent` header value
  - [Docs](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28#user-agent-required)
- Validation Failed error: response body will include a `code` which correlate to the table in below documentation:
  - [Docs](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28#validation-failed)