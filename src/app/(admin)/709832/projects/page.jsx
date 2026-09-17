"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiImage, FiMonitor, FiSmartphone, FiCrop, FiInfo, FiLayers, FiPlus, FiTrash2, FiList, FiCheck, FiEye, FiExternalLink } from "react-icons/fi";
import { showToast } from "@/lib/toast";

const DEFAULT_TAGS = ["E-Commerce", "SaaS", "Portfolio", "Healthcare", "EdTech", "Mobile App", "Web App", "Other"];
const ACCENT_OPTIONS = ["violet", "cyan", "amber", "emerald", "rose"];

const EMPTY_FORM = {
  slug: "",
  tag: "SaaS",
  title: "",
  descriptionTitle: "About The Project",
  description: "",
  image: "",
  accent: "violet",
  liveUrl: "",
  mobileImages: "",
  desktopImages: "",
  client: "",
  duration: "",
  tech: "",
  features: [],
  featureStyle: "dot",
};

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── Upload helper ────────────────────────────────────────────────────────────
async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch("/api/admin/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Image: reader.result }),
        });
        const data = await res.json();
        if (!res.ok) reject(new Error(data.error || "Upload failed"));
        else resolve(data.url);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

// ─── Single image field (URL + upload) ───────────────────────────────────────
function ImageUploadField({ label, sizeNote, hint, value, onChange, placeholder = "https://..." }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");

  useEffect(() => {
    const t = setTimeout(() => setPreview(value), 500);
    return () => clearTimeout(t);
  }, [value]);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch {
      showToast.error("Upload failed. Please try again.");
    }
    setUploading(false);
    e.target.value = "";
  };

  return (
    <div className="admin-field-group">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
        <label className="admin-label" style={{ margin: 0 }}>{label}</label>
        {sizeNote && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", border: "1px solid rgba(99, 102, 241, 0.25)", fontFamily: "monospace" }}>
            <FiCrop size={12} /> {sizeNote}
          </span>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <input
          className="admin-input"
          style={{ flex: 1 }}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            onError={() => setPreview("")}
            style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}
          />
        )}
        <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          style={{ padding: "0 12px", height: 42, flexShrink: 0, gap: 6, fontSize: 13 }}
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          title="Upload image"
        >
          {uploading ? (
            <div className="admin-spinner-btn" />
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {hint && <span style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{hint}</span>}
    </div>
  );
}

// ─── Multi image field (one URL per line + batch upload) ─────────────────────
function MultiImageUploadField({ label, sizeNote, hint, value, onChange, placeholder }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setProgress({ done: 0, total: files.length });
    const uploaded = [];
    for (const file of files) {
      try {
        const url = await uploadToCloudinary(file);
        uploaded.push(url);
      } catch {
        // skip failed
      }
      setProgress(p => ({ ...p, done: p.done + 1 }));
    }
    if (uploaded.length) {
      const existing = value.trim();
      const newVal = existing ? existing + "\n" + uploaded.join("\n") : uploaded.join("\n");
      onChange(newVal);
    }
    setUploading(false);
    e.target.value = "";
  };

  return (
    <div className="admin-field-group">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <label className="admin-label" style={{ margin: 0 }}>{label}</label>
          {sizeNote && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10.5, padding: "1px 6px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "monospace" }}>
              <FiCrop size={11} /> {sizeNote}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleFiles} />
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "4px 12px", fontSize: 12, height: 30, gap: 5 }}
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <><div className="admin-spinner-btn" /> {progress.done}/{progress.total}</>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload
              </>
            )}
          </button>
        </div>
      </div>
      <textarea
        className="admin-input admin-textarea"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={4}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", marginTop: 4 }}>
        <span>{value.split("\n").filter(Boolean).length} image(s) — one URL per line</span>
        {hint && <span style={{ color: "#94a3b8" }}>{hint}</span>}
      </div>
    </div>
  );
}

