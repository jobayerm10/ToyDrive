import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CartDrawer } from '../components/CartDrawer'
import { useCart } from '../context/CartContext'
import { useLocomotiveScroll } from '../hooks/useLocomotiveScroll'

export function RootLayout() {
  const location = useLocation()
  const { isOpen } = useCart()
  const locomotiveRef = useLocomotiveScroll()

  useEffect(() => {
    const instance = locomotiveRef.current

    if (!instance) {
      if (!location.hash) window.scrollTo({ top: 0 })
      return
    }

    const frame = requestAnimationFrame(() => {
      instance.resize()
      if (location.hash) {
        instance.scrollTo(location.hash, {
          offset: -80,
          immediate: true,
          force: true,
        })
      } else {
        instance.scrollTo(0, { immediate: true, force: true })
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash, locomotiveRef])

  useEffect(() => {
    const instance = locomotiveRef.current
    if (!instance) return
    if (isOpen) {
      instance.stop()
    } else {
      instance.start()
    }
  }, [isOpen, locomotiveRef])

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
