# Spec 09 — Sharing & Export

> **Phase:** 3 — Content Distribution  
> **Status:** 🔜 Not started — depends on Spec 06 (renderer) + Spec 07 (dashboard)

---

## 1. Feature Summary

Any saved guide can be shared publicly via a revocable token URL. Visitors loading a share link see a read-only view of the guide. Registered users can fork a shared guide into their own dashboard. Guides can also be exported in three formats: Markdown, single-file HTML, and PDF.

---

## 2. User Stories

| ID    | As a…           | I want to…                                | So that…                                         |
| ----- | --------------- | ----------------------------------------- | ------------------------------------------------ |
| US-01 | Owner           | Generate a public share link for a guide  | I can send it to anyone without an account       |
| US-02 | Owner           | Revoke a share link                       | I can stop public access at any time             |
| US-03 | Visitor         | Open a share link and read the guide      | I can study it without creating an account       |
| US-04 | Registered user | Fork a shared guide into my own dashboard | I can customize it for my own learning           |
| US-05 | Owner           | Export a guide as Markdown                | I can paste it into Obsidian or Notion           |
| US-06 | Owner           | Export a guide as a single-file HTML page | I can save it offline and share without a server |
| US-07 | Owner           | Export a guide as a PDF                   | I can print it or attach it to submissions       |

---

## 3. Acceptance Criteria

| ID    | Criterion                                                                                                             |
| ----- | --------------------------------------------------------------------------------------------------------------------- |
| SH-01 | `POST /api/guides/[id]/share` creates a `ShareLink` row and returns a share URL                                       |
| SH-02 | The share URL path is `/share/[token]` where `token` is 32+ char URL-safe random string                               |
| SH-03 | `GET /share/[token]` renders a read-only guide view; the guide's title and content are visible                        |
| SH-04 | The `/share/[token]` page does NOT render the owner's edit controls                                                   |
| SH-05 | `DELETE /api/guides/[id]/share` invalidates the token; subsequent `GET /share/[token]` returns 410                    |
| SH-06 | A registered user visiting `/share/[token]` sees a "Fork to my guides" button                                         |
| SH-07 | `POST /api/guides/[id]/fork` creates a deep copy of the guide (new rows, not references) under the authenticated user |
| SH-08 | Forked guide `title` is prefixed `"[Fork] "` unless the user edits it                                                 |
| SH-09 | `GET /api/guides/[id]/export?format=md` returns `Content-Type: text/markdown` with the guide body                     |
| SH-10 | `GET /api/guides/[id]/export?format=html` returns `Content-Type: text/html` (self-contained)                          |
| SH-11 | `GET /api/guides/[id]/export?format=pdf` returns `Content-Type: application/pdf`                                      |
| SH-12 | Export endpoints require authentication and guide ownership; 403 otherwise                                            |
| SH-13 | PDF export runs headless-browser rendering via Playwright (server-side) or `@react-pdf/renderer`                      |
| SH-14 | `ShareLink` rows include `createdAt`, `expiresAt` (nullable), `clickCount` (INT)                                      |
| SH-15 | Each visit to `/share/[token]` increments `clickCount` atomically                                                     |

---

## 4. UX Notes

- Share button in the guide's action bar (top-right). Clicking opens a modal with: URL copy button, QR code thumbnail (optional), revoke button, expiry toggle (none / 7 days / 30 days).
- `/share/[token]` page has a top banner: **"Want to save this guide? Sign up free →"** (guest) or **"Add to my guides →"** (registered, triggers fork).
- Export is in a dropdown next to the share button: three format options. PDF opens in a new tab (`_blank`).
- Revoked/expired links show a friendly 410 page (not a generic 404).

---

## 5. Data Model

New model in `prisma/schema.prisma`:

```prisma
model ShareLink {
  id         String    @id @default(cuid())
  token      String    @unique
  guide      Guide     @relation(fields: [guideId], references: [id], onDelete: Cascade)
  guideId    String
  createdAt  DateTime  @default(now())
  expiresAt  DateTime?
  clickCount Int       @default(0)
}
```

New field on `Guide`:

```prisma
shareLink  ShareLink?
```

`Guide.id` already exists as a cuid. No other schema changes required.

---

## 6. API Contracts

### `POST /api/guides/[id]/share`

- **Auth:** Required (must own guide)
- **Body:** `{ expiresIn?: "7d" | "30d" | null }`
- **Response 201:** `{ token: string, url: string, expiresAt: string | null }`
- **Response 409:** If share link already exists (idempotent — return existing link instead)

### `DELETE /api/guides/[id]/share`

- **Auth:** Required (must own guide)
- **Response 204:** Token deleted

### `GET /share/[token]` _(Next.js page route, not API)_

- **Auth:** None required
- **Response:** Read-only guide page or 410

