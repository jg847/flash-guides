import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      count: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      updateMany: vi.fn(),
      deleteMany: vi.fn(),
    },
    folder: {
      findFirst: vi.fn(),
    },
    tag: {
      upsert: vi.fn(),
    },
    guideTag: {
      deleteMany: vi.fn(),
      create: vi.fn(),
    },
    $queryRawUnsafe: vi.fn(),
    $transaction: vi.fn(),
  },
}))

import { prisma } from '@/lib/db/client'
import { guideRepository } from '@/lib/db/repositories/guides'

const mockCount = prisma.guide.count as ReturnType<typeof vi.fn>
const mockFindMany = prisma.guide.findMany as ReturnType<typeof vi.fn>
const mockFindFirst = prisma.guide.findFirst as ReturnType<typeof vi.fn>
const mockUpdateMany = prisma.guide.updateMany as ReturnType<typeof vi.fn>
const mockDeleteMany = prisma.guide.deleteMany as ReturnType<typeof vi.fn>
const mockFolderFindFirst = prisma.folder.findFirst as ReturnType<typeof vi.fn>
const mockTagUpsert = prisma.tag.upsert as ReturnType<typeof vi.fn>
const mockGuideTagDeleteMany = prisma.guideTag.deleteMany as ReturnType<typeof vi.fn>
const mockGuideTagCreate = prisma.guideTag.create as ReturnType<typeof vi.fn>
const mockQueryRawUnsafe = prisma.$queryRawUnsafe as ReturnType<typeof vi.fn>
const mockTransaction = prisma.$transaction as ReturnType<typeof vi.fn>

const GUIDE_RECORD = {
  id: 'cmguidetest0000000000000001',
  slug: 'react-basics',
  title: 'React Basics',
  studyMode: 'OVERVIEW',
  inputType: 'TOPIC',
  createdAt: new Date('2026-04-23T00:00:00.000Z'),
  updatedAt: new Date('2026-04-23T00:00:00.000Z'),
  isFavorite: false,
  folder: { id: 'cmfolder000000000000000001', name: 'Frontend' },
  tags: [{ tag: { id: 'cmtag00000000000000000001', name: 'react' } }],
}

beforeEach(() => {
  vi.clearAllMocks()
  mockCount.mockResolvedValue(1)
  mockFindMany.mockResolvedValue([GUIDE_RECORD])
  mockFindFirst.mockResolvedValue(GUIDE_RECORD)
  mockUpdateMany.mockResolvedValue({ count: 1 })
  mockDeleteMany.mockResolvedValue({ count: 1 })
  mockFolderFindFirst.mockResolvedValue({ id: 'cmfolder000000000000000001' })
  mockTagUpsert.mockResolvedValue({ id: 'cmtag00000000000000000001' })
  mockGuideTagDeleteMany.mockResolvedValue({ count: 1 })
  mockGuideTagCreate.mockResolvedValue({
    guideId: GUIDE_RECORD.id,
    tagId: 'cmtag00000000000000000001',
  })
  mockQueryRawUnsafe.mockResolvedValue([{ id: GUIDE_RECORD.id }])
  mockTransaction.mockImplementation((arg: unknown) => {
    if (typeof arg === 'function') {
      return arg({
        guideTag: {
          deleteMany: mockGuideTagDeleteMany,
          create: mockGuideTagCreate,
        },
        tag: {
          upsert: mockTagUpsert,
        },
      })
    }

    return Promise.all(arg as Promise<unknown>[])
  })
})

describe('GuideRepository.list', () => {
  it('returns guides for a user with mapped tags and folder', async () => {
    const result = await guideRepository.list({
      userId: 'user-1',
      view: 'all',
      page: 1,
      limit: 24,
    })

    expect(result).toEqual({
      guides: [
        {
          id: GUIDE_RECORD.id,
          slug: 'react-basics',
          title: 'React Basics',
          studyMode: 'OVERVIEW',
          inputType: 'TOPIC',
          createdAt: GUIDE_RECORD.createdAt,
          updatedAt: GUIDE_RECORD.updatedAt,
          isFavorite: false,
          folder: { id: 'cmfolder000000000000000001', name: 'Frontend' },
          tags: [{ id: 'cmtag00000000000000000001', name: 'react' }],
        },
      ],
      total: 1,
      page: 1,
    })
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        take: 24,
        where: { userId: 'user-1' },
      }),
    )
  })

  it('uses the FTS table for ranked search results', async () => {
    mockQueryRawUnsafe
      .mockResolvedValueOnce([{ total: 1 }])
      .mockResolvedValueOnce([{ id: GUIDE_RECORD.id }])

    const result = await guideRepository.list({
      userId: 'user-1',
      q: 'react',
      view: 'all',
      page: 1,
      limit: 24,
    })

    expect(result.guides).toHaveLength(1)
    expect(mockQueryRawUnsafe).toHaveBeenCalledTimes(2)
    expect(String(mockQueryRawUnsafe.mock.calls[1]?.[0])).toContain('guides_fts')
    expect(mockQueryRawUnsafe.mock.calls[1]?.slice(1)).toEqual(['user-1', 'react', 24, 0])
  })

  it('applies pagination offsets for later pages', async () => {
    await guideRepository.list({
      userId: 'user-1',
      view: 'all',
      page: 2,
      limit: 10,
    })

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 10,
        take: 10,
      }),
    )
  })
})

describe('GuideRepository.update', () => {
  it('updates favorite state for an owned guide', async () => {
    mockFindFirst.mockResolvedValueOnce({
      ...GUIDE_RECORD,
      isFavorite: true,
    })

    const result = await guideRepository.update({
      id: GUIDE_RECORD.id,
      userId: 'user-1',
      isFavorite: true,
    })

    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: {
        id: GUIDE_RECORD.id,
        userId: 'user-1',
      },
      data: {
        isFavorite: true,
      },
    })
    expect(result?.isFavorite).toBe(true)
  })

  it('updates content for an owned guide', async () => {
    mockFindFirst.mockResolvedValueOnce({
      ...GUIDE_RECORD,
      content: '# Updated',
    })

    await guideRepository.update({
      id: GUIDE_RECORD.id,
      userId: 'user-1',
      content: '# Updated',
    })

    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: {
        id: GUIDE_RECORD.id,
        userId: 'user-1',
      },
      data: {
        content: '# Updated',
      },
    })
  })

  it('rejects folder assignment to another user folder', async () => {
    mockFolderFindFirst.mockResolvedValueOnce(null)

    const result = await guideRepository.update({
      id: GUIDE_RECORD.id,
      userId: 'user-1',
      folderId: 'cmfolder000000000000000099',
    })

    expect(result).toBeNull()
    expect(mockUpdateMany).not.toHaveBeenCalled()
  })
})

describe('GuideRepository.setTags', () => {
  it('replaces tags for an owned guide', async () => {
    mockFindFirst.mockResolvedValueOnce({ id: GUIDE_RECORD.id }).mockResolvedValueOnce({
      ...GUIDE_RECORD,
      tags: [{ tag: { id: 'cmtag00000000000000000001', name: 'react' } }],
    })

    const result = await guideRepository.setTags({
      guideId: GUIDE_RECORD.id,
      userId: 'user-1',
      tags: ['react', 'react', ' hooks '],
    })

    expect(mockGuideTagDeleteMany).toHaveBeenCalledWith({
      where: { guideId: GUIDE_RECORD.id },
    })
    expect(mockTagUpsert).toHaveBeenCalledTimes(2)
    expect(mockGuideTagCreate).toHaveBeenCalledTimes(2)
    expect(result?.id).toBe(GUIDE_RECORD.id)
  })
})
