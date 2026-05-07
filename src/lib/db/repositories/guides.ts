import type { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/db/client'
import type {
  DeleteGuidesResult,
  GuideListItem,
  GuideListParams,
  GuideListResult,
  GuideView,
  IGuideReader,
  IGuideWriter,
  SetGuideTagsInput,
  UpdateGuideInput,
} from '@/lib/db/repositories/types'

const guideSummarySelect = {
  id: true,
  slug: true,
  title: true,
  studyMode: true,
  inputType: true,
  createdAt: true,
  updatedAt: true,
  isFavorite: true,
  folder: {
    select: {
      id: true,
      name: true,
    },
  },
  tags: {
    select: {
      tag: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} satisfies Prisma.GuideSelect

type GuideSummaryRecord = Prisma.GuideGetPayload<{ select: typeof guideSummarySelect }>

type SearchIdRow = { id: string }
type SearchCountRow = { total: number | bigint }

function mapGuideSummary(record: GuideSummaryRecord): GuideListItem {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    studyMode: record.studyMode,
    inputType: record.inputType,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    isFavorite: record.isFavorite,
    folder: record.folder,
    tags: record.tags.map(({ tag }) => tag),
  }
}

function getEffectiveLimit(view: GuideView, limit: number): number {
  if (view === 'recent') {
    return Math.min(limit, 5)
  }

  return limit
}

function buildGuideWhere({ userId, tag, folderId, view }: GuideListParams): Prisma.GuideWhereInput {
  return {
    userId,
    ...(folderId ? { folderId } : {}),
    ...(tag ? { tags: { some: { tag: { name: tag } } } } : {}),
    ...(view === 'favorites' ? { isFavorite: true } : {}),
  }
}

class GuideRepository implements IGuideReader, IGuideWriter {
  async list(params: GuideListParams): Promise<GuideListResult> {
    const trimmedQuery = params.q?.trim()
    if (trimmedQuery) {
      return this.search(params, trimmedQuery)
    }

    const where = buildGuideWhere(params)
    const limit = getEffectiveLimit(params.view, params.limit)
    const skip = (params.page - 1) * limit

    const [total, guides] = await Promise.all([
      prisma.guide.count({ where }),
      prisma.guide.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: guideSummarySelect,
      }),
    ])

    return {
      guides: guides.map(mapGuideSummary),
      total,
      page: params.page,
    }
  }

  async update(input: UpdateGuideInput): Promise<GuideListItem | null> {
    if (input.folderId !== undefined) {
      const folderAllowed = await this.isFolderOwnedByUser(input.userId, input.folderId)
      if (!folderAllowed) {
        return null
      }
    }

    const data: Prisma.GuideUncheckedUpdateManyInput = {}

    if (input.title !== undefined) {
      data.title = input.title
    }

    if (input.folderId !== undefined) {
      data.folderId = input.folderId
    }

    if (input.isFavorite !== undefined) {
      data.isFavorite = input.isFavorite
    }

    if (input.content !== undefined) {
      data.content = input.content
    }

    if (Object.keys(data).length === 0) {
      return this.findOwnedById(input.id, input.userId)
    }

    const result = await prisma.guide.updateMany({
      where: {
        id: input.id,
        userId: input.userId,
      },
      data,
    })

    if (result.count === 0) {
      return null
    }

    return this.findOwnedById(input.id, input.userId)
  }

  async deleteManyOwned(userId: string, ids: string[]): Promise<DeleteGuidesResult> {
    const uniqueIds = [...new Set(ids)]

    const [ownedCount, existingCount] = await prisma.$transaction([
      prisma.guide.count({
        where: {
          id: { in: uniqueIds },
          userId,
        },
      }),
      prisma.guide.count({
        where: {
          id: { in: uniqueIds },
        },
      }),
    ])

    if (existingCount > ownedCount) {
      return {
        authorized: false,
        deleted: 0,
      }
    }

    if (ownedCount === 0) {
      return {
        authorized: true,
        deleted: 0,
      }
    }

    const result = await prisma.guide.deleteMany({
      where: {
        id: { in: uniqueIds },
        userId,
      },
    })

    return {
      authorized: true,
      deleted: result.count,
    }
  }

  async setTags(input: SetGuideTagsInput): Promise<GuideListItem | null> {
    const guide = await prisma.guide.findFirst({
      where: {
        id: input.guideId,
        userId: input.userId,
      },
      select: { id: true },
    })

    if (!guide) {
      return null
    }

    const normalizedTags = [...new Set(input.tags.map((tag) => tag.trim()).filter(Boolean))]

    await prisma.$transaction(async (tx) => {
      await tx.guideTag.deleteMany({
        where: { guideId: input.guideId },
      })

      for (const tagName of normalizedTags) {
        const tag = await tx.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
          select: { id: true },
        })

        await tx.guideTag.create({
          data: {
            guideId: input.guideId,
            tagId: tag.id,
          },
        })
      }
    })

    return this.findOwnedById(input.guideId, input.userId)
  }

  private async search(params: GuideListParams, query: string): Promise<GuideListResult> {
    const limit = getEffectiveLimit(params.view, params.limit)
    const offset = (params.page - 1) * limit
    const { joins, conditions, args } = this.buildSearchClauses(params, query)
    const whereClause = conditions.join(' AND ')
    const orderBy =
      params.view === 'recent' ? 'g."createdAt" DESC' : 'bm25(guides_fts), g."createdAt" DESC'

    const countSql = `
      SELECT COUNT(*) AS total
      FROM "guides" g
      ${joins.join('\n')}
      WHERE ${whereClause}
    `

    const idSql = `
      SELECT g."id" AS id
      FROM "guides" g
      ${joins.join('\n')}
      WHERE ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `

    const [countRows, idRows] = await Promise.all([
      prisma.$queryRawUnsafe<SearchCountRow[]>(countSql, ...args),
      prisma.$queryRawUnsafe<SearchIdRow[]>(idSql, ...args, limit, offset),
    ])

    const ids = idRows.map((row) => row.id)
    if (ids.length === 0) {
      return {
        guides: [],
        total: Number(countRows[0]?.total ?? 0),
        page: params.page,
      }
    }

    const guides = await prisma.guide.findMany({
      where: { id: { in: ids } },
      select: guideSummarySelect,
    })

    const byId = new Map(guides.map((guide) => [guide.id, mapGuideSummary(guide)]))

    return {
      guides: ids
        .map((id) => byId.get(id))
        .filter((guide): guide is GuideListItem => guide !== undefined),
      total: Number(countRows[0]?.total ?? 0),
      page: params.page,
    }
  }

  private buildSearchClauses(params: GuideListParams, query: string) {
    const joins = ['INNER JOIN guides_fts ON g.rowid = guides_fts.rowid']
    const conditions = ['g."userId" = ?', 'guides_fts MATCH ?']
    const args: Array<string | number> = [params.userId, query]

    if (params.tag) {
      joins.push('INNER JOIN "guide_tags" gt ON gt."guideId" = g."id"')
      joins.push('INNER JOIN "tags" t ON t."id" = gt."tagId"')
      conditions.push('t."name" = ?')
      args.push(params.tag)
    }

    if (params.folderId) {
      conditions.push('g."folderId" = ?')
      args.push(params.folderId)
    }

    if (params.view === 'favorites') {
      conditions.push('g."isFavorite" = 1')
    }

    return { joins, conditions, args }
  }

  private async findOwnedById(id: string, userId: string): Promise<GuideListItem | null> {
    const guide = await prisma.guide.findFirst({
      where: {
        id,
        userId,
      },
      select: guideSummarySelect,
    })

    return guide ? mapGuideSummary(guide) : null
  }

  private async isFolderOwnedByUser(
    userId: string,
    folderId: string | null | undefined,
  ): Promise<boolean> {
    if (folderId === undefined || folderId === null) {
      return true
    }

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId,
      },
      select: { id: true },
    })

    return Boolean(folder)
  }
}

export const guideRepository = new GuideRepository()
