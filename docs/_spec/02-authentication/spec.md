# Spec 02 — Authentication & Session Management

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

Authentication & Session Management provides secure identity for all FlashGuides users. It supports email/password signup with email verification, password reset via email, and Google OAuth as an alternative login path. Session state is managed by Auth.js v5 (NextAuth) using the Prisma adapter against the SQLite database. Middleware enforces protected routes server-side. Helper utilities expose the session to Server and Client Components cleanly.

---

## 2. User Stories

1. As a **guest**, I want to create an account with my email and a password so that I can save my guides and access registered features.
2. As a **guest**, I want to sign up / log in with my Google account so that I don't have to manage another password.
3. As a **registered user**, I want to log in with my email and password so that I can access my account.
4. As a **registered user**, I want to log out so that my session is terminated on shared devices.
5. As a **guest**, I want to receive a verification email after signup so that the app confirms I own the address.
6. As a **registered user**, I want to request a password-reset email so that I can regain access if I forget my password.
7. As a **registered user**, I want to reset my password via a secure time-limited link so that my account is protected.
8. As a **developer**, I want a session middleware that gates protected routes so that unauthenticated requests are redirected to `/login`.

---

## 3. Acceptance Criteria

| #     | Story | Given                                                | When                                            | Then                                                                      |
| ----- | ----- | ---------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| AC-01 | US-1  | Valid email + password (≥8 chars, 1 upper, 1 number) | POST `/api/auth/register`                       | 201 response; user row created; verification email sent via Mailhog       |
| AC-02 | US-1  | Email already registered                             | POST `/api/auth/register` with same email       | 409 response; no duplicate row                                            |
| AC-03 | US-1  | Password < 8 chars                                   | POST `/api/auth/register`                       | 422 with field-level error                                                |
| AC-04 | US-2  | Google OAuth flow initiated                          | User completes Google consent                   | Session created; user row upserted; redirect to dashboard                 |
| AC-05 | US-3  | Valid credentials                                    | POST `[...nextauth]/signin`                     | Session cookie set; redirect to dashboard                                 |
| AC-06 | US-3  | Wrong password                                       | POST `[...nextauth]/signin`                     | 401; no session created                                                   |
| AC-07 | US-3  | Unverified email                                     | POST `[...nextauth]/signin` with email/password | 403 with "please verify your email" message                               |
| AC-08 | US-4  | Authenticated user                                   | POST `/api/auth/signout`                        | Session destroyed; cookie cleared; redirect to `/`                        |
| AC-09 | US-5  | User registers                                       | Verification email received                     | Clicking the link sets `emailVerified` and redirects to dashboard         |
| AC-10 | US-5  | Verification link expired (>24h)                     | User clicks old link                            | 410 Gone; prompt to resend                                                |
| AC-11 | US-6  | Registered email submitted                           | POST `/api/auth/forgot-password`                | Reset email sent; 200 regardless of whether email exists (no enumeration) |
| AC-12 | US-7  | Valid reset token (≤1h)                              | POST `/api/auth/reset-password`                 | Password updated; all other sessions invalidated                          |
| AC-13 | US-7  | Expired / invalid token                              | POST `/api/auth/reset-password`                 | 410 response                                                              |
| AC-14 | US-8  | Unauthenticated request                              | Any protected route accessed                    | 302 redirect to `/login?callbackUrl=<original>`                           |
| AC-15 | US-8  | Authenticated request                                | Protected route accessed                        | Request proceeds normally                                                 |

---

## 4. UX Notes

### Pages

- **`/login`** — Email/password form + "Continue with Google" button. Link to `/register` and `/forgot-password`.
- **`/register`** — Email + password + confirm-password fields. Shows inline validation. On success shows "Check your email" banner.
- **`/verify-email`** — Token validation page. Shows success or error state.
- **`/forgot-password`** — Email field only. Shows generic success message always (no enumeration).
- **`/reset-password?token=...`** — New password + confirm-password. Token validated server-side on load; shows expiry error if invalid.

### Loading states

Each form shows a spinner on the submit button while the request is in-flight.

### Error states

- Field-level errors shown below the input (red text).
- Server errors shown in a top-of-form alert banner.
- OAuth errors (e.g., account already exists with different provider) shown as a banner on `/login`.

### Empty states

N/A — all pages show a form.

---

## 5. Data Model

Uses the Auth.js standard models already in `prisma/schema.prisma`:

- `User` — adds `password` (hashed, nullable), `emailVerified`
- `Account` — OAuth provider links
- `Session` — active session tokens
- `VerificationToken` — email verify + password reset tokens

Password hashing: **bcrypt** (`bcryptjs`, cost factor 12).

---

## 6. API Contracts

### `POST /api/auth/register`

No auth required.

**Request body (Zod):**

```ts
z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  name: z.string().min(1).max(100).optional(),
})
```

