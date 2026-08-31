import WebDevContent from '@/components/WebDevContent';

export const metadata = {
  title: 'Web Development Services',
  description:
    'Custom Next.js, React & Full Stack web development for startups and businesses. Landing pages, business websites, SaaS apps — built to perform.',
  keywords: [
    'web development Bangladesh',
    'Next.js development',
    'React developer',
    'full stack development',
    'SaaS development',
    'landing page design',
    'business website Bangladesh',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/services/web',
  },
  openGraph: {
    title: 'Web Development Services | MerxoDev Solutions',
    description:
      'Custom Next.js, React & Full Stack web development for businesses.',
    url: 'https://merxodevsolutions.pro.bd/services-web',
  },
};

export default function WebDevPage() {
  return <WebDevContent />;
}
