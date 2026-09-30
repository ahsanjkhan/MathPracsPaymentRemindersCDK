import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";

export const STUDENT_PAYMENT_TABLE_NAME = 'mathpracs-student-payment-reminders';
export const STUDENT_PAYMENT_TABLE_ID = 'StudentPaymentRemindersTable';

export const TUTOR_PAYMENT_TABLE_NAME = 'mathpracs-tutor-payment-reminders';
export const TUTOR_PAYMENT_TABLE_ID = 'TutorPaymentRemindersTable';

export const BUSINESS_PAYMENT_TABLE_NAME = 'mathpracs-business-payment-reminders';
export const BUSINESS_PAYMENT_TABLE_ID = 'BusinessPaymentRemindersTable';

export const API_CREDENTIALS_SECRET_PLACEHOLDER = 'placeholder';

export const API_CREDENTIALS_SECRET_NAME = 'mathpracs-api-credentials';
export const API_CREDENTIALS_SECRET_ID = 'ApiCredentials';
export const API_CREDENTIALS_SECRET_DESCRIPTION = 'Credentials for external APIs';
export const API_CREDENTIALS_SECRET_KEY_TWILIO_SID = 'twilioAccountSid';
export const API_CREDENTIALS_SECRET_KEY_TWILIO_TOKEN = 'twilioAuthToken';
export const API_CREDENTIALS_SECRET_KEY_TWILIO_PHONE_NUMBER = 'twilioPhoneNumber';

export const STUDENT_PAYMENT_LAMBDA_NAME = 'mathpracs-student-payment-reminder';
export const STUDENT_PAYMENT_LAMBDA_ID = 'StudentPaymentReminderFunction';
export const STUDENT_PAYMENT_LAMBDA_RUNTIME = lambda.Runtime.PYTHON_3_10;
export const STUDENT_PAYMENT_LAMBDA_ENTRY = '../MathPracsPaymentRemindersLambda/student_payments';
export const STUDENT_PAYMENT_LAMBDA_INDEX = 'handler/lambda_function.py';
export const STUDENT_PAYMENT_LAMBDA_HANDLER = 'lambda_handler';
export const STUDENT_PAYMENT_LAMBDA_TIMEOUT = cdk.Duration.minutes(5);
export const STUDENT_PAYMENT_LAMBDA_MEMORY_SIZE = 512;
export const STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENT_PAYMENT_TABLE_NAME = 'STUDENT_PAYMENT_TABLE_NAME';
export const STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN = 'SECRETS_ARN';
export const STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_SECRETS_ARN = 'DISCORD_SECRETS_ARN';
export const IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_SESSIONS_TABLE_NAME = 'SESSIONS_TABLE_NAME';
export const IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_TABLE_NAME = 'STUDENTS_TABLE_NAME';
export const IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_METADATA_TABLE_NAME = 'STUDENTS_METADATA_TABLE_NAME';
export const IMPORTED_STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_TRANSACTIONS_TABLE_NAME = 'TRANSACTIONS_TABLE_NAME';

export const TUTOR_PAYMENT_LAMBDA_NAME = 'mathpracs-tutor-payment-reminder';
export const TUTOR_PAYMENT_LAMBDA_ID = 'TutorPaymentReminderFunction';
export const TUTOR_PAYMENT_LAMBDA_RUNTIME = lambda.Runtime.PYTHON_3_10;
export const TUTOR_PAYMENT_LAMBDA_ENTRY = '../MathPracsPaymentRemindersLambda/tutor_payments';
export const TUTOR_PAYMENT_LAMBDA_HANDLER = 'lambda_handler';
export const TUTOR_PAYMENT_LAMBDA_TIMEOUT = cdk.Duration.minutes(5);
export const TUTOR_PAYMENT_LAMBDA_MEMORY_SIZE = 512;
export const TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_PAYMENT_TABLE_NAME = 'TUTOR_PAYMENT_TABLE_NAME';
export const TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN = 'SECRETS_ARN';
export const IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_SESSIONS_TABLE_NAME = 'SESSIONS_TABLE_NAME';
export const IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_TABLE_NAME = 'STUDENTS_TABLE_NAME';
export const IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_STUDENTS_METADATA_TABLE_NAME = 'STUDENTS_METADATA_TABLE_NAME';
export const IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_TABLE_NAME = 'TUTORS_TABLE_NAME';
export const IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_METADATA_TABLE_NAME = 'TUTORS_METADATA_TABLE_NAME';
export const IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_API_SECRETS_ARN = 'IMPORTED_DISCORD_API_SECRETS_ARN';
export const IMPORTED_TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_TRANSACTIONS_TABLE_NAME = 'TUTOR_TRANSACTIONS_TABLE_NAME';

