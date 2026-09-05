"use client";
import { useEffect, useRef, useState } from "react";
import { showToast } from "@/lib/toast";

// ─── Helpers ─────────────────────────────────────────────────
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

const EMPTY_FORM = {
  imageUrl: "",
  imageFile: null,
  imagePreview: "",
  uploadMethod: "url", // "url" | "upload"
  title: "",
  subtitle: "",
  buttonText: "",
  buttonLink: "",
  slot: "left", // "left" | "right"
  isActive: true,
  order: 0,
};

// ─── Banner Form Modal ────────────────────────────────────────
function BannerFormModal({ banner, onClose, onSaved }) {
  const [form, setForm] = useState(
    banner
      ? {
          imageUrl: banner.imageUrl || "",
          imageFile: null,
          imagePreview: banner.imageUrl || "",
          uploadMethod: "url",
          title: banner.title || "",
          subtitle: banner.subtitle || "",
          buttonText: banner.buttonText || "",
          buttonLink: banner.buttonLink || "",
          slot: banner.slot || "left",
          isActive: banner.isActive !== false,
          order: banner.order ?? 0,
        }
      : { ...EMPTY_FORM }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    setForm((f) => ({ ...f, imageFile: b64, imagePreview: b64, imageUrl: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      let imageUrl = form.imageUrl;

      // If user picked a file, upload to Cloudinary first
      if (form.imageFile) {
        const uploadRes = await fetch("/api/admin/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Image: form.imageFile, altText: form.title || "Banner" }),
        });
        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.error || "Image upload failed");
        }
        const uploaded = await uploadRes.json();
        imageUrl = uploaded.url;
      }

      if (!imageUrl) throw new Error("Please provide an image URL or upload an image.");

      const payload = {
        imageUrl,
        title: form.title || null,
        subtitle: form.subtitle || null,
        buttonText: form.buttonText || null,
        buttonLink: form.buttonLink || null,
        slot: form.slot || "left",
        isActive: form.isActive,
        order: Number(form.order),
      };

      const url = banner ? `/api/admin/banners/${banner.id}` : "/api/admin/banners";
      const method = banner ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="banner-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="banner-modal">
        <div className="banner-modal-header">
          <h2 className="banner-modal-title">{banner ? "Edit Banner" : "Add New Banner"}</h2>
          <button className="banner-modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="banner-form">
          {/* Image Section */}
          <div className="banner-form-group">
            <label className="banner-form-label">Image *</label>
            <div className="banner-upload-tabs">
              <button
                type="button"
                className={"banner-tab" + (form.uploadMethod === "url" ? " banner-tab-active" : "")}
                onClick={() => setForm((f) => ({ ...f, uploadMethod: "url" }))}
              >URL</button>
              <button
                type="button"
                className={"banner-tab" + (form.uploadMethod === "upload" ? " banner-tab-active" : "")}
                onClick={() => setForm((f) => ({ ...f, uploadMethod: "upload" }))}
              >Upload File</button>
            </div>

            {form.uploadMethod === "url" ? (
              <input
                className="banner-form-input"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value, imagePreview: e.target.value, imageFile: null }))}
              />
            ) : (
              <div
                className="banner-file-drop"
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#6366f1" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>{form.imageFile ? "Image selected ✓" : "Click to choose image"}</span>
              </div>
            )}

            {form.imagePreview && (
              <div className="banner-preview-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.imagePreview} alt="Preview" className="banner-preview-img" />
              </div>
            )}
          </div>

          {/* Fields */}
          <div className="banner-form-row">
            <div className="banner-form-group">
              <label className="banner-form-label">Title</label>
              <input className="banner-form-input" placeholder="Hero title..." value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="banner-form-group">
              <label className="banner-form-label">Subtitle</label>
              <input className="banner-form-input" placeholder="Short subtitle..." value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} />
            </div>
          </div>

          <div className="banner-form-row">
            <div className="banner-form-group">
              <label className="banner-form-label">Button Text</label>
              <input className="banner-form-input" placeholder="e.g. View Projects" value={form.buttonText} onChange={(e) => setForm((f) => ({ ...f, buttonText: e.target.value }))} />
            </div>
            <div className="banner-form-group">
              <label className="banner-form-label">Button Link</label>
              <input className="banner-form-input" placeholder="/our-projects" value={form.buttonLink} onChange={(e) => setForm((f) => ({ ...f, buttonLink: e.target.value }))} />
            </div>
          </div>

          <div className="banner-form-row banner-form-row-3">
            <div className="banner-form-group">
              <label className="banner-form-label">Panel / Slot</label>
              <div className="banner-slot-btns">
                <button
                  type="button"
                  className={"banner-slot-btn" + (form.slot === "left" ? " banner-slot-btn-active" : "")}
                  onClick={() => setForm((f) => ({ ...f, slot: "left" }))}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="8" height="18" rx="1"/><rect x="13" y="3" width="8" height="18" rx="1" opacity=".3"/>
                  </svg>
                  Left
                </button>
                <button
                  type="button"
                  className={"banner-slot-btn" + (form.slot === "right" ? " banner-slot-btn-active" : "")}
                  onClick={() => setForm((f) => ({ ...f, slot: "right" }))}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="8" height="18" rx="1" opacity=".3"/><rect x="13" y="3" width="8" height="18" rx="1"/>
                  </svg>
                  Right
                </button>
              </div>
            </div>
            <div className="banner-form-group">
              <label className="banner-form-label">Order</label>
              <input
                className="banner-form-input"
                type="number" min="0"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
              />
            </div>
            <div className="banner-form-group">
              <label className="banner-form-label">Status</label>
              <div className="banner-toggle-row">
                <button
                  type="button"
                  className={"banner-toggle" + (form.isActive ? " banner-toggle-on" : "")}
                  onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                >
                  <span className="banner-toggle-knob" />
                </button>
                <span className="banner-toggle-label">{form.isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </div>


          {error && <p className="banner-form-error">{error}</p>}

          <div className="banner-form-actions">
            <button type="button" className="banner-btn-cancel" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="banner-btn-save" disabled={saving}>
              {saving ? "Saving..." : banner ? "Save Changes" : "Create Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch {
      setBanners([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchBanners(); }, []);

  const openAdd = () => { setEditBanner(null); setModalOpen(true); };
  const openEdit = (b) => { setEditBanner(b); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditBanner(null); };
  const onSaved = () => {
    closeModal();
    showToast("Banner saved successfully!");
    fetchBanners();
  };

  const toggleActive = async (banner) => {
    try {
      const res = await fetch(`/api/admin/banners/${banner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !banner.isActive }),
      });
      if (res.ok) {
        showToast(banner.isActive ? "Banner set to Inactive." : "Banner activated!");
        fetchBanners();
      } else {
        showToast("Failed to update banner status.", "error");
      }
    } catch {
      showToast("Network error updating banner.", "error");
    }
  };

  const deleteBanner = async (id) => {
    if (!confirm("Delete this banner? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Banner deleted successfully!");
        fetchBanners();
      } else {
        showToast("Failed to delete banner.", "error");
      }
    } catch {
      showToast("Network error deleting banner.", "error");
    }
    setDeletingId(null);
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 className="admin-page-title">Hero Banners</h1>
          <p className="admin-page-subtitle">Manage carousel slides shown on the homepage.</p>
        </div>
        <button className="banner-btn-add" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Banner
        </button>
      </div>

      {loading ? (
        <div className="banner-loading">
          {[1, 2, 3].map((n) => <div key={n} className="banner-skeleton" />)}
        </div>
      ) : banners.length === 0 ? (
        <div className="banner-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#334155", marginBottom: "12px" }}>
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
          </svg>
          <p>No banners yet. Click <strong>Add Banner</strong> to create your first slide.</p>
        </div>
      ) : (
        <div className="banner-table-wrap">
          <table className="banner-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title / Subtitle</th>
                <th>Button</th>
                <th style={{ textAlign: "center" }}>Slot</th>
                <th style={{ textAlign: "center" }}>Order</th>
                <th style={{ textAlign: "center" }}>Active</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td>
                    <div className="banner-thumb-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={banner.imageUrl} alt={banner.title || "Banner"} className="banner-thumb" />
                    </div>
                  </td>
                  <td>
                    <p className="banner-table-title">{banner.title || <span style={{ color: "#475569" }}>—</span>}</p>
                    {banner.subtitle && <p className="banner-table-sub">{banner.subtitle}</p>}
                  </td>
                  <td>
                    {banner.buttonText ? (
                      <span className="banner-btn-chip">{banner.buttonText}</span>
                    ) : <span style={{ color: "#475569" }}>—</span>}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className={"banner-slot-chip banner-slot-chip-" + (banner.slot || "left")}>
                      {banner.slot === "right" ? "Right" : "Left"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="banner-order-badge">{banner.order}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className={"banner-toggle banner-toggle-sm" + (banner.isActive ? " banner-toggle-on" : "")}
                      onClick={() => toggleActive(banner)}
                      title={banner.isActive ? "Click to deactivate" : "Click to activate"}
                    >
                      <span className="banner-toggle-knob" />
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button className="banner-action-btn banner-action-edit" onClick={() => openEdit(banner)} title="Edit">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="banner-action-btn banner-action-delete"
                        onClick={() => deleteBanner(banner.id)}
                        disabled={deletingId === banner.id}
                        title="Delete"
                      >
                        {deletingId === banner.id ? "..." : (
                          <>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                            </svg>
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <BannerFormModal banner={editBanner} onClose={closeModal} onSaved={onSaved} />
      )}

      <style>{`
        /* ── Banner Page & Table ── */
        .banner-btn-add {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity .2s, transform .15s;
          box-shadow: 0 4px 14px rgba(99,102,241,.35);
        }
        .banner-btn-add:hover { opacity:.9; transform:translateY(-1px); }

        /* Slot chip in table */
        .banner-slot-chip {
          display: inline-block; padding: 3px 10px;
          border-radius: 6px; font-size: 11.5px; font-weight: 600;
          text-transform: uppercase; letter-spacing: .5px;
        }
        .banner-slot-chip-left { background: rgba(99,102,241,.15); color: #818cf8; }
        .banner-slot-chip-right { background: rgba(6,182,212,.15); color: #22d3ee; }

        /* Slot selector buttons in form */
        .banner-slot-btns { display: flex; gap: 6px; }
        .banner-slot-btn {
          flex: 1; display: inline-flex; align-items: center; justify-content: center;
          gap: 6px; padding: 8px 10px;
          border: 1px solid rgba(255,255,255,.1); border-radius: 8px;
          background: rgba(255,255,255,.04); color: #64748b;
          font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s;
        }
        .banner-slot-btn:hover { border-color: #6366f1; color: #818cf8; }
        .banner-slot-btn-active { background: rgba(99,102,241,.15); border-color: #6366f1; color: #818cf8; }

        /* 3-column form row */
        .banner-form-row-3 { grid-template-columns: 1fr 1fr 1fr !important; }
        @media (max-width: 500px) { .banner-form-row-3 { grid-template-columns: 1fr !important; } }


        .banner-loading { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .banner-skeleton {
          height: 72px; border-radius: 12px;
          background: linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.08) 50%, rgba(255,255,255,.04) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        .banner-empty {
          margin-top: 48px; text-align: center;
          color: #64748b; font-size: 14px;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }

        .banner-table-wrap {
          margin-top: 16px; overflow-x: auto;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px;
          background: rgba(255,255,255,.02);
        }
        .banner-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .banner-table th {
          padding: 12px 16px; text-align: left;
          color: #64748b; font-weight: 600; font-size: 11px;
          text-transform: uppercase; letter-spacing: .6px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .banner-table td {
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,.04);
          color: #cbd5e1; vertical-align: middle;
        }
        .banner-table tr:last-child td { border-bottom: none; }
        .banner-table tr:hover td { background: rgba(255,255,255,.025); }

        .banner-thumb-wrap {
          width: 96px; height: 54px;
          border-radius: 8px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
          flex-shrink: 0;
        }
        .banner-thumb { width: 100%; height: 100%; object-fit: cover; }

        .banner-table-title { font-weight: 600; color: #f1f5f9; margin: 0 0 2px; }
        .banner-table-sub { font-size: 12px; color: #64748b; margin: 0; }

        .banner-btn-chip {
          display: inline-block; padding: 3px 10px;
          background: rgba(99,102,241,.15); color: #818cf8;
          border-radius: 6px; font-size: 12px; font-weight: 500;
        }
        .banner-order-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(255,255,255,.06); color: #94a3b8;
          font-size: 13px; font-weight: 600;
        }

        /* Toggle */
        .banner-toggle {
          position: relative; display: inline-flex; align-items: center;
          width: 44px; height: 24px;
          background: rgba(255,255,255,.1); border: none; border-radius: 999px;
          cursor: pointer; transition: background .2s;
          padding: 0;
        }
        .banner-toggle-sm { width: 36px; height: 20px; }
        .banner-toggle-on { background: #6366f1; }
        .banner-toggle-knob {
          position: absolute; left: 3px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #fff; transition: transform .2s;
          box-shadow: 0 1px 4px rgba(0,0,0,.3);
        }
        .banner-toggle-sm .banner-toggle-knob { width: 14px; height: 14px; }
        .banner-toggle-on .banner-toggle-knob { transform: translateX(20px); }
        .banner-toggle-sm.banner-toggle-on .banner-toggle-knob { transform: translateX(16px); }

        .banner-action-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border: none; border-radius: 8px;
          font-size: 12.5px; font-weight: 500; cursor: pointer; transition: all .15s;
        }
        .banner-action-edit { background: rgba(99,102,241,.12); color: #818cf8; }
        .banner-action-edit:hover { background: rgba(99,102,241,.22); }
        .banner-action-delete { background: rgba(239,68,68,.1); color: #f87171; }
        .banner-action-delete:hover { background: rgba(239,68,68,.2); }
        .banner-action-delete:disabled { opacity: .5; cursor: not-allowed; }

        /* ── Modal ── */
        .banner-modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,.7); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .banner-modal {
          background: #0f1629; border: 1px solid rgba(255,255,255,.1);
          border-radius: 18px; width: 100%; max-width: 640px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 24px 80px rgba(0,0,0,.6);
          animation: modal-in .2s ease;
        }
        @keyframes modal-in { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }

        .banner-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px 0;
        }
        .banner-modal-title { font-size: 18px; font-weight: 700; color: #f1f5f9; margin: 0; }
        .banner-modal-close {
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #64748b; transition: all .15s;
        }
        .banner-modal-close:hover { background: rgba(255,255,255,.1); color: #f1f5f9; }

        .banner-form { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 16px; }
        .banner-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 500px) { .banner-form-row { grid-template-columns: 1fr; } }

        .banner-form-group { display: flex; flex-direction: column; gap: 6px; }
        .banner-form-label { font-size: 12.5px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; }
        .banner-form-input {
          padding: 9px 13px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
          border-radius: 9px; color: #f1f5f9; font-size: 13.5px;
          outline: none; transition: border-color .2s;
          font-family: inherit;
        }
        .banner-form-input:focus { border-color: #6366f1; }

        .banner-upload-tabs { display: flex; gap: 4px; background: rgba(255,255,255,.04); border-radius: 9px; padding: 4px; width: fit-content; }
        .banner-tab {
          padding: 5px 14px; border: none; border-radius: 7px;
          font-size: 12.5px; font-weight: 500; cursor: pointer;
          background: transparent; color: #64748b; transition: all .15s;
        }
        .banner-tab-active { background: #6366f1; color: #fff; }

        .banner-file-drop {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; padding: 24px 16px;
          border: 2px dashed rgba(99,102,241,.3); border-radius: 10px;
          color: #64748b; font-size: 13px; cursor: pointer;
          transition: border-color .2s, background .2s;
        }
        .banner-file-drop:hover { border-color: #6366f1; background: rgba(99,102,241,.05); }

        .banner-preview-wrap {
          border-radius: 10px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.1);
          aspect-ratio: 16/5; width: 100%;
        }
        .banner-preview-img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .banner-toggle-row { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
        .banner-toggle-label { font-size: 13.5px; color: #94a3b8; }

        .banner-form-error {
          padding: 10px 14px; background: rgba(239,68,68,.1);
          border: 1px solid rgba(239,68,68,.25); border-radius: 9px;
          color: #f87171; font-size: 13px;
        }
        .banner-form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }

        .banner-btn-cancel {
          padding: 9px 20px; border: 1px solid rgba(255,255,255,.1);
          border-radius: 9px; background: transparent; color: #94a3b8;
          font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all .15s;
        }
        .banner-btn-cancel:hover { background: rgba(255,255,255,.05); color: #f1f5f9; }
        .banner-btn-cancel:disabled { opacity: .5; cursor: not-allowed; }

        .banner-btn-save {
          padding: 9px 22px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none; border-radius: 9px;
          color: #fff; font-size: 13.5px; font-weight: 600;
          cursor: pointer; transition: opacity .2s;
          box-shadow: 0 4px 14px rgba(99,102,241,.3);
        }
        .banner-btn-save:hover { opacity: .9; }
        .banner-btn-save:disabled { opacity: .5; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
