import { ResourceDownload } from 'api/models/ResourceDownload'
import axios from 'axios'

export default async function resourceDownload(data: ResourceDownload) {
    return await axios.post('/api/email/resourceDownload', data)
}