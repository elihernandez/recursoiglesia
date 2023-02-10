import { Multitrack } from './Multitrack'

export interface Shortener {
    id?: string
    name: string
    link: string
    multitrack?: Multitrack
}