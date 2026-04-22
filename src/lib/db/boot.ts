/**
 * Runs required SQLite PRAGMAs on first connection.
 * Call this once at application startup (e.g., in instrumentation.ts).
 */
import { prisma } from './client'

export async function bootDatabase(): Promise<void> {
  await prisma.$executeRawUnsafe('PRAGMA journal_mode = WAL;')
  await prisma.$executeRawUnsafe('PRAGMA synchronous = NORMAL;')
  await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON;')
  await prisma.$executeRawUnsafe('PRAGMA busy_timeout = 5000;')
  await prisma.$executeRawUnsafe('PRAGMA temp_store = MEMORY;')
}
