# AWS setup

Current CLI identity:

- Account: `385956305629`
- ARN: `arn:aws:iam::385956305629:user/jamestannock`
- Region: `ap-southeast-2`

Provisioned resources:

- Cognito user pool: `ap-southeast-2_MzAWWTj5I`
- Cognito app client: `sm33n9ttcdf6ulr9s3knbo9a`
- Cognito domain: `https://dayboard-385956305629.auth.ap-southeast-2.amazoncognito.com`
- S3 uploads bucket: `dayboard-385956305629-ap-southeast-2`
- Amplify app: `d10jt4ypxe0rng`
- Public web URL: `https://main.d10jt4ypxe0rng.amplifyapp.com/`
- RDS instance: `dayboard-db`
- RDS endpoint: `dayboard-db.c3ogumya25fm.ap-southeast-2.rds.amazonaws.com:5432`
- RDS subnet group: `dayboard-public-subnets`
- RDS security group: `sg-05fded7c9599f5571`
- RDS master secret ARN: `arn:aws:secretsmanager:ap-southeast-2:385956305629:secret:rds!db-8de6b00b-c748-43d6-bcac-b3f67e67929d-7iUZWV`

Bucket configuration applied:

- versioning enabled
- public access blocked
- default server-side encryption enabled

Amplify status:

- Current app platform: `WEB`
- Current app has no connected Git repository
- The product now uses dynamic Next.js routes, server actions, cookies, and RDS data
- That means the existing static-style deployment path is no longer sufficient for the latest app code

Required production hosting change:

1. Move the Amplify app to `WEB_COMPUTE`
2. Connect a Git repository for SSR builds
3. Add runtime env vars in Amplify: `DATABASE_URL`, `NEXT_PUBLIC_APP_URL`, `SESSION_SECRET`, `COGNITO_USER_POOL_CLIENT_ID`, `NEXT_PUBLIC_COGNITO_DOMAIN`
4. Deploy using the root `amplify.yml` build spec

Recommended MVP stack:

- `AWS Amplify Hosting` for the Next.js frontend
- `Amazon Cognito` for user accounts
- `Amazon RDS PostgreSQL` for application data
- `Amazon S3` for uploads and exports
- `Amazon SES` for transactional email

Remaining infrastructure:

1. Verify SES sender email/domain if you want branded outbound mail.
2. Add `SESSION_SECRET` to every runtime environment that serves the Next.js app.
3. Run Prisma migrations against the AWS database once the instance is fully `available`.

Useful CLI commands:

```bash
aws sts get-caller-identity
aws cognito-idp list-user-pools --max-results 10
aws s3api list-buckets --query 'Buckets[].Name'
aws rds describe-db-instances --query 'DBInstances[].DBInstanceIdentifier'
aws amplify list-apps --query 'apps[].name'
```

Cognito resources created:

```bash
aws cognito-idp create-user-pool-client \
  --user-pool-id ap-southeast-2_MzAWWTj5I \
  --client-name dayboard-web \
  --no-generate-secret
```

RDS example:

```bash
aws rds create-db-instance \
  --db-instance-identifier dayboard-db \
  --db-instance-class db.t4g.micro \
  --engine postgres \
  --allocated-storage 20 \
  --master-username dayboard \
  --master-user-password '<strong-password>' \
  --publicly-accessible
```

S3 resource created:

```bash
aws s3api create-bucket \
  --bucket dayboard-385956305629-ap-southeast-2 \
  --region ap-southeast-2 \
  --create-bucket-configuration LocationConstraint=ap-southeast-2
```

Notes:

- Cognito and S3 are live in the account now.
- RDS is provisioned with AWS-managed password storage in Secrets Manager.
- Current database ingress is limited to your current public IP on port `5432`.
- Amplify Hosting works best once the project is pushed to GitHub.
- For production RDS, prefer private networking and Secrets Manager instead of a public database.
