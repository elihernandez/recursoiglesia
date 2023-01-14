import { Multitrack } from './Multitrack'

export interface Artist {
  id?: string
  name: string
  imgUrl: string
  multitracks?: Array<Multitrack>
}