"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiGlobe,
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiClock,
  FiSearch,
  FiRefreshCw,
  FiShield,
  FiShieldOff,
  FiMessageSquare,
  FiEye,
  FiMapPin,
  FiCpu,
  FiWifi,
  FiCopy,
  FiExternalLink,
  FiTrash2,
  FiX,
  FiSend,
  FiUserCheck,
  FiRepeat,
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiNavigation,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { useTheme } from "@/components/ThemeProvider";

function formatDuration(seconds = 0) {
  const s = Math.max(0, Number(seconds) || 0);
  if (s < 60) return `${s}s`;
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  if (mins < 60) return `${mins}m ${rem}s`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
}

function formatTimeAgo(dateStr) {
  if (!dateStr) return "Unknown";
  const diffSec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diffSec < 65) return "Online Now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}

const PROACTIVE_TEMPLATES = [
  "আসসালামু আলাইকুম! MerxoDev Solutions-এ স্বাগতম। আপনার কি ওয়েবসাইট বা অ্যাপ ডেভেলপমেন্ট নিয়ে কোনো প্রশ্ন আছে?",
  "Hello! Welcome to MerxoDev Solutions. Need any help with our website packages or pricing?",
  "দেখছি আপনি আমাদের সার্ভিস পেজটি দেখছেন! আপনার প্রজেক্টের বাজেট বা আইডিয়া শেয়ার করলে আমরা সেরা সলিউশন দিতে পারি।",
];

