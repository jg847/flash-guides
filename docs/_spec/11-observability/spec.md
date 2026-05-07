# Spec 11 — Observability, Security Hardening & Rate Limiting

> **Phase:** Cross-cutting — applies to every phase  
> **Status:** 🚧 In progress — request IDs, structured logging, security headers, CSRF checks, GuestQuota-backed guest rate limiting, input sanitization, shared API error responses, and app-level error boundaries are implemented

---

## 1. Feature Summary

This spec defines the cross-cutting concerns that must be in place before any feature reaches production:

1. **Structured logging** — pino with request-ID correlation
2. **Rate limiting** — IP-based for guest endpoints, per-user for registered endpoints
3. **Input sanitization** — all unvalidated input sanitized before persistence or AI submission
4. **Security headers** — Content Security Policy, HSTS, and related headers on every response
5. **CSRF protection** — SameSite cookies + CSRF token on state-changing forms
6. **Request tracing** — `x-request-id` propagated through all log lines and API responses

---

## 2. User Stories

| ID    | As a…     | I want to…                                                               | So that…                                                      |
| ----- | --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| US-01 | Operator  | See structured JSON logs with a `requestId` field for every HTTP request | I can trace a user complaint through the logs                 |
| US-02 | Operator  | Know which log lines belong to a single AI generation chain              | I can debug slow or failing AI calls                          |
| US-03 | Operator  | See a rate-limit 429 when a guest exceeds 3 guides/day                   | Abuse is blocked at the API layer before hitting the AI model |
| US-04 | Operator  | See security headers in every HTTP response                              | The app passes a browser security audit                       |
| US-05 | Developer | Have all errors automatically include a `requestId` and stack trace      | Bug reproduction is fast                                      |
| US-06 | Developer | Have unhandled exceptions caught by a global error handler               | The app never exposes raw stack traces to end users           |

---

## 3. Acceptance Criteria

| ID    | Criterion                                                                                                                               |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- |
| OB-01 | Every HTTP request generates a `requestId` (UUID v4); logged + returned as `x-request-id` response header                               |
| OB-02 | Pino logger is the **only** logging utility used in the app (no `console.log` in production code)                                       |
| OB-03 | Log lines are JSON in production (`NODE_ENV=production`), pretty in development                                                         |
| OB-04 | Log level is configurable via `LOG_LEVEL` env var (default: `info`)                                                                     |
| OB-05 | Guest guide generation endpoints enforce 3 requests/day per IP; returns HTTP 429 with `Retry-After` header                              |
| OB-06 | Rate-limit state is stored in SQLite; no Redis dependency                                                                               |
| OB-07 | All text inputs from users are stripped of HTML tags before persisting or passing to the AI model                                       |
| OB-08 | `Content-Security-Policy` header is set to a restrictive policy on all pages                                                            |
| OB-09 | `Strict-Transport-Security` header set when `NODE_ENV=production`                                                                       |
| OB-10 | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` appear on every response |
| OB-11 | Session cookies use `SameSite=Lax; HttpOnly; Secure` (Auth.js default; confirmed active)                                                |
| OB-12 | CSRF: all state-changing API routes validate that `Origin` or `Referer` header matches the app's own domain                             |
| OB-13 | API error responses include `requestId`, `message`, and `code`                                                                          |
| OB-14 | PII (email, password hashes) is NEVER written to logs                                                                                   |

---

## 4. UX Notes

- End users: rate-limit errors (`429`) should render a human-readable message: _"You've created 3 guides today. Sign up for unlimited access!"_
- Developers: running `pnpm dev` streams pretty-printed logs via `pino-pretty` to the terminal.
- Security headers are invisible to users; tested via `curl -I` or browser devtools.

---

## 5. Data Model

Current implementation uses the existing SQLite-backed `GuestQuota` table as the guest rate-limit store and adapts it through `src/lib/rate-limit/*`.

- No Redis dependency.
- No additional Prisma model was required for the current rollout.
- A dedicated `RateLimit` model remains optional future cleanup, not a prerequisite for the shipped behavior.

---

## 6. API Contracts

### Request pipeline — `src/proxy.ts` + route handlers

Cross-cutting behavior currently runs through the Next.js 16 proxy layer plus a small number of route-level helpers:

1. `src/proxy.ts` generates or forwards `x-request-id` for proxied requests.
2. `src/proxy.ts` applies shared security headers to proxied traffic.
3. `src/proxy.ts` rejects mismatched-origin mutating `/api/**` requests, except the intentionally excluded test-only routes and Auth.js surfaces that validate origin in-route.
4. Route handlers such as `/api/health` and the shared API error helper stamp `x-request-id` and security headers when they are outside the proxy matcher or need explicit JSON error shaping.
5. Guest generation rate limiting is enforced at the `/api/generate` route boundary through `src/lib/rate-limit/middleware.ts` before the SSE stream opens.

### Rate-limit error response:

```ts
{ status: 429, code: 'RATE_LIMIT_EXCEEDED', retryAfter: number /* seconds */ }
```

### Error response shape (from shared API error handler):

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "uuid-here"
  }
}
```

