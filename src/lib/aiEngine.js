import prisma from '@/lib/prisma';
import { getAllProjects } from '@/app/lib/projects';
import { getAiConfig } from '@/lib/chatStore';

const WHATSAPP_NUM = '8801313334279';
const WHATSAPP_DISPLAY = '+880 1313-334279';
const SECONDARY_PHONE = '+880 9697-634279';
const EMAIL = 'merxodevsolutions@gmail.com';
const LOCATION = 'Nilphamari / Rangpur, Bangladesh (Serving Worldwide)';
const WEBSITE_URL = 'https://merxodevsolutions.pro.bd';

// Cache dynamic DB context for 60 seconds for ultra-fast responses
let cachedDbContext = null;
let cachedAt = 0;

export async function getDynamicWebsiteContext() {
  const now = Date.now();
  if (cachedDbContext && now - cachedAt < 60 * 1000) {
    return cachedDbContext;
  }

  let projects = [];
  let team = [];

  try {
    const [projList, teamList] = await Promise.all([
      getAllProjects().catch(() => []),
      prisma.teamMember
        .findMany({
          where: { isActive: true },
          orderBy: { order: 'asc' },
          take: 15,
        })
        .catch(() => []),
    ]);
    projects = Array.isArray(projList) ? projList : [];
    team = Array.isArray(teamList) ? teamList : [];
  } catch {
    // Fallback to empty arrays if DB query fails
  }

  cachedDbContext = { projects, team };
  cachedAt = now;
  return cachedDbContext;
}

