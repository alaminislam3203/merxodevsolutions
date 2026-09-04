"use client";

import { useState, useEffect } from "react";
import {
  FaStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaPlus,
  FaEdit,
  FaQuoteLeft,
  FaUserCheck,
  FaClock,
  FaSearch,
  FaCrown,
} from "react-icons/fa";

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

  // Form State
  const [formData, setFormData] = useState({
    userName: "",
    userRole: "Client",
    company: "",
    location: "Dhaka, Bangladesh",
    tag: "Verified Client",
    rating: 5,
    comment: "",
    isApproved: true,
    isFeatured: false,
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews?filter=${filter}`);
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
        setStats(data.stats || { total: data.reviews.length, pending: 0, approved: 0 });
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      userName: "",
      userRole: "CEO & Founder",
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
          fetchReviews();
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
          fetchReviews();
        }
      }
    } catch (err) {
      console.error("Error saving review:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleApprove = async (rev) => {
    try {
      const res = await fetch(`/api/admin/reviews/${rev.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !rev.isApproved }),
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error("Error toggling review approval:", err);
    }
  };

  const handleToggleFeature = async (rev) => {
    try {
      const res = await fetch(`/api/admin/reviews/${rev.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !rev.isFeatured }),
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error("Error toggling featured:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.userName.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q) ||
      (r.company && r.company.toLowerCase().includes(q))
    );
  });

  return (
    <div className="admin-page-container p-6 space-y-6 max-w-7xl mx-auto font-raleway">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2.5">
            <FaQuoteLeft className="text-violet-600 dark:text-cyan-400" />
            Client Reviews & Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Moderate user-submitted reviews and create featured testimonials for the website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all cursor-pointer shrink-0"
        >
          <FaPlus size={12} />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Reviews</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-300 flex items-center justify-center">
            <FaStar size={18} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-200/80 dark:border-amber-900/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pending Approval</p>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{stats.pending}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <FaClock size={18} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-200/80 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Live / Approved</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.approved}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FaUserCheck size={18} />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            All Reviews ({stats.total})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "pending"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Pending Approval ({stats.pending})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "approved"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Approved ({stats.approved})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white border-0 outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-12 text-sm text-zinc-400">Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 text-sm">
          No reviews found under this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border transition-all shadow-sm flex flex-col justify-between gap-4 ${
                rev.isApproved
                  ? "border-zinc-200 dark:border-zinc-800"
                  : "border-amber-400/80 bg-amber-50/20 dark:bg-amber-950/20 shadow-amber-500/10"
              }`}
            >
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{rev.userName}</h4>
                      {rev.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          <FaCrown size={9} /> Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {rev.userRole} {rev.company ? `• ${rev.company}` : ""} {rev.location ? `(${rev.location})` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {Array.from({ length: rev.rating }).map((_, s) => (
                    <FaStar key={s} size={12} className="text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300 italic leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                "{rev.comment}"
              </p>

              {/* Footer Actions & Status */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                <div>
                  {rev.isApproved ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/50">
                      <FaCheck size={9} /> Live on Site
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300/50 animate-pulse">
                      <FaClock size={9} /> Pending Review
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleApprove(rev)}
                    title={rev.isApproved ? "Unapprove (Hide from site)" : "Approve (Publish on site)"}
                    className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      rev.isApproved
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-amber-100 hover:text-amber-800"
                        : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm"
                    }`}
                  >
                    {rev.isApproved ? "Unapprove" : "Approve"}
                  </button>

                  <button
                    onClick={() => handleToggleFeature(rev)}
                    title={rev.isFeatured ? "Unpin featured" : "Pin as featured"}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      rev.isFeatured
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-amber-500"
                    }`}
                  >
                    <FaCrown size={13} />
                  </button>

                  <button
                    onClick={() => handleOpenEdit(rev)}
                    title="Edit review"
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-violet-600 transition-all cursor-pointer"
                  >
                    <FaEdit size={13} />
                  </button>

                  <button
                    onClick={() => handleDelete(rev.id)}
                    title="Delete review"
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-all cursor-pointer"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white dark:bg-[#091124] rounded-3xl p-6 border border-zinc-200 dark:border-blue-900/60 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <FaStar className="text-amber-400" />
                {editingReview ? "Edit Review" : "Add Client Review"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-bold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    placeholder="e.g. Sarah Johnson"
                    className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-bold mb-1">Role / Position</label>
                  <input
                    type="text"
                    value={formData.userRole}
                    onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
                    placeholder="e.g. CEO, Product Director"
                    className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-bold mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. TechStart BD"
                    className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-bold mb-1">Tag / Project Category</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. E-Commerce Platform"
                    className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-bold mb-1">Rating (Stars)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                    <option value={2}>2 Stars ★★☆☆☆</option>
                    <option value={1}>1 Star ★☆☆☆☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-bold mb-1">Review Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Client feedback and review details..."
                  className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={formData.isApproved}
                    onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                    className="w-4 h-4 rounded text-violet-600"
                  />
                  <span>Publish / Approved on Site</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Pin as Featured</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingReview ? "Update Review" : "Create Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
