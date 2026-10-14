import UrlEncoderClient from './UrlEncoderClient';

export const metadata = {
  title: 'Free Online URL Encoder & Decoder (RFC 3986) — MerxoDev Solutions',
  description:
    'Free online URL encoder and decoder. Encode and decode query strings, full URLs, and URI components with 100% client-side privacy.',
  keywords: [
    'url encoder online',
    'url decoder',
    'encode url component',
    'decode uri',
    'query string encoder',
    'rfc 3986 encoder',
    'percent encoding tool',
    'developer tools bangladesh',
    'ইউআরএল এনকোডার',
    'url encode kora',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/url-encoder',
  },
  openGraph: {
    title: 'Free Online URL Encoder & Decoder — MerxoDev Solutions',
    description:
      'Safely encode and decode URL parameters and URI strings with zero latency and complete privacy.',
    url: 'https://merxodevsolutions.pro.bd/tools/url-encoder',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online URL Encoder & Decoder — MerxoDev Solutions',
    description:
      'Safely encode and decode URLs and query components with zero server upload.',
  },
};

export default function UrlEncoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online URL Encoder & Decoder',
    url: 'https://merxodevsolutions.pro.bd/tools/url-encoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',