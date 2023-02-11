const puppeteer = require('puppeteer')
const jsdom = require('jsdom')
const xl = require('excel4node')
const { v4: uuidv4 } = require('uuid')
const wb = new xl.Workbook()
const fs = require('fs').promises
const axios = require('axios')

const baseLogin = 'https://www.sundaysocial.tv/login/'
const baseUrl = 'https://www.sundaysocial.tv/browse/page'
const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
// const pages = [1]
const arrTemplates = []

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
        for (const p of pages) {
            index++
            const url = `${baseUrl}/${p}`
            console.log(url)
            try {
                // var cookies = await loginPage.cookies()
                // await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2))
                var response = await page.goto(url)
                // const cookiesString = await fs.readFile('./cookies.json')
                // var cookies = JSON.parse(cookiesString)
                // await page.setCookie(...cookies)
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

            if (index === pages.length) {
                await browser.close()
                resolve('')
            }
        }
    })
}

(async () => {
    getData().then(() => {
        createTemplatesSheet()
        wb.write('tem_data.xlsx')
        console.log('finish data!')
    })
})()

function createTemplatesSheet() {
    const ws = wb.addWorksheet('Templates')
    ws.cell(1, 1).string('id')
    ws.cell(1, 2).string('name')
    ws.cell(1, 3).string('imgUrl')
    ws.cell(1, 4).string('url')
    ws.cell(1, 5).string('link')

    arrTemplates.forEach((template, index) => {
        ws.cell(index + 2, 1).string(template.id)
        ws.cell(index + 2, 2).string(template.name)
        ws.cell(index + 2, 3).string(template.imgUrl)
        ws.cell(index + 2, 4).string(template.url)
        ws.cell(index + 2, 5).string(template.link)
    })
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

function paramToStr(str) {
    return toNormalForm(str.replace(/([?*+^$[\]\\{}|-])/g, ' '))
}

function toNormalForm(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}