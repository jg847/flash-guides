# Coding Agent Brief: FlashGuides

**From:** Jeanpaul (jg847@njit.edu)
**Date:** April 21, 2026
**Subject:** Full build specification, workflow, quality bar, and deliverables

---

## 1. What you are building

**FlashGuides** is a web application whose homepage is an AI chatbot that generates interactive study-guide webpages on demand. A registered user can prompt the bot in three ways:

1. **Topic prompt** — e.g., "Tell me about the blue-ringed octopus."
2. **Pasted text** — a large block of informative text to summarize and structure.
3. **URL or YouTube link** — a source the bot fetches, parses, and transforms.

From any of these inputs the bot produces a **single, aesthetically pleasing, interactive study-guide page** that includes: a hero section, auto-generated table of contents, formatted sections, inline media (images, diagrams, embedded video where relevant), flashcards, inline quizzes, highlight-to-note, and a follow-up chat anchored to the page.

The app must clearly differentiate guest vs. registered experiences, support full account management, and deploy via Docker.

---

## 2. Locked technology decisions

Do not deviate from these without raising a blocker first.

| Layer | Choice |
|---|---|
| Language | TypeScript (strict mode) |
| Framework | Next.js 14+ (App Router, Server Components) |
| UI | React + Tailwind CSS + shadcn/ui |
| AI client | Vercel AI SDK (`ai`) + `@anthropic-ai/sdk` |
| MCP | `@modelcontextprotocol/sdk` |
| MCP — Web Search | Tavily API (`@tavily/core`) |
| MCP — Image Generation | fal.ai FLUX (`@fal-ai/client`) |
| MCP — YouTube Transcripts | `youtube-transcript` npm package |
| Auth | Auth.js (NextAuth v5) — email/password + Google OAuth |
| Database | **SQLite** (WAL mode, volume-mounted) |
| ORM | Prisma |
| Validation | Zod |
| Content | MDX (`next-mdx-remote` or similar) |
| Object storage | MinIO (S3-compatible, Docker) |
| Dev email | Mailhog (Docker) |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Testing | Vitest + React Testing Library + Playwright + MSW |
| Lint/Format | ESLint + Prettier + Husky + lint-staged |

---

## 3. Your workflow

Execute in this exact order. **Do not begin implementation before specs and sprint plans exist.**

### Phase 0 — Repo bootstrap
Initialize the repository with all infrastructure (Section 4) before writing feature code.

### Phase 1 — Author feature specs
Create a `docs/_spec/` folder and produce one spec file per feature listed in Section 7. Each spec is a self-contained requirements document. Template in Section 5.

### Phase 2 — Break each spec into sprints
For every spec, produce a sibling file `docs/_spec/<feature>/sprints.md` that decomposes the spec into ordered sprints. Each sprint has a focused scope (1–3 days of work), explicit entry/exit criteria, file-level implementation notes, and the tests that gate the sprint's completion.

### Phase 3 — Implement sprint by sprint
For each sprint: implement, write tests, pass CI, open a PR, merge, update the sprint doc's status. Never start a sprint whose dependencies are incomplete.

### Phase 4 — Verify MVP completeness
Every feature must meet its Definition of Done (Section 8) before the project is considered MVP-complete.

---

## 4. Repo & infrastructure setup (Phase 0)

Before authoring specs, set the repository up as follows.

### Expected top-level layout

```
flashguides/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── docker.yml
├── docs/
│   ├── _spec/
│   │   ├── 00-overview.md
│   │   ├── 01-infrastructure/
│   │   │   ├── spec.md
│   │   │   └── sprints.md
│   │   ├── 02-authentication/
│   │   ├── 03-chat-homepage/
│   │   ├── ... (one folder per feature)
│   ├── architecture.md
│   ├── testing-strategy.md
│   └── contributing.md
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # Shared UI
│   ├── lib/
│   │   ├── ai/                 # Claude + Vercel AI SDK
│   │   ├── mcp/                # MCP clients (factory + adapters)
│   │   ├── auth/
│   │   ├── db/                 # Prisma client + repositories
│   │   ├── study-modes/        # Strategy implementations
│   │   ├── generation/         # Guide builders, template methods
│   │   └── utils/
│   ├── server/                 # API route handlers, middleware
│   └── types/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   └── export-source.ts        # CLI from Section 9
├── exports/                    # output of export-source (gitignored)
├── data/                       # SQLite DB + backups (gitignored, volume-mounted)
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

### Docker

- Multi-stage `Dockerfile` (deps → build → runner). Final image < 200MB.
- `docker-compose.yml` with services: `web`, `minio`, `mailhog`.
- Named volume `flashguides_data` mounted at `/data` for `app.db` + `backups/`.
- Healthchecks on every service.
- Dev and prod compose overrides (`docker-compose.override.yml` for dev hot-reload).

### SQLite tuning

On first app boot, run:
```
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;
PRAGMA temp_store = MEMORY;
```
Ship a small nightly backup script (`sqlite3 .backup`) that drops timestamped copies to `/data/backups/` and prunes anything older than 14 days.

### GitHub Actions

Two workflows at minimum.

`ci.yml` runs on every push and PR:
- `pnpm install` (cached)
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:unit`
- `pnpm test:integration`
- `pnpm build`
- `pnpm test:e2e` (Playwright, against the built app, matrix: chromium + firefox)
- Upload coverage report as artifact

