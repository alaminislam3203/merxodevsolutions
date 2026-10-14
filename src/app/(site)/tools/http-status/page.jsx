import HttpStatusClient from './HttpStatusClient';

export const metadata = {
  title: 'Complete HTTP Status Codes Reference & Troubleshooting Guide — MerxoDev Solutions',
  description:
    'Searchable database of all HTTP status codes (1xx to 5xx) with meanings, common developer causes, and fix recommendations for REST APIs.',
  keywords: [
    'http status codes',
    'http status reference',
    'rest api status codes',
    '404 not found fix',
    '500 internal server error fix',
    '401 vs 403 status code',
    'developer tools bangladesh',
    'এইচটিটিপি স্ট্যাটাস কোড',
    'http status code guide',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/http-status',
  },
  openGraph: {
    title: 'HTTP Status Codes Reference & Troubleshooting — MerxoDev Solutions',
    description:
      'Searchable reference of HTTP status codes with definitions, causes, and developer solutions.',
    url: 'https://merxodevsolutions.pro.bd/tools/http-status',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete HTTP Status Codes Reference — MerxoDev Solutions',
    description:
      'Fast, searchable cheat sheet of all HTTP response codes with troubleshooting advice.',
  },
};

export default function HttpStatusPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online HTTP Status Codes Reference Guide',
    url: 'https://merxodevsolutions.pro.bd/tools/http-status',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free searchable reference guide for HTTP response status codes with developer troubleshooting tips.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HttpStatusClient />
    </>
  );
}
