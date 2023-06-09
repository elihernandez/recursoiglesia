import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
const { exec } = require('child_process')
const puppeteer = require('puppeteer')
const jsdom = require('jsdom')
const xl = require('excel4node')
const { v4: uuidv4 } = require('uuid')
const wb = new xl.Workbook()
const fs = require('fs')
const axios = require('axios')
import { prisma } from 'api/config/db'
const baseUrl = 'https://www.secuencias.com'

const artists = [
    'Adoración Colectiva',
    'Alisha Quinonez',
    'Arboles de Justicia',
    'Aliento',
    'Apasionados Worship',
    'Austin Stone Worship',
    'Art Aguilera',
    'Averly Morillo',
    'BJ Putnam',
    'Bani Muñoz',
    'Barak',
    'Benjamin Rivera',
    'Bethel Music',
    'Brandon Lake',
    'Carlos Gallegos',
    'CTUE Adoración',
    'Camino de Vida',
    'Chris Tomlin',
    "Christine D'Clario",
    'Church of The City',
    'Coalo Zamorano',
    'Cody Carnes',
    'Conquistando Fronteras',
    'Celeste Nova',
    'Dahaira',
    'Danny Gokey',
    'Danilo Montero',
    'Danny Diaz',
    'Darlene Zschech',
    'David Reyes',
    'David Scarpeta',
    'DOE',
    'ELIM Adorando',
    'Esperanza de Vida',
    'Edward Rivera',
    'Elevation Worship',
    'Emir Sinsini',
    'En Espíritu y en Verdad',
    'Erick Porta',
    'Ericson Alexander Molano',
    'Evan Craft',
    'Free Worship',
    'Frank Morgan',
    'Family Music',
    'Gateway Worship',
    'Gateway Worship Español',
    'Generación 12',
    'Generación 12 Kids',
    'Hillsong United',
    'Hillsong Young And Free',
    'Hillsong en Español',
    'Ingrid Rosario',
    'Israel and New Breed',
    'Jacobo Ramos',
    'Jesus Culture',
    'Jesus Worship Center',
    'Jesús Adrian Romero',
    'Job Gonzalez',
    'Juan Carlos Alvarado',
    'Julio Melgar',
    'Julissa',
    'Jonathan y Sarah Jerez',
    'Josh Wilson',
    'KABED',
    'Kari Jobe',
    'Oasis Ministry',
    'Omar Rodriguez',
    'La IBI & Sovereign Grace Music',
    'Lakepointe Music',
    'LEAD',
    'Lakewood Music',
    'Living',
    'Lowsan Melgar',
    'Lucía Parker',
    'Linaje Escogido',
    'MONTESANTO',
    'Mi Corazón Canta',
    'Majo y Dan',
    'Marco Barrientos',
    'Marcos Brunet',
    'Marcos Witt',
    'Maverick City Música',
    'Miel San Marcos',
    'Moises Cancel',
    'Mosaic MSC',
    'Música Más Vida ',
    'Música La Misión',
    'Milton Reales',
    'Nathan Ironside',
    'New Wine Worship',
    'North Point Worship',
    'Nueva Generazion',
    'Nxtwave',
    'Patty Gleason',
    'PRISMA',
    'Passion',
    'Paz Aguayo',
    'Phil Wickham',
    'Planetshakers',
    'Soulfire Revolution',
    'Su Presencia',
    'Sheila Romero',
    'Silas Gonzalez',
    'TWICE',
    'Thalles Roberto',
    'The Belonging Co',
    'Toma Tu Lugar',
    'UPPERROOM',
    'Un Corazón',
    'Ungidos Worship',
    'Vida Real Worship',
    'Victory House Worship',
    'Worship Together',
    'Yvonne Muñoz',
    'Yamilka',
    'Álvaro López',
    '418 Records Music'
]

