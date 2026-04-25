import { beforeEach, describe, expect, it, vi } from 'vitest'
import JSZip from 'jszip'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      findMany: vi.fn(),
    },
    note: {
      findMany: vi.fn(),
    },
  },
}))

import { prisma } from '@/lib/db/client'
import { generateUserDataExport } from '@/lib/export/data-exporter'

const mockGuideFindMany = prisma.guide.findMany as ReturnType<typeof vi.fn>
const mockNoteFindMany = prisma.note.findMany as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockGuideFindMany.mockResolvedValue([
    {
      id: 'guide-1',
      slug: 'react-basics',
      title: 'React Basics',
      studyMode: 'OVERVIEW',
      inputType: 'TOPIC',
      inputValue: 'React basics',
      content: '# React Basics',
      isPublic: true,
      isFavorite: false,
      createdAt: new Date('2026-04-23T00:00:00.000Z'),
      updatedAt: new Date('2026-04-23T00:00:00.000Z'),
    },
  ])
  mockNoteFindMany.mockResolvedValue([
    {
      id: 'note-1',
      guideId: 'guide-1',
      selectedText: 'React basics',
      content: 'A helpful note',
      createdAt: new Date('2026-04-23T00:00:00.000Z'),
      updatedAt: new Date('2026-04-23T00:00:00.000Z'),
    },
  ])
})

describe('generateUserDataExport', () => {
  it('creates a zip with guide markdown and a json manifest', async () => {
    const archive = await generateUserDataExport('user-1')

    const zip = await JSZip.loadAsync(archive)
    const guideFile = await zip.file('guides/react-basics.md')?.async('string')
    const manifest = await zip.file('data.json')?.async('string')

    expect(guideFile).toBe('# React Basics')
    expect(manifest).toContain('React Basics')
    expect(manifest).toContain('A helpful note')
  })
})
