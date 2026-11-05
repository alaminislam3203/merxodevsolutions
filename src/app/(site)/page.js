import FeaturedProjects from '@/components/FeaturedProjects';
import Hero from '@/components/Hero';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesPreview from '@/components/ServicesPreview';
import QuadPromoSection from '@/components/QuadPromoSection';
import Process from '@/components/Process';
import Stats from '@/components/Stats';
import TechStack from '@/components/TechStack';
import YouTubeShowcase from '@/components/YouTubeShowcase';
import Testimonials from '@/components/Testimonials';
import WhyUs from '@/components/WhyUs';
import TechCaseStudies from '@/components/TechCaseStudies';
import CompanyDeck from '@/components/CompanyDeck';
import HomepageFAQ from '@/components/HomepageFAQ';
import DiscoveryCall from '@/components/DiscoveryCall';
import { getAllProjects } from '@/app/lib/projects';
import { getLatestYouTubeVideos } from '@/app/lib/youtube';

export const metadata = {
  title: 'MerxoDev Solutions (Merxo Dev) – Custom Web & App Development Agency Bangladesh',
  description:
    'MerxoDev Solutions (also known as Merxo Dev Solutions, Merxo Dev Solution & Merxo Dev) is a top-rated custom web & app development agency in Bangladesh. Contact us at merxodevsolutions@gmail.com or call +8801313334279 (01313334279) / +8809697634279.',
  keywords: [
    // Brand & Contact Variations
    'MerxoDev Solutions',
    'Merxo Dev Solutions',
    'Merxo Dev Solution',
    'MerxoDev Solution',
    'Merxo Dev',
    'MerxoDev',
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
    'ওয়েব ডেভেলপমেন্ট সার্ভিস রংপুর',
    'ই-কমার্স ওয়েবসাইট তৈরি',
    'ওয়েবসাইট তৈরির খরচ কত',
    'কাস্টম ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট',
    'প্রফেশনাল ওয়েবসাইট তৈরি রংপুর ঢাকা',
    'মোবাইল অ্যাপ ও ওয়েবসাইট ডেভেলপমেন্ট',
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
      'Merxo Dev Solutions',
      'Merxo Dev Solution',
      'MerxoDev Solution',
      'Merxo Dev',
      'MerxoDev',
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

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="sr-only">
        <h2>MerxoDev Solutions | Merxo Dev Solutions | Merxo Dev Solution | Merxo Dev</h2>
        <p>
          Official Website of MerxoDev Solutions (also searched as Merxo Dev Solutions, Merxo Dev Solution, MerxoDev Solution, and Merxo Dev).
          Official Email: merxodevsolutions@gmail.com.
          Official Phone & WhatsApp Numbers: +8801313334279, +880 1313-334279, +880 1313 334279, 01313334279, 01313-334279, +8809697634279, +880 9697-634279, 09697634279.
        </p>
      </div>
      <HeroCarousel />
      <ServicesPreview />
      <Hero />
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