export function buildSystemPrompt({ projects = [], team = [], customInstructions = '', session = null }) {
  const projectLines =
    projects.length > 0
      ? projects
          .slice(0, 12)
          .map(
            (p, i) =>
              `${i + 1}. "${p.title}" (${p.tag || 'Web App'}) — ${
                p.description ? p.description.slice(0, 140) : 'Custom digital solution'
              } | Page: /our-projects/${p.slug}${p.liveUrl ? ` | Live: ${p.liveUrl}` : ''}`
          )
          .join('\n')
      : 'Custom Full-Stack Web Applications, SaaS Platforms, E-Commerce Stores, and Enterprise Dashboards (view at /our-projects).';

  const teamLines =
    team.length > 0
      ? team.map((m) => `• ${m.name} — ${m.role}${m.bio ? ` (${m.bio.slice(0, 90)})` : ''}`).join('\n')
      : 'Dedicated Full-Stack Engineers, UI/UX Designers, and DevOps Specialists based in Bangladesh.';

  return `You are "MerxoDev AI", the official intelligent AI assistant of **MerxoDev Solutions** (also known as Merxo Dev Solutions, MerxoDev, merxodev solution, মারক্সোডেভ সলিউশনস).
Website: ${WEBSITE_URL}

=== STRICT BEHAVIOR & GUARDRAILS ===
1. DOMAIN RESTRICTION: You ONLY know about and represent **MerxoDev Solutions** — its services, pricing, portfolio projects, team members, technologies, developer tools, processes, and contact channels. If a user asks about unrelated topics (e.g., general trivia, cooking, politics, other companies, homework), politely decline in 1 sentence and steer the conversation back to how MerxoDev Solutions can build or grow their website, app, or digital product.
2. LANGUAGE ADAPTATION (CRITICAL):
   - Always reply in the EXACT language the user uses OR explicitly asks you to use!
   - If the user writes in **Bengali (বাংলা)** or asks to speak in Bengali ("বাংলায় বলো", "banglay bolo"), reply in fluent, natural **Bengali (বাংলা)**.
   - If the user writes in **Banglish** (Bengali written in English letters, e.g., "vai ecommerce website banate koto taka lagbe?"), reply in friendly **Banglish** or **Bengali** (unless they specify one).
   - If the user writes in **English**, reply in clear, professional **English**.
   - If the user writes in **Arabic, Hindi, Chinese, Spanish, French, German**, or any other language, reply fluently in that language.
3. CONVERSATIONAL & CONCISE STYLE:
   - Reply like a smart, warm, helpful senior product consultant at MerxoDev Solutions (like ChatGPT / Gemini).
   - Use clean formatting with **bold** highlights and bullet points (•) when listing items. Keep answers concise (typically 3–8 lines) so it reads great inside a chat widget.
   - Do NOT use emojis in your responses; the chat UI automatically renders clean React icons.
4. SMART LEAD CAPTURE:
   - When a user shows interest in building a project, getting a quote, or hiring, warmly invite them to share their **Name and WhatsApp/Phone number or Email** right in the chat (or click the WhatsApp button) so our lead engineer can reach out directly.
5. LIVE ADMIN HANDOFF:
   - If the user asks to talk to a real human / live admin, tell them that you have notified the Live Admin team with an instant alert and they can also message directly on WhatsApp (${WHATSAPP_DISPLAY}).

=== OFFICIAL MERXODEV SOLUTIONS KNOWLEDGE BASE ===
• **Company Name:** MerxoDev Solutions (মারক্সোডেভ সলিউশনস)
• **Founded:** 2023
• **Location:** ${LOCATION}
• **Official Phone & WhatsApp:** ${WHATSAPP_DISPLAY} (Direct link: https://wa.me/${WHATSAPP_NUM})
• **Secondary Sales Phone:** ${SECONDARY_PHONE}
• **Official Email:** ${EMAIL}
• **Working Hours:** 24/7 Online Support & Consultation (Office: Mon–Sat, 9:00 AM – 11:00 PM GMT+6)

=== SERVICES & PAGES ===
1. **Custom Website Development** (/services-web): High-converting landing pages, corporate websites, portfolios using Next.js 16, React 19 & Tailwind CSS.
2. **Custom Web Applications & SaaS** (/services-web-app): Full-stack SaaS products, ERP, CRM, portals & dashboards.
3. **E-Commerce Solutions** (/services-ecommerce): Single & multi-vendor online stores, cart, inventory, order tracking, automatic PDF invoices.
4. **Payment Gateway Integration** (/services-payment-gateway): bKash, Nagad, Rocket, Upay, SSLCommerz, Shurjopay, Stripe & PayPal with instant webhook verification.
5. **UI/UX & Figma Design** (/services-design): Modern wireframes, design systems, interactive prototypes, Figma-to-code.
6. **SEO & Search Growth** (/services-seo): Technical SEO, Core Web Vitals, Schema.org structured data, Google Search Console indexing, AI/GEO optimization.
7. **API Development & Integration** (/services-api-integration): REST, GraphQL, third-party webhooks, microservice sync.
8. **AI & Workflow Automation** (/services-automation): Custom AI chatbots, automated workflows, business automation.
9. **Database Architecture & Cloud** (/services-database): PostgreSQL, Prisma ORM, MongoDB, Supabase, Neon, AWS, Vercel, Cloudflare.
10. **Cybersecurity & Auth** (/services-security): NextAuth, OAuth, 2FA, role-based access control, security audits.
11. **Admin Dashboards & Analytics** (/services-dashboard): Real-time analytics, custom CMS, reporting panels.
12. **Website Maintenance & 24/7 SLA** (/services-maintenance): Bug fixes, speed optimization, backups, 30 days free post-launch warranty.
13. **Free Developer Tools** (/tools): JSON Formatter, JWT Decoder, Regex Tester, Base64, URL Encoder, UUID Generator, Hash Generator, CSS Shadow & Gradient Generator, Meta Previewer, HTTP Status & Bangladesh GeoJSON API (/bangladesh-geojson).

=== PRICING & PACKAGES ===
• **Standard Affordable Packages (BDT 1,000 – BDT 4,000):**
  - **Starter Tier (BDT 1,000 – 1,500):** Landing pages, UI design, bug fixes, basic SEO, speed optimization.
  - **Professional Tier (BDT 2,000 – 3,000):** Multi-page dynamic responsive websites, API integration, database setup, custom CMS.
  - **Advanced / E-Commerce / SaaS Tier (BDT 3,500 – 4,000):** Full-stack Custom Web Apps, E-Commerce stores with bKash/Nagad/SSLCommerz/Stripe payment gateways & admin panel.
• **Custom / International / Enterprise Projects:** Milestone-based custom quotes (30% kickoff, 40% core review, 30% final deployment) with free 15-minute Google Meet Discovery Call.

=== DELIVERY TIMELINES ===
• **Landing Page / Bug Fixes:** 24 to 48 Hours
• **Complete Business Website:** 3 to 7 Days
• **Full Web App / E-Commerce Platform:** 7 to 14 Days

=== LIVE PORTFOLIO PROJECTS IN DATABASE (/our-projects) ===
${projectLines}

=== OUR TEAM MEMBERS (/our-team) ===
${teamLines}

${session?.visitorName && !session.visitorName.startsWith('Visitor #') ? `Current Visitor Name: ${session.visitorName}` : ''}
${customInstructions ? `\n=== ADDITIONAL ADMIN INSTRUCTIONS ===\n${customInstructions}` : ''}`;
}

/**
 * Detect if the user is explicitly asking to talk to a human / live admin
 */
export function detectHumanRequest(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  const patterns = [
    /\b(human|live agent|live admin|real person|talk to admin|speak to admin|customer care|live support|operator)\b/i,
    /\b(manush|manusher sathe|admin er sathe|live chat|live কথা|সরাসরি কথা|অ্যাডমিন|মানুষের সাথে)\b/i,
  ];
  return patterns.some((p) => p.test(lower));
}

/**
 * Accurate Multi-Language Detector (supports explicit language switch requests + conversation memory)
 */
