'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

// Comprehensive dictionary for Bangladesh GeoJSON pages across Arabic & Chinese
export const GEO_TRANSLATIONS = {
  ar: {
    // Nav & Breadcrumbs
    'Home': 'الرئيسية',
    'Tools': 'الأدوات',
    'Overview': 'نظرة عامة',
    'Interactive Demo': 'عرض تفاعلي وخريطة',
    'Documentation': 'التوثيق',
    'Live Map': 'خريطة حية',
    'API & Guide': 'API ودليل',
    'Bangladesh GeoJSON': 'بيانات بنغلاديش الجغرافية (GeoJSON)',
    'Bangladesh Open Source': 'مشروع بنغلاديش مفتوح المصدر',
    'Bangladesh GeoJSON & Data Suite': 'حزمة بيانات وخرائط بنغلاديش الجغرافية (GeoJSON)',
    'Open-source geographic data for Bangladesh — 8 divisions, 64 districts, 494+ upazilas, 1,349+ postcodes, and boundary GeoJSON. Free, accurate & developer-ready.':
      'بيانات جغرافية مفتوحة المصدر لبنغلاديش — 8 أقسام، 64 مقاطعة، أكثر من 494 مركزاً/أوبازيلا، أكثر من 1349 رمزاً بريدياً وحدود جغرافية دقيقة. مجانية وجاهزة للمطورين.',
    'Navigation Menu': 'قائمة التنقل',

    // Stats
    'Divisions': 'الأقسام الإدارية',
    '8': '8',
    'Full administrative divisions with Geo lat/long': 'أقسام إدارية كاملة مع إحداثيات الطول والعرض الجغرافية',
    'Districts': 'المقاطعات',
    '64': '64',
    'All 64 districts with bilingual names and centers': 'جميع المقاطعات الـ 64 بأسماء ثنائية ومراكز جغرافية',
    'Upazilas': 'المراكز (أوبازيلا)',
    '494+': '+494',
    'Mapped to respective parent districts': 'مرتبطة بكل مقاطعة رئيسية تابعة لها',
    'Postcodes': 'الرموز البريدية',
    '1,349+': '+1,349',
    'Post offices, upazilas and postal codes': 'مكاتب البريد، المراكز والرموز البريدية في بنغلاديش',

    // Search Demo
    'Live Search Demo': 'تجربة البحث المباشر',
    'Instant Bilingual Geographic Lookup': 'بحث جغرافي فوري متعدد اللغات',
    'Search divisions, districts, upazilas, and post codes in English or বাংলা.':
      'ابحث في الأقسام، المقاطعات، المراكز، والرموز البريدية باللغة الإنجليزية أو البنغالية.',
    "Try typing 'Rangpur', 'সিলেট', 'Mirpur', or '1212'...":
      "جرب كتابة 'Rangpur' أو 'সিলেট' أو 'Mirpur' أو '1212'...",
    'Clear': 'مسح',
    'Quick tests:': 'أمثلة سريعة:',
    'Code copied to clipboard!': 'تم نسخ الكود إلى الحافظة!',
    'Snippet copied to clipboard!': 'تم نسخ النموذج إلى الحافظة!',
    'Division': 'القسم الإداري',
    'District': 'المقاطعة',
    'Upazila': 'المركز (أوبازيلا)',
    'Postcode': 'الرمز البريدي',
    'Dhaka Metro': 'مترو دكا',

    // Datasets
    'Included Datasets & JSON Bundles': 'مجموعات البيانات وحزم JSON المضمنة',
    'Zero API Dependencies • Pure Tree-Shakeable JSON & GeoJSON': 'بدون أي تبعيات لواجهات خارجية • ملفات JSON و GeoJSON نقية',
    'Download Full Dataset (ZIP)': 'تحميل المجموعة الكاملة (ZIP)',
    'Copy Import': 'نسخ الاستيراد',
    'Copied': 'تم النسخ',

    // Quick Start
    'Quick Start Guide': 'دليل البدء السريع',
    'Install in 5 seconds and import any geographic entity into React, Next.js, Vue, or Node.js':
      'التثبيت خلال 5 ثوانٍ والاستيراد في مشاريع React أو Next.js أو Vue أو Node.js',
    'Step 1: Install Package': 'الخطوة 1: تثبيت الحزمة',
    'Step 2: Choose Your Usage Pattern': 'الخطوة 2: اختر طريقة الاستخدام',
    'Helper Functions': 'دوال المساعدة البرمجية',
    'Raw Subpath Imports': 'استيراد المسار المباشر',
    'Leaflet / MapLibre': 'خرائط Leaflet / MapLibre',
    'Copy Code': 'نسخ الكود',
    'Explore Interactive Demo': 'تجربة الخريطة التفاعلية',
    'Read Full Documentation': 'قراءة التوثيق الكامل',

    // Why Choose
    'Why Developers Love bangladesh-geojson': 'لماذا يفضل المطورون حزمة bangladesh-geojson',
    'Built for speed, accuracy, and developer convenience': 'مصممة من أجل السرعة والدقة والسهولة للمطورين',
    'Bilingual by Default': 'ثنائية اللغة افتراضياً',
    'Every single division, district, and upazila includes both official English and বাংলা spellings.':
      'كل قسم ومقاطعة ومركز يتضمن التهجئة الرسمية باللغتين الإنجليزية والبنغالية.',
    'Lightweight & Fast': 'خفيفة وسريعة للغاية',
    'Individual JSON subpaths let you import only what you need, saving bundle size.':
      'تتيح لك مسارات الاستيراد المنفصلة تضمين ما تحتاجه فقط لتوفير حجم الحزمة.',
    'Validated Geometries': 'إحداثيات وهندسة معتمدة ومحققة',
    'GeoJSON boundaries are verified against BBS & Survey of Bangladesh coordinates.':
      'حدود GeoJSON محققة ومطابقة لإحداثيات هيئة الإحصاء والمساحة في بنغلاديش.',
    'TypeScript Friendly': 'دعم كامل لـ TypeScript',
    'Includes rich types for Division, District, Upazila, Postcode, and FeatureCollection.':
      'تتضمن أنواعاً برمجية كاملة لكل من Division و District و Upazila و Postcode و GeoJSON.',

    // Docs Page
    'Documentation & API Reference': 'التوثيق ومرجع واجهة البرمجة (API)',
    'Comprehensive guide to installing, querying, and rendering Bangladesh geographic boundaries and dataset in modern JavaScript and TypeScript applications.':
      'دليل شامل لتثبيت واستعلام وعرض الحدود الجغرافية ومجموعات بيانات بنغلاديش في تطبيقات JavaScript و TypeScript الحديثة.',
    'Package Usage': 'استخدام الحزمة',
    'Contributing & Sources': 'المساهمة ومصادر البيانات',
    'Contributing & Data Sources': 'المساهمة ومصادر البيانات',
    'Table of Contents': 'جدول المحتويات',
    '1. Getting Started': '1. البدء السريع',
    '2. Data Models (TypeScript)': '2. نماذج البيانات (TypeScript)',
    '3. Core API Functions': '3. دوال الـ API الأساسية',
    '4. Direct Subpath Imports': '4. الاستيراد المباشر للمسارات',
    '5. Map Integration Examples': '5. أمثلة تكامل الخرائط',
    '1. Contributing Guidelines': '1. إرشادات المساهمة',
    '2. Upazila Boundaries & BBS Codes': '2. الحدود ورموز BBS',
    '3. Quality Assurance & Validation': '3. ضمان الجودة والتحقق',
    '4. License & MIT Notice': '4. الترخيص وإشعار MIT',

    // Demo Page
    'play with the data': 'استكشف وتفاعل مع البيانات',
    'type a place, pick from the dropdowns, or click anywhere on the map.':
      'اكتب اسم مكان، أو اختر من القوائم المنسدلة، أو انقر في أي مكان على الخريطة.',
    "type a place — try 'sylhet' or 'ঢাকা'": "اكتب اسم مكان — جرب 'sylhet' أو 'ঢাকা'",
    'All Divisions': 'جميع الأقسام',
    'All Districts': 'جميع المقاطعات',
    'All Upazilas': 'جميع المراكز',
    'click a place on the map, or pick one from the dropdowns. its details show up here.':
      'انقر على مكان في الخريطة أو اختر من القوائم المنسدلة لعرض تفاصيله هنا.',
    'copy json': 'نسخ JSON',
    'copied': 'تم النسخ',
    'made by ': 'تم التطوير بواسطة ',
    'map tiles by openfreemap': 'بلاطات الخريطة بواسطة OpenFreeMap',
  },

  zh: {
    // Nav & Breadcrumbs
    'Home': '首页',
    'Tools': '工具箱',
    'Overview': '概览',
    'Interactive Demo': '交互式演示与地图',
    'Documentation': '文档指南',
    'Live Map': '实时地图',
    'API & Guide': 'API 与开发指南',
    'Bangladesh GeoJSON': '孟加拉国 GeoJSON 地理数据',
    'Bangladesh Open Source': '孟加拉国开源生态项目',
    'Bangladesh GeoJSON & Data Suite': '孟加拉国 GeoJSON 与全套地理数据套件',
    'Open-source geographic data for Bangladesh — 8 divisions, 64 districts, 494+ upazilas, 1,349+ postcodes, and boundary GeoJSON. Free, accurate & developer-ready.':
      '孟加拉国完整开源地理数据 — 包含 8 个专区、64 个地区、494+ 个次区/乡镇、1,349+ 个邮编及精准 GeoJSON 边界数据。完全免费、高精度且即开即用。',
    'Navigation Menu': '导航菜单',

    // Stats
    'Divisions': '行政专区',
    '8': '8',
    'Full administrative divisions with Geo lat/long': '包含中心经纬度的完整 8 个行政专区',
    'Districts': '地区 / 县',
    '64': '64',
    'All 64 districts with bilingual names and centers': '全部 64 个地区，包含双语名称及地理中心',
    'Upazilas': '次区 / 乡镇',
    '494+': '494+',
    'Mapped to respective parent districts': '已映射至对应所属地区的所有次区',
    'Postcodes': '邮政编码',
    '1,349+': '1,349+',
    'Post offices, upazilas and postal codes': '孟加拉国邮局、次区及所有邮政编码',

    // Search Demo
    'Live Search Demo': '实时搜索演示',
    'Instant Bilingual Geographic Lookup': '即时多语言地理信息检索',
    'Search divisions, districts, upazilas, and post codes in English or বাংলা.':
      '使用英文或孟加拉语搜索专区、地区、次区及邮政编码。',
    "Try typing 'Rangpur', 'সিলেট', 'Mirpur', or '1212'...":
      "输入 'Rangpur'、'সিলেট'、'Mirpur' 或 '1212'...",
    'Clear': '清除',
    'Quick tests:': '快速测试：',
    'Code copied to clipboard!': '代码已复制到剪贴板！',
    'Snippet copied to clipboard!': '代码片段已复制到剪贴板！',
    'Division': '专区',
    'District': '地区',
    'Upazila': '次区 (Upazila)',
    'Postcode': '邮编',
    'Dhaka Metro': '达卡大都会',

    // Datasets
    'Included Datasets & JSON Bundles': '包含的数据集与 JSON 数据包',
    'Zero API Dependencies • Pure Tree-Shakeable JSON & GeoJSON': '零外部 API 依赖 • 纯净且支持 Tree-Shaking 的 JSON 与 GeoJSON',
    'Download Full Dataset (ZIP)': '下载完整数据集 (ZIP)',
    'Copy Import': '复制代码',
    'Copied': '已复制',

    // Quick Start
    'Quick Start Guide': '快速上手指南',
    'Install in 5 seconds and import any geographic entity into React, Next.js, Vue, or Node.js':
      '5 秒极速安装，无缝导入 React、Next.js、Vue 或 Node.js 项目',
    'Step 1: Install Package': '步骤 1：安装 npm 包',
    'Step 2: Choose Your Usage Pattern': '步骤 2：选择集成方式',
    'Helper Functions': '核心工具函数',
    'Raw Subpath Imports': '直接路径导入',
    'Leaflet / MapLibre': 'Leaflet / MapLibre 地图渲染',
    'Copy Code': '复制代码',
    'Explore Interactive Demo': '探索交互式演示',
    'Read Full Documentation': '查看完整开发文档',

    // Why Choose
    'Why Developers Love bangladesh-geojson': '为什么开发者青睐 bangladesh-geojson',
    'Built for speed, accuracy, and developer convenience': '专为高精度、高性能与极简开发体验打造',
    'Bilingual by Default': '原生双语支持',
    'Every single division, district, and upazila includes both official English and বাংলা spellings.':
      '每个专区、地区与次区均包含官方英文及孟加拉语双语名称。',
    'Lightweight & Fast': '轻量且高效',
    'Individual JSON subpaths let you import only what you need, saving bundle size.':
      '支持按需导入独立子路径，大幅优化打包体积。',
    'Validated Geometries': '经过校验的地理几何数据',
    'GeoJSON boundaries are verified against BBS & Survey of Bangladesh coordinates.':
      '所有 GeoJSON 边界数据均已对照孟加拉国测绘局官方数据严格验证。',
    'TypeScript Friendly': '完备的 TypeScript 类型',
    'Includes rich types for Division, District, Upazila, Postcode, and FeatureCollection.':
      '提供完善的 Division、District、Upazila、Postcode 以及 FeatureCollection 类型定义。',

    // Docs Page
    'Documentation & API Reference': '开发文档与 API 参考手册',
    'Comprehensive guide to installing, querying, and rendering Bangladesh geographic boundaries and dataset in modern JavaScript and TypeScript applications.':
      '在现代 JavaScript 和 TypeScript 应用程序中安装、查询与渲染孟加拉国地理边界与数据集的完整开发指南。',
    'Package Usage': '使用指南',
    'Contributing & Sources': '参与贡献与数据源',
    'Contributing & Data Sources': '参与贡献与数据源',
    'Table of Contents': '目录',
    '1. Getting Started': '1. 快速上手',
    '2. Data Models (TypeScript)': '2. 数据模型 (TypeScript)',
    '3. Core API Functions': '3. 核心 API 方法',
    '4. Direct Subpath Imports': '4. 模块子路径导入',
    '5. Map Integration Examples': '5. 地图库集成示例',
    '1. Contributing Guidelines': '1. 贡献指南',
    '2. Upazila Boundaries & BBS Codes': '2. 边界与 BBS 编码',
    '3. Quality Assurance & Validation': '3. 质量验证与保障',
    '4. License & MIT Notice': '4. 开源许可与版权声明',

    // Demo Page
    'play with the data': '探索与交互数据',
    'type a place, pick from the dropdowns, or click anywhere on the map.':
      '输入地点名称、从下拉菜单中选择，或在地图上任意点击探索。',
    "type a place — try 'sylhet' or 'ঢাকা'": "输入地点 — 例如 'sylhet' 或 'ঢাকা'",
    'All Divisions': '全部专区',
    'All Districts': '全部地区',
    'All Upazilas': '全部次区',
    'click a place on the map, or pick one from the dropdowns. its details show up here.':
      '点击地图上的任意地点，或从下拉菜单中选择，详细信息将显示在此处。',
    'copy json': '复制 JSON',
    'copied': '已复制',
    'made by ': '由 ',
    'map tiles by openfreemap': '地图底图由 OpenFreeMap 提供',
  },
};

