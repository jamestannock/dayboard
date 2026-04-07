# Dayboard

Dayboard is a personal operating system for a unified book list, money, weekly goals, and learning.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Prisma`
- `PostgreSQL`

## Local setup

1. Copy `.env.example` to `.env`.
2. Set a working `DATABASE_URL`.
3. Generate the Prisma client:

```bash
npm run prisma:generate
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

## AWS

The project is set up to target:

- `Amplify Hosting`
- `Cognito`
- `RDS PostgreSQL`
- `S3`
- `SES`

See [docs/aws-setup.md](docs/aws-setup.md) for the current CLI identity, AWS service plan, and starter CLI commands.
