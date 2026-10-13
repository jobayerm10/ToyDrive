import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { QuantityStepper } from './QuantityStepper'
import { formatPrice } from '../utils/format'

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, count, clearCart } =
    useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-slate-line bg-graphite">
        <header className="flex items-center justify-between border-b border-slate-line px-6 py-5">
          <div>
            <p className="label-caps mb-1">Your Cart</p>
            <p className="text-sm text-soft">
              {count} item{count === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 text-soft transition-colors hover:text-offwhite"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag aria-hidden="true" className="h-10 w-10 text-muted" />
            <p className="text-sm text-soft">Your cart is empty.</p>
            <Link to="/shop" onClick={closeCart} className="btn-primary mt-2">
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-slate-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 py-5">
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={closeCart}
                    className="h-20 w-20 shrink-0 overflow-hidden border border-slate-line bg-ink"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="truncate text-sm font-semibold text-offwhite hover:text-accent"
                      >
                        {item.product.name}
                      </Link>
                      <p className="shrink-0 text-sm font-semibold text-offwhite">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                    <p className="mt-1 text-[11px] uppercase tracking-label text-muted">
                      {item.product.scale} | {item.product.material}
                    </p>
                    <div className="mt-auto pt-3">
                      <QuantityStepper
                        compact
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

            <footer className="border-t border-slate-line px-6 py-6">
              <div className="mb-1 flex items-center justify-between">
                <p className="label-caps">Subtotal</p>
                <p className="font-display text-xl tracking-wide text-offwhite">
                  {formatPrice(subtotal)}
                </p>
              </div>
              <p className="mb-5 text-[12px] text-muted">
                Shipping and taxes calculated at checkout — not yet connected.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart()
                  navigate('/cart')
                }}
                className="btn-primary w-full justify-between"
              >
                View Cart
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
              <div className="mt-3 flex items-center justify-between">
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="text-[11px] uppercase tracking-label text-soft hover:text-accent"
                >
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
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
