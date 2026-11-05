export const metadata = {
  title: 'Contact MerxoDev Solutions (Merxo Dev) — +8801313334279 | merxodevsolutions@gmail.com',
  description:
    'Get in touch with MerxoDev Solutions (Merxo Dev Solutions / Merxo Dev Solution / Merxo Dev). Email: merxodevsolutions@gmail.com | Phone & WhatsApp: +8801313334279 (01313334279), +8809697634279 (09697634279). Custom web & app development agency in Bangladesh.',
  keywords: [
    'MerxoDev Solutions',
    'Merxo Dev Solutions',
    'Merxo Dev Solution',
    'MerxoDev Solution',
    'Merxo Dev',
    'MerxoDev',
    'contact MerxoDev Solutions',
    'contact Merxo Dev',
    'merxodevsolutions@gmail.com',
    '+8801313334279',
    '01313334279',
    '+880 1313-334279',
    '+880 1313 334279',
    '+8809697634279',
    '09697634279',
    '+880 9697-634279',
    'MerxoDev phone number',
    'MerxoDev email address',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/contact',
  },
  openGraph: {
    title: 'Contact MerxoDev Solutions (Merxo Dev) — Custom Web & App Development',
    description:
      'Reach MerxoDev Solutions (Merxo Dev) via email at merxodevsolutions@gmail.com or phone/WhatsApp at +8801313334279 (01313334279) & +8809697634279.',
    url: 'https://merxodevsolutions.pro.bd/contact',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactLayout({ children }) {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact MerxoDev Solutions (Merxo Dev)',
    url: 'https://merxodevsolutions.pro.bd/contact',
    description:
      'Official contact page of MerxoDev Solutions (Merxo Dev Solutions, Merxo Dev Solution, Merxo Dev). Email: merxodevsolutions@gmail.com, Phone: +8801313334279, +8809697634279.',
    mainEntity: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      alternateName: [
        'Merxo Dev Solutions',
        'Merxo Dev Solution',
        'MerxoDev Solution',
        'Merxo Dev',
        'MerxoDev',
      ],
      url: 'https://merxodevsolutions.pro.bd',
      email: 'merxodevsolutions@gmail.com',
      telephone: '+8801313334279',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+8801313334279',
          email: 'merxodevsolutions@gmail.com',
          contactType: 'customer service',
          availableLanguage: ['English', 'Bengali'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+8809697634279',
          email: 'merxodevsolutions@gmail.com',
          contactType: 'sales',
          availableLanguage: ['English', 'Bengali'],
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}