`docker.yml` runs on push to `main`:
- Build and tag Docker image
- Push to GHCR
- Tag with commit SHA and `latest`
- Deploy to **Fly.io** via `flyctl deploy --image ghcr.io/<org>/flashguides:<sha>` (requires `FLY_API_TOKEN` secret in the repo). Ship a `fly.toml` in the repo root targeting the same named volume for `/data`.

### Local quality gates

- Husky `pre-commit` → lint-staged (Prettier + ESLint on staged files)
- Husky `pre-push` → `pnpm typecheck && pnpm test:unit`
- Commitlint with conventional commits

### Environment variables

Publish a complete `.env.example` covering: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ANTHROPIC_API_KEY`, `TAVILY_API_KEY`, `FAL_API_KEY`, `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `SMTP_*`, `FLY_API_TOKEN` (CI only — do not commit).

---

## 5. Spec document template

Every spec in `docs/_spec/<NN-feature>/spec.md` must include these sections in this order:

1. **Feature summary** — one paragraph.
2. **User stories** — in the form "As a [role], I want [capability] so that [outcome]." Numbered.
3. **Acceptance criteria** — Given/When/Then, mapped back to user story numbers.
4. **UX notes** — wireframe sketch or description, key interactions, empty states, loading states, error states.
5. **Data model** — Prisma models touched or added.
6. **API contracts** — route paths, methods, request/response Zod schemas, auth requirements.
7. **Dependencies** — other specs that must ship first.
8. **Out of scope** — explicit non-goals.
9. **Test plan** — the table in Section 6.
10. **Definition of Done** — instantiated from Section 8.

The sibling `sprints.md` lists sprints in order, each with: title, scope, files touched, implementation notes, tests added, entry/exit criteria, status.

---

## 6. Testing requirements

Testing is not optional. Every spec's test plan must table tests across three axes.

### Test taxonomy

| Type | Tool | Scope |
|---|---|---|
| Unit | Vitest | Pure functions, classes, hooks, utilities |
| Integration | Vitest + test SQLite | API routes, DB repositories, MCP client adapters with mocked network |
| E2E | Playwright | User-level flows in a real browser against the built app |
| Component | Vitest + RTL | Rendering, accessibility, keyboard nav for UI components |

### Case coverage — required for every feature

For each feature, the spec's test plan must enumerate at least:

**Positive cases**
- Happy path for each user story.
- Boundary values that are still valid (min/max length inputs, exactly one item, etc.).

**Negative cases**
- Invalid inputs → correct error responses.
- Unauthenticated access to protected routes → redirect/401.
- Unauthorized access to another user's resource → 403.
- Rate-limit exceeded → 429.
- External service failure (Claude down, MCP tool 500, network timeout) → graceful degradation.

**Edge cases**
- Empty states (zero guides, zero results).
- Very large inputs (50k-character text paste, 20MB page scrape).
- Non-English / unicode / RTL text.
- Concurrent operations (two tabs generating at once).
- Partial failures mid-stream (LLM stream dropped halfway).
- Session expiry during long generation.
- Malformed URLs, blocked domains, paywalled pages.
- Quota boundaries (exactly at the guest limit).

### Required test-plan table in every spec

Use this exact structure:

| # | Type | Category | Description | Given / When / Then |
|---|---|---|---|---|

### Rate limits (locked)

| Tier | Guide generations | Notes |
|---|---|---|
| Guest (unauthenticated) | 3 per day (IP-based) | Guides are watermarked; not saved to any account |
| Registered user | Unlimited | Persisted to account |

Enforce at the `GenerationOrchestrator` layer and return HTTP 429 with a `Retry-After` header when exceeded.

### Coverage targets (CI-enforced)

