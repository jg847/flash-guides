# Vercel Deployment

This app can run on Vercel, but production must use a remote SQLite-compatible database rather than a local `file:` database.

Use [.env.vercel.example](../.env.vercel.example) as the source of truth for the values you need in Vercel.
Use [vercel-env-checklist.md](./vercel-env-checklist.md) for a redacted migration checklist based on the current local setup.

## Required infrastructure

- Database: Turso/libsql
- Object storage for avatars and exports: any S3-compatible provider such as Cloudflare R2, MinIO, or AWS S3
- SMTP provider for email verification and password reset
- Anthropic API access

## Vercel dashboard steps

1. Create a new Vercel project and import this repository.
2. In Project Settings, confirm the framework is Next.js.
3. In Project Settings -> Build and Deployment, use the install command from `vercel.json`, which skips optional local-only SQLite packages on Vercel.
4. In Project Settings -> Build and Deployment, set the build command to `pnpm build:vercel` if Vercel does not pick it up from `vercel.json`.
5. In Project Settings -> Environment Variables, copy the keys from [.env.vercel.example](../.env.vercel.example).
6. Apply each variable to `Production`. Add them to `Preview` too if you want preview deployments to function fully.
7. In Project Settings -> Domains, add your production domain.
8. Update Google OAuth allowed origins and redirect URLs to match that domain.
9. Redeploy after the environment variables are saved.

## Effective Vercel config

The current repo is set up for Vercel with these assumptions:

- Install command: `pnpm install --no-optional --frozen-lockfile`
- Build command: `pnpm build:vercel`
- Production database: remote `libsql://...` or `https://...` SQLite-compatible URL
- Local database: `file:...` SQLite only

`pnpm build:vercel` runs Prisma client generation, applies pending database migrations, then runs the Next.js production build.

For local `file:` SQLite databases, deploy migrations still use `prisma migrate deploy`.
For remote `libsql://...` or `https://...` databases, deploy migrations are applied directly with `@libsql/client` because Prisma CLI does not accept libsql URLs during the migration step.

If you have manually overridden the install or build command in the Vercel dashboard, make it match the repo configuration before retrying a deploy.

## OAuth settings

For Google OAuth, configure these values in Google Cloud:

- Authorized JavaScript origins: `https://your-domain.example.com`
- Authorized redirect URI: `https://your-domain.example.com/api/auth/callback/google`

If you keep the default Vercel domain, use that hostname until your custom domain is live.

## Recommended environment variables

### Core app

- `DATABASE_URL=libsql://<your-database-url>`
- `DATABASE_AUTH_TOKEN=<turso-or-libsql-auth-token>`
- `AUTH_SECRET=<strong-random-secret>`
- `NEXT_PUBLIC_APP_URL=https://<your-production-domain>`
- `AUTH_URL=https://<your-production-domain>`
- `NEXTAUTH_URL=https://<your-production-domain>`

### Auth

- `GOOGLE_CLIENT_ID=<google-oauth-client-id>`
- `GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>`

### Email

- `SMTP_HOST=<smtp-host>`
- `SMTP_PORT=<smtp-port>`
- `SMTP_USER=<smtp-user>`
- `SMTP_PASS=<smtp-password>`
- `SMTP_FROM=<from-address>`

### AI and integrations

- `ANTHROPIC_API_KEY=<anthropic-api-key>`
- `TAVILY_API_KEY=<optional-tavily-key>`
- `FAL_API_KEY=<optional-fal-key>`

### S3-compatible storage

- `S3_ENDPOINT=<https://...>`
- `S3_BUCKET=<bucket-name>`
- `S3_ACCESS_KEY=<access-key>`
- `S3_SECRET_KEY=<secret-key>`

## Notes

- Local development can keep using `DATABASE_URL=file:./data/dev.db`.
- Production on Vercel should not use `file:` SQLite because the filesystem is ephemeral.
- `better-sqlite3` is kept as an optional local-only dependency, and Vercel skips optional installs so native SQLite build scripts do not run there.
- `src/lib/db/client.ts` loads the local SQLite adapter through a runtime-only path so Turbopack does not try to resolve `@prisma/adapter-better-sqlite3` during Vercel builds.
- The Prisma adapter type is derived from the generated Prisma client instead of importing `@prisma/driver-adapter-utils`, which avoids another Vercel-only module resolution failure.
- `vercel.json` ensures Prisma client generation and production migrations run during Vercel builds.
- The migration step uses `pnpm db:deploy`, which falls back to raw libsql execution for remote Turso/libsql databases.
- Email and redirect links automatically use `NEXT_PUBLIC_APP_URL`, `AUTH_URL`, `NEXTAUTH_URL`, or Vercel-provided host variables, in that order.

## If a deploy still fails

1. Confirm the deployment is using the latest pushed commit.
2. Check that Vercel is not overriding the install command from [vercel.json](../vercel.json).
3. Check that Vercel is not overriding the build command from [vercel.json](../vercel.json).
4. Check that `DATABASE_URL` in Vercel is a remote libsql-compatible URL, not a `file:` URL.
5. Check that `DATABASE_AUTH_TOKEN` is present when the remote database requires it.
6. If Auth.js or Prisma reports missing tables, run `pnpm db:migrate:prod` against the production database and redeploy.
7. If the error mentions Google auth or callback URLs, update the Google Cloud OAuth settings to match the live Vercel hostname exactly.

## Quick deploy checklist

- Remote libsql/Turso database created
- `DATABASE_URL` and `DATABASE_AUTH_TOKEN` added in Vercel
- `AUTH_SECRET` added in Vercel
- `NEXT_PUBLIC_APP_URL`, `AUTH_URL`, and `NEXTAUTH_URL` set to the production hostname
- Production migrations applied via `pnpm build:vercel` or `pnpm db:migrate:prod`
- Google OAuth callback URL updated
- SMTP configured
- S3-compatible storage configured
- Anthropic key configured
