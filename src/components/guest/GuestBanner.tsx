import Link from 'next/link'
import { auth } from '@/lib/auth'
import { hasAuthenticatedUser } from '@/lib/auth/session'
import { getQuotaStatus } from '@/lib/guest/quota'
import { getLogger } from '@/lib/logger'
import { headers } from 'next/headers'

/**
 * GuestBanner — Server Component.
 * Renders a sticky top banner for unauthenticated visitors showing their
 * daily quota usage and a sign-up CTA. Returns null for logged-in users.
 */
export default async function GuestBanner() {
  let used: number | null = null
  let limit: number | null = null

  try {
    const session = await auth()

    // Do not show the banner to authenticated users
    if (hasAuthenticatedUser(session)) return null

    // Extract IP from incoming request headers (available in RSC via next/headers)
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded ? (forwarded.split(',')[0]?.trim() ?? 'unknown') : 'unknown'

    const quotaStatus = await getQuotaStatus(ip)
    used = quotaStatus.used
    limit = quotaStatus.limit
  } catch (error) {
    getLogger().error({ error, event: 'guest-banner.render.failed' }, 'Guest banner render failed')
    return null
  }

  return (
    <div
      role="banner"
      aria-label="Guest quota banner"
      className="sticky top-0 z-50 w-full bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-900 flex items-center justify-between gap-4"
    >
      <span>
        You&apos;re using FlashGuides as a guest.{' '}
        <strong>
          {used} of {limit} free guides
        </strong>{' '}
        used today.
      </span>
      <Link
        href="/register"
        className="shrink-0 font-semibold underline underline-offset-2 hover:text-amber-700 transition-colors"
      >
        Sign up free →
      </Link>
    </div>
  )
}
