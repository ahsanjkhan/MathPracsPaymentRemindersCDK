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

    // DynamoDB Tables
    const studentPaymentTable = new dynamodb.Table(this, 'StudentPaymentRemindersTable', {
      tableName: 'mathpracs-student-payment-reminders',
      partitionKey: { name: 'uid', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const tutorPaymentTable = new dynamodb.Table(this, 'TutorPaymentRemindersTable', {
      tableName: 'mathpracs-tutor-payment-reminders',
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

    // Student Payment Reminder Lambda
    const studentPaymentLambda = new python.PythonFunction(this, 'StudentPaymentReminderFunction', {
      functionName: 'mathpracs-student-payment-reminder',
      runtime: lambda.Runtime.PYTHON_3_10,
      entry: '../MathPracsPaymentRemindersLambda/student_payments',
      index: 'handler/lambda_function.py',
      handler: 'lambda_handler',
      timeout: cdk.Duration.minutes(5),
      memorySize: 512,
      environment: {
        STUDENT_PAYMENT_TABLE_NAME: studentPaymentTable.tableName,
        SECRETS_ARN: apiSecrets.secretArn,
      },
    });

    // Tutor Payment Reminder Lambda
    const tutorPaymentLambda = new python.PythonFunction(this, 'TutorPaymentReminderFunction', {
      functionName: 'mathpracs-tutor-payment-reminder',
      runtime: lambda.Runtime.PYTHON_3_10,
      entry: '../MathPracsPaymentRemindersLambda/tutor_payments',
      index: 'handler/lambda_function.py',
      handler: 'lambda_handler',
      timeout: cdk.Duration.minutes(5),
      memorySize: 512,
      environment: {
        TUTOR_PAYMENT_TABLE_NAME: tutorPaymentTable.tableName,
        SECRETS_ARN: apiSecrets.secretArn,
      },
    });

    // Grant Lambda permissions
    studentPaymentTable.grantReadWriteData(studentPaymentLambda);
    tutorPaymentTable.grantReadWriteData(tutorPaymentLambda);
    apiSecrets.grantRead(studentPaymentLambda);
    apiSecrets.grantRead(tutorPaymentLambda);

    // EventBridge rule for Sunday 6 PM Chicago time (cron: 0 23 ? * SUN *)
    const studentRemindersScheduleRule = new events.Rule(this, 'StudentPaymentReminderSchedule', {
      ruleName: 'mathpracs-student-payment-reminder-schedule',
      description: 'Triggers student payment reminder Lambda every Sunday at 6 PM Chicago time',
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '23', // 6 PM Chicago = 11 PM UTC (during standard time)
        weekDay: 'SUN'
      }),
    });

    studentRemindersScheduleRule.addTarget(new targets.LambdaFunction(studentPaymentLambda));

    // EventBridge rule for 1st of the Month at 2 PM Chicago time
    const tutorRemindersScheduleRule = new events.Rule(this, 'TutorPaymentReminderSchedule', {
      ruleName: 'mathpracs-tutor-payment-reminder-schedule',
      description: 'Triggers tutor payment reminder Lambda every 1st of the Month at 2 PM Chicago time',
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '20', // 2 PM Chicago = 8 PM UTC (during standard time)
        month: '*'
      }),
    });

    tutorRemindersScheduleRule.addTarget(new targets.LambdaFunction(tutorPaymentLambda));

    // Outputs
    new cdk.CfnOutput(this, 'StudentPaymentTableName', {
      value: studentPaymentTable.tableName,
      description: 'DynamoDB table name for student payment reminders'
    });

    new cdk.CfnOutput(this, 'TutorPaymentTableName', {
      value: tutorPaymentTable.tableName,
      description: 'DynamoDB table name for tutor payment reminders'
    });

    new cdk.CfnOutput(this, 'StudentLambdaFunctionName', {
      value: studentPaymentLambda.functionName,
      description: 'Student payment reminder Lambda function name'
    });

    new cdk.CfnOutput(this, 'TutorLambdaFunctionName', {
      value: tutorPaymentLambda.functionName,
      description: 'Tutor payment reminders Lambda function name'
    });

    new cdk.CfnOutput(this, 'SecretsArn', {
      value: apiSecrets.secretArn,
      description: 'Secrets Manager ARN for API credentials'
    });
  }
}