// ─── Key Features Builder Component (Multi-Subtitle & Individual Dot/Number Style) ───
function KeyFeaturesBuilder({ items = [], onChangeItems }) {
  const addFeature = () => {
    onChangeItems([
      ...items,
      {
        title: "",
        style: "dot",
        subtitles: [{ text: "", style: "dot" }],
      },
    ]);
  };

  const removeFeature = (fIdx) => {
    onChangeItems(items.filter((_, idx) => idx !== fIdx));
  };

  const updateFeature = (fIdx, field, val) => {
    const next = [...items];
    next[fIdx] = { ...next[fIdx], [field]: val };
    onChangeItems(next);
  };

  const addSubtitle = (fIdx) => {
    const next = [...items];
    const currSubs = Array.isArray(next[fIdx].subtitles) ? next[fIdx].subtitles : [];
    next[fIdx] = {
      ...next[fIdx],
      subtitles: [...currSubs, { text: "", style: "dot" }],
    };
    onChangeItems(next);
  };

  const updateSubtitle = (fIdx, sIdx, field, val) => {
    const next = [...items];
    const currSubs = Array.isArray(next[fIdx].subtitles) ? [...next[fIdx].subtitles] : [];
    currSubs[sIdx] = { ...currSubs[sIdx], [field]: val };
    next[fIdx] = { ...next[fIdx], subtitles: currSubs };
    onChangeItems(next);
  };

  const removeSubtitle = (fIdx, sIdx) => {
    const next = [...items];
    const currSubs = Array.isArray(next[fIdx].subtitles) ? next[fIdx].subtitles : [];
    next[fIdx] = {
      ...next[fIdx],
      subtitles: currSubs.filter((_, idx) => idx !== sIdx),
    };
    onChangeItems(next);
  };

  return (
    <div className="admin-field-group" style={{ background: "rgba(255,255,255,0.02)", padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div>
          <label className="admin-label" style={{ margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
            <FiList size={14} style={{ color: "#818cf8" }} />
            <span>Key Features &amp; Multi-Subtitles</span>
          </label>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>
            প্রতিটি ফিচারের টাইটেল ও সাবটাইটেল ইচ্ছেমতো যোগ করুন এবং টাইটেল ও সাবটাইটেলের ডট (•) বা নাম্বার (১.) আলাদা করে সেট করুন
          </span>
        </div>
      </div>

      {/* Feature list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "16px 12px", background: "rgba(255,255,255,0.015)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 12.5, color: "#64748b" }}>
              No key features added yet. Click <strong>Add Feature</strong> below to create one.
            </p>
          </div>
        )}

        {items.map((feat, fIdx) => {
          const fStyle = feat.style || "dot";
          const subs = Array.isArray(feat.subtitles)
            ? feat.subtitles
            : feat.subtitle
              ? [{ text: feat.subtitle, style: "dot" }]
              : [];

          return (
            <div
              key={fIdx}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "12px 14px",
                borderRadius: 12,
              }}
            >
              {/* Feature Title Row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Visual indicator */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: fStyle === "number" ? 6 : "50%",
                    background: fStyle === "number" ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.2)",
                    color: "#818cf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: fStyle === "number" ? 11 : 16,
                    fontWeight: 700,
                    flexShrink: 0,
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                  }}
                >
                  {fStyle === "number" ? fIdx + 1 : "•"}
                </div>

                {/* Title input */}
                <input
                  type="text"
                  className="admin-input"
                  style={{ flex: 1, height: 36, fontSize: 13, fontWeight: 600, padding: "6px 12px" }}
                  placeholder={`Feature ${fIdx + 1} Title (e.g. Modern Architecture)`}
                  value={feat.title || ""}
                  onChange={(e) => updateFeature(fIdx, "title", e.target.value)}
                />

                {/* Title style toggle */}
                <div style={{ display: "inline-flex", background: "rgba(0,0,0,0.3)", borderRadius: 6, padding: 2, border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => updateFeature(fIdx, "style", "dot")}
                    title="Title badge: Dot"
                    style={{
                      padding: "3px 8px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      background: fStyle === "dot" ? "#6366f1" : "transparent",
                      color: fStyle === "dot" ? "#fff" : "#94a3b8",
                    }}
                  >
                    • Dot
                  </button>
                  <button
                    type="button"
                    onClick={() => updateFeature(fIdx, "style", "number")}
                    title="Title badge: Number"
                    style={{
                      padding: "3px 8px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      background: fStyle === "number" ? "#6366f1" : "transparent",
                      color: fStyle === "number" ? "#fff" : "#94a3b8",
                    }}
                  >
                    1. Num
                  </button>
                </div>

                {/* Delete feature button */}
                <button
                  type="button"
                  onClick={() => removeFeature(fIdx)}
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    color: "#f87171",
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  title="Remove this feature"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>

              {/* Subtitles Area */}
              <div style={{ marginLeft: 38, paddingLeft: 12, borderLeft: "2px solid rgba(99, 102, 241, 0.2)", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Subtitles / Bullet Points ({subs.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => addSubtitle(fIdx)}
                    style={{
                      background: "rgba(99, 102, 241, 0.12)",
                      border: "1px solid rgba(99, 102, 241, 0.25)",
                      color: "#a5b4fc",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <FiPlus size={11} /> Add Subtitle
                  </button>
                </div>

                {subs.map((sub, sIdx) => {
                  const subStyle = sub.style || "dot";
                  return (
                    <div key={sIdx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {/* Subtitle style toggle */}
                      <div style={{ display: "inline-flex", background: "rgba(0,0,0,0.3)", borderRadius: 5, padding: 1, border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
                        <button
                          type="button"
                          onClick={() => updateSubtitle(fIdx, sIdx, "style", "dot")}
                          style={{
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontSize: 10,
                            fontWeight: 700,
                            border: "none",
                            cursor: "pointer",
                            background: subStyle === "dot" ? "#818cf8" : "transparent",
                            color: subStyle === "dot" ? "#fff" : "#64748b",
                          }}
                          title="Dot bullet"
                        >
                          •
                        </button>
                        <button
                          type="button"
                          onClick={() => updateSubtitle(fIdx, sIdx, "style", "number")}
                          style={{
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontSize: 10,
                            fontWeight: 700,
                            border: "none",
                            cursor: "pointer",
                            background: subStyle === "number" ? "#818cf8" : "transparent",
                            color: subStyle === "number" ? "#fff" : "#64748b",
                          }}
                          title="Number bullet"
                        >
                          1.
                        </button>
                      </div>

                      {/* Subtitle text input */}
                      <input
                        type="text"
                        className="admin-input"
                        style={{ height: 30, fontSize: 12, padding: "2px 10px", color: "#e2e8f0" }}
                        placeholder={`Subtitle point ${sIdx + 1}...`}
                        value={sub.text || ""}
                        onChange={(e) => updateSubtitle(fIdx, sIdx, "text", e.target.value)}
                      />

                      {/* Remove subtitle button */}
                      <button
                        type="button"
                        onClick={() => removeSubtitle(fIdx, sIdx)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#64748b",
                          cursor: "pointer",
                          padding: 4,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                        title="Remove point"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Button */}
      <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={addFeature}
          className="admin-btn admin-btn-secondary"
          style={{ height: 32, padding: "0 12px", fontSize: 12, gap: 5 }}
        >
          <FiPlus size={13} />
          <span>Add Feature</span>
        </button>
      </div>
    </div>
  );
}


export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Dynamic tag management
  const [tagOptions, setTagOptions] = useState(DEFAULT_TAGS);
  const [showNewTag, setShowNewTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      showToast("Failed to load projects.", "error");
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // Update preview when image URL changes
  useEffect(() => {
    const timer = setTimeout(() => setPreviewImage(form.image), 600);
    return () => clearTimeout(timer);
  }, [form.image]);

  const openAdd = () => {
    setEditProject(null);
    setForm(EMPTY_FORM);
    setPreviewImage("");
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProject(p);
    const det = p.details || {};
    const imgs = p.images || {};

    // Normalize raw features into [{ title, style, subtitles: [{ text, style }] }] objects
    let normalizedFeatures = [];
    if (Array.isArray(det.features)) {
      normalizedFeatures = det.features.map(f => {
        if (typeof f === "string") {
          const parts = f.split(" — ");
          const t = parts[0].trim();
          const sub = parts.slice(1).join(" — ").trim();
          return {
            title: t,
            style: det.featureStyle || "dot",
            subtitles: sub ? [{ text: sub, style: "dot" }] : [{ text: "", style: "dot" }],
          };
        }
        if (typeof f === "object" && f !== null) {
          const t = f.title || "";
          const fStyle = f.style || det.featureStyle || "dot";
          let subs = [];
          if (Array.isArray(f.subtitles)) {
            subs = f.subtitles.map(s => {
              if (typeof s === "string") return { text: s.trim(), style: "dot" };
              return { text: s?.text?.trim() || "", style: s?.style || "dot" };
            }).filter(s => s.text);
          } else if (f.subtitle) {
            subs = [{ text: f.subtitle.trim(), style: "dot" }];
          }
          return {
            title: t,
            style: fStyle,
            subtitles: subs.length > 0 ? subs : [{ text: "", style: "dot" }],
          };
        }
        return null;
      }).filter(Boolean);
    }

    setForm({
      slug: p.slug || "",
      tag: p.tag || "SaaS",
      title: p.title || "",
      descriptionTitle: det.descriptionTitle || "",
      description: p.description || "",
      image: p.image || "",
      accent: p.accent || "violet",
      liveUrl: p.liveUrl || "",
      mobileImages: (imgs.mobile || []).join("\n"),
      desktopImages: (imgs.desktop || []).join("\n"),
      client: det.client || "",
      duration: det.duration || "",
      tech: (det.tech || []).join(", "),
      features: normalizedFeatures,
      featureStyle: det.featureStyle || "dot",
    });
    setPreviewImage(p.image || "");
    // ensure existing tag appears in options
    if (p.tag && !tagOptions.includes(p.tag)) {
      setTagOptions(prev => [...prev, p.tag]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditProject(null);
    setForm(EMPTY_FORM);
    setPreviewImage("");
    setShowNewTag(false);
    setNewTagInput("");
  };

  const handleAddTag = () => {
    const tag = newTagInput.trim();
    if (!tag) return;
    if (!tagOptions.includes(tag)) {
      setTagOptions(prev => [...prev, tag]);
    }
    setForm(f => ({ ...f, tag }));
    setNewTagInput("");
    setShowNewTag(false);
  };

  const handleTitleChange = (val) => {
    setForm(f => ({
      ...f,
      title: val,
      slug: editProject ? f.slug : toSlug(val),
    }));
  };

  const buildPayload = () => ({
    slug: form.slug.trim(),
    tag: form.tag,
    title: form.title.trim(),
    description: form.description.trim(),
    image: form.image.trim() || null,
    accent: form.accent,
    liveUrl: form.liveUrl.trim() || null,
    images: {
      mobile: form.mobileImages.split("\n").map(s => s.trim()).filter(Boolean),
      desktop: form.desktopImages.split("\n").map(s => s.trim()).filter(Boolean),
    },
    details: {
      descriptionTitle: form.descriptionTitle?.trim() || null,
      client: form.client.trim(),
      duration: form.duration.trim(),
      tech: form.tech.split(",").map(s => s.trim()).filter(Boolean),
      features: (Array.isArray(form.features) ? form.features : [])
        .map(f => {
          const subs = (Array.isArray(f.subtitles) ? f.subtitles : (f.subtitle ? [{ text: f.subtitle, style: "dot" }] : []))
            .map(s => ({
              text: typeof s === "object" ? s.text?.trim() || "" : String(s).trim(),
              style: typeof s === "object" && s.style ? s.style : "dot",
            }))
            .filter(s => s.text);
          return {
            title: f.title?.trim() || "",
            style: f.style || "dot",
            subtitles: subs,
          };
        })
        .filter(f => f.title || f.subtitles.length > 0),
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.slug) { showToast("Slug is required.", "error"); return; }
    setSaving(true);
    const payload = buildPayload();
    if (editProject?.id) {
      payload.id = editProject.id;
    }
    const targetId = editProject ? (editProject.id || editProject.slug) : null;
    const url = editProject ? `/api/admin/projects/${targetId}` : "/api/admin/projects";
    const method = editProject ? "PUT" : "POST";
    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok) {
        showToast(editProject ? "Project updated!" : "Project added!");
        closeModal();
        fetchProjects();
      } else {
        showToast(data.error || "Something went wrong.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
    setSaving(false);
  };

  const handleDelete = async (proj) => {
    const targetId = typeof proj === "object" && proj !== null ? (proj.id || proj.slug) : proj;
    if (!targetId) return;
    const confirmed = await confirmToast("Delete this project? This cannot be undone.", {
      confirmText: "Delete Project",
      cancelText: "Cancel",
      danger: true,
    });
    if (!confirmed) return;
    setDeleting(targetId);
    try {
      const res = await fetch(`/api/admin/projects/${targetId}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Project deleted.");
        fetchProjects();
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error || "Delete failed.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
    setDeleting(null);
  };

  const accentDot = {
    violet: "#7c3aed", cyan: "#06b6d4", amber: "#f59e0b", emerald: "#10b981", rose: "#f43f5e",
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 className="admin-page-title">Projects</h1>
          <p className="admin-page-subtitle">Manage your portfolio — add, edit or remove projects</p>
        </div>
        <button id="add-project-btn" className="admin-btn admin-btn-primary" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Project
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3].map(i => <div key={i} className="project-skeleton"></div>)}
        </div>
      ) : projects.length === 0 ? (
        <div className="admin-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
          </svg>
          <p>No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="projects-list">
          {projects.map((p) => {
            const det = p.details || {};
            const tech = det.tech || [];
            return (
              <div key={p.id} className="project-row">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="project-row-img" />
                ) : (
                  <div className="project-row-img-placeholder">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
                <div className="project-row-info">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: accentDot[p.accent] || "#7c3aed", display: "inline-block", flexShrink: 0 }} />
                    <h3 className="project-row-title">{p.title}</h3>
                    <span className="admin-badge admin-badge-purple">{p.tag}</span>
                  </div>
                  <p className="project-row-slug">/{p.slug}</p>
                  <p className="project-row-desc">{p.description?.slice(0, 100)}{(p.description?.length || 0) > 100 ? "..." : ""}</p>
                  {tech.length > 0 && (
                    <div className="project-tech-tags">
                      {tech.map(t => <span key={t} className="project-tech-tag">{t}</span>)}
                    </div>
                  )}
                </div>
                <div className="project-row-actions">
                  <a
                    href={`/our-projects/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn admin-btn-secondary"
                    style={{ padding: "8px 12px", textDecoration: "none", color: "#a5b4fc", borderColor: "rgba(99, 102, 241, 0.25)" }}
                    title="View project details page & auto-scroll mockup"
                  >
                    <FiEye size={14} />
                    Preview
                  </a>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary" style={{ padding: "8px 12px", textDecoration: "none" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live
                    </a>
                  )}
                  <button className="admin-btn admin-btn-secondary" style={{ padding: "8px 12px" }} onClick={() => openEdit(p)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                  <button className="admin-btn admin-btn-danger" style={{ padding: "8px 12px" }} onClick={() => handleDelete(p)} disabled={deleting === p.id || deleting === p.slug}>
                    {(deleting === p.id || deleting === p.slug) ? <div className="admin-spinner-btn"></div> : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    )}
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal project-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 className="admin-modal-title" style={{ margin: 0 }}>{editProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: 4 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Section: Basic Info */}
              <div className="modal-section-label">Basic Info</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="admin-field-group">
                  <label className="admin-label">Title *</label>
                  <input className="admin-input" placeholder="My Awesome Project" value={form.title} onChange={e => handleTitleChange(e.target.value)} required />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Slug *</label>
                  <input className="admin-input" placeholder="my-awesome-project" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="admin-field-group">
                  <label className="admin-label">Tag / Category *</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <select
                      className="admin-input"
                      style={{ flex: 1 }}
                      value={form.tag}
                      onChange={e => {
                        if (e.target.value === "__add_new__") {
                          setShowNewTag(true);
                        } else {
                          setForm(f => ({ ...f, tag: e.target.value }));
                          setShowNewTag(false);
                        }
                      }}
                    >
                      {tagOptions.map(t => <option key={t} value={t}>{t}</option>)}
                      <option value="__add_new__">➕ Add New Tag...</option>
                    </select>
                  </div>
                  {showNewTag && (
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <input
                        className="admin-input"
                        style={{ flex: 1 }}
                        placeholder="e.g. Fintech"
                        value={newTagInput}
                        onChange={e => setNewTagInput(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                        autoFocus
                      />
                      <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        style={{ padding: "0 16px", flexShrink: 0 }}
                        onClick={handleAddTag}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: "0 12px", flexShrink: 0 }}
                        onClick={() => { setShowNewTag(false); setNewTagInput(""); }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Accent Color *</label>
                  <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
                    {ACCENT_OPTIONS.map(a => (
                      <button key={a} type="button" onClick={() => setForm(f => ({ ...f, accent: a }))}
                        style={{ width: 28, height: 28, borderRadius: "50%", background: accentDot[a], border: form.accent === a ? "3px solid white" : "3px solid transparent", boxShadow: form.accent === a ? `0 0 0 2px ${accentDot[a]}` : "none", cursor: "pointer", transition: "all 0.15s" }}
                        title={a}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="admin-field-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="admin-label">Description Title</label>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Default: About The Project</span>
                </div>
                <input
                  className="admin-input"
                  placeholder="e.g. About The Project / Project Overview"
                  value={form.descriptionTitle}
                  onChange={e => setForm(f => ({ ...f, descriptionTitle: e.target.value }))}
                />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">Description *</label>
                <textarea className="admin-input admin-textarea" placeholder="Detailed project description..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={3} />
              </div>

              {/* Section: Images */}
              <div className="modal-section-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <FiLayers size={14} /> Images & Showcase Mockup
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "#818cf8" }}>
                  <FiInfo size={13} /> Recommended Size Guide
                </span>
              </div>

              {/* Recommended Size Guide Note Box */}
              <div
                style={{
                  marginBottom: 16,
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
                  border: "1px solid rgba(99, 102, 241, 0.22)",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 12,
                  fontSize: 12,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(99, 102, 241, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#818cf8" }}>
                      <FiImage size={13} />
                    </div>
                    <span style={{ fontWeight: 700, color: "#818cf8" }}>Cover Image</span>
                  </div>
                  <span style={{ color: "#e2e8f0", fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>1200 × 675 px (16:9)</span>
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>কার্ড ও পোর্টফোলিও থাম্বনেইলের কভার ইমেজ</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(6, 182, 212, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8" }}>
                      <FiMonitor size={13} />
                    </div>
                    <span style={{ fontWeight: 700, color: "#38bdf8" }}>Desktop Shots</span>
                  </div>
                  <span style={{ color: "#e2e8f0", fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>1440px wide (Full Page)</span>
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>ডিটেইলস পেজে হোভার করলে স্মুথলি অটো-স্ক্রল হবে</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#34d399" }}>
                      <FiSmartphone size={13} />
                    </div>
                    <span style={{ fontWeight: 700, color: "#34d399" }}>Mobile Shots</span>
                  </div>
                  <span style={{ color: "#e2e8f0", fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>390 × 844 px (Portrait)</span>
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>অতিরিক্ত মোবাইল স্ক্রিনশট (ঐচ্ছিক)</span>
                </div>
              </div>

              <ImageUploadField
                label="Cover Image (Card & Portfolio Thumbnail) *"
                sizeNote="1200 × 675 px (16:9)"
                hint="Used as the main thumbnail on homepage & portfolio project cards"
                value={form.image}
                onChange={val => setForm(f => ({ ...f, image: val }))}
                placeholder="https://res.cloudinary.com/... (16:9 Aspect Ratio)"
              />

              <div style={{ marginTop: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <MultiImageUploadField
                    label="Desktop Screenshots (Details Page Showcase)"
                    sizeNote="1440px width (Auto-scroll mockup)"
                    hint="ডিটেইলস পেজের browser mockup এই ইমেজটি থেকে দেখাবে"
                    value={form.desktopImages}
                    onChange={val => setForm(f => ({ ...f, desktopImages: val }))}
                    placeholder={"https://...\nhttps://..."}
                  />
                  <MultiImageUploadField
                    label="Mobile Screenshots (Optional)"
                    sizeNote="390 × 844 px"
                    hint="মোবাইল পোর্ট্রেট স্ক্রিনশট (ঐচ্ছিক)"
                    value={form.mobileImages}
                    onChange={val => setForm(f => ({ ...f, mobileImages: val }))}
                    placeholder={"https://...\nhttps://..."}
                  />
                </div>
              </div>

              {/* Section: Links */}
              <div className="modal-section-label">Links</div>
              <div className="admin-field-group">
                <label className="admin-label">Live URL</label>
                <input className="admin-input" placeholder="https://yourproject.com" value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} />
              </div>

              {/* Section: Details */}
              <div className="modal-section-label">Project Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="admin-field-group">
                  <label className="admin-label">Client Name</label>
                  <input className="admin-input" placeholder="Enter client name" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Duration</label>
                  <input className="admin-input" placeholder="3 months" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
                </div>
              </div>
              <div className="admin-field-group">
                <label className="admin-label">Tech Stack (comma separated)</label>
                <input className="admin-input" placeholder="Next.js, Node.js, MongoDB, Tailwind" value={form.tech} onChange={e => setForm(f => ({ ...f, tech: e.target.value }))} />
              </div>
              {/* Key Features Builder (Multi-Subtitle & Individual Dot/Number Style) */}
              <KeyFeaturesBuilder
                items={Array.isArray(form.features) ? form.features : []}
                onChangeItems={(newItems) => setForm(f => ({ ...f, features: newItems }))}
              />

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? <><div className="admin-spinner-btn"></div> Saving...</> : (editProject ? "Update Project" : "Add Project")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .projects-list { display: flex; flex-direction: column; gap: 12px; }
        .project-row {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex; align-items: center; gap: 16px;
          transition: border-color 0.2s;
        }
        .project-row:hover { border-color: rgba(255,255,255,0.1); }
        .project-row-img {
          width: 80px; height: 56px;
          border-radius: 10px; object-fit: cover;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .project-row-img-placeholder {
          width: 80px; height: 56px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: center;
          color: #334155; flex-shrink: 0;
        }
        .project-row-info { flex: 1; min-width: 0; }
        .project-row-title { font-size: 15px; font-weight: 600; color: #e2e8f0; margin: 0 0 2px; }
        .project-row-slug { font-size: 11px; color: #475569; margin: 0 0 4px; font-family: monospace; }
        .project-row-desc { font-size: 13px; color: #475569; margin: 0 0 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .project-tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .project-tech-tag {
          padding: 2px 8px; border-radius: 6px;
          font-size: 11px; font-weight: 500;
          background: rgba(99,102,241,0.1);
          color: #a5b4fc;
          border: 1px solid rgba(99,102,241,0.15);
        }
        .project-row-actions { display: flex; gap: 8px; flex-shrink: 0; align-items: center; }
        .project-skeleton {
          height: 88px; border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        .project-modal {
          max-width: 680px !important;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-section-label {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: #6366f1; margin: 20px 0 12px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(99,102,241,0.2);
        }
      `}</style>
    </div>
  );
}
