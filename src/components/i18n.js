import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar
      home: 'Home',
      services: 'Services',
      journey: 'Journey',
      about: 'About',
      contact: 'Contact',
      projects: 'Projects',
      getInTouch: 'Get In Touch',
      callUs: 'Hire Us',
      navigation: 'Navigation',
      darkMode: 'Dark Mode',
      menu: 'Menu',

      // Hero
      hero: {
        badge: 'Available For New Projects',
        headingStart: 'We',
        headingHighlight: 'Build',
        headingMiddle: 'Digital Products',
        headingEnd: 'That Perform',
        subtext:
          'Custom websites, web apps & digital solutions — crafted with precision for startups and growing businesses.',
        ctaPrimary: 'Start a Project →',
        ctaSecondary: 'View Our Work',
        socialProof: 'Trusted by clients across 🇧🇩 Bangladesh & beyond',
      },

      // WhyUs
      whyUs: {
        badge: 'Why Choose Us',
        headingStart: 'Built Different.',
        headingEnd: 'Delivered Better.',
        subtext:
          "We don't just write code — we build digital products that drive real results for your business.",
        cta: 'Start Working With Us →',
        reasons: [
          {
            title: 'Fast Delivery',
            description:
              'We move quickly without cutting corners. Your project ships on time, every time.',
          },
          {
            title: 'Clean Code',
            description:
              'Scalable, maintainable, and well-documented code that your team can build on.',
          },
          {
            title: 'Reliable Support',
            description:
              'We stay with you after launch — bugs, updates, or new features, we have your back.',
          },
          {
            title: 'Modern Tech Stack',
            description:
              'Next.js, React, Node.js, Tailwind — we use the best tools to build the best products.',
          },
          {
            title: 'Client-First',
            description:
              'Your vision drives everything. We listen, understand, and build exactly what you need.',
          },
          {
            title: 'Transparent Pricing',
            description:
              'No hidden fees. Clear quotes, honest timelines, and value that exceeds the cost.',
          },
        ],
      },

      // Stats
      stats: {
        badge: 'Our Numbers',
        headingStart: 'Results That',
        headingEnd: 'Speak Loudly.',
        subtext:
          'Numbers that reflect our commitment to delivering quality and building lasting relationships.',
        items: [
          { value: 50, suffix: '+', label: 'Projects Completed' },
          { value: 30, suffix: '+', label: 'Happy Clients' },
          { value: 2, suffix: '+', label: 'Years Experience' },
          { value: 100, suffix: '%', label: 'Client Satisfaction' },
        ],
      },

      // Process
      process: {
        badge: 'How We Work',
        headingStart: 'Our',
        headingEnd: 'Process.',
        subtext:
          'A clear, proven process from idea to launch — transparent at every step.',
        steps: [
          {
            title: 'Discovery',
            description:
              'We understand your goals, audience, and project requirements in detail.',
          },
          {
            title: 'Design',
            description:
              'We craft beautiful, user-friendly interfaces tailored to your brand.',
          },
          {
            title: 'Build',
            description:
              'We develop your product with clean, scalable, and maintainable code.',
          },
          {
            title: 'Launch',
            description:
              'We deploy, test thoroughly, and launch your product to the world.',
          },
        ],
      },

      // Testimonials
      testimonials: {
        badge: 'Client Reviews',
        headingStart: 'What Clients',
        headingEnd: 'Say About Us.',
        subtext:
          'Real feedback from real clients who trusted us to build their digital products.',
        items: [
          {
            name: 'Rakibul Islam',
            position: 'CEO, TechStart BD',
            rating: 5,
            review:
              'MerxoDev delivered our platform ahead of schedule. The code quality was exceptional and the team was always responsive. Highly recommended!',
          },
          {
            name: 'Sarah Johnson',
            position: 'Founder, GrowthLab',
            rating: 5,
            review:
              'Working with MerxoDev was a pleasure. They understood our vision perfectly and built exactly what we needed. Professional and reliable.',
          },
          {
            name: 'Tanvir Ahmed',
            position: 'CTO, ShopEasy',
            rating: 5,
            review:
              'The best dev team we have worked with. Clean code, on-time delivery, and excellent post-launch support. Will definitely work again.',
          },
        ],
      },
    },
  },

  bn: {
    translation: {
      // Navbar
      home: 'হোম',
      services: 'সেবা',
      journey: 'যাত্রা',
      about: 'আমাদের',
      contact: 'যোগাযোগ',
      projects: 'প্রজেক্ট',
      getInTouch: 'যোগাযোগ করুন',
      callUs: 'কল করুন',
      navigation: 'নেভিগেশন',
      darkMode: 'ডার্ক মোড',
      menu: 'মেনু',

      // Hero
      hero: {
        badge: 'নতুন প্রজেক্টের জন্য প্রস্তুত',
        headingStart: 'আমরা',
        headingHighlight: 'তৈরি করি',
        headingMiddle: 'ডিজিটাল পণ্য',
        headingEnd: 'যা কাজ করে',
        subtext:
          'কাস্টম ওয়েবসাইট, ওয়েব অ্যাপ ও ডিজিটাল সমাধান — স্টার্টআপ ও বেড়ে ওঠা ব্যবসার জন্য নির্মিত।',
        ctaPrimary: 'প্রজেক্ট শুরু করুন →',
        ctaSecondary: 'আমাদের কাজ দেখুন',
        socialProof: '🇧🇩 বাংলাদেশ ও বিশ্বজুড়ে ক্লায়েন্টদের বিশ্বাস',
      },

      // WhyUs
      whyUs: {
        badge: 'কেন আমাদের বেছে নেবেন',
        headingStart: 'আলাদাভাবে তৈরি।',
        headingEnd: 'আরও ভালোভাবে ডেলিভারি।',
        subtext:
          'আমরা শুধু কোড লিখি না — আমরা এমন ডিজিটাল পণ্য তৈরি করি যা আপনার ব্যবসায় সত্যিকারের ফলাফল দেয়।',
        cta: 'আমাদের সাথে কাজ শুরু করুন →',
        reasons: [
          {
            title: 'দ্রুত ডেলিভারি',
            description:
              'আমরা দ্রুত কাজ করি কিন্তু মান বজায় রাখি। আপনার প্রজেক্ট সময়মতো ডেলিভারি হবে।',
          },
          {
            title: 'পরিষ্কার কোড',
            description:
              'স্কেলযোগ্য, রক্ষণযোগ্য এবং ভালো ডকুমেন্টেড কোড যা আপনার টিম ব্যবহার করতে পারবে।',
          },
          {
            title: 'নির্ভরযোগ্য সাপোর্ট',
            description:
              'লঞ্চের পরেও আমরা আপনার পাশে থাকি — বাগ, আপডেট বা নতুন ফিচার, সবকিছুতে।',
          },
          {
            title: 'আধুনিক টেক স্ট্যাক',
            description:
              'Next.js, React, Node.js, Tailwind — সেরা টুল দিয়ে সেরা পণ্য তৈরি করি।',
          },
          {
            title: 'ক্লায়েন্ট-প্রথম',
            description:
              'আপনার ভিশনই আমাদের চালিকাশক্তি। আমরা শুনি, বুঝি এবং ঠিক সেটাই তৈরি করি।',
          },
          {
            title: 'স্বচ্ছ মূল্য নির্ধারণ',
            description:
              'কোনো লুকানো চার্জ নেই। পরিষ্কার কোটেশন, সৎ সময়সীমা এবং খরচের চেয়ে বেশি মূল্য।',
          },
        ],
      },

      // Stats
      stats: {
        badge: 'আমাদের সংখ্যা',
        headingStart: 'ফলাফল যা',
        headingEnd: 'জোরে কথা বলে।',
        subtext:
          'সংখ্যাগুলো আমাদের মানসম্পন্ন ডেলিভারি এবং দীর্ঘস্থায়ী সম্পর্ক গড়ার প্রতিশ্রুতি প্রতিফলিত করে।',
        items: [
          { value: 50, suffix: '+', label: 'সম্পন্ন প্রজেক্ট' },
          { value: 30, suffix: '+', label: 'সন্তুষ্ট ক্লায়েন্ট' },
          { value: 2, suffix: '+', label: 'বছরের অভিজ্ঞতা' },
          { value: 100, suffix: '%', label: 'ক্লায়েন্ট সন্তুষ্টি' },
        ],
      },

      // Process
      process: {
        badge: 'আমরা কীভাবে কাজ করি',
        headingStart: 'আমাদের',
        headingEnd: 'প্রক্রিয়া।',
        subtext:
          'ধারণা থেকে লঞ্চ পর্যন্ত একটি স্পষ্ট, প্রমাণিত প্রক্রিয়া — প্রতিটি ধাপে স্বচ্ছ।',
        steps: [
          {
            title: 'আবিষ্কার',
            description:
              'আমরা আপনার লক্ষ্য, দর্শক এবং প্রজেক্টের প্রয়োজনীয়তা বিস্তারিতভাবে বুঝি।',
          },
          {
            title: 'ডিজাইন',
            description:
              'আমরা আপনার ব্র্যান্ডের সাথে মানানসই সুন্দর, ব্যবহারকারী-বান্ধব ইন্টারফেস তৈরি করি।',
          },
          {
            title: 'নির্মাণ',
            description:
              'আমরা পরিষ্কার, স্কেলযোগ্য এবং রক্ষণযোগ্য কোড দিয়ে আপনার পণ্য তৈরি করি।',
          },
          {
            title: 'লঞ্চ',
            description:
              'আমরা ডেপ্লয় করি, পুঙ্খানুপুঙ্খভাবে পরীক্ষা করি এবং আপনার পণ্য বিশ্বে লঞ্চ করি।',
          },
        ],
      },

      // Testimonials
      testimonials: {
        badge: 'ক্লায়েন্ট রিভিউ',
        headingStart: 'ক্লায়েন্টরা',
        headingEnd: 'কী বলেন।',
        subtext:
          'যেসব ক্লায়েন্ট আমাদের উপর আস্থা রেখেছেন তাদের সত্যিকারের মতামত।',
        items: [
          {
            name: 'রাকিবুল ইসলাম',
            position: 'সিইও, টেকস্টার্ট বিডি',
            rating: 5,
            review:
              'MerxoDev নির্ধারিত সময়ের আগেই আমাদের প্ল্যাটফর্ম ডেলিভারি দিয়েছে। কোডের মান ছিল অসাধারণ এবং টিম সবসময় সাড়া দিয়েছে। অত্যন্ত প্রশংসনীয়!',
          },
          {
            name: 'সারাহ জনসন',
            position: 'প্রতিষ্ঠাতা, গ্রোথল্যাব',
            rating: 5,
            review:
              'MerxoDev-এর সাথে কাজ করা আনন্দদায়ক ছিল। তারা আমাদের ভিশন নিখুঁতভাবে বুঝেছে এবং ঠিক যা দরকার তাই তৈরি করেছে।',
          },
          {
            name: 'তানভীর আহমেদ',
            position: 'সিটিও, শপইজি',
            rating: 5,
            review:
              'আমরা যে সেরা ডেভ টিমের সাথে কাজ করেছি। পরিষ্কার কোড, সময়মতো ডেলিভারি এবং চমৎকার পোস্ট-লঞ্চ সাপোর্ট। অবশ্যই আবার কাজ করব।',
          },
        ],
      },
    },
  },

  ar: {
    translation: {
      // Navbar
      home: 'الرئيسية',
      services: 'الخدمات',
      journey: 'رحلتنا',
      about: 'من نحن',
      contact: 'اتصل بنا',
      projects: 'المشاريع',
      getInTouch: 'تواصل معنا',
      callUs: 'اتصل بنا',
      navigation: 'التنقل',
      darkMode: 'الوضع الداكن',
      menu: 'القائمة',

      // Hero
      hero: {
        badge: 'متاح لمشاريع جديدة',
        headingStart: 'نحن',
        headingHighlight: 'نبني',
        headingMiddle: 'منتجات رقمية',
        headingEnd: 'تُحقق النتائج',
        subtext:
          'مواقع مخصصة، تطبيقات ويب وحلول رقمية — مصممة بدقة للشركات الناشئة والمتنامية.',
        ctaPrimary: 'ابدأ مشروعك →',
        ctaSecondary: 'شاهد أعمالنا',
        socialProof: 'موثوق به من عملاء حول العالم 🌍',
      },

      // WhyUs
      whyUs: {
        badge: 'لماذا تختارنا',
        headingStart: 'مختلفون في البناء.',
        headingEnd: 'أفضل في التسليم.',
        subtext:
          'لا نكتب الكود فحسب — نبني منتجات رقمية تحقق نتائج حقيقية لعملك.',
        cta: 'ابدأ العمل معنا →',
        reasons: [
          {
            title: 'تسليم سريع',
            description:
              'نعمل بسرعة دون التنازل عن الجودة. مشروعك يُسلَّم في الوقت المحدد دائمًا.',
          },
          {
            title: 'كود نظيف',
            description:
              'كود قابل للتوسع والصيانة وموثق جيدًا يمكن لفريقك البناء عليه.',
          },
          {
            title: 'دعم موثوق',
            description:
              'نبقى معك بعد الإطلاق — أخطاء، تحديثات، أو ميزات جديدة، نحن هنا.',
          },
          {
            title: 'تقنيات حديثة',
            description:
              'Next.js، React، Node.js، Tailwind — نستخدم أفضل الأدوات لبناء أفضل المنتجات.',
          },
          {
            title: 'العميل أولاً',
            description:
              'رؤيتك تقود كل شيء. نستمع ونفهم ونبني بالضبط ما تحتاجه.',
          },
          {
            title: 'أسعار شفافة',
            description:
              'لا رسوم خفية. عروض أسعار واضحة، جداول زمنية صادقة، وقيمة تتجاوز التكلفة.',
          },
        ],
      },

      // Stats
      stats: {
        badge: 'أرقامنا',
        headingStart: 'نتائج',
        headingEnd: 'تتحدث بصوت عالٍ.',
        subtext: 'أرقام تعكس التزامنا بتقديم الجودة وبناء علاقات دائمة.',
        items: [
          { value: 50, suffix: '+', label: 'مشروع مكتمل' },
          { value: 30, suffix: '+', label: 'عميل سعيد' },
          { value: 2, suffix: '+', label: 'سنوات خبرة' },
          { value: 100, suffix: '%', label: 'رضا العملاء' },
        ],
      },

      // Process
      process: {
        badge: 'كيف نعمل',
        headingStart: 'عمليتنا',
        headingEnd: 'المثبتة.',
        subtext: 'عملية واضحة ومثبتة من الفكرة حتى الإطلاق — شفافة في كل خطوة.',
        steps: [
          {
            title: 'الاكتشاف',
            description: 'نفهم أهدافك وجمهورك ومتطلبات مشروعك بالتفصيل.',
          },
          {
            title: 'التصميم',
            description:
              'نصمم واجهات جميلة وسهلة الاستخدام مصممة لعلامتك التجارية.',
          },
          {
            title: 'البناء',
            description: 'نطور منتجك بكود نظيف وقابل للتوسع والصيانة.',
          },
          {
            title: 'الإطلاق',
            description: 'ننشر ونختبر بدقة ونطلق منتجك للعالم.',
          },
        ],
      },

      // Testimonials
      testimonials: {
        badge: 'آراء العملاء',
        headingStart: 'ماذا يقول',
        headingEnd: 'عملاؤنا.',
        subtext:
          'تقييمات حقيقية من عملاء حقيقيين وثقوا بنا لبناء منتجاتهم الرقمية.',
        items: [
          {
            name: 'رکیب الاسلام',
            position: 'الرئيس التنفيذي، تيك ستارت',
            rating: 5,
            review:
              'سلّم MerxoDev منصتنا قبل الموعد المحدد. كانت جودة الكود استثنائية والفريق كان دائم الاستجابة. أنصح به بشدة!',
          },
          {
            name: 'سارة جونسون',
            position: 'المؤسسة، جروث لاب',
            rating: 5,
            review:
              'كان العمل مع MerxoDev ممتعاً. فهموا رؤيتنا تماماً وبنوا بالضبط ما نحتاجه. احترافي وموثوق.',
          },
          {
            name: 'تنویر احمد',
            position: 'المدير التقني، شوب ايزي',
            rating: 5,
            review:
              'أفضل فريق تطوير عملنا معه. كود نظيف، تسليم في الوقت المحدد، ودعم ممتاز بعد الإطلاق. سنعمل معهم بالتأكيد مجدداً.',
          },
        ],
      },
    },
  },

  zh: {
    translation: {
      // Navbar
      home: '首页',
      services: '服务',
      journey: '历程',
      about: '关于',
      contact: '联系',
      projects: '项目',
      getInTouch: '联系我们',
      callUs: '致电我们',
      navigation: '导航',
      darkMode: '深色模式',
      menu: '菜单',

      // Hero
      hero: {
        badge: '开放新项目合作',
        headingStart: '我们',
        headingHighlight: '打造',
        headingMiddle: '数字产品',
        headingEnd: '创造卓越表现',
        subtext:
          '定制网站、网络应用和数字解决方案 — 为初创企业和成长型企业精心打造。',
        ctaPrimary: '开始项目 →',
        ctaSecondary: '查看我们的作品',
        socialProof: '受到全球客户的信赖 🌏',
      },

      // WhyUs
      whyUs: {
        badge: '为什么选择我们',
        headingStart: '与众不同的构建。',
        headingEnd: '更好的交付。',
        subtext:
          '我们不只是写代码 — 我们构建能为您的业务带来真实成果的数字产品。',
        cta: '开始与我们合作 →',
        reasons: [
          {
            title: '快速交付',
            description:
              '我们快速行动，但不以牺牲质量为代价。您的项目始终按时交付。',
          },
          {
            title: '简洁代码',
            description:
              '可扩展、可维护且文档齐全的代码，您的团队可以在此基础上继续构建。',
          },
          {
            title: '可靠支持',
            description:
              '上线后我们依然陪伴您 — 无论是Bug修复、更新还是新功能，我们随时在。',
          },
          {
            title: '现代技术栈',
            description:
              'Next.js、React、Node.js、Tailwind — 我们用最好的工具构建最好的产品。',
          },
          {
            title: '客户至上',
            description:
              '您的愿景驱动一切。我们倾听、理解，并构建您真正需要的产品。',
          },
          {
            title: '透明定价',
            description:
              '没有隐藏费用。清晰的报价、诚实的时间表，价值超越成本。',
          },
        ],
      },

      // Stats
      stats: {
        badge: '我们的数据',
        headingStart: '成果',
        headingEnd: '大声说话。',
        subtext: '这些数字反映了我们对高质量交付和建立持久关系的承诺。',
        items: [
          { value: 50, suffix: '+', label: '完成项目' },
          { value: 30, suffix: '+', label: '满意客户' },
          { value: 2, suffix: '+', label: '年经验' },
          { value: 100, suffix: '%', label: '客户满意度' },
        ],
      },

      // Process
      process: {
        badge: '我们如何工作',
        headingStart: '我们的',
        headingEnd: '流程。',
        subtext: '从创意到发布的清晰、经过验证的流程 — 每一步都透明。',
        steps: [
          {
            title: '发现',
            description: '我们详细了解您的目标、受众和项目需求。',
          },
          {
            title: '设计',
            description: '我们为您的品牌量身定制美观、用户友好的界面。',
          },
          {
            title: '构建',
            description: '我们使用简洁、可扩展且可维护的代码开发您的产品。',
          },
          {
            title: '发布',
            description: '我们部署、彻底测试并向世界发布您的产品。',
          },
        ],
      },

      // Testimonials
      testimonials: {
        badge: '客户评价',
        headingStart: '客户',
        headingEnd: '怎么说。',
        subtext: '来自真实客户的真实反馈，他们信任我们构建他们的数字产品。',
        items: [
          {
            name: 'Rakibul Islam',
            position: '首席执行官，TechStart BD',
            rating: 5,
            review:
              'MerxoDev提前交付了我们的平台。代码质量非常出色，团队始终保持响应。强烈推荐！',
          },
          {
            name: 'Sarah Johnson',
            position: '创始人，GrowthLab',
            rating: 5,
            review:
              '与MerxoDev合作非常愉快。他们完美理解了我们的愿景，构建了我们所需的一切。专业可靠。',
          },
          {
            name: 'Tanvir Ahmed',
            position: '首席技术官，ShopEasy',
            rating: 5,
            review:
              '我们合作过的最好的开发团队。代码简洁，按时交付，发布后支持出色。一定会再次合作。',
          },
        ],
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
