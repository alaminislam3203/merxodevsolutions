import OurJourneyClient from './OurJourneyClient';

export const metadata = {
  title: 'Our Journey & Story — MerxoDev Solutions Bangladesh',
  description:
    'From a single laptop in Rangpur to 56+ successful software products across Bangladesh and abroad. Explore the milestones and mission behind MerxoDev Solutions.',
  keywords: [
    // English
    'MerxoDev Solutions story',
    'web development company Bangladesh',
    'Rangpur software company',
    'our journey MerxoDev',
    'digital agency Bangladesh milestones',
    'successful tech startups Bangladesh',
    'Bangladesh software engineering story',
    // Bengali (বাংলা)
    'আমাদের পথচলা',
    'মারক্সোদেব সলিউশনস এর গল্প',
    'সফটওয়্যার কোম্পানি বাংলাদেশ',
    'রংপুরের আইটি কোম্পানি',
    'সফল ওয়েব ডেভেলপমেন্ট প্রজেক্ট',
    // Banglish (বাংলিশ)
    'amader jatra merxodev',
    'software company rangpur',
    'merxodev solutions story bd',
    'bangladesh it agency success story',
    'kivabe suru hoyechilo',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/our-journey',
  },
  openGraph: {
    title: 'Our Journey & Story — MerxoDev Solutions Bangladesh',
    description:
      'The story behind MerxoDev Solutions — where we started, what we built, and where we are going.',
    url: 'https://merxodevsolutions.pro.bd/our-journey',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Our Journey — MerxoDev Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Journey & Story — MerxoDev Solutions Bangladesh',
    description:
      'From a single laptop in Rangpur to 56+ digital products. The story behind MerxoDev Solutions.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function OurJourneyPage() {
  return <OurJourneyClient />;
}
