# Spec 08 — Account Management

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

Account Management allows registered users to control every aspect of their FlashGuides identity: update their display name and avatar, change their email address (with re-verification), change their password, view and disconnect connected OAuth providers, export all their data as a downloadable zip (Markdown + JSON), and permanently delete their account. All mutations are protected by re-authentication confirmation where appropriate.

---

## 2. User Stories

1. As a **registered user**, I want to update my display name and avatar photo so that my profile reflects my identity.
2. As a **registered user**, I want to change my email address so that I can keep my account current if my address changes.
3. As a **registered user**, I want to change my password so that I can maintain account security.
4. As a **registered user**, I want to see which OAuth providers are connected to my account so that I know my login options.
5. As a **registered user**, I want to disconnect an OAuth provider so that I can revoke unwanted login methods.
6. As a **registered user**, I want to export all my data (guides + notes) as a zip so that I own my content.
7. As a **registered user**, I want to permanently delete my account so that I can remove all my data from the service.

---

## 3. Acceptance Criteria

| #     | Story | Given                                  | When                                          | Then                                                                  |
| ----- | ----- | -------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------- |
| AC-01 | US-1  | Authenticated user                     | PATCH `/api/account/profile` with valid name  | `user.name` updated; response 200                                     |
| AC-02 | US-1  | Valid image file (≤2MB, JPEG/PNG/WebP) | Upload avatar                                 | Image stored in MinIO; `user.image` URL updated                       |
| AC-03 | US-1  | File > 2MB or invalid type             | Upload avatar                                 | 422: "Image must be JPEG, PNG, or WebP under 2 MB"                    |
| AC-04 | US-2  | Valid new email                        | PATCH `/api/account/email`                    | Verification email sent to new address; change pending until verified |
| AC-05 | US-2  | New email already registered           | PATCH `/api/account/email`                    | 409: "Email already in use"                                           |
| AC-06 | US-2  | User clicks verification link          | GET `/api/account/verify-email-change?token=` | `user.email` updated; old email change token invalidated              |
| AC-07 | US-3  | Current password correct               | PATCH `/api/account/password`                 | Password updated; all other sessions invalidated                      |
| AC-08 | US-3  | Current password incorrect             | PATCH `/api/account/password`                 | 401: "Current password incorrect"                                     |
| AC-09 | US-4  | User visits account page               | Page loads                                    | Connected OAuth providers listed                                      |
| AC-10 | US-5  | User has ≥2 login methods              | Click "Disconnect Google"                     | Provider unlinked; `Account` row deleted                              |
| AC-11 | US-5  | User has only 1 login method           | Attempt to disconnect only provider           | 400: "Cannot remove your only login method"                           |
| AC-12 | US-6  | User clicks "Export data"              | POST `/api/account/export`                    | Zip generated with `guides/*.md` + `data.json`; download URL returned |
| AC-13 | US-7  | User enters password to confirm        | POST `/api/account/delete`                    | All user data deleted; session destroyed; redirected to `/`           |
| AC-14 | US-7  | Incorrect password for deletion        | POST `/api/account/delete`                    | 401: "Incorrect password"                                             |

---

## 4. UX Notes

### Account page (`/account`)

Sections:

1. **Profile** — name + avatar upload.
2. **Email** — current email; "Change email" expandable form.
3. **Password** — "Change password" expandable form (hidden for OAuth-only users).
4. **Connected accounts** — list of OAuth providers with disconnect buttons.
5. **Data & Privacy** — "Export my data" button + "Delete account" danger zone.

### Email change flow

After submitting new email: banner "Verification email sent to <new>. Your email won't change until you verify."

### Delete account danger zone

Red bordered section. "This is permanent and cannot be undone." Requires typing password in a confirmation dialog.

### Export

Button shows spinner. Once zip is ready, a `<a download>` link appears for 60 seconds, then expires.

---

## 5. Data Model

No new models. Touch:

- `User.name`, `User.image`, `User.email`, `User.password`, `User.emailVerified`
- `Account` — disconnect OAuth provider by deleting row
- `VerificationToken` — reuse for email change tokens

New column added via migration:

```prisma
model User {
  pendingEmail  String?   // new email awaiting verification
}
```

Avatar stored in MinIO bucket `flashguides-avatars`; URL stored in `User.image`.

---

## 6. API Contracts

### `PATCH /api/account/profile`

Auth: required.

```ts
z.object({
  name: z.string().min(1).max(100).optional(),
})
```

**Response 200:** Updated user object.

### `POST /api/account/avatar`

