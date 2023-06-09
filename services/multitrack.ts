import { paths } from 'api/helpers/constants'
import axios from 'axios'

export function getMultitracksByPage(page: string) {
    return axios.get(`${paths.api.multitrack}/${page}`).then(response => response.data)
}

export function getMultitracksBySearch(page: string, search: string) {
    return axios.get(`${paths.api.multitrack}/${page}/${search}`).then(response => response.data)
}