import { Construct } from "constructs";
import * as secretsManager from "aws-cdk-lib/aws-secretsmanager";
import { Stack, StackProps, SecretValue } from "aws-cdk-lib";

import { sesStack } from "./ses-stack";
import { dbStack } from "./db-stack";
import { websiteStack } from "./website-stack";

import { v4 as uuidv4 } from "uuid";

export class WagesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new sesStack(this, "Ses-Stack");
    const { websiteUrl } = new websiteStack(this, "WagesFrontend");
    const { dbSecretKey } = new dbStack(this, "Db-Stack");

    new secretsManager.Secret(this, "Secret", {
      secretName: "wages_frontend",
      secretObjectValue: {
        FE_SECRET: SecretValue.unsafePlainText(websiteUrl),
        SECRET: SecretValue.unsafePlainText(uuidv4()),
      },
    });
  }
}
