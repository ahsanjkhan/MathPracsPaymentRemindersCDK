### What Is This

This is the Infrastructure-as-Code of an AWS Micro Service which processes automated payment text message reminders for students enrolled in tutoring with MathPracs.

You can learn more about MathPracs at https://mathpracs.com

### How Does It Work

This uses the power of AWS Cloud Development Kit (CDK) to create the following infrastructure:

1. AWS Lambda Function
2. AWS DynamoDB Table
3. AWS EventBridge Scheduler
4. AWS SecretsManager (Auth for Google Calendar API Access, Google Sheets API Access, Twilio API)

### What Are The Components

AWS Lambda, AWS DynamoDB, AWS EventBridge Scheduler, AWS SecretsManager, Google Calendar API, Google Sheets API, Twilio API.