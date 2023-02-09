var XLSX = require('xlsx')
var workbook = XLSX.readFile('bd_tables.xlsx')
var sheet_name_list = workbook.SheetNames
var xlData1 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]])

// console.log(xlData1)

var workbook = XLSX.readFile('Excel.xlsx')
var sheet_name_list = workbook.SheetNames
var xlData2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]])

// console.log(xlData2)
const data = []

for (const data1 of xlData1) {
    for (const data2 of xlData2) {
        if (data1.name === data2.name) {
            data.push({
                name: data2.name,
                songId: data2.songId,
                url: data1.url,
                link: data1.link
            })
        }
    }
}

const xl = require('excel4node')
const wb = new xl.Workbook()
const ws = wb.addWorksheet('Urls')
ws.cell(1, 1).string('name')
ws.cell(1, 2).string('songId')
ws.cell(1, 3).string('url')
ws.cell(1, 4).string('link')

data.forEach((dt, index) => {
    ws.cell(index + 2, 1).string(dt.name)
    ws.cell(index + 2, 2).string(dt.songId)
    ws.cell(index + 2, 3).string(dt.url)
    ws.cell(index + 2, 4).string(dt.link)
})

wb.write('urls.xlsx')
console.log('finish data!')