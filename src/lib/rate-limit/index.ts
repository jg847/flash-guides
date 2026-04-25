import { checkAndIncrementQuota } from '@/lib/guest/quota'

export interface RateLimitStatus {
  allowed: boolean
  used: number
  limit: number
  remaining: number
  resetsAt: Date
  retryAfter: number
}

export function getRetryAfterSeconds(resetsAt: Date, now: Date = new Date()): number {
  return Math.max(0, Math.ceil((resetsAt.getTime() - now.getTime()) / 1000))
}

export async function checkGuestGenerationRateLimit(ip: string): Promise<RateLimitStatus> {
  const quota = await checkAndIncrementQuota(ip)

  return {
    allowed: quota.allowed,
    used: quota.used,
    limit: quota.limit,
    remaining: Math.max(0, quota.limit - quota.used),
    resetsAt: quota.resetsAt,
    retryAfter: getRetryAfterSeconds(quota.resetsAt),
  }
}
