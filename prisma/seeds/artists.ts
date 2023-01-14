import { Artist } from '../../api/models/Artist'
import { uuid } from 'uuidv4'

export const mielSanMarcosId = uuid()
export const montesantoId = uuid()
export const gatewayWorshipId = uuid()
export const barakId = uuid()

export const artists: Array<Artist> = [
    {
        id: mielSanMarcosId,
        name: 'Miel San Marcos',
        imgUrl: 'https://mtracks.azureedge.net/public/images/artists/cover/206/396.jpg'
    },
    {
        id: montesantoId,
        name: 'Montesanto',
        imgUrl: 'https://mtracks.azureedge.net/public/images/artists/cover/206/1372.jpg'
    },
    {
        id: gatewayWorshipId,
        name: 'Gateway Worship Español',
        imgUrl: 'https://mtracks.azureedge.net/public/images/artists/cover/206/1500.jpg'
    },
    {
        id: barakId,
        name: 'Barak',
        imgUrl: 'https://mtracks.azureedge.net/public/images/artists/cover/206/589.jpg'
    }
]