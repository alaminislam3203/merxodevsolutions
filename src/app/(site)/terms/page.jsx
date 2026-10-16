import TermsClient from './TermsClient';

export const metadata = {
  title: 'Terms of Service — MerxoDev Solutions Bangladesh',
  description:
    'Review the terms, conditions, code ownership policies, milestone delivery, and 30-day warranty governing professional software development contracts with MerxoDev Solutions.',
  keywords: [
    // English
    'terms of service MerxoDev Solutions',
    'software contract terms Bangladesh',
    'freelance web development agreement',
    'code ownership and warranty terms',
    // Bengali (বাংলা)
    'শর্তাবলী মারক্সোদেব সলিউশনস',
    'সফটওয়্যার ডেভেলপমেন্ট চুক্তির শর্তাবলী',
    'ওয়ারেন্টি ও কোড মালিকানা নীতি',
    // Banglish (বাংলিশ)
    'terms and conditions merxodev solutions',
    'software bananor chukti o niyom',
    'project warranty terms bd',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/terms',
  },
  openGraph: {
    title: 'Terms of Service — MerxoDev Solutions',
    description:
      'Clear, fair, and transparent software development terms and warranties at MerxoDev Solutions.',
    url: 'https://merxodevsolutions.pro.bd/terms',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Terms of Service — MerxoDev Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — MerxoDev Solutions',
    description:
      'Clear software development contracts, code ownership, and warranties.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function TermsOfServicePage() {
  const termsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service — MerxoDev Solutions',
    url: 'https://merxodevsolutions.pro.bd/terms',
    description:
      'Official terms of service, project delivery conditions, and warranties for MerxoDev Solutions.',
    publisher: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      url: 'https://merxodevsolutions.pro.bd',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />
      <TermsClient />
    </>
  );
}
