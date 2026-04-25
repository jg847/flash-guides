import { execFile } from 'node:child_process'
import { access, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { afterEach, describe, expect, it } from 'vitest'

const execFileAsync = promisify(execFile)
const repoRoot = path.resolve(__dirname, '../../../')
const fixtureRoot = path.join(repoRoot, 'tests/fixtures/cli-fixture-repo')
const scriptPath = path.join(repoRoot, 'scripts/export-source.ts')
const tsxPath = path.join(repoRoot, 'node_modules/tsx/dist/cli.mjs')
const generatedOutput = path.join(fixtureRoot, 'tmp/export.txt')
const defaultOutput = path.join(fixtureRoot, 'export.md')

describe('export-source CLI', () => {
  afterEach(async () => {
    await rm(generatedOutput, { force: true })
    await rm(defaultOutput, { force: true })
  })

  it('prints help text to stdout', async () => {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [tsxPath, scriptPath, '--help'],
      {
        cwd: fixtureRoot,
      },
    )

    expect(stderr).toBe('')
    expect(stdout).toContain('Usage: pnpm export:source [options]')
    expect(stdout).toContain('--stdout')
    await expect(access(defaultOutput)).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it('writes markdown to stdout for a fixture repo without leaking secrets', async () => {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [tsxPath, scriptPath, '--stdout'],
      {
        cwd: fixtureRoot,
      },
    )

    expect(stderr).toBe('')
    expect(stdout).toContain('<!-- Files: 3; Estimated tokens:')
    expect(stdout).toContain('## Table of contents')
    expect(stdout).toContain('--- src/lib/example.ts ---')
    expect(stdout).toContain('```ts')
    expect(stdout).not.toContain('.env')
    expect(stdout).not.toContain('logo.png')
    expect(stdout).not.toContain('ANTHROPIC_API_KEY')
    expect(stdout).not.toContain('prisma.config.ts')
  })

  it('applies include and exclude globs at the command level', async () => {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [tsxPath, scriptPath, '--stdout', '--include=src/**', '--exclude=**/*.test.ts'],
      {
        cwd: fixtureRoot,
      },
    )

    expect(stderr).toBe('')
    expect(stdout).toContain('<!-- Files: 1; Estimated tokens:')
    expect(stdout).toContain('--- src/lib/example.ts ---')
    expect(stdout).not.toContain('--- src/lib/example.test.ts ---')
    expect(stdout).not.toContain('--- scripts/helper.ts ---')
  })

  it('exports only test files when only-tests is set', async () => {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [tsxPath, scriptPath, '--stdout', '--only-tests'],
      {
        cwd: fixtureRoot,
      },
    )

    expect(stderr).toBe('')
    expect(stdout).toContain('<!-- Files: 1; Estimated tokens:')
    expect(stdout).toContain('--- src/lib/example.test.ts ---')
    expect(stdout).not.toContain('--- src/lib/example.ts ---')
    expect(stdout).not.toContain('--- scripts/helper.ts ---')
  })

  it('writes a plain text export to an output file', async () => {
    const { stderr } = await execFileAsync(
      process.execPath,
      [tsxPath, scriptPath, '--format=txt', `--output=${generatedOutput}`],
      {
        cwd: fixtureRoot,
      },
    )

    expect(stderr).toBe('')
    await expect(access(generatedOutput)).resolves.toBeUndefined()

    const output = await readFile(generatedOutput, 'utf8')
    expect(output).toContain('--- src/lib/example.ts ---')
    expect(output).not.toContain('```')
  })

  it('writes markdown to export.md by default when stdout is not requested', async () => {
    const { stdout, stderr } = await execFileAsync(process.execPath, [tsxPath, scriptPath], {
      cwd: fixtureRoot,
    })

    expect(stdout).toBe('')
    expect(stderr).toBe('')
    await expect(access(defaultOutput)).resolves.toBeUndefined()

    const output = await readFile(defaultOutput, 'utf8')
    expect(output).toContain('<!-- Files: 3; Estimated tokens:')
    expect(output).toContain('--- src/lib/example.ts ---')
  })

  it('warns and writes an empty export when no-tests and only-tests are combined', async () => {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [tsxPath, scriptPath, '--no-tests', '--only-tests'],
      {
        cwd: fixtureRoot,
      },
    )

    expect(stdout).toBe('')
    expect(stderr).toContain(
      'Warning: --no-tests and --only-tests cancel each other out; exporting an empty set.',
    )
    await expect(access(defaultOutput)).resolves.toBeUndefined()

    const output = await readFile(defaultOutput, 'utf8')
    expect(output).toContain('<!-- Files: 0; Estimated tokens: 0 -->')
    expect(output).toContain('_No files matched._')
  })
})
