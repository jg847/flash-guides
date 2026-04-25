import { prisma } from '@/lib/db/client'
import type {
  CreateFolderInput,
  DeleteFolderResult,
  FolderItem,
  IFolderRepository,
  UpdateFolderInput,
} from '@/lib/db/repositories/types'

const folderSelect = {
  id: true,
  userId: true,
  name: true,
  createdAt: true,
} as const

class FolderRepository implements IFolderRepository {
  async create(input: CreateFolderInput): Promise<FolderItem> {
    return prisma.folder.create({
      data: {
        userId: input.userId,
        name: input.name,
      },
      select: folderSelect,
    })
  }

  async listByUser(userId: string): Promise<FolderItem[]> {
    return prisma.folder.findMany({
      where: { userId },
      orderBy: [{ createdAt: 'asc' }, { name: 'asc' }],
      select: folderSelect,
    })
  }

  async rename(input: UpdateFolderInput): Promise<FolderItem | null> {
    const result = await prisma.folder.updateMany({
      where: {
        id: input.id,
        userId: input.userId,
      },
      data: {
        name: input.name,
      },
    })

    if (result.count === 0) {
      return null
    }

    return prisma.folder.findFirst({
      where: {
        id: input.id,
        userId: input.userId,
      },
      select: folderSelect,
    })
  }

  async deleteOwned(userId: string, id: string): Promise<DeleteFolderResult> {
    const result = await prisma.folder.deleteMany({
      where: {
        id,
        userId,
      },
    })

    return {
      deleted: result.count > 0,
    }
  }
}

export const folderRepository = new FolderRepository()
