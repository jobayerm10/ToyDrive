# ToyDrive / — Premium Die-Cast Car Storefront

A production-quality React + TypeScript frontend for **ToyDrive**, a premium die-cast toy car store. Dark cinematic aesthetic, muted racing-green accent (`#8BAA7B`), and functional e-commerce interactions backed by local mock data.

## Tech Stack

- React 19 + TypeScript (strict)
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v7
- Lucide React icons
- localStorage persistence for cart & wishlist

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type-check + production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Features

- Sticky header with mobile nav, expanding search, wishlist & live cart count
- Hero carousel with 3 slides and prev/next controls
- Category cards → shop filtered by category
- Product listing with search, category filters, and sorting (newest / price / name)
- Product detail pages with quantity stepper, add-to-cart, wishlist, related models
- Slide-out cart drawer + full cart page (quantity, remove, subtotal, empty state)
- Wishlist page with empty state
- Contact form with client-side validation
- Cart & wishlist persisted to `localStorage` with safe parsing of malformed data
- Loading / empty / not-found states; accessible labels on all icon controls

## Structure

```
src/
  components/   Header, Footer, Hero, CategoryCard, ProductCard, SectionHeading, CartDrawer, QuantityStepper
  context/      CartContext, WishlistContext
  data/         products.ts, categories.ts (mock data)
  hooks/        useLocalStorage
  layouts/      RootLayout
  pages/        Home, Shop, ProductDetails, About, Contact, Cart, Wishlist
  types/        product.ts, cart.ts
  utils/        format.ts (৳ price formatting, stock labels)
public/
  images/       hero/, products/, categories/, editorial/ (local Unsplash-sourced photography)
```

## Notes

- Payments, authentication, and order placement are **not** implemented — the checkout button is intentionally disabled with an explanation.
- Product photography lives in `public/images/` and can be swapped for commissioned studio shots without code changes.
- Prices are displayed in Bangladeshi Taka (৳).
