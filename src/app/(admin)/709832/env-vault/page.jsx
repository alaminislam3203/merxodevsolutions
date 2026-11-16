"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { showToast, confirmToast } from "@/lib/toast";
import {
  FiLock,
  FiFileText,
  FiDownload,
  FiCopy,
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiCheck,
  FiUploadCloud,
  FiShield,
  FiServer,
  FiCode,
  FiRefreshCw,
  FiX,
  FiExternalLink,
} from "react-icons/fi";

const ENVIRONMENT_CONFIG = {
  production: { label: "Production", color: "#10b981", bg: "rgba(16, 185, 129, 0.12)", border: "rgba(16, 185, 129, 0.25)" },
  development: { label: "Development", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.12)", border: "rgba(56, 189, 248, 0.25)" },
  staging: { label: "Staging", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)", border: "rgba(245, 158, 11, 0.25)" },
  test: { label: "Testing", color: "#a855f7", bg: "rgba(168, 85, 247, 0.12)", border: "rgba(168, 85, 247, 0.25)" },
};

export default function EnvVaultPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [envFilter, setEnvFilter] = useState("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [previewTab, setPreviewTab] = useState("env"); // "env" | "example"
  const [isMasked, setIsMasked] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    projectName: "",
    environment: "production",
    fileName: ".env",
    content: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch all env items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/env-vault");
      if (!res.ok) throw new Error("Failed to load environment records");
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch (err) {
      showToast.error(err.message || "Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Filtered Items
  const filteredItems = items.filter((item) => {
    const matchSearch = item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchEnv = envFilter === "all" || item.environment === envFilter;
    return matchSearch && matchEnv;
  });

  // Calculate statistics
  const stats = {
    total: items.length,
    production: items.filter((i) => i.environment === "production").length,
    development: items.filter((i) => i.environment === "development").length,
    totalKeys: items.reduce((acc, curr) => acc + (curr.keyCount || 0), 0),
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      projectName: "",
      environment: "production",
      fileName: ".env",
      content: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = async (item) => {
    try {
      showToast.loading("Fetching environment data...", { id: "edit-fetch" });
      const res = await fetch(`/api/admin/env-vault/${item.id}`);
      const data = await res.json();
      showToast.dismiss("edit-fetch");

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load data");
      }

      setEditingItem(data.item);
      setFormData({
        projectName: data.item.projectName,
        environment: data.item.environment,
        fileName: data.item.fileName,
        content: data.item.content,
        description: data.item.description || "",
      });
      setIsModalOpen(true);
    } catch (err) {
      showToast.error(err.message);
    }
  };

  // Open Preview Modal
  const handleOpenPreview = async (item, initialTab = "env") => {
    try {
      showToast.loading("Loading details...", { id: "preview-fetch" });
      const res = await fetch(`/api/admin/env-vault/${item.id}`);
      const data = await res.json();
      showToast.dismiss("preview-fetch");

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load data");
      }

      setPreviewItem(data.item);
      setPreviewTab(initialTab);
      setIsMasked(true);
    } catch (err) {
      showToast.error(err.message);
    }
  };

  // Handle File Upload from disk into form
  const processUploadedFile = (file) => {
    if (!file) return;

    // Suggest project name from folder or file if not typed
    if (!formData.projectName) {
      let suggested = file.name.replace(/\.env(\..+)?$/, "");
      if (!suggested || suggested === ".env") {
        suggested = "";
      }
      if (suggested) {
        setFormData((prev) => ({ ...prev, projectName: suggested }));
      }
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setFormData((prev) => ({
        ...prev,
        content: text,
        fileName: file.name || ".env",
      }));
      showToast.success(`Loaded "${file.name}" (${file.size} bytes)`);
    };
    reader.onerror = () => {
      showToast.error("Failed to read file");
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processUploadedFile(file);
  };

  // Submit Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.projectName.trim()) {
      showToast.error("Please provide a project name");
      return;
    }
    if (!formData.content.trim()) {
      showToast.error("Environment content (.env) cannot be empty");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingItem
        ? `/api/admin/env-vault/${editingItem.id}`
        : "/api/admin/env-vault";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Operation failed");
      }

      showToast.success(
        editingItem
          ? `Updated "${formData.projectName}" successfully!`
          : `Saved "${formData.projectName}" to Vault!`
      );
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      showToast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Item
  const handleDelete = async (item) => {
    const confirmed = await confirmToast(
      `Delete "${item.projectName}" (${item.environment}) backup from vault? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      showToast.loading("Deleting...", { id: "delete-env" });
      const res = await fetch(`/api/admin/env-vault/${item.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      showToast.dismiss("delete-env");

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete");
      }

      showToast.success(`Deleted "${item.projectName}"`);
      if (previewItem?.id === item.id) setPreviewItem(null);
      fetchItems();
    } catch (err) {
      showToast.error(err.message);
    }
  };

  // Trigger browser download directly
  const handleDownload = async (item, type = "env") => {
    try {
      const res = await fetch(`/api/admin/env-vault/${item.id}`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Could not fetch file for download");

      const isExample = type === "example";
      const content = isExample ? data.item.exampleContent : data.item.content;
      const cleanName = item.projectName.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
      const filename = isExample ? `${cleanName}.env.example` : `${cleanName}.env`;

      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast.success(
        isExample
          ? `Downloaded "${filename}" (Sanitized for GitHub)`
          : `Downloaded "${filename}" (Original secrets)`
      );
    } catch (err) {
      showToast.error(err.message);
    }
  };

  // Copy to clipboard
  const handleCopy = async (content, label, idKey) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(idKey);
      setTimeout(() => setCopiedId(null), 2500);
      showToast.success(`${label} copied to clipboard!`);
    } catch (err) {
      showToast.error("Clipboard copy failed");
    }
  };

  // Quick copy from table/card
  const handleQuickCopy = async (item, type = "env") => {
    try {
      const res = await fetch(`/api/admin/env-vault/${item.id}`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed to copy");

      const isExample = type === "example";
      const content = isExample ? data.item.exampleContent : data.item.content;
      handleCopy(content, isExample ? ".env.example" : ".env", `${item.id}-${type}`);
    } catch (err) {
      showToast.error(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: "28px 24px 80px" }}>
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
              }}
            >
              <FiShield size={20} />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", margin: 0, letterSpacing: "-0.5px" }}>
              Environment Vault
            </h1>
            <span
              style={{
                background: "rgba(99, 102, 241, 0.15)",
                color: isDark ? "#818cf8" : "#4338ca",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                borderRadius: 20,
                padding: "2px 10px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Admin Only
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: "#94a3b8", maxWidth: 620, lineHeight: 1.5 }}>
            Store and manage production & development <code style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>.env</code> files securely.
            Download them anytime during git clones, or instantly generate sanitized{" "}
            <code style={{ color: isDark ? "#38bdf8" : "#0284c7" }}>.env.example</code> files ready to push to GitHub without leaking secrets.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={fetchItems}
            title="Refresh list"
            style={{
              padding: "10px 14px",
              background: isDark ? "rgba(255, 255, 255, 0.04)" : "#ffffff",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #cbd5e1",
              borderRadius: 10,
              color: isDark ? "#cbd5e1" : "#334155",
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.08)" : "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.04)" : "#ffffff")}
          >
            <FiRefreshCw size={14} className={loading ? "admin-spinner-sm" : ""} />
            Refresh
          </button>

          <button
            onClick={handleOpenCreate}
            style={{
              padding: "10px 18px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 16px rgba(99, 102, 241, 0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(99, 102, 241, 0.35)";
            }}
          >
            <FiPlus size={16} />
            New .env Backup
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
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
            background: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: isDark ? "none" : "0 4px 16px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(99, 102, 241, 0.12)",
              color: "#818cf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiServer size={20} />
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: isDark ? "#94a3b8" : "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Total Projects
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>{stats.total}</div>
          </div>
        </div>

        <div
          style={{
            background: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: isDark ? "none" : "0 4px 16px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiLock size={20} />
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Production Envs
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#10b981" }}>{stats.production}</div>
          </div>
        </div>

        <div
          style={{
            background: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: isDark ? "none" : "0 4px 16px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(56, 189, 248, 0.12)",
              color: "#38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiCode size={20} />
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Development Envs
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#38bdf8" }}>{stats.development}</div>
          </div>
        </div>

        <div
          style={{
            background: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: isDark ? "none" : "0 4px 16px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(168, 85, 247, 0.12)",
              color: "#c084fc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiFileText size={20} />
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Tracked Variables
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>{stats.totalKeys}</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          background: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "12px 18px",
          marginBottom: 24,
          boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: isDark ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #cbd5e1",
            borderRadius: 10,
            padding: "8px 14px",
            minWidth: 260,
            flex: 1,
            maxWidth: 380,
          }}
        >
          <FiSearch size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search by project name or note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: isDark ? "#f8fafc" : "#0f172a",
              fontSize: 13.5,
              outline: "none",
              width: "100%",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                background: "transparent",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <FiX size={14} />
            </button>
          )}
        </div>

        {/* Environment Filter Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {["all", "production", "development", "staging", "test"].map((env) => {
            const isSelected = envFilter === env;
            return (
              <button
                key={env}
                onClick={() => setEnvFilter(env)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: isSelected ? "1px solid rgba(99, 102, 241, 0.5)" : (isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #cbd5e1"),
                  background: isSelected ? (isDark ? "rgba(99, 102, 241, 0.2)" : "#e0e7ff") : (isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff"),
                  color: isSelected ? (isDark ? "#a5b4fc" : "#4338ca") : (isDark ? "#94a3b8" : "#475569"),
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >
                {env === "all" ? "All Envs" : env}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div className="admin-spinner-lg" style={{ margin: "0 auto 16px" }}></div>
          <p style={{ color: isDark ? "#94a3b8" : "#475569", fontSize: 14 }}>Loading Environment Vault...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div
          style={{
            background: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
            border: isDark ? "1px dashed rgba(255, 255, 255, 0.1)" : "1px dashed #cbd5e1",
            borderRadius: 16,
            padding: "50px 20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: isDark ? "rgba(99, 102, 241, 0.1)" : "#e0e7ff",
              color: isDark ? "#818cf8" : "#4338ca",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <FiShield size={28} />
          </div>
          <h3 style={{ color: isDark ? "#f8fafc" : "#0f172a", fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>
            {searchQuery ? "No matching backups found" : "No environment files backed up yet"}
          </h3>
          <p style={{ color: isDark ? "#94a3b8" : "#475569", fontSize: 13.5, maxWidth: 440, margin: "0 auto 20px" }}>
            {searchQuery
              ? "Try searching with a different project keyword or clear the search filter."
              : "Upload your project's .env file to keep it securely archived, ready to restore anytime, and automatically export .env.example for GitHub."}
          </p>
          <button
            onClick={handleOpenCreate}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)",
            }}
          >
            + Upload First .env
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          {filteredItems.map((item) => {
            const envCfg = ENVIRONMENT_CONFIG[item.environment] || ENVIRONMENT_CONFIG.production;
            const updatedDate = new Date(item.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={item.id}
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.025)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.07)" : "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: "18px 22px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  transition: "all 0.2s",
                  boxShadow: isDark ? "none" : "0 4px 16px rgba(0,0,0,0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                  e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.035)" : "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.07)" : "#e2e8f0";
                  e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.025)" : "#ffffff";
                }}
              >
                {/* Left info */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, minWidth: 260, flex: 1 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: envCfg.bg,
                      color: envCfg.color,
                      border: `1px solid ${envCfg.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <FiLock size={20} />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>
                        {item.projectName}
                      </span>
                      <span
                        style={{
                          background: envCfg.bg,
                          color: envCfg.color,
                          border: `1px solid ${envCfg.border}`,
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {envCfg.label}
                      </span>
                      <span
                        style={{
                          background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
                          color: isDark ? "#cbd5e1" : "#475569",
                          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #cbd5e1",
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontFamily: "monospace",
                        }}
                      >
                        {item.keyCount || 0} variables
                      </span>
                    </div>

                    {item.description && (
                      <p style={{ margin: "0 0 6px", fontSize: 13, color: isDark ? "#94a3b8" : "#334155", lineHeight: 1.4 }}>
                        {item.description}
                      </p>
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11.5, color: isDark ? "#64748b" : "#475569" }}>
                      <span>File: <code style={{ color: isDark ? "#94a3b8" : "#4338ca", background: isDark ? undefined : "#f1f5f9" }}>{item.fileName}</code></span>
                      <span>•</span>
                      <span>Updated: {updatedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {/* Download .env (Real secrets) */}
                  <button
                    onClick={() => handleDownload(item, "env")}
                    title="Download real .env file with secrets (for local project setup)"
                    style={{
                      padding: "8px 13px",
                      borderRadius: 8,
                      background: isDark ? "rgba(16, 185, 129, 0.12)" : "#dcfce7",
                      border: isDark ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid #86efac",
                      color: isDark ? "#34d399" : "#15803d",
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "rgba(16, 185, 129, 0.2)" : "#bbf7d0")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = isDark ? "rgba(16, 185, 129, 0.12)" : "#dcfce7")}
                  >
                    <FiDownload size={14} />
                    .env
                  </button>

                  {/* Download .env.example (GitHub ready) */}
                  <button
                    onClick={() => handleDownload(item, "example")}
                    title="Download sanitized .env.example with empty secrets (Ready to push to GitHub)"
                    style={{
                      padding: "8px 13px",
                      borderRadius: 8,
                      background: isDark ? "rgba(56, 189, 248, 0.12)" : "#e0f2fe",
                      border: isDark ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid #bae6fd",
                      color: isDark ? "#38bdf8" : "#0284c7",
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "rgba(56, 189, 248, 0.2)" : "#bae6fd")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = isDark ? "rgba(56, 189, 248, 0.12)" : "#e0f2fe")}
                  >
                    <FiFileText size={14} />
                    .env.example
                  </button>

                  {/* Quick Copy .env */}
                  <button
                    onClick={() => handleQuickCopy(item, "env")}
                    title="Copy real .env to clipboard"
                    style={{
                      padding: "8px 11px",
                      borderRadius: 8,
                      background: isDark ? "rgba(255, 255, 255, 0.04)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #cbd5e1",
                      color: copiedId === `${item.id}-env` ? (isDark ? "#10b981" : "#15803d") : (isDark ? "#cbd5e1" : "#1e293b"),
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    {copiedId === `${item.id}-env` ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    Copy .env
                  </button>

                  {/* Quick Copy .env.example */}
                  <button
                    onClick={() => handleQuickCopy(item, "example")}
                    title="Copy sanitized .env.example to clipboard"
                    style={{
                      padding: "8px 11px",
                      borderRadius: 8,
                      background: isDark ? "rgba(255, 255, 255, 0.04)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #cbd5e1",
                      color: copiedId === `${item.id}-example` ? (isDark ? "#38bdf8" : "#0284c7") : (isDark ? "#cbd5e1" : "#1e293b"),
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    {copiedId === `${item.id}-example` ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    Copy Example
                  </button>

                  {/* View Details */}
                  <button
                    onClick={() => handleOpenPreview(item, "env")}
                    title="Preview and inspect variables"
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: isDark ? "rgba(99, 102, 241, 0.12)" : "#e0e7ff",
                      border: isDark ? "1px solid rgba(99, 102, 241, 0.25)" : "1px solid #c7d2fe",
                      color: isDark ? "#818cf8" : "#4338ca",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FiEye size={15} />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleOpenEdit(item)}
                    title="Edit variables"
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: isDark ? "rgba(255, 255, 255, 0.04)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #cbd5e1",
                      color: isDark ? "#94a3b8" : "#1e293b",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    <FiEdit2 size={15} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item)}
                    title="Delete backup"
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: isDark ? "rgba(239, 68, 68, 0.1)" : "#fee2e2",
                      border: isDark ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid #fca5a5",
                      color: isDark ? "#f87171" : "#dc2626",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── CREATE / EDIT MODAL ────────────────────────────────────── */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            style={{
              background: isDark ? "#0d1322" : "#ffffff",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
              borderRadius: 18,
              width: "100%",
              maxWidth: 720,
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: isDark ? "0 25px 60px -15px rgba(0, 0, 0, 0.9)" : "0 25px 60px rgba(0, 0, 0, 0.15)",
              padding: "26px 30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                paddingBottom: 14,
              }}
            >
              <div>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", margin: "0 0 4px" }}>
                  {editingItem ? `Edit .env for "${editingItem.projectName}"` : "Backup New .env File"}
                </h2>
                <p style={{ margin: 0, fontSize: 13, color: isDark ? "#94a3b8" : "#475569" }}>
                  Upload your .env file or paste the contents below.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
                  border: "none",
                  borderRadius: 8,
                  color: isDark ? "#94a3b8" : "#64748b",
                  padding: 8,
                  cursor: "pointer",
                }}
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: dragOver ? "2px dashed #6366f1" : "2px dashed rgba(255, 255, 255, 0.15)",
                  background: dragOver ? "rgba(99, 102, 241, 0.1)" : "rgba(255, 255, 255, 0.02)",
                  borderRadius: 12,
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".env,text/plain"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) processUploadedFile(f);
                  }}
                />
                <FiUploadCloud size={30} color={dragOver ? "#818cf8" : "#94a3b8"} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>
                  Click to browse or drag & drop your <span style={{ color: "#38bdf8" }}>.env</span> file here
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                  Accepts .env, .env.local, .env.production, etc.
                </div>
              </div>

              {/* Project Name & Environment Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#cbd5e1", marginBottom: 6 }}>
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MerxoDev Web, Client CRM, Mobile API"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: 9,
                      color: "#f8fafc",
                      fontSize: 13.5,
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#cbd5e1", marginBottom: 6 }}>
                    Environment
                  </label>
                  <select
                    value={formData.environment}
                    onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "#0d1322",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: 9,
                      color: "#f8fafc",
                      fontSize: 13.5,
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="production">Production</option>
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="test">Testing</option>
                  </select>
                </div>
              </div>

              {/* File Name & Notes */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#cbd5e1", marginBottom: 6 }}>
                    File Name
                  </label>
                  <input
                    type="text"
                    value={formData.fileName}
                    onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                    placeholder=".env"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: 9,
                      color: "#f8fafc",
                      fontSize: 13.5,
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#cbd5e1", marginBottom: 6 }}>
                    Optional Notes / Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g. Neon Postgres + Cloudinary + Auth.js v5"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: 9,
                      color: "#f8fafc",
                      fontSize: 13.5,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Content Textarea */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: "#cbd5e1" }}>
                    Environment Variables Content *
                  </label>
                  <span style={{ fontSize: 11.5, color: "#64748b" }}>
                    {formData.content.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#")).length} variables detected
                  </span>
                </div>
                <textarea
                  required
                  rows={11}
                  placeholder={`# Paste your .env file content here...\nDATABASE_URL="postgresql://user:pass@host/db"\nJWT_SECRET="super-secret"\nPORT=3000`}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "#080c18",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 9,
                    color: "#38bdf8",
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    fontSize: 13,
                    lineHeight: 1.6,
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Modal Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "9px 18px",
                    background: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #cbd5e1",
                    borderRadius: 9,
                    color: isDark ? "#cbd5e1" : "#334155",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "9px 22px",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none",
                    borderRadius: 9,
                    color: "#fff",
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                  }}
                >
                  {submitting ? "Saving to Vault..." : editingItem ? "Update Changes" : "Save to Vault"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── PREVIEW / INSPECT MODAL ─────────────────────────────────── */}
      {previewItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewItem(null);
          }}
        >
          <div
            style={{
              background: isDark ? "#0d1322" : "#ffffff",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
              borderRadius: 18,
              width: "100%",
              maxWidth: 860,
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: isDark
                ? "0 25px 60px -15px rgba(0, 0, 0, 0.95)"
                : "0 25px 60px -10px rgba(0, 0, 0, 0.18)",
              overflow: "hidden",
            }}
          >
            {/* Preview Header */}
            <div
              style={{
                padding: "20px 26px",
                borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", margin: 0 }}>
                    {previewItem.projectName}
                  </h3>
                  <span
                    style={{
                      background: isDark
                        ? (ENVIRONMENT_CONFIG[previewItem.environment]?.bg || "rgba(99, 102, 241, 0.1)")
                        : (previewItem.environment === "production" ? "#dcfce7" : previewItem.environment === "development" ? "#e0f2fe" : previewItem.environment === "staging" ? "#fef3c7" : "#f3e8ff"),
                      color: isDark
                        ? (ENVIRONMENT_CONFIG[previewItem.environment]?.color || "#818cf8")
                        : (previewItem.environment === "production" ? "#15803d" : previewItem.environment === "development" ? "#0284c7" : previewItem.environment === "staging" ? "#b45309" : "#7e22ce"),
                      border: isDark
                        ? `1px solid ${ENVIRONMENT_CONFIG[previewItem.environment]?.border || "rgba(99, 102, 241, 0.3)"}`
                        : (previewItem.environment === "production" ? "1px solid #bbf7d0" : previewItem.environment === "development" ? "1px solid #bae6fd" : previewItem.environment === "staging" ? "1px solid #fde68a" : "1px solid #d8b4fe"),
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {previewItem.environment}
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: isDark ? "#94a3b8" : "#475569" }}>
                  {previewItem.stats?.keyCount || 0} variables • {previewItem.stats?.commentCount || 0} comments
                  {previewItem.fileName && ` • ${previewItem.fileName}`}
                </div>
                {previewItem.description && (
                  <div style={{ fontSize: 12, color: isDark ? "#cbd5e1" : "#334155", marginTop: 4 }}>
                    {previewItem.description}
                  </div>
                )}
              </div>

              <button
                onClick={() => setPreviewItem(null)}
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
                  border: isDark ? "none" : "1px solid #cbd5e1",
                  borderRadius: 8,
                  color: isDark ? "#94a3b8" : "#475569",
                  padding: 8,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Preview Toolbar */}
            <div
              style={{
                padding: "12px 26px",
                background: isDark ? "rgba(255, 255, 255, 0.02)" : "#f8fafc",
                borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {/* Tab Selector */}
              <div style={{ display: "flex", gap: 4, background: isDark ? "rgba(0, 0, 0, 0.4)" : "#e2e8f0", padding: 3, borderRadius: 8 }}>
                <button
                  onClick={() => setPreviewTab("env")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    fontSize: 12.5,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    background: previewTab === "env" ? "#6366f1" : "transparent",
                    color: previewTab === "env" ? "#fff" : (isDark ? "#94a3b8" : "#475569"),
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiLock size={13} />
                  Original (.env)
                </button>
                <button
                  onClick={() => setPreviewTab("example")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    fontSize: 12.5,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    background: previewTab === "example" ? "#0284c7" : "transparent",
                    color: previewTab === "example" ? "#fff" : (isDark ? "#94a3b8" : "#475569"),
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiFileText size={13} />
                  Sanitized (.env.example)
                </button>
              </div>

              {/* Action buttons inside preview */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {previewTab === "env" && (
                  <button
                    onClick={() => setIsMasked(!isMasked)}
                    style={{
                      padding: "6px 12px",
                      background: isDark
                        ? "rgba(255, 255, 255, 0.05)"
                        : isMasked
                        ? "#fffbeb"
                        : "#ecfdf5",
                      border: isDark
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : isMasked
                        ? "1px solid #fde68a"
                        : "1px solid #a7f3d0",
                      borderRadius: 8,
                      color: isDark
                        ? (isMasked ? "#f59e0b" : "#10b981")
                        : (isMasked ? "#b45309" : "#047857"),
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {isMasked ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                    {isMasked ? "Reveal Secrets" : "Mask Secrets"}
                  </button>
                )}

                <button
                  onClick={() => {
                    const text = previewTab === "example" ? previewItem.exampleContent : previewItem.content;
                    handleCopy(text, previewTab === "example" ? ".env.example" : ".env", "modal-copy");
                  }}
                  style={{
                    padding: "6px 12px",
                    background: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #cbd5e1",
                    borderRadius: 8,
                    color: copiedId === "modal-copy" ? (isDark ? "#10b981" : "#15803d") : (isDark ? "#cbd5e1" : "#1e293b"),
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {copiedId === "modal-copy" ? <FiCheck size={14} /> : <FiCopy size={14} />}
                  Copy
                </button>

                <button
                  onClick={() => handleDownload(previewItem, previewTab)}
                  style={{
                    padding: "6px 14px",
                    background:
                      previewTab === "example"
                        ? "linear-gradient(135deg, #0284c7, #0369a1)"
                        : "linear-gradient(135deg, #10b981, #059669)",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FiDownload size={14} />
                  Download
                </button>
              </div>
            </div>

            {/* Note banner when on .env.example tab */}
            {previewTab === "example" && (
              <div
                style={{
                  background: isDark ? "rgba(2, 132, 199, 0.1)" : "#f0f9ff",
                  borderBottom: isDark ? "1px solid rgba(2, 132, 199, 0.2)" : "1px solid #bae6fd",
                  padding: "8px 26px",
                  fontSize: 12,
                  color: isDark ? "#38bdf8" : "#0369a1",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 500,
                }}
              >
                <FiFileText size={14} />
                <span>
                  All confidential passwords, keys, and tokens have been automatically stripped. You can safely commit and push this file to GitHub!
                </span>
              </div>
            )}

            {/* Code Content View with Line Numbers & Syntax Styling */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                background: isDark ? "#080c18" : "#f8fafc",
                borderTop: isDark ? "none" : "1px solid #e2e8f0",
                padding: "18px 24px",
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: 13,
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {(() => {
                const rawText = previewTab === "example"
                  ? previewItem.exampleContent
                  : isMasked
                  ? previewItem.maskedContent
                  : previewItem.content;
                const lines = (rawText || "").split("\n");

                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {lines.map((line, idx) => {
                      const trimmed = line.trim();
                      const isComment = trimmed.startsWith("#");
                      const isBlank = trimmed === "";
                      const eqIdx = line.indexOf("=");
                      const isKeyVal = !isComment && eqIdx > -1;

                      if (isBlank) {
                        return (
                          <div key={idx} style={{ display: "flex", minHeight: "1.7em" }}>
                            <span style={{ width: 36, userSelect: "none", color: isDark ? "#475569" : "#94a3b8", textAlign: "right", paddingRight: 14, fontSize: 11.5, opacity: 0.7 }}>
                              {idx + 1}
                            </span>
                            <span style={{ flex: 1 }}>&nbsp;</span>
                          </div>
                        );
                      }

                      if (isComment) {
                        return (
                          <div key={idx} style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ width: 36, userSelect: "none", color: isDark ? "#475569" : "#94a3b8", textAlign: "right", paddingRight: 14, fontSize: 11.5, opacity: 0.7 }}>
                              {idx + 1}
                            </span>
                            <span style={{ flex: 1, color: isDark ? "#64748b" : "#64748b", fontStyle: "italic" }}>
                              {line}
                            </span>
                          </div>
                        );
                      }

                      if (isKeyVal) {
                        const key = line.slice(0, eqIdx);
                        const val = line.slice(eqIdx + 1);
                        const isMaskedVal = val.includes("********");

                        return (
                          <div key={idx} style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ width: 36, userSelect: "none", color: isDark ? "#475569" : "#94a3b8", textAlign: "right", paddingRight: 14, fontSize: 11.5, opacity: 0.7 }}>
                              {idx + 1}
                            </span>
                            <span style={{ flex: 1 }}>
                              <span style={{ color: isDark ? "#818cf8" : "#4338ca", fontWeight: 700 }}>{key}</span>
                              <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>=</span>
                              <span
                                style={{
                                  color: isMaskedVal
                                    ? (isDark ? "#fbbf24" : "#d97706")
                                    : previewTab === "example"
                                    ? (isDark ? "#38bdf8" : "#0284c7")
                                    : (isDark ? "#86efac" : "#15803d"),
                                  fontWeight: isMaskedVal ? 700 : 500,
                                }}
                              >
                                {val}
                              </span>
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start" }}>
                          <span style={{ width: 36, userSelect: "none", color: isDark ? "#475569" : "#94a3b8", textAlign: "right", paddingRight: 14, fontSize: 11.5, opacity: 0.7 }}>
                            {idx + 1}
                          </span>
                          <span style={{ flex: 1, color: isDark ? "#cbd5e1" : "#1e293b" }}>{line}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
