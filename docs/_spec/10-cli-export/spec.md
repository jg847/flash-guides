# Spec 10 — CLI Source Export

> **Phase:** 4 — Developer Tooling  
> **Status:** 🔜 Not started — independent; can be implemented any time after Phase 0

---

## 1. Feature Summary

`scripts/export-source.ts` is a Node.js CLI tool for exporting the project's source code into a single flat file (Markdown or plain text). It is primarily used to produce a prompt-friendly snapshot of the codebase for AI-assisted code review, onboarding, and documentation generation. The tool supports include/exclude filters, format selection, and stdout output.

This tool is invoked via `pnpm export:source`.

---

## 2. User Stories

| ID    | As a…     | I want to…                                                                | So that…                                               |
| ----- | --------- | ------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------- |
| US-01 | Developer | Run `pnpm export:source` and get a Markdown snapshot of the entire source | I can paste it into an AI tool for review              |
| US-02 | Developer | Exclude test files with `--no-tests`                                      | I can get a leaner snapshot focused on production code |
| US-03 | Developer | Export only test files with `--only-tests`                                | I can review test coverage independently               |
| US-04 | Developer | Choose the output format: Markdown or plain text (`--format=md            | txt`)                                                  | I can use it in different contexts |
| US-05 | Developer | Specify an include glob (`--include=src/lib/**`)                          | I can export a specific layer of the codebase          |
| US-06 | Developer | Specify an exclude glob (`--exclude=src/generated/**`)                    | I can exclude noisy generated files                    |
| US-07 | Developer | Write output to a file with `--output=<path>`                             | I can version it or diff against previous exports      |
| US-08 | Developer | Pipe output to stdout with `--stdout`                                     | I can compose it with other CLI tools                  |

---

## 3. Acceptance Criteria

| ID     | Criterion                                                                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CLI-01 | The script is executable via `pnpm export:source` (defined in `package.json`)                                                                                                            |
| CLI-02 | Running with no flags produces a combined Markdown file of all `src/**` and `scripts/**` source files                                                                                    |
| CLI-03 | `--no-tests` strips files matching `**/*.test.ts`, `**/*.spec.ts`, `tests/**`                                                                                                            |
| CLI-04 | `--only-tests` includes only files matching `**/*.test.ts`, `**/*.spec.ts`, `tests/**`                                                                                                   |
| CLI-05 | `--format=md` wraps each file in a fenced code block with language tag; `--format=txt` omits fences                                                                                      |
| CLI-06 | `--include=<glob>` ANDs with the default include set                                                                                                                                     |
| CLI-07 | `--exclude=<glob>` additionally excludes matched paths                                                                                                                                   |
| CLI-08 | `--output=<path>` writes to the file; creates parent directories if needed                                                                                                               |
| CLI-09 | `--stdout` writes to stdout instead of a file (default if no `--output`)                                                                                                                 |
| CLI-10 | Secrets and credentials are NEVER included: `.env`, `.env.local`, `*.key`, `*.pem`, `prisma.config.ts`                                                                                   |
| CLI-11 | `node_modules/`, `.next/`, `dist/`, lock files, and binary files are always excluded                                                                                                     |
| CLI-12 | Each file section is prefixed with a header line: `--- path/to/file.ts ---`                                                                                                              |
| CLI-13 | A summary comment at the top lists total file count and total token estimate (chars ÷ 4)                                                                                                 |
| CLI-14 | The script exits 0 on success, 1 on errors, and logs errors to stderr                                                                                                                    |
| CLI-15 | `--help` prints usage instructions                                                                                                                                                       |
| CLI-16 | Any file whose content contains `ANTHROPIC_API_KEY=`, `FAL_API_KEY=`, or similar secret-key patterns is never included in output, regardless of filename (defence-in-depth content scan) |

---

## 4. UX Notes

- The tool should be fast (< 2 s for a typical project). It reads the filesystem once, applies filters, then writes output in a single pass.
- No external dependencies beyond what is already in `devDependencies`. Use Node's built-in `glob` (Node 22+), `fs/promises`, and `path`.
- Output file defaults to `export.md` in the project root when `--output` is not given and `--stdout` is not set.

---

## 5. Data Model

No database interaction. CLI tool only.

---

## 6. API Contracts

Not applicable — this is a CLI tool. The public interface is the command-line flags documented in Section 3.

### Flag schema (parsed with `parseArgs` from `node:util`):

