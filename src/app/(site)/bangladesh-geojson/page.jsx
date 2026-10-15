'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiMapPin,
  FiSearch,
  FiArrowRight,
  FiDownload,
  FiCheck,
  FiCopy,
  FiLayers,
  FiCheckCircle,
  FiBox,
  FiShield,
  FiGlobe,
  FiCode,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { searchGeo } from '@/lib/bangladeshGeoData';
import { useBangladeshGeoLang } from '@/context/BangladeshGeoLangContext';

const RAW_DATASETS = [
  {
    name: 'bd-divisions.json',
    recordsEn: '8 Divisions',
    recordsBn: '৮টি বিভাগ',
    size: '1.2 KB',
    descEn: 'Division names in English & Bengali, center coordinates, IDs.',
    descBn: 'ইংরেজি ও বাংলা নাম, স্থানাঙ্ক (অক্ষাংশ/দ্রাঘিমাংশ) এবং আইডি।',
    importSnippet: "import divisions from 'bangladesh-geojson/divisions';",
  },
  {
    name: 'bd-districts.json',
    recordsEn: '64 Districts',
    recordsBn: '৬৪টি জেলা',
    size: '12 KB',
    descEn: 'All 64 districts mapped to division IDs with geographic coordinates.',
    descBn: 'বিভাগ আইডির সাথে ম্যাপ করা ৬৪টি জেলা ও ভৌগোলিক সেন্টার।',
    importSnippet: "import districts from 'bangladesh-geojson/districts';",
  },
  {
    name: 'bd-upazilas.json',
    recordsEn: '494 Upazilas',
    recordsBn: '৪৯৪টি উপজেলা',
    size: '67 KB',
    descEn: 'Sub-districts / Thanas mapped with Bengali and English names.',
    descBn: 'জেলা আইডির সাথে ম্যাপ করা সকল উপজেলা ও থানা।',
    importSnippet: "import upazilas from 'bangladesh-geojson/upazilas';",
  },
  {
    name: 'bd-postcodes.json',
    recordsEn: '1,349 Postcodes',
    recordsBn: '১,৩৪৯টি পোস্টকোড',
    size: '192 KB',
    descEn: 'Complete postal database for courier, e-commerce, and KYC validation.',
    descBn: 'কুরিয়ার, ই-কমার্স ও ডেলিভারি ঠিকানার জন্য পোস্টাল ডাটাবেজ।',
    importSnippet: "import postcodes from 'bangladesh-geojson/postcodes';",
  },
  {
    name: 'bangladesh.geojson',
    recordsEn: 'Boundary Polygons',
    recordsBn: 'বাউন্ডারি পলিগন',
    size: '3.6 MB',
    descEn: 'High-detail boundary polygon coordinates ready for MapLibre, Leaflet, D3.',
    descBn: 'ম্যাপলিব্রে ও লিফলেট উপযোগী ফুল ভেক্টর বাউন্ডারি পলিগন।',
    importSnippet: "import boundary from 'bangladesh-geojson/boundary';",
  },
  {
    name: 'dhaka-city.json',
    recordsEn: 'City Zones & Wards',
    recordsBn: 'ঢাকা সিটি জোন ও ওয়ার্ড',
    size: '32 KB',
    descEn: 'DNCC & DSCC municipal areas, wards, and neighborhood breakdowns.',
    descBn: 'ঢাকা উত্তর ও দক্ষিণ সিটি করপোরেশনের জোন ও এলাকা।',
    importSnippet: "import dhaka from 'bangladesh-geojson/dhaka-city';",
  },
];

export default function BangladeshGeoOverviewPage() {
  const { lang, t } = useBangladeshGeoLang();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [copiedSnippet, setCopiedSnippet] = useState('');

  const stats = [
    {
      label: t('Divisions (বিভাগ)', 'বিভাগ'),
      count: t('8', '৮'),
      desc: t('Full administrative divisions with Geo lat/long', '৮টি প্রশাসনিক বিভাগের সেন্টার কোঅর্ডিনেট'),
    },
    {
      label: t('Districts (জেলা)', 'জেলা'),
      count: t('64', '৬৪'),
      desc: t('All 64 districts with bilingual names and centers', 'দ্বিভাষিক নাম ও ভৌগোলিক সেন্টার সহ ৬৪ জেলা'),
    },
    {
      label: t('Upazilas (উপজেলা)', 'উপজেলা'),
      count: t('494+', '৪৯৪+'),
      desc: t('Mapped to respective parent districts', 'সংশ্লিষ্ট জেলার সাথে যুক্ত সকল থানা/উপজেলা'),
    },
    {
      label: t('Postcodes (ডাকঘর)', 'পোস্টকোড ও ডাকঘর'),
      count: t('1,349+', '১,৩৪৯+'),
      desc: t('Post offices, upazilas and postal codes', 'বাংলাদেশ ডাক বিভাগের সকল পোস্টাল কোড'),
    },
  ];

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const results = searchGeo(val);
    setSearchResults(results.slice(0, 8));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    toast.success(t('Code copied to clipboard!', 'কোড কপি করা হয়েছে!'));
    setTimeout(() => setCopiedSnippet(''), 2000);
  };

  return (
    <div className="space-y-16">
      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all group"
          >
            <div className="text-3xl sm:text-5xl font-black font-exo-medium text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform duration-300">
              {stat.count}
            </div>
            <div className="mt-2 text-sm font-bold text-zinc-900 dark:text-white">
              {stat.label}
            </div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {stat.desc}
            </div>
          </div>
        ))}
      </section>

      {/* Live Interactive Search Preview */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 shadow-xl shadow-emerald-500/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
              {t('Live Search Demo', 'লাইভ সার্চ ডেমো')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-exo-medium">
              {t('Instant Bilingual Geographic Lookup', 'তাৎক্ষণিক দ্বিভাষিক ভৌগোলিক অনুসন্ধান')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight">
              {t(
                'Search divisions, districts, upazilas, and post codes in English or বাংলা.',
                'ইংরেজি বা বাংলায় যেকোনো বিভাগ, জেলা, উপজেলা বা পোস্টকোড খুঁজুন।'
              )}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <div className="relative flex items-center">
              <FiSearch className="absolute left-4.5 w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={t(
                  "Try typing 'Rangpur', 'সিলেট', 'Mirpur', or '1212'...",
                  "টাইপ করুন 'রংপুর', 'Sylhet', 'মিরপুর', বা '১২১২'..."
                )}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 border border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none shadow-sm text-sm sm:text-base font-exo"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="absolute right-4 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  {t('Clear', 'মুছুন')}
                </button>
              )}
            </div>

            {/* Quick Suggestions */}
            {!searchQuery && (
              <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                <span>{t('Quick tests:', 'উদাহরণ:')}</span>
                {['Dhaka', 'চট্টগ্রাম', 'Sylhet', 'রংপুর', '1212', 'Uttara'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setSearchResults(searchGeo(tag).slice(0, 8));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-emerald-950 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="mt-4 p-2 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xl space-y-1">
                {searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <FiMapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {item.label}
                        </div>
                        {item.sublabel && (
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight">
                            {item.sublabel}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/bangladesh-geojson/demo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
            >
              <span>{t('Explore full interactive map & cascading selector', 'সম্পূর্ণ ইন্টারঅ্যাক্টিভ ম্যাপ ও ক্যাসকেড সিলেক্টর দেখুন')}</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dataset & Files Breakdown */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              {t('Available Datasets', 'উপলব্ধ ডেটাসেট')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-exo-medium mt-1">
              {t("What's Included Inside the Package", 'প্যাকেজে যা যা ডাটাবেজ রয়েছে')}
            </h2>
          </div>
          <Link
            href="/bangladesh-geojson/docs"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>{t('View Full API Docs', 'সম্পূর্ণ API ডকস দেখুন')}</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RAW_DATASETS.map((data, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {data.name}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {data.size}
                  </span>
                </div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
                  {lang === 'bn' ? data.recordsBn : data.recordsEn}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed mb-4">
                  {lang === 'bn' ? data.descBn : data.descEn}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center justify-between text-xs bg-zinc-50 dark:bg-zinc-800/70 p-2 rounded-xl font-mono text-zinc-600 dark:text-zinc-300">
                  <span className="truncate pr-2">{data.importSnippet}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(data.importSnippet, data.name)}
                    className="shrink-0 p-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                    title="Copy import"
                  >
                    {copiedSnippet === data.name ? (
                      <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <FiCopy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Code Section */}
      <section className="p-8 sm:p-10 rounded-3xl bg-zinc-950 text-white border border-zinc-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                {t('Developer Integration', 'ডেভেলপার ইন্টিগ্রেশন')}
              </span>
              <h3 className="text-2xl font-bold font-exo-medium mt-1">
                {t('Install & Use in Under 30 Seconds', '৩০ সেকেন্ডের মধ্যে ইনস্টল ও ব্যবহার')}
              </h3>
            </div>
            <Link
              href="/bangladesh-geojson/demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>{t('Test in Browser Demo', 'ব্রাউজার ডেমোতে টেস্ট করুন')}</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center justify-between">
              <div>
                <span className="text-emerald-400 select-none"># Install via npm or pnpm</span>
                <div className="mt-1 text-sm text-white font-semibold">npm install bangladesh-geojson</div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('npm install bangladesh-geojson', 'install')}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
              >
                {copiedSnippet === 'install' ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto space-y-2">
              <span className="text-zinc-500">// Example: TypeScript / JavaScript usage</span>
              <pre className="text-emerald-300">
{`import bd from 'bangladesh-geojson';

// 1. Get all 8 divisions
const divisions = bd.getDivisions();

// 2. Cascade districts in Dhaka division
const dhakaDistricts = bd.getDistrictsByDivision('3');

// 3. Search bilingual records
const searchResults = bd.search('সিলেট');

// 4. Retrieve postcodes for courier checkout
const postcodes = bd.getPostcodesByDistrict('1');`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {t('Production Ready', 'প্রোডাকশন রেডি')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-exo-medium mt-1">
            {t('Common Use Cases in Bangladesh Software', 'জনপ্রিয় ব্যবহারের ক্ষেত্রসমূহ')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FiBox className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              {t('E-commerce Shipping & Delivery', 'ই-কমার্স ডেলিভারি ও শিপিং')}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t(
                'Auto-complete checkout forms with dynamic Division → District → Upazila cascade dropdowns and valid postal codes.',
                'চেকআউট ফর্মে বিভাগ → জেলা → উপজেলা ক্যাসকেড ড্রপডাউন এবং সঠিক ডাকঘরের পোস্টকোড ভ্যালিডেশন।'
              )}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <FiShield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              {t('KYC & FinTech Validation', 'কেওয়াইসি ও ফিনটেক ভ্যালিডেশন')}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t(
                'Validate national ID (NID) present & permanent addresses against standardized official BBS administrative units.',
                'জাতীয় পরিচয়পত্র (NID) অনুযায়ী বর্তমান ও স্থায়ী ঠিকানার অফিসিয়াল বিবিএস স্ট্যান্ডার্ড ডাটা ভেরিফিকেশন।'
              )}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <FiGlobe className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              {t('Interactive GIS & NGO Reporting', 'ইন্টারঅ্যাক্টিভ জিআইএস ও এনজিও ম্যাপিং')}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight leading-relaxed">
              {t(
                'Render detailed GeoJSON chloropleth maps for election visualizers, relief distribution, flood monitoring, and territory analytics.',
                'ত্রাণ বিতরণ, বন্যা মনিটরিং, নির্বাচন বা টেরিটরি অ্যানালিটিক্সের জন্য অপ্টিমাইজড ভেক্টর ক্লোরোপ্লেথ ম্যাপ।'
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
