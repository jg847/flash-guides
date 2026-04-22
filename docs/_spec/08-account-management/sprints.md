# Sprints — Spec 08: Account Management

> **Status:** 🔜 Not started — begins after Spec 02 is complete

---

## Sprint 08-A — Profile & password APIs + account page shell

**Status:** 🔜 Not started  
**Scope:** Profile update, avatar upload (MinIO), password change, account page UI.

**Files touched:**

- `src/app/api/account/profile/route.ts`
- `src/app/api/account/avatar/route.ts`
- `src/app/api/account/password/route.ts`
- `src/lib/storage/minio.ts` — `uploadAvatar(buffer, mimeType): Promise<string>` (returns public URL)
- `src/lib/db/repositories/users.ts` — `UserRepository`
- `src/app/account/page.tsx` — account page shell
- `src/components/account/ProfileSection.tsx`
- `src/components/account/AvatarUpload.tsx`
- `src/components/account/PasswordSection.tsx`

**Implementation notes:**

- Avatar upload: validate MIME type and size in route handler before streaming to MinIO.
- Use `@aws-sdk/client-s3` (S3-compatible with MinIO) or the MinIO JS client.
- Password change: `verifyPassword(current)` before allowing update. Invalidate all other JWT sessions by rotating a session version field stored in `User`.

**Tests added:**

- `tests/unit/lib/db/repositories/users.test.ts`
- `tests/unit/lib/storage/minio.test.ts`
- `tests/integration/api/account/profile.test.ts`
- `tests/integration/api/account/password.test.ts`

**Entry criteria:** Spec 02 complete.  
**Exit criteria:** Profile and password updates work via API; avatar stored in MinIO.

---

## Sprint 08-B — Email change, OAuth disconnect

**Status:** 🔜 Not started  
**Scope:** Email change with re-verification (`pendingEmail`), OAuth provider disconnect.

**Files touched:**

- `prisma/migrations/<ts>_pending_email/` — add `pendingEmail` column
- `src/app/api/account/email/route.ts`
- `src/app/api/account/verify-email-change/route.ts`
- `src/app/api/account/oauth/[provider]/route.ts`
- `src/lib/email/index.ts` — `sendEmailChangeVerification`
- `src/components/account/EmailSection.tsx`
- `src/components/account/ConnectedAccountsSection.tsx`

**Implementation notes:**

- Pending email stored in `User.pendingEmail`; token in `VerificationToken` with identifier = `email-change:${userId}`.
- On verification: swap `email` ↔ `pendingEmail`, clear token.
- OAuth disconnect: check user has at least one other login method (password or other OAuth) before deleting `Account` row.

**Tests added:**

- `tests/integration/api/account/email.test.ts`
- `tests/integration/api/account/oauth.test.ts`

**Entry criteria:** Sprint 08-A complete.  
**Exit criteria:** Email change verified via Mailhog; OAuth disconnect works; single-method guard enforced.

---

## Sprint 08-C — Data export, account deletion, E2E

**Status:** 🔜 Not started  
**Scope:** Data export (zip of Markdown + JSON), account deletion, E2E tests.

**Files touched:**

- `src/app/api/account/export/route.ts`
- `src/app/api/account/delete/route.ts`
- `src/lib/export/data-exporter.ts` — `generateUserDataExport(userId): Promise<Buffer>` (zip)
- `src/components/account/DangerZone.tsx`
- `tests/e2e/account/account.spec.ts`

**Implementation notes:**

- `generateUserDataExport`: use `jszip` or `archiver`. Include `guides/<slug>.md` + `data.json` (all guides + notes as JSON).
- Export zip streamed into a temporary MinIO object with a 60-second presigned URL.
- Account deletion: Prisma cascade deletes handle child rows (cascades defined in schema). Also delete MinIO objects (avatar, export files).
- Deletion requires correct password re-confirmation.

**Tests added:**

- `tests/unit/lib/export/data-exporter.test.ts`
- `tests/integration/api/account/export.test.ts`
- `tests/integration/api/account/delete.test.ts`
- `tests/e2e/account/account.spec.ts`

**Entry criteria:** Sprint 08-B complete.  
**Exit criteria:** All T-01 through T-20 pass; Definition of Done checklist satisfied.
