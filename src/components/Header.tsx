import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { count, openCart } = useCart();
  const { ids } = useWishlist();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const panelsOpen = mobileOpen || searchOpen;
  const solid = scrolled || panelsOpen;

  const closeMenus = () => {
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
    closeMenus();
    setQuery("");
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        solid
          ? "border-slate-line bg-ink/92 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          to="/"
          onClick={closeMenus}
          className="font-display text-lg font-semibold uppercase tracking-[0.14em] text-offwhite"
        >
          ToyDrive <span className="text-accent">/</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 justify-center lg:flex"
        >
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `relative py-5 text-[11px] font-semibold uppercase tracking-label transition-colors ${
                      isActive
                        ? "text-offwhite"
                        : "text-soft hover:text-offwhite"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0 mx-auto h-px w-6 bg-accent transition-transform ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open);
              setMobileOpen(false);
            }}
            aria-label={searchOpen ? "Close search" : "Open search"}
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
            aria-label={`Account and wishlist, ${ids.length} saved item${ids.length === 1 ? "" : "s"}`}
            className="p-2.5 text-soft transition-colors hover:text-offwhite"
          >
            <User aria-hidden="true" className="h-4.5 w-4.5" />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
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
              setMobileOpen((open) => !open);
              setSearchOpen(false);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
            <Search
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-muted"
            />
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

      <nav
        aria-label="Mobile"
        aria-hidden={!mobileOpen}
        className={`absolute inset-x-0 top-full border-t border-slate-line bg-graphite transition-[opacity,transform] duration-300 ease-out lg:hidden ${
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8">
          {navLinks.map((link, index) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                onClick={closeMenus}
                tabIndex={mobileOpen ? undefined : -1}
                className={({ isActive }) =>
                  `block border-b border-slate-line py-4 text-[12px] font-semibold uppercase tracking-label transition-[transform,opacity,color] duration-300 ease-out ${
                    mobileOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-6 opacity-0"
                  } ${isActive ? "text-accent" : "text-soft"}`
                }
                style={{
                  transitionDelay: mobileOpen ? `${index * 60}ms` : "0ms",
                }}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
