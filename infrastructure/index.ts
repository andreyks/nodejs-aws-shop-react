#!/usr/bin/env node
//import * as cdk from '@aws-cdk/core';
import * as cdk from 'aws-cdk-lib';
import { StaticSite } from './static-site';

import * as dotenv from 'dotenv';

dotenv.config();

/**
 * This stack relies on getting the domain name from CDK context.
 * Use 'cdk synth -c domain=mystaticsite.com -c subdomain=www'
 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "subdomain": "www",
 *     "accountId": "1234567890",
 *   }
 * }
**/
class MyStaticSiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string) {
    super(parent, name);

    new StaticSite(this, 'StaticSite', {
      env: {
        account: process.env.AWS_ACCOUNT_ID,
        region: process.env.AWS_REGION
      }
    });
  }
}

const app = new cdk.App();

new MyStaticSiteStack(app, 'MyStaticSite');

app.synth();
