import WebAppContent from '@/components/WebAppContent';

// ── 1. Static Metadata (Next.js App Router) ──────────────────────────────────
export const metadata = {
  // Primary SEO
  title: 'Web App Development Services | Custom Full-Stack Applications',
  description:
    'We build fast, scalable, full-stack web applications — from MVPs to enterprise SaaS platforms — using Next.js, React, Node.js, and cloud-native architecture.',

  // Canonical URL (update to your domain)
  alternates: {
    canonical: 'https://merxodevsolutions.vercel.app/services-web-app',
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp previews)
  openGraph: {
    title: 'Web App Development Services | Custom Full-Stack Applications',
    description:
      'Custom web application development: React, Next.js, Node.js, cloud hosting, API integrations, and 30-day post-launch support.',
    url: 'https://merxodevsolutions.vercel.app/services-web-app',
    siteName: 'Your Brand Name', // ← change this
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://merxodevsolutions.vercel.app/og/services-web-app.png', // ← create 1200×630 image
        width: 1200,
        height: 630,
        alt: 'Web App Development Services',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'Web App Development Services | Custom Full-Stack Applications',
    description:
      'From MVP to enterprise — we build scalable web apps with React, Next.js, and Node.js.',
    images: ['https://merxodevsolutions.vercel.app/og/services-web-app.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Keywords (informational signal — not a ranking factor but good practice)
  keywords: [
    'web app development',
    'custom web application',
    'full-stack development',
    'Next.js development',
    'React web app',
    'Node.js backend',
    'SaaS development',
    'MVP development',
    'cloud web application',
    'enterprise web app',
  ],
};

// ── 2. JSON-LD Structured Data ────────────────────────────────────────────────
// Renders a <script type="application/ld+json"> tag in the page <head>.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Web App Development',
  description:
    'Custom full-stack web application development services including UI/UX design, cloud deployment, API integrations, and ongoing support.',
  provider: {
    '@type': 'Organization',
    name: 'Merxo Dev Solutions', // ← change this
    url: 'https://merxodevsolutions.vercel.app', // ← change this
  },
  areaServed: 'Worldwide',
  serviceType: 'Web Application Development',
  url: 'https://merxodevsolutions.vercel.app/services-web-app',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '0', // use "0" if price is on request
    eligibleRegion: 'Worldwide',
  },
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
