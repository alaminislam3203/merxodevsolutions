"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import "./admin.css";

function AdminSidebar() {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      href: "/admin", label: "Dashboard", exact: true, icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      href: "/admin/projects", label: "Projects", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      href: "/admin/images", label: "Images", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
        </svg>
      )
    },
    {
      href: "/admin/content", label: "Content", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      href: "/admin/banners", label: "Banners", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="8" cy="12" r="1.5" />
          <polyline points="20 14 16 10 10 16" />
        </svg>
      )
    },
    {
      href: "/admin/reviews", label: "Reviews", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
  ];


  const isActive = (item) => item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/709832" });
  };

  return (
    <aside className={"admin-sidebar" + (collapsed ? " admin-sidebar-collapsed" : "")}>
      <div className="admin-sidebar-brand">
        <div className="admin-sidebar-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        {!collapsed && (
          <div className="admin-sidebar-brand-text">
            <span className="admin-sidebar-brand-name">MerxoDevSolutions</span>
            <span className="admin-sidebar-brand-sub">Admin</span>
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
          <Link key={item.href} href={item.href} title={collapsed ? item.label : ""}
            className={"admin-sidebar-item" + (isActive(item) ? " admin-sidebar-item-active" : "")}>
            <span className="admin-sidebar-item-icon">{item.icon}</span>
            {!collapsed && <span className="admin-sidebar-item-label">{item.label}</span>}
            {!collapsed && isActive(item) && <span className="admin-sidebar-active-dot"></span>}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <button onClick={handleSignOut} disabled={signingOut} className="admin-sidebar-signout" title={collapsed ? "Sign out" : ""}>
          {signingOut
            ? <div className="admin-spinner-sm"></div>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          }
          {!collapsed && <span>{signingOut ? "Signing out..." : "Sign Out"}</span>}
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">{children}</main>
      </div>
    </SessionProvider>
  );
}