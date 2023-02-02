export function strToParam(str: string): string {
    return str.replace(/\s/g, '-')
}

export function paramToStr(str: string): string {
    return str.replace(/([.?*&+^$[\]\\{}|-])/g, ' ')
}
