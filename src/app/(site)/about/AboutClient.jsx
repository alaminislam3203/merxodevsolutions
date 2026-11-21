'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  FiCode,
  FiSmartphone,
  FiLayout,
  FiCloud,
  FiTrendingUp,
  FiShield,
  FiTarget,
  FiHeart,
  FiZap,
  FiUsers,
  FiAward,
  FiGlobe,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiArrowRight,
} from 'react-icons/fi';

const valueIcons = [
  <FiTarget key="target" size={22} />,
  <FiZap key="zap" size={22} />,
  <FiHeart key="heart" size={22} />,
  <FiShield key="shield" size={22} />,
];

const statIcons = [
  <FiAward key="award" size={20} />,
  <FiUsers key="users" size={20} />,
  <FiGlobe key="globe" size={20} />,
  <FiHeart key="heart" size={20} />,
];

const skillIcons = [
  <FiCode key="code" size={20} />,
  <FiSmartphone key="phone" size={20} />,
  <FiLayout key="layout" size={20} />,
  <FiCloud key="cloud" size={20} />,
  <FiTrendingUp key="trend" size={20} />,
  <FiShield key="shield" size={20} />,
];

export default function AboutClient({ team = [] }) {
  const { t } = useTranslation();
  const displayedTeam = team.slice(0, 3);

  const rawStats = t('about.stats', { returnObjects: true }) || [];
  const stats = Array.isArray(rawStats) && rawStats.length === 4
    ? rawStats.map((s, idx) => ({ ...s, icon: statIcons[idx] }))
    : [
        { value: '65+', label: 'Projects Delivered', icon: statIcons[0] },
        { value: '46+', label: 'Happy Clients', icon: statIcons[1] },
        { value: '4+', label: 'Years Experience', icon: statIcons[2] },
        { value: '99%', label: 'Satisfaction Rate', icon: statIcons[3] },
      ];

  const rawValues = t('about.values', { returnObjects: true }) || [];
  const values = Array.isArray(rawValues) && rawValues.length === 4
    ? rawValues.map((v, idx) => ({ ...v, icon: valueIcons[idx] }))
    : [
        {
          icon: valueIcons[0],
          title: 'Client-First',
          desc: 'Every decision we make starts with one question: does this serve our client best?',
        },
        {
          icon: valueIcons[1],
          title: 'Built to Perform',
          desc: 'Fast load times, clean code, and scalable architecture — not just good looks.',
        },
        {
          icon: valueIcons[2],
          title: 'Crafted with Care',
          desc: 'We treat every project as if it were our own product. Details matter to us.',
        },
        {
          icon: valueIcons[3],
          title: 'Reliable & Honest',
          desc: 'No overpromising. We deliver what we say, when we say it.',
        },
      ];

  const rawSkills = t('about.skills', { returnObjects: true }) || [];
  const skills = Array.isArray(rawSkills) && rawSkills.length === 6
    ? rawSkills.map((sk, idx) => ({ ...sk, icon: skillIcons[idx] }))
    : [
        { icon: skillIcons[0], label: 'Web Development', desc: 'Next.js, React, Node.js' },
        { icon: skillIcons[1], label: 'Mobile Apps', desc: 'React Native, Flutter' },
        { icon: skillIcons[2], label: 'UI/UX Design', desc: 'Figma, Tailwind, Framer' },
        { icon: skillIcons[3], label: 'Cloud Solutions', desc: 'AWS, Vercel, Firebase' },
        { icon: skillIcons[4], label: 'SEO & Growth', desc: 'Analytics, Core Web Vitals' },
        { icon: skillIcons[5], label: 'Security', desc: 'Auth, HTTPS, Best Practices' },
      ];

  const rawSteps = t('about.steps', { returnObjects: true }) || [];
  const steps = Array.isArray(rawSteps) && rawSteps.length === 4
    ? rawSteps
    : ['Design', 'Develop', 'Deploy', 'Grow'];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full dark:from-violet-950 dark:to-cyan-950 opacity-40 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-4">
            {t('about.heroBadge', 'Who We Are')}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-exo-extralight mb-6 leading-tight">
            {t('about.heroTitleStart', 'We build digital things')}{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              {t('about.heroTitleHighlight', 'that last.')}
            </span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            {t('about.heroDesc', 'MerxoDev Solutions is a Rangpur-based software team building modern web apps, mobile products, and cloud systems for clients who care about quality.')}
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 pb-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 py-8 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <span className="text-violet-500">{stat.icon}</span>
              <span className="text-3xl font-black font-exo-extralight bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('about.storyBadge', 'Our Story')}
            </span>
            <h2 className="text-3xl font-black font-exo-extralight mb-5 leading-tight">
              {t('about.storyTitleStart', 'Started small,')}{' '}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                {t('about.storyTitleHighlight', 'thinking big.')}
              </span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
              {t('about.storyP1', "MerxoDev Solutions was founded with one belief — that great software shouldn't be limited to big cities or big budgets. We started as a small team in Rangpur, Bangladesh, taking on projects that others overlooked.")}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t('about.storyP2', 'Today we work with clients across the country and beyond, delivering web apps, mobile products, and digital systems that genuinely move businesses forward.')}
            </p>
          </div>

          {/* Visual accent */}
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 opacity-10" />
            <div className="relative h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-center gap-5">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                  <span className="text-sm font-semibold font-exo-extralight text-zinc-700 dark:text-zinc-300">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('about.valuesBadge', 'What We Stand For')}
            </span>
            <h2 className="text-3xl font-black font-exo-extralight">
              {t('about.valuesTitle', 'Our Values')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map(v => (
              <div
                key={v.title}
                className="flex gap-4 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-violet-200 dark:hover:border-violet-800 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0 group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-bold font-exo-extralight mb-1 text-[#27003B] dark:text-white">
                    {v.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('about.expertiseBadge', 'What We Do')}
            </span>
            <h2 className="text-3xl font-black font-exo-extralight">
              {t('about.expertiseTitle', 'Our Expertise')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map(s => (
              <div
                key={s.label}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:shadow-sm transition-shadow"
              >
                <span className="text-violet-500 dark:text-violet-400">
                  {s.icon}
                </span>
                <div>
                  <p className="font-bold text-sm font-exo-extralight text-[#27003B] dark:text-white">
                    {s.label}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('about.teamBadge', 'The People')}
            </span>
            <h2 className="text-3xl font-black font-exo-extralight">
              {t('about.teamTitle', 'Meet the Team')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedTeam.map(member => (
              <div
                key={member.id || member.name}
                className="group flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 hover:border-violet-300 dark:hover:border-violet-700/50 hover:shadow-lg transition-all"
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-violet-500 transition-colors">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                      {member.name?.slice(0, 2)?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <h3 className="font-bold font-exo-extralight text-[#27003B] dark:text-white text-base">
                    {member.name}
                  </h3>
                  <p className="text-xs text-violet-500 font-semibold mt-0.5">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                  {member.socialLinks && (
                    <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                      {member.socialLinks.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-blue-500 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <FiLinkedin size={15} />
                        </a>
                      )}
                      {member.socialLinks.github && (
                        <a
                          href={member.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-blue-500 transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <FiGithub size={15} />
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a
                          href={member.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-sky-400 transition-colors"
                          aria-label={`${member.name} Twitter`}
                        >
                          <FiTwitter size={15} />
                        </a>
                      )}
                      {member.socialLinks.website && (
                        <a
                          href={member.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-emerald-400 transition-colors"
                          aria-label={`${member.name} Website`}
                        >
                          <FiGlobe size={15} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Link to Full Team Page */}
          <div className="mt-12 text-center">
            <Link
              href="/our-team"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-cyan-500/10 hover:from-violet-600/20 hover:via-indigo-600/20 hover:to-cyan-500/20 border border-violet-500/30 hover:border-violet-500/60 text-[#27003B] dark:text-white font-bold text-sm font-exo-extralight transition-all duration-300 shadow-sm hover:shadow-violet-500/10 hover:shadow-lg group"
            >
              <span>{t('about.viewAllTeam', 'View All Team Members')}</span>
              {team.length > 3 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-600 dark:text-violet-300">
                  {team.length}
                </span>
              )}
              <FiArrowRight className="text-violet-500 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-px">
            <div className="rounded-2xl px-8 py-12">
              <h2 className="text-2xl font-black font-exo-extralight mb-3">
                {t('about.ctaTitle', "Let's build something together")}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                {t('about.ctaDesc', "Whether you have a full brief or just an idea — we're ready to talk.")}
              </p>
              <Link
                href="/contact"
                className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold font-exo-extralight hover:opacity-90 transition-opacity"
              >
                {t('about.ctaBtn', 'Get In Touch')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
