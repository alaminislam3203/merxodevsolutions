import { getTeamMembers } from '@/app/lib/team';
import OurTeamClient from './OurTeamClient';

export const metadata = {
  title: 'Our Team — Software Engineers & Designers | MerxoDev Solutions Bangladesh',
  description:
    'Meet the passionate developers, UI/UX designers, and tech strategists behind MerxoDev Solutions. Building scalable web apps, custom software, and digital solutions in Bangladesh.',
  keywords: [
    // English
    'MerxoDev Solutions team',
    'our team MerxoDev Solutions',
    'software engineers Bangladesh',
    'web developers Rangpur',
    'full stack developers Bangladesh',
    'UI UX designers BD',
    'MerxoDev team members',
    'tech leads Bangladesh',
    'hire developers Bangladesh',
    'software agency team',
    // Bengali (বাংলা)
    'আমাদের টিম',
    'মারক্সোদেব সলিউশনস টিম',
    'সফটওয়্যার ইঞ্জিনিয়ার বাংলাদেশ',
    'ওয়েব ডেভেলপার দল',
    'আইটি বিশেষজ্ঞ বাংলাদেশ',
    'টিম মেম্বার পরিচিতি',
    // Banglish (বাংলিশ)
    'amader team merxodev',
    'software engineer bangladesh',
    'web developer team rangpur',
    'merxodev er team members',
    'it team bd',
    'amader engineer o designer',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/our-team',
  },
  openGraph: {
    title: 'Our Team — Software Engineers & Designers | MerxoDev Solutions Bangladesh',
    description:
      'Meet the engineers, designers, and innovators behind MerxoDev Solutions. Dedicated to engineering excellence and scalable digital products.',
    url: 'https://merxodevsolutions.pro.bd/our-team',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Our Team — MerxoDev Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team — Software Engineers & Designers | MerxoDev Solutions',
    description:
      'The skilled engineers, designers, and strategists behind MerxoDev Solutions in Bangladesh.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function OurTeamPage() {
  const team = await getTeamMembers();

  // Structured Data (JSON-LD) for SEO
  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'MerxoDev Solutions Team',
    url: 'https://merxodevsolutions.pro.bd/our-team',
    description:
      'The complete engineering and design team at MerxoDev Solutions Bangladesh.',
    mainEntity: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      url: 'https://merxodevsolutions.pro.bd',
      employee: team.map((member) => ({
        '@type': 'Person',
        name: member.name,
        jobTitle: member.role,
        ...(member.image && { image: member.image }),
        description: member.bio || `${member.name} at MerxoDev Solutions`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <OurTeamClient team={team} />
    </>
  );
}
