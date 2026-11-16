import Link from "next/link";
import {
  getAllDivisions,
  getDistrictsByDivision,
  getAllDistricts,
} from "@/lib/bangladeshLocations";
import {
  FiMapPin,
  FiPhoneCall,
  FiGlobe,
  FiArrowRight,
  FiCompass,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import DiscoveryCall from "@/components/DiscoveryCall";

export const metadata = {
  title:
    "বাংলাদেশ ও ৬৪ জেলায় ওয়েব ও সফটওয়্যার ডেভেলপমেন্ট সার্ভিস | MerxoDev Solutions",
  description:
    "নীলফামারী, রংপুর, ঢাকা, চট্টগ্রাম, রাজশাহী সহ বাংলাদেশের সকল ৬৪টি জেলায় বিশ্বমানের কাস্টম ওয়েবসাইট, ই-কমার্স ও সফটওয়্যার সলিউশন প্রদান করছে মারক্সোডেভ সলিউশনস। সরাসরি যোগাযোগ: +8801313334279।",
  keywords: [
    "৬৪ জেলা ওয়েব ডেভেলপমেন্ট",
    "বাংলাদেশ সেরা সফটওয়্যার কোম্পানি",
    "নীলফামারী ওয়েব ডেভেলপার",
    "রংপুর সেরা সফটওয়্যার কোম্পানি",
    "ঢাকা সেরা সফটওয়্যার কোম্পানি",
    "best web development agency in Bangladesh 64 districts",
    "software company Bangladesh all districts",
  ],
  alternates: {
    canonical: "https://merxodevsolutions.pro.bd/locations",
  },
};

export default function LocationsIndexPage() {
  const divisions = getAllDivisions();
  const allDistricts = getAllDistricts();

  const primaryPhone = "+8801313334279";
  const primaryPhoneDisplay = "01313-334279";

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-[#060b19] text-zinc-900 dark:text-zinc-100 font-hind-siliguri">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-8 uppercase tracking-wider font-exo2">
          <Link
            href="/"
            className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-violet-600 dark:text-cyan-400 font-bold">
            Locations <span className="font-hind-siliguri font-normal">(৮ বিভাগ ও ৬৪ জেলা)</span>
          </span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold uppercase tracking-wider mb-5 font-exo2">
            <FiMapPin size={13} className="text-violet-600 dark:text-cyan-400" />
            <span className="font-hind-siliguri">বাংলাদেশব্যাপী সর্বাধুনিক সফটওয়্যার ও ওয়েব সেবা</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight mb-4 font-hind-siliguri">
            বাংলাদেশের{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              ৮ বিভাগ ও ৬৪ জেলায়
            </span>{" "}
            আমাদের ডিজিটাল সেবা
          </h1>

          <div className="text-xs sm:text-sm font-exo2 text-zinc-500 dark:text-zinc-400 font-semibold mb-4 tracking-wide">
            Nationwide Full-Stack Software, Web & Cloud Engineering Coverage
          </div>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-hind-siliguri">
            মারক্সোডেভ সলিউশনস (MerxoDev Solutions) রাজধানী ঢাকা থেকে শুরু করে
            নীলফামারী, রংপুর, চট্টগ্রাম, সিলেট সহ সমগ্র বাংলাদেশের ব্যবসা প্রতিষ্ঠান
            ও উদ্যোক্তাদের জন্য বিশ্বমানের আধুনিক Next.js ওয়েবসাইট ও সফটওয়্যার
            তৈরি করে।
          </p>

          {/* Quick Division Jump Navigation */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-exo2 mr-1">
              Divisions:
            </span>
            {divisions.map((div) => (
              <a
                key={div.slug}
                href={`#${div.slug}`}
                className="px-3 py-1 rounded-xl text-xs font-medium bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-cyan-400 transition-all font-hind-siliguri"
              >
                {div.nameBn} <span className="font-exo2 text-[10px] text-zinc-400">({div.nameEn})</span>
              </a>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${primaryPhone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-violet-600/25 hover:scale-105 active:scale-95 transition-all font-hind-siliguri"
            >
              <FiPhoneCall size={14} />
              <span>সরাসরি হটলাইন: </span>
              <span className="font-exo2 font-semibold tracking-wider">{primaryPhoneDisplay}</span>
            </a>
            <a
              href="https://wa.me/8801313334279"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all font-hind-siliguri"
            >
              <FaWhatsapp size={15} />
              <span>WhatsApp সাপোর্ট</span>
            </a>
          </div>
        </div>

        {/* Division & District Grid */}
        <div className="space-y-12">
          {divisions.map((div) => {
            const divDistricts = getDistrictsByDivision(div.nameEn);
            return (
              <div
                id={div.slug}
                key={div.slug}
                className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/60 shadow-sm scroll-mt-28"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/70 text-violet-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                      <FiGlobe size={18} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-hind-siliguri">
                        {div.nameBn} বিভাগ{" "}
                        <span className="font-exo2 text-base font-semibold text-zinc-400">
                          ({div.nameEn} Division)
                        </span>
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-hind-siliguri">
                        সদর দপ্তর: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{div.hq}</span> • মোট জেলা:{" "}
                        <span className="font-exo2 font-semibold">{divDistricts.length}</span> টি
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-exo2 self-start sm:self-auto font-medium">
                    <FiCompass size={12} />
                    <span>{divDistricts.length} Districts Connected</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {divDistricts.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/locations/${d.slug}`}
                      className="group p-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:border-violet-500/60 dark:hover:border-violet-500/60 hover:bg-violet-50/30 dark:hover:bg-violet-950/20 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors font-hind-siliguri">
                            {d.nameBn}
                          </span>
                          {d.isHub && (
                            <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-emerald-500 text-white font-exo2 uppercase tracking-wide">
                              Hub
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-exo2 text-zinc-400">
                          {d.nameEn} • <span className="font-mono">{d.postalCode}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-cyan-400 font-hind-siliguri">
                        <span>সার্ভিস ও সমাধান বিস্তারিত</span>
                        <FiArrowRight
                          size={12}
                          className="transform group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Discovery Call Component */}
        <div className="mt-16">
          <DiscoveryCall />
        </div>
      </div>
    </div>
  );
}
