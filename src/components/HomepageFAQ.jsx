'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiHelpCircle, FiCheck, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import '@/components/i18n';

const FAQ_ITEMS = [
  {
    id: 'cost-pricing',
    qEn: 'How much does it cost to build a website or web app in Bangladesh?',
    qBn: 'একটি ওয়েবসাইট বা ওয়েব অ্যাপ বানাতে কত খরচ হয়? (Website banate koto khoroch hoy?)',
    aEn: 'Pricing depends on project scope and features. Standard responsive business websites start from BDT 1,000 to BDT 3,500, full-featured dynamic E-Commerce platforms range around BDT 1,500 to BDT 4,000+, and custom SaaS web applications are quoted transparently based on architecture. We provide 100% fixed transparent quotes with zero hidden fees.',
    aBn: 'প্রজেক্টের সাইজ ও ফিচারের ওপর খরচ নির্ভর করে। সাধারণ বিজনেস ওয়েবসাইট বা ল্যান্ডিং পেইজ BDT ১,০০০ থেকে BDT ৩,৫০০, ডায়নামিক ই-কমার্স ওয়েবসাইট BDT ১,৫০০ থেকে BDT ৪,০০০+ এবং কাস্টম SaaS ওয়েব অ্যাপ্লিকেশন প্রয়োজনীয় ফিচার অনুযায়ী নির্ধারিত হয়। আমরা কোনো লুকানো চার্জ ছাড়া ফিক্সড ট্রান্সপারেন্ট বাজেট প্রদান করি।',
    category: 'Pricing & Budget',
  },
  {
    id: 'delivery-timeline',
    qEn: 'How long does it take to deliver a finished project?',
    qBn: 'একটি প্রজেক্ট ডেলিভারি হতে কতদিন সময় লাগে? (Website banate koydin shomoy lage?)',
    aEn: 'Standard landing pages and business websites are completed in 1 to 2 weeks. Custom e-commerce portals take 2 to 4 weeks, and complex full-stack SaaS web applications take 4 to 8 weeks. We provide a milestone-based sprint roadmap with regular live staging demos.',
    aBn: 'ল্যান্ডিং পেইজ বা বিজনেস ওয়েবসাইট সাধারণত ১ থেকে ২ সপ্তাহে ডেলিভারি দেওয়া হয়। ই-কমার্স ওয়েবসাইট ২ থেকে ৪ সপ্তাহ এবং বড় কাস্টম SaaS প্ল্যাটফর্ম ৪ থেকে ৮ সপ্তাহের মধ্যে সম্পন্ন হয়। কাজের অগ্রগতির সাথে সাথে আমরা নিয়মিত লাইভ ডেমো লিংক প্রদান করি।',
    category: 'Timeline & Process',
  },
  {
    id: 'source-code-ownership',
    qEn: 'Do I get 100% full source code ownership and intellectual property rights?',
    qBn: 'আমি কি ফুল সোর্স কোডের ১০০% মালিকানা পাবো? (Source code ownership pabo ki?)',
    aEn: 'Yes, absolutely! Once final project delivery is completed, 100% full ownership of the clean source code, GitHub repository, deployment keys, and intellectual property is transferred directly to you. No vendor lock-in or recurring source code licensing fees.',
    aBn: 'হ্যাঁ, ১০০%! প্রজেক্ট সম্পন্ন হওয়ার পর সম্পূর্ণ ক্লিন সোর্স কোড, গিটহাব রিপোজিটরি, ডাটাবেজ এক্সেস এবং সম্পূর্ণ বৌদ্ধিক মালিকানা সরাসরি আপনার কাছে হস্তান্তর করা হবে। এর জন্য কোনো মাসিক রয়্যালটি বা লাইসেন্স ফি দিতে হয় না।',
    category: 'Code Ownership',
  },
  {
    id: 'tech-stack',
    qEn: 'Which technology stack do you use and why Next.js?',
    qBn: 'আপনারা কোন টেকনোলজি ব্যবহার করেন এবং কেন Next.js? (Keno Next.js use koren?)',
    aEn: 'We specialize in Next.js, React, Node.js, Tailwind CSS, PostgreSQL, MongoDB, and modern cloud deployment on Vercel and AWS. Next.js delivers world-class SEO rendering (SSR/SSG), sub-second page load speeds, high security, and effortless scalability compared to heavy legacy WordPress themes.',
    aBn: 'আমরা Next.js, React, Node.js, Tailwind CSS, PostgreSQL, MongoDB এবং ক্লাউড হোস্টিং নিয়ে কাজ করি। পুরাতন ও স্লো ওয়ার্ডপ্রেসের তুলনায় Next.js এ ওয়েবসাইট সুপারফাস্ট লোড হয়, গুগলে সহজে র‍্যাংক করে (SEO Friendly) এবং হ্যাকিং বা সিকিউরিটি রিস্ক থাকে না বললেই চলে।',
    category: 'Technology',
  },
  {
    id: 'support-maintenance',
    qEn: 'Do you provide post-launch support and maintenance?',
    qBn: 'প্রজেক্ট লঞ্চের পর কি কোনো ফ্রি সাপোর্ট বা মেইনটেনেন্স পাওয়া যায়? (Post launch support ache?)',
    aEn: 'Yes! Every project includes 1 to 6 months of free post-launch support and bug fixes. We also offer affordable monthly SLA maintenance packages for regular backups, security patches, uptime monitoring, and feature upgrades.',
    aBn: 'হ্যাঁ! প্রতিটি প্রজেক্টেই ১ থেকে ৬ মাসের ফ্রি টেকনিক্যাল সাপোর্ট ও বাগ ফিক্সিং অন্তর্ভুক্ত থাকে। এছাড়াও পরবর্তীতে সাইটের নিয়মিত ব্যাকআপ, স্পিড অপ্টিমাইজেশন ও নতুন ফিচার আপডেটের জন্য আমাদের মাসিক মেইনটেনেন্স প্যাকেজ রয়েছে।',
    category: 'Support',
  },
  {
    id: 'international-clients-payment',
    qEn: 'Can international clients work with MerxoDev Solutions and what payment methods are accepted?',
    qBn: 'বিদেশি বা আন্তর্জাতিক ক্লায়েন্টরা কীভাবে কাজ করবেন এবং কীভাবে পেমেন্ট করবেন?',
    aEn: 'We work with clients globally (USA, UK, Canada, UAE, Europe, Bangladesh). We accept international payments via Wire Transfer, Wise, Stripe, Payoneer, and local payments via bKash, Nagad, and Bangladeshi Bank transfers. All contracts include legally compliant invoices and NDAs upon request.',
    aBn: 'আমরা বিশ্বব্যাপী (যুক্তরাষ্ট্র, যুক্তরাজ্য, কানাডা, দুবাই, ইউরোপ ও বাংলাদেশ) ক্লায়েন্টদের সাথে রিমোটলি কাজ করি। আন্তর্জাতিক ক্লায়েন্টদের জন্য Wise, Stripe, Payoneer, ব্যাংক ওয়্যার ট্রান্সফার এবং বাংলাদেশি ক্লায়েন্টদের জন্য বিকাশ, নগদ ও লোকাল ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট সুবিধা রয়েছে।',
    category: 'Payment & Global',
  },
];

