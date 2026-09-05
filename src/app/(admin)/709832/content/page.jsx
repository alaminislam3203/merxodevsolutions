"use client";
import { useState, useEffect, useCallback } from "react";
import { showToast } from "@/lib/toast";

const SECTIONS = ["all", "hero", "about", "services", "footer", "general"];
const SECTION_COLORS = { hero: "#6366f1", about: "#8b5cf6", services: "#06b6d4", footer: "#f59e0b", general: "#64748b" };

export default function ContentPage() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [filter, setFilter] = useState("all");
  const [editValues, setEditValues] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBlock, setNewBlock] = useState({ key: "", title: "", value: "", section: "general" });
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    if (Array.isArray(data)) {
      setBlocks(data);
      const vals = {};
      data.forEach(b => { vals[b.key] = b.value; });
      setEditValues(vals);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const handleSave = async (block) => {
    setSaving(block.key);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: block.key, title: block.title, value: editValues[block.key], section: block.section }),
    });
    if (res.ok) { showToast("Saved!"); fetchContent(); }
    else showToast("Save failed.", "error");
    setSaving(null);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlock),
    });
    if (res.ok) {
      showToast("Content block added!");
      setShowAddModal(false);
      setNewBlock({ key: "", title: "", value: "", section: "general" });
      fetchContent();
    } else showToast("Failed to add block.", "error");
    setAdding(false);
  };

  const handleDelete = async (key) => {
    if (!confirm("Delete this content block?")) return;
    setDeleting(key);
    const res = await fetch(`/api/admin/content?key=${key}`, { method: "DELETE" });
    if (res.ok) { showToast("Deleted."); fetchContent(); }
    else showToast("Delete failed.", "error");
    setDeleting(null);
  };

  const handleSaveMeet = async () => {
    setSaving("google_meet_link");
    const val = editValues["google_meet_link"] || "https://meet.google.com/new";
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "google_meet_link",
        title: "Google Meet Link",
        value: val,
        section: "general",
      }),
    });
    if (res.ok) {
      showToast("Google Meet Link updated successfully!");
      fetchContent();
    } else {
      showToast("Save failed.", "error");
    }
    setSaving(null);
  };

  const filtered = filter === "all" ? blocks : blocks.filter(b => b.section === filter);

  return (
    <div>
      <div className="admin-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 className="admin-page-title">Content & Settings</h1>
          <p className="admin-page-subtitle">Edit website texts, links, and content blocks</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowAddModal(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Block
        </button>
      </div>

      {/* Dedicated Quick Manager: Google Meet Link */}
      <div
        style={{
          marginBottom: 26,
          padding: "20px 24px",
          borderRadius: 18,
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxShadow: "0 4px 20px -2px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: "rgba(255, 255, 255, 0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                flexShrink: 0,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                <path fill="#ea4335" d="M166 106v90H76" />
                <path fill="#ffba00" d="M166 106v90h120v62l90-73v-49q0-30-30-30" />
                <path fill="#00ac47" d="M346 406q30 0 30-30V327l-90-71v60H164v90m212-77 42 34c9 7 18 7 18-7V156c0-14-9-14-18-7l-42 34" />
                <path fill="#0066da" d="M76 314v62q0 30 30 30h60v-92" />
                <path fill="#2684fc" d="M76 196h90v120H76" />
                <path fill="#00832d" d="M286 256l90-73v146" />
              </svg>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff" }}>
                  Google Meet Link (Discovery Call)
                </h2>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: "rgba(16, 185, 129, 0.2)",
                    color: "#10b981",
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                  }}
                >
                  Live on Website
                </span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>
                This link opens when visitors click &quot;Book 15-Min Google Meet&quot; on the website.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {editValues["google_meet_link"] && (
              <a
                href={editValues["google_meet_link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn-secondary"
                style={{ padding: "8px 16px", fontSize: 13, textDecoration: "none" }}
              >
                Test Link ↗
              </a>
            )}
            <button
              className="admin-btn admin-btn-primary"
              style={{
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                background: "linear-gradient(135deg, #10b981, #059669)",
                borderColor: "#10b981",
              }}
              onClick={handleSaveMeet}
              disabled={saving === "google_meet_link"}
            >
              {saving === "google_meet_link" ? (
                <>
                  <div className="admin-spinner-btn"></div> Saving...
                </>
              ) : (
                "Save Meet Link"
              )}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            className="admin-input"
            style={{ fontSize: 14, fontFamily: "monospace", padding: "10px 14px" }}
            placeholder="https://meet.google.com/xxx-yyyy-zzz or https://meet.google.com/new"
            value={editValues["google_meet_link"] ?? "https://meet.google.com/new"}
            onChange={(e) =>
              setEditValues((v) => ({ ...v, google_meet_link: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Section Filter */}
      <div className="content-filter-tabs">
        {SECTIONS.map(s => (
          <button key={s} className={`content-filter-tab ${filter === s ? "content-filter-tab-active" : ""}`} onClick={() => setFilter(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1,2,3].map(i => <div key={i} className="content-skeleton"></div>)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <p>No content blocks in this section.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((block) => {
            const sectionColor = SECTION_COLORS[block.section] || "#64748b";
            const isLong = block.value?.length > 80;
            return (
              <div key={block.key} className="content-block-card">
                <div className="content-block-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="content-block-key">{block.key}</span>
                    <span className="content-block-section-badge" style={{ background: `${sectionColor}20`, color: sectionColor, border: `1px solid ${sectionColor}30` }}>
                      {block.section}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button className="admin-btn admin-btn-primary" style={{ padding: "7px 14px", fontSize: 13 }} onClick={() => handleSave(block)} disabled={saving === block.key || editValues[block.key] === block.value}>
                      {saving === block.key ? <><div className="admin-spinner-btn"></div> Saving</> : "Save"}
                    </button>
                    <button className="admin-btn admin-btn-danger" style={{ padding: "7px 10px" }} onClick={() => handleDelete(block.key)} disabled={deleting === block.key}>
                      {deleting === block.key ? <div className="admin-spinner-btn"></div> : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <p className="content-block-title">{block.title}</p>
                {isLong ? (
                  <textarea
                    className="admin-input admin-textarea content-block-input"
                    value={editValues[block.key] ?? block.value}
                    onChange={e => setEditValues(v => ({ ...v, [block.key]: e.target.value }))}
                    rows={3}
                  />
                ) : (
                  <input
                    className="admin-input content-block-input"
                    value={editValues[block.key] ?? block.value}
                    onChange={e => setEditValues(v => ({ ...v, [block.key]: e.target.value }))}
                  />
                )}
                {editValues[block.key] !== block.value && (
                  <p className="content-unsaved-hint">? Unsaved changes</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showAddModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h2 className="admin-modal-title">Add Content Block</h2>
            <form onSubmit={handleAdd}>
              <div className="admin-field-group">
                <label className="admin-label">Key (unique identifier) *</label>
                <input className="admin-input" placeholder="hero_title" value={newBlock.key} onChange={e => setNewBlock(b => ({...b, key: e.target.value.toLowerCase().replace(/\s+/g,"_")}))} required />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">Display Title *</label>
                <input className="admin-input" placeholder="Hero Title" value={newBlock.title} onChange={e => setNewBlock(b => ({...b, title: e.target.value}))} required />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">Section</label>
                <select className="admin-input" value={newBlock.section} onChange={e => setNewBlock(b => ({...b, section: e.target.value}))}>
                  {["general","hero","about","services","footer"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="admin-field-group">
                <label className="admin-label">Value *</label>
                <textarea className="admin-input admin-textarea" placeholder="Content value..." value={newBlock.value} onChange={e => setNewBlock(b => ({...b, value: e.target.value}))} required />
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={adding}>
                  {adding ? <><div className="admin-spinner-btn"></div> Adding...</> : "Add Block"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .content-filter-tabs {
          display: flex; gap: 6px; margin-bottom: 20px; flex-wrap: wrap;
        }
        .content-filter-tab {
          padding: 7px 14px; border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          color: #64748b; font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s;
        }
        .content-filter-tab:hover { color: #94a3b8; background: rgba(255,255,255,0.07); }
        .content-filter-tab-active {
          background: rgba(99,102,241,0.12);
          border-color: rgba(99,102,241,0.3);
          color: #a5b4fc;
        }

        .content-block-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 18px 20px;
          transition: border-color 0.2s;
        }
        .content-block-card:hover { border-color: rgba(255,255,255,0.09); }
        .content-block-header {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .content-block-key {
          font-size: 12px; font-weight: 600;
          color: #64748b; font-family: monospace;
          letter-spacing: 0.3px;
        }
        .content-block-section-badge {
          font-size: 11px; font-weight: 500;
          padding: 2px 8px; border-radius: 100px;
        }
        .content-block-title {
          font-size: 14px; font-weight: 600;
          color: #94a3b8; margin: 0 0 10px;
        }
        .content-block-input { font-size: 14px; }
        .content-unsaved-hint {
          font-size: 12px; color: #f59e0b;
          margin: 6px 0 0;
        }
        .content-skeleton {
          height: 110px; border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
      `}</style>
    </div>
  );
}
