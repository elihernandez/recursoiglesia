import { Multitrack } from './Multitrack'

export interface MultitrackRequest {
    id?: string
    email: string
    multitrackId: string
    isSent: boolean
    createdAt?: Date
    multitrack?: Multitrack
}