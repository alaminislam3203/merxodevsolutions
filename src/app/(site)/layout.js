import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GsapTextProvider from '@/components/GsapTextProvider';
import AIChatbot from '@/components/AIChatbot';

// (site) group layout - WITH Navbar, Footer, and AI Assistant
// Wraps all public pages with unified hero-themed ambient background aura

export default function SiteLayout({ children }) {
  return (
    <GsapTextProvider>
      {/* ── Global Hero-Themed Ambient Lighting Layer (Floats seamlessly across all sections) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden -z-10 select-none"
      >
        {/* Top luminous aurora orb */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1150px] h-[550px] sm:h-[650px] rounded-full opacity-35 dark:opacity-25 blur-[130px] bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-cyan-500 animate-pulse-glow" />

        {/* Mid-left luminous lime accent */}
        <div
          className="absolute top-1/3 -left-40 w-[450px] h-[450px] rounded-full opacity-20 dark:opacity-15 blur-[110px] bg-lime-500/80 dark:bg-lime-500/60 animate-pulse-glow"
          style={{ animationDelay: '2.5s' }}
        />

        {/* Mid-right electric cyan glow */}
        <div
          className="absolute top-2/3 -right-40 w-[550px] h-[550px] rounded-full opacity-25 dark:opacity-20 blur-[120px] bg-cyan-500/80 dark:bg-cyan-500/60 animate-pulse-glow"
          style={{ animationDelay: '4.5s' }}
        />

        {/* Bottom deep indigo aura */}
        <div
          className="absolute -bottom-36 left-1/3 w-[650px] h-[500px] rounded-full opacity-20 dark:opacity-15 blur-[130px] bg-indigo-600 animate-pulse-glow"
          style={{ animationDelay: '3.5s' }}
        />
      </div>

      <Navbar />
      <main className="flex-1 relative z-10" id="main-content">
        {children}
      </main>
      <Footer />
      <AIChatbot />
    </GsapTextProvider>
  );
}