# Contributing to FlashGuides

---

## 1. Prerequisites

| Tool                    | Version | Install                          |
| ----------------------- | ------- | -------------------------------- |
| Node.js                 | ≥ 22.x  | [nodejs.org](https://nodejs.org) |
| pnpm                    | ≥ 10.x  | `npm i -g pnpm`                  |
| Docker & Docker Compose | latest  | [docker.com](https://docker.com) |
| Git                     | ≥ 2.40  | system package manager           |

---

## 2. First Time Setup

```bash
# 1. Clone the repository
git clone https://github.com/<org>/flashguides.git
cd flashguides

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in required secrets (see .env.example for descriptions)

# 4. Run database migrations and generate Prisma client
pnpm db:migrate
pnpm db:generate

# 5. Set up Git hooks
pnpm prepare

# 6. Verify everything works
pnpm typecheck
pnpm test:unit
```

To run the full stack locally (app + MinIO + Mailhog):

```bash
docker compose up
```

The app will be available at `http://localhost:3000`.  
Mailhog (dev email UI): `http://localhost:8025`.  
MinIO console: `http://localhost:9001`.

---

## 3. Development Workflow

### Start the dev server

```bash
pnpm dev
```

### Run tests

```bash
pnpm test:unit           # Vitest unit + component tests (fast)
pnpm test:integration    # Vitest integration tests (real SQLite)
pnpm test:e2e            # Playwright E2E (requires built app)
```

### Lint and format

```bash
pnpm lint                # ESLint
pnpm format              # Prettier (write mode)
pnpm typecheck           # TypeScript
```

### Database

```bash
pnpm db:migrate          # Apply pending migrations
pnpm db:generate         # Regenerate Prisma client after schema changes
pnpm db:studio           # Open Prisma Studio (GUI)
```

---

## 4. Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). The commit hook (`commitlint`) enforces this on every commit.

**Format:**

```
<type>(<scope>): <short description>
```

**Types:**

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | A new feature                                   |
| `fix`      | A bug fix                                       |
| `docs`     | Documentation only change                       |
| `test`     | Adding or updating tests                        |
| `refactor` | Code change that is neither a fix nor a feature |
| `chore`    | Build process, dependency, or tooling update    |
| `perf`     | Performance improvement                         |
| `ci`       | CI/CD configuration change                      |

**Examples:**

```
feat(auth): add Google OAuth provider
fix(rate-limit): reset window at midnight UTC not 24h rolling
docs(arch): document Observer pattern for token streaming
test(dashboard): add edge case for empty guide list
```

Breaking changes: append `!` after type/scope and include a `BREAKING CHANGE:` footer.

---

## 5. Branch Strategy

- `main` — production-ready code; protected branch
- `feat/<feature-name>` — feature branches (branch from `main`, merge via PR)
- `fix/<issue-description>` — bug fix branches
- `chore/<task>` — maintenance tasks

**Naming convention:**

```
feat/auth-google-oauth
fix/rate-limit-window-reset
chore/upgrade-prisma-v7
```

---

## 6. Pull Request Process

1. **Create a branch** from `main`.
2. **Implement the sprint** (see the relevant `sprints.md` for file-level guidance).
3. **Self-review checklist** before opening a PR:
   - [ ] `pnpm typecheck` passes
   - [ ] `pnpm lint` passes
   - [ ] `pnpm test:unit && pnpm test:integration` passes
   - [ ] No `TODO`, `FIXME`, or `@ts-ignore` without a linked issue
   - [ ] `docs/architecture.md` updated if new patterns were added
   - [ ] Spec's Definition of Done checklist is fully satisfied
4. **Open PR** against `main` with a clear description referencing the spec and sprint.
5. **CI must be green** before merge.
6. **Squash merge** only — no merge commits.
7. Update the sprint's `status` field to `✅ Complete` in the relevant `sprints.md`.

---

## 7. Working with the Spec Files

All feature development is driven by `docs/_spec/`. Before writing any code:

1. Read the relevant `spec.md` in full.
2. Read the relevant `sprints.md` to understand the sprint's exact scope and exit criteria.
3. Do not implement outside the sprint's scope — additions go into a new sprint.
4. If a spec is incomplete or wrong, **update the spec first** (in the same PR), then implement.

Spec files are living documents. They should reflect what actually shipped, not the original aspirations.

---

## 8. Adding a New Feature

If you are adding a feature not already in `docs/_spec/`:

1. Add a new folder `docs/_spec/<NN-new-feature>/`.
2. Write `spec.md` using the template from `letter.md` Section 5.
3. Write `sprints.md` decomposing the spec into ordered sprints.
4. Update `docs/_spec/00-overview.md` to reference the new spec.
5. Update `docs/architecture.md` if new patterns or modules are introduced.
6. Open a PR with only the spec files for review before writing any implementation code.

---

## 9. Security Policy

- **Never commit secrets.** `.env` and `.env.local` are in `.gitignore`. Use `.env.example` to document required variables.
- **No `@ts-ignore` or `as any`** on user-controlled input. Use Zod validation.
- **All user input is sanitized** (`src/lib/security/sanitize.ts`) before persistence or AI model submission.
- **Report vulnerabilities** by emailing `jg847@njit.edu` rather than opening a public issue.

---

## 10. Code Style

- **TypeScript strict mode.** `strict: true`, `noUncheckedIndexedAccess: true`. No `any`. ESLint will fail the build.
- **No `console.log` in `src/`.** Use `src/lib/logger/` exclusively. ESLint `no-console: error` is enforced.
- **Formatting.** Prettier runs automatically on staged files via Husky. Config: `.prettierrc.mjs` (single quotes, no semicolons, trailing commas).
- **Import order.** Node built-ins → third-party → internal (`@/...`) — enforced by ESLint import plugin.
- **File naming.** `kebab-case.ts` for all files. PascalCase only for React component files (`Button.tsx`).
- **Test file naming.** `<subject>.test.ts` for unit/integration, `<subject>.spec.ts` for Playwright E2E.
