import { NextResponse } from 'next/server';

// ── Smart Domain Knowledge Engine for MerxoDev Solutions ───────────────
const KNOWLEDGE_BASE = [
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'budget', 'rate', 'khoroch', 'taka', 'bdt', 'দাম', 'খরচ', 'টাকা', 'বাজেট', 'প্যাকেজ', 'মূল্য'],
    response: {
      en: "Our standard pricing across digital services ranges strictly between **BDT 1,000 and BDT 4,000** for standard packages, and custom quotes for enterprise architecture.\n\n• **Starter Services:** BDT 1,000 – BDT 1,500 (Landing pages, basic SEO, bug fixes, maintenance)\n• **Professional Tier:** BDT 2,000 – BDT 3,000 (Full responsive websites, API integration, database design)\n• **Advanced & SaaS:** BDT 3,500 – BDT 4,000 (Custom Web Apps, Ecommerce store with payment gateways)",
      bn: "আমাদের সকল ডিজিটাল সার্ভিসের মূল্য অত্যন্ত সাশ্রয়ী এবং প্যাকেজ ভেদে **১,০০০ টাকা থেকে ৪,০০০ টাকার মধ্যে** নির্ধারিত:\n\n• **স্টার্টার প্যাকেজ:** ১,০০০ - ১,৫০০ টাকা (ল্যান্ডিং পেজ, বেসিক এসইও, মেইনটেন্যান্স)\n• **প্রফেশনাল প্যাকেজ:** ২,০০০ - ৩,০০০ টাকা (রেসপন্সিভ ওয়েবসাইট, এপিআই ইন্টিগ্রেশন, ডাটাবেস ডিজাইন)\n• **অ্যাডভান্সড / ওয়েব অ্যাপ:** ৩,৫০০ - ৪,০০০ টাকা (ই-কমার্স শপ, ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন)",
    },
    actions: [
      { label: 'View Services & Pricing', href: '/services', type: 'link' },
      { label: 'Get Custom Quote', href: '/contact', type: 'link' },
    ],
    suggestions: ['Web Development Package?', 'How to order a project?', 'WhatsApp Contact']
  },
  {
    id: 'services',
    keywords: ['service', 'services', 'offer', 'kaj', 'ki ki koren', 'service ki', 'সার্ভিস', 'সেবা', 'কাজ', 'কি কি সেবা দেন'],
    response: {
      en: "MerxoDev Solutions provides 10 core digital engineering services:\n\n1. **Web Development** (Next.js, React, Tailwind)\n2. **Custom Web Applications & SaaS**\n3. **Ecommerce Platforms** (Cart, Checkout, Admin)\n4. **UI/UX Design** (Figma to pixel-perfect code)\n5. **SEO & Growth Optimization**\n6. **API Development & Integration**\n7. **Cybersecurity & Auth Systems**\n8. **Payment Gateway Integration** (bKash, Nagad, Stripe, SSLCommerz)\n9. **Database Architecture & Optimization**\n10. **Maintenance, Speed & Security Audits**",
      bn: "MerxoDev Solutions-এ আমরা ১০টি প্রধান ডিজিটাল সেবা দিয়ে থাকি:\n\n১. **ওয়েব ডেভেলপমেন্ট** (Next.js, React, Tailwind)\n২. **কাস্টম ওয়েব অ্যাপ্লিকেশন ও SaaS**\n৩. **ই-কমার্স সলিউশন** (কার্ট, পেমেন্ট, অ্যাডমিন প্যানেল)\n৪. **UI/UX ডিজাইন** (Figma থেকে ক্লিন ডিজাইন)\n৫. **এসইও ও র‍্যাঙ্কিং অপ্টিমাইজেশন**\n৬. **API ডেভেলপমেন্ট ও ইন্টিগ্রেশন**\n৭. **সাইবার সিকিউরিটি ও ব্যাকআপ**\n৮. **পেমেন্ট গেটওয়ে ইন্টিগ্রেশন** (বিকাশ, নগদ, রকেট, স্ট্রাইপ)\n৯. **ডাটাবেস আর্কিটেকচার ও ম্যানেজমেন্ট**\n১০. **ওয়েবসাইট মেইনটেন্যান্স ও স্পিড অপ্টিমাইজেশন**",
    },
    actions: [
      { label: 'Explore All Services', href: '/services', type: 'link' },
      { label: 'View Our Projects', href: '/our-projects', type: 'link' },
    ],
    suggestions: ['Web Development pricing?', 'Payment Gateway Integration?', 'Contact Lead Developer']
  },
  {
    id: 'web_dev',
    keywords: ['web', 'website', 'web dev', 'web development', 'frontend', 'ওয়েবসাইট', 'ওয়েব ডেভেলপমেন্ট', 'সাইট বানাতে চাই'],
    response: {
      en: "We build ultra-fast, modern websites using **Next.js 16, React, Tailwind CSS, and Node.js**.\n\n• **Starter (BDT 1,000 - 1,500):** Clean high-converting landing page, responsive, SEO ready.\n• **Business (BDT 2,500 - 3,500):** Multi-page corporate website, CMS integration, animations, fast loading.",
      bn: "আমরা **Next.js 16, React এবং Tailwind CSS** ব্যবহার করে সুপার-ফাস্ট আধুনিক ওয়েবসাইট তৈরি করি।\n\n• **স্টার্টার (১,০০০ - ১,৫০০ টাকা):** হাই-কনভার্টিং ল্যান্ডিং পেজ, ফুল মোবাইল ফ্রেন্ডলি ও এসইও রেডি।\n• **বিজনেস (২,৫০০ - ৩,৫০০ টাকা):** মাল্টি-পেজ ওয়েবসাইট, কাস্টম অ্যাডমিন ও প্রিমিয়াম ডিজাইন।",
    },
    actions: [
      { label: 'Web Dev Details', href: '/services-web', type: 'link' },
      { label: 'Start Web Project', href: '/contact?service=Web%20Development', type: 'link' }
    ],
    suggestions: ['See Web Projects', 'What is the delivery time?', 'Order on WhatsApp']
  },
  {
    id: 'ecommerce',
    keywords: ['ecommerce', 'e-commerce', 'shop', 'store', 'online shop', 'ইকমার্স', 'দোকান', 'অনলাইন শপ', 'দোকানের ওয়েবসাইট'],
    response: {
      en: "Our custom Ecommerce solutions come equipped with:\n\n• Product management & inventory tracking\n• Seamless payment gateway (bKash, Nagad, Cards)\n• Automated order notifications & customer invoices\n• Lightning fast mobile shopping experience\n\n**Pricing:** BDT 2,500 to BDT 4,000 based on scale.",
      bn: "আমাদের ই-কমার্স সলিউশনে আপনি পাবেন:\n\n• প্রোডাক্ট আপলোড ও স্টক ম্যানেজমেন্ট\n• বিকাশ, নগদ ও কার্ড পেমেন্ট গেটওয়ে\n• স্বয়ংক্রিয় অর্ডার নোটিফিকেশন ও ইনভয়েস\n• সুপার-ফাস্ট মোবাইল এক্সপেরিয়েন্স\n\n**মূল্য:** ২,৫০০ টাকা থেকে ৪,০০০ টাকা।",
    },
    actions: [
      { label: 'Ecommerce Services', href: '/services-ecommerce', type: 'link' },
      { label: 'Build Your Store', href: '/contact?service=E-commerce%20Solutions', type: 'link' }
    ],
    suggestions: ['Payment Gateway Support?', 'See live store demo', 'Pricing packages?']
  },
  {
    id: 'payment_gateway',
    keywords: ['payment', 'gateway', 'bkash', 'nagad', 'rocket', 'stripe', 'sslcommerz', 'পেমেন্ট', 'বিকাশ', 'নগদ', 'পেমেন্ট গেটওয়ে'],
    response: {
      en: "We integrate direct merchant & tokenized payment gateways including **bKash, Nagad, Rocket, Upay, SSLCommerz, Shurjopay, and Stripe** with instant webhook verification and automatic receipt generation.",
      bn: "আমরা **বিকাশ, নগদ, রকেট, উপায়, SSLCommerz এবং Stripe** পেমেন্ট গেটওয়ে সরাসরি আপনার ওয়েবসাইটে ইন্টিগ্রেট করে দিই। এতে কাস্টমার পেমেন্ট করার সাথে সাথেই ইনস্ট্যান্ট ভেরিফিকেশন ও অর্ডার কনফার্মেশন পাওয়া যায়।",
    },
    actions: [
      { label: 'Payment Gateway Service', href: '/services-payment-gateway', type: 'link' },
    ],
    suggestions: ['Ecommerce pricing?', 'Contact us for integration', 'How long does it take?']
  },
  {
    id: 'contact_hire',
    keywords: ['contact', 'hire', 'phone', 'number', 'call', 'whatsapp', 'email', 'jogajog', 'thikana', 'kothay', 'যোগাযোগ', 'ফোন', 'নাম্বার', 'হায়্যার', 'ঠিকানা'],
    response: {
      en: "You can reach out to our core engineering team directly:\n\n📞 **Phone / WhatsApp:** [+880 1868-300958](https://wa.me/8801868300958)\n✉️ **Email:** support@merxodevsolutions.pro.bd\n📍 **Location:** Rangpur, Bangladesh\n⏱️ **Availability:** 24/7 Client Consultation",
      bn: "আমাদের সাথে সরাসরি যোগাযোগ করার মাধ্যমসমূহ:\n\n📞 **ফোন / হোয়াটসঅ্যাপ:** [+880 1868-300958](https://wa.me/8801868300958)\n✉️ **ইমেইল:** support@merxodevsolutions.pro.bd\n📍 **ঠিকানা:** রংপুর, বাংলাদেশ\n⏱️ **সার্ভিস টাইম:** ২৪/৭ সার্বক্ষণিক সাপোর্ট",
    },
    actions: [
      { label: 'Chat on WhatsApp', href: 'https://wa.me/8801868300958', type: 'external' },
      { label: 'Send Direct Message', href: '/contact', type: 'link' }
    ],
    suggestions: ['View Portfolio Projects', 'Pricing Range', 'Our Team & Journey']
  },
  {
    id: 'timeline',
    keywords: ['time', 'delivery', 'koto din', 'shomoy', 'deadline', 'কত দিন', 'সময়', 'ডেলিভারি টাইম'],
    response: {
      en: "Our typical delivery timelines:\n\n• **Landing Page / Bug Fixes:** 24 to 48 Hours\n• **Complete Business Website:** 3 to 7 Days\n• **Full Web App / Ecommerce:** 7 to 14 Days\n\nWe provide real-time staging previews throughout the development process.",
      bn: "আমাদের প্রজেক্ট ডেলিভারি টাইমলাইন:\n\n• **ল্যান্ডিং পেজ / ছোট কাজ:** ২৪ থেকে ৪৮ ঘণ্টা\n• **কমপ্লিট বিজনেস ওয়েবসাইট:** ৩ থেকে ৭ দিন\n• **ফুল ওয়েব অ্যাপ্লিকেশন / ই-কমার্স:** ৭ থেকে ১৪ দিন\n\nকাজ চলাকালীন আপনি সার্বক্ষণিক লাইভ প্রিভিউ দেখতে পাবেন।",
    },
    actions: [
      { label: 'Discuss Your Project', href: '/contact', type: 'link' }
    ],
    suggestions: ['What technologies do you use?', 'Pricing details', 'WhatsApp Contact']
  },
  {
    id: 'tech_stack',
    keywords: ['tech', 'technology', 'stack', 'framework', 'nextjs', 'react', 'tailwind', 'database', 'টেকনোলজি', 'কী দিয়ে বানান'],
    response: {
      en: "We engineer products using top-tier modern technologies:\n\n• **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, GSAP, Framer Motion\n• **Backend & APIs:** Node.js, Next.js Server Actions, REST, GraphQL\n• **Databases:** PostgreSQL, Prisma ORM, MongoDB, Supabase, Neon\n• **Cloud & Hosting:** Vercel, AWS, Cloudflare",
      bn: "আমরা বিশ্বের আধুনিকতম টেকনোলজি স্ট্যাক ব্যবহার করি:\n\n• **ফ্রন্টএন্ড:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **ব্যাকএন্ড ও API:** Node.js, Next.js Server Functions, REST APIs\n• **ডাটাবেস:** PostgreSQL, Prisma ORM, MongoDB, Neon\n• **হোস্টিং ও ক্লাউড:** Vercel, AWS, Cloudflare",
    },
    actions: [
      { label: 'View Our Projects', href: '/our-projects', type: 'link' }
    ],
    suggestions: ['Web Application pricing?', 'View team background', 'Contact us']
  }
];

