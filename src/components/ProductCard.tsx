import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import type { Product } from '../types/product'
import { formatPrice, formatStock } from '../utils/format'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { has, toggle } = useWishlist()
  const wished = has(product.id)
  const stock = formatStock(product.stock)

  return (
    <article className="card-base group flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden border-b border-slate-line bg-ink">
        <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
          <img
            src={product.image}
            alt={`${product.name} ${product.scale} die-cast model`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className={`absolute right-3 top-3 border p-2 backdrop-blur-sm transition-colors ${
            wished
              ? 'border-accent bg-accent/15 text-accent'
              : 'border-slate-line bg-ink/60 text-soft hover:border-accent hover:text-accent'
          }`}
        >
          <Heart aria-hidden="true" className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
        </button>

        {product.originalPrice ? (
          <span className="absolute left-3 top-3 bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-label text-ink">
            Sale
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/product/${product.id}`} className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-offwhite transition-colors hover:text-accent">
              {product.name}
            </h3>
          </Link>
          <p className="shrink-0 text-sm font-semibold text-offwhite">{formatPrice(product.price)}</p>
        </div>

        <p className="mt-1.5 text-[12px] uppercase tracking-label text-muted">
          {product.scale} | {product.material}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${
              stock.tone === 'out' ? 'bg-red-400' : stock.tone === 'low' ? 'bg-amber-400' : 'bg-accent'
            }`}
          />
          <span
            className={`text-[11px] ${
              stock.tone === 'out' ? 'text-red-400' : stock.tone === 'low' ? 'text-amber-300' : 'text-soft'
            }`}
          >
            {stock.label}
          </span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
          className="group/btn mt-5 flex w-full items-center justify-between border border-slate-line px-4 py-3 text-[11px] font-semibold uppercase tracking-label text-offwhite transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-line disabled:hover:text-offwhite"
        >
          Add to Cart
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </article>
  )
}
