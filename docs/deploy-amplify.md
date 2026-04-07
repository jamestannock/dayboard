# Deploying Dayboard With Git + Amplify

## Current state

- Amplify app id: `d10jt4ypxe0rng`
- Amplify app name: `dayboard-web`
- Amplify platform: `WEB_COMPUTE`
- Amplify repository: `null`

This means Amplify is configured for a dynamic Next.js app, but it is not yet connected to a Git repository. No commit you make locally will reach Amplify until a remote repo is connected.

## Local repo setup

From the project root:

```bash
git init
git branch -M main
git add .
git commit -m "Initial Dayboard app"
```

## Create a remote repository

Create a new GitHub repository manually in the GitHub UI, for example:

- repo name: `dayboard`
- visibility: private or public

Then add it as the remote:

```bash
git remote add origin git@github.com:<your-username>/dayboard.git
git push -u origin main
```

If you prefer HTTPS:

```bash
git remote add origin https://github.com/<your-username>/dayboard.git
git push -u origin main
```

## Connect the repo to Amplify

In Amplify Hosting:

1. Open app `dayboard-web`
2. Choose to connect a repository
3. Select your Git provider and the `dayboard` repo
4. Select branch `main`
5. Keep the app on `WEB_COMPUTE`
6. Confirm the build spec from `amplify.yml`

## Required Amplify environment variables

Set these in the Amplify app before the first build:

- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL`
- `SESSION_SECRET`
- `COGNITO_USER_POOL_CLIENT_ID`
- `NEXT_PUBLIC_COGNITO_DOMAIN`

## After connection

Every future update is:

```bash
git add .
git commit -m "Describe the change"
git push
```

Amplify will then build and deploy from the pushed commit.
