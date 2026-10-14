import JwtDecoderClient from './JwtDecoderClient';

export const metadata = {
  title: 'Free Online JWT Decoder & Debugger — MerxoDev Solutions',
  description:
    'Free online JWT decoder and token inspector. Decode JSON Web Tokens instantly, inspect payload claims, and verify expiration date with 100% client-side privacy.',
  keywords: [
    'jwt decoder online',
    'jwt debugger',
    'decode json web token',
    'jwt token inspect',
    'jwt expiration check',
    'bearer token decoder',
    'free jwt tool',
    'jwt decoder bangladesh',
    'জেডব্লিউটি ডিকোডার',
    'jwt token check',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/jwt-decoder',
  },
  openGraph: {
    title: 'Free Online JWT Decoder & Debugger — MerxoDev Solutions',
    description:
      'Inspect and decode JWT tokens in real time. 100% client-side security with zero server transmission.',
    url: 'https://merxodevsolutions.pro.bd/tools/jwt-decoder',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online JWT Decoder & Debugger — MerxoDev Solutions',
    description:
      'Inspect JWT headers and claims in real time. Private & client-side.',
  },
};

export default function JwtDecoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online JWT Decoder & Token Debugger',
    url: 'https://merxodevsolutions.pro.bd/tools/jwt-decoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free client-side tool to decode and inspect JSON Web Tokens (JWT) with expiration checking and claims inspection.',
  };

  return (
    <>