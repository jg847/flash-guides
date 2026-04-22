import { randomBytes } from 'crypto'
import { prisma } from '@/lib/db/client'

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

/**
 * Create a 32-byte hex verification token for the given identifier (email).
 * Replaces any existing token for that identifier.
 */
export async function createVerificationToken(
  identifier: string,
  ttlMs: number = TOKEN_TTL_MS,
): Promise<string> {
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + ttlMs)

  // Remove any existing tokens for this identifier first (upsert not supported on composite key)
  await prisma.verificationToken.deleteMany({ where: { identifier } })

  await prisma.verificationToken.create({
    data: { identifier, token, expires },
  })

  return token
}

/**
 * Create a password reset token (shorter TTL: 1 hour).
 */
export async function createPasswordResetToken(identifier: string): Promise<string> {
  return createVerificationToken(identifier, RESET_TOKEN_TTL_MS)
}

/**
 * Consume a verification token: validates it, deletes it, and returns the identifier.
 * Returns null if the token is not found or has expired.
 */
export async function consumeVerificationToken(token: string): Promise<string | null> {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!record) return null
  if (record.expires < new Date()) {
    // Clean up expired token
    await prisma.verificationToken.delete({ where: { token } })
    return null
  }

  await prisma.verificationToken.delete({ where: { token } })
  return record.identifier
}
