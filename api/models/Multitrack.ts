import { Album } from './Album'
import { Artist } from './Artist'
import { MultitrackRequest } from './MultitrackRequest'
import { Shortener } from './Shortener'

export interface Multitrack {
  id?: string
  name: string
  songId: string
  shortener?: Shortener
  artistId?: string
  artist?: Artist
  albumId?: string
  album?: Album
  multitrackRequest: Array<MultitrackRequest>
}