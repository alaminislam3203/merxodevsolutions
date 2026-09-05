"use client";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ projects: 0, images: 0, content: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pr, im, co] = await Promise.all([
          fetch("/api/admin/projects"),
          fetch("/api/admin/images"),
          fetch("/api/admin/content"),
        ]);
        const [projects, images, content] = await Promise.all([pr.json(), im.json(), co.json()]);
        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          images: Array.isArray(images) ? images.length : 0,
          content: Array.isArray(content) ? content.length : 0,
        });
      } catch (e) {}
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Projects", value: stats.projects, color: "#6366f1", bg: "rgba(99,102,241,0.1)", href: "/admin/projects",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
    { label: "Media Files", value: stats.images, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", href: "/admin/images",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
    { label: "Content Blocks", value: stats.content, color: "#06b6d4", bg: "rgba(6,182,212,0.1)", href: "/admin/content",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  ];

  const quickActions = [
    { href: "/admin/projects", title: "Add Project", desc: "Publish a new project to your portfolio", color: "#818cf8", bg: "rgba(99,102,241,0.12)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
    { href: "/admin/images", title: "Upload Image", desc: "Add images to your media library", color: "#a78bfa", bg: "rgba(139,92,246,0.12)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
    { href: "/admin/content", title: "Edit Content", desc: "Update website texts and descriptions", color: "#22d3ee", bg: "rgba(6,182,212,0.12)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
    { href: "/admin/content", title: "Google Meet Link", desc: "Update your live discovery call meeting link", color: "#10b981", bg: "rgba(16,182,129,0.12)",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22"><path fill="#ea4335" d="M166 106v90H76"/><path fill="#ffba00" d="M166 106v90h120v62l90-73v-49q0-30-30-30"/><path fill="#00ac47" d="M346 406q30 0 30-30V327l-90-71v60H164v90m212-77 42 34c9 7 18 7 18-7V156c0-14-9-14-18-7l-42 34"/><path fill="#0066da" d="M76 314v62q0 30 30 30h60v-92"/><path fill="#2684fc" d="M76 196h90v120H76"/><path fill="#00832d" d="M286 256l90-73v146"/></svg> },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here is an overview of your workspace.</p>
      </div>

      <div className="dash-stats-grid">
        {statCards.map((card) => (
          <a key={card.label} href={card.href} className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
            <div className="dash-stat-info">
              {loading
                ? <div className="dash-stat-skeleton"></div>
                : <span className="dash-stat-value" style={{ color: card.color }}>{card.value}</span>
              }
              <span className="dash-stat-label">{card.label}</span>
            </div>
            <div className="dash-stat-arrow" style={{ color: card.color }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="dash-quick-actions">
        <h2 className="dash-section-title">Quick Actions</h2>
        <div className="dash-actions-grid">
          {quickActions.map((action) => (
            <a key={action.title} href={action.href} className="dash-action-card">
              <div className="dash-action-icon" style={{ background: action.bg, color: action.color }}>{action.icon}</div>
              <div>
                <p className="dash-action-title">{action.title}</p>
                <p className="dash-action-desc">{action.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}