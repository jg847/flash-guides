import { PrismaClient } from '@/generated/prisma'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaAdapter: PrismaBetterSqlite3 | undefined
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env['DATABASE_URL']
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required')
  }

  return databaseUrl
}

function getPrismaAdapter(): PrismaBetterSqlite3 {
  if (!globalForPrisma.prismaAdapter) {
    globalForPrisma.prismaAdapter = new PrismaBetterSqlite3({
      url: getDatabaseUrl(),
    })
  }

  return globalForPrisma.prismaAdapter
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter: getPrismaAdapter(),
      log: process.env['NODE_ENV'] === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }

  return globalForPrisma.prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getPrismaClient()
    const value = Reflect.get(client as object, property, receiver)

    return typeof value === 'function' ? value.bind(client) : value
  },
}) as PrismaClient

if (process.env['NODE_ENV'] !== 'production') {
  getPrismaClient()
}
