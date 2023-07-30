import { Construct } from "constructs";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class dbStack extends Construct {
  public readonly dbSecretKey: string;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const vpc = new ec2.Vpc(this, "WagesVpc", {
      natGateways: 1,
    });

    const engine = rds.DatabaseInstanceEngine.postgres({
      version: rds.PostgresEngineVersion.VER_15_2,
    });

    const dataBase = new rds.DatabaseInstance(this, "WagesDatabase", {
      engine,
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      databaseName: "wages",
      deletionProtection: false,
    });

    this.dbSecretKey = dataBase.secret?.secretName!;
  }
}
