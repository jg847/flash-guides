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
4. In Project Settings -> Build and Deployment, set the build command to `pnpm db:generate && pnpm build` if Vercel does not pick it up from `vercel.json`.
5. In Project Settings -> Environment Variables, copy the keys from [.env.vercel.example](../.env.vercel.example).
6. Apply each variable to `Production`. Add them to `Preview` too if you want preview deployments to function fully.
7. In Project Settings -> Domains, add your production domain.
8. Update Google OAuth allowed origins and redirect URLs to match that domain.
9. Redeploy after the environment variables are saved.

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
- `vercel.json` already ensures Prisma client generation runs during Vercel builds.
- Email and redirect links automatically use `NEXT_PUBLIC_APP_URL`, `AUTH_URL`, `NEXTAUTH_URL`, or Vercel-provided host variables, in that order.

## Quick deploy checklist

- Remote libsql/Turso database created
- `DATABASE_URL` and `DATABASE_AUTH_TOKEN` added in Vercel
- `AUTH_SECRET` added in Vercel
- `NEXT_PUBLIC_APP_URL`, `AUTH_URL`, and `NEXTAUTH_URL` set to the production hostname
- Google OAuth callback URL updated
- SMTP configured
- S3-compatible storage configured
- Anthropic key configured
