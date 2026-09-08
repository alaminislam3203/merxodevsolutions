import Link from 'next/link';
import {
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiGlobe,
  FiArrowRight,
  FiUsers,
  FiZap,
  FiAward,
  FiHeart,
  FiCode,
  FiCheckCircle,
  FiLayers,
} from 'react-icons/fi';
import { getTeamMembers } from '@/app/lib/team';

export const metadata = {
  title: 'Our Team — Software Engineers & Designers | MerxoDev Solutions Bangladesh',
  description:
    'Meet the passionate developers, UI/UX designers, and tech strategists behind MerxoDev Solutions. Building scalable web apps, custom software, and digital solutions in Bangladesh.',
  keywords: [
    // English
    'MerxoDev Solutions team',
    'our team MerxoDev Solutions',
    'software engineers Bangladesh',
    'web developers Rangpur',
    'full stack developers Bangladesh',
    'UI UX designers BD',
    'MerxoDev team members',
    'tech leads Bangladesh',
    'hire developers Bangladesh',
    'software agency team',
    // Bengali (বাংলা)
    'আমাদের টিম',
    'মারক্সোদেব সলিউশনস টিম',
    'সফটওয়্যার ইঞ্জিনিয়ার বাংলাদেশ',
    'ওয়েব ডেভেলপার দল',
    'আইটি বিশেষজ্ঞ বাংলাদেশ',
    'টিম মেম্বার পরিচিতি',
    // Banglish (বাংলিশ)
    'amader team merxodev',
    'software engineer bangladesh',
    'web developer team rangpur',
    'merxodev er team members',
    'it team bd',
    'amader engineer o designer',
  ],
  alternates: {
    canonical: 'https://merxodevsolutions.pro.bd/our-team',
  },
  openGraph: {
    title: 'Our Team — Software Engineers & Designers | MerxoDev Solutions Bangladesh',
    description:
      'Meet the engineers, designers, and innovators behind MerxoDev Solutions. Dedicated to engineering excellence and scalable digital products.',
    url: 'https://merxodevsolutions.pro.bd/our-team',
    siteName: 'MerxoDev Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://merxodevsolutions.pro.bd/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'Our Team — MerxoDev Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team — Software Engineers & Designers | MerxoDev Solutions',
    description:
      'The skilled engineers, designers, and strategists behind MerxoDev Solutions in Bangladesh.',
    images: ['https://merxodevsolutions.pro.bd/logo-light.png'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const teamValues = [
  {
    icon: <FiCode className="w-5 h-5 text-violet-500" />,
    title: 'Code Craftsmanship',
    desc: 'Clean architecture, maintainable codebases, and performance-first engineering.',
  },
  {
    icon: <FiZap className="w-5 h-5 text-amber-500" />,
    title: 'Agile Velocity',
    desc: 'Fast iterations, rapid prototyping, and prompt client communication at every step.',
  },
  {
    icon: <FiHeart className="w-5 h-5 text-pink-500" />,
    title: 'User-Centric Design',
    desc: 'Intuitive UX and pixel-perfect aesthetics that elevate real-world conversions.',
  },
  {
    icon: <FiAward className="w-5 h-5 text-cyan-500" />,
    title: 'Continuous Innovation',
    desc: 'Adopting state-of-the-art tools, cloud microservices, and AI integrations.',
  },
];

export default async function OurTeamPage() {
  const team = await getTeamMembers();

  // Structured Data (JSON-LD) for SEO
  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'MerxoDev Solutions Team',
    url: 'https://merxodevsolutions.pro.bd/our-team',
    description:
      'The complete engineering and design team at MerxoDev Solutions Bangladesh.',
    mainEntity: {
      '@type': 'Organization',
      name: 'MerxoDev Solutions',
      url: 'https://merxodevsolutions.pro.bd',
      employee: team.map((member) => ({
        '@type': 'Person',
        name: member.name,
        jobTitle: member.role,
        ...(member.image && { image: member.image }),
        description: member.bio || `${member.name} at MerxoDev Solutions`,
      })),
    },
  };

  return (
    <main className="text-[#27003B] dark:text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-violet-600/20 via-indigo-600/15 to-cyan-500/20 blur-3xl pointer-events-none -z-10" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 text-xs font-bold uppercase tracking-widest font-raleway mb-6">
            <FiUsers className="w-3.5 h-3.5 text-amber-500" />
            <span>Meet Our Team</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-raleway tracking-tight mb-6 leading-[1.15]">
            The Passionate Minds Behind{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Every Solution
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8 font-raleway">
            We are a tight-knit collective of full-stack engineers, creative designers,
            and digital strategists dedicated to delivering high-performance web products
            and cloud solutions that elevate businesses.
          </p>

          {/* Quick Metrics Badge */}
          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-raleway">
                {team.length} Active Members
              </span>
            </div>
            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <FiCheckCircle className="text-violet-500" />
              <span>100% In-House Expertise</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Grid Section ── */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => {
            const gradColor = member.color || 'from-violet-600 to-cyan-500';
            return (
              <div
                key={member.id || member.name || index}
                className="group relative rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md p-7 flex flex-col justify-between hover:border-violet-500/60 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle top card accent gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradColor} opacity-70 group-hover:opacity-100 transition-opacity`} />

                <div>
                  {/* Avatar + Status */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-violet-500 transition-colors shadow-md bg-zinc-100 dark:bg-zinc-800">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${gradColor} flex items-center justify-center text-white font-black text-2xl`}>
                            {member.name?.slice(0, 2)?.toUpperCase() || 'MD'}
                          </div>
                        )}
                      </div>
                      {/* Active green status dot */}
                      <span
                        title="Active Team Member"
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 shadow-sm"
                      />
                    </div>

                    {/* Member Index Pill */}
                    <span className="text-[11px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/50">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl font-black font-raleway text-[#27003B] dark:text-white group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 font-raleway mb-3">
                    {member.role}
                  </p>

                  {/* Bio */}
                  {member.bio ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-4 mb-6">
                      {member.bio}
                    </p>
                  ) : (
                    <p className="text-sm text-zinc-400 italic mb-6">
                      Dedicated member driving innovative engineering at MerxoDev.
                    </p>
                  )}
                </div>

                {/* Social Links & Footer of card */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 border border-zinc-200 dark:border-zinc-800 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <FiLinkedin size={15} />
                      </a>
                    )}
                    {member.socialLinks?.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-500/10 border border-zinc-200 dark:border-zinc-800 transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <FiGithub size={15} />
                      </a>
                    )}
                    {member.socialLinks?.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-sky-400 hover:bg-sky-500/10 border border-zinc-200 dark:border-zinc-800 transition-colors"
                        aria-label={`${member.name} Twitter`}
                      >
                        <FiTwitter size={15} />
                      </a>
                    )}
                    {member.socialLinks?.website && (
                      <a
                        href={member.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/10 border border-zinc-200 dark:border-zinc-800 transition-colors"
                        aria-label={`${member.name} Website`}
                      >
                        <FiGlobe size={15} />
                      </a>
                    )}
                    {/* Fallback indicator if no social links */}
                    {!member.socialLinks?.linkedin &&
                      !member.socialLinks?.github &&
                      !member.socialLinks?.twitter &&
                      !member.socialLinks?.website && (
                        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 italic">
                          MerxoDev Core
                        </span>
                      )}
                  </div>

                  <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 font-raleway group-hover:text-violet-500 transition-colors">
                    MerxoDev Solutions
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Culture & Values Section ── */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold tracking-[0.35em] text-amber-500 uppercase font-raleway mb-3">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-raleway tracking-tight">
            Our Core Team Principles
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-lg mx-auto">
            The shared standards that guide every line of code we write and every product we design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamValues.map((val) => (
            <div
              key={val.title}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 hover:border-violet-400 dark:hover:border-violet-700/50 hover:bg-violet-50/20 dark:hover:bg-violet-950/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                {val.icon}
              </div>
              <h3 className="font-bold font-raleway text-base mb-2 text-[#27003B] dark:text-white">
                {val.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Work With Us CTA ── */}
      <section className="px-6 py-16 mb-12">
        <div className="max-w-4xl mx-auto text-center rounded-3xl p-10 sm:p-14 bg-gradient-to-br from-violet-600/10 via-indigo-600/10 to-cyan-500/10 border border-violet-500/25 relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-500 uppercase font-raleway mb-3">
              Join Or Collaborate
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-raleway mb-4 tracking-tight">
              Want to Work With Our Team?
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 font-raleway">
              Have a digital project that needs high-level engineering, or interested in joining
              our team? Let's talk and build something exceptional together.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm font-raleway shadow-lg shadow-violet-500/25 transition-all duration-200"
              >
                Hire Our Team
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-bold font-raleway transition-all duration-200"
              >
                About Our Company
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