**Response 201:** `{ message: "Verification email sent" }`  
**Response 409:** `{ error: "Email already registered" }`  
**Response 422:** `{ error: "Validation failed", fields: { ... } }`

---

### `POST /api/auth/forgot-password`

No auth required.

**Request body:**

```ts
z.object({ email: z.string().email() })
```

**Response 200:** `{ message: "If that email exists, a reset link has been sent" }`

---

### `POST /api/auth/reset-password`

No auth required.

**Request body:**

```ts
z.object({
  token: z.string(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
})
```

**Response 200:** `{ message: "Password updated" }`  
**Response 410:** `{ error: "Token expired or invalid" }`

---

### Auth.js routes

Standard routes via `app/api/auth/[...nextauth]/route.ts`:

- `GET/POST /api/auth/signin`
- `GET/POST /api/auth/signout`
- `GET /api/auth/session`
- `GET /api/auth/callback/google`
- `GET /api/auth/csrf`

---

### `src/lib/auth/middleware.ts`

Exported `authMiddleware` matched on `matcher` in `middleware.ts`. Reads session from JWT; redirects to `/login?callbackUrl=<path>` if not authenticated.

---

## 7. Dependencies

- Spec 01 (Infrastructure) — Prisma schema, email (Mailhog), env vars.

---

## 8. Out of Scope

- Multi-factor authentication (MFA).
- SSO / enterprise SAML.
- Magic-link / passwordless login.
- Admin user management.
- Rate limiting on auth endpoints (covered in Spec 11).

---

## 9. Test Plan

| #    | Type        | Category | Description                                               | Given / When / Then                                                      |
| ---- | ----------- | -------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| T-01 | Unit        | Positive | Password hashing produces a bcrypt hash                   | Plain password / `hashPassword()` / returns `$2b$` prefixed string       |
| T-02 | Unit        | Positive | `verifyPassword` returns true for correct password        | Hash + correct plain / `verifyPassword()` / `true`                       |
| T-03 | Unit        | Negative | `verifyPassword` returns false for wrong password         | Hash + wrong plain / `verifyPassword()` / `false`                        |
| T-04 | Unit        | Positive | Registration Zod schema passes valid input                | Valid data / `parse()` / no error                                        |
| T-05 | Unit        | Negative | Registration schema rejects weak password                 | 7-char password / `parse()` / ZodError                                   |
| T-06 | Integration | Positive | `POST /api/auth/register` creates user and sends email    | Test DB + Mailhog mock / valid payload / 201 + user in DB + email queued |
| T-07 | Integration | Negative | `POST /api/auth/register` returns 409 for duplicate email | Existing user / same email / 409                                         |
| T-08 | Integration | Positive | Email verification token marks user as verified           | Valid token in DB / GET verify link / `emailVerified` set                |
| T-09 | Integration | Negative | Expired verification token returns 410                    | Token with past expiry / GET verify link / 410                           |
| T-10 | Integration | Positive | `POST /api/auth/forgot-password` always returns 200       | Unknown email / request / 200 (no enumeration)                           |
| T-11 | Integration | Positive | `POST /api/auth/reset-password` updates password          | Valid token / new password / 200 + password changed                      |
| T-12 | Integration | Negative | `POST /api/auth/reset-password` rejects expired token     | Expired token / request / 410                                            |
| T-13 | Integration | Negative | Login with unverified email returns 403                   | Unverified user / signin / 403                                           |
| T-14 | Integration | Negative | Protected route redirects unauthenticated user            | No session / GET /dashboard / 302 to /login                              |
| T-15 | E2E         | Positive | Full signup → verify → login flow                         | Browser / complete flow / user lands on dashboard                        |
| T-16 | E2E         | Positive | Google OAuth login creates session                        | Mock OAuth / complete flow / session created                             |
| T-17 | E2E         | Positive | Forgot password → reset flow                              | Browser / complete reset flow / login succeeds with new password         |
| T-18 | E2E         | Positive | Logout destroys session                                   | Logged-in user / click logout / session gone, redirected to `/`          |
| T-19 | Component   | Positive | Login form renders all fields and submit button           | Mount LoginForm / render / all elements present                          |
| T-20 | Component   | Negative | Login form shows error state on server error              | Simulate server 401 / render / error banner visible                      |

---

## 10. Definition of Done

- [ ] All Auth.js routes functional (email/password + Google OAuth).
- [ ] Email verification flow works end-to-end against Mailhog in Docker.
- [ ] Password reset flow works end-to-end.
- [ ] Session middleware gates all `/dashboard/*` and `/guide/*` routes.
- [ ] `pnpm test:unit` + `pnpm test:integration` + `pnpm test:e2e` all pass.
- [ ] Coverage ≥ 90% on `src/lib/auth/**`.
- [ ] No plain-text passwords anywhere; bcrypt cost = 12.
- [ ] `pnpm build` passes with no TypeScript errors.
- [ ] PR squash-merged to `main` with green CI.
