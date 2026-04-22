# Spec 07 — User Dashboard

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

The User Dashboard is the central hub for registered users to manage their generated study guides. It presents a grid or list view of all saved guides with tag filtering, folder organisation, full-text search (SQLite FTS5), favouriting, a "recent" view, and a usage meter. Users can create and rename folders, assign tags, and bulk-delete guides. The dashboard is accessible only to authenticated users.

---

## 2. User Stories

1. As a **registered user**, I want to see all my saved guides in a grid view so that I can quickly browse my library.
2. As a **registered user**, I want to switch to a list view so that I can see more metadata at a glance.
3. As a **registered user**, I want to search my guides by keyword so that I can find a specific guide quickly.
4. As a **registered user**, I want to filter guides by tag so that I can browse by topic.
5. As a **registered user**, I want to create folders and move guides into them so that I can organise my library.
6. As a **registered user**, I want to mark guides as favourites so that I can quickly access my most important guides.
7. As a **registered user**, I want to see a "Recent" section showing my last 5 guides so that my most recent work is always at hand.
8. As a **registered user**, I want to add and remove tags on a guide so that I can categorise my content.
9. As a **registered user**, I want to delete one or more guides so that I can keep my library tidy.
10. As a **registered user**, I want to see a usage summary (total guides, storage estimate) so that I understand my account usage.

---

## 3. Acceptance Criteria

| #     | Story | Given                                        | When                         | Then                                                               |
| ----- | ----- | -------------------------------------------- | ---------------------------- | ------------------------------------------------------------------ |
| AC-01 | US-1  | Authenticated user with guides               | Navigate to `/dashboard`     | All guides visible as cards with title, study mode, date           |
| AC-02 | US-2  | Dashboard loaded                             | Click list view toggle       | Guides switch to table-row layout                                  |
| AC-03 | US-3  | Dashboard loaded                             | Type in search box           | Guides filtered in real time via FTS5; match highlights shown      |
| AC-04 | US-3  | Search with no results                       | Query returns nothing        | "No guides match your search" empty state shown                    |
| AC-05 | US-4  | User has tagged guides                       | Click a tag filter           | Only guides with that tag shown                                    |
| AC-06 | US-5  | User clicks "+ New Folder"                   | Folder name entered          | Folder created; appears in sidebar                                 |
| AC-07 | US-5  | Guide dragged to folder (or via action menu) | Drop/confirm                 | `guide.folderId` updated; guide appears under folder               |
| AC-08 | US-6  | User clicks star on guide card               | Toggle                       | `isFavorite` field toggled; guide moves to/from Favourites section |
| AC-09 | US-7  | Dashboard loads                              | Any state                    | Last 5 guides displayed in a "Recent" strip at page top            |
| AC-10 | US-8  | User opens guide action menu                 | Click "Manage tags"          | Tag editor shown; tags can be added/removed                        |
| AC-11 | US-9  | User selects guides and clicks "Delete"      | Confirmation dialog accepted | Guides deleted; toast notification shown                           |
| AC-12 | US-10 | Dashboard sidebar                            | Any state                    | "X guides · approx Y KB" usage summary visible                     |
| AC-13 | —     | Unauthenticated user                         | Navigate to `/dashboard`     | Redirect to `/login?callbackUrl=/dashboard`                        |

---

## 4. UX Notes

### Layout

Two-column layout: narrow sidebar (folders, tags, stats) + main content area.

### Guide card (grid view)

- Title (truncated)
- Study mode badge (colour-coded pill)
- Date (relative: "2 days ago")
- ⭐ favourite toggle
- `...` action menu: Open, Rename, Manage tags, Move to folder, Delete

### Search

Debounced input (300ms). Results ranked by FTS5 BM25. Matched terms highlighted in snippet.

### Empty state (no guides)

"You haven't created any guides yet. [Generate your first guide →]"

### Folder sidebar

Collapsible tree. Special views at top: All Guides, Recent, Favourites.

---

## 5. Data Model

Uses existing models. Add:

```prisma
model Guide {
  // existing fields...
  isFavorite  Boolean  @default(false)  // add this
}
```

Also add SQLite FTS5 virtual table (created via raw migration, not managed by Prisma):

```sql
CREATE VIRTUAL TABLE guides_fts USING fts5(
  id UNINDEXED,
  title,
  content,
  content='guides',
  content_rowid='rowid'
);

CREATE TRIGGER guides_fts_ai AFTER INSERT ON guides BEGIN
  INSERT INTO guides_fts(rowid, id, title, content) VALUES (new.rowid, new.id, new.title, new.content);
END;
-- (update + delete triggers similarly)
```

---

## 6. API Contracts

### `GET /api/guides`

Auth: required.

**Query params:**

```ts
z.object({
  q: z.string().optional(),
  tag: z.string().optional(),
  folderId: z.string().cuid().optional(),
  view: z.enum(['recent', 'favorites', 'all']).default('all'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(24),
})
```

