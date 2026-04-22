# Spec 01 — Infrastructure & Project Setup

> **Status:** ✅ Complete (Phase 0)  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

This spec covers all repository scaffolding, tooling, and deployment infrastructure required before any application feature code is written. It exists for traceability — every infrastructure decision is documented here so future contributors understand the context. Phase 0 is considered "shipped" after the initial commit passes CI.

---

## 2. User Stories

1. As a **developer**, I want the repository bootstrapped with a consistent toolchain so that I can start implementing features on day one without configuration churn.
2. As a **developer**, I want automated lint, type-check, and test gates on every push so that regressions are caught before merging.
3. As a **developer**, I want a Docker Compose environment so that I can run the full stack (app + MinIO + Mailhog) locally with a single command.
4. As a **developer**, I want a CI pipeline that builds and publishes a Docker image to GHCR and deploys to Fly.io on every merge to `main`.
5. As a **developer**, I want SQLite configured in WAL mode with nightly backups so that the database is safe from corruption and loss.

---

## 3. Acceptance Criteria

| #     | Story | Given                                   | When                                         | Then                                                                                            |
| ----- | ----- | --------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| AC-01 | US-1  | A fresh clone of the repo               | `pnpm install && pnpm build` is run          | Build completes with 0 errors                                                                   |
| AC-02 | US-2  | A push or PR is opened                  | GitHub Actions `ci.yml` triggers             | Lint, typecheck, unit, integration, build, and e2e all pass                                     |
| AC-03 | US-3  | `.env` is populated from `.env.example` | `docker compose up` is run from `docker/`    | All three services start healthy; app responds on port 3000                                     |
| AC-04 | US-4  | A merge to `main` occurs                | GitHub Actions `docker.yml` triggers         | Image is pushed to GHCR and deployed to Fly.io                                                  |
| AC-05 | US-5  | The app starts                          | Boot sequence runs                           | `PRAGMA journal_mode = WAL` is confirmed active; backup script exists at `scripts/backup-db.sh` |
| AC-06 | US-2  | A staged file violates lint rules       | `git commit` is attempted                    | Husky `pre-commit` blocks the commit and prints the lint error                                  |
| AC-07 | US-2  | A commit message is not conventional    | `git commit` is attempted with a bad message | Husky `commit-msg` blocks the commit                                                            |

---

## 4. UX Notes

No user-facing UI. Developer-facing only.

- `README.md` must contain: project description, prerequisites, local setup steps, environment variable reference, Docker Compose instructions, and links to the spec folder.
- `.env.example` must have comments explaining every variable.

---

## 5. Data Model

Schema initialized with Auth.js v5 required tables and core application models:

- `users`, `accounts`, `sessions`, `verification_tokens` — Auth.js
- `guides` — core content entity
- `tags`, `guide_tags` — many-to-many tagging
- `folders` — user organisation
- `notes` — highlight-to-note

Enums: `StudyMode` (OVERVIEW, DEEP_DIVE, EXAM_PREP, ELI5), `InputType` (TOPIC, TEXT, URL).

All Prisma migrations live in `prisma/migrations/`.

---

## 6. API Contracts

### `GET /api/health`

No auth required.

**Response 200:**

```json
{ "status": "ok", "timestamp": "2026-04-22T00:00:00.000Z" }
```

**Response 503** (DB unreachable):

```json
{ "status": "error" }
```

---

## 7. Dependencies

None — this is the foundation spec.

---

## 8. Out of Scope

- Application feature logic of any kind.
- User-facing pages.
- Seed data beyond schema migration.

---

## 9. Test Plan

| #    | Type        | Category | Description                                        | Given / When / Then                                                      |
| ---- | ----------- | -------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| T-01 | Integration | Positive | Health endpoint returns 200 when DB is up          | DB running / GET /api/health / 200 + `{status:"ok"}`                     |
| T-02 | Integration | Negative | Health endpoint returns 503 when DB is unreachable | DB killed / GET /api/health / 503 + `{status:"error"}`                   |
| T-03 | Unit        | Positive | `bootDatabase` runs all 5 PRAGMAs                  | Mock Prisma / `bootDatabase()` called / 5 `$executeRawUnsafe` calls made |
| T-04 | Unit        | Positive | Backup script prunes files older than 14 days      | Fixture dir with old/new files / script runs / only recent files remain  |
| T-05 | E2E         | Positive | App loads over Docker Compose                      | `docker compose up` / navigate to `http://localhost:3000` / 200 response |

---

## 10. Definition of Done

- [x] Repo bootstrapped per Section 4 of brief.
- [x] `pnpm typecheck` passes with `strict: true` and `noUncheckedIndexedAccess: true`.
- [x] `docker-compose.yml` tested — all three services start healthy.
- [x] `ci.yml` and `docker.yml` workflows committed.
- [x] Husky hooks in place and verified.
- [x] `prisma/schema.prisma` committed with all initial models.
- [x] `/api/health` endpoint committed.
- [x] `scripts/backup-db.sh` committed.
- [x] `.env.example` committed with all variables documented.
- [x] `fly.toml` committed.
- [x] Initial commit squash-merged to `main` with green CI.
