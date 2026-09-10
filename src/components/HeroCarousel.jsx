import Image from "next/image";
import Link from "next/link";
import EmblaCarousel from "./EmblaCarousel";
import prisma from "@/lib/prisma";

async function getBanners() {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    const left = banners.filter((b) => b.slot === "left" || !b.slot);
    let rightTop = banners.filter((b) => b.slot === "right_top" || b.slot === "top_right");
    let rightBottom = banners.filter((b) => b.slot === "right_bottom" || b.slot === "bottom_right");
    const legacyRight = banners.filter((b) => b.slot === "right");

    // Smart backward compatibility for existing banners with slot="right"
    if (rightTop.length === 0 && legacyRight.length > 0) {
      rightTop = [legacyRight[0]];
    }
    if (rightBottom.length === 0 && legacyRight.length > 1) {
      rightBottom = legacyRight.slice(1);
    }

    return { left, rightTop, rightBottom };
  } catch (err) {
    console.error("HeroCarousel getBanners error:", err);
    return { left: [], rightTop: [], rightBottom: [] };
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
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

/** A panel — renders single slide directly or EmblaCarousel if multiple */
function CarouselPanel({ banners, dotButtons = false, arrowButtons = false, autoplay = true }) {
  if (!banners?.length) return null;

  if (banners.length === 1) {
    return <BannerSlide banner={banners[0]} />;
  }

  return (
    <EmblaCarousel dotButtons={dotButtons} arrowButtons={arrowButtons} autoplay={autoplay}>
      {banners.map((b) => (
        <BannerSlide key={b.id} banner={b} />
      ))}
    </EmblaCarousel>
  );
}

export default async function HeroCarousel() {
  const { left, rightTop, rightBottom } = await getBanners();

  const hasLeft = left?.length > 0;
  const hasRightTop = rightTop?.length > 0;
  const hasRightBottom = rightBottom?.length > 0;
  const hasRight = hasRightTop || hasRightBottom;

  // Nothing to show
  if (!hasLeft && !hasRight) return null;

  // Only left has banners — full-width single carousel
  if (hasLeft && !hasRight) {
    return (
      <section className="hero-dual-section" aria-label="Hero Banner">
        <div className="hero-dual-full">
          <CarouselPanel banners={left} dotButtons arrowButtons autoplay />
        </div>
      </section>
    );
  }

  // Only right has banners
  if (!hasLeft && hasRight) {
    return (
      <section className="hero-dual-section" aria-label="Hero Banner">
        <div className="hero-dual-grid hero-dual-grid-right-only">
          <div className="hero-dual-right" style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
            {hasRightTop && (
              <div className="hero-dual-right-item hero-dual-right-top">
                <CarouselPanel banners={rightTop} autoplay />
              </div>
            )}
            {hasRightBottom && (
              <div className="hero-dual-right-item hero-dual-right-bottom">
                <CarouselPanel banners={rightBottom} autoplay />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Both sides — Left has main banner/carousel, Right has Top & Bottom stacked banners (3 banners in total)
  return (
    <section className="hero-dual-section" aria-label="Hero Banner">
      <div className="hero-dual-grid">
        <div className="hero-dual-left">
          <CarouselPanel banners={left} dotButtons arrowButtons autoplay />
        </div>
        <div className="hero-dual-right">
          {hasRightTop && (
            <div className="hero-dual-right-item hero-dual-right-top">
              <CarouselPanel banners={rightTop} autoplay />
            </div>
          )}
          {hasRightBottom && (
            <div className="hero-dual-right-item hero-dual-right-bottom">
              <CarouselPanel banners={rightBottom} autoplay />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
