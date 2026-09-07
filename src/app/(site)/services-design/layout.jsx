export const metadata = {
  title: 'UI/UX Design Services Bangladesh — Figma & Product Prototyping | MerxoDev Solutions',
  description:
    'Award-winning UI/UX design agency in Bangladesh. We craft intuitive user interfaces, high-converting Figma web designs, design systems, and clickable interactive prototypes.',
  keywords: [
    // English
    'UI UX design services Bangladesh',
    'Figma website design agency',
    'mobile app UI UX design Bangladesh',
    'product design agency Rangpur Dhaka',
    'custom web design prototypes',
    'design system creation Figma',
    'wireframing and user research BD',
    'SaaS interface design',
    // Bengali (বাংলা)
    'ইউআই ইউএক্স ডিজাইন বাংলাদেশ',
    'ওয়েবসাইট ডিজাইন সার্ভিস',
    'ফিগমা ডিজাইন রংপুর ঢাকা',
    'মোবাইল অ্যাপ ইন্টারফেস ডিজাইন',
    'ইউজার ফ্রেন্ডলি ওয়েবসাইট ডিজাইন',
    'গ্রাফিক্স ও প্রোডাক্ট ডিজাইন',
    // Banglish (বাংলিশ)
    'ui ux design bangladesh',
    'figma app design bd',
    'website er design banano',
    'app er design korate chai',
    'best ui ux designer bd',
    'responsive web design kora',
    'figma theke website banano',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-design',
  },
  openGraph: {
    title: 'UI/UX Design Services Bangladesh — MerxoDev Solutions',
    description:
      'Human-centered design systems, interactive prototypes, and pixel-perfect UIs in Figma.',
    url: 'https://merxodevsolutions.pro.bd/services-design',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'UI UX Design Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI/UX Design Services Bangladesh — MerxoDev Solutions',
    description:
      'Modern UI/UX design that drives customer engagement and increases conversion rates.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function DesignLayout({ children }) {
  const designSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'UI/UX Design Services',
    serviceType: 'Design Services',
    provider: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      url: 'https://merxodevsolutions.pro.bd',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    description:
      'User experience (UX) and user interface (UI) design for web applications, SaaS platforms, and mobile apps built in Figma.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(designSchema) }}
      />
      {children}
    </>
  );
}
