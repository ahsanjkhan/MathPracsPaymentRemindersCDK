import * as cdk from 'aws-cdk-lib';
import * as python from '@aws-cdk/aws-lambda-python-alpha';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sns_subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as cloudwatch_actions from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Construct } from 'constructs';
import {
  BUSINESS_PAYMENT_TABLE_NAME,
  BUSINESS_PAYMENT_TABLE_ID,
  BUSINESS_PAYMENT_LAMBDA_NAME,
  BUSINESS_PAYMENT_LAMBDA_ID,
  BUSINESS_PAYMENT_LAMBDA_RUNTIME,
  BUSINESS_PAYMENT_LAMBDA_ENTRY,
  BUSINESS_PAYMENT_LAMBDA_HANDLER,
  BUSINESS_PAYMENT_LAMBDA_TIMEOUT,
  BUSINESS_PAYMENT_LAMBDA_MEMORY_SIZE,
  BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_BUSINESS_PAYMENT_TABLE_NAME,
  IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TRANSACTIONS_TABLE_NAME,
  IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_TRANSACTIONS_TABLE_NAME,
  IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_TABLE_NAME,
  IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_BUSINESS_INTERNAL_DEBTS_TABLE_NAME,
  IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_API_SECRETS_ARN,
  BUSINESS_REMINDERS_EVENTBRIDGE_RULE_NAME,
  BUSINESS_REMINDERS_EVENTBRIDGE_RULE_ID,
  BUSINESS_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION,
  BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE,
  BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR,
  BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY,
  BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH,
  CFN_OUTPUT_BUSINESS_PAYMENT_TABLE_ID,
  CFN_OUTPUT_BUSINESS_PAYMENT_TABLE_DESCRIPTION,
  CFN_OUTPUT_BUSINESS_LAMBDA_ID,
  CFN_OUTPUT_BUSINESS_LAMBDA_DESCRIPTION,
  MUAZ_ONLY_ADJUSTMENT_LAMBDA_NAME,
  MUAZ_ONLY_ADJUSTMENT_LAMBDA_ID,
  MUAZ_ONLY_ADJUSTMENT_LAMBDA_RUNTIME,
  MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENTRY,
  MUAZ_ONLY_ADJUSTMENT_LAMBDA_HANDLER,
  MUAZ_ONLY_ADJUSTMENT_LAMBDA_TIMEOUT,
  MUAZ_ONLY_ADJUSTMENT_LAMBDA_MEMORY_SIZE,
  IMPORTED_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENV_VAR_KEY_TRANSACTIONS_TABLE_NAME,
  IMPORTED_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENV_VAR_KEY_SESSIONS_TABLE_NAME,
  IMPORTED_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENV_VAR_KEY_TUTORS_METADATA_TABLE_NAME,
  IMPORTED_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENV_VAR_KEY_DISCORD_API_SECRETS_ARN,
  MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_NAME,
  MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_ID,
  MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_DESCRIPTION,
  MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE,
  MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR,
  MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY,
  MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH,
  CFN_OUTPUT_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ID,
  CFN_OUTPUT_MUAZ_ONLY_ADJUSTMENT_LAMBDA_DESCRIPTION,
  ALARM_BUSINESS_INTERNAL_DEBTS_DDB_ID,
  ALARM_BUSINESS_INTERNAL_DEBTS_DDB_NAME,
  ALARM_BUSINESS_INTERNAL_DEBTS_DDB_DESCRIPTION,
  API_CREDENTIALS_SECRET_DESCRIPTION,
  API_CREDENTIALS_SECRET_ID,
  API_CREDENTIALS_SECRET_KEY_TWILIO_PHONE_NUMBER,
  API_CREDENTIALS_SECRET_KEY_TWILIO_SID,
  API_CREDENTIALS_SECRET_KEY_TWILIO_TOKEN,
  API_CREDENTIALS_SECRET_NAME,
  API_CREDENTIALS_SECRET_PLACEHOLDER,
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
  IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_SESSIONS_TABLE_NAME,
  IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_METADATA_TABLE_NAME,
  IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_TABLE_NAME,
  IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_TRANSACTIONS_TABLE_NAME,
  IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_API_SECRETS_ARN,
  IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_TRANSACTIONS_TABLE_NAME,
  IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_SESSIONS_TABLE_NAME,
  IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_METADATA_TABLE_NAME,
  IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_TABLE_NAME,
  IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_METADATA_TABLE_NAME,
  IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_TABLE_NAME,
  STUDENT_PAYMENT_LAMBDA_ENTRY,
  STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN,
  STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_SECRETS_ARN,
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
  TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN,
  TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_PAYMENT_TABLE_NAME,
  TUTOR_PAYMENT_LAMBDA_HANDLER,
  TUTOR_PAYMENT_LAMBDA_ID,
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
  TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH,
  ALARM_NOTIFIER_LAMBDA_NAME,
  ALARM_NOTIFIER_LAMBDA_ID,
  ALARM_NOTIFIER_LAMBDA_RUNTIME,
  ALARM_NOTIFIER_LAMBDA_ENTRY,
  ALARM_NOTIFIER_LAMBDA_INDEX,
  ALARM_NOTIFIER_LAMBDA_HANDLER,
  ALARM_NOTIFIER_LAMBDA_TIMEOUT,
  ALARM_NOTIFIER_LAMBDA_MEMORY_SIZE,
  ALARM_NOTIFIER_LAMBDA_ENV_VAR_KEY_DISCORD_SECRETS_ARN,
  ALARM_SNS_TOPIC_NAME,
  ALARM_SNS_TOPIC_ID,
  METRICS_NAMESPACE,
  ALARM_STUDENT_INFO_DDB_ID,
  ALARM_STUDENT_INFO_DDB_NAME,
  ALARM_STUDENT_INFO_DDB_DESCRIPTION,
  ALARM_TUTOR_INFO_DDB_ID,
  ALARM_TUTOR_INFO_DDB_NAME,
  ALARM_TUTOR_INFO_DDB_DESCRIPTION,
  ALARM_PAYMENT_REMINDER_DDB_ID,
  ALARM_PAYMENT_REMINDER_DDB_NAME,
  ALARM_PAYMENT_REMINDER_DDB_DESCRIPTION,
  ALARM_TRANSACTIONS_DDB_ID,
  ALARM_TRANSACTIONS_DDB_NAME,
  ALARM_TRANSACTIONS_DDB_DESCRIPTION,
  ALARM_TUTOR_TRANSACTIONS_DDB_ID,
  ALARM_TUTOR_TRANSACTIONS_DDB_NAME,
  ALARM_TUTOR_TRANSACTIONS_DDB_DESCRIPTION,
  ALARM_API_FAILURE_ID,
  ALARM_API_FAILURE_NAME,
  ALARM_API_FAILURE_DESCRIPTION,
  ALARM_UNKNOWN_FAILURES_ID,
  ALARM_UNKNOWN_FAILURES_NAME,
  ALARM_UNKNOWN_FAILURES_DESCRIPTION,
} from "../config/constants";
import {aws_dynamodb, aws_iam} from "aws-cdk-lib";

export class MathPracsPaymentRemindersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import resources from other stacks
    const importedSessionsTableArn = cdk.Fn.importValue('MathPracs-SessionsTable-Arn');
    const importedStudentsV2TableArn = cdk.Fn.importValue('MathPracs-StudentsV2Table-Arn');
    const importedStudentsMetadataV2TableArn = cdk.Fn.importValue('MathPracs-StudentsMetadataV2Table-Arn');
    const importedTutorsV2TableArn = cdk.Fn.importValue('MathPracs-TutorsV2Table-Arn');
    const importedTutorsMetadataV2TableArn = cdk.Fn.importValue('MathPracs-TutorsMetadataV2Table-Arn');
    const importedTransactionsTableArn = cdk.Fn.importValue('MathPracs-TransactionsTable-Arn');
    const importedTutorTransactionsTableArn = cdk.Fn.importValue('MathPracs-TutorTransactionsTable-Arn');
    const importedBusinessInternalDebtsTableArn = cdk.Fn.importValue('MathPracs-BusinessInternalDebtsTable-Arn');
    const importedDiscordApiSecretsArn = cdk.Fn.importValue('MathPracs-DiscordCredentials-Arn');

    // Lookup tables and extract their names
    const importedSessionsTableName = aws_dynamodb.Table.fromTableArn(this, 'SessionsTableName', importedSessionsTableArn).tableName;
    const importedStudentsV2TableName = aws_dynamodb.Table.fromTableArn(this, 'StudentsV2TableName', importedStudentsV2TableArn).tableName;
    const importedStudentsMetadataV2TableName = aws_dynamodb.Table.fromTableArn(this, 'StudentsMetadataV2TableName', importedStudentsMetadataV2TableArn).tableName;
    const importedTutorsV2TableName = aws_dynamodb.Table.fromTableArn(this, 'TutorsV2TableName', importedTutorsV2TableArn).tableName;
    const importedTutorsMetadataV2TableName = aws_dynamodb.Table.fromTableArn(this, 'TutorsMetadataV2TableName', importedTutorsMetadataV2TableArn).tableName;
    const importedTransactionsTableName = aws_dynamodb.Table.fromTableArn(this, 'TransactionsTableName', importedTransactionsTableArn).tableName;
    const importedTutorTransactionsTableName = aws_dynamodb.Table.fromTableArn(this, 'TutorTransactionsTableName', importedTutorTransactionsTableArn).tableName;
    const importedBusinessInternalDebtsTableName = aws_dynamodb.Table.fromTableArn(this, 'BusinessInternalDebtsTableName', importedBusinessInternalDebtsTableArn).tableName;

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

    const businessPaymentTable = new dynamodb.Table(this, BUSINESS_PAYMENT_TABLE_ID, {
      tableName: BUSINESS_PAYMENT_TABLE_NAME,
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
          [API_CREDENTIALS_SECRET_KEY_TWILIO_SID]: '',
          [API_CREDENTIALS_SECRET_KEY_TWILIO_TOKEN]: '',
          [API_CREDENTIALS_SECRET_KEY_TWILIO_PHONE_NUMBER]: ''
        }),
        generateStringKey: API_CREDENTIALS_SECRET_PLACEHOLDER,
        excludeCharacters: '"@/\\'
      }
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
    studentPaymentLambda.addEnvironment(STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_SECRETS_ARN, importedDiscordApiSecretsArn)
    studentPaymentLambda.addEnvironment(IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_SESSIONS_TABLE_NAME, importedSessionsTableName);
    studentPaymentLambda.addEnvironment(IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_TABLE_NAME, importedStudentsV2TableName);
    studentPaymentLambda.addEnvironment(IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_METADATA_TABLE_NAME, importedStudentsMetadataV2TableName);
    studentPaymentLambda.addEnvironment(IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_TRANSACTIONS_TABLE_NAME, importedTransactionsTableName);

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
    tutorPaymentLambda.addEnvironment(IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_SESSIONS_TABLE_NAME, importedSessionsTableName);
    tutorPaymentLambda.addEnvironment(IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_TABLE_NAME, importedStudentsV2TableName);
    tutorPaymentLambda.addEnvironment(IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_METADATA_TABLE_NAME, importedStudentsMetadataV2TableName);
    tutorPaymentLambda.addEnvironment(IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_TABLE_NAME, importedTutorsV2TableName);
    tutorPaymentLambda.addEnvironment(IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_METADATA_TABLE_NAME, importedTutorsMetadataV2TableName);
    tutorPaymentLambda.addEnvironment(IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_API_SECRETS_ARN, importedDiscordApiSecretsArn);
    tutorPaymentLambda.addEnvironment(IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_TRANSACTIONS_TABLE_NAME, importedTutorTransactionsTableName);

    // Business Payment Reminder Lambda
    const businessPaymentLambda = new python.PythonFunction(this, BUSINESS_PAYMENT_LAMBDA_ID, {
      functionName: BUSINESS_PAYMENT_LAMBDA_NAME,
      runtime: BUSINESS_PAYMENT_LAMBDA_RUNTIME,
      entry: BUSINESS_PAYMENT_LAMBDA_ENTRY,
      handler: BUSINESS_PAYMENT_LAMBDA_HANDLER,
      timeout: BUSINESS_PAYMENT_LAMBDA_TIMEOUT,
      memorySize: BUSINESS_PAYMENT_LAMBDA_MEMORY_SIZE,
    });
    businessPaymentLambda.addEnvironment(BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_BUSINESS_PAYMENT_TABLE_NAME, businessPaymentTable.tableName);
    businessPaymentLambda.addEnvironment(IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TRANSACTIONS_TABLE_NAME, importedTransactionsTableName);
    businessPaymentLambda.addEnvironment(IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_TRANSACTIONS_TABLE_NAME, importedTutorTransactionsTableName);
    businessPaymentLambda.addEnvironment(IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_TABLE_NAME, importedTutorsV2TableName);
    businessPaymentLambda.addEnvironment(IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_BUSINESS_INTERNAL_DEBTS_TABLE_NAME, importedBusinessInternalDebtsTableName);
    businessPaymentLambda.addEnvironment(IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_API_SECRETS_ARN, importedDiscordApiSecretsArn);

    // Muaz-only Adjustment Lambda
    const muazOnlyAdjustmentLambda = new python.PythonFunction(this, MUAZ_ONLY_ADJUSTMENT_LAMBDA_ID, {
      functionName: MUAZ_ONLY_ADJUSTMENT_LAMBDA_NAME,
      runtime: MUAZ_ONLY_ADJUSTMENT_LAMBDA_RUNTIME,
      entry: MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENTRY,
      handler: MUAZ_ONLY_ADJUSTMENT_LAMBDA_HANDLER,
      timeout: MUAZ_ONLY_ADJUSTMENT_LAMBDA_TIMEOUT,
      memorySize: MUAZ_ONLY_ADJUSTMENT_LAMBDA_MEMORY_SIZE,
    });
    muazOnlyAdjustmentLambda.addEnvironment(IMPORTED_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENV_VAR_KEY_TRANSACTIONS_TABLE_NAME, importedTransactionsTableName);
    muazOnlyAdjustmentLambda.addEnvironment(IMPORTED_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENV_VAR_KEY_SESSIONS_TABLE_NAME, importedSessionsTableName);
    muazOnlyAdjustmentLambda.addEnvironment(IMPORTED_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENV_VAR_KEY_TUTORS_METADATA_TABLE_NAME, importedTutorsMetadataV2TableName);
    muazOnlyAdjustmentLambda.addEnvironment(IMPORTED_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ENV_VAR_KEY_DISCORD_API_SECRETS_ARN, importedDiscordApiSecretsArn);

    // Grant Lambda permissions
    studentPaymentTable.grantReadWriteData(studentPaymentLambda);
    tutorPaymentTable.grantReadWriteData(tutorPaymentLambda);
    businessPaymentTable.grantReadWriteData(businessPaymentLambda);
    apiSecrets.grantRead(studentPaymentLambda);
    apiSecrets.grantRead(tutorPaymentLambda);

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

    const businessRemindersScheduleRule = new events.Rule(this, BUSINESS_REMINDERS_EVENTBRIDGE_RULE_ID, {
      ruleName: BUSINESS_REMINDERS_EVENTBRIDGE_RULE_NAME,
      description: BUSINESS_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION,
      schedule: events.Schedule.cron({
        minute: BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE,
        hour: BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR,
        day: BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY,
        month: BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH
      }),
    });

    businessRemindersScheduleRule.addTarget(new targets.LambdaFunction(businessPaymentLambda));

    const muazOnlyAdjustmentScheduleRule = new events.Rule(this, MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_ID, {
      ruleName: MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_NAME,
      description: MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_DESCRIPTION,
      schedule: events.Schedule.cron({
        minute: MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE,
        hour: MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR,
        day: MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY,
        month: MUAZ_ONLY_ADJUSTMENT_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH
      }),
    });

    muazOnlyAdjustmentScheduleRule.addTarget(new targets.LambdaFunction(muazOnlyAdjustmentLambda));

    // Grant read access to imported DDB tables -- unsure if grant* helpers can be used on tables looked up by ARN
    studentPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query'],
      resources: [
          importedSessionsTableArn,
          importedStudentsMetadataV2TableArn
      ]
    }));

    // Grant read + write access to imported DDB tables -- unsure if grant* helpers can be used on tables looked up by ARN
    studentPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: [
        'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:ConditionCheckItem', 'dynamodb:UpdateItem'
      ],
      resources: [
          importedStudentsV2TableArn
      ]
    }));

    studentPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: [
        'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:ConditionCheckItem',
        'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem', 'dynamodb:BatchWriteItem'
      ],
      resources: [
        importedTransactionsTableArn
      ]
    }));

    tutorPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query'],
      resources: [
          importedSessionsTableArn,
          importedStudentsV2TableArn,
          importedStudentsMetadataV2TableArn,
          importedTutorsV2TableArn,
          importedTutorsMetadataV2TableArn
      ]
    }));

    tutorPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: [
        'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:ConditionCheckItem', 'dynamodb:UpdateItem'
      ],
      resources: [
          importedTutorsV2TableArn
      ]
    }));

    tutorPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: [
        'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:ConditionCheckItem',
        'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem', 'dynamodb:BatchWriteItem'
      ],
      resources: [
        importedTutorTransactionsTableArn
      ]
    }));

    businessPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query'],
      resources: [
          importedTransactionsTableArn,
          importedTutorTransactionsTableArn,
          importedTutorsV2TableArn
      ]
    }));

    businessPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: [
        'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:ConditionCheckItem',
        'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem', 'dynamodb:BatchWriteItem'
      ],
      resources: [
        importedBusinessInternalDebtsTableArn
      ]
    }));

    muazOnlyAdjustmentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query'],
      resources: [
          importedTransactionsTableArn,
          importedSessionsTableArn,
          importedTutorsMetadataV2TableArn
      ]
    }));

    // Grant read access to secrets
    studentPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [importedDiscordApiSecretsArn]
    }));

    tutorPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [importedDiscordApiSecretsArn]
    }));

    businessPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [importedDiscordApiSecretsArn]
    }));

    muazOnlyAdjustmentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [importedDiscordApiSecretsArn]
    }));

    // Grant CloudWatch PutMetricData to payment reminder Lambdas
    studentPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['cloudwatch:PutMetricData'],
      resources: ['*'],
      conditions: {
        StringEquals: { 'cloudwatch:namespace': METRICS_NAMESPACE }
      }
    }));

    tutorPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['cloudwatch:PutMetricData'],
      resources: ['*'],
      conditions: {
        StringEquals: { 'cloudwatch:namespace': METRICS_NAMESPACE }
      }
    }));

    businessPaymentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['cloudwatch:PutMetricData'],
      resources: ['*'],
      conditions: {
        StringEquals: { 'cloudwatch:namespace': METRICS_NAMESPACE }
      }
    }));

    muazOnlyAdjustmentLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['cloudwatch:PutMetricData'],
      resources: ['*'],
      conditions: {
        StringEquals: { 'cloudwatch:namespace': METRICS_NAMESPACE }
      }
    }));

    // SNS Topic for alarms
    const alarmTopic = new sns.Topic(this, ALARM_SNS_TOPIC_ID, {
      topicName: ALARM_SNS_TOPIC_NAME,
    });

    // Alarm Notifier Lambda
    const alarmNotifierLambda = new python.PythonFunction(this, ALARM_NOTIFIER_LAMBDA_ID, {
      functionName: ALARM_NOTIFIER_LAMBDA_NAME,
      runtime: ALARM_NOTIFIER_LAMBDA_RUNTIME,
      entry: ALARM_NOTIFIER_LAMBDA_ENTRY,
      index: ALARM_NOTIFIER_LAMBDA_INDEX,
      handler: ALARM_NOTIFIER_LAMBDA_HANDLER,
      timeout: ALARM_NOTIFIER_LAMBDA_TIMEOUT,
      memorySize: ALARM_NOTIFIER_LAMBDA_MEMORY_SIZE,
    });

    alarmNotifierLambda.addEnvironment(ALARM_NOTIFIER_LAMBDA_ENV_VAR_KEY_DISCORD_SECRETS_ARN, importedDiscordApiSecretsArn);

    alarmNotifierLambda.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [importedDiscordApiSecretsArn]
    }));

    const alarmNotifierDlq = new sqs.Queue(this, 'AlarmNotifierDLQ', {
      queueName: 'mathpracs-payment-reminders-alarm-notifier-dlq',
      retentionPeriod: cdk.Duration.days(14),
    });

    alarmTopic.addSubscription(new sns_subscriptions.LambdaSubscription(alarmNotifierLambda, {
      deadLetterQueue: alarmNotifierDlq,
    }));

    // CloudWatch Alarms — per-dimension child alarms (no actions)
    const childAlarmConfig: { metricName: string; reasons: string[]; namePrefix: string }[] = [
      { metricName: 'StudentInfoDDB', reasons: ['MetadataScanException', 'StudentsScanException', 'MissingStudentName', 'StudentNotFound', 'MissingDiscordChannel', 'InvalidHourlyPricing', 'MissingHourlyPricing', 'MissingNoShowPricing', 'BalanceUpdateException'], namePrefix: 'student-info-ddb' },
      { metricName: 'TutorInfoDDB', reasons: ['MetadataScanException', 'MissingTutorId', 'InvalidHourlyRate', 'MissingDisplayName', 'MissingTutorPaymentChannel', 'BalanceUpdateException', 'TutorsScanException', 'TutorNotFound', 'FetchException'], namePrefix: 'tutor-info-ddb' },
      { metricName: 'PaymentReminderDDB', reasons: ['SessionsScanException', 'GetReminderException', 'PutReminderException', 'UpdateProcessedDiscordException'], namePrefix: 'payment-reminder-ddb' },
      { metricName: 'TransactionsDDB', reasons: ['PutTransactionException', 'TransactionsScanException'], namePrefix: 'transactions-ddb' },
      { metricName: 'TutorTransactionsDDB', reasons: ['PutTutorTransactionException', 'TutorTransactionsScanException'], namePrefix: 'tutor-transactions-ddb' },
      { metricName: 'BusinessInternalDebtsDDB', reasons: ['DebtsScanException', 'PutDebtException'], namePrefix: 'business-internal-debts-ddb' },
      { metricName: 'APIFailure', reasons: ['DiscordSendFailed', 'TutorDiscordSendFailed'], namePrefix: 'api-failure' },
      { metricName: 'UnknownFailures', reasons: ['UnhandledException'], namePrefix: 'unknown-failures' },
    ];

    const childAlarmsByCategory: Record<string, cloudwatch.Alarm[]> = {};

    for (const config of childAlarmConfig) {
      childAlarmsByCategory[config.metricName] = [];
      for (const reason of config.reasons) {
        const alarm = new cloudwatch.Alarm(this, `${config.metricName}-${reason}-Alarm`, {
          alarmName: `mathpracs-payment-reminders-${config.namePrefix}-${reason}`,
          alarmDescription: `Payment Reminders: ${config.metricName} - ${reason}`,
          metric: new cloudwatch.Metric({
            namespace: METRICS_NAMESPACE,
            metricName: config.metricName,
            dimensionsMap: { Reason: reason },
            statistic: 'Sum',
            period: cdk.Duration.minutes(1),
          }),
          threshold: 1,
          evaluationPeriods: 1,
          comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
          treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
        });
        childAlarmsByCategory[config.metricName].push(alarm);
      }
    }

    // Composite parent alarms (with SNS action)
    const compositeAlarmConfigs = [
      { id: ALARM_STUDENT_INFO_DDB_ID, name: ALARM_STUDENT_INFO_DDB_NAME, description: ALARM_STUDENT_INFO_DDB_DESCRIPTION, metricName: 'StudentInfoDDB' },
      { id: ALARM_TUTOR_INFO_DDB_ID, name: ALARM_TUTOR_INFO_DDB_NAME, description: ALARM_TUTOR_INFO_DDB_DESCRIPTION, metricName: 'TutorInfoDDB' },
      { id: ALARM_PAYMENT_REMINDER_DDB_ID, name: ALARM_PAYMENT_REMINDER_DDB_NAME, description: ALARM_PAYMENT_REMINDER_DDB_DESCRIPTION, metricName: 'PaymentReminderDDB' },
      { id: ALARM_TRANSACTIONS_DDB_ID, name: ALARM_TRANSACTIONS_DDB_NAME, description: ALARM_TRANSACTIONS_DDB_DESCRIPTION, metricName: 'TransactionsDDB' },
      { id: ALARM_TUTOR_TRANSACTIONS_DDB_ID, name: ALARM_TUTOR_TRANSACTIONS_DDB_NAME, description: ALARM_TUTOR_TRANSACTIONS_DDB_DESCRIPTION, metricName: 'TutorTransactionsDDB' },
      { id: ALARM_BUSINESS_INTERNAL_DEBTS_DDB_ID, name: ALARM_BUSINESS_INTERNAL_DEBTS_DDB_NAME, description: ALARM_BUSINESS_INTERNAL_DEBTS_DDB_DESCRIPTION, metricName: 'BusinessInternalDebtsDDB' },
      { id: ALARM_API_FAILURE_ID, name: ALARM_API_FAILURE_NAME, description: ALARM_API_FAILURE_DESCRIPTION, metricName: 'APIFailure' },
      { id: ALARM_UNKNOWN_FAILURES_ID, name: ALARM_UNKNOWN_FAILURES_NAME, description: ALARM_UNKNOWN_FAILURES_DESCRIPTION, metricName: 'UnknownFailures' },
    ];

    for (const config of compositeAlarmConfigs) {
      const children = childAlarmsByCategory[config.metricName];
      const alarmRule = cloudwatch.AlarmRule.anyOf(...children);

      const compositeAlarm = new cloudwatch.CompositeAlarm(this, config.id, {
        compositeAlarmName: config.name,
        alarmDescription: config.description,
        alarmRule,
      });
      compositeAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(alarmTopic));
    }

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

    new cdk.CfnOutput(this, CFN_OUTPUT_BUSINESS_PAYMENT_TABLE_ID, {
      value: businessPaymentTable.tableName,
      description: CFN_OUTPUT_BUSINESS_PAYMENT_TABLE_DESCRIPTION
    });

    new cdk.CfnOutput(this, CFN_OUTPUT_BUSINESS_LAMBDA_ID, {
      value: businessPaymentLambda.functionName,
      description: CFN_OUTPUT_BUSINESS_LAMBDA_DESCRIPTION
    });

    new cdk.CfnOutput(this, CFN_OUTPUT_MUAZ_ONLY_ADJUSTMENT_LAMBDA_ID, {
      value: muazOnlyAdjustmentLambda.functionName,
      description: CFN_OUTPUT_MUAZ_ONLY_ADJUSTMENT_LAMBDA_DESCRIPTION
    });

    new cdk.CfnOutput(this, CFN_OUTPUT_API_CREDENTIALS_SECRETS_ID, {
      value: apiSecrets.secretArn,
      description: CFN_OUTPUT_API_CREDENTIALS_SECRETS_DESCRIPTION
    });

    // Cross-stack exports for MathPracsSessionRemindersCDK
    new cdk.CfnOutput(this, 'ApiSecretsArn', {
      value: apiSecrets.secretArn,
      description: 'ARN of API Credentials Secret',
      exportName: 'MathPracs-ApiSecrets-Arn'
    });
  }
}