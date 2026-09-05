"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./login.css";

// ─── Dashboard Component (Shown when Authenticated) ──────────────
function DashboardView() {
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
        const [projects, images, content] = await Promise.all([
          pr.json(),
          im.json(),
          co.json(),
        ]);
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
    {
      label: "Total Projects",
      value: stats.projects,
      color: "#6366f1",
      bg: "rgba(99,102,241,0.1)",
      href: "/709832/projects",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      label: "Media Files",
      value: stats.images,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.1)",
      href: "/709832/images",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      label: "Content Blocks",
      value: stats.content,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.1)",
      href: "/709832/content",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
  ];

  const quickActions = [
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
      desc: "Add images to your media library",
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
    {
      href: "/709832/content",
      title: "Edit Content",
      desc: "Update website texts and descriptions",
      color: "#22d3ee",
      bg: "rgba(6,182,212,0.12)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
    },
    {
      href: "/709832/content",
      title: "Google Meet Link",
      desc: "Update your live discovery call meeting link",
      color: "#10b981",
      bg: "rgba(16,182,129,0.12)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22">
          <path fill="#ea4335" d="M166 106v90H76" />
          <path fill="#ffba00" d="M166 106v90h120v62l90-73v-49q0-30-30-30" />
          <path fill="#00ac47" d="M346 406q30 0 30-30V327l-90-71v60H164v90m212-77 42 34c9 7 18 7 18-7V156c0-14-9-14-18-7l-42 34" />
          <path fill="#0066da" d="M76 314v62q0 30 30 30h60v-92" />
          <path fill="#2684fc" d="M76 196h90v120H76" />
          <path fill="#00832d" d="M286 256l90-73v146" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here is an overview of your workspace.</p>
      </div>

      <div className="dash-stats-grid">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: card.bg, color: card.color }}>
              {card.icon}
            </div>
            <div className="dash-stat-info">
              {loading ? (
                <div className="dash-stat-skeleton"></div>
              ) : (
                <span className="dash-stat-value" style={{ color: card.color }}>
                  {card.value}
                </span>
              )}
              <span className="dash-stat-label">{card.label}</span>
            </div>
            <div className="dash-stat-arrow" style={{ color: card.color }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

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
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="login-screen">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

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

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to manage your workspace</p>

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

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Sign In"}
          </button>
        </form>
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
    if (session?.user?.role !== "ADMIN") {
      return (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#ef4444" }}>Access Denied</h2>
          <p style={{ color: "#9ca3af", marginBottom: "20px" }}>You do not have administrative privileges to access this area.</p>
          <a href="/" style={{ padding: "10px 20px", background: "#6366f1", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Return to Home</a>
        </div>
      );
    }
    return <DashboardView />;
  }

  return <LoginView />;
}