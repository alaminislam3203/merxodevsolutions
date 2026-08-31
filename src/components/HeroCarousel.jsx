import Image from "next/image";
import Link from "next/link";
import EmblaCarousel from "./EmblaCarousel";

async function getBanners() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXTAUTH_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/banners`, {
      cache: "no-store", // always fresh — change to { next: { revalidate: 60 } } in production
    });
    if (!res.ok) return { left: [], right: [] };
    return res.json();
  } catch {
    return { left: [], right: [] };
  }
}

/** Renders a single slide inside any panel carousel */
function BannerSlide({ banner }) {
  const hasContent =
    Boolean(banner.title) ||
    Boolean(banner.subtitle) ||
    Boolean(banner.buttonText);

  const inner = (
    <div className="dual-slide-inner">
      <Image
        src={banner.imageUrl}
        alt={banner.title || "Banner"}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="dual-slide-img"
        priority
      />
      {hasContent && (
        <div className="dual-slide-overlay">
          {banner.title && (
            <h2 className="dual-slide-title">{banner.title}</h2>
          )}
          {banner.subtitle && (
            <p className="dual-slide-subtitle">{banner.subtitle}</p>
          )}
          {banner.buttonText && (
            <span className="dual-slide-btn">{banner.buttonText}</span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="dual-slide">
      {banner.buttonLink ? (
        <Link href={banner.buttonLink} className="dual-slide-link">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}

/** A carousel panel — renders nothing if no slides */
function CarouselPanel({ banners }) {
  if (!banners?.length) return null;
  return (
    <EmblaCarousel dotButtons arrowButtons autoplay>
      {banners.map((b) => (
        <BannerSlide key={b.id} banner={b} />
      ))}
    </EmblaCarousel>
  );
}

export default async function HeroCarousel() {
  const { left, right } = await getBanners();

  const hasLeft = left?.length > 0;
  const hasRight = right?.length > 0;

  // Nothing to show
  if (!hasLeft && !hasRight) return null;

  // Only one side has banners — full-width single carousel
  if (hasLeft && !hasRight) {
    return (
      <section className="hero-dual-section" aria-label="Hero Banner">
        <div className="hero-dual-full">
          <CarouselPanel banners={left} />
        </div>
      </section>
    );
  }

  if (!hasLeft && hasRight) {
    return (
      <section className="hero-dual-section" aria-label="Hero Banner">
        <div className="hero-dual-full">
          <CarouselPanel banners={right} />
        </div>
      </section>
    );
  }

  // Both sides — side-by-side dual carousel
  return (
    <section className="hero-dual-section" aria-label="Hero Banner">
      <div className="hero-dual-grid">
        <div className="hero-dual-left">
          <CarouselPanel banners={left} />
        </div>
        <div className="hero-dual-right">
          <CarouselPanel banners={right} />
        </div>
      </div>
    </section>
  );
}
