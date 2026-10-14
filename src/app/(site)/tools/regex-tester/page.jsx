import RegexTesterClient from './RegexTesterClient';

export const metadata = {
  title: 'Free Online Regex Tester & Debugger (JavaScript Flavored) — MerxoDev Solutions',
  description:
    'Free online regular expression tester with live match highlighting, capture groups, flag toggles, and common regex presets for developers.',
  keywords: [
    'regex tester online',
    'regular expression tester',
    'regex visualizer',
    'javascript regex tool',
    'regex debugger',
    'developer tools bangladesh',
    'রেজেক্স টেস্টার',
    'regex check kora',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/tools/regex-tester',
  },
  openGraph: {
    title: 'Free Online Regex Tester & Debugger — MerxoDev Solutions',
    description:
      'Test and debug regular expressions with live match highlighting, flags, and capture group inspection.',
    url: 'https://merxodevsolutions.pro.bd/tools/regex-tester',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Regex Tester & Debugger — MerxoDev Solutions',
    description:
      'Live regex pattern tester with capture group inspection and syntax cheatsheet.',
  },
};

export default function RegexTesterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online Regular Expression Tester & Debugger',
    url: 'https://merxodevsolutions.pro.bd/tools/regex-tester',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free client-side tool to test, validate, and debug regular expressions with real-time match highlighting.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RegexTesterClient />
    </>
  );
}
