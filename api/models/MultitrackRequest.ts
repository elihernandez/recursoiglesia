import { Multitrack } from './Multitrack'

export interface MultitrackRequest {
    id?: string
    email: string
    multitrackId: string
    multitrack: Multitrack
    isSent: boolean
    createdAt: Date
}