Auth: required. Content-Type: `multipart/form-data`.  
Field: `avatar` (file, ≤2MB, JPEG/PNG/WebP).  
**Response 200:** `{ imageUrl: string }`  
**Response 422:** Validation error.

### `PATCH /api/account/email`

Auth: required.

```ts
z.object({ email: z.string().email() })
```

**Response 200:** `{ message: "Verification email sent" }`  
**Response 409:** Email in use.

### `PATCH /api/account/password`

Auth: required.

```ts
z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
})
```

**Response 200:** `{ message: "Password updated" }`  
**Response 401:** Wrong current password.

### `DELETE /api/account/oauth/[provider]`

Auth: required.  
**Response 200:** `{ message: "Disconnected" }`  
**Response 400:** Only login method.

### `POST /api/account/export`

Auth: required.  
**Response 202:** `{ downloadUrl: string, expiresAt: string }`

### `DELETE /api/account`

Auth: required.

```ts
z.object({ password: z.string() })
```

**Response 200:** `{ message: "Account deleted" }`  
**Response 401:** Wrong password.

---

## 7. Dependencies

- Spec 02 — Auth.js session and password utilities.
- Spec 01 — MinIO for avatar storage.

---

## 8. Out of Scope

- Two-factor auth.
- Billing / subscription management.
- Username/handle (display name only).
- GDPR automated erasure requests beyond the manual delete flow.

---

## 9. Test Plan

| #    | Type        | Category | Description                                                               | Given / When / Then                                            |
| ---- | ----------- | -------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| T-01 | Unit        | Positive | `UserRepository.updateProfile` updates name                               | Mock Prisma / update / returns updated user                    |
| T-02 | Unit        | Positive | Avatar upload validates MIME type                                         | File with `image/png` / validate / passes                      |
| T-03 | Unit        | Negative | Avatar upload rejects oversized file                                      | File > 2MB / validate / throws                                 |
| T-04 | Unit        | Positive | `generateDataExport` produces valid zip structure                         | Mock guides + notes / generate / zip contains expected files   |
| T-05 | Integration | Positive | `PATCH /api/account/profile` updates name                                 | Authenticated user / valid name / 200 + DB updated             |
| T-06 | Integration | Positive | `PATCH /api/account/email` sends verification                             | Valid new email / request / email queued + pendingEmail set    |
| T-07 | Integration | Negative | `PATCH /api/account/email` returns 409 for taken email                    | Existing email / request / 409                                 |
| T-08 | Integration | Positive | `PATCH /api/account/password` updates with correct current                | Correct current + valid new / request / 200 + hash updated     |
| T-09 | Integration | Negative | `PATCH /api/account/password` returns 401 for wrong current               | Wrong current / request / 401                                  |
| T-10 | Integration | Positive | `DELETE /api/account/oauth/google` removes provider                       | 2 providers linked / disconnect / provider row gone            |
| T-11 | Integration | Negative | Cannot disconnect only login method                                       | 1 provider only / disconnect / 400                             |
| T-12 | Integration | Positive | `POST /api/account/export` returns zip download URL                       | Authenticated user / request / downloadUrl in response         |
| T-13 | Integration | Positive | `DELETE /api/account` deletes all user data                               | Correct password / request / all guides/notes/user deleted     |
| T-14 | Integration | Negative | `DELETE /api/account` returns 401 for wrong password                      | Wrong password / request / 401                                 |
| T-15 | E2E         | Positive | Update name via account page                                              | Login / update name / name shown updated in nav                |
| T-16 | E2E         | Positive | Change password flow                                                      | Login / change password / log out / log in with new password   |
| T-17 | E2E         | Positive | Export data downloads zip                                                 | Login / click export / zip downloaded                          |
| T-18 | E2E         | Positive | Delete account flow                                                       | Login / delete account / redirected to `/`, account gone       |
| T-19 | Integration | Edge     | Unicode/emoji in display name saved and returned without corruption       | PATCH profile with emoji name / 200 + name stored intact in DB |
| T-20 | Unit        | Edge     | Avatar upload rejects file with wrong magic bytes despite valid extension | `.jpg` file with PNG magic bytes / MIME validate / 422         |

---

## 10. Definition of Done

- [ ] All account mutations gated behind re-auth where required.
- [ ] Avatar upload stored in MinIO; URL persisted to DB.
- [ ] Email change flow with re-verification working.
- [ ] Data export zip correct and downloadable.
- [ ] Account deletion cascades all user data.
- [ ] All T-01 through T-20 tests passing.
- [ ] Coverage ≥ 85% on `src/app/api/account/**`.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of profile update, email change, and account deletion in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] PR squash-merged to `main`.
