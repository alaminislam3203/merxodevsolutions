'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useSession, signOut } from 'next-auth/react';
import '@/components/i18n';
import Image from 'next/image';
import { FaPhoneVolume } from 'react-icons/fa6';
import {
  FiUser,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiShield,
  FiFolder,
  FiStar,
  FiCopy,
  FiCheck,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './SearchBar';

function Logo({ className = "h-7 sm:h-8 w-auto", mobile = false }) {
  return (
    <div className="flex items-center select-none" aria-label="MerxoDev Solutions">
      <Image
        src="/mobile-logo.png"
        alt="MerxoDev Solutions"
        width={48}
        height={48}
        className={`${className} object-contain`}
        priority
        unoptimized
      />
    </div>
  );
}

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const pathname = usePathname();
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!session?.user?.email) return;
    const email = session.user.email;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setEmailCopied(true);
        toast.success(t('navProfile.copiedAlert', 'Email copied!'), { id: 'email-copy', duration: 2000 });
        setTimeout(() => setEmailCopied(false), 2500);
      }).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
  };

  const fallbackCopy = (text) => {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setEmailCopied(true);
      toast.success(t('navProfile.copiedAlert', 'Email copied!'), { id: 'email-copy', duration: 2000 });
      setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      toast.error(t('navProfile.copyFailed', 'Failed to copy'));
    }
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto scroll to top on any route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setUserMenuOpen(false);
  }, [pathname]);

  const scrollToTopSmooth = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // ── Dynamic nav links (translated) ──────────────────────────────────────────
  const navLinks = [
    // { label: t('home'), href: '/' },
    { label: t('services'), href: '/services' },
    { label: t('journey'), href: '/our-journey' },
    { label: t('about.nav', t('aboutNav', 'About')), href: '/about' },
    { label: t('team'), href: '/our-team' },
    { label: t('tools', 'Tools'), href: '/tools' },
    { label: t('contact.nav', t('contactNav', 'Contact')), href: '/contact' },
    { label: t('projects'), href: '/our-projects' },
  ];

  const bottomNavLinks = [
    {
      label: t('home'),
      href: '/',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
      ),
    },
    {
      label: t('projects'),
      href: '/our-projects',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    // {
    //   label: t('journey'),
    //   href: '/our-journey',
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="22"
    //       height="22"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="1.8"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <circle cx="12" cy="12" r="9" />
    //       <path d="M12 8v4l3 3" />
    //     </svg>
    //   ),
    // },
    {
      label: t('navProfile.account', 'Account'),
      href: '/account',
      icon: session?.user?.image ? (
        <img
          src={session.user.image}
          alt={session.user.name || 'Account'}
          className="w-5 h-5 rounded-full object-cover border border-violet-400/50 shadow-xs"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <nav
        className={`hidden md:block fixed top-0 inset-x-0 z-50 overflow-visible transition-all duration-300 ease-in-out ${scrolled
          ? 'bg-violet-700/95 dark:bg-[#060b19]/95 backdrop-blur-xl shadow-lg shadow-blue-950/20 border-b border-violet-600/50 dark:border-blue-900/40'
          : 'bg-violet-700 dark:bg-[#060b19]/85 backdrop-blur-md border-b border-violet-600/30 dark:border-blue-900/30'
          }`}
      >
        <div
          className={`relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out flex flex-col ${scrolled ? 'py-2 gap-0' : 'pt-2 pb-2.5 gap-2'
            }`}
        >
          {/* Centered Navlinks (Collapses/Hides on Scroll Down, Reveals on Scroll Top) */}
          <div
            className={`flex items-center justify-center gap-8 text-xs sm:text-[13px] font-bold font-exo-extralight uppercase tracking-wider text-white/90 dark:text-zinc-300 transition-all duration-300 ease-in-out overflow-hidden ${scrolled
              ? 'max-h-0 opacity-0 -translate-y-2 pointer-events-none mb-0'
              : 'max-h-12 opacity-100 translate-y-0 mb-0.5'
              }`}
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={scrollToTopSmooth}
                className="hover:text-amber-300 dark:hover:text-cyan-400 transition-colors py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" onClick={scrollToTopSmooth} className="shrink-0 flex items-center gap-2 group">
              {/* Icon */}
              <Image
                src="/favicon.png"
                alt="MerxoDev Icon"
                width={40}
                height={40}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                priority
                unoptimized
              />
              {/* Text Logo */}
              <Image
                src="/logo.png"
                alt="MerxoDev Solutions"
                width={120}
                height={20}
                className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                priority
                unoptimized
              />
            </Link>

            {/* Search Bar on Desktop (Wider / Expanded) */}
            <div className="flex-1 flex items-center justify-center max-w-3xl">
              <SearchBar />
            </div>

            {/* Unmasked: ThemeToggle + Account Menu + CTA */}
            <div className="flex items-center gap-2.5 shrink-0">
              <ThemeToggle iconOnly />

              {/* User menu (Matching organic-e-commerce logic with MerxoDev theme) */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="p-1.5 sm:p-2 rounded-xl text-white hover:text-cyan-300 hover:bg-white/10 dark:hover:bg-white/5 transition-all relative flex items-center justify-center cursor-pointer"
                  aria-label={t('navProfile.account', 'Account')}
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-7 h-7 rounded-full object-cover border border-white/60 shadow-xs"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span
                    style={{ display: session?.user?.image ? 'none' : 'flex' }}
                    className="items-center justify-center"
                  >
                    <FiUser size={20} strokeWidth={1.8} />
                  </span>
                  {session?.user && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-zinc-900 shadow-xs animate-pulse" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white/95 dark:bg-[#0c1328]/95 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl p-2 z-50 animate-fade-in font-exo-extralight text-zinc-800 dark:text-zinc-200 uppercase">
                      {session?.user ? (
                        <>
                          <div className="flex items-center gap-3 px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 mb-1">
                            {session.user.image ? (
                              <img
                                src={session.user.image}
                                alt={session.user.name || 'User'}
                                className="w-9 h-9 rounded-full object-cover border border-violet-300 dark:border-violet-700/60 shadow-xs shrink-0"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-xs shrink-0">
                                {session.user.name ? session.user.name.charAt(0).toUpperCase() : <FiUser size={15} />}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                {session.user.name || t('navProfile.valuedClient', 'Valued Client')}
                              </p>
                              {session.user.email && (
                                <button
                                  type="button"
                                  onClick={handleCopyEmail}
                                  className="mt-0.5 inline-flex items-center gap-1.5 max-w-full text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors group cursor-pointer text-left"
                                  title={t('navProfile.copyEmail', 'Click to copy email')}
                                >
                                  <span className="truncate max-w-[125px] font-mono select-all">
                                    {session.user.email}
                                  </span>
                                  {emailCopied ? (
                                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-500 font-bold shrink-0">
                                      <FiCheck size={11} />
                                      <span>{t('navProfile.copied', 'Copied')}</span>
                                    </span>
                                  ) : (
                                    <FiCopy size={11} className="text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-cyan-400 shrink-0" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          <Link
                            href="/account"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            <FiUser size={14} className="text-violet-500" />
                            <span>{t('navProfile.myProfile', 'My Profile')}</span>
                          </Link>

                          <Link
                            href="/account?tab=inquiries"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            <FiFolder size={14} className="text-cyan-500" />
                            <span>{t('navProfile.inquiries', 'Project Inquiries')}</span>
                          </Link>

                          <Link
                            href="/account?tab=reviews"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            <FiStar size={14} className="text-amber-400" />
                            <span>{t('navProfile.reviews', 'My Reviews')}</span>
                          </Link>

                          {session.user.role === 'ADMIN' && (
                            <Link
                              href="/709832"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-violet-600 dark:text-violet-300 hover:bg-violet-100/70 dark:hover:bg-violet-900/40 transition-colors"
                            >
                              <FiShield size={14} className="text-violet-500" />
                              <span>{t('navProfile.adminPanel', 'Admin Panel')}</span>
                            </Link>
                          )}

                          {/* Language Switcher under Admin Panel */}
                          <div className="my-1.5 px-0.5">
                            <LanguageSwitcher variant="menu" />
                          </div>

                          <div className="border-t border-zinc-100 dark:border-zinc-800/80 my-1 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setUserMenuOpen(false);
                                signOut({ callbackUrl: '/' });
                              }}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 w-full transition-colors cursor-pointer"
                            >
                              <FiLogOut size={14} />
                              <span>{t('navProfile.signOut', 'Sign Out')}</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/account/login"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-zinc-900 dark:text-white hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            <FiLogIn size={15} className="text-violet-500" />
                            <span>{t('navProfile.login', 'Log In')}</span>
                          </Link>
                          <Link
                            href="/account/register"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white transition-colors"
                          >
                            <FiUserPlus size={15} className="text-cyan-500" />
                            <span>{t('navProfile.register', 'Create Account')}</span>
                          </Link>
                          <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 px-0.5">
                            <LanguageSwitcher variant="menu" />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              <Link
                href="/contact"
                onClick={scrollToTopSmooth}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-900 text-xs sm:text-sm font-bold hover:opacity-95 transition-all font-exo-extralight uppercase shadow-md shadow-amber-500/20 whitespace-nowrap"
              >
                <span className="inline-block animate-phone-ring">{t('getInTouch')}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Top Bar ─── */}
      <nav
        className={`md:hidden fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out ${scrolled
          ? 'bg-violet-700/95 dark:bg-[#060b19]/95 backdrop-blur-xl shadow-md border-b border-violet-600/50 dark:border-blue-900/40'
          : 'bg-violet-700 dark:bg-[#060b19]/85 backdrop-blur-md border-b border-violet-600/30 dark:border-blue-900/30'
          }`}
      >
        <div className="flex items-center justify-between px-3 py-2.5 gap-2">
          <Link href="/" className="shrink-0">
            <Logo mobile className="h-10 sm:h-11 w-auto" />
          </Link>

          {/* Search Bar on Mobile between Logo and Hire Us */}
          <SearchBar mobile />

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:+8801313334279"
              aria-label={t('callUs', 'Call MerxoDev Solutions')}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 active:scale-95 transition-all duration-200 animate-call-glow overflow-hidden select-none"
            >
              <span className="animate-phone-ring text-white">
                <FaPhoneVolume size={16} />
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-[#060b19]/95 backdrop-blur-xl border-t border-zinc-100 dark:border-blue-900/40">
        <div className="flex items-end justify-around px-2 h-16">
          {/* Left 2 icons */}
          {bottomNavLinks.slice(0, 2).map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 text-[10px] font-medium font-exo-extralight transition-colors ${isActive
                  ? 'text-violet-600 dark:text-cyan-400'
                  : 'text-zinc-400 dark:text-zinc-400 hover:text-violet-500'
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Center CTA — floating */}
          <div className="flex flex-col items-center -mt-6">
            <Link
              href="/contact"
              className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-blue-950 hover:opacity-90 transition-opacity"
              aria-label={t('getInTouch', 'Get In Touch')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
            <span className="text-[10px] font-medium text-violet-600 dark:text-cyan-400 mt-0.5 font-exo-extralight">
              {t('contact.nav', t('contactNav', 'Contact'))}
            </span>
          </div>

          {/* Right icon */}
          {bottomNavLinks.slice(2, 4).map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 text-[10px] font-medium font-exo-extralight transition-colors ${isActive
                  ? 'text-violet-600 dark:text-cyan-400'
                  : 'text-zinc-400 dark:text-zinc-400 hover:text-violet-500'
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 text-[10px] font-medium text-zinc-400 dark:text-zinc-400 hover:text-violet-500 transition-colors font-exo-extralight"
            aria-label={t('openMenu', 'Open menu')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span>{t('menu')}</span>
          </button>
        </div>
      </nav>

      {/* ─── Mobile Sidebar Backdrop ─── */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#060b19]/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Mobile Sidebar Panel ─── */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[100] bg-gradient-to-b from-violet-50 via-white to-violet-100/50 dark:from-[#060b19] dark:via-[#091124] dark:to-[#040812] text-zinc-900 dark:text-white shadow-2xl border-r border-violet-200/80 dark:border-blue-900/40 transform transition-transform duration-300 ease-out flex flex-col justify-between overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-violet-200/70 dark:border-blue-900/40 bg-violet-700 dark:bg-[#091124]">
            {session?.user ? (
              <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                <Link
                  href="/account"
                  onClick={() => setSidebarOpen(false)}
                  className="relative shrink-0 group"
                  aria-label={t('navProfile.myProfile', 'View Profile')}
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-11 h-11 rounded-full object-cover border-2 border-violet-500/70 dark:border-cyan-400/70 shadow-md group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    style={{ display: session.user.image ? 'none' : 'flex' }}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 items-center justify-center text-white font-bold text-base shadow-md border-2 border-violet-400/60 group-hover:scale-105 transition-transform"
                  >
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : <FiUser size={18} />}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-[#091124] shadow-xs" />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href="/account"
                    onClick={() => setSidebarOpen(false)}
                    className="block group"
                  >
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors">
                      {session.user.name || t('navProfile.valuedClient', 'Valued Client')}
                    </h4>
                  </Link>

                  {session.user.email && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="mt-0.5 inline-flex items-center gap-1.5 max-w-full text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-cyan-300 transition-colors group cursor-pointer text-left"
                      title={t('navProfile.copyEmail', 'Click to copy email')}
                    >
                      <span className="truncate max-w-[130px] font-mono select-all">
                        {session.user.email}
                      </span>
                      {emailCopied ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-500 font-bold shrink-0">
                          <FiCheck size={11} />
                          <span>{t('navProfile.copied', 'Copied')}</span>
                        </span>
                      ) : (
                        <FiCopy
                          size={11}
                          className="shrink-0 text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-cyan-400 transition-colors"
                        />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Logo mobile className="h-10 w-auto" />
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-xl bg-violet-200/70 dark:bg-white/10 text-zinc-700 dark:text-white/80 hover:text-zinc-950 dark:hover:text-white hover:bg-violet-300/70 dark:hover:bg-white/20 transition-all border border-violet-300/60 dark:border-white/10 shrink-0"
              aria-label={t('closeMenu', 'Close menu')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col px-4 py-6 gap-1.5 uppercase">
            <div className="flex items-center gap-2 px-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-amber-400 animate-pulse" />
              <p className="text-[10px] font-bold tracking-[0.2em] text-violet-700 dark:text-amber-400 uppercase font-exo-extralight">
                {t('navigation')}
              </p>
            </div>
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold font-exo-extralight tracking-wider transition-all ${isActive
                    ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/25 dark:shadow-violet-900/50 border border-violet-400/30'
                    : 'text-zinc-900 dark:text-white/80 hover:text-violet-700 dark:hover:text-white hover:bg-violet-100/80 dark:hover:bg-white/10'
                    }`}
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-amber-300 shadow-sm shadow-amber-300" />
                    )}
                    {link.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${isActive ? 'text-amber-300 translate-x-1' : 'text-zinc-400 dark:text-white/40'}`}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              );
            })}

            {/* Account portal in mobile drawer */}
            <div className="mt-4 pt-4 border-t border-violet-200/70 dark:border-violet-800/40 px-2 flex flex-col gap-2">
              <Link
                href="/account"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-violet-100/70 dark:bg-zinc-800/80 text-violet-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider font-exo-extralight transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FiUser size={15} />
                  <span>{session?.user ? session.user.name?.split(' ')[0] || t('navProfile.myAccount', 'My Account') : t('navProfile.account', 'Account')}</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-violet-200 dark:bg-zinc-700 text-violet-900 dark:text-zinc-200 font-extrabold">
                  {session?.user ? t('navProfile.portal', 'Portal') : t('navProfile.signIn', 'Sign In')}
                </span>
              </Link>
            </div>

            {/* Language Switcher container in mobile drawer */}
            <div className="mt-2 px-2">
              <LanguageSwitcher variant="menu" />
            </div>

            {/* Theme Toggle container */}
            <div className="mt-2 pt-2 px-2 flex items-center justify-between">
              <span className="text-xs font-bold font-exo-extralight text-zinc-900 dark:text-white/70">
                {t('darkMode', 'Dark Mode')}
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Sidebar CTA Footer */}
        <div className="p-6 border-t border-violet-200/70 dark:border-violet-800/40 bg-violet-100/50 dark:bg-violet-950/60 mt-auto">
          <Link
            href="/contact"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center gap-2 w-full text-center px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 text-sm font-bold tracking-wider hover:opacity-95 transition-all font-exo-extralight uppercase shadow-lg shadow-amber-500/25"
          >
            <span className="inline-block animate-phone-ring">{t('getInTouch')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Mobile Legal Quick Links */}
          <div className="flex items-center justify-center gap-3 pt-3 text-[11px] text-zinc-500 dark:text-zinc-400 font-exo-extralight">
            <Link
              href="/privacy"
              onClick={() => setSidebarOpen(false)}
              className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {t('privacyPolicy', 'Privacy Policy')}
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              onClick={() => setSidebarOpen(false)}
              className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {t('termsOfService', 'Terms of Service')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
