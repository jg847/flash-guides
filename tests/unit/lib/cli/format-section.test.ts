import { describe, expect, it } from 'vitest'
import { formatSection } from '@/lib/cli/format-section'

describe('formatSection', () => {
  it('formats markdown sections with a fenced block and language tag', () => {
    expect(formatSection('src/lib/example.ts', 'export const value = 1', 'md')).toBe(
      '--- src/lib/example.ts ---\n```ts\nexport const value = 1\n```\n',
    )
  })

  it('formats plain text sections without fences', () => {
    expect(formatSection('scripts/export-source.ts', 'console.log("ok")', 'txt')).toBe(
      '--- scripts/export-source.ts ---\nconsole.log("ok")\n',
    )
  })
})
