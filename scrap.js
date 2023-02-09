const puppeteer = require('puppeteer')
const jsdom = require('jsdom')
const xl = require('excel4node')
const { v4: uuidv4 } = require('uuid')
const wb = new xl.Workbook()

const baseUrl = 'https://www.secuencias.com'

const artists = [
    // 'Aliento',
    // 'Averly Morillo',
    // 'Álvaro López',
    // 'Art Aguilera',
    // 'Bani Muñoz',
    // 'Barak',
    // 'Bethel Music',
    // 'BJ Putnam',
    // 'Camino de Vida',
    // 'Chris Tomlin',
    // "Christine D'Clario",
    // 'Coalo Zamorano',
    // 'Conquistando Fronteras',
    // 'CTUE Adoración',
    // 'Darlene Zschech',
    // 'David Reyes',
    // 'David Scarpeta',
    // 'Elevation Worship',
    // 'En Espíritu y en Verdad',
    // 'Erick Porta',
    // 'Evan Craft',
    // 'Free Worship',
    'Gateway Worship',
    // 'Gateway Worship Español',
    // 'Generación 12',
    // 'Hillsong United',
    // 'Hillsong Young And Free',
    // 'Hillsong en Español',
    // 'Ingrid Rosario',
    // 'Israel and New Breed',
    // 'Jacobo Ramos',
    // 'Jesús Adrian Romero',
    // 'Jesus Culture',
    // 'Jesus Worship Center',
    // 'Job Gonzalez',
    // 'Juan Carlos Alvarado',
    // 'Julio Melgar',
    // 'Julissa',
    // 'Kari Jobe',
    // 'Lakewood Music',
    // 'LEAD',
    // 'Living',
    // 'Lowsan Melgar',
    // 'Lucía Parker',
    // 'Majo y Dan',
    // 'Marco Barrientos',
    // 'Marcos Brunet',
    // 'Marcos Witt',
    // 'Maverick City Música',
    // 'Miel San Marcos',
    // 'MONTESANTO',
    // 'Mosaic MSC',
    // 'Música Más Vida ',
    // 'New Wine Worship',
    // 'Passion',
    // 'Planetshakers',
    // 'Su Presencia',
    // 'Thalles Roberto',
    // 'Un Corazón',
    // 'Danny Diaz',
    // 'Church of The City',
    // 'UPPERROOM',
    // 'Toma Tu Lugar',
    // 'Emir Sinsini',
    // 'Ericson Alexander Molano',
    // 'Danilo Montero',
    // 'Soulfire Revolution',
    // 'Yvonne Muñoz',
    // 'TWICE',
    // 'Vida Real Worship',
    // 'Paz Aguayo',
    // 'PRISMA',
    // 'Edward Rivera',
    // 'Apasionados Worship',
    // 'Cody Carnes',
    // 'Brandon Lake',
    // 'Phil Wickham',
    // 'The Belonging Co',
    // 'Kari Jobe',
    // 'North Point Worship',
]

const arrArtist = []
const arrAlbums = []
const arrMultitracks = []

const getData = async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    return new Promise(async (resolve, reject) => {
        let index = 0
        for (const artist of artists) {
            index++
            console.log(`-Artista: ${artist}`)
            try {
                var response = await page.goto(`${baseUrl}/artists/${strToParam(artist)}/albums/`)
                var body = await response.text()

                var { window: { document } } = new jsdom.JSDOM(body)

                const artistId = uuidv4()
                const artistImage = document.querySelector('.details-banner--info--box--img').src

                arrArtist.push({
                    id: artistId,
                    name: artist,
                    imgUrl: artistImage
                })

                const albums = document.getElementById('albums').children[1].children[0].children

                //await browser.close()

                for (const album of albums) {
                    const albumId = uuidv4()
                    const link = album.children[0].href
                    const img = album.children[0].children[0].src
                    const title = album.children[1].innerHTML
                    console.log(`--Album: ${title}`)
                    const subtitle = album.children[2].innerHTML

                    arrAlbums.push({
                        id: albumId,
                        name: title.replace('amp;', ''),
                        imgUrl: img,
                        artistId: artistId,
                        releaseDate: `${subtitle}-01-01`,
                    })

                    try {
                        console.log(`${baseUrl}${link}`)
                        // var browser = await puppeteer.launch()
                        // var page = await browser.newPage()
                        var response = await page.goto(`${baseUrl}${link}`)
                        var body = await response.text()

                        var { window: { document } } = new jsdom.JSDOM(body)

                        const multitracks = document.getElementById('playlist').children

                        for (const multitrack of multitracks) {
                            const title = multitrack.children[1].children[0].innerHTML
                            const songId = multitrack.children[1].children[2].getAttribute('data-song-id')
                            console.log(`---Multitrack: ${title}`)

                            arrMultitracks.push({
                                id: uuidv4(),
                                songId: songId,
                                name: title.replace('amp;', ''),
                                artistId: artistId,
                                albumId: albumId
                            })
                        }

                        //await browser.close()
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

(async () => {
    getData().then(() => {
        createArtistSheet()
        createAlbumsSheet()
        createMultitracksSheet()
        wb.write('sec_data.xlsx')
        console.log('finish data!')
    })
})()

function createArtistSheet() {
    const ws = wb.addWorksheet('Artist')
    ws.cell(1, 1).string('id')
    ws.cell(1, 2).string('name')
    ws.cell(1, 3).string('imgUrl')

    arrArtist.forEach((artist, index) => {
        ws.cell(index + 2, 1).string(artist.id)
        ws.cell(index + 2, 2).string(artist.name)
        ws.cell(index + 2, 3).string(artist.imgUrl)
    })
}

function createAlbumsSheet() {
    const ws = wb.addWorksheet('Albums')
    ws.cell(1, 1).string('id')
    ws.cell(1, 2).string('name')
    ws.cell(1, 3).string('imgUrl')
    ws.cell(1, 4).string('artistId')
    ws.cell(1, 5).string('releaseDate')

    arrAlbums.forEach((album, index) => {
        ws.cell(index + 2, 1).string(album.id)
        ws.cell(index + 2, 2).string(album.name)
        ws.cell(index + 2, 3).string(album.imgUrl)
        ws.cell(index + 2, 4).string(album.artistId)
        ws.cell(index + 2, 5).string(album.releaseDate)
    })
}

function createMultitracksSheet() {
    const ws = wb.addWorksheet('Multitracks')
    ws.cell(1, 1).string('id')
    ws.cell(1, 2).string('songId')
    ws.cell(1, 3).string('name')
    ws.cell(1, 4).string('albumId')
    ws.cell(1, 5).string('artistId')

    arrMultitracks.forEach((multitrack, index) => {
        ws.cell(index + 2, 1).string(multitrack.id)
        ws.cell(index + 2, 2).string(multitrack.songId)
        ws.cell(index + 2, 3).string(multitrack.name)
        ws.cell(index + 2, 4).string(multitrack.albumId)
        ws.cell(index + 2, 5).string(multitrack.artistId)
    })
}

function strReplace(str) {
    return str
        .replace('&', 'And')
        .replace(' (En Vivo)', '')
        .replace('(En Vivo)', '')
        .replace('?', ' ')
        .replace(' - ', ' ')
}

function strToParam(str) {
    return str.replace(/\s/g, '-')
}

function paramToStr(str) {
    return toNormalForm(str.replace(/([?*+^$[\]\\{}|-])/g, ' '))
}

function toNormalForm(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
