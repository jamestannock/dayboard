# Dayboard

Dayboard is a personal operating system for goals, lists, mind, body, and finance.

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
2. Set these values in `.env`:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `SESSION_SECRET`
   - `COGNITO_USER_POOL_CLIENT_ID`
   - `NEXT_PUBLIC_COGNITO_DOMAIN`
3. Generate the Prisma client and sync the schema:

```bash
npm run prisma:generate
npx prisma db push
```

4. Start the app:

```bash
npm run dev
```

## Local runtime note

- Use `Node 22.x` for this project. `.nvmrc` is included.
- Avoid keeping the repo under an iCloud-synced Desktop/Documents path if possible. Next's generated `.next` output has been unreliable there. A plain local path like `~/Code/dayboard` is safer.

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
- `Lists`
- `Mind`
- `Body`
- `Finance`

## Deployment

The app is deployed to AWS Amplify with:

- `main` for production
- `demo` for preview/dev

See [docs/aws-setup.md](docs/aws-setup.md) for the current AWS setup and resource inventory.
