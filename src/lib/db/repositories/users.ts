import { prisma } from '@/lib/db/client'
import { hashPassword, verifyPassword } from '@/lib/auth/password'

export interface AccountPageUser {
  id: string
  name: string | null
  email: string
  pendingEmail: string | null
  image: string | null
  hasPassword: boolean
  sessionVersion: number
  providers: string[]
}

export interface UserSummary {
  id: string
  name: string | null
  email: string
  image: string | null
}

class UserRepository {
  async getAccountPageUser(userId: string): Promise<AccountPageUser | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        pendingEmail: true,
        image: true,
        password: true,
        sessionVersion: true,
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pendingEmail: user.pendingEmail,
      image: user.image,
      hasPassword: Boolean(user.password),
      sessionVersion: user.sessionVersion,
      providers: [...new Set(user.accounts.map((account) => account.provider))],
    }
  }

  async updateProfile(
    userId: string,
    input: { name?: string; image?: string },
  ): Promise<UserSummary | null> {
    const data: { name?: string; image?: string } = {}

    if (input.name !== undefined) {
      data.name = input.name
    }

    if (input.image !== undefined) {
      data.image = input.image
    }

    if (Object.keys(data).length === 0) {
      return prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      })
    }

    const result = await prisma.user.updateMany({
      where: { id: userId },
      data,
    })

    if (result.count === 0) {
      return null
    }

    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<'updated' | 'not-found' | 'incorrect-current'> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
      },
    })

    if (!user || !user.password) {
      return 'not-found'
    }

    const isValid = await verifyPassword(currentPassword, user.password)
    if (!isValid) {
      return 'incorrect-current'
    }

    const passwordHash = await hashPassword(newPassword)
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: passwordHash,
        sessionVersion: {
          increment: 1,
        },
      },
    })

    return 'updated'
  }

  async beginEmailChange(
    userId: string,
    email: string,
  ): Promise<'updated' | 'not-found' | 'email-in-use'> {
    const normalizedEmail = email.trim().toLowerCase()

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
      },
    })

    if (!user) {
      return 'not-found'
    }

    if (user.email.toLowerCase() === normalizedEmail) {
      return 'email-in-use'
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        NOT: { id: userId },
      },
      select: { id: true },
    })

    if (existingUser) {
      return 'email-in-use'
    }

    await prisma.user.update({
      where: { id: userId },
      data: { pendingEmail: normalizedEmail },
    })

    return 'updated'
  }

  async confirmEmailChange(
    userId: string,
  ): Promise<'updated' | 'not-found' | 'email-in-use' | 'missing-pending-email'> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        pendingEmail: true,
      },
    })

    if (!user) {
      return 'not-found'
    }

    if (!user.pendingEmail) {
      return 'missing-pending-email'
    }

    const emailOwner = await prisma.user.findFirst({
      where: {
        email: user.pendingEmail,
        NOT: { id: userId },
      },
      select: { id: true },
    })

    if (emailOwner) {
      return 'email-in-use'
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        email: user.pendingEmail,
        pendingEmail: null,
        emailVerified: new Date(),
      },
    })

    return 'updated'
  }

  async disconnectOAuthProvider(
    userId: string,
    provider: string,
  ): Promise<'disconnected' | 'not-found' | 'only-login-method'> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
        accounts: {
          select: {
            id: true,
            provider: true,
          },
        },
      },
    })

    if (!user) {
      return 'not-found'
    }

    const matchingAccount = user.accounts.find((account) => account.provider === provider)
    if (!matchingAccount) {
      return 'not-found'
    }

    const loginMethodCount = (user.password ? 1 : 0) + user.accounts.length
    if (loginMethodCount <= 1) {
      return 'only-login-method'
    }

    await prisma.account.delete({
      where: {
        id: matchingAccount.id,
      },
    })

    return 'disconnected'
  }
}

export const userRepository = new UserRepository()
