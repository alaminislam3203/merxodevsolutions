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
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const techs = [
  {
    name: 'JavaScript',
    icon: SiJavascript,
    bg: '#F0DB4F',
    color: '#222',
    text: null,
  },
  { name: 'Next.js', icon: SiNextdotjs, bg: '#000', color: '#fff', text: null },
  { name: 'React', icon: SiReact, bg: '#20232a', color: '#61DAFB', text: null },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    bg: '#3178C6',
    color: '#fff',
    text: null,
  },
  {
    name: 'Tailwind',
    icon: SiTailwindcss,
    bg: '#0EA5E9',
    color: '#fff',
    text: null,
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    bg: '#3C873A',
    color: '#fff',
    text: null,
  },
  { name: 'Docker', icon: SiDocker, bg: '#2496ED', color: '#fff', text: null },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    bg: '#336791',
    color: '#fff',
    text: null,
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    bg: '#4DB33D',
    color: '#fff',
    text: null,
  },
  { name: 'AWS', icon: FaAws, bg: '#232F3E', color: '#FF9900', text: null },
  { name: 'Git', icon: SiGit, bg: '#F05032', color: '#fff', text: null },
  { name: 'Figma', icon: SiFigma, bg: '#A259FF', color: '#fff', text: null },
];

export default function TechStack() {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 overflow-hidden bg-white dark:bg-zinc-950">
      <div
        className="w-[70%] mx-auto overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...techs, ...techs].map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 whitespace-nowrap transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: tech.bg }}
                >
                  {Icon ? (
                    <Icon size={16} color={tech.color} />
                  ) : (
                    <span
                      style={{
                        color: tech.color,
                        fontSize: '9px',
                        fontWeight: 700,
                      }}
                    >
                      {tech.text}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 font-raleway">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
