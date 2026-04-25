# Sprints — Spec 11: Observability, Security Hardening & Rate Limiting

> **Status:** 🚧 In progress — Sprints 11-A through 11-C are locally complete, and Sprint 11-D now includes sanitization plus the shared API error-response rollout; app-level error boundaries, Sentry wiring, and remaining E2E coverage are still pending

---

## Sprint 11-A — Structured logging + request IDs

**Status:** ✅ Local slice complete  
**Scope:** Pino logger singleton, request-ID middleware, log context propagation.

**Files touched:**

- `src/lib/logger/index.ts` — `createLogger(requestId?)` returns pino instance
- `src/lib/logger/middleware.ts` — `requestIdMiddleware(req): { requestId, logger }`
- `src/proxy.ts` — wire request IDs into proxy passthrough responses and request headers
- `src/app/api/health/route.ts` — stamp `x-request-id` on the public health endpoint and emit structured health-check logs
- `.env.example` — add `LOG_LEVEL=info`
- `tests/unit/lib/logger/index.test.ts` — verifies request-scoped logger bindings via AsyncLocalStorage

**Implementation notes:**

- Use `AsyncLocalStorage` (Node built-in) to propagate `logger` and `requestId` through a request without prop-drilling.
- In development: `pino-pretty` transport with `colorize: true`.
- In production: plain JSON to stdout.
- Initial slice: `x-request-id` is generated in `src/proxy.ts` for passthrough traffic, forwarded to downstream handlers via request headers, and added explicitly by the health route because it is excluded from the proxy matcher.
- ESLint rule: add `"no-console": "error"` under `rules` in `eslint.config.mjs` (only for `src/**`).

**Tests added:**

- `tests/integration/middleware/request-id.test.ts`

**Entry criteria:** Phase 0 complete.  
**Exit criteria:** Every test request returns `x-request-id`; log lines contain `requestId` field.

---

## Sprint 11-B — Security headers + CSRF

**Status:** ✅ Local slice complete  
**Scope:** All HTTP security headers, CSRF origin check, cookie flags verified.

**Files touched:**

- `src/lib/security/headers.ts` — `buildSecurityHeaders(): Record<string, string>`
- `src/lib/security/csrf.ts` — `validateOrigin(req): boolean`
- `src/lib/security/response.ts` — shared forbidden response for CSRF failures
- `src/proxy.ts` — apply security headers to proxied traffic and reject cross-origin mutating API requests
- `src/app/api/health/route.ts` — apply the same security headers to the public health endpoint
- `src/app/api/auth/[...nextauth]/route.ts` — reject mismatched-origin Auth.js POSTs before delegating
- `src/app/api/auth/register/route.ts`
- `src/app/api/auth/forgot-password/route.ts`
- `src/app/api/auth/reset-password/route.ts`
- `next.config.ts` — `headers()` async config for static pages
- `.env.example` — add `NEXT_PUBLIC_APP_URL`

**Implementation notes:**

- CSP: use `nonce`-based approach (generate per-request); include `'self'`, Vercel/Fly CDN, `data:` for images.
- HSTS: only set when `process.env["NODE_ENV"] === "production"`.
- CSRF: compare `new URL(req.headers.get('origin') ?? '').origin` against `process.env["NEXT_PUBLIC_APP_URL"]`. Skip for GET/HEAD/OPTIONS.
- Initial slice: proxy-enforced CSRF covers mutating `/api/**` traffic except test-only endpoints, and public auth POST routes now enforce the same origin policy directly because Auth.js endpoints are excluded from the proxy matcher.
- Auth.js already sets `SameSite=Lax; HttpOnly` — confirm in integration test.

**Tests added:**

- `tests/unit/lib/security/headers.test.ts`
- `tests/unit/lib/security/csrf.test.ts`
- `tests/integration/middleware/security-headers.test.ts`
- `tests/integration/api/auth/session.test.ts` — confirms Auth.js CSRF cookie flags and POST origin rejection.
- `tests/integration/api/auth/register.test.ts`
- `tests/integration/api/auth/forgot-password.test.ts`
- `tests/integration/api/auth/reset-password.test.ts`

**Entry criteria:** Sprint 11-A complete.  
**Exit criteria:** T-04, T-05, T-09 pass; `curl -I` on health endpoint shows all headers.

---

## Sprint 11-C — Rate limiting (SQLite-backed)

