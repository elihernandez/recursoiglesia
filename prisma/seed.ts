import { albums } from './seeds/albums'
import { prisma } from '../api/config/db'
import { artists } from './seeds/artists'
import { multitracks } from './seeds/multitracks'

async function main() {
    // await prisma.artist.createMany({ data: artists })
    // await prisma.album.createMany({ data: albums })
    // await prisma.multitrack.createMany({ data: multitracks })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })