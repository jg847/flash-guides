import { getRetryAfterSeconds, type RateLimitStatus } from './index'

interface UserWindowEntry {
  count: number
  windowStart: number
}

const userWindowStore = new Map<string, UserWindowEntry>()

export function checkUserWindowRateLimit(
  scope: string,
  userId: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): RateLimitStatus {
  const key = `${scope}:${userId}`
  const existing = userWindowStore.get(key)

  let entry = existing
  if (!entry || now - entry.windowStart >= windowMs) {
    entry = {
      count: 0,
      windowStart: now,
    }
  }

  const resetsAt = new Date(entry.windowStart + windowMs)
  if (entry.count >= limit) {
    return {
      allowed: false,
      used: entry.count,
      limit,
      remaining: 0,
      resetsAt,
      retryAfter: getRetryAfterSeconds(resetsAt, new Date(now)),
    }
  }

  entry.count += 1
  userWindowStore.set(key, entry)

  return {
    allowed: true,
    used: entry.count,
    limit,
    remaining: Math.max(0, limit - entry.count),
    resetsAt,
    retryAfter: getRetryAfterSeconds(resetsAt, new Date(now)),
  }
}

export function resetUserWindowRateLimitStoreForTests(): void {
  userWindowStore.clear()
}

// TODO: Replace this process-local store with Redis so limits hold across instances.
