import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'
import { products } from '../data/products'

export function WishlistPage() {
  const { ids } = useWishlist()
  const saved = products.filter((product) => ids.includes(product.id))

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <header className="mb-10 border-b border-slate-line pb-8">
        <p className="label-caps mb-3 text-accent">Wishlist</p>
        <h1 className="display-heading text-3xl text-offwhite sm:text-4xl">Saved Models</h1>
        <p className="mt-3 text-sm text-soft">
          {saved.length} model{saved.length === 1 ? '' : 's'} saved for later.
        </p>
      </header>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-slate-line bg-graphite px-8 py-24 text-center">
          <Heart aria-hidden="true" className="mb-6 h-10 w-10 text-muted" />
          <p className="display-heading text-xl text-offwhite">Nothing saved yet</p>
          <p className="mt-3 max-w-sm text-sm text-soft">
            Tap the heart on any product to keep it here for your next visit.
          </p>
          <Link to="/shop" className="btn-primary mt-8">
            Explore Models
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
