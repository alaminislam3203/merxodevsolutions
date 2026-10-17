'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiLink,
  FiCpu,
  FiServer,
  FiZap,
  FiShield,
  FiActivity,
  FiRefreshCw,
  FiCode,
  FiSliders,
  FiChevronDown,
} from 'react-icons/fi';
import { FaNetworkWired, FaPlug } from 'react-icons/fa';

export default function ServicesApiIntegrationPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: '99.99%', label: 'API Uptime SLA' },
    { value: '<50ms', label: 'Average Latency' },
    { value: '100+', label: 'APIs Integrated' },
    { value: 'Bank-Grade', label: 'OAuth 2.0 Security' },
  ];

  const featureMeta = [
    {
      icon: <FiLink size={24} />,
      title: 'Custom RESTful & GraphQL API Design',
      desc: 'Architecting robust, rate-limited, and self-documenting REST and GraphQL API services using Node.js, Express, and Next.js.',
      lightBg: 'bg-amber-50 dark:bg-amber-950/80',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
    },
    {
      icon: <FaPlug size={24} />,
      title: 'Third-Party SaaS & CRM Connectors',
      desc: 'Seamlessly synchronizing your application with HubSpot, Salesforce, Zoho, Google Workspace, Slack, and custom enterprise tools.',
      lightBg: 'bg-violet-50 dark:bg-violet-950/80',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
    },
    {
      icon: <FiZap size={24} />,
      title: 'Real-Time Webhooks & Event Listeners',
      desc: 'Instant data synchronization via secure HMAC-verified webhooks, WebSocket subscriptions, and event-driven architecture.',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
    },
    {
      icon: <FiCpu size={24} />,
      title: 'AI & OpenAI LLM Integration',
      desc: 'Embedding ChatGPT, Claude, custom embeddings, intelligent chatbots, and AI workflow automation into your existing apps.',
      lightBg: 'bg-purple-50 dark:bg-purple-950/80',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderGlow: 'hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-purple-500/15',
    },
    {
      icon: <FiShield size={24} />,
      title: 'API Authentication & Token Management',
      desc: 'Hardened API keys, OAuth 2.0 PKCE, JWT tokens, IP whitelisting, and Redis-backed sliding window rate limiting.',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
    },
    {
      icon: <FiActivity size={24} />,
      title: 'SMS & Email Gateway Integrations',
      desc: 'Automated transactional SMS (BulkSMS BD, Twilio, Greenweb) and email dispatch (Resend, SendGrid, Amazon SES).',
      lightBg: 'bg-blue-50 dark:bg-blue-950/80',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
    },
    {
      icon: <FiServer size={24} />,
      title: 'Microservices & Gateway Proxy',
      desc: 'API Gateway routing, reverse proxies, response caching, load balancing, and failover redundancy.',
      lightBg: 'bg-pink-50 dark:bg-pink-950/80',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
    },
    {
      icon: <FiRefreshCw size={24} />,
      title: 'Legacy System Modernization',
      desc: 'Wrapping outdated databases, SOAP services, or desktop software into fast, modern REST/JSON micro-endpoints.',
      lightBg: 'bg-teal-50 dark:bg-teal-950/80',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
    },
    {
      icon: <FiCode size={24} />,
      title: 'Swagger / OpenAPI Documentation',
      desc: 'Interactive Swagger UI and Postman collections with code snippets so any development team can integrate in minutes.',
      lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
    },
  ];

  const techStack = [
    { label: 'REST APIs', category: 'Standard' },
    { label: 'GraphQL', category: 'Query Engine' },
    { label: 'Node.js', category: 'Backend' },
    { label: 'Swagger/OpenAPI', category: 'Docs' },
    { label: 'Redis Caching', category: 'Performance' },
    { label: 'OpenAI API', category: 'AI' },
    { label: 'Twilio / SMS Gateways', category: 'Messaging' },
    { label: 'Resend / SendGrid', category: 'Email' },
    { label: 'Postman Collections', category: 'Testing' },
    { label: 'OAuth 2.0 & JWT', category: 'Security' },
  ];

  const plans = [
    {
      name: 'Single API Integration',
      price: 'BDT 1200',
      desc: 'Connect any single third-party API (Payment, SMS, CRM, or Maps) into your existing application.',
      features: [
        'Complete Endpoint Integration',
        'Webhook & Error Handling Setup',
        'Payload Sanitization & Security',
        'Postman Collection Documentation',
        'Live Production Testing',
        '15 Days Integration Warranty',
      ],
      popular: false,
      cta: 'Integrate Single API',
    },
    {
      name: 'Multi-API Suite & Webhooks',
      price: 'BDT 2600',
      desc: 'Our most popular package for syncing multiple services, automated webhooks, and custom endpoints.',
      features: [
        'Up to 4 Complete API Integrations',
        'Custom REST Endpoint Development',
        'HMAC Secure Webhook Listeners',
        'Redis Rate Limiting & Caching',
        'Swagger Interactive Documentation',
        'Real-time Error Alerting System',
        '30 Days Dedicated Support',
      ],
      popular: true,
      cta: 'Get API Suite',
    },
    {
      name: 'Custom Enterprise Gateway',
      price: 'BDT 3800',
      desc: 'Full-scale microservices API gateway architecture with high concurrency and AI integrations.',
      features: [
        'Unlimited API Endpoints & Microservices',
        'GraphQL & REST Hybrid Architecture',
        'OpenAI / LLM Integration & Embeddings',
        'High-Concurrency Load Balancing',
        'OAuth 2.0 PKCE Auth Server',
        'Complete Architecture Spec & SLA',
        '60 Days Priority Support',
      ],
      popular: false,
      cta: 'Consult API Architect',
    },
  ];

  const faqs = [
    {
      q: 'How do you secure API keys and prevent data leakage?',
      a: 'We store all credentials in encrypted environment variables, enforce HMAC signature verification for webhooks, implement strict CORS headers, and employ Redis sliding-window rate limiting.',
    },
    {
      q: 'Can you integrate Bangladeshi local SMS and verification gateways?',
      a: 'Yes! We regularly integrate Greenweb, BulkSMS BD, Alpha SMS, and OTP verification workflows with instant SMS delivery.',
    },
    {
      q: 'Will you provide documentation for our internal developers?',
      a: 'Yes, every project includes interactive Swagger/OpenAPI documentation and exported Postman collections with working request/response examples.',
    },
  ];

  return (
    <main className="text-[#27003B] dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
          style={{
            // background: 'radial-gradient(circle, #f59e0b, #7c3aed, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-exo-extralight mb-6"
          >
            <Link href="/" className="hover:text-amber-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-amber-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">
              API Integration
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/90 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 uppercase tracking-widest font-exo-extralight mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            REST, GraphQL & Cloud Connectors
          </div>

          <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            API Development &{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 bg-clip-text text-transparent animated-gradient-text">
              Integration
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-exo-extralight">
            Connect your applications to any payment gateway, CRM, AI model, or third-party service with sub-50ms latency, high-security OAuth 2.0, and automated webhooks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=API%20Development%20%26%20Integration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-violet-600 text-white text-sm font-black uppercase tracking-wider font-exo-extralight hover:shadow-xl hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Connect Your APIs</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-exo-extralight text-zinc-800 dark:text-zinc-200 hover:border-amber-500 hover:text-amber-600 transition-all duration-300"
            >
              Explore Solutions
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-exo-extralight">
            <div className="flex items-center justify-center gap-1.5">
              <FaNetworkWired className="text-amber-500" />
              <span>Sub-50ms Latency</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiShield className="text-emerald-500" />
              <span>OAuth 2.0 & HMAC</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiZap className="text-violet-500" />
              <span>Live Webhook Sync</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiCheckCircle className="text-cyan-500" />
              <span>Swagger & Postman Specs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 sm:px-6 pb-20" aria-label="API stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-amber-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-exo-medium uppercase tracking-wide bg-gradient-to-r from-amber-500 to-violet-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="features-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase font-exo-extralight mb-3">
              ✦ Engineered for Seamless Data Flow
            </span>
            <h2
              id="features-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Comprehensive API{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureMeta.map((feature, i) => (
              <div
                key={i}
                className={`group relative flex flex-col justify-between p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl card-hover-lift transition-all duration-300 ${feature.borderGlow}`}
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.lightBg} border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center ${feature.iconColor} shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 font-exo-extralight group-hover:translate-x-1 transition-transform">
                  <span>High Concurrency Standard</span>
                  <FiCheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Pills */}
      <section className="px-4 sm:px-6 pb-24" aria-label="API stack">
        <div className="max-w-[1440px] mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-amber-50/50 via-white to-violet-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase font-exo-extralight mb-2 block">
              ✦ Production API Protocols
            </span>
            <h3 className="font-exo-medium text-2xl sm:text-4xl uppercase tracking-wide">
              API Protocols & Toolchain
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-amber-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-violet-600" />
                <span className="text-sm font-bold text-zinc-900 dark:text-white font-exo-extralight">
                  {tech.label}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="pricing-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase font-exo-extralight mb-3">
              ✦ Transparent API Packages
            </span>
            <h2
              id="pricing-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 bg-clip-text text-transparent">
                Integration Tier
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${plan.popular
                  ? 'border-2 border-amber-500 bg-gradient-to-b from-amber-50/80 via-white to-white dark:from-amber-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-amber-500/20 scale-105 z-10'
                  : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-violet-600 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Most Requested
                  </div>
                )}

                <div>
                  <h3 className="font-exo-medium text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mb-6 min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="font-exo-medium text-4xl sm:text-5xl uppercase tracking-tight text-amber-600 dark:text-amber-400">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-exo-extralight">/ one-time</span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                        <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=API%20Development%20%26%20Integration&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-exo-extralight transition-all duration-200 ${plan.popular
                    ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-violet-600 text-white hover:opacity-95 shadow-lg shadow-amber-500/25'
                    : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-amber-500 hover:text-amber-600'
                    }`}
                >
                  {plan.cta || 'Get Started Now'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase font-exo-extralight mb-2 block">
              ✦ API FAQs
            </span>
            <h2
              id="faq-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer gap-4"
                  >
                    <span className="font-exo-medium text-lg uppercase tracking-wide text-zinc-900 dark:text-white">
                      {faq.q}
                    </span>
                    <FiChevronDown
                      size={20}
                      className={`text-amber-600 dark:text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="relative max-w-[1440px] mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#2a1702] via-[#1a0833] to-[#041a2e] border border-amber-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 font-exo-extralight mb-4">
              ✦ Seamless Connectivity For Your Software
            </span>
            <h2 className="font-exo-medium text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Let's Build Your High-Speed API Backbone
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-exo-extralight leading-relaxed mb-8">
              Consult directly with our senior backend engineers and build rock-solid, scalable API integrations.
            </p>
            <Link
              href="/contact?service=API%20Development%20%26%20Integration"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-violet-600 text-white font-black text-sm uppercase tracking-wider font-exo-extralight hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
            >
              <span>Schedule API Architecture Call</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
