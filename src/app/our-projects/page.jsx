import { Suspense } from 'react';

export const metadata = {
  title: 'Our Projects | MerxoDev Solutions',
  description:
    'Explore the projects built by MerxoDev Solutions — custom websites, web apps, and digital solutions for startups and growing businesses.',
  keywords: [
    'MerxoDev projects',
    'web development portfolio',
    'custom websites Bangladesh',
    'web apps Rangpur',
    'MerxoDev Solutions portfolio',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.com/our-projects',
  },
  openGraph: {
    title: 'Our Projects | MerxoDev Solutions',
    description:
      'See what we have built — modern websites and web apps for clients worldwide.',
    url: 'https://merxodevsolutions.com/our-projects',
    siteName: 'MerxoDev Solutions',
    images: [
      {
        url: 'https://merxodevsolutions.com/og-projects.png',
        width: 1200,
        height: 630,
        alt: 'MerxoDev Solutions Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects | MerxoDev Solutions',
    description:
      'See what we have built — modern websites and web apps for clients worldwide.',
    images: ['https://merxodevsolutions.com/og-projects.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OurProjectsPage() {
  return (
    <main>
      <Suspense fallback={null}>
        {/* এখানে আপনার component import করে বসান */}
        {/* <OurProjects /> */}
      </Suspense>
    </main>
  );
}