export function detectLanguage(text, previousLang = 'en') {
  if (!text) return previousLang || 'en';
  const lower = text.toLowerCase();

  // 1. Explicit Language Switch Commands (Highest Priority)
  if (
    /\b(banglay|bangla te|bangla bhashay|banglate|in bangla|in bengali|speak bangla|talk in bangla)\b/i.test(lower) ||
    /(বাংলায় বলো|বাংলায় বলুন|বাংলা ভাষায়|বাংলাতে বলুন|বাংলায় উত্তর)/.test(text)
  ) {
    return 'bn';
  }
  if (/\b(banglish|banglish e|banglish a)\b/i.test(lower)) {
    return 'banglish';
  }
  if (
    /\b(speak in english|talk in english|in english|english please|english e bolo|english a bolo|reply in english)\b/i.test(lower) ||
    /(ইংরেজিতে বলো|ইংরেজিতে বলুন|ইংলিশে বলো)/.test(text)
  ) {
    return 'en';
  }
  if (/\b(in hindi|speak hindi|hindi me)\b/i.test(lower)) return 'hi';
  if (/\b(in arabic|speak arabic)\b/i.test(lower)) return 'ar';

  // 2. Unicode Script Tests
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';

  // 3. Banglish Token Detection
  const banglishTokens = new Set([
    'koto', 'taka', 'khoroch', 'dam', 'lagbe', 'hobe', 'apnader', 'apnara',
    'amader', 'amar', 'kemon', 'achen', 'bhalo', 'valo', 'kaj', 'koren', 'korben',
    'banate', 'banabo', 'dorkar', 'chai', 'thikana', 'kothay', 'jogajog', 'shomoy',
    'bujhte', 'parlam', 'bolen', 'dekhi', 'shuru', 'korbo', 'dhonnobad',
    'vai', 'bhai', 'apni', 'tumi', 'kintu', 'ekta', 'akta', 'kotodin', 'parben',
    'kisu', 'kichu', 'amake', 'bolte', 'parba', 'keno', 'khub', 'dite', 'pari',
    'korte', 'apnake', 'tomake', 'tomader', 'somporke', 'somporkey', 'bolo', 'bolun',
    'kotha', 'janiye', 'dao', 'deo', 'shob', 'sob', 'ki', 'ke', 'achev', 'acchen',
    'projeckt', 'achev', 'kivabe', 'kon', 'konta',
  ]);

  const cleanWords = lower.replace(/[^a-z0-9]/gi, ' ').split(/\s+/).filter(Boolean);
  for (const word of cleanWords) {
    if (banglishTokens.has(word)) {
      return 'banglish';
    }
  }

  // 4. European language markers
  if (['¿', '¡', 'hola', 'gracias', 'cuanto', 'cuánto', 'precio'].some((w) => lower.includes(w))) return 'es';
  if (['bonjour', 'merci', 'combien', 'coût', 'développement'].some((w) => lower.includes(w))) return 'fr';
  if (['hallo', 'danke', 'wieviel', 'kosten', 'webseite'].some((w) => lower.includes(w))) return 'de';

  // If very short message (like "ok", "yes", "hmm", or a phone number), preserve previous language
  if (cleanWords.length <= 2 && previousLang && previousLang !== 'en') {
    return previousLang;
  }

  return 'en';
}

/**
 * Call External LLM (Google Gemini -> Groq -> OpenAI)
 */
async function callExternalLLM({ systemPrompt, history = [], userMessage, aiConfig }) {
  // 1. Try Google Gemini API (gemini-2.5-flash or gemini-2.0-flash)
  if (aiConfig.geminiApiKey) {
    try {
      const contents = [];
      for (const msg of history.slice(-10)) {
        if (!msg.text) continue;
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });

      const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      for (const modelName of models) {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(
            aiConfig.geminiApiKey
          )}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              contents,
              generationConfig: {
                temperature: 0.5,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply && reply.trim()) {
            return reply.trim();
          }
        }
      }
    } catch (err) {
      console.error('Gemini API error:', err.message);
    }
  }

  // 2. Try Groq API (llama-3.3-70b-versatile)
  if (aiConfig.groqApiKey) {
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...history.slice(-10).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
        { role: 'user', content: userMessage },
      ];

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aiConfig.groqApiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.5,
          max_tokens: 600,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content;
        if (reply && reply.trim()) {
          return reply.trim();
        }
      }
    } catch (err) {
      console.error('Groq API error:', err.message);
    }
  }

  // 3. Try OpenAI API (gpt-4o-mini)
  if (aiConfig.openaiApiKey) {
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...history.slice(-10).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
        { role: 'user', content: userMessage },
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aiConfig.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.5,
          max_tokens: 600,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content;
        if (reply && reply.trim()) {
          return reply.trim();
        }
      }
    } catch (err) {
      console.error('OpenAI API error:', err.message);
    }
  }

  return null;
}

/**
 * Contextual Actions & Quick Suggestions Builder based on message & reply
 */
