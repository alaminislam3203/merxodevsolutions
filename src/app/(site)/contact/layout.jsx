export const metadata = {
  title: 'Contact Us & Hire Developers — MerxoDev Solutions Bangladesh',
  description:
    'Get in touch with MerxoDev Solutions. Book a free discovery call, request a project proposal, or hire our dedicated Next.js, React, and full-stack developers.',
  keywords: [
    // English
    'contact MerxoDev Solutions',
    'hire web developers Bangladesh',
    'hire Next.js developers BD',
    'software development quote Bangladesh',
    'free discovery call web development',
    'custom web app consultation',
    'hire full stack team Bangladesh',
    // Bengali (বাংলা)
    'যোগাযোগ ও হায়ার',
    'ওয়েবসাইট বানানোর চুক্তি',
    'সফটওয়্যার কোম্পানির সাথে যোগাযোগ',
    'ফ্রি কনসালটেশন রংপুর ঢাকা',
    'ওয়েব ডেভেলপার হায়ার করুন',
    'প্রজেক্ট কোটেশন ও মিটিং',
    // Banglish (বাংলিশ)
    'merxodev contact number',
    'hire developer bangladesh',
    'website banate jogajog',
    'software project quote bd',
    'free discovery call booking',
    'freelance developer team bd',
    'website bananor kotha bola',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/contact',
  },
  openGraph: {
    title: 'Contact Us & Hire Developers — MerxoDev Solutions Bangladesh',
    description:
      'Ready to build your next product? Schedule a free strategy call or request a project quote today.',
    url: 'https://merxodevsolutions.pro.bd/contact',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Contact MerxoDev Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us & Hire Developers — MerxoDev Solutions Bangladesh',
    description:
      'Book a strategy call or hire dedicated developers for your project.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function ContactLayout({ children }) {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact MerxoDev Solutions',
    url: 'https://merxodevsolutions.pro.bd/contact',
    description:
      'Contact page for MerxoDev Solutions. Schedule a call, message via WhatsApp or email, or request a custom proposal.',
    mainEntity: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      telephone: '+8801313334279',
      email: 'merxodevsolutions@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rangpur',
        addressRegion: 'Rangpur Division',
        addressCountry: 'BD',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