const BangladeshGeoLangContext = createContext({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (en, bn, ar, zh) => en,
});

export function BangladeshGeoLangProvider({ children }) {
  const { t: i18nT, i18n } = useTranslation();

  const getNormalizedLang = (lng) => {
    const code = (lng || 'en').toLowerCase();
    if (code.startsWith('bn')) return 'bn';
    if (code.startsWith('ar')) return 'ar';
    if (code.startsWith('zh')) return 'zh';
    return 'en';
  };

  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang') || localStorage.getItem('bd_geo_lang');
      if (saved) return getNormalizedLang(saved);
    }
    return getNormalizedLang(i18n?.language);
  });

  useEffect(() => {
    if (!i18n) return;

    const activeCode = i18n.language || (typeof window !== 'undefined' ? localStorage.getItem('lang') : 'en');
    setLangState(getNormalizedLang(activeCode));

    const handleLangChange = (newLng) => {
      const norm = getNormalizedLang(newLng);
      setLangState(norm);
      try {
        localStorage.setItem('lang', newLng);
        localStorage.setItem('bd_geo_lang', norm);
      } catch (e) {}
    };

    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, [i18n]);

  const changeLang = (newLang) => {
    const norm = getNormalizedLang(newLang);
    setLangState(norm);
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(newLang);
    }
    try {
      localStorage.setItem('lang', newLang);
      localStorage.setItem('bd_geo_lang', norm);
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
    } catch (e) {}
  };

  const toggleLang = () => {
    changeLang(lang === 'bn' ? 'en' : 'bn');
  };

  const t = (en, bn, ar, zh) => {
    // 1. If object passed: { en, bn, ar, zh }
    if (typeof en === 'object' && en !== null) {
      return en[lang] || en.en || Object.values(en)[0] || '';
    }

    // 2. If explicit ar / zh passed as arguments
    if (ar !== undefined && lang === 'ar') return ar || en;
    if (zh !== undefined && lang === 'zh') return zh || en;

    // 3. If Bengali requested
    if (lang === 'bn' && bn !== undefined) {
      return bn || en;
    }

    // 4. If Arabic requested and in dictionary
    if (lang === 'ar') {
      if (typeof en === 'string' && GEO_TRANSLATIONS.ar[en]) {
        return GEO_TRANSLATIONS.ar[en];
      }
      return en;
    }

    // 5. If Chinese requested and in dictionary
    if (lang === 'zh') {
      if (typeof en === 'string' && GEO_TRANSLATIONS.zh[en]) {
        return GEO_TRANSLATIONS.zh[en];
      }
      return en;
    }

    // 6. English or i18n key lookup
    if (bn === undefined && typeof en === 'string' && i18nT) {
      const val = i18nT(en);
      if (val && val !== en) return val;
    }

    return en;
  };

  return (
    <BangladeshGeoLangContext.Provider
      value={{ lang, setLang: changeLang, toggleLang, t }}
    >
      {children}
    </BangladeshGeoLangContext.Provider>
  );
}

export function useBangladeshGeoLang() {
  return useContext(BangladeshGeoLangContext);
}
