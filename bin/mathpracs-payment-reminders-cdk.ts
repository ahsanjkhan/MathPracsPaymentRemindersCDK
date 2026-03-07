#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MathPracsPaymentRemindersPipelineStack } from '../lib/mathpracs-payment-reminders-pipeline-stack';

const app = new cdk.App();
new MathPracsPaymentRemindersPipelineStack(app, 'MathPracsPaymentRemindersPipelineStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
