import { Construct } from "constructs";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class dbStack extends Construct {
  public readonly targetVpc: ec2.Vpc;
  public readonly dbSecretKey: string;
  public readonly dbSecretKeyARN: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    const vpc = new ec2.Vpc(this, "WagesVpc", {
      natGateways: 0,
      subnetConfiguration: [
        {
          name: "RdsSubnet",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          name: "Ec2Subnet",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    const engine = rds.DatabaseInstanceEngine.postgres({
      version: rds.PostgresEngineVersion.VER_15_2,
    });

    const dataBase = new rds.DatabaseInstance(this, "WagesDatabase", {
      engine,
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        ec2.InstanceSize.MICRO
      ),
      databaseName: "wages",
      deletionProtection: false,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
    });

    dataBase.connections.allowFromAnyIpv4(ec2.Port.tcp(5432));

    this.dbSecretKeyARN = dataBase.secret?.secretArn!;
    this.dbSecretKey = dataBase.secret?.secretName!;
    this.targetVpc = vpc;
  }
}
