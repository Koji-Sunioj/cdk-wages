import { Construct } from "constructs";

import * as path from "path";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origin from "aws-cdk-lib/aws-cloudfront-origins";

export class websiteStack extends Construct {
  public readonly websiteUrl: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "Bucket", {
      accessControl: s3.BucketAccessControl.PRIVATE,
    });
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    bucket.grantRead(originAccessIdentity);

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new origin.S3Origin(bucket, { originAccessIdentity }),
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    const deployment = new s3Deploy.BucketDeployment(this, "BucketDeployment", {
      sources: [
        s3Deploy.Source.asset(path.resolve(__dirname, "../frontend_build")),
      ],
      cacheControl: [
        s3Deploy.CacheControl.fromString("max-age=3000,public,immutable"),
      ],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });

    this.websiteUrl = distribution.distributionDomainName;
  }
}