export function buildContextualActionsAndSuggestions(userMessage, replyText, lang, projects = []) {
  const combined = `${userMessage} ${replyText}`.toLowerCase();
  const actions = [];

  if (/project|portfolio|work|demo|sample|প্রজেক্ট|কাজ|পোর্টফোলিও/i.test(combined)) {
    actions.push({ label: lang === 'bn' ? 'আমাদের প্রজেক্ট দেখুন' : 'View Our Projects', href: '/our-projects', type: 'link' });
    if (projects.length > 0 && projects[0]?.slug) {
      actions.push({
        label: `Demo: ${projects[0].title.slice(0, 22)}`,
        href: `/our-projects/${projects[0].slug}`,
        type: 'link',
      });
    }
  } else if (/ecommerce|e-commerce|shop|store|ই-কমার্স|ইকমার্স|দোকান/i.test(combined)) {
    actions.push({ label: lang === 'bn' ? 'ই-কমার্স সার্ভিস' : 'E-Commerce Solutions', href: '/services-ecommerce', type: 'link' });
    actions.push({ label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' });
  } else if (/payment|bkash|nagad|stripe|sslcommerz|বিকাশ|নগদ|পেমেন্ট/i.test(combined)) {
    actions.push({ label: lang === 'bn' ? 'পেমেন্ট গেটওয়ে সার্ভিস' : 'Payment Gateway Service', href: '/services-payment-gateway', type: 'link' });
    actions.push({ label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' });
  } else if (/team|founder|developer|who|টিম|কে|কারা/i.test(combined)) {
    actions.push({ label: lang === 'bn' ? 'আমাদের টিম দেখুন' : 'Meet Our Team', href: '/our-team', type: 'link' });
    actions.push({ label: lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About MerxoDev', href: '/about', type: 'link' });
  } else if (/tool|json|regex|jwt|geojson|টুল/i.test(combined)) {
    actions.push({ label: 'Free Developer Tools', href: '/tools', type: 'link' });
  } else {
    actions.push({ label: lang === 'bn' ? 'সকল সার্ভিস ও প্রাইসিং' : 'Services & Pricing', href: '/services', type: 'link' });
    actions.push({ label: `WhatsApp (${WHATSAPP_DISPLAY})`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' });
  }

  const suggestionsByLang = {
    bn: [
      'ওয়েবসাইট প্যাকেজ ও দাম কত?',
      'আপনাদের করা প্রজেক্টগুলো দেখান',
      'ই-কমার্স ওয়েবসাইট তৈরি করতে চাই',
      'লাইভ অ্যাডমিনের সাথে কথা বলতে চাই',
    ],
    banglish: [
      'Website package o dam koto?',
      'Apnader kora project gulo dekhan',
      'Ecommerce website banate chai',
      'Live Admin er sathe kotha bolbo',
    ],
    en: [
      'Website pricing & packages?',
      'Show your recent projects',
      'E-commerce & Payment Gateway',
      'Talk to Live Admin',
    ],
  };

  return {
    actions: actions.slice(0, 2),
    suggestions: suggestionsByLang[lang] || suggestionsByLang.en,
  };
}

/**
 * Built-in Intelligent Conversational Engine (works with 0 external API keys, using live DB data)
 */
export function generateBuiltInIntelligentReply({ userMessage, lang, projects = [], team = [], leadCaptured = {} }) {
  const lower = userMessage.toLowerCase().trim();

  // 0. If the user just shared their phone number or email (Smart Lead Capture)
  if (leadCaptured.phone || leadCaptured.email) {
    const contactVal = leadCaptured.phone || leadCaptured.email;
    if (lang === 'bn') {
      return `ধন্যবাদ! আমরা আপনার যোগাযোগের তথ্য (**${contactVal}**) নোট করে নিয়েছি। আমাদের লিড ডেভেলপার খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।\n\nএর মধ্যে আপনার প্রজেক্টের কোনো বিশেষ রিকোয়ারমেন্ট থাকলে এখানে লিখে রাখতে পারেন!`;
    }
    if (lang === 'banglish') {
      return `Dhonnobad! Apnar contact info (**${contactVal}**) amader system e save hoyeche. Amader lead developer khub shighroi apnar sathe jogajog korben.\n\nApnar project somporke aro kichu janate chaile bolte paren!`;
    }
    return `Thank you! I have saved your contact details (**${contactVal}**) for our engineering team. Our lead developer will reach out to you shortly.\n\nIn the meantime, feel free to share any specific features you want in your project!`;
  }

  // 1. Explicit Language Switch Command
  if (
    /\b(banglay|bangla te|bangla bhashay|banglate|speak bangla|talk in bangla)\b/i.test(lower) ||
    /(বাংলায় বলো|বাংলায় বলুন|বাংলা ভাষায় বলুন|বাংলাতে বলুন|বাংলায় উত্তর দাও)/.test(userMessage)
  ) {
    return `হ্যাঁ, অবশ্যই! এখন থেকে আমি আপনার সাথে **বাংলায়** কথা বলব।\n\n**MerxoDev Solutions**-এর ওয়েবসাইট ডেভেলপমেন্ট, ই-কমার্স, কাস্টম সফটওয়্যার, আমাদের করা প্রজেক্ট বা প্রাইসিং (**১,০০০ – ৪,০০০ টাকা**) সম্পর্কে আপনি যা জানতে চান নির্দ্বিধায় জিজ্ঞেস করুন!`;
  }
  if (/\b(speak in english|talk in english|english please|english e bolo|english a bolo|reply in english)\b/i.test(lower)) {
    return `Certainly! I will communicate with you in **English** from now on.\n\nHow can I help you with **MerxoDev Solutions**? You can ask about our custom web development, SaaS apps, e-commerce stores, portfolio projects, or pricing packages!`;
  }
  if (/\b(banglish e bolo|banglish a bolo|talk in banglish)\b/i.test(lower)) {
    return `Obosshoi! Ekhon theke ami apnar sathe **Banglish**-e kotha bolbo.\n\n**MerxoDev Solutions** er website development, ecommerce, pricing package (1,000 - 4,000 Taka) ba project somporke jekono proshno korte paren!`;
  }

  // 2. Greetings & "How are you"
  if (/^(hi|hello|hey|assalamu alaikum|salam|hlw|hola|good morning|good evening|kemon achen|kemon aso|কেমন আছেন|হ্যালো|সালাম|হাই)\b/i.test(lower) && lower.length < 38) {
    if (lang === 'bn') {
      return `ওয়ালাইকুম আসসালাম ও শুভেচ্ছা! আমি **MerxoDev AI Assistant**। আমি ভালো আছি, আশা করি আপনিও ভালো আছেন।\n\nআপনার ব্যবসার জন্য কি নতুন **ওয়েবসাইট, ই-কমার্স শপ, নাকি কাস্টম ওয়েব অ্যাপ্লিকেশন** তৈরি করতে চাচ্ছেন? আমাকে জানান!`;
    }
    if (lang === 'banglish') {
      return `Hello & Assalamu Alaikum! Ami **MerxoDev AI Assistant**. Alhamdulillah valo achi!\n\nApni ki apnar business er jonno **Website, Ecommerce Store, naki Custom Web App** banate chaccen? Amake bolun!`;
    }
    return `Hello and welcome to **MerxoDev Solutions**! I am your **MerxoDev AI Assistant**.\n\nAre you looking to build a **modern website, e-commerce store, or custom SaaS web application**? Ask me anything about our services, projects, or pricing!`;
  }

  // 3. Portfolio / Projects inquiry (uses live DB projects!)
  if (/\b(project|projects|portfolio|work|sample|demo|case stud|প্রজেক্ট|পোর্টফোলিও|কাজ দেখান|নমুনা|কি কি বানিয়েছেন)\b/i.test(lower)) {
    const topProjects = projects.slice(0, 4);
    const projBullets =
      topProjects.length > 0
        ? topProjects.map((p) => `• **${p.title}** (${p.tag || 'Web App'})`).join('\n')
        : `• **Custom E-Commerce & Multi-Vendor Platforms**\n• **SaaS Dashboards & Booking Systems**\n• **High-Speed Next.js Corporate Portals**`;

    if (lang === 'bn') {
      return `**MerxoDev Solutions**-এর তৈরি কিছু উল্লেখযোগ্য লাইভ প্রজেক্ট হলো:\n\n${projBullets}\n\nআমাদের সব প্রজেক্টের লাইভ ডেমো ও বিস্তারিত দেখতে নিচের **আমাদের প্রজেক্ট দেখুন** বাটনে ক্লিক করুন!`;
    }
    if (lang === 'banglish') {
      return `**MerxoDev Solutions** er toiri kichu live project নিচে dewa holo:\n\n${projBullets}\n\nAmader sob project er live demo dekhte nicher **View Our Projects** button e click korun!`;
    }
    return `Here are some of the featured live projects engineered by **MerxoDev Solutions**:\n\n${projBullets}\n\nClick **View Our Projects** below to explore live demos and technical case studies!`;
  }

  // 4. Team / About / Founder inquiry (uses live DB team!)
  if (/\b(team|member|founder|ceo|owner|developer|who are you|about merxodev|about company|টিম|মালিক|কে বানিয়েছে|আপনারা কারা|কোম্পানি সম্পর্কে)\b/i.test(lower)) {
    const teamBullets =
      team.length > 0
        ? team.slice(0, 5).map((m) => `• **${m.name}** — ${m.role}`).join('\n')
        : `• **Full-Stack Next.js & React Engineers**\n• **UI/UX Product Designers**\n• **Cloud & Security Architects**`;

    if (lang === 'bn') {
      return `**MerxoDev Solutions (মারক্সোডেভ সলিউশনস)** বাংলাদেশের (রংপুর) একটি আধুনিক সফটওয়্যার ও ওয়েব ডেভেলপমেন্ট এজেন্সি।\n\n**আমাদের টিম মেম্বারগণ:**\n${teamBullets}\n\nআমরা দেশ ও বিদেশের স্টার্টআপ এবং ব্যবসার জন্য দ্রুতগতির ওয়েবসাইট ও সফটওয়্যার তৈরি করি।`;
    }
    if (lang === 'banglish') {
      return `**MerxoDev Solutions** holo Bangladesh (Rangpur) ভিত্তিক ekti modern web & software development agency.\n\n**Amader Team:**\n${teamBullets}\n\nAmra startup ebong business er jonno Next.js, React ও Node.js diye high-performance digital product toiri kori.`;
    }
    return `**MerxoDev Solutions** is a custom web & software engineering agency based in Rangpur, Bangladesh, serving clients worldwide since 2023.\n\n**Our Core Team:**\n${teamBullets}\n\nWe specialize in Next.js, React, Node.js, SaaS platforms, and e-commerce systems.`;
  }

  // 5. Pricing / Cost / Package inquiry
  if (/\b(price|pricing|cost|budget|rate|fee|charge|package|how much|koto|taka|dam|khoroch|দাম|খরচ|টাকা|বাজেট|প্যাকেজ|মূল্য)\b/i.test(lower)) {
    if (lang === 'bn') {
      return `আমাদের স্ট্যান্ডার্ড ডিজিটাল সার্ভিস প্যাকেজগুলো অত্যন্ত সাশ্রয়ী (**১,০০০ টাকা থেকে ৪,০০০ টাকা**):\n\n• **স্টার্টার প্যাকেজ (১,০০০ – ১,৫০০ টাকা):** ল্যান্ডিং পেজ, পোর্টফোলিও, UI ডিজাইন, বাগ ফিক্স ও বেসিক SEO।\n• **প্রফেশনাল প্যাকেজ (২,০০০ – ৩,০০০ টাকা):** মাল্টি-পেজ রেসপন্সিভ ওয়েবসাইট, ডাইনামিক অ্যাডমিন প্যানেল, ডাটাবেস ও API।\n• **অ্যাডভান্সড / ই-কমার্স / SaaS (৩,৫০০ – ৪,০০০ টাকা):** ফুল-স্ট্যাক ওয়েব অ্যাপ, ই-কমার্স স্টোর এবং বিকাশ/নগদ/স্ট্রাইপ পেমেন্ট গেটওয়ে।\n\nআপনার প্রজেক্টের জন্য কাস্টম কোটেশন পেতে আপনার **WhatsApp নাম্বারটি** এখানে দিতে পারেন!`;
    }
    if (lang === 'banglish') {
      return `Amader digital service package gulo khub shashroye (**BDT 1,000 theke BDT 4,000**):\n\n• **Starter Package (1,000 – 1,500 Taka):** Landing page, UI design, bug fix, basic SEO.\n• **Professional Package (2,000 – 3,000 Taka):** Full responsive website, custom admin panel, API & database.\n• **Advanced / Ecommerce / SaaS (3,500 – 4,000 Taka):** Custom Web App, Ecommerce store with bKash/Nagad/Stripe payment gateway.\n\nApni chaile apnar **WhatsApp number** ekhane dite paren, amader developer direct call korbe!`;
    }
    return `Our standard digital engineering packages range between **BDT 1,000 and BDT 4,000** (with custom milestone quotes for large enterprise systems):\n\n• **Starter Tier (BDT 1,000 – 1,500):** High-converting landing pages, UI design, bug fixes & SEO.\n• **Professional Tier (BDT 2,000 – 3,000):** Dynamic multi-page websites, custom CMS, APIs & database.\n• **Advanced & SaaS (BDT 3,500 – 4,000):** Custom Web Apps & E-Commerce stores with payment gateways.\n\nShare your **WhatsApp number or email** here and our lead engineer will send you a tailored roadmap!`;
  }

  // 6. Services overview
  if (/\b(service|services|offer|solution|what do you do|সার্ভিস|সেবা|কি কাজ করেন|কী কাজ করেন|ki kaj koren|ki service)\b/i.test(lower)) {
    if (lang === 'bn') {
      return `**MerxoDev Solutions**-এ আমাদের প্রধান সেবাসমূহ:\n\n১. **কাস্টম ওয়েবসাইট ডেভেলপমেন্ট** (Next.js 16, React, Tailwind CSS)\n২. **কাস্টম ওয়েব অ্যাপ ও SaaS প্ল্যাটফর্ম**\n৩. **ই-কমার্স ও অনলাইন শপ** (কার্ট, স্টক, অর্ডার ট্র্যাকিং)\n৪. **পেমেন্ট গেটওয়ে ইন্টিগ্রেশন** (বিকাশ, নগদ, রকেট, SSLCommerz, Stripe)\n৫. **UI/UX ও Figma ডিজাইন**\n৬. **টেকনিক্যাল SEO ও স্পিড অপ্টিমাইজেশন**\n৭. **API ইন্টিগ্রেশন, AI অটোমেশন ও ২৪/৭ মেইনটেন্যান্স**`;
    }
    if (lang === 'banglish') {
      return `**MerxoDev Solutions** e amra নিচের main service gulo provide kori:\n\n1. **Custom Website Development** (Next.js 16, React, Tailwind CSS)\n2. **Custom Web App & SaaS Development**\n3. **Ecommerce Website** (Cart, Checkout, Admin Dashboard)\n4. **Payment Gateway Integration** (bKash, Nagad, SSLCommerz, Stripe)\n5. **UI/UX Design & Figma to Code**\n6. **Technical SEO & Speed Optimization**\n7. **API, Database, Security & 24/7 Maintenance**`;
    }
    return `**MerxoDev Solutions** provides end-to-end digital engineering services:\n\n1. **Custom Website Development** (Next.js 16, React 19, Tailwind CSS)\n2. **Custom Web Applications & SaaS Platforms**\n3. **E-Commerce Stores** (Inventory, Checkout, Admin CMS)\n4. **Payment Gateway Integration** (bKash, Nagad, SSLCommerz, Stripe)\n5. **UI/UX & Figma Design**\n6. **Technical SEO & AI Search Optimization**\n7. **API Integration, Cloud Databases & 24/7 Maintenance**`;
  }

  // 7. E-Commerce & Payment Gateways
  if (/\b(ecommerce|e-commerce|shop|store|bkash|nagad|rocket|payment|stripe|sslcommerz|ইকমার্স|ই-কমার্স|দোকান|বিকাশ|নগদ|পেমেন্ট)\b/i.test(lower)) {
    if (lang === 'bn') {
      return `আমরা সম্পূর্ণ কাস্টম **ই-কমার্স ওয়েবসাইট এবং পেমেন্ট গেটওয়ে** তৈরি করি:\n\n• আনলিমিটেড প্রোডাক্ট আপলোড, ক্যাটাগরি ও স্টক ম্যানেজমেন্ট\n• **বিকাশ, নগদ, রকেট, SSLCommerz এবং Stripe** অটো পেমেন্ট গেটওয়ে\n• অটোমেটিক অর্ডার নোটিফিকেশন ও PDF ইনভয়েস\n• সুপার-ফাস্ট মোবাইল ও ডেস্কটপ শপিং এক্সপেরিয়েন্স (**২,৫০০ – ৪,০০০ টাকা**)`;
    }
    if (lang === 'banglish') {
      return `Amra complete **Ecommerce Website ebong Auto Payment Gateway** integrate kore di:\n\n• Product upload, inventory o order management panel\n• **bKash, Nagad, Rocket, SSLCommerz ebong Stripe** instant payment gateway\n• Automated order invoice & SMS/Email alert\n• Package price: **BDT 2,500 – 4,000 Taka**`;
    }
    return `We build high-converting **E-Commerce Stores** with direct **Payment Gateway Integrations**:\n\n• Complete product catalog, cart, and order management dashboard\n• **bKash, Nagad, Rocket, SSLCommerz, Shurjopay & Stripe** tokenized checkout\n• Automated PDF invoices and instant webhook verification\n• **Pricing:** BDT 2,500 – BDT 4,000 based on features.`;
  }

  // 8. Contact / Phone / Email / Location / Discovery Call
  if (/\b(contact|hire|phone|number|call|whatsapp|email|address|location|meet|meeting|যোগাযোগ|ফোন|নাম্বার|ঠিকানা|ইমেইল|লোকেশন|jogajog|thikana)\b/i.test(lower)) {
    if (lang === 'bn') {
      return `আমাদের সাথে সরাসরি যোগাযোগ করার মাধ্যম:\n\n**ফোন / হোয়াটসঅ্যাপ:** ${WHATSAPP_DISPLAY} | ${SECONDARY_PHONE}\n**ইমেইল:** ${EMAIL}\n**ঠিকানা:** ${LOCATION}\n**সার্ভিস টাইম:** ২৪/৭ অনলাইন সাপোর্ট (১৫ মিনিটের ফ্রি Google Meet কনসালটেশন বুক করতে পারেন!)`;
    }
    if (lang === 'banglish') {
      return `Amader sathe direct jogajog korar maddhom:\n\n**Phone / WhatsApp:** ${WHATSAPP_DISPLAY} | ${SECONDARY_PHONE}\n**Email:** ${EMAIL}\n**Location:** ${LOCATION}\n**Available:** 24/7 Online Support & Free 15-Min Google Meet Consultation!`;
    }
    return `You can reach **MerxoDev Solutions** directly anytime:\n\n**Phone / WhatsApp:** ${WHATSAPP_DISPLAY} | ${SECONDARY_PHONE}\n**Email:** ${EMAIL}\n**Location:** ${LOCATION}\n**Availability:** 24/7 Client Consultation & Free 15-Minute Google Meet Discovery Call!`;
  }

  // 9. Delivery Timeline
  if (/\b(timeline|delivery|duration|deadline|how long|days|time|কত দিন|সময়|ডেলিভারি|koto din|shomoy|kotodin)\b/i.test(lower)) {
    if (lang === 'bn') {
      return `আমাদের প্রজেক্ট ডেলিভারি সময়সীমা:\n\n• **ল্যান্ডিং পেজ / বাগ ফিক্স:** ২৪ – ৪৮ ঘণ্টা\n• **কমপ্লিট বিজনেস ওয়েবসাইট:** ৩ – ৭ দিন\n• **ফুল ওয়েব অ্যাপ / ই-কমার্স:** ৭ – ১৪ দিন\n\nকাজ চলাকালীন আপনি লাইভ প্রিভিউ লিংক দেখতে পাবেন এবং ডেলিভারির পর ৩০ দিনের ফ্রি সাপোর্ট পাবেন।`;
    }
    if (lang === 'banglish') {
      return `Amader project delivery timeline:\n\n• **Landing Page / Bug Fix:** 24 – 48 Hours\n• **Full Business Website:** 3 – 7 Days\n• **Custom Web App / Ecommerce:** 7 – 14 Days\n\nKaj cholar shomoy live staging preview ebong launch er por 30 din free support paben!`;
    }
    return `Our standard project delivery timelines:\n\n• **Landing Page / Bug Fixes:** 24 to 48 Hours\n• **Complete Business Website:** 3 to 7 Days\n• **Full Web App / E-Commerce:** 7 to 14 Days\n\nEvery project includes live staging previews and 30 days of free post-launch support.`;
  }

  // 10. Technologies / Stack / Tools
  if (/\b(tech|technology|stack|framework|nextjs|react|tailwind|database|node|prisma|tool|টেকনোলজি|প্রযুক্তি|কি দিয়ে)\b/i.test(lower)) {
    if (lang === 'bn') {
      return `আমরা সর্বাধুনিক টেকনোলজি স্ট্যাক ব্যবহার করে কাজ করি:\n\n• **Frontend:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **Backend & API:** Node.js, Next.js Server Actions, REST & GraphQL\n• **Database:** PostgreSQL, Prisma ORM, MongoDB, Supabase\n• **Cloud & Security:** Vercel, AWS, Cloudflare, NextAuth 2FA`;
    }
    return `We engineer products using modern, scalable technologies:\n\n• **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, GSAP\n• **Backend & APIs:** Node.js, Next.js Server Actions, REST, GraphQL\n• **Databases:** PostgreSQL, Prisma ORM, MongoDB, Supabase, Neon\n• **Cloud & Hosting:** Vercel, AWS, Cloudflare`;
  }

  // 11. Website / Web App general inquiry
  if (/\b(web|website|app|software|build|make|create|need|want|ওয়েবসাইট|অ্যাপ|সফটওয়্যার|বানাতে|তৈরি|banate|banabo|dorkar)\b/i.test(lower)) {
    if (lang === 'bn') {
      return `আমরা আপনার প্রয়োজন অনুযায়ী **কাস্টম ওয়েবসাইট, ই-কমার্স স্টোর অথবা ওয়েব অ্যাপ্লিকেশন** তৈরি করে দিতে পারি!\n\n• **বাজেট:** সাধারণত ১,০০০ টাকা থেকে ৪,০০০ টাকার মধ্যে (প্রজেক্টের পরিধি অনুযায়ী)।\n• **টেকনোলজি:** Next.js 16, React, Node.js ও PostgreSQL।\n\nআপনি কী ধরনের ওয়েবসাইট বানাতে চাচ্ছেন? চাইলে আপনার **WhatsApp নাম্বারটি** চ্যাটে দিন অথবা উপরে **Live Admin** বাটনে ক্লিক করে সরাসরি অ্যাডমিনের সাথে কথা বলুন!`;
    }
    if (lang === 'banglish') {
      return `Amra apnar requirement onujayi **Custom Website, Ecommerce Store ba Web Application** toiri kore dite parbo!\n\n• **Budget:** 1,000 Taka theke 4,000 Taka (project onujayi).\n• **Tech Stack:** Next.js 16, React, Tailwind CSS, Node.js & PostgreSQL.\n\nApni ki dhoroner site banate chan? Chaile apnar **WhatsApp number** ekhane din ba **Live Admin** button e click kore direct kotha bolun!`;
    }
    return `We would love to build your **custom website, e-commerce store, or web application**!\n\n• **Packages:** BDT 1,000 – BDT 4,000 (or custom enterprise milestones)\n• **Stack:** Next.js 16, React 19, Tailwind CSS, Node.js & PostgreSQL\n\nTell me a bit about your project idea, share your **WhatsApp number**, or click **Live Admin** above to chat directly with our team!`;
  }

  // 12. Smart Conversational Default (Domain-restricted to MerxoDev Solutions)
  if (lang === 'bn') {
    return `আমি **MerxoDev AI Assistant** — আমি শুধুমাত্র **MerxoDev Solutions**-এর ওয়েবসাইট ডেভেলপমেন্ট, ই-কমার্স, কাস্টম সফটওয়্যার, আমাদের প্রজেক্টসমূহ এবং প্রাইসিং (**১,০০০ – ৪,০০০ টাকা**) সম্পর্কে সব তথ্য দিতে পারি।\n\nআপনি কি কোনো ওয়েবসাইট বা অ্যাপ তৈরি করতে চাচ্ছেন, নাকি আমাদের লাইভ অ্যাডমিনের সাথে সরাসরি কথা বলতে চান?`;
  }
  if (lang === 'banglish') {
    return `Ami **MerxoDev AI Assistant** — ami **MerxoDev Solutions** er website development, ecommerce, SaaS app, amader portfolio project ebong pricing (**1,000 – 4,000 Taka**) niye apnake shob tottho dite pari.\n\nApni ki kono website ba software banate chaccen, naki amader **Live Admin** er sathe direct kotha bolte chan?`;
  }
  return `I am **MerxoDev AI**, dedicated to **MerxoDev Solutions**. I can answer anything about our custom web & app development services, e-commerce solutions, portfolio projects, team, and pricing (**BDT 1,000 – BDT 4,000**).\n\nHow can we help build your next website or software project? You can also click **Live Admin** anytime to chat with a real person!`;
}

export async function generateAiResponse({ userMessage, history = [], session = null, leadCaptured = {} }) {
  const previousLang = session?.language || 'en';
  const lang = detectLanguage(userMessage, previousLang);
  const [{ projects, team }, aiConfig] = await Promise.all([
    getDynamicWebsiteContext(),
    getAiConfig(),
  ]);

  const systemPrompt = buildSystemPrompt({
    projects,
    team,
    customInstructions: aiConfig.customInstructions,
    session,
  });

  // 1. Try External LLM (Gemini / Groq / OpenAI) if configured
  let reply = await callExternalLLM({
    systemPrompt,
    history,
    userMessage,
    aiConfig,
  });

  // 2. Fallback to Built-in Intelligent Conversational Engine if no key or if API call failed
  if (!reply) {
    reply = generateBuiltInIntelligentReply({
      userMessage,
      lang,
      projects,
      team,
      leadCaptured,
    });
  }

  const { actions, suggestions } = buildContextualActionsAndSuggestions(userMessage, reply, lang, projects);

  return {
    reply,
    lang,
    actions,
    suggestions,
  };
}

