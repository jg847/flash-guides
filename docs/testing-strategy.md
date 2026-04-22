# Testing Strategy

> **Applies to:** All phases and features  
> **Coverage targets are CI-enforced** — builds fail if thresholds are not met

---

## 1. Philosophy

Tests are first-class citizens. Every feature ships with tests as part of the same PR. No feature is "done" without green tests (see Definition of Done in `docs/_spec/`).

The goal is **confidence**, not coverage theater. Tests must exercise real behavior: real database queries (against a test SQLite DB), real HTTP handlers, real React component rendering. Mocks are used only at the system boundary (external network calls → MSW; third-party SDKs → fakes via constructor injection).

---

## 2. Test Taxonomy

| Type        | Tool                 | Scope                                         | Database                              | Network            |
| ----------- | -------------------- | --------------------------------------------- | ------------------------------------- | ------------------ |
| Unit        | Vitest               | Pure functions, classes, hooks, utilities     | In-memory / mocked                    | Mocked via MSW     |
| Integration | Vitest + test SQLite | API routes, DB repositories, MCP adapters     | Real SQLite (`:memory:` or temp file) | Mocked via MSW     |
| Component   | Vitest + RTL         | React component rendering, a11y, keyboard nav | None                                  | Mocked via MSW     |
| E2E         | Playwright           | Full user flows in a real browser             | Real app DB                           | Real (or cassette) |

---

## 3. Project Setup

### Vitest

Config: `vitest.config.ts`

```ts
coverage: {
  thresholds: { lines: 85, branches: 80 }
  include: ['src/**'],
  exclude: ['src/generated/**', 'src/types/**']
}
```

`src/lib/**` has a higher target enforced via `coverageThresholds` per-folder (90% lines).

The test setup file at `tests/setup.ts`:

- Imports `@testing-library/jest-dom` matchers
- Starts the MSW server before all tests, resets handlers between tests, closes after all tests

### Playwright

Config: `playwright.config.ts`

- Projects: `chromium`, `firefox`
- `webServer`: runs `pnpm build && pnpm start` on `localhost:3000`
- Tests in `tests/e2e/`
- Reports: HTML (artifact in CI), JUnit (for CI summary)

---

## 4. Directory Structure

```
tests/
├── setup.ts                  # Global Vitest setup (MSW, jest-dom)
├── mocks/
│   ├── server.ts             # MSW setupServer()
│   └── handlers/             # One file per external service
│       ├── claude.ts
│       ├── tavily.ts
│       ├── fal-ai.ts
│       └── youtube.ts
├── fixtures/
│   ├── guides.ts             # Reusable Prisma test fixtures (factory functions)
│   ├── users.ts
│   └── llm-responses/        # Deterministic LLM response JSON files
├── unit/
│   └── lib/                  # Mirror of src/lib/ structure
├── integration/
│   ├── api/                  # API route tests
│   └── lib/                  # Repository + service integration tests
├── component/
│   └── components/           # Mirror of src/components/ structure
└── e2e/
    ├── auth/
    ├── generate/
    ├── dashboard/
    ├── sharing/
    ├── account/
    └── observability/
```

---

## 5. Required Test Coverage Per Feature

For every spec, the test plan must enumerate tests across three axes:

### Positive Cases (happy path)

- Each user story's happy path.
- Boundary values that are still valid: minimum/maximum input lengths, exactly one item in a list.

### Negative Cases (defensive)

- Invalid inputs → correct error shape and status code.
- Unauthenticated access to protected routes → redirect or 401.
- Unauthorized access to another user's resource → 403.
- Rate-limit exceeded → 429 with `Retry-After` header.
- External service failure (Claude 500, MCP tool timeout) → graceful degradation.

### Edge Cases

- Empty states: zero guides, zero search results, empty tags.
- Very large inputs: 50k-character text paste, 20 MB page scrape.
- Non-English / Unicode / RTL text.
- Concurrent operations: two tabs generating at once.
- Partial failures mid-stream: LLM stream dropped halfway.
- Session expiry during long generation.
- Malformed URLs, blocked domains, paywalled pages.
- Quota boundaries: exactly at the guest limit.

---

## 6. Mocking Policy

| Boundary                                        | Approach                                                   | Tool             |
| ----------------------------------------------- | ---------------------------------------------------------- | ---------------- |
| External HTTP (Claude, Tavily, fal.ai, YouTube) | Intercept at network layer                                 | MSW (`msw/node`) |
| MinIO (S3)                                      | MSW or AWS SDK mock transport                              | MSW              |
| SMTP / email                                    | Mailhog in integration tests; in-memory mock in unit tests | Mailhog / MSW    |
| Time-sensitive ops (`Date.now`, `new Date()`)   | `vi.setSystemTime()` in Vitest                             | Vitest built-in  |
| File system (export CLI)                        | Real temp dirs via `os.tmpdir()`                           | Node built-in    |

**Rule:** No live network calls in unit or integration tests. Ever.

**LLM fixtures:** Deterministic JSON response fixtures live in `tests/fixtures/llm-responses/`. Vitest tests always use these. E2E tests use Playwright's network interception or a VCR-style cassette (no live Claude calls in CI).

---

## 7. Database Strategy in Tests

- **Unit tests:** No database. Repositories are injected as fakes or objects with mocked methods.
- **Integration tests:** Real SQLite in-memory database (`:memory:`) seeded via factory functions in `tests/fixtures/`. Each test file runs `prisma.$executeRaw('DELETE FROM ...')` or recreates the schema in `beforeEach`.
- **E2E tests:** The real Next.js app uses a separate test SQLite file (`data/test.db`), reset between test runs.

The Prisma client is configured to use `process.env['DATABASE_URL']`. In tests, set `DATABASE_URL=file::memory:?cache=shared` (or a temp file path).

---

## 8. CI Enforcement

The CI workflow (`ci.yml`) enforces:

1. `pnpm typecheck` — zero TypeScript errors
2. `pnpm lint` — zero ESLint errors (no `console.log` in `src/`, no `any`, Prettier formatting)
3. `pnpm test:unit` — Vitest unit + component tests; fails if coverage thresholds are not met
4. `pnpm test:integration` — Vitest integration tests against real SQLite
5. `pnpm build` — Next.js production build succeeds
6. `pnpm test:e2e` — Playwright against built app; runs on chromium and firefox matrix
7. Coverage artifact uploaded + reported on PRs

Build fails if **any** step fails. No exceptions.

---

## 9. Interface Contract Tests

For Liskov Substitution compliance (see `docs/architecture.md` Section 3), each interface has a **shared contract test suite**:

```
tests/unit/lib/mcp/adapters/contract.ts
```

This exports a `runIMCPClientContract(adapter: IMCPClient)` suite. Every adapter test file calls:

```ts
import { runIMCPClientContract } from '../contract'
runIMCPClientContract(new TavilyAdapter(...))
```

This guarantees every implementation satisfies the interface's behavioral contract, not just its type signature.

---

## 10. Key Testing Principles

- **Test behavior, not implementation.** Test what the code _does_, not how it does it.
- **One assertion per test** (where possible). Multiple assertions per test obscure which one failed.
- **Descriptive names.** `it('returns 429 when guest exceeds 3 generations in one day')` is correct. `it('rate limit')` is not.
- **Arrange-Act-Assert.** Every test has a clear setup, one action, and one assertion block.
- **No test interdependence.** Tests must not rely on the execution order or state left by other tests.
- **Fast unit tests.** Unit test suite must run in < 10 seconds. Slow tests are integration tests or are doing too much setup.
