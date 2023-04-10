import { Multitrack } from './Multitrack'
import { Product } from './Product'
import { ResourceType } from './ResourceType'
import { Software } from './Software'
import { Template } from './Template'

export interface Download {
    id?: string
    resourceId: string
    type: ResourceType
    resource?: Multitrack | Software | Template | Product
    createdAt?: Date
}