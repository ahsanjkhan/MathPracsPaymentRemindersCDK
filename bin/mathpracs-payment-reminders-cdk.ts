#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MathPracsPaymentRemindersStack } from '../lib/mathpracs-payment-reminders-stack';

const app = new cdk.App();
new MathPracsPaymentRemindersStack(app, 'MathPracsPaymentRemindersStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});