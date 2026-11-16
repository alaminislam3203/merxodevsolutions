"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
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
} from "react-icons/fi";

export default function AdminTopNav({
  isFullscreen = false,
  onToggleFullscreen,
  chatUnread = 0,
  chatNeedsHuman = 0,
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  // States
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null); // 'grid' | 'help' | 'notifications' | 'settings' | 'plus'

  const navRef = useRef(null);
  const searchInputRef = useRef(null);

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

  // Global Ctrl+K / Cmd+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      href: "/709832/showcase",
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

  const totalAlerts = chatUnread + chatNeedsHuman;

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
          padding: "0 20px",
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
        {/* Left Side: Search Bar matching user screenshot */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              width: "clamp(260px, 32vw, 440px)",
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
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Controls matching user reference image */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Direct Theme Toggle Switch in TopNav (Replaced Test Mode) */}
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
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
                  <FiMessageSquare size={15} style={{ color: "#06b6d4" }} />
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

          {/* Help / Docs Icon */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => toggleDropdown("help")}
              title="Help & Shortcuts"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background:
                  activeDropdown === "help"
                    ? isDark
                      ? "rgba(255,255,255,0.1)"
                      : "#e2e8f0"
                    : "transparent",
                border: "none",
                color:
                  activeDropdown === "help"
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
              <FiHelpCircle size={16} />
            </button>

            {activeDropdown === "help" && (
              <div
                style={{
                  position: "absolute",
                  top: 38,
                  right: 0,
                  width: 260,
                  background: isDark ? "#0d1322" : "#ffffff",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: isDark
                    ? "0 20px 40px -10px rgba(0,0,0,0.8)"
                    : "0 15px 35px -5px rgba(0,0,0,0.12)",
                  padding: "14px 16px",
                  zIndex: 99,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: isDark ? "#f8fafc" : "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  Keyboard Shortcuts
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    fontSize: 12,
                    color: isDark ? "#94a3b8" : "#475569",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Quick Search</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 11,
                      }}
                    >
                      Ctrl+K
                    </kbd>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Toggle Fullscreen</span>
                    <kbd
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 11,
                      }}
                    >
                      Esc
                    </kbd>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Admin Route</span>
                    <span style={{ fontFamily: "monospace", fontSize: 11 }}>
                      /709832
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Bell with dot indicator */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => toggleDropdown("notifications")}
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
              {/* Blue / Red indicator dot exactly matching user screenshot */}
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
                  width: 290,
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
                    marginBottom: 10,
                  }}
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

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Link
                    href="/709832/live-chat"
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
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
                      }}
                    >
                      <FiMessageSquare size={14} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Visitor Live Chat</div>
                      <div
                        style={{
                          fontSize: 11,
                          color: isDark ? "#94a3b8" : "#64748b",
                        }}
                      >
                        {chatNeedsHuman > 0
                          ? `${chatNeedsHuman} waiting for Live Team`
                          : "Real-time AI active"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/709832/workspace"
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
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
                      }}
                    >
                      <FiActivity size={14} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Agency Logs</div>
                      <div
                        style={{
                          fontSize: 11,
                          color: isDark ? "#94a3b8" : "#64748b",
                        }}
                      >
                        Check client CRM & task updates
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Settings Icon */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => toggleDropdown("settings")}
              title="Admin Preferences & Theme"
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
                  width: 220,
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
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isDark ? "#94a3b8" : "#64748b",
                    padding: "4px 8px 6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Preferences
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.05)"
                        : "#f1f5f9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                    }}
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark
                      ? "rgba(255,255,255,0.05)"
                      : "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                  }}
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

                <Link
                  href="/709832/users"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 6,
                    color: isDark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: 12.5,
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark
                      ? "rgba(255,255,255,0.05)"
                      : "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <FiUsers size={15} style={{ color: "#8b5cf6" }} />
                    <span>Accounts</span>
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Circular Purple Plus Button matching user screenshot */}
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
                  <FiBriefcase size={14} style={{ color: "#f59e0b" }} />
                  New CRM Lead / Task
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
        </div>
      </header>

      {/* Global Command Spotlight Search Modal (triggered by search click or Ctrl+K) */}
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
                placeholder="Search admin sections, projects, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.06)" : "#f1f5f9",
                  border: "none",
                  borderRadius: 6,
                  color: isDark ? "#94a3b8" : "#64748b",
                  padding: "4px 8px",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                ESC
              </button>
            </div>

            {/* Results list */}
            <div style={{ maxHeight: 340, overflowY: "auto", padding: 8 }}>
              {filteredSearchItems.length === 0 ? (
                <div
                  style={{
                    padding: "28px 16px",
                    textAlign: "center",
                    color: isDark ? "#64748b" : "#94a3b8",
                    fontSize: 13,
                  }}
                >
                  No matching admin sections found
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
    </>
  );
}
