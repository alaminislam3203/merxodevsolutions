import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles, Zap, Shield, Rocket } from "lucide-react";
import prisma from "@/lib/prisma";

// High-tech agency fallback visuals matching Merxo Dev Solutions theme
const DEFAULTS = {
  topLeft: {
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    title: "Next-Gen Web Apps & Scalable Systems",
    subtitle: "Engineered with Next.js 15, microservices, and zero-downtime architecture.",
    buttonText: "Explore Services",
    buttonLink: "/services",
    badge: "CORE ENGINEERING",
    icon: Sparkles,
  },
  bottomLeft1: {
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    title: "AI & Smart APIs",
    subtitle: "Automate complex workflows with custom LLMs & integrations",
    buttonText: "API Solutions",
    buttonLink: "/services-api-integration",
    badge: "AI AUTOMATION",
    icon: Zap,
  },
  bottomLeft2: {
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    title: "High-ROI SaaS & Stores",
    subtitle: "Ultra-fast conversions, custom dashboards, and analytics",
    buttonText: "View Projects",
    buttonLink: "/our-projects",
    badge: "SAAS & E-COM",
    icon: Rocket,
  },
  right: {
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    title: "Delivering Digital Excellence Worldwide",
    subtitle: "From vision to production — your dedicated engineering partner ready to scale your product.",
    buttonText: "Start Your Project",
    buttonLink: "/contact",
    badge: "GLOBAL AGENCY",
    icon: Shield,
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

export default async function QuadPromoSection() {
  const { topLeft, bottomLeft1, bottomLeft2, right } = await getQuadBanners();

  // Merge DB banners with defaults
  const bannerTL = {
    imageUrl: topLeft?.imageUrl || DEFAULTS.topLeft.imageUrl,
    title: topLeft?.title || DEFAULTS.topLeft.title,
    subtitle: topLeft?.subtitle || DEFAULTS.topLeft.subtitle,
    buttonText: topLeft?.buttonText || DEFAULTS.topLeft.buttonText,
    buttonLink: topLeft?.buttonLink || DEFAULTS.topLeft.buttonLink,
    badge: DEFAULTS.topLeft.badge,
  };

  const bannerBL1 = {
    imageUrl: bottomLeft1?.imageUrl || DEFAULTS.bottomLeft1.imageUrl,
    title: bottomLeft1?.title || DEFAULTS.bottomLeft1.title,
    subtitle: bottomLeft1?.subtitle || DEFAULTS.bottomLeft1.subtitle,
    buttonText: bottomLeft1?.buttonText || DEFAULTS.bottomLeft1.buttonText,
    buttonLink: bottomLeft1?.buttonLink || DEFAULTS.bottomLeft1.buttonLink,
    badge: DEFAULTS.bottomLeft1.badge,
  };

  const bannerBL2 = {
    imageUrl: bottomLeft2?.imageUrl || DEFAULTS.bottomLeft2.imageUrl,
    title: bottomLeft2?.title || DEFAULTS.bottomLeft2.title,
    subtitle: bottomLeft2?.subtitle || DEFAULTS.bottomLeft2.subtitle,
    buttonText: bottomLeft2?.buttonText || DEFAULTS.bottomLeft2.buttonText,
    buttonLink: bottomLeft2?.buttonLink || DEFAULTS.bottomLeft2.buttonLink,
    badge: DEFAULTS.bottomLeft2.badge,
  };

  const bannerR = {
    imageUrl: right?.imageUrl || DEFAULTS.right.imageUrl,
    title: right?.title || DEFAULTS.right.title,
    subtitle: right?.subtitle || DEFAULTS.right.subtitle,
    buttonText: right?.buttonText || DEFAULTS.right.buttonText,
    buttonLink: right?.buttonLink || DEFAULTS.right.buttonLink,
    badge: DEFAULTS.right.badge,
  };

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden" aria-label="Featured Showcase">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Agency Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">Future-Ready</span> Solutions
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors group"
          >
            <span>Talk to an expert</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Image Mosaic Grid (Matches reference image structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          
          {/* Left Column (Top Wide + Bottom 2 Square) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            
            {/* Top-Left: Wide Landscape Banner */}
            <div className="group relative w-full aspect-[16/8.5] sm:aspect-[16/8] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-lg hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)] transition-all duration-500">
              <Image
                src={bannerTL.imageUrl}
                alt={bannerTL.title || "Showcase Banner"}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 h-full p-5 sm:p-7 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30 backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-violet-300" />
                    {bannerTL.badge}
                  </span>
                </div>

                <div className="max-w-xl">
                  {bannerTL.title && (
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-md">
                      {bannerTL.title}
                    </h3>
                  )}
                  {bannerTL.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 font-normal drop-shadow">
                      {bannerTL.subtitle}
                    </p>
                  )}
                  {bannerTL.buttonText && bannerTL.buttonLink && (
                    <Link
                      href={bannerTL.buttonLink}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-600/30 hover:shadow-violet-600/50 transition-all duration-300 group/btn"
                    >
                      <span>{bannerTL.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom-Left: 2 Square/Compact Banners side-by-side */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              
              {/* Bottom-Left 1 */}
              <div className="group relative w-full aspect-square sm:aspect-[4/3.5] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-lg hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-500">
                <Image
                  src={bannerBL1.imageUrl}
                  alt={bannerBL1.title || "Feature Banner 1"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 30vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent pointer-events-none" />

                <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-between">
                  <span className="self-start inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    <Zap className="w-2.5 h-2.5 text-cyan-300" />
                    {bannerBL1.badge}
                  </span>

                  <div>
                    {bannerBL1.title && (
                      <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-tight mb-1 line-clamp-2">
                        {bannerBL1.title}
                      </h4>
                    )}
                    {bannerBL1.subtitle && (
                      <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 mb-3">
                        {bannerBL1.subtitle}
                      </p>
                    )}
                    {bannerBL1.buttonText && bannerBL1.buttonLink && (
                      <Link
                        href={bannerBL1.buttonLink}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group/link"
                      >
                        <span>{bannerBL1.buttonText}</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom-Left 2 */}
              <div className="group relative w-full aspect-square sm:aspect-[4/3.5] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-lg hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all duration-500">
                <Image
                  src={bannerBL2.imageUrl}
                  alt={bannerBL2.title || "Feature Banner 2"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 30vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent pointer-events-none" />

                <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-between">
                  <span className="self-start inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                    <Rocket className="w-2.5 h-2.5 text-purple-300" />
                    {bannerBL2.badge}
                  </span>

                  <div>
                    {bannerBL2.title && (
                      <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-tight mb-1 line-clamp-2">
                        {bannerBL2.title}
                      </h4>
                    )}
                    {bannerBL2.subtitle && (
                      <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 mb-3">
                        {bannerBL2.subtitle}
                      </p>
                    )}
                    {bannerBL2.buttonText && bannerBL2.buttonLink && (
                      <Link
                        href={bannerBL2.buttonLink}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 group/link"
                      >
                        <span>{bannerBL2.buttonText}</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Tall Portrait Banner (Spans entire height of left column) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="group relative w-full h-full min-h-[440px] sm:min-h-[500px] lg:min-h-0 flex-1 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-lg hover:border-amber-500/40 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] transition-all duration-500">
              <Image
                src={bannerR.imageUrl}
                alt={bannerR.title || "Featured Vertical Showcase"}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle top & strong bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 pointer-events-none" />

              {/* Content Container */}
              <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
                {/* Top Bar: Agency Badge & Quick Contact Chip */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-200 tracking-wide">MerxoDev Solutions</span>
                  </div>

                  <a
                    href="tel:+8801313334279"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-all"
                    title="Call directly"
                  >
                    <Phone className="w-3 h-3 text-cyan-400" />
                    <span className="hidden sm:inline">Call Us:</span>
                    <span>01313334279</span>
                  </a>
                </div>

                {/* Bottom Body */}
                <div className="mt-auto pt-12">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md mb-3">
                    <Shield className="w-3 h-3 text-amber-300" />
                    {bannerR.badge}
                  </span>

                  {bannerR.title && (
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-3 drop-shadow-md">
                      {bannerR.title}
                    </h3>
                  )}

                  {bannerR.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-300 font-normal mb-6 leading-relaxed">
                      {bannerR.subtitle}
                    </p>
                  )}

                  {bannerR.buttonText && bannerR.buttonLink && (
                    <Link
                      href={bannerR.buttonLink}
                      className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 group/btn"
                    >
                      <span>{bannerR.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
