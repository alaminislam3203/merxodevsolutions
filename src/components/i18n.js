import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      stats: {
        badge: 'Our Track Record',
        headingStart: 'Numbers that',
        headingEnd: 'speak for us',
        subtext:
          "We don't just promise results — here's what we've actually delivered for our clients.",
        items: [
          { value: 50, suffix: '+', label: 'Projects Completed' },
          { value: 30, suffix: '+', label: 'Happy Clients' },
          { value: 2, suffix: '+', label: 'Years Experience' },
          { value: 100, suffix: '%', label: 'Client Satisfaction' },
        ],
      },
      ecommerce: {
        breadcrumb: {
          home: 'Home',
          services: 'Services',
          current: 'E-commerce',
        },
        badge: 'E-commerce Development',
        heroTitleStart: 'Online stores that',
        heroTitleHighlight: 'actually sell.',
        heroDesc:
          'We build fast, secure, and beautiful e-commerce stores for Bangladeshi and global businesses — with the payment gateways and features your customers expect.',
        ctaStartStore: 'Start Your Store',
        ctaViewWork: 'View Past Work',
        stats: [
          { value: '30+', label: 'Stores Launched' },
          { value: '4.9★', label: 'Average Rating' },
          { value: '3×', label: 'Avg. Conversion Lift' },
          { value: '< 2s', label: 'Page Load Time' },
        ],
        features: {
          badge: 'What You Get',
          heading: 'Everything your store needs',
          items: [
            {
              title: 'Product Management',
              desc: 'Unlimited products, variants (size, color), stock tracking, bulk upload via CSV — all from a clean admin panel.',
            },
            {
              title: 'Payment Gateways',
              desc: 'bKash, Nagad, Rocket, Stripe, SSLCommerz — we integrate the payment methods your customers already trust.',
            },
            {
              title: 'Mobile-First Design',
              desc: 'Over 80% of Bangladeshi shoppers use mobile. Every store we build is pixel-perfect on phones first.',
            },
            {
              title: 'Secure Checkout',
              desc: 'SSL encryption, secure sessions, fraud protection, and PCI-compliant payment flows — zero compromise on security.',
            },
            {
              title: 'Smart Search & Filters',
              desc: 'Instant search, category filters, price range, ratings — customers find what they want in seconds.',
            },
            {
              title: 'Analytics & Reports',
              desc: 'Sales dashboard, revenue trends, best-selling products, customer data — everything you need to grow.',
            },
            {
              title: 'Order & Return Management',
              desc: 'Full order lifecycle — placed, processing, shipped, delivered. Return requests handled cleanly in the dashboard.',
            },
            {
              title: 'SEO Optimized',
              desc: 'Schema markup, sitemap, meta tags, fast Core Web Vitals — built to rank on Google from day one.',
            },
            {
              title: 'Inventory & Stock Control',
              desc: 'Low-stock alerts, auto-disable out-of-stock products, multi-warehouse support for growing businesses.',
            },
          ],
        },
        included: {
          badge: 'Full Package',
          heading: "What's included in every store",
          items: [
            'Custom storefront design (Figma → code)',
            'Product catalog with unlimited categories',
            'Shopping cart & wishlist',
            'Secure checkout with local & global payments',
            'Admin dashboard (orders, products, customers)',
            'Customer accounts & order history',
            'Promo codes & discount system',
            'Email notifications (order, shipping, invoice)',
            'SEO meta tags, sitemap & schema',
            'Google Analytics integration',
            'Mobile-first responsive layout',
            '3 months post-launch support',
          ],
        },
        process: {
          badge: 'How It Works',
          heading: 'From idea to live store',
          steps: [
            {
              title: 'Discovery Call',
              desc: 'We understand your products, target audience, and business goals.',
            },
            {
              title: 'Design in Figma',
              desc: 'Full storefront mockup — homepage, product page, cart, and checkout.',
            },
            {
              title: 'Development',
              desc: 'We build your store with clean Next.js code, hooked up to your chosen payment gateway.',
            },
            {
              title: 'Testing & QA',
              desc: 'Cross-device testing, checkout flow verification, and speed optimization.',
            },
            {
              title: 'Launch & Support',
              desc: 'We deploy, monitor, and stay available for 3 months post-launch.',
            },
          ],
        },
        tech: {
          badge: 'Tech Stack',
          heading: 'Tools we build with',
          categories: {
            Frontend: 'Frontend',
            Backend: 'Backend',
            Database: 'Database',
            Payments: 'Payments',
            Storage: 'Storage',
            Hosting: 'Hosting',
          },
        },
        faq: {
          badge: 'FAQ',
          heading: 'Common questions',
          items: [
            {
              q: 'Can you integrate bKash and Nagad?',
              a: 'Yes — we integrate bKash, Nagad, Rocket, SSLCommerz, and Stripe. We handle the entire API setup and testing.',
            },
            {
              q: 'How long does it take to build an e-commerce store?',
              a: 'A standard store takes 3–6 weeks depending on complexity. Custom features or large catalogs may take longer.',
            },
            {
              q: 'Will I be able to manage my store myself?',
              a: 'Absolutely. We build an easy-to-use admin panel so you can add products, manage orders, and update content without touching code.',
            },
            {
              q: 'Do you offer ongoing maintenance?',
              a: 'Yes — all our stores come with 3 months of free support. After that, we offer flexible maintenance packages.',
            },
            {
              q: 'Is the store mobile-friendly?',
              a: 'Every store we build is mobile-first. We test on real devices across Android and iOS before launch.',
            },
          ],
        },
        related: {
          badge: 'Related Services',
          heading: 'Often paired with',
          items: [
            { label: 'Payment Gateway' },
            { label: 'SEO Optimization' },
            { label: 'Admin Dashboard' },
          ],
        },
        cta: {
          heading: 'Ready to launch your store?',
          desc: "Tell us about your products and we'll build you a store that converts — no fluff, no templates, 100% custom.",
          getQuote: 'Get a Free Quote',
          allServices: 'All Services',
        },
      },

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
      stats: {
        badge: 'আমাদের অর্জন',
        headingStart: 'সংখ্যাগুলোই',
        headingEnd: 'আমাদের পরিচয়',
        subtext:
          'আমরা শুধু প্রতিশ্রুতি দিই না — এই হলো আমাদের ক্লায়েন্টদের জন্য আমরা প্রকৃতপক্ষে যা ডেলিভার করেছি।',
        items: [
          { value: 50, suffix: '+', label: 'সম্পন্ন প্রজেক্ট' },
          { value: 30, suffix: '+', label: 'সন্তুষ্ট ক্লায়েন্ট' },
          { value: 2, suffix: '+', label: 'বছরের অভিজ্ঞতা' },
          { value: 100, suffix: '%', label: 'ক্লায়েন্ট সন্তুষ্টি' },
        ],
      },
      ecommerce: {
        breadcrumb: {
          home: 'হোম',
          services: 'সার্ভিসেস',
          current: 'ই-কমার্স',
        },
        badge: 'ই-কমার্স ডেভেলপমেন্ট',
        heroTitleStart: 'এমন অনলাইন স্টোর যা',
        heroTitleHighlight: 'সত্যিই বিক্রি হয়।',
        heroDesc:
          'আমরা বাংলাদেশি ও আন্তর্জাতিক ব্যবসার জন্য দ্রুত, নিরাপদ ও সুন্দর ই-কমার্স স্টোর তৈরি করি — যেসব পেমেন্ট গেটওয়ে ও ফিচার আপনার কাস্টমাররা চায়, সেগুলো নিয়েই।',
        ctaStartStore: 'আপনার স্টোর শুরু করুন',
        ctaViewWork: 'আগের কাজ দেখুন',
        stats: [
          { value: '৩০+', label: 'লঞ্চ করা স্টোর' },
          { value: '৪.৯★', label: 'গড় রেটিং' },
          { value: '৩×', label: 'গড় কনভার্শন বৃদ্ধি' },
          { value: '< ২s', label: 'পেজ লোড টাইম' },
        ],
        features: {
          badge: 'আপনি যা পাচ্ছেন',
          heading: 'আপনার স্টোরের জন্য প্রয়োজনীয় সবকিছু',
          items: [
            {
              title: 'প্রোডাক্ট ম্যানেজমেন্ট',
              desc: 'আনলিমিটেড প্রোডাক্ট, ভ্যারিয়েন্ট (সাইজ, কালার), স্টক ট্র্যাকিং, CSV দিয়ে বাল্ক আপলোড — সবকিছু একটি ক্লিন অ্যাডমিন প্যানেল থেকে।',
            },
            {
              title: 'পেমেন্ট গেটওয়ে',
              desc: 'বিকাশ, নগদ, রকেট, Stripe, SSLCommerz — আপনার কাস্টমাররা যেসব পেমেন্ট মেথড বিশ্বাস করে, আমরা সেগুলোই ইন্টিগ্রেট করি।',
            },
            {
              title: 'মোবাইল-ফার্স্ট ডিজাইন',
              desc: '৮০%-এরও বেশি বাংলাদেশি ক্রেতা মোবাইল ব্যবহার করেন। আমরা যেকোনো স্টোর তৈরি করি প্রথমে মোবাইলের জন্য, পিক্সেল-পারফেক্ট করে।',
            },
            {
              title: 'নিরাপদ চেকআউট',
              desc: 'SSL এনক্রিপশন, সিকিউর সেশন, ফ্রড প্রোটেকশন এবং PCI-কমপ্লায়েন্ট পেমেন্ট ফ্লো — নিরাপত্তায় কোনো আপস নেই।',
            },
            {
              title: 'স্মার্ট সার্চ ও ফিল্টার',
              desc: 'ইনস্ট্যান্ট সার্চ, ক্যাটাগরি ফিল্টার, প্রাইস রেঞ্জ, রেটিং — কাস্টমাররা সেকেন্ডের মধ্যেই তাদের প্রয়োজনীয় জিনিস খুঁজে পায়।',
            },
            {
              title: 'অ্যানালিটিক্স ও রিপোর্ট',
              desc: 'সেলস ড্যাশবোর্ড, রেভিনিউ ট্রেন্ড, সবচেয়ে বেশি বিক্রি হওয়া প্রোডাক্ট, কাস্টমার ডেটা — বৃদ্ধির জন্য প্রয়োজনীয় সবকিছু।',
            },
            {
              title: 'অর্ডার ও রিটার্ন ম্যানেজমেন্ট',
              desc: 'সম্পূর্ণ অর্ডার লাইফসাইকেল — প্লেসড, প্রসেসিং, শিপড, ডেলিভারড। রিটার্ন রিকোয়েস্ট ড্যাশবোর্ড থেকেই সহজে হ্যান্ডেল করা যায়।',
            },
            {
              title: 'SEO অপ্টিমাইজড',
              desc: 'স্কিমা মার্কআপ, সাইটম্যাপ, মেটা ট্যাগ, দ্রুত Core Web Vitals — প্রথম দিন থেকেই গুগলে র‍্যাঙ্ক করার জন্য তৈরি।',
            },
            {
              title: 'ইনভেন্টরি ও স্টক কন্ট্রোল',
              desc: 'লো-স্টক অ্যালার্ট, স্টক শেষ হলে প্রোডাক্ট অটো-ডিজেবল, বাড়ন্ত ব্যবসার জন্য মাল্টি-ওয়্যারহাউজ সাপোর্ট।',
            },
          ],
        },
        included: {
          badge: 'ফুল প্যাকেজ',
          heading: 'প্রতিটি স্টোরে যা যা থাকছে',
          items: [
            'কাস্টম স্টোরফ্রন্ট ডিজাইন (Figma → কোড)',
            'আনলিমিটেড ক্যাটাগরি সহ প্রোডাক্ট ক্যাটালগ',
            'শপিং কার্ট ও উইশলিস্ট',
            'লোকাল ও গ্লোবাল পেমেন্ট সহ নিরাপদ চেকআউট',
            'অ্যাডমিন ড্যাশবোর্ড (অর্ডার, প্রোডাক্ট, কাস্টমার)',
            'কাস্টমার অ্যাকাউন্ট ও অর্ডার হিস্টোরি',
            'প্রোমো কোড ও ডিসকাউন্ট সিস্টেম',
            'ইমেইল নোটিফিকেশন (অর্ডার, শিপিং, ইনভয়েস)',
            'SEO মেটা ট্যাগ, সাইটম্যাপ ও স্কিমা',
            'গুগল অ্যানালিটিক্স ইন্টিগ্রেশন',
            'মোবাইল-ফার্স্ট রেসপনসিভ লেআউট',
            '৩ মাসের পোস্ট-লঞ্চ সাপোর্ট',
          ],
        },
        process: {
          badge: 'কীভাবে কাজ করি',
          heading: 'আইডিয়া থেকে লাইভ স্টোর পর্যন্ত',
          steps: [
            {
              title: 'ডিসকভারি কল',
              desc: 'আমরা আপনার প্রোডাক্ট, টার্গেট অডিয়েন্স এবং বিজনেস গোল বুঝি।',
            },
            {
              title: 'Figma-তে ডিজাইন',
              desc: 'সম্পূর্ণ স্টোরফ্রন্ট মকআপ — হোমপেজ, প্রোডাক্ট পেজ, কার্ট এবং চেকআউট।',
            },
            {
              title: 'ডেভেলপমেন্ট',
              desc: 'আমরা ক্লিন Next.js কোড দিয়ে আপনার স্টোর তৈরি করি, আপনার পছন্দের পেমেন্ট গেটওয়ের সাথে যুক্ত করে।',
            },
            {
              title: 'টেস্টিং ও QA',
              desc: 'ক্রস-ডিভাইস টেস্টিং, চেকআউট ফ্লো ভেরিফিকেশন এবং স্পিড অপ্টিমাইজেশন।',
            },
            {
              title: 'লঞ্চ ও সাপোর্ট',
              desc: 'আমরা ডিপ্লয় করি, মনিটর করি, এবং লঞ্চের পর ৩ মাস পাশে থাকি।',
            },
          ],
        },
        tech: {
          badge: 'টেক স্ট্যাক',
          heading: 'আমরা যেসব টুল দিয়ে তৈরি করি',
          categories: {
            Frontend: 'ফ্রন্টএন্ড',
            Backend: 'ব্যাকএন্ড',
            Database: 'ডেটাবেজ',
            Payments: 'পেমেন্ট',
            Storage: 'স্টোরেজ',
            Hosting: 'হোস্টিং',
          },
        },
        faq: {
          badge: 'FAQ',
          heading: 'সাধারণ প্রশ্ন',
          items: [
            {
              q: 'আপনারা কি বিকাশ ও নগদ ইন্টিগ্রেট করতে পারেন?',
              a: 'হ্যাঁ — আমরা বিকাশ, নগদ, রকেট, SSLCommerz এবং Stripe ইন্টিগ্রেট করি। সম্পূর্ণ API সেটআপ ও টেস্টিং আমরাই করি।',
            },
            {
              q: 'একটি ই-কমার্স স্টোর তৈরি করতে কত সময় লাগে?',
              a: 'একটি স্ট্যান্ডার্ড স্টোর তৈরি করতে কমপ্লেক্সিটি অনুযায়ী ৩–৬ সপ্তাহ লাগে। কাস্টম ফিচার বা বড় ক্যাটালগের ক্ষেত্রে বেশি সময় লাগতে পারে।',
            },
            {
              q: 'আমি কি নিজেই আমার স্টোর ম্যানেজ করতে পারব?',
              a: 'অবশ্যই। আমরা এমন একটি সহজ অ্যাডমিন প্যানেল তৈরি করি যাতে আপনি কোড না ছুঁয়েই প্রোডাক্ট যোগ করতে, অর্ডার ম্যানেজ করতে এবং কন্টেন্ট আপডেট করতে পারেন।',
            },
            {
              q: 'আপনারা কি চলমান মেইনটেনেন্স অফার করেন?',
              a: 'হ্যাঁ — আমাদের সব স্টোরে ৩ মাসের ফ্রি সাপোর্ট থাকে। এরপর আমরা ফ্লেক্সিবল মেইনটেনেন্স প্যাকেজ অফার করি।',
            },
            {
              q: 'স্টোরটি কি মোবাইল-ফ্রেন্ডলি?',
              a: 'আমরা যেকোনো স্টোর তৈরি করি মোবাইল-ফার্স্ট হিসেবে। লঞ্চের আগে Android ও iOS-এ রিয়েল ডিভাইসে আমরা টেস্ট করি।',
            },
          ],
        },
        related: {
          badge: 'সম্পর্কিত সার্ভিস',
          heading: 'প্রায়ই একসাথে নেওয়া হয়',
          items: [
            { label: 'পেমেন্ট গেটওয়ে' },
            { label: 'SEO অপ্টিমাইজেশন' },
            { label: 'অ্যাডমিন ড্যাশবোর্ড' },
          ],
        },
        cta: {
          heading: 'আপনার স্টোর লঞ্চ করার জন্য প্রস্তুত?',
          desc: 'আপনার প্রোডাক্ট সম্পর্কে আমাদের জানান, আমরা এমন একটি স্টোর তৈরি করব যা কনভার্ট করে — কোনো ফ্লাফ নয়, কোনো টেমপ্লেট নয়, ১০০% কাস্টম।',
          getQuote: 'ফ্রি কোট নিন',
          allServices: 'সব সার্ভিস',
        },
      },

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
      stats: {
        badge: 'سجلّنا الحافل',
        headingStart: 'أرقام',
        headingEnd: 'تتحدث عنّا',
        subtext: 'نحن لا نَعِد فقط — هذا ما قدّمناه فعليًا لعملائنا.',
        items: [
          { value: 50, suffix: '+', label: 'مشروع مكتمل' },
          { value: 30, suffix: '+', label: 'عميل سعيد' },
          { value: 2, suffix: '+', label: 'سنوات خبرة' },
          { value: 100, suffix: '%', label: 'رضا العملاء' },
        ],
      },
      ecommerce: {
        breadcrumb: {
          home: 'الرئيسية',
          services: 'الخدمات',
          current: 'التجارة الإلكترونية',
        },
        badge: 'تطوير التجارة الإلكترونية',
        heroTitleStart: 'متاجر إلكترونية',
        heroTitleHighlight: 'تبيع فعلًا.',
        heroDesc:
          'نبني متاجر إلكترونية سريعة وآمنة وجميلة للشركات في بنغلاديش والعالم — مزوّدة ببوابات الدفع والميزات التي يتوقعها عملاؤك.',
        ctaStartStore: 'ابدأ متجرك',
        ctaViewWork: 'شاهد أعمالنا السابقة',
        stats: [
          { value: '+30', label: 'متجر تم إطلاقه' },
          { value: '4.9★', label: 'متوسط التقييم' },
          { value: '×3', label: 'متوسط ارتفاع التحويل' },
          { value: '< 2s', label: 'زمن تحميل الصفحة' },
        ],
        features: {
          badge: 'ما الذي تحصل عليه',
          heading: 'كل ما يحتاجه متجرك',
          items: [
            {
              title: 'إدارة المنتجات',
              desc: 'منتجات غير محدودة، خيارات متعددة (الحجم، اللون)، تتبع المخزون، رفع جماعي عبر CSV — كل ذلك من لوحة تحكم واضحة.',
            },
            {
              title: 'بوابات الدفع',
              desc: 'bKash وNagad وRocket وStripe وSSLCommerz — ندمج طرق الدفع التي يثق بها عملاؤك بالفعل.',
            },
            {
              title: 'تصميم يراعي الجوال أولًا',
              desc: 'أكثر من 80% من المتسوقين في بنغلاديش يستخدمون الجوال. كل متجر نبنيه مصمم ليكون مثاليًا على الهاتف أولًا.',
            },
            {
              title: 'دفع آمن',
              desc: 'تشفير SSL، جلسات آمنة، حماية من الاحتيال، وتدفقات دفع متوافقة مع PCI — لا تنازل عن الأمان.',
            },
            {
              title: 'بحث وفلاتر ذكية',
              desc: 'بحث فوري، فلاتر للفئات، نطاق الأسعار، التقييمات — يجد العملاء ما يريدون خلال ثوانٍ.',
            },
            {
              title: 'تحليلات وتقارير',
              desc: 'لوحة مبيعات، اتجاهات الإيرادات، أفضل المنتجات مبيعًا، بيانات العملاء — كل ما تحتاجه للنمو.',
            },
            {
              title: 'إدارة الطلبات والإرجاع',
              desc: 'دورة حياة كاملة للطلب — تم الطلب، قيد المعالجة، تم الشحن، تم التسليم. طلبات الإرجاع تُدار بسهولة من لوحة التحكم.',
            },
            {
              title: 'محسّن لمحركات البحث',
              desc: 'بيانات Schema، خريطة الموقع، الوسوم الوصفية، Core Web Vitals سريعة — مبني للترتيب في جوجل من اليوم الأول.',
            },
            {
              title: 'التحكم في المخزون',
              desc: 'تنبيهات انخفاض المخزون، تعطيل تلقائي للمنتجات غير المتوفرة، ودعم لمستودعات متعددة للأعمال المتنامية.',
            },
          ],
        },
        included: {
          badge: 'باقة كاملة',
          heading: 'ما يتضمنه كل متجر',
          items: [
            'تصميم واجهة متجر مخصصة (Figma → كود)',
            'كتالوج منتجات بفئات غير محدودة',
            'سلة تسوق وقائمة أمنيات',
            'دفع آمن بطرق محلية وعالمية',
            'لوحة تحكم إدارية (الطلبات، المنتجات، العملاء)',
            'حسابات العملاء وسجل الطلبات',
            'أكواد ترويجية ونظام خصومات',
            'إشعارات بريد إلكتروني (الطلب، الشحن، الفاتورة)',
            'وسوم SEO وخريطة الموقع وبيانات Schema',
            'دمج مع Google Analytics',
            'تصميم متجاوب يراعي الجوال أولًا',
            'دعم فني لمدة 3 أشهر بعد الإطلاق',
          ],
        },
        process: {
          badge: 'كيف نعمل',
          heading: 'من الفكرة إلى متجر حقيقي',
          steps: [
            {
              title: 'مكالمة استكشافية',
              desc: 'نتعرف على منتجاتك وجمهورك المستهدف وأهداف عملك.',
            },
            {
              title: 'التصميم في Figma',
              desc: 'نموذج كامل لواجهة المتجر — الصفحة الرئيسية، صفحة المنتج، السلة، والدفع.',
            },
            {
              title: 'التطوير',
              desc: 'نبني متجرك بكود Next.js نظيف، مرتبط ببوابة الدفع التي تختارها.',
            },
            {
              title: 'الاختبار وضمان الجودة',
              desc: 'اختبار عبر أجهزة متعددة، التحقق من تدفق الدفع، وتحسين السرعة.',
            },
            {
              title: 'الإطلاق والدعم',
              desc: 'ننشر، نراقب، ونبقى متاحين لمدة 3 أشهر بعد الإطلاق.',
            },
          ],
        },
        tech: {
          badge: 'التقنيات المستخدمة',
          heading: 'الأدوات التي نبني بها',
          categories: {
            Frontend: 'الواجهة الأمامية',
            Backend: 'الخلفية',
            Database: 'قاعدة البيانات',
            Payments: 'الدفع',
            Storage: 'التخزين',
            Hosting: 'الاستضافة',
          },
        },
        faq: {
          badge: 'الأسئلة الشائعة',
          heading: 'أسئلة متكررة',
          items: [
            {
              q: 'هل يمكنكم دمج bKash وNagad؟',
              a: 'نعم — ندمج bKash وNagad وRocket وSSLCommerz وStripe. نتولى إعداد واختبار واجهات البرمجة بالكامل.',
            },
            {
              q: 'كم تستغرق عملية بناء متجر إلكتروني؟',
              a: 'يستغرق المتجر القياسي من 3 إلى 6 أسابيع حسب التعقيد. قد تستغرق الميزات المخصصة أو الكتالوجات الكبيرة وقتًا أطول.',
            },
            {
              q: 'هل سأتمكن من إدارة متجري بنفسي؟',
              a: 'بالتأكيد. نبني لوحة تحكم سهلة الاستخدام تتيح لك إضافة المنتجات وإدارة الطلبات وتحديث المحتوى دون لمس الكود.',
            },
            {
              q: 'هل تقدمون صيانة مستمرة؟',
              a: 'نعم — تأتي جميع متاجرنا مع 3 أشهر من الدعم المجاني. بعد ذلك، نقدم باقات صيانة مرنة.',
            },
            {
              q: 'هل المتجر متوافق مع الجوال؟',
              a: 'كل متجر نبنيه مصمم ليراعي الجوال أولًا. نختبره على أجهزة حقيقية بأنظمة Android وiOS قبل الإطلاق.',
            },
          ],
        },
        related: {
          badge: 'خدمات ذات صلة',
          heading: 'غالبًا ما تُطلب معًا',
          items: [
            { label: 'بوابة الدفع' },
            { label: 'تحسين محركات البحث' },
            { label: 'لوحة التحكم الإدارية' },
          ],
        },
        cta: {
          heading: 'هل أنت جاهز لإطلاق متجرك؟',
          desc: 'أخبرنا عن منتجاتك وسنبني لك متجرًا يحقق التحويلات — بلا حشو، بلا قوالب جاهزة، مخصص بنسبة 100%.',
          getQuote: 'احصل على عرض سعر مجاني',
          allServices: 'كل الخدمات',
        },
      },

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
      stats: {
        badge: '我们的成绩',
        headingStart: '用数据',
        headingEnd: '说话',
        subtext: '我们不只是承诺——这是我们为客户实际交付的成果。',
        items: [
          { value: 50, suffix: '+', label: '已完成项目' },
          { value: 30, suffix: '+', label: '满意客户' },
          { value: 2, suffix: '+', label: '年经验' },
          { value: 100, suffix: '%', label: '客户满意度' },
        ],
      },
      ecommerce: {
        breadcrumb: {
          home: '首页',
          services: '服务',
          current: '电子商务',
        },
        badge: '电子商务开发',
        heroTitleStart: '真正能卖货的',
        heroTitleHighlight: '在线商店。',
        heroDesc:
          '我们为孟加拉国及全球企业打造快速、安全、美观的电商网站——配备客户期待的支付方式和功能。',
        ctaStartStore: '开始建店',
        ctaViewWork: '查看过往案例',
        stats: [
          { value: '30+', label: '已上线商店' },
          { value: '4.9★', label: '平均评分' },
          { value: '3×', label: '平均转化提升' },
          { value: '< 2秒', label: '页面加载时间' },
        ],
        features: {
          badge: '您将获得',
          heading: '商店所需的一切',
          items: [
            {
              title: '商品管理',
              desc: '无限商品数量、款式选项（尺寸、颜色）、库存追踪、CSV批量上传——全部通过简洁的后台管理。',
            },
            {
              title: '支付网关',
              desc: 'bKash、Nagad、Rocket、Stripe、SSLCommerz——我们集成客户已经信任的支付方式。',
            },
            {
              title: '移动优先设计',
              desc: '超过80%的孟加拉国消费者使用手机购物。我们打造的每个商店都以手机端为优先，做到像素级精准。',
            },
            {
              title: '安全结账',
              desc: 'SSL加密、安全会话、防欺诈保护，以及符合PCI标准的支付流程——安全绝不妥协。',
            },
            {
              title: '智能搜索与筛选',
              desc: '即时搜索、分类筛选、价格区间、评分——顾客几秒钟内就能找到想要的商品。',
            },
            {
              title: '数据分析与报表',
              desc: '销售仪表盘、收入趋势、畅销商品、客户数据——业务增长所需的一切。',
            },
            {
              title: '订单与退换管理',
              desc: '完整订单生命周期——下单、处理中、已发货、已送达。退换货请求可在后台轻松处理。',
            },
            {
              title: 'SEO优化',
              desc: '结构化数据标记、站点地图、元标签、快速的Core Web Vitals——从第一天起就为谷歌排名而构建。',
            },
            {
              title: '库存管理',
              desc: '低库存提醒、缺货商品自动下架、支持多仓库，助力业务持续增长。',
            },
          ],
        },
        included: {
          badge: '完整套餐',
          heading: '每个商店都包含',
          items: [
            '定制店面设计（Figma → 代码）',
            '不限分类的商品目录',
            '购物车与收藏夹',
            '支持本地与国际支付的安全结账',
            '后台管理面板（订单、商品、客户）',
            '客户账户与订单历史',
            '优惠码与折扣系统',
            '邮件通知（订单、发货、发票）',
            'SEO元标签、站点地图与结构化数据',
            'Google Analytics集成',
            '移动优先的响应式布局',
            '上线后3个月技术支持',
          ],
        },
        process: {
          badge: '我们的流程',
          heading: '从创意到上线',
          steps: [
            {
              title: '需求沟通',
              desc: '了解您的产品、目标客户和业务目标。',
            },
            {
              title: 'Figma设计',
              desc: '完整的店面原型——首页、商品页、购物车与结账页面。',
            },
            {
              title: '开发实现',
              desc: '用简洁的Next.js代码搭建商店，并接入您选择的支付网关。',
            },
            {
              title: '测试与质量保证',
              desc: '跨设备测试、结账流程验证以及速度优化。',
            },
            {
              title: '上线与支持',
              desc: '我们负责部署、监控，并在上线后提供3个月的持续支持。',
            },
          ],
        },
        tech: {
          badge: '技术栈',
          heading: '我们使用的工具',
          categories: {
            Frontend: '前端',
            Backend: '后端',
            Database: '数据库',
            Payments: '支付',
            Storage: '存储',
            Hosting: '托管',
          },
        },
        faq: {
          badge: '常见问题',
          heading: '常见问题解答',
          items: [
            {
              q: '你们能集成bKash和Nagad吗？',
              a: '可以——我们集成bKash、Nagad、Rocket、SSLCommerz和Stripe，并负责全部API配置与测试。',
            },
            {
              q: '搭建一个电商网站需要多长时间？',
              a: '标准商店通常需要3至6周，具体取决于复杂程度。定制功能或大型商品目录可能需要更长时间。',
            },
            {
              q: '我自己能管理商店吗？',
              a: '当然可以。我们会搭建一个易用的后台管理面板，让您无需接触代码即可添加商品、管理订单和更新内容。',
            },
            {
              q: '你们提供持续维护服务吗？',
              a: '是的——所有商店都附带3个月的免费支持。之后我们提供灵活的维护套餐。',
            },
            {
              q: '商店对移动端友好吗？',
              a: '我们打造的每个商店都坚持移动优先。上线前会在真实的Android和iOS设备上进行测试。',
            },
          ],
        },
        related: {
          badge: '相关服务',
          heading: '常与此搭配',
          items: [
            { label: '支付网关' },
            { label: 'SEO优化' },
            { label: '后台管理面板' },
          ],
        },
        cta: {
          heading: '准备好上线您的商店了吗？',
          desc: '告诉我们您的产品，我们将为您打造一个真正能带来转化的商店——拒绝套话，拒绝模板，100%定制。',
          getQuote: '获取免费报价',
          allServices: '查看全部服务',
        },
      },

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
