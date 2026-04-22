# Sprints — Spec 03: Guest vs. Registered Experience

> **Status:** 🔜 Not started — begins after Spec 02 is complete

---

## Sprint 03-A — Guest quota enforcement

**Status:** 🔜 Not started  
**Scope:** `GuestQuota` DB model, `enforceGuestQuota` middleware, quota API.

**Files touched:**

- `prisma/schema.prisma` — add `GuestQuota` model
- `prisma/migrations/` — new migration
- `src/lib/guest/quota.ts` — `checkAndIncrementQuota`, `getQuotaStatus`, `resetExpiredQuota`
- `src/app/api/guest/quota/route.ts`

**Implementation notes:**

- Use Prisma upsert with atomic increment: `UPDATE guest_quotas SET count = count + 1 WHERE ip = ?`.
- `resetAt` = next midnight UTC, computed at upsert time.
- IP extracted from `x-forwarded-for` header (first IP), falling back to `request.ip`. Sanitize — take only the first segment, validate as IPv4/IPv6.
- Registered users: `session.user.id` check bypasses quota entirely.

**Tests added:**

- `tests/unit/lib/guest/quota.test.ts`
- `tests/integration/api/guest/quota.test.ts`

**Entry criteria:** Spec 02 complete; `GuestQuota` model added to schema.  
**Exit criteria:** `enforceGuestQuota` correctly allows/blocks requests; quota API returns correct data.

---

## Sprint 03-B — UI: Guest banner, watermark, quota modal

**Status:** 🔜 Not started  
**Scope:** Frontend components for guest experience: sticky banner, watermark overlay, exhausted-quota modal.

**Files touched:**

- `src/components/guest/GuestBanner.tsx`
- `src/components/guest/WatermarkOverlay.tsx`
- `src/components/guest/QuotaExhaustedModal.tsx`
- `src/app/layout.tsx` — inject `GuestBanner` for unauthenticated sessions

**Implementation notes:**

- `GuestBanner` is a Server Component that reads session + calls `getQuotaStatus`.
- `QuotaExhaustedModal` is a Client Component shown when generation returns 429.
- `WatermarkOverlay` accepts `isWatermark: boolean` prop; renders `position: absolute` overlay using Tailwind.

**Tests added:**

- `tests/unit/components/guest/GuestBanner.test.tsx`
- `tests/unit/components/guest/WatermarkOverlay.test.tsx`
- `tests/unit/components/guest/QuotaExhaustedModal.test.tsx`

**Entry criteria:** Sprint 03-A complete.  
**Exit criteria:** Banner shows correct quota; modal appears on 429; watermark visible on guide pages with `isWatermark=true`.

---

## Sprint 03-C — Public gallery + E2E tests

**Status:** 🔜 Not started  
**Scope:** `/gallery` page, guide card component, full E2E test suite for all quota scenarios.

**Files touched:**

- `src/app/gallery/page.tsx` — Server Component, queries `isPublic=true` guides
- `src/components/guides/GuideCard.tsx`
- `tests/e2e/guest/quota-flow.spec.ts`
- `tests/e2e/guest/gallery.spec.ts`

**Implementation notes:**

- Gallery is a static-ish Server Component (ISR revalidate every 5 min).
- `GuideCard` shows title, study mode badge (color-coded), and 2-line content preview.
- E2E quota test: set cookie/localStorage to simulate quota near-limit; use a test-only reset endpoint (guarded by `NODE_ENV=test`).

**Tests added:**

- `tests/e2e/guest/quota-flow.spec.ts` — T-13, T-14, T-16
- `tests/e2e/guest/gallery.spec.ts` — T-15

**Entry criteria:** Sprint 03-B complete.  
**Exit criteria:** All T-01 through T-16 pass; Definition of Done checklist satisfied.
