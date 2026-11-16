"use client";
import { useEffect, useRef, useState } from "react";
import { showToast, confirmToast } from "@/lib/toast";

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

const SLOTS = [
  {
    key: "quad_top_left",
    label: "Top Left (Wide Banner)",
    ratio: "16 / 8 (Landscape)",
    desc: "Spans the full width of the left column. Ideal for wide horizontal graphics.",
  },
  {
    key: "quad_bottom_left_1",
    label: "Bottom Left 1 (Square)",
    ratio: "1 / 1 (Square)",
    desc: "Left-hand square image card below the top banner.",
  },
  {
    key: "quad_bottom_left_2",
    label: "Bottom Left 2 (Square)",
    ratio: "1 / 1 (Square)",
    desc: "Right-hand square image card below the top banner.",
  },
  {
    key: "quad_right",
    label: "Right Column (Tall Portrait)",
    ratio: "Tall Portrait (~3:4 or 9:14)",
    desc: "Vertical banner spanning the exact combined height of the entire left column.",
  },
];

export default function AdminShowcasePage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlot, setActiveSlot] = useState(null); // Key of slot being edited
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Modal form state
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadMethod, setUploadMethod] = useState("url"); // "url" | "upload"
  const [buttonLink, setButtonLink] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fileRef = useRef(null);

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

  useEffect(() => {
    fetchBanners();
  }, []);

  const getSlotBanner = (slotKey) => {
    return banners.find((b) => b.slot === slotKey || b.slot === slotKey.replace("quad_", "promo_")) || null;
  };

  const openSlotEditor = (slotKey) => {
    const existing = getSlotBanner(slotKey);
    setActiveSlot(slotKey);
    setError("");
    if (existing) {
      setImageUrl(existing.imageUrl || "");
      setImagePreview(existing.imageUrl || "");
      setImageFile(null);
      setButtonLink(existing.buttonLink || "");
      setIsActive(existing.isActive !== false);
      setUploadMethod(existing.imageUrl?.includes("cloudinary") ? "upload" : "url");
    } else {
      setImageUrl("");
      setImagePreview("");
      setImageFile(null);
      setButtonLink("");
      setIsActive(true);
      setUploadMethod("upload");
    }
  };

  const closeEditor = () => {
    setActiveSlot(null);
    setError("");
    setImageFile(null);
    setImagePreview("");
    setImageUrl("");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const b64 = await toBase64(file);
      setImageFile(b64);
      setImagePreview(b64);
      setImageUrl("");
    } catch {
      setError("Failed to read file.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      let finalUrl = imageUrl.trim();

      // If user uploaded a new local file, upload to Cloudinary first
      if (imageFile) {
        const uploadRes = await fetch("/api/admin/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64Image: imageFile,
            altText: `Showcase ${activeSlot}`,
          }),
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json().catch(() => ({}));
          throw new Error(errData.error || "Image upload failed. Please try again.");
        }

        const uploaded = await uploadRes.json();
        finalUrl = uploaded.url;
      }

      if (!finalUrl) {
        throw new Error("Please select an image file or enter an image URL.");
      }

      const existing = getSlotBanner(activeSlot);

      const payload = {
        imageUrl: finalUrl,
        buttonLink: buttonLink?.trim() || null,
        slot: activeSlot,
        isActive: Boolean(isActive),
        title: null,
        subtitle: null,
        buttonText: null,
      };

      const url = existing ? `/api/admin/banners/${existing.id}` : "/api/admin/banners";
      const method = existing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save showcase image.");
      }

      showToast("Showcase image updated successfully!");
      closeEditor();
      fetchBanners();
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slotKey) => {
    const existing = getSlotBanner(slotKey);
    if (!existing) return;
    const confirmed = await confirmToast("Reset this slot to the default theme image?", {
      confirmText: "Reset Slot",
      cancelText: "Cancel",
      danger: true,
    });
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/banners/${existing.id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Slot reset to default image!");
        fetchBanners();
      } else {
        showToast("Failed to reset image.", "error");
      }
    } catch {
      showToast("Network error resetting image.", "error");
    }
  };

  const slotTL = getSlotBanner("quad_top_left");
  const slotBL1 = getSlotBanner("quad_bottom_left_1");
  const slotBL2 = getSlotBanner("quad_bottom_left_2");
  const slotR = getSlotBanner("quad_right");

  const currentSlotConfig = SLOTS.find((s) => s.key === activeSlot);

  return (
    <div className="showcase-admin-container">
      {/* Header */}
      <div className="admin-page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div className="showcase-pill">FEATURED SHOWCASE</div>
          <h1 className="admin-page-title">4-Image Promo Grid</h1>
          <p className="admin-page-subtitle">
            Manage the 4 images in the homepage showcase grid. Click any card below to upload or change its image and link.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="showcase-loading">
          <div className="showcase-skeleton" />
          <div className="showcase-skeleton" />
        </div>
      ) : (
        <div className="showcase-visual-wrapper">
          {/* Visual Mosaic Preview Card */}
          <div className="showcase-preview-card">
            <div className="showcase-preview-header">
              <span className="showcase-preview-title">Live Layout Preview (Click any card to Change/Upload)</span>
            </div>

            <div className="showcase-grid-preview">
              {/* Left Column (Top Wide + Bottom 2 Square) */}
              <div className="showcase-col-left">
                
                {/* Slot 1: Top-Left */}
                <div
                  className={`showcase-card ${slotTL ? "showcase-card-active" : "showcase-card-empty"}`}
                  onClick={() => openSlotEditor("quad_top_left")}
                  title="Click to change Top Left image"
                >
                  {slotTL ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slotTL.imageUrl} alt="Top Left" className="showcase-card-img" />
                      <div className="showcase-card-badge">Top Left (Wide)</div>
                      <div className="showcase-card-hover-overlay">
                        <span className="showcase-card-btn-pill">Change Image ✎</span>
                        {slotTL.buttonLink && <span className="showcase-link-tag">Link: {slotTL.buttonLink}</span>}
                      </div>
                    </>
                  ) : (
                    <div className="showcase-placeholder">
                      <span className="showcase-pos-label">Top Left Banner (Wide 16:8)</span>
                      <span className="showcase-add-btn">+ Click to Upload Image</span>
                    </div>
                  )}
                </div>

                {/* Bottom Row - 2 Square Slots */}
                <div className="showcase-row-bottom">
                  
                  {/* Slot 2: Bottom-Left 1 */}
                  <div
                    className={`showcase-card showcase-card-square ${slotBL1 ? "showcase-card-active" : "showcase-card-empty"}`}
                    onClick={() => openSlotEditor("quad_bottom_left_1")}
                    title="Click to change Bottom Left 1 image"
                  >
                    {slotBL1 ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={slotBL1.imageUrl} alt="Bottom Left 1" className="showcase-card-img" />
                        <div className="showcase-card-badge">Bottom 1 (Square)</div>
                        <div className="showcase-card-hover-overlay">
                          <span className="showcase-card-btn-pill">Change Image ✎</span>
                        </div>
                      </>
                    ) : (
                      <div className="showcase-placeholder">
                        <span className="showcase-pos-label">Bottom 1 (1:1)</span>
                        <span className="showcase-add-btn">+ Upload</span>
                      </div>
                    )}
                  </div>

                  {/* Slot 3: Bottom-Left 2 */}
                  <div
                    className={`showcase-card showcase-card-square ${slotBL2 ? "showcase-card-active" : "showcase-card-empty"}`}
                    onClick={() => openSlotEditor("quad_bottom_left_2")}
                    title="Click to change Bottom Left 2 image"
                  >
                    {slotBL2 ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={slotBL2.imageUrl} alt="Bottom Left 2" className="showcase-card-img" />
                        <div className="showcase-card-badge">Bottom 2 (Square)</div>
                        <div className="showcase-card-hover-overlay">
                          <span className="showcase-card-btn-pill">Change Image ✎</span>
                        </div>
                      </>
                    ) : (
                      <div className="showcase-placeholder">
                        <span className="showcase-pos-label">Bottom 2 (1:1)</span>
                        <span className="showcase-add-btn">+ Upload</span>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Right Column: Tall Banner */}
              <div className="showcase-col-right">
                <div
                  className={`showcase-card showcase-card-tall ${slotR ? "showcase-card-active" : "showcase-card-empty"}`}
                  onClick={() => openSlotEditor("quad_right")}
                  title="Click to change Right Tall image"
                >
                  {slotR ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slotR.imageUrl} alt="Right Tall" className="showcase-card-img" />
                      <div className="showcase-card-badge">Right Column (Tall)</div>
                      <div className="showcase-card-hover-overlay">
                        <span className="showcase-card-btn-pill">Change Image ✎</span>
                        {slotR.buttonLink && <span className="showcase-link-tag">Link: {slotR.buttonLink}</span>}
                      </div>
                    </>
                  ) : (
                    <div className="showcase-placeholder">
                      <span className="showcase-pos-label">Right Column (Tall Portrait)</span>
                      <span className="showcase-add-btn">+ Click to Upload Image</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Slots Management List */}
          <div className="showcase-slots-list">
            <h3 className="showcase-list-title">All 4 Slots Management</h3>
            <div className="showcase-slots-grid">
              {SLOTS.map((slot) => {
                const b = getSlotBanner(slot.key);
                return (
                  <div key={slot.key} className="showcase-slot-item">
                    <div className="showcase-item-preview" onClick={() => openSlotEditor(slot.key)} style={{ cursor: "pointer" }}>
                      {b?.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={b.imageUrl} alt={slot.label} className="showcase-item-img" />
                      ) : (
                        <div className="showcase-item-noimg">
                          <span>Default</span>
                          <span style={{ fontSize: "8px", color: "#6366f1" }}>Click to set</span>
                        </div>
                      )}
                    </div>
                    <div className="showcase-item-details">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h4 className="showcase-item-name">{slot.label}</h4>
                        <span className={"showcase-item-status-pill " + (b ? (b.isActive ? "status-active" : "status-inactive") : "status-default")}>
                          {b ? (b.isActive ? "Custom" : "Inactive") : "Default"}
                        </span>
                      </div>
                      <p className="showcase-item-ratio">Ratio: <strong>{slot.ratio}</strong></p>
                      <p className="showcase-item-desc">{slot.desc}</p>
                      {b?.buttonLink && (
                        <p className="showcase-item-link">Link: <span>{b.buttonLink}</span></p>
                      )}
                    </div>
                    <div className="showcase-item-actions">
                      <button
                        type="button"
                        className="showcase-btn-edit"
                        onClick={() => openSlotEditor(slot.key)}
                      >
                        {b ? "Change Image" : "Upload Image"}
                      </button>
                      {b && (
                        <button
                          type="button"
                          className="showcase-btn-delete"
                          onClick={() => handleDelete(slot.key)}
                          title="Reset to default theme image"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Upload / Edit Modal */}
      {activeSlot && (
        <div
          className="banner-modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && closeEditor()}
        >
          <div className="banner-modal" style={{ maxWidth: "560px" }}>
            <div className="banner-modal-header">
              <div>
                <h2 className="banner-modal-title">
                  {currentSlotConfig?.label || "Configure Slot"}
                </h2>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>
                  Recommended Ratio: <strong>{currentSlotConfig?.ratio}</strong>
                </p>
              </div>
              <button className="banner-modal-close" onClick={closeEditor}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="banner-form">
              {/* Image Picker */}
              <div className="banner-form-group">
                <label className="banner-form-label">Choose Image *</label>
                <div className="banner-upload-tabs">
                  <button
                    type="button"
                    className={"banner-tab" + (uploadMethod === "upload" ? " banner-tab-active" : "")}
                    onClick={() => setUploadMethod("upload")}
                  >
                    Upload from Device
                  </button>
                  <button
                    type="button"
                    className={"banner-tab" + (uploadMethod === "url" ? " banner-tab-active" : "")}
                    onClick={() => setUploadMethod("url")}
                  >
                    Enter Image URL
                  </button>
                </div>

                {uploadMethod === "upload" ? (
                  <div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <div
                      className="banner-file-drop"
                      onClick={() => fileRef.current?.click()}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "#6366f1", marginBottom: "4px" }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span style={{ fontWeight: 600, color: "#cbd5e1" }}>
                        {imageFile ? "New image selected ✓ (Click to choose different)" : "Click here to select an image from your computer"}
                      </span>
                      <span style={{ fontSize: "11px", color: "#64748b" }}>PNG, JPG, WEBP supported</span>
                    </div>
                  </div>
                ) : (
                  <input
                    className="banner-form-input"
                    type="url"
                    placeholder="https://example.com/banner.jpg"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                      setImageFile(null);
                    }}
                  />
                )}

                {imagePreview && (
                  <div className="showcase-modal-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview} alt="Preview" className="showcase-modal-img" />
                  </div>
                )}
              </div>

              {/* Optional Link */}
              <div className="banner-form-group">
                <label className="banner-form-label">Link on Click (Optional)</label>
                <input
                  className="banner-form-input"
                  type="text"
                  placeholder="e.g. /services, /contact, or https://..."
                  value={buttonLink}
                  onChange={(e) => setButtonLink(e.target.value)}
                />
                <span style={{ fontSize: "11.5px", color: "#64748b" }}>
                  If set, visitors clicking this image on the homepage will be redirected to this link.
                </span>
              </div>

              {/* Active Toggle */}
              <div className="banner-form-group">
                <label className="banner-form-label">Status</label>
                <div className="banner-toggle-row">
                  <button
                    type="button"
                    className={"banner-toggle" + (isActive ? " banner-toggle-on" : "")}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <span className="banner-toggle-knob" />
                  </button>
                  <span className="banner-toggle-label">{isActive ? "Active (Display on Homepage)" : "Inactive (Hidden)"}</span>
                </div>
              </div>

              {error && <p className="banner-form-error">{error}</p>}

              <div className="banner-form-actions">
                <button type="button" className="banner-btn-cancel" onClick={closeEditor} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="banner-btn-save" disabled={saving}>
                  {saving ? "Uploading & Saving..." : "Save Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .showcase-admin-container {
          max-width: 1200px;
        }
        .showcase-pill {
          display: inline-block; padding: 2px 8px; border-radius: 999px;
          font-size: 10.5px; font-weight: 700; letter-spacing: .6px;
          background: rgba(99,102,241,0.15); color: #818cf8;
          border: 1px solid rgba(99,102,241,0.3); margin-bottom: 6px;
        }

        .showcase-preview-card {
          margin-top: 18px;
          padding: 20px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(15,23,42,0.8), rgba(15,23,42,0.4));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .showcase-preview-title {
          font-size: 13.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .6px;
        }

        /* 4-Grid Preview */
        .showcase-grid-preview {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 16px;
          margin-top: 16px;
        }
        @media (max-width: 800px) {
          .showcase-grid-preview { grid-template-columns: 1fr; }
        }

        .showcase-col-left { display: flex; flex-direction: column; gap: 16px; }
        .showcase-row-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .showcase-col-right { display: flex; flex-direction: column; }

        .showcase-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1.5px dashed rgba(255,255,255,0.15);
          cursor: pointer;
          transition: all .2s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .showcase-card:hover {
          border-color: #6366f1;
          box-shadow: 0 8px 30px rgba(99,102,241,0.25);
          transform: translateY(-2px);
        }
        .showcase-card-active {
          border-style: solid;
          border-color: rgba(255,255,255,0.12);
        }

        .showcase-col-left > .showcase-card:first-child {
          aspect-ratio: 16 / 8;
          width: 100%;
        }
        .showcase-card-square {
          aspect-ratio: 1 / 1;
          width: 100%;
        }
        .showcase-card-tall {
          height: 100%;
          min-height: 420px;
          width: 100%;
        }

        .showcase-card-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }

        .showcase-card-badge {
          position: absolute; top: 12px; left: 12px; z-index: 2;
          padding: 4px 10px; border-radius: 6px;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          background: rgba(0,0,0,0.7); color: #fff;
          backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.15);
        }

        .showcase-card-hover-overlay {
          position: absolute; inset: 0; z-index: 3;
          background: rgba(15,23,42,0.85);
          opacity: 0; transition: opacity .2s ease;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; color: #fff;
        }
        .showcase-card:hover .showcase-card-hover-overlay {
          opacity: 1;
        }
        .showcase-card-btn-pill {
          padding: 7px 16px; border-radius: 999px;
          background: #6366f1; color: #fff; font-size: 12.5px; font-weight: 600;
          box-shadow: 0 4px 12px rgba(99,102,241,0.4);
        }
        .showcase-link-tag {
          font-size: 11px; color: #94a3b8; font-weight: 400;
        }

        .showcase-placeholder {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; padding: 24px 16px; text-align: center;
        }
        .showcase-pos-label { font-size: 13px; font-weight: 600; color: #94a3b8; }
        .showcase-add-btn {
          font-size: 12px; font-weight: 600; color: #818cf8;
          padding: 6px 14px; border-radius: 8px;
          background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3);
        }

        /* Detailed Slots List */
        .showcase-slots-list {
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .showcase-list-title {
          font-size: 16px; font-weight: 700; color: #f8fafc; margin: 0 0 16px;
        }
        .showcase-slots-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 768px) {
          .showcase-slots-grid { grid-template-columns: 1fr; }
        }

        .showcase-slot-item {
          display: flex; gap: 14px; align-items: center;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 14px;
        }
        .showcase-item-preview {
          width: 80px; height: 60px; border-radius: 8px; overflow: hidden;
          background: rgba(255,255,255,0.05); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .showcase-item-img { width: 100%; height: 100%; object-fit: cover; }
        .showcase-item-noimg {
          font-size: 10px; color: #64748b; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }

        .showcase-item-details { flex: 1; min-width: 0; }
        .showcase-item-name { font-size: 13.5px; font-weight: 700; color: #f1f5f9; margin: 0; }
        .showcase-item-status-pill {
          font-size: 9.5px; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: 4px;
        }
        .status-active { background: rgba(16,185,129,0.2); color: #34d399; }
        .status-inactive { background: rgba(239,68,68,0.2); color: #f87171; }
        .status-default { background: rgba(255,255,255,0.06); color: #94a3b8; }

        .showcase-item-ratio { font-size: 11.5px; color: #818cf8; margin: 3px 0 2px; }
        .showcase-item-desc { font-size: 11px; color: #64748b; margin: 0; line-clamp: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .showcase-item-link { font-size: 11px; color: #94a3b8; margin: 2px 0 0; }
        .showcase-item-link span { color: #38bdf8; }

        .showcase-item-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
        .showcase-btn-edit {
          padding: 6px 14px; border-radius: 8px; border: none;
          background: rgba(99,102,241,0.18); color: #818cf8;
          font-size: 12px; font-weight: 600; cursor: pointer; transition: background .15s;
        }
        .showcase-btn-edit:hover { background: rgba(99,102,241,0.3); }
        .showcase-btn-delete {
          padding: 4px 10px; border-radius: 8px; border: none;
          background: rgba(239,68,68,0.12); color: #f87171;
          font-size: 11.5px; font-weight: 500; cursor: pointer;
        }
        .showcase-btn-delete:hover { background: rgba(239,68,68,0.22); }

        .showcase-modal-preview {
          margin-top: 10px;
          border-radius: 10px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          max-height: 200px; width: 100%;
        }
        .showcase-modal-img { width: 100%; height: 200px; object-fit: cover; display: block; }

        .showcase-loading { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .showcase-skeleton {
          height: 120px; border-radius: 14px;
          background: linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.08) 50%, rgba(255,255,255,.04) 75%);
          background-size: 200% 100%; animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* ── Complete Modal CSS ── */
        .banner-modal-backdrop {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(0,0,0,.75); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .banner-modal {
          background: #0f1629; border: 1px solid rgba(255,255,255,.12);
          border-radius: 18px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 24px 80px rgba(0,0,0,.7);
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
        .banner-form-group { display: flex; flex-direction: column; gap: 6px; }
        .banner-form-label { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; }
        .banner-form-input {
          padding: 10px 14px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12);
          border-radius: 9px; color: #f1f5f9; font-size: 13.5px;
          outline: none; transition: border-color .2s; font-family: inherit;
        }
        .banner-form-input:focus { border-color: #6366f1; }

        .banner-upload-tabs { display: flex; gap: 4px; background: rgba(255,255,255,.04); border-radius: 9px; padding: 4px; width: fit-content; }
        .banner-tab {
          padding: 6px 14px; border: none; border-radius: 7px;
          font-size: 12.5px; font-weight: 600; cursor: pointer;
          background: transparent; color: #64748b; transition: all .15s;
        }
        .banner-tab-active { background: #6366f1; color: #fff; }

        .banner-file-drop {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; padding: 28px 16px;
          border: 2px dashed rgba(99,102,241,.35); border-radius: 10px;
          color: #64748b; font-size: 13px; cursor: pointer;
          transition: border-color .2s, background .2s;
          background: rgba(99,102,241,.02);
          text-align: center;
        }
        .banner-file-drop:hover { border-color: #6366f1; background: rgba(99,102,241,.06); }

        .banner-toggle-row { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
        .banner-toggle {
          position: relative; display: inline-flex; align-items: center;
          width: 44px; height: 24px;
          background: rgba(255,255,255,.1); border: none; border-radius: 999px;
          cursor: pointer; transition: background .2s; padding: 0;
        }
        .banner-toggle-on { background: #6366f1; }
        .banner-toggle-knob {
          position: absolute; left: 3px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #fff; transition: transform .2s;
          box-shadow: 0 1px 4px rgba(0,0,0,.3);
        }
        .banner-toggle-on .banner-toggle-knob { transform: translateX(20px); }
        .banner-toggle-label { font-size: 13px; color: #cbd5e1; }

        .banner-form-error {
          padding: 10px 14px; background: rgba(239,68,68,.12);
          border: 1px solid rgba(239,68,68,.25); border-radius: 9px;
          color: #f87171; font-size: 13px; margin: 0;
        }
        .banner-form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }
        .banner-btn-cancel {
          padding: 9px 20px; border: 1px solid rgba(255,255,255,.1);
          border-radius: 9px; background: transparent; color: #94a3b8;
          font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all .15s;
        }
        .banner-btn-cancel:hover { background: rgba(255,255,255,.05); color: #f1f5f9; }
        .banner-btn-cancel:disabled { opacity: .5; cursor: not-allowed; }

        .banner-btn-save {
          padding: 9px 24px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none; border-radius: 9px;
          color: #fff; font-size: 13.5px; font-weight: 600;
          cursor: pointer; transition: opacity .2s;
          box-shadow: 0 4px 14px rgba(99,102,241,.35);
        }
        .banner-btn-save:hover { opacity: .9; }
        .banner-btn-save:disabled { opacity: .5; cursor: not-allowed; }

        /* Light Mode Overrides */
        html:not(.dark) .showcase-preview-card {
          background: #ffffff;
          border-color: #e2e8f0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }
        html:not(.dark) .showcase-preview-title {
          color: #0f172a;
        }
        html:not(.dark) .showcase-card {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        html:not(.dark) .showcase-card:hover {
          border-color: #6366f1;
        }
        html:not(.dark) .showcase-list-title {
          color: #0f172a;
        }
        html:not(.dark) .showcase-slot-item {
          background: #ffffff;
          border-color: #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }
        html:not(.dark) .showcase-item-name {
          color: #0f172a;
        }
        html:not(.dark) .showcase-item-preview {
          background: #f1f5f9;
          border-color: #e2e8f0;
        }
        html:not(.dark) .banner-modal {
          background: #ffffff;
          border-color: #e2e8f0;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }
        html:not(.dark) .banner-modal-title {
          color: #0f172a;
        }
        html:not(.dark) .banner-modal-close {
          background: #f1f5f9;
          border-color: #e2e8f0;
          color: #64748b;
        }
        html:not(.dark) .banner-form-input {
          background: #ffffff;
          border-color: #cbd5e1;
          color: #0f172a;
        }
        html:not(.dark) .banner-form-label {
          color: #334155;
        }
        html:not(.dark) .banner-btn-cancel {
          background: #ffffff;
          border-color: #cbd5e1;
          color: #475569;
        }
        html:not(.dark) .banner-btn-cancel:hover {
          background: #f8fafc;
          color: #0f172a;
        }
        html:not(.dark) .banner-toggle {
          background: #cbd5e1;
        }
        html:not(.dark) .banner-toggle-on {
          background: #6366f1;
        }
        html:not(.dark) .banner-toggle-label {
          color: #475569;
        }
      `}</style>
    </div>
  );
}
