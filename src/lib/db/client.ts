import { PrismaClient } from '@/generated/prisma'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

type PrismaSqliteAdapter = PrismaBetterSqlite3 | PrismaLibSql

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaAdapter: PrismaSqliteAdapter | undefined
}

export function getDatabaseUrl(): string {
  const databaseUrl = process.env['DATABASE_URL']
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required')
  }

  return databaseUrl
}

export function isFileDatabaseUrl(databaseUrl: string = getDatabaseUrl()): boolean {
  return databaseUrl.startsWith('file:')
}

export function isRemoteLibsqlDatabaseUrl(databaseUrl: string = getDatabaseUrl()): boolean {
  return (
    databaseUrl.startsWith('libsql:') ||
    databaseUrl.startsWith('https:') ||
    databaseUrl.startsWith('http:')
  )
}

function getRemoteDatabaseAuthToken(): string | undefined {
  return (
    process.env['DATABASE_AUTH_TOKEN'] ??
    process.env['TURSO_AUTH_TOKEN'] ??
    process.env['LIBSQL_AUTH_TOKEN'] ??
    undefined
  )
}

function getPrismaAdapter(): PrismaSqliteAdapter {
  if (!globalForPrisma.prismaAdapter) {
    const databaseUrl = getDatabaseUrl()

    if (isFileDatabaseUrl(databaseUrl)) {
      globalForPrisma.prismaAdapter = new PrismaBetterSqlite3({
        url: databaseUrl,
      })
    } else if (isRemoteLibsqlDatabaseUrl(databaseUrl)) {
      globalForPrisma.prismaAdapter = new PrismaLibSql({
        url: databaseUrl,
        authToken: getRemoteDatabaseAuthToken(),
      })
    } else {
      throw new Error(
        'Unsupported DATABASE_URL for this deployment. Use file:... locally or a libsql/https remote SQLite URL in production.',
      )
    }
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