const arrArtist = []
const arrAlbums = []
const multis = []
let arrMultitracks = []
let multitracks = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    if (req.method === 'GET') {
        try {
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping multitracks',
                message: 'Se inicia el scraping de multitracks.'
            })
            console.log('Se inicia el scraping de multitracks.')

            const ar = await prisma.artist.findMany({})
            fs.writeFileSync('data/backup/artists_backup.json', JSON.stringify(ar))
            const al = await prisma.album.findMany({})
            fs.writeFileSync('data/backup/albums_backup.json', JSON.stringify(al))
            const m = await prisma.multitrack.findMany({})
            fs.writeFileSync('data/backup/multitracks_backup.json', JSON.stringify(m))

            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping multitracks',
                message: 'Se hizo respaldo de los multitracks.'
            })
            console.log('Se hizo respaldo de los multitracks.')

            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping multitracks',
                message: 'Se hace scraping de multitracks.'
            })
            console.log('Se hace scraping de multitracks.')

            await script()
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping multitracks',
                message: 'Se guardará nueva información en la base de datos.'
            })
            console.log('Se guardará nueva información en la base de datos.')

            await prisma.artist.deleteMany({})

            for (const artist of arrArtist) {
                await prisma.artist.create({
                    data: {
                        id: artist.id,
                        path: artist.path,
                        name: artist.name,
                        imgUrl: artist.imgUrl,
                    }
                })
            }

            await prisma.album.deleteMany({})

            for (const album of arrAlbums) {
                await prisma.album.create({
                    data: {
                        id: album.id,
                        path: album.path,
                        name: album.name,
                        imgUrl: album.imgUrl,
                        artistId: album.artistId,
                        releaseDate: new Date(album.releaseDate),
                    }
                })
            }

            await prisma.multitrack.deleteMany({})

            for (const multitrack of arrMultitracks) {
                const multi = m.find((m1) => m1.multitrackId === multitrack.multitrackId)

                await prisma.multitrack.create({
                    data: {
                        id: multitrack.id,
                        multitrackId: multitrack.multitrackId,
                        path: '',
                        name: multitrack.name,
                        albumId: multitrack.albumId,
                        artistId: multitrack.artistId,
                        url: multi?.url ? multi.url : '',
                        link: multi?.link ? multi.link : '',
                        urlDate: multi?.urlDate ? new Date(multi.urlDate) : null
                    }
                })
            }

            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping multitracks',
                message: 'Se agregó la información a la base de datos.'
            })
            console.log('Se agregó la información a la base de datos.')
            console.log('finish data!')
            res.status(200)
            res.json('La información se cargó correctamente.')
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

async function script() {
    await getData()
    console.log('Se obtuvo información de web')
    //@ts-ignore
    arrMultitracks = [...new Map(multis.map((m) => [m.multitrackId, m])).values()]
    createArtistSheet()
    console.log('Se creó la hoja de artists')
    createAlbumsSheet()
    console.log('Se creó la hoja de albums')
    await createMultitracksSheet()
    console.log('Se creó la hoja de multitracks')
    wb.write('data/excel/multitracks.xlsx')
    console.log('Se creó el excel')
}

const getData = async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    return new Promise(async (resolve, reject) => {
        let index = 0
        for (const artist of artists) {
            index++
            console.log(`-Artista: ${artist}`)
            try {
                var response = await page.goto(`${baseUrl}/artists/${strToParam(artist)}/albums/?page=1&size=45`)
                var body = await response.text()

                var { window: { document } } = new jsdom.JSDOM(body)

                const artistId = uuidv4()
                const artistImage = document.querySelector('.details-banner--info--box--img').src

                arrArtist.push({
                    id: artistId,
                    path: strToParam(artist),
                    name: artist,
                    imgUrl: artistImage
                })

                const albums = document.getElementById('albums').children[1].children[0].children

                for (const album of albums) {
                    const albumId = uuidv4()
                    const link = album.children[0].href
                    const img = album.children[0].children[0].src
                    const title = album.children[1].innerHTML
                    console.log(`--Album: ${title}`)
                    const subtitle = album.children[2].innerHTML

                    arrAlbums.push({
                        id: albumId,
                        path: link.split('/')[3],
                        name: title.replace('amp;', ''),
                        imgUrl: img,
                        artistId: artistId,
                        releaseDate: `${subtitle}-01-01`,
                    })

                    try {
                        console.log(`${baseUrl}${link}`)
                        var response = await page.goto(`${baseUrl}${link}`)
                        var body = await response.text()

                        var { window: { document } } = new jsdom.JSDOM(body)

                        const multitracks = document.getElementById('playlist').children

                        for (const multitrack of multitracks) {
                            const title = multitrack.children[1].children[0].innerHTML
                            const multitrackId = multitrack.children[1].children[2].getAttribute('data-song-id')

                            if (multitrackId != null) {
                                console.log(multitrackId)
                                console.log(`---Multitrack: ${title}`)
                                multis.push({
                                    id: uuidv4(),
                                    multitrackId: multitrackId,
                                    name: title.replace('amp;', ''),
                                    artistId: artistId,
                                    albumId: albumId
                                })
                            }
                        }
                    } catch (error) {
                        console.log(`Ocurrió un problema al buscar información en: https://www.secuencias.com/artists/${strToParam(artist)}/${strToParam(strReplace(title))}/`)
                    }
                }
            } catch (error) {
                console.log(`Ocurrió un problema al buscar información en: https://www.secuencias.com/artists/${strToParam(artist)}/albums/`)
            }

            if (index === artists.length) {
                await browser.close()
                resolve('')
            }
        }
    })
}

