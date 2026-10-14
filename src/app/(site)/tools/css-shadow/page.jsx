import CssShadowClient from './CssShadowClient';

export const metadata = {
  title: 'Free CSS Box Shadow & Glassmorphism Generator — MerxoDev Solutions',
  description:
    'Free visual CSS box-shadow and glassmorphism generator. Custom blur, spread, inset, and color sliders with instant CSS and Tailwind CSS copy.',
  keywords: [
    'css box shadow generator',
    'glassmorphism generator',
    'tailwind shadow generator',
    'drop shadow css',
    'soft ui shadow generator',
    'css design tools',
    'developer tools bangladesh',
    'সিএসএস শ্যাডো জেনারেটর',
    'css shadow banano',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/css-shadow',
  },
  openGraph: {
    title: 'Free CSS Box Shadow & Glassmorphism Generator — MerxoDev Solutions',
    description:
      'Design modern, layered drop shadows and glassmorphic UI cards with one-click CSS and Tailwind export.',
    url: 'https://merxodevsolutions.pro.bd/tools/css-shadow',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CSS Box Shadow & Glassmorphism Generator — MerxoDev Solutions',
    description:
      'Visual CSS box shadow designer with Tailwind and pure CSS code generation.',
  },
};

export default function CssShadowPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online CSS Box Shadow & Glassmorphism Generator',
    url: 'https://merxodevsolutions.pro.bd/tools/css-shadow',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free visual designer for CSS box shadows, layered soft elevations, and glassmorphic UI elements.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CssShadowClient />
    </>
  );
}