Raw `message` is replaced with "An unexpected error occurred" in production for unhandled errors.
Handled route errors preserve their explicit user-facing messages and include the same `requestId` in both the JSON body and `x-request-id` response header.

---

## 7. Dependencies

| Dependency         | Reason                                                    |
| ------------------ | --------------------------------------------------------- |
| `pino`             | Structured logging (already in `package.json`)            |
| `pino-pretty`      | Dev-mode log formatter (already in devDeps)               |
| `uuid` or `crypto` | `randomUUID()` from Node 19+ built-in                     |
| Prisma             | SQLite-backed guest quota storage and rate-limit adapters |

---

## 8. Out of Scope

- Distributed rate limiting (Redis / Upstash) — SQLite-backed is sufficient for single-instance Fly.io deployment
- Full audit trail / event sourcing
- Log aggregation to external services (Datadog, Logtail) — `STDOUT` JSON is sufficient for Fly.io log shipping
- Web Application Firewall (WAF)
- Intrusion detection

---

## 9. Test Plan

| #    | Type        | Category | Description                                                                 | Given / When / Then                                                                             |
| ---- | ----------- | -------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `createLogger(req)` returns pino instance with `requestId` bound in context | Mock request / call / logger has `requestId` field on every log line                            |
| T-02 | Unit        | Positive | `sanitizeInput(str)` strips HTML tags and null bytes                        | String with `<script>`, other HTML, and `\0` / call / all removed, plain text remains           |
| T-03 | Unit        | Positive | `checkRateLimit(ip, window)` returns correct `allowed / count / retryAfter` | IP with count=2 within window / call / `{ allowed: true, count: 3 }`                            |
| T-04 | Unit        | Positive | `buildSecurityHeaders()` returns all required headers with correct values   | Call / result / all OB-08 through OB-10 header names and values present                         |
| T-05 | Integration | Positive | Every route response includes `x-request-id` header                         | GET /api/health / response / `x-request-id` header present, UUID v4 format                      |
| T-06 | Integration | Negative | 4th guest request in same day returns 429 with `Retry-After`                | IP at count=3 within window / POST to generate / 429 + `Retry-After` header                     |
| T-07 | Integration | Positive | Rate limit count resets after `windowEnd` passes                            | IP at count=3, `windowEnd` in past / POST to generate / 200 (new window, count=1)               |
| T-08 | Integration | Positive | Log output contains `requestId` and does NOT contain email address          | Authenticated request / inspect pino log output / `requestId` present, user email absent        |
| T-09 | Integration | Negative | POST from mismatched `Origin` header returns 403 (CSRF check)               | POST with `Origin: https://attacker.com` / request / 403                                        |
| T-10 | E2E         | Positive | `Content-Security-Policy` header visible in browser DevTools on homepage    | Navigate to `/` / DevTools Network tab / CSP header present                                     |
| T-11 | E2E         | Positive | Guest hitting quota sees human-readable rate-limit banner                   | Guest at count=3 / attempt guide generation / "You've created 3 guides today" message shown     |
| T-12 | Integration | Edge     | Rate limit window reset at exact `windowEnd` boundary handled correctly     | IP at count=3, `windowEnd = Date.now()` (within 1 ms margin) / POST / count reset; 200 returned |

---

## 10. Definition of Done

- [ ] All OB-01 through OB-14 criteria have passing tests or manual verification.
- [ ] `curl -I https://localhost:3000` shows all required security headers.
- [ ] No `console.log` in `src/` (enforced by ESLint `no-console` rule under `error`).
- [ ] `pnpm test:unit` and `pnpm test:integration` pass.
- [ ] E2E T-10, T-11, and T-12 green.
- [ ] No TypeScript errors (`pnpm typecheck`).
- [ ] `pnpm lint` passes.
- [ ] Manual smoke test: rate limiting, security headers, and CSRF protection verified against Docker Compose instance.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated with middleware chain and logging patterns.
- [ ] Coverage ≥ 85% on `src/lib/security/**`, `src/lib/rate-limit/**`, and `src/lib/logger/**`.
- [ ] PR squash-merged to `main`.
