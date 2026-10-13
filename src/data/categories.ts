import type { Category } from '../types/product'

export const categories: Category[] = [
  {
    id: 'sports',
    name: 'Sports Cars',
    image: '/images/categories/sports.jpg',
    number: '01',
    description: 'Mid-engine supercars and track-bred coupes in miniature.',
  },
  {
    id: 'suvs',
    name: 'SUVs',
    image: '/images/categories/suvs.jpg',
    number: '02',
    description: 'Rugged off-roaders and luxury utility icons.',
  },
  {
    id: 'classic',
    name: 'Classic Cars',
    image: '/images/categories/classic.jpg',
    number: '03',
    description: 'Timeless silhouettes from motoring’s golden era.',
  },
  {
    id: 'racing',
    name: 'Racing Cars',
    image: '/images/categories/racing.jpg',
    number: '04',
    description: 'Livery-wrapped endurance and touring racers.',
  },
]
