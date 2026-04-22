# Sprints — Spec 02: Authentication & Session Management

> **Status:** 🔜 Not started — begins after Spec 01 CI is green

---

## Sprint 02-A — Auth.js wiring + Prisma adapter

**Status:** 🔜 Not started  
**Scope:** Wire Auth.js v5 with Prisma adapter, configure Google OAuth provider and credentials provider, set up session middleware.

**Files touched:**

- `src/lib/auth/config.ts` — `NextAuthConfig` export
- `src/lib/auth/index.ts` — `{ auth, handlers, signIn, signOut }`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/middleware.ts` — route matcher + `authMiddleware`
- `src/lib/auth/middleware.ts`

**Implementation notes:**

- Auth.js v5: export `handlers` from the config; re-export as named route handlers.
- `session.strategy = "jwt"` — no DB session table queries on every request.
- Google OAuth: `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` from env.
- Protected routes matcher: `/dashboard/:path*`, `/guide/:path*`, `/account/:path*`, `/api/guides/:path*` (except health).
- `callbackUrl` forwarded through redirect so user lands back where they started.

**Tests added:**

- `tests/unit/lib/auth/middleware.test.ts` — redirect logic for unauthenticated requests.
- `tests/integration/api/auth/session.test.ts` — session present/absent scenarios.

**Entry criteria:** Spec 01 complete, `GOOGLE_CLIENT_ID` set in `.env`.  
**Exit criteria:** Google OAuth login works in dev; `/dashboard` redirects without session.

---

## Sprint 02-B — Email/password signup & verification

**Status:** 🔜 Not started  
**Scope:** Registration API, hashed passwords, email verification token + email sending.

**Files touched:**

- `src/app/api/auth/register/route.ts`
- `src/app/api/auth/verify-email/route.ts`
- `src/lib/auth/password.ts` — `hashPassword`, `verifyPassword`
- `src/lib/auth/tokens.ts` — `createVerificationToken`, `consumeVerificationToken`
- `src/lib/email/index.ts` — `sendVerificationEmail` (nodemailer → Mailhog in dev)
- `src/app/(auth)/register/page.tsx`
- `src/app/(auth)/verify-email/page.tsx`
- `src/components/auth/RegisterForm.tsx`

**Implementation notes:**

- `bcryptjs` for hashing (no native binary issues in Docker Alpine). Cost = 12.
- Verification tokens: 32-byte crypto-random hex, stored in `VerificationToken`, expire 24h.
- Email sent via `nodemailer` SMTP to `SMTP_HOST:SMTP_PORT` (Mailhog in dev, real SMTP in prod).
- Credentials provider in Auth.js checks `emailVerified` before allowing login.

**Tests added:**

- `tests/unit/lib/auth/password.test.ts`
- `tests/unit/lib/auth/tokens.test.ts`
- `tests/integration/api/auth/register.test.ts`
- `tests/integration/api/auth/verify-email.test.ts`
- `tests/unit/components/auth/RegisterForm.test.tsx` (RTL)

**Entry criteria:** Sprint 02-A complete.  
**Exit criteria:** Can sign up, receive email in Mailhog, click verify link, then log in.

---

## Sprint 02-C — Forgot/reset password + login page

**Status:** 🔜 Not started  
**Scope:** Forgot-password and reset-password API + pages, login page with all providers.

**Files touched:**

- `src/app/api/auth/forgot-password/route.ts`
- `src/app/api/auth/reset-password/route.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/forgot-password/page.tsx`
- `src/app/(auth)/reset-password/page.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/ForgotPasswordForm.tsx`
- `src/components/auth/ResetPasswordForm.tsx`
- `src/lib/email/index.ts` — `sendPasswordResetEmail`

**Implementation notes:**

- Reset tokens: same infra as verify tokens, expire 1h.
- `POST /api/auth/forgot-password` always 200 (no email enumeration).
- On successful reset: invalidate all existing sessions for that user (set `sessionToken` to unique expired value or use session version counter).

**Tests added:**

- `tests/integration/api/auth/forgot-password.test.ts`
- `tests/integration/api/auth/reset-password.test.ts`
- `tests/e2e/auth/signup-verify-login.spec.ts`
- `tests/e2e/auth/forgot-reset-password.spec.ts`
- `tests/unit/components/auth/LoginForm.test.tsx`

**Entry criteria:** Sprint 02-B complete.  
**Exit criteria:** All AC-01 through AC-15 pass; E2E tests green.
