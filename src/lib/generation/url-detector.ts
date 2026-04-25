const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
])

export function isYouTubeUrl(value: string): boolean {
  try {
    const url = new URL(value)
    if (!YOUTUBE_HOSTS.has(url.hostname.toLowerCase())) {
      return false
    }

    return extractYouTubeVideoId(value) !== null
  } catch {
    return false
  }
}

export function extractYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase()

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id || null
    }

    if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        return url.searchParams.get('v') || null
      }

      const segments = url.pathname.split('/').filter(Boolean)
      if (segments[0] === 'shorts' || segments[0] === 'embed') {
        return segments[1] || null
      }
    }

    return null
  } catch {
    return null
  }
}
