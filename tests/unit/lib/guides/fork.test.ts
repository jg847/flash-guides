import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      findFirst: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}))

vi.mock('@/lib/generation/slug', () => ({
  generateSlug: vi.fn(() => 'fork-react-basics-abc123xyz'),
}))

import { prisma } from '@/lib/db/client'
import { forkGuide } from '@/lib/guides/fork'

const mockFindFirst = prisma.guide.findFirst as ReturnType<typeof vi.fn>
const mockTransaction = prisma.$transaction as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockFindFirst.mockResolvedValue({
    id: 'guide-1',
    title: 'React Basics',
    studyMode: 'OVERVIEW',
    inputType: 'TOPIC',
    inputValue: 'React basics',
    content: '# React Basics',
    tags: [{ tagId: 'tag-1' }],
    notes: [{ selectedText: 'React', content: 'Helpful note' }],
  })
  mockTransaction.mockImplementation(async (callback) => {
    const tx = {
      guide: {
        create: vi.fn().mockResolvedValue({
          id: 'guide-2',
          slug: 'fork-react-basics-abc123xyz',
          title: '[Fork] React Basics',
        }),
      },
      guideTag: {
        createMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      note: {
        create: vi.fn().mockResolvedValue({ id: 'note-2' }),
      },
    }

    return callback(tx)
  })
})

describe('forkGuide', () => {
  it('creates a deep copy of a shareable guide', async () => {
    const result = await forkGuide('guide-1', 'user-2')

    expect(result).toEqual({
      status: 'created',
      guide: {
        id: 'guide-2',
        slug: 'fork-react-basics-abc123xyz',
        title: '[Fork] React Basics',
      },
    })
  })

  it('returns not-found when the source guide is not shareable', async () => {
    mockFindFirst.mockResolvedValueOnce(null)

    const result = await forkGuide('guide-404', 'user-2')

    expect(result).toEqual({ status: 'not-found' })
    expect(mockTransaction).not.toHaveBeenCalled()
  })
})
