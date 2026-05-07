/**
 * Runs required SQLite PRAGMAs on first connection.
 * Call this once at application startup (e.g., in instrumentation.ts).
 */
import { isFileDatabaseUrl, prisma } from './client'

const LOCAL_SQLITE_BOOT_SQL = [
  'PRAGMA journal_mode = WAL;',
  'PRAGMA synchronous = NORMAL;',
  'PRAGMA foreign_keys = ON;',
  'PRAGMA busy_timeout = 5000;',
  'PRAGMA temp_store = MEMORY;',
] as const

const GUIDE_SEARCH_BOOT_SQL = [
  'CREATE VIRTUAL TABLE IF NOT EXISTS "guides_fts" USING fts5("id" UNINDEXED, "title", "content", content=\'guides\', content_rowid=\'rowid\', tokenize=\'unicode61\');',
  'INSERT INTO "guides_fts"("guides_fts") VALUES (\'rebuild\');',
  'CREATE TRIGGER IF NOT EXISTS "guides_fts_ai" AFTER INSERT ON "guides" BEGIN INSERT INTO "guides_fts"("rowid", "id", "title", "content") VALUES (new.rowid, new.id, new.title, new.content); END;',
  'CREATE TRIGGER IF NOT EXISTS "guides_fts_ad" AFTER DELETE ON "guides" BEGIN INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content") VALUES (\'delete\', old.rowid, old.id, old.title, old.content); END;',
  'CREATE TRIGGER IF NOT EXISTS "guides_fts_au" AFTER UPDATE ON "guides" BEGIN INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content") VALUES (\'delete\', old.rowid, old.id, old.title, old.content); INSERT INTO "guides_fts"("rowid", "id", "title", "content") VALUES (new.rowid, new.id, new.title, new.content); END;',
] as const

export async function bootDatabase(): Promise<void> {
  if (isFileDatabaseUrl()) {
    for (const statement of LOCAL_SQLITE_BOOT_SQL) {
      await prisma.$executeRawUnsafe(statement)
    }
  }

  for (const statement of GUIDE_SEARCH_BOOT_SQL) {
    await prisma.$executeRawUnsafe(statement)
  }
}
