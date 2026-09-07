export const metadata = {
  title: 'Database Architecture & Management Services Bangladesh | MerxoDev Solutions',
  description:
    'High-performance database design and query optimization in Bangladesh. PostgreSQL, MongoDB, MySQL, and Redis architecture built for speed, safety, and zero downtime.',
  keywords: [
    // English
    'database design services Bangladesh',
    'PostgreSQL database optimization BD',
    'MongoDB database development',
    'database migration services',
    'Prisma ORM and schema modeling',
    'database indexing and query speedup',
    'Redis caching solutions BD',
    // Bengali (বাংলা)
    'ডাটাবেজ আর্কিটেকচার ও ডিজাইন',
    'ডাটাবেজ অপটিমাইজেশন সার্ভিস',
    'পোস্টগ্রেসকিউএল ও মঙ্গোডিবি সেটআপ',
    'ডাটাবেজ ব্যাকআপ ও সিকিউরিটি রংপুর ঢাকা',
    'ডাটাবেজ মাইগ্রেশন সেবা',
    // Banglish (বাংলিশ)
    'database setup kora bd',
    'database design service',
    'query fast korar upay',
    'mongodb postgresql database connect kora',
    'database migration kora',
    'slow database fast kora',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-database',
  },
  openGraph: {
    title: 'Database Architecture & Management Services Bangladesh — MerxoDev Solutions',
    description:
      'Bulletproof database schemas, indexing, and high-concurrency architecture built to scale.',
    url: 'https://merxodevsolutions.pro.bd/services-database',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Database Services Bangladesh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Database Architecture & Management — MerxoDev Solutions',
    description:
      'PostgreSQL, MongoDB, and Redis solutions engineered for reliability.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function DatabaseLayout({ children }) {
  const dbServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Database Design & Management Services',
    serviceType: 'Database Architecture',
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
      'Database modeling, schema design, query optimization, indexing, and automated backup strategies for web applications.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dbServiceSchema) }}
      />
      {children}
    </>
  );
}
