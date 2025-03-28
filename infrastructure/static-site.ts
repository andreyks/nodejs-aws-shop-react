#!/usr/bin/env node
//@ts-nocheck
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { CfnOutput, Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path = require('path');

import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSite extends Construct {
    constructor(parent: Stack, name: string, props: StaticSiteProps) {
      super(parent, name);
  
      // Content bucket
      const siteBucket = new s3.Bucket(this, 'SiteBucket', {
        bucketName: process.env.AWS_S3_BUCKET_NAME,
        publicReadAccess: false,
        websiteIndexDocument: "index.html",
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  
        /**
         * The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
         * the new bucket, and it will remain in your account until manually deleted. By setting the policy to
         * DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
         */
        removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
  
        /**
         * For sample purposes only, if you create an S3 bucket then populate it, stack destruction fails.  This
         * setting will enable full cleanup of the demo.
         */
        autoDeleteObjects: true, // NOT recommended for production code
      });
  
      new CfnOutput(this, 'Bucket Name', { value: siteBucket.bucketName });
      new CfnOutput(this, 'Bucket Website Url', { value: siteBucket.bucketWebsiteUrl });

  
      // CloudFront distribution
      const distribution = new cloudfront.Distribution(this, process.env.AWS_DISTRIBUTION_NAME, {
        defaultRootObject: "index.html",
        minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        errorResponses:[
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: Duration.minutes(30),
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: Duration.minutes(30),
          }
        ],
        defaultBehavior: {
          origin: cloudfront_origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
          compress: true,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        }
      })
  
      new CfnOutput(this, 'Distribution Id', { value: distribution.distributionId });
      new CfnOutput(this, 'Distribution Domain', { value: distribution.domainName, exportName: 'DistributionDomain' });
  
      // Deploy site contents to S3 bucket
      new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
        sources: [s3deploy.Source.asset(path.join(__dirname, '../dist'))],
        destinationBucket: siteBucket,
        distribution,
        distributionPaths: ['/*'],
      });
    }
  }
