import { Album } from './Album'
import { Multitrack } from './Multitrack'

export interface Artist {
  id?: string
  path: string
  name: string
  imgUrl: string
  multitracks?: Array<Multitrack>
  albums: Array<Album>
}