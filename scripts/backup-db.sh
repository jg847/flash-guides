#!/usr/bin/env bash
# Nightly SQLite backup — drop timestamped copy to /data/backups/, prune >14 days old.
set -euo pipefail

DB_PATH="${DB_PATH:-/data/app.db}"
BACKUP_DIR="${BACKUP_DIR:-/data/backups}"
TIMESTAMP=$(date +"%Y-%m-%d-%H%M")
DEST="${BACKUP_DIR}/app-${TIMESTAMP}.db"

mkdir -p "$BACKUP_DIR"
sqlite3 "$DB_PATH" ".backup '$DEST'"
echo "Backup written to $DEST"

# Prune backups older than 14 days
find "$BACKUP_DIR" -name "app-*.db" -mtime +14 -delete
echo "Old backups pruned"