// Simple Language Detector (Bangla characters or common phonetic words)
function detectLanguage(text) {
  const banglaRegex = /[\u0980-\u09FF]/;
  if (banglaRegex.test(text)) return 'bn';
  
  const banglishWords = ['koto', 'taka', 'kemon', 'ki', 'bhalo', 'kore', 'kaj', 'apnader', 'kothay', 'thikana', 'khoroch', 'chai', 'parben'];
  const lower = text.toLowerCase();
  if (banglishWords.some(w => lower.includes(w))) return 'bn';
  
  return 'en';
}

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
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
        if (lower.includes(kw.toLowerCase())) {
          score += kw.length; // prioritize longer, more specific keyword matches
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // Default intelligent fallback if no direct match
    if (!bestMatch || highestScore === 0) {
      const fallbackResponse = lang === 'bn'
        ? `ধন্যবাদ আপনার মেসেজের জন্য! আমি **MerxoDev AI Assistant**। আপনার যেকোনো প্রজেক্ট তৈরি, বাজেট বা সার্ভিসের ব্যাপারে আমি সাহায্য করতে পারি।\n\nআপনি কী ধরনের ওয়েবসাইট বা অ্যাপ্লিকেশন বানাতে চাচ্ছেন তা জানাতে পারেন, অথবা সরাসরি আমাদের ইঞ্জিনিয়ারের সাথে হোয়াটসঅ্যাপে কথা বলতে পারেন।`
        : `Thank you for reaching out! I am the **MerxoDev AI Assistant**. I can assist you with custom website development, SaaS web apps, pricing tiers (BDT 1,000 - 4,000), and digital engineering solutions.\n\nCould you specify what kind of project you're planning, or feel free to connect directly with our developer on WhatsApp!`;

      return NextResponse.json({
        reply: fallbackResponse,
        actions: [
          { label: 'Explore Services', href: '/services', type: 'link' },
          { label: 'WhatsApp +880 1868-300958', href: 'https://wa.me/8801868300958', type: 'external' }
        ],
        suggestions: [
          'Website packages & pricing?',
          'What services do you offer?',
          'How to start a project?'
        ]
      });
    }

    const reply = bestMatch.response[lang] || bestMatch.response.en;

    return NextResponse.json({
      reply,
      actions: bestMatch.actions || [],
      suggestions: bestMatch.suggestions || []
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      { reply: "Sorry, I'm having a brief connection delay. Please feel free to reach us directly on WhatsApp (+880 1868-300958)." },
      { status: 500 }
    );
  }
}
