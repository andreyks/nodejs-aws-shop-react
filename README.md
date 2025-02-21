# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Installation
```shell
// Setup repo and correct branch for the task.
git clone git@github.com:andreyks/nodejs-aws-shop-react.git
cd nodejs-aws-shop-react
git co task_XX_name

// Install old node for this project.
nvm install 20

// Install dependencies.
npm i

// Install aws (aws-cli) https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html.
// Configure aws-cli with proper credentials.
aws configure

// Setup aws cdk.
copy .env.example as .env
# edit .env with correct credentials
cd infrastructure;
cdk bootstrap
```

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.

### `deploy`

Run deploy (copy directory `dist` to AWS S3 Bucket and Cloudfront). Alternative way is `(cd infrastructure; npm run deploy)`.
After first run this command can be used for syncing directory `dist` to the AWS. Cloudfront invalidation will be executed as well.

### `destroy`

Run destroy (remove stack with AWS S3 Bucket and Cloudfront). Alternative command is `(cd infrastructure; npm run destroy)`.

## Tasks

### Task 02

S3 backed link http://aws-demo-food-market-s3bucket.s3-website.eu-north-1.amazonaws.com (protected, 403)
CloudFront link https://d3eddq2lndvxd8.cloudfront.net
