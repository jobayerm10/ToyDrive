import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface WishlistContextValue {
  ids: string[]
  has: (productId: string) => boolean
  toggle: (productId: string) => void
  remove: (productId: string) => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

const STORAGE_KEY = 'toydrive-wishlist-v1'

function sanitizeStoredIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw.filter((id): id is string => typeof id === 'string' && id.length > 0)
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useLocalStorage<string[]>(STORAGE_KEY, [])

  const safeIds = useMemo(() => sanitizeStoredIds(ids), [ids])

  const has = useCallback((productId: string) => safeIds.includes(productId), [safeIds])

  const toggle = useCallback(
    (productId: string) => {
      setIds((prev) => {
        const safePrev = sanitizeStoredIds(prev)
        return safePrev.includes(productId)
          ? safePrev.filter((id) => id !== productId)
          : [...safePrev, productId]
      })
    },
    [setIds],
  )

  const remove = useCallback(
    (productId: string) => {
      setIds((prev) => sanitizeStoredIds(prev).filter((id) => id !== productId))
    },
    [setIds],
  )

  const value = useMemo<WishlistContextValue>(
    () => ({ ids: safeIds, has, toggle, remove }),
    [safeIds, has, toggle, remove],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
