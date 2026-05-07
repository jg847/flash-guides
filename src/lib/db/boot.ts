/**
 * Runs required SQLite PRAGMAs on first connection.
 * Call this once at application startup (e.g., in instrumentation.ts).
 */
import { prisma } from './client'

const GUIDE_SEARCH_BOOT_SQL = [
  'CREATE VIRTUAL TABLE IF NOT EXISTS "guides_fts" USING fts5("id" UNINDEXED, "title", "content", content=\'guides\', content_rowid=\'rowid\', tokenize=\'unicode61\');',
  'INSERT INTO "guides_fts"("guides_fts") VALUES (\'rebuild\');',
  'CREATE TRIGGER IF NOT EXISTS "guides_fts_ai" AFTER INSERT ON "guides" BEGIN INSERT INTO "guides_fts"("rowid", "id", "title", "content") VALUES (new.rowid, new.id, new.title, new.content); END;',
  'CREATE TRIGGER IF NOT EXISTS "guides_fts_ad" AFTER DELETE ON "guides" BEGIN INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content") VALUES (\'delete\', old.rowid, old.id, old.title, old.content); END;',
  'CREATE TRIGGER IF NOT EXISTS "guides_fts_au" AFTER UPDATE ON "guides" BEGIN INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content") VALUES (\'delete\', old.rowid, old.id, old.title, old.content); INSERT INTO "guides_fts"("rowid", "id", "title", "content") VALUES (new.rowid, new.id, new.title, new.content); END;',
] as const

export async function bootDatabase(): Promise<void> {
  await prisma.$executeRawUnsafe('PRAGMA journal_mode = WAL;')
  await prisma.$executeRawUnsafe('PRAGMA synchronous = NORMAL;')
  await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON;')
  await prisma.$executeRawUnsafe('PRAGMA busy_timeout = 5000;')
  await prisma.$executeRawUnsafe('PRAGMA temp_store = MEMORY;')

  for (const statement of GUIDE_SEARCH_BOOT_SQL) {
    await prisma.$executeRawUnsafe(statement)
  }
}
