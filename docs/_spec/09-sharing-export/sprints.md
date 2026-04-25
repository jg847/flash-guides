# Sprints — Spec 09: Sharing & Export

> **Status:** ✅ Complete — sharing, fork, export, and authenticated shared-page flows implemented and validated

---

## Sprint 09-A — Share link creation, revocation, read-only view

**Status:** ✅ Complete  
**Scope:** `ShareLink` model + migration, share APIs, `/share/[token]` read-only page.

**Files touched:**

- `prisma/migrations/<ts>_share_link/`
- `src/app/api/guides/[id]/share/route.ts`
- `src/lib/db/repositories/share-links.ts` — `ShareLinkRepository`
- `src/lib/sharing/token.ts` — `generateToken(): string` (crypto.randomBytes)
- `src/app/share/[token]/page.tsx` — server component read-only guide view
- `src/components/sharing/ShareModal.tsx`
- `src/components/sharing/ShareButton.tsx`

**Implementation notes:**

- Token: `crypto.randomBytes(24).toString('base64url')` → 32-char URL-safe string.
- `/share/[token]` page is a separate layout (no auth header, distinctive "shared" banner).
- Click count: atomic `UPDATE "ShareLink" SET "clickCount" = "clickCount" + 1` via Prisma `$executeRaw`.
- Expiry check: if `expiresAt !== null && expiresAt < new Date()`, return 410.

**Tests added:**

- `tests/unit/lib/sharing/token.test.ts`
- `tests/integration/api/guides/share.test.ts`
- `tests/integration/app/share/page.test.ts`

**Entry criteria:** Spec 06 and Spec 07 complete.  
**Exit criteria:** Share URL created, read-only page renders, revocation returns 410.

---

## Sprint 09-B — Fork action

**Status:** ✅ Complete  
**Scope:** Fork API, fork button on share page, dashboard integration.

**Files touched:**

- `src/app/api/guides/[id]/fork/route.ts`
- `src/lib/guides/fork.ts` — `forkGuide(sourceId, targetUserId): Promise<Guide>`
- `src/components/sharing/ForkButton.tsx`

**Implementation notes:**

- Deep copy: query source guide, tags (GuideTag), notes. Insert new rows with new cuid IDs and `userId = targetUserId`.
- Run inside a `prisma.$transaction` to keep atomicity.
- Title prefix: `"[Fork] ${original.title}"` (truncated to 255 chars).
- Return redirect to `/dashboard/guides/[newId]` with 201.
- The shared guide page is forced dynamic so authenticated visitors see the live fork CTA instead of a cached guest render.

**Tests added:**

- `tests/unit/lib/guides/fork.test.ts`
- `tests/integration/api/guides/fork.test.ts`

**Entry criteria:** Sprint 09-A complete.  
**Exit criteria:** Fork creates independent guide rows; fork button visible on share page for registered users.

---

## Sprint 09-C — Export (Markdown, HTML, PDF) + E2E

**Status:** ✅ Complete  
**Scope:** Three export endpoints, download UX, E2E tests.

**Files touched:**

- `src/app/api/guides/[id]/export/route.ts`
- `src/lib/export/markdown.ts` — `buildMarkdownExport(guide): string`
- `src/lib/export/html.ts` — `buildHtmlExport(guide): string`
- `src/lib/export/pdf.ts` — `buildPdfExport(guide): Promise<Buffer>`
- `src/components/sharing/ExportDropdown.tsx`
- `tests/e2e/sharing/sharing.spec.ts`

**Implementation notes:**

- Markdown export: strip JSX/MDX components, output raw Markdown with frontmatter.
- HTML export: use `marked` or `unified` to render; inline styles (no external CSS links); convert remote images to base64.
- PDF: use `@react-pdf/renderer` with a simple `<Document><Page>` layout. Render markdown content as `<Text>` with basic formatting.
- All three formats stream to the browser via `new Response(body, { headers })` with `Content-Disposition: attachment`.

**Tests added:**

- `tests/unit/lib/export/markdown.test.ts`
- `tests/unit/lib/export/html.test.ts`
- `tests/unit/lib/export/pdf.test.ts`
- `tests/integration/api/guides/export.test.ts`
- `tests/e2e/sharing/sharing.spec.ts`

**Implementation notes:**

- Owned guide pages expose an `Export` menu with direct downloads for Markdown, HTML, and PDF.
- Share/export/fork browser coverage validates the owner flow end-to-end, including revocation rendering the unavailable page.

**Entry criteria:** Sprint 09-B complete.  
**Exit criteria:** All T-01 through T-15 pass; Definition of Done checklist satisfied.
