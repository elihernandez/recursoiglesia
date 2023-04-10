import { Album } from './Album'
import { Artist } from './Artist'
import { MultitrackRequest } from './MultitrackRequest'
import { Shortener } from './Shortener'

export interface Multitrack {
  id?: string
  path?: string
  name: string
  multitrackId: string
  shortener?: Shortener
  artistId?: string
  artist?: Artist
  albumId?: string
  album?: Album
  url?: string
  link?: string
  multitrackRequest?: Array<MultitrackRequest>
}