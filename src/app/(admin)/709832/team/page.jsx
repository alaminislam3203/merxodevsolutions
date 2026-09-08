"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUpload,
  FaUserCheck,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaCheck,
  FaTimes,
  FaUsers,
  FaSortNumericDown,
  FaEye,
  FaEyeSlash,
  FaPalette,
  FaLink,
} from "react-icons/fa";
import { showToast } from "@/lib/toast";

const GRADIENT_PRESETS = [
  { label: "Violet to Cyan (Default)", value: "from-violet-600 to-cyan-500", colors: ["#7c3aed", "#06b6d4"] },
  { label: "Amber to Orange", value: "from-amber-400 to-orange-500", colors: ["#fbbf24", "#f97316"] },
  { label: "Cyan to Violet", value: "from-cyan-500 to-violet-600", colors: ["#06b6d4", "#7c3aed"] },
  { label: "Emerald to Teal", value: "from-emerald-500 to-teal-400", colors: ["#10b981", "#2dd4bf"] },
  { label: "Rose to Pink", value: "from-rose-500 to-pink-500", colors: ["#f43f5e", "#ec4899"] },
  { label: "Blue to Indigo", value: "from-blue-600 to-indigo-600", colors: ["#2563eb", "#4f46e5"] },
];

const EMPTY_FORM = {
  name: "",
  role: "",
  image: "",
  imageFile: null,
  imagePreview: "",
  bio: "",
  color: "from-violet-600 to-cyan-500",
  order: 0,
  isActive: true,
  socialLinks: {
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
  },
};

