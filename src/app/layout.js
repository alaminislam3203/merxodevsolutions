import { Anton, DM_Sans, Raleway } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'MerxoDev Solutions – Custom Web & App Development Bangladesh',
    template: '%s | MerxoDev Solutions',
  },
  description:
    'MerxoDev Solutions builds high-performance websites, web apps, and digital products for startups and businesses in Bangladesh. Expert Next.js, React & Node.js development with clean code and real results.',
  keywords: [
    'web development Bangladesh',
    'custom website development Rangpur',
    'Next.js developer Bangladesh',
    'React developer Bangladesh',
    'app development agency Bangladesh',
    'MerxoDev Solutions',
    'full stack developer Bangladesh',
    'digital agency Rangpur',
    'affordable web development',
    'startup web development Bangladesh',
    'custom software development',
    'UI UX design Bangladesh',
  ],
  authors: [
    { name: 'MerxoDev Solutions', url: 'https://merxodevsolutions.vercel.app' },
  ],
  creator: 'MerxoDev Solutions',
  publisher: 'MerxoDev Solutions',
  metadataBase: new URL('https://merxodevsolutions.vercel.app'),
  alternates: {
    canonical: 'https://merxodevsolutions.vercel.app',
    languages: {
      'en-US': 'https://merxodevsolutions.vercel.app',
      'bn-BD': 'https://merxodevsolutions.vercel.app/bn',
    },
  },
  openGraph: {
    title: 'MerxoDev Solutions – Custom Web & App Development Bangladesh',
    description:
      'We build high-performance websites, web apps and digital products that grow your business. Based in Bangladesh, serving clients worldwide.',
    url: 'https://merxodevsolutions.vercel.app',
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
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
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
      className={`${anton.variable} ${dmSans.variable} ${raleway.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MerxoDev Solutions',
              alternateName: 'MerxoDevSolutions',
              url: 'https://merxodevsolutions.vercel.app',
              logo: {
                '@type': 'ImageObject',
                url: 'https://merxodevsolutions.vercel.app/logo.png',
                width: 200,
                height: 200,
              },
              description:
                'Custom websites, web apps & digital solutions crafted for startups and growing businesses in Bangladesh and worldwide.',
              foundingDate: '2023',
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
                  contactType: 'customer service',
                  availableLanguage: ['English', 'Bengali'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+8809697634279',
                  contactType: 'sales',
                  availableLanguage: ['English', 'Bengali'],
                },
              ],
              email: 'merxodevsolutions@gmail.com',
              sameAs: [
                'https://www.facebook.com/merxodevsolutions',
                'https://twitter.com/merxodevsolutions',
                'https://linkedin.com/company/merxodevsolutions',
                'https://github.com/merxodevsolutions',
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
              url: 'https://merxodevsolutions.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://merxodevsolutions.vercel.app/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
