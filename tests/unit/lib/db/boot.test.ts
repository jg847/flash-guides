import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  isFileDatabaseUrl: vi.fn(() => true),
  prisma: {
    $executeRawUnsafe: vi.fn(),
  },
}))

import { prisma } from '@/lib/db/client'
import { bootDatabase } from '@/lib/db/boot'

const mockExecuteRawUnsafe = prisma.$executeRawUnsafe as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockExecuteRawUnsafe.mockResolvedValue(undefined)
})

describe('bootDatabase', () => {
  it('applies pragmas and restores guide FTS infrastructure', async () => {
    await bootDatabase()

    const statements = mockExecuteRawUnsafe.mock.calls.map(([sql]) => sql)

    expect(statements).toEqual(
      expect.arrayContaining([
        'PRAGMA journal_mode = WAL;',
        'PRAGMA synchronous = NORMAL;',
        'PRAGMA foreign_keys = ON;',
        'PRAGMA busy_timeout = 5000;',
        'PRAGMA temp_store = MEMORY;',
        expect.stringContaining('CREATE VIRTUAL TABLE IF NOT EXISTS "guides_fts"'),
        'INSERT INTO "guides_fts"("guides_fts") VALUES (\'rebuild\');',
        expect.stringContaining('CREATE TRIGGER IF NOT EXISTS "guides_fts_ai"'),
        expect.stringContaining('CREATE TRIGGER IF NOT EXISTS "guides_fts_ad"'),
        expect.stringContaining('CREATE TRIGGER IF NOT EXISTS "guides_fts_au"'),
      ]),
    )
  })
})
