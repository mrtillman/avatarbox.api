# avatarbox.api

rest api for [avatarbox.io](https://avatarbox.io)

---

[![Build Status](https://travis-ci.com/mrtillman/avatarbox.api.svg?branch=master)](https://travis-ci.com/mrtillman/avatarbox.api)
[![Coverage Status](https://coveralls.io/repos/github/mrtillman/avatarbox.api/badge.svg?branch=master)](https://coveralls.io/github/mrtillman/avatarbox.api?branch=master)

## Getting Started

**avatarbox.api** exposes the AvatarBox infrastructure via a standard programmatic interface. Using the AvatarBox API, you can do just about anything you can do on [avatarbox.io](https://avatarbox.io), while using your programming language of choice. This API also exposes each method from the [Gravatar XML-RPC API](https://en.gravatar.com/site/implement/xmlrpc) as a REST endpoint. To obtain an access token, be sure to [register your application](https://github.com/mrtillman/avatarbox.api/wiki/Register-Your-App). All requests will need to be sent via HTTPS.

If you are just getting started, be sure to see the [Wiki](https://github.com/mrtillman/avatarbox.api/wiki) and [API docs](https://documenter.getpostman.com/view/1403721/TWDdkuF2).

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/62ef313ed771a3e49e71)

## Checklist

- IAM Role: `APIBackendRole`
  - AmazonDynamoDBFullAccess
- KMS Symmetric Key
  - add `APIBackendRole` as a Key user

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

Open http://localhost:8081 to view it in the browser.

## License

[MIT](https://github.com/mrtillman/avatarbox.api/blob/main/LICENSE)