import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";

import { sesStack } from "./ses-stack";

export class WagesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new sesStack(this, "Ses-Stack");
  }
}
