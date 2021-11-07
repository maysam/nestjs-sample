## Description

Sample personal application

## DevOps

use Gitlab for CICD and setup a `.gitlab-ci.yml` containing multiple steps like `build`, `test`, `lint`, `audit`, `deploy_staging`, `deploy_production`, `announce_deployment` to run the tests before deployment. When having multiple repositories, use triggers.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

```

and visit http://localhost:3000/api/v1/available-products/1111


```bash
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

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
