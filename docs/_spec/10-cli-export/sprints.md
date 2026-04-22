# Sprints — Spec 10: CLI Source Export

> **Status:** 🔜 Not started — independent; no feature dependencies

---

## Sprint 10-A — Core export logic + tests

**Status:** 🔜 Not started  
**Scope:** File collection, filtering, always-exclude rules, section formatting, token estimate.

**Files touched:**

- `scripts/export-source.ts` — main entry point
- `src/lib/cli/collect-files.ts` — `collectFiles(options): Promise<string[]>`
- `src/lib/cli/always-exclude.ts` — `applyAlwaysExclude(paths: string[]): string[]`
- `src/lib/cli/format-section.ts` — `formatSection(path, content, format): string`
- `src/lib/cli/estimate-tokens.ts` — `estimateTokens(content: string): number`
- `tests/unit/lib/cli/collect-files.test.ts`
- `tests/unit/lib/cli/always-exclude.test.ts`
- `tests/unit/lib/cli/format-section.test.ts`
- `tests/unit/lib/cli/estimate-tokens.test.ts`

**Implementation notes:**

- Use `node:fs/promises` `glob` (Node 22 built-in) with `{ withFileTypes: false }` for file collection.
- Always-exclude list (hard-coded, not overridable):
  - `**/.env`, `**/.env.*`, `**/prisma.config.ts`, `**/*.key`, `**/*.pem`, `**/*.p12`
  - `**/node_modules/**`, `**/.next/**`, `**/dist/**`
  - `**/pnpm-lock.yaml`, `**/package-lock.json`, `**/yarn.lock`
  - Binary extensions: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.ico`, `.woff`, `.woff2`, `.ttf`, `.eot`, `.otf`, `.pdf`, `.zip`, `.gz`
- Content scan (CLI-16, defence-in-depth): after filename filtering, read each candidate file and exclude any whose content matches `ANTHROPIC_API_KEY=`, `FAL_API_KEY=`, `TAVILY_API_KEY=`, or the pattern `/[A-Z_]+=sk-[A-Za-z0-9]/`.
- `formatSection` in `md` mode: ` ```ts\n${content}\n``` ` with detected language from extension.

**Tests added:**

- `tests/unit/lib/cli/collect-files.test.ts`
- `tests/unit/lib/cli/always-exclude.test.ts`
- `tests/unit/lib/cli/format-section.test.ts`
- `tests/unit/lib/cli/estimate-tokens.test.ts`

**Entry criteria:** Phase 0 complete.  
**Exit criteria:** T-01 through T-12 pass (includes content-based secret detection T-11 and flag-conflict edge case T-12; fixture directory for T-13 E2E test also created here); no secrets ever appear in test output.

---

## Sprint 10-B — CLI entrypoint, flags, integration test

**Status:** 🔜 Not started  
**Scope:** `scripts/export-source.ts` main function, `parseArgs` integration, stdout/file output, `--help`.

**Files touched:**

- `scripts/export-source.ts` — main entry; wire all flags to core logic
- `tests/integration/cli/export-source.test.ts`
- `tests/fixtures/cli-fixture-repo/` — minimal fake repo for E2E T-13 (a few `.ts` files, a `.env`, a binary)

**Implementation notes:**

- Use `node:util` `parseArgs` with a strict type map (see spec Section 6).
- `--stdout` writes to `process.stdout`; default writes to `export.md` (or `--output` path).
- Create parent directories with `fs.mkdir(..., { recursive: true })` before writing.
- `--help` prints a usage block to stdout and exits 0.
- Wire into `package.json` via: `"export:source": "tsx scripts/export-source.ts"`

**Tests added:**

- `tests/integration/cli/export-source.test.ts` — spawns the script as a subprocess via `node:child_process` `execFile`, checks exit code and stdout content.
- `tests/e2e/cli/fixture-repo.test.ts` — T-13: runs CLI against `tests/fixtures/cli-fixture-repo/`, asserts TOC, fenced blocks, and summary footer in output.

**Entry criteria:** Sprint 10-A complete.  
**Exit criteria:** CLI-01 through CLI-16 criteria verified; all T-01 through T-13 pass (including E2E fixture test T-13); `pnpm export:source --stdout | grep -i 'API_KEY'` returns nothing; Definition of Done checklist satisfied.
