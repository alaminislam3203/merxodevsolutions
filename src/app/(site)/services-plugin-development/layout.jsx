export const metadata = {
  title: 'Custom Plugin & Extension Development Services | MerxoDev Solutions',
  description:
    'Custom WordPress plugins, WooCommerce add-ons, Shopify apps, and modular extensions engineered for performance, security, and scalability by MerxoDev Solutions.',
  keywords: [
    // English
    'custom plugin development Bangladesh',
    'WordPress plugin developer BD',
    'WooCommerce custom extension',
    'Shopify app development services',
    'custom web extensions API hooks',
    'CMS plugin development agency',
    // Bengali (বাংলা)
    'প্লাগইন ডেভেলপমেন্ট সার্ভিস বাংলাদেশ',
    'ওয়ার্ডপ্রেস প্লাগইন তৈরি',
    'উকমার্স কাস্টম এক্সটেনশন',
    'শপিফাই অ্যাপ ডেভেলপমেন্ট',
    'কাস্টম সফটওয়্যার প্লাগইন',
    // Banglish (বাংলিশ)
    'plugin banano service bd',
    'wordpress plugin development',
    'woocommerce extension banano',
    'custom plugin developer',
    'shopify app banano',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-plugin-development',
  },
  openGraph: {
    title: 'Custom Plugin & Extension Development — MerxoDev Solutions',
    description:
      'High-performance custom plugins, modular extensions, and API integrations for WordPress, WooCommerce, and modern web applications.',
    url: 'https://merxodevsolutions.pro.bd/services-plugin-development',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/services/plugin.png',
        width: 1024,
        height: 1024,
        alt: 'Plugin Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Plugin & Extension Development — MerxoDev Solutions',
    description:
      'Custom plugins, modular add-ons, and secure API hooks tailored to your business platform.',
    images: ['https://merxodevsolutions.pro.bd/services/plugin.png'],
  },
};

export default function PluginLayout({ children }) {
  const pluginSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom Plugin & Extension Development Services',
    description:
      'Engineered custom plugins and modular extensions for WordPress, WooCommerce, Shopify, and bespoke web platforms.',
    provider: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      url: 'https://merxodevsolutions.pro.bd',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Plugin Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WordPress & WooCommerce Plugin Development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Shopify App & Store Extension Development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Micro-Plugin & Hook Architecture',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pluginSchema) }}
      />
      {children}
    </>
  );
}
