import { prisma } from '@/lib/db/client'
import { generateSlug } from '@/lib/generation/slug'

function buildForkTitle(title: string): string {
  return `[Fork] ${title}`.slice(0, 255)
}

export async function forkGuide(
  sourceId: string,
  targetUserId: string,
): Promise<
  | { status: 'not-found' }
  | {
      status: 'created'
      guide: {
        id: string
        slug: string
        title: string
      }
    }
> {
  const sourceGuide = await prisma.guide.findFirst({
    where: {
      id: sourceId,
      shareLink: {
        isNot: null,
      },
    },
    select: {
      id: true,
      title: true,
      studyMode: true,
      inputType: true,
      inputValue: true,
      content: true,
      tags: {
        select: {
          tagId: true,
        },
      },
      notes: {
        select: {
          selectedText: true,
          content: true,
        },
      },
    },
  })

  if (!sourceGuide) {
    return { status: 'not-found' }
  }

  const forked = await prisma.$transaction(async (tx) => {
    const guide = await tx.guide.create({
      data: {
        userId: targetUserId,
        slug: generateSlug(buildForkTitle(sourceGuide.title)),
        title: buildForkTitle(sourceGuide.title),
        studyMode: sourceGuide.studyMode,
        inputType: sourceGuide.inputType,
        inputValue: sourceGuide.inputValue,
        content: sourceGuide.content,
        isPublic: false,
        isFavorite: false,
        isWatermark: false,
      },
      select: {
        id: true,
        slug: true,
        title: true,
      },
    })

    if (sourceGuide.tags.length > 0) {
      await tx.guideTag.createMany({
        data: sourceGuide.tags.map((tag) => ({
          guideId: guide.id,
          tagId: tag.tagId,
        })),
      })
    }

    for (const note of sourceGuide.notes) {
      await tx.note.create({
        data: {
          userId: targetUserId,
          guideId: guide.id,
          selectedText: note.selectedText,
          content: note.content,
        },
      })
    }

    return guide
  })

  return {
    status: 'created',
    guide: forked,
  }
}
