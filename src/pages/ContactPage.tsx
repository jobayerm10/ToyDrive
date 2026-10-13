import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Mail, MapPin, Phone } from 'lucide-react'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@toydrive.com.bd', href: 'mailto:hello@toydrive.com.bd' },
  { icon: Phone, label: 'Phone', value: '+880 1700-000000', href: 'tel:+8801700000000' },
  { icon: MapPin, label: 'Studio', value: 'Dhanmondi, Dhaka, Bangladesh', href: null },
]

const faqs = [
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Inside Dhaka: 1–2 days. Outside Dhaka: 2–5 days via trusted courier partners.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer: 'Unopened models can be returned within 7 days. Damaged-in-transit items are replaced free.',
  },
  {
    id: 'faq',
    question: 'Are the models licensed & authentic?',
    answer: 'Yes. We only stock officially licensed die-cast from trusted global brands.',
  },
  {
    id: 'terms',
    question: 'Terms & Conditions',
    answer: 'Prices are listed in BDT. Orders are confirmed via phone or email before dispatch.',
  },
]

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) {
      next.message = 'Please tell us how we can help.'
    } else if (form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters.'
    }
    return next
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Frontend-only: no backend is connected. Just acknowledge locally.
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  const fieldClass = (hasError: boolean) =>
    `w-full border bg-charcoal px-4 py-3 text-sm text-offwhite placeholder:text-muted focus:outline-none ${
      hasError ? 'border-red-400' : 'border-slate-line focus:border-accent'
    }`

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <header className="mb-12 border-b border-slate-line pb-10">
        <p className="label-caps mb-3 text-accent">Contact</p>
        <h1 className="display-heading text-3xl text-offwhite sm:text-4xl lg:text-[42px]">
          Talk To The Garage
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-soft">
          Questions about a model, an order, or which scale belongs on your shelf? We reply within
          one business day.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="label-caps mb-6">
            Send A Message
          </h2>

          {submitted ? (
            <div
              role="status"
              className="flex items-start gap-4 border border-accent/40 bg-accent/10 p-6"
            >
              <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold text-offwhite">Message recorded locally</p>
                <p className="mt-1 text-sm text-soft">
                  This demo doesn&apos;t send email yet — but your form works. A backend integration
                  would deliver this to our inbox.
                </p>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="label-caps mb-2 block">
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                placeholder="Your full name"
                className={fieldClass(Boolean(errors.name))}
              />
              {errors.name ? (
                <p id="name-error" role="alert" className="mt-2 text-[12px] text-red-400">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="label-caps mb-2 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="you@example.com"
                className={fieldClass(Boolean(errors.email))}
              />
              {errors.email ? (
                <p id="email-error" role="alert" className="mt-2 text-[12px] text-red-400">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="label-caps mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                placeholder="How can we help?"
                className={`${fieldClass(Boolean(errors.message))} resize-y`}
              />
              {errors.message ? (
                <p id="message-error" role="alert" className="mt-2 text-[12px] text-red-400">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </section>

        <div>
          <h2 className="label-caps mb-6">Reach Us</h2>
          <ul className="space-y-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4 border-b border-slate-line pb-5">
                <Icon aria-hidden="true" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" />
                <div>
                  <p className="label-caps">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block text-sm text-offwhite hover:text-accent">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-offwhite">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <h2 id="faq-heading" className="label-caps mt-12 mb-6">
            Help Center
          </h2>
          <dl className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} id={faq.id} className="scroll-mt-24">
                <dt className="text-sm font-semibold text-offwhite">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-soft">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
