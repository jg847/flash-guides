import JSZip from 'jszip'
import { prisma } from '@/lib/db/client'

export async function generateUserDataExport(userId: string): Promise<Buffer> {
  const [guides, notes] = await Promise.all([
    prisma.guide.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        studyMode: true,
        inputType: true,
        inputValue: true,
        content: true,
        isPublic: true,
        isFavorite: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        guideId: true,
        selectedText: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
  ])

  const zip = new JSZip()
  const guidesFolder = zip.folder('guides')

  for (const guide of guides) {
    guidesFolder?.file(`${guide.slug}.md`, guide.content)
  }

  zip.file(
    'data.json',
    JSON.stringify(
      {
        guides,
        notes,
      },
      null,
      2,
    ),
  )

  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
}
