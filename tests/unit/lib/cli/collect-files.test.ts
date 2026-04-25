import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { collectFiles } from '@/lib/cli/collect-files'

async function writeFixture(root: string, relativePath: string, content: string) {
  const destination = path.join(root, relativePath)
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, content, 'utf8')
}

describe('collectFiles', () => {
  let fixtureRoot = ''

  beforeEach(async () => {
    fixtureRoot = await mkdtemp(path.join(os.tmpdir(), 'flashguides-cli-'))
    await writeFixture(fixtureRoot, 'src/lib/example.ts', 'export const example = true\n')
    await writeFixture(fixtureRoot, 'src/lib/example.test.ts', 'expect(true).toBe(true)\n')
    await writeFixture(fixtureRoot, 'scripts/export.ts', 'console.log("export")\n')
    await writeFixture(fixtureRoot, 'tests/integration/sample.spec.ts', 'expect(true).toBe(true)\n')
    await writeFixture(fixtureRoot, '.env', 'ANTHROPIC_API_KEY=sk-secret\n')
    await writeFixture(fixtureRoot, 'src/lib/unsafe.ts', 'FAL_API_KEY=sk-secret\n')
    await writeFixture(fixtureRoot, 'src/generated/client.ts', 'export const generated = true\n')
  })

  afterEach(async () => {
    if (fixtureRoot) {
      await rm(fixtureRoot, { recursive: true, force: true })
    }
  })

  it('collects default src and scripts files while applying always-exclude and content-scan rules', async () => {
    await expect(collectFiles({ cwd: fixtureRoot })).resolves.toEqual([
      'scripts/export.ts',
      'src/generated/client.ts',
      'src/lib/example.test.ts',
      'src/lib/example.ts',
    ])
  })

  it('supports no-tests and only-tests filters', async () => {
    await expect(collectFiles({ cwd: fixtureRoot, noTests: true })).resolves.toEqual([
      'scripts/export.ts',
      'src/generated/client.ts',
      'src/lib/example.ts',
    ])

    await expect(collectFiles({ cwd: fixtureRoot, onlyTests: true })).resolves.toEqual([
      'src/lib/example.test.ts',
      'tests/integration/sample.spec.ts',
    ])
  })

  it('composes include and exclude filters with the default file set', async () => {
    await expect(
      collectFiles({
        cwd: fixtureRoot,
        include: 'src/**',
        exclude: 'src/generated/**',
        noTests: true,
      }),
    ).resolves.toEqual(['src/lib/example.ts'])
  })

  it('returns an empty set if no-tests and only-tests are both set', async () => {
    await expect(
      collectFiles({ cwd: fixtureRoot, noTests: true, onlyTests: true }),
    ).resolves.toEqual([])
  })
})
