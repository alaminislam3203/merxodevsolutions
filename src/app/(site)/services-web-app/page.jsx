import WebAppContent from '@/components/WebAppContent';

// ── 1. Static Metadata (Next.js App Router) ──────────────────────────────────
export const metadata = {
  // Primary SEO
  title: 'Custom Web Application & SaaS Development Bangladesh | MerxoDev Solutions',
  description:
    'We engineer high-performance full-stack web applications, SaaS platforms, MVPs, and enterprise cloud solutions using Next.js, React, Node.js, and PostgreSQL in Bangladesh.',

  // Canonical URL
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-web-app',
  },

  // Keywords (Three-tier English, Bengali, Banglish)
  keywords: [
    // English
    'web app development Bangladesh',
    'custom web application development',
    'SaaS application development Bangladesh',
    'full-stack web development agency',
    'Next.js web app developer',
    'React Node.js full stack app',
    'MVP development for startups Bangladesh',
    'cloud native web application',
    'custom CRM ERP dashboard development',
    // Bengali (বাংলা)
    'কাস্টম ওয়েব অ্যাপ্লিকেশন',
    'সাস সফটওয়্যার ডেভেলপমেন্ট',
    'ওয়েব অ্যাপ তৈরির কোম্পানি বাংলাদেশ',
    'ব্যবসার জন্য সফটওয়্যার তৈরি',
    'স্টার্টআপ এমভিপি ডেভেলপমেন্ট রংপুর ঢাকা',
    // Banglish (বাংলিশ)
    'web app banano bangladesh',
    'saas software toiri kora',
    'custom software banate koto taka lage',
    'mvp bananor agency',
    'startup web application bd',
  ],

  // Open Graph
  openGraph: {
    title: 'Custom Web Application & SaaS Development Bangladesh | MerxoDev Solutions',
    description:
      'We build fast, scalable, full-stack web applications and SaaS platforms from MVP to enterprise scale.',
    url: 'https://merxodevsolutions.pro.bd/services-web-app',
    siteName: 'MerxoDev Solutions',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Web App Development Services',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Web Application & SaaS Development | MerxoDev Solutions',
    description:
      'From MVP to enterprise — we build scalable web apps with React, Next.js, and Node.js.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

// ── 2. JSON-LD Structured Data ────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Web Application Development',
  description:
    'Custom full-stack web application development services including UI/UX design, cloud deployment, API integrations, and ongoing support.',
  provider: {
    '@type': 'Organization',
    name: 'MerxoDev Solutions',
    url: 'https://merxodevsolutions.pro.bd',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Bangladesh',
  },
  serviceType: 'Web Application Development',
  url: 'https://merxodevsolutions.pro.bd/services-web-app',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web App Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Custom UI & UX Design' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Full-Stack Development' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Cloud-Ready Architecture' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Authentication & Security' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Performance Optimization' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'API & Integrations' },
      },
    ],
  },
};

// ── 3. Page Component ─────────────────────────────────────────────────────────
export default function WebAppPage() {
  return (
    <>
      {/* JSON-LD structured data injected into <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page content */}
      <WebAppContent />
    </>
  );
}
