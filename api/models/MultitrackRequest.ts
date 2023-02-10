import { Multitrack } from './Multitrack'

export interface MultitrackRequest {
    id?: string
    email: string
    songId: string
    name: string
    isSent: boolean
    createdAt?: Date
    multitrack?: Multitrack
}