# Motivation

This project was originally intended to deploy a full stack app which included the ability to register, input hourly wages and visualize statistical information on it aggregated by the backend with Python - Pandas.

However, it turned into a learning experience about deploying a REST API on on EC2. Learnings included pointing nginx to point to the python based server (fastapi), automating the creation of environment variables in the virtual machine as produced dynamically by the AWS CDK stack, and editing the cloud config file so that the server still in case of a reboot. I don't have the time (at the moment) to continue working on the statistical data visualizations for the user at the moment, but I might come back to it later.

# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`WagesStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
