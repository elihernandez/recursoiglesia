import { comoEnElCieloAlbumId, derramoElPerfumAlbumId, generacionRadicalId, grandeYFielAlbumId, laSunamitaAlbumId } from './albums'
import { Multitrack } from './../../api/models/Multitrack'
import { barakId, gatewayWorshipId, mielSanMarcosId, montesantoId } from './artists'

export const multitracks: Array<Multitrack> = [
    {
        name: 'Como En El Cielo (En Vivo)',
        url: 'https://m.finanzas-vida.com/comoenelcielo',
        artistId: mielSanMarcosId,
        albumId: comoEnElCieloAlbumId
    },
    {
        name: 'La Sunamita feat. Alex Marquez',
        url: '',
        artistId: montesantoId,
        albumId: laSunamitaAlbumId
    },
    {
        name: 'En Cristo Puedo (feat. Josh Morales)',
        url: 'https://m.finanzas-vida.com/encristopuedo',
        artistId: gatewayWorshipId,
        albumId: grandeYFielAlbumId
    },
    {
        name: 'Derramo el Perfume ft. Averly Morillo',
        url: 'https://m.finanzas-vida.com/derramoelperfume',
        artistId: montesantoId,
        albumId: derramoElPerfumAlbumId
    },
    {
        name: 'Alfa y Omega',
        url: 'https://m.finanzas-vida.com/alfayomega',
        artistId: barakId,
        albumId: generacionRadicalId
    }
]