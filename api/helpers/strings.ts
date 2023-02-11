
export function strToParam(str: string): string {
    return str
        .replace(/\s/g, '-')
    const newStr = str.replace(' - ', ' ')
    return toNormalForm(newStr.replace(/\s/g, '-'))
}

export function paramToStr(str: string): string {
    console.log(str
        .replace(/-/g, ' ')
        .replace('   ', ' - '))
    return str
        .replace(/-/g, ' ')
        .replace('   ', ' - ')
    return toNormalForm(str.replace(/([?*+^$[\]\\{}|-])/g, ' '))
}

function toNormalForm(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