export const BUSINESS_PAYMENT_LAMBDA_NAME = 'mathpracs-business-payment-reminder';
export const BUSINESS_PAYMENT_LAMBDA_ID = 'BusinessPaymentReminderFunction';
export const BUSINESS_PAYMENT_LAMBDA_RUNTIME = lambda.Runtime.PYTHON_3_10;
export const BUSINESS_PAYMENT_LAMBDA_ENTRY = '../MathPracsPaymentRemindersLambda/business_payments';
export const BUSINESS_PAYMENT_LAMBDA_HANDLER = 'lambda_handler';
export const BUSINESS_PAYMENT_LAMBDA_TIMEOUT = cdk.Duration.minutes(5);
export const BUSINESS_PAYMENT_LAMBDA_MEMORY_SIZE = 512;
export const BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_BUSINESS_PAYMENT_TABLE_NAME = 'BUSINESS_PAYMENT_TABLE_NAME';
export const IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TRANSACTIONS_TABLE_NAME = 'TRANSACTIONS_TABLE_NAME';
export const IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_TRANSACTIONS_TABLE_NAME = 'TUTOR_TRANSACTIONS_TABLE_NAME';
export const IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTORS_TABLE_NAME = 'TUTORS_TABLE_NAME';
export const IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_BUSINESS_INTERNAL_DEBTS_TABLE_NAME = 'BUSINESS_INTERNAL_DEBTS_TABLE_NAME';
export const IMPORTED_BUSINESS_PAYMENT_LAMBDA_ENV_VAR_KEY_DISCORD_API_SECRETS_ARN = 'IMPORTED_DISCORD_API_SECRETS_ARN';

export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_NAME = 'mathpracs-student-payment-reminder-schedule';
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_ID = 'StudentPaymentReminderSchedule';
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION = 'Triggers student payment reminder Lambda every Sunday at 1 PM CST';
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE = '0';
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR = '18'; // 1 PM CST = 6 PM UTC (during standard time)
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_WEEKDAY = 'SUN';

export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_NAME = 'mathpracs-tutor-payment-reminder-schedule';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_ID = 'TutorPaymentReminderSchedule';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION = 'Triggers tutor payment reminder Lambda every 1st of the Month at 2 PM CST';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE = '0';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR = '20'; // // 2 PM CST = 8 PM UTC (during standard time)
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY = '1';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH = '*';

export const BUSINESS_REMINDERS_EVENTBRIDGE_RULE_NAME = 'mathpracs-business-payment-reminder-schedule';
export const BUSINESS_REMINDERS_EVENTBRIDGE_RULE_ID = 'BusinessPaymentReminderSchedule';
export const BUSINESS_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION = 'Triggers business payment reminder Lambda every 1st of the Month at 2 PM CST';
export const BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE = '0';
export const BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR = '20';
export const BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY = '1';
export const BUSINESS_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH = '*';

export const CFN_OUTPUT_STUDENT_PAYMENT_TABLE_ID = 'StudentPaymentTableName';
export const CFN_OUTPUT_STUDENT_PAYMENT_TABLE_DESCRIPTION = 'DynamoDB table name for student payment reminders';

export const CFN_OUTPUT_TUTOR_PAYMENT_TABLE_ID = 'TutorPaymentTableName';
export const CFN_OUTPUT_TUTOR_PAYMENT_TABLE_DESCRIPTION = 'DynamoDB table name for tutor payment reminders';

export const CFN_OUTPUT_BUSINESS_PAYMENT_TABLE_ID = 'BusinessPaymentTableName';
export const CFN_OUTPUT_BUSINESS_PAYMENT_TABLE_DESCRIPTION = 'DynamoDB table name for business payment reminders';

export const CFN_OUTPUT_STUDENT_LAMBDA_ID = 'StudentLambdaFunctionName';
export const CFN_OUTPUT_STUDENT_LAMBDA_DESCRIPTION = 'Student payment reminder Lambda function name';

export const CFN_OUTPUT_TUTOR_LAMBDA_ID = 'TutorLambdaFunctionName';
export const CFN_OUTPUT_TUTOR_LAMBDA_DESCRIPTION = 'Tutor payment reminders Lambda function name';

export const CFN_OUTPUT_BUSINESS_LAMBDA_ID = 'BusinessLambdaFunctionName';
export const CFN_OUTPUT_BUSINESS_LAMBDA_DESCRIPTION = 'Business payment reminders Lambda function name';

