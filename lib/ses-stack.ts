import { Construct } from "constructs";
import * as ses from "aws-cdk-lib/aws-ses";

export class sesStack extends Construct {
  constructor(scope: Construct, id: string, website: string) {
    super(scope, id);

    new ses.EmailIdentity(this, "Identity", {
      identity: ses.Identity.domain("ironpond.net"),
    });

    new ses.CfnTemplate(this, "FastApiTemplate", {
      template: {
        subjectPart: "Reset your password",
        htmlPart: `<p>please follow this <a href=${website}/forgot-password?token={{token}}>link</a> to reset your password.</p>`,
        templateName: "FASTAPI_RESET_TOKEN",
        textPart: "",
      },
    });
  }
}
