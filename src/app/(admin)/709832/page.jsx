"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import LottiePlayer from "@/components/LottiePlayer";
import { FaRobot, FaLaptopCode } from "react-icons/fa";
import {
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiLock,
  FiUsers,
  FiEye,
  FiTrendingUp,
  FiActivity,
  FiGlobe,
  FiSmartphone,
  FiMonitor,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import "./login.css";

// ─── Dashboard Component (Shown when Authenticated) ──────────────
function DashboardView({ isTeamMember = false }) {
  const [stats, setStats] = useState({ projects: 0, images: 0, content: 0, users: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsDays, setAnalyticsDays] = useState(14);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        if (isTeamMember) {
          const [pr, im, rv] = await Promise.all([
            fetch("/api/admin/projects"),
            fetch("/api/admin/images"),
            fetch("/api/admin/reviews"),
          ]);
          const [projects, images, reviewsData] = await Promise.all([
            pr.json(),
            im.json(),
            rv.json(),
          ]);
          setStats({
            projects: Array.isArray(projects) ? projects.length : 0,
            images: Array.isArray(images) ? images.length : 0,
            content: 0,
            users: 0,
            reviews: reviewsData?.stats?.total || (Array.isArray(reviewsData?.reviews) ? reviewsData.reviews.length : 0),
          });
        } else {
          const [pr, im, co, us] = await Promise.all([
            fetch("/api/admin/projects"),
            fetch("/api/admin/images"),
            fetch("/api/admin/content"),
            fetch("/api/admin/users"),
          ]);
          const [projects, images, content, usersData] = await Promise.all([
            pr.json(),
            im.json(),
            co.json(),
            us.json(),
          ]);
          setStats({
            projects: Array.isArray(projects) ? projects.length : 0,
            images: Array.isArray(images) ? images.length : 0,
            content: Array.isArray(content) ? content.length : 0,
            users: usersData?.stats?.total || (Array.isArray(usersData?.users) ? usersData.users.length : 0),
            reviews: 0,
          });
        }
      } catch (e) {}
      setLoading(false);
    }
    fetchStats();
  }, [isTeamMember]);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoadingAnalytics(true);
      try {
        const res = await fetch(`/api/admin/analytics?days=${analyticsDays}`);
        const data = await res.json();
        if (res.ok) {
          setAnalytics(data);
        }
      } catch (_) {}
      setLoadingAnalytics(false);
    }
    fetchAnalytics();
  }, [analyticsDays]);

  const statCards = [
    {
      label: "Today's Visitors",
      value: analytics?.today?.uniqueVisits || 0,
      subValue: `${analytics?.today?.pageViews || 0} pageviews`,
      color: "#10b981",
      bg: "rgba(16,185,129,0.12)",
      href: isTeamMember ? "#analytics-section" : "/709832/visitors",
      isLive: true,
      icon: <FiActivity size={22} />,
    },
    isTeamMember
      ? {
          label: "Client Reviews",
          value: stats.reviews,
          subValue: "Manage testimonials",
          color: "#f59e0b",
          bg: "rgba(245,158,11,0.12)",
          href: "/709832/reviews",
          icon: <FiCheckCircle size={22} />,
        }
      : {
          label: "Registered Users",
          value: stats.users,
          subValue: "Manage clients & staff",
          color: "#8b5cf6",
          bg: "rgba(139,92,246,0.12)",
          href: "/709832/users",
          icon: <FiUsers size={22} />,
        },
    {
      label: "Total Projects",
      value: stats.projects,
      subValue: "Active in showcase",
      color: "#6366f1",
      bg: "rgba(99,102,241,0.12)",
      href: "/709832/projects",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      label: "Media Library",
      value: stats.images,
      subValue: "Cloud assets",
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.12)",
      href: "/709832/images",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    ...(isTeamMember
      ? [
          {
            href: "/709832/live-chat",
            title: "Live Chat & AI",
            desc: "Reply to visitors and live chat requests",
            color: "#10b981",
            bg: "rgba(16,185,129,0.12)",
            icon: <FiActivity size={22} />,
          },
          {
            href: "/709832/reviews",
            title: "Manage Reviews",
            desc: "Approve, feature, and manage client reviews",
            color: "#f59e0b",
            bg: "rgba(245,158,11,0.12)",
            icon: <FiCheckCircle size={22} />,
          },
          {
            href: "/709832/team",
            title: "Team Members",
            desc: "View team directory & edit your own profile",
            color: "#8b5cf6",
            bg: "rgba(139,92,246,0.12)",
            icon: <FiUsers size={22} />,
          },
        ]
      : [
          {
            href: "/709832/users",
            title: "Manage Users",
            desc: "Control user accounts, roles & status",
            color: "#8b5cf6",
            bg: "rgba(139,92,246,0.12)",
            icon: <FiUsers size={22} />,
          },
        ]),
    {
      href: "/709832/projects",
      title: "Add Project",
      desc: "Publish a new project to your portfolio",
      color: "#818cf8",
      bg: "rgba(99,102,241,0.12)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
    {
      href: "/709832/images",
      title: "Upload Image",
      desc: "Add images & copy URLs in media library",
      color: "#a78bfa",
      bg: "rgba(139,92,246,0.12)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
    ...(!isTeamMember
      ? [
          {
            href: "/709832/content",
            title: "Edit Content",
            desc: "Update website texts and descriptions",
            color: "#22d3ee",
            bg: "rgba(6,182,212,0.12)",
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            ),
          },
        ]
      : []),
  ];

  // Calculate highest count for proportional chart bars
  const chartData = analytics?.chartData || [];
  const maxVisits = Math.max(...chartData.map((d) => Math.max(d.uniqueVisits, d.pageViews)), 6);

  return (
    <div style={{ paddingBottom: 50 }}>
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here is a live overview of your visitors, accounts, and portfolio.</p>
      </div>

      {/* Top Stat Cards */}
      <div className="dash-stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="dash-stat-card" style={{ padding: "20px 22px" }}>
            <div className="dash-stat-icon" style={{ background: card.bg, color: card.color }}>
              {card.icon}
            </div>
            <div className="dash-stat-info">
              {loading ? (
                <div className="dash-stat-skeleton"></div>
              ) : (
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span className="dash-stat-value" style={{ color: card.color }}>
                    {card.value}
                  </span>
                  {card.isLive && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#10b981",
                        background: "rgba(16,185,129,0.15)",
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }}></span>
                      LIVE
                    </span>
                  )}
                </div>
              )}
              <span className="dash-stat-label">{card.label}</span>
              <span style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{card.subValue}</span>
            </div>
            <div className="dash-stat-arrow" style={{ color: card.color }}>
              <FiArrowUpRight size={20} />
            </div>
          </Link>
        ))}
      </div>

      {/* ─── DAILY VISITORS & TRAFFIC ANALYTICS ───────────────────── */}
      <div
        id="analytics-section"
        style={{
          background: "rgba(255, 255, 255, 0.025)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 18,
          padding: 24,
          marginBottom: 32,
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#f8fafc",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FiTrendingUp style={{ color: "#10b981" }} /> Daily Website Visitors & Traffic
            </h2>
            <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#94a3b8" }}>
              Track daily unique visitors and total page impressions visiting merxodevsolutions.pro.bd
            </p>
          </div>

          {/* Days Switcher & Full IP Tracker Link */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {!isTeamMember && (
              <Link
                href="/709832/visitors"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(56, 189, 248, 0.12)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  color: "#38bdf8",
                  padding: "7px 14px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <FiGlobe size={14} /> Live Visitors & IP Tracker
              </Link>
            )}

            <div
              style={{
                display: "flex",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 10,
                padding: 3,
              }}
            >
              {[
                { days: 7, label: "7 Days" },
                { days: 14, label: "14 Days" },
                { days: 30, label: "30 Days" },
              ].map((tab) => (
                <button
                  key={tab.days}
                  onClick={() => setAnalyticsDays(tab.days)}
                  style={{
                    background: analyticsDays === tab.days ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
                    color: analyticsDays === tab.days ? "#ffffff" : "#94a3b8",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Sub-cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14,
            marginBottom: 24,
          }}
        >
          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
              <FiEye style={{ color: "#38bdf8" }} /> Today's Visitors
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#38bdf8", marginTop: 4 }}>
              {analytics?.today?.uniqueVisits || 0}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Unique people today</div>
          </div>

          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
              <FiActivity style={{ color: "#818cf8" }} /> Today's Pageviews
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#818cf8", marginTop: 4 }}>
              {analytics?.today?.pageViews || 0}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Total hits today</div>
          </div>

          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
              <FiClock style={{ color: "#f59e0b" }} /> Yesterday
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fbbf24", marginTop: 4 }}>
              {analytics?.yesterday?.uniqueVisits || 0}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{analytics?.yesterday?.pageViews || 0} page views</div>
          </div>

          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
              <FiGlobe style={{ color: "#34d399" }} /> All-Time Visitors
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#34d399", marginTop: 4 }}>
              {analytics?.allTime?.totalUniqueVisits || 0}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{analytics?.allTime?.totalPageViews || 0} total views</div>
          </div>
        </div>

        {/* Visual Daily Trend Chart */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}>Daily Visits Breakdown</div>
            <div style={{ display: "flex", gap: 14, fontSize: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#38bdf8" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}></span>
                Unique Visitors
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#818cf8" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}></span>
                Pageviews
              </span>
            </div>
          </div>

          {/* Interactive Bar Chart Area */}
          <div
            style={{
              position: "relative",
              height: 200,
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 14,
              padding: "16px 12px 28px 12px",
              display: "flex",
              alignItems: "flex-end",
              gap: chartData.length > 20 ? 4 : 8,
            }}
          >
            {loadingAnalytics ? (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: 13 }}>
                Loading visitor history...
              </div>
            ) : chartData.length === 0 ? (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: 13 }}>
                No visitor data recorded yet for this period.
              </div>
            ) : (
              chartData.map((d, index) => {
                const heightPercent = Math.max(Math.round((d.uniqueVisits / maxVisits) * 140), d.uniqueVisits > 0 ? 12 : 3);
                const pageViewHeight = Math.max(Math.round((d.pageViews / maxVisits) * 140), d.pageViews > 0 ? 14 : 4);
                const isHovered = hoveredDay?.date === d.date;

                return (
                  <div
                    key={d.date}
                    onMouseEnter={() => setHoveredDay(d)}
                    onMouseLeave={() => setHoveredDay(null)}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "100%",
                          marginBottom: 8,
                          zIndex: 20,
                          background: "#0c1328",
                          border: "1px solid rgba(99,102,241,0.4)",
                          borderRadius: 8,
                          padding: "6px 10px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#f8fafc" }}>{d.label}</div>
                        <div style={{ fontSize: 12, color: "#38bdf8", fontWeight: 800 }}>
                          {d.uniqueVisits} unique visitors
                        </div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>
                          {d.pageViews} pageviews
                        </div>
                      </div>
                    )}

                    {/* Bars Container */}
                    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
                      {/* Unique Visitors Bar */}
                      <div
                        style={{
                          width: chartData.length > 20 ? "40%" : 12,
                          height: `${heightPercent}px`,
                          background: isHovered
                            ? "linear-gradient(180deg, #38bdf8, #0284c7)"
                            : "linear-gradient(180deg, #06b6d4, #2563eb)",
                          borderRadius: "4px 4px 0 0",
                          transition: "height 0.3s ease, background 0.2s",
                          boxShadow: isHovered ? "0 0 10px rgba(56, 189, 248, 0.5)" : "none",
                        }}
                      ></div>

                      {/* PageViews Bar */}
                      <div
                        style={{
                          width: chartData.length > 20 ? "40%" : 12,
                          height: `${pageViewHeight}px`,
                          background: isHovered
                            ? "linear-gradient(180deg, #a78bfa, #7c3aed)"
                            : "linear-gradient(180deg, #6366f1, #4f46e5)",
                          borderRadius: "4px 4px 0 0",
                          transition: "height 0.3s ease, background 0.2s",
                          opacity: 0.85,
                        }}
                      ></div>
                    </div>

                    {/* Date Label (show alternate on long lists) */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: -22,
                        fontSize: chartData.length > 15 ? 9 : 11,
                        color: isHovered ? "#38bdf8" : "#64748b",
                        fontWeight: isHovered ? 700 : 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {chartData.length > 20 && index % 2 !== 0 ? "" : d.label.split(" ")[1] || d.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Two Columns: Top Pages & Live Recent Visitors */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {/* Top Visited Pages */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f8fafc", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <FiGlobe style={{ color: "#38bdf8" }} /> Top Visited Pages
            </div>

            {(!analytics?.topPages || analytics.topPages.length === 0) ? (
              <div style={{ color: "#64748b", fontSize: 12, padding: "16px 0", textAlign: "center" }}>
                Traffic will appear here as users browse the site.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {analytics.topPages.map((p, idx) => {
                  const maxPageViews = analytics.topPages[0]?.views || 1;
                  const percent = Math.round((p.views / maxPageViews) * 100);

                  return (
                    <div key={p.path || idx}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: "#e2e8f0", fontFamily: "monospace" }}>{p.path}</span>
                        <span style={{ color: "#38bdf8", fontWeight: 700 }}>{p.views} views</span>
                      </div>
                      <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${percent}%`,
                            background: "linear-gradient(90deg, #6366f1, #38bdf8)",
                            borderRadius: 3,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Live Recent Visitor Feed */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f8fafc", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <FiClock style={{ color: "#10b981" }} /> Recent Activity Log
            </div>

            {(!analytics?.recentLogs || analytics.recentLogs.length === 0) ? (
              <div style={{ color: "#64748b", fontSize: 12, padding: "16px 0", textAlign: "center" }}>
                Live visitor events will display here in real-time.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto" }}>
                {analytics.recentLogs.slice(0, 8).map((log, idx) => {
                  const isMobile = log.device === "Mobile";
                  const timeAgo = log.createdAt ? new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

                  return (
                    <div
                      key={log.id || idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "6px 10px",
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                        {isMobile ? (
                          <FiSmartphone size={14} style={{ color: "#f59e0b", flexShrink: 0 }} />
                        ) : (
                          <FiMonitor size={14} style={{ color: "#38bdf8", flexShrink: 0 }} />
                        )}
                        <span style={{ color: "#cbd5e1", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {log.path}
                        </span>
                        {log.ip && (
                          <span style={{ fontSize: 10.5, color: "#38bdf8", fontFamily: "monospace", flexShrink: 0 }}>
                            ({log.ip}{log.city ? ` • ${log.city}` : ""})
                          </span>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 11, color: "#64748b" }}>{log.browser}</span>
                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{timeAgo}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dash-quick-actions">
        <h2 className="dash-section-title">Quick Actions</h2>
        <div className="dash-actions-grid">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href} className="dash-action-card">
              <div className="dash-action-icon" style={{ background: action.bg, color: action.color }}>
                {action.icon}
              </div>
              <div>
                <p className="dash-action-title">{action.title}</p>
                <p className="dash-action-desc">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Login Component (Shown when Unauthenticated) ────────────────
function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      toast.error("Please enter your email address.", {
        id: "login-val-email",
        icon: <FiAlertCircle size={18} style={{ color: "#f87171", flexShrink: 0 }} />,
      });
      setError("Email address is required.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.", {
        id: "login-val-pass",
        icon: <FiAlertCircle size={18} style={{ color: "#f87171", flexShrink: 0 }} />,
      });
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password. Access denied.", {
          id: "login-auth-error",
          icon: <FiLock size={18} style={{ color: "#f87171", flexShrink: 0 }} />,
        });
        setError("Invalid email or password. Please verify credentials.");
        setLoading(false);
      } else {
        toast.success("Authentication verified! Redirecting...", {
          id: "login-auth-success",
          icon: <FiCheckCircle size={18} style={{ color: "#34d399", flexShrink: 0 }} />,
        });
        // Auto hard reload so session, cookies, and server state fresh-load cleanly
        setTimeout(() => {
          window.location.href = "/709832";
        }, 500);
      }
    } catch (err) {
      toast.error("A network or server error occurred. Please try again.", {
        id: "login-catch-error",
        icon: <FiAlertCircle size={18} style={{ color: "#f87171", flexShrink: 0 }} />,
      });
      setError("Failed to connect to authentication server.");
      setLoading(false);
    }
  };

  const [animType, setAnimType] = useState("web-dev");
  const animPath = animType === "web-dev" ? "/animations/web-dev.json" : "/animations/workspace.json";

  return (
    <div className="login-screen">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "14px",
            fontSize: "13px",
            fontWeight: "500",
            padding: "12px 18px",
            boxShadow: "0 20px 30px -10px rgba(0,0,0,0.6), 0 0 15px rgba(99, 102, 241, 0.2)",
          },
          error: {
            style: {
              border: "1px solid rgba(239, 68, 68, 0.35)",
              background: "linear-gradient(135deg, #1c111c 0%, #0f172a 100%)",
              color: "#fca5a5",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
          success: {
            style: {
              border: "1px solid rgba(16, 185, 129, 0.35)",
              background: "linear-gradient(135deg, #0c2018 0%, #0f172a 100%)",
              color: "#6ee7b7",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="login-container">
        {/* Left Column: Visual Lottie Animation Showcase */}
        <div className="login-showcase">
          <div className="showcase-badge">
            <span className="badge-dot"></span>
            <FiShield size={13} style={{ color: "#818cf8" }} />
            <span>MerxoDev Secure Admin Access</span>
          </div>

          <h2 className="showcase-title">
            Build, Scale &amp; Manage With <span>Precision</span>
          </h2>

          <p className="showcase-subtitle">
            Centralized control over projects, media gallery, dynamic website content blocks, and verified reviews.
          </p>

          <div className="lottie-card">
            <div className="lottie-header-bar">
              <div className="lottie-window-dots">
                <span className="window-dot dot-red"></span>
                <span className="window-dot dot-yellow"></span>
                <span className="window-dot dot-green"></span>
              </div>

              <div className="animation-switch">
                <button
                  type="button"
                  onClick={() => setAnimType("web-dev")}
                  className={`anim-tab-btn ${animType === "web-dev" ? "anim-tab-btn-active" : ""}`}
                >
                  <FaLaptopCode size={14} style={{ flexShrink: 0 }} />
                  <span>Dev Studio</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAnimType("workspace")}
                  className={`anim-tab-btn ${animType === "workspace" ? "anim-tab-btn-active" : ""}`}
                >
                  <FaRobot size={14} style={{ flexShrink: 0 }} />
                  <span>AI Workspace</span>
                </button>
              </div>
            </div>

            <div className="lottie-view-area">
              <LottiePlayer
                key={animPath}
                animationPath={animPath}
                loop={true}
                autoplay={true}
              />
            </div>
          </div>

          <div className="showcase-features">
            <div className="feature-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Next.js 16 Turbo</span>
            </div>
            <div className="feature-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Edge Security</span>
            </div>
            <div className="feature-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
              <span>Cloud Storage</span>
            </div>
            <div className="feature-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span>Live Sync</span>
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphism Login Card */}
        <div className="login-card">
          <div className="login-logo">
            <div
              className="logo-icon"
              style={{
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <img src="/favicon.png" alt="MerxoDev Favicon" style={{ width: 28, height: 28, objectFit: "contain" }} />
            </div>
            <div className="logo-text" style={{ display: "flex", alignItems: "center" }}>
              <img src="/logo.png" alt="MerxoDev Solutions" style={{ height: 28, maxWidth: 140, objectFit: "contain" }} />
            </div>
          </div>

          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">Sign in to manage your workspace and content</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field-group">
              <label className="field-label" htmlFor="login-email">
                Email address
              </label>
              <div className="input-wrap">
                <svg className="input-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="login-input"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="login-password">
                Password
              </label>
              <div className="input-wrap">
                <svg className="input-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="login-input"
                  required
                  autoComplete="current-password"
                />
                <button type="button" className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <div className="spinner-sm"></div> : "Sign In to Admin"}
            </button>
          </form>

          <Link href="/" className="login-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Return to MerxoDev Solutions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Controller Page ─────────────────────────────────────────
export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="admin-spinner-btn" style={{ width: 32, height: 32, borderWidth: 3 }}></div>
      </div>
    );
  }

  if (status === "authenticated") {
    const emailLower = String(session?.user?.email || "").toLowerCase().trim();
    const rawRole = String(session?.user?.role || "USER").toUpperCase().replace(/-/g, "_");
    const isAdmin = emailLower === "merxodevsolutions@gmail.com" || rawRole === "ADMIN";
    const isTeamMember = !isAdmin && rawRole === "TEAM_MEMBER";

    if (!isAdmin && !isTeamMember) {
      return (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#ef4444" }}>Access Denied</h2>
          <p style={{ color: "#9ca3af", marginBottom: "20px" }}>You do not have administrative privileges to access this area.</p>
          <a href="/" style={{ padding: "10px 20px", background: "#6366f1", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Return to Home</a>
        </div>
      );
    }
    return <DashboardView isTeamMember={isTeamMember} />;
  }

  return <LoginView />;
}