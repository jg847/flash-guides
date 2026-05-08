# FlashGuides

FlashGuides is a full-stack AI study guide application built with Next.js. A user can turn source material into structured study guides, save them, revisit them from a dashboard, share them with others, export them, and continue learning through follow-up chat.

The project exists as a portfolio-quality demonstration of product-minded full-stack engineering: AI-assisted content generation, authenticated and guest user flows, persistence, sharing, exports, and automated testing in a single application.

## Why this project exists

I built FlashGuides to demonstrate the kind of work expected in a modern full-stack AI engineering role. The project was especially influenced by a Full Stack + AI Engineer job posting from Gesture on Indeed, which emphasized building AI-driven product features, strong TypeScript and React foundations, backend services, integrations, data flow design, and production-minded delivery.

Rather than cloning that role's stack exactly, this project focuses on the same core engineering capabilities:

- building a user-facing AI product end to end
- designing reliable backend and data workflows
- handling authentication, persistence, sharing, and exports
- testing the system across unit, integration, and end-to-end layers

## What this project demonstrates

FlashGuides was meant to demonstrate these skills and technologies:

- Next.js 16 app development with the App Router
- TypeScript across frontend, backend, and shared logic
- AI integration for study guide generation and follow-up interactions
- Prisma-based data modeling and persistence
- authenticated and guest application flows
- export and sharing features for generated content
- professional testing practices with Vitest and Playwright

## Core features

- Generate study guides from user-provided learning material
- Support both guest usage and authenticated user accounts
- Save guides to a dashboard for later review
- Share guides with others
- Export guides in multiple formats
- Continue learning with follow-up chat and guided study flows

## Tech stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Next.js server routes, Prisma
- Database: SQLite for local development, libsql/Turso-compatible setup for production
- Testing: Vitest, Testing Library, Playwright, MSW
- Tooling: pnpm, ESLint, Prettier

## How to run the project

You can either fork this repository, install the dependencies, and include your own APIs, or visit the public deployment https://flash-guides.vercel.app/ and start using.

### Prerequisites

- Node.js 20+
- pnpm 10+

### Local setup

1. Install dependencies.

```bash
pnpm install
```

2. Copy the environment template and configure the values you need.

```bash
cp .env.example .env
```

3. Generate the Prisma client.

```bash
pnpm db:generate
```

4. If this is your first run, apply local database migrations.

```bash
pnpm db:migrate
```

5. Start the development server.

```bash
pnpm dev
```

6. Open the app in your browser.

```text
http://localhost:3000
```

### Optional local services

If you run the local Docker stack, these URLs are useful:

- App: `http://localhost:3000`
- MinIO: `http://localhost:9000`
- Mailhog UI: `http://localhost:8025`

The Docker Compose files are in [docker/docker-compose.yml](/home/jpgar/is219_projects/flashguides/docker/docker-compose.yml).

## How to run the tests

### Main test commands

```bash
pnpm test
pnpm test:unit
pnpm test:integration
pnpm test:e2e
```

### Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

### What each command covers

- `pnpm test` runs the Vitest suite
- `pnpm test:unit` runs unit-focused tests
- `pnpm test:integration` runs integration tests
- `pnpm test:e2e` runs Playwright end-to-end tests
- `pnpm lint` checks code quality
- `pnpm typecheck` validates TypeScript types
- `pnpm build` verifies the production build

For the deeper testing approach and expectations, see [docs/testing-strategy.md](/home/jpgar/is219_projects/flashguides/docs/testing-strategy.md).

## Deployment notes

For local development, SQLite is sufficient. For production deployment, the app is designed to use a remote libsql/Turso-compatible database together with external SMTP and S3-compatible object storage.

Useful deployment references:

- [.env.vercel.example](/home/jpgar/is219_projects/flashguides/.env.vercel.example)
- [docs/vercel-deployment.md](/home/jpgar/is219_projects/flashguides/docs/vercel-deployment.md)

## Project structure

- [src/app](/home/jpgar/is219_projects/flashguides/src/app) contains routes and pages
- [src/components](/home/jpgar/is219_projects/flashguides/src/components) contains UI components
- [src/lib](/home/jpgar/is219_projects/flashguides/src/lib) contains application logic, integrations, and services
- [prisma](/home/jpgar/is219_projects/flashguides/prisma) contains the schema and migrations
- [tests](/home/jpgar/is219_projects/flashguides/tests) contains unit, integration, and end-to-end tests
- [docs](/home/jpgar/is219_projects/flashguides/docs) contains architecture and process documentation

## Additional documentation

- [docs/architecture.md](/home/jpgar/is219_projects/flashguides/docs/architecture.md)
- [docs/testing-strategy.md](/home/jpgar/is219_projects/flashguides/docs/testing-strategy.md)
- [docs/contributing.md](/home/jpgar/is219_projects/flashguides/docs/contributing.md)

## Reviewer summary

If you are reviewing this repository, the key points are simple:

- This is an AI-enabled study guide web application.
- It exists to demonstrate full-stack product engineering with TypeScript, Next.js, AI integration, persistence, and testing.
- You can run it locally with `pnpm install`, `pnpm db:generate`, `pnpm db:migrate`, and `pnpm dev`.
- You can validate it with `pnpm test`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
