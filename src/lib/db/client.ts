import { PrismaClient } from '@/generated/prisma'
import type { SqlMigrationAwareDriverAdapterFactory } from '@prisma/driver-adapter-utils'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaAdapter: SqlMigrationAwareDriverAdapterFactory | undefined
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

async function createLocalPrismaAdapter(
  databaseUrl: string,
): Promise<SqlMigrationAwareDriverAdapterFactory> {
  const { PrismaBetterSqlite3 } = await import('@prisma/adapter-better-sqlite3')

  return new PrismaBetterSqlite3({
    url: databaseUrl,
  })
}

async function createRemotePrismaAdapter(
  databaseUrl: string,
): Promise<SqlMigrationAwareDriverAdapterFactory> {
  const { PrismaLibSql } = await import('@prisma/adapter-libsql')

  return new PrismaLibSql({
    url: databaseUrl,
    authToken: getRemoteDatabaseAuthToken(),
  })
}

async function getPrismaAdapter(): Promise<SqlMigrationAwareDriverAdapterFactory> {
  if (!globalForPrisma.prismaAdapter) {
    const databaseUrl = getDatabaseUrl()

    if (isFileDatabaseUrl(databaseUrl)) {
      globalForPrisma.prismaAdapter = await createLocalPrismaAdapter(databaseUrl)
    } else if (isRemoteLibsqlDatabaseUrl(databaseUrl)) {
      globalForPrisma.prismaAdapter = await createRemotePrismaAdapter(databaseUrl)
    } else {
      throw new Error(
        'Unsupported DATABASE_URL for this deployment. Use file:... locally or a libsql/https remote SQLite URL in production.',
      )
    }
  }

  return globalForPrisma.prismaAdapter
}

async function getPrismaClient(): Promise<PrismaClient> {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter: await getPrismaAdapter(),
      log: process.env['NODE_ENV'] === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }

  return globalForPrisma.prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const getBoundValue = async () => {
      const client = await getPrismaClient()
      const value = Reflect.get(client as object, property, receiver)

      return typeof value === 'function' ? value.bind(client) : value
    }

    if (property === '$connect' || property === '$disconnect' || property === '$transaction') {
      return async (...args: unknown[]) => {
        const value = await getBoundValue()
        if (typeof value !== 'function') {
          return value
        }

        return value(...args)
      }
    }

    return (...args: unknown[]) =>
      getBoundValue().then((value) => {
        if (typeof value !== 'function') {
          return value
        }

        return value(...args)
      })
  },
}) as PrismaClient

if (process.env['NODE_ENV'] !== 'production') {
  void getPrismaClient()
}
