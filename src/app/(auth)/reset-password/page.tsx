import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Reset password — FlashGuides',
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Set a new password</h1>
          <p className="mt-2 text-sm text-gray-600">Choose a strong password for your account.</p>
        </div>
        <div className="rounded-lg bg-white px-8 py-10 shadow">
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
