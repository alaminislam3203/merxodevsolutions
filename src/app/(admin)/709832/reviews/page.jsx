"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  FaStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaPlus,
  FaEdit,
  FaQuoteLeft,
  FaClock,
  FaCrown,
  FaUserCheck,
  FaSearch,
  FaMapMarkerAlt,
  FaUpload,
  FaImage,
} from "react-icons/fa";
import { showToast } from "@/lib/toast";

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

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all' | 'pending' | 'approved'
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    userName: "",
    userRole: "Client",
    userImage: "",
    company: "",
    location: "Dhaka, Bangladesh",
    tag: "Verified Client",
    rating: 5,
    comment: "",
    isApproved: true,
    isFeatured: false,
  });

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews?filter=${filter}`);
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
        setStats(data.stats || { total: data.reviews.length, pending: 0, approved: 0 });
      } else {
        showToast(data.error || "Failed to fetch reviews.", "error");
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      showToast("Error connecting to server.", "error");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      userName: "",
      userRole: "CEO & Founder",
      userImage: "",
      company: "",
      location: "Dhaka, Bangladesh",
      tag: "E-Commerce Platform",
      rating: 5,
      comment: "",
      isApproved: true,
      isFeatured: false,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (rev) => {
    setEditingReview(rev);
    setFormData({
      userName: rev.userName,
      userRole: rev.userRole || "",
      userImage: rev.userImage || "",
      company: rev.company || "",
      location: rev.location || "",
      tag: rev.tag || "Verified Client",
      rating: rev.rating || 5,
      comment: rev.comment,
      isApproved: rev.isApproved,
      isFeatured: rev.isFeatured,
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, userImage: url }));
      showToast("Photo uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      showToast("Photo upload failed.", "error");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingReview) {
        // Edit existing review
        const res = await fetch(`/api/admin/reviews/${editingReview.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setShowModal(false);
          showToast("Review updated successfully!");
          fetchReviews();
        } else {
          const err = await res.json();
          showToast(err.error || "Failed to update review", "error");
        }
      } else {
        // Create new review
        const res = await fetch("/api/admin/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setShowModal(false);
          showToast("New review published successfully!");
          fetchReviews();
        } else {
          const err = await res.json();
          showToast(err.error || "Failed to create review", "error");
        }
      }
    } catch (err) {
      console.error("Error saving review:", err);
      showToast("Network error while saving review.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleApprove = async (rev) => {
    setActionLoading(`approve-${rev.id}`);
    try {
      const res = await fetch(`/api/admin/reviews/${rev.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !rev.isApproved }),
      });
      if (res.ok) {
        showToast(rev.isApproved ? "Review hidden from site." : "Review approved and live on site!");
        fetchReviews();
      } else {
        showToast("Action failed.", "error");
      }
    } catch (err) {
      console.error("Error toggling approval:", err);
      showToast("Network error.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleFeature = async (rev) => {
    setActionLoading(`feature-${rev.id}`);
    try {
      const res = await fetch(`/api/admin/reviews/${rev.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !rev.isFeatured }),
      });
      if (res.ok) {
        showToast(rev.isFeatured ? "Removed from featured." : "Pinned as featured testimonial!");
        fetchReviews();
      } else {
        showToast("Action failed.", "error");
      }
    } catch (err) {
      console.error("Error toggling featured:", err);
      showToast("Network error.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmToast("Are you sure you want to permanently delete this review?", {
      confirmText: "Delete Review",
      cancelText: "Cancel",
      danger: true,
    });
    if (!confirmed) return;
    setActionLoading(`delete-${id}`);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Review deleted permanently.");
        fetchReviews();
      } else {
        showToast("Failed to delete review.", "error");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      showToast("Network error.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.userName.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q) ||
      (r.company && r.company.toLowerCase().includes(q)) ||
      (r.userRole && r.userRole.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 className="admin-page-title">Client Reviews & Testimonials</h1>
          <p className="admin-page-subtitle">Moderate user feedback and manage featured testimonials for the live website</p>
        </div>
        <button id="add-review-btn" className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Review
        </button>
      </div>

      {/* Metric Cards */}
      <div className="dash-stats-grid" style={{ marginBottom: 28 }}>
        <div className="dash-stat-card" style={{ cursor: "default" }}>
          <div className="dash-stat-icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc" }}>
            <FaQuoteLeft size={20} />
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-value" style={{ color: "#f1f5f9" }}>{stats.total}</span>
            <span className="dash-stat-label">Total Reviews</span>
          </div>
        </div>

        <div className="dash-stat-card" style={{ cursor: "default" }}>
          <div className="dash-stat-icon" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
            <FaClock size={20} />
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-value" style={{ color: "#fbbf24" }}>{stats.pending}</span>
            <span className="dash-stat-label">Pending Approval</span>
          </div>
        </div>

        <div className="dash-stat-card" style={{ cursor: "default" }}>
          <div className="dash-stat-icon" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#86efac" }}>
            <FaUserCheck size={20} />
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-value" style={{ color: "#86efac" }}>{stats.approved}</span>
            <span className="dash-stat-label">Live on Website</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div className="content-filter-tabs" style={{ margin: 0 }}>
          <button
            className={`content-filter-tab ${filter === "all" ? "content-filter-tab-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Reviews ({stats.total})
          </button>
          <button
            className={`content-filter-tab ${filter === "pending" ? "content-filter-tab-active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending ({stats.pending})
          </button>
          <button
            className={`content-filter-tab ${filter === "approved" ? "content-filter-tab-active" : ""}`}
            onClick={() => setFilter("approved")}
          >
            Approved ({stats.approved})
          </button>
        </div>

        <div style={{ position: "relative", minWidth: 260, flex: "0 1 320px" }}>
          <input
            className="admin-input"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 38, fontSize: 13 }}
          />
          <FaSearch style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: 12, pointerEvents: "none" }} />
        </div>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="project-skeleton" style={{ height: 200 }} />
          ))}
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="admin-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p>No reviews found matching your filter criteria.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="admin-card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
                borderColor: rev.isApproved ? "rgba(255, 255, 255, 0.06)" : "rgba(245, 158, 11, 0.35)",
                background: rev.isApproved ? "rgba(255, 255, 255, 0.03)" : "rgba(245, 158, 11, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              {/* Header: User details & Stars */}
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {rev.userImage ? (
                      <img
                        src={rev.userImage}
                        alt={rev.userName}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          objectFit: "cover",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          color: "white",
                          fontWeight: 700,
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                          flexShrink: 0,
                        }}
                      >
                        {rev.userName ? rev.userName.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9", margin: 0 }}>{rev.userName}</h3>
                        {rev.isFeatured && (
                          <span
                            className="admin-badge"
                            style={{
                              background: "rgba(245, 158, 11, 0.15)",
                              color: "#fbbf24",
                              border: "1px solid rgba(245, 158, 11, 0.3)",
                              fontSize: 10,
                              padding: "1px 6px",
                              gap: 4,
                            }}
                          >
                            <FaCrown size={9} /> Featured
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 0", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span>{rev.userRole || "Client"}</span>
                        {rev.company && <span>• {rev.company}</span>}
                        {rev.location && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "#94a3b8" }}>
                            <FaMapMarkerAlt size={10} style={{ color: "#06b6d4" }} />
                            {rev.location}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div style={{ display: "flex", gap: 3, flexShrink: 0, paddingTop: 2 }}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <FaStar
                        key={s}
                        size={13}
                        style={{ color: s < (rev.rating || 5) ? "#f59e0b" : "#334155" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Tag / Badge */}
                {rev.tag && (
                  <div style={{ marginBottom: 10 }}>
                    <span className="admin-badge admin-badge-purple" style={{ fontSize: 11 }}>
                      {rev.tag}
                    </span>
                  </div>
                )}

                {/* Comment Body */}
                <p
                  style={{
                    fontSize: 13,
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                    margin: 0,
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: 10,
                    fontStyle: "italic",
                  }}
                >
                  "{rev.comment}"
                </p>
              </div>

              {/* Card Footer: Approval status badge & Action buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div>
                  {rev.isApproved ? (
                    <span className="admin-badge admin-badge-green" style={{ gap: 5, fontSize: 11 }}>
                      <FaCheck size={9} /> Approved
                    </span>
                  ) : (
                    <span
                      className="admin-badge"
                      style={{
                        background: "rgba(245, 158, 11, 0.12)",
                        color: "#fbbf24",
                        border: "1px solid rgba(245, 158, 11, 0.25)",
                        gap: 5,
                        fontSize: 11,
                      }}
                    >
                      <FaClock size={9} /> Pending Review
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {/* Approve / Unapprove Button */}
                  <button
                    className="admin-btn"
                    onClick={() => handleToggleApprove(rev)}
                    disabled={actionLoading === `approve-${rev.id}`}
                    style={{
                      padding: "6px 12px",
                      fontSize: 12,
                      background: rev.isApproved ? "rgba(255, 255, 255, 0.05)" : "rgba(34, 197, 94, 0.15)",
                      color: rev.isApproved ? "#94a3b8" : "#86efac",
                      border: rev.isApproved ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(34, 197, 94, 0.3)",
                    }}
                    title={rev.isApproved ? "Hide from public website" : "Approve and show on website"}
                  >
                    {actionLoading === `approve-${rev.id}` ? (
                      <div className="admin-spinner-btn" />
                    ) : rev.isApproved ? (
                      "Unapprove"
                    ) : (
                      "Approve"
                    )}
                  </button>

                  {/* Pin Featured Button */}
                  <button
                    className="admin-btn admin-btn-secondary"
                    onClick={() => handleToggleFeature(rev)}
                    disabled={actionLoading === `feature-${rev.id}`}
                    style={{
                      padding: "6px 10px",
                      color: rev.isFeatured ? "#fbbf24" : "#64748b",
                      background: rev.isFeatured ? "rgba(245, 158, 11, 0.12)" : "rgba(255, 255, 255, 0.05)",
                      borderColor: rev.isFeatured ? "rgba(245, 158, 11, 0.3)" : "rgba(255, 255, 255, 0.08)",
                    }}
                    title={rev.isFeatured ? "Unpin featured" : "Pin as featured testimonial"}
                  >
                    <FaCrown size={12} />
                  </button>

                  {/* Edit Button */}
                  <button
                    className="admin-btn admin-btn-secondary"
                    onClick={() => handleOpenEdit(rev)}
                    style={{ padding: "6px 10px" }}
                    title="Edit review details"
                  >
                    <FaEdit size={12} />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => handleDelete(rev.id)}
                    disabled={actionLoading === `delete-${rev.id}`}
                    style={{ padding: "6px 10px" }}
                    title="Delete review permanently"
                  >
                    {actionLoading === `delete-${rev.id}` ? (
                      <div className="admin-spinner-btn" />
                    ) : (
                      <FaTrash size={11} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Review Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 620 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 className="admin-modal-title" style={{ margin: 0 }}>
                {editingReview ? "Edit Client Review" : "Add New Review"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#64748b",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                }}
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* Client Name & Role */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="admin-field-group">
                  <label className="admin-label">Client Name *</label>
                  <input
                    className="admin-input"
                    required
                    placeholder="Enter client name"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Role / Position</label>
                  <input
                    className="admin-input"
                    placeholder="e.g. CEO & Founder"
                    value={formData.userRole}
                    onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
                  />
                </div>
              </div>

              {/* Profile Photo / Avatar with upload */}
              <div className="admin-field-group">
                <label className="admin-label">Client Profile Photo (URL or File Upload)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {formData.userImage ? (
                    <img
                      src={formData.userImage}
                      alt="Avatar Preview"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        objectFit: "cover",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px dashed rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#64748b",
                        flexShrink: 0,
                      }}
                    >
                      <FaImage size={16} />
                    </div>
                  )}

                  <input
                    className="admin-input"
                    style={{ flex: 1 }}
                    placeholder="https://images.unsplash.com/... or upload"
                    value={formData.userImage}
                    onChange={(e) => setFormData({ ...formData, userImage: e.target.value })}
                  />

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />

                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    style={{ padding: "8px 12px", height: 42, flexShrink: 0 }}
                    title="Upload photo"
                  >
                    {uploadingImage ? <div className="admin-spinner-btn" /> : <FaUpload size={13} />}
                    <span style={{ fontSize: 13 }}>{uploadingImage ? "Uploading..." : "Upload"}</span>
                  </button>
                </div>
              </div>

              {/* Company & Location */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="admin-field-group">
                  <label className="admin-label">Company</label>
                  <input
                    className="admin-input"
                    placeholder="e.g. TechCorp Solutions"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Location</label>
                  <input
                    className="admin-input"
                    placeholder="e.g. Dhaka, Bangladesh"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              {/* Tag & Rating */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="admin-field-group">
                  <label className="admin-label">Project Tag / Category</label>
                  <input
                    className="admin-input"
                    placeholder="e.g. E-Commerce Platform"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Rating</label>
                  <select
                    className="admin-input"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                    <option value={2}>2 Stars ★★☆☆☆</option>
                    <option value={1}>1 Star ★☆☆☆☆</option>
                  </select>
                </div>
              </div>

              {/* Comment Textarea */}
              <div className="admin-field-group">
                <label className="admin-label">Review Comment *</label>
                <textarea
                  className="admin-input admin-textarea"
                  required
                  rows={4}
                  placeholder="Client feedback and testimonial content..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                />
              </div>

              {/* Toggles */}
              <div style={{ display: "flex", gap: 24, padding: "8px 0 16px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#cbd5e1" }}>
                  <input
                    type="checkbox"
                    checked={formData.isApproved}
                    onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                    style={{ accentColor: "#6366f1", width: 16, height: 16 }}
                  />
                  <span>Publish / Approved on Site</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#cbd5e1" }}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    style={{ accentColor: "#f59e0b", width: 16, height: 16 }}
                  />
                  <span>Pin as Featured Testimonial</span>
                </label>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="admin-spinner-btn" /> Saving...
                    </>
                  ) : editingReview ? (
                    "Update Review"
                  ) : (
                    "Create Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
