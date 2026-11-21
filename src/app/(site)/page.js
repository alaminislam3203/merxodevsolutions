import nextDynamic from 'next/dynamic';
import FeaturedProjects from '@/components/FeaturedProjects';
import Hero from '@/components/Hero';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesPreview from '@/components/ServicesPreview';
import QuadPromoSection from '@/components/QuadPromoSection';
import Process from '@/components/Process';
import Stats from '@/components/Stats';
import TechStack from '@/components/TechStack';
import WhyUs from '@/components/WhyUs';
import { getAllProjects } from '@/app/lib/projects';
import { getLatestYouTubeVideos } from '@/app/lib/youtube';

const TechCaseStudies = nextDynamic(() => import('@/components/TechCaseStudies'));
const YouTubeShowcase = nextDynamic(() => import('@/components/YouTubeShowcase'));
const CompanyDeck = nextDynamic(() => import('@/components/CompanyDeck'));
const DiscoveryCall = nextDynamic(() => import('@/components/DiscoveryCall'));
const Testimonials = nextDynamic(() => import('@/components/Testimonials'));
const HomepageFAQ = nextDynamic(() => import('@/components/HomepageFAQ'));

export const metadata = {
  title: 'MerxoDev Solutions (merxodev / মারক্সোডেভ সলিউশনস) – Web & App Development Bangladesh',
  description:
    'MerxoDev Solutions (merxodev, merxodev solution, Merxo Dev, মারক্সোডেভ সলিউশনস, মেরক্সোডেভ সলিউশন) is a top-rated custom web & app development agency in Bangladesh. Contact: merxodevsolutions@gmail.com | +8801313334279 (01313334279) | +8809697634279.',
  keywords: [
    // Brand & Contact Variations (English & Bengali)
    'merxodev',
    'merxodev solution',
    'merxodev solutions',
    'MerxoDev Solutions',
    'Merxo Dev Solutions',
    'Merxo Dev Solution',
    'MerxoDev Solution',
    'Merxo Dev',
    'MerxoDev',
    'মারক্সোডেভ',
    'মারক্সোডেভ সলিউশন',
    'মারক্সোডেভ সলিউশনস',
    'মারক্সো ডেভ',
    'মারক্সো ডেভ সলিউশন',
    'মারক্সো ডেভ সলিউশনস',
    'মেরক্সোডেভ',
    'মেরক্সোডেভ সলিউশন',
    'মেরক্সোডেভ সলিউশনস',
    'মেরক্সো ডেভ',
    'merxodevsolutions@gmail.com',
    '+8801313334279',
    '01313334279',
    '+880 1313-334279',
    '+880 1313 334279',
    '+8809697634279',
    '09697634279',
    '+880 9697-634279',
    // English
    'web development company Bangladesh',
    'Next.js development agency',
    'custom web application development',
    'custom software company Dhaka Rangpur',
    'SaaS application development Bangladesh',
    'full stack developer Bangladesh',
    'hire Next.js React developers Bangladesh',
    'ecommerce website development Bangladesh',
    'UI UX design agency Bangladesh',
    'API integration service Bangladesh',
    // Bengali (বাংলা)
    'ওয়েবসাইট বানানোর খরচ',
    'সফটওয়্যার কোম্পানি বাংলাদেশ',
    'সেরা ওয়েব ডেভেলপমেন্ট কোম্পানি বাংলাদেশ',
    'ওয়েব ডেভেলপমেন্ট সার্ভিস রংপুর',
    'ই-কমার্স ওয়েবসাইট তৈরি',
    'ওয়েবসাইট তৈরির খরচ কত',
    'কাস্টম ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট',
    'প্রফেশনাল ওয়েবসাইট তৈরি রংপুর ঢাকা',
    'মোবাইল অ্যাপ ও ওয়েবসাইট ডেভেলপমেন্ট',
    'বাংলাদেশের সেরা সফটওয়্যার কোম্পানি',
    // Banglish (বাংলিশ)
    'website banate koto taka lage',
    'website bananor company bangladesh',
    'kom khoroche ecommerce website toiri',
    'online business website banano',
    'best software company in bd',
    'bangladesh web development agency',
    'custom web app toiri kora',
    'ecommerce store development price bd',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd',
  },
  openGraph: {
    title: 'MerxoDev Solutions – Custom Web & App Development Agency Bangladesh',
    description:
      'We craft high-performance websites, web apps, and digital solutions that accelerate business growth.',
    url: 'https://merxodevsolutions.pro.bd',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'MerxoDev Solutions – Custom Web & App Development Bangladesh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MerxoDev Solutions – Custom Web & App Development Agency Bangladesh',
    description:
      'High-performance Next.js websites, SaaS platforms, and e-commerce stores engineered for business growth.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [projects, youtubeVideos] = await Promise.all([
    getAllProjects(),
    getLatestYouTubeVideos(),
  ]);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'MerxoDev Solutions',
    alternateName: [
      'merxodev',
      'merxodev solution',
      'merxodev solutions',
      'MerxoDev',
      'MerxoDev Solution',
      'Merxo Dev',
      'Merxo Dev Solution',
      'Merxo Dev Solutions',
      'মারক্সোডেভ',
      'মারক্সোডেভ সলিউশন',
      'মারক্সোডেভ সলিউশনস',
      'মারক্সো ডেভ',
      'মারক্সো ডেভ সলিউশন',
      'মারক্সো ডেভ সলিউশনস',
      'মেরক্সোডেভ',
      'মেরক্সোডেভ সলিউশন',
      'মেরক্সোডেভ সলিউশনস',
    ],
    image: 'https://merxodevsolutions.pro.bd/logo.png',
    '@id': 'https://merxodevsolutions.pro.bd/#business',
    url: 'https://merxodevsolutions.pro.bd',
    telephone: '+8801313334279',
    email: 'merxodevsolutions@gmail.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rangpur',
      addressRegion: 'Rangpur Division',
      addressCountry: 'BD',
    },
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
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7439,
      longitude: 89.2752,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '22:00',
    },
    sameAs: [
      'https://www.facebook.com/merxodevsolutions',
      'https://twitter.com/merxodevsolutions',
      'https://www.linkedin.com/in/merxodevsolutions',
      'https://linkedin.com/company/merxodevsolutions',
      'https://github.com/MerxoDev-Solutions',
      'https://www.youtube.com/@merxodevsolutions',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is MerxoDev / MerxoDev Solution (MerxoDev Solutions)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MerxoDev Solutions (also searched as merxodev, merxodev solution, Merxo Dev, and মারক্সোডেভ সলিউশনস) is a custom web, mobile app, e-commerce, and SaaS development agency based in Rangpur, Bangladesh, serving clients globally. Official website: https://merxodevsolutions.pro.bd | Email: merxodevsolutions@gmail.com | Phone/WhatsApp: +8801313334279 (01313334279) & +8809697634279.',
        },
      },
      {
        '@type': 'Question',
        name: 'মারক্সোডেভ সলিউশনস (MerxoDev Solutions / merxodev) কী এবং কীভাবে যোগাযোগ করব?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'মারক্সোডেভ সলিউশনস (MerxoDev Solutions / মেরক্সোডেভ সলিউশন / merxodev) বাংলাদেশের একটি শীর্ষস্থানীয় কাস্টম ওয়েব ডেভেলপমেন্ট, ই-কমার্স এবং সফটওয়্যার ডেভেলপমেন্ট কোম্পানি। যোগাযোগের অফিশিয়াল ওয়েবসাইট: https://merxodevsolutions.pro.bd, ইমেইল: merxodevsolutions@gmail.com, এবং ফোন/হোয়াটসঅ্যাপ নম্বর: +8801313334279 (01313334279) ও +8809697634279 (09697634279)।',
        },
      },
      {
        '@type': 'Question',
        name: 'What services does MerxoDev (merxodev solution) provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MerxoDev Solutions provides custom Next.js & React website development, full-stack web apps, SaaS platforms, e-commerce stores, bKash/Nagad/SSLCommerz/Stripe payment gateway integration, UI/UX design, API integration, AI automation, and technical SEO.',
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="sr-only">
        <h2>
          MerxoDev Solutions | merxodev | merxodev solution | Merxo Dev Solutions | Merxo Dev Solution | Merxo Dev | মারক্সোডেভ সলিউশনস | মারক্সোডেভ সলিউশন | মেরক্সোডেভ সলিউশনস
        </h2>
        <p>
          Official Website of MerxoDev Solutions (also known and searched as merxodev, merxodev solution, merxodev solutions, Merxo Dev Solutions, Merxo Dev Solution, MerxoDev Solution, and Merxo Dev).
          বাংলা নাম ও পরিচিতি: মারক্সোডেভ সলিউশনস, মারক্সোডেভ সলিউশন, মারক্সোডেভ, মারক্সো ডেভ সলিউশনস, মারক্সো ডেভ, মেরক্সোডেভ সলিউশনস, মেরক্সোডেভ সলিউশন, মেরক্সোডেভ — বাংলাদেশের অন্যতম সেরা কাস্টম ওয়েবসাইট, ই-কমার্স, মোবাইল অ্যাপ এবং সফটওয়্যার ডেভেলপমেন্ট কোম্পানি (রংপুর ও ঢাকা, বাংলাদেশ)।
          Official Email: merxodevsolutions@gmail.com.
          Official Phone & WhatsApp Numbers: +8801313334279, +880 1313-334279, +880 1313 334279, 01313334279, 01313-334279, +8809697634279, +880 9697-634279, 09697634279.
        </p>
      </div>
         <Hero />
      <HeroCarousel />
      <ServicesPreview />
      <Stats />
      <WhyUs />
      <Process />
      <FeaturedProjects projects={projects} />
      <QuadPromoSection />
      <TechCaseStudies />
      <YouTubeShowcase initialVideos={youtubeVideos} />
      <TechStack />
      <Testimonials />
      <CompanyDeck />
      <HomepageFAQ />
      <DiscoveryCall />
    </main>
  );
}

