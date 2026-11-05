"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession, SessionProvider } from "next-auth/react";
import { HiUserGroup } from "react-icons/hi";
import { FiAlertCircle, FiMessageSquare } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { playAdminAlertSound, playUrgentAdminRing } from "@/lib/chatSound";
import "./admin.css";

function AdminSidebar({ isFullscreen, onToggleFullscreen }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [signingOut, setSigningOut] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [chatUnread, setChatUnread] = useState(0);
  const [chatNeedsHuman, setChatNeedsHuman] = useState(0);
  const prevUnreadRef = useRef(0);
  const prevHumanRef = useRef(0);
  const initializedRef = useRef(false);

  const emailLower = String(session?.user?.email || "").toLowerCase().trim();
  const rawRole = String(session?.user?.role || "USER").toUpperCase().replace(/-/g, "_");
  const isAdmin = emailLower === "merxodevsolutions@gmail.com" || rawRole === "ADMIN";
  const isTeamMember = !isAdmin && rawRole === "TEAM_MEMBER";

  // Global background poller for Live Chat & AI instant notifications across all admin pages
  useEffect(() => {
    let active = true;
    const pollChatAlerts = async () => {
      try {
        const res = await fetch("/api/admin/chat", { cache: "no-store" });
        if (!res.ok || !active) return;
        const data = await res.json();
        const unread = Number(data?.stats?.totalUnread || 0);
        const human = Number(data?.stats?.needsHumanCount || 0);

        // Only play sound from layout if not already on /709832/live-chat (which handles its own sound)
        const onLiveChatPage = pathname.startsWith("/709832/live-chat");
        const soundPref =
          typeof window !== "undefined"
            ? localStorage.getItem("merxodev_admin_sound")
            : "on";
        const soundOn = soundPref !== "off";

        if (initializedRef.current && !onLiveChatPage) {
          if (human > prevHumanRef.current) {
            if (soundOn) playUrgentAdminRing();
            toast("Visitor requested a Live Team in Chat!", {
              icon: <FiAlertCircle color="#f59e0b" size={18} />,
              duration: 5000,
            });
          } else if (unread > prevUnreadRef.current) {
            if (soundOn) playAdminAlertSound();
            toast("New visitor message in MerxoDev AI Chat", {
              icon: <FiMessageSquare color="#38bdf8" size={18} />,
              duration: 4000,
            });
          }
        }

        prevUnreadRef.current = unread;
        prevHumanRef.current = human;
        initializedRef.current = true;
        setChatUnread(unread);
        setChatNeedsHuman(human);
      } catch {}
    };

    pollChatAlerts();
    const timer = setInterval(pollChatAlerts, 4000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [pathname]);

  const allNavItems = [
    {
      href: "/709832",
      label: "Dashboard",
      exact: true,
      teamAllowed: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      href: "/709832/live-chat",
      label: "Live Chat & AI",
      badge: chatUnread + chatNeedsHuman,
      urgent: chatNeedsHuman > 0,
      teamAllowed: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      href: "/709832/workspace",
      label: "CRM, Tasks & Logs",
      teamAllowed: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      href: "/709832/visitors",
      label: "Visitors & IP Track",
      teamAllowed: false,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      href: "/709832/projects",
      label: "Projects",
      teamAllowed: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      href: "/709832/images",
      label: "Images",
      teamAllowed: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      href: "/709832/content",
      label: "Content",
      teamAllowed: false,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      href: "/709832/banners",
      label: "Banners",
      teamAllowed: false,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="8" cy="12" r="1.5" />
          <polyline points="20 14 16 10 10 16" />
        </svg>
      ),
    },
    {
      href: "/709832/showcase",
      label: "Promo Grid",
      teamAllowed: false,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="11" height="8" rx="1.5" />
          <rect x="2" y="13" width="5" height="8" rx="1" />
          <rect x="8" y="13" width="5" height="8" rx="1" />
          <rect x="15" y="3" width="7" height="18" rx="1.5" />
        </svg>
      ),
    },
    {
      href: "/709832/reviews",
      label: "Reviews",
      teamAllowed: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      href: "/709832/team",
      label: "Team",
      teamAllowed: true,
      icon: <HiUserGroup size={20} />,
    },
    {
      href: "/709832/users",
      label: "Users",
      teamAllowed: false,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      href: "/709832/env-vault",
      label: "Env Vault",
      teamAllowed: false,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  const navItems = isTeamMember
    ? allNavItems.filter((item) => item.teamAllowed)
    : allNavItems;

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/709832" });
  };

  return (
    <aside
      className={
        "admin-sidebar" + (collapsed ? " admin-sidebar-collapsed" : "")
      }
    >
      <div className="admin-sidebar-brand">
        <div
          className="admin-sidebar-logo"
          style={{
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src="/favicon.png"
            alt="MerxoDev Favicon"
            style={{ width: 26, height: 26, objectFit: "contain" }}
          />
        </div>
        {!collapsed && (
          <div
            className="admin-sidebar-brand-text"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="/logo.png"
              alt="MerxoDev Solutions"
              style={{ height: 26, maxWidth: 130, objectFit: "contain" }}
            />
          </div>
        )}
        <button
          className="admin-sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {collapsed ? (
              <polyline points="9 18 15 12 9 6" />
            ) : (
              <polyline points="15 18 9 12 15 6" />
            )}
          </svg>
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        {!collapsed && <p className="admin-sidebar-section-label">MENU</p>}
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : ""}
            className={
              "admin-sidebar-item" +
              (isActive(item) ? " admin-sidebar-item-active" : "")
            }
            style={{ position: "relative" }}
          >
            <span className="admin-sidebar-item-icon">{item.icon}</span>
            {!collapsed && (
              <span className="admin-sidebar-item-label">{item.label}</span>
            )}
            {item.badge > 0 && (
              <span
                style={{
                  marginLeft: "auto",
                  minWidth: 18,
                  height: 18,
                  padding: "0 6px",
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: item.urgent ? "#f59e0b" : "#ef4444",
                  color: item.urgent ? "#090d16" : "#fff",
                  boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
                }}
              >
                {item.badge}
              </span>
            )}
            {!collapsed && isActive(item) && !item.badge && (
              <span className="admin-sidebar-active-dot"></span>
            )}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-bottom" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="admin-sidebar-signout"
          title={collapsed ? (isFullscreen ? "Exit Fullscreen (Esc)" : "Full Screen Mode") : ""}
          style={{
            color: isFullscreen ? "#38bdf8" : "#94a3b8",
            background: isFullscreen ? "rgba(56, 189, 248, 0.1)" : "rgba(255, 255, 255, 0.03)",
            border: isFullscreen
              ? "1px solid rgba(56, 189, 248, 0.25)"
              : "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          {isFullscreen ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          )}
          {!collapsed && (
            <span>{isFullscreen ? "Exit Fullscreen (Esc)" : "Full Screen"}</span>
          )}
        </button>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="admin-sidebar-signout"
          title={collapsed ? "Sign out" : ""}
        >
          {signingOut ? (
            <div className="admin-spinner-sm"></div>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          )}
          {!collapsed && (
            <span>{signingOut ? "Signing out..." : "Sign Out"}</span>
          )}
        </button>
      </div>
    </aside>
  );
}

function AdminLayoutShell({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hideTopPill, setHideTopPill] = useState(false);
  const mainRef = useRef(null);

  const isLoginRoot = pathname === "/709832";
  const emailLower = String(session?.user?.email || "").toLowerCase().trim();
  const rawRole = String(session?.user?.role || "USER").toUpperCase().replace(/-/g, "_");
  const isAdmin = emailLower === "merxodevsolutions@gmail.com" || rawRole === "ADMIN";
  const isTeamMember = !isAdmin && rawRole === "TEAM_MEMBER";

  // Sync browser Fullscreen API state & handle Esc key exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(Boolean(fsElement));
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        const fsElement =
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement;
        if (fsElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Hide Full Screen button when scrolling down, show again when back at the top
  useEffect(() => {
    setHideTopPill(false);

    const handleScroll = (e) => {
      const winTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const mainTop = mainRef.current ? mainRef.current.scrollTop : 0;
      const targetTop =
        e?.target && typeof e.target.scrollTop === "number"
          ? e.target.scrollTop
          : 0;

      const currentScroll = Math.max(winTop, mainTop, targetTop);
      setHideTopPill(currentScroll > 24);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [pathname]);

  const toggleFullscreen = async () => {
    try {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      if (!fsElement && !isFullscreen) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
        toast.success("Full Screen enabled — Press Esc to exit", {
          duration: 2200,
        });
      } else {
        if (fsElement) {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated" && !isLoginRoot) {
      router.replace("/709832");
      return;
    }

    if (status === "authenticated" && isTeamMember && !isLoginRoot) {
      const allowedTeamPrefixes = [
        "/709832/live-chat",
        "/709832/workspace",
        "/709832/projects",
        "/709832/images",
        "/709832/reviews",
        "/709832/team",
      ];
      const isAllowed = allowedTeamPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
      );
      if (!isAllowed) {
        toast.error("Only Administrators can access that section.");
        router.replace("/709832");
      }
    }
  }, [status, isLoginRoot, isTeamMember, pathname, router]);

  // If on the /709832 login page and not logged in, show full-screen login without sidebar
  if (status !== "authenticated" && isLoginRoot) {
    return (
      <>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              color: "#f8fafc",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              fontSize: "13.5px",
              fontWeight: "500",
              padding: "12px 18px",
              boxShadow:
                "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 15px rgba(99, 102, 241, 0.15)",
            },
          }}
        />
        {children}
      </>
    );
  }

  // If loading session on a sub-route, show loading state
  if (status === "loading" && !isLoginRoot) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080c18",
          color: "#fff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            className="admin-spinner"
            style={{ margin: "0 auto 16px" }}
          ></div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  // If unauthenticated on a subpage, don't render content while redirecting
  if (status === "unauthenticated" && !isLoginRoot) {
    return null;
  }

  return (
    <div className="admin-layout">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            color: "#f8fafc",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "14px",
            fontSize: "13.5px",
            fontWeight: "500",
            padding: "12px 18px",
            boxShadow:
              "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 15px rgba(99, 102, 241, 0.15)",
          },
        }}
      />
      <AdminSidebar
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
      <main ref={mainRef} className="admin-main" style={{ position: "relative" }}>
        {/* Top-Right Quick Fullscreen Toggle Pill (Auto-hides on scroll down, shows at top) */}
        <div
          style={{
            position: "fixed",
            top: 16,
            right: 22,
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: hideTopPill ? 0 : 1,
            transform: hideTopPill
              ? "translateY(-16px) scale(0.95)"
              : "translateY(0) scale(1)",
            pointerEvents: hideTopPill ? "none" : "auto",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          <button
            type="button"
            onClick={toggleFullscreen}
            title={
              isFullscreen
                ? "Press Esc or click to exit Full Screen"
                : "Enter Full Screen Mode"
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "7px 13px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              color: isFullscreen ? "#38bdf8" : "#cbd5e1",
              background: isFullscreen
                ? "rgba(15, 23, 42, 0.92)"
                : "rgba(15, 23, 42, 0.78)",
              border: isFullscreen
                ? "1px solid rgba(56, 189, 248, 0.4)"
                : "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
              transition: "all 0.2s ease",
            }}
          >
            {isFullscreen ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </svg>
                <span>Exit Full Screen</span>
                <kbd
                  style={{
                    fontSize: 10,
                    padding: "1px 5px",
                    borderRadius: 4,
                    background: "rgba(56, 189, 248, 0.15)",
                    color: "#7dd3fc",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                  }}
                >
                  Esc
                </kbd>
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
                <span>Full Screen</span>
              </>
            )}
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </SessionProvider>
  );
}
