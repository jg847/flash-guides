import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db/client'
import { auth } from '@/lib/auth'
import { getSessionUserId, hasAuthenticatedUser } from '@/lib/auth/session'
import GuideRenderer from '@/components/guide/GuideRenderer'

interface GuidePageProps {
  params: Promise<{ slug: string }>
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const session = await auth()
  const sessionUserId = await getSessionUserId(session)

  const guide = await prisma.guide.findUnique({
    where: { slug },
    select: {
      id: true,
      userId: true,
      isWatermark: true,
      slug: true,
      title: true,
      studyMode: true,
      inputType: true,
      inputValue: true,
      content: true,
      isPublic: true,
    },
  })

  if (!guide) {
    notFound()
  }

  const isClaimableGuestGuide = Boolean(!guide.userId && guide.isWatermark)

  if (!guide.isPublic && !isClaimableGuestGuide && sessionUserId !== guide.userId) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/guide/${guide.slug}`)}`)
  }

  return (
    <GuideRenderer
      guide={guide}
      isAuthenticated={hasAuthenticatedUser(session)}
      isClaimableGuestGuide={isClaimableGuestGuide}
      canShare={Boolean(sessionUserId && sessionUserId === guide.userId)}
    />
  )
}
