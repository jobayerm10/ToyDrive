import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroSlide {
  id: string
  eyebrow: string
  titleTop: string
  titleBottom: string
  description: string
  image: string
  alt: string
}

const slides: HeroSlide[] = [
  {
    id: 'green-racer',
    eyebrow: 'Diecast Cars',
    titleTop: 'Small Cars.',
    titleBottom: 'Big Dreams.',
    description: 'Premium toy cars for collectors, kids and every car lover.',
    image: '/images/hero/hero-green.jpg',
    alt: 'Miniature Porsche race car photographed with cinematic green studio lighting',
  },
  {
    id: 'red-sports',
    eyebrow: 'New Arrivals',
    titleTop: 'Built to',
    titleBottom: 'Be Collected.',
    description: 'Studio-grade die-cast replicas with obsessive attention to detail.',
    image: '/images/hero/hero-red.jpg',
    alt: 'Red miniature sports car on a dark studio background',
  },
  {
    id: 'bmw-m3',
    eyebrow: 'Collector Series',
    titleTop: 'Icons.',
    titleBottom: 'In Miniature.',
    description: 'From E30 legends to modern hypercars — scaled down, never watered down.',
    image: '/images/hero/hero-bmw.jpg',
    alt: 'BMW M3 scale model lit with dramatic blue and red studio lights',
  },
]

const pad = (n: number) => String(n).padStart(2, '0')

export function Hero() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  const goNext = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    const timer = window.setInterval(goNext, 7000)
    return () => window.clearInterval(timer)
  }, [goNext])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative overflow-hidden border-b border-slate-line bg-ink"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-6 lg:px-12 lg:py-0">
        <div className="relative z-10 max-w-xl lg:py-20">
          <p className="label-caps mb-5 text-accent">{slide.eyebrow}</p>
          <h1 className="display-heading text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] text-offwhite">
            {slide.titleTop}
            <br />
            <span className="text-accent">{slide.titleBottom}</span>
          </h1>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-soft">{slide.description}</p>

          <div className="mt-10 flex flex-wrap items-center gap-10">
            <Link to="/shop" className="btn-primary group">
              Shop Now
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <div className="flex items-center gap-5">
              <p className="font-display text-sm tracking-[0.2em] text-soft" aria-live="polite">
                <span className="text-offwhite">{pad(index + 1)}</span>
                <span className="mx-1 text-muted">/</span>
                {pad(slides.length)}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous slide"
                  className="border border-slate-line p-2.5 text-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next slide"
                  className="border border-slate-line p-2.5 text-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[42vh] min-h-[260px] lg:h-full lg:min-h-[560px]">
          {slides.map((s, i) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            />
          ))}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent lg:from-ink lg:via-ink/10"
          />
        </div>
      </div>
    </section>
  )
}
