import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { folderRepository } from '@/lib/db/repositories/folders'
import { guideRepository } from '@/lib/db/repositories/guides'
import { prisma } from '@/lib/db/client'
import DashboardShell from '@/components/dashboard/DashboardShell'

export const metadata: Metadata = {
  title: 'Dashboard - FlashGuides',
}

async function getUsageSummary(userId: string) {
  const [totalGuides, usageRows] = await Promise.all([
    prisma.guide.count({ where: { userId } }),
    prisma.$queryRawUnsafe<Array<{ bytes: number | bigint | null }>>(
      'SELECT COALESCE(SUM(LENGTH("content") + LENGTH("title") + LENGTH("inputValue")), 0) AS bytes FROM "guides" WHERE "userId" = ?',
      userId,
    ),
  ])

  return {
    totalGuides,
    approxBytes: Number(usageRows[0]?.bytes ?? 0),
  }
}

export default async function DashboardPage() {
  const session = await auth()
  const sessionUserId = await getSessionUserId(session)

  if (!sessionUserId) {
    redirect('/login?callbackUrl=/dashboard')
  }

  const [guideResult, folders, usageSummary] = await Promise.all([
    guideRepository.list({
      userId: sessionUserId,
      view: 'all',
      page: 1,
      limit: 24,
    }),
    folderRepository.listByUser(sessionUserId),
    getUsageSummary(sessionUserId),
  ])

  return (
    <DashboardShell
      initialGuides={guideResult.guides}
      initialTotal={guideResult.total}
      initialPage={guideResult.page}
      initialFolders={folders}
      usageSummary={usageSummary}
    />
  )
}