**Response 200:**

```json
{
  "guides": [ { "id", "slug", "title", "studyMode", "createdAt", "isFavorite", "tags", "folder" } ],
  "total": 42,
  "page": 1
}
```

### `PATCH /api/guides/[id]`

Auth: required (must own guide).

**Request body:**

```ts
z.object({
  isFavorite: z.boolean().optional(),
  folderId: z.string().cuid().nullable().optional(),
  title: z.string().min(1).max(200).optional(),
})
```

**Response 200:** Updated guide object.  
**Response 403:** Not the owner.

### `DELETE /api/guides`

Auth: required (must own all guides).

**Request body:**

```ts
z.object({ ids: z.array(z.string().cuid()).min(1).max(50) })
```

**Response 200:** `{ deleted: number }`

### `POST /api/folders`

Auth: required.

**Request body:**

```ts
z.object({ name: z.string().min(1).max(100) })
```

**Response 201:** Folder object.

### `PATCH /api/guides/[id]/tags`

Auth: required.

**Request body:**

```ts
z.object({ tags: z.array(z.string().min(1).max(50)).max(10) })
```

**Response 200:** Updated tag list.

---

## 7. Dependencies

- Spec 02 — Authentication.
- Spec 04 — Guide generation (produces the content that dashboard lists).
- Spec 06 — Guide renderer (linked from dashboard cards).

---

## 8. Out of Scope

- Shared/collaborative folders.
- Guide versioning / history.
- Bulk export (covered in Spec 09).
- Admin view of all users' guides.

---

## 9. Test Plan

| #    | Type        | Category | Description                                            | Given / When / Then                                                 |
| ---- | ----------- | -------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `GuideRepository.findByUser` returns correct guides    | Mock Prisma / call with userId / correct array returned             |
| T-02 | Unit        | Positive | FTS5 search returns ranked results                     | Mock raw query / search("octopus") / ranked results                 |
| T-03 | Unit        | Positive | `GuideRepository.toggleFavorite` flips isFavorite      | Guide with false / toggle / returns true                            |
| T-04 | Unit        | Positive | Pagination: page 2 returns correct offset              | 25 guides / page=2, limit=10 / guides 11-20                         |
| T-05 | Integration | Positive | `GET /api/guides` returns user's guides only           | Two users' guides in DB / authenticated as user A / only A's guides |
| T-06 | Integration | Positive | `GET /api/guides?q=octopus` returns FTS results        | Guide with "octopus" in title / search / guide returned             |
| T-07 | Integration | Positive | `PATCH /api/guides/[id]` updates isFavorite            | Authenticated owner / toggle / DB updated                           |
| T-08 | Integration | Negative | `PATCH /api/guides/[id]` blocked for non-owner         | User B / patch User A's guide / 403                                 |
| T-09 | Integration | Positive | `DELETE /api/guides` deletes multiple guides           | 3 guide IDs / delete / 3 rows gone                                  |
| T-10 | Integration | Negative | `DELETE /api/guides` can't delete another user's guide | Mixed IDs / delete / 403                                            |
| T-11 | Integration | Positive | `POST /api/folders` creates folder                     | Valid name / create / folder in DB                                  |
| T-12 | Component   | Positive | `GuideCard` renders title, mode badge, date            | Mount with guide data / render / all fields visible                 |
| T-13 | Component   | Positive | Grid/list toggle switches view mode                    | Click toggle / layout changes                                       |
| T-14 | Component   | Positive | Empty state shown when no guides                       | Mount with empty array / render / empty state message               |
| T-15 | Component   | Positive | Search input debounces correctly                       | Type rapidly / only 1 API call after 300ms pause                    |
| T-16 | E2E         | Positive | Dashboard loads and shows saved guides                 | Login + generate guide / navigate to /dashboard / guide visible     |
| T-17 | E2E         | Positive | Search finds guide by title                            | Login / search for guide title / guide appears                      |
| T-18 | E2E         | Positive | Favourite toggle persists across reload                | Star guide / reload / still starred                                 |
| T-19 | E2E         | Positive | Delete guide removes it from dashboard                 | Delete guide / dashboard / guide gone                               |
| T-20 | E2E         | Negative | Unauthenticated redirected from dashboard              | No session / navigate to /dashboard / redirect to /login            |

---

## 10. Definition of Done

- [ ] Dashboard renders grid and list views.
- [ ] FTS5 search working via `GET /api/guides?q=...`.
- [ ] Folder sidebar with create, rename, move-guide.
- [ ] Favourite toggle (star) persists.
- [ ] Bulk delete with confirmation.
- [ ] Tag management on guide cards.
- [ ] Usage summary in sidebar.
- [ ] All T-01 through T-20 tests passing.
- [ ] Coverage ≥ 85% on `src/lib/db/repositories/guides.ts`.
- [ ] FTS5 migration script committed and tested.
- [ ] `pnpm build` and CI green.
- [ ] PR squash-merged to `main`.
