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

| ID   | Type        | Description                                                           |
| ---- | ----------- | --------------------------------------------------------------------- |
| T-01 | Unit        | `generateToken()` produces 32-char URL-safe string                    |
| T-02 | Unit        | `buildMarkdownExport(guide)` outputs well-formed Markdown             |
| T-03 | Unit        | `buildHtmlExport(guide)` includes all images as base64 data URIs      |
| T-04 | Integration | `POST /api/guides/[id]/share` creates ShareLink row                   |
| T-05 | Integration | `DELETE /api/guides/[id]/share` nullifies share link; GET returns 410 |
| T-06 | Integration | `POST /api/guides/[id]/fork` creates deep-copy guide                  |
| T-07 | Integration | Export endpoint returns correct Content-Type per format               |
| T-08 | Integration | Export endpoint returns 403 for non-owner                             |
| T-09 | Integration | Click count increments on each `/share/[token]` visit                 |
| T-10 | E2E         | Share modal opens, copy button writes to clipboard (Playwright)       |
| T-11 | E2E         | Forked guide appears in dashboard with "[Fork]" prefix                |
| T-12 | E2E         | Revoked link shows 410 page                                           |

---

## 10. Definition of Done

- [ ] All acceptance criteria SH-01 through SH-15 have passing tests
- [ ] `/share/[token]` page scores ≥ 90 Lighthouse accessibility
- [ ] `ShareLink` Prisma migration applied and committed
- [ ] Export formats manually reviewed (Markdown in Obsidian, HTML offline, PDF printed)
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] `pnpm test:unit` and `pnpm test:integration` pass
- [ ] Spec 09 E2E suite green
