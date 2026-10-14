import GradientGeneratorClient from './GradientGeneratorClient';

export const metadata = {
  title: 'Free CSS Gradient Generator (Linear, Radial & Presets) — MerxoDev Solutions',
  description:
    'Free online CSS gradient generator. Create custom linear and radial color gradients, adjust color stops and angles, with instant CSS & Tailwind code export.',
  keywords: [
    'css gradient generator',
    'linear gradient maker',
    'radial gradient css',
    'tailwind gradient generator',
    'color blend generator',
    'css design tools',
    'developer tools bangladesh',
    'সিএসএস গ্রেডিয়েন্ট',
    'css gradient banano',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/gradient-generator',
  },
  openGraph: {
    title: 'Free CSS Gradient Generator — MerxoDev Solutions',
    description:
      'Design modern linear and radial gradients with color stops and copy ready-to-use CSS rules.',
    url: 'https://merxodevsolutions.pro.bd/tools/gradient-generator',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CSS Gradient Generator — MerxoDev Solutions',
    description:
      'Visual CSS and Tailwind gradient creator with color stops and curated presets.',
  },
};

export default function GradientGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online CSS Gradient Maker & Designer',
    url: 'https://merxodevsolutions.pro.bd/tools/gradient-generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free visual designer for CSS linear and radial color gradients with preset collections.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}