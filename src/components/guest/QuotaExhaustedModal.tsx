'use client'

import Link from 'next/link'

interface QuotaExhaustedModalProps {
  /** Whether the modal is visible */
  open: boolean
  /** Called when the user dismisses the modal */
  onClose?: () => void
}

/**
 * QuotaExhaustedModal — Client Component.
 * Full-screen overlay shown when the server returns 429 (guest quota reached).
 */
export default function QuotaExhaustedModal({ open, onClose }: QuotaExhaustedModalProps) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-heading"
      data-testid="quota-exhausted-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Card — stop click propagation so clicks inside don't close */}
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="quota-modal-heading" className="mb-3 text-2xl font-bold text-gray-900">
          You&apos;ve used your 3 free guides for today
        </h2>
        <p className="mb-6 text-gray-600">
          Sign up free to unlock unlimited guides, save your work, and more.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/register"
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-center font-semibold text-white hover:bg-indigo-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            Create free account
          </Link>
          <Link
            href="/login"
            className="w-full rounded-xl border border-gray-300 px-6 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Log in
          </Link>
        </div>

        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
