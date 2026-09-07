import WebDevContent from '@/components/WebDevContent';

export const metadata = {
  title: 'Custom Website Development Services Bangladesh — Next.js & React | MerxoDev Solutions',
  description:
    'Professional website development in Bangladesh: Lightning-fast Next.js business websites, modern landing pages, corporate portals, and responsive web platforms.',
  keywords: [
    // English
    'web development Bangladesh',
    'Next.js development company',
    'React website developer Bangladesh',
    'custom business website design',
    'landing page development Bangladesh',
    'high speed website development',
    'corporate website developer Rangpur Dhaka',
    'frontend web development agency',
    // Bengali (বাংলা)
    'ওয়েবসাইট ডেভেলপমেন্ট বাংলাদেশ',
    'ওয়েবসাইট তৈরি করার খরচ',
    'ব্যবসায়িক ওয়েবসাইট তৈরি',
    'ল্যান্ডিং পেজ ডিজাইন সার্ভিস',
    'প্রফেশনাল ওয়েবসাইট বানানোর নিয়ম',
    'রংপুরে ওয়েবসাইট তৈরির প্রতিষ্ঠান',
    // Banglish (বাংলিশ)
    'website toiri kora bangladesh',
    'kom dame website banano',
    'landing page banate koto lage',
    'business er jonno website toiri',
    'nextjs react website developer bd',
    'website developer khujchi',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-web',
  },
  openGraph: {
    title: 'Custom Website Development Services Bangladesh — MerxoDev Solutions',
    description:
      'Ultra-fast Next.js and React websites engineered to convert visitors into loyal customers.',
    url: 'https://merxodevsolutions.pro.bd/services-web',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Custom Web Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Website Development Services Bangladesh — MerxoDev Solutions',
    description:
      'High-performance Next.js and React websites for businesses and startups.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function WebDevPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Website Development Services',
    serviceType: 'Web Development',
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
      'Custom website development using modern technologies like Next.js, React, and Tailwind CSS for businesses, startups, and enterprises.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <WebDevContent />
    </>
  );
}
