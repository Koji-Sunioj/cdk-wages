import { Construct } from "constructs";
import * as ses from "aws-cdk-lib/aws-ses";
import * as route53 from "aws-cdk-lib/aws-route53";

export class sesStack extends Construct {
  public readonly myHostedZone: route53.HostedZone;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    new ses.EmailIdentity(this, "Identity", {
      identity: ses.Identity.publicHostedZone(this.myHostedZone),
      mailFromDomain: "ironpond.net",
    });
  }
}
