import { Suspense } from 'react'
import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Create account — FlashGuides',
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Create your account</h1>
          <p className="mt-2 text-sm text-zinc-400">Start building and sharing guides today.</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-8 py-10 shadow-2xl shadow-black/30">
          <Suspense fallback={<div className="text-sm text-zinc-400">Loading form...</div>}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
