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

const baseLogin = 'https://www.sundaysocial.tv/login/'
const baseUrl = 'https://www.sundaysocial.tv/browse/page'
const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
const arrTemplates = []
const total = 303

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    if (req.method === 'GET') {
        try {
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Se inicia el scraping de templates.'
            })
            console.log('Se inicia el scraping de templates.')

            const templatesBackup = await prisma.template.findMany({})
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Se obtuvieron los templates de la base de datos.'
            })
            console.log('Se obtuvieron los templates de la base de datos.')

            fs.writeFileSync('data/backup/templates_backup.json', JSON.stringify(templatesBackup))
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Se hizo respaldo de los tamplates.'
            })
            console.log('Se hizo respaldo de los tamplates.')

            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Se hace scraping de templates.'
            })
            console.log('Se hace scraping de templates.')
            await script()
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Se finalizó el scraping de templates.'
            })
            console.log('Se finalizó el scraping de templates.')

            await prisma.template.deleteMany({})
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Se eliminaron los templates de la base de datos.'
            })
            console.log('Se eliminaron los templates de la base de datos.')

            await prisma.template.createMany({
                data: arrTemplates
            })
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Se agregaron los templates a la base de datos.'
            })
            console.log('Se agregaron los templates a la base de datos.')
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Se finalizó el scraping de templates correctamente.'
            })
            console.log('Se finalizó el scraping de templates correctamente.')

            res.status(200)
            res.json('La información se cargó correctamente.')
        } catch (e) {
            console.log(e)
            await axios.post(`${process.env.WEB_URL}/api/services/notification`, {
                title: 'Scraping templates',
                message: 'Ocurrió un problema en el scraping de templates.'
            })
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
    // return new Promise((resolve, reject) => {
    //     exec('node tem_scrap.js', async (error, stdout, stderr) => {
    //         if (error) {
    //             console.error(`error: ${error.message}`)
    //             reject('')
    //             return
    //         }

    //         if (stderr) {
    //             console.error(`stderr: ${stderr}`)
    //             reject('')
    //             return
    //         }

    //         console.log(`stdout:\n${stdout}`)
    //         resolve('')
    //     })
    // })

    await getData()
    createTemplatesSheet()
    wb.write('data/excel/templates.xlsx')
}

const getData = async () => {
    const browser = await puppeteer.launch({ headless: true })
    const loginPage = await browser.newPage()

    var response = await loginPage.goto(baseLogin)
    var body = await response.text()

    var { window: { document } } = new jsdom.JSDOM(body)

    await loginPage.waitForSelector('input[name=log]')
    await loginPage.waitForSelector('input[name=pwd]')

    await loginPage.$eval('input[name=log]', el => el.value = 'emi.fh154@gmail.com')
    await loginPage.$eval('input[name=pwd]', el => el.value = 'PuertaCielo0601#')
    await loginPage.click('input[name="wp-submit"]')

    const page = await browser.newPage()

    return new Promise(async (resolve, reject) => {
        let index = 0
        while (index <= total) {
            index++
            const url = `${baseUrl}/${index}`
            console.log(url)
            try {
                var response = await page.goto(url)
                var body = await response.text()

                var { window: { document } } = new jsdom.JSDOM(body)

                const templatesPage = document.getElementById('portfolio').querySelectorAll('.element')

                for (const template of templatesPage) {
                    try {
                        const title = template.children[0].children[0].querySelector('.work-info').querySelector('.vert-center').querySelector('h3').textContent
                        const imgUrl = template.querySelector('img').src
                        const modalId = template.querySelector('a').getAttribute('data-featherlight')
                        await page.click(`a[data-featherlight="${modalId}"]`)
                        const url = document.querySelector(modalId).querySelector('a').href

                        const alias = url.split('/')[4].replace(/./g, '')
                        const response = await axios.get(`https://acortaz.net/api?api=6dcb86b1ef0a8448c8143cfb7934bbd5b5ff90e1&url=${url}&alias=${alias}`)
                        const link = response.data.shortenedUrl

                        arrTemplates.push({
                            id: uuidv4(),
                            path: '',
                            name: title,
                            imgUrl: imgUrl,
                            url: url,
                            link: link
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
                console.log(`Ocurrió un problema al buscar información en: ${url}`)
            }

            if (index === total) {
                await browser.close()
                resolve('')
            }
        }
        // for (const p of pages) {
        //     index++
        //     const url = `${baseUrl}/${p}`
        //     console.log(url)
        //     try {
        //         var response = await page.goto(url)
        //         var body = await response.text()

        //         var { window: { document } } = new jsdom.JSDOM(body)

        //         const templatesPage = document.getElementById('portfolio').querySelectorAll('.element')

        //         for (const template of templatesPage) {
        //             try {
        //                 const title = template.children[0].children[0].querySelector('.work-info').querySelector('.vert-center').querySelector('h3').textContent
        //                 const imgUrl = template.querySelector('img').src
        //                 const modalId = template.querySelector('a').getAttribute('data-featherlight')
        //                 await page.click(`a[data-featherlight="${modalId}"]`)
        //                 const url = document.querySelector(modalId).querySelector('a').href

        //                 const alias = url.split('/')[4].replace(/./g, '')
        //                 const response = await axios.get(`https://acortaz.net/api?api=6dcb86b1ef0a8448c8143cfb7934bbd5b5ff90e1&url=${url}&alias=${alias}`)
        //                 const link = response.data.shortenedUrl

        //                 arrTemplates.push({
        //                     id: uuidv4(),
        //                     path: '',
        //                     name: title,
        //                     imgUrl: imgUrl,
        //                     url: url,
        //                     link: link
        //                 })
        //             } catch (error) {
        //                 console.log(error)
        //             }
        //         }
        //     } catch (error) {
        //         console.log(error)
        //         console.log(`Ocurrió un problema al buscar información en: ${url}`)
        //     }

        //     if (index === pages.length) {
        //         await browser.close()
        //         resolve('')
        //     }
        // }
    })
}

function createTemplatesSheet() {
    const ws = wb.addWorksheet('Templates')
    ws.cell(1, 1).string('id')
    ws.cell(1, 2).string('path')
    ws.cell(1, 3).string('name')
    ws.cell(1, 4).string('imgUrl')
    ws.cell(1, 5).string('url')
    ws.cell(1, 6).string('link')

    arrTemplates.forEach((template, index) => {
        ws.cell(index + 2, 1).string(template.id)
        ws.cell(index + 2, 2).string('')
        ws.cell(index + 2, 3).string(template.name)
        ws.cell(index + 2, 4).string(template.imgUrl)
        ws.cell(index + 2, 5).string(template.url)
        ws.cell(index + 2, 6).string(template.link)
    })
}