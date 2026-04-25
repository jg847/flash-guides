import { prisma } from '@/lib/db/client'

interface CreateNoteInput {
  userId: string
  guideId: string
  selectedText: string
  content?: string
}

class NoteRepository {
  async create({ userId, guideId, selectedText, content = '' }: CreateNoteInput) {
    return prisma.note.create({
      data: {
        userId,
        guideId,
        selectedText,
        content,
      },
      select: {
        id: true,
        guideId: true,
        selectedText: true,
        content: true,
        createdAt: true,
      },
    })
  }
}

export const noteRepository = new NoteRepository()
