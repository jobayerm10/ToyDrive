import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SectionHeadingProps {
  eyebrow: string
  heading: string
  action?: { label: string; to: string }
  children?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, heading, action, align = 'left' }: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14 ${
        align === 'center' ? 'text-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'mx-auto' : ''}>
        <p className="label-caps mb-3">{eyebrow}</p>
        <h2 className="display-heading text-3xl text-offwhite sm:text-4xl lg:text-[42px]">
          {heading}
        </h2>
      </div>
      {action ? (
        <Link
          to={action.to}
          className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-soft transition-colors hover:text-accent"
        >
          {action.label}
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          />
        </Link>
      ) : null}
    </div>
  )
}
