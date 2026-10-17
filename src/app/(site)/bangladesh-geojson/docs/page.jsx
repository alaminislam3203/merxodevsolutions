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
    descAr: 'يُرجع جميع الأقسام الإدارية الثمانية في بنغلاديش مع المعرفات، الأسماء ثنائية اللغة، والمراكز الجغرافية.',
    descZh: '返回孟加拉国所有 8 个行政专区的数据，包括唯一 ID、英孟双语名称及地理中心坐标。',
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
    descAr: 'البحث عن قسم إداري محدد عبر معرفه الرقمي (من 1 إلى 8).',
    descZh: '通过数字字符串 ID（1 到 8）查找特定的行政专区。',
    snippet: `const dhaka = bd.getDivisionById('3');
console.log(dhaka.bn_name); // 'ঢাকা'`,
  },
  {
    fn: 'getDistricts()',
    returns: 'District[]',
    descEn: 'Returns all 64 districts mapped to division IDs with geographic coordinates.',
    descBn: 'বিভাগ আইডির সাথে লিংক করা ৬৪টি জেলার তালিকা ও ভৌগোলিক সেন্টার প্রদান করে।',
    descAr: 'يُرجع جميع المقاطعات الـ 64 مرتبطة بمعرفات الأقسام التابعة لها مع الإحداثيات الجغرافية.',
    descZh: '返回所有 64 个县/区的数据，关联所属专区 ID 并包含地理经纬度坐标。',
    snippet: `const allDistricts = bd.getDistricts();`,
  },
  {
    fn: 'getDistrictsByDivision(divisionId)',
    returns: 'District[]',
    descEn: 'Returns all districts within a specified division ID.',
    descBn: 'নির্দিষ্ট কোনো বিভাগের অন্তর্ভুক্ত সকল জেলার তালিকা রিটার্ন করে।',
    descAr: 'يُرجع جميع المقاطعات الواقعة ضمن معرف قسم إداري محدد.',
    descZh: '返回指定专区 ID 下辖的所有县/区列表。',
    snippet: `// All districts in Rangpur Division (id: '7')
const rangpurDistricts = bd.getDistrictsByDivision('7');`,
  },
  {
    fn: 'getUpazilas()',
    returns: 'Upazila[]',
    descEn: 'Returns all 494+ upazilas across Bangladesh mapped to districts.',
    descBn: 'জেলা আইডির সাথে ম্যাপ করা বাংলাদেশের ৪৯৪+ উপজেলার সম্পূর্ণ তালিকা।',
    descAr: 'يُرجع أكثر من 494 مركزاً إدارياً (أوبازيلا) عبر بنغلاديش مرتبطة بالمقاطعات.',
    descZh: '返回孟加拉国全部 494+ 个次区（Upazila），均已关联所属县/区。',
    snippet: `const allUpazilas = bd.getUpazilas();`,
  },
  {
    fn: 'getUpazilasByDistrict(districtId)',
    returns: 'Upazila[]',
    descEn: 'Returns all upazilas inside a target district ID.',
    descBn: 'নির্দিষ্ট জেলার অন্তর্গত সকল উপজেলা/থানা রিটার্ন করে।',
    descAr: 'يُرجع جميع المراكز الإدارية (الأوبازيلا) التابعة لمعرف مقاطعة محددة.',
    descZh: '返回指定县/区 ID 内包含的所有次区/乡级行政区。',
    snippet: `// Upazilas in Bogura (districtId: '3')
const upazilas = bd.getUpazilasByDistrict('3');`,
  },
  {
    fn: 'getPostcodes()',
    returns: 'Postcode[]',
    descEn: 'Returns all 1,349+ post office entries with 4-digit post codes.',
    descBn: 'বাংলাদেশের ১,৩৪৯+ পোস্ট অফিস ও ৪ ডিজিটের পোস্টাল কোডের তালিকা।',
    descAr: 'يُرجع أكثر من 1349 مكتب بريد مع الرموز البريدية المكونة من 4 أرقام.',
    descZh: '返回所有 1,349+ 条邮政网点数据，包含 4 位数字邮政编码。',
    snippet: `const postcodes = bd.getPostcodes();`,
  },
  {
    fn: 'getPostcodesByDistrict(districtId)',
    returns: 'Postcode[]',
    descEn: 'Returns all post offices and postal codes belonging to a specific district.',
    descBn: 'নির্দিষ্ট জেলার আওতাধীন সকল ডাকঘর ও পোস্টকোড রিটার্ন করে।',
    descAr: 'يُرجع جميع مكاتب البريد والرموز البريدية التابعة لمقاطعة محددة.',
    descZh: '返回归属于特定县/区的所有邮局和邮政编码。',
    snippet: `const dhakaPostcodes = bd.getPostcodesByDistrict('1');`,
  },
  {
    fn: 'search(query, limit?)',
    returns: 'SearchHit[]',
    descEn: 'Deep bilingual search across division names, district names, upazila names, and postcodes in English or বাংলা.',
    descBn: 'ইংরেজি বা বাংলা যেকোনো শব্দ দিয়ে বিভাগ, জেলা, উপজেলা এবং পোস্টকোড তাৎক্ষণিক অনুসন্ধান।',
    descAr: 'بحث جغرافي عميق ثنائي اللغة في أسماء الأقسام، المقاطعات، المراكز، والرموز البريدية بالإنجليزية أو البنغالية.',
    descZh: '支持输入英文或孟加拉语，对专区、县区、次区地名及邮政编码进行深度即时检索。',
    snippet: `const matches = bd.search('Mirpur');
// or Bangla search:
const banglaMatches = bd.search('কুড়িগ্রাম');`,
  },
  {
    fn: 'getFullHierarchy()',
    returns: 'HierarchyDivision[]',
    descEn: 'Returns a nested tree where each division contains its districts, and each district contains its upazilas.',
    descBn: 'সম্পূর্ণ নেস্টেড ট্রি রিটার্ন করে (বিভাগ → জেলা → উপজেলা)।',
    descAr: 'يُرجع شجرة متداخلة متكاملة (الأقسام ← المقاطعات ← المراكز الإدارية).',
    descZh: '返回完整的层级树形结构（专区 → 县区 → 次区）。',
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
    { labelEn: '1. Getting Started', labelBn: '১. শুরু করার নিয়ম', labelAr: '1. البدء السريع', labelZh: '1. 快速入门', href: '#getting-started' },
    { labelEn: '2. Data Models (TypeScript)', labelBn: '২. ডেটা মডেলস (টাইপস্ক্রিপ্ট)', labelAr: '2. نماذج البيانات (TypeScript)', labelZh: '2. 数据模型 (TypeScript)', href: '#data-models' },
    { labelEn: '3. Core API Functions', labelBn: '৩. কোর API ফাংশনসমূহ', labelAr: '3. دوال واجهة البرمجة الأساسية', labelZh: '3. 核心 API 方法', href: '#api-functions' },
    { labelEn: '4. Direct Subpath Imports', labelBn: '৪. সাবপাথ ইমপোর্টস', labelAr: '4. استيراد المسارات الفرعية', labelZh: '4. 模块子路径导入', href: '#raw-json' },
    { labelEn: '5. React Cascade Component', labelBn: '৫. রিঅ্যাক্ট ক্যাসকেড উদাহরণ', labelAr: '5. مكون القائمة المتتالية في React', labelZh: '5. React 级联选择器示例', href: '#react-example' },
    { labelEn: '6. Licenses & Attribution', labelBn: '৬. লাইসেন্স ও শর্তাবলী', labelAr: '6. التراخيص وحقوق الاستخدام', labelZh: '6. 开源许可与版权声明', href: '#license' },
  ] : [
    { labelEn: '1. Reference Data Rules', labelBn: '১. রেফারেন্স ডেটা নীতিমালা', labelAr: '1. قواعد البيانات المرجعية', labelZh: '1. 参考数据规范', href: '#contrib-reference' },
    { labelEn: '2. Bazars & Routes (OSM)', labelBn: '২. বাজার ও হাইওয়ে (ওএসএম)', labelAr: '2. الأسواق والطرق السريعة (OSM)', labelZh: '2. 集市与交通路线 (OSM)', href: '#contrib-osm' },
    { labelEn: '3. Data Validation Script', labelBn: '৩. ডেটা ভ্যালিডেশন স্ক্রিপ্ট', labelAr: '3. سكربت التحقق من البيانات', labelZh: '3. 数据完整性验证脚本', href: '#contrib-validate' },
    { labelEn: '4. Rebuilding Datasets', labelBn: '৪. ডেটাসেট রিবিল্ড করা', labelAr: '4. إعادة بناء مجموعات البيانات', labelZh: '4. 重新构建数据集', href: '#contrib-rebuild' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-exo-medium text-zinc-900 dark:text-white">
            {t('Documentation & API Guide', 'ডকুমেন্টেশন ও API নির্দেশিকা', 'التوثيق ودليل واجهة البرمجة (API)', '开发文档与 API 参考指南')}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 font-exo-extralight">
            {t(
              'Complete reference for installation, helper methods, GeoJSON boundaries, and contributing.',
              'ইনস্টলেশন, হেল্পার মেথড, জিওজেসন বাউন্ডারি এবং প্রজেক্টে অবদান রাখার সম্পূর্ণ গাইড।',
              'مرجع شامل للتثبيت والدوال المساعدة وحدود GeoJSON وإرشادات المساهمة.',
              '包含完整的安装指南、辅助函数、GeoJSON 边界数据以及开源贡献规范。'
            )}
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
            {t('Usage Guide', 'ব্যবহারবিধি', 'دليل الاستخدام', '使用指南')}
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
            {t('Contributing', 'অবদান', 'المساهمة في المشروع', '参与贡献')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-4 p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs">
          <div className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
            <FiBookOpen className="text-emerald-500" />
            <span>{t('On this page', 'এই পেজে', 'في هذه الصفحة', '本页目录')}</span>
          </div>

          <nav className="space-y-1.5 font-exo">
            {tocLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="block py-1.5 px-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 transition-colors font-medium"
              >
                {t(link.labelEn, link.labelBn, link.labelAr, link.labelZh)}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/bangladesh-geojson/demo"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-center transition-colors text-xs shadow-md shadow-emerald-600/20"
            >
              <span>{t('Open Live Demo', 'লাইভ ডেমো দেখুন', 'فتح العرض المباشر', '查看在线演示')}</span>
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
                  <span>{t('1. Getting Started', '১. শুরু করার নিয়ম', '1. البدء السريع', '1. 快速入门')}</span>
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {t(
                    'The bangladesh-geojson library is zero-dependency, works seamlessly in Node.js, Next.js, Vite, and React, and ships with complete TypeScript type definitions. The data lives inside the package — no internet needed once installed.',
                    'bangladesh-geojson সম্পূর্ণ জিরো-ডিপেন্ডেন্সি প্যাকেজ, যা Node.js, Next.js, Vite এবং React-এ সরাসরি কাজ করে। সম্পূর্ণ ডেটা প্যাকেজের ভেতরেই অন্তর্ভুক্ত থাকায় ইনস্টলের পর কোনো ইন্টারনেট সংযোগের প্রয়োজন নেই।',
                    'حزمة bangladesh-geojson خالية تماماً من التبعيات، وتعمل بسلاسة في Node.js و Next.js و Vite و React مع توفير تعريفات TypeScript كاملة. توجد البيانات بالكامل داخل الحزمة — دون الحاجة لاتصال بالإنترنت بمجرد التثبيت.',
                    'bangladesh-geojson 是一个零外部依赖的库，可在 Node.js、Next.js、Vite 和 React 中无缝运行，并自带完整的 TypeScript 类型声明。所有数据均打包于本地，安装后无需联网即可使用。'
                  )}
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
                  {t('2. Data Models (TypeScript Interfaces)', '২. ডেটা মডেলস (TypeScript টাইপসমূহ)', '2. نماذج البيانات (واجهات TypeScript)', '2. 数据模型 (TypeScript 接口)')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {t(
                    'All records include both English and Bengali names along with geographic centers where applicable.',
                    'প্রতিটি রেকর্ডে ইংরেজি এবং বাংলা নাম ছাড়াও প্রযোজ্য ক্ষেত্রে সেন্ট্রাল অক্ষাংশ ও দ্রাঘিমাংশ যুক্ত রয়েছে।',
                    'تتضمن جميع السجلات أسماء باللغتين الإنجليزية والبنغالية إلى جانب المراكز الجغرافية عند الاقتضاء.',
                    '所有记录均包含英文与孟加拉语双语名称，并在适当时提供地理中心经纬度坐标。'
                  )}
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
                    {t('3. Core API Functions', '৩. কোর API মেথডসমূহ', '3. دوال واجهة البرمجة الأساسية', '3. 核心 API 方法')}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight mt-1">
                    {t(
                      'Convenient helper methods exported by the root package.',
                      'রুট প্যাকেজ থেকে এক্সপোর্ট করা সুবিধাজনক হেল্পার মেথডসমূহ।',
                      'دوال مساعدة ملائمة يتم تصديرها من حزمة الجذر مباشرة.',
                      '由根包直接导出的高频实用辅助函数。'
                    )}
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
                          <span>{t('Copy', 'কপি', 'نسخ', '复制')}</span>
                        </button>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight">
                        {t(method.descEn, method.descBn, method.descAr, method.descZh)}
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
                  {t('4. Direct Subpath Imports', '৪. সরাসরি সাবপাথ ইমপোর্টস', '4. استيراد المسارات الفرعية مباشرة', '4. 模块子路径按需导入')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {t(
                    'Each dataset has its own subpath export, so your bundler (Webpack / Turbopack / Vite) only bundles what you import:',
                    'প্রতিটি ডেটাসেটের নিজস্ব সাবপাথ রয়েছে, ফলে বান্ডলারে কেবল প্রয়োজনীয় ফাইলটিই যুক্ত হবে:',
                    'تمتلك كل مجموعة بيانات تصديراً فرعياً مستقلاً، بحيث يقوم مجمّع الحزم (Webpack / Turbopack / Vite) بتضمين ما تستورده فقط:',
                    '每个数据集都有其专有的子路径导出，因此打包器（Webpack / Turbopack / Vite）只会打包您实际导入的文件：'
                  )}
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
                  {t('5. React Address Cascading Example', '৫. রিঅ্যাক্ট অ্যাড্রেস ক্যাসকেড উদাহরণ', '5. مثال القائمة المتتالية في React', '5. React 级联地址选择器示例')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {t(
                    'Here is a drop-in pattern to implement a Division → District → Upazila cascade dropdown in React or Next.js:',
                    'React বা Next.js-এ সহজে বিভাগ → জেলা → উপজেলা ক্যাসকেড ড্রপডাউন বানানোর রেডিমেড কোড:',
                    'إليك نموذجاً جاهزاً لتطبيق قائمة منسدلة متتالية (القسم ← المقاطعة ← المركز) في React أو Next.js:',
                    '这是在 React 或 Next.js 中实现 省/专区 → 县区 → 次区 级联下拉菜单的现成示例：'
                  )}
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
                  <span>{t('6. Licenses & Attribution', '৬. লাইসেন্স ও শর্তাবলী', '6. التراخيص وحقوق الاستخدام', '6. 开源许可与版权声明')}</span>
                </h2>

                <div className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight space-y-2.5 leading-relaxed">
                  <p>
                    • <strong>{t('Code & Library:', 'কোড ও লাইব্রেরি:', 'الكود والمكتبة:', '代码与库：')}</strong> MIT License. {t('Free for commercial and personal apps.', 'যেকোনো কমার্শিয়াল ও পার্সোনাল প্রজেক্টে সম্পূর্ণ ফ্রি।', 'مجاني تماماً للتطبيقات التجارية والشخصية.', '免费用于商业和个人应用。')}
                  </p>
                  <p>
                    • <strong>{t('Boundary Data:', 'বাউন্ডারি ডেটা:', 'بيانات الحدود:', '边界数据：')}</strong> CC BY 4.0, sourced from geoBoundaries (gbOpen, ADM3). Underlying source: Bangladesh Bureau of Statistics (BBS).
                  </p>
                  <p>
                    • <strong>{t('OSM-derived layers (Bazars & Routes):', 'ওএসএম লেয়ার (বাজার ও রুটস):', 'طبقات مستمدة من OSM (الأسواق والطرق):', '来自 OSM 的图层（集市与路线）：')}</strong> Open Database License (ODbL 1.0). Attribution: <em>&copy; OpenStreetMap contributors &mdash; odbl-1.0</em>.
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* Contributing Guide Tab */
            <div className="space-y-10">
              <section id="contrib-reference" className="space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {t('1. Reference Data Rules', '১. রেফারেন্স ডেটা নীতিমালা', '1. قواعد البيانات المرجعية', '1. 参考数据规范')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {t(
                    'Pull requests and issue reports are welcome. To update administrative data, edit JSON files in src/data/:',
                    'যেকোনো পিআর (Pull Request) বা ইস্যু স্বাগতম। প্রশাসনিক ডেটা এডিট করার নিয়ম:',
                    'نرحب بطلبات السحب (PRs) وتقارير المشاكل. لتحديث البيانات الإدارية، قم بتعديل ملفات JSON في src/data/:',
                    '欢迎提交 Pull Request 和 Issue。如需更新行政区划数据，请编辑 src/data/ 目录下的 JSON 文件：'
                  )}
                </p>

                <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 space-y-2 font-exo-extralight">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {t('Rules for adding or editing records:', 'নতুন রেকর্ড যুক্ত বা সংশোধনের নিয়ম:', 'قواعد إضافة السجلات أو تعديلها:', '新增或修改记录规范：')}
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-1">
                    <li>{t('Must have a unique numeric ID.', 'অবশ্যই ইউনিক স্ট্রিং আইডি থাকতে হবে।', 'يجب أن يحتوي على معرف رقمي فريد.', '必须具有唯一的数字或字符串 ID。')}</li>
                    <li>{t('Both English name and accurate Bangla bn_name are mandatory.', 'ইংরেজি নাম ও নির্ভুল বাংলা bn_name উভয়ই বাধ্যতামূলক।', 'كل من الاسم باللغة الإنجليزية والاسم البنغالي الدقيق bn_name إلزامي.', '英文字段 name 与准确的孟加拉语 bn_name 均为必填项。')}</li>
                    <li>{t('Valid parent references (division_id, district_id).', 'সঠিক প্যারেন্ট রেফারেন্স থাকতে হবে (যেমন division_id, district_id)।', 'مراجع أصلية صالحة (division_id، district_id).', '必须包含有效的一级归属关系（如 division_id、district_id）。')}</li>
                    <li>{t('Coordinates must fall within Bangladesh bounds (lat 20.5–26.7, long 88.0–92.8).', 'স্থানাঙ্ক অবশ্যই বাংলাদেশের সীমানার ভেতর হতে হবে (Lat: ২০.৫–২৬.৭, Long: ৮৮.০–৯২.৮)।', 'يجب أن تقع الإحداثيات داخل حدود بنغلاديش (خط عرض 20.5-26.7، خط طول 88.0-92.8).', '坐标必须严格落在孟加拉国国界范围内（纬度 20.5–26.7，经度 88.0–92.8）。')}</li>
                  </ul>
                </div>
              </section>

              <section id="contrib-osm" className="space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {t('2. Bazars & Routes (OpenStreetMap)', '২. বাজার ও হাইওয়ে (OpenStreetMap)', '2. الأسواق والطرق السريعة (OpenStreetMap)', '2. 集市与交通路线 (OpenStreetMap)')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {t(
                    'Bazars and highways are extracted directly from OpenStreetMap. Fixes should be made directly upstream at openstreetmap.org so all open mapping projects benefit.',
                    'বাজার ও মহাসড়কের ডেটা সরাসরি ওপেনস্ট্রিটম্যাপ থেকে সংগৃহীত। কোনো বাজারে ত্রুটি থাকলে সরাসরি OpenStreetMap-এ এডিট করুন অথবা গিটহাবে ইস্যু ওপেন করুন।',
                    'يتم استخراج بيانات الأسواق والطرق السريعة مباشرة من OpenStreetMap. يوصى بإجراء التصحيحات في المصدر على openstreetmap.org لتستفيد كافة مشاريع الخرائط الحرة.',
                    '集市与主要公路数据直接提取自 OpenStreetMap。如需修复，建议直接在 openstreetmap.org 上游编辑，以便所有开源地图项目共同受益。'
                  )}
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 text-zinc-300 font-mono text-xs border border-zinc-800 space-y-2">
                  <div className="text-emerald-400 font-semibold">{t('How to fix an OSM record:', 'কীভাবে ওএসএম এডিট করবেন:', 'كيفية تعديل سجل في OSM:', '如何修改 OSM 记录：')}</div>
                  <p className="text-zinc-400">
                    1. Go to openstreetmap.org &rarr; click Edit &rarr; select node &rarr; update tags &rarr; save.
                  </p>
                </div>
              </section>

              <section id="contrib-validate" className="space-y-4">
                <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
                  {t('3. Data Validation Script', '৩. ডেটা ভ্যালিডেশন স্ক্রিপ্ট', '3. سكربت التحقق من تكامل البيانات', '3. 数据完整性验证脚本')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                  {t(
                    'Before submitting a pull request, run the automated integrity validation script:',
                    'পিআর সাবমিট করার আগে স্বয়ংক্রিয় ইন্টিগ্রিটি টেস্ট স্ক্রিপ্ট রান করুন:',
                    'قبل تقديم طلب سحب (Pull Request)، يرجى تشغيل سكربت التحقق الآلي من سلامة البيانات:',
                    '在提交 Pull Request 之前，请运行自动化数据完整性验证脚本：'
                  )}
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
                  {t('4. Rebuilding Datasets', '৪. ডেটাসেট রিবিল্ড করা', '4. إعادة بناء وتحديث مجموعات البيانات', '4. 重新构建数据集')}
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
