"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import {
  FiSearch,
  FiGrid,
  FiHelpCircle,
  FiBell,
  FiSettings,
  FiPlus,
  FiSun,
  FiMoon,
  FiMaximize,
  FiMinimize,
  FiExternalLink,
  FiCheck,
  FiX,
  FiActivity,
  FiMessageSquare,
  FiLayers,
  FiUsers,
  FiShield,
  FiImage,
  FiStar,
  FiBriefcase,
  FiUser,
  FiLogOut,
  FiCheckCircle,
  FiCpu,
  FiChevronRight,
  FiAlertCircle,
  FiMenu,
} from "react-icons/fi";

// Route title mapping for dynamic breadcrumbs
const routeMap = {
  "/709832": { title: "Dashboard", category: "Overview" },
  "/709832/projects": { title: "Projects", category: "Portfolio" },
  "/709832/images": { title: "Media Library", category: "Assets" },
  "/709832/workspace": { title: "CRM & Workspace", category: "Management" },
  "/709832/live-chat": { title: "Live Chat & AI", category: "Support" },
  "/709832/visitors": { title: "Visitors & Telemetry", category: "Analytics" },
  "/709832/users": { title: "Users & Security", category: "Access Control" },
  "/709832/team": { title: "Team Members", category: "Staff" },
  "/709832/reviews": { title: "Client Reviews", category: "Social Proof" },
  "/709832/env-vault": { title: "Env Vault", category: "Security" },
  "/709832/content": { title: "Content Editor", category: "CMS" },
  "/709832/banners": { title: "Banners", category: "Marketing" },
  "/709832/promo-grid": { title: "Promo Grid", category: "Showcase" },
};

