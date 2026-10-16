import PrivacyClient from './PrivacyClient';

export const metadata = {
  title: 'Privacy Policy — MerxoDev Solutions Bangladesh',
  description:
    'Learn how MerxoDev Solutions collects, uses, and safeguards your personal data, client project assets, and proprietary source code with enterprise-grade security.',
  keywords: [
    // English
    'privacy policy MerxoDev Solutions',
    'client code ownership software development',
    'intellectual property protection software agency',
    'data privacy policy Bangladesh',
    // Bengali (বাংলা)
    'প্রাইভেসি পলিসি মারক্সোদেব সলিউশনস',
    'তথ্য সুরক্ষা নীতি বাংলাদেশ',
    'ক্লায়েন্ট কোড ও ডেটা নিরাপত্তা',
    // Banglish (বাংলিশ)
    'privacy policy merxodev solutions',
    'amader data privacy policy',
    'client er code security',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — MerxoDev Solutions',
    description:
      'Transparent data privacy, client intellectual property protection, and security policies at MerxoDev Solutions.',
    url: 'https://merxodevsolutions.pro.bd/privacy',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy — MerxoDev Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — MerxoDev Solutions',
    description: 'Data security and client code protection policies.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function PrivacyPolicyPage() {
  const privacySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy — MerxoDev Solutions',
    url: 'https://merxodevsolutions.pro.bd/privacy',
    description:
      'Official privacy policy and client data protection guidelines of MerxoDev Solutions.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <PrivacyClient />
    </>
  );
}
