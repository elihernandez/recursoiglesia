import { MultitrackRequest } from 'api/models/MultitrackRequest'
import axios from 'axios'

export default async function multitrackRequest(data: MultitrackRequest) {
    return await axios.post('/api/email/multitrackRequest', data)
}