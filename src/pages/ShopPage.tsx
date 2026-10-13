import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { categories } from '../data/categories'
import { products } from '../data/products'
import type { CategoryId } from '../types/product'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A–Z' },
]

const isValidCategory = (value: string | null): value is CategoryId =>
  value !== null && categories.some((c) => c.id === value)

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const queryParam = searchParams.get('q') ?? ''

  const activeCategory = isValidCategory(categoryParam) ? categoryParam : 'all'
  const [sort, setSort] = useState<SortOption>('newest')

  const updateParams = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === '' || value === 'all') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    }
    setSearchParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = queryParam.trim().toLowerCase()
    const result = products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const matchesQuery =
        q === '' ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })

    return result.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
        default:
          return new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
      }
    })
  }, [activeCategory, queryParam, sort])

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <header className="mb-10 border-b border-slate-line pb-10">
        <p className="label-caps mb-3 text-accent">Collection</p>
        <h1 className="display-heading text-3xl text-offwhite sm:text-4xl lg:text-[42px]">
          {activeCategory === 'all'
            ? 'All Models'
            : (categories.find((c) => c.id === activeCategory)?.name ?? 'All Models')}
        </h1>
        <p className="mt-3 max-w-lg text-sm text-soft">
          {filtered.length} model{filtered.length === 1 ? '' : 's'} available
          {queryParam ? ` for “${queryParam}”` : ''}.
        </p>
      </header>

      <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => updateParams({ category: null })}
            className={`border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-label transition-colors ${
              activeCategory === 'all'
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-slate-line text-soft hover:border-accent hover:text-accent'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => updateParams({ category: category.id })}
              className={`border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-label transition-colors ${
                activeCategory === category.id
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-slate-line text-soft hover:border-accent hover:text-accent'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 border border-slate-line bg-graphite px-4">
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
            <label htmlFor="shop-search" className="sr-only">
              Search by product name
            </label>
            <input
              id="shop-search"
              type="search"
              value={queryParam}
              onChange={(event) => updateParams({ q: event.target.value })}
              placeholder="Search models…"
              className="w-full bg-transparent py-3 text-sm text-offwhite placeholder:text-muted focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border border-slate-line bg-graphite px-4">
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
            <label htmlFor="shop-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="w-full cursor-pointer bg-transparent py-3 text-sm text-offwhite focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-graphite text-offwhite">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-slate-line bg-graphite px-8 py-24 text-center">
          <p className="display-heading text-xl text-offwhite">No models found</p>
          <p className="mt-3 max-w-sm text-sm text-soft">
            Try a different search term, or clear the filters to browse the full collection.
          </p>
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="btn-primary mt-8"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
