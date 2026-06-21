'use client';

import Hero from '@/components/Hero';
import Process from '@/components/Process';
import Stats from '@/components/Stats';
import TechStack from '@/components/TechStack';
import Testimonials from '@/components/Testimonials';
import WhyUs from '@/components/WhyUs';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <WhyUs />
      <Process />
      <TechStack />
      <Testimonials />
    </main>
  );
}
