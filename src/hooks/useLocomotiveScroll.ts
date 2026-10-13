import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

/**
 * Initializes Locomotive Scroll (Lenis-powered smooth scrolling) for the
 * whole site. Cleans up on unmount (StrictMode-safe).
 */
export function useLocomotiveScroll(): RefObject<LocomotiveScroll | null> {
  const instanceRef = useRef<LocomotiveScroll | null>(null)

  useEffect(() => {
    const instance = new LocomotiveScroll({
      lenisOptions: {
        smoothWheel: true,
        lerp: 0.085,
        anchors: true,
      },
    })

    instanceRef.current = instance

    return () => {
      instance.destroy()
      instanceRef.current = null
    }
  }, [])

  return instanceRef
}
