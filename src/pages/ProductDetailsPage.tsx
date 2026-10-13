import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { QuantityStepper } from '../components/QuantityStepper'
import { SectionHeading } from '../components/SectionHeading'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { getProductById, getRelatedProducts } from '../data/products'
import { categories } from '../data/categories'
import { formatPrice, formatStock } from '../utils/format'

export function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const product = productId ? getProductById(productId) : undefined
  const { addToCart } = useCart()
  const { has, toggle } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
        <p className="label-caps mb-4 text-accent">404</p>
        <h1 className="display-heading text-3xl text-offwhite">Model Not Found</h1>
        <p className="mt-4 max-w-sm text-sm text-soft">
          The die-cast you&apos;re looking for doesn&apos;t exist or has been retired from the collection.
        </p>
        <Link to="/shop" className="btn-primary mt-8">
          Back to Shop
        </Link>
      </div>
    )
  }

  const wished = has(product.id)
  const stock = formatStock(product.stock)
  const category = categories.find((c) => c.id === product.category)
  const related = getRelatedProducts(product)

  const handleAdd = () => {
    addToCart(product, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-soft transition-colors hover:text-accent"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Back to Shop
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden border border-slate-line bg-graphite">
          <img
            src={product.image}
            alt={`${product.name} ${product.scale} die-cast model`}
            className="h-full w-full object-cover"
          />
          {product.originalPrice ? (
            <span className="absolute left-4 top-4 bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-label text-ink">
              Sale
            </span>
          ) : null}
        </div>

        <div className="flex flex-col">
          <p className="label-caps mb-3 text-accent">{product.brand}</p>
          <h1 className="display-heading text-3xl text-offwhite sm:text-4xl">{product.name}</h1>

          <div className="mt-5 flex items-baseline gap-3">
            <p className="font-display text-3xl tracking-wide text-offwhite">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice ? (
              <p className="text-sm text-muted line-through">{formatPrice(product.originalPrice)}</p>
            ) : null}
          </div>

          <p className="mt-2 text-[12px] uppercase tracking-label text-soft">
            {product.scale} | {product.material} | {product.color}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                stock.tone === 'out' ? 'bg-red-400' : stock.tone === 'low' ? 'bg-amber-400' : 'bg-accent'
              }`}
            />
            <span
              className={`text-[12px] ${
                stock.tone === 'out' ? 'text-red-400' : stock.tone === 'low' ? 'text-amber-300' : 'text-soft'
              }`}
            >
              {stock.label}
            </span>
          </div>

          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-soft">{product.description}</p>

          {category ? (
            <p className="mt-6 text-[12px] uppercase tracking-label text-muted">
              Category:{' '}
              <Link to={`/shop?category=${category.id}`} className="text-soft hover:text-accent">
                {category.name}
              </Link>
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <QuantityStepper
              quantity={quantity}
              onChange={(next) => setQuantity(Math.max(1, Math.min(next, Math.max(product.stock, 1))))}
              max={Math.max(product.stock, 1)}
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={product.stock <= 0}
              className="btn-primary min-w-44 justify-center disabled:cursor-not-allowed disabled:opacity-40"
            >
              {added ? (
                <>
                  <Check aria-hidden="true" className="h-4 w-4" />
                  Added
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wished}
              className={`btn-ghost ${wished ? 'border-accent text-accent' : ''}`}
            >
              <Heart aria-hidden="true" className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
              {wished ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          <ul className="mt-12 grid gap-4 border-t border-slate-line pt-8 sm:grid-cols-3">
            <li className="flex items-center gap-3 text-[12px] text-soft">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
              100% Authentic
            </li>
            <li className="flex items-center gap-3 text-[12px] text-soft">
              <Truck aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
              Fast Delivery
            </li>
            <li className="flex items-center gap-3 text-[12px] text-soft">
              <RotateCcw aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
              7-Day Returns
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="mt-24 lg:mt-32">
          <SectionHeading eyebrow="You May Also Like" heading="Related Models" />
          <h2 id="related-heading" className="sr-only">
            Related Models
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
