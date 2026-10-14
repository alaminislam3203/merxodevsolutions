import UuidGeneratorClient from './UuidGeneratorClient';

export const metadata = {
  title: 'Free Online UUID & NanoID Generator (v4, Bulk) — MerxoDev Solutions',
  description:
    'Free online cryptographically secure UUID v4 and NanoID generator. Generate unique identifiers in bulk with uppercase, hyphen, and quote formatting options.',
  keywords: [
    'uuid generator online',
    'uuid v4 generator',
    'nanoid generator',
    'bulk uuid generator',
    'random guid generator',
    'crypto random uuid',
    'developer tools bangladesh',
    'ইউইউআইডি জেনারেটর',
    'unique id toiri kora',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/uuid-generator',
  },
  openGraph: {
    title: 'Free Online UUID & NanoID Generator — MerxoDev Solutions',
    description:
      'Generate cryptographically secure UUIDs and NanoIDs in single or bulk batches with custom formatting.',
    url: 'https://merxodevsolutions.pro.bd/tools/uuid-generator',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online UUID & NanoID Generator — MerxoDev Solutions',
    description:
      'Cryptographically secure UUID v4 & NanoID generator with bulk export.',
  },
};

export default function UuidGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online UUID & NanoID Generator',
    url: 'https://merxodevsolutions.pro.bd/tools/uuid-generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free client-side tool to generate cryptographically safe UUID v4 and NanoID strings in bulk.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}