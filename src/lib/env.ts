type RequiredEnvKey = "DATABASE_URL" | "NEXT_PUBLIC_APP_URL";

function getEnv(key: RequiredEnvKey) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  databaseUrl: getEnv("DATABASE_URL"),
  appUrl: getEnv("NEXT_PUBLIC_APP_URL"),
  awsRegion: process.env.AWS_REGION ?? "ap-southeast-2",
  awsAccountId: process.env.AWS_ACCOUNT_ID ?? "",
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID ?? "",
  cognitoUserPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID ?? "",
  cognitoDomain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN ?? "",
  s3UploadBucket: process.env.S3_UPLOAD_BUCKET ?? "",
  rdsSecretArn: process.env.RDS_SECRET_ARN ?? "",
  sesFromEmail: process.env.SES_FROM_EMAIL ?? "",
};