export default function AdminTopNav({
  isFullscreen = false,
  onToggleFullscreen,
  chatUnread = 0,
  chatNeedsHuman = 0,
  onOpenMobileMenu,
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  // State Management
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null); // 'grid' | 'notifications' | 'settings' | 'plus' | 'profile'
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState("all"); // 'all' | 'chats' | 'system'
  const [dismissedNotifs, setDismissedNotifs] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const navRef = useRef(null);
  const searchInputRef = useRef(null);
  const gKeyTimerRef = useRef(null);
  const gKeyPressedRef = useRef(false);

  // User details
  const userName = session?.user?.name || "Administrator";
  const userEmail = session?.user?.email || "merxodevsolutions@gmail.com";
  const rawRole = String(session?.user?.role || "ADMIN")
    .toUpperCase()
    .replace(/-/g, "_");
  const isSuperAdmin =
    userEmail.toLowerCase() === "merxodevsolutions@gmail.com" ||
    rawRole === "ADMIN";
  const userInitial = (
    userName.charAt(0) ||
    userEmail.charAt(0) ||
    "A"
  ).toUpperCase();
  const userPhoto =
    session?.user?.image ||
    (isSuperAdmin ||
    userEmail.includes("merxodev") ||
    userName.toLowerCase().includes("al-amin")
      ? "/alamin-profile.jpeg"
      : "/alamin-profile.jpeg");

  // Current page for breadcrumbs
  const currentRouteInfo = routeMap[pathname] || {
    title: pathname.replace("/709832/", "").replace(/-/g, " ") || "Console",
    category: "Admin",
  };

  // Load sound alert preference from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("merxodev_admin_sound");
      if (saved !== null) setSoundEnabled(saved !== "off");
    } catch {}
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      localStorage.setItem("merxodev_admin_sound", next ? "on" : "off");
    } catch {}
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global Keyboard Shortcuts (Ctrl+K, ?, and Two-Key G+Key Navigation)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isInput =
        activeTag === "input" ||
        activeTag === "textarea" ||
        document.activeElement?.isContentEditable;

      // Ctrl+K / Cmd+K Search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        return;
      }

      // Escape closes modals/dropdowns
      if (e.key === "Escape") {
        setSearchOpen(false);
        setShortcutsModalOpen(false);
        setActiveDropdown(null);
        return;
      }

      // If user is currently typing in an input, don't intercept keys
      if (isInput) return;

      // ? opens Shortcuts Cheat Sheet
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
        return;
      }

      // T toggles Theme
      if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // Two-key G + [Key] Linear-style navigation
      if (e.key.toLowerCase() === "g") {
        gKeyPressedRef.current = true;
        clearTimeout(gKeyTimerRef.current);
        gKeyTimerRef.current = setTimeout(() => {
          gKeyPressedRef.current = false;
        }, 1200);
        return;
      }

      if (gKeyPressedRef.current) {
        gKeyPressedRef.current = false;
        clearTimeout(gKeyTimerRef.current);
        const k = e.key.toLowerCase();
        if (k === "d") router.push("/709832");
        else if (k === "p") router.push("/709832/projects");
        else if (k === "c") router.push("/709832/live-chat");
        else if (k === "w") router.push("/709832/workspace");
        else if (k === "v") router.push("/709832/visitors");
        else if (k === "u") router.push("/709832/users");
        else if (k === "m") router.push("/709832/images");
        else if (k === "r") router.push("/709832/reviews");
        else if (k === "e") router.push("/709832/env-vault");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(gKeyTimerRef.current);
    };
  }, [router, toggleTheme]);

  // Focus search input when command modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/709832" });
  };

  // Search Navigation Options
  const searchItems = [
    {
      label: "Dashboard",
      href: "/709832",
      category: "Core",
      icon: <FiActivity />,
    },
    {
      label: "Live Chat & AI Center",
      href: "/709832/live-chat",
      category: "Real-time",
      icon: <FiMessageSquare />,
    },
    {
      label: "Projects & Portfolio",
      href: "/709832/projects",
      category: "Content",
      icon: <FiLayers />,
    },
    {
      label: "Image & Media Library",
      href: "/709832/images",
      category: "Assets",
      icon: <FiImage />,
    },
    {
      label: "User Management",
      href: "/709832/users",
      category: "Security",
      icon: <FiUsers />,
    },
    {
      label: "Client Reviews",
      href: "/709832/reviews",
      category: "Social",
      icon: <FiStar />,
    },
    {
      label: "Team Members",
      href: "/709832/team",
      category: "Staff",
      icon: <FiUsers />,
    },
    {
      label: "CRM & Workspace",
      href: "/709832/workspace",
      category: "Business",
      icon: <FiBriefcase />,
    },
    {
      label: "Visitors & IP Track",
      href: "/709832/visitors",
      category: "Analytics",
      icon: <FiActivity />,
    },
    {
      label: "Environment Vault (.env)",
      href: "/709832/env-vault",
      category: "Security",
      icon: <FiShield />,
    },
    {
      label: "Content & CMS Blocks",
      href: "/709832/content",
      category: "Content",
      icon: <FiLayers />,
    },
    {
      label: "Promo Grid (Showcase)",
      href: "/709832/promo-grid",
      category: "Marketing",
      icon: <FiGrid />,
    },
    {
      label: "Banners Management",
      href: "/709832/banners",
      category: "Marketing",
      icon: <FiLayers />,
    },
  ];

  const filteredSearchItems = searchQuery.trim()
    ? searchItems.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : searchItems;

  const rawAlerts = chatUnread + chatNeedsHuman;
  const totalAlerts = dismissedNotifs ? 0 : rawAlerts;

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          background: isDark
            ? "rgba(10, 15, 29, 0.88)"
            : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid #e2e8f0",
          boxShadow: isDark
            ? "0 4px 20px -2px rgba(0, 0, 0, 0.4)"
            : "0 2px 10px -2px rgba(0, 0, 0, 0.03)",
          transition: "all 0.2s ease",
        }}
      >
        {/* Left Side: Breadcrumb & Search Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Breadcrumb Navigation Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12.5,
              fontWeight: 500,
              paddingRight: 10,
              borderRight: isDark
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid #e2e8f0",
              whiteSpace: "nowrap",
            }}
          >
            <Link
              href="/709832"
              style={{
                color: isDark ? "#94a3b8" : "#64748b",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = isDark ? "#f8fafc" : "#0f172a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b")
              }
            >
              Admin
            </Link>
            <FiChevronRight
              size={13}
              style={{ color: isDark ? "#64748b" : "#94a3b8", opacity: 0.6 }}
            />
            <span
              style={{ color: isDark ? "#f8fafc" : "#0f172a", fontWeight: 700 }}
            >
              {currentRouteInfo.title}
            </span>
          </div>

          {/* Search Button matching reference image */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 36,
              padding: "0 14px",
              borderRadius: 8,
              background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid #e2e8f0",
              color: isDark ? "#94a3b8" : "#64748b",
              fontSize: 13,
              cursor: "pointer",
              width: "clamp(220px, 28vw, 380px)",
              transition: "all 0.15s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.color = isDark ? "#f8fafc" : "#0f172a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "#e2e8f0";
              e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b";
            }}
          >
            <FiSearch
              size={15}
              style={{ color: isDark ? "#94a3b8" : "#64748b" }}
            />
            <span style={{ flex: 1, fontWeight: 400 }}>Search</span>
            <kbd
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: 4,
                background: isDark ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0",
                color: isDark ? "#cbd5e1" : "#475569",
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid #cbd5e1",
              }}
            >
              ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right Side: Theme Toggle, Apps Grid, Shortcuts, Notifications, Settings, Plus & Admin Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Direct Theme Toggle Switch in TopNav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: isDark ? "#cbd5e1" : "#475569",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {isDark ? (
                <>
                  <FiMoon size={13} style={{ color: "#a5b4fc" }} />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <FiSun size={13} style={{ color: "#f59e0b" }} />
                  <span>Light</span>
                </>
              )}
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              title={
                isDark ? "Switch to Light Mode (T)" : "Switch to Dark Mode (T)"
              }
              aria-label="Toggle Theme"
              style={{
                width: 38,
                height: 22,
                borderRadius: 999,
                background: isDark ? "#6366f1" : "#cbd5e1",
                border: "none",
                cursor: "pointer",
                position: "relative",
                padding: 2,
                transition: "background 0.2s ease",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                  transform: isDark ? "translateX(16px)" : "translateX(0)",
                  transition:
                    "transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isDark ? (
                  <FiMoon size={10} style={{ color: "#6366f1" }} />
                ) : (
                  <FiSun size={10} style={{ color: "#f59e0b" }} />
                )}
              </div>
            </button>
          </div>

          <div
            style={{
              width: 1,
              height: 18,
              background: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0",
            }}
          />

          {/* Quick Apps Grid Icon */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => toggleDropdown("grid")}
              title="Quick App Shortcuts"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background:
                  activeDropdown === "grid"
                    ? isDark
                      ? "rgba(255,255,255,0.1)"
                      : "#e2e8f0"
                    : "transparent",
                border: "none",
                color:
                  activeDropdown === "grid"
                    ? isDark
                      ? "#fff"
                      : "#0f172a"
                    : isDark
                      ? "#94a3b8"
                      : "#64748b",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
              }}
            >
              <FiGrid size={16} />
            </button>

            {activeDropdown === "grid" && (
              <div
                style={{
                  position: "absolute",
                  top: 38,
                  right: 0,
                  width: 250,
                  background: isDark ? "#0d1322" : "#ffffff",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: isDark
                    ? "0 20px 40px -10px rgba(0,0,0,0.8)"
                    : "0 15px 35px -5px rgba(0,0,0,0.12)",
                  padding: 10,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  zIndex: 99,
                }}
              >
                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 8px",
                    borderRadius: 8,
                    background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 11.5,
                    fontWeight: 600,
                    gap: 6,
                    textAlign: "center",
                  }}
                >
                  <FiExternalLink size={15} style={{ color: "#6366f1" }} />
                  Live Website
                </Link>
                <Link
                  href="/709832/live-chat"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 8px",
                    borderRadius: 8,
                    background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 11.5,
                    fontWeight: 600,
                    gap: 6,
                    textAlign: "center",
                  }}
                >
                  <FiMessageSquare size={15} style={{ color: "#38bdf8" }} />
                  AI Live Chat
                </Link>
                <Link
                  href="/709832/workspace"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 8px",
                    borderRadius: 8,
                    background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 11.5,
                    fontWeight: 600,
                    gap: 6,
                    textAlign: "center",
                  }}
                >
                  <FiBriefcase size={15} style={{ color: "#10b981" }} />
                  CRM Tracker
                </Link>
                <Link
                  href="/709832/env-vault"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 8px",
                    borderRadius: 8,
                    background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 11.5,
                    fontWeight: 600,
                    gap: 6,
                    textAlign: "center",
                  }}
                >
                  <FiShield size={15} style={{ color: "#f59e0b" }} />
                  Env Vault
                </Link>
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts Help Icon */}
          <button
            type="button"
            onClick={() => setShortcutsModalOpen(true)}
            title="Keyboard Shortcuts (?)"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "transparent",
              border: "none",
              color: isDark ? "#94a3b8" : "#64748b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark
                ? "rgba(255,255,255,0.08)"
                : "#e2e8f0";
              e.currentTarget.style.color = isDark ? "#fff" : "#0f172a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b";
            }}
          >
            <FiHelpCircle size={16} />
          </button>

          {/* Interactive Notifications Center Bell */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => {
                toggleDropdown("notifications");
                setDismissedNotifs(false);
              }}
              title="Notifications"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background:
                  activeDropdown === "notifications"
                    ? isDark
                      ? "rgba(255,255,255,0.1)"
                      : "#e2e8f0"
                    : "transparent",
                border: "none",
                color:
                  activeDropdown === "notifications"
                    ? isDark
                      ? "#fff"
                      : "#0f172a"
                    : isDark
                      ? "#94a3b8"
                      : "#64748b",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
                position: "relative",
              }}
            >
              <FiBell size={16} />
              {/* Blue / Red indicator dot */}
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: totalAlerts > 0 ? "#ef4444" : "#3b82f6",
                  border: isDark
                    ? "1.5px solid #0a0f1d"
                    : "1.5px solid #ffffff",
                }}
              />
            </button>

            {activeDropdown === "notifications" && (
              <div
                style={{
                  position: "absolute",
                  top: 38,
                  right: 0,
                  width: 320,
                  background: isDark ? "#0d1322" : "#ffffff",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: isDark
                    ? "0 20px 40px -10px rgba(0,0,0,0.8)"
                    : "0 15px 35px -5px rgba(0,0,0,0.12)",
                  padding: "12px 14px",
                  zIndex: 99,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: isDark ? "#f8fafc" : "#0f172a",
                      }}
                    >
                      Notifications
                    </span>
                    {totalAlerts > 0 && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "1px 6px",
                          borderRadius: 999,
                          background: "#ef4444",
                          color: "#fff",
                        }}
                      >
                        {totalAlerts} new
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setDismissedNotifs(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6366f1",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Mark all read
                  </button>
                </div>

                {/* Filter tabs */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    marginBottom: 10,
                    padding: 3,
                    borderRadius: 6,
                    background: isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9",
                  }}
                >
                  {["all", "chats", "system"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setNotifFilter(f)}
                      style={{
                        flex: 1,
                        background:
                          notifFilter === f
                            ? isDark
                              ? "rgba(99, 102, 241, 0.3)"
                              : "#ffffff"
                            : "transparent",
                        border: "none",
                        color:
                          notifFilter === f
                            ? isDark
                              ? "#f8fafc"
                              : "#0f172a"
                            : isDark
                              ? "#94a3b8"
                              : "#64748b",
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 0",
                        borderRadius: 4,
                        cursor: "pointer",
                        textTransform: "capitalize",
                        boxShadow:
                          notifFilter === f && !isDark
                            ? "0 1px 3px rgba(0,0,0,0.06)"
                            : "none",
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Notification Items */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    maxHeight: 260,
                    overflowY: "auto",
                  }}
                >
                  {(notifFilter === "all" || notifFilter === "chats") && (
                    <Link
                      href="/709832/live-chat"
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 10px",
                        borderRadius: 8,
                        background: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "#f8fafc",
                        textDecoration: "none",
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: "rgba(59, 130, 246, 0.15)",
                          color: "#3b82f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <FiMessageSquare size={14} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Visitor Live Chat</span>
                          <span
                            style={{
                              fontSize: 10,
                              color: isDark ? "#64748b" : "#94a3b8",
                            }}
                          >
                            Real-time
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: isDark ? "#94a3b8" : "#64748b",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {chatNeedsHuman > 0
                            ? `${chatNeedsHuman} waiting for Live Team response`
                            : "AI Chat Agent active and assisting visitors"}
                        </div>
                      </div>
                    </Link>
                  )}

                  {(notifFilter === "all" || notifFilter === "system") && (
                    <Link
                      href="/709832/workspace"
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 10px",
                        borderRadius: 8,
                        background: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "#f8fafc",
                        textDecoration: "none",
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: "rgba(16, 185, 129, 0.15)",
                          color: "#10b981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <FiActivity size={14} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Agency Activity</span>
                          <span
                            style={{
                              fontSize: 10,
                              color: isDark ? "#64748b" : "#94a3b8",
                            }}
                          >
                            Audit
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: isDark ? "#94a3b8" : "#64748b",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          CRM milestones & staff activity logged
                        </div>
                      </div>
                    </Link>
                  )}

                  {(notifFilter === "all" || notifFilter === "system") && (
                    <Link
                      href="/709832/reviews"
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 10px",
                        borderRadius: 8,
                        background: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "#f8fafc",
                        textDecoration: "none",
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: "rgba(245, 158, 11, 0.15)",
                          color: "#f59e0b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <FiStar size={14} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Client Reviews</span>
                          <span
                            style={{
                              fontSize: 10,
                              color: isDark ? "#64748b" : "#94a3b8",
                            }}
                          >
                            Social
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: isDark ? "#94a3b8" : "#64748b",
                          }}
                        >
                          Feature or moderate testimonials
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings Icon with System Health Status */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => toggleDropdown("settings")}
              title="Admin Preferences & System Health"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background:
                  activeDropdown === "settings"
                    ? isDark
                      ? "rgba(255,255,255,0.1)"
                      : "#e2e8f0"
                    : "transparent",
                border: "none",
                color:
                  activeDropdown === "settings"
                    ? isDark
                      ? "#fff"
                      : "#0f172a"
                    : isDark
                      ? "#94a3b8"
                      : "#64748b",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
              }}
            >
              <FiSettings size={16} />
            </button>

            {activeDropdown === "settings" && (
              <div
                style={{
                  position: "absolute",
                  top: 38,
                  right: 0,
                  width: 240,
                  background: isDark ? "#0d1322" : "#ffffff",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: isDark
                    ? "0 20px 40px -10px rgba(0,0,0,0.8)"
                    : "0 15px 35px -5px rgba(0,0,0,0.12)",
                  padding: 10,
                  zIndex: 99,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {/* System Health Section */}
                <div
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: isDark ? "#94a3b8" : "#64748b",
                    padding: "4px 8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  System Health
                </div>

                <div
                  style={{
                    background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 11.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: isDark ? "#cbd5e1" : "#334155",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#10b981",
                          boxShadow: "0 0 6px #10b981",
                        }}
                      />
                      Database (MongoDB)
                    </span>
                    <span style={{ color: "#10b981", fontWeight: 600 }}>
                      14ms
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: isDark ? "#cbd5e1" : "#334155",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#10b981",
                        }}
                      />
                      Cloudinary CDN
                    </span>
                    <span style={{ color: "#10b981", fontWeight: 600 }}>
                      Active
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: isDark ? "#cbd5e1" : "#334155",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#10b981",
                        }}
                      />
                      AI Live Agent
                    </span>
                    <span style={{ color: "#10b981", fontWeight: 600 }}>
                      Online
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    height: 1,
                    background: isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0",
                    margin: "4px 0",
                  }}
                />

                {/* Preferences */}
                <div
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: isDark ? "#94a3b8" : "#64748b",
                    padding: "4px 8px 2px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Controls
                </div>

                {onToggleFullscreen && (
                  <button
                    type="button"
                    onClick={() => {
                      onToggleFullscreen();
                      setActiveDropdown(null);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: 6,
                      background: "none",
                      border: "none",
                      color: isDark ? "#cbd5e1" : "#334155",
                      fontSize: 12.5,
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.05)"
                        : "#f1f5f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {isFullscreen ? (
                        <FiMinimize size={15} style={{ color: "#38bdf8" }} />
                      ) : (
                        <FiMaximize size={15} />
                      )}
                      <span>
                        {isFullscreen ? "Exit Fullscreen" : "Full Screen"}
                      </span>
                    </span>
                    <kbd
                      style={{
                        fontSize: 10,
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                      }}
                    >
                      Esc
                    </kbd>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleToggleSound}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 6,
                    background: "none",
                    border: "none",
                    color: isDark ? "#cbd5e1" : "#334155",
                    fontSize: 12.5,
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = isDark
                      ? "rgba(255,255,255,0.05)"
                      : "#f1f5f9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <FiBell
                      size={15}
                      style={{ color: soundEnabled ? "#10b981" : "#94a3b8" }}
                    />
                    <span>Sound Alerts</span>
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: soundEnabled
                        ? "#10b981"
                        : isDark
                          ? "#94a3b8"
                          : "#64748b",
                    }}
                  >
                    {soundEnabled ? "On" : "Muted"}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Circular Purple Plus Button */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => toggleDropdown("plus")}
              title="Quick Add..."
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(99, 102, 241, 0.45)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <FiPlus size={16} strokeWidth={2.6} />
            </button>

            {activeDropdown === "plus" && (
              <div
                style={{
                  position: "absolute",
                  top: 38,
                  right: 0,
                  width: 200,
                  background: isDark ? "#0d1322" : "#ffffff",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: isDark
                    ? "0 20px 40px -10px rgba(0,0,0,0.8)"
                    : "0 15px 35px -5px rgba(0,0,0,0.12)",
                  padding: 8,
                  zIndex: 99,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isDark ? "#94a3b8" : "#64748b",
                    padding: "4px 8px",
                    textTransform: "uppercase",
                  }}
                >
                  Quick Action
                </div>
                <Link
                  href="/709832/projects"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 10px",
                    borderRadius: 6,
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 12.5,
                    fontWeight: 500,
                  }}
                >
                  <FiLayers size={14} style={{ color: "#6366f1" }} />
                  Add New Project
                </Link>
                <Link
                  href="/709832/users"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 10px",
                    borderRadius: 6,
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 12.5,
                    fontWeight: 500,
                  }}
                >
                  <FiUsers size={14} style={{ color: "#10b981" }} />
                  Create User
                </Link>
                <Link
                  href="/709832/workspace"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 10px",
                    borderRadius: 6,
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 12.5,
                    fontWeight: 500,
                  }}
                >
                  <FiActivity size={14} style={{ color: "#f59e0b" }} />
                  New Task / Lead
                </Link>
                <Link
                  href="/709832/env-vault"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 10px",
                    borderRadius: 6,
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 12.5,
                    fontWeight: 500,
                  }}
                >
                  <FiShield size={14} style={{ color: "#06b6d4" }} />
                  Backup .env File
                </Link>
                <Link
                  href="/709832/images"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 10px",
                    borderRadius: 6,
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 12.5,
                    fontWeight: 500,
                  }}
                >
                  <FiImage size={14} style={{ color: "#ec4899" }} />
                  Upload Images
                </Link>
              </div>
            )}
          </div>

          <div
            style={{
              width: 1,
              height: 18,
              background: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0",
            }}
          />

          {/* Admin Avatar & Profile Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => toggleDropdown("profile")}
              title={`Logged in as ${userName}`}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                border: isDark
                  ? "2px solid rgba(255, 255, 255, 0.15)"
                  : "2px solid #e0e7ff",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                position: "relative",
                padding: 0,
                boxShadow: "0 2px 8px rgba(99, 102, 241, 0.25)",
              }}
            >
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt={userName}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                userInitial
              )}
              {/* Online Green Status Dot */}
              <span
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10b981",
                  border: isDark
                    ? "1.5px solid #0a0f1d"
                    : "1.5px solid #ffffff",
                }}
              />
            </button>

            {activeDropdown === "profile" && (
              <div
                style={{
                  position: "absolute",
                  top: 38,
                  right: 0,
                  width: 250,
                  background: isDark ? "#0d1322" : "#ffffff",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: isDark
                    ? "0 20px 40px -10px rgba(0,0,0,0.8)"
                    : "0 15px 35px -5px rgba(0,0,0,0.12)",
                  padding: "12px",
                  zIndex: 99,
                }}
              >
                {/* User Info Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingBottom: 10,
                    borderBottom: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: isDark
                        ? "2px solid rgba(99, 102, 241, 0.4)"
                        : "2px solid #e0e7ff",
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {userPhoto ? (
                      <img
                        src={userPhoto}
                        alt={userName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      userInitial
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: isDark ? "#f8fafc" : "#0f172a",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {userName}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: isDark ? "#94a3b8" : "#64748b",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {userEmail}
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: 999,
                          background: isSuperAdmin
                            ? "rgba(99, 102, 241, 0.18)"
                            : "rgba(16, 185, 129, 0.18)",
                          color: isSuperAdmin ? "#818cf8" : "#10b981",
                          border: isSuperAdmin
                            ? "1px solid rgba(99, 102, 241, 0.3)"
                            : "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        {isSuperAdmin ? "Super Admin" : "Team Member"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Links */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: "8px 0",
                  }}
                >
                  <Link
                    href="/709832/team"
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "8px 10px",
                      borderRadius: 6,
                      color: isDark ? "#cbd5e1" : "#334155",
                      textDecoration: "none",
                      fontSize: 12.5,
                      fontWeight: 500,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.05)"
                        : "#f1f5f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <FiUser size={14} style={{ color: "#6366f1" }} />
                    <span>My Profile & Team</span>
                  </Link>

                  <Link
                    href="/709832/users"
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "8px 10px",
                      borderRadius: 6,
                      color: isDark ? "#cbd5e1" : "#334155",
                      textDecoration: "none",
                      fontSize: 12.5,
                      fontWeight: 500,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.05)"
                        : "#f1f5f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <FiUsers size={14} style={{ color: "#10b981" }} />
                    <span>User Management</span>
                  </Link>

                  <Link
                    href="/709832/workspace"
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "8px 10px",
                      borderRadius: 6,
                      color: isDark ? "#cbd5e1" : "#334155",
                      textDecoration: "none",
                      fontSize: 12.5,
                      fontWeight: 500,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.05)"
                        : "#f1f5f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <FiActivity size={14} style={{ color: "#38bdf8" }} />
                    <span>Audit Logs & CRM</span>
                  </Link>
                </div>

                {/* Sign Out Button */}
                <div
                  style={{
                    borderTop: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid #e2e8f0",
                    paddingTop: 6,
                  }}
                >
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      borderRadius: 6,
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(239, 68, 68, 0.08)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <FiLogOut size={14} />
                    <span>{signingOut ? "Signing Out..." : "Sign Out"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Spotlight Search Modal (Ctrl+K) */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "14vh",
            paddingLeft: 16,
            paddingRight: 16,
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 560,
              background: isDark ? "#0d1322" : "#ffffff",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid #e2e8f0",
              borderRadius: 16,
              boxShadow: isDark
                ? "0 25px 60px -15px rgba(0, 0, 0, 0.9)"
                : "0 25px 60px -10px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
            }}
          >
            {/* Modal Search Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: isDark
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid #e2e8f0",
                gap: 12,
              }}
            >
              <FiSearch size={18} style={{ color: "#6366f1" }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules, projects, users, tools..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: isDark ? "#f8fafc" : "#0f172a",
                  fontSize: 14.5,
                  fontWeight: 500,
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    color: isDark ? "#94a3b8" : "#64748b",
                    cursor: "pointer",
                    padding: 4,
                  }}
                >
                  <FiX size={16} />
                </button>
              )}
              <kbd
                style={{
                  fontSize: 11,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: isDark ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0",
                  color: isDark ? "#cbd5e1" : "#475569",
                }}
              >
                Esc
              </kbd>
            </div>

            {/* Modal Results List */}
            <div
              style={{
                maxHeight: 360,
                overflowY: "auto",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {filteredSearchItems.length === 0 ? (
                <div
                  style={{
                    padding: "28px 16px",
                    textAlign: "center",
                    color: isDark ? "#94a3b8" : "#64748b",
                    fontSize: 13,
                  }}
                >
                  No admin modules found for &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredSearchItems.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      router.push(item.href);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: 8,
                      background:
                        pathname === item.href
                          ? isDark
                            ? "rgba(99, 102, 241, 0.15)"
                            : "#e0e7ff"
                          : "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== item.href) {
                        e.currentTarget.style.background = isDark
                          ? "rgba(255,255,255,0.04)"
                          : "#f8fafc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== item.href) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span style={{ color: "#6366f1" }}>{item.icon}</span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: isDark ? "#f8fafc" : "#0f172a",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: isDark ? "#94a3b8" : "#64748b",
                        background: isDark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "#f1f5f9",
                        padding: "2px 7px",
                        borderRadius: 4,
                      }}
                    >
                      {item.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Linear-style Power-User Keyboard Shortcuts Modal (?) */}
      {shortcutsModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setShortcutsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 520,
              background: isDark ? "#0d1322" : "#ffffff",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid #e2e8f0",
              borderRadius: 16,
              boxShadow: isDark
                ? "0 30px 70px -15px rgba(0, 0, 0, 0.9)"
                : "0 25px 60px -10px rgba(0, 0, 0, 0.18)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: isDark
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FiHelpCircle size={18} style={{ color: "#6366f1" }} />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: isDark ? "#f8fafc" : "#0f172a",
                  }}
                >
                  Power-User Keyboard Shortcuts
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShortcutsModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: isDark ? "#94a3b8" : "#64748b",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Shortcuts Content */}
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {/* Group 1: General */}
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isDark ? "#818cf8" : "#6366f1",
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    marginBottom: 6,
                  }}
                >
                  Global Actions
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    fontSize: 12.5,
                    color: isDark ? "#cbd5e1" : "#334155",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Spotlight Search Modal</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "2px 7px",
                        borderRadius: 4,
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      Ctrl+K
                    </kbd>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Toggle Light / Dark Mode</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "2px 7px",
                        borderRadius: 4,
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      T
                    </kbd>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Show Keyboard Shortcuts Sheet</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "2px 7px",
                        borderRadius: 4,
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      ?
                    </kbd>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Exit Fullscreen / Close Dialogs</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "2px 7px",
                        borderRadius: 4,
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      Esc
                    </kbd>
                  </div>
                </div>
              </div>

              {/* Group 2: Quick Jump */}
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isDark ? "#818cf8" : "#6366f1",
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    marginBottom: 6,
                  }}
                >
                  Rapid Navigation (Press G then Key)
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    fontSize: 12,
                    color: isDark ? "#cbd5e1" : "#334155",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "4px 6px",
                      borderRadius: 4,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    }}
                  >
                    <span>Go to Dashboard</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      G then D
                    </kbd>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "4px 6px",
                      borderRadius: 4,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    }}
                  >
                    <span>Go to Projects</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      G then P
                    </kbd>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "4px 6px",
                      borderRadius: 4,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    }}
                  >
                    <span>Go to Live Chat</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      G then C
                    </kbd>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "4px 6px",
                      borderRadius: 4,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    }}
                  >
                    <span>Go to Workspace</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      G then W
                    </kbd>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "4px 6px",
                      borderRadius: 4,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    }}
                  >
                    <span>Go to Visitors</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      G then V
                    </kbd>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "4px 6px",
                      borderRadius: 4,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    }}
                  >
                    <span>Go to Users</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      G then U
                    </kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "10px 20px",
                borderTop: isDark
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid #e2e8f0",
                background: isDark ? "rgba(0,0,0,0.2)" : "#f8fafc",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: isDark ? "#64748b" : "#94a3b8",
              }}
            >
              <span>MerxoDev Executive Console</span>
              <span>Press Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
