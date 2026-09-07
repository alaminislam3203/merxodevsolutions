export const metadata = {
  title: 'Web Application Security & Audit Services Bangladesh | MerxoDev Solutions',
  description:
    'Protect your web applications from cyber threats and data leaks in Bangladesh. Vulnerability assessment, penetration testing, rate limiting, SQLi/XSS prevention, and SSL security hardening.',
  keywords: [
    // English
    'web security audit Bangladesh',
    'penetration testing services BD',
    'vulnerability assessment Bangladesh',
    'SSL TLS configuration and firewall',
    'DDoS protection Next.js web app',
    'data privacy and secure backend BD',
    'OWASP Top 10 security compliance',
    // Bengali (বাংলা)
    'ওয়েবসাইট সিকিউরিটি অডিট',
    'ওয়েবসাইট হ্যাকিং প্রতিরোধ বাংলাদেশ',
    'ওয়েব সিকিউরিটি সার্ভিস রংপুর ঢাকা',
    'এসএসএল সার্টিফিকেট ও ফায়ারওয়াল সেটআপ',
    'ডাটা প্রটেকশন ও সাইবার নিরাপত্তা',
    // Banglish (বাংলিশ)
    'website hack theke bachano',
    'website security barano',
    'penetration testing bd',
    'ssl certificate setup kora',
    'safe secure website banano',
    'hacker theke data safe rakhar upay',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-security',
  },
  openGraph: {
    title: 'Web Application Security & Audit Services Bangladesh — MerxoDev Solutions',
    description:
      'Enterprise-grade security audits, penetration testing, and protection against unauthorized intrusions.',
    url: 'https://merxodevsolutions.pro.bd/services-security',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Web Application Security Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Application Security Services — MerxoDev Solutions',
    description:
      'Protect your software, user data, and financial transactions with military-grade web security.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function SecurityLayout({ children }) {
  const securitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Web Application Security & Audit Services',
    serviceType: 'Cybersecurity & Auditing',
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
      'Comprehensive vulnerability assessment, security hardening, penetration testing, and real-time defense configuration for web applications.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securitySchema) }}
      />
      {children}
    </>
  );
}
