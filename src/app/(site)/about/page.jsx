import { getTeamMembers } from '@/app/lib/team';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Us — MerxoDev Solutions | Tech & Web Agency Bangladesh',
  description:
    'Discover MerxoDev Solutions: A passionate team of engineers and designers building modern web applications, e-commerce systems, and scalable software in Bangladesh.',
  keywords: [
    // English
    'about MerxoDev Solutions',
    'software development company Bangladesh',
    'web development agency Rangpur',
    'full stack development team',
    'hire developers Bangladesh',
    'tech startup Bangladesh',
    'custom web development team',
    // Bengali (বাংলা)
    'মারক্সোদেব সলিউশনস সম্পর্কে',
    'সফটওয়্যার কোম্পানি বাংলাদেশ',
    'ওয়েব এজেন্সি রংপুর',
    'আমাদের টিম ও পরিচিতি',
    'আইটি কোম্পানি বাংলাদেশ',
    // Banglish (বাংলিশ)
    'merxodev solutions somporke',
    'about merxodev solutions',
    'bangladesh software company profile',
    'software firm rangpur',
    'it company profile bd',
    'amader somporke jante',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/about',
  },
  openGraph: {
    title: 'About Us — MerxoDev Solutions | Tech & Web Agency Bangladesh',
    description:
      'We craft high-performance digital products that scale. Learn about our story, vision, and team in Bangladesh.',
    url: 'https://merxodevsolutions.pro.bd/about',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'About MerxoDev Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — MerxoDev Solutions | Tech & Web Agency Bangladesh',
    description:
      'Passionate engineers and designers building next-generation web apps in Bangladesh.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  const team = await getTeamMembers();
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About MerxoDev Solutions',
    url: 'https://merxodevsolutions.pro.bd/about',
    description:
      'Passionate team of engineers and designers delivering high-performance web applications and digital products in Bangladesh.',
    mainEntity: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      url: 'https://merxodevsolutions.pro.bd',
      foundingDate: '2023',
      founder: {
        '@type': 'Person',
        name: 'AL-AMIN ISLAM',
        jobTitle: 'Founder & Lead Developer',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient team={team} />
    </>
  );
}
