import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const { count, openCart } = useCart()
  const { ids } = useWishlist()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const closeMenus = () => {
    setMobileOpen(false)
    setSearchOpen(false)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop')
    closeMenus()
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-line bg-ink/92 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            onClick={closeMenus}
            className="font-display text-lg font-semibold uppercase tracking-[0.14em] text-offwhite"
          >
            ToyDrive <span className="text-accent">/</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `relative py-5 text-[11px] font-semibold uppercase tracking-label transition-colors ${
                        isActive ? 'text-offwhite' : 'text-soft hover:text-offwhite'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-0 bottom-0 h-px bg-accent transition-transform ${
                            isActive ? 'scale-x-100' : 'scale-x-0'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open)
              setMobileOpen(false)
            }}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            className="p-2.5 text-soft transition-colors hover:text-offwhite"
          >
            {searchOpen ? (
              <X aria-hidden="true" className="h-4.5 w-4.5" />
            ) : (
              <Search aria-hidden="true" className="h-4.5 w-4.5" />
            )}
          </button>

          <Link
            to="/wishlist"
            onClick={closeMenus}
            aria-label={`Wishlist, ${ids.length} item${ids.length === 1 ? '' : 's'}`}
            className="relative p-2.5 text-soft transition-colors hover:text-offwhite"
          >
            <Heart aria-hidden="true" className="h-4.5 w-4.5" />
            {ids.length > 0 ? (
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent" />
            ) : null}
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative p-2.5 text-soft transition-colors hover:text-offwhite"
          >
            <ShoppingCart aria-hidden="true" className="h-4.5 w-4.5" />
            {count > 0 ? (
              <span className="absolute -right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen((open) => !open)
              setSearchOpen(false)
            }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="p-2.5 text-soft transition-colors hover:text-offwhite lg:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-slate-line bg-graphite">
          <form
            onSubmit={handleSearchSubmit}
            role="search"
            className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-4 sm:px-8 lg:px-12"
          >
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
            <label htmlFor="header-search" className="sr-only">
              Search products
            </label>
            <input
              id="header-search"
              type="search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search die-cast cars…"
              className="w-full bg-transparent text-sm text-offwhite placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 text-[11px] font-semibold uppercase tracking-label text-accent hover:text-offwhite"
            >
              Search
            </button>
          </form>
        </div>
      ) : null}

      {mobileOpen ? (
        <nav aria-label="Mobile" className="border-t border-slate-line bg-graphite lg:hidden">
          <ul className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `block border-b border-slate-line py-4 text-[12px] font-semibold uppercase tracking-label ${
                      isActive ? 'text-accent' : 'text-soft'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
