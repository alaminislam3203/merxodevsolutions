"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession, SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "./admin.css";

function AdminSidebar() {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      href: "/709832",
      label: "Dashboard",
      exact: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      href: "/709832/projects",
      label: "Projects",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      href: "/709832/images",
      label: "Images",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      href: "/709832/content",
      label: "Content",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      href: "/709832/banners",
      label: "Banners",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="8" cy="12" r="1.5" />
          <polyline points="20 14 16 10 10 16" />
        </svg>
      ),
    },
    {
      href: "/709832/showcase",
      label: "Promo Grid",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      href: "/709832/team",
      label: "Team",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  const isActive = (item) => (item.exact ? pathname === item.href : pathname.startsWith(item.href));

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/709832" });
  };

  return (
    <aside className={"admin-sidebar" + (collapsed ? " admin-sidebar-collapsed" : "")}>
      <div className="admin-sidebar-brand">
        <div
          className="admin-sidebar-logo"
          style={{
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img src="/favicon.png" alt="MerxoDev Favicon" style={{ width: 26, height: 26, objectFit: "contain" }} />
        </div>
        {!collapsed && (
          <div className="admin-sidebar-brand-text" style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo.png" alt="MerxoDev Solutions" style={{ height: 26, maxWidth: 130, objectFit: "contain" }} />
          </div>
        )}
        <button className="admin-sidebar-collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? <polyline points="9 18 15 12 9 6" /> : <polyline points="15 18 9 12 15 6" />}
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
            className={"admin-sidebar-item" + (isActive(item) ? " admin-sidebar-item-active" : "")}
          >
            <span className="admin-sidebar-item-icon">{item.icon}</span>
            {!collapsed && <span className="admin-sidebar-item-label">{item.label}</span>}
            {!collapsed && isActive(item) && <span className="admin-sidebar-active-dot"></span>}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <button onClick={handleSignOut} disabled={signingOut} className="admin-sidebar-signout" title={collapsed ? "Sign out" : ""}>
          {signingOut ? (
            <div className="admin-spinner-sm"></div>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          )}
          {!collapsed && <span>{signingOut ? "Signing out..." : "Sign Out"}</span>}
        </button>
      </div>
    </aside>
  );
}

function AdminLayoutShell({ children }) {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginRoot = pathname === "/709832";

  useEffect(() => {
    if (status === "unauthenticated" && !isLoginRoot) {
      router.replace("/709832");
    }
  }, [status, isLoginRoot, router]);

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
              boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 15px rgba(99, 102, 241, 0.15)",
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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080c18", color: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <div className="admin-spinner" style={{ margin: "0 auto 16px" }}></div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>Loading admin panel...</p>
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
            boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 15px rgba(99, 102, 241, 0.15)",
          },
        }}
      />
      <AdminSidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </SessionProvider>
  );
}
