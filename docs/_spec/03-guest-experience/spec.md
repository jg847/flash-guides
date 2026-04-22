# Spec 03 — Guest vs. Registered Experience

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

This spec defines how FlashGuides differentiates between guest (unauthenticated) and registered users. Guests may generate up to 3 watermarked study-guide previews per day (IP-based quota). Their guides are not persisted to any account. Registered users have unlimited generation, full guide persistence, and access to all interactive features. The experience includes prominent signup CTAs, a public/featured guide gallery accessible to all, and clear visual watermarking of guest-generated content.

---

## 2. User Stories

1. As a **guest**, I want to generate up to 3 study guides per day without an account so that I can evaluate the product before committing to signup.
2. As a **guest**, I want my generated guides to display a watermark so that I understand they are preview-quality and not saved.
3. As a **guest**, I want to see a signup CTA when I attempt to exceed my daily quota so that I know how to unlock unlimited access.
4. As a **guest**, I want to browse a public gallery of featured guides so that I can see what FlashGuides produces.
5. As a **registered user**, I want to generate an unlimited number of guides so that I am not throttled.
6. As a **registered user**, I want my guides automatically saved to my account so that I can access them later.
7. As a **developer**, I want the gating enforced server-side so that it cannot be bypassed by disabling JavaScript.

---

## 3. Acceptance Criteria

| #     | Story | Given                                        | When                                    | Then                                                                      |
| ----- | ----- | -------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| AC-01 | US-1  | Guest, fewer than 3 guides generated today   | Guide generation requested              | Generation proceeds normally                                              |
| AC-02 | US-1  | Guest, exactly 3 guides generated today (IP) | 4th guide generation requested          | HTTP 429 returned; CTA to sign up shown                                   |
| AC-03 | US-2  | Guest guide generated                        | Guide page rendered                     | Watermark overlay visible; "Create a free account to save" banner present |
| AC-04 | US-3  | Guest at daily quota                         | Generation attempted                    | Modal/banner appears with signup CTA and remaining count (0/3)            |
| AC-05 | US-4  | Any visitor                                  | `/gallery` page loaded                  | Public featured guides visible without login                              |
| AC-06 | US-5  | Registered user, any number of guides        | Guide generation requested              | No quota check; generation proceeds                                       |
| AC-07 | US-6  | Registered user generates a guide            | Generation completes                    | Guide row created in DB with `userId`; accessible from dashboard          |
| AC-08 | US-7  | Guest with manipulated client state          | 4th guide attempted via direct API call | Server-side IP check rejects with 429                                     |
| AC-09 | US-1  | Guest, quota resets at midnight UTC          | First guide of new day                  | Generation proceeds (quota refreshed)                                     |

---

## 4. UX Notes

### Guest banner

Sticky banner at top of every page for guests: "You're using FlashGuides as a guest. X of 3 free guides used today. [Sign up free →]"

### Watermark

Semi-transparent diagonal "PREVIEW — Sign up to save" text overlay on the guide hero and footer of guest-generated guides.

### Quota exhausted state

A full-screen overlay modal with:

- Headline: "You've used your 3 free guides for today"
- Sub-copy: "Sign up free to unlock unlimited guides, save your work, and more."
- Primary CTA: "Create free account"
- Secondary: "Log in" (for existing users)

### Public gallery (`/gallery`)

Card grid of staff-picked or auto-featured guides. Shows title, study mode badge, and a truncated preview. Clicking opens the guide (public URL if `isPublic = true`). No auth required to browse; auth required to fork or save.

### Empty states

- Gallery with no featured guides: "Check back soon — featured guides are curated weekly."

---

## 5. Data Model

No new Prisma models. Uses:

- `Guide.isWatermark` (bool) — true for guest-generated guides.
- `Guide.userId` (nullable) — null for guest guides not attached to an account.
- Guest quota tracked **in-memory via Redis or SQLite** — a `GuestQuota` table:

```prisma
model GuestQuota {
  ip        String   @id
  count     Int      @default(0)
  resetAt   DateTime
  updatedAt DateTime @updatedAt

  @@map("guest_quotas")
}
```

Quota resets at midnight UTC: `resetAt = next midnight`. Check `resetAt < now` → reset count to 0.

---

## 6. API Contracts

### `GET /api/guest/quota`

