import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as python from '@aws-cdk/aws-lambda-python-alpha';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class MathPracsPaymentRemindersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table for storing payment reminders
    const paymentTable = new dynamodb.Table(this, 'PaymentRemindersTable', {
      tableName: 'mathpracs-payment-reminders',
      partitionKey: { name: 'uid', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Secrets for API credentials
    const apiSecrets = new secretsmanager.Secret(this, 'ApiCredentials', {
      secretName: 'mathpracs-api-credentials',
      description: 'API credentials for Google Calendar, Google Sheets, and Twilio',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          googleCalendarOAuthCredentials: '',
          googleSheetsCredentials: '',
          twilioAccountSid: '',
          twilioAuthToken: '',
          twilioPhoneNumber: ''
        }),
        generateStringKey: 'placeholder',
        excludeCharacters: '"@/\\'
      }
    });

    // Lambda function with Python dependencies
    const paymentReminderLambda = new python.PythonFunction(this, 'PaymentReminderFunction', {
      functionName: 'mathpracs-payment-reminder',
      runtime: lambda.Runtime.PYTHON_3_10,
      entry: '../MathPracsPaymentRemindersLambda',
      index: 'handler/lambda_function.py',
      handler: 'lambda_handler',
      timeout: cdk.Duration.minutes(5),
      memorySize: 512,
      environment: {
        PAYMENT_TABLE_NAME: paymentTable.tableName,
        SECRETS_ARN: apiSecrets.secretArn,
      },
    });

    // Grant Lambda permissions
    paymentTable.grantReadWriteData(paymentReminderLambda);
    apiSecrets.grantRead(paymentReminderLambda);

    // EventBridge rule for Sunday 6 PM Chicago time (cron: 0 23 ? * SUN *)
    const scheduleRule = new events.Rule(this, 'PaymentReminderSchedule', {
      ruleName: 'mathpracs-payment-reminder-schedule',
      description: 'Triggers payment reminder Lambda every Sunday at 6 PM Chicago time',
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '23', // 6 PM Chicago = 11 PM UTC (during standard time)
        weekDay: 'SUN'
      }),
    });

    scheduleRule.addTarget(new targets.LambdaFunction(paymentReminderLambda));

    // Outputs
    new cdk.CfnOutput(this, 'PaymentTableName', {
      value: paymentTable.tableName,
      description: 'DynamoDB table name for payment reminders'
    });

    new cdk.CfnOutput(this, 'LambdaFunctionName', {
      value: paymentReminderLambda.functionName,
      description: 'Lambda function name'
    });

    new cdk.CfnOutput(this, 'SecretsArn', {
      value: apiSecrets.secretArn,
      description: 'Secrets Manager ARN for API credentials'
    });
  }
}