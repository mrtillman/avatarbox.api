# avatarbox.api

rest api for [avatarbox.io](https://avatarbox.io)

---

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

## License

[MIT](https://github.com/mrtillman/avatarbox.api/blob/main/LICENSE)