# Dayboard AWS Resources

Verified on `2026-04-08` in `ap-southeast-2`.

## Account

- AWS account: `385956305629`
- CLI identity ARN: `arn:aws:iam::385956305629:user/jamestannock`
- Region: `ap-southeast-2`

## Active app hosting

### Amplify

- App name: `dayboard-git`
- App ID: `d1jou3atx8pqtq`
- App ARN: `arn:aws:amplify:ap-southeast-2:385956305629:apps/d1jou3atx8pqtq`
- Platform: `WEB_COMPUTE`
- Repository: `https://github.com/jamestannock/dayboard`
- Default domain: `d1jou3atx8pqtq.amplifyapp.com`

### Amplify branches

- Production branch: `main`
  - Branch ARN: `arn:aws:amplify:ap-southeast-2:385956305629:apps/d1jou3atx8pqtq/branches/main`
  - Public URL: `https://main.d1jou3atx8pqtq.amplifyapp.com`
  - Stage: `PRODUCTION`
  - Framework: `Next.js - SSR`
  - Cognito client ID used by branch: `2m7pm2n01bs6m3kh4fmpu5qa32`
- Demo branch: `demo`
  - Branch ARN: `arn:aws:amplify:ap-southeast-2:385956305629:apps/d1jou3atx8pqtq/branches/demo`
  - Public URL: `https://demo.d1jou3atx8pqtq.amplifyapp.com`
  - Stage: `DEVELOPMENT`
  - Framework: `Next.js - SSR`
  - Cognito client ID used by branch: `1afqlkmir065lvvm13smsj2mjk`

### IAM role for Amplify SSR logs

- Role name: `DayboardAmplifyCloudWatchRole`
- Role ID: `AROAVTXGJ3LORFQEKOWHM`
- Role ARN: `arn:aws:iam::385956305629:role/DayboardAmplifyCloudWatchRole`

## Authentication

### Cognito user pool

- User pool name: `dayboard-users`
- User pool ID: `ap-southeast-2_MzAWWTj5I`

### Cognito domain

- Domain prefix: `dayboard-385956305629`
- Hosted auth URL: `https://dayboard-385956305629.auth.ap-southeast-2.amazoncognito.com`
- CloudFront distribution: `d18k7b2git647n.cloudfront.net`

### Cognito app clients

- `dayboard-web-main`
  - Client ID: `2m7pm2n01bs6m3kh4fmpu5qa32`
- `dayboard-web-demo`
  - Client ID: `1afqlkmir065lvvm13smsj2mjk`
- `dayboard-web`
  - Client ID: `sm33n9ttcdf6ulr9s3knbo9a`
  - Status: legacy shared client from the earlier setup

## Database

### RDS PostgreSQL

- DB instance identifier: `dayboard-db`
- DB ARN: `arn:aws:rds:ap-southeast-2:385956305629:db:dayboard-db`
- DB resource ID: `db-74KAPPYCQFQZEFZERPFMSE2LRE`
- Engine: `postgres`
- Engine version: `17.6`
- Instance class: `db.t4g.micro`
- Database name: `dayboard`
- Master username: `dayboard`
- Endpoint: `dayboard-db.c3ogumya25fm.ap-southeast-2.rds.amazonaws.com`
- Port: `5432`
- Publicly accessible: `true`
- Deletion protection: `true`

### RDS networking

- VPC ID: `vpc-083763d9f6f29ab45`
- DB subnet group: `dayboard-public-subnets`
- Security group ID: `sg-05fded7c9599f5571`

### Secrets Manager

- Master user secret ARN: `arn:aws:secretsmanager:ap-southeast-2:385956305629:secret:rds!db-8de6b00b-c748-43d6-bcac-b3f67e67929d-7iUZWV`
- KMS key ARN: `arn:aws:kms:ap-southeast-2:385956305629:key/2e23e930-4494-44df-a42e-5953c43ee236`

## Storage

### S3

- Upload bucket: `dayboard-385956305629-ap-southeast-2`

## Legacy resources still in the account

### Old Amplify app

- App name: `dayboard-web`
- App ID: `d10jt4ypxe0rng`
- App ARN: `arn:aws:amplify:ap-southeast-2:385956305629:apps/d10jt4ypxe0rng`
- Default domain: `d10jt4ypxe0rng.amplifyapp.com`
- Public URL: `https://main.d10jt4ypxe0rng.amplifyapp.com`
- Status: legacy manually managed app, no Git repo connected

## Services not currently set up

- SES sender/domain: not configured
- Custom production domain: not configured
- Private RDS networking: not configured

## Normal deploy flow

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

Amplify builds and deploys from the GitHub `main` branch.
