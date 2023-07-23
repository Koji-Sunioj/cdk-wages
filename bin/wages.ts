#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WagesStack } from '../lib/wages-stack';

const app = new cdk.App();
new WagesStack(app, 'WagesStack');
