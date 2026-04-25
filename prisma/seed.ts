import { prisma } from '@/lib/db/client'
import { reseedDatabase } from '@/lib/db/seed'

async function main() {
  await reseedDatabase(prisma)
}

main()
  .catch((error) => {
    console.error('Failed to seed database', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
