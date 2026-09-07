import FeaturedProjects from '@/components/FeaturedProjects';
import Hero from '@/components/Hero';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesPreview from '@/components/ServicesPreview';
import Process from '@/components/Process';
import Stats from '@/components/Stats';
import TechStack from '@/components/TechStack';
import YouTubeShowcase from '@/components/YouTubeShowcase';
import Testimonials from '@/components/Testimonials';
import WhyUs from '@/components/WhyUs';
import TechCaseStudies from '@/components/TechCaseStudies';
import CompanyDeck from '@/components/CompanyDeck';
import HomepageFAQ from '@/components/HomepageFAQ';
import DiscoveryCall from '@/components/DiscoveryCall';
import { getAllProjects } from '@/app/lib/projects';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <main>
      <HeroCarousel />
      <ServicesPreview />
      <Hero />
      <Stats />
      <WhyUs />
      <Process />
      <FeaturedProjects projects={projects} />
      <TechCaseStudies />
      <YouTubeShowcase />
      <TechStack />
      <Testimonials />
      <CompanyDeck />
      <HomepageFAQ />
      <DiscoveryCall />
    </main>
  );
}

