import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSolutions, getSolutionBySlug } from "@/lib/solutionsData";
import {
  FiPhoneCall,
  FiCheckCircle,
  FiZap,
  FiShield,
  FiHelpCircle,
  FiArrowRight,
  FiAward,
  FiClock,
  FiLayers,
  FiCompass,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import DiscoveryCall from "@/components/DiscoveryCall";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours ISR

export async function generateStaticParams() {
  const solutions = getAllSolutions();
  return solutions.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Solution Not Found | MerxoDev Solutions",
    };
  }

  const title = `${solution.titleBn} | MerxoDev Solutions`;
  const description = `${solution.overviewBn} হটলাইন: +8801313334279 (01313334279) | MerxoDev Solutions.`;
  const canonicalUrl = `https://merxodevsolutions.pro.bd/solutions/${solution.slug}`;

  return {
    title,
    description,
    keywords: [
      solution.titleBn,
      solution.titleEn,
      ...(solution.popularKeywords || []),
      "MerxoDev Solutions",
      "মারক্সোডেভ সলিউশনস",
      "সফটওয়্যার কোম্পানি বাংলাদেশ",
      "ওয়েবসাইট ডেভেলপমেন্ট এজেন্সি",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "MerxoDev Solutions",
      locale: "bn_BD",
      type: "website",
      images: [
        {
          url: "https://merxodevsolutions.pro.bd/logo-light.png",
          width: 1200,
          height: 630,
          alt: `${solution.titleEn} - MerxoDev Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://merxodevsolutions.pro.bd/logo-light.png"],
    },
  };
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const primaryPhone = "+8801313334279";
  const primaryPhoneDisplay = "01313-334279";
  const secondaryPhone = "+8809697634279";
  const secondaryPhoneDisplay = "09697-634279";

  const whatsappUrl = `https://wa.me/8801313334279?text=${encodeURIComponent(
    `হ্যালো মারক্সোডেভ টিম, আমি আপনাদের "${solution.titleBn}" সার্ভিস সম্পর্কে বিস্তারিত জানতে ও প্রজেক্ট অর্ডার করতে চাই।`,
  )}`;

  const otherSolutions = getAllSolutions().filter((s) => s.slug !== solution.slug);

  // JSON-LD Structured Data for Service & LocalBusiness
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.titleEn,
    alternateName: solution.titleBn,
    provider: {
      "@type": "ProfessionalService",
      name: "MerxoDev Solutions",
      telephone: primaryPhone,
      email: "merxodevsolutions@gmail.com",
      url: "https://merxodevsolutions.pro.bd",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rangpur",
        addressCountry: "BD",
      },
    },
    serviceType: solution.badge,
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
    description: solution.overviewBn,
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (solution.faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {solution.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-[#060b19] text-zinc-900 dark:text-zinc-100 font-hind-siliguri">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-8 uppercase tracking-wider font-exo2">
            <Link
              href="/"
              className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-zinc-500">{solution.categoryBn}</span>
            <span>/</span>
            <span className="text-violet-600 dark:text-cyan-400 font-bold truncate max-w-[260px] sm:max-w-none">
              {solution.badge}
            </span>
          </nav>

          {/* Hero Showcase Card */}
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-12 mb-12 shadow-xl">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold uppercase tracking-wider mb-5 font-exo2">
                <FiCompass size={13} className="text-violet-600 dark:text-cyan-400" />
                <span>{solution.badge}</span>
                <span className="text-zinc-400">•</span>
                <span className="font-hind-siliguri">{solution.categoryBn}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.25] mb-4 font-hind-siliguri">
                {solution.titleBn}
              </h1>

              <div className="text-xs sm:text-sm font-exo2 text-zinc-400 dark:text-zinc-500 font-semibold mb-5 tracking-wide">
                {solution.titleEn}
              </div>

              <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8 max-w-3xl font-hind-siliguri">
                {solution.overviewBn}
              </p>

              {/* Direct Call & Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${primaryPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all font-hind-siliguri"
                >
                  <FiPhoneCall size={16} />
                  <span>সরাসরি কল দিন ({primaryPhoneDisplay})</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all font-hind-siliguri"
                >
                  <FaWhatsapp size={18} />
                  <span>হোয়াটসঅ্যাপে প্রজেক্ট আলোচনা</span>
                </a>

                <a
                  href={`tel:${secondaryPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-exo2"
                >
                  <span>Helpline: {secondaryPhoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Value & Core Features */}
          {solution.features?.length > 0 && (
            <div className="mb-14">
              <div className="max-w-2xl mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2 font-hind-siliguri">
                  প্রধান বৈশিষ্ট্য ও সুবিধাসমূহ
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-hind-siliguri">
                  আপনার প্রতিষ্ঠানের চাহিদামতো কাস্টমাইজড ফিচার সেট
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {solution.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-xs hover:border-violet-500/50 transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/70 text-violet-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheckCircle size={18} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 font-hind-siliguri">
                          {feat.titleBn}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-hind-siliguri">
                          {feat.descBn}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why MerxoDev Trust Banner */}
          <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-violet-950/20 via-zinc-900/60 to-zinc-900/80 p-8 sm:p-10 mb-14">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 font-hind-siliguri">
              মারক্সোডেভ সলিউশনসের সাথে কাজ করার সুবিধা
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-hind-siliguri">
              আমরা শুধু কোড লিখি না, আপনার ব্যবসার সফলতা নিশ্চিত করতে প্রজেক্ট আর্কিটেকচার থেকে শুরু করে সার্ভার ডেপ্লয়মেন্ট পর্যন্ত সার্বক্ষণিক দায়িত্ব নিই।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                "১০০% অফিসিয়াল চুক্তি ও ভেরিফায়েড মানি-রিসিট",
                "লাইভ গুগল মিট / জুম স্ক্রিন শেয়ারিং সাপোর্ট",
                "অত্যাধুনিক Next.js ও ক্লাউড সিকিউরিটি আর্কিটেকচার",
                "ডেলিভারির পর ২৪/৭ সার্বক্ষণিক টেকনিক্যাল সাপোর্ট",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200 font-hind-siliguri">
                  <FiAward size={15} className="text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          {solution.faqs?.length > 0 && (
            <div className="mb-14">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 font-hind-siliguri">
                সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
              </h2>
              <div className="space-y-4">
                {solution.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60"
                  >
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2 font-hind-siliguri">
                      <FiHelpCircle size={15} className="text-violet-500 shrink-0" />
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6 font-hind-siliguri">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Solutions Navigation */}
          {otherSolutions.length > 0 && (
            <div className="p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 mb-14">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4 font-hind-siliguri">
                আমাদের অন্যান্য বিশেষায়িত সফটওয়্যার সলিউশন:
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {otherSolutions.slice(0, 6).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-violet-500 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors font-hind-siliguri"
                  >
                    {s.titleBn}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Discovery Call Component */}
          <DiscoveryCall />
        </div>
      </div>
    </>
  );
}
