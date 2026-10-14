import HashGeneratorClient from './HashGeneratorClient';

export const metadata = {
  title: 'Free Online Hash & Password Generator (SHA-256, MD5, SHA-512) — MerxoDev Solutions',
  description:
    'Free online cryptographic hash generator for SHA-256, SHA-512, MD5, and SHA-1. Hash passwords, text strings, and sensitive tokens with 100% client-side privacy.',
  keywords: [
    'hash generator online',
    'sha256 generator',
    'md5 hash generator',
    'sha512 online',
    'password hash generator',
    'crypto hash online',
    'developer tools bangladesh',
    'হ্যাশ জেনারেটর',
    'sha256 toiri kora',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/hash-generator',
  },
  openGraph: {
    title: 'Free Online Hash & Password Generator — MerxoDev Solutions',
    description:
      'Generate cryptographic hashes (SHA-256, MD5, SHA-512) instantly with salt support and zero server transmission.',
    url: 'https://merxodevsolutions.pro.bd/tools/hash-generator',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Hash Generator — MerxoDev Solutions',
    description:
      'Generate SHA-256, SHA-512, and MD5 hashes securely inside your browser.',
  },
};

export default function HashGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online Cryptographic Hash Generator',
    url: 'https://merxodevsolutions.pro.bd/tools/hash-generator',
    applicationCategory: 'DeveloperApplication',