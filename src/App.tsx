import { Link, Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { AboutPage } from './pages/AboutPage'
import { CartPage } from './pages/CartPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { ShopPage } from './pages/ShopPage'
import { WishlistPage } from './pages/WishlistPage'

function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center px-5 py-32 text-center">
      <p className="label-caps mb-4 text-accent">404</p>
      <h1 className="display-heading text-4xl text-offwhite">Page Not Found</h1>
      <p className="mt-4 max-w-sm text-sm text-soft">
        The road you took doesn&apos;t exist. Head back to the garage.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back Home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
