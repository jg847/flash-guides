import type { PrismaClient } from '@/generated/prisma'
import { hashPassword } from '@/lib/auth/password'

export const SEEDED_USER_EMAIL = 'playwright-user@flashguides.local'
export const SEEDED_USER_PASSWORD = 'Passw0rd!123'
export const SEEDED_GUIDE_SLUG = 'react-basics-seeded'
export const SEEDED_DASHBOARD_FOLDER = 'Frontend'
export const SEEDED_DASHBOARD_TITLES = {
  primary: 'React Basics',
  search: 'Hooks Mastery',
  recent: 'TypeScript Patterns',
  favorite: 'Exam Prep Algebra',
  delete: 'CSS Layout Systems',
} as const

const SEEDED_GUIDE_CONTENT = `# React Basics

React is a library for building user interfaces.

## Components

React components are reusable building blocks for interface composition.

## Hooks

Hooks let function components use state and lifecycle behavior.

## Practice Questions

JSX stands for JavaScript XML.

## Flashcards

- What is a component? A reusable piece of UI.
- What is a hook? A function for React state or lifecycle behavior.
`

export async function resetSeedData(prisma: PrismaClient): Promise<void> {
  await prisma.note.deleteMany()
  await prisma.guideTag.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.guide.deleteMany()
  await prisma.folder.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()
  await prisma.guestQuota.deleteMany()
}

export async function seedBaselineData(prisma: PrismaClient): Promise<void> {
  const passwordHash = await hashPassword(SEEDED_USER_PASSWORD)

  const user = await prisma.user.create({
    data: {
      email: SEEDED_USER_EMAIL,
      name: 'Playwright User',
      password: passwordHash,
      emailVerified: new Date('2026-04-23T00:00:00.000Z'),
    },
  })

  const folder = await prisma.folder.create({
    data: {
      userId: user.id,
      name: SEEDED_DASHBOARD_FOLDER,
    },
  })

  const reactTag = await prisma.tag.create({
    data: { name: 'react' },
  })

  const hooksTag = await prisma.tag.create({
    data: { name: 'hooks' },
  })

  const guides = await Promise.all([
    prisma.guide.create({
      data: {
        userId: user.id,
        slug: SEEDED_GUIDE_SLUG,
        title: SEEDED_DASHBOARD_TITLES.primary,
        studyMode: 'OVERVIEW',
        inputType: 'TOPIC',
        inputValue: 'React basics',
        content: SEEDED_GUIDE_CONTENT,
        isPublic: true,
        isWatermark: false,
        folderId: folder.id,
      },
    }),
    prisma.guide.create({
      data: {
        userId: user.id,
        slug: 'hooks-mastery-seeded',
        title: SEEDED_DASHBOARD_TITLES.search,
        studyMode: 'DEEP_DIVE',
        inputType: 'TOPIC',
        inputValue: 'React hooks',
        content: '# Hooks Mastery\n\nUnderstand useState, useEffect, and custom hooks.',
        isPublic: false,
        isWatermark: false,
        folderId: folder.id,
      },
    }),
    prisma.guide.create({
      data: {
        userId: user.id,
        slug: 'typescript-patterns-seeded',
        title: SEEDED_DASHBOARD_TITLES.recent,
        studyMode: 'OVERVIEW',
        inputType: 'TOPIC',
        inputValue: 'TypeScript patterns',
        content:
          '# TypeScript Patterns\n\nUnion narrowing, discriminated unions, and utility types.',
        isPublic: false,
        isWatermark: false,
      },
    }),
    prisma.guide.create({
      data: {
        userId: user.id,
        slug: 'exam-prep-algebra-seeded',
        title: SEEDED_DASHBOARD_TITLES.favorite,
        studyMode: 'EXAM_PREP',
        inputType: 'TOPIC',
        inputValue: 'Algebra exam prep',
        content: '# Algebra Review\n\nQuadratics, factoring, and systems of equations.',
        isPublic: false,
        isWatermark: false,
        isFavorite: true,
      },
    }),
    prisma.guide.create({
      data: {
        userId: user.id,
        slug: 'css-layout-systems-seeded',
        title: SEEDED_DASHBOARD_TITLES.delete,
        studyMode: 'ELI5',
        inputType: 'TOPIC',
        inputValue: 'CSS layout systems',
        content: '# CSS Layouts\n\nFlexbox and Grid for page layout.',
        isPublic: false,
        isWatermark: false,
      },
    }),
  ])

  await prisma.guideTag.createMany({
    data: [
      { guideId: guides[0].id, tagId: reactTag.id },
      { guideId: guides[1].id, tagId: reactTag.id },
      { guideId: guides[1].id, tagId: hooksTag.id },
      { guideId: guides[2].id, tagId: hooksTag.id },
    ],
  })

  await prisma.note.create({
    data: {
      userId: user.id,
      guideId: guides[0].id,
      selectedText: 'React components are reusable building blocks for interface composition.',
      content: 'Useful explanation for the export and deletion flow.',
    },
  })
}

export async function reseedDatabase(prisma: PrismaClient): Promise<void> {
  await resetSeedData(prisma)
  await seedBaselineData(prisma)
}
