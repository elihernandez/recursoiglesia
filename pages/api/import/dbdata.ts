import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'api/config/db'
import data from 'data/backup/recursoiglesia.json'
import { getShortenedUrl } from '../shortener'
import { ResourceType } from 'api/models/ResourceType'
import NextCors from 'nextjs-cors'
const { exec } = require('child_process')
//import album from '/Users/2dcce/Downloads/Album.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    if (req.method === 'GET') {
        try {
            // pushAlbum()
            await script()
            res.status(200)
            res.json('La información se cargó correctamente.')
            //res.json(data)
        } catch (e) {
            console.log(e)
            res.status(400)
            res.json('Ocurrió un problema.')
        }
    } else {
        res
            .status(405)
            .json({ message: 'We only support GET' })
    }
}

async function pushAlbum() {
    const albums: any = album[2].data

    await prisma.album.deleteMany()

    for (const album of albums) {
        await prisma.album.createMany({
            data: {
                id: album.id,
                path: album.url,
                name: album.name,
                imgUrl: album.imgUrl,
                artistId: album.artistId,
                releaseDate: new Date(album.releaseDate)
            }
        })
    }
}

async function script() {
    return new Promise((resolve, reject) => {
        exec('npm run migrate:reset', async (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`)
                // reject('')
                // return
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`)
                // reject('')
                // return
            }

            try {
                await pushData()
                console.log(`stdout:\n${stdout}`)
                resolve('')
            } catch {
                console.log(`stdout:\n${stdout}`)
                reject('')
            }
        })
    })
}

async function pushShorteners() {
    const multitracks = await prisma.multitrack.findMany({
        where: {
            NOT: {
                url: null
            }
        }
    })

    for (const multitrack of multitracks) {
        const short = await getShortenedUrl(multitrack.url, multitrack.multitrackId)

        await prisma.multitrack.update({
            where: {
                id: multitrack.id
            },
            data: {
                url: multitrack.url,
                link: short.data.shortenedUrl
            }
        })
    }

    return multitracks
}

async function pushData() {
    const albums: any = data[2].data
    const artists: any = data[3].data
    const categoriesonproducts: any = data[4].data
    const categories: any = data[5].data
    const downloads: any = data[6].data
    const multitracks: any = data[7].data
    const multitracksRequests: any = data[8].data
    const newsletterSubscribers: any = data[9].data
    const products: any = data[10].data
    const softwares: any = data[11].data
    const templates: any = data[12].data

    await prisma.category.deleteMany()

    for (const category of categories) {
        await prisma.category.createMany({
            data: {
                path: category.path,
                name: category.name,
                description: category.description,
                isActive: category.isActive === '1' ? true : false
            }
        })
    }

    await prisma.product.deleteMany()

    for (const product of products) {
        await prisma.product.createMany({
            data: {
                path: product.path,
                name: product.name,
                description: product.description,
                price: parseFloat(product.price),
                link: product.link,
                images: JSON.parse(product.images),
                isActive: product.isActive === '1' ? true : false
            }
        })
    }

    await prisma.categoriesOnProduct.deleteMany()

    for (const categoryOnProduct of categoriesonproducts) {
        await prisma.categoriesOnProduct.createMany({
            data: {
                productId: parseInt(categoryOnProduct.productId),
                categoryId: parseInt(categoryOnProduct.categoryId)
            }
        })
    }

    await prisma.artist.deleteMany()

    for (const artist of artists) {
        await prisma.artist.createMany({
            data: {
                id: artist.id,
                path: artist.path,
                name: artist.name,
                imgUrl: artist.imgUrl
            }
        })
    }

    await prisma.album.deleteMany()

    for (const album of albums) {
        await prisma.album.createMany({
            data: {
                id: album.id,
                path: album.path,
                name: album.name,
                imgUrl: album.imgUrl,
                artistId: album.artistId,
                releaseDate: new Date(album.releaseDate)
            }
        })
    }

    await prisma.multitrack.deleteMany()

    for (const multitrack of multitracks) {
        await prisma.multitrack.createMany({
            data: {
                id: multitrack.id,
                multitrackId: multitrack.multitrackId,
                path: multitrack.path,
                name: multitrack.name,
                albumId: multitrack.albumId,
                artistId: multitrack.artistId,
                url: multitrack.url,
                link: multitrack.link,
                urlDate: multitrack.urlDate ? new Date(multitrack.urlDate) : null,
            }
        })
    }

    await prisma.multitrackRequest.deleteMany({})

    for (const multitrackRequest of multitracksRequests) {
        await prisma.multitrackRequest.createMany({
            data: {
                id: multitrackRequest.id,
                email: multitrackRequest.email,
                multitrackId: multitrackRequest.multitrackId,
                isSent: multitrackRequest.isSent === '1' ? true : false,
                createdAt: new Date(multitrackRequest.createdAt)
            }
        })
    }

    await prisma.download.deleteMany({})

    for (const download of downloads) {
        await prisma.download.createMany({
            data: {
                resourceId: download.resourceId,
                type: parseInt(download.type),
                createdAt: new Date(download.createdAt)
            }
        })
    }

    await prisma.software.deleteMany({})

    for (const software of softwares) {
        await prisma.software.createMany({
            data: {
                id: software.id,
                path: software.path,
                name: software.name,
                imgUrl: software.imgUrl,
                url: software.url,
                link: software.link
            }
        })
    }

    await prisma.newsletterSubscriber.deleteMany({})

    for (const newsletterSubscriber of newsletterSubscribers) {
        await prisma.newsletterSubscriber.createMany({
            data: {
                id: newsletterSubscriber.id,
                email: newsletterSubscriber.email,
                createdAt: new Date(newsletterSubscriber.createdAt)
            }
        })
    }

    await prisma.template.deleteMany({})

    for (const template of templates) {
        await prisma.template.createMany({
            data: {
                id: template.id,
                path: template.path,
                name: template.name,
                imgUrl: template.imgUrl,
                url: template.url,
                link: template.link
            }
        })
    }
}