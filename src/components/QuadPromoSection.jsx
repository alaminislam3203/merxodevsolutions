import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { cleanProjectUrl } from "@/app/lib/projects";

// High quality fallback visuals matching the theme
const DEFAULTS = {
  topLeft: {
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    link: "/services",
    alt: "Showcase Banner 1",
  },
  bottomLeft1: {
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    link: "/services-api-integration",
    alt: "Showcase Banner 2",
  },
  bottomLeft2: {
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    link: "/our-projects",
    alt: "Showcase Banner 3",
  },
  right: {
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    link: "/contact",
    alt: "Showcase Banner 4",
  },
};

async function getQuadBanners() {
  try {
    const banners = await prisma.banner.findMany({
      where: {
        isActive: true,
        slot: {
          in: [
            "quad_top_left", "promo_top_left", "quad_tl",
            "quad_bottom_left_1", "promo_bottom_left_1", "quad_bl1",
            "quad_bottom_left_2", "promo_bottom_left_2", "quad_bl2",
            "quad_right", "promo_right", "quad_r",
          ],
        },
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    const topLeft = banners.find((b) =>
      b.slot === "quad_top_left" || b.slot === "promo_top_left" || b.slot === "quad_tl"
    ) || null;

    const bottomLeft1 = banners.find((b) =>
      b.slot === "quad_bottom_left_1" || b.slot === "promo_bottom_left_1" || b.slot === "quad_bl1"
    ) || null;

    const bottomLeft2 = banners.find((b) =>
      b.slot === "quad_bottom_left_2" || b.slot === "promo_bottom_left_2" || b.slot === "quad_bl2"
    ) || null;

    const right = banners.find((b) =>
      b.slot === "quad_right" || b.slot === "promo_right" || b.slot === "quad_r"
    ) || null;

    return { topLeft, bottomLeft1, bottomLeft2, right };
  } catch (err) {
    console.error("QuadPromoSection getQuadBanners error:", err);
    return { topLeft: null, bottomLeft1: null, bottomLeft2: null, right: null };
  }
}

function ImageCard({ imageUrl, alt, link, priority = false, sizes = "(max-width: 1024px) 100vw, 50vw", className = "" }) {
  const content = (
    <div className={`relative w-full h-full rounded-sm overflow-hidden border border-white/10 bg-slate-900/60 shadow-lg ${className}`}>
      <Image
        src={imageUrl}
        alt={alt || "Showcase Image"}
        fill
        sizes={sizes}
        className="object-cover object-center"
        priority={priority}
        unoptimized
      />
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block w-full h-full" aria-label={alt || "Showcase Link"}>
        {content}
      </Link>
    );
  }

  return content;
}

export default async function QuadPromoSection() {
  const { topLeft, bottomLeft1, bottomLeft2, right } = await getQuadBanners();

  const imgTL = topLeft?.imageUrl || DEFAULTS.topLeft.imageUrl;
  const linkTL = cleanProjectUrl(topLeft?.buttonLink || DEFAULTS.topLeft.link);

  const imgBL1 = bottomLeft1?.imageUrl || DEFAULTS.bottomLeft1.imageUrl;
  const linkBL1 = cleanProjectUrl(bottomLeft1?.buttonLink || DEFAULTS.bottomLeft1.link);

  const imgBL2 = bottomLeft2?.imageUrl || DEFAULTS.bottomLeft2.imageUrl;
  const linkBL2 = cleanProjectUrl(bottomLeft2?.buttonLink || DEFAULTS.bottomLeft2.link);

  const imgR = right?.imageUrl || DEFAULTS.right.imageUrl;
  const linkR = cleanProjectUrl(right?.buttonLink || DEFAULTS.right.link);

  return (
    <section className="w-full max-w-full relative py-4 sm:py-7 lg:py-10 px-3 sm:px-6 lg:px-8 overflow-hidden bg-transparent" aria-label="Showcase Images">
      <div className="relative z-10 max-w-[1440px] w-full mx-auto">
        {/* 4-Image Mosaic Grid: Pure Images, No Text, No Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">

          {/* Left Column (Top Wide + Bottom 2 Square) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 lg:gap-6">

            {/* Top-Left: Wide Landscape Image (Increased height & width) */}
            <div className="w-full aspect-[16/9] sm:aspect-[16/8.5] min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]">
              <ImageCard
                imageUrl={imgTL}
                alt="Showcase Wide Banner"
                link={linkTL}
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Bottom Row - 2 Square Images side-by-side (Increased height & width) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div className="w-full aspect-square sm:aspect-[4/3.5] min-h-[180px] sm:min-h-[240px] lg:min-h-[300px]">
                <ImageCard
                  imageUrl={imgBL1}
                  alt="Showcase Banner Left"
                  link={linkBL1}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 30vw"
                />
              </div>

              <div className="w-full aspect-square sm:aspect-[4/3.5] min-h-[180px] sm:min-h-[240px] lg:min-h-[300px]">
                <ImageCard
                  imageUrl={imgBL2}
                  alt="Showcase Banner Right"
                  link={linkBL2}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 30vw"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Tall Portrait Image (Spans full height of left column, increased dimensions) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full h-full min-h-[500px] sm:min-h-[580px] lg:min-h-0 flex-1">
              <ImageCard
                imageUrl={imgR}
                alt="Showcase Vertical Banner"
                link={linkR}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
