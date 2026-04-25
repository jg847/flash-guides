import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    folder: {
      create: vi.fn(),
      findMany: vi.fn(),
      updateMany: vi.fn(),
      findFirst: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}))

import { prisma } from '@/lib/db/client'
import { folderRepository } from '@/lib/db/repositories/folders'

const mockCreate = prisma.folder.create as ReturnType<typeof vi.fn>
const mockFindMany = prisma.folder.findMany as ReturnType<typeof vi.fn>
const mockUpdateMany = prisma.folder.updateMany as ReturnType<typeof vi.fn>
const mockFindFirst = prisma.folder.findFirst as ReturnType<typeof vi.fn>
const mockDeleteMany = prisma.folder.deleteMany as ReturnType<typeof vi.fn>

const FOLDER = {
  id: 'cmfolder000000000000000001',
  userId: 'user-1',
  name: 'Frontend',
  createdAt: new Date('2026-04-23T00:00:00.000Z'),
}

beforeEach(() => {
  vi.clearAllMocks()
  mockCreate.mockResolvedValue(FOLDER)
  mockFindMany.mockResolvedValue([FOLDER])
  mockUpdateMany.mockResolvedValue({ count: 1 })
  mockFindFirst.mockResolvedValue(FOLDER)
  mockDeleteMany.mockResolvedValue({ count: 1 })
})

describe('FolderRepository', () => {
  it('creates a folder for a user', async () => {
    const result = await folderRepository.create({ userId: 'user-1', name: 'Frontend' })

    expect(result).toEqual(FOLDER)
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        name: 'Frontend',
      },
      select: expect.any(Object),
    })
  })

  it('lists folders for a user in sidebar order', async () => {
    const result = await folderRepository.listByUser('user-1')

    expect(result).toEqual([FOLDER])
    expect(mockFindMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      orderBy: [{ createdAt: 'asc' }, { name: 'asc' }],
      select: expect.any(Object),
    })
  })

  it('renames an owned folder', async () => {
    const result = await folderRepository.rename({
      id: 'cmfolder000000000000000001',
      userId: 'user-1',
      name: 'Core Frontend',
    })

    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: {
        id: 'cmfolder000000000000000001',
        userId: 'user-1',
      },
      data: {
        name: 'Core Frontend',
      },
    })
    expect(result).toEqual(FOLDER)
  })

  it('deletes an owned folder', async () => {
    const result = await folderRepository.deleteOwned('user-1', 'cmfolder000000000000000001')

    expect(result).toEqual({ deleted: true })
    expect(mockDeleteMany).toHaveBeenCalledWith({
      where: {
        id: 'cmfolder000000000000000001',
        userId: 'user-1',
      },
    })
  })
})
