"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import toast from "react-hot-toast";
import AdminLoader from "@/components/AdminLoader";
import { downloadOfficialInvoice, exportRecordsToFile } from "@/lib/invoiceGenerator";
import {
  FiBriefcase,
  FiCheckSquare,
  FiActivity,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiClock,
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiRefreshCw,
  FiPrinter,
  FiDownload,
} from "react-icons/fi";

const EMPTY_LEAD = {
  id: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  projectTitle: "",
  serviceType: "Custom Web Application",
  budget: "",
  notes: "",
  status: "NEW",
  assignedTo: "",
  progress: 20,
  milestones: {
    uiDesign: 100,
    frontend: 50,
    backend: 20,
    deployment: 0,
  },
  liveDemoUrl: "",
  invoiceAmount: "",
  invoiceStatus: "UNPAID",
};

const EMPTY_TASK = {
  title: "",
  description: "",
  assignedToEmail: "all",
  assignedToName: "All Team Members",
  priority: "HIGH",
  dueDate: "",
};

export default function AdminWorkspacePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data: session } = useSession();
  const isTeamMember = session?.user?.role === "TEAM_MEMBER";
  const isAdmin = !isTeamMember;

  const [activeTab, setActiveTab] = useState("leads"); // 'leads' | 'tasks' | 'activity'
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lead Modal
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [leadForm, setLeadForm] = useState(EMPTY_LEAD);
  const [savingLead, setSavingLead] = useState(false);

  // Task Modal
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState(EMPTY_TASK);
  const [savingTask, setSavingTask] = useState(false);

  const fetchWorkspace = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/workspace", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setLeads(data.leads || []);
      setTasks(data.tasks || []);
      setActivities(data.activities || []);
      setStaffUsers(data.staffUsers || []);
    } catch (err) {
      console.error("Workspace load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  const openAddLead = () => {
    setEditingLead(null);
    setLeadForm(EMPTY_LEAD);
    setLeadModalOpen(true);
  };

  const openEditLead = (lead) => {
    setEditingLead(lead);
    setLeadForm({
      id: lead.id,
      clientName: lead.clientName || "",
      clientEmail: lead.clientEmail || "",
      clientPhone: lead.clientPhone || "",
      projectTitle: lead.projectTitle || "",
      serviceType: lead.serviceType || "Custom Web Application",
      budget: lead.budget || "",
      notes: lead.notes || "",
      status: lead.status || "NEW",
      assignedTo: lead.assignedTo || "",
      progress: Number(lead.progress ?? 20),
      milestones: {
        uiDesign: Number(lead.milestones?.uiDesign ?? 100),
        frontend: Number(lead.milestones?.frontend ?? 40),
        backend: Number(lead.milestones?.backend ?? 20),
        deployment: Number(lead.milestones?.deployment ?? 0),
      },
      liveDemoUrl: lead.liveDemoUrl || "",
      invoiceAmount: lead.invoiceAmount || "",
      invoiceStatus: lead.invoiceStatus || "UNPAID",
    });
    setLeadModalOpen(true);
  };

  const handleSaveLead = async (e) => {
    e.preventDefault();
    setSavingLead(true);
    try {
      const res = await fetch("/api/admin/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editingLead ? "update_lead" : "create_lead",
          ...leadForm,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(
          editingLead
            ? "Client project & tracker updated!"
            : "Client lead & tracker created!"
        );
        setLeadModalOpen(false);
        fetchWorkspace();
      } else {
        toast.error(data.error || "Failed to save client project");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSavingLead(false);
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      const res = await fetch("/api/admin/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_lead", id }),
      });
      if (res.ok) {
        toast.success("Client lead removed");
        fetchWorkspace();
      }
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setSavingTask(true);
    try {
      const res = await fetch("/api/admin/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_task",
          ...taskForm,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Task assigned to team member!");
        setTaskModalOpen(false);
        setTaskForm(EMPTY_TASK);
        fetchWorkspace();
      } else {
        toast.error(data.error || "Failed to assign task");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSavingTask(false);
    }
  };

  const handleTaskStatus = async (id, status) => {
    try {
      const res = await fetch("/api/admin/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_task_status", id, status }),
      });
      if (res.ok) {
        toast.success(`Task marked as ${status.replace("_", " ")}`);
        fetchWorkspace();
      }
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch("/api/admin/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_task", id }),
      });
      if (res.ok) {
        toast.success("Task deleted");
        fetchWorkspace();
      }
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", paddingBottom: 40 }}>
      {/* Header */}
      <div
        className="admin-page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h1 className="admin-page-title">
            CRM Leads, Team Tasks &amp; Activity Log
          </h1>
          <p className="admin-page-subtitle">
            Manage client project progress &amp; invoices, team task assignments,
            and real-time staff activity history.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={fetchWorkspace}
            className="admin-btn admin-btn-secondary"
          >
            <FiRefreshCw size={14} /> Refresh
          </button>
          <button
            type="button"
            onClick={() =>
              exportRecordsToFile(
                activeTab === "leads"
                  ? leads
                  : activeTab === "tasks"
                  ? tasks
                  : activities,
                `merxodev_${activeTab}`,
                "csv"
              )
            }
            className="admin-btn admin-btn-secondary"
            title="Export current tab as CSV"
          >
            <FiDownload size={14} /> Export CSV
          </button>
          <button
            type="button"
            onClick={() =>
              exportRecordsToFile(
                activeTab === "leads"
                  ? leads
                  : activeTab === "tasks"
                  ? tasks
                  : activities,
                `merxodev_${activeTab}`,
                "json"
              )
            }
            className="admin-btn admin-btn-secondary"
            title="Export current tab as JSON"
          >
            <FiDownload size={14} /> JSON
          </button>
          <button
            type="button"
            onClick={openAddLead}
            className="admin-btn admin-btn-primary"
          >
            <FiPlus size={15} /> Add Client Project / Lead
          </button>
          {isAdmin && (
            <button
              type="button"
              onClick={() => setTaskModalOpen(true)}
              className="admin-btn admin-btn-primary"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                border: "none",
              }}
            >
              <FiCheckSquare size={15} /> Assign Team Task
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="content-filter-tabs" style={{ marginBottom: 24 }}>
        <button
          type="button"
          className={`content-filter-tab ${
            activeTab === "leads" ? "content-filter-tab-active" : ""
          }`}
          onClick={() => setActiveTab("leads")}
        >
          <FiBriefcase style={{ marginRight: 6 }} />
          CRM Leads &amp; Client Tracker ({leads.length})
        </button>
        <button
          type="button"
          className={`content-filter-tab ${
            activeTab === "tasks" ? "content-filter-tab-active" : ""
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          <FiCheckSquare style={{ marginRight: 6 }} />
          Team Tasks ({tasks.length})
        </button>
        <button
          type="button"
          className={`content-filter-tab ${
            activeTab === "activity" ? "content-filter-tab-active" : ""
          }`}
          onClick={() => setActiveTab("activity")}
        >
          <FiActivity style={{ marginRight: 6 }} />
          Team &amp; Admin Activity Log ({activities.length})
        </button>
      </div>

      {loading ? (
        <AdminLoader
          compact
          title="Loading Agency Workspace"
          label="Synchronizing CRM leads, tasks & activity logs"
        />
      ) : activeTab === "leads" ? (
        /* ── TAB 1: CRM LEADS & CLIENT PROJECT TRACKER ── */
        leads.length === 0 ? (
          <div className="admin-empty" style={{ padding: 60 }}>
            <FiBriefcase size={42} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
            <h3 style={{ color: "#f8fafc", margin: "0 0 6px" }}>
              No Client Projects or Leads Yet
            </h3>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>
              Add a client project here using their account email so they can track live progress (%) and invoice status in their /account portal!
            </p>
            <button onClick={openAddLead} className="admin-btn admin-btn-primary">
              <FiPlus size={14} /> Add First Client Project
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: 18,
            }}
          >
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="admin-card"
                style={{
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: "rgba(99, 102, 241, 0.15)",
                        color: "#a5b4fc",
                        fontFamily: "monospace",
                      }}
                    >
                      #{lead.id}
                    </span>

                    <div style={{ display: "flex", gap: 6 }}>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 999,
                          background:
                            lead.status === "COMPLETED"
                              ? "rgba(16, 185, 129, 0.15)"
                              : lead.status === "IN_PROGRESS"
                                ? "rgba(56, 189, 248, 0.15)"
                                : "rgba(245, 158, 11, 0.15)",
                          color:
                            lead.status === "COMPLETED"
                              ? "#34d399"
                              : lead.status === "IN_PROGRESS"
                                ? "#38bdf8"
                                : "#fbbf24",
                        }}
                      >
                        {lead.status}
                      </span>

                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 999,
                          background:
                            lead.invoiceStatus === "PAID"
                              ? "rgba(16, 185, 129, 0.18)"
                              : lead.invoiceStatus === "PARTIAL"
                                ? "rgba(245, 158, 11, 0.18)"
                                : "rgba(239, 68, 68, 0.15)",
                          color:
                            lead.invoiceStatus === "PAID"
                              ? "#34d399"
                              : lead.invoiceStatus === "PARTIAL"
                                ? "#fbbf24"
                                : "#f87171",
                        }}
                      >
                        Invoice: {lead.invoiceStatus}
                        {lead.invoiceAmount ? ` (${lead.invoiceAmount})` : ""}
                      </span>
                    </div>
                  </div>

                  <h3 style={{ color: isDark ? "#f8fafc" : "#0f172a", fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>
                    {lead.projectTitle}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: 12.5, margin: "0 0 10px" }}>
                    Client: <strong style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{lead.clientName}</strong> ({lead.clientEmail})
                    {lead.clientPhone ? ` • ${lead.clientPhone}` : ""}
                  </p>

                  {/* Overall Progress Bar */}
                  <div style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: isDark ? "#cbd5e1" : "#475569",
                        marginBottom: 4,
                      }}
                    >
                      <span>Overall Completion</span>
                      <span style={{ color: "#38bdf8" }}>{lead.progress}%</span>
                    </div>
                    <div
                      style={{
                        height: 7,
                        borderRadius: 999,
                        background: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${lead.progress}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #6366f1, #06b6d4)",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>

                  {/* Milestones Mini Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 6,
                      fontSize: 10.5,
                      color: isDark ? "#94a3b8" : "#475569",
                      fontWeight: 600,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: isDark ? "none" : "1px solid #e2e8f0",
                    }}
                  >
                    <div>
                      UI: <strong style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>{lead.milestones?.uiDesign ?? 0}%</strong>
                    </div>
                    <div>
                      Front: <strong style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>{lead.milestones?.frontend ?? 0}%</strong>
                    </div>
                    <div>
                      Back: <strong style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>{lead.milestones?.backend ?? 0}%</strong>
                    </div>
                    <div>
                      Live: <strong style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>{lead.milestones?.deployment ?? 0}%</strong>
                    </div>
                  </div>

                  {lead.assignedTo && (
                    <div style={{ fontSize: 11.5, color: isDark ? "#a5b4fc" : "#4338ca", marginTop: 8 }}>
                      Assigned Team Member: <strong>{lead.assignedTo}</strong>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid #e2e8f0",
                    paddingTop: 12,
                  }}
                >
                  {lead.liveDemoUrl ? (
                    <a
                      href={lead.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#38bdf8",
                        fontSize: 12,
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        textDecoration: "none",
                      }}
                    >
                      <FiExternalLink size={13} /> Demo Link
                    </a>
                  ) : (
                    <span style={{ fontSize: 11.5, color: isDark ? "#64748b" : "#475569" }}>
                      {lead.serviceType}
                    </span>
                  )}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => downloadOfficialInvoice(lead)}
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "6px 10px", fontSize: 12, color: "#fb923c" }}
                      title="Download Official PDF Invoice"
                    >
                      <FiPrinter size={12} /> Invoice PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditLead(lead)}
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "6px 12px", fontSize: 12 }}
                    >
                      <FiEdit2 size={12} /> Update Progress
                    </button>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleDeleteLead(lead.id)}
                        className="admin-btn admin-btn-danger"
                        style={{ padding: "6px 10px", fontSize: 12 }}
                      >
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : activeTab === "tasks" ? (
        /* ── TAB 2: TEAM MEMBER TASK BOARD ── */
        tasks.length === 0 ? (
          <div className="admin-empty" style={{ padding: 60 }}>
            <FiCheckSquare size={42} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
            <h3 style={{ color: isDark ? "#f8fafc" : "#0f172a", margin: "0 0 6px" }}>
              No Team Tasks Assigned Yet
            </h3>
            <p style={{ color: isDark ? "#94a3b8" : "#475569", fontSize: 13 }}>
              {isAdmin
                ? "Assign tasks to any team-member using the button above."
                : "You have no pending tasks assigned by Admin right now."}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tasks.map((t) => (
              <div
                key={t.id}
                className="admin-card"
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  borderColor:
                    t.status === "DONE"
                      ? "rgba(16, 185, 129, 0.3)"
                      : t.status === "IN_PROGRESS"
                        ? "rgba(56, 189, 248, 0.35)"
                        : isDark ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0",
                }}
              >
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: 999,
                        background:
                          t.priority === "HIGH"
                            ? "rgba(239, 68, 68, 0.18)"
                            : t.priority === "MEDIUM"
                              ? "rgba(245, 158, 11, 0.18)"
                              : "rgba(56, 189, 248, 0.15)",
                        color:
                          t.priority === "HIGH"
                            ? "#f87171"
                            : t.priority === "MEDIUM"
                              ? "#fbbf24"
                              : "#38bdf8",
                      }}
                    >
                      {t.priority} PRIORITY
                    </span>
                    <span style={{ fontSize: 12, color: isDark ? "#a5b4fc" : "#4338ca", fontWeight: 600 }}>
                      Assigned to: {t.assignedToName}
                    </span>
                    {t.dueDate && (
                      <span style={{ fontSize: 11.5, color: "#94a3b8" }}>
                        • Due: {t.dueDate}
                      </span>
                    )}
                  </div>
                  <h4
                    style={{
                      color: isDark ? "#f8fafc" : "#0f172a",
                      fontSize: 15,
                      fontWeight: 700,
                      margin: "2px 0",
                      textDecoration: t.status === "DONE" ? "line-through" : "none",
                    }}
                  >
                    {t.title}
                  </h4>
                  {t.description && (
                    <p style={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: 12.5, margin: "4px 0 0" }}>
                      {t.description}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {["TODO", "IN_PROGRESS", "DONE"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleTaskStatus(t.id, st)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        fontSize: 11.5,
                        fontWeight: 700,
                        cursor: "pointer",
                        border:
                          t.status === st
                            ? "1px solid rgba(16, 185, 129, 0.5)"
                            : isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #cbd5e1",
                        background:
                          t.status === st
                            ? st === "DONE"
                              ? "rgba(16, 185, 129, 0.25)"
                              : "rgba(99, 102, 241, 0.25)"
                            : isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                        color: t.status === st ? (isDark ? "#fff" : "#059669") : isDark ? "#94a3b8" : "#475569",
                      }}
                    >
                      {st === "TODO"
                        ? "To Do"
                        : st === "IN_PROGRESS"
                          ? "In Progress"
                          : "✓ Done"}
                    </button>
                  ))}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(t.id)}
                      className="admin-btn admin-btn-danger"
                      style={{ padding: "6px 10px" }}
                    >
                      <FiTrash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* ── TAB 3: TEAM & ADMIN ACTIVITY LOG ── */
        <div className="admin-card" style={{ padding: 20 }}>
          <h3 style={{ color: isDark ? "#f8fafc" : "#0f172a", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>
            Recent Staff &amp; Team Member Actions
          </h3>
          {activities.length === 0 ? (
            <p style={{ color: "#64748b", fontSize: 13 }}>
              No activity recorded yet. Actions like adding projects, replying to live chats, uploading images, or updating tasks will appear here automatically.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activities.map((act) => (
                <div
                  key={act.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "11px 14px",
                    borderRadius: 12,
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: 999,
                        background:
                          act.actorRole === "TEAM_MEMBER"
                            ? "rgba(245, 158, 11, 0.16)"
                            : "rgba(99, 102, 241, 0.18)",
                        color:
                          act.actorRole === "TEAM_MEMBER" ? "#fbbf24" : (isDark ? "#a5b4fc" : "#4338ca"),
                      }}
                    >
                      {act.actorName} ({act.actorRole === "TEAM_MEMBER" ? "team-member" : "admin"})
                    </span>
                    <span style={{ color: isDark ? "#e2e8f0" : "#1e293b", fontSize: 13 }}>
                      {act.details || `${act.action} — ${act.target}`}
                    </span>
                  </div>
                  <span style={{ fontSize: 11.5, color: "#64748b", whiteSpace: "nowrap" }}>
                    {act.createdAt
                      ? new Date(act.createdAt).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MODAL 1: ADD / EDIT CLIENT PROJECT & TRACKER ── */}
      {leadModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 640, padding: 26 }}>
            <h2 className="admin-modal-title" style={{ margin: "0 0 16px", fontSize: 19 }}>
              {editingLead
                ? `Update Client Project #${editingLead.id}`
                : "Add Client Project / Lead Tracker"}
            </h2>
            <form onSubmit={handleSaveLead} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="admin-label">Client Name *</label>
                  <input
                    type="text"
                    className="admin-input"
                    required
                    value={leadForm.clientName}
                    onChange={(e) => setLeadForm({ ...leadForm, clientName: e.target.value })}
                    placeholder="e.g. Rahim Uddin"
                  />
                </div>
                <div>
                  <label className="admin-label">Client Login Email * (Syncs with /account)</label>
                  <input
                    type="email"
                    className="admin-input"
                    required
                    value={leadForm.clientEmail}
                    onChange={(e) => setLeadForm({ ...leadForm, clientEmail: e.target.value })}
                    placeholder="client@example.com"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
                <div>
                  <label className="admin-label">Project Title *</label>
                  <input
                    type="text"
                    className="admin-input"
                    required
                    value={leadForm.projectTitle}
                    onChange={(e) => setLeadForm({ ...leadForm, projectTitle: e.target.value })}
                    placeholder="e.g. Full-Stack E-Commerce Platform"
                  />
                </div>
                <div>
                  <label className="admin-label">Client WhatsApp / Phone</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={leadForm.clientPhone}
                    onChange={(e) => setLeadForm({ ...leadForm, clientPhone: e.target.value })}
                    placeholder="+8801..."
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label className="admin-label">Pipeline Status</label>
                  <select
                    className="admin-input"
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({ ...leadForm, status: e.target.value })}
                  >
                    <option value="NEW">NEW LEAD</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Overall Progress ({leadForm.progress}%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="admin-input"
                    value={leadForm.progress}
                    onChange={(e) => setLeadForm({ ...leadForm, progress: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="admin-label">Assign Team Member</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={leadForm.assignedTo}
                    onChange={(e) => setLeadForm({ ...leadForm, assignedTo: e.target.value })}
                    placeholder="e.g. Nafisa Akter"
                  />
                </div>
              </div>

              {/* Milestone Percentages */}
              <div>
                <label className="admin-label">Milestone Breakdown (%) — Shown in Client Portal</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  <div>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>UI Design %</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="admin-input"
                      value={leadForm.milestones.uiDesign}
                      onChange={(e) =>
                        setLeadForm({
                          ...leadForm,
                          milestones: { ...leadForm.milestones, uiDesign: Number(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>Frontend %</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="admin-input"
                      value={leadForm.milestones.frontend}
                      onChange={(e) =>
                        setLeadForm({
                          ...leadForm,
                          milestones: { ...leadForm.milestones, frontend: Number(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>Backend %</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="admin-input"
                      value={leadForm.milestones.backend}
                      onChange={(e) =>
                        setLeadForm({
                          ...leadForm,
                          milestones: { ...leadForm.milestones, backend: Number(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>Deployment %</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="admin-input"
                      value={leadForm.milestones.deployment}
                      onChange={(e) =>
                        setLeadForm({
                          ...leadForm,
                          milestones: { ...leadForm.milestones, deployment: Number(e.target.value) },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label className="admin-label">Live Demo Link (Optional)</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={leadForm.liveDemoUrl}
                    onChange={(e) => setLeadForm({ ...leadForm, liveDemoUrl: e.target.value })}
                    placeholder="https://demo.merxodev.com"
                  />
                </div>
                <div>
                  <label className="admin-label">Invoice Amount</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={leadForm.invoiceAmount}
                    onChange={(e) => setLeadForm({ ...leadForm, invoiceAmount: e.target.value })}
                    placeholder="e.g. $850 or ৳35,000"
                  />
                </div>
                <div>
                  <label className="admin-label">Invoice Status</label>
                  <select
                    className="admin-input"
                    value={leadForm.invoiceStatus}
                    onChange={(e) => setLeadForm({ ...leadForm, invoiceStatus: e.target.value })}
                  >
                    <option value="UNPAID">UNPAID</option>
                    <option value="PARTIAL">PARTIAL PAID</option>
                    <option value="PAID">PAID IN FULL</option>
                  </select>
                </div>
              </div>

              <div className="admin-modal-actions" style={{ marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setLeadModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={savingLead} className="admin-btn admin-btn-primary">
                  {savingLead ? "Saving..." : editingLead ? "Save Changes" : "Create Client Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: ASSIGN TEAM TASK (Admin Only) ── */}
      {taskModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 520, padding: 26 }}>
            <h2 className="admin-modal-title" style={{ margin: "0 0 16px", fontSize: 19 }}>
              Assign Task to Team Member
            </h2>
            <form onSubmit={handleCreateTask} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="admin-label">Task Title *</label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  placeholder="e.g. Upload 2 new E-Commerce portfolio projects"
                />
              </div>
              <div>
                <label className="admin-label">Assign To Team Member</label>
                <select
                  className="admin-input"
                  value={taskForm.assignedToEmail}
                  onChange={(e) => {
                    const email = e.target.value;
                    const found = staffUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
                    setTaskForm({
                      ...taskForm,
                      assignedToEmail: email,
                      assignedToName:
                        email === "all"
                          ? "All Team Members"
                          : found?.name || email,
                    });
                  }}
                >
                  <option value="all">All Team Members</option>
                  {staffUsers.map((u) => (
                    <option key={u.id} value={u.email.toLowerCase()}>
                      {u.name} ({u.email} • {u.role === "TEAM_MEMBER" ? "team-member" : "admin"})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="admin-label">Priority</label>
                  <select
                    className="admin-input"
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Due Date (Optional)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    placeholder="e.g. Today 8 PM"
                  />
                </div>
              </div>
              <div>
                <label className="admin-label">Instructions / Notes</label>
                <textarea
                  rows={3}
                  className="admin-input admin-textarea"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  placeholder="Detailed instructions for the team member..."
                />
              </div>
              <div className="admin-modal-actions" style={{ marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setTaskModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={savingTask} className="admin-btn admin-btn-primary">
                  {savingTask ? "Assigning..." : "Assign Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

