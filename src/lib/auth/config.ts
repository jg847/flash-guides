import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { verifyPassword } from './password'
import { authorizedCallbackConfig } from './middleware'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google({
      clientId: process.env['GOOGLE_CLIENT_ID'] ?? '',
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * Full credentials authorize: DB lookup + bcrypt verify + emailVerified check.
       */
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })

        if (!user || !user.password) return null

        const valid = await verifyPassword(parsed.data.password, user.password)
        if (!valid) return null

        if (!user.emailVerified) {
          // Throw an error so Auth.js surfaces it to the client as a 403-equivalent
          throw new Error('EmailNotVerified')
        }

        return { id: user.id, email: user.email, name: user.name, image: user.image }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token['id'] = user.id
      }
      return token
    },
    async session({ session, token }) {
      const id = token['id']
      if (typeof id === 'string') {
        session.user.id = id
      }
      return session
    },
    authorized: authorizedCallbackConfig,
  },
} satisfies NextAuthConfig
