import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '@/app/lib/projects';
import ProjectsGrid from './ProjectsGrid';

export const metadata = {
  title: 'Our Projects & Portfolio — Web & App Case Studies | MerxoDev Solutions',
  description:
    'Explore our portfolio of custom Next.js websites, SaaS platforms, e-commerce stores, and digital products engineered for real businesses in Bangladesh and worldwide.',
  keywords: [
    // English
    'web development portfolio Bangladesh',
    'Next.js case studies',
    'software projects showcase',
    'ecommerce website examples Bangladesh',
    'SaaS application portfolio',
    'web design portfolio BD',
    'MerxoDev Solutions projects',
    // Bengali (বাংলা)
    'আমাদের প্রজেক্টসমূহ',
    'ওয়েবসাইট পোর্টফোলিও',
    'পূর্ববর্তী ক্লায়েন্ট প্রজেক্ট',
    'সফটওয়্যার কেস স্টাডি',
    'ই-কমার্স ওয়েবসাইট ডেমো',
    // Banglish (বাংলিশ)
    'amader project portfolio',
    'previous client kajer list',
    'web development portfolio bangladesh',
    'kemon website baniechi',
    'live project demo bd',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/our-projects',
  },
  openGraph: {
    title: 'Our Projects & Portfolio — MerxoDev Solutions',
    description:
      'Explore live client projects, SaaS platforms, and custom web applications delivered by MerxoDev Solutions.',
    url: 'https://merxodevsolutions.pro.bd/our-projects',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'MerxoDev Solutions Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects & Portfolio — MerxoDev Solutions',
    description:
      'Case studies and client applications built by MerxoDev Solutions.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function OurProjectsPage() {
  const projects = await getAllProjects();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Projects — MerxoDev Solutions Portfolio',
    url: 'https://merxodevsolutions.pro.bd/our-projects',
    description:
      'Portfolio of web applications, e-commerce stores, and software projects developed by MerxoDev Solutions.',
    hasPart: (projects || []).slice(0, 15).map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      description: p.description,
      url: `https://merxodevsolutions.pro.bd/our-projects/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <ProjectsGrid projects={projects} />
    </>
  );
}
