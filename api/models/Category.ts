import { CategoriesOnProduct } from './CategoriesOnProduct'

export interface Category {
    id?: number
    path?: string
    name: string
    description?: string
    isActive: boolean
    products: CategoriesOnProduct
}