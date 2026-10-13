import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import bg1 from "../assets/bg-1.png";
import bg2 from "../assets/bg-2.jpg";
import bg3 from "../assets/bg-3.jpg";

interface HeroSlide {
  id: string;
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  image: string;
  alt: string;
  objectPosition: string;
}

const slides: HeroSlide[] = [
  {
    id: "green-racer",
    eyebrow: "Diecast Cars",
    titleTop: "Small Cars.",
    titleBottom: "Big Dreams.",
    description: "Premium toy cars for collectors, kids and every car lover.",
    image: bg1,
    alt: "Miniature Porsche race car photographed with cinematic green studio lighting",
    objectPosition: "50% 26%",
  },
  {
    id: "red-sports",
    eyebrow: "New Arrivals",
    titleTop: "Built to",
    titleBottom: "Be Collected.",
    description:
      "Studio-grade die-cast replicas with obsessive attention to detail.",
    image: bg2,
    alt: "Red miniature sports car on a dark studio background",
    objectPosition: "center",
  },
  {
    id: "bmw-m3",
    eyebrow: "Collector Series",
    titleTop: "Icons.",
    titleBottom: "In Miniature.",
    description:
      "From E30 legends to modern hypercars — scaled down, never watered down.",
    image: bg3,
    alt: "BMW M3 scale model lit with dramatic blue and red studio lights",
    objectPosition: "68% center",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function Hero() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    [],
  );
  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(goNext, 7000);
    return () => window.clearInterval(timer);
  }, [goNext, index]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative -mt-16 min-h-[100svh] overflow-hidden "
    >
      {slides.map((s, i) => (
        <img
          key={s.id}
          src={s.image}
          alt={s.alt}
          loading={i === 0 ? "eager" : "lazy"}
          style={{ objectPosition: s.objectPosition }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
      ))}

      <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
      <div aria-hidden="true" className="absolute inset-0 " />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 " />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pb-8 pt-28 sm:px-8 lg:px-12 lg:pt-32">
        <div className="flex flex-1 items-start py-8 lg:items-center lg:py-10">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-4">
              <p className="label-caps text-offwhite">{slide.eyebrow}</p>
              <span
                aria-hidden="true"
                className="h-px w-14 bg-offwhite/40 sm:w-20"
              />
            </div>

            <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-offwhite">
              {slide.titleTop}
              <br />
              <span className="text-accent">{slide.titleBottom}</span>
            </h1>

            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-offwhite/75">
              {slide.description}
            </p>

            <div className="group absolute bottom-24 right-5 z-10 w-fit sm:right-8 lg:static lg:mt-10">
              <Link
                to="/shop"
                className="inline-flex items-center gap-4 text-[12px] font-semibold uppercase tracking-label text-offwhite transition-colors hover:text-accent"
              >
                Shop Now
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1.5"
                />
              </Link>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-full bg-offwhite/50 transition-colors group-hover:bg-accent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4" aria-live="polite">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/90">
              <span>{pad(index + 1)}</span>
              <span className="mx-1.5 text-offwhite/50">/</span>
              {pad(slides.length)}
            </p>
            <div
              aria-hidden="true"
              className="relative h-px w-28 bg-offwhite/25 sm:w-44 lg:w-56"
            >
              <div
                className="absolute inset-y-0 left-0 bg-offwhite transition-all duration-500"
                style={{ width: `${((index + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="p-2 text-offwhite/70 transition-colors hover:text-accent"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="p-2 text-offwhite/70 transition-colors hover:text-accent"
            >
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
