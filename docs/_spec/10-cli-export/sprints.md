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
- `formatSection` in `md` mode: ` ```ts\n${content}\n``` ` with detected language from extension.

**Tests added:**

- `tests/unit/lib/cli/collect-files.test.ts`
- `tests/unit/lib/cli/always-exclude.test.ts`
- `tests/unit/lib/cli/format-section.test.ts`
- `tests/unit/lib/cli/estimate-tokens.test.ts`

**Entry criteria:** Phase 0 complete.  
**Exit criteria:** T-01 through T-09 pass; no secrets ever appear in test output.

---

## Sprint 10-B — CLI entrypoint, flags, integration test

**Status:** 🔜 Not started  
**Scope:** `scripts/export-source.ts` main function, `parseArgs` integration, stdout/file output, `--help`.

**Files touched:**

- `scripts/export-source.ts` — main entry; wire all flags to core logic
- `tests/integration/cli/export-source.test.ts`

**Implementation notes:**

- Use `node:util` `parseArgs` with a strict type map (see spec Section 6).
- `--stdout` writes to `process.stdout`; default writes to `export.md` (or `--output` path).
- Create parent directories with `fs.mkdir(..., { recursive: true })` before writing.
- `--help` prints a usage block to stdout and exits 0.
- Wire into `package.json` via: `"export:source": "tsx scripts/export-source.ts"`

**Tests added:**

- `tests/integration/cli/export-source.test.ts` — spawns the script as a subprocess via `node:child_process` `execFile`, checks exit code and stdout content.

**Entry criteria:** Sprint 10-A complete.  
**Exit criteria:** CLI-01 through CLI-15 criteria verified; T-10 passes; Definition of Done checklist satisfied.
