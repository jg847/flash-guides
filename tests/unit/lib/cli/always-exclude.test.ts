import { describe, expect, it } from 'vitest'
import {
  applyAlwaysExclude,
  containsSecretPattern,
  isAlwaysExcludedPath,
} from '@/lib/cli/always-exclude'

describe('applyAlwaysExclude', () => {
  it('removes secrets, build outputs, lockfiles, and binary assets', () => {
    expect(
      applyAlwaysExclude([
        'src/lib/example.ts',
        '.env',
        '.env.local',
        'prisma.config.ts',
        'node_modules/pkg/index.js',
        '.next/server/app.js',
        'dist/export.js',
        'pnpm-lock.yaml',
        'public/logo.png',
        'keys/private.pem',
      ]),
    ).toEqual(['src/lib/example.ts'])
  })

  it('exposes path-level exclusion checks', () => {
    expect(isAlwaysExcludedPath('src/lib/example.ts')).toBe(false)
    expect(isAlwaysExcludedPath('secrets/file.key')).toBe(true)
  })

  it('detects secret-like content patterns', () => {
    expect(containsSecretPattern('ANTHROPIC_API_KEY=sk-test')).toBe(true)
    expect(containsSecretPattern("const apiKey = process.env['ANTHROPIC_API_KEY']")).toBe(true)
    expect(containsSecretPattern('const safeValue = "hello"')).toBe(false)
  })
})