- **Lines:** ≥ 85% overall, ≥ 90% on `src/lib/**`
- **Branches:** ≥ 80%
- Critical paths (auth, generation orchestration, payments if added) → 100% of branches covered.

### Mocking policy

- External HTTP is always mocked in unit/integration tests via MSW.
- LLM responses are mocked with deterministic fixtures in unit tests; a small set of E2E tests may hit a recorded cassette (e.g., with `polly` or VCR-style fixtures) — never live network in CI.

---

## 7. Features to spec

Author one spec folder per item below, numbered `01`–`11` matching the order.

1. **Infrastructure & Project Setup** — Phase 0 output, committed as a spec for traceability.
2. **Authentication & Session Management** — email/password signup, login, logout, email verification, password reset, Google OAuth, session middleware, protected-route helpers.
3. **Guest vs. Registered Experience** — gating strategy, guest quota (3 watermarked previews/day, registered users: unlimited), signup CTAs, public/featured gallery browsing.
4. **Chat Homepage & Generation Orchestrator** — prompt box with three input modes, streaming UI, study-mode selector (Overview / Deep-dive / Exam-prep / ELI5), Claude call pipeline, guide persistence on completion.
5. **MCP Tool Integrations** — client factory, adapters for: **Web Fetch** (direct HTTP via `fetch`), **Web Search** (Tavily API via `@tavily/core`), **Image Generation** (fal.ai FLUX via `@fal-ai/client`), **YouTube Transcripts** (`youtube-transcript` npm package). Unified error handling, timeouts, retries.
6. **Study Guide Renderer** — MDX-based page with auto TOC, collapsible sections, hero media, inline images, embedded YouTube, flashcards, inline quizzes, highlight-to-note, page-level follow-up chat, reading progress, dark/light mode.
7. **User Dashboard** — grid/list of saved guides, tags, folders, full-text search (SQLite FTS5), favorites, recent, usage meter.
8. **Account Management** — profile edit, change email (with re-verification), change password, connected accounts, data export (zip of Markdown + JSON), account deletion.
9. **Sharing & Export** — public share links with revocation, fork action, export to PDF, Markdown, and single-file HTML.
10. **CLI: Source Export Tool** — Section 9.
11. **Observability & Hardening** — structured logging (pino), request IDs, error tracking hook-point (Sentry-compatible), rate limiting, input sanitization, CSP headers, CSRF protection where applicable.

---

## 8. Code quality bar

### SOLID — applied concretely

- **Single Responsibility:** One module, one reason to change. `AuthService`, `GuideRepository`, `ClaudeClient`, `MCPRegistry`, `GuideRenderer` are separate. No 500-line "do everything" files.
- **Open/Closed:** Adding a new study mode or MCP tool must not modify existing code — only add a new class that implements the relevant interface and register it.
- **Liskov Substitution:** Every `IMCPClient` implementation must be swappable without breaking callers. Enforce with interface tests run against every implementation.
- **Interface Segregation:** Small, focused interfaces: `IGuideReader` vs. `IGuideWriter` rather than one fat `IGuideRepository`.
- **Dependency Inversion:** High-level code depends on interfaces; concrete classes are wired at the composition root (`src/lib/container.ts` or equivalent). No `new ClaudeClient()` inside business logic.

### Gang of Four — the patterns to use (and where)

- **Strategy** — Study modes (`OverviewStrategy`, `DeepDiveStrategy`, `ExamPrepStrategy`, `ELI5Strategy`) implementing a common `IStudyModeStrategy`.
- **Factory** — `MCPClientFactory` returns the right client for a given tool name.
- **Adapter** — Wrap external SDKs (Anthropic, Google OAuth, each MCP server) behind internal interfaces so they are mockable and swappable.
- **Repository** — `GuideRepository`, `UserRepository`, etc., over Prisma, each behind an interface.
- **Template Method** — `BaseGuideGenerator` with abstract hooks (`planSections`, `enrichWithMedia`, `buildQuizzes`) overridden per study mode.
- **Builder** — `GuideBuilder` assembles the final structured output (hero → TOC → sections → quizzes → flashcards).
- **Facade** — `GenerationOrchestrator` fronts the whole pipeline (auth check → quota check → MCP setup → streaming → persistence → notifications).
- **Observer / Pub-Sub** — Token streaming from Claude fans out to the HTTP response and any telemetry subscribers.
- **Chain of Responsibility** — Request middleware chain (auth → rate limit → validation → handler).
- **Command** — The CLI export tool and any background job actions.
- **Decorator** — Logging, timing, and retry wrappers around MCP clients.

