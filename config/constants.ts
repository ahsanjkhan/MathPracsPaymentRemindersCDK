import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";

export const STUDENT_PAYMENT_TABLE_NAME = 'mathpracs-student-payment-reminders';
export const STUDENT_PAYMENT_TABLE_ID = 'StudentPaymentRemindersTable';

export const TUTOR_PAYMENT_TABLE_NAME = 'mathpracs-tutor-payment-reminders';
export const TUTOR_PAYMENT_TABLE_ID = 'TutorPaymentRemindersTable';

export const API_CREDENTIALS_SECRET_PLACEHOLDER = 'placeholder';

export const API_CREDENTIALS_SECRET_NAME = 'mathpracs-api-credentials';
export const API_CREDENTIALS_SECRET_ID = 'ApiCredentials';
export const API_CREDENTIALS_SECRET_DESCRIPTION = 'Credentials for external APIs';
export const API_CREDENTIALS_SECRET_KEY_GOOGLE_OAUTH = 'googleCalendarOAuthCredentials';
export const API_CREDENTIALS_SECRET_KEY_GOOGLE_SHEETS = 'googleSheetsCredentials';
export const API_CREDENTIALS_SECRET_KEY_TWILIO_SID = 'twilioAccountSid';
export const API_CREDENTIALS_SECRET_KEY_TWILIO_TOKEN = 'twilioAuthToken';
export const API_CREDENTIALS_SECRET_KEY_TWILIO_PHONE_NUMBER = 'twilioPhoneNumber';

export const SSM_PLACEHOLDER = 'PLACEHOLDER';

export const SSM_GOOGLE_SHEETS_ID_NAME = '/mathpracs/google-sheets-id';
export const SSM_GOOGLE_SHEETS_ID_ID = 'googleSheetsId';
export const SSM_GOOGLE_SHEETS_ID_DESCRIPTION = 'Google Sheets ID';

export const SSM_PAYMENT_INFO_URL_NAME = '/mathpracs/payment-info-url';
export const SSM_PAYMENT_INFO_URL_ID = 'paymentInfoUrl';
export const SSM_PAYMENT_INFO_URL_DESCRIPTION = 'URL to payment information page';

export const SSM_PHONE_ENABLED_COLUMNS_NAME = '/mathpracs/phone-column-index';
export const SSM_PHONE_ENABLED_COLUMNS_ID = 'PhoneColumnIndex';
export const SSM_PHONE_ENABLED_COLUMNS_DESCRIPTION = 'Phone column enabled index(es) in Google Sheets (0-indexed)';

export const SSM_TUTOR_SALARY_RATE_NAME = '/mathpracs/tutor/salary-hourly-rate';
export const SSM_TUTOR_SALARY_RATE_ID = 'TutorSalaryRate';
export const SSM_TUTOR_SALARY_RATE_DESCRIPTION = 'Tutor salary session hourly rate';

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
export const STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_GOOGLE_SHEETS_SSM_NAME = 'GOOGLE_SHEETS_SSM_NAME';
export const STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_PAYMENT_INFO_URL_SSM_NAME = 'PAYMENT_INFO_URL_SSM_NAME';
export const STUDENT_PAYMENT_LAMBDA_ENV_VAR_KEY_PHONE_ENABLED_COLUMNS_SSM_NAME = 'PHONE_ENABLED_COLUMNS_SSM_NAME';

export const TUTOR_PAYMENT_LAMBDA_NAME = 'mathpracs-tutor-payment-reminder';
export const TUTOR_PAYMENT_LAMBDA_ID = 'TutorPaymentReminderFunction';
export const TUTOR_PAYMENT_LAMBDA_RUNTIME = lambda.Runtime.PYTHON_3_10;
export const TUTOR_PAYMENT_LAMBDA_ENTRY = '../MathPracsPaymentRemindersLambda/tutor_payments';
export const TUTOR_PAYMENT_LAMBDA_INDEX = 'handler/lambda_function.py';
export const TUTOR_PAYMENT_LAMBDA_HANDLER = 'lambda_handler';
export const TUTOR_PAYMENT_LAMBDA_TIMEOUT = cdk.Duration.minutes(5);
export const TUTOR_PAYMENT_LAMBDA_MEMORY_SIZE = 512;
export const TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_PAYMENT_TABLE_NAME = 'TUTOR_PAYMENT_TABLE_NAME';
export const TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_API_SECRETS_ARN = 'SECRETS_ARN';
export const TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_GOOGLE_SHEETS_SSM_NAME = 'GOOGLE_SHEETS_SSM_NAME';
export const TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_PHONE_ENABLED_COLUMNS_SSM_NAME = 'PHONE_ENABLED_COLUMNS_SSM_NAME';
export const TUTOR_PAYMENT_LAMBDA_ENV_VAR_KEY_TUTOR_SALARY_RATE_SSM_NAME = 'TUTOR_SALARY_RATE_SSM_NAME';

export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_NAME = 'mathpracs-student-payment-reminder-schedule';
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_ID = 'StudentPaymentReminderSchedule';
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION = 'Triggers student payment reminder Lambda every Sunday at 6 PM CST';
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE = '0';
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR = '23'; // 6 PM CST = 11 PM UTC (during standard time)
export const STUDENT_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_WEEKDAY = 'SUN';

export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_NAME = 'mathpracs-tutor-payment-reminder-schedule';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_ID = 'TutorPaymentReminderSchedule';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_DESCRIPTION = 'Triggers tutor payment reminder Lambda every 1st of the Month at 2 PM CST';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MINUTE = '0';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_HOUR = '20'; // // 2 PM CST = 8 PM UTC (during standard time)
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_DAY = '1';
export const TUTOR_REMINDERS_EVENTBRIDGE_RULE_SCHEDULE_EXPRESSION_MONTH = '*';

export const CFN_OUTPUT_STUDENT_PAYMENT_TABLE_ID = 'StudentPaymentTableName';
export const CFN_OUTPUT_STUDENT_PAYMENT_TABLE_DESCRIPTION = 'DynamoDB table name for student payment reminders';

export const CFN_OUTPUT_TUTOR_PAYMENT_TABLE_ID = 'TutorPaymentTableName';
export const CFN_OUTPUT_TUTOR_PAYMENT_TABLE_DESCRIPTION = 'DynamoDB table name for tutor payment reminders';

export const CFN_OUTPUT_STUDENT_LAMBDA_ID = 'StudentLambdaFunctionName';
export const CFN_OUTPUT_STUDENT_LAMBDA_DESCRIPTION = 'Student payment reminder Lambda function name';

export const CFN_OUTPUT_TUTOR_LAMBDA_ID = 'TutorLambdaFunctionName';
export const CFN_OUTPUT_TUTOR_LAMBDA_DESCRIPTION = 'Tutor payment reminders Lambda function name';

export const CFN_OUTPUT_API_CREDENTIALS_SECRETS_ID = 'SecretsArn';
export const CFN_OUTPUT_API_CREDENTIALS_SECRETS_DESCRIPTION = 'Secrets Manager ARN for API credentials';