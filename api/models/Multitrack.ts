import { Album } from './Album'
import { Artist } from './Artist'

export interface Multitrack {
  id?: string
  name: string
  url?: string
  link?: string
  artistId?: string
  artist?: Artist
  albumId?: string
  album?: Album
}