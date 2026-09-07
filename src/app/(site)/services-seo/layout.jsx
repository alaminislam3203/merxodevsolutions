export const metadata = {
  title: 'Search Engine Optimization (SEO) & Growth Services Bangladesh | MerxoDev Solutions',
  description:
    'Data-driven SEO & speed optimization for businesses in Bangladesh. Rank #1 on Google with technical SEO, Core Web Vitals optimization, on-page strategy, and structured data.',
  keywords: [
    // English
    'SEO services Bangladesh',
    'technical SEO agency Bangladesh',
    'Core Web Vitals optimization BD',
    'Google search ranking agency',
    'Next.js SEO optimization services',
    'local SEO Bangladesh',
    'on-page SEO and keyword research',
    'speed optimization PageSpeed 90+',
    // Bengali (বাংলা)
    'এসইও সার্ভিস বাংলাদেশ',
    'গুগল সার্চ র‍্যাংকিং বাড়ানোর উপায়',
    'ওয়েবসাইট সার্চে প্রথমে আনার নিয়ম',
    'টেকনিক্যাল এসইও রংপুর ঢাকা',
    'ওয়েবসাইটের ভিজিটর বৃদ্ধি',
    'ওয়েবসাইটের স্পিড বাড়ানোর উপায়',
    // Banglish (বাংলিশ)
    'seo service provider bangladesh',
    'google e website prothom page e ana',
    'google rank korano',
    'website seo korate chai',
    'technical seo audit bd',
    'visitor baranor upay',
    'google search e ashar tips',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-seo',
  },
  openGraph: {
    title: 'SEO & Growth Services Bangladesh — MerxoDev Solutions',
    description:
      'Rank higher, load faster, and turn organic Google traffic into paying clients with technical SEO engineering.',
    url: 'https://merxodevsolutions.pro.bd/services-seo',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'SEO Services Bangladesh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO & Growth Services Bangladesh — MerxoDev Solutions',
    description:
      'Sub-second load times and top-ranking search engine optimization.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function SeoLayout({ children }) {
  const seoServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Search Engine Optimization (SEO) Services',
    serviceType: 'Search Engine Optimization',
    provider: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      url: 'https://merxodevsolutions.pro.bd',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    description:
      'Technical SEO, Core Web Vitals optimization, and keyword ranking services for businesses in Bangladesh.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoServiceSchema) }}
      />
      {children}
    </>
  );
}
