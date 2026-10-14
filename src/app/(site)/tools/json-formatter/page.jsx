import JsonFormatterClient from './JsonFormatterClient';

export const metadata = {
  title: 'Free Online JSON Formatter, Validator & Minifier — MerxoDev Solutions',
  description:
    'Free online tool to format, beautify, validate, and minify JSON data. Instant syntax error detection, tree view, and code copying with 100% client-side privacy.',
  keywords: [
    'json formatter online',
    'json validator',
    'json beautifier',
    'minify json',
    'clean json data',
    'free json parser',
    'json tree viewer',
    'developer tools bangladesh',
    'জেসন ফরম্যাটার',
    'json format kora',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/json-formatter',
  },
  openGraph: {
    title: 'Free Online JSON Formatter, Validator & Minifier — MerxoDev Solutions',
    description:
      'Format, validate, and minify JSON with real-time error detection. 100% private and client-side.',
    url: 'https://merxodevsolutions.pro.bd/tools/json-formatter',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online JSON Formatter & Validator — MerxoDev Solutions',
    description:
      'Format, validate, and minify JSON instantly with zero server logging.',
  },
};

export default function JsonFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online JSON Formatter & Validator',
    url: 'https://merxodevsolutions.pro.bd/tools/json-formatter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: