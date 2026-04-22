# Sprints — Spec 11: Observability, Security Hardening & Rate Limiting

> **Status:** 🔜 Not started — cross-cutting; should be layered in early (ideal: alongside Spec 02 or Spec 03)

---

## Sprint 11-A — Structured logging + request IDs

**Status:** 🔜 Not started  
**Scope:** Pino logger singleton, request-ID middleware, log context propagation.

**Files touched:**

- `src/lib/logger/index.ts` — `createLogger(requestId?)` returns pino instance
- `src/lib/logger/middleware.ts` — `requestIdMiddleware(req): { requestId, logger }`
- `src/middleware.ts` — wire `requestIdMiddleware` to all routes
- `.env.example` — add `LOG_LEVEL=info`

**Implementation notes:**

- Use `AsyncLocalStorage` (Node built-in) to propagate `logger` and `requestId` through a request without prop-drilling.
- In development: `pino-pretty` transport with `colorize: true`.
- In production: plain JSON to stdout.
- ESLint rule: add `"no-console": "error"` under `rules` in `eslint.config.mjs` (only for `src/**`).

**Tests added:**

- `tests/unit/lib/logger/index.test.ts`
- `tests/integration/middleware/request-id.test.ts`

**Entry criteria:** Phase 0 complete.  
**Exit criteria:** Every test request returns `x-request-id`; log lines contain `requestId` field.

---

## Sprint 11-B — Security headers + CSRF

**Status:** 🔜 Not started  
**Scope:** All HTTP security headers, CSRF origin check, cookie flags verified.

**Files touched:**

- `src/lib/security/headers.ts` — `buildSecurityHeaders(): Record<string, string>`
- `src/lib/security/csrf.ts` — `validateOrigin(req): boolean`
- `src/middleware.ts` — apply `securityHeadersMiddleware` and `csrfMiddleware`
- `next.config.ts` — `headers()` async config for static pages

**Implementation notes:**

- CSP: use `nonce`-based approach (generate per-request); include `'self'`, Vercel/Fly CDN, `data:` for images.
- HSTS: only set when `process.env["NODE_ENV"] === "production"`.
- CSRF: compare `new URL(req.headers.get('origin') ?? '').origin` against `process.env["NEXT_PUBLIC_APP_URL"]`. Skip for GET/HEAD/OPTIONS.
- Auth.js already sets `SameSite=Lax; HttpOnly` — confirm in integration test.

**Tests added:**

- `tests/unit/lib/security/headers.test.ts`
- `tests/unit/lib/security/csrf.test.ts`
- `tests/integration/middleware/security-headers.test.ts`

**Entry criteria:** Sprint 11-A complete.  
**Exit criteria:** T-04, T-05, T-09 pass; `curl -I` on health endpoint shows all headers.

---

## Sprint 11-C — Rate limiting (SQLite-backed)

**Status:** 🔜 Not started  
**Scope:** `RateLimit` Prisma model, rate-limit middleware, 429 response handling.

**Files touched:**

- `prisma/migrations/<ts>_rate_limit/`
- `src/lib/rate-limit/index.ts` — `checkRateLimit(key, limit, windowMs)`
- `src/lib/rate-limit/middleware.ts` — `rateLimitMiddleware(req, key, opts)`
- `src/app/api/generate/route.ts` — apply rate-limit middleware (guest path)
- `src/components/ui/RateLimitBanner.tsx` — user-facing 429 message

**Implementation notes:**

- Window = calendar day (midnight UTC). Key = `guest:generate:<ip>`.
- Upsert `RateLimit` row in a single query:
  ```sql
  INSERT INTO RateLimit (key, count, windowEnd)
  VALUES (?, 1, ?)
  ON CONFLICT(key) DO UPDATE SET count = count + 1
  WHERE windowEnd > CURRENT_TIMESTAMP;
  ```
  Clear expired rows on startup (boot.ts).
- Return `Retry-After: <seconds-until-midnight>` in the 429 response.

**Tests added:**

- `tests/unit/lib/rate-limit/index.test.ts`
- `tests/integration/middleware/rate-limit.test.ts`

**Entry criteria:** Sprint 11-B complete.  
**Exit criteria:** T-03, T-06, T-07 pass; guest 4th request returns 429 + Retry-After.

---

## Sprint 11-D — Input sanitization + error handler + Sentry + E2E

**Status:** 🔜 Not started  
**Scope:** `sanitizeInput`, global error handler, Sentry wiring, E2E tests.

**Files touched:**

- `src/lib/security/sanitize.ts` — `sanitizeInput(str: string): string`
- `src/app/global-error.tsx` — Next.js global error boundary
- `src/lib/errors/handler.ts` — `handleApiError(err, requestId): Response`
- `src/lib/errors/sentry.ts` — `captureError(err, context)` (no-op if no `SENTRY_DSN`)
- `.env.example` — add `SENTRY_DSN=`
- `tests/e2e/observability/security-headers.spec.ts`

**Implementation notes:**

- `sanitizeInput`: use `DOMParser` (Node 18+) or a simple regex strip of `<[^>]*>` tags + null-byte removal. No external sanitization library needed for MVP.
- Global error handler returns the standard error JSON shape (see spec Section 6).
- Sentry: `import * as Sentry from '@sentry/nextjs'` — only initializes if `SENTRY_DSN` is defined.
- Install `@sentry/nextjs` as optional production dep. Add `"@sentry/nextjs": "optional"` or guard import.

**Tests added:**

- `tests/unit/lib/security/sanitize.test.ts`
- `tests/unit/lib/errors/handler.test.ts`
- `tests/e2e/observability/security-headers.spec.ts` — T-10 and T-11

**Entry criteria:** Sprint 11-C complete.  
**Exit criteria:** All T-01 through T-11 pass; Definition of Done checklist satisfied.
