# Dayboard

Dayboard is a personal operating system for goals, health, finance, media tracking, and learning.

## Stack

- `Next.js 15`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Prisma`
- `PostgreSQL on RDS`
- `Amazon Cognito`
- `AWS Amplify Hosting`

## Local setup

1. Copy `.env.example` to `.env`.
2. Set a working `DATABASE_URL`.
3. Generate the Prisma client and sync the schema:

```bash
npm run prisma:generate
npx prisma db push
```

4. Start the app:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Product areas

- `Dashboard`
- `Goals`
- `Health`
- `Finance`
- `Book List`
- `Learning`

## Deployment

The app is deployed to AWS Amplify with:

- `main` for production
- `demo` for preview/dev

See [docs/aws-setup.md](docs/aws-setup.md) and [docs/deploy-amplify.md](docs/deploy-amplify.md) for the current AWS setup and deployment flow.
