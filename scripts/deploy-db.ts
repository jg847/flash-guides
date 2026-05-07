import 'dotenv/config'

import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { createClient } from '@libsql/client'

type MigrationRecord = {
  migration_name: string
}

function runCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
    })

    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'unknown'}`))
    })
  })
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env['DATABASE_URL']

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required')
  }

  return databaseUrl
}

function getDatabaseAuthToken(): string | undefined {
  return (
    process.env['DATABASE_AUTH_TOKEN'] ??
    process.env['TURSO_AUTH_TOKEN'] ??
    process.env['LIBSQL_AUTH_TOKEN'] ??
    undefined
  )
}

function isFileDatabaseUrl(databaseUrl: string): boolean {
  return databaseUrl.startsWith('file:')
}

function isRemoteLibsqlDatabaseUrl(databaseUrl: string): boolean {
  return (
    databaseUrl.startsWith('libsql:') ||
    databaseUrl.startsWith('https:') ||
    databaseUrl.startsWith('http:')
  )
}

async function ensureMigrationsTable(client: ReturnType<typeof createClient>): Promise<void> {
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "checksum" TEXT NOT NULL,
      "finished_at" DATETIME,
      "migration_name" TEXT NOT NULL UNIQUE,
      "logs" TEXT,
      "rolled_back_at" DATETIME,
      "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "applied_steps_count" INTEGER NOT NULL DEFAULT 0
    );
  `)
}

async function getMigrationDirectories(migrationsPath: string): Promise<string[]> {
  const entries = await readdir(migrationsPath, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right))
}

async function getAppliedMigrationNames(
  client: ReturnType<typeof createClient>,
): Promise<Set<string>> {
  const result = await client.execute(
    'SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL',
  )

  return new Set(
    result.rows.map((row) => row as unknown as MigrationRecord).map((row) => row.migration_name),
  )
}

async function clearUnfinishedMigration(
  client: ReturnType<typeof createClient>,
  migrationName: string,
): Promise<void> {
  await client.execute({
    sql: `
      DELETE FROM "_prisma_migrations"
      WHERE "migration_name" = ?
        AND "finished_at" IS NULL
    `,
    args: [migrationName],
  })
}

async function applyRemoteMigrations(databaseUrl: string): Promise<void> {
  const client = createClient({
    url: databaseUrl,
    authToken: getDatabaseAuthToken(),
  })

  try {
    await ensureMigrationsTable(client)

    const migrationsPath = path.join(process.cwd(), 'prisma', 'migrations')
    const migrationDirectories = await getMigrationDirectories(migrationsPath)
    const appliedMigrationNames = await getAppliedMigrationNames(client)

    for (const migrationDirectory of migrationDirectories) {
      if (appliedMigrationNames.has(migrationDirectory)) {
        continue
      }

      const migrationSqlPath = path.join(migrationsPath, migrationDirectory, 'migration.sql')
      const migrationSql = await readFile(migrationSqlPath, 'utf8')
      const migrationId = createHash('sha256').update(migrationDirectory).digest('hex')
      const checksum = createHash('sha256').update(migrationSql).digest('hex')

      console.log(`Applying remote migration ${migrationDirectory}`)

      await clearUnfinishedMigration(client, migrationDirectory)

      await client.execute({
        sql: `
          INSERT INTO "_prisma_migrations" (
            "id",
            "checksum",
            "migration_name",
            "started_at",
            "applied_steps_count"
          )
          VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0)
        `,
        args: [migrationId, checksum, migrationDirectory],
      })

      try {
        await client.executeMultiple(migrationSql)

        await client.execute({
          sql: `
            UPDATE "_prisma_migrations"
            SET "finished_at" = CURRENT_TIMESTAMP,
                "applied_steps_count" = 1,
                "logs" = NULL
            WHERE "migration_name" = ?
          `,
          args: [migrationDirectory],
        })
      } catch (error) {
        const logs = error instanceof Error ? error.message : String(error)

        await client.execute({
          sql: `
            UPDATE "_prisma_migrations"
            SET "logs" = ?
            WHERE "migration_name" = ?
          `,
          args: [logs, migrationDirectory],
        })

        throw error
      }
    }
  } finally {
    client.close()
  }
}

async function main(): Promise<void> {
  const databaseUrl = getDatabaseUrl()

  if (isFileDatabaseUrl(databaseUrl)) {
    await runCommand('pnpm', ['db:migrate:prod'])
    return
  }

  if (!isRemoteLibsqlDatabaseUrl(databaseUrl)) {
    throw new Error(
      'Unsupported DATABASE_URL for deploy migrations. Use file:... locally or a libsql/http(s) URL remotely.',
    )
  }

  await applyRemoteMigrations(databaseUrl)
}

void main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
