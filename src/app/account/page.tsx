import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import ProfileSection from '@/components/account/ProfileSection'
import AvatarUpload from '@/components/account/AvatarUpload'
import PasswordSection from '@/components/account/PasswordSection'
import EmailSection from '@/components/account/EmailSection'
import ConnectedAccountsSection from '@/components/account/ConnectedAccountsSection'
import DangerZone from '@/components/account/DangerZone'
import WorkspacePageHeader from '@/components/ui/WorkspacePageHeader'

export const metadata: Metadata = {
  title: 'Account - FlashGuides',
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const emailChangedState = Array.isArray(resolvedSearchParams?.emailChanged)
    ? (resolvedSearchParams.emailChanged[0] ?? null)
    : (resolvedSearchParams?.emailChanged ?? null)

  const session = await auth()
  const sessionUserId = await getSessionUserId(session)

  if (!sessionUserId) {
    redirect('/login?callbackUrl=/account')
  }

  const user = await userRepository.getAccountPageUser(sessionUserId)
  if (!user) {
    redirect('/login?callbackUrl=/account')
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8f6f0_0%,#f4efe7_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <WorkspacePageHeader
          title="Manage your profile"
          description="Update your identity, manage connected sign-in providers, and verify account changes safely."
        />

        <div className="grid gap-6 lg:grid-cols-[320px,minmax(0,1fr)]">
          <AvatarUpload image={user.image} name={user.name} />
          <div className="space-y-6">
            <ProfileSection user={user} />
            <EmailSection
              email={user.email}
              pendingEmail={user.pendingEmail}
              emailChangedState={emailChangedState}
            />
            {user.hasPassword ? <PasswordSection /> : null}
            <ConnectedAccountsSection providers={user.providers} />
            <DangerZone email={user.email} />
          </div>
        </div>
      </div>
    </main>
  )
}
