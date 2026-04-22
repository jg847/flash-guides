import { prisma } from '@/lib/db/client'

export const GUEST_DAILY_LIMIT = 3

/**
 * Compute the next midnight UTC from a given date.
 */
function nextMidnightUTC(from: Date = new Date()): Date {
  const next = new Date(from)
  next.setUTCHours(24, 0, 0, 0)
  return next
}

/**
 * Sanitize an IP string: take the first segment of a comma-separated
 * x-forwarded-for list and validate it looks like an IPv4 or IPv6 address.
 * Falls back to 'unknown' if the value is clearly invalid.
 */
export function sanitizeIp(raw: string | null | undefined): string {
  if (!raw) return 'unknown'
  const first = raw.split(',')[0]?.trim() ?? ''
  // Basic validation: allow IPv4, IPv6, and IPv4-mapped IPv6
  if (/^[\d.]{7,15}$/.test(first) || /^[0-9a-fA-F:]{3,45}$/.test(first)) {
    return first
  }
  return 'unknown'
}

/**
 * Extract the client IP from a Next.js Request object.
 */
export function extractIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return sanitizeIp(forwarded)
  // Fallback — no native request.ip in standard Request
  return 'unknown'
}

export interface QuotaStatus {
  used: number
  limit: number
  resetsAt: Date
  allowed: boolean
}

/**
 * Return the current quota status for an IP without modifying the count.
 */
export async function getQuotaStatus(ip: string): Promise<QuotaStatus> {
  const now = new Date()
  const record = await prisma.guestQuota.findUnique({ where: { ip } })

  if (!record || record.resetAt <= now) {
    return {
      used: 0,
      limit: GUEST_DAILY_LIMIT,
      resetsAt: nextMidnightUTC(now),
      allowed: true,
    }
  }

  return {
    used: record.count,
    limit: GUEST_DAILY_LIMIT,
    resetsAt: record.resetAt,
    allowed: record.count < GUEST_DAILY_LIMIT,
  }
}

/**
 * Atomically check and increment the quota for a given IP.
 *
 * Returns `{ allowed: true, used, resetsAt }` if the request may proceed
 * (quota not yet exhausted, count already incremented).
 * Returns `{ allowed: false, used, resetsAt }` if the limit is reached.
 */
export async function checkAndIncrementQuota(ip: string): Promise<QuotaStatus> {
  const now = new Date()
  const resetAt = nextMidnightUTC(now)

  // Use a transaction to read-then-write atomically with SQLite's serialised
  // transaction semantics (prevents double-increment on concurrent requests).
  return prisma.$transaction(async (tx) => {
    const existing = await tx.guestQuota.findUnique({ where: { ip } })

    // If the quota window has expired, treat as fresh
    const isExpired = existing && existing.resetAt <= now

    if (!existing || isExpired) {
      // Create or reset: count starts at 1 (this is the first guide of the day)
      await tx.guestQuota.upsert({
        where: { ip },
        create: { ip, count: 1, resetAt },
        update: { count: 1, resetAt },
      })
      return { used: 1, limit: GUEST_DAILY_LIMIT, resetsAt: resetAt, allowed: true }
    }

    if (existing.count >= GUEST_DAILY_LIMIT) {
      return {
        used: existing.count,
        limit: GUEST_DAILY_LIMIT,
        resetsAt: existing.resetAt,
        allowed: false,
      }
    }

    // Increment
    const updated = await tx.guestQuota.update({
      where: { ip },
      data: { count: { increment: 1 } },
    })

    return {
      used: updated.count,
      limit: GUEST_DAILY_LIMIT,
      resetsAt: updated.resetAt,
      allowed: true,
    }
  })
}
