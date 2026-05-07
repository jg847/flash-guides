## FlashGuides

FlashGuides is a Next.js study guide application with guest and authenticated flows, guide generation, sharing, exports, and follow-up chat.

## Local development

1. Copy `.env.example` to `.env` and fill in the values you need.
2. Install dependencies with `pnpm install`.
3. Generate Prisma client with `pnpm db:generate`.
4. Start the app with `pnpm dev`.

Common local URLs:

- App: `http://localhost:3000`
- MinIO: `http://localhost:9000`
- Mailhog SMTP UI when running docker-compose locally: `http://localhost:8025`

## Useful commands

```bash
pnpm dev
pnpm test
pnpm exec tsc --noEmit
pnpm build
```

## Deployment

Vercel deployment requires a remote libsql/Turso database plus external SMTP and S3-compatible storage. Use these files as the starting point:

- [.env.vercel.example](.env.vercel.example)
- [docs/vercel-deployment.md](docs/vercel-deployment.md)

## Notes

- Local development can continue using file-based SQLite.
- Production on Vercel should use a remote libsql-compatible database.
- Email links and auth redirects use deployment-aware URL resolution.

For architecture and deeper implementation notes, see [docs/architecture.md](docs/architecture.md).
