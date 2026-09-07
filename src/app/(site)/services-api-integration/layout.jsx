export const metadata = {
  title: 'API Integration & Middleware Development Bangladesh | MerxoDev Solutions',
  description:
    'Secure, reliable API integration services in Bangladesh. Connect third-party services, payment gateways, SMS providers, CRMs, and build custom REST & GraphQL endpoints.',
  keywords: [
    // English
    'API integration services Bangladesh',
    'REST API development Bangladesh',
    'GraphQL API integration',
    'third-party API connection',
    'webhook integration services',
    'SMS and courier API integration BD',
    'backend middleware engineering',
    // Bengali (বাংলা)
    'এপিআই ইন্টিগ্রেশন সার্ভিস',
    'রেস্ট এপিআই ও ওয়েবহুক কানেক্ট',
    'এসএমএস গেটওয়ে ইন্টিগ্রেশন',
    'কুরিয়ার এপিআই কানেক্ট বাংলাদেশ',
    'সফটওয়্যার এপিআই তৈরি',
    // Banglish (বাংলিশ)
    'api integration service bangladesh',
    'api connect kora',
    'sms api setup bd',
    'courier api add kora Steadfast Pathao',
    'payment api setup kora',
    'rest api banano o jog kora',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-api-integration',
  },
  openGraph: {
    title: 'API Integration & Middleware Development Bangladesh — MerxoDev Solutions',
    description:
      'Seamlessly connect your digital ecosystem with robust APIs, real-time webhooks, and secure authentication.',
    url: 'https://merxodevsolutions.pro.bd/services-api-integration',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'API Integration Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Integration & Middleware Development — MerxoDev Solutions',
    description:
      'Robust REST and GraphQL API integrations for modern web systems.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function ApiIntegrationLayout({ children }) {
  const apiServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'API Integration Services',
    serviceType: 'API & Middleware Engineering',
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
      'Custom API integration, webhook implementation, and middleware development connecting internal and third-party systems.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(apiServiceSchema) }}
      />
      {children}
    </>
  );
}
