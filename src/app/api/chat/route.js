import { NextResponse } from 'next/server';

// ── MerxoDev Solutions Multilingual Knowledge Engine ──────────────────────────
const WHATSAPP_NUM = '8801313334279';
const WHATSAPP_DISPLAY = '+880 1313-334279';
const EMAIL = 'merxodevsolutions@gmail.com';
const LOCATION = 'Nilphamari, Rangpur, Bangladesh';

const KNOWLEDGE_BASE = [
  {
    id: 'pricing',
    keywords: [
      // English
      'price', 'pricing', 'cost', 'budget', 'rate', 'fee', 'charge', 'package', 'how much',
      // Bangla
      'দাম', 'খরচ', 'টাকা', 'বাজেট', 'প্যাকেজ', 'মূল্য', 'রেট', 'বিল', 'কত লাগবে',
      // Banglish
      'koto taka', 'taka', 'khoroch', 'dam', 'budget', 'rate', 'package', 'koto lagbe', 'taka lagbe', 'khoroch hobe', 'dam koto', 'kototaka',
      // Arabic
      'سعر', 'اسعار', 'تكلفة', 'بكم', 'ميزانية', 'كم سعر',
      // Hindi
      'दाम', 'कीमत', 'खर्च', 'बजट', 'पैसा', 'कितना खर्च',
      // Chinese
      '价格', '多少钱', '费用', '预算', '收费',
      // Spanish
      'precio', 'cuanto', 'cuánto', 'costo', 'presupuesto', 'tarifa',
      // French
      'prix', 'cout', 'coût', 'combien', 'budget', 'tarif',
      // German
      'preis', 'kosten', 'wieviel', 'budget', 'preise'
    ],
    response: {
      en: `Our standard digital services range strictly between **BDT 1,000 and BDT 4,000**:\n\n• **Starter Services:** BDT 1,000 – BDT 1,500 (Landing pages, UI design, bug fixes, SEO)\n• **Professional Tier:** BDT 2,000 – BDT 3,000 (Dynamic responsive websites, APIs, database)\n• **Advanced & SaaS:** BDT 3,500 – BDT 4,000 (Custom Web Apps, Ecommerce store with payment gateways)`,
      bn: `আমাদের সকল ডিজিটাল সার্ভিসের মূল্য অত্যন্ত সাশ্রয়ী এবং প্যাকেজ ভেদে **১,০০০ টাকা থেকে ৪,০০০ টাকার মধ্যে** নির্ধারিত:\n\n• **স্টার্টার প্যাকেজ:** ১,০০০ - ১,৫০০ টাকা (ল্যান্ডিং পেজ, বেসিক এসইও, মেইনটেন্যান্স)\n• **প্রফেশনাল প্যাকেজ:** ২,০০০ - ৩,০০০ টাকা (রেসপন্সিভ ওয়েবসাইট, এপিআই ইন্টিগ্রেশন, ডাটাবেস ডিজাইন)\n• **অ্যাডভান্সড / ওয়েব অ্যাপ:** ৩,৫০০ - ৪,০০০ টাকা (ই-কমার্স শপ, ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন)`,
      banglish: `Amader sob digital service er dam khub shashroye **BDT 1,000 theke BDT 4,000** er moddhe:\n\n• **Starter Package:** 1,000 - 1,500 Taka (Landing page, UI design, basic SEO, bug fix)\n• **Professional Package:** 2,000 - 3,000 Taka (Full responsive website, API, database)\n• **Advanced / SaaS:** 3,500 - 4,000 Taka (Custom Web App, Ecommerce store with bKash/Nagad gateway)\n\nApnar requirement onujayi amader WhatsApp e kotha bolte paren!`,
      ar: `تبدأ أسعار خدماتنا الرقمية من **1,000 إلى 4,000 تاكا بنغلاديشية (BDT)**:\n\n• **الباقة الأساسية:** 1,000 - 1,500 BDT (صفحات الهبوط، التصميم، تحسين محركات البحث)\n• **الباقة الاحترافية:** 2,000 - 3,000 BDT (مواقع ويب ديناميكية وتطبيقات متجاوبة)\n• **الباقة المتقدمة:** 3,500 - 4,000 BDT (تطبيقات الويب المخصصة، المتاجر الإلكترونية مع بوابات الدفع)`,
      hi: `हमारी डिजिटल सेवाओं का मूल्य **1,000 BDT से 4,000 BDT** के बीच है:\n\n• **स्टार्टर पैकेज:** 1,000 - 1,500 BDT (लैंडिंग पेज, बेसिक एसईओ, बग फिक्स)\n• **प्रोफेशनल पैकेज:** 2,000 - 3,000 BDT (रेस्पॉन्सिव वेबसाइट, एपीआई, डेटाबेस)\n• **एडवांस्ड व सास (SaaS):** 3,500 - 4,000 BDT (कस्टम वेब ऐप, ई-कॉमर्स स्टोर व पेमेंट गेटवे)`,
      zh: `我们的数字化服务价格严格在 **1,000 至 4,000 BDT (孟加拉塔卡)** 之间：\n\n• **入门版：** 1,000 – 1,500 BDT（落地页设计、基础 SEO、Bug 修复）\n• **专业版：** 2,000 – 3,000 BDT（响应式企业官网、API 接口、数据库开发）\n• **高级应用与 SaaS：** 3,500 – 4,000 BDT（定制 Web 应用程序、集成支付网关的电商商城）`,
      es: `Nuestros servicios digitales van estrictamente de **BDT 1,000 a BDT 4,000**:\n\n• **Plan Básico:** BDT 1,000 – 1,500 (Páginas de aterrizaje, correcciones, SEO)\n• **Plan Profesional:** BDT 2,000 – 3,000 (Sitios web dinámicos, APIs, bases de datos)\n• **Avanzado y SaaS:** BDT 3,500 – 4,000 (Aplicaciones web personalizadas, Tienda online con pasarelas de pago)`,
      fr: `Nos tarifs se situent strictement entre **1 000 et 4 000 BDT**:\n\n• **Pack Débutant:** 1 000 – 1 500 BDT (Landing pages, SEO de base, correctifs)\n• **Pack Professionnel:** 2 000 – 3 000 BDT (Sites dynamiques, intégration d'API, base de données)\n• **Pack Avancé & SaaS:** 3 500 – 4 000 BDT (Applications web sur mesure, boutique e-commerce avec paiement)`,
      de: `Unsere Preise liegen strikt zwischen **1.000 und 4.000 BDT**:\n\n• **Starter-Paket:** 1.000 – 1.500 BDT (Landingpages, Bugfixes, Basis-SEO)\n• **Professional-Paket:** 2.000 – 3.000 BDT (Dynamische Webseiten, API-Integration, Datenbanken)\n• **Advanced & SaaS:** 3.500 – 4.000 BDT (Maßgeschneiderte Webanwendungen, E-Commerce mit Zahlungssystemen)`
    },
    actions: [
      { label: 'View Services & Pricing', href: '/services', type: 'link' },
      { label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' },
    ],
    suggestions: ['Web Development Package?', 'How to order a project?', 'WhatsApp Contact']
  },
  {
    id: 'language_switch',
    keywords: [
      // Bangla / Banglish explicit language commands
      'banglay bolo', 'banglay bolun', 'bangla te bolen', 'banglay kotha bolo', 'bangla bolo', 'amake banglay bolo',
      'বাংলায় বলো', 'বাংলায় বলুন', 'বাংলা ভাষায় বলুন', 'বাংলাতে বলুন', 'বাংলায় উত্তর দাও',
      'speak bangla', 'talk in bangla', 'speak in bangla',
      // English explicit language commands
      'english please', 'speak english', 'talk in english', 'english a bolo', 'english e bolun', 'tell me in english'
    ],
    response: {
      bn: `হ্যাঁ, অবশ্যই! আমি বাংলায় কথা বলতে ও সাহায্য করতে প্রস্তুত।\n\n**MerxoDev Solutions**-এ আমাদের আধুনিক ওয়েবসাইট ডেভেলপমেন্ট, বাজেট প্যাকেজ (১,০০০ - ৪,০০০ টাকা), বা যেকোনো ডিজিটাল সেবা সম্পর্কে আপনি যা জানতে চান নির্দ্বিধায় বাংলায় প্রশ্ন করতে পারেন!`,
      banglish: `Haa obosshoi! Ami Banglay/Banglish e help korte ready.\n\n**MerxoDev Solutions** er website development, budget package (BDT 1,000 - 4,000 Taka), ba onnano service somporke apni jante chaile bolun!`,
      en: `Yes, absolutely! I am happy to assist you in English.\n\nFeel free to ask about **MerxoDev Solutions** digital engineering services, web development packages (BDT 1,000 – BDT 4,000), timelines, or WhatsApp consultation!`,
      ar: `نعم، بالتأكيد! يمكنني مساعدتك والتحدث معك باللغة العربية.\n\nلا تتردد في السؤال عن خدماتنا وتطوير المواقع والأسعار (1,000 - 4,000 BDT).`,
      hi: `जी बिल्कुल! मैं आपकी सहायता हिंदी में करने के लिए तैयार हूँ।\n\nआप वेबसाइट डेवलपमेंट, पैकेज व कीमतों (1,000 से 4,000 BDT) के बारे में कुछ भी पूछ सकते हैं!`,
      zh: `是的，没问题！我可以使用中文为您提供解答与咨询。\n\n欢迎随时咨询我们的网站开发、定制系统与超值套餐（1,000 - 4,000 BDT）！`,
      es: `¡Sí, por supuesto! Puedo ayudarte y responderte en español con total fluidez.`,
      fr: `Oui, absolument ! Je peux vous aider et échanger avec vous en français.`,
      de: `Ja, natürlich! Ich kann Ihnen gerne auf Deutsch behilflich sein.`
    },
    actions: [
      { label: 'View Services & Pricing', href: '/services', type: 'link' },
      { label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' }
    ],
    suggestions: ['Website packages & pricing?', 'What services do you offer?', 'WhatsApp Lead Developer']
  },
  {
    id: 'services',
    keywords: [
      // English
      'service', 'services', 'offer', 'solution', 'what do you do', 'features', 'provide', 'tell me about your services', 'about your service',
      // Bangla
      'সার্ভিস', 'সেবা', 'কাজ', 'কি কি সেবা দেন', 'কী কাজ করেন', 'সার্ভিসসমূহ', 'কি কাজ করেন', 'তোমাদের সার্ভিস সম্পর্কে বলো', 'সার্ভিস সম্পর্কে বলো', 'তোমাদের সার্ভিস', 'সার্ভিস সম্পর্কে বলুন', 'আপনার কাজ সম্পর্কে বলুন',
      // Banglish
      'service ki', 'ki ki service', 'ki kaj koren', 'service gulo', 'kaj ki', 'ki offer koren', 'service dorkar', 'ki ki kaj', 'tomader service', 'tomader service somporke bolo', 'service somporke bolo', 'service somporke', 'apnader service somporke', 'apnader services',
      // Arabic
      'خدمات', 'خدمة', 'ماذا تقدمون', 'حلول', 'ما هي خدماتكم',
      // Hindi
      'सेवाएं', 'सर्विस', 'क्या काम करते हैं', 'क्या सुविधाएं हैं',
      // Chinese
      '服务', '业务', '提供什么服务', '主要业务',
      // Spanish
      'servicios', 'servicio', 'que hacen', 'qué hacen', 'ofrecen',
      // French
      'services', 'service', 'que faites-vous', 'prestations',
      // German
      'dienstleistungen', 'angebote', 'services', 'leistungen'
    ],
    response: {
      en: `MerxoDev Solutions provides 10 core digital engineering services:\n\n1. **Web Development** (Next.js, React, Tailwind CSS)\n2. **Custom Web Applications & SaaS**\n3. **Ecommerce Platforms** (Cart, Checkout, Admin)\n4. **UI/UX Design** (Figma to high-speed code)\n5. **SEO & Search Ranking Optimization**\n6. **API Development & Integration**\n7. **Cybersecurity & Auth Systems**\n8. **Payment Gateway Integration** (bKash, Nagad, Stripe, SSLCommerz)\n9. **Database Architecture & Optimization**\n10. **Maintenance, Speed & Security Audits**`,
      bn: `MerxoDev Solutions-এ আমরা ১০টি প্রধান ডিজিটাল সেবা দিয়ে থাকি:\n\n১. **ওয়েব ডেভেলপমেন্ট** (Next.js, React, Tailwind CSS)\n২. **কাস্টম ওয়েব অ্যাপ্লিকেশন ও SaaS**\n৩. **ই-কমার্স সলিউশন** (কার্ট, পেমেন্ট, অ্যাডমিন প্যানেল)\n৪. **UI/UX ডিজাইন** (Figma থেকে ক্লিন ডিজাইন)\n৫. **এসইও ও র‍্যাঙ্কিং অপ্টিমাইজেশন**\n৬. **API ডেভেলপমেন্ট ও ইন্টিগ্রেশন**\n৭. **সাইবার সিকিউরিটি ও ব্যাকআপ**\n৮. **পেমেন্ট গেটওয়ে ইন্টিগ্রেশন** (বিকাশ, নগদ, রকেট, স্ট্রাইপ)\n৯. **ডাটাবেস আর্কিটেকচার ও ম্যানেজমেন্ট**\n১০. **ওয়েবসাইট মেইনটেন্যান্স ও স্পিড অপ্টিমাইজেশন**`,
      banglish: `MerxoDev Solutions e amra 10 ta main digital service provide kori:\n\n1. **Web Development** (Next.js, React, Tailwind CSS)\n2. **Custom Web Application & SaaS**\n3. **Ecommerce Website** (Cart, Checkout, Admin panel)\n4. **UI/UX Design** (Figma to modern clean design)\n5. **SEO & Ranking Optimization**\n6. **API Development & Integration**\n7. **Security & Authentication**\n8. **Payment Gateway** (bKash, Nagad, Rocket, Stripe)\n9. **Database Architecture & Optimization**\n10. **Website Maintenance & Speed Optimization**`,
      ar: `تقدم MerxoDev Solutions أهم الخدمات الرقمية المتكاملة:\n\n1. **تطوير مواقع الويب** (Next.js, React, Tailwind CSS)\n2. **تطبيقات الويب المخصصة و SaaS**\n3. **منصات التجارة الإلكترونية** (متجر كامل ولوحة تحكم)\n4. **تصميم UI/UX**\n5. **تحسين محركات البحث (SEO)**\n6. **تطوير وربط واجهات البرمجة (APIs)**\n7. **بوابات الدفع الإلكتروني** (bKash, Nagad, Stripe)\n8. **إدارة وتأمين قواعد البيانات**`,
      hi: `MerxoDev Solutions मुख्य रूप से निम्नलिखित सेवाएं प्रदान करता है:\n\n1. **वेबसाइट डेवलपमेंट** (Next.js, React, Tailwind CSS)\n2. **कस्टम वेब ऐप्स व सास (SaaS)**\n3. **ई-कॉमर्स प्लेटफॉर्म** (शॉपिंग कार्ट, एडमिन पैनल)\n4. **UI/UX डिज़ाइनिंग**\n5. **एसईओ (SEO) ऑप्टिमाइजेशन**\n6. **पेमेंट गेटवे इंटीग्रेशन** (bKash, Nagad, Stripe)\n7. **डेटाबेस व सुरक्षा समाधान**`,
      zh: `MerxoDev Solutions 提供全方位的数字化工程服务：\n\n1. **网站开发** (Next.js, React, Tailwind CSS)\n2. **定制 Web 应用程序与 SaaS 平台**\n3. **电子商务系统** (购物车、支付结算、管理后台)\n4. **UI/UX 交互设计**\n5. **SEO 搜索引擎优化**\n6. **API 接口开发与系统集成**\n7. **支付网关接入** (bKash, Nagad, Stripe)\n8. **数据库架构与系统维护**`,
      es: `MerxoDev Solutions ofrece servicios completos de ingeniería digital:\n\n1. **Desarrollo Web** (Next.js, React, Tailwind CSS)\n2. **Aplicaciones Web Personalizadas y SaaS**\n3. **Comercio Electrónico** (Tienda online, panel de administración)\n4. **Diseño UI/UX**\n5. **Optimización SEO**\n6. **Integración de Pasarelas de Pago** (bKash, Nagad, Stripe)\n7. **Seguridad y Mantenimiento Web**`,
      fr: `MerxoDev Solutions fournit des services complets d'ingénierie logicielle:\n\n1. **Développement Web** (Next.js, React, Tailwind CSS)\n2. **Applications Web & SaaS sur mesure**\n3. **Boutiques E-commerce**\n4. **Design UI/UX**\n5. **Optimisation SEO**\n6. **Intégration de Passerelles de Paiement**\n7. **Maintenance & Sécurité**`,
      de: `MerxoDev Solutions bietet moderne digitale Engineering-Dienstleistungen:\n\n1. **Webentwicklung** (Next.js, React, Tailwind CSS)\n2. **Maßgeschneiderte Webanwendungen & SaaS**\n3. **E-Commerce Plattformen**\n4. **UI/UX Design**\n5. **SEO-Optimierung**\n6. **Zahlungsgateway-Integration**\n7. **Datenbanken, Sicherheit & Wartung**`
    },
    actions: [
      { label: 'Explore All Services', href: '/services', type: 'link' },
      { label: 'View Our Projects', href: '/our-projects', type: 'link' },
    ],
    suggestions: ['Web Development pricing?', 'Payment Gateway Integration?', 'Contact Lead Developer']
  },
  {
    id: 'web_dev',
    keywords: [
      // English
      'web', 'website', 'web dev', 'web development', 'frontend', 'landing page', 'portfolio', 'site',
      // Bangla
      'ওয়েবসাইট', 'ওয়েব ডেভেলপমেন্ট', 'সাইট বানাতে চাই', 'ওয়েব পেজ', 'ল্যান্ডিং পেজ',
      // Banglish
      'website banate chai', 'site banabo', 'web site koto', 'ekta website dorkar', 'landing page', 'portfolio site', 'website toiri',
      // Arabic
      'موقع', 'موقع الكتروني', 'برمجة موقع', 'تطوير المواقع',
      // Hindi
      'वेबसाइट', 'वेब डेवलपमेंट', 'साइट बनानी है',
      // Chinese
      '建站', '网站开发', '制作网站', '前端', '网站制作',
      // Spanish
      'sitio web', 'pagina web', 'desarrollo web', 'crear web',
      // French
      'site web', 'creation site', 'developpement web',
      // German
      'webseite', 'website erstellen', 'webentwicklung'
    ],
    response: {
      en: `We build ultra-fast, modern websites using **Next.js 16, React, Tailwind CSS, and Node.js**.\n\n• **Starter (BDT 1,000 - 1,500):** Clean high-converting landing page, responsive, SEO ready.\n• **Business (BDT 2,500 - 3,500):** Multi-page corporate website, CMS integration, smooth animations, fast loading.`,
      bn: `আমরা **Next.js 16, React এবং Tailwind CSS** ব্যবহার করে সুপার-ফাস্ট আধুনিক ওয়েবসাইট তৈরি করি।\n\n• **স্টার্টার (১,০০০ - ১,৫০০ টাকা):** হাই-কনভার্টিং ল্যান্ডিং পেজ, ফুল মোবাইল ফ্রেন্ডলি ও এসইও রেডি।\n• **বিজনেস (২,৫০০ - ৩,৫০০ টাকা):** মাল্টি-পেজ ওয়েবসাইট, কাস্টম অ্যাডমিন ও প্রিমিয়াম ডিজাইন।`,
      banglish: `Amra **Next.js 16, React ebong Tailwind CSS** diye super-fast, responsive modern website toiri kori:\n\n• **Starter (1,000 - 1,500 Taka):** Single page / Landing page, responsive design, fast loading, SEO ready.\n• **Business (2,500 - 3,500 Taka):** Multi-page dynamic website, animations, admin/CMS integration.\n\nApni ki dhoroner website banate chan?`,
      ar: `نقوم بتطوير مواقع ويب فائقة السرعة باستخدام **Next.js 16 و React و Tailwind CSS**:\n\n• **البداية (1,000 - 1,500 BDT):** صفحة هبوط سريعة ومتجاوبة ومُهيأة لمحركات البحث.\n• **الأعمال (2,500 - 3,500 BDT):** موقع متعدد الصفحات للشركات مع لوحة تحكم وتصميم احترافي.`,
      hi: `हम **Next.js 16, React और Tailwind CSS** का उपयोग करके अत्यधिक तेज़ व आधुनिक वेबसाइट्स बनाते हैं:\n\n• **स्टार्टर (1,000 - 1,500 BDT):** सिंगल पेज लैंडिंग पेज, मोबाइल फ्रेंडली, एसईओ युक्त।\n• **बिजनेस (2,500 - 3,500 BDT):** मल्टी-पेज कॉर्पोरेट वेबसाइट, सीएमएस व आधुनिक एनिमेशन।`,
      zh: `我们采用最前沿的 **Next.js 16, React, Tailwind CSS** 构建极速网站：\n\n• **基础版 (1,000 - 1,500 BDT)：** 极速响应式落地页、SEO 优化、移动端完美适配。\n• **企业版 (2,500 - 3,500 BDT)：** 多页面企业官网、CMS 内容管理系统集成、流畅动效。`,
      es: `Creamos sitios web ultrarrápidos con **Next.js 16, React y Tailwind CSS**:\n\n• **Básico (BDT 1,000 - 1,500):** Landing page de alta conversión, responsiva y lista para SEO.\n• **Empresarial (BDT 2,500 - 3,500):** Sitio web corporativo multipágina con CMS y animaciones modernas.`,
      fr: `Nous développons des sites ultra-rapides avec **Next.js 16, React et Tailwind CSS**:\n\n• **Starter (1 000 - 1 500 BDT):** Landing page moderne, responsive et optimisée SEO.\n• **Business (2 500 - 3 500 BDT):** Site vitrine d'entreprise multipages avec CMS et design soigné.`,
      de: `Wir erstellen blitzschnelle Webseiten mit **Next.js 16, React und Tailwind CSS**:\n\n• **Starter (1.000 - 1.500 BDT):** Konversionsstarke Landingpage, voll responsiv & SEO-optimiert.\n• **Business (2.500 - 3.500 BDT):** Mehrseitige Unternehmens-Website mit CMS und modernen Animationen.`
    },
    actions: [
      { label: 'Web Dev Details', href: '/services-web', type: 'link' },
      { label: 'Start Web Project', href: '/contact?service=Web%20Development', type: 'link' }
    ],
    suggestions: ['See Web Projects', 'What is the delivery time?', 'Order on WhatsApp']
  },
  {
    id: 'ecommerce',
    keywords: [
      // English
      'ecommerce', 'e-commerce', 'shop', 'store', 'online shop', 'cart', 'checkout', 'product',
      // Bangla
      'ইকমার্স', 'দোকান', 'অনলাইন শপ', 'দোকানের ওয়েবসাইট', 'ই-কমার্স',
      // Banglish
      'ecommerce website', 'online shop', 'dokander website', 'product sell', 'cart system', 'dokaner site', 'e-commerce',
      // Arabic
      'متجر', 'متجر الكتروني', 'تجارة الكترونية', 'بيع اونلاين',
      // Hindi
      'ई-कॉमर्स', 'दुकान', 'ऑनलाइन स्टोर',
      // Chinese
      '电商', '商城', '网店', '在线商城',
      // Spanish
      'tienda online', 'comercio electronico', 'e-commerce',
      // French
      'boutique en ligne', 'e-commerce', 'magasin',
      // German
      'online-shop', 'e-commerce', 'onlineshop'
    ],
    response: {
      en: `Our custom Ecommerce solutions include:\n\n• Product management & inventory tracking\n• Seamless payment gateway (bKash, Nagad, Cards, Stripe)\n• Automated order notifications & customer invoices\n• Lightning fast mobile shopping experience\n\n**Pricing:** BDT 2,500 to BDT 4,000 based on scale.`,
      bn: `আমাদের ই-কমার্স সলিউশনে আপনি পাবেন:\n\n• প্রোডাক্ট আপলোড ও স্টক ম্যানেজমেন্ট\n• বিকাশ, নগদ ও কার্ড পেমেন্ট গেটওয়ে\n• স্বয়ংক্রিয় অর্ডার নোটিফিকেশন ও ইনভয়েস\n• সুপার-ফাস্ট মোবাইল এক্সপেরিয়েন্স\n\n**মূল্য:** ২,৫০০ টাকা থেকে ৪,০০০ টাকা।`,
      banglish: `Amader custom Ecommerce solution e thakbe:\n\n• Unlimited Product upload & Stock tracking\n• bKash, Nagad, Rocket, Card auto payment gateway\n• Automatic SMS/Email order notification & PDF Invoice\n• Super fast mobile & desktop shopping experience\n\n**Pricing:** 2,500 Taka theke 4,000 Taka er moddhe complete package.`,
      ar: `حلول المتاجر الإلكترونية المتكاملة لدينا تشمل:\n\n• إدارة المنتجات وتتبع المخزون بدقة\n• بوابات الدفع الإلكتروني (البطاقات، bKash، Nagad، Stripe)\n• إشعارات تلقائية بالطلبات وفواتير PDF فورية\n• تجربة تسوق سريعة ومميزة للهواتف\n\n**الأسعار:** من 2,500 إلى 4,000 BDT.`,
      hi: `हमारे ई-कॉमर्स समाधान में शामिल हैं:\n\n• उत्पाद प्रबंधन व इन्वेंट्री ट्रैकिंग\n• सुरक्षित पेमेंट गेटवे (कार्ड, bKash, Nagad)\n• ऑटोमेटेड ऑर्डर नोटिफिकेशन व इनवॉइस\n• तेज़ व सुरक्षित मोबाइल शॉपिंग अनुभव\n\n**लागत:** 2,500 से 4,000 BDT।`,
      zh: `我们的定制化电商独立站系统包括：\n\n• 完善的商品上下架与库存管理\n• 无缝集成多渠道支付网关 (bKash, Nagad, Stripe, 信用卡)\n• 自动订单短信/邮件通知与电子发票生成\n• 极致流畅的移动端购物体验\n\n**价格区间：** 2,500 至 4,000 BDT。`,
      es: `Nuestras soluciones de comercio electrónico incluyen:\n\n• Gestión de catálogo e inventario en tiempo real\n• Pasarelas de pago seguras (bKash, Nagad, tarjetas, Stripe)\n• Notificaciones automáticas de pedidos y facturas\n• Experiencia de compra móvil ultrarrápida\n\n**Precio:** BDT 2,500 a BDT 4,000.`,
      fr: `Nos solutions E-commerce sur mesure incluent:\n\n• Gestion de catalogue et suivi des stocks\n• Passerelles de paiement sécurisées (bKash, Nagad, cartes)\n• Notifications de commande et facturation automatique\n• Navigation mobile fluide et rapide\n\n**Tarif:** 2 500 à 4 000 BDT.`,
      de: `Unsere E-Commerce Komplettlösungen bieten:\n\n• Produkt- & Lagerbestandsverwaltung\n• Sichere Zahlungsgateways (Kreditkarten, bKash, Stripe)\n• Automatische Bestellbenachrichtigungen & Rechnungen\n• Blitzschnelles mobiles Einkaufserlebnis\n\n**Kosten:** 2.500 bis 4.000 BDT.`
    },
    actions: [
      { label: 'Ecommerce Services', href: '/services-ecommerce', type: 'link' },
      { label: 'Build Your Store', href: '/contact?service=E-commerce%20Solutions', type: 'link' }
    ],
    suggestions: ['Payment Gateway Support?', 'See live store demo', 'Pricing packages?']
  },
  {
    id: 'payment_gateway',
    keywords: [
      // English
      'payment', 'gateway', 'bkash', 'nagad', 'rocket', 'stripe', 'sslcommerz', 'checkout', 'pay',
      // Bangla
      'পেমেন্ট', 'বিকাশ', 'নগদ', 'রকেট', 'পেমেন্ট গেটওয়ে', 'টাকা পরিশোধ',
      // Banglish
      'payment gateway', 'bkash payment', 'nagad integration', 'auto payment', 'payment system', 'kivabe payment nibo',
      // Arabic
      'دفع', 'بوابة دفع', 'طرق الدفع', 'فيزا',
      // Hindi
      'पेमेंट', 'भुगतान', 'पेमेंट गेटवे',
      // Chinese
      '支付', '支付网关', '结算', '在线支付',
      // Spanish
      'pasarela de pago', 'pagos', 'metodos de pago',
      // French
      'passerelle de paiement', 'paiement en ligne',
      // German
      'zahlungsgateway', 'bezahlung', 'online bezahlen'
    ],
    response: {
      en: `We integrate direct merchant & tokenized payment gateways including **bKash, Nagad, Rocket, Upay, SSLCommerz, Shurjopay, and Stripe** with instant webhook verification and automatic receipt generation.`,
      bn: `আমরা **বিকাশ, নগদ, রকেট, উপায়, SSLCommerz এবং Stripe** পেমেন্ট গেটওয়ে সরাসরি আপনার ওয়েবসাইটে ইন্টিগ্রেট করে দিই। এতে কাস্টমার পেমেন্ট করার সাথে সাথেই ইনস্ট্যান্ট ভেরিফিকেশন ও অর্ডার কনফার্মেশন পাওয়া যায়।`,
      banglish: `Amra **bKash, Nagad, Rocket, Upay, SSLCommerz, ebong Stripe** payment gateway direct apnar website ba web app e integrate kore di. Kono customer payment korle instant automated verification ebong receipt toiri hoye jabe.`,
      ar: `نقوم بربط ودمج بوابات الدفع الإلكتروني مثل **bKash, Nagad, SSLCommerz, Stripe** مع التحقق التلقائي الفوري وتأكيد المعاملات عبر Webhooks.`,
      hi: `हम **bKash, Nagad, Rocket, SSLCommerz और Stripe** जैसे पेमेंट गेटवे को सीधे आपकी वेबसाइट से जोड़ते हैं, जिससे तुरंत भुगतान सत्यापन और रसीद मिल सके।`,
      zh: `我们支持无缝接入各类主流支付网关，包括 **bKash, Nagad, Rocket, SSLCommerz 以及 Stripe (国际信用卡)**，提供 Webhook 即时订单对账与自动化电子凭证。`,
      es: `Integramos pasarelas de pago directas como **bKash, Nagad, SSLCommerz y Stripe** con verificación instantánea mediante webhooks y recibos automáticos.`,
      fr: `Nous intégrons des passerelles de paiement fiables comme **bKash, Nagad, SSLCommerz et Stripe** avec confirmation instantanée et génération automatique de reçus.`,
      de: `Wir integrieren Zahlungsgateways wie **bKash, Nagad, SSLCommerz und Stripe** mit Echtzeit-Webhook-Verifizierung und automatischen Belegen.`
    },
    actions: [
      { label: 'Payment Gateway Service', href: '/services-payment-gateway', type: 'link' },
      { label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' }
    ],
    suggestions: ['Ecommerce pricing?', 'Contact us for integration', 'How long does it take?']
  },
  {
    id: 'contact_hire',
    keywords: [
      // English
      'contact', 'hire', 'phone', 'number', 'call', 'whatsapp', 'email', 'address', 'location', 'reach', 'talk',
      // Bangla
      'যোগাযোগ', 'ফোন', 'নাম্বার', 'হায়্যার', 'ঠিকানা', 'কথা বলতে চাই', 'লোকেশন', 'ইমেইল',
      // Banglish
      'jogajog', 'thikana', 'kothay', 'phone number', 'whatsapp number', 'call dibo', 'kotha bolbo', 'hire korbo', 'kivabe jogajog korbo', 'number ki',
      // Arabic
      'تواصل', 'اتصال', 'رقم', 'واتساب', 'عنوان', 'موقعكم', 'ايميل',
      // Hindi
      'संपर्क', 'फोन', 'नंबर', 'व्हाट्सएप', 'पता', 'कॉल',
      // Chinese
      '联系', '电话', '微信', '联系方式', '地址', '沟通',
      // Spanish
      'contacto', 'telefono', 'teléfono', 'numero', 'whatsapp', 'direccion',
      // French
      'contact', 'telephone', 'téléphone', 'numero', 'whatsapp', 'adresse',
      // German
      'kontakt', 'telefon', 'nummer', 'whatsapp', 'adresse', 'standort'
    ],
    response: {
      en: `You can reach out to our core engineering team directly:\n\n**Phone / WhatsApp:** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**Email:** ${EMAIL}\n**Location:** ${LOCATION}\n**Availability:** 24/7 Client Consultation`,
      bn: `আমাদের সাথে সরাসরি যোগাযোগ করার মাধ্যমসমূহ:\n\n**ফোন / হোয়াটসঅ্যাপ:** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**ইমেইল:** ${EMAIL}\n**ঠিকানা:** ${LOCATION}\n**সার্ভিস টাইম:** ২৪/৭ সার্বক্ষণিক সাপোর্ট`,
      banglish: `Amader shathe direct jogajog korar maddhom:\n\n**Phone / WhatsApp:** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**Email:** ${EMAIL}\n**Location:** ${LOCATION}\n**Available:** 24/7 Shobshomoy amader sathe WhatsApp e kotha bolte paren!`,
      ar: `يمكنك التواصل مع فريقنا الهندسي مباشرة عبر الوسائل التالية:\n\n**الهاتف / واتساب:** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**البريد الإلكتروني:** ${EMAIL}\n**الموقع:** ${LOCATION}\n**الاستجابة:** 24/7 على مدار الساعة`,
      hi: `आप हमारी कोर इंजीनियरिंग टीम से सीधे संपर्क कर सकते हैं:\n\n**फोन / व्हाट्सएप:** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**ईमेल:** ${EMAIL}\n**स्थान:** ${LOCATION}\n**सपोर्ट:** 24/7 कभी भी संपर्क करें`,
      zh: `您可以直接与我们的核心研发团队取得联系：\n\n**电话 / WhatsApp：** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**电子邮箱：** ${EMAIL}\n**公司地址：** ${LOCATION}\n**咨询时间：** 全年 24/7 随时在线咨询`,
      es: `Puedes comunicarte directamente con nuestro equipo de desarrollo:\n\n**Teléfono / WhatsApp:** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**Correo:** ${EMAIL}\n**Ubicación:** ${LOCATION}\n**Disponibilidad:** 24/7 Consulta inmediata`,
      fr: `Vous pouvez contacter directement notre équipe d'ingénierie:\n\n**Téléphone / WhatsApp:** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**Email:** ${EMAIL}\n**Localisation:** ${LOCATION}\n**Disponibilité:** 24h/24 et 7j/7`,
      de: `Sie können unser Entwicklerteam direkt kontaktieren:\n\n**Telefon / WhatsApp:** [${WHATSAPP_DISPLAY}](https://wa.me/${WHATSAPP_NUM})\n**E-Mail:** ${EMAIL}\n**Standort:** ${LOCATION}\n**Verfügbarkeit:** Rund um die Uhr (24/7)`
    },
    actions: [
      { label: `Chat on WhatsApp (${WHATSAPP_DISPLAY})`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' },
      { label: 'Send Direct Message', href: '/contact', type: 'link' }
    ],
    suggestions: ['View Portfolio Projects', 'Pricing Range', 'Our Team & Journey']
  },
  {
    id: 'timeline',
    keywords: [
      // English
      'timeline', 'timelines', 'delivery', 'duration', 'deadline', 'how long', 'days', 'speed', 'time',
      // Bangla
      'কত দিন', 'সময়', 'ডেলিভারি টাইম', 'কবে পাবো', 'কত সময় লাগবে',
      // Banglish
      'koto din', 'shomoy', 'delivery time', 'kotodin lagbe', 'koto shomoy', 'kobe pabo', 'kotodin',
      // Arabic
      'وقت', 'كم يستغرق', 'مدة', 'تسليم',
      // Hindi
      'समय', 'कितने दिन', 'डिलीवरी', 'कितना समय लगेगा',
      // Chinese
      '时间', '周期', '多久', '交付时间', '几天',
      // Spanish
      'tiempo', 'cuanto tiempo', 'cuánto tiempo', 'entrega', 'plazo',
      // French
      'delai', 'délai', 'temps', 'combien de temps', 'livraison',
      // German
      'dauer', 'lieferzeit', 'wie lange', 'zeitaufwand'
    ],
    response: {
      en: `Our typical delivery timelines:\n\n• **Landing Page / Bug Fixes:** 24 to 48 Hours\n• **Complete Business Website:** 3 to 7 Days\n• **Full Web App / Ecommerce:** 7 to 14 Days\n\nWe provide real-time staging previews throughout the entire development process.`,
      bn: `আমাদের প্রজেক্ট ডেলিভারি টাইমলাইন:\n\n• **ল্যান্ডিং পেজ / ছোট কাজ:** ২৪ থেকে ৪৮ ঘণ্টা\n• **কমপ্লিট বিজনেস ওয়েবসাইট:** ৩ থেকে ৭ দিন\n• **ফুল ওয়েব অ্যাপ্লিকেশন / ই-কমার্স:** ৭ থেকে ১৪ দিন\n\nকাজ চলাকালীন আপনি সার্বক্ষণিক লাইভ প্রিভিউ দেখতে পাবেন।`,
      banglish: `Amader delivery timeline:\n\n• **Landing page / Small works:** 24 theke 48 ghonta\n• **Full Business Website:** 3 theke 7 din\n• **Web Application / Ecommerce:** 7 theke 14 din\n\nKaj cholar shomoy apnake live staging link dewa hobe jate apni shathe shathe progress dekhte paren.`,
      ar: `الجداول الزمنية المعتادة لتسليم المشاريع لدينا:\n\n• **صفحات الهبوط والإصلاحات:** 24 إلى 48 ساعة\n• **موقع تجاري متكامل:** 3 إلى 7 أيام\n• **تطبيقات الويب والمتاجر الإلكترونية:** 7 إلى 14 يومًا\n\nنوفر لك رابط معاينة مباشر لمتابعة تطور العمل خطوة بخطوة.`,
      hi: `हमारे प्रोजेक्ट डिलीवरी की समय-सीमा:\n\n• **लैंडिंग पेज / छोटे कार्य:** 24 से 48 घंटे\n• **पूरी बिजनेस वेबसाइट:** 3 से 7 दिन\n• **वेब एप्लीकेशन / ई-कॉमर्स:** 7 से 14 दिन\n\nकाम के दौरान आप लाइव प्रीव्यू देखकर प्रगति देख सकते हैं।`,
      zh: `我们的项目标准交付周期如下：\n\n• **落地页 / 功能微调：** 24 至 48 小时\n• **完整企业官方网站：** 3 至 7 天\n• **定制 Web 应用 / 电商平台：** 7 至 14 天\n\n在整个开发过程中，我们将为您提供实时的测试预览链接，进度一目了然。`,
      es: `Nuestros tiempos de entrega habituales:\n\n• **Landing Page / Correcciones:** 24 a 48 Horas\n• **Sitio Web Corporativo Completo:** 3 a 7 Días\n• **Aplicación Web / E-commerce:** 7 a 14 Días\n\nProporcionamos enlaces de prueba en vivo durante todo el proceso.`,
      fr: `Nos délais de livraison habituels:\n\n• **Landing Page / Correctifs:** 24 à 48 heures\n• **Site Web d'entreprise:** 3 à 7 jours\n• **Application Web / E-commerce:** 7 à 14 jours\n\nUn lien de prévisualisation en direct vous est fourni tout au long du développement.`,
      de: `Unsere typischen Lieferzeiten:\n\n• **Landingpage / Fehlerbehebungen:** 24 bis 48 Stunden\n• **Komplette Unternehmens-Website:** 3 bis 7 Tage\n• **Web-Applikation / E-Commerce:** 7 bis 14 Tage\n\nSie erhalten während des gesamten Entwicklungsprozesses Live-Vorschau-Links.`
    },
    actions: [
      { label: 'Discuss Your Project', href: '/contact', type: 'link' },
      { label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' }
    ],
    suggestions: ['What technologies do you use?', 'Pricing details', 'WhatsApp Contact']
  },
  {
    id: 'tech_stack',
    keywords: [
      // English
      'tech', 'technology', 'stack', 'framework', 'nextjs', 'react', 'tailwind', 'database', 'node', 'tools',
      // Bangla
      'টেকনোলজি', 'কী দিয়ে বানান', 'প্রযুক্তি', 'ফ্রেমওয়ার্ক', 'ডাটাবেস',
      // Banglish
      'ki tech use koren', 'tech stack', 'technology ki', 'ki diye banan', 'nextjs', 'react', 'tech ki',
      // Arabic
      'تقنيات', 'لغات البرمجة', 'اطار العمل', 'تكنولوجيا',
      // Hindi
      'तकनीक', 'टेक्नोलॉजी', 'किससे बनाते हैं',
      // Chinese
      '技术栈', '开发技术', '技术架构', '用什么语言',
      // Spanish
      'tecnologias', 'tecnologías', 'lenguajes', 'stack',
      // French
      'technologies', 'stack technique', 'frameworks',
      // German
      'technologien', 'tech-stack', 'programmiersprachen'
    ],
    response: {
      en: `We engineer products using top-tier modern technologies:\n\n• **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, GSAP, Framer Motion\n• **Backend & APIs:** Node.js, Next.js Server Actions, REST, GraphQL\n• **Databases:** PostgreSQL, Prisma ORM, MongoDB, Supabase, Neon\n• **Cloud & Hosting:** Vercel, AWS, Cloudflare`,
      bn: `আমরা বিশ্বের আধুনিকতম টেকনোলজি স্ট্যাক ব্যবহার করি:\n\n• **ফ্রন্টএন্ড:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **ব্যাকএন্ড ও API:** Node.js, Next.js Server Functions, REST APIs\n• **ডাটাবেস:** PostgreSQL, Prisma ORM, MongoDB, Neon\n• **হোস্টিং ও ক্লাউড:** Vercel, AWS, Cloudflare`,
      banglish: `Amra world class modern technology stack use kori:\n\n• **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, GSAP\n• **Backend & APIs:** Node.js, Next.js Server Actions, REST API\n• **Databases:** PostgreSQL, Prisma ORM, MongoDB, Supabase\n• **Cloud & Deployment:** Vercel, AWS, Cloudflare`,
      ar: `نستخدم أحدث وأقوى التقنيات العالمية في تطوير المنتجات:\n\n• **الواجهة الأمامية:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **الواجهة الخلفية و APIs:** Node.js, Next.js Server Actions\n• **قواعد البيانات:** PostgreSQL, MongoDB, Prisma, Supabase\n• **السحابة والاستضافة:** Vercel, AWS, Cloudflare`,
      hi: `हम दुनिया की आधुनिकतम टेक्नोलॉजी स्टैक का उपयोग करते हैं:\n\n• **फ्रंटएंड:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **बैकएंड व एपीआई:** Node.js, REST APIs\n• **डेटाबेस:** PostgreSQL, Prisma, MongoDB\n• **क्लाउड व होस्टिंग:** Vercel, AWS, Cloudflare`,
      zh: `我们采用全球顶尖的现代化全栈技术体系：\n\n• **前端开发：** Next.js 16 (App Router), React 19, Tailwind CSS, GSAP\n• **后端与 API：** Node.js, Next.js Server Actions, RESTful APIs\n• **数据库：** PostgreSQL, Prisma ORM, MongoDB, Supabase\n• **云端部署：** Vercel, AWS, Cloudflare CDN`,
      es: `Desarrollamos con las tecnologías más modernas y potentes:\n\n• **Frontend:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **Backend y APIs:** Node.js, Server Actions, REST APIs\n• **Bases de Datos:** PostgreSQL, Prisma ORM, MongoDB\n• **Cloud y Hosting:** Vercel, AWS, Cloudflare`,
      fr: `Nous développons avec les technologies les plus performantes:\n\n• **Frontend:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **Backend & APIs:** Node.js, Next.js Server Actions, REST\n• **Bases de données:** PostgreSQL, Prisma, MongoDB\n• **Cloud & Hébergement:** Vercel, AWS, Cloudflare`,
      de: `Wir entwickeln mit den modernsten Technologien:\n\n• **Frontend:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **Backend & APIs:** Node.js, Next.js Server Actions, REST APIs\n• **Datenbanken:** PostgreSQL, Prisma ORM, MongoDB\n• **Cloud & Hosting:** Vercel, AWS, Cloudflare`
    },
    actions: [
      { label: 'View Our Projects', href: '/our-projects', type: 'link' },
      { label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' }
    ],
    suggestions: ['Web Application pricing?', 'View team background', 'Contact us']
  }
];

// ── Accurate Multi-Language Detector ──────────────────────────────────────────
function detectLanguage(text) {
  if (!text) return 'en';

  // 1. Unicode Script Tests (100% precision)
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';       // Bengali script
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';       // Arabic script
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';       // Chinese characters
  if (/[\u0900-\u097F]/.test(text)) return 'hi';       // Devanagari (Hindi) script

  const lower = text.toLowerCase();

  // 2. Explicit Language Switch Commands
  if (/\b(banglay|bangla te|bangla bhashay|bangla)\s*(bolo|bolen|bolun|kotha|bolte|shunte|chai)?\b/i.test(lower)) {
    return 'bn';
  }
  if (/\b(speak in english|talk in english|in english|english please|english e|english a)\b/i.test(lower)) {
    return 'en';
  }

  // 3. Spanish markers
  const spanishMarkers = ['¿', '¡', 'hola', 'gracias', 'cuanto', 'cuánto', 'precio', 'servicios', 'página', 'desarrollo', 'hacen', 'buenas'];
  if (spanishMarkers.some(w => lower.includes(w))) return 'es';

  // 4. French markers
  const frenchMarkers = ['bonjour', 'merci', 'combien', 'coût', 'cout', 'développement', 'developpement', 'site web', 'svp'];
  if (frenchMarkers.some(w => lower.includes(w))) return 'fr';

  // 5. German markers
  const germanMarkers = ['hallo', 'danke', 'wieviel', 'kosten', 'webseite', 'entwicklung', 'bitte', 'guten tag'];
  if (germanMarkers.some(w => lower.includes(w))) return 'de';

  // 6. Banglish token analyzer (Tokens matching Bengali words in Latin script)
  const banglishTokens = new Set([
    'koto', 'taka', 'khoroch', 'dam', 'lagbe', 'hobe', 'apnader', 'apnara',
    'amader', 'amar', 'kemon', 'achen', 'bhalo', 'valo', 'kaj', 'koren', 'korben',
    'banate', 'banabo', 'dorkar', 'chai', 'thikana', 'kothay', 'jogajog', 'shomoy',
    'bujhte', 'parlam', 'bolen', 'dekhi', 'shuru', 'korbo', 'dhonnobad',
    'vai', 'bhai', 'apni', 'tumi', 'kintu', 'ekta', 'akta', 'kotodin', 'parben',
    'kisu', 'kichu', 'amake', 'bolte', 'parba', 'keno', 'khub', 'dite', 'pari',
    'korte', 'apnake', 'tomake', 'tomader', 'somporke', 'somporkey', 'bolo', 'bolun',
    'kotha', 'janiye', 'dao', 'deo', 'shob', 'sob'
  ]);

  const cleanWords = lower.replace(/[^a-z0-9]/gi, ' ').split(/\s+/).filter(Boolean);
  let banglishMatch = false;
  for (const word of cleanWords) {
    if (banglishTokens.has(word)) {
      banglishMatch = true;
      break;
    }
  }
  if (banglishMatch) return 'banglish';

  // Default
  return 'en';
}

// ── Smart Fallbacks per Language ──────────────────────────────────────────────
const FALLBACKS = {
  en: {
    reply: `Thank you for reaching out! I am the **MerxoDev AI Assistant**.\n\nI can assist you with custom website development, SaaS web apps, e-commerce stores, pricing tiers (**BDT 1,000 – BDT 4,000**), and digital engineering solutions.\n\nCould you specify what kind of project you're planning, or feel free to connect directly with our developer on WhatsApp!`,
    suggestions: ['Website packages & pricing?', 'What services do you offer?', 'WhatsApp Lead Developer']
  },
  bn: {
    reply: `ধন্যবাদ আপনার বার্তার জন্য! আমি **MerxoDev AI Assistant**।\n\nআপনার যেকোনো ওয়েবসাইট ডেভেলপমেন্ট, SaaS ওয়েব অ্যাপ্লিকেশন, ই-কমার্স শপ এবং বাজেট প্যাকেজ (**১,০০০ টাকা থেকে ৪,০০০ টাকা**) সংক্রান্ত তথ্য দিতে আমি প্রস্তুত।\n\nআপনি কী ধরণের প্রোজেক্ট তৈরি করতে চাচ্ছেন তা জানাতে পারেন, অথবা সরাসরি আমাদের সাথে হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন।`,
    suggestions: ['ওয়েবসাইট প্যাকেজ ও দাম কত?', 'আপনারা কি কি সেবা দেন?', 'হোয়াটসঅ্যাপে কথা বলুন']
  },
  banglish: {
    reply: `Dhonnobad apnar message er jonno! Ami **MerxoDev AI Assistant**.\n\nApnar jekono website development, SaaS web app, ecommerce shop ebong budget package (**BDT 1,000 theke BDT 4,000**) niye ami help korte pari.\n\nApni ki dhoroner website ba software banate chan amake bolun, ba direct amader WhatsApp e kotha bolun!`,
    suggestions: ['Website package o koto taka lagbe?', 'Ki ki service den?', 'WhatsApp e jogajog']
  },
  ar: {
    reply: `شكرًا لتواصلك معنا! أنا **المساعد الذكي لـ MerxoDev**.\n\nيمكنني مساعدتك في كل ما يتعلق بتطوير مواقع الويب، تطبيقات الويب المخصصة (SaaS)، المتاجر الإلكترونية، وحزم الأسعار (**1,000 إلى 4,000 BDT**).\n\nهل يمكنك إخبارنا بنوع المشروع الذي ترغب في تنفيذه، أو يمكنك مراسلتنا مباشرة عبر واتساب!`,
    suggestions: ['ما هي أسعار وباقات المواقع؟', 'ما هي الخدمات التي تقدمونها؟', 'تواصل عبر واتساب']
  },
  hi: {
    reply: `संदेश भेजने के लिए धन्यवाद! मैं **MerxoDev AI सहायक** हूँ।\n\nमैं कस्टम वेबसाइट डेवलपमेंट, सास (SaaS) वेब ऐप्स, ई-कॉमर्स स्टोर्स और बजट पैकेज (**1,000 से 4,000 BDT**) के बारे में आपकी पूरी मदद कर सकता हूँ।\n\nकृपया बताएं कि आप किस प्रकार का प्रोजेक्ट बनाना चाहते हैं, या सीधे व्हाट्सएप पर हमारे डेवलपर से संपर्क करें!`,
    suggestions: ['वेबसाइट पैकेज और लागत?', 'आप क्या सेवाएं प्रदान करते हैं?', 'व्हाट्सएप पर संपर्क करें']
  },
  zh: {
    reply: `感谢您的咨询！我是 **MerxoDev 智能 AI 助理**。\n\n我可以为您提供定制网站开发、SaaS Web 应用、电商商城系统及超值套餐（**1,000 至 4,000 BDT**）的咨询与报价服务。\n\n请问您打算开发哪种类型的项目？您也可以直接通过 WhatsApp 与我们的工程师沟通！`,
    suggestions: ['网站开发套餐与价格？', '你们提供哪些核心服务？', 'WhatsApp 立即沟通']
  },
  es: {
    reply: `¡Gracias por contactarnos! Soy el **Asistente Virtual de MerxoDev**.\n\nPuedo ayudarte con desarrollo web a medida, aplicaciones SaaS, tiendas de comercio electrónico y paquetes de precios (**BDT 1,000 a BDT 4,000**).\n\n¿Qué tipo de proyecto deseas crear? ¡O también puedes escribirnos directamente por WhatsApp!`,
    suggestions: ['¿Precios y paquetes web?', '¿Qué servicios ofrecen?', 'Contactar por WhatsApp']
  },
  fr: {
    reply: `Merci pour votre message ! Je suis l'**Assistant IA de MerxoDev**.\n\nJe peux vous aider pour le développement de sites web sur mesure, applications SaaS, boutiques en ligne et nos forfaits (**1 000 à 4 000 BDT**).\n\nQuel type de projet souhaitez-vous créer ? Vous pouvez aussi nous joindre directement sur WhatsApp !`,
    suggestions: ['Tarifs et forfaits web ?', 'Quels services proposez-vous ?', 'Contacter sur WhatsApp']
  },
  de: {
    reply: `Vielen Dank für Ihre Nachricht! Ich bin der **MerxoDev KI-Assistent**.\n\nIch helfe Ihnen gerne bei Webentwicklung, SaaS-Anwendungen, Online-Shops und Preisangeboten (**1.000 bis 4.000 BDT**).\n\nWelche Art von Projekt möchten Sie umsetzen? Sie können uns auch direkt per WhatsApp kontaktieren!`,
    suggestions: ['Webseiten-Preise & Pakete?', 'Welche Services bieten Sie an?', 'WhatsApp Kontakt']
  }
};

import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    // Rate Limiting (Max 30 requests per minute per IP)
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`chat:${clientIp}`, { limit: 30, windowMs: 60 * 1000 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait a moment before sending another message.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const { message } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message is too long (maximum 1000 characters)' }, { status: 400 });
    }

    const trimmed = message.trim();
    const lower = trimmed.toLowerCase();
    const lang = detectLanguage(trimmed);

    // Find best match in knowledge base
    let bestMatch = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        const kwLower = kw.toLowerCase();
        if (lower.includes(kwLower)) {
          score += kw.length * 2;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // Default intelligent fallback if no direct match found
    if (!bestMatch || highestScore === 0) {
      const fallback = FALLBACKS[lang] || FALLBACKS.en;
      return NextResponse.json({
        reply: fallback.reply,
        actions: [
          { label: 'Explore All Services', href: '/services', type: 'link' },
          { label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' }
        ],
        suggestions: fallback.suggestions
      });
    }

    // Select the response in the matched language, or fallback safely
    let reply = bestMatch.response[lang];
    if (!reply) {
      if (lang === 'banglish') reply = bestMatch.response.banglish || bestMatch.response.bn || bestMatch.response.en;
      else if (lang === 'bn') reply = bestMatch.response.bn || bestMatch.response.en;
      else reply = bestMatch.response.en;
    }

    return NextResponse.json({
      reply,
      actions: bestMatch.actions || [],
      suggestions: bestMatch.suggestions || []
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      {
        reply: `I am experiencing a brief network delay. Please reach us directly on WhatsApp (${WHATSAPP_DISPLAY}).`
      },
      { status: 500 }
    );
  }
}
