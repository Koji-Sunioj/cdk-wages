import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";

import { sesStack } from "./ses-stack";
import { websiteStack } from "./website-stack";

export class WagesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const { websiteUrl } = new websiteStack(this, "WagesFrontend");

    new sesStack(this, "Ses-Stack");
  }
}
