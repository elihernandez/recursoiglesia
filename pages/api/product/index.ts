import { prisma } from 'api/config/db'
import { Product } from 'api/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET, POST, PUT, DELETE'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    try {
        if (req.method === 'GET') {
            const id: string = req.query.id as string
            const product = await GET(id)

            res.status(200)
            res.json(product)
        } else if (req.method === 'POST') {
            const data = req.body
            const product = await POST(data)

            res.status(200)
            res.json(product)
        } else if (req.method === 'PUT') {
            const data = req.body
            const product = await PUT(data)

            res.status(200)
            res.json(product)
        } else if (req.method === 'DELETE') {
            const data = req.body
            await DELETE(data)

            res.status(200)
            res.json('')
        } else {
            res
                .status(405)
                .json({ message: 'We only support GET' })
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json(error)
    }
}

export async function GET(id: string) {
    return await prisma.product.findFirst({
        where: {
            id: id
        }
    })
}

async function POST(data: Product) {
    const product = await prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            link: data.link,
            images: JSON.stringify(data.images),
            isActive: data.isActive
        }
    })

    //@ts-ignore
    data.categories.map(async (category) =>
        await prisma.categoriesOnProduct.create({
            data: {
                categoryId: category,
                productId: product.id
            }
        })
    )
}

async function PUT(data: Product) {
    const product = await prisma.product.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            link: data.link,
            images: JSON.stringify(data.images),
            isActive: data.isActive,
            categories: {
                deleteMany: {}
            }
        }
    })

    //@ts-ignore
    data.categories.map(async (category) =>
        await prisma.categoriesOnProduct.create({
            data: {
                categoryId: category,
                productId: product.id
            }
        })
    )
}

async function DELETE(data: Product) {
    await prisma.product.update({
        where: {
            id: data.id
        },
        data: {
            categories: {
                deleteMany: {}
            }
        }
    })

    return await prisma.product.delete({
        where: {
            id: data.id
        }
    })
}