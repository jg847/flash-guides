'use client'

import { useState } from 'react'

interface AvatarUploadProps {
  image: string | null
  name: string | null
}

export default function AvatarUpload({ image, name }: AvatarUploadProps) {
  const [imageUrl, setImageUrl] = useState(image)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setIsUploading(true)
    setMessage(null)
    setError(null)

    const formData = new FormData()
    formData.set('avatar', file)

    try {
      const response = await fetch('/api/account/avatar', {
        method: 'POST',
        body: formData,
      })

      const body = (await response.json()) as { imageUrl?: string; error?: string }
      if (!response.ok || !body.imageUrl) {
        throw new Error(body.error ?? 'Upload failed')
      }

      setImageUrl(body.imageUrl)
      setMessage('Avatar updated.')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-900">Avatar</h2>
      <p className="mt-2 text-sm text-stone-500">
        Upload a square image to personalize your account.
      </p>

      <div className="mt-6 flex flex-col items-center rounded-[2rem] bg-[radial-gradient(circle_at_top,#f6efe6,white)] p-6 text-center">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name ?? 'Avatar'}
            className="h-28 w-28 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-stone-900 text-3xl font-semibold text-white">
            {(name?.trim().charAt(0) || 'F').toUpperCase()}
          </div>
        )}

        <label className="mt-5 inline-flex cursor-pointer rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700">
          {isUploading ? 'Uploading...' : 'Upload avatar'}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <p className="mt-3 text-xs uppercase tracking-[0.24em] text-stone-400">
          JPEG, PNG, or WebP · max 2 MB
        </p>
        {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}
      </div>
    </section>
  )
}
