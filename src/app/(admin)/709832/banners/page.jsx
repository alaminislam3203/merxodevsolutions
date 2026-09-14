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
function BannerFormModal({ banner, initialSlot = "left", onClose, onSaved }) {
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
          slot: banner.slot || initialSlot || "left",
          isActive: banner.isActive !== false,
          order: banner.order ?? 0,
        }
      : { ...EMPTY_FORM, slot: initialSlot || "left" }
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

          <div className="banner-form-group">
            <label className="banner-form-label">Panel / Slot Position</label>

            {/* Section A: Hero Carousel */}
            <div className="banner-slot-group-header">
              <span className="banner-slot-group-badge">HERO</span>
              <span>Hero Carousel Slots (Top of Homepage)</span>
            </div>
            <div className="banner-slot-btns">
              <button
                type="button"
                className={"banner-slot-btn" + (form.slot === "left" ? " banner-slot-btn-active" : "")}
                onClick={() => setForm((f) => ({ ...f, slot: "left" }))}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="10" height="18" rx="2" fill="currentColor" fillOpacity=".25"/>
                  <rect x="14" y="3" width="8" height="8" rx="1.5" strokeOpacity=".35"/>
                  <rect x="14" y="13" width="8" height="8" rx="1.5" strokeOpacity=".35"/>
                </svg>
                Left (Main)
              </button>
              <button
                type="button"
                className={"banner-slot-btn" + (form.slot === "right_top" || form.slot === "top_right" ? " banner-slot-btn-active" : "")}
                onClick={() => setForm((f) => ({ ...f, slot: "right_top" }))}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="10" height="18" rx="2" strokeOpacity=".35"/>
                  <rect x="14" y="3" width="8" height="8" rx="1.5" fill="currentColor" fillOpacity=".25"/>
                  <rect x="14" y="13" width="8" height="8" rx="1.5" strokeOpacity=".35"/>
                </svg>
                Right (Top)
              </button>
              <button
                type="button"
                className={"banner-slot-btn" + (form.slot === "right_bottom" || form.slot === "bottom_right" ? " banner-slot-btn-active" : "")}
                onClick={() => setForm((f) => ({ ...f, slot: "right_bottom" }))}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="10" height="18" rx="2" strokeOpacity=".35"/>
                  <rect x="14" y="3" width="8" height="8" rx="1.5" strokeOpacity=".35"/>
                  <rect x="14" y="13" width="8" height="8" rx="1.5" fill="currentColor" fillOpacity=".25"/>
                </svg>
                Right (Bottom)
              </button>
            </div>

            {/* Section B: 4-Image Feature Showcase (Mosaic Grid) */}
            <div className="banner-slot-group-header" style={{ marginTop: "12px" }}>
              <span className="banner-slot-group-badge banner-slot-group-badge-quad">MOSAIC</span>
              <span>4-Image Showcase Grid (Promo Showcase)</span>
            </div>
            <div className="banner-slot-btns">
              <button
                type="button"
                className={"banner-slot-btn" + (form.slot === "quad_top_left" || form.slot === "promo_top_left" ? " banner-slot-btn-active" : "")}
                onClick={() => setForm((f) => ({ ...f, slot: "quad_top_left" }))}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="11" height="8" rx="1.5" fill="currentColor" fillOpacity=".3" stroke="currentColor"/>
                  <rect x="2" y="13" width="5" height="8" rx="1" strokeOpacity=".35"/>
                  <rect x="8" y="13" width="5" height="8" rx="1" strokeOpacity=".35"/>
                  <rect x="15" y="3" width="7" height="18" rx="1.5" strokeOpacity=".35"/>
                </svg>
                Top Left (Wide)
              </button>
              <button
                type="button"
                className={"banner-slot-btn" + (form.slot === "quad_bottom_left_1" || form.slot === "promo_bottom_left_1" ? " banner-slot-btn-active" : "")}
                onClick={() => setForm((f) => ({ ...f, slot: "quad_bottom_left_1" }))}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="11" height="8" rx="1.5" strokeOpacity=".35"/>
                  <rect x="2" y="13" width="5" height="8" rx="1" fill="currentColor" fillOpacity=".3" stroke="currentColor"/>
                  <rect x="8" y="13" width="5" height="8" rx="1" strokeOpacity=".35"/>
                  <rect x="15" y="3" width="7" height="18" rx="1.5" strokeOpacity=".35"/>
                </svg>
                Bottom Left 1 (Square)
              </button>
              <button
                type="button"
                className={"banner-slot-btn" + (form.slot === "quad_bottom_left_2" || form.slot === "promo_bottom_left_2" ? " banner-slot-btn-active" : "")}
                onClick={() => setForm((f) => ({ ...f, slot: "quad_bottom_left_2" }))}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="11" height="8" rx="1.5" strokeOpacity=".35"/>
                  <rect x="2" y="13" width="5" height="8" rx="1" strokeOpacity=".35"/>
                  <rect x="8" y="13" width="5" height="8" rx="1" fill="currentColor" fillOpacity=".3" stroke="currentColor"/>
                  <rect x="15" y="3" width="7" height="18" rx="1.5" strokeOpacity=".35"/>
                </svg>
                Bottom Left 2 (Square)
              </button>
              <button
                type="button"
                className={"banner-slot-btn" + (form.slot === "quad_right" || form.slot === "promo_right" ? " banner-slot-btn-active" : "")}
                onClick={() => setForm((f) => ({ ...f, slot: "quad_right" }))}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="11" height="8" rx="1.5" strokeOpacity=".35"/>
                  <rect x="2" y="13" width="5" height="8" rx="1" strokeOpacity=".35"/>
                  <rect x="8" y="13" width="5" height="8" rx="1" strokeOpacity=".35"/>
                  <rect x="15" y="3" width="7" height="18" rx="1.5" fill="currentColor" fillOpacity=".3" stroke="currentColor"/>
                </svg>
                Right Column (Tall)
              </button>
            </div>
          </div>

          <div className="banner-form-row">
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
  const [defaultSlot, setDefaultSlot] = useState("left");
  const [deletingId, setDeletingId] = useState(null);
  const [slotFilter, setSlotFilter] = useState("all");

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

  const openAdd = (slot = "left") => {
    setDefaultSlot(slot);
    setEditBanner(null);
    setModalOpen(true);
  };

  const openEdit = (b) => {
    setEditBanner(b);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditBanner(null);
  };

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

  // Hero Banners count
  const leftCount = banners.filter((b) => b.slot === "left" || !b.slot).length;
  const rightTopCount = banners.filter((b) => b.slot === "right_top" || b.slot === "top_right").length;
  const rightBottomCount = banners.filter((b) => b.slot === "right_bottom" || b.slot === "bottom_right").length;
  const legacyRightCount = banners.filter((b) => b.slot === "right").length;
  const heroCount = leftCount + rightTopCount + rightBottomCount + legacyRightCount;

  // 4-Image Mosaic Showcase banners
  const quadTL = banners.find((b) => b.slot === "quad_top_left" || b.slot === "promo_top_left");
  const quadBL1 = banners.find((b) => b.slot === "quad_bottom_left_1" || b.slot === "promo_bottom_left_1");
  const quadBL2 = banners.find((b) => b.slot === "quad_bottom_left_2" || b.slot === "promo_bottom_left_2");
  const quadR = banners.find((b) => b.slot === "quad_right" || b.slot === "promo_right");

  const quadTLCount = banners.filter((b) => b.slot === "quad_top_left" || b.slot === "promo_top_left").length;
  const quadBL1Count = banners.filter((b) => b.slot === "quad_bottom_left_1" || b.slot === "promo_bottom_left_1").length;
  const quadBL2Count = banners.filter((b) => b.slot === "quad_bottom_left_2" || b.slot === "promo_bottom_left_2").length;
  const quadRCount = banners.filter((b) => b.slot === "quad_right" || b.slot === "promo_right").length;
  const quadCount = quadTLCount + quadBL1Count + quadBL2Count + quadRCount;

  const filteredBanners = banners.filter((b) => {
    if (slotFilter === "all") return true;
    if (slotFilter === "hero") {
      return b.slot === "left" || !b.slot || b.slot === "right_top" || b.slot === "top_right" || b.slot === "right_bottom" || b.slot === "bottom_right" || b.slot === "right";
    }
    if (slotFilter === "mosaic") {
      return b.slot?.startsWith("quad_") || b.slot?.startsWith("promo_");
    }
    if (slotFilter === "left") return b.slot === "left" || !b.slot;
    if (slotFilter === "right_top") return b.slot === "right_top" || b.slot === "top_right";
    if (slotFilter === "right_bottom") return b.slot === "right_bottom" || b.slot === "bottom_right";
    if (slotFilter === "quad_top_left") return b.slot === "quad_top_left" || b.slot === "promo_top_left";
    if (slotFilter === "quad_bottom_left_1") return b.slot === "quad_bottom_left_1" || b.slot === "promo_bottom_left_1";
    if (slotFilter === "quad_bottom_left_2") return b.slot === "quad_bottom_left_2" || b.slot === "promo_bottom_left_2";
    if (slotFilter === "quad_right") return b.slot === "quad_right" || b.slot === "promo_right";
    if (slotFilter === "right") return b.slot === "right";
    return true;
  });

  const formatSlot = (slot) => {
    if (slot === "right_top" || slot === "top_right") return "Hero: Right Top";
    if (slot === "right_bottom" || slot === "bottom_right") return "Hero: Right Bottom";
    if (slot === "right") return "Hero: Right (Legacy)";
    if (slot === "quad_top_left" || slot === "promo_top_left") return "Mosaic: Top Left";
    if (slot === "quad_bottom_left_1" || slot === "promo_bottom_left_1") return "Mosaic: Bottom 1";
    if (slot === "quad_bottom_left_2" || slot === "promo_bottom_left_2") return "Mosaic: Bottom 2";
    if (slot === "quad_right" || slot === "promo_right") return "Mosaic: Tall Right";
    return "Hero: Left (Main)";
  };

  const getSlotChipClass = (slot) => {
    if (slot === "right_top" || slot === "top_right") return "banner-slot-chip-right_top";
    if (slot === "right_bottom" || slot === "bottom_right") return "banner-slot-chip-right_bottom";
    if (slot === "right") return "banner-slot-chip-right";
    if (slot === "quad_top_left" || slot === "promo_top_left") return "banner-slot-chip-quad_top_left";
    if (slot === "quad_bottom_left_1" || slot === "promo_bottom_left_1") return "banner-slot-chip-quad_bottom_left_1";
    if (slot === "quad_bottom_left_2" || slot === "promo_bottom_left_2") return "banner-slot-chip-quad_bottom_left_2";
    if (slot === "quad_right" || slot === "promo_right") return "banner-slot-chip-quad_right";
    return "banner-slot-chip-left";
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 className="admin-page-title">Hero & Promo Banners</h1>
          <p className="admin-page-subtitle">Manage Hero Carousel (3 banners) and 4-Image Feature Showcase (Mosaic Grid).</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button className="banner-btn-add" onClick={() => openAdd("left")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            + Add Hero Banner
          </button>
          <button className="banner-btn-add banner-btn-add-mosaic" onClick={() => openAdd("quad_top_left")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="2" y="3" width="11" height="8" rx="1.5" stroke="currentColor"/>
              <rect x="2" y="13" width="5" height="8" rx="1" stroke="currentColor"/>
              <rect x="8" y="13" width="5" height="8" rx="1" stroke="currentColor"/>
              <rect x="15" y="3" width="7" height="18" rx="1.5" stroke="currentColor"/>
            </svg>
            + Add 4-Image Grid Banner
          </button>
        </div>
      </div>

      {/* Visual Interactive Schematic Map for 4-Image Showcase Grid */}
      <div className="admin-mosaic-card">
        <div className="admin-mosaic-header">
          <div>
            <div className="admin-mosaic-pill">FEATURED SHOWCASE (MOSAIC GRID)</div>
            <h2 className="admin-mosaic-title">4-Image Showcase Layout Preview</h2>
            <p className="admin-mosaic-sub">
              Click any of the 4 panels below to assign or edit images, headlines, and links matching the exact layout.
            </p>
          </div>
        </div>

        <div className="admin-mosaic-grid">
          {/* Left Column (Top Wide + Bottom 2 Square) */}
          <div className="admin-mosaic-left">
            {/* Top-Left Banner */}
            <div
              className={`admin-mosaic-cell admin-mosaic-tl ${quadTL ? "admin-mosaic-cell-filled" : ""}`}
              onClick={() => quadTL ? openEdit(quadTL) : openAdd("quad_top_left")}
              role="button"
              tabIndex={0}
              title={quadTL ? "Click to edit Top Left banner" : "Click to assign Top Left banner"}
            >
              {quadTL ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={quadTL.imageUrl} alt="Top Left" className="admin-mosaic-img" />
                  <div className="admin-mosaic-overlay">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <span className="admin-mosaic-tag">Top Left (Wide)</span>
                      <span className={"admin-mosaic-status" + (quadTL.isActive ? " admin-mosaic-status-on" : "")}>
                        {quadTL.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="admin-mosaic-text">{quadTL.title || "Next-Gen Web & Cloud (Default Title)"}</p>
                    <span className="admin-mosaic-action">Edit Banner ✎</span>
                  </div>
                </>
              ) : (
                <div className="admin-mosaic-empty">
                  <span className="admin-mosaic-slot-name">Top Left (Wide 16:8)</span>
                  <span className="admin-mosaic-hint">+ Assign Banner</span>
                </div>
              )}
            </div>

            {/* Bottom Row - 2 Square Banners */}
            <div className="admin-mosaic-bottom-row">
              {/* Bottom-Left 1 */}
              <div
                className={`admin-mosaic-cell admin-mosaic-bl ${quadBL1 ? "admin-mosaic-cell-filled" : ""}`}
                onClick={() => quadBL1 ? openEdit(quadBL1) : openAdd("quad_bottom_left_1")}
                role="button"
                tabIndex={0}
                title={quadBL1 ? "Click to edit Bottom Left 1" : "Click to assign Bottom Left 1"}
              >
                {quadBL1 ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={quadBL1.imageUrl} alt="Bottom Left 1" className="admin-mosaic-img" />
                    <div className="admin-mosaic-overlay">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <span className="admin-mosaic-tag">Bottom 1</span>
                        <span className={"admin-mosaic-status" + (quadBL1.isActive ? " admin-mosaic-status-on" : "")}>
                          {quadBL1.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="admin-mosaic-text">{quadBL1.title || "AI & Smart APIs"}</p>
                      <span className="admin-mosaic-action">Edit ✎</span>
                    </div>
                  </>
                ) : (
                  <div className="admin-mosaic-empty">
                    <span className="admin-mosaic-slot-name">Bottom 1 (Square)</span>
                    <span className="admin-mosaic-hint">+ Assign</span>
                  </div>
                )}
              </div>

              {/* Bottom-Left 2 */}
              <div
                className={`admin-mosaic-cell admin-mosaic-bl ${quadBL2 ? "admin-mosaic-cell-filled" : ""}`}
                onClick={() => quadBL2 ? openEdit(quadBL2) : openAdd("quad_bottom_left_2")}
                role="button"
                tabIndex={0}
                title={quadBL2 ? "Click to edit Bottom Left 2" : "Click to assign Bottom Left 2"}
              >
                {quadBL2 ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={quadBL2.imageUrl} alt="Bottom Left 2" className="admin-mosaic-img" />
                    <div className="admin-mosaic-overlay">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <span className="admin-mosaic-tag">Bottom 2</span>
                        <span className={"admin-mosaic-status" + (quadBL2.isActive ? " admin-mosaic-status-on" : "")}>
                          {quadBL2.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="admin-mosaic-text">{quadBL2.title || "SaaS & E-Com"}</p>
                      <span className="admin-mosaic-action">Edit ✎</span>
                    </div>
                  </>
                ) : (
                  <div className="admin-mosaic-empty">
                    <span className="admin-mosaic-slot-name">Bottom 2 (Square)</span>
                    <span className="admin-mosaic-hint">+ Assign</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Tall Banner */}
          <div className="admin-mosaic-right">
            <div
              className={`admin-mosaic-cell admin-mosaic-tall ${quadR ? "admin-mosaic-cell-filled" : ""}`}
              onClick={() => quadR ? openEdit(quadR) : openAdd("quad_right")}
              role="button"
              tabIndex={0}
              title={quadR ? "Click to edit Right Tall banner" : "Click to assign Right Tall banner"}
            >
              {quadR ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={quadR.imageUrl} alt="Right Tall" className="admin-mosaic-img" />
                  <div className="admin-mosaic-overlay">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <span className="admin-mosaic-tag">Right Column (Tall)</span>
                      <span className={"admin-mosaic-status" + (quadR.isActive ? " admin-mosaic-status-on" : "")}>
                        {quadR.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="admin-mosaic-text">{quadR.title || "Global Agency Solutions"}</p>
                    <span className="admin-mosaic-action">Edit Banner ✎</span>
                  </div>
                </>
              ) : (
                <div className="admin-mosaic-empty">
                  <span className="admin-mosaic-slot-name">Right Column (Tall Portrait)</span>
                  <span className="admin-mosaic-hint">+ Assign Banner</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="banner-filter-tabs">
        <button
          type="button"
          className={"banner-filter-tab" + (slotFilter === "all" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("all")}
        >
          All ({banners.length})
        </button>
        <button
          type="button"
          className={"banner-filter-tab banner-filter-tab-group" + (slotFilter === "hero" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("hero")}
        >
          Hero Banners ({heroCount})
        </button>
        <button
          type="button"
          className={"banner-filter-tab banner-filter-tab-group banner-filter-tab-mosaic" + (slotFilter === "mosaic" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("mosaic")}
        >
          4-Image Grid ({quadCount})
        </button>
        <span style={{ color: "rgba(255,255,255,0.15)", alignSelf: "center" }}>|</span>
        <button
          type="button"
          className={"banner-filter-tab" + (slotFilter === "left" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("left")}
        >
          Hero Left ({leftCount})
        </button>
        <button
          type="button"
          className={"banner-filter-tab" + (slotFilter === "right_top" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("right_top")}
        >
          Hero Right Top ({rightTopCount})
        </button>
        <button
          type="button"
          className={"banner-filter-tab" + (slotFilter === "right_bottom" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("right_bottom")}
        >
          Hero Right Bottom ({rightBottomCount})
        </button>
        <button
          type="button"
          className={"banner-filter-tab" + (slotFilter === "quad_top_left" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("quad_top_left")}
        >
          Mosaic: Top Left ({quadTLCount})
        </button>
        <button
          type="button"
          className={"banner-filter-tab" + (slotFilter === "quad_bottom_left_1" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("quad_bottom_left_1")}
        >
          Mosaic: Bottom 1 ({quadBL1Count})
        </button>
        <button
          type="button"
          className={"banner-filter-tab" + (slotFilter === "quad_bottom_left_2" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("quad_bottom_left_2")}
        >
          Mosaic: Bottom 2 ({quadBL2Count})
        </button>
        <button
          type="button"
          className={"banner-filter-tab" + (slotFilter === "quad_right" ? " banner-filter-tab-active" : "")}
          onClick={() => setSlotFilter("quad_right")}
        >
          Mosaic: Right Tall ({quadRCount})
        </button>
      </div>

      {loading ? (
        <div className="banner-loading">
          {[1, 2, 3].map((n) => <div key={n} className="banner-skeleton" />)}
        </div>
      ) : filteredBanners.length === 0 ? (
        <div className="banner-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#334155", marginBottom: "12px" }}>
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
          </svg>
          <p>No banners found for this slot filter. Click <strong>Add Banner</strong> to create one.</p>
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
              {filteredBanners.map((banner) => (
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
                    <span className={"banner-slot-chip " + getSlotChipClass(banner.slot)}>
                      {formatSlot(banner.slot)}
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
        <BannerFormModal banner={editBanner} initialSlot={defaultSlot} onClose={closeModal} onSaved={onSaved} />
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

        .banner-btn-add-mosaic {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          box-shadow: 0 4px 14px rgba(6,182,212,.35);
        }

        /* Interactive Visual Mosaic Card */
        .admin-mosaic-card {
          margin-top: 20px;
          padding: 20px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(15,23,42,0.8), rgba(15,23,42,0.4));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .admin-mosaic-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: 12px; margin-bottom: 16px;
        }
        .admin-mosaic-pill {
          display: inline-block; padding: 2px 8px; border-radius: 999px;
          font-size: 10.5px; font-weight: 700; letter-spacing: .6px;
          background: rgba(6,182,212,0.15); color: #22d3ee;
          border: 1px solid rgba(6,182,212,0.3); margin-bottom: 6px;
        }
        .admin-mosaic-title { font-size: 16px; font-weight: 700; color: #f8fafc; margin: 0 0 4px; }
        .admin-mosaic-sub { font-size: 12.5px; color: #94a3b8; margin: 0; }

        .admin-mosaic-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 12px;
          margin-top: 12px;
        }
        @media (max-width: 768px) {
          .admin-mosaic-grid { grid-template-columns: 1fr; }
        }

        .admin-mosaic-left { display: flex; flex-direction: column; gap: 12px; }
        .admin-mosaic-bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .admin-mosaic-right { display: flex; flex-direction: column; }

        .admin-mosaic-cell {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1.5px dashed rgba(255,255,255,0.12);
          cursor: pointer;
          transition: all .2s ease;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .admin-mosaic-cell:hover {
          border-color: #818cf8;
          background: rgba(99,102,241,0.06);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.35);
        }

        .admin-mosaic-tl { aspect-ratio: 16 / 7.5; width: 100%; }
        .admin-mosaic-bl { aspect-ratio: 1 / 1; width: 100%; }
        .admin-mosaic-tall { height: 100%; min-height: 240px; width: 100%; }

        .admin-mosaic-cell-filled {
          border-style: solid;
          border-color: rgba(255,255,255,0.1);
        }
        .admin-mosaic-img {
          width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;
        }
        .admin-mosaic-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%);
          padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between;
        }
        .admin-mosaic-tag {
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px;
          padding: 2px 7px; border-radius: 5px;
          background: rgba(0,0,0,0.6); color: #e2e8f0; backdrop-filter: blur(4px);
        }
        .admin-mosaic-status {
          font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 5px;
          background: rgba(239,68,68,0.2); color: #f87171;
        }
        .admin-mosaic-status-on {
          background: rgba(16,185,129,0.2); color: #34d399;
        }
        .admin-mosaic-text {
          font-size: 12px; font-weight: 600; color: #fff; margin: 4px 0 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .admin-mosaic-action {
          align-self: flex-start;
          font-size: 11px; font-weight: 600; color: #a5b4fc;
          background: rgba(99,102,241,0.25); padding: 3px 8px; border-radius: 6px;
        }

        .admin-mosaic-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; padding: 16px; text-align: center;
        }
        .admin-mosaic-slot-name { font-size: 12px; font-weight: 600; color: #94a3b8; }
        .admin-mosaic-hint { font-size: 11px; font-weight: 500; color: #6366f1; }

        /* Group headers in modal */
        .banner-slot-group-header {
          display: flex; align-items: center; gap: 8px;
          font-size: 11.5px; font-weight: 600; color: #94a3b8; margin: 4px 0 6px;
        }
        .banner-slot-group-badge {
          display: inline-block; padding: 2px 6px; border-radius: 4px;
          font-size: 9.5px; font-weight: 700; background: rgba(99,102,241,0.2); color: #818cf8;
        }
        .banner-slot-group-badge-quad {
          background: rgba(6,182,212,0.2); color: #22d3ee;
        }

        /* Slot chips in table */
        .banner-slot-chip {
          display: inline-block; padding: 3px 10px;
          border-radius: 6px; font-size: 11.5px; font-weight: 600;
          letter-spacing: .3px; white-space: nowrap;
        }
        .banner-slot-chip-left { background: rgba(99,102,241,.15); color: #818cf8; }
        .banner-slot-chip-right_top,
        .banner-slot-chip-top_right { background: rgba(6,182,212,.15); color: #22d3ee; }
        .banner-slot-chip-right_bottom,
        .banner-slot-chip-bottom_right { background: rgba(16,185,129,.15); color: #34d399; }
        .banner-slot-chip-right { background: rgba(245,158,11,.15); color: #fbbf24; }

        .banner-slot-chip-quad_top_left { background: rgba(168,85,247,.18); color: #c084fc; border: 1px solid rgba(168,85,247,.3); }
        .banner-slot-chip-quad_bottom_left_1 { background: rgba(6,182,212,.18); color: #38bdf8; border: 1px solid rgba(6,182,212,.3); }
        .banner-slot-chip-quad_bottom_left_2 { background: rgba(236,72,153,.18); color: #f472b6; border: 1px solid rgba(236,72,153,.3); }
        .banner-slot-chip-quad_right { background: rgba(245,158,11,.18); color: #fcd34d; border: 1px solid rgba(245,158,11,.3); }

        /* Filter Tabs */
        .banner-filter-tabs {
          display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px;
        }
        .banner-filter-tab {
          padding: 6px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 500;
          border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03);
          color: #94a3b8; cursor: pointer; transition: all .15s;
        }
        .banner-filter-tab:hover {
          background: rgba(255,255,255,.08); color: #f1f5f9;
        }
        .banner-filter-tab-active {
          background: rgba(99,102,241,.18); border-color: #6366f1; color: #818cf8;
          box-shadow: 0 2px 8px rgba(99,102,241,.2);
        }
        .banner-filter-tab-mosaic.banner-filter-tab-active {
          background: rgba(6,182,212,.18); border-color: #06b6d4; color: #22d3ee;
          box-shadow: 0 2px 8px rgba(6,182,212,.2);
        }

        /* Slot selector buttons in form */
        .banner-slot-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .banner-slot-btn {
          flex: 1; min-width: 120px; display: inline-flex; align-items: center; justify-content: center;
          gap: 7px; padding: 10px 12px;
          border: 1px solid rgba(255,255,255,.1); border-radius: 9px;
          background: rgba(255,255,255,.04); color: #64748b;
          font-size: 12.5px; font-weight: 500; cursor: pointer; transition: all .15s;
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
