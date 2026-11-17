"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  FiMessageSquare,
  FiSend,
  FiUser,
  FiPhone,
  FiMail,
  FiTrash2,
  FiVolume2,
  FiVolumeX,
  FiSettings,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiBell,
  FiCpu,
  FiUserCheck,
  FiZap,
  FiX,
  FiMapPin,
  FiGlobe,
  FiMonitor,
  FiArrowLeft,
  FiInfo,
  FiCopy,
  FiExternalLink,
} from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import { FaWhatsapp, FaRobot } from "react-icons/fa";
import { playAdminAlertSound, playUrgentAdminRing } from "@/lib/chatSound";
import { useTheme } from "@/components/ThemeProvider";

const QUICK_ADMIN_REPLIES = [
  "আসসালামু আলাইকুম! আমি লাইভে আছি, আপনার প্রজেক্ট সম্পর্কে কীভাবে সাহায্য করতে পারি?",
  "আপনার WhatsApp নাম্বারটি দিন, আমাদের লিড ডেভেলপার এখনই যোগাযোগ করবেন।",
  "Hello! I am live on the chat. Tell me about the website or app you want to build!",
  "Could you share your WhatsApp number or email so we can send you a detailed quote?",
];

export default function AdminLiveChatPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data: session } = useSession();
  const isTeamMember = session?.user?.role === "TEAM_MEMBER";
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalUnread: 0,
    needsHumanCount: 0,
    liveCount: 0,
  });
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [visitorIntel, setVisitorIntel] = useState(null);
  const [showVisitorInfoModal, setShowVisitorInfoModal] = useState(false);
  const [infoModalClosing, setInfoModalClosing] = useState(false);

  const handleOpenInfoModal = () => {
    setInfoModalClosing(false);
    setShowVisitorInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    if (infoModalClosing) return;
    setInfoModalClosing(true);
    setTimeout(() => {
      setShowVisitorInfoModal(false);
      setInfoModalClosing(false);
    }, 240);
  };
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // AI Brain Settings Modal state
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [aiConfigStatus, setAiConfigStatus] = useState(null);
  const [geminiKeyInput, setGeminiKeyInput] = useState("");
  const [groqKeyInput, setGroqKeyInput] = useState("");
  const [customInstructionsInput, setCustomInstructionsInput] = useState("");
  const [savingConfig, setSavingConfig] = useState(false);

  const messagesEndRef = useRef(null);
  const prevUnreadRef = useRef(0);
  const prevNeedsHumanRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("merxodev_admin_sound");
      if (saved === "off") setSoundEnabled(false);
    } catch {}
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("merxodev_admin_sound", next ? "on" : "off");
      } catch {}
      if (next) playAdminAlertSound();
      return next;
    });
  };

  // Fetch all chat sessions + stats
  const fetchSessions = useCallback(
    async (withConfig = false) => {
      try {
        const res = await fetch(
          `/api/admin/chat${withConfig ? "?config=1" : ""}`,
          {
            cache: "no-store",
          },
        );
        if (!res.ok) return;
        const data = await res.json();

        const nextSessions = data.sessions || [];
        const nextStats = data.stats || {
          totalSessions: 0,
          totalUnread: 0,
          needsHumanCount: 0,
          liveCount: 0,
        };

        // Trigger instant sound alert if unread count or human request increased
        if (initializedRef.current) {
          if (nextStats.needsHumanCount > prevNeedsHumanRef.current) {
            if (soundEnabled) playUrgentAdminRing();
            toast("A visitor requested a Live Team!", {
              icon: <FiAlertCircle color="#f59e0b" size={18} />,
              duration: 5000,
            });
          } else if (nextStats.totalUnread > prevUnreadRef.current) {
            if (soundEnabled) playAdminAlertSound();
          }
        }

        prevUnreadRef.current = nextStats.totalUnread;
        prevNeedsHumanRef.current = nextStats.needsHumanCount;
        initializedRef.current = true;

        setSessions(nextSessions);
        setStats(nextStats);

        if (data.aiConfig) {
          setAiConfigStatus(data.aiConfig);
          setCustomInstructionsInput(data.aiConfig.customInstructions || "");
        }

        if (!selectedSessionId && nextSessions.length > 0) {
          setSelectedSessionId(nextSessions[0].id);
        }
      } catch (err) {
        console.error("Failed to load sessions:", err);
      } finally {
        setLoadingList(false);
      }
    },
    [selectedSessionId, soundEnabled],
  );

  // Fetch active session messages
  const fetchActiveMessages = useCallback(async (sessId) => {
    if (!sessId) return;
    try {
      const res = await fetch(
        `/api/admin/chat?sessionId=${encodeURIComponent(sessId)}`,
        {
          cache: "no-store",
        },
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.session) setActiveSession(data.session);
      if (Array.isArray(data.messages)) setMessages(data.messages);
    } catch {}
  }, []);

  useEffect(() => {
    fetchSessions(true);
  }, [fetchSessions]);

  useEffect(() => {
    if (selectedSessionId) {
      fetchActiveMessages(selectedSessionId);
      fetch(
        `/api/admin/visitors?chatSessionId=${encodeURIComponent(selectedSessionId)}&ip=${encodeURIComponent(activeSession?.visitorIp || "")}`,
        { cache: "no-store" }
      )
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => setVisitorIntel(d?.visitor || null))
        .catch(() => setVisitorIntel(null));
    } else {
      setVisitorIntel(null);
    }
  }, [selectedSessionId, activeSession?.visitorIp, fetchActiveMessages]);

  // Poll every 2.5 seconds for real-time live chat experience
  useEffect(() => {
    const timer = setInterval(() => {
      fetchSessions(false);
      if (selectedSessionId) {
        fetchActiveMessages(selectedSessionId);
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [selectedSessionId, fetchSessions, fetchActiveMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, selectedSessionId]);

  const handleSendAdminReply = async (customText) => {
    const textToSend = (customText ?? replyText).trim();
    if (!textToSend || !selectedSessionId || sending) return;

    setSending(true);
    if (!customText) setReplyText("");

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reply",
          sessionId: selectedSessionId,
          text: textToSend,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActiveSession(data.session);
        setMessages(data.messages || []);
        fetchSessions(false);
      } else {
        toast.error(data.error || "Failed to send reply");
      }
    } catch {
      toast.error("Network error while sending reply");
    } finally {
      setSending(false);
    }
  };

  const handleToggleMode = async (targetMode) => {
    if (!selectedSessionId) return;
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_mode",
          sessionId: selectedSessionId,
          mode: targetMode,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActiveSession(data.session);
        setMessages(data.messages || []);
        fetchSessions(false);
        toast.success(
          targetMode === "live"
            ? "Switched to Live Team Mode! AI is paused for this visitor."
            : "Handed back to MerxoDev AI Assistant!",
        );
      }
    } catch {
      toast.error("Failed to switch chat mode");
    }
  };

  const handleDeleteSession = async (sessId) => {
    if (!sessId) return;
    try {
      const res = await fetch(
        `/api/admin/chat?sessionId=${encodeURIComponent(sessId)}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        toast.success("Conversation deleted");
        const remaining = sessions.filter((s) => s.id !== sessId);
        setSessions(remaining);
        if (selectedSessionId === sessId) {
          setSelectedSessionId(remaining[0]?.id || null);
          setActiveSession(null);
          setMessages([]);
          setMobileChatOpen(false);
        }
      }
    } catch {
      toast.error("Failed to delete conversation");
    }
  };

  const handleSaveAiConfig = async (e) => {
    e.preventDefault();
    setSavingConfig(true);
    try {
      const payload = {
        customInstructions: customInstructionsInput,
      };
      if (geminiKeyInput.trim()) payload.geminiApiKey = geminiKeyInput.trim();
      if (groqKeyInput.trim()) payload.groqApiKey = groqKeyInput.trim();

      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_config",
          config: payload,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAiConfigStatus(data.aiConfig);
        setGeminiKeyInput("");
        setGroqKeyInput("");
        setConfigModalOpen(false);
        toast.success("AI Brain configuration saved!");
      } else {
        toast.error(data.error || "Failed to save configuration");
      }
    } catch {
      toast.error("Error saving configuration");
    } finally {
      setSavingConfig(false);
    }
  };

  const formatTime = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Top Page Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 22,
        }}
      >
        <div>
          <h1
            className="admin-page-title"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <span>Live Chat &amp; MerxoDev AI Center</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              REAL-TIME
            </span>
          </h1>
          <p className="admin-page-subtitle">
            Monitor AI conversations in real time, receive instant sound alerts,
            and take over any chat live. (All conversations auto-delete after 3 days)
          </p>
        </div>

        {/* Action Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={toggleSound}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 14px",
              borderRadius: 12,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              background: soundEnabled
                ? (isDark ? "rgba(16, 185, 129, 0.14)" : "#ecfdf5")
                : (isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9"),
              color: soundEnabled ? (isDark ? "#34d399" : "#059669") : (isDark ? "#94a3b8" : "#64748b"),
              border: soundEnabled
                ? (isDark ? "1px solid rgba(16, 185, 129, 0.35)" : "1px solid #a7f3d0")
                : (isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #cbd5e1"),
            }}
          >
            {soundEnabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
            <span>
              {soundEnabled ? "Sound Alerts: ON" : "Sound Alerts: MUTED"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playUrgentAdminRing();
              toast.success("Notification sound tested!");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 14px",
              borderRadius: 12,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              background: isDark ? "rgba(245, 158, 11, 0.14)" : "#fffbeb",
              color: isDark ? "#fbbf24" : "#b45309",
              border: isDark ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid #fde68a",
            }}
          >
            <FiBell size={15} />
            <span>Test Sound</span>
          </button>

          {!isTeamMember && (
            <button
              type="button"
              onClick={() => setConfigModalOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 15px",
                borderRadius: 12,
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                color: "#fff",
                border: "none",
                boxShadow: "0 8px 20px -6px rgba(99, 102, 241, 0.5)",
              }}
            >
              <FiSettings size={15} />
              <span>AI Brain Settings</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Mini Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
            boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.04)",
            borderRadius: 14,
            padding: "14px 18px",
          }}
        >
          <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#475569", fontWeight: 700 }}>
            TOTAL CONVERSATIONS
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: isDark ? "#f8fafc" : "#0f172a",
              marginTop: 4,
            }}
          >
            {stats.totalSessions}
          </div>
        </div>

        <div
          style={{
            background: isDark ? "rgba(245, 158, 11, 0.08)" : "#fffbeb",
            border: isDark ? "1px solid rgba(245, 158, 11, 0.25)" : "1px solid #fde68a",
            boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.04)",
            borderRadius: 14,
            padding: "14px 18px",
          }}
        >
          <div style={{ fontSize: 11, color: isDark ? "#fbbf24" : "#b45309", fontWeight: 700 }}>
            WAITING FOR Live Team
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: isDark ? "#fbbf24" : "#d97706",
              marginTop: 4,
            }}
          >
            {stats.needsHumanCount}
          </div>
        </div>

        <div
          style={{
            background: isDark ? "rgba(16, 185, 129, 0.08)" : "#ecfdf5",
            border: isDark ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid #a7f3d0",
            boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.04)",
            borderRadius: 14,
            padding: "14px 18px",
          }}
        >
          <div style={{ fontSize: 11, color: isDark ? "#34d399" : "#047857", fontWeight: 700 }}>
            ACTIVE Live Team CHATS
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: isDark ? "#34d399" : "#059669",
              marginTop: 4,
            }}
          >
            {stats.liveCount}
          </div>
        </div>

        <div
          style={{
            background: isDark ? "rgba(99, 102, 241, 0.08)" : "#eef2ff",
            border: isDark ? "1px solid rgba(99, 102, 241, 0.25)" : "1px solid #c7d2fe",
            boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.04)",
            borderRadius: 14,
            padding: "14px 18px",
          }}
        >
          <div style={{ fontSize: 11, color: isDark ? "#818cf8" : "#4338ca", fontWeight: 700 }}>
            AI ENGINE STATUS
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: isDark ? "#e2e8f0" : "#1e1b4b",
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <FiCheckCircle color={isDark ? "#10b981" : "#059669"} />
            <span>
              {aiConfigStatus?.hasGemini
                ? "Gemini LLM + Website DB"
                : aiConfigStatus?.hasGroq
                  ? "Groq Llama-3.3 + Website DB"
                  : "Built-in Smart AI + Website DB"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Inbox Container */}
      <div
        className={`admin-chat-layout ${mobileChatOpen ? "mobile-chat-open" : "mobile-list-open"}`}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(270px, 340px) 1fr",
          gap: 18,
          height: "calc(100vh - 280px)",
          minHeight: 520,
        }}
      >
        {/* Left Column: Visitor Sessions List */}
        <div
          className="admin-chat-inbox-col"
          style={{
            background: isDark ? "rgba(15, 23, 42, 0.7)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.09)" : "1px solid #e2e8f0",
            boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>
              Visitor Inbox ({sessions.length})
            </span>
            <button
              type="button"
              onClick={() => fetchSessions(false)}
              title="Refresh"
              style={{
                background: "transparent",
                border: "none",
                color: isDark ? "#94a3b8" : "#64748b",
                cursor: "pointer",
              }}
            >
              <FiRefreshCw size={15} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
            {loadingList ? (
              <div
                style={{
                  padding: 24,
                  textAlign: "center",
                  color: isDark ? "#64748b" : "#64748b",
                  fontSize: 13,
                }}
              >
                Loading conversations...
              </div>
            ) : sessions.length === 0 ? (
              <div
                style={{
                  padding: 32,
                  textAlign: "center",
                  color: isDark ? "#64748b" : "#64748b",
                  fontSize: 13,
                }}
              >
                <FiMessageSquare
                  size={28}
                  style={{ margin: "0 auto 10px", opacity: 0.4 }}
                />
                No visitor chats yet. When someone messages MerxoDev AI on the
                website, it will appear here live!
              </div>
            ) : (
              sessions.map((s) => {
                const isSelected = s.id === selectedSessionId;
                const isLive = s.mode === "live";
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedSessionId(s.id);
                      setMobileChatOpen(true);
                    }}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 14,
                      marginBottom: 8,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      background: isSelected
                        ? (isDark ? "rgba(99, 102, 241, 0.18)" : "#e0e7ff")
                        : s.needsHuman
                          ? (isDark ? "rgba(245, 158, 11, 0.1)" : "#fffbeb")
                          : (isDark ? "rgba(255, 255, 255, 0.025)" : "#f8fafc"),
                      border: isSelected
                        ? (isDark ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid #818cf8")
                        : s.needsHuman
                          ? (isDark ? "1px solid rgba(245, 158, 11, 0.4)" : "1px solid #fde68a")
                          : (isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0"),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          minWidth: 0,
                        }}
                      >
                        {s.visitorImage ? (
                          <img
                            src={s.visitorImage}
                            alt={s.visitorName || "User"}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.nextElementSibling;
                              if (fallback) fallback.style.display = "flex";
                            }}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: isDark
                                ? "1px solid rgba(139, 92, 246, 0.5)"
                                : "1px solid #c7d2fe",
                              flexShrink: 0,
                            }}
                          />
                        ) : null}
                        <div
                          style={{
                            display: s.visitorImage ? "none" : "flex",
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: isDark ? "rgba(99, 102, 241, 0.2)" : "#e0e7ff",
                            color: isDark ? "#a5b4fc" : "#4338ca",
                            border: isDark
                              ? "1px solid rgba(99, 102, 241, 0.3)"
                              : "1px solid #c7d2fe",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <FiUser size={15} />
                        </div>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: isDark ? "#f8fafc" : "#0f172a",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {s.visitorName || "Visitor"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        {s.needsHuman && (
                          <span
                            style={{
                              fontSize: 9.5,
                              fontWeight: 800,
                              padding: "2px 6px",
                              borderRadius: 6,
                              background: "#f59e0b",
                              color: "#090d16",
                            }}
                          >
                            NEEDS ADMIN
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: 9.5,
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: 6,
                            background: isLive
                              ? (isDark ? "rgba(16, 185, 129, 0.2)" : "#d1fae5")
                              : (isDark ? "rgba(99, 102, 241, 0.2)" : "#e0e7ff"),
                            color: isLive ? (isDark ? "#34d399" : "#047857") : (isDark ? "#a5b4fc" : "#4338ca"),
                          }}
                        >
                          {isLive ? "Live Team" : "AI MODE"}
                        </span>
                        {s.unreadAdmin > 0 && (
                          <span
                            style={{
                              minWidth: 18,
                              height: 18,
                              borderRadius: 999,
                              background: "#ef4444",
                              color: "#fff",
                              fontSize: 10,
                              fontWeight: 800,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0 5px",
                            }}
                          >
                            {s.unreadAdmin}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Captured Lead Info Badges */}
                    {(s.visitorPhone || s.visitorEmail) && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                          marginTop: 6,
                        }}
                      >
                        {s.visitorPhone && (
                          <span
                            style={{
                              fontSize: 10.5,
                              color: isDark ? "#34d399" : "#047857",
                              background: isDark ? "rgba(16, 185, 129, 0.12)" : "#d1fae5",
                              padding: "1px 7px",
                              borderRadius: 6,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <FiPhone size={10} />
                            {s.visitorPhone}
                          </span>
                        )}
                        {s.visitorEmail && (
                          <span
                            style={{
                              fontSize: 10.5,
                              color: isDark ? "#38bdf8" : "#0284c7",
                              background: isDark ? "rgba(56, 189, 248, 0.12)" : "#e0f2fe",
                              padding: "1px 7px",
                              borderRadius: 6,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <FiMail size={10} />
                            {s.visitorEmail}
                          </span>
                        )}
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: 11.5,
                        color: isDark ? "#94a3b8" : "#334155",
                        marginTop: 6,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.lastMessage || "Started conversation"}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 6,
                        fontSize: 10,
                        color: isDark ? "#64748b" : "#475569",
                      }}
                    >
                      <span>Lang: {(s.language || "en").toUpperCase()}</span>
                      <span>{formatTime(s.updatedAt)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Conversation & Live Team Controls */}
        <div
          className="admin-chat-thread-col"
          style={{
            background: isDark ? "rgba(15, 23, 42, 0.7)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.09)" : "1px solid #e2e8f0",
            boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {!selectedSessionId || !activeSession ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: isDark ? "#64748b" : "#64748b",
                padding: 32,
                textAlign: "center",
              }}
            >
              <FaRobot size={40} style={{ marginBottom: 12, opacity: 0.35, color: isDark ? undefined : "#6366f1" }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: isDark ? "#cbd5e1" : "#0f172a" }}>
                Select a Visitor Conversation
              </div>
              <p style={{ fontSize: 12.5, maxWidth: 380, marginTop: 6, color: isDark ? "#94a3b8" : "#64748b" }}>
                Click any visitor on the left to view what they are asking
                MerxoDev AI, or click &ldquo;Take Over&rdquo; to reply live as
                Admin.
              </p>
            </div>
          ) : (
            <>
              {/* Conversation Top Bar */}
              <div
                className="admin-chat-top-bar"
                style={{
                  padding: "12px 16px",
                  borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  background: isDark ? "rgba(255, 255, 255, 0.02)" : "#f8fafc",
                  flexWrap: "nowrap",
                }}
              >
                {/* Left Side: Back button + Clickable Profile Photo + Visitor Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
                  {/* Mobile Back Button */}
                  <button
                    type="button"
                    onClick={() => setMobileChatOpen(false)}
                    className="admin-chat-mobile-back-btn"
                    title="Back to conversation list"
                    aria-label="Back to chat list"
                  >
                    <FiArrowLeft size={18} />
                  </button>

                  {/* Profile photo: Clicking opens details modal */}
                  <div
                    onClick={handleOpenInfoModal}
                    style={{ position: "relative", cursor: "pointer", flexShrink: 0 }}
                    title="Click to view visitor email, session & details"
                  >
                    {activeSession.visitorImage ? (
                      <img
                        src={activeSession.visitorImage}
                        alt={activeSession.visitorName || "Visitor"}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.nextElementSibling;
                          if (fallback) fallback.style.display = "flex";
                        }}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: isDark
                            ? "2px solid rgba(139, 92, 246, 0.6)"
                            : "2px solid #818cf8",
                          display: "block",
                        }}
                      />
                    ) : null}
                    <div
                      style={{
                        display: activeSession.visitorImage ? "none" : "flex",
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: isDark ? "rgba(99, 102, 241, 0.25)" : "#e0e7ff",
                        color: isDark ? "#a5b4fc" : "#4338ca",
                        border: isDark
                          ? "2px solid rgba(99, 102, 241, 0.45)"
                          : "2px solid #818cf8",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FiUser size={18} />
                    </div>
                  </div>

                  {/* Name and click-for-info trigger */}
                  <div
                    onClick={handleOpenInfoModal}
                    style={{ minWidth: 0, cursor: "pointer" }}
                    title="Click to view visitor details"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          fontSize: 14.5,
                          fontWeight: 800,
                          color: isDark ? "#f8fafc" : "#0f172a",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {activeSession.visitorName || "Visitor"}
                      </span>
                      <FiInfo size={13} style={{ color: isDark ? "#818cf8" : "#6366f1", flexShrink: 0, opacity: 0.8 }} />
                    </div>

                    {/* Desktop-only quick subtitle, hidden on mobile */}
                    <div
                      className="admin-chat-header-details"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 2,
                        fontSize: 11,
                        color: isDark ? "#94a3b8" : "#64748b",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {activeSession.visitorPhone && (
                        <span>{activeSession.visitorPhone} •</span>
                      )}
                      {activeSession.visitorEmail && (
                        <span>{activeSession.visitorEmail} •</span>
                      )}
                      <span>Session: {activeSession.id.slice(0, 10)}...</span>
                    </div>
                  </div>
                </div>

                {/* Right Side (opposite to back button): Mode Switcher + Delete Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  {/* Mode Switcher (AI ⇄ Live Team) */}
                  <div
                    onClick={() => handleToggleMode(activeSession.mode === "live" ? "ai" : "live")}
                    title={`Current mode: ${activeSession.mode === "live" ? "Live Team (Click to switch to AI)" : "AI Mode (Click to switch to Live Team)"}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: isDark ? "rgba(0, 0, 0, 0.45)" : "#e2e8f0",
                      borderRadius: 999,
                      padding: 2.5,
                      cursor: "pointer",
                      border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #cbd5e1",
                      userSelect: "none",
                      gap: 2,
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 8px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        transition: "all 0.2s ease",
                        background: activeSession.mode !== "live"
                          ? (isDark ? "rgba(99, 102, 241, 0.4)" : "#6366f1")
                          : "transparent",
                        color: activeSession.mode !== "live"
                          ? "#ffffff"
                          : (isDark ? "#94a3b8" : "#64748b"),
                      }}
                    >
                      <FaRobot size={12} />
                      <span className="admin-chat-mode-label">AI</span>
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 8px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        transition: "all 0.2s ease",
                        background: activeSession.mode === "live"
                          ? "linear-gradient(135deg, #10b981, #059669)"
                          : "transparent",
                        color: activeSession.mode === "live"
                          ? "#ffffff"
                          : (isDark ? "#94a3b8" : "#64748b"),
                        boxShadow: activeSession.mode === "live"
                          ? "0 2px 8px rgba(16, 185, 129, 0.4)"
                          : "none",
                      }}
                    >
                      <FiUserCheck size={12} />
                      <span className="admin-chat-mode-label">Live</span>
                    </div>
                  </div>

                  {/* Delete Button (opposite of back button) */}
                  {!isTeamMember && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSession(activeSession.id)}
                      title="Delete Chat"
                      aria-label="Delete Chat"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: isDark ? "rgba(239, 68, 68, 0.12)" : "#fee2e2",
                        color: isDark ? "#f87171" : "#dc2626",
                        border: isDark ? "1px solid rgba(239, 68, 68, 0.25)" : "1px solid #fecaca",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.15s ease",
                      }}
                    >
                      <FiTrash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Messages Thread */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  background: isDark ? "transparent" : "#fafafa",
                }}
              >
                {messages.map((m) => {
                  if (m.sender === "system") {
                    const cleanSys = String(m.text || "")
                      .replace(/\*\*/g, "")
                      .replace(
                        /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{200D}\u{FE0F}\s]+/u,
                        "",
                      );
                    return (
                      <div
                        key={m.id}
                        style={{ textAlign: "center", margin: "4px 0" }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            padding: "4px 12px",
                            borderRadius: 999,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            background: isDark ? "rgba(16, 185, 129, 0.12)" : "#ecfdf5",
                            color: isDark ? "#34d399" : "#047857",
                            border: isDark ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid #a7f3d0",
                          }}
                        >
                          <FiCheckCircle size={12} />
                          <span>{cleanSys}</span>
                        </span>
                      </div>
                    );
                  }

                  const isVisitor = m.sender === "user";
                  const isAdmin = m.sender === "admin";

                  return (
                    <div
                      key={m.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isVisitor ? "flex-start" : "flex-end",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          marginBottom: 4,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          color: isVisitor
                            ? (isDark ? "#fbbf24" : "#b45309")
                            : isAdmin
                              ? (isDark ? "#34d399" : "#047857")
                              : (isDark ? "#818cf8" : "#4338ca"),
                        }}
                      >
                        {isVisitor && activeSession.visitorImage && (
                          <img
                            src={activeSession.visitorImage}
                            alt={activeSession.visitorName}
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 6,
                              objectFit: "cover",
                            }}
                          />
                        )}
                        {isAdmin && (
                          <img
                            src={m.senderImage || "/favicon.png"}
                            alt="Admin"
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 5,
                              objectFit: m.senderImage ? "cover" : "contain",
                              background: "#f97316",
                              padding: m.senderImage ? 0 : 2,
                            }}
                          />
                        )}
                        {!isVisitor && !isAdmin && <MdSupportAgent size={15} />}
                        <span>
                          {isVisitor
                            ? activeSession.visitorName
                            : isAdmin
                              ? m.senderName
                                ? `${m.senderName} (${m.senderRole === "TEAM_MEMBER" ? "team-member" : "Admin"})`
                                : "You (Live Team)"
                              : "MerxoDev AI"}
                        </span>
                      </span>

                      <div
                        style={{
                          maxWidth: "78%",
                          padding: "11px 15px",
                          borderRadius: 16,
                          fontSize: 13,
                          lineHeight: 1.55,
                          whiteSpace: "pre-wrap",
                          background: isVisitor
                            ? (isDark ? "rgba(255, 255, 255, 0.07)" : "#ffffff")
                            : isAdmin
                              ? (isDark
                                  ? "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.25))"
                                  : "linear-gradient(135deg, #10b981, #059669)")
                              : (isDark ? "rgba(99, 102, 241, 0.16)" : "#eef2ff"),
                          color: isVisitor
                            ? (isDark ? "#f8fafc" : "#0f172a")
                            : isAdmin
                              ? "#ffffff"
                              : (isDark ? "#f8fafc" : "#1e1b4b"),
                          border: isVisitor
                            ? (isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0")
                            : isAdmin
                              ? (isDark ? "1px solid rgba(16, 185, 129, 0.45)" : "none")
                              : (isDark ? "1px solid rgba(99, 102, 241, 0.35)" : "1px solid #c7d2fe"),
                          boxShadow: isDark ? "none" : "0 2px 6px rgba(0,0,0,0.04)",
                        }}
                      >
                        {m.text}
                      </div>

                      <span
                        style={{ fontSize: 10, color: isDark ? "#64748b" : "#94a3b8", marginTop: 3 }}
                      >
                        {formatTime(m.createdAt)}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Canned Replies */}
              <div
                style={{
                  padding: "8px 14px",
                  borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
                  display: "flex",
                  gap: 6,
                  overflowX: "auto",
                  background: isDark ? "rgba(0, 0, 0, 0.2)" : "#f8fafc",
                }}
              >
                {QUICK_ADMIN_REPLIES.map((qr, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendAdminReply(qr)}
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: 11,
                      padding: "5px 10px",
                      borderRadius: 999,
                      background: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                      color: isDark ? "#cbd5e1" : "#334155",
                      border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #cbd5e1",
                      boxShadow: isDark ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <FiZap
                      size={11}
                      style={{ color: isDark ? "#fbbf24" : "#d97706", flexShrink: 0 }}
                    />
                    <span>{qr.slice(0, 42)}...</span>
                  </button>
                ))}
              </div>

              {/* Live Team Reply Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendAdminReply();
                }}
                style={{
                  padding: 14,
                  borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                  display: "flex",
                  gap: 10,
                  background: isDark ? "rgba(15, 23, 42, 0.95)" : "#ffffff",
                }}
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a live reply to this visitor (automatically switches to Live Team mode)..."
                  style={{
                    flex: 1,
                    background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid #cbd5e1",
                    borderRadius: 12,
                    padding: "11px 15px",
                    color: isDark ? "#ffffff" : "#0f172a",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={!replyText.trim() || sending}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "0 20px",
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    border: "none",
                    cursor: "pointer",
                    opacity: !replyText.trim() || sending ? 0.5 : 1,
                  }}
                >
                  <FiSend size={15} />
                  <span>{sending ? "Sending..." : "Send Live"}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* AI Brain Settings Modal */}
      {configModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 540,
              background: isDark ? "#0f172a" : "#ffffff",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid #e2e8f0",
              boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.7)" : "0 20px 50px rgba(0,0,0,0.15)",
              borderRadius: 20,
              padding: 24,
              color: isDark ? "#f8fafc" : "#0f172a",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                <FiCpu color={isDark ? "#818cf8" : "#6366f1"} />
                <span>MerxoDev AI Brain Settings</span>
              </h3>
              <button
                type="button"
                onClick={() => setConfigModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: isDark ? "#94a3b8" : "#64748b",
                  cursor: "pointer",
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            <p
              style={{
                fontSize: 12.5,
                color: isDark ? "#94a3b8" : "#64748b",
                lineHeight: 1.5,
                marginBottom: 16,
              }}
            >
              MerxoDev AI already knows your website&apos;s live projects, team,
              services, and pricing out of the box. To unlock full **Google
              Gemini** or **Groq Llama-3.3** generative intelligence, paste a
              free API key below (or set <code>GEMINI_API_KEY</code> in{" "}
              <code>.env</code>).
            </p>

            <form
              onSubmit={handleSaveAiConfig}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: isDark ? "#cbd5e1" : "#334155",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Google Gemini API Key{" "}
                  {aiConfigStatus?.hasGemini &&
                    `(Active: ${aiConfigStatus.geminiKeyPreview})`}
                </label>
                <input
                  type="password"
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  placeholder={
                    aiConfigStatus?.hasGemini
                      ? "•••••••••••••••• (Leave blank to keep existing)"
                      : "Paste AIzaSy... key from Google AI Studio"
                  }
                  style={{
                    width: "100%",
                    padding: "10px 13px",
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.14)" : "1px solid #cbd5e1",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: 13,
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: isDark ? "#cbd5e1" : "#334155",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Groq API Key (Optional Alternative){" "}
                  {aiConfigStatus?.hasGroq &&
                    `(Active: ${aiConfigStatus.groqKeyPreview})`}
                </label>
                <input
                  type="password"
                  value={groqKeyInput}
                  onChange={(e) => setGroqKeyInput(e.target.value)}
                  placeholder={
                    aiConfigStatus?.hasGroq
                      ? "•••••••••••••••• (Leave blank to keep existing)"
                      : "Paste gsk_... key from console.groq.com"
                  }
                  style={{
                    width: "100%",
                    padding: "10px 13px",
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.14)" : "1px solid #cbd5e1",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: 13,
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: isDark ? "#cbd5e1" : "#334155",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Custom AI Instructions / Special Offers (Optional)
                </label>
                <textarea
                  rows={3}
                  value={customInstructionsInput}
                  onChange={(e) => setCustomInstructionsInput(e.target.value)}
                  placeholder="e.g., Currently offering 20% discount on E-Commerce packages this month..."
                  style={{
                    width: "100%",
                    padding: "10px 13px",
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.14)" : "1px solid #cbd5e1",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: 13,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => setConfigModalOpen(false)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9",
                    color: isDark ? "#cbd5e1" : "#475569",
                    border: isDark ? "none" : "1px solid #cbd5e1",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingConfig}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                    color: "#fff",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  {savingConfig ? "Saving..." : "Save AI Settings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* VISITOR & SESSION INTEL FULL SCREEN VIEW (Opened by tapping profile photo or name) */}
      {showVisitorInfoModal && activeSession && (
        <div
          className={`admin-visitor-fullscreen-profile ${infoModalClosing ? "is-closing" : ""}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            background: isDark ? "#090e1c" : "#f1f5f9",
            color: isDark ? "#f8fafc" : "#0f172a",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Top Sticky Header with Back Button */}
          <div
            style={{
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: isDark ? "rgba(15, 23, 42, 0.95)" : "#ffffff",
              borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
              backdropFilter: "blur(12px)",
              position: "sticky",
              top: 0,
              zIndex: 20,
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
              <button
                type="button"
                onClick={handleCloseInfoModal}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: isDark ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #cbd5e1",
                  color: isDark ? "#f8fafc" : "#0f172a",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                title="Back to chat"
                aria-label="Back to chat"
              >
                <FiArrowLeft size={18} />
              </button>
              <div style={{ minWidth: 0 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 800,
                    color: isDark ? "#f8fafc" : "#0f172a",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Visitor & Session Details
                </h2>
                <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b" }}>
                  {activeSession.visitorName || "Visitor"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background:
                    activeSession.mode === "live"
                      ? (isDark ? "rgba(16, 185, 129, 0.2)" : "#d1fae5")
                      : (isDark ? "rgba(99, 102, 241, 0.2)" : "#e0e7ff"),
                  color:
                    activeSession.mode === "live"
                      ? (isDark ? "#34d399" : "#047857")
                      : (isDark ? "#a5b4fc" : "#4338ca"),
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {activeSession.mode === "live" ? (
                  <>
                    <FiUserCheck size={12} />
                    <span>Live Team Active</span>
                  </>
                ) : (
                  <>
                    <FaRobot size={12} />
                    <span>AI Mode</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Full Screen Scrollable Content Body */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 16px 36px",
              width: "100%",
              maxWidth: 680,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Hero Profile Avatar Card */}
            <div
              style={{
                background: isDark ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.04)",
                borderRadius: 18,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {activeSession.visitorImage ? (
                <img
                  src={activeSession.visitorImage}
                  alt={activeSession.visitorName || "User"}
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #818cf8",
                    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.25)",
                    marginBottom: 12,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    background: isDark ? "rgba(99, 102, 241, 0.25)" : "#e0e7ff",
                    color: isDark ? "#a5b4fc" : "#4338ca",
                    border: "3px solid #818cf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.25)",
                  }}
                >
                  <FiUser size={38} />
                </div>
              )}

              <h2
                style={{
                  margin: "0 0 4px",
                  fontSize: 20,
                  fontWeight: 800,
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                {activeSession.visitorName || "Visitor"}
              </h2>

              <p style={{ margin: 0, fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>
                Session: <span style={{ fontFamily: "monospace" }}>{activeSession.id.slice(0, 16)}</span>
              </p>
            </div>

            {/* Section 1: Contact Information */}
            <div
              style={{
                background: isDark ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.04)",
                borderRadius: 18,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: isDark ? "#a5b4fc" : "#6366f1",
                  marginBottom: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FiMail size={14} /> Contact Details
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Email row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                    borderRadius: 12,
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                      Email Address
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 2 }}>
                      {activeSession.visitorEmail ? (
                        <a
                          href={`mailto:${activeSession.visitorEmail}`}
                          style={{
                            color: isDark ? "#38bdf8" : "#0284c7",
                            textDecoration: "none",
                          }}
                        >
                          {activeSession.visitorEmail}
                        </a>
                      ) : (
                        <span style={{ color: isDark ? "#64748b" : "#94a3b8", fontWeight: 500 }}>
                          Not provided yet
                        </span>
                      )}
                    </div>
                  </div>

                  {activeSession.visitorEmail && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <a
                        href={`mailto:${activeSession.visitorEmail}`}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 8,
                          background: isDark ? "rgba(56, 189, 248, 0.15)" : "#e0f2fe",
                          color: isDark ? "#38bdf8" : "#0284c7",
                          border: isDark ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid #bae6fd",
                          fontSize: 12,
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <FiMail size={13} /> Send Email
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(activeSession.visitorEmail);
                          toast.success("Email copied!", { duration: 1500 });
                        }}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 8,
                          background: isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9",
                          color: isDark ? "#cbd5e1" : "#475569",
                          border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #cbd5e1",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                        }}
                        title="Copy Email"
                      >
                        <FiCopy size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Phone / WhatsApp row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                    borderRadius: 12,
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                      Phone & WhatsApp
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 2 }}>
                      {activeSession.visitorPhone ? (
                        <a
                          href={`https://wa.me/${activeSession.visitorPhone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: isDark ? "#34d399" : "#047857",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <FaWhatsapp size={14} /> {activeSession.visitorPhone}
                        </a>
                      ) : (
                        <span style={{ color: isDark ? "#64748b" : "#94a3b8", fontWeight: 500 }}>
                          Not provided yet
                        </span>
                      )}
                    </div>
                  </div>

                  {activeSession.visitorPhone && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <a
                        href={`https://wa.me/${activeSession.visitorPhone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: "6px 12px",
                          borderRadius: 8,
                          background: isDark ? "rgba(16, 185, 129, 0.15)" : "#d1fae5",
                          color: isDark ? "#34d399" : "#047857",
                          border: isDark ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid #a7f3d0",
                          fontSize: 12,
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <FaWhatsapp size={13} /> Chat on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(activeSession.visitorPhone);
                          toast.success("Phone copied!", { duration: 1500 });
                        }}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 8,
                          background: isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9",
                          color: isDark ? "#cbd5e1" : "#475569",
                          border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #cbd5e1",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                        }}
                        title="Copy Phone"
                      >
                        <FiCopy size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Session Details */}
            <div
              style={{
                background: isDark ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.04)",
                borderRadius: 18,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: isDark ? "#fbbf24" : "#d97706",
                  marginBottom: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FiMessageSquare size={14} /> Session Details
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Full Session ID */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                    borderRadius: 12,
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                      Session ID
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: isDark ? "#e2e8f0" : "#1e293b",
                        wordBreak: "break-all",
                        marginTop: 2,
                      }}
                    >
                      {activeSession.id}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(activeSession.id);
                      toast.success("Session ID copied!", { duration: 1500 });
                    }}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      background: isDark ? "rgba(99, 102, 241, 0.15)" : "#e0e7ff",
                      color: isDark ? "#a5b4fc" : "#4338ca",
                      border: isDark ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid #c7d2fe",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    <FiCopy size={13} /> Copy ID
                  </button>
                </div>

                {/* Session Timestamps & Language */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      padding: "10px 14px",
                      background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                      border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                      Language
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>
                      {(activeSession.language || "en").toUpperCase()}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px 14px",
                      background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                      border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                      Session Started
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 2 }}>
                      {activeSession.createdAt ? new Date(activeSession.createdAt).toLocaleString() : "N/A"}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px 14px",
                      background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                      border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                      Last Active Time
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 2 }}>
                      {activeSession.updatedAt ? new Date(activeSession.updatedAt).toLocaleString() : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Visitor Intelligence & Telemetry */}
            <div
              style={{
                background: isDark ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.04)",
                borderRadius: 18,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: isDark ? "#38bdf8" : "#0284c7",
                  marginBottom: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FiGlobe size={14} /> Visitor Intelligence & Telemetry
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* IP Address & ISP */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                    borderRadius: 12,
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                      IP Address & ISP Network
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 14,
                        fontWeight: 800,
                        color: isDark ? "#38bdf8" : "#0284c7",
                        marginTop: 2,
                      }}
                    >
                      {visitorIntel?.ip || activeSession?.visitorIp || "N/A"}
                    </div>
                    {visitorIntel?.isp && (
                      <div style={{ fontSize: 12, color: isDark ? "#cbd5e1" : "#334155", marginTop: 2 }}>
                        {visitorIntel.isp}
                      </div>
                    )}
                  </div>

                  {(visitorIntel?.ip || activeSession?.visitorIp) && (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(visitorIntel?.ip || activeSession?.visitorIp);
                        toast.success("IP copied!", { duration: 1500 });
                      }}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: isDark ? "rgba(56, 189, 248, 0.15)" : "#e0f2fe",
                        color: isDark ? "#38bdf8" : "#0284c7",
                        border: isDark ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid #bae6fd",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      <FiCopy size={13} /> Copy IP
                    </button>
                  )}
                </div>

                {/* Location */}
                <div
                  style={{
                    padding: "10px 14px",
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                    borderRadius: 12,
                  }}
                >
                  <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                    Location (City & Country)
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: isDark ? "#fbbf24" : "#b45309", marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
                    <FiMapPin size={14} />
                    <span>
                      {visitorIntel?.city ? `${visitorIntel.city}, ${visitorIntel.countryName || visitorIntel.country}` : "Unknown Location"}
                    </span>
                  </div>
                </div>

                {/* Device, OS & Browser */}
                <div
                  style={{
                    padding: "10px 14px",
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                    borderRadius: 12,
                  }}
                >
                  <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                    Device, OS & Browser
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
                    <FiMonitor size={14} style={{ color: "#818cf8" }} />
                    <span>
                      {visitorIntel?.deviceBrand || visitorIntel?.device || "Device"} • {visitorIntel?.os || "OS"} ({visitorIntel?.browser || "Browser"})
                    </span>
                  </div>
                </div>

                {/* Current Page & Pageviews */}
                <div
                  style={{
                    padding: "10px 14px",
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                    borderRadius: 12,
                  }}
                >
                  <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                    Current Page & Total Pageviews
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      color: isDark ? "#10b981" : "#059669",
                      marginTop: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <FiGlobe size={14} />
                    <span>
                      {visitorIntel?.currentPage || "/"} • <strong>{visitorIntel?.pageViews || 1}</strong> views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Big Button: Return Back to Chat */}
            <div style={{ marginTop: 8 }}>
              <button
                type="button"
                onClick={handleCloseInfoModal}
                style={{
                  width: "100%",
                  padding: "13px 20px",
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 6px 20px rgba(99, 102, 241, 0.35)",
                }}
              >
                <FiArrowLeft size={16} /> Back to Live Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
