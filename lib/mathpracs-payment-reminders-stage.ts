import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MathPracsPaymentRemindersStack } from './mathpracs-payment-reminders-stack';

export class MathPracsPaymentRemindersStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new MathPracsPaymentRemindersStack(this, 'MathPracsPaymentRemindersStack');
  }
}
