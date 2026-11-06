"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FiSliders,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiSend,
  FiZap,
  FiShield,
  FiGlobe,
  FiCpu,
  FiLayers,
} from "react-icons/fi";

const PROJECT_TYPES = [
  {
    id: "landing",
    label: "Landing Page / Portfolio",
    baseBdt: 1200,
    baseDays: 2,
    desc: "High-converting single or 2-page modern Next.js website",
  },
  {
    id: "business",
    label: "Corporate / Business Website",
    baseBdt: 2200,
    baseDays: 4,
    desc: "Multi-page dynamic website with custom Admin CMS & SEO",
  },
  {
    id: "ecommerce",
    label: "Full E-Commerce Online Store",
    baseBdt: 3200,
    baseDays: 7,
    desc: "Product catalog, cart, order tracking, inventory & invoice",
  },
  {
    id: "saas",
    label: "Custom SaaS / Web Application",
    baseBdt: 3800,
    baseDays: 10,
    desc: "Full-stack portal, PostgreSQL database, RBAC & custom APIs",
  },
];

const PAYMENT_OPTIONS = [
  { id: "none", label: "No Payment Gateway", addBdt: 0, addDays: 0 },
  {
    id: "local",
    label: "bKash / Nagad / SSLCommerz",
    addBdt: 500,
    addDays: 1,
  },
  {
    id: "intl",
    label: "Stripe / PayPal (International)",
    addBdt: 600,
    addDays: 1,
  },
  {
    id: "both",
    label: "Both Local + International Gateways",
    addBdt: 900,
    addDays: 2,
  },
];

const ADDON_FEATURES = [
  { id: "cms", label: "Custom Admin Control Panel (CMS)", bdt: 400, days: 1 },
  { id: "ai_chat", label: "24/7 AI Chatbot & Live Support", bdt: 500, days: 1 },
  { id: "auth_2fa", label: "User Auth, 2FA & Role Management", bdt: 400, days: 1 },
  { id: "multilang", label: "Multi-Language (BN / EN / AR)", bdt: 350, days: 1 },
  { id: "seo_pro", label: "Technical SEO, Schema & Speed 99+", bdt: 300, days: 1 },
];