export const CFN_OUTPUT_API_CREDENTIALS_SECRETS_ID = 'SecretsArn';
export const CFN_OUTPUT_API_CREDENTIALS_SECRETS_DESCRIPTION = 'Secrets Manager ARN for API credentials';

// Alarm Notifier Lambda
export const ALARM_NOTIFIER_LAMBDA_NAME = 'mathpracs-payment-reminders-alarm-notifier';
export const ALARM_NOTIFIER_LAMBDA_ID = 'AlarmNotifierFunction';
export const ALARM_NOTIFIER_LAMBDA_RUNTIME = lambda.Runtime.PYTHON_3_10;
export const ALARM_NOTIFIER_LAMBDA_ENTRY = '../MathPracsPaymentRemindersLambda/alarm_notifier';
export const ALARM_NOTIFIER_LAMBDA_INDEX = 'handler/lambda_function.py';
export const ALARM_NOTIFIER_LAMBDA_HANDLER = 'lambda_handler';
export const ALARM_NOTIFIER_LAMBDA_TIMEOUT = cdk.Duration.seconds(30);
export const ALARM_NOTIFIER_LAMBDA_MEMORY_SIZE = 128;
export const ALARM_NOTIFIER_LAMBDA_ENV_VAR_KEY_DISCORD_SECRETS_ARN = 'DISCORD_SECRETS_ARN';

// SNS Topic
export const ALARM_SNS_TOPIC_NAME = 'mathpracs-payment-reminders-alarms';
export const ALARM_SNS_TOPIC_ID = 'PaymentRemindersAlarmTopic';

// CloudWatch Alarms
export const METRICS_NAMESPACE = 'MathPracs/PaymentReminders';

export const ALARM_STUDENT_INFO_DDB_ID = 'StudentInfoDDBCompositeAlarm';
export const ALARM_STUDENT_INFO_DDB_NAME = 'mathpracs-payment-reminders-student-info-ddb-composite';
export const ALARM_STUDENT_INFO_DDB_DESCRIPTION = 'Payment Reminders: student data lookup or update failure';

export const ALARM_TUTOR_INFO_DDB_ID = 'TutorInfoDDBCompositeAlarm';
export const ALARM_TUTOR_INFO_DDB_NAME = 'mathpracs-payment-reminders-tutor-info-ddb-composite';
export const ALARM_TUTOR_INFO_DDB_DESCRIPTION = 'Payment Reminders: tutor data lookup failure';

export const ALARM_PAYMENT_REMINDER_DDB_ID = 'PaymentReminderDDBCompositeAlarm';
export const ALARM_PAYMENT_REMINDER_DDB_NAME = 'mathpracs-payment-reminders-ddb-composite';
export const ALARM_PAYMENT_REMINDER_DDB_DESCRIPTION = 'Payment Reminders: reminder table or session scan failure';

export const ALARM_TRANSACTIONS_DDB_ID = 'TransactionsDDBCompositeAlarm';
export const ALARM_TRANSACTIONS_DDB_NAME = 'mathpracs-payment-reminders-transactions-ddb-composite';
export const ALARM_TRANSACTIONS_DDB_DESCRIPTION = 'Payment Reminders: transaction read or write failure';

export const ALARM_TUTOR_TRANSACTIONS_DDB_ID = 'TutorTransactionsDDBCompositeAlarm';
export const ALARM_TUTOR_TRANSACTIONS_DDB_NAME = 'mathpracs-payment-reminders-tutor-transactions-ddb-composite';
export const ALARM_TUTOR_TRANSACTIONS_DDB_DESCRIPTION = 'Payment Reminders: tutor transaction read or write failure';

export const ALARM_BUSINESS_INTERNAL_DEBTS_DDB_ID = 'BusinessInternalDebtsDDBCompositeAlarm';
export const ALARM_BUSINESS_INTERNAL_DEBTS_DDB_NAME = 'mathpracs-payment-reminders-business-internal-debts-ddb-composite';
export const ALARM_BUSINESS_INTERNAL_DEBTS_DDB_DESCRIPTION = 'Payment Reminders: business internal debts read or write failure';

export const ALARM_API_FAILURE_ID = 'APIFailureCompositeAlarm';
export const ALARM_API_FAILURE_NAME = 'mathpracs-payment-reminders-api-failure-composite';
export const ALARM_API_FAILURE_DESCRIPTION = 'Payment Reminders: external API call failure';

export const ALARM_UNKNOWN_FAILURES_ID = 'UnknownFailuresCompositeAlarm';
export const ALARM_UNKNOWN_FAILURES_NAME = 'mathpracs-payment-reminders-unknown-failures-composite';
export const ALARM_UNKNOWN_FAILURES_DESCRIPTION = 'Payment Reminders: unhandled exception in Lambda';