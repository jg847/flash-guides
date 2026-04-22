# Sprints — Spec 01: Infrastructure & Project Setup

> **Status:** ✅ All sprints complete (Phase 0 committed `bf3f76a`)

---

## Sprint 01-A — Repo scaffold & tooling

**Status:** ✅ Complete  
**Scope:** Initialize Next.js project, configure TypeScript, Tailwind, ESLint, Prettier, Husky, lint-staged, commitlint.

**Files touched:**

- `package.json`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.mjs`, `.prettierignore`
- `.husky/pre-commit`, `.husky/pre-push`, `.husky/commit-msg`
- `pnpm-lock.yaml`

**Implementation notes:**

- TypeScript `strict: true` + `noUncheckedIndexedAccess: true`.
- ESLint rule `@typescript-eslint/no-explicit-any: error` enforced.
- Commitlint config embedded in `package.json`.

**Tests added:** None (infrastructure only).

**Entry criteria:** Empty repo.  
**Exit criteria:** `pnpm install && pnpm lint && pnpm typecheck` all pass.

---

## Sprint 01-B — Database & Prisma

**Status:** ✅ Complete  
**Scope:** Prisma schema with all initial models, SQLite WAL boot, nightly backup script.

**Files touched:**

- `prisma/schema.prisma`, `prisma.config.ts`
- `src/lib/db/client.ts`, `src/lib/db/boot.ts`
- `instrumentation.ts`
- `scripts/backup-db.sh`

**Implementation notes:**

- Prisma v7 — URL goes in `prisma.config.ts` datasource, not `schema.prisma`.
- Generated client output: `src/generated/prisma/`.
- `bootDatabase()` called in Next.js `instrumentation.ts` on Node.js runtime.

**Tests added:**

- `tests/unit/lib/db/boot.test.ts` — mocks Prisma, asserts 5 PRAGMA calls.
- `tests/integration/api/health.test.ts` — real SQLite test DB, asserts 200/503.

**Entry criteria:** Sprint 01-A complete.  
**Exit criteria:** `pnpm db:generate` succeeds; `bootDatabase` unit tests pass (T-06 idempotent call, T-07 backup script creates parent directory).

---

## Sprint 01-C — Docker & CI/CD

**Status:** ✅ Complete  
**Scope:** Multi-stage Dockerfile, docker-compose, GitHub Actions workflows, Fly.io config.

**Files touched:**

- `docker/Dockerfile`, `docker/docker-compose.yml`, `docker/docker-compose.override.yml`
- `.github/workflows/ci.yml`, `.github/workflows/docker.yml`
- `fly.toml`
- `next.config.ts` (standalone output, poweredByHeader off)
- `src/app/api/health/route.ts`

**Implementation notes:**

- Next.js `output: 'standalone'` required for minimal Docker image.
- CI matrix: chromium + firefox for Playwright.
- `FLY_API_TOKEN` must be added as a repo secret before `docker.yml` deploys.

**Tests added:**

- `tests/e2e/health.spec.ts` — Playwright smoke test against running app.

**Entry criteria:** Sprint 01-B complete.  
**Exit criteria:** `docker compose up` healthy; `ci.yml` green on GitHub; T-08 Docker image under 500 MB; AC-08 through AC-12 verified (pre-push hook, CI coverage artifact, `docker-compose.override.yml`, named volume, healthchecks).
