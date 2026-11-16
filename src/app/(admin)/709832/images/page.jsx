"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import { showToast, confirmToast } from "@/lib/toast";

export default function ImagesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data: session } = useSession();
  const emailLower = String(session?.user?.email || "").toLowerCase().trim();
  const rawRole = String(session?.user?.role || "USER").toUpperCase().replace(/-/g, "_");
  const isAdmin = emailLower === "merxodevsolutions@gmail.com" || rawRole === "ADMIN";
  const isTeamMember = !isAdmin && rawRole === "TEAM_MEMBER";

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [preview, setPreview] = useState(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/images");
    const data = await res.json();
    setImages(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) { showToast("Please select an image file.", "error"); return; }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFileSelect(e.dataTransfer.files[0]); };

  const handleUpload = async () => {
    if (!preview) return;
    setUploading(true);
    const res = await fetch("/api/admin/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Image: preview, altText, caption }),
    });
    if (res.ok) {
      showToast("Image uploaded successfully!");
      setPreview(null); setAltText(""); setCaption(""); fetchImages();
    } else { showToast("Upload failed.", "error"); }
    setUploading(false);
  };

  const handleDelete = async (img) => {
    if (isTeamMember) {
      showToast("Team members can copy image URLs, but cannot delete images.", "error");
      return;
    }
    const confirmed = await confirmToast("Delete this image? This cannot be undone.", {
      confirmText: "Delete Image",
      cancelText: "Cancel",
      danger: true,
    });
    if (!confirmed) return;
    setDeleting(img.id);
    const res = await fetch("/api/admin/images/" + img.id, { method: "DELETE" });
    if (res.ok) { showToast("Image deleted."); fetchImages(); setSelectedImage(null); }
    else showToast("Delete failed.", "error");
    setDeleting(null);
  };

  const copyUrl = (url) => { navigator.clipboard.writeText(url); showToast("URL copied!"); };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Images</h1>
        <p className="admin-page-subtitle">Upload and manage your media library</p>
      </div>

      <div className="admin-card" style={{ marginBottom: 28 }}>
        <h3 style={{ color: isDark ? "#94a3b8" : "#0f172a", margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Upload New Image</h3>
        {!preview ? (
          <div
            className={"upload-dropzone" + (dragOver ? " upload-dropzone-active" : "")}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-dropzone-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className="upload-dropzone-text">Drop image here or <span>click to browse</span></p>
            <p className="upload-dropzone-hint">PNG, JPG, WebP supported</p>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileSelect(e.target.files[0])} />
          </div>
        ) : (
          <div className="upload-preview-area">
            <img src={preview} alt="Preview" className="upload-preview-img" />
            <div className="upload-preview-form">
              <div className="admin-field-group">
                <label className="admin-label">Alt Text</label>
                <input className="admin-input" placeholder="Describe this image..." value={altText} onChange={(e) => setAltText(e.target.value)} />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">Caption (optional)</label>
                <input className="admin-input" placeholder="Image caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="admin-btn admin-btn-primary" onClick={handleUpload} disabled={uploading}>
                  {uploading ? <><span className="admin-spinner-btn"></span> Uploading...</> : "Upload to Cloudinary"}
                </button>
                <button className="admin-btn admin-btn-secondary" onClick={() => { setPreview(null); setAltText(""); setCaption(""); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <h3 style={{ color: isDark ? "#64748b" : "#334155", margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>
        Media Library {!loading && <span style={{ color: isDark ? "#334155" : "#64748b" }}>({images.length} files)</span>}
      </h3>

      {loading ? (
        <div className="images-grid">{[1,2,3,4,5,6].map((i) => <div key={i} className="image-skeleton"></div>)}</div>
      ) : images.length === 0 ? (
        <div className="admin-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <p>No images yet. Upload your first image!</p>
        </div>
      ) : (
        <div className="images-grid">
          {images.map((img) => (
            <div key={img.id} className={"image-card" + (selectedImage?.id === img.id ? " image-card-selected" : "")} onClick={() => setSelectedImage(img)}>
              <img src={img.url} alt={img.altText || "image"} className="image-card-img" />
              <div className="image-card-overlay">
                <div className="image-card-actions">
                  <button className="image-action-btn" onClick={(e) => { e.stopPropagation(); copyUrl(img.url); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                  </button>
                  {!isTeamMember && (
                    <button className="image-action-btn image-action-delete" onClick={(e) => { e.stopPropagation(); handleDelete(img); }} disabled={deleting === img.id}>
                      {deleting === img.id ? <span className="admin-spinner-btn"></span> : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
              {img.altText && <p className="image-card-alt">{img.altText}</p>}
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="admin-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="admin-modal" style={{ maxWidth: 680 }} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.altText} style={{ width: "100%", borderRadius: 12, marginBottom: 16, maxHeight: 320, objectFit: "contain", background: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><span className="admin-label">Alt Text</span><p style={{margin:0,color:isDark ? "#94a3b8" : "#475569",fontSize:14}}>{selectedImage.altText || "-"}</p></div>
              <div><span className="admin-label">Caption</span><p style={{margin:0,color:isDark ? "#94a3b8" : "#475569",fontSize:14}}>{selectedImage.caption || "-"}</p></div>
              {selectedImage.width && <div><span className="admin-label">Dimensions</span><p style={{margin:0,color:isDark ? "#94a3b8" : "#475569",fontSize:14}}>{selectedImage.width} x {selectedImage.height}px</p></div>}
              {selectedImage.fileSize && <div><span className="admin-label">File Size</span><p style={{margin:0,color:isDark ? "#94a3b8" : "#475569",fontSize:14}}>{(selectedImage.fileSize / 1024).toFixed(1)} KB</p></div>}
            </div>
            <div style={{ marginTop: 16, padding: "10px 14px", background: isDark ? "rgba(255,255,255,.03)" : "#f8fafc", borderRadius: 8, border: isDark ? "1px solid rgba(255,255,255,.06)" : "1px solid #e2e8f0" }}>
              <code style={{ fontSize: 12, color: isDark ? "#64748b" : "#4338ca", wordBreak: "break-all" }}>{selectedImage.url}</code>
            </div>
            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-secondary" onClick={() => setSelectedImage(null)}>Close</button>
              <button className="admin-btn admin-btn-primary" onClick={() => copyUrl(selectedImage.url)}>Copy URL</button>
              {!isTeamMember && (
                <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(selectedImage)} disabled={deleting === selectedImage.id}>Delete</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}