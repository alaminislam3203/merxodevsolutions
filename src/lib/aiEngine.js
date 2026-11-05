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

/**
 * Extracts normalized features list, tech stack, client, duration, and description
 * from a project record (same data rendered on /our-projects/[slug] details page).
 */
export function extractProjectDetailsData(project) {
  if (!project) return null;
  const det =
    project.details && typeof project.details === 'object' ? project.details : {};

  const techList = Array.isArray(det.tech)
    ? det.tech.filter(Boolean)
    : typeof det.tech === 'string' && det.tech.trim()
    ? det.tech.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const featureItems = [];
  if (Array.isArray(det.features)) {
    for (const f of det.features) {
      if (typeof f === 'string' && f.trim()) {
        featureItems.push({ title: f.trim(), subtitles: [] });
      } else if (f && typeof f === 'object') {
        const title = String(f.title || '').trim();
        const subs = [];
        if (Array.isArray(f.subtitles)) {
          for (const s of f.subtitles) {
            const txt = typeof s === 'string' ? s.trim() : String(s?.text || '').trim();
            if (txt) subs.push(txt);
          }
        } else if (f.subtitle && String(f.subtitle).trim()) {
          subs.push(String(f.subtitle).trim());
        }
        if (title || subs.length > 0) {
          featureItems.push({ title: title || subs[0], subtitles: title ? subs : subs.slice(1) });
        }
      }
    }
  }

  return {
    id: project.id,
    title: project.title || 'Project',
    slug: project.slug || '',
    tag: project.tag || 'Web Application',
    descriptionTitle: det.descriptionTitle || 'About The Project',
    description: project.description || '',
    client: det.client || '',
    duration: det.duration || '',
    tech: techList,
    features: featureItems,
    liveUrl: project.liveUrl || '',
    detailsUrl: project.slug ? `/our-projects/${project.slug}` : '/our-projects',
  };
}

/**
 * Finds a specific project from the database when the user asks about it by name/slug/keywords
 * (e.g., "NickHo Motorsports project er feature gulo bolo..?")
 */
export function findMatchingProject(userMessage = '', projects = [], history = []) {
  if (!userMessage || !Array.isArray(projects) || projects.length === 0) return null;
  const cleanMsg = userMessage.toLowerCase().trim();
  const normalizedMsg = cleanMsg.replace(/[^a-z0-9\u0980-\u09ff]+/g, ' ');

  const stopWords = new Set([
    'project', 'projects', 'er', 'ar', 'feature', 'features', 'gulo', 'gula',
    'bolo', 'bolun', 'dekhao', 'dekhan', 'about', 'details', 'detail', 'what',
    'is', 'the', 'of', 'in', 'for', 'and', 'ki', 'kiki', 'somporke', 'shomporke',
    'tell', 'me', 'show', 'website', 'app', 'site', 'live', 'demo', 'page',
  ]);

  let bestMatch = null;
  let bestScore = 0;

  for (const p of projects) {
    const titleLower = String(p.title || '').toLowerCase().trim();
    const slugLower = String(p.slug || '').toLowerCase().trim();
    const slugSpaced = slugLower.replace(/-/g, ' ');

    if (!titleLower) continue;

    // Exact substring match of full title or slug
    if (
      cleanMsg.includes(titleLower) ||
      (slugLower && cleanMsg.includes(slugLower)) ||
      (slugSpaced && normalizedMsg.includes(slugSpaced))
    ) {
      return p;
    }

    // Token-level matching for partial project names (e.g. "NickHo" or "Motorsports")
    const titleTokens = titleLower
      .replace(/[^a-z0-9\u0980-\u09ff]+/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length >= 3 && !stopWords.has(t));

    let score = 0;
    for (const token of titleTokens) {
      if (normalizedMsg.includes(token)) {
        score += token.length >= 5 ? 3 : 2;
      }
    }

    if (score > bestScore && score >= 2) {
      bestScore = score;
      bestMatch = p;
    }
  }

  if (bestMatch) return bestMatch;

  // If the user asks a follow-up like "ei project er feature ki?" or "live link dao", check the last 2 messages in history
  if (
    Array.isArray(history) &&
    history.length > 0 &&
    /\b(feature|features|tech|stack|live|link|url|client|duration|detail|details|ফিচার|লিংক|ডিটেইলস)\b/i.test(
      cleanMsg
    )
  ) {
    for (let i = history.length - 1; i >= Math.max(0, history.length - 3); i--) {
      const prevText = String(history[i]?.text || '').toLowerCase();
      for (const p of projects) {
        const titleLower = String(p.title || '').toLowerCase().trim();
        if (titleLower && prevText.includes(titleLower)) {
          return p;
        }
      }
    }
  }

  return null;
}

