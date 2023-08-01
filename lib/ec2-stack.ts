import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";

import { readFileSync } from "fs";
import { Role } from "aws-cdk-lib/aws-iam";

export interface Ec2StackProps {
  vpc: ec2.Vpc;
  dbSecretKey: string;
  dbSecretARN: string;
  frontEndSecret: string;
  frontEndSecretARN: string;
  emailTemplateArn: string;
}

export class Ec2Stack extends Stack {
  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id);

    const ec2SecurityGroup = new ec2.SecurityGroup(this, "WagesSecurityGroup", {
      vpc: props.vpc,
    });

    ec2SecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));
    ec2SecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));
    ec2SecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));

    const role = new iam.Role(this, "Ec2Role", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });

    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ["secretsmanager:GetSecretValue"],
        resources: [props.dbSecretARN, props.frontEndSecretARN],
      })
    );

    /* role.addToPolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendTemplatedEmail"],
        resources: [props.emailTemplateArn],
      })
    ); */

    const instance = new ec2.Instance(this, "WagesVM", {
      instanceType: new ec2.InstanceType("t4g.nano"),
      machineImage: ec2.MachineImage.genericLinux({
        "eu-north-1": "ami-0ebb6753c095cb52a",
      }),
      vpc: props.vpc,
      instanceName: "WagesVM",
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: ec2SecurityGroup,
      keyName: "hey",
      userDataCausesReplacement: true,
      role: role,
    });

    const initScript = readFileSync("./assets/init.sh", "utf8");
    const postInitScript = readFileSync("./assets/postinit.sh", "utf8");

    instance.addUserData(initScript);
    instance.addUserData(
      `echo -e "DB_SECRET=${props.dbSecretKey}\nFE_SECRET=${props.frontEndSecret}" >> /etc/environment`
    );
    instance.addUserData(postInitScript);
  }
}
