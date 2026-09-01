import Link from 'next/link';
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
} from 'react-icons/fi';

const values = [
  {
    icon: <FiTarget size={22} />,
    title: 'Client-First',
    desc: 'Every decision we make starts with one question: does this serve our client best?',
  },
  {
    icon: <FiZap size={22} />,
    title: 'Built to Perform',
    desc: 'Fast load times, clean code, and scalable architecture — not just good looks.',
  },
  {
    icon: <FiHeart size={22} />,
    title: 'Crafted with Care',
    desc: 'We treat every project as if it were our own product. Details matter to us.',
  },
  {
    icon: <FiShield size={22} />,
    title: 'Reliable & Honest',
    desc: 'No overpromising. We deliver what we say, when we say it.',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered', icon: <FiAward size={20} /> },
  { value: '30+', label: 'Happy Clients', icon: <FiUsers size={20} /> },
  { value: '3+', label: 'Years Experience', icon: <FiGlobe size={20} /> },
  { value: '99%', label: 'Satisfaction Rate', icon: <FiHeart size={20} /> },
];

const skills = [
  {
    icon: <FiCode size={20} />,
    label: 'Web Development',
    desc: 'Next.js, React, Node.js',
  },
  {
    icon: <FiSmartphone size={20} />,
    label: 'Mobile Apps',
    desc: 'React Native, Flutter',
  },
  {
    icon: <FiLayout size={20} />,
    label: 'UI/UX Design',
    desc: 'Figma, Tailwind, Framer',
  },
  {
    icon: <FiCloud size={20} />,
    label: 'Cloud Solutions',
    desc: 'AWS, Vercel, Firebase',
  },
  {
    icon: <FiTrendingUp size={20} />,
    label: 'SEO & Growth',
    desc: 'Analytics, Core Web Vitals',
  },
  {
    icon: <FiShield size={20} />,
    label: 'Security',
    desc: 'Auth, HTTPS, Best Practices',
  },
];

const team = [
  {
    name: 'AL-AMIN ISLAM',
    role: 'Founder & Lead Developer',
    image: '/alamin-profile.jpeg',
    color: 'from-violet-600 to-cyan-500',
    bio: 'Full-stack engineer with a passion for clean architecture and pixel-perfect UIs.',
  },
  {
    name: 'Nafisa Akter',
    role: 'UI/UX Designer',
    image: '/nafisa-profile.png',
    color: 'from-amber-400 to-orange-500',
    bio: 'Designs interfaces that feel intuitive — because good design should be invisible.',
  },
  {
    name: 'SHAMS ALL LABIB',
    role: 'Backend Engineer',
    image: '/labib-profile.png',
    color: 'from-cyan-500 to-violet-600',
    bio: 'Builds APIs and systems that scale without drama.',
  },
];

export default function AboutPage() {
  return (
    <main className="text-[#27003B] dark:text-white">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full dark:from-violet-950 dark:to-cyan-950 opacity-40 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-4">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-raleway mb-6 leading-tight">
            We build digital things{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              that last.
            </span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            MerxoDev Solutions is a Rangpur-based software team building modern
            web apps, mobile products, and cloud systems for clients who care
            about quality.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 py-8 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <span className="text-violet-500">{stat.icon}</span>
              <span className="text-3xl font-black font-raleway bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
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
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              Our Story
            </span>
            <h2 className="text-3xl font-black font-raleway mb-5 leading-tight">
              Started small,{' '}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                thinking big.
              </span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
              MerxoDev Solutions was founded with one belief — that great
              software shouldn't be limited to big cities or big budgets. We
              started as a small team in Rangpur, Bangladesh, taking on projects
              that others overlooked.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Today we work with clients across the country and beyond,
              delivering web apps, mobile products, and digital systems that
              genuinely move businesses forward.
            </p>
          </div>

          {/* Visual accent */}
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 opacity-10" />
            <div className="relative h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-center gap-5">
              {['Design', 'Develop', 'Deploy', 'Grow'].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                  <span className="text-sm font-semibold font-raleway text-zinc-700 dark:text-zinc-300">
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              What We Stand For
            </span>
            <h2 className="text-3xl font-black font-raleway">Our Values</h2>
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
                  <h3 className="font-bold font-raleway mb-1 text-[#27003B] dark:text-white">
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
      <section className="px-6 py-16 ">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              What We Do
            </span>
            <h2 className="text-3xl font-black font-raleway">Our Expertise</h2>
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
                  <p className="font-bold text-sm font-raleway text-[#27003B] dark:text-white">
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-raleway mb-3">
              The People
            </span>
            <h2 className="text-3xl font-black font-raleway">Meet the Team</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map(member => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold font-raleway text-[#27003B] dark:text-white">
                    {member.name}
                  </p>
                  <p className="text-xs text-violet-500 font-medium mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-px">
            <div className="rounded-2xl px-8 py-12">
              <h2 className="text-2xl font-black font-raleway mb-3">
                Let's build something together
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                Whether you have a full brief or just an idea — we're ready to
                talk.
              </p>
              <Link
                href="/contact"
                className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold font-raleway hover:opacity-90 transition-opacity"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
