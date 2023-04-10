import { MultitrackRequest } from 'api/models/MultitrackRequest'
import axios from 'axios'

//TODO: Hacer request por tipo de recurso

export async function multitracRequestService(email: string, multitrackId: string) {
    const data: MultitrackRequest = {
        email: email,
        multitrackId: multitrackId,
        isSent: false
    }

    return await axios.post('/api/multitrackRequest', data)
}