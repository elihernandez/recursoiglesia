import { Download } from 'api/models/Download'
import axios from 'axios'

export default async function downloadService(id, type) {
    const data: Download = {
        resourceId: id,
        type: type
    }

    return await axios.post('/api/download', data)
}