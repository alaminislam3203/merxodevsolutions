"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { showToast, confirmToast } from "@/lib/toast";
import AdminLoader from "@/components/AdminLoader";
import { exportRecordsToFile } from "@/lib/invoiceGenerator";
import {
  FiUsers,
  FiShield,
  FiUserCheck,
  FiUserX,
  FiSearch,
  FiRefreshCw,
  FiPlus,
  FiKey,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiCopy,
  FiEdit2,
  FiStar,
  FiLock,
  FiAlertTriangle,
} from "react-icons/fi";

export default function UsersManagementPage() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    twoFactorCount: 0,
    activeCount: 0,
    suspendedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createData, setCreateData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [createLoading, setCreateLoading] = useState(false);

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetUser, setDeleteTargetUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (roleFilter !== "ALL") params.set("role", roleFilter);
      if (statusFilter !== "ALL") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
        setStats(data.stats || {});
      } else {
        showToast.error(data.error || "Failed to load users");
      }
    } catch (err) {
      showToast.error("Network error while loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, roleFilter, statusFilter]);

  // Change user role between USER, TEAM_MEMBER (team-member), and ADMIN
  const handleChangeRole = async (user, nextRole) => {
    if (
      user.isMainAdmin ||
      user.email?.toLowerCase() === "merxodevsolutions@gmail.com"
    ) {
      toast.error("Main Admin role cannot be modified.");
      return;
    }

    const newRole = nextRole || (user.role === "ADMIN" ? "USER" : "ADMIN");
    if (newRole === user.role) return;

    const roleDisplay =
      newRole === "TEAM_MEMBER"
        ? "team-member"
        : newRole === "ADMIN"
          ? "admin"
          : "user";

    const confirmMsg = `Are you sure you want to change ${user.name}'s role to "${roleDisplay}"?`;
    const confirmed = await confirmToast(confirmMsg, {
      confirmText: `Set as ${roleDisplay}`,
      cancelText: "Cancel",
      danger: false,
    });
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || `Role changed to ${roleDisplay}`);
        fetchUsers();
      } else {
        toast.error(data.error || "Failed to update role");
      }
    } catch (_) {
      toast.error("Failed to update user role");
    }
  };

  // Toggle isActive status
  const handleToggleStatus = async (user) => {
    if (
      user.isMainAdmin ||
      user.email?.toLowerCase() === "merxodevsolutions@gmail.com"
    ) {
      showToast.lock("Main Admin account cannot be suspended.");
      return;
    }

    const nextStatus = user.isActive === false; // toggle to active
    const actionLabel = nextStatus ? "activate" : "suspend";
    const confirmed = await confirmToast(
      `Are you sure you want to ${actionLabel} account for ${user.email}?`,
      {
        confirmText: nextStatus ? "Activate Account" : "Suspend Account",
        cancelText: "Cancel",
        danger: !nextStatus,
      },
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(
          `User ${nextStatus ? "activated" : "suspended"} successfully`,
        );
        fetchUsers();
      } else {
        toast.error(data.error || "Failed to update status");
      }
    } catch (_) {
      toast.error("Failed to update status");
    }
  };

  // Create new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!createData.name || !createData.email || !createData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setCreateLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "User created successfully!");
        setCreateModalOpen(false);
        setCreateData({ name: "", email: "", password: "", role: "USER" });
        fetchUsers();
      } else {
        toast.error(data.error || "Failed to create user");
      }
    } catch (_) {
      toast.error("Failed to create user");
    } finally {
      setCreateLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (
      resetTargetUser?.isMainAdmin ||
      resetTargetUser?.email?.toLowerCase() === "merxodevsolutions@gmail.com"
    ) {
      toast.error("Main Admin password cannot be reset from this panel.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setResetLoading(true);
    try {
      const res = await fetch(
        `/api/admin/users/${resetTargetUser.id}/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Password reset successfully!");
        setResetModalOpen(false);
        setNewPassword("");
      } else {
        toast.error(data.error || "Failed to reset password");
      }
    } catch (_) {
      toast.error("Failed to reset password");
    } finally {
      setResetLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!deleteTargetUser) return;
    if (
      deleteTargetUser?.isMainAdmin ||
      deleteTargetUser?.email?.toLowerCase() === "merxodevsolutions@gmail.com"
    ) {
      toast.error("Main Admin account cannot be deleted.");
      return;
    }
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteTargetUser.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "User deleted successfully");
        setDeleteModalOpen(false);
        setDeleteTargetUser(null);
        fetchUsers();
      } else {
        toast.error(data.error || "Failed to delete user");
      }
    } catch (_) {
      toast.error("Failed to delete user");
    } finally {
      setDeleteLoading(false);
    }
  };

  const copyEmail = (email) => {
    navigator.clipboard?.writeText(email);
    toast.success("Email copied to clipboard!");
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Top Header */}
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
            <FiUsers style={{ color: "#6366f1" }} /> User Management
          </h1>
          <p className="admin-page-subtitle">
            Manage client accounts, assign administrator roles, monitor 2FA
            status, and control site access.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={fetchUsers}
            className="admin-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.06)",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "10px 16px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#ffffff",
              border: "none",
              padding: "10px 18px",
              borderRadius: 10,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            }}
          >
            <FiPlus size={18} /> Add User
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            <FiUsers />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f8fafc" }}>
              {stats.total || 0}
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>Total Accounts</div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(245, 158, 11, 0.15)",
              color: "#fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            <FiShield />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f8fafc" }}>
              {stats.admins || 0}
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>Administrators</div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(6, 182, 212, 0.15)",
              color: "#22d3ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            <FiUserCheck />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f8fafc" }}>
              {stats.teamMembers || 0}
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>Team Members</div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            <FiLock />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f8fafc" }}>
              {stats.twoFactorCount || 0}
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>2FA Protected</div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(239, 68, 68, 0.15)",
              color: "#f87171",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            <FiUserX />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f8fafc" }}>
              {stats.suspendedCount || 0}
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>Suspended</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 14,
          padding: 16,
          marginBottom: 20,
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Search input */}
        <div style={{ position: "relative", minWidth: 260, flex: "1 1 280px" }}>
          <FiSearch
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
            }}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 10,
              padding: "10px 14px 10px 38px",
              color: "#ffffff",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Filter buttons */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              padding: 3,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { id: "ALL", label: "All Roles" },
              { id: "USER", label: "Users" },
              { id: "TEAM_MEMBER", label: "Team Members" },
              { id: "ADMIN", label: "Admins" },
            ].map((rItem) => (
              <button
                key={rItem.id}
                onClick={() => setRoleFilter(rItem.id)}
                style={{
                  background:
                    roleFilter === rItem.id ? "#6366f1" : "transparent",
                  color: roleFilter === rItem.id ? "#fff" : "#94a3b8",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {rItem.label}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              padding: 3,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { id: "ALL", label: "All Status" },
              { id: "ACTIVE", label: "Active" },
              { id: "SUSPENDED", label: "Suspended" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                style={{
                  background:
                    statusFilter === st.id ? "#3b82f6" : "transparent",
                  color: statusFilter === st.id ? "#fff" : "#94a3b8",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {st.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => exportRecordsToFile(users, "merxodev_users", "csv")}
            style={{
              background: "rgba(16, 185, 129, 0.14)",
              color: "#34d399",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "7px 14px",
              borderRadius: 10,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ⬇ Export CSV
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.025)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <th
                  style={{
                    padding: "14px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                  }}
                >
                  User
                </th>
                <th
                  style={{
                    padding: "14px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                  }}
                >
                  Role
                </th>
                <th
                  style={{
                    padding: "14px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                  }}
                >
                  Security
                </th>
                <th
                  style={{
                    padding: "14px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "14px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                  }}
                >
                  Reviews
                </th>
                <th
                  style={{
                    padding: "14px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                  }}
                >
                  Joined Date
                </th>
                <th
                  style={{
                    padding: "14px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "20px 0",
                    }}
                  >
                    <AdminLoader
                      compact
                      title="Loading Users & Roles"
                      label="Fetching registered accounts & permissions"
                    />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "50px 0",
                      color: "#94a3b8",
                    }}
                  >
                    No users found matching current criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isMainAdmin =
                    user.isMainAdmin ||
                    user.email?.toLowerCase() === "merxodevsolutions@gmail.com";
                  const isAdmin = isMainAdmin || user.role === "ADMIN";
                  const isActive = isMainAdmin ? true : user.isActive !== false;
                  const is2FA = Boolean(user.twoFactorEnabled);
                  const initials = user.name
                    ? user.name.slice(0, 2).toUpperCase()
                    : "MD";

                  return (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        background: isMainAdmin
                          ? "rgba(245, 158, 11, 0.03)"
                          : "transparent",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isMainAdmin
                          ? "rgba(245, 158, 11, 0.06)"
                          : "rgba(255,255,255,0.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isMainAdmin
                          ? "rgba(245, 158, 11, 0.03)"
                          : "transparent";
                      }}
                    >
                      {/* User Avatar + Name + Email */}
                      <td style={{ padding: "14px 18px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: isMainAdmin
                                  ? "2px solid #f59e0b"
                                  : "none",
                                boxShadow: isMainAdmin
                                  ? "0 0 10px rgba(245, 158, 11, 0.4)"
                                  : "none",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: isMainAdmin
                                  ? "linear-gradient(135deg, #f59e0b, #b45309)"
                                  : isAdmin
                                    ? "linear-gradient(135deg, #f59e0b, #d97706)"
                                    : "linear-gradient(135deg, #6366f1, #06b6d4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#ffffff",
                                fontWeight: 800,
                                fontSize: isMainAdmin ? 16 : 13,
                                border: isMainAdmin
                                  ? "2px solid #fbbf24"
                                  : "none",
                                boxShadow: isMainAdmin
                                  ? "0 0 10px rgba(245, 158, 11, 0.4)"
                                  : "none",
                              }}
                            >
                              {isMainAdmin ? "👑" : initials}
                            </div>
                          )}
                          <div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: isMainAdmin ? "#fbbf24" : "#f8fafc",
                                  fontSize: 14,
                                }}
                              >
                                {user.name}
                              </span>
                              {isMainAdmin && (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 3,
                                    fontSize: 10,
                                    fontWeight: 800,
                                    color: "#f59e0b",
                                    background: "rgba(245, 158, 11, 0.15)",
                                    border:
                                      "1px solid rgba(245, 158, 11, 0.35)",
                                    padding: "1px 6px",
                                    borderRadius: 4,
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  OWNER
                                </span>
                              )}
                            </div>
                            <div
                              onClick={() => copyEmail(user.email)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                color: isMainAdmin ? "#fbbf24" : "#94a3b8",
                                fontSize: 12,
                                cursor: "pointer",
                                opacity: isMainAdmin ? 0.9 : 1,
                              }}
                              title="Click to copy email"
                            >
                              {user.email}
                              <FiCopy size={11} style={{ opacity: 0.6 }} />
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td style={{ padding: "14px 18px" }}>
                        {isMainAdmin ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "5px 12px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 800,
                              background:
                                "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.2))",
                              color: "#fbbf24",
                              border: "1px solid rgba(245, 158, 11, 0.5)",
                              boxShadow: "0 0 12px rgba(245, 158, 11, 0.25)",
                            }}
                          >
                            Owner
                          </span>
                        ) : user.role === "TEAM_MEMBER" ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 700,
                              background: "rgba(6, 182, 212, 0.15)",
                              color: "#22d3ee",
                              border: "1px solid rgba(6, 182, 212, 0.35)",
                            }}
                          >
                            <FiUserCheck size={12} />
                            Team
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 700,
                              background: isAdmin
                                ? "rgba(245, 158, 11, 0.15)"
                                : "rgba(99, 102, 241, 0.15)",
                              color: isAdmin ? "#fbbf24" : "#818cf8",
                              border: isAdmin
                                ? "1px solid rgba(245,158,11,0.3)"
                                : "1px solid rgba(99,102,241,0.3)",
                            }}
                          >
                            {isAdmin ? (
                              <FiShield size={12} />
                            ) : (
                              <FiUsers size={12} />
                            )}
                            {isAdmin ? "Admin" : "User"}
                          </span>
                        )}
                      </td>

                      {/* 2FA Security */}
                      <td style={{ padding: "14px 18px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            background: is2FA
                              ? "rgba(16, 185, 129, 0.15)"
                              : "rgba(148, 163, 184, 0.1)",
                            color: is2FA ? "#34d399" : "#94a3b8",
                            border: is2FA
                              ? "1px solid rgba(16,185,129,0.3)"
                              : "1px solid rgba(148,163,184,0.2)",
                          }}
                        >
                          <FiLock size={11} />
                          {is2FA ? "2FA On" : "2FA Off"}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: "14px 18px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            background: isMainAdmin
                              ? "rgba(16, 185, 129, 0.2)"
                              : isActive
                                ? "rgba(34, 197, 94, 0.12)"
                                : "rgba(239, 68, 68, 0.15)",
                            color: isMainAdmin
                              ? "#34d399"
                              : isActive
                                ? "#4ade80"
                                : "#f87171",
                            border: isMainAdmin
                              ? "1px solid rgba(16, 185, 129, 0.35)"
                              : "none",
                          }}
                        >
                          {isMainAdmin ? (
                            <FiCheckCircle size={12} />
                          ) : isActive ? (
                            <FiCheckCircle size={12} />
                          ) : (
                            <FiXCircle size={12} />
                          )}
                          {isMainAdmin
                            ? "Permanent"
                            : isActive
                              ? "Active"
                              : "Suspended"}
                        </span>
                      </td>

                      {/* Reviews Count */}
                      <td style={{ padding: "14px 18px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 13,
                            color: "#cbd5e1",
                          }}
                        >
                          <FiStar size={13} style={{ color: "#fbbf24" }} />
                          {user._count?.reviews || 0} reviews
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td
                        style={{
                          padding: "14px 18px",
                          color: "#94a3b8",
                          fontSize: 13,
                        }}
                      >
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "-"}
                      </td>

                      {/* Action Buttons */}
                      <td style={{ padding: "14px 18px", textAlign: "right" }}>
                        {isMainAdmin ? (
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "7px 14px",
                              background: "rgba(245, 158, 11, 0.08)",
                              border: "1px solid rgba(245, 158, 11, 0.25)",
                              borderRadius: 8,
                              color: "#fbbf24",
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: "not-allowed",
                              pointerEvents: "none",
                              userSelect: "none",
                            }}
                            title="Owner account is permanently locked and cannot be modified or deleted."
                          >
                            <FiLock size={13} />
                            <span>Protected Account</span>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              gap: 6,
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            {/* Select Role (user / team-member / admin) */}
                            <select
                              value={user.role || "USER"}
                              onChange={(e) =>
                                handleChangeRole(user, e.target.value)
                              }
                              title="Change Account Role"
                              style={{
                                background: "#0f172a",
                                border: "1px solid rgba(255,255,255,0.14)",
                                color: "#e2e8f0",
                                padding: "6px 10px",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 600,
                                outline: "none",
                              }}
                            >
                              <option value="USER">Role: User</option>
                              <option value="TEAM_MEMBER">Role: Team</option>
                              <option value="ADMIN">Role: Admin</option>
                            </select>

                            {/* Suspend / Activate */}
                            <button
                              onClick={() => handleToggleStatus(user)}
                              title={
                                isActive
                                  ? "Suspend Account"
                                  : "Activate Account"
                              }
                              style={{
                                background: isActive
                                  ? "rgba(239, 68, 68, 0.1)"
                                  : "rgba(34, 197, 94, 0.1)",
                                border: isActive
                                  ? "1px solid rgba(239, 68, 68, 0.25)"
                                  : "1px solid rgba(34, 197, 94, 0.25)",
                                color: isActive ? "#f87171" : "#4ade80",
                                padding: "6px 10px",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              {isActive ? "Suspend" : "Activate"}
                            </button>

                            {/* Reset Password */}
                            <button
                              onClick={() => {
                                setResetTargetUser(user);
                                setResetModalOpen(true);
                              }}
                              title="Reset Password"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#94a3b8",
                                padding: "6px 9px",
                                borderRadius: 8,
                                cursor: "pointer",
                              }}
                            >
                              <FiKey size={14} />
                            </button>

                            {/* Delete User */}
                            {!user.isDedicatedAdminModel && (
                              <button
                                onClick={() => {
                                  setDeleteTargetUser(user);
                                  setDeleteModalOpen(true);
                                }}
                                title="Delete Account"
                                style={{
                                  background: "rgba(239,68,68,0.1)",
                                  border: "1px solid rgba(239,68,68,0.2)",
                                  color: "#f87171",
                                  padding: "6px 9px",
                                  borderRadius: 8,
                                  cursor: "pointer",
                                }}
                              >
                                <FiTrash2 size={14} />
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── ADD USER MODAL ────────────────────────────────────── */}
      {createModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            style={{
              background: "#0c1328",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: 18,
              maxWidth: 440,
              width: "100%",
              padding: 24,
              boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Add New User
              </h2>
              <button
                onClick={() => setCreateModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser}>
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#94a3b8",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={createData.name}
                  onChange={(e) =>
                    setCreateData({ ...createData, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#fff",
                    outline: "none",
                  }}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#94a3b8",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={createData.email}
                  onChange={(e) =>
                    setCreateData({ ...createData, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#fff",
                    outline: "none",
                  }}
                  placeholder="user@example.com"
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#94a3b8",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  Temporary Password
                </label>
                <input
                  type="password"
                  required
                  value={createData.password}
                  onChange={(e) =>
                    setCreateData({ ...createData, password: e.target.value })
                  }
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#fff",
                    outline: "none",
                  }}
                  placeholder="At least 6 characters"
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#94a3b8",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  Account Role
                </label>
                <select
                  value={createData.role}
                  onChange={(e) =>
                    setCreateData({ ...createData, role: e.target.value })
                  }
                  style={{
                    width: "100%",
                    background: "#0a1024",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#fff",
                    outline: "none",
                  }}
                >
                  <option value="USER">Client (user)</option>
                  <option value="TEAM_MEMBER">Team Member (team-member)</option>
                  <option value="ADMIN">Administrator (admin)</option>
                </select>
              </div>

              <div
                style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#cbd5e1",
                    padding: "10px 16px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {createLoading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── RESET PASSWORD MODAL ────────────────────────────────── */}
      {resetModalOpen && resetTargetUser && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            style={{
              background: "#0c1328",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: 18,
              maxWidth: 420,
              width: "100%",
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <FiKey style={{ color: "#fbbf24" }} /> Reset Password
              </h2>
              <button
                onClick={() => setResetModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 18 }}>
              Setting a new password for{" "}
              <strong>{resetTargetUser.email}</strong>.
            </p>

            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#cbd5e1",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter at least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  onClick={() => setResetModalOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#cbd5e1",
                    padding: "10px 16px",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    border: "none",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {resetLoading ? "Updating..." : "Set New Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION MODAL ──────────────────────────── */}
      {deleteModalOpen && deleteTargetUser && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            style={{
              background: "#0c1328",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 18,
              maxWidth: 420,
              width: "100%",
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(239, 68, 68, 0.15)",
                  color: "#f87171",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                <FiAlertTriangle />
              </div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Confirm Delete
              </h2>
            </div>

            <p
              style={{
                fontSize: 14,
                color: "#cbd5e1",
                lineHeight: 1.5,
                marginBottom: 20,
              }}
            >
              Are you sure you want to permanently delete the account for{" "}
              <strong>{deleteTargetUser.email}</strong>? This action cannot be
              undone.
            </p>

            <div
              style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
            >
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#cbd5e1",
                  padding: "10px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={deleteLoading}
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  border: "none",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {deleteLoading ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