### `POST /api/guides/[id]/fork`

- **Auth:** Required
- **Body:** `{}` (guide ID in path; token in `Referer` optional)
- **Response 201:** `{ guideId: string }` (new guide id)

### `GET /api/guides/[id]/export?format=md|html|pdf`

- **Auth:** Required (must own guide)
- **Response:** File download with appropriate `Content-Disposition: attachment` header

---

## 7. Dependencies

| Dependency             | Reason                                            |
| ---------------------- | ------------------------------------------------- |
| Spec 06 (renderer)     | Read-only guide view reused at `/share/[token]`   |
| Spec 07 (dashboard)    | Fork lands in user dashboard                      |
| `@react-pdf/renderer`  | PDF generation (or optional Playwright headless)  |
| `jszip`                | Used only if bundling HTML assets into zip        |
| `crypto.randomBytes`   | Token generation (Node built-in, no extra dep)    |
| MinIO (docker-compose) | Not required here — exports are streamed directly |

---

## 8. Out of Scope

- Password-protected share links
- Embedded iframes / oEmbeds
- Collaborative real-time editing of shared guides
- Social graph (following other users)
- Custom short URLs or vanity slugs

---

## 9. Test Plan

| #    | Type        | Category | Description                                                               | Given / When / Then                                                                                  |
| ---- | ----------- | -------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `generateToken()` produces 32-char URL-safe string                        | Call `generateToken()` / result / 32+ chars, only URL-safe characters present                        |
| T-02 | Unit        | Positive | `buildMarkdownExport(guide)` outputs well-formed Markdown                 | Valid guide object / call / string with frontmatter and headings; no parse errors                    |
| T-03 | Unit        | Positive | `buildHtmlExport(guide)` converts remote image URLs to base64 data URIs   | Guide with external image URLs / call / `<img src="data:...">` in output                             |
| T-04 | Integration | Positive | `POST /api/guides/[id]/share` creates a `ShareLink` row                   | Authenticated owner / POST / 201 + ShareLink row in DB with correct `guideId`                        |
| T-05 | Integration | Positive | `DELETE /api/guides/[id]/share` removes token; `GET /share/[token]` → 410 | Existing share link / DELETE then GET / 204 then 410                                                 |
| T-06 | Integration | Positive | `POST /api/guides/[id]/fork` creates independent deep-copy guide          | Authenticated user + valid guide / POST fork / new guide rows, `[Fork]` title prefix, new IDs        |
| T-07 | Integration | Positive | Export endpoint returns correct `Content-Type` per format                 | Valid owner / `?format=md`, `?format=html`, `?format=pdf` separately / correct Content-Type headers  |
| T-08 | Integration | Negative | Export endpoint returns 403 for non-owner                                 | User B requests User A's guide export / GET / 403                                                    |
| T-09 | Integration | Positive | `clickCount` increments atomically on each `/share/[token]` visit         | Share link with `clickCount=0` / two sequential GET requests / `clickCount=2`                        |
| T-10 | E2E         | Positive | Share modal opens; copy button writes URL to clipboard                    | Logged-in user / open share modal + click copy / clipboard contains correct share URL                |
| T-11 | E2E         | Positive | Forked guide appears in dashboard with `[Fork]` title prefix              | Registered user visits share page / click fork / dashboard shows `[Fork] <original title>`           |
| T-12 | E2E         | Positive | Revoked share link renders 410 page                                       | Owner revokes link / visit `/share/[token]` / 410 page rendered, not generic 404                     |
| T-13 | Integration | Negative | Unauthenticated user cannot fork a guide                                  | No session / POST `/api/guides/[id]/fork` / 401                                                      |
| T-14 | Integration | Edge     | Share link with `expiresAt` in the past returns 410                       | Share link where `expiresAt < now()` / GET `/share/[token]` / 410 even though token row exists in DB |
| T-15 | Component   | Positive | `ShareModal` renders share link input and copy button                     | Mount with valid share URL / render / URL input populated and copy button visible                    |

---

## 10. Definition of Done

- [ ] All acceptance criteria SH-01 through SH-15 have passing tests
- [ ] `/share/[token]` page scores ≥ 90 Lighthouse accessibility
- [ ] `ShareLink` Prisma migration applied and committed
- [ ] Export formats manually reviewed (Markdown in Obsidian, HTML offline, PDF printed)
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] `pnpm lint` passes.
- [ ] `pnpm test:unit` and `pnpm test:integration` pass.
- [ ] Spec 09 E2E suite green.
- [ ] Manual smoke test: share link creation, fork, and PDF download work end-to-end in Docker Compose.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] Coverage ≥ 85% on `src/lib/sharing/**` and `src/lib/export/**`.
- [ ] PR squash-merged to `main`.
