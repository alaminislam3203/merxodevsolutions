import { Anton, DM_Sans, Raleway } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-anton',
});
const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm',
});
const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const metadata = {
  title: 'MerxoDevSolutions – Custom Web & App Development',
  description:
    'MerxoDevSolutions builds high-performance websites, web apps, and digital products tailored to your business. Modern tech, clean code, real results.',
  keywords: [
    'web development',
    'app development',
    'Next.js developer',
    'custom software',
    'MerxoDevSolutions',
    'React developer',
    'full stack development',
    'digital agency',
  ],
  authors: [{ name: 'MerxoDevSolutions' }],
  creator: 'MerxoDevSolutions',
  metadataBase: new URL('https://merxodevsolutions.vercel.app'),
  openGraph: {
    title: 'MerxoDevSolutions – Custom Web & App Development',
    description:
      'We build high-performance websites and digital products that grow your business.',
    url: 'https://merxodevsolutions.vercel.app',
    siteName: 'MerxoDevSolutions',
    images: [
      {
        url: '/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'MerxoDevSolutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MerxoDevSolutions – Custom Web & App Development',
    description:
      'We build high-performance websites and digital products that grow your business.',
    images: ['/logo-light.png'],
    creator: '@merxodevsolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/favicon.png', shortcut: '/favicon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${dmSans.variable} ${raleway.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
