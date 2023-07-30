import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface Ec2StackProps {
  vpc: ec2.Vpc;
}

export class Ec2Stack extends Stack {
  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id);

    const ec2SecurityGroup = new ec2.SecurityGroup(this, "WagesSecurityGroup", {
      vpc: props.vpc,
    });
  }
}
