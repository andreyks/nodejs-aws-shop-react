## About
Using AWS CDK example https://github.com/aws-samples/aws-cdk-examples/tree/main/typescript/static-site.

This code creates the infrastructure for a static site, which uses an S3 bucket for storing the content.  The site contents (located in the parent directory '../dist' sub-directory) are deployed to the bucket.

The site redirects from HTTP to HTTPS, using a CloudFront distribution.

## Deploy

```shell
$ npm install -g aws-cdk
$ npm install
$ npm run build
$ cdk deploy
```
