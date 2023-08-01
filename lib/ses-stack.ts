import { Construct } from "constructs";
import * as ses from "aws-cdk-lib/aws-ses";

export class sesStack extends Construct {
  public readonly templateName: string;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new ses.EmailIdentity(this, "Identity", {
      identity: ses.Identity.domain("ironpond.net"),
    });

    const templateName = "FASTAPI_RESET_TOKEN";

    new ses.CfnTemplate(this, "FastApiTemplate", {
      template: {
        subjectPart: "Reset your password",
        htmlPart: `<p>please follow this <a href={{website}}/forgot-password?email={{email}}&token={{token}}>link</a> to reset your password.</p>`,
        templateName: templateName,
        textPart: "",
      },
    });

    this.templateName = templateName;
  }
}
