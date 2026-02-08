import * as cdk from 'aws-cdk-lib';
import * as python from '@aws-cdk/aws-lambda-python-alpha';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import {
  API_CREDENTIALS_SECRET_DESCRIPTION,
  API_CREDENTIALS_SECRET_ID,
  API_CREDENTIALS_SECRET_KEY_GOOGLE_OAUTH,
  API_CREDENTIALS_SECRET_KEY_GOOGLE_SHEETS,
  API_CREDENTIALS_SECRET_KEY_TWILIO_PHONE_NUMBER,
  API_CREDENTIALS_SECRET_KEY_TWILIO_SID,
  API_CREDENTIALS_SECRET_KEY_TWILIO_TOKEN,
  API_CREDENTIALS_SECRET_NAME, API_CREDENTIALS_SECRET_PLACEHOLDER,
  CFN_OUTPUT_API_CREDENTIALS_SECRETS_DESCRIPTION,
  CFN_OUTPUT_API_CREDENTIALS_SECRETS_ID,
  CFN_OUTPUT_STUDENT_LAMBDA_DESCRIPTION,
  CFN_OUTPUT_STUDENT_LAMBDA_ID,
  CFN_OUTPUT_STUDENT_PAYMENT_TABLE_DESCRIPTION,
  CFN_OUTPUT_STUDENT_PAYMENT_TABLE_ID,
  CFN_OUTPUT_TUTOR_LAMBDA_DESCRIPTION,
  CFN_OUTPUT_TUTOR_LAMBDA_ID,
  CFN_OUTPUT_TUTOR_PAYMENT_TABLE_DESCRIPTION,
  CFN_OUTPUT_TUTOR_PAYMENT_TABLE_ID,
  SSM_GOOGLE_SHEETS_ID_DESCRIPTION,
  SSM_GOOGLE_SHEETS_ID_ID,
  SSM_GOOGLE_SHEETS_ID_NAME,
  SSM_PAYMENT_INFO_URL_DESCRIPTION,
  SSM_PAYMENT_INFO_URL_ID,
  SSM_PAYMENT_INFO_URL_NAME,
  SSM_PHONE_ENABLED_COLUMNS_DESCRIPTION,
  SSM_PHONE_ENABLED_COLUMNS_ID,
  SSM_PHONE_ENABLED_COLUMNS_NAME,
  SSM_PLACEHOLDER,
  SSM_TUTOR_SALARY_RATE_DESCRIPTION,
  SSM_TUTOR_SALARY_RATE_ID,
  SSM_TUTOR_SALARY_RATE_NAME,
  STUDENT_PAYMENT_LAMBDA_ENTRY,
  STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN, STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_GOOGLE_SHEETS_SSM_NAME,
  STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_PAYMENT_INFO_URL_SSM_NAME,
  STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_PHONE_ENABLED_COLUMNS_SSM_NAME,
  STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENT_PAYMENT_TABLE_NAME,
  STUDENT_PAYMENT_LAMBDA_HANDLER,
  STUDENT_PAYMENT_LAMBDA_ID,
  STUDENT_PAYMENT_LAMBDA_INDEX,
  STUDENT_PAYMENT_LAMBDA_MEMORY_SIZE,
  STUDENT_PAYMENT_LAMBDA_NAME,
  STUDENT_PAYMENT_LAMBDA_RUNTIME,
  STUDENT_PAYMENT_LAMBDA_TIMEOUT,
  STUDENT_PAYMENT_TABLE_ID,
  STUDENT_PAYMENT_TABLE_NAME,
  STUDENT_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION,
  STUDENT_REMINDERS_EVENTBRIDGE_RULE_ID,
  STUDENT_REMINDERS_EVENTBRIDGE_RULE_NAME,
  STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR,
  STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE,
  STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_WEEKDAY,
  TUTOR_PAYMENT_LAMBDA_ENTRY,
  TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN, TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_GOOGLE_SHEETS_SSM_NAME,
  TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_PHONE_ENABLED_COLUMNS_SSM_NAME,
  TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_PAYMENT_TABLE_NAME,
  TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_SALARY_RATE_SSM_NAME,
  TUTOR_PAYMENT_LAMBDA_HANDLER,
  TUTOR_PAYMENT_LAMBDA_ID,
  TUTOR_PAYMENT_LAMBDA_INDEX,
  TUTOR_PAYMENT_LAMBDA_MEMORY_SIZE,
  TUTOR_PAYMENT_LAMBDA_NAME,
  TUTOR_PAYMENT_LAMBDA_RUNTIME,
  TUTOR_PAYMENT_LAMBDA_TIMEOUT,
  TUTOR_PAYMENT_TABLE_ID,
  TUTOR_PAYMENT_TABLE_NAME,
  TUTOR_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION,
  TUTOR_REMINDERS_EVENTBRIDGE_RULE_ID,
  TUTOR_REMINDERS_EVENTBRIDGE_RULE_NAME,
  TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY,
  TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR,
  TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE,
  TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH
} from "../config/constants";

export class MathPracsPaymentRemindersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Tables
    const studentPaymentTable = new dynamodb.Table(this, STUDENT_PAYMENT_TABLE_ID, {
      tableName: STUDENT_PAYMENT_TABLE_NAME,
      partitionKey: { name: 'uid', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const tutorPaymentTable = new dynamodb.Table(this, TUTOR_PAYMENT_TABLE_ID, {
      tableName: TUTOR_PAYMENT_TABLE_NAME,
      partitionKey: { name: 'uid', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Secrets for API credentials
    const apiSecrets = new secretsmanager.Secret(this, API_CREDENTIALS_SECRET_ID, {
      secretName: API_CREDENTIALS_SECRET_NAME,
      description: API_CREDENTIALS_SECRET_DESCRIPTION,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          [API_CREDENTIALS_SECRET_KEY_GOOGLE_OAUTH]: '',
          [API_CREDENTIALS_SECRET_KEY_GOOGLE_SHEETS]: '',
          [API_CREDENTIALS_SECRET_KEY_TWILIO_SID]: '',
          [API_CREDENTIALS_SECRET_KEY_TWILIO_TOKEN]: '',
          [API_CREDENTIALS_SECRET_KEY_TWILIO_PHONE_NUMBER]: ''
        }),
        generateStringKey: API_CREDENTIALS_SECRET_PLACEHOLDER,
        excludeCharacters: '"@/\\'
      }
    });

    // SSM Parameters
    const googleSheetsIdParam = new ssm.StringParameter(this, SSM_GOOGLE_SHEETS_ID_ID, {
      parameterName: SSM_GOOGLE_SHEETS_ID_NAME,
      stringValue: SSM_PLACEHOLDER,
      description: SSM_GOOGLE_SHEETS_ID_DESCRIPTION
    });

    const paymentInfoUrlParam = new ssm.StringParameter(this, SSM_PAYMENT_INFO_URL_ID, {
      parameterName: SSM_PAYMENT_INFO_URL_NAME,
      stringValue: SSM_PLACEHOLDER,
      description: SSM_PAYMENT_INFO_URL_DESCRIPTION
    });

    const phoneEnabledColumnsParam = new ssm.StringListParameter(this, SSM_PHONE_ENABLED_COLUMNS_ID, {
      parameterName: SSM_PHONE_ENABLED_COLUMNS_NAME,
      stringListValue: [SSM_PLACEHOLDER],
      description: SSM_PHONE_ENABLED_COLUMNS_DESCRIPTION
    });

    const tutorSalaryRateParam = new ssm.StringParameter(this, SSM_TUTOR_SALARY_RATE_ID, {
      parameterName: SSM_TUTOR_SALARY_RATE_NAME,
      stringValue: SSM_PLACEHOLDER,
      description: SSM_TUTOR_SALARY_RATE_DESCRIPTION
    });

    // Student Payment Reminder Lambda
    const studentPaymentLambda = new python.PythonFunction(this, STUDENT_PAYMENT_LAMBDA_ID, {
      functionName: STUDENT_PAYMENT_LAMBDA_NAME,
      runtime: STUDENT_PAYMENT_LAMBDA_RUNTIME,
      entry: STUDENT_PAYMENT_LAMBDA_ENTRY,
      index: STUDENT_PAYMENT_LAMBDA_INDEX,
      handler: STUDENT_PAYMENT_LAMBDA_HANDLER,
      timeout: STUDENT_PAYMENT_LAMBDA_TIMEOUT,
      memorySize: STUDENT_PAYMENT_LAMBDA_MEMORY_SIZE,
    });
    studentPaymentLambda.addEnvironment(STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENT_PAYMENT_TABLE_NAME, studentPaymentTable.tableName)
    studentPaymentLambda.addEnvironment(STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN, apiSecrets.secretArn)
    studentPaymentLambda.addEnvironment(STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_GOOGLE_SHEETS_SSM_NAME, googleSheetsIdParam.parameterName)
    studentPaymentLambda.addEnvironment(STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_PAYMENT_INFO_URL_SSM_NAME, paymentInfoUrlParam.parameterName)
    studentPaymentLambda.addEnvironment(STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_PHONE_ENABLED_COLUMNS_SSM_NAME, phoneEnabledColumnsParam.parameterName)

    // Tutor Payment Reminder Lambda
    const tutorPaymentLambda = new python.PythonFunction(this, TUTOR_PAYMENT_LAMBDA_ID, {
      functionName: TUTOR_PAYMENT_LAMBDA_NAME,
      runtime: TUTOR_PAYMENT_LAMBDA_RUNTIME,
      entry: TUTOR_PAYMENT_LAMBDA_ENTRY,
      handler: TUTOR_PAYMENT_LAMBDA_HANDLER,
      timeout: TUTOR_PAYMENT_LAMBDA_TIMEOUT,
      memorySize: TUTOR_PAYMENT_LAMBDA_MEMORY_SIZE,
    });
    tutorPaymentLambda.addEnvironment(TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_PAYMENT_TABLE_NAME, tutorPaymentTable.tableName)
    tutorPaymentLambda.addEnvironment(TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN, apiSecrets.secretArn)
    tutorPaymentLambda.addEnvironment(TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_GOOGLE_SHEETS_SSM_NAME, googleSheetsIdParam.parameterName)
    tutorPaymentLambda.addEnvironment(TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_PHONE_ENABLED_COLUMNS_SSM_NAME, phoneEnabledColumnsParam.parameterName)
    tutorPaymentLambda.addEnvironment(TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_SALARY_RATE_SSM_NAME, tutorSalaryRateParam.parameterName)

    // Grant Lambda permissions
    studentPaymentTable.grantReadWriteData(studentPaymentLambda);
    tutorPaymentTable.grantReadWriteData(tutorPaymentLambda);
    apiSecrets.grantRead(studentPaymentLambda);
    apiSecrets.grantRead(tutorPaymentLambda);
    googleSheetsIdParam.grantRead(studentPaymentLambda);
    googleSheetsIdParam.grantRead(tutorPaymentLambda);
    paymentInfoUrlParam.grantRead(studentPaymentLambda);
    phoneEnabledColumnsParam.grantRead(studentPaymentLambda);
    phoneEnabledColumnsParam.grantRead(tutorPaymentLambda);
    tutorSalaryRateParam.grantRead(tutorPaymentLambda);

    const studentRemindersScheduleRule = new events.Rule(this, STUDENT_REMINDERS_EVENTBRIDGE_RULE_ID, {
      ruleName: STUDENT_REMINDERS_EVENTBRIDGE_RULE_NAME,
      description: STUDENT_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION,
      schedule: events.Schedule.cron({
        minute: STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE,
        hour: STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR,
        weekDay: STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_WEEKDAY
      }),
    });

    studentRemindersScheduleRule.addTarget(new targets.LambdaFunction(studentPaymentLambda));

    const tutorRemindersScheduleRule = new events.Rule(this, TUTOR_REMINDERS_EVENTBRIDGE_RULE_ID, {
      ruleName: TUTOR_REMINDERS_EVENTBRIDGE_RULE_NAME,
      description: TUTOR_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION,
      schedule: events.Schedule.cron({
        minute: TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE,
        hour: TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR,
        day: TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY,
        month: TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH
      }),
    });

    tutorRemindersScheduleRule.addTarget(new targets.LambdaFunction(tutorPaymentLambda));

    // Outputs
    new cdk.CfnOutput(this, CFN_OUTPUT_STUDENT_PAYMENT_TABLE_ID, {
      value: studentPaymentTable.tableName,
      description: CFN_OUTPUT_STUDENT_PAYMENT_TABLE_DESCRIPTION
    });

    new cdk.CfnOutput(this, CFN_OUTPUT_TUTOR_PAYMENT_TABLE_ID, {
      value: tutorPaymentTable.tableName,
      description: CFN_OUTPUT_TUTOR_PAYMENT_TABLE_DESCRIPTION
    });

    new cdk.CfnOutput(this, CFN_OUTPUT_STUDENT_LAMBDA_ID, {
      value: studentPaymentLambda.functionName,
      description: CFN_OUTPUT_STUDENT_LAMBDA_DESCRIPTION
    });

    new cdk.CfnOutput(this, CFN_OUTPUT_TUTOR_LAMBDA_ID, {
      value: tutorPaymentLambda.functionName,
      description: CFN_OUTPUT_TUTOR_LAMBDA_DESCRIPTION
    });

    new cdk.CfnOutput(this, CFN_OUTPUT_API_CREDENTIALS_SECRETS_ID, {
      value: apiSecrets.secretArn,
      description: CFN_OUTPUT_API_CREDENTIALS_SECRETS_DESCRIPTION
    });
  }
}