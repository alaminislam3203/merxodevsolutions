export const metadata = {
  title: 'Custom Admin Dashboard & Real-Time BI Analytics Portals Bangladesh | MerxoDev Solutions',
  description:
    'We engineer bespoke high-performance admin dashboards, business intelligence portals, SaaS multi-tenant control panels, and real-time operations hubs in Bangladesh using Next.js, React, Tailwind CSS, and Prisma.',
  keywords: [
    // English
    'custom admin dashboard development Bangladesh',
    'real time analytics dashboard developer',
    'business intelligence portal Next.js',
    'SaaS multi tenant admin dashboard',
    'custom CRM ERP dashboard development Dhaka Rangpur',
    'operations command center software',
    'role based access control RBAC dashboard',
    'data visualization dashboard company BD',
    // Bengali (বাংলা)
    'কাস্টম অ্যাডমিন ড্যাশবোর্ড তৈরি',
    'অ্যানালিটিক্স ড্যাশবোর্ড সফটওয়্যার',
    'ব্যবসায়িক কন্ট্রোল প্যানেল তৈরি বাংলাদেশ',
    'সাস মাল্টি টেন্যান্ট ড্যাশবোর্ড',
    'রিয়েল টাইম ডাটা ভিজ্যুয়ালাইজেশন',
    'অ্যাডমিন প্যানেল বানানোর খরচ',
    // Banglish (বাংলিশ)
    'admin dashboard banano bangladesh',
    'custom admin panel toiri kora',
    'business analytics dashboard software bd',
    'saas dashboard developer bangladesh',
    'data dashboard banate koto taka lage',
    'company operation portal toiri',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-dashboard',
  },
  openGraph: {
    title: 'Custom Admin Dashboard & Real-Time BI Analytics Portals — MerxoDev Solutions',
    description:
      'Take total command of your operations with custom-engineered admin panels, multi-role RBAC, real-time analytics, and automated reporting designed specifically for your business workflow.',
    url: 'https://merxodevsolutions.pro.bd/services-dashboard',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Custom Admin Dashboard Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Admin Dashboard & BI Analytics Services — MerxoDev Solutions',
    description:
      'High-performance Next.js admin dashboards, real-time metrics, role-based permissions, and automated exports.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function DashboardLayout({ children }) {
  const dashboardSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Admin Dashboard & BI Portal Development Services',
    serviceType: 'Custom Software & Dashboard Development',
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
      'Custom admin dashboards, operations command centers, real-time analytics telemetry, role-based access control (RBAC), and automated reporting systems built with Next.js, React, Node.js, and PostgreSQL.',
    url: 'https://merxodevsolutions.pro.bd/services-dashboard',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dashboard Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Role-Based Access Control (RBAC)' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Real-Time Telemetry & BI Visualizations' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'E-Commerce & Supply Chain Hub' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'SaaS Multi-Tenant Management' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Automated Reporting & Export Engine' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Immutable Audit Trail & Security Logs' },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dashboardSchema) }}
      />
      {children}
    </>
  );
}
