# Sprints — Spec 07: User Dashboard

> **Status:** ✅ Complete — Sprints 07-A, 07-B, and 07-C implemented

---

## Sprint 07-A — Guide repository + FTS5 migration + API

**Status:** ✅ Complete  
**Scope:** `GuideRepository`, FTS5 virtual table + triggers, `GET /api/guides`, `DELETE /api/guides`.

**Files touched:**

- `prisma/migrations/<timestamp>_fts5_and_favorites/` — raw SQL migration for FTS5 + `isFavorite` column
- `src/lib/db/repositories/guides.ts` — `GuideRepository` implementing `IGuideReader` + `IGuideWriter`
- `src/lib/db/repositories/types.ts` — `IGuideReader`, `IGuideWriter` interfaces
- `src/app/api/guides/route.ts` — `GET` + `DELETE`
- `src/app/api/guides/[id]/route.ts` — `PATCH`

**Implementation notes:**

- FTS5 migration: raw `$executeRawUnsafe` in a Prisma custom migration, not auto-generated.
- `GuideRepository.search(userId, query)` uses `SELECT g.* FROM guides g JOIN guides_fts f ON g.rowid = f.rowid WHERE guides_fts MATCH ? AND g.userId = ? ORDER BY rank`.
- `DELETE /api/guides`: verify all IDs belong to the requesting user before deleting (single transaction).
- `isFavorite` column added via migration alongside FTS5.

**Tests added:**

- `tests/unit/lib/db/repositories/guides.test.ts`
- `tests/integration/api/guides/guides.test.ts`

**Entry criteria:** Spec 04 complete.  
**Exit criteria:** `GET /api/guides` returns user's guides; FTS5 search returns ranked results.

---

## Sprint 07-B — Folder + tag APIs

**Status:** ✅ Complete  
**Scope:** Folder CRUD, tag management API, `FolderRepository`.

**Files touched:**

- `src/lib/db/repositories/folders.ts`
- `src/app/api/folders/route.ts` — `POST` (create) + `GET` (list)
- `src/app/api/folders/[id]/route.ts` — `PATCH` (rename) + `DELETE`
- `src/app/api/guides/[id]/tags/route.ts`

**Tests added:**

- `tests/unit/lib/db/repositories/folders.test.ts`
- `tests/integration/api/folders/folders.test.ts`
- `tests/integration/api/guides/tags.test.ts`

**Entry criteria:** Sprint 07-A complete.  
**Exit criteria:** Folders can be created, renamed, deleted; guides can be moved; tags can be added/removed.

---

## Sprint 07-C — Dashboard UI + E2E tests

**Status:** ✅ Complete  
**Scope:** Dashboard page, guide card, grid/list toggle, search input, folder sidebar, usage summary.

**Files touched:**

- `src/app/dashboard/page.tsx` — Server Component shell
- `src/components/dashboard/GuideCard.tsx`
- `src/components/dashboard/GuideGrid.tsx`
- `src/components/dashboard/GuideList.tsx`
- `src/components/dashboard/DashboardSearch.tsx`
- `src/components/dashboard/FolderSidebar.tsx`
- `src/components/dashboard/UsageSummary.tsx`
- `src/components/dashboard/DashboardShell.tsx`
- `tests/e2e/dashboard/dashboard.spec.ts`

**Implementation notes:**

- Initial render is a Server Component (passes guides as props to Client Components).
- Search + filtering: client-side state with debounced re-fetch to `/api/guides`.
- `GuideCard` action menu (Radix UI `DropdownMenu` via shadcn/ui).

**Tests added:**

- `tests/unit/components/dashboard/GuideCard.test.tsx`
- `tests/unit/components/dashboard/DashboardSearch.test.tsx`
- `tests/e2e/dashboard/dashboard.spec.ts`

**Entry criteria:** Sprint 07-B complete.  
**Exit criteria:** All T-01 through T-22 pass; Definition of Done checklist satisfied.
