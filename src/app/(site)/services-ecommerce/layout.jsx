export const metadata = {
  title: 'E-Commerce Website Development Bangladesh — Custom Online Stores | MerxoDev Solutions',
  description:
    'Build high-converting e-commerce stores in Bangladesh. Integrated with bKash, Nagad, SSLCommerz, fast checkout, inventory management, and automated order tracking.',
  keywords: [
    // English
    'ecommerce website development Bangladesh',
    'custom online store development',
    'e-commerce website development price Bangladesh',
    'bKash Nagad ecommerce integration',
    'SSLCommerz payment gateway setup',
    'Next.js headless ecommerce agency',
    'multi-vendor marketplace development BD',
    'fast checkout ecommerce website',
    // Bengali (বাংলা)
    'ই-কমার্স ওয়েবসাইট তৈরি',
    'অনলাইন শপ ওয়েবসাইট বানানোর খরচ',
    'বিকাশ নগদ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন',
    'দোকানের জন্য ওয়েবসাইট তৈরি রংপুর ঢাকা',
    'ই-কমার্স সফটওয়্যার ডেভেলপমেন্ট',
    'ওয়েবসাইটে পেমেন্ট গেটওয়ে যুক্ত করা',
    // Banglish (বাংলিশ)
    'ecommerce dokan toiri',
    'online shop website banano bd',
    'kom khoroche ecommerce website',
    'online business website toiri kora',
    'ecommerce website banate koto taka lage',
    'bkash payment website e kivabe jog kore',
    'online e product bikri korar website',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-ecommerce',
  },
  openGraph: {
    title: 'E-Commerce Website Development Bangladesh — MerxoDev Solutions',
    description:
      'Ultra-fast online storefronts with local payment gateways (bKash, Nagad, Cards) built for Bangladeshi and global retailers.',
    url: 'https://merxodevsolutions.pro.bd/services-ecommerce',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'E-Commerce Website Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Commerce Website Development Bangladesh — MerxoDev Solutions',
    description:
      'High-converting online stores with bKash/Nagad checkout and inventory automation.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function EcommerceLayout({ children }) {
  const ecommerceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'E-Commerce Website Development',
    serviceType: 'E-Commerce Development',
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
      'Full-featured e-commerce development tailored for businesses in Bangladesh with local payment gateway integration and high-speed checkout.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecommerceSchema) }}
      />
      {children}
    </>
  );
}
