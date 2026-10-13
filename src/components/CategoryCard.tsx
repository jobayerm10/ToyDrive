import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Category } from '../types/product'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="group relative block overflow-hidden border border-slate-line bg-graphite"
    >
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] lg:aspect-[3/4]">
        <img
          src={category.image}
          alt={`${category.name} die-cast collection`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
        />
        <span className="absolute right-4 top-4 font-display text-sm tracking-[0.2em] text-offwhite/70">
          {category.number}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-lg font-medium uppercase tracking-[0.12em] text-offwhite">
          {category.name}
        </p>
        <span className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-soft transition-colors group-hover:text-accent">
          Explore
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}
