
export function strToParam(str: string): string {
    return toNormalForm(str.replace(/\s/g, '-'))
}

export function paramToStr(str: string): string {
    return toNormalForm(str.replace(/([.?*+^$[\]\\{}|-])/g, ' '))
}

function toNormalForm(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
