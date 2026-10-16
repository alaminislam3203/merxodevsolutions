'use client';

import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiFigma,
  SiPrisma,
  SiGraphql,
  SiPython,
  SiRedis,
  SiVite,
  SiFirebase,
  SiStripe,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

// Row 1 Technologies (Frontend & Frameworks & Cloud)
const row1 = [
  { name: 'JavaScript', icon: SiJavascript, bg: '#F0DB4F', color: '#222' },
  { name: 'React', icon: SiReact, bg: '#20232a', color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, bg: '#000', color: '#fff' },
  { name: 'TypeScript', icon: SiTypescript, bg: '#3178C6', color: '#fff' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, bg: '#0EA5E9', color: '#fff' },
  { name: 'Figma', icon: SiFigma, bg: '#A259FF', color: '#fff' },
  { name: 'Vite', icon: SiVite, bg: '#646CFF', color: '#fff' },
  { name: 'AWS Cloud', icon: FaAws, bg: '#232F3E', color: '#FF9900' },
  { name: 'Stripe API', icon: SiStripe, bg: '#635BFF', color: '#fff' },
];

// Row 2 Technologies (Backend, Databases & DevOps)
const row2 = [
  { name: 'Node.js', icon: SiNodedotjs, bg: '#3C873A', color: '#fff' },
  { name: 'PostgreSQL', icon: SiPostgresql, bg: '#336791', color: '#fff' },
  { name: 'Prisma ORM', icon: SiPrisma, bg: '#2D3748', color: '#fff' },
  { name: 'MongoDB', icon: SiMongodb, bg: '#4DB33D', color: '#fff' },
  { name: 'Docker', icon: SiDocker, bg: '#2496ED', color: '#fff' },
  { name: 'GraphQL', icon: SiGraphql, bg: '#E10098', color: '#fff' },
  { name: 'Python', icon: SiPython, bg: '#3776AB', color: '#FFD43B' },
  { name: 'Redis', icon: SiRedis, bg: '#DC382D', color: '#fff' },
  { name: 'Git & GitHub', icon: SiGit, bg: '#F05032', color: '#fff' },
  { name: 'Firebase', icon: SiFirebase, bg: '#FFCA28', color: '#333' },
];

function TechCard({ tech }) {
  const Icon = tech.icon;
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-violet-400 dark:hover:border-violet-600 whitespace-nowrap transition-all hover:-translate-y-0.5 select-none shrink-0">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: tech.bg }}
      >
        {Icon && <Icon size={16} color={tech.color} />}
      </div>
      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-exo-extralight">
        {tech.name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const { t } = useTranslation();

  return (
    <section id="tech-stack" className="relative py-8 sm:py-10 overflow-hidden bg-transparent">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full opacity-15 blur-3xl"
        style={{
          // background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest font-exo-extralight">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
          {t('techStackSection.badge') || 'Cutting-Edge Technologies'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-wide font-exo-medium mt-3">
          {t('techStackSection.title') || 'Technologies We Master'}
        </h2>
      </div>

      {/* 2-Row Marquee Container with smooth edge fades */}
      <div
        className="w-full mx-auto overflow-hidden flex flex-col gap-4"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        {/* Row 1: Leftward infinite auto-scroll */}
        <div className="animate-marquee-row1 flex gap-4">
          {[...row1, ...row1, ...row1].map((tech, i) => (
            <TechCard key={`r1-${i}`} tech={tech} />
          ))}
        </div>

        {/* Row 2: Rightward infinite auto-scroll */}
        <div className="animate-marquee-row2 flex gap-4">
          {[...row2, ...row2, ...row2].map((tech, i) => (
            <TechCard key={`r2-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
