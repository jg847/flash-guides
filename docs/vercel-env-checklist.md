# Vercel Env Migration Checklist

This checklist is derived from the current local `.env` shape without copying any secret values into the repository.

## Reuse from local `.env`

These already exist locally and can usually be copied into Vercel as-is, using the actual secret values from your private `.env` file:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ANTHROPIC_API_KEY`
- `TAVILY_API_KEY`
- `FAL_API_KEY`

## Replace for production

These local values are development-only and should be replaced before deploying to Vercel:

- `DATABASE_URL`
  Local value uses `file:...` SQLite. Replace with a remote `libsql://...` database URL.
- `DATABASE_AUTH_TOKEN`
  Not present locally. Add the token for the remote libsql/Turso database.
- `NEXT_PUBLIC_APP_URL`
  Replace localhost with the production hostname.
- `AUTH_URL`
  Replace localhost with the production hostname.
- `NEXTAUTH_URL`
  Replace localhost with the production hostname.
- `AUTH_SECRET`
  Generate a new long random secret for production.
- `NEXTAUTH_SECRET`
  Optional compatibility alias. If you keep it, set it to the same production secret as `AUTH_SECRET`.
- `S3_ENDPOINT`
  Local MinIO endpoint should be replaced with a production S3-compatible endpoint.
- `S3_ACCESS_KEY`
  Replace local MinIO credentials with production object storage credentials.
- `S3_SECRET_KEY`
  Replace local MinIO credentials with production object storage credentials.
- `S3_BUCKET`
  Confirm the production bucket exists and matches the configured name.
- `SMTP_HOST`
  Local Mailhog host should be replaced with a real SMTP provider.
- `SMTP_PORT`
  Replace local Mailhog port with the provider port, usually `587` or `465`.
- `SMTP_USER`
  Add the production SMTP username.
- `SMTP_PASS`
  Add the production SMTP password.
- `SMTP_FROM`
  Replace the local sender address with a real domain-owned sender.

## Do not copy directly from local `.env`

- Any `localhost` URL
- Any `file:` database URL
- Any local MinIO credential
- Any Mailhog SMTP setting

## Vercel entry order

1. Add `DATABASE_URL` and `DATABASE_AUTH_TOKEN`.
2. Add `AUTH_SECRET` and optionally `NEXTAUTH_SECRET`.
3. Add `NEXT_PUBLIC_APP_URL`, `AUTH_URL`, and `NEXTAUTH_URL`.
4. Add Google OAuth credentials.
5. Add SMTP credentials.
6. Add S3-compatible storage credentials.
7. Add Anthropic and any optional integration keys.

## OAuth follow-up

After setting the production hostname, update Google OAuth to allow:

- Origin: `https://<your-domain>`
- Redirect URI: `https://<your-domain>/api/auth/callback/google`

## Final verification

- Vercel project has all required Production variables
- Vercel build command is `pnpm db:generate && pnpm build`
- Custom domain is attached
- Google OAuth callback URL matches the production domain exactly
- Remote libsql/Turso database is reachable from Vercel
- SMTP and S3-compatible storage are reachable from Vercel