export default function AdminVisitorsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // all | online | returning | identified | insights | blocked
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [proactiveVisitor, setProactiveVisitor] = useState(null);
  const [proactiveText, setProactiveText] = useState("");
  const [sendingProactive, setSendingProactive] = useState(false);

  // Manual IP Block input
  const [manualIp, setManualIp] = useState("");
  const [manualReason, setManualReason] = useState("");
  const [blockingIp, setBlockingIp] = useState(false);

  const fetchVisitors = useCallback(async (silent = false) => {
    if (!silent) setRefreshing(true);
    try {
      const res = await fetch("/api/admin/visitors", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch visitors:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchVisitors(false);
    const interval = setInterval(() => fetchVisitors(true), 8000);
    return () => clearInterval(interval);
  }, [fetchVisitors]);

  const handleCopyIp = (ip) => {
    if (!ip) return;
    navigator.clipboard.writeText(ip);
    toast.success(`Copied IP: ${ip}`);
  };

  const handleToggleBlockIp = async (visitorOrIp, currentlyBlocked, location = "") => {
    const ip = typeof visitorOrIp === "string" ? visitorOrIp : visitorOrIp?.ip;
    if (!ip) return;

    try {
      const res = await fetch("/api/admin/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: currentlyBlocked ? "unblock_ip" : "block_ip",
          ip,
          visitorId: typeof visitorOrIp === "object" ? visitorOrIp.id : null,
          location:
            location ||
            (typeof visitorOrIp === "object"
              ? `${visitorOrIp.city || ""}, ${visitorOrIp.countryName || ""}`
              : ""),
          reason: "Restricted by Admin from Visitor Intelligence Panel",
        }),
      });
      if (res.ok) {
        toast.success(
          currentlyBlocked
            ? `Unblocked IP ${ip}`
            : `Blocked IP ${ip} from accessing website`
        );
        fetchVisitors(true);
      }
    } catch {
      toast.error("Failed to update IP firewall status");
    }
  };

  const handleManualBlockSubmit = async (e) => {
    e.preventDefault();
    if (!manualIp.trim()) {
      toast.error("Please enter an IP address to block");
      return;
    }
    setBlockingIp(true);
    try {
      const res = await fetch("/api/admin/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "block_ip",
          ip: manualIp.trim(),
          reason: manualReason.trim() || "Manually blocked by Administrator",
        }),
      });
      if (res.ok) {
        toast.success(`IP ${manualIp.trim()} blocked!`);
        setManualIp("");
        setManualReason("");
        fetchVisitors(true);
      }
    } catch {
      toast.error("Failed to block IP");
    } finally {
      setBlockingIp(false);
    }
  };

  const handleDeleteVisitor = async (visitorId) => {
    try {
      const res = await fetch("/api/admin/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_visitor",
          visitorId,
        }),
      });
      if (res.ok) {
        toast.success("Visitor log removed");
        if (selectedVisitor?.id === visitorId) setSelectedVisitor(null);
        fetchVisitors(true);
      }
    } catch {
      toast.error("Failed to delete visitor record");
    }
  };

  const handleSendProactiveMessage = async (e) => {
    e.preventDefault();
    if (!proactiveVisitor || !proactiveText.trim()) return;
    setSendingProactive(true);
    try {
      const res = await fetch("/api/admin/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "proactive_message",
          visitorId: proactiveVisitor.id,
          chatSessionId: proactiveVisitor.chatSessionId,
          visitorName:
            proactiveVisitor.userName ||
            (proactiveVisitor.city
              ? `Visitor (${proactiveVisitor.city})`
              : `Visitor #${proactiveVisitor.id.slice(-4).toUpperCase()}`),
          visitorEmail: proactiveVisitor.userEmail,
          visitorImage: proactiveVisitor.userImage,
          ip: proactiveVisitor.ip,
          city: proactiveVisitor.city,
          language: proactiveVisitor.language || "en",
          text: proactiveText.trim(),
        }),
      });

      if (res.ok) {
        toast.success(
          "Live message sent! It will pop open on the visitor's screen."
        );
        setProactiveText("");
        setProactiveVisitor(null);
        fetchVisitors(true);
      } else {
        toast.error("Failed to send message");
      }
    } catch {
      toast.error("Error sending proactive message");
    } finally {
      setSendingProactive(false);
    }
  };

  const stats = data?.stats || {
    onlineNow: 0,
    totalTracked: 0,
    todayUnique: 0,
    todayPageViews: 0,
    returningCount: 0,
    newCount: 0,
    identifiedCount: 0,
    avgDurationSec: 0,
    blockedCount: 0,
  };

  const visitors = data?.visitors || [];
  const blockedIps = data?.blockedIps || [];
  const breakdowns = data?.breakdowns || {
    locations: [],
    sources: [],
    browsers: [],
    isps: [],
    devices: { Desktop: 0, Mobile: 0, Tablet: 0 },
    topPages: [],
  };

  // Filter visitors by tab & search query
  const filteredVisitors = visitors.filter((v) => {
    if (activeTab === "online" && !v.isOnline) return false;
    if (
      activeTab === "returning" &&
      !(Number(v.visitCount) > 1 || Number(v.pageViews) > 2)
    )
      return false;
    if (activeTab === "identified" && !(v.userName || v.userEmail))
      return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        (v.ip && v.ip.toLowerCase().includes(q)) ||
        (v.city && v.city.toLowerCase().includes(q)) ||
        (v.countryName && v.countryName.toLowerCase().includes(q)) ||
        (v.isp && v.isp.toLowerCase().includes(q)) ||
        (v.userName && v.userName.toLowerCase().includes(q)) ||
        (v.userEmail && v.userEmail.toLowerCase().includes(q)) ||
        (v.os && v.os.toLowerCase().includes(q)) ||
        (v.browser && v.browser.toLowerCase().includes(q)) ||
        (v.deviceBrand && v.deviceBrand.toLowerCase().includes(q)) ||
        (v.currentPage && v.currentPage.toLowerCase().includes(q)) ||
        (v.trafficSource && v.trafficSource.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const getDeviceIcon = (device) => {
    if (device === "Mobile")
      return <FiSmartphone size={15} style={{ color: "#f59e0b" }} />;
    if (device === "Tablet")
      return <FiTablet size={15} style={{ color: "#a855f7" }} />;
    return <FiMonitor size={15} style={{ color: "#38bdf8" }} />;
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Header */}
      <div
        className="admin-page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1
            className="admin-page-title"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <FiGlobe style={{ color: "#38bdf8" }} /> Live Visitors & IP
            Intelligence
          </h1>
          <p className="admin-page-subtitle">
            Real-time visitor IP tracking, geolocation, ISP details, page
            journey, proactive live chat, and IP firewall.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => fetchVisitors(false)}
            disabled={refreshing}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #cbd5e1",
              color: isDark ? "#f8fafc" : "#334155",
              boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.05)",
              padding: "9px 16px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <FiRefreshCw
              size={15}
              style={{
                animation: refreshing ? "spin 1s linear infinite" : "none",
              }}
            />
            Refresh Live
          </button>

          <Link
            href="/709832/live-chat"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              padding: "9px 16px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <FiMessageSquare size={15} /> Live Chat Console
          </Link>
        </div>
      </div>

      {/* Top 5 KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div
          onClick={() => setActiveTab("online")}
          style={{
            background: isDark ? "rgba(16, 185, 129, 0.08)" : "#ecfdf5",
            border: isDark ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid #a7f3d0",
            boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
            borderRadius: 16,
            padding: "18px 20px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: isDark ? "#10b981" : "#047857" }}>
              ONLINE RIGHT NOW
            </span>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
              }}
            />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: isDark ? "#f8fafc" : "#065f46" }}>
            {stats.onlineNow}
          </div>
          <div style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
            Active in last 60 seconds
          </div>
        </div>

        <div
          onClick={() => setActiveTab("all")}
          style={{
            background: isDark ? "rgba(56, 189, 248, 0.07)" : "#f0f9ff",
            border: isDark ? "1px solid rgba(56, 189, 248, 0.2)" : "1px solid #bae6fd",
            boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
            borderRadius: 16,
            padding: "18px 20px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: isDark ? "#38bdf8" : "#0284c7" }}>
              TODAY&apos;S TRAFFIC
            </span>
            <FiEye size={16} style={{ color: isDark ? "#38bdf8" : "#0284c7" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: isDark ? "#f8fafc" : "#0c4a6e" }}>
            {stats.todayUnique}
          </div>
          <div style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
            {stats.todayPageViews} pageviews today
          </div>
        </div>

        <div
          onClick={() => setActiveTab("returning")}
          style={{
            background: isDark ? "rgba(139, 92, 246, 0.08)" : "#f5f3ff",
            border: isDark ? "1px solid rgba(139, 92, 246, 0.22)" : "1px solid #ddd6fe",
            boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
            borderRadius: 16,
            padding: "18px 20px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: isDark ? "#a78bfa" : "#6d28d9" }}>
              RETURNING VISITORS
            </span>
            <FiRepeat size={16} style={{ color: isDark ? "#a78bfa" : "#6d28d9" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: isDark ? "#f8fafc" : "#4c1d95" }}>
            {stats.returningCount}
          </div>
          <div style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
            {stats.newCount} new visitors
          </div>
        </div>

        <div
          onClick={() => setActiveTab("identified")}
          style={{
            background: isDark ? "rgba(245, 158, 11, 0.07)" : "#fffbeb",
            border: isDark ? "1px solid rgba(245, 158, 11, 0.2)" : "1px solid #fde68a",
            boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
            borderRadius: 16,
            padding: "18px 20px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: isDark ? "#fbbf24" : "#b45309" }}>
              AVG. TIME ON SITE
            </span>
            <FiClock size={16} style={{ color: isDark ? "#fbbf24" : "#b45309" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: isDark ? "#f8fafc" : "#78350f" }}>
            {formatDuration(stats.avgDurationSec)}
          </div>
          <div style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
            {stats.identifiedCount} logged-in / known users
          </div>
        </div>

        <div
          onClick={() => setActiveTab("blocked")}
          style={{
            background: isDark ? "rgba(239, 68, 68, 0.07)" : "#fef2f2",
            border: isDark ? "1px solid rgba(239, 68, 68, 0.22)" : "1px solid #fecaca",
            boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
            borderRadius: 16,
            padding: "18px 20px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: isDark ? "#f87171" : "#dc2626" }}>
              IP FIREWALL
            </span>
            <FiShield size={16} style={{ color: isDark ? "#f87171" : "#dc2626" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: isDark ? "#f8fafc" : "#991b1b" }}>
            {stats.blockedCount}
          </div>
          <div style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
            Blocked IP addresses
          </div>
        </div>
      {/* Tabs & Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
          marginBottom: 20,
          background: isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
          boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
          borderRadius: 14,
          padding: "10px 14px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            { id: "all", label: `All Visitors (${visitors.length})` },
            { id: "online", label: `Online Now (${stats.onlineNow})` },
            { id: "returning", label: `Returning (${stats.returningCount})` },
            { id: "identified", label: `Logged-in (${stats.identifiedCount})` },
            { id: "insights", label: "Locations & Sources" },
            { id: "blocked", label: `Blocked IPs (${stats.blockedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background:
                  activeTab === tab.id
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : (isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"),
                color: activeTab === tab.id ? "#fff" : (isDark ? "#94a3b8" : "#475569"),
                border:
                  activeTab === tab.id
                    ? "none"
                    : (isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0"),
                padding: "7px 14px",
                borderRadius: 9,
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab !== "insights" && activeTab !== "blocked" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: isDark ? "rgba(0,0,0,0.3)" : "#f8fafc",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #cbd5e1",
              borderRadius: 10,
              padding: "7px 12px",
              minWidth: 260,
            }}
          >
            <FiSearch size={15} style={{ color: "#64748b" }} />
            <input
              type="text"
              placeholder="Search IP, city, ISP, device, page..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: isDark ? "#f8fafc" : "#0f172a",
                fontSize: 13,
                width: "100%",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  color: isDark ? "#94a3b8" : "#64748b",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* TAB CONTENT: INSIGHTS & BREAKDOWNS */}
      {activeTab === "insights" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
          }}
        >
          {/* Top Locations */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#f8fafc",
                margin: "0 0 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FiMapPin style={{ color: "#38bdf8" }} /> Top Cities & Countries
            </h3>
            {breakdowns.locations.length === 0 ? (
              <p style={{ color: "#64748b", fontSize: 13 }}>No location data yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {breakdowns.locations.map((loc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.25)",
                      borderRadius: 10,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#e2e8f0", fontWeight: 500 }}>
                      {loc.label}
                    </span>
                    <span
                      style={{
                        color: "#38bdf8",
                        fontWeight: 700,
                        background: "rgba(56,189,248,0.12)",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    >
                      {loc.count} visitors
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Traffic Sources */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#f8fafc",
                margin: "0 0 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FiNavigation style={{ color: "#10b981" }} /> Traffic Sources (Where Visitors Come From)
            </h3>
            {breakdowns.sources.length === 0 ? (
              <p style={{ color: "#64748b", fontSize: 13 }}>No source data yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {breakdowns.sources.map((src, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.25)",
                      borderRadius: 10,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#e2e8f0", fontWeight: 500 }}>
                      {src.source}
                    </span>
                    <span
                      style={{
                        color: "#10b981",
                        fontWeight: 700,
                        background: "rgba(16,185,129,0.12)",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    >
                      {src.count} visits
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top ISPs / Networks */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#f8fafc",
                margin: "0 0 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FiWifi style={{ color: "#a78bfa" }} /> Top Internet Providers (ISP)
            </h3>
            {breakdowns.isps.length === 0 ? (
              <p style={{ color: "#64748b", fontSize: 13 }}>No ISP data yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {breakdowns.isps.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.25)",
                      borderRadius: 10,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#e2e8f0", fontWeight: 500 }}>
                      {item.isp}
                    </span>
                    <span
                      style={{
                        color: "#a78bfa",
                        fontWeight: 700,
                        background: "rgba(167,139,250,0.12)",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Devices & Browsers */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#f8fafc",
                margin: "0 0 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FiCpu style={{ color: "#f59e0b" }} /> Devices & Browsers
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  background: "rgba(0,0,0,0.25)",
                  padding: 12,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Desktop</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8" }}>
                  {breakdowns.devices?.Desktop || 0}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(0,0,0,0.25)",
                  padding: 12,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Mobile</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>
                  {breakdowns.devices?.Mobile || 0}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(0,0,0,0.25)",
                  padding: 12,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Tablet</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#a855f7" }}>
                  {breakdowns.devices?.Tablet || 0}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {breakdowns.browsers.map((b, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12.5,
                    color: "#cbd5e1",
                    padding: "6px 10px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 8,
                  }}
                >
                  <span>{b.browser}</span>
                  <span style={{ fontWeight: 700, color: "#f59e0b" }}>
                    {b.count} users
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: BLOCKED IPs FIREWALL */}
      {activeTab === "blocked" && (
        <div
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#f8fafc",
              margin: "0 0 6px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FiShield style={{ color: "#f87171" }} /> IP Security Firewall
          </h3>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 20px" }}>
            Block suspicious or spammer IP addresses from accessing your website.
          </p>

          <form
            onSubmit={handleManualBlockSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 24,
              background: "rgba(0,0,0,0.25)",
              padding: 14,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <input
              type="text"
              placeholder="Enter IP Address (e.g. 103.120.45.12)"
              value={manualIp}
              onChange={(e) => setManualIp(e.target.value)}
              style={{
                flex: "1 1 200px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 9,
                padding: "9px 12px",
                color: "#f8fafc",
                fontSize: 13,
              }}
            />
            <input
              type="text"
              placeholder="Reason (optional, e.g. Spammer / Fake Order)"
              value={manualReason}
              onChange={(e) => setManualReason(e.target.value)}
              style={{
                flex: "2 1 260px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 9,
                padding: "9px 12px",
                color: "#f8fafc",
                fontSize: 13,
              }}
            />
            <button
              type="submit"
              disabled={blockingIp}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: 9,
                padding: "9px 18px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FiLock size={14} />
              {blockingIp ? "Blocking..." : "Block IP Now"}
            </button>
          </form>

          {blockedIps.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "36px 20px",
                color: "#64748b",
                fontSize: 13.5,
              }}
            >
              No IP addresses are currently blocked.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {blockedIps.map((item) => (
                <div
                  key={item.ip}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                    padding: "12px 16px",
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontWeight: 700,
                        color: "#f8fafc",
                        fontFamily: "monospace",
                        fontSize: 14,
                      }}
                    >
                      <span>{item.ip}</span>
                      {item.location && (
                        <span
                          style={{
                            fontSize: 11.5,
                            color: "#94a3b8",
                            fontFamily: "sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          ({item.location})
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#fca5a5", marginTop: 2 }}>
                      {item.reason || "Blocked by Administrator"}
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleBlockIp(item.ip, true)}
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      color: "#34d399",
                      border: "1px solid rgba(16,185,129,0.3)",
                      borderRadius: 8,
                      padding: "6px 14px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <FiUnlock size={13} /> Unblock IP
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MAIN VISITORS TABLE */}
      {activeTab !== "insights" && activeTab !== "blocked" && (
        <div
          style={{
            background: isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
            boxShadow: isDark ? "none" : "0 4px 16px rgba(0,0,0,0.04)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: 48,
                textAlign: "center",
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: 14,
              }}
            >
              Loading real-time visitor intelligence...
            </div>
          ) : filteredVisitors.length === 0 ? (
            <div
              style={{
                padding: 48,
                textAlign: "center",
                color: isDark ? "#64748b" : "#64748b",
                fontSize: 14,
              }}
            >
              No visitors match the current filter.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: isDark ? "rgba(0,0,0,0.35)" : "#f8fafc",
                      borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                      color: isDark ? "#94a3b8" : "#475569",
                      fontSize: 11.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <th style={{ padding: "14px 16px" }}>Visitor & Status</th>
                    <th style={{ padding: "14px 16px" }}>IP Address & ISP</th>
                    <th style={{ padding: "14px 16px" }}>Location</th>
                    <th style={{ padding: "14px 16px" }}>Device, OS & Browser</th>
                    <th style={{ padding: "14px 16px" }}>Source</th>
                    <th style={{ padding: "14px 16px" }}>Current Page & Time</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitors.map((v) => {
                    const isReturning =
                      Number(v.visitCount) > 1 || Number(v.pageViews) > 2;
                    return (
                      <tr
                        key={v.id}
                        style={{
                          borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #f1f5f9",
                          background: v.isOnline
                            ? (isDark ? "rgba(16, 185, 129, 0.03)" : "rgba(16, 185, 129, 0.06)")
                            : "transparent",
                        }}
                      >
                        {/* Visitor Identity & Online Status */}
                        <td style={{ padding: "14px 16px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            {v.userImage ? (
                              <img
                                src={v.userImage}
                                alt={v.userName || "User"}
                                style={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                  border: "2px solid #38bdf8",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: 10,
                                  background: "rgba(255,255,255,0.06)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {getDeviceIcon(v.device)}
                              </div>
                            )}

                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  fontWeight: 700,
                                  color: isDark ? "#f8fafc" : "#0f172a",
                                }}
                              >
                                <span>
                                  {v.userName ||
                                    `Visitor #${String(v.id).slice(-4).toUpperCase()}`}
                                </span>
                                {isReturning ? (
                                  <span
                                    style={{
                                      fontSize: 10,
                                      padding: "1px 6px",
                                      borderRadius: 4,
                                      background: isDark ? "rgba(139,92,246,0.18)" : "#ede9fe",
                                      color: isDark ? "#c4b5fd" : "#6d28d9",
                                      fontWeight: 700,
                                    }}
                                  >
                                    Returning ({v.visitCount || 1}x)
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: 10,
                                      padding: "1px 6px",
                                      borderRadius: 4,
                                      background: isDark ? "rgba(56,189,248,0.14)" : "#e0f2fe",
                                      color: isDark ? "#38bdf8" : "#0284c7",
                                      fontWeight: 700,
                                    }}
                                  >
                                    New
                                  </span>
                                )}
                              </div>

                              {v.userEmail && (
                                <div style={{ fontSize: 11, color: isDark ? "#38bdf8" : "#0284c7" }}>
                                  {v.userEmail}
                                </div>
                              )}

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5,
                                  fontSize: 11,
                                  color: v.isOnline ? "#10b981" : (isDark ? "#64748b" : "#64748b"),
                                  fontWeight: v.isOnline ? 700 : 500,
                                  marginTop: 2,
                                }}
                              >
                                <span
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: v.isOnline ? "#10b981" : "#64748b",
                                  }}
                                />
                                {formatTimeAgo(v.lastSeenAt)}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* IP Address & ISP */}
                        <td style={{ padding: "14px 16px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              fontFamily: "monospace",
                              fontWeight: 700,
                              color: v.isBlocked ? "#f87171" : (isDark ? "#38bdf8" : "#0284c7"),
                            }}
                          >
                            <span>{v.ip || "Unknown IP"}</span>
                            {v.ip && (
                              <button
                                onClick={() => handleCopyIp(v.ip)}
                                title="Copy IP"
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: isDark ? "#64748b" : "#94a3b8",
                                  cursor: "pointer",
                                  padding: 2,
                                }}
                              >
                                <FiCopy size={12} />
                              </button>
                            )}
                            {v.isBlocked && (
                              <span
                                style={{
                                  fontSize: 9.5,
                                  background: "#ef4444",
                                  color: "#fff",
                                  padding: "1px 5px",
                                  borderRadius: 4,
                                  fontFamily: "sans-serif",
                                }}
                              >
                                BLOCKED
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: 11.5,
                              color: isDark ? "#94a3b8" : "#64748b",
                              marginTop: 2,
                              maxWidth: 190,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            title={v.isp || ""}
                          >
                            {v.isp || "ISP Network"}
                          </div>
                        </td>

                        {/* Location */}
                        <td style={{ padding: "14px 16px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              color: isDark ? "#f8fafc" : "#0f172a",
                              fontWeight: 600,
                            }}
                          >
                            <FiMapPin size={13} style={{ color: "#f59e0b" }} />
                            <span>
                              {v.city || "Unknown"}
                              {v.countryName ? `, ${v.countryName}` : ` (${v.country || "BD"})`}
                            </span>
                          </div>
                          <div style={{ fontSize: 11, color: isDark ? "#64748b" : "#64748b", marginTop: 2 }}>
                            {v.region ? `${v.region} • ` : ""}
                            {v.timezone || "Asia/Dhaka"}
                          </div>
                        </td>

                        {/* Device, OS & Browser */}
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ color: isDark ? "#e2e8f0" : "#1e293b", fontWeight: 600 }}>
                            {v.deviceBrand || v.device} • {v.os || "OS"}
                          </div>
                          <div style={{ fontSize: 11.5, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
                            {v.browser || "Browser"}
                            {v.screen ? ` • ${v.screen}` : ""}
                          </div>
                        </td>

                        {/* Traffic Source */}
                        <td style={{ padding: "14px 16px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 9px",
                              borderRadius: 6,
                              fontSize: 11.5,
                              fontWeight: 600,
                              background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                              border: isDark ? "none" : "1px solid #e2e8f0",
                              color: isDark ? "#cbd5e1" : "#334155",
                            }}
                          >
                            {v.trafficSource || "Direct"}
                          </span>
                        </td>

                        {/* Activity & Duration */}
                        <td style={{ padding: "14px 16px" }}>
                          <div
                            style={{
                              fontFamily: "monospace",
                              fontSize: 12,
                              color: "#10b981",
                              fontWeight: 600,
                              maxWidth: 160,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            title={v.currentPage}
                          >
                            {v.currentPage || "/"}
                          </div>
                          <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 2 }}>
                            <strong>{v.pageViews || 1}</strong> pages •{" "}
                            <strong>{formatDuration(v.totalDurationSec)}</strong>
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "14px 16px", textAlign: "right" }}>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <button
                              onClick={() => setSelectedVisitor(v)}
                              title="View Full Page Journey & Details"
                              style={{
                                background: "rgba(56,189,248,0.12)",
                                border: "1px solid rgba(56,189,248,0.28)",
                                color: "#38bdf8",
                                padding: "6px 10px",
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <FiEye size={13} /> Journey
                            </button>

                            <button
                              onClick={() => {
                                setProactiveVisitor(v);
                                setProactiveText("");
                              }}
                              title="Send Live Proactive Chat Message to Visitor"
                              style={{
                                background: "rgba(99,102,241,0.15)",
                                border: "1px solid rgba(99,102,241,0.32)",
                                color: "#a5b4fc",
                                padding: "6px 10px",
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <FiMessageSquare size={13} /> Message
                            </button>

                            <button
                              onClick={() => handleToggleBlockIp(v, v.isBlocked)}
                              title={v.isBlocked ? "Unblock IP" : "Block IP Address"}
                              style={{
                                background: v.isBlocked
                                  ? "rgba(16,185,129,0.15)"
                                  : "rgba(239,68,68,0.12)",
                                border: v.isBlocked
                                  ? "1px solid rgba(16,185,129,0.3)"
                                  : "1px solid rgba(239,68,68,0.25)",
                                color: v.isBlocked ? "#34d399" : "#f87171",
                                padding: "6px 9px",
                                borderRadius: 8,
                                fontSize: 12,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              {v.isBlocked ? (
                                <FiUnlock size={13} />
                              ) : (
                                <FiShieldOff size={13} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: VISITOR JOURNEY & FULL TELEMETRY DETAILS */}
      {selectedVisitor && (
        <div
          onClick={() => setSelectedVisitor(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(3, 7, 18, 0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 680,
              maxHeight: "88vh",
              overflowY: "auto",
              background: isDark ? "#0d1425" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.14)" : "1px solid #e2e8f0",
              borderRadius: 20,
              padding: 24,
              boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.75)" : "0 20px 50px rgba(0,0,0,0.15)",
              color: isDark ? "#f8fafc" : "#0f172a",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
                paddingBottom: 14,
                borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 800,
                    color: isDark ? "#f8fafc" : "#0f172a",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span>
                    {selectedVisitor.userName ||
                      `Visitor #${String(selectedVisitor.id).slice(-4).toUpperCase()}`}
                  </span>
                  {selectedVisitor.isOnline && (
                    <span
                      style={{
                        fontSize: 11,
                        background: isDark ? "rgba(16,185,129,0.18)" : "#ecfdf5",
                        color: isDark ? "#10b981" : "#047857",
                        border: isDark ? "none" : "1px solid #a7f3d0",
                        padding: "2px 8px",
                        borderRadius: 6,
                      }}
                    >
                      ONLINE NOW
                    </span>
                  )}
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: 12.5, color: isDark ? "#94a3b8" : "#64748b" }}>
                  First seen:{" "}
                  {selectedVisitor.firstSeenAt
                    ? new Date(selectedVisitor.firstSeenAt).toLocaleString()
                    : "N/A"}{" "}
                  • Last active:{" "}
                  {selectedVisitor.lastSeenAt
                    ? new Date(selectedVisitor.lastSeenAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              <button
                onClick={() => setSelectedVisitor(null)}
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                  border: isDark ? "none" : "1px solid #cbd5e1",
                  color: isDark ? "#94a3b8" : "#64748b",
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Detail Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12,
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                  padding: 12,
                  borderRadius: 12,
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontSize: 11, color: isDark ? "#64748b" : "#64748b" }}>IP ADDRESS & ISP</div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isDark ? "#38bdf8" : "#0284c7",
                    fontFamily: "monospace",
                    marginTop: 3,
                  }}
                >
                  {selectedVisitor.ip || "N/A"}
                </div>
                <div style={{ fontSize: 12, color: isDark ? "#cbd5e1" : "#334155", marginTop: 2 }}>
                  {selectedVisitor.isp || "Unknown ISP"}
                </div>
              </div>

              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                  padding: 12,
                  borderRadius: 12,
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontSize: 11, color: isDark ? "#64748b" : "#64748b" }}>LOCATION & COORDINATES</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", marginTop: 3 }}>
                  {selectedVisitor.city || "Unknown"},{" "}
                  {selectedVisitor.countryName || selectedVisitor.country}
                </div>
                <div style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
                  {selectedVisitor.region || selectedVisitor.timezone || "Asia/Dhaka"}
                  {selectedVisitor.latitude && selectedVisitor.longitude && (
                    <a
                      href={`https://www.google.com/maps?q=${selectedVisitor.latitude},${selectedVisitor.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        marginLeft: 8,
                        color: isDark ? "#38bdf8" : "#0284c7",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      Map <FiExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>

              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                  padding: 12,
                  borderRadius: 12,
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontSize: 11, color: isDark ? "#64748b" : "#64748b" }}>DEVICE & SYSTEM</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", marginTop: 3 }}>
                  {selectedVisitor.deviceBrand || selectedVisitor.device} ({selectedVisitor.os})
                </div>
                <div style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
                  {selectedVisitor.browser} • Screen: {selectedVisitor.screen || "N/A"} • Lang:{" "}
                  {selectedVisitor.language || "en"}
                </div>
              </div>

              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                  padding: 12,
                  borderRadius: 12,
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontSize: 11, color: isDark ? "#64748b" : "#64748b" }}>ENGAGEMENT & SOURCE</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: isDark ? "#10b981" : "#059669", marginTop: 3 }}>
                  {selectedVisitor.pageViews || 1} Pages •{" "}
                  {formatDuration(selectedVisitor.totalDurationSec)}
                </div>
                <div style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
                  Source: {selectedVisitor.trafficSource || "Direct"} (Visits:{" "}
                  {selectedVisitor.visitCount || 1})
                </div>
              </div>
            </div>

            {/* Step-by-Step Page Journey Timeline */}
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: isDark ? "#f8fafc" : "#0f172a",
                margin: "0 0 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FiActivity style={{ color: isDark ? "#38bdf8" : "#0284c7" }} /> Step-by-Step Visited Pages
              Journey ({selectedVisitor.pagesVisited?.length || 0})
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxHeight: 240,
                overflowY: "auto",
                paddingRight: 4,
                marginBottom: 20,
              }}
            >
              {(selectedVisitor.pagesVisited || []).map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "9px 14px",
                    background: isDark ? "rgba(0,0,0,0.3)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                    borderRadius: 10,
                    fontSize: 12.5,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: isDark ? "rgba(99,102,241,0.2)" : "#e0e7ff",
                        color: isDark ? "#a5b4fc" : "#4338ca",
                        fontSize: 11,
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        color: isDark ? "#38bdf8" : "#0284c7",
                        fontFamily: "monospace",
                        fontWeight: 600,
                      }}
                    >
                      {step.path}
                    </span>
                  </div>
                  <span style={{ fontSize: 11.5, color: isDark ? "#64748b" : "#64748b" }}>
                    {step.time
                      ? new Date(step.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
                paddingTop: 14,
                borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
              }}
            >
              <button
                onClick={() => handleDeleteVisitor(selectedVisitor.id)}
                style={{
                  background: isDark ? "rgba(239,68,68,0.12)" : "#fee2e2",
                  color: isDark ? "#f87171" : "#dc2626",
                  border: isDark ? "1px solid rgba(239,68,68,0.25)" : "1px solid #fecaca",
                  padding: "8px 14px",
                  borderRadius: 9,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FiTrash2 size={14} /> Delete Log
              </button>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => {
                    const v = selectedVisitor;
                    setSelectedVisitor(null);
                    setProactiveVisitor(v);
                  }}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: 9,
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiMessageSquare size={14} /> Send Proactive Chat Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SEND PROACTIVE LIVE CHAT MESSAGE TO VISITOR */}
      {proactiveVisitor && (
        <div
          onClick={() => setProactiveVisitor(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(3, 7, 18, 0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 520,
              background: isDark ? "#0d1425" : "#ffffff",
              border: isDark ? "1px solid rgba(99,102,241,0.35)" : "1px solid #e2e8f0",
              boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.75)" : "0 20px 50px rgba(0,0,0,0.15)",
              borderRadius: 20,
              padding: 24,
              color: isDark ? "#f8fafc" : "#0f172a",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 800,
                  color: isDark ? "#f8fafc" : "#0f172a",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <FiMessageSquare style={{ color: isDark ? "#818cf8" : "#6366f1" }} /> Message Visitor
                Live
              </h3>
              <button
                onClick={() => setProactiveVisitor(null)}
                style={{
                  background: isDark ? "none" : "#f1f5f9",
                  border: "none",
                  color: isDark ? "#94a3b8" : "#64748b",
                  cursor: "pointer",
                  borderRadius: 8,
                  padding: 4,
                }}
              >
                <FiX size={18} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: isDark ? "#94a3b8" : "#64748b", margin: "0 0 14px" }}>
              Sending a message here will automatically pop open the{" "}
              <strong>MerxoDev Live Chat</strong> box on{" "}
              <strong style={{ color: isDark ? "#38bdf8" : "#0284c7" }}>
                {proactiveVisitor.userName ||
                  `${proactiveVisitor.city || "Visitor"} (${proactiveVisitor.ip})`}
              </strong>
              &apos;s screen with a notification sound!
            </p>

            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 11.5,
                  color: isDark ? "#64748b" : "#64748b",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                QUICK GREETING TEMPLATES:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {PROACTIVE_TEMPLATES.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setProactiveText(tpl)}
                    style={{
                      textAlign: "left",
                      background: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                      color: isDark ? "#cbd5e1" : "#334155",
                      padding: "8px 12px",
                      borderRadius: 9,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    {tpl}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendProactiveMessage}>
              <textarea
                rows={3}
                placeholder="Write your live message to this visitor..."
                value={proactiveText}
                onChange={(e) => setProactiveText(e.target.value)}
                style={{
                  width: "100%",
                  background: isDark ? "rgba(0,0,0,0.35)" : "#f8fafc",
                  border: isDark ? "1px solid rgba(255,255,255,0.14)" : "1px solid #cbd5e1",
                  borderRadius: 12,
                  padding: 12,
                  color: isDark ? "#f8fafc" : "#0f172a",
                  fontSize: 13.5,
                  outline: "none",
                  resize: "vertical",
                  marginBottom: 14,
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                }}
              >
                {proactiveVisitor.chatSessionId && (
                  <button
                    type="button"
                    onClick={() => router.push("/709832/live-chat")}
                    style={{
                      background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                      color: isDark ? "#cbd5e1" : "#334155",
                      border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #cbd5e1",
                      padding: "9px 14px",
                      borderRadius: 10,
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Open Live Chat Console
                  </button>
                )}
                <button
                  type="submit"
                  disabled={sendingProactive || !proactiveText.trim()}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    border: "none",
                    padding: "9px 18px",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiSend size={14} />
                  {sendingProactive ? "Sending..." : "Send to Visitor Screen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
          </div>
        </div>
      )}
    </div>
  );
}

