import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { QuantityStepper } from '../components/QuantityStepper'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

export function CartPage() {
  const { items, subtotal, count, updateQuantity, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
        <ShoppingBag aria-hidden="true" className="mb-6 h-12 w-12 text-muted" />
        <h1 className="display-heading text-3xl text-offwhite">Your Cart Is Empty</h1>
        <p className="mt-4 max-w-sm text-sm text-soft">
          Looks like you haven&apos;t added any die-cast models yet. The garage is waiting.
        </p>
        <Link to="/shop" className="btn-primary mt-8 group">
          Browse Collection
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <header className="mb-10 border-b border-slate-line pb-8">
        <p className="label-caps mb-3 text-accent">Cart</p>
        <h1 className="display-heading text-3xl text-offwhite sm:text-4xl">Your Cart</h1>
        <p className="mt-3 text-sm text-soft">
          {count} item{count === 1 ? '' : 's'}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
        <ul className="divide-y divide-slate-line border-y border-slate-line">
          {items.map((item) => (
            <li key={item.product.id} className="flex gap-5 py-6">
              <Link
                to={`/product/${item.product.id}`}
                className="h-24 w-24 shrink-0 overflow-hidden border border-slate-line bg-graphite sm:h-32 sm:w-32"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-base font-semibold text-offwhite hover:text-accent"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-[11px] uppercase tracking-label text-muted">
                      {item.product.scale} | {item.product.material} | {item.product.brand}
                    </p>
                  </div>
                  <p className="font-display text-lg tracking-wide text-offwhite">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <QuantityStepper
                    quantity={item.quantity}
                    max={Math.max(item.product.stock, 1)}
                    onChange={(next) => updateQuantity(item.product.id, next)}
                    onRemove={() => removeFromCart(item.product.id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit border border-slate-line bg-graphite p-6 lg:sticky lg:top-24">
          <p className="label-caps mb-6">Order Summary</p>

          <dl className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-soft">Subtotal</dt>
              <dd className="font-semibold text-offwhite">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-soft">Shipping</dt>
              <dd className="text-muted">Calculated later</dd>
            </div>
            <div className="flex items-center justify-between border-t border-slate-line pt-4">
              <dt className="label-caps">Total</dt>
              <dd className="font-display text-2xl tracking-wide text-offwhite">
                {formatPrice(subtotal)}
              </dd>
            </div>
          </dl>

          <p className="mt-4 border border-slate-line bg-charcoal p-3 text-[12px] leading-relaxed text-muted">
            Online payment and order placement are not connected yet. This cart is a frontend demo
            with local persistence.
          </p>

          <button type="button" disabled className="btn-primary mt-6 w-full justify-center opacity-40">
            Checkout — Coming Soon
          </button>

          <div className="mt-4 flex items-center justify-between">
            <Link to="/shop" className="text-[11px] uppercase tracking-label text-soft hover:text-accent">
              Continue Shopping
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="text-[11px] uppercase tracking-label text-muted hover:text-red-400"
            >
              Clear Cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
