import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Verify your email — FlashGuides',
}

interface Props {
  searchParams: Promise<{ token?: string; verified?: string }>
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const params = await searchParams

  // If there's no token in the URL this page is shown after a redirect
  // from the API route — the ?verified=1 param comes from the dashboard redirect.
  // Standalone /verify-email without a token shows a generic message.
  if (!params.token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-lg bg-white px-8 py-10 shadow text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="text-sm text-gray-600">
            We&apos;ve sent a verification link to your email address. Click the link to activate
            your account.
          </p>
          <p className="text-xs text-gray-400">Didn&apos;t receive it? Check your spam folder.</p>
        </div>
      </main>
    )
  }

  // Token present — the API route handles the actual verification via redirect.
  // This page only renders if the API route returned an error (e.g., link opened
  // directly). Redirect the browser to the API verify endpoint.
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-lg bg-white px-8 py-10 shadow text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Verifying…</h1>
        <meta
          httpEquiv="refresh"
          content={`0;url=/api/auth/verify-email?token=${encodeURIComponent(params.token)}`}
        />
        <p className="text-sm text-gray-600">
          If you are not redirected,{' '}
          <Link
            href={`/api/auth/verify-email?token=${encodeURIComponent(params.token)}`}
            className="text-indigo-600 hover:text-indigo-500"
          >
            click here
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
