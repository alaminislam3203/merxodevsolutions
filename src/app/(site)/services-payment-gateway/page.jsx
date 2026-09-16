'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiZap,
  FiShield,
  FiRefreshCw,
  FiActivity,
  FiTrendingUp,
  FiLock,
  FiChevronDown,
} from 'react-icons/fi';
import { FaMoneyBillWave, FaStripeS } from 'react-icons/fa';

export default function ServicesPaymentGatewayPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: '100%', label: 'PCI-DSS Compliant' },
    { value: '0.2s', label: 'Instant IPN Verification' },
    { value: '10+', label: 'Gateways Supported' },
    { value: 'Zero', label: 'Double Charge Incidents' },
  ];

  const featureMeta = [
    {
      icon: <FiCreditCard size={24} />,
      title: 'bKash & Nagad Direct Merchant Checkout',
      desc: 'Seamless direct API integration for bKash Tokenized Checkout and Nagad Payment Engine with one-tap payment confirmation.',
      lightBg: 'bg-pink-50 dark:bg-pink-950/80',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
    },
    {
      icon: <FaStripeS size={24} />,
      title: 'Stripe Global Credit & Debit Cards',
      desc: 'Accept Visa, Mastercard, American Express, Apple Pay, and Google Pay worldwide with 3D Secure 2 authentication.',
      lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
    },
    {
      icon: <FaMoneyBillWave size={24} />,
      title: 'SSLCommerz, Shurjopay & AamarPay',
      desc: 'Multi-channel payment aggregators supporting internet banking, Rocket, Upay, Cellfin, and all major Bangladeshi bank cards.',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
    },
    {
      icon: <FiZap size={24} />,
      title: 'Instant IPN & Webhook Verification',
      desc: 'Bulletproof Instant Payment Notification (IPN) handlers with cryptographic hash matching to prevent forged orders.',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
    },
    {
      icon: <FiRefreshCw size={24} />,
      title: 'Subscription & Recurring Billing Engine',
      desc: 'Automated SaaS monthly/yearly billing cycles, invoice generation, pro-rated upgrades, and grace period handling.',
      lightBg: 'bg-violet-50 dark:bg-violet-950/80',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
    },
    {
      icon: <FiShield size={24} />,
      title: 'Fraud Mitigation & Chargeback Shield',
      desc: 'Card velocity checks, suspicious IP filtering, CVV verification, and automated refund & dispute management workflows.',
      lightBg: 'bg-amber-50 dark:bg-amber-950/80',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
    },
    {
      icon: <FiLock size={24} />,
      title: 'PCI-DSS Zero-Card-Data Architecture',
      desc: 'Client-side tokenization so sensitive card details never touch your server, keeping your platform 100% compliant.',
      lightBg: 'bg-teal-50 dark:bg-teal-950/80',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
    },
    {
      icon: <FiActivity size={24} />,
      title: 'Automated Invoice & Tax Calculation',
      desc: 'Dynamic PDF receipt generator, automatic VAT/tax calculation, and instant SMS/email payment confirmation alerts.',
      lightBg: 'bg-blue-50 dark:bg-blue-950/80',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: 'Financial Reconciliation Dashboard',
      desc: 'Real-time revenue metrics, successful vs failed transaction logs, payout tracking, and accountant-ready CSV exports.',
      lightBg: 'bg-purple-50 dark:bg-purple-950/80',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderGlow: 'hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-purple-500/15',
    },
  ];

  const techStack = [
    { label: 'bKash Tokenized API', category: 'Local MFS' },
    { label: 'Nagad Direct API', category: 'Local MFS' },
    { label: 'Stripe Payments', category: 'International' },
    { label: 'SSLCommerz v4', category: 'Aggregator' },
    { label: 'AamarPay API', category: 'Aggregator' },
    { label: 'Shurjopay Engine', category: 'Aggregator' },
    { label: 'Stripe Webhooks', category: 'IPN' },
    { label: 'PayPal Checkout', category: 'Global' },
  ];

  const plans = [
    {
      name: 'Single Gateway Integration',
      price: 'BDT 1200',
      desc: 'Integration of any single payment method (bKash, Nagad, Stripe, or SSLCommerz) with live testing.',
      features: [
        'Complete Gateway Checkout Setup',
        'Instant Webhook / IPN Handler',
        'Success & Failure Redirect Pages',
        'Database Order Status Sync',
        'Live Sandbox & Production Verification',
        '15 Days Integration Guarantee',
      ],
      popular: false,
      cta: 'Integrate Single Gateway',
    },
    {
      name: 'Dual Gateway (Local + Global)',
      price: 'BDT 2500',
      desc: 'Our most popular package offering Bangladeshi MFS (bKash/Nagad) plus international card processing (Stripe).',
      features: [
        'bKash + Nagad Direct Checkout',
        'Stripe International Card Gateway',
        'Instant Auto-Invoice Generation',
        'SMS & Email Payment Alerts',
        'Refund & Dispute Admin Tools',
        '30 Days Priority Technical Support',
      ],
      popular: true,
      cta: 'Get Dual Gateway',
    },
    {
      name: 'All-In-One Enterprise Gateway',
      price: 'BDT 3800',
      desc: 'Multi-gateway dynamic switcher, recurring SaaS subscription billing, and accountant reconciliation tools.',
      features: [
        'All Bangladesh Gateways + Stripe/PayPal',
        'Dynamic Gateway Routing & Failover',
        'Automated Subscription Recurring Billing',
        'Custom Admin Accounting Dashboard',
        'Automated VAT/Tax Calculation',
        '60 Days Dedicated Support',
      ],
      popular: false,
      cta: 'Build Enterprise Gateway',
    },
  ];

  const faqs = [
    {
      q: 'How does bKash Tokenized Checkout work for recurring customers?',
      a: 'After the initial authorization, the user’s bKash wallet is securely tokenized, allowing frictionless 1-click repeat purchases without re-entering PIN/OTP every single time.',
    },
    {
      q: 'Do you handle the merchant account verification process?',
      a: 'We guide you step-by-step through obtaining production API credentials and merchant agreements with bKash, Nagad, SSLCommerz, or Stripe.',
    },
    {
      q: 'What happens if a user’s network drops during payment?',
      a: 'Our IPN and reconciliation listeners query the gateway backend directly to verify transaction status, ensuring no paid order is ever lost or double-charged.',
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
            // background: 'radial-gradient(circle, #ec4899, #6366f1, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-raleway mb-6"
          >
            <Link href="/" className="hover:text-pink-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-pink-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-pink-600 dark:text-pink-400 font-semibold">
              Payment Gateway Integration
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-pink-100 dark:bg-pink-950/90 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 uppercase tracking-widest font-raleway mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            bKash, Nagad, Stripe & SSLCommerz
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            Payment Gateway{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent animated-gradient-text">
              Integration
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-raleway">
            Accept payments seamlessly with bulletproof integrations for bKash, Nagad, Rocket, Stripe, and SSLCommerz with instant IPN verification and zero double-charge risk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=Payment%20Gateway%20Integration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-sm font-black uppercase tracking-wider font-raleway hover:shadow-xl hover:shadow-pink-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Integrate Payments</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-raleway text-zinc-800 dark:text-zinc-200 hover:border-pink-500 hover:text-pink-600 transition-all duration-300"
            >
              View Checkout Demos
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-raleway">
            <div className="flex items-center justify-center gap-1.5">
              <FiCreditCard className="text-pink-500" />
              <span>bKash & Nagad MFS</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FaStripeS className="text-indigo-500" />
              <span>Stripe Cards & Apple Pay</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiZap className="text-amber-500" />
              <span>Instant IPN Sync</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiShield className="text-emerald-500" />
              <span>PCI-DSS Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 sm:px-6 pb-20" aria-label="Payment stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-pink-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-display uppercase tracking-wide bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway font-semibold">
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
            <span className="inline-block text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase font-raleway mb-3">
              ✦ Engineered for Seamless Checkout
            </span>
            <h2
              id="features-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Payment Engineering{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
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

                  <h3 className="font-display text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-pink-600 dark:text-pink-400 font-raleway group-hover:translate-x-1 transition-transform">
                  <span>Zero-Drop Guarantee</span>
                  <FiCheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Pills */}
      <section className="px-4 sm:px-6 pb-24" aria-label="Payment stack">
        <div className="max-w-[1440px] mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-pink-50/50 via-white to-indigo-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase font-raleway mb-2 block">
              ✦ Certified Payment Hub
            </span>
            <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wide">
              Supported Payment Networks
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-pink-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600" />
                <span className="text-sm font-bold text-zinc-900 dark:text-white font-raleway">
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
            <span className="inline-block text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase font-raleway mb-3">
              ✦ Transparent Payment Setup
            </span>
            <h2
              id="pricing-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Gateway Tier
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${
                  plan.popular
                    ? 'border-2 border-pink-500 bg-gradient-to-b from-pink-50/80 via-white to-white dark:from-pink-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-pink-500/20 scale-105 z-10'
                    : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Best Seller
                  </div>
                )}

                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway mb-6 min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-pink-600 dark:text-pink-400">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-raleway">/ one-time</span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-raleway">
                        <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=Payment%20Gateway%20Integration&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-raleway transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white hover:opacity-95 shadow-lg shadow-pink-500/25'
                      : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-pink-500 hover:text-pink-600'
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
            <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase font-raleway mb-2 block">
              ✦ Payment FAQs
            </span>
            <h2
              id="faq-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide"
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
                    <span className="font-display text-lg uppercase tracking-wide text-zinc-900 dark:text-white">
                      {faq.q}
                    </span>
                    <FiChevronDown
                      size={20}
                      className={`text-pink-600 dark:text-pink-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-zinc-600 dark:text-zinc-400 font-raleway leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80">
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
        <div className="relative max-w-[1440px] mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#290117] via-[#1a052e] to-[#02182b] border border-pink-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-pink-400 font-raleway mb-4">
              ✦ Never Miss a Sale
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Start Accepting Payments Today
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-raleway leading-relaxed mb-8">
              Enable your customers in Bangladesh and across the world to pay smoothly via bKash, Nagad, Cards, and online banking.
            </p>
            <Link
              href="/contact?service=Payment%20Gateway%20Integration"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black text-sm uppercase tracking-wider font-raleway hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
            >
              <span>Request Payment Integration</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