export default function HomepageFAQ() {
  const { i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  const isBn = i18n.language === 'bn';

  // Generate structured FAQ Schema for Google Search Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: isBn ? item.qBn : item.qEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isBn ? item.aBn : item.aEn,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 relative overflow-hidden bg-white dark:bg-zinc-950"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Schema.org FAQPage structured JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold mb-4 tracking-wide">
            <FiHelpCircle className="text-violet-600 dark:text-violet-400" />
            <span>{isBn ? 'সাধারণ প্রশ্নোত্তর (FAQ)' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          </div>

          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight"
          >
            {isBn ? 'আপনার মনে থাকা প্রশ্নগুলোর ' : 'Got Questions? '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-cyan-500">
              {isBn ? 'সহজ ও স্পষ্ট উত্তর' : 'We Have Answers.'}
            </span>
          </h2>

          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            {isBn
              ? 'ওয়েবসাইট ও সফটওয়্যার ডেভেলপমেন্ট প্রজেক্ট শুরুর আগে জেনে নিন গুরুত্বপূর্ণ সব তথ্য।'
              : 'Everything you need to know about our pricing, timelines, source code ownership, and engineering process.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const question = isBn ? item.qBn : item.qEn;
            const answer = isBn ? item.aBn : item.aEn;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-violet-500/60 dark:border-violet-600/70 bg-violet-50/20 dark:bg-zinc-900 shadow-md shadow-violet-500/5'
                    : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                        isOpen
                          ? 'bg-violet-600 text-white'
                          : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen
                          ? 'text-violet-700 dark:text-violet-400'
                          : 'text-zinc-900 dark:text-zinc-100'
                      }`}
                      itemProp="name"
                    >
                      {question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-violet-600 text-white border-violet-600 rotate-180'
                        : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 rotate-0'
                    }`}
                  >
                    <FiChevronDown size={17} />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed border-t border-zinc-200/60 dark:border-zinc-800/60 mt-1">
                      <p itemProp="text" className="mt-3">
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-600/10 via-rose-500/10 to-cyan-500/10 border border-violet-200/60 dark:border-violet-900/40 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              {isBn ? 'আপনার অন্য কোনো প্রশ্ন আছে?' : 'Still have a specific question?'}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {isBn
                ? 'আমাদের টেক এক্সপার্টদের সাথে সরাসরি কথা বলে সমাধান জেনে নিন।'
                : 'Get in touch directly with our team. We are available 24/7.'}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
          >
            <span>{isBn ? 'মেসেজ পাঠান' : 'Ask Us Directly'}</span>
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
