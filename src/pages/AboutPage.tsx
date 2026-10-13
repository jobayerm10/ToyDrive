import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, HeartHandshake, Recycle } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const values = [
  {
    icon: BadgeCheck,
    title: 'Authenticity First',
    body: 'Every model is sourced from licensed manufacturers — no bootlegs, no shortcuts.',
  },
  {
    icon: HeartHandshake,
    title: 'Collector Mentality',
    body: 'We pack like obsessives because a chipped fender is a small tragedy.',
  },
  {
    icon: Recycle,
    title: 'Built to Last',
    body: 'Die-cast metal, real rubber tyres, and paint that survives decades on the shelf.',
  },
]

export function AboutPage() {
  return (
    <div>
      <section className="border-b border-slate-line">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12 lg:py-28">
          <div>
            <p className="label-caps mb-4 text-accent">About ToyDrive</p>
            <h1 className="display-heading text-4xl text-offwhite sm:text-5xl">
              Passion,
              <br />
              <span className="text-accent">Scaled Down.</span>
            </h1>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-soft">
              ToyDrive started with a single 1:64 model on a dusty shelf and a simple belief: toy
              cars deserve the same reverence as the real machines they mirror. Today we curate
              premium die-cast collections for enthusiasts across Bangladesh — from weekend
              playrooms to museum-grade display cabinets.
            </p>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-soft">
              We obsess over panel gaps, paint depth, wheel design and packaging condition, because
              at this scale, details are everything.
            </p>
            <Link to="/shop" className="btn-primary group mt-10">
              Explore The Collection
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-slate-line">
            <img
              src="/images/editorial/experience.jpg"
              alt="Premium Lamborghini die-cast model displayed in a collector case"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading eyebrow="Our Values" heading="What Drives Us" align="center" />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <article key={title} className="card-base p-8 text-center">
              <Icon aria-hidden="true" className="mx-auto h-6 w-6 text-accent" />
              <h3 className="mt-5 font-display text-lg uppercase tracking-[0.1em] text-offwhite">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-line bg-graphite">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-12 lg:py-20">
          <div>
            <p className="label-caps mb-3 text-accent">Join The Garage</p>
            <h2 className="display-heading text-2xl text-offwhite sm:text-3xl">
              Find your next display piece
            </h2>
          </div>
          <Link to="/shop" className="btn-primary group">
            Shop Now
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </div>
  )
}