export default function CostCalculatorPage() {
  const [projectType, setProjectType] = useState("business");
  const [pages, setPages] = useState(5);
  const [paymentGateway, setPaymentGateway] = useState("none");
  const [selectedAddons, setSelectedAddons] = useState(["cms", "seo_pro"]);
  const [expressDelivery, setExpressDelivery] = useState(false);

  // Quote & Discovery Call Form
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("08:00 PM (GMT+6)");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    const typeObj =
      PROJECT_TYPES.find((t) => t.id === projectType) || PROJECT_TYPES[1];
    const payObj =
      PAYMENT_OPTIONS.find((p) => p.id === paymentGateway) || PAYMENT_OPTIONS[0];

    let totalBdt = typeObj.baseBdt + payObj.addBdt;
    let totalDays = typeObj.baseDays + payObj.addDays;

    if (pages > 3) {
      totalBdt += (pages - 3) * 120;
      totalDays += Math.floor((pages - 3) / 4);
    }

    for (const addonId of selectedAddons) {
      const a = ADDON_FEATURES.find((x) => x.id === addonId);
      if (a) {
        totalBdt += a.bdt;
        totalDays += a.days;
      }
    }

    if (expressDelivery) {
      totalBdt = Math.round(totalBdt * 1.2);
      totalDays = Math.max(1, Math.ceil(totalDays * 0.6));
    }

    const usdEstimate = Math.max(15, Math.round(totalBdt / 115));
    return {
      totalBdt,
      usdEstimate,
      totalDays,
      typeLabel: typeObj.label,
      payLabel: payObj.label,
    };
  }, [projectType, pages, paymentGateway, selectedAddons, expressDelivery]);

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      toast.error("Please enter your name and email address");
      return;
    }
    setSubmitting(true);
    try {
      const addonNames = selectedAddons
        .map((id) => ADDON_FEATURES.find((a) => a.id === id)?.label)
        .filter(Boolean)
        .join(", ");

      const summaryMsg = [
        `[Interactive Cost Calculator & Discovery Call Request]`,
        `• Project Type: ${estimate.typeLabel}`,
        `• Number of Pages: ${pages}`,
        `• Payment Gateway: ${estimate.payLabel}`,
        `• Selected Add-ons: ${addonNames || "Standard"}`,
        `• Estimated Timeline: ~${estimate.totalDays} Days (${
          expressDelivery ? "Express Priority" : "Standard"
        })`,
        `• Estimated Budget: BDT ${estimate.totalBdt.toLocaleString()} (~$${estimate.usdEstimate} USD)`,
        meetingDate
          ? `• Requested 15-Min Google Meet Call: ${meetingDate} at ${meetingTime}`
          : "",
        notes ? `• Client Notes: ${notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName.trim(),
          email: clientEmail.trim(),
          phone: clientPhone.trim(),
          service: estimate.typeLabel,
          budget: `BDT ${estimate.totalBdt.toLocaleString()} (~$${estimate.usdEstimate})`,
          message: summaryMsg,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success("Estimate locked! Confirmation sent to your email.");
      } else {
        toast.error(data.error || "Failed to submit estimate");
      }
    } catch {
      toast.error("Network error while submitting estimate");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060914] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/25 mb-4">
            <FiSliders /> Interactive Project Cost &amp; Timeline Estimator
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Calculate Your Website Cost in{" "}
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              30 Seconds
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Configure your exact project requirements, preview transparent pricing in BDT &amp; USD, and optionally book a free 15-minute Google Meet discovery call with our lead engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Configurator */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Project Type */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <FiLayers className="text-orange-400" /> 1. Select Project Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROJECT_TYPES.map((t) => {
                  const active = projectType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setProjectType(t.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        active
                          ? "bg-purple-600/15 border-purple-500 shadow-lg shadow-purple-500/10"
                          : "bg-slate-950/60 border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">
                          {t.label}
                        </span>
                        <span className="text-xs font-extrabold text-orange-400">
                          ৳{t.baseBdt.toLocaleString()}+
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Number of Pages */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FiGlobe className="text-cyan-400" /> 2. Number of Pages / Screens
                </h2>
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-bold text-xs border border-cyan-500/30">
                  {pages} {pages === 1 ? "Page" : "Pages"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>1 Page (Landing)</span>
                <span>10 Pages</span>
                <span>25+ Pages</span>
              </div>
            </div>

            {/* Step 3: Payment Gateway */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <FiShield className="text-emerald-400" /> 3. Payment Gateway Integration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAYMENT_OPTIONS.map((p) => {
                  const active = paymentGateway === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentGateway(p.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        active
                          ? "bg-emerald-500/15 border-emerald-500"
                          : "bg-slate-950/60 border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="font-bold text-xs text-white">
                        {p.label}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                        {p.addBdt === 0 ? "Included" : `+৳${p.addBdt}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Add-on Engineering Features */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <FiCpu className="text-purple-400" /> 4. Additional Features &amp; Modules
              </h2>
              <div className="space-y-2.5">
                {ADDON_FEATURES.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        checked
                          ? "bg-purple-500/15 border-purple-500/50"
                          : "bg-slate-950/50 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {}}
                          className="accent-orange-500 w-4 h-4"
                        />
                        <span className="text-sm font-medium text-slate-200">
                          {addon.label}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-orange-400">
                        +৳{addon.bdt}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Express Priority Toggle */}
              <div
                onClick={() => setExpressDelivery(!expressDelivery)}
                className={`mt-4 flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  expressDelivery
                    ? "bg-orange-500/15 border-orange-500"
                    : "bg-slate-950/60 border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FiZap className="text-orange-400 text-lg" />
                  <div>
                    <div className="text-sm font-bold text-white">
                      Express Priority Delivery (40% Faster)
                    </div>
                    <div className="text-xs text-slate-400">
                      Dedicated senior engineers assigned immediately
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={expressDelivery}
                  onChange={() => {}}
                  className="accent-orange-500 w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate Summary + Booking Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
                    Live Instant Estimate
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    ৳{estimate.totalBdt.toLocaleString()}{" "}
                    <span className="text-base font-semibold text-slate-400">
                      (~${estimate.usdEstimate} USD)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    <FiClock /> ~{estimate.totalDays} Days
                  </span>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <FiCheckCircle className="text-emerald-400 text-5xl mx-auto" />
                  <h3 className="text-xl font-bold text-white">
                    Estimate &amp; Discovery Call Received!
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We have sent a confirmation email with your estimate summary to{" "}
                    <strong>{clientEmail}</strong>. You can also track your project live anytime!
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <Link
                      href="/track-project"
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                    >
                      Track Project Status
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
                    >
                      Calculate Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-3.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Lock This Price &amp; Book Free 15-Min Google Meet Call
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 text-sm text-white focus:border-orange-500 outline-none"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 text-sm text-white focus:border-orange-500 outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp / Phone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 text-sm text-white focus:border-orange-500 outline-none"
                    />
                  </div>

                  {/* Optional 15-Min Discovery Call Slot Picker */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                      <FiCalendar /> Optional: Schedule 15-Min Google Meet Call
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white outline-none"
                      />
                      <select
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white outline-none"
                      >
                        <option value="11:00 AM (GMT+6)">11:00 AM (GMT+6)</option>
                        <option value="03:00 PM (GMT+6)">03:00 PM (GMT+6)</option>
                        <option value="06:00 PM (GMT+6)">06:00 PM (GMT+6)</option>
                        <option value="08:00 PM (GMT+6)">08:00 PM (GMT+6)</option>
                        <option value="10:00 PM (GMT+6)">10:00 PM (GMT+6)</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Any specific reference website or project details?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-white/10 text-sm text-white focus:border-orange-500 outline-none"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600 hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 cursor-pointer"
                  >
                    <FiSend />
                    {submitting
                      ? "Sending Estimate..."
                      : "Lock Estimate & Receive Instant Proposal"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
