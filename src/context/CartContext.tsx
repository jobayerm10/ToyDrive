import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'toydrive-cart-v1'

function sanitizeStoredCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return []
  return raw.filter((item): item is CartItem => {
    if (typeof item !== 'object' || item === null) return false
    const candidate = item as Partial<CartItem>
    const product = candidate.product
    const quantity = candidate.quantity
    if (typeof quantity !== 'number' || !Number.isFinite(quantity) || quantity < 1) return false
    if (typeof product !== 'object' || product === null) return false
    const p = product as Partial<Product>
    return (
      typeof p.id === 'string' &&
      typeof p.name === 'string' &&
      typeof p.price === 'number' &&
      typeof p.image === 'string'
    )
  })
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEY, [])
  const [isOpen, setIsOpen] = useState(false)

  const safeItems = useMemo(() => sanitizeStoredCart(items), [items])

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prev) => {
        const safePrev = sanitizeStoredCart(prev)
        const existing = safePrev.find((item) => item.product.id === product.id)
        if (existing) {
          return safePrev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
              : item,
          )
        }
        return [...safePrev, { product, quantity: Math.min(quantity, 99) }]
      })
      setIsOpen(true)
    },
    [setItems, setIsOpen],
  )

  const removeFromCart = useCallback(
    (productId: string) => {
      setItems((prev) => sanitizeStoredCart(prev).filter((item) => item.product.id !== productId))
    },
    [setItems],
  )

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) return
      setItems((prev) =>
        sanitizeStoredCart(prev).map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.min(quantity, 99) } : item,
        ),
      )
    },
    [setItems],
  )

  const clearCart = useCallback(() => setItems([]), [setItems])

  const value = useMemo<CartContextValue>(() => {
    const count = safeItems.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = safeItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    return {
      items: safeItems,
      count,
      subtotal,
      isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }
  }, [safeItems, isOpen, addToCart, removeFromCart, updateQuantity, clearCart, setIsOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
