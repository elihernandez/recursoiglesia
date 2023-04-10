import { paths } from 'api/helpers/constants'
import axios from 'axios'

export default async function newsletterSubscriberService(email: string) {
    return await axios.post(paths.api.newsletterSubscriber, {
        email: email
    })
}