export function buildSystemPrompt({
  projects = [],
  team = [],
  customInstructions = '',
  session = null,
  preferredLang = 'en',
  targetLang = 'en',
  isFirstMessage = false,
  matchedProject = null,
}) {
  const projectLines =
    projects.length > 0
      ? projects
          .slice(0, 20)
          .map((p, i) => {
            const info = extractProjectDetailsData(p);
            const featSummary =
              info.features.length > 0
                ? ` | Key Features: ${info.features
                    .map(
                      (f) =>
                        `${f.title}${
                          f.subtitles.length > 0 ? ` (${f.subtitles.join('; ')})` : ''
                        }`
                    )
                    .join(' • ')}`
                : '';
            const techSummary =
              info.tech.length > 0 ? ` | Tech Stack: ${info.tech.join(', ')}` : '';
            const metaSummary = [
              info.client ? `Client: ${info.client}` : '',
              info.duration ? `Duration: ${info.duration}` : '',
            ]
              .filter(Boolean)
              .join(', ');

            return `${i + 1}. "${info.title}" (${info.tag}) — ${
              info.description || 'Custom digital solution'
            }${metaSummary ? ` | ${metaSummary}` : ''}${techSummary}${featSummary} | Details Page: ${info.detailsUrl}${
              info.liveUrl ? ` | Live URL: ${info.liveUrl}` : ''
            }`;
          })
          .join('\n\n')
      : 'Custom Full-Stack Web Applications, SaaS Platforms, E-Commerce Stores, and Enterprise Dashboards (view at /our-projects).';

  let focusedProjectBlock = '';
  if (matchedProject) {
    const d = extractProjectDetailsData(matchedProject);
    const formattedFeatures =
      d.features.length > 0
        ? d.features
            .map(
              (f, idx) =>
                `  ${idx + 1}. **${f.title}**${
                  f.subtitles.length > 0
                    ? `\n     - ${f.subtitles.join('\n     - ')}`
                    : ''
                }`
            )
            .join('\n')
        : '  - Custom high-performance architecture, responsive UI/UX, and full-stack integration.';

    focusedProjectBlock = `
=== DEEP DETAILS FROM PROJECT DETAILS PAGE (${d.detailsUrl}) FOR "${d.title}" ===
• **Project Title:** ${d.title}
• **Category / Tag:** ${d.tag}
${d.client ? `• **Client:** ${d.client}\n` : ''}${d.duration ? `• **Duration:** ${d.duration}\n` : ''}${
      d.tech.length > 0 ? `• **Technologies Used:** ${d.tech.join(', ')}\n` : ''
    }• **Overview (${d.descriptionTitle}):** ${d.description}
• **Complete Features List (from Project Details Page):**
${formattedFeatures}
• **Project Details Page:** ${d.detailsUrl}
${d.liveUrl ? `• **Live Website URL:** ${d.liveUrl}` : ''}
INSTRUCTION: The user is asking specifically about "${d.title}". Answer thoroughly using the exact Overview, Features, Sub-points, Tech Stack, Client, Duration, and Links above in **${targetLang}**!
`;
  }

  const teamLines =
    team.length > 0
      ? team.map((m) => `• ${m.name} — ${m.role}${m.bio ? ` (${m.bio.slice(0, 90)})` : ''}`).join('\n')
      : 'Dedicated Full-Stack Engineers, UI/UX Designers, and DevOps Specialists based in Bangladesh.';

  const langNames = {
    en: 'English',
    bn: 'Bengali (বাংলা)',
    ar: 'Arabic (العربية)',
    zh: 'Chinese (中文)',
    banglish: 'Banglish (Bengali written in English script)',
  };
  const activeUiLangName = langNames[preferredLang] || 'English';
  const targetLangName = langNames[targetLang] || activeUiLangName;

  return `You are "MerxoDev AI", the official intelligent AI assistant of **MerxoDev Solutions** (also known as Merxo Dev Solutions, MerxoDev, merxodev solution, মারক্সোডেভ সলিউশনস).
Website: ${WEBSITE_URL}

=== STRICT BEHAVIOR & GUARDRAILS ===
1. DOMAIN RESTRICTION: You ONLY know about and represent **MerxoDev Solutions** — its services, pricing, portfolio projects, team members, technologies, developer tools, processes, and contact channels. If a user asks about unrelated topics (e.g., general trivia, cooking, politics, other companies, homework), politely decline in 1 sentence and steer the conversation back to how MerxoDev Solutions can build or grow their website, app, or digital product.
2. LANGUAGE ADAPTATION (CRITICAL):
   - Website Language Switcher Selection: **${activeUiLangName}** (${preferredLang}).
   - Required Reply Language for this message: **${targetLangName}** (${targetLang}).
   - ${isFirstMessage ? `IMPORTANT: This is the visitor's FIRST message in the chat. You MUST reply in **${targetLangName}** to match their selected Language Switcher language!` : `Always reply in **${targetLangName}** unless the user explicitly asks you to switch to another language.`}
   - If the user explicitly asks to speak in **Bengali (বাংলা)**, **English**, **Arabic (العربية)**, **Chinese (中文)**, or **Banglish**, immediately reply in that requested language.
3. CONVERSATIONAL & CONCISE STYLE:
   - Reply like a smart, warm, helpful senior product consultant at MerxoDev Solutions (like ChatGPT / Gemini).
   - Use clean formatting with **bold** highlights and bullet points (•) when listing items. Keep answers concise (typically 3–8 lines) so it reads great inside a chat widget.
   - Do NOT use emojis in your responses; the chat UI automatically renders clean React icons.
4. SMART LEAD CAPTURE:
   - When a user shows interest in building a project, getting a quote, or hiring, warmly invite them to share their **Name and WhatsApp/Phone number or Email** right in the chat (or click the WhatsApp button) so our lead engineer can reach out directly.
5. Live Team HANDOFF:
   - If the user asks to talk to a real human / Live Team, tell them that you have notified the Live Team team with an instant alert and they can also message directly on WhatsApp (${WHATSAPP_DISPLAY}).

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
${focusedProjectBlock}
=== OUR TEAM MEMBERS (/our-team) ===
${teamLines}

${session?.visitorName && !session.visitorName.startsWith('Visitor #') ? `Current Visitor Name: ${session.visitorName}` : ''}
${customInstructions ? `\n=== ADDITIONAL ADMIN INSTRUCTIONS ===\n${customInstructions}` : ''}`;
}

/**
 * Detect if the user is explicitly asking to talk to a human / Live Team
 */
export function detectHumanRequest(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  const patterns = [
    /\b(human|live agent|Live Team|real person|talk to admin|speak to admin|customer care|live support|operator)\b/i,
    /\b(manush|manusher sathe|admin er sathe|live chat|live কথা|সরাসরি কথা|অ্যাডমিন|মানুষের সাথে)\b/i,
  ];
  return patterns.some((p) => p.test(lower));
}

/**
 * Accurate Multi-Language Detector (prioritizes Language Switcher on first message + explicit switch requests + conversation memory)
 */
export function detectLanguage(text, previousLang = 'en', options = {}) {
  const { preferredLang, isFirstMessage = false } = options || {};
  const fallbackLang = preferredLang || previousLang || 'en';
  if (!text) return fallbackLang;
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
  if (/\b(in arabic|speak arabic|arabic please)\b/i.test(lower) || /(بالعربية|تكلم عربي)/.test(text)) {
    return 'ar';
  }
  if (/\b(in chinese|speak chinese|chinese please)\b/i.test(lower) || /(用中文|说中文)/.test(text)) {
    return 'zh';
  }
  if (/\b(in hindi|speak hindi|hindi me)\b/i.test(lower)) return 'hi';

  // 2. When visitor sends their FIRST message, reply in the Language Switcher's selected language!
  if (isFirstMessage && preferredLang && ['en', 'bn', 'ar', 'zh'].includes(preferredLang)) {
    return preferredLang;
  }

  // 3. Unicode Script Tests
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';

  // 4. Banglish Token Detection
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
      return preferredLang === 'bn' ? 'bn' : 'banglish';
    }
  }

  // 5. If user has a non-English language selected in Language Switcher ('bn', 'ar', 'zh'), respect it
  if (preferredLang && ['bn', 'ar', 'zh'].includes(preferredLang)) {
    return preferredLang;
  }

  // 6. European language markers
  if (['¿', '¡', 'hola', 'gracias', 'cuanto', 'cuánto', 'precio'].some((w) => lower.includes(w))) return 'es';
  if (['bonjour', 'merci', 'combien', 'coût', 'développement'].some((w) => lower.includes(w))) return 'fr';
  if (['hallo', 'danke', 'wieviel', 'kosten', 'webseite'].some((w) => lower.includes(w))) return 'de';

  // If very short message (like "ok", "yes", "hmm", or a phone number), preserve previous language
  if (cleanWords.length <= 2 && fallbackLang && fallbackLang !== 'en') {
    return fallbackLang;
  }

  return fallbackLang;
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
export function buildContextualActionsAndSuggestions(userMessage, replyText, lang, projects = [], matchedProject = null) {
  const combined = `${userMessage} ${replyText}`.toLowerCase();
  const actions = [];

  const lbl = (enTxt, bnTxt, arTxt, zhTxt) =>
    lang === 'bn' ? bnTxt : lang === 'ar' ? arTxt : lang === 'zh' ? zhTxt : enTxt;

  if (matchedProject) {
    actions.push({
      label: `${matchedProject.title.slice(0, 20)} Details`,
      href: `/our-projects/${matchedProject.slug}`,
      type: 'link',
    });
    if (matchedProject.liveUrl) {
      actions.push({
        label: lbl('Live Preview', 'লাইভ ওয়েবসাইট দেখুন', 'معاينة حية', '查看在线演示'),
        href: matchedProject.liveUrl,
        type: 'external',
      });
    } else {
      actions.push({
        label: lbl('All Projects', 'সকল প্রজেক্ট', 'جميع المشاريع', '所有项目'),
        href: '/our-projects',
        type: 'link',
      });
    }
  } else if (/project|portfolio|work|demo|sample|প্রজেক্ট|কাজ|পোর্টফোলিও|مشاريع|مشروع|项目|案例/i.test(combined)) {
    actions.push({
      label: lbl('View Our Projects', 'আমাদের প্রজেক্ট দেখুন', 'عرض مشاريعنا', '查看我们的项目'),
      href: '/our-projects',
      type: 'link',
    });
    if (projects.length > 0 && projects[0]?.slug) {
      actions.push({
        label: `Demo: ${projects[0].title.slice(0, 22)}`,
        href: `/our-projects/${projects[0].slug}`,
        type: 'link',
      });
    }
  } else if (/ecommerce|e-commerce|shop|store|ই-কমার্স|ইকমার্স|দোকান|متجر|التجارة|电商|商城/i.test(combined)) {
    actions.push({
      label: lbl('E-Commerce Solutions', 'ই-কমার্স সার্ভিস', 'حلول التجارة الإلكترونية', '电商解决方案'),
      href: '/services-ecommerce',
      type: 'link',
    });
    actions.push({ label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' });
  } else if (/payment|bkash|nagad|stripe|sslcommerz|বিকাশ|নগদ|পেমেন্ট|دفع|支付/i.test(combined)) {
    actions.push({
      label: lbl('Payment Gateway Service', 'পেমেন্ট গেটওয়ে সার্ভিস', 'خدمة بوابات الدفع', '支付网关集成服务'),
      href: '/services-payment-gateway',
      type: 'link',
    });
    actions.push({ label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' });
  } else if (/team|founder|developer|who|টিম|কে|কারা|فريق|من نحن|团队|关于/i.test(combined)) {
    actions.push({
      label: lbl('Meet Our Team', 'আমাদের টিম দেখুন', 'تعرف على فريقنا', '认识我们的团队'),
      href: '/our-team',
      type: 'link',
    });
    actions.push({
      label: lbl('About MerxoDev', 'আমাদের সম্পর্কে', 'عن MerxoDev', '关于 MerxoDev'),
      href: '/about',
      type: 'link',
    });
  } else if (/tool|json|regex|jwt|geojson|টুল|أدوات|工具/i.test(combined)) {
    actions.push({
      label: lbl('Free Developer Tools', 'ফ্রি ডেভেলপার টুলস', 'أدوات المطورين المجانية', '免费开发者工具'),
      href: '/tools',
      type: 'link',
    });
  } else {
    actions.push({
      label: lbl('Services & Pricing', 'সকল সার্ভিস ও প্রাইসিং', 'الخدمات والأسعار', '服务与价格套餐'),
      href: '/services',
      type: 'link',
    });
    actions.push({ label: `WhatsApp (${WHATSAPP_DISPLAY})`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' });
  }

  const suggestionsByLang = {
    bn: [
      'ওয়েবসাইট প্যাকেজ ও দাম কত?',
      'আপনাদের করা প্রজেক্টগুলো দেখান',
      'ই-কমার্স ওয়েবসাইট তৈরি করতে চাই',
      'লাইভ টিমের সাথে কথা বলতে চাই',
    ],
    banglish: [
      'Website package o dam koto?',
      'Apnader kora project gulo dekhan',
      'Ecommerce website banate chai',
      'Live Team er sathe kotha bolbo',
    ],
    ar: [
      'ما هي أسعار وباقات المواقع؟',
      'اعرض أحدث مشاريعكم',
      'متجر إلكتروني وبوابات الدفع',
      'التحدث مع مسؤول مباشر',
    ],
    zh: [
      '网站开发套餐与价格？',
      '查看你们最近的项目案例',
      '电商网站与支付网关集成',
      '联系人工客服',
    ],
    en: [
      'Website pricing & packages?',
      'Show your recent projects',
      'E-commerce & Payment Gateway',
      'Talk to Live Team',
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
export function generateBuiltInIntelligentReply({
  userMessage,
  lang,
  projects = [],
  team = [],
  leadCaptured = {},
  matchedProject = null,
}) {
  const lower = userMessage.toLowerCase().trim();

  // 0. If the user just shared their phone number or email (Smart Lead Capture)
  if (leadCaptured.phone || leadCaptured.email) {
    const contactVal = leadCaptured.phone || leadCaptured.email;
    if (lang === 'bn') {
      return `ধন্যবাদ! আমরা আপনার যোগাযোগের তথ্য (**${contactVal}**) নোট করে নিয়েছি। আমাদের লিড ডেভেলপার খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।\n\nএর মধ্যে আপনার প্রজেক্টের কোনো বিশেষ রিকোয়ারমেন্ট থাকলে এখানে লিখে রাখতে পারেন!`;
    }
    if (lang === 'ar') {
      return `شكراً لك! لقد قمنا بحفظ بيانات التواصل الخاصة بك (**${contactVal}**) لدى فريقنا الهندسي. سيتواصل معك مطورنا الرئيسي قريباً جداً.\n\nفي هذه الأثناء، يمكنك مشاركة أي تفاصيل أو ميزات إضافية ترغب بها في مشروعك!`;
    }
    if (lang === 'zh') {
      return `非常感谢！我们已记录您的联系方式（**${contactVal}**），我们的首席工程师将很快与您联系。\n\n在此期间，您可以随时在这里补充您的项目具体需求或功能细节！`;
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
  if (/\b(in arabic|speak arabic|arabic please)\b/i.test(lower) || /(بالعربية|تكلم عربي)/.test(userMessage)) {
    return `بالتأكيد! سأتحدث معك باللغة **العربية** من الآن فصاعداً.\n\nكيف يمكنني مساعدتك في **MerxoDev Solutions**؟ يمكنك السؤال عن تطوير المواقع، تطبيقات الويب، المتاجر الإلكترونية، مشاريعنا، أو باقات الأسعار (**1,000 – 4,000 تاكا**)!`;
  }
  if (/\b(in chinese|speak chinese|chinese please)\b/i.test(lower) || /(用中文|说中文)/.test(userMessage)) {
    return `没问题！从现在起我将使用**中文**与您交流。\n\n请问有什么可以帮您？您可以咨询 **MerxoDev Solutions** 的定制网站开发、SaaS 应用、电商系统、项目案例或价格套餐（**BDT 1,000 – 4,000**）！`;
  }
  if (/\b(banglish e bolo|banglish a bolo|talk in banglish)\b/i.test(lower)) {
    return `Obosshoi! Ekhon theke ami apnar sathe **Banglish**-e kotha bolbo.\n\n**MerxoDev Solutions** er website development, ecommerce, pricing package (1,000 - 4,000 Taka) ba project somporke jekono proshno korte paren!`;
  }

  // 2. Greetings & "How are you"
  if (/^(hi|hello|hey|assalamu alaikum|salam|hlw|hola|good morning|good evening|kemon achen|kemon aso|কেমন আছেন|হ্যালো|সালাম|হাই|مرحبا|السلام عليكم|اهلا|你好|您好)\b/i.test(lower) && lower.length < 38) {
    if (lang === 'bn') {
      return `ওয়ালাইকুম আসসালাম ও শুভেচ্ছা! আমি **MerxoDev AI Assistant**। আমি ভালো আছি, আশা করি আপনিও ভালো আছেন।\n\nআপনার ব্যবসার জন্য কি নতুন **ওয়েবসাইট, ই-কমার্স শপ, নাকি কাস্টম ওয়েব অ্যাপ্লিকেশন** তৈরি করতে চাচ্ছেন? আমাকে জানান!`;
    }
    if (lang === 'ar') {
      return `أهلاً وسهلاً بك في **MerxoDev Solutions**! أنا **مساعد MerxoDev الذكي**.\n\nهل تبحث عن بناء **موقع إلكتروني حديث، متجر إلكتروني، أو تطبيق ويب مخصص** لعملك؟ اسألني أي شيء عن خدماتنا ومشاريعنا وأسعارنا!`;
    }
    if (lang === 'zh') {
      return `您好，欢迎来到 **MerxoDev Solutions**！我是您的 **MerxoDev AI 智能助手**。\n\n请问您是想为您的企业开发**现代定制网站、电子商务商城，还是全栈 SaaS Web 应用**？欢迎随时向我咨询！`;
    }
    if (lang === 'banglish') {
      return `Hello & Assalamu Alaikum! Ami **MerxoDev AI Assistant**. Alhamdulillah valo achi!\n\nApni ki apnar business er jonno **Website, Ecommerce Store, naki Custom Web App** banate chaccen? Amake bolun!`;
    }
    return `Hello and welcome to **MerxoDev Solutions**! I am your **MerxoDev AI Assistant**.\n\nAre you looking to build a **modern website, e-commerce store, or custom SaaS web application**? Ask me anything about our services, projects, or pricing!`;
  }

  // 2.5 Specific Project Details Lookup (when user asks about a specific project like "NickHo Motorsports project er feature gulo bolo..?")
  const matchedProj = matchedProject || findMatchingProject(userMessage, projects);
  if (matchedProj) {
    const d = extractProjectDetailsData(matchedProj);
    const featureLines =
      d.features.length > 0
        ? d.features
            .map((f, idx) => {
              const subTxt =
                f.subtitles.length > 0
                  ? `\n  ${f.subtitles.map((s) => `• ${s}`).join('\n  ')}`
                  : '';
              return `${idx + 1}. **${f.title}**${subTxt}`;
            })
            .join('\n')
        : `• **Modern Responsive UI/UX & Fast Performance**\n• **Full-Stack Custom Architecture**`;

    const techLine = d.tech.length > 0 ? d.tech.join(', ') : 'Next.js, React, Tailwind CSS';
    const metaParts = [
      d.client ? `**Client:** ${d.client}` : '',
      d.duration ? `**Duration:** ${d.duration}` : '',
    ].filter(Boolean);

    if (lang === 'bn') {
      return `**${d.title}** (${d.tag}) প্রজেক্টের বিস্তারিত তথ্য ও ফিচারসমূহ নিচে দেওয়া হলো:\n\n${
        d.description ? `${d.description}\n\n` : ''
      }**প্রধান ফিচারসমূহ (Key Features):**\n${featureLines}\n\n**ব্যবহৃত টেকনোলজি:** ${techLine}${
        metaParts.length > 0 ? `\n${metaParts.join(' | ')}` : ''
      }\n**প্রজেক্ট ডিটেইলস পেজ:** ${d.detailsUrl}${
        d.liveUrl ? `\n**লাইভ লিংক:** ${d.liveUrl}` : ''
      }`;
    }

    if (lang === 'banglish') {
      return `**${d.title}** (${d.tag}) project er complete details ebong feature gulo নিচে dewa holo:\n\n${
        d.description ? `${d.description}\n\n` : ''
      }**Key Features:**\n${featureLines}\n\n**Tech Stack:** ${techLine}${
        metaParts.length > 0 ? `\n${metaParts.join(' | ')}` : ''
      }\n**Details Page:** ${d.detailsUrl}${
        d.liveUrl ? `\n**Live Website:** ${d.liveUrl}` : ''
      }`;
    }

    return `Here are the complete details and features of **${d.title}** (${d.tag}) from its project details page:\n\n${
      d.description ? `${d.description}\n\n` : ''
    }**Key Features:**\n${featureLines}\n\n**Tech Stack:** ${techLine}${
      metaParts.length > 0 ? `\n${metaParts.join(' | ')}` : ''
    }\n**Project Details Page:** ${d.detailsUrl}${
      d.liveUrl ? `\n**Live Website:** ${d.liveUrl}` : ''
    }`;
  }

  // 3. Portfolio / Projects inquiry (uses live DB projects!)
  if (/\b(project|projects|portfolio|work|sample|demo|case stud|প্রজেক্ট|পোর্টফোলিও|কাজ দেখান|নমুনা|কি কি বানিয়েছেন|مشاريع|مشروع|أعمالكم|项目|案例|作品)\b/i.test(lower) || /(প্রজেক্ট|পোর্টফোলিও|مشاريع|مشروع|项目|案例)/.test(userMessage)) {
    const topProjects = projects.slice(0, 4);
    const projBullets =
      topProjects.length > 0
        ? topProjects.map((p) => `• **${p.title}** (${p.tag || 'Web App'})`).join('\n')
        : `• **Custom E-Commerce & Multi-Vendor Platforms**\n• **SaaS Dashboards & Booking Systems**\n• **High-Speed Next.js Corporate Portals**`;

    if (lang === 'bn') {
      return `**MerxoDev Solutions**-এর তৈরি কিছু উল্লেখযোগ্য লাইভ প্রজেক্ট হলো:\n\n${projBullets}\n\nআমাদের সব প্রজেক্টের লাইভ ডেমো ও বিস্তারিত দেখতে নিচের **আমাদের প্রজেক্ট দেখুন** বাটনে ক্লিক করুন!`;
    }
    if (lang === 'ar') {
      return `إليك بعض المشاريع الحية البارزة التي طورها فريق **MerxoDev Solutions**:\n\n${projBullets}\n\nاضغط على زر **عرض مشاريعنا** بالأسفل لاستكشاف العروض الحية وتفاصيل كل مشروع!`;
    }
    if (lang === 'zh') {
      return `以下是 **MerxoDev Solutions** 打造的部分精选上线项目案例：\n\n${projBullets}\n\n点击下方的**查看我们的项目**按钮即可体验线上演示与完整技术详情！`;
    }
    if (lang === 'banglish') {
      return `**MerxoDev Solutions** er toiri kichu live project নিচে dewa holo:\n\n${projBullets}\n\nAmader sob project er live demo dekhte nicher **View Our Projects** button e click korun!`;
    }
    return `Here are some of the featured live projects engineered by **MerxoDev Solutions**:\n\n${projBullets}\n\nClick **View Our Projects** below to explore live demos and technical case studies!`;
  }

  // 4. Team / About / Founder inquiry (uses live DB team!)
  if (/\b(team|member|founder|ceo|owner|developer|who are you|about merxodev|about company|টিম|মালিক|কে বানিয়েছে|আপনারা কারা|কোম্পানি সম্পর্কে|فريق|من أنتم|عن الشركة|团队|关于你们|公司介绍)\b/i.test(lower) || /(টিম|কোম্পানি|فريق|عن الشركة|团队|公司)/.test(userMessage)) {
    const teamBullets =
      team.length > 0
        ? team.slice(0, 5).map((m) => `• **${m.name}** — ${m.role}`).join('\n')
        : `• **Full-Stack Next.js & React Engineers**\n• **UI/UX Product Designers**\n• **Cloud & Security Architects**`;

    if (lang === 'bn') {
      return `**MerxoDev Solutions (মারক্সোডেভ সলিউশনস)** বাংলাদেশের (রংপুর) একটি আধুনিক সফটওয়্যার ও ওয়েব ডেভেলপমেন্ট এজেন্সি।\n\n**আমাদের টিম মেম্বারগণ:**\n${teamBullets}\n\nআমরা দেশ ও বিদেশের স্টার্টআপ এবং ব্যবসার জন্য দ্রুতগতির ওয়েবসাইট ও সফটওয়্যার তৈরি করি।`;
    }
    if (lang === 'ar') {
      return `**MerxoDev Solutions** هي وكالة متخصصة في هندسة البرمجيات وتطوير الويب مقرها في بنغلاديش، وتخدم العملاء حول العالم منذ عام 2023.\n\n**فريقنا الأساسي:**\n${teamBullets}\n\nنحن متخصصون في Next.js و React و Node.js ومنصات SaaS والمتاجر الإلكترونية.`;
    }
    if (lang === 'zh') {
      return `**MerxoDev Solutions** 是一家总部位于孟加拉国的现代化定制网站与软件工程机构，自 2023 年以来服务全球客户。\n\n**我们的核心团队：**\n${teamBullets}\n\n我们专注于 Next.js、React、Node.js、SaaS 平台以及电子商务系统开发。`;
    }
    if (lang === 'banglish') {
      return `**MerxoDev Solutions** holo Bangladesh (Rangpur) ভিত্তিক ekti modern web & software development agency.\n\n**Amader Team:**\n${teamBullets}\n\nAmra startup ebong business er jonno Next.js, React ও Node.js diye high-performance digital product toiri kori.`;
    }
    return `**MerxoDev Solutions** is a custom web & software engineering agency based in Rangpur, Bangladesh, serving clients worldwide since 2023.\n\n**Our Core Team:**\n${teamBullets}\n\nWe specialize in Next.js, React, Node.js, SaaS platforms, and e-commerce systems.`;
  }

  // 5. Pricing / Cost / Package inquiry
  if (/\b(price|pricing|cost|budget|rate|fee|charge|package|how much|koto|taka|dam|khoroch|দাম|খরচ|টাকা|বাজেট|প্যাকেজ|মূল্য|سعر|أسعار|باقات|تكلفة|كم|价格|套餐|多少钱|报价|费用)\b/i.test(lower) || /(দাম|খরচ|টাকা|প্যাকেজ|أسعار|باقات|سعر|تكلفة|价格|套餐|报价|多少钱)/.test(userMessage)) {
    if (lang === 'bn') {
      return `আমাদের স্ট্যান্ডার্ড ডিজিটাল সার্ভিস প্যাকেজগুলো অত্যন্ত সাশ্রয়ী (**১,০০০ টাকা থেকে ৪,০০০ টাকা**):\n\n• **স্টার্টার প্যাকেজ (১,০০০ – ১,৫০০ টাকা):** ল্যান্ডিং পেজ, পোর্টফোলিও, UI ডিজাইন, বাগ ফিক্স ও বেসিক SEO।\n• **প্রফেশনাল প্যাকেজ (২,০০০ – ৩,০০০ টাকা):** মাল্টি-পেজ রেসপন্সিভ ওয়েবসাইট, ডাইনামিক অ্যাডমিন প্যানেল, ডাটাবেস ও API।\n• **অ্যাডভান্সড / ই-কমার্স / SaaS (৩,৫০০ – ৪,০০০ টাকা):** ফুল-স্ট্যাক ওয়েব অ্যাপ, ই-কমার্স স্টোর এবং বিকাশ/নগদ/স্ট্রাইপ পেমেন্ট গেটওয়ে।\n\nআপনার প্রজেক্টের জন্য কাস্টম কোটেশন পেতে আপনার **WhatsApp নাম্বারটি** এখানে দিতে পারেন!`;
    }
    if (lang === 'ar') {
      return `باقاتنا القياسية لتطوير المواقع والبرمجيات ميسورة التكلفة جداً (**من 1,000 إلى 4,000 تاكا بنغلاديشي**، مع عروض مخصصة للمشاريع الكبيرة):\n\n• **باقة البداية (1,000 – 1,500 تاكا):** صفحات الهبوط، تصميم الواجهات، إصلاح الأخطاء وتحسين محركات البحث.\n• **الباقة الاحترافية (2,000 – 3,000 تاكا):** مواقع ديناميكية متعددة الصفحات، لوحة تحكم مخصصة، قواعد بيانات وواجهات API.\n• **الباقة المتقدمة والمتاجر و SaaS (3,500 – 4,000 تاكا):** تطبيقات ويب متكاملة ومتاجر إلكترونية مع ربط بوابات الدفع.\n\nشارك **رقم واتساب أو بريدك الإلكتروني** هنا وسيرسل لك مهندسنا الرئيسي عرضاً مفصلاً!`;
    }
    if (lang === 'zh') {
      return `我们的标准数字工程套餐性价比极高（**BDT 1,000 至 BDT 4,000**，大型企业项目支持按里程碑定制报价）：\n\n• **入门套餐（BDT 1,000 – 1,500）：** 高转化落地页、UI 设计、Bug 修复与基础 SEO 优化。\n• **专业套餐（BDT 2,000 – 3,000）：** 多页面动态响应式网站、定制后台管理系统、API 与数据库架构。\n• **高级 / 电商 / SaaS 套餐（BDT 3,500 – 4,000）：** 全栈定制 Web 应用、电商商城与在线支付网关集成。\n\n欢迎在此留下您的 **WhatsApp 号码或邮箱**，我们的首席工程师将为您提供专属方案！`;
    }
    if (lang === 'banglish') {
      return `Amader digital service package gulo khub shashroye (**BDT 1,000 theke BDT 4,000**):\n\n• **Starter Package (1,000 – 1,500 Taka):** Landing page, UI design, bug fix, basic SEO.\n• **Professional Package (2,000 – 3,000 Taka):** Full responsive website, custom admin panel, API & database.\n• **Advanced / Ecommerce / SaaS (3,500 – 4,000 Taka):** Custom Web App, Ecommerce store with bKash/Nagad/Stripe payment gateway.\n\nApni chaile apnar **WhatsApp number** ekhane dite paren, amader developer direct call korbe!`;
    }
    return `Our standard digital engineering packages range between **BDT 1,000 and BDT 4,000** (with custom milestone quotes for large enterprise systems):\n\n• **Starter Tier (BDT 1,000 – 1,500):** High-converting landing pages, UI design, bug fixes & SEO.\n• **Professional Tier (BDT 2,000 – 3,000):** Dynamic multi-page websites, custom CMS, APIs & database.\n• **Advanced & SaaS (BDT 3,500 – 4,000):** Custom Web Apps & E-Commerce stores with payment gateways.\n\nShare your **WhatsApp number or email** here and our lead engineer will send you a tailored roadmap!`;
  }

  // 6. Services overview
  if (/\b(service|services|offer|solution|what do you do|সার্ভিস|সেবা|কি কাজ করেন|কী কাজ করেন|ki kaj koren|ki service|خدمات|خدمة|服务|业务)\b/i.test(lower) || /(সার্ভিস|সেবা|خدمات|服务)/.test(userMessage)) {
    if (lang === 'bn') {
      return `**MerxoDev Solutions**-এ আমাদের প্রধান সেবাসমূহ:\n\n১. **কাস্টম ওয়েবসাইট ডেভেলপমেন্ট** (Next.js 16, React, Tailwind CSS)\n২. **কাস্টম ওয়েব অ্যাপ ও SaaS প্ল্যাটফর্ম**\n৩. **ই-কমার্স ও অনলাইন শপ** (কার্ট, স্টক, অর্ডার ট্র্যাকিং)\n৪. **পেমেন্ট গেটওয়ে ইন্টিগ্রেশন** (বিকাশ, নগদ, রকেট, SSLCommerz, Stripe)\n৫. **UI/UX ও Figma ডিজাইন**\n৬. **টেকনিক্যাল SEO ও স্পিড অপ্টিমাইজেশন**\n৭. **API ইন্টিগ্রেশন, AI অটোমেশন ও ২৪/৭ মেইনটেন্যান্স**`;
    }
    if (lang === 'ar') {
      return `تقدم **MerxoDev Solutions** خدمات هندسة رقمية متكاملة:\n\n1. **تطوير المواقع المخصصة** (Next.js 16, React 19, Tailwind CSS)\n2. **تطبيقات الويب ومنصات SaaS**\n3. **المتاجر الإلكترونية المتكاملة** (إدارة المخزون، سلة التسوق، لوحة التحكم)\n4. **ربط بوابات الدفع** (bKash, Nagad, SSLCommerz, Stripe)\n5. **تصميم واجهات وتجربة المستخدم UI/UX**\n6. **تحسين محركات البحث التقني SEO**\n7. **تكامل API، قواعد البيانات السحابية والصيانة 24/7**`;
    }
    if (lang === 'zh') {
      return `**MerxoDev Solutions** 提供全方位数字化工程开发服务：\n\n1. **定制网站开发**（Next.js 16、React 19、Tailwind CSS）\n2. **定制 Web 应用程序与 SaaS 平台**\n3. **电子商务系统**（商品管理、购物车、订单与后台 CMS）\n4. **支付网关集成**（bKash、Nagad、SSLCommerz、Stripe）\n5. **UI/UX 与 Figma 界面设计**\n6. **技术 SEO 与 AI 搜索优化**\n7. **API 集成、云数据库与 24/7 运维支持**`;
    }
    if (lang === 'banglish') {
      return `**MerxoDev Solutions** e amra নিচের main service gulo provide kori:\n\n1. **Custom Website Development** (Next.js 16, React, Tailwind CSS)\n2. **Custom Web App & SaaS Development**\n3. **Ecommerce Website** (Cart, Checkout, Admin Dashboard)\n4. **Payment Gateway Integration** (bKash, Nagad, SSLCommerz, Stripe)\n5. **UI/UX Design & Figma to Code**\n6. **Technical SEO & Speed Optimization**\n7. **API, Database, Security & 24/7 Maintenance**`;
    }
    return `**MerxoDev Solutions** provides end-to-end digital engineering services:\n\n1. **Custom Website Development** (Next.js 16, React 19, Tailwind CSS)\n2. **Custom Web Applications & SaaS Platforms**\n3. **E-Commerce Stores** (Inventory, Checkout, Admin CMS)\n4. **Payment Gateway Integration** (bKash, Nagad, SSLCommerz, Stripe)\n5. **UI/UX & Figma Design**\n6. **Technical SEO & AI Search Optimization**\n7. **API Integration, Cloud Databases & 24/7 Maintenance**`;
  }

  // 7. E-Commerce & Payment Gateways
  if (/\b(ecommerce|e-commerce|shop|store|bkash|nagad|rocket|payment|stripe|sslcommerz|ইকমার্স|ই-কমার্স|দোকান|বিকাশ|নগদ|পেমেন্ট|متجر|التجارة|دفع|电商|商城|支付)\b/i.test(lower) || /(ইকমার্স|ই-কমার্স|পেমেন্ট|বিকাশ|متجر|دفع|电商|支付)/.test(userMessage)) {
    if (lang === 'bn') {
      return `আমরা সম্পূর্ণ কাস্টম **ই-কমার্স ওয়েবসাইট এবং পেমেন্ট গেটওয়ে** তৈরি করি:\n\n• আনলিমিটেড প্রোডাক্ট আপলোড, ক্যাটাগরি ও স্টক ম্যানেজমেন্ট\n• **বিকাশ, নগদ, রকেট, SSLCommerz এবং Stripe** অটো পেমেন্ট গেটওয়ে\n• অটোমেটিক অর্ডার নোটিফিকেশন ও PDF ইনভয়েস\n• সুপার-ফাস্ট মোবাইল ও ডেস্কটপ শপিং এক্সপেরিয়েন্স (**২,৫০০ – ৪,০০০ টাকা**)`;
    }
    if (lang === 'ar') {
      return `نقوم ببناء **متاجر إلكترونية متكاملة** مع ربط مباشر **ببوابات الدفع**:\n\n• لوحة تحكم شاملة لإدارة المنتجات والمخزون والطلبات\n• ربط فوري مع **bKash و Nagad و SSLCommerz و Stripe**\n• فواتير PDF تلقائية وإشعارات فورية للطلبات\n• **التكلفة:** من 2,500 إلى 4,000 تاكا حسب الميزات المطلوبة.`;
    }
    if (lang === 'zh') {
      return `我们打造高转化的**定制电商网站**并提供完整的**支付网关集成**：\n\n• 完善的商品目录、购物车、库存与订单管理后台\n• 支持 **bKash、Nagad、Rocket、SSLCommerz 与 Stripe** 自动收款验证\n• 自动生成 PDF 发票与实时订单通知\n• **套餐价格：** BDT 2,500 – BDT 4,000（按功能需求定制）。`;
    }
    if (lang === 'banglish') {
      return `Amra complete **Ecommerce Website ebong Auto Payment Gateway** integrate kore di:\n\n• Product upload, inventory o order management panel\n• **bKash, Nagad, Rocket, SSLCommerz ebong Stripe** instant payment gateway\n• Automated order invoice & SMS/Email alert\n• Package price: **BDT 2,500 – 4,000 Taka**`;
    }
    return `We build high-converting **E-Commerce Stores** with direct **Payment Gateway Integrations**:\n\n• Complete product catalog, cart, and order management dashboard\n• **bKash, Nagad, Rocket, SSLCommerz, Shurjopay & Stripe** tokenized checkout\n• Automated PDF invoices and instant webhook verification\n• **Pricing:** BDT 2,500 – BDT 4,000 based on features.`;
  }

  // 8. Contact / Phone / Email / Location / Discovery Call
  if (/\b(contact|hire|phone|number|call|whatsapp|email|address|location|meet|meeting|যোগাযোগ|ফোন|নাম্বার|ঠিকানা|ইমেইল|লোকেশন|jogajog|thikana|تواصل|اتصال|هاتف|واتساب|عنوان|联系|电话|邮箱|地址)\b/i.test(lower) || /(যোগাযোগ|ফোন|ঠিকানা|تواصل|هاتف|联系|电话)/.test(userMessage)) {
    if (lang === 'bn') {
      return `আমাদের সাথে সরাসরি যোগাযোগ করার মাধ্যম:\n\n**ফোন / হোয়াটসঅ্যাপ:** ${WHATSAPP_DISPLAY} | ${SECONDARY_PHONE}\n**ইমেইল:** ${EMAIL}\n**ঠিকানা:** ${LOCATION}\n**সার্ভিস টাইম:** ২৪/৭ অনলাইন সাপোর্ট (১৫ মিনিটের ফ্রি Google Meet কনসালটেশন বুক করতে পারেন!)`;
    }
    if (lang === 'ar') {
      return `يمكنك التواصل مع **MerxoDev Solutions** مباشرة في أي وقت:\n\n**الهاتف / واتساب:** ${WHATSAPP_DISPLAY} | ${SECONDARY_PHONE}\n**البريد الإلكتروني:** ${EMAIL}\n**الموقع:** ${LOCATION}\n**التوفر:** دعم واستشارات على مدار الساعة 24/7 مع مكالمة استكشافية مجانية لمدة 15 دقيقة عبر Google Meet!`;
    }
    if (lang === 'zh') {
      return `您可以随时通过以下方式直接联系 **MerxoDev Solutions**：\n\n**电话 / WhatsApp:** ${WHATSAPP_DISPLAY} | ${SECONDARY_PHONE}\n**邮箱:** ${EMAIL}\n**地址:** ${LOCATION}\n**服务时间:** 24/7 在线支持，并可预约 15 分钟免费 Google Meet 项目咨询！`;
    }
    if (lang === 'banglish') {
      return `Amader sathe direct jogajog korar maddhom:\n\n**Phone / WhatsApp:** ${WHATSAPP_DISPLAY} | ${SECONDARY_PHONE}\n**Email:** ${EMAIL}\n**Location:** ${LOCATION}\n**Available:** 24/7 Online Support & Free 15-Min Google Meet Consultation!`;
    }
    return `You can reach **MerxoDev Solutions** directly anytime:\n\n**Phone / WhatsApp:** ${WHATSAPP_DISPLAY} | ${SECONDARY_PHONE}\n**Email:** ${EMAIL}\n**Location:** ${LOCATION}\n**Availability:** 24/7 Client Consultation & Free 15-Minute Google Meet Discovery Call!`;
  }

  // 9. Delivery Timeline
  if (/\b(timeline|delivery|duration|deadline|how long|days|time|কত দিন|সময়|ডেলিভারি|koto din|shomoy|kotodin|مدة|التسليم|كم يستغرق|周期|多久|交付|时间)\b/i.test(lower) || /(কত দিন|ডেলিভারি|مدة|التسليم|周期|多久|交付)/.test(userMessage)) {
    if (lang === 'bn') {
      return `আমাদের প্রজেক্ট ডেলিভারি সময়সীমা:\n\n• **ল্যান্ডিং পেজ / বাগ ফিক্স:** ২৪ – ৪৮ ঘণ্টা\n• **কমপ্লিট বিজনেস ওয়েবসাইট:** ৩ – ৭ দিন\n• **ফুল ওয়েব অ্যাপ / ই-কমার্স:** ৭ – ১৪ দিন\n\nকাজ চলাকালীন আপনি লাইভ প্রিভিউ লিংক দেখতে পাবেন এবং ডেলিভারির পর ৩০ দিনের ফ্রি সাপোর্ট পাবেন।`;
    }
    if (lang === 'ar') {
      return `الجدول الزمني القياسي لتسليم المشاريع لدينا:\n\n• **صفحات الهبوط / إصلاح الأخطاء:** 24 إلى 48 ساعة\n• **موقع شركات متكامل:** 3 إلى 7 أيام\n• **تطبيق ويب كامل / متجر إلكتروني:** 7 إلى 14 يوماً\n\nيشمل كل مشروع روابط معاينة حية وضمان دعم فني مجاني لمدة 30 يوماً بعد الإطلاق.`;
    }
    if (lang === 'zh') {
      return `我们的标准项目交付周期如下：\n\n• **落地页 / Bug 修复：** 24 至 48 小时\n• **完整企业网站：** 3 至 7 天\n• **全栈 Web 应用 / 电商平台：** 7 至 14 天\n\n每个项目均提供实时测试预览链接，并在上线后享有 30 天免费技术质保支持。`;
    }
    if (lang === 'banglish') {
      return `Amader project delivery timeline:\n\n• **Landing Page / Bug Fix:** 24 – 48 Hours\n• **Full Business Website:** 3 – 7 Days\n• **Custom Web App / Ecommerce:** 7 – 14 Days\n\nKaj cholar shomoy live staging preview ebong launch er por 30 din free support paben!`;
    }
    return `Our standard project delivery timelines:\n\n• **Landing Page / Bug Fixes:** 24 to 48 Hours\n• **Complete Business Website:** 3 to 7 Days\n• **Full Web App / E-Commerce:** 7 to 14 Days\n\nEvery project includes live staging previews and 30 days of free post-launch support.`;
  }

  // 10. Technologies / Stack / Tools
  if (/\b(tech|technology|stack|framework|nextjs|react|tailwind|database|node|prisma|tool|টেকনোলজি|প্রযুক্তি|কি দিয়ে|تقنيات|برمجة|技术栈|技术)\b/i.test(lower)) {
    if (lang === 'bn') {
      return `আমরা সর্বাধুনিক টেকনোলজি স্ট্যাক ব্যবহার করে কাজ করি:\n\n• **Frontend:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **Backend & API:** Node.js, Next.js Server Actions, REST & GraphQL\n• **Database:** PostgreSQL, Prisma ORM, MongoDB, Supabase\n• **Cloud & Security:** Vercel, AWS, Cloudflare, NextAuth 2FA`;
    }
    if (lang === 'ar') {
      return `نحن نستخدم أحدث التقنيات العالمية لبناء منتجات سريعة وآمنة:\n\n• **الواجهة الأمامية:** Next.js 16, React 19, Tailwind CSS, GSAP\n• **الواجهة الخلفية والـ API:** Node.js, Next.js Server Actions, REST, GraphQL\n• **قواعد البيانات:** PostgreSQL, Prisma ORM, MongoDB, Supabase\n• **السحابة والأمان:** Vercel, AWS, Cloudflare, NextAuth 2FA`;
    }
    if (lang === 'zh') {
      return `我们采用现代、可扩展的主流技术栈构建数字化产品：\n\n• **前端架构：** Next.js 16 (App Router)、React 19、Tailwind CSS、GSAP\n• **后端与 API：** Node.js、Next.js Server Actions、REST、GraphQL\n• **数据库：** PostgreSQL、Prisma ORM、MongoDB、Supabase、Neon\n• **云服务与安全：** Vercel、AWS、Cloudflare、NextAuth 2FA`;
    }
    return `We engineer products using modern, scalable technologies:\n\n• **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, GSAP\n• **Backend & APIs:** Node.js, Next.js Server Actions, REST, GraphQL\n• **Databases:** PostgreSQL, Prisma ORM, MongoDB, Supabase, Neon\n• **Cloud & Hosting:** Vercel, AWS, Cloudflare`;
  }

  // 11. Website / Web App general inquiry
  if (/\b(web|website|app|software|build|make|create|need|want|ওয়েবসাইট|অ্যাপ|সফটওয়্যার|বানাতে|তৈরি|banate|banabo|dorkar|موقع|تطبيق|برمجة|网站|应用|软件|开发)\b/i.test(lower) || /(ওয়েবসাইট|অ্যাপ|موقع|تطبيق|网站|开发)/.test(userMessage)) {
    if (lang === 'bn') {
      return `আমরা আপনার প্রয়োজন অনুযায়ী **কাস্টম ওয়েবসাইট, ই-কমার্স স্টোর অথবা ওয়েব অ্যাপ্লিকেশন** তৈরি করে দিতে পারি!\n\n• **বাজেট:** সাধারণত ১,০০০ টাকা থেকে ৪,০০০ টাকার মধ্যে (প্রজেক্টের পরিধি অনুযায়ী)।\n• **টেকনোলজি:** Next.js 16, React, Node.js ও PostgreSQL।\n\nআপনি কী ধরনের ওয়েবসাইট বানাতে চাচ্ছেন? চাইলে আপনার **WhatsApp নাম্বারটি** চ্যাটে দিন অথবা উপরে **লাইভ টিম** বাটনে ক্লিক করে সরাসরি টিমের সাথে কথা বলুন!`;
    }
    if (lang === 'ar') {
      return `يسعدنا بناء **موقعك المخصص، متجرك الإلكتروني، أو تطبيق الويب** الخاص بك!\n\n• **الباقات:** من 1,000 إلى 4,000 تاكا (أو مراحل مخصصة للمشاريع الكبيرة)\n• **التقنيات:** Next.js 16, React 19, Tailwind CSS, Node.js & PostgreSQL\n\nأخبرني بفكرة مشروعك، أو شارك **رقم واتساب** الخاص بك، أو اضغط على **مسؤول مباشر** بالأعلى للتحدث مباشرة مع فريقنا!`;
    }
    if (lang === 'zh') {
      return `我们非常乐意为您开发**定制网站、电子商务商城或 Web 应用程序**！\n\n• **套餐价格：** BDT 1,000 – BDT 4,000（大型项目支持定制报价）\n• **技术栈：** Next.js 16、React 19、Tailwind CSS、Node.js 与 PostgreSQL\n\n请告诉我您的项目构想，留下您的 **WhatsApp 号码**，或点击上方的**人工客服**直接与我们的团队沟通！`;
    }
    if (lang === 'banglish') {
      return `Amra apnar requirement onujayi **Custom Website, Ecommerce Store ba Web Application** toiri kore dite parbo!\n\n• **Budget:** 1,000 Taka theke 4,000 Taka (project onujayi).\n• **Tech Stack:** Next.js 16, React, Tailwind CSS, Node.js & PostgreSQL.\n\nApni ki dhoroner site banate chan? Chaile apnar **WhatsApp number** ekhane din ba **Live Team** button e click kore direct kotha bolun!`;
    }
    return `We would love to build your **custom website, e-commerce store, or web application**!\n\n• **Packages:** BDT 1,000 – BDT 4,000 (or custom enterprise milestones)\n• **Stack:** Next.js 16, React 19, Tailwind CSS, Node.js & PostgreSQL\n\nTell me a bit about your project idea, share your **WhatsApp number**, or click **Live Team** above to chat directly with our team!`;
  }

  // 12. Smart Conversational Default (Domain-restricted to MerxoDev Solutions)
  if (lang === 'bn') {
    return `আমি **MerxoDev AI Assistant** — আমি শুধুমাত্র **MerxoDev Solutions**-এর ওয়েবসাইট ডেভেলপমেন্ট, ই-কমার্স, কাস্টম সফটওয়্যার, আমাদের প্রজেক্টসমূহ এবং প্রাইসিং (**১,০০০ – ৪,০০০ টাকা**) সম্পর্কে সব তথ্য দিতে পারি।\n\nআপনি কি কোনো ওয়েবসাইট বা অ্যাপ তৈরি করতে চাচ্ছেন, নাকি আমাদের লাইভ টিমের সাথে সরাসরি কথা বলতে চান?`;
  }
  if (lang === 'ar') {
    return `أنا **مساعد MerxoDev الذكي**، المخصص لشركة **MerxoDev Solutions**. يمكنني الإجابة عن أي استفسار حول خدمات تطوير المواقع والتطبيقات، المتاجر الإلكترونية، مشاريعنا، والأسعار (**1,000 – 4,000 تاكا**).\n\nكيف يمكننا مساعدتك في بناء مشروعك القادم؟ يمكنك أيضاً الضغط على **مسؤول مباشر** في أي وقت للتحدث مع فريقنا!`;
  }
  if (lang === 'zh') {
    return `我是 **MerxoDev AI 智能助手**，专为 **MerxoDev Solutions** 提供服务。我可以为您解答关于定制网站与 Web 应用开发、电商解决方案、项目案例、团队及价格套餐（**BDT 1,000 – 4,000**）的任何问题。\n\n请问我们可以如何帮助您构建下一个网站或软件项目？您也可以随时点击**人工客服**与我们的真人团队交流！`;
  }
  if (lang === 'banglish') {
    return `Ami **MerxoDev AI Assistant** — ami **MerxoDev Solutions** er website development, ecommerce, SaaS app, amader portfolio project ebong pricing (**1,000 – 4,000 Taka**) niye apnake shob tottho dite pari.\n\nApni ki kono website ba software banate chaccen, naki amader **Live Team** er sathe direct kotha bolte chan?`;
  }
  return `I am **MerxoDev AI**, dedicated to **MerxoDev Solutions**. I can answer anything about our custom web & app development services, e-commerce solutions, portfolio projects, team, and pricing (**BDT 1,000 – BDT 4,000**).\n\nHow can we help build your next website or software project? You can also click **Live Team** anytime to chat with a real person!`;
}

export async function generateAiResponse({
  userMessage,
  history = [],
  session = null,
  leadCaptured = {},
  preferredLang,
  isFirstMessage = false,
}) {
  const previousLang = preferredLang || session?.language || 'en';
  const lang = detectLanguage(userMessage, previousLang, {
    preferredLang,
    isFirstMessage,
  });
  const [{ projects, team }, aiConfig] = await Promise.all([
    getDynamicWebsiteContext(),
    getAiConfig(),
  ]);

  const matchedProject = findMatchingProject(userMessage, projects, history);

  const systemPrompt = buildSystemPrompt({
    projects,
    team,
    customInstructions: aiConfig.customInstructions,
    session,
    preferredLang: preferredLang || previousLang,
    targetLang: lang,
    isFirstMessage,
    matchedProject,
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
      matchedProject,
    });
  }

  const { actions, suggestions } = buildContextualActionsAndSuggestions(
    userMessage,
    reply,
    lang,
    projects,
    matchedProject
  );

  return {
    reply,
    lang,
    actions,
    suggestions,
  };
}

