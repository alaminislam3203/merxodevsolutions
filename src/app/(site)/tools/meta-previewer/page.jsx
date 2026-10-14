import MetaPreviewerClient from './MetaPreviewerClient';

export const metadata = {
  title: 'Free Open Graph & Meta Tag Generator & Previewer — MerxoDev Solutions',
  description:
    'Free social card previewer and SEO meta tag generator. Live previews for Google Search, Facebook, Twitter/X, and LinkedIn with one-click HTML meta tag copy.',
  keywords: [
    'meta tag generator',
    'open graph previewer',
    'og tag generator',
    'twitter card previewer',
    'google search snippet preview',
    'seo meta tags tool',
    'developer tools bangladesh',
    'মেটা ট্যাগ প্রিভিউয়ার',
    'seo meta tag banano',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/meta-previewer',
  },
  openGraph: {
    title: 'Free Open Graph & Meta Tag Generator & Previewer — MerxoDev Solutions',
    description:
      'Live social share card previews for Google, Facebook, Twitter, and LinkedIn with instant HTML meta tag generation.',
    url: 'https://merxodevsolutions.pro.bd/tools/meta-previewer',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Meta Tag Generator & Social Card Previewer — MerxoDev Solutions',
    description:
      'Preview social share cards and generate SEO meta tags with zero server upload.',
  },
};

export default function MetaPreviewerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online OpenGraph & SEO Meta Tag Generator',
    url: 'https://merxodevsolutions.pro.bd/tools/meta-previewer',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free visual tool to generate and preview Open Graph and Twitter Card HTML meta tags.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MetaPreviewerClient />
    </>
  );
}
