import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllDistricts,
  getDistrictBySlug,
  getDistrictsByDivision,
} from "@/lib/bangladeshLocations";
import {
  FiPhoneCall,
  FiCheckCircle,
  FiMapPin,
  FiShield,
  FiZap,
  FiLayers,
  FiCpu,
  FiArrowRight,
  FiGlobe,
  FiStar,
  FiHelpCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import DiscoveryCall from "@/components/DiscoveryCall";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours ISR

export async function generateStaticParams() {
  const districts = getAllDistricts();
  return districts.map((d) => ({
    district: d.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { district: districtSlug } = await params;
  const district = getDistrictBySlug(districtSlug);

  if (!district) {
    return {
      title: "Location Not Found | MerxoDev Solutions",
    };
  }

  const title = `${district.nameBn}-এ সেরা ওয়েবসাইট ও সফটওয়্যার ডেভেলপমেন্ট কোম্পানি | MerxoDev Solutions`;
  const description = `${district.nameBn} জেলা ও ${district.divisionBn} বিভাগের সেরা ওয়েব ও সফটওয়্যার ডেভেলপমেন্ট এজেন্সি। আধুনিক Next.js, React ও ই-কমার্স ওয়েবসাইট তৈরি করুন। সরাসরি কল: +8801313334279 (${district.postalCode})।`;
  const canonicalUrl = `https://merxodevsolutions.pro.bd/locations/${district.slug}`;

  return {
    title,
    description,
    keywords: [
      `${district.nameBn} সেরা সফটওয়্যার কোম্পানি`,
      `${district.nameBn} ওয়েবসাইট তৈরি`,
      `${district.nameBn} ওয়েব ডেভেলপার`,
      `best web developer in ${district.nameEn}`,
      `best web development agency in ${district.nameEn}`,
      `software company in ${district.nameEn} Bangladesh`,
      `top software company ${district.nameEn}`,
      `website banate chai ${district.nameEn}`,
      `ecommerce website developer ${district.nameEn}`,
      `${district.nameEn} e sob cheye valo developer agency`,
      `kader service sob ceye valo ${district.nameEn}`,
      `kom khoroce website banate chai ${district.nameEn}`,
      `${district.divisionBn} বিভাগের সেরা ডেভেলপার`,
      ...(district.popularKeywords || []),
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
          alt: `${district.nameEn} Web & Software Development - MerxoDev Solutions`,
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

export default async function LocationDistrictPage({ params }) {
  const { district: districtSlug } = await params;
  const district = getDistrictBySlug(districtSlug);

  if (!district) {
    notFound();
  }

  const divisionDistricts = getDistrictsByDivision(district.division).filter(
    (d) => d.slug !== district.slug,
  );

  const primaryPhone = "+8801313334279";
  const primaryPhoneDisplay = "01313-334279";
  const secondaryPhone = "+8809697634279";
  const secondaryPhoneDisplay = "09697-634279";
  const whatsappUrl = `https://wa.me/8801313334279?text=${encodeURIComponent(
    `হ্যালো মারক্সোডেভ টিম, আমি ${district.nameBn} (${district.nameEn}) থেকে আপনাদের ওয়েবসাইট ও সফটওয়্যার ডেভেলপমেন্ট সার্ভিস সম্পর্কে জানতে চাই।`,
  )}`;

  // JSON-LD Structured Data for LocalBusiness / ProfessionalService
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `MerxoDev Solutions (${district.nameBn} Hub)`,
    alternateName: [
      `মারক্সোডেভ সলিউশনস ${district.nameBn}`,
      `MerxoDev ${district.nameEn}`,
      "merxodev",
      "merxodev solution",
    ],
    image: "https://merxodevsolutions.pro.bd/logo-light.png",
    url: `https://merxodevsolutions.pro.bd/locations/${district.slug}`,
    telephone: primaryPhone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: district.nameEn,
      addressRegion: district.division,
      postalCode: district.postalCode,
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.6850",
      longitude: "90.3563",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: `${district.nameEn}, ${district.division}, Bangladesh`,
      },
      {
        "@type": "Country",
        name: "Bangladesh",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "23:00",
      },
    ],
    sameAs: [
      "https://facebook.com/merxodevsolutions",
      "https://github.com/merxodevsolutions",
      "https://merxodevsolutions.pro.bd",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${district.nameBn}-এ একটি প্রফেশনাল ওয়েবসাইট বানাতে কত খরচ হয়?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `মারক্সোডেভ সলিউশনস (MerxoDev Solutions)-এ যেকোনো ধরণের বিজনেস, ই-কমার্স বা পোর্টফোলিও ওয়েবসাইটের জন্য বিভিন্ন সাশ্রয়ী প্যাকেজ রয়েছে। বিস্তারিত জানতে সরাসরি আমাদের ফোন করুন +8801313334279 নম্বরে।`,
        },
      },
      {
        "@type": "Question",
        name: `${district.nameBn}-এর উদ্যোক্তারা কীভাবে অর্ডার ও পেমেন্ট করবেন?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${district.nameBn} সহ বাংলাদেশের যেকোনো স্থান থেকে বিকাশ (bKash), নগদ (Nagad), ব্যাংক ট্রান্সফার অথবা অফিসিয়াল চুক্তির মাধ্যমে পার্ট-বাই-পার্ট নিরাপদ পেমেন্টে কাজ শুরু করতে পারবেন।`,
        },
      },
      {
        "@type": "Question",
        name: `ওয়েবসাইট ডেলিভারি হতে কত দিন সময় লাগে?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `সাধারণ বিজনেস ও ল্যান্ডিং পেজ ওয়েবসাইট সাধারণত ৫ থেকে ৭ কর্মদিবসে এবং বড় ই-কমার্স বা কাস্টম ওয়েব অ্যাপ্লিকেশন ১০ থেকে ২০ কর্মদিবসে সম্পূর্ণ লাইভ ডেলিভারি দেওয়া হয়।`,
        },
      },
      {
        "@type": "Question",
        name: `কাজ শেষে কি টেকনিক্যাল সাপোর্ট ও মেইনটেনেন্স পাওয়া যাবে?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `হ্যাঁ, মারক্সোডেভ সলিউশনস প্রতিটি প্রজেক্টের সাথে ডেডিকেটেড ফ্রি মেইনটেনেন্স সাপোর্ট, সিকিউরিটি প্যাচ ও ২৪/৭ লাইভ হেল্পলাইন প্রদান করে।`,
        },
      },
    ],
  };

  const services = [
    {
      titleBn: "কাস্টম ওয়েবসাইট ডেভেলপমেন্ট",
      titleEn: "Custom Website Engineering",
      descBn: `আপনার ${district.nameBn}-এর ব্যবসার জন্য মোবাইল ফ্রেন্ডলি, চোখের পলকে লোড হওয়া আল্ট্রা-ফাস্ট ওয়েবসাইট।`,
      href: "/services-web",
      icon: <FiGlobe size={24} className="text-violet-500" />,
    },
    {
      titleBn: "ই-কমার্স ও অনলাইন শপ",
      titleEn: "Modern E-Commerce Platforms",
      descBn: `বিকাশ, নগদ, ও কুরিয়ার অটোমেশন সহ সম্পূর্ণ সেলস জেনারেটিং অনলাইন স্টোর।`,
      href: "/services-ecommerce",
      icon: <FiZap size={24} className="text-cyan-500" />,
    },
    {
      titleBn: "কাস্টম ওয়েব অ্যাপ ও ইআরপি",
      titleEn: "Web Applications & ERP/CRM",
      descBn: `দোকান, কারখানা বা প্রতিষ্ঠানের হিসাব, ইনভেন্টরি ও স্টাফ ম্যানেজমেন্টের জন্য কাস্টম সফটওয়্যার।`,
      href: "/services-web-app",
      icon: <FiCpu size={24} className="text-amber-500" />,
    },
    {
      titleBn: "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
      titleEn: "Automated Payment Gateways",
      descBn: `bKash, Nagad, Rocket, SSLCommerz ও আন্তর্জাতিক কার্ড পেমেন্ট ডিরেক্ট সেটআপ।`,
      href: "/services-payment-gateway",
      icon: <FiShield size={24} className="text-emerald-500" />,
    },
    {
      titleBn: "UI/UX ও প্রিমিয়াম ডিজাইন",
      titleEn: "Figma UI/UX & Brand Identity",
      descBn: `আন্তর্জাতিক মানের মডার্ন গ্রাফিক্স ও ব্র্যান্ড আইডেন্টিটি ডিজাইন যা ক্লায়েন্টের নজর কাড়বে।`,
      href: "/services-design",
      icon: <FiLayers size={24} className="text-pink-500" />,
    },
    {
      titleBn: "গুগল এসইও ও র‍্যাংকিং",
      titleEn: "Local SEO & Google Search Top",
      descBn: `গুগলে ${district.nameBn}-এর যেকোনো গ্রাহক সার্চ করলে আপনার ব্যবসা যেন সবার শীর্ষে আসে।`,
      href: "/services-seo",
      icon: <FiStar size={24} className="text-indigo-500" />,
    },
  ];

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-[#060b19] text-zinc-900 dark:text-zinc-100 font-hind-siliguri">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-8 uppercase tracking-wider font-exo2">
            <Link
              href="/"
              className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/locations"
              className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
            >
              Locations
            </Link>
            <span>/</span>
            <span className="text-violet-600 dark:text-cyan-400 font-bold font-exo2">
              {district.nameEn} <span className="font-hind-siliguri font-normal">({district.nameBn})</span>
            </span>
          </nav>

          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-12 mb-12 shadow-xl">
            {/* Ambient Gradient Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold uppercase tracking-wider mb-5 font-exo2">
                <FiMapPin size={13} className="text-violet-600 dark:text-cyan-400" />
                <span className="font-hind-siliguri">
                  {district.nameBn} জেলা • {district.divisionBn} বিভাগ
                </span>
                {district.isHub && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-semibold uppercase tracking-wider">
                    Regional Hub
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.25] mb-3 font-hind-siliguri">
                {district.nameBn}-এ শীর্ষমানের{" "}
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  ওয়েবসাইট ও সফটওয়্যার
                </span>{" "}
                ডেভেলপমেন্ট এজেন্সি
              </h1>

              <div className="text-xs sm:text-sm font-exo2 text-zinc-500 dark:text-zinc-400 font-semibold mb-5 tracking-wide">
                Dedicated Software Engineering & Local Web Services in {district.nameEn} ({district.postalCode})
              </div>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 font-hind-siliguri">
                {district.overviewBn ||
                  `${district.nameBn} জেলার সকল ব্যবসা প্রতিষ্ঠান, ই-কমার্স উদ্যোক্তা ও শিক্ষাপ্রতিষ্ঠানের জন্য আন্তর্জাতিক মানের Next.js, React ও আধুনিক ক্লাউড প্রযুক্তিতে বিশ্বমানের সফটওয়্যার তৈরি করছে মারক্সোডেভ সলিউশনস।`}
              </p>

              {/* Direct Call & WhatsApp Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${primaryPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all font-hind-siliguri"
                >
                  <FiPhoneCall size={16} />
                  <span>সরাসরি কল করুন </span>
                  <span className="font-exo2 font-semibold tracking-wider">({primaryPhoneDisplay})</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all font-hind-siliguri"
                >
                  <FaWhatsapp size={18} />
                  <span>WhatsApp-এ মেসেজ দিন</span>
                </a>

                <a
                  href={`tel:${secondaryPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-exo2"
                >
                  <span>Helpline: {secondaryPhoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Upazila Coverage List */}
            {district.upazilasBn && (
              <div className="mt-8 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-2 font-hind-siliguri">
                  {district.nameBn} জেলার আওতাভুক্ত সকল উপজেলা ও এলাকা:
                </span>
                <div className="flex flex-wrap gap-2">
                  {district.upazilasBn.split(",").map((up) => (
                    <span
                      key={up}
                      className="px-3 py-1 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 font-medium font-hind-siliguri"
                    >
                      {up.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Core Services Section */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2 font-hind-siliguri">
                {district.nameBn}-এর জন্য আমাদের সেবাসমূহ
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-hind-siliguri">
                ব্যক্তিগত পোর্টফোলিও থেকে শুরু করে বিশাল কর্পোরেট ইআরপি — প্রতিটি কাজ শতভাগ দায়িত্ব সহকারে সম্পন্ন করি।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.titleEn}
                  className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 hover:border-violet-500/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                      {s.icon}
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 font-hind-siliguri">
                      {s.titleBn}
                    </h3>
                    <div className="text-[11px] font-exo2 text-zinc-400 mb-2 font-medium">
                      {s.titleEn}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-hind-siliguri">
                      {s.descBn}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-cyan-400 hover:underline font-hind-siliguri"
                    >
                      <span>বিস্তারিত দেখুন</span>
                      <FiArrowRight size={12} />
                    </Link>
                    <a
                      href={`tel:${primaryPhone}`}
                      className="text-[11px] font-semibold text-zinc-500 hover:text-emerald-500 font-hind-siliguri"
                    >
                      অর্ডার করুন
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose MerxoDev in this District */}
          <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-violet-950/20 via-zinc-900/60 to-zinc-900/80 p-8 sm:p-12 mb-16">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 font-hind-siliguri">
                কেন {district.nameBn}-এর উদ্যোক্তারা মারক্সোডেভ বেছে নেন?
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-hind-siliguri">
                আমরা কোনো সাধারণ ওয়ার্ডপ্রেস টেম্পলেট নির্ভর কোম্পানি নই। আমরা Next.js, React ও ক্লাউড ইঞ্জিনিয়ারিং ব্যবহার করে শতভাগ কাস্টম কোডেড ওয়েবসাইট তৈরি করি—যা কখনোই হ্যাং করে না, চোখের পলকে লোড হয় এবং গুগলে দ্রুত র‍্যাংক করে।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  `২৪/৭ ডেডিকেটেড সরাসরি সাপোর্ট (${primaryPhoneDisplay})`,
                  "বিকাশ, নগদ ও রকেট পেমেন্ট সিস্টেম ইন্টিগ্রেশন",
                  "১০০% মোবাইল ও এসইও ফ্রেন্ডলি আর্কিটেকচার",
                  "বিনামূল্যে SSL সিকিউরিটি সার্টিফিকেট ও ব্যাকআপ",
                  "অফিসিয়াল চুক্তি ও ইনভয়েস প্রদান",
                  "সরাসরি গুগল ম্যাপ ও লোকাল এসইও সেটআপ",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200 font-hind-siliguri">
                    <FiCheckCircle size={15} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Local Frequently Asked Questions (FAQ) */}
          <div className="mb-16">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2 font-hind-siliguri">
                সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-hind-siliguri">
                {district.nameBn}-এর ক্লায়েন্টদের সাধারণ প্রশ্নের পরিষ্কার উত্তর
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: `${district.nameBn}-এ একটি প্রফেশনাল ওয়েবসাইট বানাতে কত খরচ হয়?`,
                  a: `মারক্সোডেভ সলিউশনস (MerxoDev Solutions)-এ যেকোনো ধরণের বিজনেস, ই-কমার্স বা পোর্টফোলিও ওয়েবসাইটের জন্য বিভিন্ন সাশ্রয়ী প্যাকেজ রয়েছে। বিস্তারিত বাজেট ও ফিচার জানতে সরাসরি আমাদের ফোন করুন +8801313334279 নম্বরে।`,
                },
                {
                  q: `${district.nameBn}-এর উদ্যোক্তারা কীভাবে অর্ডার ও পেমেন্ট করবেন?`,
                  a: `${district.nameBn} সহ সারা বাংলাদেশের যেকোনো প্রান্ত থেকে বিকাশ (bKash), নগদ (Nagad), ব্যাংক ট্রান্সফার অথবা অফিসিয়াল চুক্তির মাধ্যমে পার্ট-বাই-পার্ট নিরাপদ পেমেন্টে কাজ শুরু করতে পারবেন।`,
                },
                {
                  q: `ওয়েবসাইট ডেলিভারি হতে কত দিন সময় লাগে?`,
                  a: `সাধারণ বিজনেস ও ল্যান্ডিং পেজ ওয়েবসাইট সাধারণত ৫ থেকে ৭ কর্মদিবসে এবং বড় ই-কমার্স বা কাস্টম ওয়েব অ্যাপ্লিকেশন ১০ থেকে ২০ কর্মদিবসে সম্পূর্ণ লাইভ ডেলিভারি দেওয়া হয়।`,
                },
                {
                  q: `কাজ শেষে কি টেকনিক্যাল সাপোর্ট ও মেইনটেনেন্স পাওয়া যাবে?`,
                  a: `হ্যাঁ, মারক্সোডেভ সলিউশনস প্রতিটি প্রজেক্টের সাথে ডেডিকেটেড ফ্রি মেইনটেনেন্স সাপোর্ট, সিকিউরিটি প্যাচ ও ২৪/৭ লাইভ হেল্পলাইন প্রদান করে।`,
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60"
                >
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2 font-hind-siliguri">
                    <FiHelpCircle size={15} className="text-violet-500 shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6 font-hind-siliguri">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Districts in Division Links */}
          {divisionDistricts.length > 0 && (
            <div className="p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 mb-16">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4 font-hind-siliguri">
                {district.divisionBn} বিভাগের অন্যান্য জেলায় আমাদের সার্ভিস:
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {divisionDistricts.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/locations/${d.slug}`}
                    className="px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-violet-500 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors font-hind-siliguri"
                  >
                    <span>{d.nameBn}</span>{" "}
                    <span className="font-exo2 text-[11px] text-zinc-400 font-medium">({d.nameEn})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Discovery Call & Contact Card Component */}
          <DiscoveryCall />
        </div>
      </div>
    </>
  );
}
