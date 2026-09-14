"use client";
import { useEffect, useRef, useState } from "react";
import { showToast } from "@/lib/toast";

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
    aspectClass: "showcase-aspect-wide",
    desc: "Spans the full width of the left column. Ideal for horizontal product or promo imagery.",
  },
  {
    key: "quad_bottom_left_1",
    label: "Bottom Left 1 (Square)",
    ratio: "1 / 1 (Square)",
    aspectClass: "showcase-aspect-square",
    desc: "Left side square card below the top banner.",
  },
  {
    key: "quad_bottom_left_2",
    label: "Bottom Left 2 (Square)",
    ratio: "1 / 1 (Square)",
    aspectClass: "showcase-aspect-square",
    desc: "Right side square card below the top banner.",
  },
  {
    key: "quad_right",
    label: "Right Column (Tall Banner)",
    ratio: "Tall Portrait",
    aspectClass: "showcase-aspect-tall",
    desc: "Vertical banner spanning the exact combined height of the entire left column.",
  },
];

export default function AdminShowcasePage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlot, setActiveSlot] = useState(null); // Slot config modal
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Modal form state
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadMethod, setUploadMethod] = useState("url"); // "url" | "upload"
  const [buttonLink, setButtonLink] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fileRef = useRef();

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
      setUploadMethod("url");
    } else {
      setImageUrl("");
      setImagePreview("");
      setImageFile(null);
      setButtonLink("");
      setIsActive(true);
      setUploadMethod("url");
    }
  };

  const closeEditor = () => {
    setActiveSlot(null);
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    setImageFile(b64);
    setImagePreview(b64);
    setImageUrl("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      let finalUrl = imageUrl;

      if (imageFile) {
        const uploadRes = await fetch("/api/admin/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Image: imageFile, altText: `Promo Showcase ${activeSlot}` }),
        });
        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.error || "Image upload failed");
        }
        const uploaded = await uploadRes.json();
        finalUrl = uploaded.url;
      }

      if (!finalUrl) {
        throw new Error("Please enter an image URL or upload an image file.");
      }

      const existing = getSlotBanner(activeSlot);

      const payload = {
        imageUrl: finalUrl,
        buttonLink: buttonLink || null,
        slot: activeSlot,
        isActive: Boolean(isActive),
      };

      const url = existing ? `/api/admin/banners/${existing.id}` : "/api/admin/banners";
      const method = existing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save showcase image.");
      }

      showToast("Showcase image updated successfully!");
      closeEditor();
      fetchBanners();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slotKey) => {
    const existing = getSlotBanner(slotKey);
    if (!existing) return;
    if (!confirm("Remove this image? The site will fallback to the default theme image.")) return;

    try {
      const res = await fetch(`/api/admin/banners/${existing.id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Image removed successfully!");
        fetchBanners();
      } else {
        showToast("Failed to remove image.", "error");
      }
    } catch {
      showToast("Network error removing image.", "error");
    }
  };

  const slotTL = getSlotBanner("quad_top_left");
  const slotBL1 = getSlotBanner("quad_bottom_left_1");
  const slotBL2 = getSlotBanner("quad_bottom_left_2");
  const slotR = getSlotBanner("quad_right");

  return (
    <div className="showcase-admin-container">
      {/* Page Header */}
      <div className="admin-page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div className="showcase-pill">HOMEPAGE SHOWCASE</div>
          <h1 className="admin-page-title">4-Image Promo Grid</h1>
          <p className="admin-page-subtitle">
            Control the 4 pure promo images displayed on the homepage. Click any panel below to upload or update its image and link.
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
          {/* Visual 4-Grid Preview Layout */}
          <div className="showcase-grid-preview">
            
            {/* Left Column (Top Wide + Bottom 2 Square) */}
            <div className="showcase-col-left">
              
              {/* Slot 1: Top-Left */}
              <div
                className={`showcase-card ${slotTL ? "showcase-card-active" : "showcase-card-empty"}`}
                onClick={() => openSlotEditor("quad_top_left")}
              >
                {slotTL ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slotTL.imageUrl} alt="Top Left" className="showcase-card-img" />
                    <div className="showcase-card-badge">Top Left (Wide)</div>
                    <div className="showcase-card-hover-overlay">
                      <span>Click to Change Image ✎</span>
                      {slotTL.buttonLink && <span className="showcase-link-tag">Link: {slotTL.buttonLink}</span>}
                    </div>
                  </>
                ) : (
                  <div className="showcase-placeholder">
                    <span className="showcase-pos-label">Top Left Banner (Wide 16:8)</span>
                    <span className="showcase-add-btn">+ Upload Image</span>
                  </div>
                )}
              </div>

              {/* Bottom Row - 2 Square Slots */}
              <div className="showcase-row-bottom">
                
                {/* Slot 2: Bottom-Left 1 */}
                <div
                  className={`showcase-card showcase-card-square ${slotBL1 ? "showcase-card-active" : "showcase-card-empty"}`}
                  onClick={() => openSlotEditor("quad_bottom_left_1")}
                >
                  {slotBL1 ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slotBL1.imageUrl} alt="Bottom Left 1" className="showcase-card-img" />
                      <div className="showcase-card-badge">Bottom Left 1 (Square)</div>
                      <div className="showcase-card-hover-overlay">
                        <span>Change Image ✎</span>
                      </div>
                    </>
                  ) : (
                    <div className="showcase-placeholder">
                      <span className="showcase-pos-label">Bottom Left 1 (1:1)</span>
                      <span className="showcase-add-btn">+ Upload</span>
                    </div>
                  )}
                </div>

                {/* Slot 3: Bottom-Left 2 */}
                <div
                  className={`showcase-card showcase-card-square ${slotBL2 ? "showcase-card-active" : "showcase-card-empty"}`}
                  onClick={() => openSlotEditor("quad_bottom_left_2")}
                >
                  {slotBL2 ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slotBL2.imageUrl} alt="Bottom Left 2" className="showcase-card-img" />
                      <div className="showcase-card-badge">Bottom Left 2 (Square)</div>
                      <div className="showcase-card-hover-overlay">
                        <span>Change Image ✎</span>
                      </div>
                    </>
                  ) : (
                    <div className="showcase-placeholder">
                      <span className="showcase-pos-label">Bottom Left 2 (1:1)</span>
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
              >
                {slotR ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slotR.imageUrl} alt="Right Tall" className="showcase-card-img" />
                    <div className="showcase-card-badge">Right Column (Tall Portrait)</div>
                    <div className="showcase-card-hover-overlay">
                      <span>Click to Change Image ✎</span>
                      {slotR.buttonLink && <span className="showcase-link-tag">Link: {slotR.buttonLink}</span>}
                    </div>
                  </>
                ) : (
                  <div className="showcase-placeholder">
                    <span className="showcase-pos-label">Right Column (Tall Portrait)</span>
                    <span className="showcase-add-btn">+ Upload Image</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Slot Cards List for Detailed Settings */}
          <div className="showcase-slots-list">
            <h3 className="showcase-list-title">Detailed Slots Management</h3>
            <div className="showcase-slots-grid">
              {SLOTS.map((slot) => {
                const b = getSlotBanner(slot.key);
                return (
                  <div key={slot.key} className="showcase-slot-item">
                    <div className="showcase-item-preview">
                      {b?.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={b.imageUrl} alt={slot.label} className="showcase-item-img" />
                      ) : (
                        <div className="showcase-item-noimg">No Custom Image</div>
                      )}
                    </div>
                    <div className="showcase-item-details">
                      <h4 className="showcase-item-name">{slot.label}</h4>
                      <p className="showcase-item-ratio">Recommended Ratio: <strong>{slot.ratio}</strong></p>
                      <p className="showcase-item-desc">{slot.desc}</p>
                      {b?.buttonLink && (
                        <p className="showcase-item-link">Link: <a href={b.buttonLink} target="_blank" rel="noreferrer">{b.buttonLink}</a></p>
                      )}
                    </div>
                    <div className="showcase-item-actions">
                      <button
                        type="button"
                        className="showcase-btn-edit"
                        onClick={() => openSlotEditor(slot.key)}
                      >
                        {b ? "Update Image" : "Upload Image"}
                      </button>
                      {b && (
                        <button
                          type="button"
                          className="showcase-btn-delete"
                          onClick={() => handleDelete(slot.key)}
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
        <div className="banner-modal-backdrop" onClick={(e) => e.target === e.currentTarget && closeEditor()}>
          <div className="banner-modal" style={{ maxWidth: "560px" }}>
            <div className="banner-modal-header">
              <div>
                <h2 className="banner-modal-title">
                  {SLOTS.find((s) => s.key === activeSlot)?.label || "Configure Slot"}
                </h2>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>
                  Recommended: {SLOTS.find((s) => s.key === activeSlot)?.ratio}
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
                <label className="banner-form-label">Image Source *</label>
                <div className="banner-upload-tabs">
                  <button
                    type="button"
                    className={"banner-tab" + (uploadMethod === "url" ? " banner-tab-active" : "")}
                    onClick={() => setUploadMethod("url")}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    className={"banner-tab" + (uploadMethod === "upload" ? " banner-tab-active" : "")}
                    onClick={() => setUploadMethod("upload")}
                  >
                    Upload File
                  </button>
                </div>

                {uploadMethod === "url" ? (
                  <input
                    className="banner-form-input"
                    type="url"
                    placeholder="https://example.com/promo-banner.jpg"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                      setImageFile(null);
                    }}
                  />
                ) : (
                  <div className="banner-file-drop" onClick={() => fileRef.current?.click()}>
                    <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "#6366f1" }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>{imageFile ? "Image selected ✓" : "Click to choose image file"}</span>
                  </div>
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
                <span style={{ fontSize: "11px", color: "#64748b" }}>
                  If set, visitors clicking this image will be redirected to this URL.
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
                  <span className="banner-toggle-label">{isActive ? "Active (Displayed on site)" : "Inactive"}</span>
                </div>
              </div>

              {error && <p className="banner-form-error">{error}</p>}

              <div className="banner-form-actions">
                <button type="button" className="banner-btn-cancel" onClick={closeEditor} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="banner-btn-save" disabled={saving}>
                  {saving ? "Saving..." : "Save Image"}
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

        /* 4-Grid Preview */
        .showcase-grid-preview {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 16px;
          margin-top: 24px;
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
          box-shadow: 0 8px 30px rgba(99,102,241,0.2);
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
          position: absolute; top: 10px; left: 10px; z-index: 2;
          padding: 4px 10px; border-radius: 6px;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          background: rgba(0,0,0,0.7); color: #fff;
          backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.15);
        }

        .showcase-card-hover-overlay {
          position: absolute; inset: 0; z-index: 3;
          background: rgba(15,23,42,0.8);
          opacity: 0; transition: opacity .2s ease;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; color: #fff; font-size: 13px; font-weight: 600;
        }
        .showcase-card:hover .showcase-card-hover-overlay {
          opacity: 1;
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
        .showcase-item-noimg { font-size: 9.5px; color: #64748b; text-align: center; }

        .showcase-item-details { flex: 1; min-width: 0; }
        .showcase-item-name { font-size: 13.5px; font-weight: 700; color: #f1f5f9; margin: 0 0 2px; }
        .showcase-item-ratio { font-size: 11.5px; color: #818cf8; margin: 0 0 2px; }
        .showcase-item-desc { font-size: 11px; color: #64748b; margin: 0; line-clamp: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .showcase-item-link { font-size: 11px; color: #94a3b8; margin: 2px 0 0; }
        .showcase-item-link a { color: #38bdf8; text-decoration: underline; }

        .showcase-item-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
        .showcase-btn-edit {
          padding: 6px 12px; border-radius: 7px; border: none;
          background: rgba(99,102,241,0.18); color: #818cf8;
          font-size: 12px; font-weight: 600; cursor: pointer; transition: background .15s;
        }
        .showcase-btn-edit:hover { background: rgba(99,102,241,0.3); }
        .showcase-btn-delete {
          padding: 4px 10px; border-radius: 7px; border: none;
          background: rgba(239,68,68,0.12); color: #f87171;
          font-size: 11.5px; font-weight: 500; cursor: pointer;
        }
        .showcase-btn-delete:hover { background: rgba(239,68,68,0.22); }

        .showcase-modal-preview {
          margin-top: 10px;
          border-radius: 10px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          max-height: 180px; width: 100%;
        }
        .showcase-modal-img { width: 100%; height: 180px; object-fit: cover; display: block; }
      `}</style>
    </div>
  );
}
