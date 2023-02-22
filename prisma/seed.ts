import { prisma } from '../api/config/db'
import { users } from './seeds/users'

async function main() {
    await prisma.user.createMany({ data: users })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })