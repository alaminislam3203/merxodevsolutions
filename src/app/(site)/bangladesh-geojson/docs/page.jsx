'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiBookOpen,
  FiCode,
  FiCopy,
  FiCheck,
  FiLayers,
  FiDownload,
  FiExternalLink,
  FiCheckCircle,
  FiGitPullRequest,
  FiTerminal,
  FiShield,
  FiInfo,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useBangladeshGeoLang } from '@/context/BangladeshGeoLangContext';

const API_METHODS = [
  {
    fn: 'getDivisions()',
    returns: 'Division[]',
    descEn: 'Returns all 8 administrative divisions of Bangladesh with IDs, bilingual names, and geographic centers.',
    descBn: 'বাংলাদেশের ৮টি প্রশাসনিক বিভাগের আইডি, বাংলা ও ইংরেজি নাম এবং সেন্টার কোঅর্ডিনেট প্রদান করে।',
    snippet: `import bd from 'bangladesh-geojson';
const divisions = bd.getDivisions();
console.log(divisions);
// [{ id: '1', name: 'Barishal', bn_name: 'বরিশাল', lat: '22.7010', long: '90.3535' }, ...]`,
  },
  {
    fn: 'getDivisionById(id)',
    returns: 'Division | undefined',
    descEn: 'Finds a specific division by its numeric string ID (1 through 8).',
    descBn: 'নির্দিষ্ট বিভাগের স্ট্রিং আইডি (১ থেকে ৮) দিয়ে বিভাগ খুঁজে বের করে।',
    snippet: `const dhaka = bd.getDivisionById('3');
console.log(dhaka.bn_name); // 'ঢাকা'`,
  },
  {
    fn: 'getDistricts()',
    returns: 'District[]',
    descEn: 'Returns all 64 districts mapped to division IDs with geographic coordinates.',
    descBn: 'বিভাগ আইডির সাথে লিংক করা ৬৪টি জেলার তালিকা ও ভৌগোলিক সেন্টার প্রদান করে।',
    snippet: `const allDistricts = bd.getDistricts();`,
  },
  {
    fn: 'getDistrictsByDivision(divisionId)',
    returns: 'District[]',
    descEn: 'Returns all districts within a specified division ID.',
    descBn: 'নির্দিষ্ট কোনো বিভাগের অন্তর্ভুক্ত সকল জেলার তালিকা রিটার্ন করে।',
    snippet: `// All districts in Rangpur Division (id: '7')
const rangpurDistricts = bd.getDistrictsByDivision('7');`,
  },
  {
    fn: 'getUpazilas()',
    returns: 'Upazila[]',
    descEn: 'Returns all 494+ upazilas across Bangladesh mapped to districts.',
    descBn: 'জেলা আইডির সাথে ম্যাপ করা বাংলাদেশের ৪৯৪+ উপজেলার সম্পূর্ণ তালিকা।',
    snippet: `const allUpazilas = bd.getUpazilas();`,
  },
  {
    fn: 'getUpazilasByDistrict(districtId)',
    returns: 'Upazila[]',
    descEn: 'Returns all upazilas inside a target district ID.',
    descBn: 'নির্দিষ্ট জেলার অন্তর্গত সকল উপজেলা/থানা রিটার্ন করে।',
    snippet: `// Upazilas in Bogura (districtId: '3')
const upazilas = bd.getUpazilasByDistrict('3');`,
  },
  {
    fn: 'getPostcodes()',
    returns: 'Postcode[]',
    descEn: 'Returns all 1,349+ post office entries with 4-digit post codes.',
    descBn: 'বাংলাদেশের ১,৩৪৯+ পোস্ট অফিস ও ৪ ডিজিটের পোস্টাল কোডের তালিকা।',
    snippet: `const postcodes = bd.getPostcodes();`,
  },
  {
    fn: 'getPostcodesByDistrict(districtId)',
    returns: 'Postcode[]',
    descEn: 'Returns all post offices and postal codes belonging to a specific district.',
    descBn: 'নির্দিষ্ট জেলার আওতাধীন সকল ডাকঘর ও পোস্টকোড রিটার্ন করে।',
    snippet: `const dhakaPostcodes = bd.getPostcodesByDistrict('1');`,
  },
  {
    fn: 'search(query, limit?)',
    returns: 'SearchHit[]',
    descEn: 'Deep bilingual search across division names, district names, upazila names, and postcodes in English or বাংলা.',
    descBn: 'ইংরেজি বা বাংলা যেকোনো শব্দ দিয়ে বিভাগ, জেলা, উপজেলা এবং পোস্টকোড তাৎক্ষণিক অনুসন্ধান।',
    snippet: `const matches = bd.search('Mirpur');
// or Bangla search:
const banglaMatches = bd.search('কুড়িগ্রাম');`,
  },
  {
    fn: 'getFullHierarchy()',
    returns: 'HierarchyDivision[]',
    descEn: 'Returns a nested tree where each division contains its districts, and each district contains its upazilas.',
    descBn: 'সম্পূর্ণ নেস্টেড ট্রি রিটার্ন করে (বিভাগ → জেলা → উপজেলা)।',
    snippet: `const tree = bd.getFullHierarchy();
// tree[0].districts[0].upazilas`,
  },
];

