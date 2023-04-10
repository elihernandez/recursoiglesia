import { CategoriesOnProduct } from './CategoriesOnProduct'

export interface Product {
    id?: number
    path?: string
    name: string
    description?: string
    price: number
    link: string
    images: JSON | string
    isActive: boolean
    categories?: CategoriesOnProduct
}