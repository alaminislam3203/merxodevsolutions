import ToolsClient from './ToolsClient';

export const metadata = {
  title: 'Free Developer Tools & Utilities — MerxoDev Solutions Bangladesh',
  description:
    'Handcrafted, privacy-friendly online developer tools: JSON formatter, JWT decoder, Base64 encoder, UUID generator, CSS shadow builder, Regex tester, and BD postcode finder. 100% free and client-side.',
  keywords: [
    // English
    'developer tools online',
    'free dev utilities',
    'json formatter validator',
    'jwt decoder online',
    'base64 encode decode',
    'uuid generator online',
    'css box shadow generator',
    'regex tester online',
    'meta tag previewer og tags',
    'bangladesh postcode finder',
    'client-side web tools',
    'merxodev solutions tools',
    // Bengali (বাংলা)
    'ডেভেলপার টুলস',
    'অনলাইন ফ্রি টুলস',
    'জেসন ফরম্যাটার',
    'জেডব্লিউটি ডিকোডার',
    'বাংলাদেশ পোস্টকোড ফাইন্ডার',
    'সিএসএস জেনারেটর',
    // Banglish (বাংলিশ)
    'developer tool bd',
    'free online dev tools',
    'json sajano tool',
    'jwt token check korar tool',
    'bangladesh jela upazila postcode search',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools',
  },
  openGraph: {
    title: 'Free Developer Tools & Utilities — MerxoDev Solutions',
    description:
      'Fast, private, client-side web tools for developers: JSON formatter, JWT decoder, Base64 converter, UUID generator, and CSS builders.',
    url: 'https://merxodevsolutions.pro.bd/tools',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'MerxoDev Solutions Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Developer Tools & Utilities — MerxoDev Solutions',
    description:
      'Instant, private, client-side dev tools to speed up your everyday engineering workflow.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function ToolsPage() {
  const collectionSchema = {