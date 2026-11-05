import localFont from 'next/font/local';
import { Anton, DM_Sans, Raleway, Hind_Siliguri } from 'next/font/google';
import './globals.css';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisitorTracker from '@/components/VisitorTracker';
import { GlobalToaster } from '@/lib/toast';

const exo2 = localFont({
  src: [
    {
      path: './fonts/exo_2/Exo2-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/exo_2/Exo2-Medium.otf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-exo2',
  display: 'swap',
});

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'MerxoDev Solutions (merxodev / মারক্সোডেভ সলিউশনস) – Web & App Development Bangladesh',
    template: '%s | MerxoDev Solutions (merxodev)',
  },
  description:
    'MerxoDev Solutions (merxodev, merxodev solution, Merxo Dev, মারক্সোডেভ সলিউশনস, মেরক্সোডেভ) builds high-performance websites, web apps & e-commerce in Bangladesh. Contact: merxodevsolutions@gmail.com | +8801313334279 (01313334279) | +8809697634279.',
  keywords: [
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
    'web development Bangladesh',
    'custom website development Rangpur',
    'Next.js developer Bangladesh',
    'React developer Bangladesh',
    'app development agency Bangladesh',
    'full stack developer Bangladesh',
    'digital agency Rangpur',
    'affordable web development',
    'startup web development Bangladesh',
    'custom software development',
    'UI UX design Bangladesh',
    'E-commerce website development Bangladesh',
    'ওয়েবসাইট বানানোর খরচ',
    'সফটওয়্যার কোম্পানি বাংলাদেশ',
    'সেরা ওয়েব ডেভেলপমেন্ট কোম্পানি বাংলাদেশ',
    'ওয়েব ডেভেলপমেন্ট সার্ভিস রংপুর',
    'ই-কমার্স ওয়েবসাইট তৈরি',
    'ওয়েবসাইট তৈরি করার প্রতিষ্ঠান',
    'website bananor agency bangladesh',
    'website banate koto taka lage',
    'ecommerce store development price bd',
    'best software development agency bd',
    'discovery call web development',
    'SaaS application development Bangladesh',
  ],
  authors: [
    { name: 'MerxoDev Solutions', url: 'https://merxodevsolutions.pro.bd' },
  ],
  creator: 'MerxoDev Solutions',
  publisher: 'MerxoDev Solutions',
  metadataBase: new URL('https://merxodevsolutions.pro.bd'),
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd',
  },
  openGraph: {
    title: 'MerxoDev Solutions – Custom Web & App Development Bangladesh',
    description:
      'We build high-performance websites, web apps and digital products that grow your business. Based in Bangladesh, serving clients worldwide.',
    url: 'https://merxodevsolutions.pro.bd',
    siteName: 'MerxoDev Solutions',
    images: [
      {
        url: '/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'MerxoDev Solutions – Custom Web & App Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
    countryName: 'Bangladesh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MerxoDev Solutions – Custom Web & App Development',
    description:
      'We build high-performance websites and digital products that grow your business. Based in Bangladesh.',
    images: ['/logo-light.png'],
    creator: '@merxodevsolutions',
    site: '@merxodevsolutions',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  category: 'technology',
  classification: 'Web Development Agency',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    // google: 'your-google-verification-code', // Google Search Console add করলে এখানে বসাবে
    // yandex: 'your-yandex-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${anton.variable} ${dmSans.variable} ${raleway.variable} ${hindSiliguri.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="https://merxodevsolutions.pro.bd/llms.txt"
          title="LLM & AI Context for MerxoDev Solutions"
        />
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MerxoDev Solutions',
              legalName: 'MerxoDev Solutions',
              alternateName: [
                'merxodev',
                'merxodev solution',
                'merxodev solutions',
                'MerxoDev',
                'MerxoDev Solution',
                'Merxo Dev',
                'Merxo Dev Solution',
                'Merxo Dev Solutions',
                'MerxoDevSolutions',
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
              ],
              url: 'https://merxodevsolutions.pro.bd',
              logo: {
                '@type': 'ImageObject',
                url: 'https://merxodevsolutions.pro.bd/logo.png',
                width: 200,
                height: 200,
              },
              description:
                'MerxoDev Solutions (merxodev, merxodev solution, Merxo Dev, মারক্সোডেভ সলিউশনস, মেরক্সোডেভ) crafts custom websites, web apps, e-commerce & digital solutions for startups and growing businesses in Bangladesh and worldwide.',
              foundingDate: '2023',
              telephone: '+8801313334279',
              email: 'merxodevsolutions@gmail.com',
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
              sameAs: [
                'https://www.facebook.com/merxodevsolutions',
                'https://twitter.com/merxodevsolutions',
                'https://www.linkedin.com/in/merxodevsolutions',
                'https://linkedin.com/company/merxodevsolutions',
                'https://github.com/MerxoDev-Solutions',
                'https://www.youtube.com/@merxodevsolutions',
              ],
              serviceArea: {
                '@type': 'Place',
                name: 'Worldwide',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Web Development Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Web Development',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Mobile App Development',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'UI/UX Design' },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Cloud Solutions',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'SEO & Marketing',
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* WebSite Structured Data — enables Google Sitelinks Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
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
                'মেরক্সোডেভ',
                'মেরক্সোডেভ সলিউশন',
                'মেরক্সোডেভ সলিউশনস',
              ],
              inLanguage: ['en', 'bn'],
              url: 'https://merxodevsolutions.pro.bd',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://merxodevsolutions.pro.bd/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col font-sans">
        <SessionProviderWrapper>
          <ThemeProvider>
            <GlobalToaster />
            <VisitorTracker />
            {children}
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