```
--no-tests         boolean   Exclude test files
--only-tests       boolean   Include only test files
--format           string    "md" (default) | "txt"
--include          string    Glob pattern to additionally include
--exclude          string    Glob pattern to additionally exclude
--output           string    Output file path (default: export.md)
--stdout           boolean   Write to stdout
--help             boolean   Print help
```

---

## 7. Dependencies

| Dependency         | Reason                                           |
| ------------------ | ------------------------------------------------ |
| `node:util`        | `parseArgs` for CLI flag parsing                 |
| `node:fs/promises` | Async file reading and writing                   |
| `node:path`        | Path manipulation and MIME-type based exclusions |
| `node:crypto`      | Not needed here                                  |
| `tsx`              | Executes the `.ts` script without compilation    |

No new npm packages should be required.

---

## 8. Out of Scope

- Watch mode / file-change listeners
- Upload or sync to external services (S3, Gist, Paste.bin)
- AST-based filtering (e.g., strip comments)
- Token counting via tiktoken
- Color output in terminal

---

## 9. Test Plan

| #    | Type        | Category | Description                                                                       | Given / When / Then                                                                                                                                                                            |
| ---- | ----------- | -------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `collectFiles(options)` returns correct paths for various flag combos             | Various flag combinations / call / expected path arrays returned                                                                                                                               |
| T-02 | Unit        | Positive | `applyAlwaysExclude(paths)` removes secrets, lockfiles, and binaries              | Paths including `.env`, `node_modules/`, `*.png` / call / those paths absent from result                                                                                                       |
| T-03 | Unit        | Positive | `formatSection(path, content, 'md')` produces correct fenced code block           | File path + content / call / output matches ` ```lang\n...\n``` ` pattern with correct language tag                                                                                            |
| T-04 | Unit        | Positive | `formatSection(path, content, 'txt')` produces plain header and content           | File path + content / call / `--- path ---` header present, no fence characters                                                                                                                |
| T-05 | Unit        | Positive | `estimateTokens(content)` returns `Math.ceil(content.length / 4)`                 | String of known length / call / correct integer estimate                                                                                                                                       |
| T-06 | Unit        | Positive | `--no-tests` excludes test files from collected paths                             | Directory with test and source files / `--no-tests` / only non-test files in result                                                                                                            |
| T-07 | Unit        | Positive | `--only-tests` includes only test files                                           | Directory with mixed files / `--only-tests` / only `*.test.ts`, `*.spec.ts`, `tests/**` in result                                                                                              |
| T-08 | Unit        | Positive | `--include` and `--exclude` flags compose correctly with defaults                 | Specific glob flags / call / resulting file set is correct                                                                                                                                     |
| T-09 | Unit        | Negative | `.env` and `prisma.config.ts` never appear in any export                          | Directory with `.env` present / collect / `.env` absent from result                                                                                                                            |
| T-10 | Integration | Positive | `pnpm export:source --stdout` exits 0 and writes Markdown to stdout               | Run CLI with `--stdout` / process exits 0 / stdout starts with summary comment                                                                                                                 |
| T-11 | Unit        | Negative | Files whose content contains `ANTHROPIC_API_KEY=` are excluded (CLI-16)           | File containing `ANTHROPIC_API_KEY=sk-xxx` as content / collect / file absent from result                                                                                                      |
| T-12 | Unit        | Edge     | `--no-tests` and `--only-tests` used together yields empty set without crashing   | Both flags set simultaneously / collect / empty file list returned, process exits 0 with warning                                                                                               |
| T-13 | E2E         | Positive | CLI run against a temp fixture directory produces TOC, file sections, and summary | Create temp dir with ≥3 known source files / run `tsx scripts/export-source.ts --stdout` against it / output contains each file path, correct fenced code block, and summary line count footer |

---

## 10. Definition of Done

- [ ] All CLI-01 through CLI-16 criteria verified manually.
- [ ] All T-01 through T-13 tests pass.
- [ ] `pnpm export:source --stdout | head -20` shows correct header and first file.
- [ ] `.env` and `prisma.config.ts` are not present in output (verified by grep in test).
- [ ] `pnpm export:source --stdout | grep -i "ANTHROPIC_API_KEY"` returns nothing.
- [ ] No TypeScript errors (`pnpm typecheck`).
- [ ] `pnpm lint` passes.
- [ ] Script is listed in `package.json` under `scripts.export:source`.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated with the Command pattern entry for the CLI tool.
- [ ] PR squash-merged to `main`.