function createArtistSheet() {
    const ws = wb.addWorksheet('Artist')
    ws.cell(1, 1).string('id')
    ws.cell(1, 2).string('path')
    ws.cell(1, 3).string('name')
    ws.cell(1, 4).string('imgUrl')

    arrArtist.forEach((artist, index) => {
        ws.cell(index + 2, 1).string(artist.id)
        ws.cell(index + 2, 2).string(artist.path)
        ws.cell(index + 2, 3).string(artist.name)
        ws.cell(index + 2, 4).string(artist.imgUrl)
    })
}

function createAlbumsSheet() {
    const ws = wb.addWorksheet('Albums')
    ws.cell(1, 1).string('id')
    ws.cell(1, 2).string('path')
    ws.cell(1, 3).string('name')
    ws.cell(1, 4).string('imgUrl')
    ws.cell(1, 5).string('artistId')
    ws.cell(1, 6).string('releaseDate')

    arrAlbums.forEach((album, index) => {
        ws.cell(index + 2, 1).string(album.id)
        ws.cell(index + 2, 2).string(album.path)
        ws.cell(index + 2, 3).string(album.name)
        ws.cell(index + 2, 4).string(album.imgUrl)
        ws.cell(index + 2, 5).string(album.artistId)
        ws.cell(index + 2, 6).string(album.releaseDate)
    })
}

async function createMultitracksSheet() {
    const ws = wb.addWorksheet('Multitracks')
    ws.cell(1, 1).string('id')
    ws.cell(1, 2).string('multitrackId')
    ws.cell(1, 3).string('path')
    ws.cell(1, 4).string('name')
    ws.cell(1, 5).string('albumId')
    ws.cell(1, 6).string('artistId')
    ws.cell(1, 7).string('url')
    ws.cell(1, 8).string('link')
    ws.cell(1, 9).string('urlDate')

    let index = 0
    for (const multitrack of arrMultitracks) {
        const multi = multitracks.find((m) => m.multitrackId === multitrack.multitrackId)

        ws.cell(index + 2, 1).string(multitrack.id)
        ws.cell(index + 2, 2).string(multitrack.multitrackId)
        ws.cell(index + 2, 3).string('')
        ws.cell(index + 2, 4).string(multitrack.name)
        ws.cell(index + 2, 5).string(multitrack.albumId)
        ws.cell(index + 2, 6).string(multitrack.artistId)

        if (multi) {
            ws.cell(index + 2, 7).string(multi?.url ? multi.url : '')
            ws.cell(index + 2, 8).string(multi?.link ? multi.link : '')
            ws.cell(index + 2, 9).string(multi?.urlDate ? (multi.urlDate.toLocaleDateString()).toString() : '')
        }

        index++
    }
}

function strReplace(str) {
    return str
        .replace('amp;', '')
        .replace('&', 'And')
        .replace(' (En Vivo)', '')
        .replace('(En Vivo)', '')
        .replace('?', ' ')
        .replace(' - ', ' ')
}

function strToParam(str) {
    return str.replace(/\s/g, '-')
}

function toNormalForm(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}