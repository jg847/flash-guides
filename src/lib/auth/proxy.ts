import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import { authorizedCallbackConfig } from './middleware'

const proxyAuthConfig = {
  providers: [],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: authorizedCallbackConfig,
  },
} satisfies NextAuthConfig

export const { auth: proxyAuth } = NextAuth(proxyAuthConfig)