**Status:** ✅ Local slice complete  
**Scope:** `RateLimit` Prisma model, rate-limit middleware, 429 response handling.

**Files touched:**

- `prisma/migrations/<ts>_rate_limit/`
- `src/lib/rate-limit/index.ts` — `checkRateLimit(key, limit, windowMs)`
- `src/lib/rate-limit/middleware.ts` — `rateLimitMiddleware(req, key, opts)`
- `src/app/api/generate/route.ts` — apply rate-limit middleware (guest path)
- `src/components/ui/RateLimitBanner.tsx` — user-facing 429 message
- `src/lib/generation/orchestrator.ts` — skip duplicate guest quota enforcement once the route boundary has already checked it

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
- Initial slice: the existing SQLite-backed guest quota store now feeds `src/lib/rate-limit/index.ts`, and `src/app/api/generate/route.ts` returns a real JSON `429` with `Retry-After` before opening an SSE stream.
- Current implementation choice: keep the existing SQLite-backed `GuestQuota` store as the rate-limit persistence layer and adapt it through `src/lib/rate-limit/*` instead of introducing a second overlapping table mid-stream.

**Tests added:**

- `tests/unit/lib/rate-limit/index.test.ts`
- `tests/unit/lib/rate-limit/middleware.test.ts`
- `tests/integration/api/generate/generate.test.ts` — verifies route-bound `429` behavior and `skipGuestQuotaCheck` orchestration handoff.

**Entry criteria:** Sprint 11-B complete.  
**Exit criteria:** T-03, T-06, T-07, T-12 pass; guest 4th request returns 429 + Retry-After; rate limit window boundary (T-12) handled correctly at exact `windowEnd`.

---

## Sprint 11-D — Input sanitization + error handler + Sentry + E2E

**Status:** 🚧 In progress  
**Scope:** `sanitizeInput`, global error handler, Sentry wiring, E2E tests.

**Files touched:**

- `src/lib/security/sanitize.ts` — `sanitizeInput(str: string): string`
- `src/app/api/generate/route.ts` — sanitize generation input before validation and orchestration
- `src/app/api/notes/route.ts` — sanitize selected text and note content before validation/persistence
- `src/lib/errors/handler.ts` — `handleApiError(err, requestId): Response`
- `src/lib/errors/sentry.ts` — `captureError(err, context)` (no-op if no `SENTRY_DSN`)
- `src/app/global-error.tsx` — Next.js global error boundary (pending)
- `src/lib/errors/sentry.ts` — `captureError(err, context)` (pending, no-op if no `SENTRY_DSN`)
- `.env.example` — add `SENTRY_DSN=`
- `tests/e2e/observability/security-headers.spec.ts`

**Implementation notes:**

- `sanitizeInput`: use `DOMParser` (Node 18+) or a simple regex strip of `<[^>]*>` tags + null-byte removal. No external sanitization library needed for MVP.
- Implemented slice: generation requests and note creation now sanitize string fields before validation, persistence, or AI submission.
- Implemented slice: `src/lib/errors/handler.ts` now provides shared requestId-aware API error responses, and the existing API routes have been migrated off ad hoc `NextResponse.json({ error: ... })` branches.
- Pending slice: Next.js app-level error boundary and Sentry capture wiring still need to be added.
- Pending slice: `@sentry/nextjs` remains optional and should only initialize when `SENTRY_DSN` is defined.

**Tests added:**

- `tests/unit/lib/security/sanitize.test.ts`
- `tests/integration/api/notes/notes.test.ts`
- `tests/integration/api/generate/generate.test.ts`
- `tests/unit/lib/errors/handler.test.ts`
- `tests/integration/api/chat/follow-up-chat.test.ts`
- `tests/integration/api/guides/share.test.ts`
- `tests/integration/api/guides/tags.test.ts`
- `tests/integration/api/guides/export.test.ts`
- `tests/integration/api/guides/fork.test.ts`
- `tests/integration/api/account/avatar.test.ts`
- `tests/integration/api/test/session.test.ts`
- `tests/integration/api/test/reset-quota.test.ts`
- `tests/integration/api/test/seed.test.ts`
- `tests/e2e/observability/security-headers.spec.ts` — T-10 and T-11

**Entry criteria:** Sprint 11-C complete.  
**Exit criteria:** All T-01 through T-12 pass; Definition of Done checklist satisfied. Current remaining work is the app-level error boundary, Sentry integration, and the E2E slice.
