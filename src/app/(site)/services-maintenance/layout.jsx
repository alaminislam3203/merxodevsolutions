export const metadata = {
  title: 'Website & App Maintenance Services Bangladesh — 24/7 Support | MerxoDev Solutions',
  description:
    'Keep your web application fast, secure, and bug-free with 24/7 maintenance in Bangladesh. Regular updates, uptime monitoring, security patching, and rapid emergency bug fixes.',
  keywords: [
    // English
    'website maintenance services Bangladesh',
    'web application support agency BD',
    'bug fixing and performance tuning',
    'annual maintenance contract AMC website BD',
    'uptime monitoring and security updates',
    'Next.js website support services',
    // Bengali (বাংলা)
    'ওয়েবসাইট মেইনটেন্যান্স সার্ভিস',
    'ওয়েবসাইটের সমস্যা সমাধান রংপুর ঢাকা',
    'ওয়েবসাইট আপডেট ও সিকিউরিটি প্যাচ',
    'ওয়েবসাইট সাপোর্ট সার্ভিস বাংলাদেশ',
    'নিয়মিত ওয়েবসাইট রক্ষণাবেক্ষণ খরচ',
    // Banglish (বাংলিশ)
    'website maintenance kora',
    'website er somossa thik kora',
    'bug fix korano',
    'website er monthly maintenance cost bd',
    'website update kora',
    'website nosto hole thik korar team',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-maintenance',
  },
  openGraph: {
    title: 'Website & App Maintenance Services Bangladesh — MerxoDev Solutions',
    description:
      'Proactive monitoring, rapid bug fixes, security audits, and continuous software improvements.',
    url: 'https://merxodevsolutions.pro.bd/services-maintenance',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Website Maintenance Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website & App Maintenance Services — MerxoDev Solutions',
    description:
      'Reliable, proactive maintenance and technical support for businesses.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function MaintenanceLayout({ children }) {
  const maintenanceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Website & Web Application Maintenance',
    serviceType: 'Software Maintenance',
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
      'Continuous website maintenance, uptime monitoring, bug repairs, library updates, and security patch application for online platforms.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(maintenanceSchema) }}
      />
      {children}
    </>
  );
}
