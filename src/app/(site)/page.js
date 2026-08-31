import FeaturedProjects from '@/components/FeaturedProjects';
import Hero from '@/components/Hero';
import HeroCarousel from '@/components/HeroCarousel';
import Process from '@/components/Process';
import Stats from '@/components/Stats';
import TechStack from '@/components/TechStack';
import Testimonials from '@/components/Testimonials';
import WhyUs from '@/components/WhyUs';
import { getAllProjects } from '@/app/lib/projects';

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <main>
      <HeroCarousel />
      <Hero />
      <Stats />
      <WhyUs />
      <Process />
      <FeaturedProjects projects={projects} />
      <TechStack />
      <Testimonials />
    </main>
  );
}
