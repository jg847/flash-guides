ALTER TABLE "guides" ADD COLUMN "isFavorite" BOOLEAN NOT NULL DEFAULT false;

CREATE VIRTUAL TABLE IF NOT EXISTS "guides_fts" USING fts5(
  "id" UNINDEXED,
  "title",
  "content",
  content='guides',
  content_rowid='rowid',
  tokenize='unicode61'
);

INSERT INTO "guides_fts"("guides_fts") VALUES ('rebuild');

CREATE TRIGGER IF NOT EXISTS "guides_fts_ai" AFTER INSERT ON "guides" BEGIN
  INSERT INTO "guides_fts"("rowid", "id", "title", "content")
  VALUES (new.rowid, new.id, new.title, new.content);
END;

CREATE TRIGGER IF NOT EXISTS "guides_fts_ad" AFTER DELETE ON "guides" BEGIN
  INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content")
  VALUES ('delete', old.rowid, old.id, old.title, old.content);
END;

CREATE TRIGGER IF NOT EXISTS "guides_fts_au" AFTER UPDATE ON "guides" BEGIN
  INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content")
  VALUES ('delete', old.rowid, old.id, old.title, old.content);

  INSERT INTO "guides_fts"("rowid", "id", "title", "content")
  VALUES (new.rowid, new.id, new.title, new.content);
END;