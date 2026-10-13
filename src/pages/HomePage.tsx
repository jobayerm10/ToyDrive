import { BadgeCheck, PackageCheck, Truck } from 'lucide-react'
import { CategoryCard } from '../components/CategoryCard'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { categories } from '../data/categories'
import { getFeaturedProducts } from '../data/products'

const features = [
  {
    icon: BadgeCheck,
    title: '100% Authentic',
    subtitle: 'Trusted Brands',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    subtitle: 'Across Bangladesh',
  },
  {
    icon: PackageCheck,
    title: "Collector's Choice",
    subtitle: 'Rare & Premium Models',
  },
]

export function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <>
      <Hero />

      <section aria-labelledby="categories-heading" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading eyebrow="Shop by Category" heading="Find Your Favorite" />
        <h2 id="categories-heading" className="sr-only">
          Find Your Favorite
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="border-y border-slate-line bg-graphite">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <SectionHeading
            eyebrow="Featured"
            heading="Top Picks"
            action={{ label: 'View All', to: '/shop' }}
          />
          <h2 id="featured-heading" className="sr-only">
            Top Picks
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-heading" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] items-stretch lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <p className="label-caps mb-4 text-accent">The ToyDrive Experience</p>
            <h2 id="experience-heading" className="display-heading text-3xl text-offwhite sm:text-4xl lg:text-[42px]">
              More Than Just Toys
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-soft">
              We bring you authentic, high-quality toy cars from the world&apos;s most loved brands.
              Because every detail matters — even in a smaller scale.
            </p>

            <ul className="mt-12 grid gap-8 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
              {features.map(({ icon: Icon, title, subtitle }) => (
                <li key={title} className="flex items-start gap-4 lg:border-l lg:border-slate-line lg:pl-6">
                  <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-semibold text-offwhite">{title}</p>
                    <p className="mt-1 text-[12px] uppercase tracking-label text-muted">{subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[320px] lg:min-h-[560px]">
            <img
              src="/images/editorial/collection.jpg"
              alt="Wall display filled with hundreds of colorful die-cast model cars"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent lg:from-ink"
            />
          </div>
        </div>
      </section>
    </>
  )
}
