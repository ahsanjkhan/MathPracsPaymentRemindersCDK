### What Is This

This is the Infrastructure-as-Code of an AWS Micro Service which processes automated payment message reminders sent to Discord, for students and tutors enrolled in tutoring with MathPracs.

You can learn more about MathPracs at https://mathpracs.com

### How Does It Work

This uses the power of AWS Cloud Development Kit (CDK) to create or import the following infrastructure:

1. AWS CodePipeline to manage automatic deployments (Beta then Prod) whenever a commit is pushed to GitHub.
2. AWS Lambda Functions - https://github.com/ahsanjkhan/MathPracsPaymentRemindersLambda
3. AWS DynamoDB Tables
4. AWS EventBridge Schedulers
5. AWS SecretsManager (Twilio API + Discord API imported from TutoringManagement stack)

### What Are The Components

AWS CodePipeline, AWS Lambda, AWS DynamoDB, AWS EventBridge Scheduler, AWS SecretsManager, Discord API, Twilio API.

### Multi-Account Pipeline

The pipeline deploys to **Beta** (655383751455) first, then **Prod** (786802935034). Both accounts are in `us-east-1`.

### How To Deploy

Raising a Pull Request for commits on a feature branch, getting it approved, and squashing and merging into `main` on either this repo or [MathPracsPaymentRemindersLambda](https://github.com/ahsanjkhan/MathPracsPaymentRemindersLambda) automatically triggers the CodePipeline, which deploys the changes.

#### First-Time Setup (New AWS Account)

1. **Install Node.js** (version 20), **AWS CLI**, and **Finch** (`brew install finch && finch vm init && finch vm start`)

2. **Bootstrap CDK in the new account** (with new account creds exported):
   ```bash
   npx cdk bootstrap aws://<NEW_ACCOUNT_ID>/us-east-1 \
     --trust <PIPELINE_ACCOUNT_ID> \
     --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess
   ```

3. **Deploy the pipeline stack** (with pipeline/prod account creds exported):
   ```bash
   npm install
   CDK_DOCKER=finch npx cdk deploy MathPracsPaymentRemindersPipelineStack
   ```

After this, all future changes are deployed automatically via the pipeline.

#### Stack Dependencies

This stack imports shared resources from [MathPracs-TutoringManagement-CDK](https://github.com/ahsanjkhan/MathPracs-TutoringManagement-CDK):
- Sessions, StudentsV2, StudentsMetadataV2, TutorsV2, TutorsMetadataV2, Transactions DynamoDB Tables
- Discord API Secrets

**That stack must be deployed first** in the target account.

#### Post-Deploy: Populate Secrets

The stack creates a `mathpracs-api-credentials` secret for Twilio. Populate it (same values for beta and prod since Twilio is shared):

```bash
aws secretsmanager update-secret --secret-id mathpracs-api-credentials \
  --secret-string '{"twilioAccountSid":"...","twilioAuthToken":"...","twilioPhoneNumber":"..."}'
```

#### Manual Deployments (Avoid if possible)
1. Make changes on feature branch.
2. Commit those changes and raise Pull Request as usual.
3. Deploy the changes directly:
   ```bash
   CDK_DOCKER=finch npx cdk deploy MathPracsPaymentRemindersStack
   ```

### Useful Commands

- `CDK_DOCKER=finch npx cdk diff` - Compare deployed stack with current state
- `CDK_DOCKER=finch npx cdk synth` - Emit the synthesized CloudFormation template
- `CDK_DOCKER=finch npx cdk deploy MathPracsPaymentRemindersPipelineStack` - Deploy with Finch Docker support
- `CDK_DOCKER=finch npx cdk destroy` - Destroy the stack # DANGEROUS!!
- `finch vm status` - See Finch VM Status
- `finch vm stop` - Stop Finch VM