export default function AdminTeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'inactive'

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [imageUploadMode, setImageUploadMode] = useState("upload"); // 'upload' | 'url'
  const fileInputRef = useRef(null);

  // Fetch all team members
  const fetchTeam = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.members) {
        setMembers(data.members);
      } else {
        showToast(data.error || "Failed to load team members.", "error");
      }
    } catch (err) {
      console.error("Error fetching team:", err);
      showToast("Error connecting to server.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  // Open modal for add
  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      image: "",
      imageFile: null,
      imagePreview: "",
      bio: "",
      color: "from-violet-600 to-cyan-500",
      order: members.length,
      isActive: true,
      socialLinks: { linkedin: "", github: "", twitter: "", website: "" },
    });
    setImageUploadMode("upload");
    setShowModal(true);
  };

  // Open modal for edit
  const handleOpenEdit = (member) => {
    setEditingMember(member);
    let parsedSocial = {};
    if (typeof member?.socialLinks === "string") {
      try {
        parsedSocial = JSON.parse(member.socialLinks);
      } catch (e) {
        parsedSocial = {};
      }
    } else if (member?.socialLinks && typeof member.socialLinks === "object") {
      parsedSocial = member.socialLinks;
    }

    setFormData({
      name: member?.name ?? "",
      role: member?.role ?? "",
      image: member?.image ?? "",
      imageFile: null,
      imagePreview: member?.image ?? "",
      bio: member?.bio ?? "",
      color: member?.color ?? "from-violet-600 to-cyan-500",
      order: member?.order ?? 0,
      isActive: member?.isActive !== false,
      socialLinks: {
        linkedin: parsedSocial?.linkedin ?? "",
        github: parsedSocial?.github ?? "",
        twitter: parsedSocial?.twitter ?? "",
        website: parsedSocial?.website ?? "",
      },
    });
    setImageUploadMode(
      member?.image?.startsWith("data:") || member?.image?.includes("res.cloudinary.com")
        ? "upload"
        : "url"
    );
    setShowModal(true);
  };

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5MB", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        imageFile: reader.result,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Submit form (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast("Please enter team member name.", "error");
      return;
    }
    if (!formData.role?.trim()) {
      showToast("Please enter team member role.", "error");
      return;
    }

    setSaving(true);
    try {
      let finalImageUrl = formData.image;

      // If user uploaded a new local file, upload it to Cloudinary first
      if (formData.imageFile) {
        const uploadRes = await fetch("/api/admin/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64Image: formData.imageFile,
            altText: `${formData.name} - ${formData.role}`,
          }),
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || "Image upload failed");
        }
        finalImageUrl = uploadData.url;
      }

      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        image: finalImageUrl || null,
        bio: formData.bio ? formData.bio.trim() : null,
        color: formData.color,
        order: Number(formData.order) || 0,
        isActive: Boolean(formData.isActive),
        socialLinks: {
          linkedin: formData.socialLinks?.linkedin?.trim() || undefined,
          github: formData.socialLinks?.github?.trim() || undefined,
          twitter: formData.socialLinks?.twitter?.trim() || undefined,
          website: formData.socialLinks?.website?.trim() || undefined,
        },
      };

      const url = editingMember
        ? `/api/admin/team/${editingMember.id}`
        : "/api/admin/team";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save team member.");

      showToast(
        editingMember ? "Team member updated successfully!" : "Team member added successfully!",
        "success"
      );
      setShowModal(false);
      fetchTeam();
    } catch (err) {
      console.error("Save error:", err);
      showToast(err.message || "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Toggle active status
  const handleToggleActive = async (member) => {
    setActionLoading(member.id);
    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !member.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status.");

      setMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, isActive: !m.isActive } : m))
      );
      showToast(
        !member.isActive ? `${member.name} is now visible.` : `${member.name} is now hidden.`,
        "success"
      );
    } catch (err) {
      showToast(err.message || "Failed to toggle status.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // Delete team member
  const handleDelete = async (member) => {
    if (!confirm(`Are you sure you want to remove "${member.name}" from the team?`)) {
      return;
    }

    setActionLoading(member.id);
    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete team member.");

      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      showToast(`Removed "${member.name}" from team.`, "success");
    } catch (err) {
      showToast(err.message || "Failed to delete.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // Filtered members list
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.role?.toLowerCase().includes(search.toLowerCase()) ||
      (m.bio && m.bio.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (filter === "active") return m.isActive;
    if (filter === "inactive") return !m.isActive;
    return true;
  });

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.isActive).length;
  const inactiveMembers = totalMembers - activeMembers;

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      {/* Header */}
      <div
        className="admin-page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        <div>
          <h1 className="admin-page-title">Team Members</h1>
          <p className="admin-page-subtitle">
            Manage your agency leaders, engineers, designers, and public profiles displayed on the website (/our-team & /about)
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <a
            href="/our-team"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <FaGlobe size={12} /> View /our-team
          </a>
          <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
            <FaPlus size={12} /> Add Team Member
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="dash-stats-grid" style={{ marginBottom: 28 }}>
        <div className="dash-stat-card" style={{ cursor: "default" }}>
          <div className="dash-stat-icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc" }}>
            <FaUsers size={22} />
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-value" style={{ color: "#f1f5f9" }}>{totalMembers}</span>
            <span className="dash-stat-label">Total Members</span>
          </div>
        </div>

        <div className="dash-stat-card" style={{ cursor: "default" }}>
          <div className="dash-stat-icon" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#86efac" }}>
            <FaUserCheck size={22} />
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-value" style={{ color: "#86efac" }}>{activeMembers}</span>
            <span className="dash-stat-label">Active / Live</span>
          </div>
        </div>

        <div className="dash-stat-card" style={{ cursor: "default" }}>
          <div className="dash-stat-icon" style={{ background: "rgba(239, 68, 68, 0.15)", color: "#fca5a5" }}>
            <FaEyeSlash size={22} />
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-value" style={{ color: "#fca5a5" }}>{inactiveMembers}</span>
            <span className="dash-stat-label">Hidden / Draft</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div className="content-filter-tabs" style={{ margin: 0 }}>
          <button
            type="button"
            className={`content-filter-tab ${filter === "all" ? "content-filter-tab-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Members ({totalMembers})
          </button>
          <button
            type="button"
            className={`content-filter-tab ${filter === "active" ? "content-filter-tab-active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active ({activeMembers})
          </button>
          <button
            type="button"
            className={`content-filter-tab ${filter === "inactive" ? "content-filter-tab-active" : ""}`}
            onClick={() => setFilter("inactive")}
          >
            Hidden ({inactiveMembers})
          </button>
        </div>

        <div style={{ position: "relative", minWidth: 260, flex: "0 1 340px" }}>
          <input
            key="input-team-search"
            type="text"
            placeholder="Search by name, role, or bio..."
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input"
            style={{ paddingLeft: 38, fontSize: 13 }}
          />
          <FaSearch
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
              fontSize: 12,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Members Grid / Cards */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 18 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="content-skeleton" style={{ height: 260 }} />
          ))}
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="admin-empty" style={{ padding: "80px 20px" }}>
          <FaUsers size={48} style={{ margin: "0 auto 16px", opacity: 0.35, color: "#6366f1" }} />
          <h3 style={{ color: "#f1f5f9", margin: "0 0 8px", fontSize: 17, fontWeight: 600 }}>
            No team members found
          </h3>
          <p style={{ maxWidth: 420, margin: "0 auto 20px", fontSize: 14, color: "#64748b" }}>
            {search
              ? "No members match your search criteria. Try a different search query."
              : "You haven't added any team members in this tab yet."}
          </p>
          <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
            <FaPlus size={12} /> Add Team Member
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: 18,
          }}
        >
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="admin-card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
                borderColor: member.isActive ? "rgba(255, 255, 255, 0.07)" : "rgba(239, 68, 68, 0.25)",
                background: member.isActive ? "rgba(255, 255, 255, 0.025)" : "rgba(239, 68, 68, 0.02)",
                transition: "all 0.2s ease",
                padding: "20px 22px",
              }}
            >
              <div>
                {/* Top Row: Avatar + Info + Badges */}
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 16,
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1.5px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
                    }}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                          color: "white",
                          fontWeight: 700,
                          fontSize: 18,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {member.name?.slice(0, 2)?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Name and Role */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <h3
                        style={{
                          color: "#f1f5f9",
                          fontSize: 16,
                          fontWeight: 700,
                          margin: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {member.name}
                      </h3>

                      {/* Status Badge */}
                      {member.isActive ? (
                        <span className="admin-badge admin-badge-green" style={{ fontSize: 11, gap: 4, padding: "2px 8px" }}>
                          <FaCheck size={9} /> Active
                        </span>
                      ) : (
                        <span className="admin-badge admin-badge-gray" style={{ fontSize: 11, gap: 4, padding: "2px 8px" }}>
                          <FaEyeSlash size={9} /> Hidden
                        </span>
                      )}
                    </div>

                    <p
                      style={{
                        color: "#818cf8",
                        fontSize: 13,
                        fontWeight: 600,
                        margin: "4px 0 0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {member.role}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, fontSize: 11, color: "#64748b" }}>
                      <span style={{ background: "rgba(255, 255, 255, 0.05)", padding: "1px 6px", borderRadius: 4 }}>
                        Order: #{member.order ?? 0}
                      </span>
                      <span>•</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                            display: "inline-block",
                          }}
                        />
                        {member.color?.split(" ")[0]?.replace("from-", "") || "theme"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                {member.bio && (
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: 13,
                      lineHeight: 1.55,
                      margin: "0 0 12px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {member.bio}
                  </p>
                )}

                {/* Social Links Icons */}
                {member.socialLinks && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: "rgba(0, 119, 181, 0.12)",
                          border: "1px solid rgba(0, 119, 181, 0.25)",
                          color: "#38bdf8",
                          fontSize: 11,
                          textDecoration: "none",
                        }}
                      >
                        <FaLinkedin size={11} /> LinkedIn
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#e2e8f0",
                          fontSize: 11,
                          textDecoration: "none",
                        }}
                      >
                        <FaGithub size={11} /> GitHub
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: "rgba(56, 189, 248, 0.12)",
                          border: "1px solid rgba(56, 189, 248, 0.25)",
                          color: "#38bdf8",
                          fontSize: 11,
                          textDecoration: "none",
                        }}
                      >
                        <FaTwitter size={11} /> Twitter
                      </a>
                    )}
                    {member.socialLinks.website && (
                      <a
                        href={member.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: "rgba(34, 197, 94, 0.12)",
                          border: "1px solid rgba(34, 197, 94, 0.25)",
                          color: "#86efac",
                          fontSize: 11,
                          textDecoration: "none",
                        }}
                      >
                        <FaGlobe size={11} /> Portfolio
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Action Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  marginTop: 10,
                }}
              >
                <button
                  type="button"
                  onClick={() => handleToggleActive(member)}
                  disabled={actionLoading === member.id}
                  className="admin-btn admin-btn-secondary"
                  style={{
                    fontSize: 12,
                    padding: "6px 12px",
                    background: member.isActive ? "rgba(255, 255, 255, 0.05)" : "rgba(34, 197, 94, 0.15)",
                    color: member.isActive ? "#94a3b8" : "#86efac",
                    borderColor: member.isActive ? "rgba(255, 255, 255, 0.08)" : "rgba(34, 197, 94, 0.3)",
                  }}
                  title={member.isActive ? "Hide from public website" : "Show on public website"}
                >
                  {member.isActive ? (
                    <>
                      <FaEyeSlash size={12} /> Hide
                    </>
                  ) : (
                    <>
                      <FaEye size={12} /> Show Live
                    </>
                  )}
                </button>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(member)}
                    className="admin-btn admin-btn-secondary"
                    style={{ fontSize: 12, padding: "6px 10px" }}
                    title="Edit Member"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(member)}
                    disabled={actionLoading === member.id}
                    className="admin-btn admin-btn-danger"
                    style={{ fontSize: 12, padding: "6px 10px" }}
                    title="Delete Member"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 620, padding: "28px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <div>
                <h2 className="admin-modal-title" style={{ margin: 0, fontSize: 20 }}>
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
                </h2>
                <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}>
                  Fill in the member profile details to display on the website
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="banner-modal-close"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#94a3b8",
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Name & Role in 2 columns */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="admin-field-group">
                    <label className="admin-label">Full Name *</label>
                    <input
                      key="input-member-name"
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Al-Amin Islam"
                      value={formData.name ?? ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-label">Designation / Role *</label>
                    <input
                      key="input-member-role"
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Founder & Lead Developer"
                      value={formData.role ?? ""}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="admin-field-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label className="admin-label" style={{ margin: 0 }}>Profile Photo</label>
                    <div style={{ display: "flex", gap: 4, background: "rgba(255, 255, 255, 0.04)", padding: 3, borderRadius: 8 }}>
                      <button
                        type="button"
                        onClick={() => setImageUploadMode("upload")}
                        style={{
                          padding: "4px 12px",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: "pointer",
                          border: "none",
                          background: imageUploadMode === "upload" ? "#6366f1" : "transparent",
                          color: imageUploadMode === "upload" ? "#ffffff" : "#64748b",
                          transition: "all 0.15s ease",
                        }}
                      >
                        Upload Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageUploadMode("url")}
                        style={{
                          padding: "4px 12px",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: "pointer",
                          border: "none",
                          background: imageUploadMode === "url" ? "#6366f1" : "transparent",
                          color: imageUploadMode === "url" ? "#ffffff" : "#64748b",
                          transition: "all 0.15s ease",
                        }}
                      >
                        Image URL
                      </button>
                    </div>
                  </div>

                  {imageUploadMode === "upload" ? (
                    <div>
                      <input
                        key="input-member-file-upload"
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: "2px dashed rgba(99, 102, 241, 0.3)",
                          borderRadius: 12,
                          padding: "20px 16px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: "rgba(99, 102, 241, 0.03)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 8,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {formData.imagePreview ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <img
                              src={formData.imagePreview}
                              alt="Preview"
                              style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover", border: "1px solid rgba(255, 255, 255, 0.15)" }}
                            />
                            <div style={{ textAlign: "left" }}>
                              <p style={{ fontSize: 13, color: "#f1f5f9", margin: 0, fontWeight: 600 }}>
                                Photo selected ✓
                              </p>
                              <p style={{ fontSize: 11, color: "#818cf8", margin: "2px 0 0" }}>
                                Click to choose a different photo
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <FaUpload size={22} style={{ color: "#818cf8" }} />
                            <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 500 }}>
                              Click to select an image from your device
                            </span>
                            <span style={{ fontSize: 11, color: "#64748b" }}>
                              JPG, PNG, or WEBP up to 5MB (automatically saved to Cloudinary)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <input
                        key="input-member-url-image"
                        type="text"
                        className="admin-input"
                        placeholder="https://example.com/avatar.jpg or /profile.png"
                        value={formData.image ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            image: e.target.value,
                            imagePreview: e.target.value,
                          })
                        }
                      />
                      {formData.imagePreview && (
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          style={{ width: 42, height: 42, borderRadius: 10, objectFit: "cover", flexShrink: 0, border: "1px solid rgba(255, 255, 255, 0.1)" }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="admin-field-group">
                  <label className="admin-label">Bio / Profile Description</label>
                  <textarea
                    key="textarea-member-bio"
                    className="admin-input admin-textarea"
                    rows={3}
                    placeholder="Short summary of background, expertise, or personality..."
                    value={formData.bio ?? ""}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                {/* Order and Gradient in 2 columns */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="admin-field-group">
                    <label className="admin-label">
                      <FaSortNumericDown style={{ display: "inline", marginRight: 4 }} />
                      Display Order
                    </label>
                    <input
                      key="input-member-order"
                      type="number"
                      className="admin-input"
                      placeholder="0"
                      value={formData.order ?? 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: e.target.value === "" ? 0 : Number(e.target.value),
                        })
                      }
                      min="0"
                    />
                    <span style={{ fontSize: 11, color: "#64748b", marginTop: 4, display: "block" }}>
                      Lower number appears first (0, 1, 2...)
                    </span>
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-label">
                      <FaPalette style={{ display: "inline", marginRight: 4 }} />
                      Card Accent Gradient
                    </label>
                    <select
                      key="select-member-color"
                      className="admin-input"
                      value={formData.color ?? "from-violet-600 to-cyan-500"}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    >
                      {GRADIENT_PRESETS.map((preset) => (
                        <option key={preset.value} value={preset.value}>
                          {preset.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Social Links */}
                <div className="admin-field-group">
                  <label className="admin-label">
                    <FaLink style={{ display: "inline", marginRight: 4 }} />
                    Social & Portfolio Links (Optional)
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ position: "relative" }}>
                      <FaLinkedin style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#38bdf8" }} />
                      <input
                        key="input-member-linkedin"
                        type="url"
                        className="admin-input"
                        placeholder="LinkedIn URL"
                        value={formData.socialLinks?.linkedin ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...(formData.socialLinks || {}), linkedin: e.target.value },
                          })
                        }
                        style={{ paddingLeft: 34, fontSize: 12.5 }}
                      />
                    </div>
                    <div style={{ position: "relative" }}>
                      <FaGithub style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#cbd5e1" }} />
                      <input
                        key="input-member-github"
                        type="url"
                        className="admin-input"
                        placeholder="GitHub URL"
                        value={formData.socialLinks?.github ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...(formData.socialLinks || {}), github: e.target.value },
                          })
                        }
                        style={{ paddingLeft: 34, fontSize: 12.5 }}
                      />
                    </div>
                    <div style={{ position: "relative" }}>
                      <FaTwitter style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#38bdf8" }} />
                      <input
                        key="input-member-twitter"
                        type="url"
                        className="admin-input"
                        placeholder="Twitter / X URL"
                        value={formData.socialLinks?.twitter ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...(formData.socialLinks || {}), twitter: e.target.value },
                          })
                        }
                        style={{ paddingLeft: 34, fontSize: 12.5 }}
                      />
                    </div>
                    <div style={{ position: "relative" }}>
                      <FaGlobe style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#34d399" }} />
                      <input
                        key="input-member-website"
                        type="url"
                        className="admin-input"
                        placeholder="Portfolio Website"
                        value={formData.socialLinks?.website ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...(formData.socialLinks || {}), website: e.target.value },
                          })
                        }
                        style={{ paddingLeft: 34, fontSize: 12.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Active Toggle Switch */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 12,
                    marginTop: 4,
                  }}
                >
                  <div>
                    <span style={{ color: "#f1f5f9", fontSize: 14, fontWeight: 600, display: "block" }}>
                      Publish Status
                    </span>
                    <span style={{ color: "#64748b", fontSize: 12 }}>
                      {formData.isActive
                        ? "Visible to visitors on the About page"
                        : "Hidden from public website (Draft)"}
                    </span>
                  </div>

                  <label
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: 44,
                      height: 24,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      key="input-member-is-active"
                      type="checkbox"
                      id="isActiveToggle"
                      checked={Boolean(formData.isActive)}
                      value={formData.isActive ? "true" : "false"}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: formData.isActive ? "#6366f1" : "rgba(255, 255, 255, 0.12)",
                        transition: "0.2s",
                        borderRadius: 24,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          content: '""',
                          height: 18,
                          width: 18,
                          left: formData.isActive ? 23 : 3,
                          bottom: 3,
                          background: "white",
                          transition: "0.2s",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="admin-modal-actions" style={{ marginTop: 24 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="admin-btn admin-btn-secondary"
                  disabled={saving}
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
                      <div className="admin-spinner-btn" />
                      Saving...
                    </>
                  ) : editingMember ? (
                    "Update Member"
                  ) : (
                    "Add Member"
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
