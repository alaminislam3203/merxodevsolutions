export const metadata = {
  title: 'Business Workflow Automation Services Bangladesh | MerxoDev Solutions',
  description:
    'Automate repetitive workflows, customer messaging, invoices, inventory sync, and background tasks using n8n, webhooks, and custom scripts in Bangladesh.',
  keywords: [
    // English
    'business process automation Bangladesh',
    'workflow automation services BD',
    'n8n Zapier integration service',
    'automated email and SMS notifications',
    'scheduled task automation Node.js',
    'CRM and ERP automation Bangladesh',
    // Bengali (বাংলা)
    'বিজনেস অটোমেশন সার্ভিস',
    'কাজের অটোমেশন বাংলাদেশ',
    'অটোমেটিক নোটিফিকেশন ও এসএমএস',
    'ওয়ার্কফ্লো অটোমেশন রংপুর ঢাকা',
    'ব্যবসায়িক অটোমেশন সফটওয়্যার',
    // Banglish (বাংলিশ)
    'business automation service bd',
    'kaj auto kora',
    'n8n zapier setup bd',
    'automatic sms notification pathano',
    'manual kaj automatic kora',
    'order ashle auto sms deya',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-automation',
  },
  openGraph: {
    title: 'Business Workflow Automation Services Bangladesh — MerxoDev Solutions',
    description:
      'Save hundreds of hours by automating repetitive data syncing, client messaging, and backend workflows.',
    url: 'https://merxodevsolutions.pro.bd/services-automation',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Business Automation Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Workflow Automation Services — MerxoDev Solutions',
    description:
      'Custom automation pipelines designed to eliminate manual overhead for businesses.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function AutomationLayout({ children }) {
  const automationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business Automation Services',
    serviceType: 'Workflow Automation',
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
      'End-to-end business process automation, webhook processing, and background scheduled task systems.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(automationSchema) }}
      />
      {children}
    </>
  );
}
