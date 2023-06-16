import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { promisify } from 'util'
import stream from 'stream'
import axios from 'axios'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET, POST, PUT, DELETE'],
        origin: '*',
        optionsSuccessStatus: 200
    })



    try {
        if (req.method === 'GET') {
            const fileParams = {
                Bucket: process.env.R2_MULTITRACKS_BUCKET_KEY,
                Key: 'Wake-G-131bpm-4-4[ENGLISH GUIDE].zip',
                ContentType: 'application/zip',
                ACL: 'public-read'
            }

            const uploadUrl = await getSignedUrl(S3, new PutObjectCommand(fileParams), { expiresIn: 3600 })

            res.status(200)
            res.json(uploadUrl)
            // const pipeline = promisify(stream.pipeline)
            // const body = {
            //     Bucket: process.env.R2_MULTITRACKS_BUCKET_KEY,
            //     Key: 'Wake-G-131bpm-4-4[ENGLISH GUIDE].zip'
            // }

            // const response = await getSignedUrl(S3, new GetObjectCommand(body), { expiresIn: 3600 })
            // const fileRes = await fetch(response)

            // res.setHeader('Content-Type', 'application/zip')
            // res.setHeader('Content-Disposition', `attachment; filename=${body.Key}`)

            // //@ts-ignore
            // await pipeline(fileRes.body, res)
            // res.status(200)
            // res.json('')
        } else if (req.method === 'POST') {

        } else if (req.method === 'PUT') {

        } else if (req.method === 'DELETE') {

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
}

async function POST() {
}

async function PUT() {
}

async function DELETE() {
}