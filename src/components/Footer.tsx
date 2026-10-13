import { Link } from 'react-router-dom'
import type { SVGProps } from 'react'

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.6 4.6 12 4.6 12 4.6s-6.6 0-8.4.5A3 3 0 0 0 1.5 7.2 31.5 31.5 0 0 0 1 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 23 12a31.5 31.5 0 0 0-.5-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  )
}

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const helpLinks = [
  { label: 'FAQ', to: '/contact#faq' },
  { label: 'Shipping', to: '/contact#shipping' },
  { label: 'Returns', to: '/contact#returns' },
  { label: 'Terms & Conditions', to: '/contact#terms' },
]

const CURRENT_YEAR = new Date().getFullYear()

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'YouTube', href: 'https://youtube.com', icon: YoutubeIcon },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-line bg-charcoal">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-offwhite">
              ToyDrive <span className="text-accent">/</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-soft">
              Small Cars. Big Dreams.
            </p>
            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-muted">
              Premium die-cast models for collectors, kids and every car lover across Bangladesh.
            </p>
          </div>

          <nav aria-label="Quick links">
            <p className="label-caps mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-soft transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Help">
            <p className="label-caps mb-5">Help</p>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-soft transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-caps mb-5">Social</p>
            <ul className="space-y-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-3 text-sm text-soft transition-colors hover:text-accent"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-line pt-8 text-[11px] uppercase tracking-label text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} ToyDrive. All rights reserved.</p>
          <p>Built for Car Lovers / Bangladesh</p>
        </div>
      </div>
    </footer>
  )
}
