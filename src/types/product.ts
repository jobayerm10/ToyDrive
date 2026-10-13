export type CategoryId = 'sports' | 'suvs' | 'classic' | 'racing'

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  scale: string
  material: string
  category: CategoryId
  image: string
  description: string
  stock: number
  featured: boolean
  releasedAt: string
  color: string
}

export interface Category {
  id: CategoryId
  name: string
  image: string
  number: string
  description: string
}
