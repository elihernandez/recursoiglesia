import { Category } from './Category'
import { Product } from './Product'

export interface CategoriesOnProduct {
    product: Product
    productId: number
    category: Category
    categoryId: number
}