No auth required.

**Response 200:**

```json
{ "used": 2, "limit": 3, "resetsAt": "2026-04-23T00:00:00.000Z" }
```

### Middleware: `enforceGuestQuota`

Applied at `GenerationOrchestrator` layer before triggering Claude.

- Registered user → skip.
- Guest → look up IP in `GuestQuota`. If `count >= 3` and `resetAt > now` → 429.
- On generation start → `count++`.

**Response 429:**

```json
{ "error": "Daily guest limit reached", "resetsAt": "...", "signupUrl": "/register" }
```

### `GET /gallery`

Server Component page. No API route needed — direct Prisma query for `isPublic = true, isWatermark = false` guides, ordered by `createdAt desc`, limit 24.

---

## 7. Dependencies

- Spec 01 (Infrastructure) — DB, Docker.
- Spec 02 (Authentication) — session to distinguish guest vs. registered.

---

## 8. Out of Scope

- Per-user rate limiting on registered accounts.
- Paid tier / subscription gating.
- CAPTCHA for guest generation.
- Guest guide claiming (linking a guest guide to an account after signup).

---

## 9. Test Plan

| #    | Type        | Category | Description                                               | Given / When / Then                                                                      |
| ---- | ----------- | -------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `enforceGuestQuota` allows request when count < 3         | IP with count=2 / check / passes                                                         |
| T-02 | Unit        | Negative | `enforceGuestQuota` blocks request when count = 3         | IP with count=3 / check / 429                                                            |
| T-03 | Unit        | Positive | `enforceGuestQuota` resets count after midnight           | IP with count=3, resetAt in past / check / count reset, passes                           |
| T-04 | Unit        | Positive | Registered user bypasses quota check                      | Authenticated session / check / always passes                                            |
| T-05 | Integration | Positive | Guest generates 3 guides successfully                     | Test DB / 3 sequential requests from same IP / all 200                                   |
| T-06 | Integration | Negative | 4th request from same IP returns 429                      | Test DB / 4th request / 429 + signupUrl                                                  |
| T-07 | Integration | Positive | Guest quota resets at midnight                            | IP at count=3, resetAt=yesterday / new request / 200                                     |
| T-08 | Integration | Positive | `GET /api/guest/quota` returns correct count              | IP with 1 guide used / request / `{used:1, limit:3}`                                     |
| T-09 | Integration | Positive | Registered user is never quota-blocked                    | Authenticated user / unlimited requests / all pass                                       |
| T-10 | Component   | Positive | Guest banner renders with correct count                   | Mount with `used=2` / render / "2 of 3 free guides" visible                              |
| T-11 | Component   | Positive | Quota-exhausted modal renders                             | Mount with `used=3` / render / signup CTA visible, input disabled                        |
| T-12 | Component   | Positive | Watermark overlay renders on guest guide                  | Mount GuideRenderer with `isWatermark=true` / render / watermark element present         |
| T-13 | E2E         | Positive | Guest can generate and view 3 guides                      | Browser, no login / generate 3 guides / all load with watermark                          |
| T-14 | E2E         | Negative | Guest sees quota modal on 4th attempt                     | Browser, 3 guides used / attempt 4th / modal shown                                       |
| T-15 | E2E         | Positive | Gallery page loads without login                          | Browser / navigate to /gallery / guide cards visible                                     |
| T-16 | E2E         | Edge     | Two browser tabs generate simultaneously near quota       | Two tabs at count=2 / both submit at once / only one succeeds (server-side atomic)       |
| T-17 | Component   | Edge     | Gallery empty state renders when no featured guides exist | Mount `GalleryPage` with empty guides array / render / "Check back soon" message visible |

---

## 10. Definition of Done

- [ ] `GuestQuota` model migrated to DB.
- [ ] `enforceGuestQuota` middleware applied to generation endpoint.
- [ ] Watermark overlay renders on all guest-generated guide pages.
- [ ] Guest banner component shows live quota count.
- [ ] Quota-exhausted modal appears correctly at limit.
- [ ] `/gallery` page renders public guides without auth.
- [ ] All T-01 through T-17 tests passing.
- [ ] Coverage ≥ 85% on `src/lib/guest/**` and the quota middleware.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of the guest quota and gallery flows in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] PR squash-merged to `main`.
