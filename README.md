### What Is This

This is the Infrastructure-as-Code of an AWS Micro Service which processes automated payment text message reminders for students enrolled in tutoring with MathPracs.

You can learn more about MathPracs at https://mathpracs.com

### How Does It Work

This uses the power of AWS Cloud Development Kit (CDK) to create the following infrastructure:

1. AWS Lambda Function - https://github.com/ahsanjkhan/MathPracsPaymentRemindersLambda
2. AWS DynamoDB Table
3. AWS EventBridge Scheduler
4. AWS SecretsManager (Auth for Google Calendar API Access, Google Sheets API Access, Twilio API)

### What Are The Components

AWS Lambda, AWS DynamoDB, AWS EventBridge Scheduler, AWS SecretsManager, Google Calendar API, Google Sheets API, Twilio API.

### How To Deploy

### Prerequisites

1. **Install Node.js** (version 18 or later)
2. **Install AWS CLI** and configure with your credentials
3. **Install Finch** (Docker alternative for CDK Python bundling)

#### Setup Finch

**macOS (using Homebrew):**
```bash
brew install finch
finch vm init
finch vm start
```

**Other platforms:** Follow instructions at https://github.com/runfinch/finch

#### Deploy the Stack

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Bootstrap CDK (first time only):**
   ```bash
   npx cdk bootstrap
   ```

3. **Deploy with Finch:**
   ```bash
   CDK_DOCKER=finch npx cdk deploy
   ```

#### Update Secrets

After deployment, update the AWS Secrets Manager secret with your API credentials:

```bash
aws secretsmanager update-secret --secret-id mathpracs-api-credentials --secret-string file://auth/secret_structure.json
```

#### Useful Commands

- `npx cdk diff` - Compare deployed stack with current state
- `npx cdk synth` - Emit the synthesized CloudFormation template
- `CDK_DOCKER=finch npx cdk deploy` - Deploy with Finch Docker support
- `npx cdk destroy` - Destroy the stack
- `finch vm status` - See Finch VM Status
- `finch vm stop` - Stop Finch VM