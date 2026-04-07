# MVP roadmap

## Build order

1. Product shell and navigation
2. Auth with Cognito
3. Prisma schema and database migrations
4. CRUD for books, movies, goals, finance, and learning
5. Dashboard aggregation queries
6. AWS deployment and environment wiring

## Immediate next tasks

- Replace static auth screens with Cognito-backed forms
- Create local PostgreSQL and run first migration
- Seed demo data for dashboard cards
- Add route handlers or server actions for the book list, goals, finance, and learning
- Add protected app routes and onboarding state

## Paid-tier readiness

- Plans and entitlements already exist in the schema
- Stripe can be added later without reworking the core user model
