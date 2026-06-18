import Link from 'next/link';
import {
  FiFlag,
  FiUsers,
  FiCode,
  FiStar,
  FiGlobe,
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiArrowRight,
  FiCheckCircle,
  FiZap,
  FiTarget,
} from 'react-icons/fi';

export const metadata = {
  title: 'Our Journey – MerxoDev Solutions',
  description:
    'From a small team in Rangpur to delivering 50+ digital projects — discover the story, milestones, and vision behind MerxoDev Solutions.',
  keywords: [
    'MerxoDev Solutions story',
    'web development company Bangladesh',
    'Rangpur software company',
    'our journey MerxoDev',
    'digital agency Bangladesh',
  ],
  openGraph: {
    title: 'Our Journey – MerxoDev Solutions',
    description:
      'The story behind MerxoDev Solutions — where we started, what we built, and where we are going.',
    url: 'https://merxodevsolutions.vercel.app/our-journey',
  },
};

const milestones = [
  {
    year: '2021',
    quarter: 'Q3',
    icon: <FiFlag size={20} />,
    title: 'The Beginning',
    desc: 'MerxoDev Solutions was born in Rangpur with one laptop, one vision, and zero clients. We built our first portfolio project and decided this was the path.',
    tags: ['Founded', 'Rangpur, BD'],
    color: 'from-violet-600 to-indigo-600',
    lightBg: 'bg-violet-50 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    year: '2021',
    quarter: 'Q4',
    icon: <FiUsers size={20} />,
    title: 'First Clients',
    desc: 'Landed our first 3 paying clients — a local business, a startup, and a freelance referral. Delivered all three on time and kept them coming back.',
    tags: ['3 Clients', 'First Revenue'],
    color: 'from-cyan-500 to-teal-500',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    year: '2022',
    quarter: 'Q1',
    icon: <FiCode size={20} />,
    title: 'Team Expansion',
    desc: 'Brought on our first full-time UI/UX designer and backend engineer. What started as a one-person operation became a small but capable team.',
    tags: ['3-Person Team', 'Full Stack'],
    color: 'from-indigo-500 to-violet-600',
    lightBg: 'bg-indigo-50 dark:bg-indigo-950',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    year: '2022',
    quarter: 'Q3',
    icon: <FiStar size={20} />,
    title: '10 Projects Delivered',
    desc: 'Hit our first major milestone — 10 completed projects across e-commerce, custom apps, and dashboards. Every single client returned for more.',
    tags: ['10 Projects', '100% Retention'],
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    year: '2023',
    quarter: 'Q1',
    icon: <FiGlobe size={20} />,
    title: 'First International Project',
    desc: 'Completed our first project for a client outside Bangladesh. Proof that good work travels — and that timezone differences are just a scheduling challenge.',
    tags: ['International', 'Remote-first'],
    color: 'from-green-600 to-emerald-500',
    lightBg: 'bg-green-50 dark:bg-green-950',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    year: '2023',
    quarter: 'Q3',
    icon: <FiTrendingUp size={20} />,
    title: '30 Happy Clients',
    desc: 'Crossed 30 satisfied clients and launched our first SaaS-style product for a local business. Our service range expanded to include payment integrations and automation.',
    tags: ['30 Clients', 'SaaS Launch'],
    color: 'from-pink-500 to-rose-500',
    lightBg: 'bg-pink-50 dark:bg-pink-950',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
  {
    year: '2024',
    quarter: 'Q2',
    icon: <FiAward size={20} />,
    title: '50+ Projects, Zero Regrets',
    desc: 'Delivered over 50 projects — websites, web apps, mobile apps, dashboards, and automation systems. Our team grew, our stack sharpened, and our process matured.',
    tags: ['50+ Projects', 'Full Service'],
    color: 'from-violet-600 to-cyan-500',
    lightBg: 'bg-violet-50 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    year: '2025',
    quarter: 'Now',
    icon: <FiHeart size={20} />,
    title: 'Still Building',
    desc: 'Today we are a focused team delivering premium digital products for clients who care about quality. We are still in Rangpur, still hungry, and still improving.',
    tags: ['Ongoing', 'Growing'],
    color: 'from-cyan-600 to-violet-600',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
];

const vision = [
  {
    icon: <FiTarget size={22} />,
    title: 'Our Mission',
    desc: 'Make premium software development accessible to businesses of every size — not just the ones with big budgets.',
  },
  {
    icon: <FiZap size={22} />,
    title: 'Our Vision',
    desc: 'Become the most trusted digital partner for growing businesses across South Asia.',
  },
  {
    icon: <FiHeart size={22} />,
    title: 'Our Promise',
    desc: 'Every project we take on gets our full attention, honest communication, and code we are proud to put our name on.',
  },
];

const numbers = [
  { value: '4+', label: 'Years Active' },
  { value: '50+', label: 'Projects Done' },
  { value: '30+', label: 'Happy Clients' },
  { value: '3', label: 'Countries Served' },
];

export default function JourneyPage() {
  return (
    <main className="bg-white dark:bg-zinc-950 text-[#27003B] dark:text-white">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-950 dark:to-cyan-950 opacity-50 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-4">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-raleway mb-6 leading-tight">
            From one laptop{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              to 50+ projects.
            </span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            This is the honest story of how MerxoDev Solutions went from a side
            project in Rangpur to a team delivering real digital products for
            real businesses.
          </p>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {numbers.map(n => (
            <div
              key={n.label}
              className="flex flex-col items-center gap-1.5 py-7 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <span className="text-3xl font-black font-raleway bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                {n.value}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center font-medium">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="px-6 py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              Timeline
            </span>
            <h2 className="text-3xl font-black font-raleway">
              Milestone by milestone
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />

            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div
                  key={m.title}
                  className={`relative flex gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'} pl-14 md:pl-0`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 mb-3 ${
                        i % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase font-raleway">
                        {m.year} · {m.quarter}
                      </span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:border-violet-200 dark:hover:border-violet-800 transition-colors">
                      <h3 className="font-black font-raleway text-[#27003B] dark:text-white mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                        {m.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {m.tags.map(tag => (
                          <span
                            key={tag}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${m.lightBg} ${m.iconColor}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-10">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-md`}
                    >
                      {m.icon}
                    </div>
                  </div>

                  {/* Empty half for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission ── */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              Looking Ahead
            </span>
            <h2 className="text-3xl font-black font-raleway">
              Where we are going
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {vision.map(v => (
              <div
                key={v.title}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-violet-200 dark:hover:border-violet-800 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-black font-raleway text-[#27003B] dark:text-white mb-1.5">
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

      {/* ── What We Learned ── */}
      <section className="px-6 py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              Lessons
            </span>
            <h2 className="text-3xl font-black font-raleway">
              What the journey taught us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Communication beats code quality when clients are concerned.',
              'A slow, right solution beats a fast, broken one every time.',
              'Small teams move faster — and care more.',
              'The best clients come from referrals, not ads.',
              'Saying no to the wrong project saves everyone time.',
              'Consistency over time is the only real growth strategy.',
            ].map(lesson => (
              <div
                key={lesson}
                className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800"
              >
                <FiCheckCircle
                  size={17}
                  className="text-violet-500 shrink-0 mt-0.5"
                />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 p-px">
            <div className="rounded-2xl bg-white dark:bg-zinc-950 px-8 py-12">
              <h2 className="text-2xl font-black font-raleway mb-3">
                Want to be part of our next chapter?
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                Every great project adds a new milestone to this page. Let's add
                yours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold font-raleway hover:opacity-90 transition-opacity"
              >
                Start a Project <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