Every pattern used must be documented in `docs/architecture.md` with the class it lives in and why it was chosen.

### Other non-negotiables

- TypeScript `strict: true`, `noUncheckedIndexedAccess: true`.
- No `any`. `unknown` allowed with narrowing. ESLint rule enforced.
- Zod at every trust boundary (request bodies, env vars, LLM outputs, MCP responses).
- Conventional commits.
- No secrets in the repo.
- All user input sanitized before rendering.

### Definition of Done (per feature)

A feature is only "done" when **all** of the following are true:

1. Spec exists in `docs/_spec/` and is up to date with what shipped.
2. All user stories have passing acceptance tests.
3. Positive, negative, and edge cases from the spec's test plan are implemented and passing.
4. Unit + integration + E2E coverage meets Section 6 targets.
5. `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass locally and in CI.
6. Manual smoke test of the happy path in Docker Compose succeeds.
7. No `TODO`, `FIXME`, or `@ts-ignore` in the shipped code for that feature without a linked issue.
8. `docs/architecture.md` updated if any new patterns or modules were introduced.
9. PR reviewed (even self-review with checklist) and squash-merged to `main`.

"MVP level" means every item in Section 7 meets this Definition of Done, the three-mode chat flow works end-to-end for a real user, and the app can be brought up cold on a clean machine via `docker compose up`.

---

## 9. CLI: source export tool

Implement `scripts/export-source.ts`, exposed as:

```
pnpm export:source [options]
```

### Behavior

- Walks the repo and writes **all source code and tests** into a single concatenated file at `exports/<YYYY-MM-DD-HH-mm>-codebase.md`.
- Format: a table of contents at the top (relative paths, clickable anchors), then each file preceded by a clear delimiter header including the full relative path, followed by a fenced code block with the correct language tag inferred from extension.
- Ends with a summary: total files, total lines of code, lines of test code, breakdown by top-level folder.

### Flags

- `--no-tests` — exclude anything under `tests/` or matching `*.test.*` / `*.spec.*`.
- `--only-tests` — include only test files.
- `--format=md|txt` — Markdown (default) or plain text with `===` delimiters.
- `--include=<glob>` / `--exclude=<glob>` — repeatable overrides.
- `--output=<path>` — override default output path.
- `--stdout` — write to stdout instead of a file.

### Always-excluded

`node_modules/`, `.next/`, `dist/`, `build/`, `coverage/`, `.git/`, `exports/`, `data/`, lockfiles, binary assets (images, fonts, PDFs, `.db`, `.sqlite`), anything matched by `.gitignore`, any file containing the string `ANTHROPIC_API_KEY=` or similar secret patterns (defense in depth).

### Tests

Unit-test the file walker, glob filters, redaction, and output formatter. An E2E test runs the CLI against a fixture repo and asserts the output contents.

---

## 10. Milestone sequencing (suggested)

Ship in this order so the app is always demoable:

1. Phase 0 infra (Section 4) → green CI from day one.
2. Spec 02 Auth → users can sign up and log in.
3. Spec 03 Guest vs. Registered → gating in place.
4. Spec 04 Chat + Spec 05 MCP (minimal: web fetch only) → end-to-end generation works.
5. Spec 06 Renderer → pages are beautiful and interactive.
6. Spec 07 Dashboard + Spec 08 Account → users can manage their work.
7. Spec 05 extensions: Web Search, Image Gen, YouTube.
8. Spec 09 Sharing & Export.
9. Spec 10 CLI export tool (can ship earlier if convenient for review).
10. Spec 11 Observability & Hardening.

---

## 11. What I expect back from you first

Before writing any application code beyond Phase 0, reply with:

1. Confirmation that the repo is bootstrapped per Section 4 (link to the initial commit).
2. The full set of spec files under `docs/_spec/` per the template in Section 5.
3. For each spec, its `sprints.md` file.
4. A one-page `docs/architecture.md` describing the composition root, how SOLID and the GoF patterns in Section 8 map to folders and classes, and how dependency injection is wired.
5. A green CI run on the initial PR.

Only after I've reviewed those may you begin Sprint 1 of Spec 02.

---

## 12. How to ask me questions

If any requirement is ambiguous or you believe a locked decision should change, open an issue titled `RFC: <topic>` with:
- The ambiguity or proposed change
- Options considered with trade-offs
- Your recommendation

Do not silently deviate from this brief. Do not guess on security, auth, or data-model decisions — ask.

Thank you. Build something I'd be proud to hand to a classmate on the night before finals.

— Jeanpaul