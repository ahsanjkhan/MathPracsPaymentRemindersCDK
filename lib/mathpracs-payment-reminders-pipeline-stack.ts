import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MathPracsPaymentRemindersStage } from './mathpracs-payment-reminders-stage';

const CDK_REPO = 'ahsanjkhan/MathPracsPaymentRemindersCDK';
const LAMBDA_REPO = 'ahsanjkhan/MathPracsPaymentRemindersLambda';
const BRANCH = 'main';

export class MathPracsPaymentRemindersPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const connectionArn = ssm.StringParameter.valueForStringParameter(this, '/mathpracs/github-connection-arn');

    const cdkSource = CodePipelineSource.connection(CDK_REPO, BRANCH, {
      connectionArn,
    });

    const lambdaSource = CodePipelineSource.connection(LAMBDA_REPO, BRANCH, {
      connectionArn,
    });

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MathPracsPaymentRemindersPipeline',
      synth: new ShellStep('Synth', {
        input: cdkSource,
        additionalInputs: {
          '../MathPracsPaymentRemindersLambda': lambdaSource,
        },
        commands: [
          'npm ci',
          'npx cdk synth',
        ],
      }),
    });

    pipeline.addStage(new MathPracsPaymentRemindersStage(this, 'Prod', {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
      },
    }));
  }
}
