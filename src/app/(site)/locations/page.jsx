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
  FiCheckCircle,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

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
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-[#060b19] text-zinc-900 dark:text-zinc-100 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-6 uppercase tracking-wider">
          <Link
            href="/"
            className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-violet-600 dark:text-cyan-400 font-bold">
            Locations (৮ বিভাগ ও ৬৪ জেলা)
          </span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold uppercase tracking-wider mb-4">
            <FiMapPin size={13} />
            <span>বাংলাদেশব্যাপী সর্বাধুনিক সফটওয়্যার সেবা</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight mb-4">
            বাংলাদেশের{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              ৮ বিভাগ ও ৬৪ জেলায়
            </span>{" "}
            আমাদের ডিজিটাল সেবা
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            মারক্সোডেভ সলিউশনস (MerxoDev Solutions) রাজধানী ঢাকা থেকে শুরু করে
            নীলফামারী, রংপুর, চট্টগ্রাম, সিলেট সহ সমগ্র বাংলাদেশের ব্যবসা প্রতিষ্ঠান
            ও উদ্যোক্তাদের জন্য বিশ্বমানের আধুনিক Next.js ওয়েবসাইট ও সফটওয়্যার
            তৈরি করে।
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${primaryPhone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
            >
              <FiPhoneCall size={14} />
              <span>সরাসরি হটলাইন: {primaryPhoneDisplay}</span>
            </a>
            <a
              href="https://wa.me/8801313334279"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
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
                key={div.slug}
                className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/60 shadow-sm"
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/70 text-violet-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                      <FiGlobe size={18} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {div.nameBn} বিভাগ ({div.nameEn} Division)
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        সদর দপ্তর: {div.hq} • মোট জেলা: {divDistricts.length}টি
                      </p>
                    </div>
                  </div>
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
                          <span className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors">
                            {d.nameBn}
                          </span>
                          {d.isHub && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-white">
                              Hub
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400">
                          {d.nameEn} • {d.postalCode}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-cyan-400">
                        <span>সার্ভিস বিস্তারিত</span>
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
      </div>
    </div>
  );
}
