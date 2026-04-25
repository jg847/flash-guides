import Link from 'next/link'
import { auth } from '@/lib/auth'
import { hasAuthenticatedUser } from '@/lib/auth/session'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import GuideRenderer from '@/components/guide/GuideRenderer'
import ShareUnavailablePage from '@/app/share/unavailable/page'
import ForkButton from '@/components/sharing/ForkButton'

export const dynamic = 'force-dynamic'

interface SharedGuidePageProps {
  params: Promise<{ token: string }>
}

export default async function SharedGuidePage({ params }: SharedGuidePageProps) {
  const { token } = await params
  const session = await auth()
  const visit = await shareLinkRepository.visitByToken(token)

  if (visit.status !== 'active') {
    return <ShareUnavailablePage />
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_38%,#ffffff_100%)] px-6 py-8">
      <div className="mx-auto mb-8 max-w-6xl rounded-[2rem] border border-sky-200 bg-white/90 p-6 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
          Shared guide
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-7 text-stone-600">
            You are viewing a read-only study guide shared from FlashGuides.
          </p>
          {hasAuthenticatedUser(session) ? (
            <ForkButton guideId={visit.guide.id} />
          ) : (
            <Link
              href="/register"
              className="inline-flex rounded-full border border-sky-300 px-4 py-2 text-sm font-medium text-sky-800"
            >
              Sign up free
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <GuideRenderer guide={visit.guide} isAuthenticated={false} isReadOnly />
      </div>
    </main>
  )
}
