import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
  metadataBase: new URL('https://merxodevsolutions.com'),
  openGraph: {
    title: 'MerxoDevSolutions – Custom Web & App Development',
    description:
      'We build high-performance websites and digital products that grow your business.',
    url: 'https://merxodevsolutions.com',
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
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
