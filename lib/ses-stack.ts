import { Construct } from "constructs";
import * as ses from "aws-cdk-lib/aws-ses";

export class sesStack extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new ses.EmailIdentity(this, "Identity", {
      identity: ses.Identity.domain("ironpond.net"),
    });
  }
}
