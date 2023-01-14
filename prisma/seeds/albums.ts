import { gatewayWorshipId, mielSanMarcosId, montesantoId, barakId } from './artists'
import { Album } from './../../api/models/Album'
import { uuid } from 'uuidv4'

export const comoEnElCieloAlbumId = uuid()
export const laSunamitaAlbumId = uuid()
export const grandeYFielAlbumId = uuid()
export const derramoElPerfumAlbumId = uuid()
export const generacionRadicalId = uuid()

export const albums: Array<Album> = [
    {
        id: comoEnElCieloAlbumId,
        name: 'Como En El Cielo',
        imgUrl: 'https://mtracks.azureedge.net/public/images/albums/284/743.jpg',
        artistId: mielSanMarcosId,
    },
    {
        id: laSunamitaAlbumId,
        name: 'La Sunamita feat. Alex Marquez',
        imgUrl: 'https://mtracks.azureedge.net/public/images/albums/284/5753.jpg',
        artistId: montesantoId,
    },
    {
        id: grandeYFielAlbumId,
        name: 'Grande Y Fiel',
        imgUrl: 'https://mtracks.azureedge.net/public/images/albums/284/6129.jpg',
        artistId: gatewayWorshipId,
    },
    {
        id: derramoElPerfumAlbumId,
        name: 'Derramo el Perfume ft. Averly Morillo',
        imgUrl: 'https://mtracks.azureedge.net/public/images/albums/284/5004.jpg',
        artistId: montesantoId,
    },
    {
        id: generacionRadicalId,
        name: 'Generación Radical',
        imgUrl: 'https://mtracks.azureedge.net/public/images/albums/284/1177.jpg',
        artistId: barakId,
    },
]