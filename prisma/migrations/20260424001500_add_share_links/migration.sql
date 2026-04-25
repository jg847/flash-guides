CREATE TABLE "share_links" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "token" TEXT NOT NULL,
  "guideId" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" DATETIME,
  "clickCount" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "share_links_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "guides" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "share_links_token_key" ON "share_links"("token");
CREATE UNIQUE INDEX "share_links_guideId_key" ON "share_links"("guideId");

INSERT INTO "share_links" ("id", "token", "guideId", "createdAt", "expiresAt", "clickCount")
SELECT lower(hex(randomblob(16))), "shareToken", "id", CURRENT_TIMESTAMP, NULL, 0
FROM "guides"
WHERE "shareToken" IS NOT NULL;