import type { Session } from 'next-auth'
import { prisma } from '@/lib/db/client'

export function hasAuthenticatedUser(session: Session | null | undefined): boolean {
  return Boolean(session?.user?.id || session?.user?.email)
}

export async function getSessionUserId(
  session: Session | null | undefined,
): Promise<string | null> {
  if (session?.user?.id) {
    return session.user.id
  }

  const email = session?.user?.email
  if (!email) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  return user?.id ?? null
}
