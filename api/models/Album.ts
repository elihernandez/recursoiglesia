import { Artist } from './Artist'
import { Multitrack } from './Multitrack'

export interface Album {
  id?: string
  name: string
  imgUrl: string
  artistId?: string
  artist?: Artist
  multitracks?: Array<Multitrack>
}