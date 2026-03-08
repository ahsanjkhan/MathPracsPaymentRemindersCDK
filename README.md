### What Is This

This is the Infrastructure-as-Code of an AWS Micro Service which processes automated payment message reminders sent to Discord, for students and tutors enrolled in tutoring with MathPracs.

You can learn more about MathPracs at https://mathpracs.com

### How Does It Work

This uses the power of AWS Cloud Development Kit (CDK) to create or import the following infrastructure:

1. AWS CodePipeline to manage automatic deployments whenever a commit is pushed to GitHub.
2. AWS Lambda Functions - https://github.com/ahsanjkhan/MathPracsPaymentRemindersLambda
3. AWS DynamoDB Tables
4. AWS EventBridge Schedulers
5. AWS SecretsManager (Discord API) -- Imported

### What Are The Components

AWS CodePipeline, AWS Lambda, AWS DynamoDB, AWS EventBridge Scheduler, AWS SecretsManager, Discord API.

### How To Deploy

Raising a Pull Request for commits on a feature branch, getting it approved, and squashing and merging into `main` on either this repo or [MathPracsPaymentRemindersLambda](https://github.com/ahsanjkhan/MathPracsPaymentRemindersLambda) automatically triggers the CodePipeline, which runs deploys the changes.

#### First-Time Setup

1. **Install Node.js** (version 20), **AWS CLI**, and **Finch** (`brew install finch && finch vm init && finch vm start`)
2. **Bootstrap CDK:** `npx cdk bootstrap`
3. **Deploy the pipeline stack:**
   ```bash
   npm install
   CDK_DOCKER=finch npx cdk deploy MathPracsPaymentRemindersPipelineStack
   ```

After this, all future changes are deployed automatically via the pipeline.

#### Manual Deployments (Avoid if possible)
1. Make changes on feature branch.
2. Commit those changes and raise Pull Request as usual.
3. Deploy the changes directly:
   ```bash
   CDK_DOCKER=finch npx cdk deploy MathPracsPaymentRemindersStack
   ```

#### Stack Dependencies

This stack imports shared resources (Discord API secrets) that are created by [MathPracs-TutoringManagement-CDK](https://github.com/ahsanjkhan/MathPracs-TutoringManagement-CDK). That stack must be deployed first following its README.md file.

#### Update Secrets

This uses secrets which are created and populated by setting up [MathPracs-TutoringManagement-CDK](https://github.com/ahsanjkhan/MathPracs-TutoringManagement-CDK).

#### Useful Commands

- `CDK_DOCKER=finch npx cdk diff` - Compare deployed stack with current state
- `CDK_DOCKER=finch npx cdk synth` - Emit the synthesized CloudFormation template
- `CDK_DOCKER=finch npx cdk deploy MathPracsPaymentRemindersPipelineStack` - Deploy with Finch Docker support
- `CDK_DOCKER=finch npx cdk destroy` - Destroy the stack # DANGEROUS!!
- `finch vm status` - See Finch VM Status
- `finch vm stop` - Stop Finch VM