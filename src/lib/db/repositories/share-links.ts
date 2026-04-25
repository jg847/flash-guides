import { prisma } from '@/lib/db/client'
import { generateShareToken } from '@/lib/sharing/token'

const sharedGuideSelect = {
  id: true,
  userId: true,
  slug: true,
  title: true,
  studyMode: true,
  inputType: true,
  inputValue: true,
  content: true,
  isPublic: true,
} as const

class ShareLinkRepository {
  async getStatusByToken(token: string): Promise<'active' | 'expired' | 'missing'> {
    const link = await prisma.shareLink.findUnique({
      where: { token },
      select: {
        expiresAt: true,
      },
    })

    if (!link) {
      return 'missing'
    }

    if (link.expiresAt && link.expiresAt.getTime() < Date.now()) {
      return 'expired'
    }

    return 'active'
  }

  async createOwnedShareLink(input: {
    guideId: string
    userId: string
    expiresAt: Date | null
  }): Promise<
    | { status: 'forbidden' }
    | { status: 'existing'; shareLink: { token: string; expiresAt: Date | null } }
    | { status: 'created'; shareLink: { token: string; expiresAt: Date | null } }
  > {
    const guide = await prisma.guide.findFirst({
      where: {
        id: input.guideId,
        userId: input.userId,
      },
      select: {
        id: true,
        shareLink: {
          select: {
            token: true,
            expiresAt: true,
          },
        },
      },
    })

    if (!guide) {
      return { status: 'forbidden' }
    }

    if (guide.shareLink) {
      return { status: 'existing', shareLink: guide.shareLink }
    }

    const shareLink = await prisma.shareLink.create({
      data: {
        guideId: input.guideId,
        token: generateShareToken(),
        expiresAt: input.expiresAt,
      },
      select: {
        token: true,
        expiresAt: true,
      },
    })

    return { status: 'created', shareLink }
  }

  async deleteOwnedShareLink(guideId: string, userId: string): Promise<boolean> {
    const result = await prisma.shareLink.deleteMany({
      where: {
        guideId,
        guide: {
          userId,
        },
      },
    })

    return result.count > 0
  }

  async visitByToken(token: string): Promise<
    | { status: 'missing' }
    | { status: 'expired' }
    | {
        status: 'active'
        guide: {
          id: string
          userId: string | null
          slug: string
          title: string
          studyMode: 'OVERVIEW' | 'DEEP_DIVE' | 'EXAM_PREP' | 'ELI5'
          inputType: 'TOPIC' | 'TEXT' | 'URL'
          inputValue: string
          content: string
          isPublic: boolean
        }
      }
  > {
    const link = await prisma.shareLink.findUnique({
      where: { token },
      select: {
        id: true,
        expiresAt: true,
        guide: {
          select: sharedGuideSelect,
        },
      },
    })

    if (!link) {
      return { status: 'missing' }
    }

    if (link.expiresAt && link.expiresAt.getTime() < Date.now()) {
      return { status: 'expired' }
    }

    await prisma.shareLink.update({
      where: { id: link.id },
      data: {
        clickCount: {
          increment: 1,
        },
      },
    })

    return {
      status: 'active',
      guide: link.guide,
    }
  }
}

export const shareLinkRepository = new ShareLinkRepository()
