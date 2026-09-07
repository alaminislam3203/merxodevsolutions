export const metadata = {
  title: 'Payment Gateway Integration Bangladesh — bKash, Nagad & SSLCommerz | MerxoDev Solutions',
  description:
    'Integrate trusted payment gateways in Bangladesh: bKash, Nagad, Rocket, SSLCommerz, Shurjopay, and Stripe. Seamless instant checkout with automated instant verification and receipt delivery.',
  keywords: [
    // English
    'payment gateway integration Bangladesh',
    'bKash payment gateway integration',
    'Nagad merchant payment API setup',
    'SSLCommerz payment gateway integration',
    'Rocket Upay payment integration BD',
    'Stripe and PayPal integration Bangladesh',
    'automated payment verification webhook',
    'ecommerce checkout payment solutions',
    // Bengali (বাংলা)
    'পেমেন্ট গেটওয়ে সেটআপ বিকাশ নগদ',
    'ওয়েবসাইটে বিকাশ পেমেন্ট যোগ করার নিয়ম',
    'এসএসএলকমার্জ ইন্টিগ্রেশন বাংলাদেশ',
    'অনলাইন পেমেন্ট গেটওয়ে তৈরির খরচ',
    'ক্রেডিট কার্ড পেমেন্ট সিস্টেম সেটআপ রংপুর ঢাকা',
    'স্বয়ংক্রিয় পেমেন্ট ভেরিফিকেশন',
    // Banglish (বাংলিশ)
    'bkash nagad payment add kora',
    'sslcommerz payment setup bd',
    'website e online payment system toiri',
    'payment gateway integration charge koto',
    'bkash checkout api connect',
    'online e taka payment newar upay',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services-payment-gateway',
  },
  openGraph: {
    title: 'Payment Gateway Integration Bangladesh — MerxoDev Solutions',
    description:
      'Accept bKash, Nagad, cards, and international payments with zero checkout friction.',
    url: 'https://merxodevsolutions.pro.bd/services-payment-gateway',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Payment Gateway Integration Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payment Gateway Integration Bangladesh — MerxoDev Solutions',
    description:
      'Seamless bKash, Nagad, and credit card payments for your digital business.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export default function PaymentGatewayLayout({ children }) {
  const paymentSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Payment Gateway Integration Services',
    serviceType: 'Financial Technology Integration',
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
      'Integration of domestic and international payment systems including bKash, Nagad, Rocket, SSLCommerz, and Stripe for web applications and e-commerce platforms.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paymentSchema) }}
      />
      {children}
    </>
  );
}