export default function BangladeshGeoDocsPage() {
  const { lang, t } = useBangladeshGeoLang();
  const [activeTab, setActiveTab] = useState('usage'); // 'usage' | 'contributing'
  const [copiedId, setCopiedId] = useState('');

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success(t('Snippet copied to clipboard!', 'কোড ক্লিপবোর্ডে কপি হয়েছে!'));
    setTimeout(() => setCopiedId(''), 2000);
  };

  const tocLinks = activeTab === 'usage' ? [
    { labelEn: '1. Getting Started', labelBn: '১. শুরু করার নিয়ম', href: '#getting-started' },
    { labelEn: '2. Data Models (TypeScript)', labelBn: '২. ডেটা মডেলস (টাইপস্ক্রিপ্ট)', href: '#data-models' },
    { labelEn: '3. Core API Functions', labelBn: '৩. কোর API ফাংশনসমূহ', href: '#api-functions' },
    { labelEn: '4. Direct Subpath Imports', labelBn: '৪. সাবপাথ ইমপোর্টস', href: '#raw-json' },
    { labelEn: '5. React Cascade Component', labelBn: '৫. রিঅ্যাক্ট ক্যাসকেড উদাহরণ', href: '#react-example' },
    { labelEn: '6. Licenses & Attribution', labelBn: '৬. লাইসেন্স ও শর্তাবলী', href: '#license' },
  ] : [
    { labelEn: '1. Reference Data Rules', labelBn: '১. রেফারেন্স ডেটা নীতিমালা', href: '#contrib-reference' },
    { labelEn: '2. Bazars & Routes (OSM)', labelBn: '২. বাজার ও হাইওয়ে (ওএসএম)', href: '#contrib-osm' },
    { labelEn: '3. Data Validation Script', labelBn: '৩. ডেটা ভ্যালিডেশন স্ক্রিপ্ট', href: '#contrib-validate' },
    { labelEn: '4. Rebuilding Datasets', labelBn: '৪. ডেটাসেট রিবিল্ড করা', href: '#contrib-rebuild' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-exo-medium text-zinc-900 dark:text-white">
            {lang === 'en' ? 'Documentation & API Guide' : 'ডকুমেন্টেশন ও API নির্দেশিকা'}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 font-exo-extralight">
            {lang === 'en'
              ? 'Complete reference for installation, helper methods, GeoJSON boundaries, and contributing.'
              : 'ইনস্টলেশন, হেল্পার মেথড, জিওজেসন বাউন্ডারি এবং প্রজেক্টে অবদান রাখার সম্পূর্ণ গাইড।'}
          </p>
        </div>

        {/* Usage / Contributing Tab Switcher */}
        <div className="inline-flex rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 p-1 border border-zinc-200 dark:border-zinc-700/60 shadow-sm shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('usage')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'usage'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Usage Guide' : 'ব্যবহারবিধি'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contributing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'contributing'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Contributing' : 'অবদান'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-4 p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs">
          <div className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
            <FiBookOpen className="text-emerald-500" />
            <span>{lang === 'en' ? 'On this page' : 'এই পেজে'}</span>
          </div>

          <nav className="space-y-1.5 font-exo">
            {tocLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="block py-1.5 px-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 transition-colors font-medium"
              >
                {lang === 'bn' ? link.labelBn : link.labelEn}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/bangladesh-geojson/demo"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-center transition-colors text-xs shadow-md shadow-emerald-600/20"
            >
              <span>{lang === 'en' ? 'Open Live Demo' : 'লাইভ ডেমো দেখুন'}</span>
            </Link>
          </div>
        </aside>

        {/* Main Documentation Body */}
        <div className="lg:col-span-9 space-y-12">
          {activeTab === 'usage' ? (
            <>
              {/* 1. Getting Started */}
              <section id="getting-started" className="scroll-mt-32 space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>{lang === 'en' ? '1. Getting Started' : '১. শুরু করার নিয়ম'}</span>
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {lang === 'en'
                    ? 'The bangladesh-geojson library is zero-dependency, works seamlessly in Node.js, Next.js, Vite, and React, and ships with complete TypeScript type definitions. The data lives inside the package — no internet needed once installed.'
                    : 'bangladesh-geojson সম্পূর্ণ জিরো-ডিপেন্ডেন্সি প্যাকেজ, যা Node.js, Next.js, Vite এবং React-এ সরাসরি কাজ করে। সম্পূর্ণ ডেটা প্যাকেজের ভেতরেই অন্তর্ভুক্ত থাকায় ইনস্টলের পর কোনো ইন্টারনেট সংযোগের প্রয়োজন নেই।'}
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 text-white font-mono text-xs flex items-center justify-between border border-zinc-800 shadow-md">
                  <span className="text-emerald-400">npm install bangladesh-geojson</span>
                  <button
                    type="button"
                    onClick={() => copyCode('npm install bangladesh-geojson', 'npm-install')}
                    className="p-1.5 text-zinc-400 hover:text-emerald-400 cursor-pointer"
                  >
                    {copiedId === 'npm-install' ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                  </button>
                </div>
              </section>

              {/* 2. Data Models */}
              <section id="data-models" className="scroll-mt-32 space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {lang === 'en' ? '2. Data Models (TypeScript Interfaces)' : '২. ডেটা মডেলস (TypeScript টাইপসমূহ)'}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {lang === 'en'
                    ? 'All records include both English and Bengali names along with geographic centers where applicable.'
                    : 'প্রতিটি রেকর্ডে ইংরেজি এবং বাংলা নাম ছাড়াও প্রযোজ্য ক্ষেত্রে সেন্ট্রাল অক্ষাংশ ও দ্রাঘিমাংশ যুক্ত রয়েছে।'}
                </p>

                <div className="p-5 rounded-2xl bg-zinc-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-zinc-800 shadow-lg">
                  <pre>
{`export interface Division {
  id: string;        // '1' - '8'
  name: string;      // 'Dhaka', 'Rangpur', etc.
  bn_name: string;   // 'ঢাকা', 'রংপুর', ইত্যাদি
  lat: string;       // Geographic latitude
  long: string;      // Geographic longitude
}

export interface District {
  id: string;        // '1' - '64'
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
}

export interface Upazila {
  id: string;        // '1' - '494'
  district_id: string;
  name: string;
  bn_name: string;
}

export interface Postcode {
  division_id: string;
  district_id: string;
  upazila: string;
  postOffice: string;
  postCode: string;  // e.g. '1212'
}`}
                  </pre>
                </div>
              </section>

              {/* 3. API Functions */}
              <section id="api-functions" className="scroll-mt-32 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                    {lang === 'en' ? '3. Core API Functions' : '৩. কোর API মেথডসমূহ'}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight mt-1">
                    {lang === 'en'
                      ? 'Convenient helper methods exported by the root package.'
                      : 'রুট প্যাকেজ থেকে এক্সপোর্ট করা সুবিধাজনক হেল্পার মেথডসমূহ।'}
                  </p>
                </div>

                <div className="space-y-5">
                  {API_METHODS.map((method, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm hover:border-emerald-500/40 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            {method.fn}
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            &rarr; {method.returns}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyCode(method.snippet, `fn-${idx}`)}
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          {copiedId === `fn-${idx}` ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />}
                          <span>{lang === 'en' ? 'Copy' : 'কপি'}</span>
                        </button>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight">
                        {lang === 'bn' ? method.descBn : method.descEn}
                      </p>

                      <div className="p-3.5 rounded-2xl bg-zinc-950 text-zinc-300 font-mono text-xs overflow-x-auto border border-zinc-800">
                        <pre>{method.snippet}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Direct Raw JSON Imports */}
              <section id="raw-json" className="scroll-mt-32 space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {lang === 'en' ? '4. Direct Subpath Imports' : '৪. সরাসরি সাবপাথ ইমপোর্টস'}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {lang === 'en'
                    ? 'Each dataset has its own subpath export, so your bundler (Webpack / Turbopack / Vite) only bundles what you import:'
                    : 'প্রতিটি ডেটাসেটের নিজস্ব সাবপাথ রয়েছে, ফলে বান্ডলারে কেবল প্রয়োজনীয় ফাইলটিই যুক্ত হবে:'}
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-zinc-800">
                  <pre>
{`import divisions from 'bangladesh-geojson/divisions';
import districts from 'bangladesh-geojson/districts';
import upazilas  from 'bangladesh-geojson/upazilas';
import postcodes from 'bangladesh-geojson/postcodes';

import boundary  from 'bangladesh-geojson/boundary'; // Upazila polygons (~3.5 MB)
import bazars    from 'bangladesh-geojson/bazars';   // ~3,500 marketplaces
import routes    from 'bangladesh-geojson/routes';   // Major highways
import dhaka     from 'bangladesh-geojson/dhaka-city';`}
                  </pre>
                </div>
              </section>

              {/* 5. React Cascade Component */}
              <section id="react-example" className="scroll-mt-32 space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {lang === 'en' ? '5. React Address Cascading Example' : '৫. রিঅ্যাক্ট অ্যাড্রেস ক্যাসকেড উদাহরণ'}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {lang === 'en'
                    ? 'Here is a drop-in pattern to implement a Division → District → Upazila cascade dropdown in React or Next.js:'
                    : 'React বা Next.js-এ সহজে বিভাগ → জেলা → উপজেলা ক্যাসকেড ড্রপডাউন বানানোর রেডিমেড কোড:'}
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-zinc-800">
                  <pre>
{`import { useState } from 'react';
import bd from 'bangladesh-geojson';

export default function ShippingAddressSelector() {
  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [upazilaId, setUpazilaId] = useState('');

  const divisions = bd.getDivisions();
  const districts = divisionId ? bd.getDistrictsByDivision(divisionId) : [];
  const upazilas = districtId ? bd.getUpazilasByDistrict(districtId) : [];

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* 1. Division */}
      <select value={divisionId} onChange={(e) => {
        setDivisionId(e.target.value);
        setDistrictId('');
        setUpazilaId('');
      }}>
        <option value="">Select Division</option>
        {divisions.map((d) => (
          <option key={d.id} value={d.id}>{d.name} ({d.bn_name})</option>
        ))}
      </select>

      {/* 2. District */}
      <select value={districtId} onChange={(e) => {
        setDistrictId(e.target.value);
        setUpazilaId('');
      }} disabled={!divisionId}>
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d.id} value={d.id}>{d.name} ({d.bn_name})</option>
        ))}
      </select>

      {/* 3. Upazila */}
      <select value={upazilaId} onChange={(e) => setUpazilaId(e.target.value)} disabled={!districtId}>
        <option value="">Select Upazila</option>
        {upazilas.map((u) => (
          <option key={u.id} value={u.id}>{u.name} ({u.bn_name})</option>
        ))}
      </select>
    </div>
  );
}`}
                  </pre>
                </div>
              </section>

              {/* 6. Licenses & Attribution */}
              <section id="license" className="scroll-mt-32 space-y-4 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xl font-bold font-exo-medium text-zinc-900 dark:text-white flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500" />
                  <span>{lang === 'en' ? '6. Licenses & Attribution' : '৬. লাইসেন্স ও শর্তাবলী'}</span>
                </h2>

                <div className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight space-y-2.5 leading-relaxed">
                  <p>
                    • <strong>{lang === 'en' ? 'Code & Library:' : 'কোড ও লাইব্রেরি:'}</strong> MIT License. {lang === 'en' ? 'Free for commercial and personal apps.' : 'যেকোনো কমার্শিয়াল ও পার্সোনাল প্রজেক্টে সম্পূর্ণ ফ্রি।'}
                  </p>
                  <p>
                    • <strong>{lang === 'en' ? 'Boundary Data:' : 'বাউন্ডারি ডেটা:'}</strong> CC BY 4.0, sourced from geoBoundaries (gbOpen, ADM3). Underlying source: Bangladesh Bureau of Statistics (BBS).
                  </p>
                  <p>
                    • <strong>{lang === 'en' ? 'OSM-derived layers (Bazars & Routes):' : 'ওএসএম লেয়ার (বাজার ও রুটস):'}</strong> Open Database License (ODbL 1.0). Attribution: <em>&copy; OpenStreetMap contributors &mdash; odbl-1.0</em>.
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* Contributing Guide Tab */
            <div className="space-y-10">
              <section id="contrib-reference" className="space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {lang === 'en' ? '1. Reference Data Rules' : '১. রেফারেন্স ডেটা নীতিমালা'}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {lang === 'en'
                    ? 'Pull requests and issue reports are welcome. To update administrative data, edit JSON files in src/data/:'
                    : 'যেকোনো পিআর (Pull Request) বা ইস্যু স্বাগতম। প্রশাসনিক ডেটা এডিট করার নিয়ম:'}
                </p>

                <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 space-y-2 font-exo-extralight">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {lang === 'en' ? 'Rules for adding or editing records:' : 'নতুন রেকর্ড যুক্ত বা সংশোধনের নিয়ম:'}
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-1">
                    <li>{lang === 'en' ? 'Must have a unique numeric ID.' : 'অবশ্যই ইউনিক স্ট্রিং আইডি থাকতে হবে।'}</li>
                    <li>{lang === 'en' ? 'Both English name and accurate Bangla bn_name are mandatory.' : 'ইংরেজি নাম ও নির্ভুল বাংলা bn_name উভয়ই বাধ্যতামূলক।'}</li>
                    <li>{lang === 'en' ? 'Valid parent references (division_id, district_id).' : 'সঠিক প্যারেন্ট রেফারেন্স থাকতে হবে (যেমন division_id, district_id)।'}</li>
                    <li>{lang === 'en' ? 'Coordinates must fall within Bangladesh bounds (lat 20.5–26.7, long 88.0–92.8).' : 'স্থানাঙ্ক অবশ্যই বাংলাদেশের সীমানার ভেতর হতে হবে (Lat: ২০.৫–২৬.৭, Long: ৮৮.০–৯২.৮)।'}</li>
                  </ul>
                </div>
              </section>

              <section id="contrib-osm" className="space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {lang === 'en' ? '2. Bazars & Routes (OpenStreetMap)' : '২. বাজার ও হাইওয়ে (OpenStreetMap)'}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {lang === 'en'
                    ? 'Bazars and highways are extracted directly from OpenStreetMap. Fixes should be made directly upstream at openstreetmap.org so all open mapping projects benefit.'
                    : 'বাজার ও মহাসড়কের ডেটা সরাসরি ওপেনস্ট্রিটম্যাপ থেকে সংগৃহীত। কোনো বাজারে ত্রুটি থাকলে সরাসরি OpenStreetMap-এ এডিট করুন অথবা গিটহাবে ইস্যু ওপেন করুন।'}
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 text-zinc-300 font-mono text-xs border border-zinc-800 space-y-2">
                  <div className="text-emerald-400 font-semibold">{lang === 'en' ? 'How to fix an OSM record:' : 'কীভাবে ওএসএম এডিট করবেন:'}</div>
                  <p className="text-zinc-400">
                    1. Go to openstreetmap.org &rarr; click Edit &rarr; select node &rarr; update tags &rarr; save.
                  </p>
                </div>
              </section>

              <section id="contrib-validate" className="space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {lang === 'en' ? '3. Data Validation Script' : '৩. ডেটা ভ্যালিডেশন স্ক্রিপ্ট'}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {lang === 'en'
                    ? 'Before submitting a pull request, run the automated integrity validation script:'
                    : 'পিআর সাবমিট করার আগে স্বয়ংক্রিয় ইন্টিগ্রিটি টেস্ট স্ক্রিপ্ট রান করুন:'}
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 text-white font-mono text-xs flex items-center justify-between border border-zinc-800">
                  <span className="text-emerald-400">node scripts/validate-data.js</span>
                  <button
                    type="button"
                    onClick={() => copyCode('node scripts/validate-data.js', 'validate')}
                    className="p-1.5 text-zinc-400 hover:text-emerald-400 cursor-pointer"
                  >
                    {copiedId === 'validate' ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                  </button>
                </div>
              </section>

              <section id="contrib-rebuild" className="space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {lang === 'en' ? '4. Rebuilding Datasets' : '৪. ডেটাসেট রিবিল্ড করা'}
                </h2>
                <div className="p-4 rounded-2xl bg-zinc-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-zinc-800">
                  <pre>
{`node scripts/build-boundary.js     # Upazila polygons
node scripts/build-poi.js bazars   # Bazars from OpenStreetMap
node scripts/build-poi.js routes   # Major highways
node scripts/build-poi.js all      # Both`}
                  </pre>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
