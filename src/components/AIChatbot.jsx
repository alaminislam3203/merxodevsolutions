"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import "@/components/i18n";
import {
  IoClose,
  IoChatbubbleEllipsesSharp,
  IoArrowBack,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import { FaWhatsapp, FaArrowRight, FaUserTie, FaUser } from "react-icons/fa6";
import {
  BsStars,
  BsTrash3,
  BsShieldCheck,
  BsClock,
  BsBellFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import { RiRobot2Line, RiSendPlaneFill } from "react-icons/ri";
import {
  MdPhoneInTalk,
  MdAlternateEmail,
  MdLocationOn,
  MdSupportAgent,
} from "react-icons/md";
import { playVisitorMessageSound } from "@/lib/chatSound";

const INITIAL_WELCOME = {
  id: "welcome",
  sender: "bot",
  text: "**Welcome to MerxoDev Solutions!**\n\nI am your **MerxoDev AI Assistant**. Ask me anything about our **custom websites, web apps, e-commerce, portfolio projects, or pricing (BDT 1,000 – 4,000)** — or click **Live Team** above to chat directly with our team!",
  actions: [
    { label: "View Services & Pricing", href: "/services", type: "link" },
    {
      label: "Chat on WhatsApp",
      href: "https://wa.me/8801313334279",
      type: "external",
    },
  ],
  createdAt: null,
};

const DEFAULT_SUGGESTIONS_EN = [
  "Website pricing & packages?",
  "Show your recent projects",
  "E-commerce & bKash/Nagad gateway",
  "How long does delivery take?",
  "Talk to Live Team",
];

export default function AIChatbot() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const { data: authSession } = useSession();
  const loggedInName = authSession?.user?.name || "";
  const loggedInEmail = authSession?.user?.email || "";
  const loggedInImage = authSession?.user?.image || "";

  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [sessionMode, setSessionMode] = useState("ai"); // 'ai' | 'live'
  const [needsHuman, setNeedsHuman] = useState(false);
  const [messages, setMessages] = useState([INITIAL_WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestingHuman, setRequestingHuman] = useState(false);
  const [customSuggestions, setCustomSuggestions] = useState(null);
  const [hasUnread, setHasUnread] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streamingMsgId, setStreamingMsgId] = useState(null);
  const [streamedText, setStreamedText] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const knownMessageIdsRef = useRef(new Set(["welcome"]));
  const streamIntervalRef = useRef(null);

  const tr = useCallback(
    (key, fallback) => (mounted ? t(key, fallback) : fallback),
    [mounted, t],
  );

  const getActiveLanguage = useCallback(() => {
    if (typeof window !== "undefined") {
      return i18n?.language || localStorage.getItem("lang") || "en";
    }
    return i18n?.language || "en";
  }, [i18n?.language]);

  const localizedDefaultSuggestions = mounted
    ? t("aiChat.suggestions", {
        returnObjects: true,
        defaultValue: DEFAULT_SUGGESTIONS_EN,
      })
    : DEFAULT_SUGGESTIONS_EN;

  const suggestions =
    Array.isArray(customSuggestions) && customSuggestions.length > 0
      ? customSuggestions
      : Array.isArray(localizedDefaultSuggestions)
        ? localizedDefaultSuggestions
        : DEFAULT_SUGGESTIONS_EN;

  // Reset contextual suggestions when user switches language in LanguageSwitcher so chips match selected language
  useEffect(() => {
    setCustomSuggestions(null);
  }, [i18n?.language]);

  // Initialize persistent sessionId and sound preference from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const savedLang = localStorage.getItem("lang") || "en";
      if (i18n && i18n.language !== savedLang) {
        i18n.changeLanguage(savedLang);
      }

      let storedId = localStorage.getItem("merxodev_chat_session_id");
      if (!storedId) {
        storedId =
          "mx_" +
          Date.now().toString(36) +
          "_" +
          Math.random().toString(36).slice(2, 8);
        localStorage.setItem("merxodev_chat_session_id", storedId);
      }
      setSessionId(storedId);

      const savedSound = localStorage.getItem("merxodev_chat_sound");
      if (savedSound === "off") setSoundEnabled(false);
    } catch {
      setSessionId("mx_" + Date.now().toString(36));
    }
  }, [i18n]);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("merxodev_chat_sound", next ? "on" : "off");
      } catch {}
      if (next) playVisitorMessageSound();
      return next;
    });
  };

  // Word-by-word streaming animation for newly arrived AI replies (ChatGPT / Gemini style)
  const triggerStreamAnimation = useCallback((msgId, fullText) => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    const words = String(fullText || "").split(" ");
    if (words.length <= 4) {
      setStreamingMsgId(null);
      return;
    }
    setStreamingMsgId(msgId);
    let idx = 3;
    setStreamedText(words.slice(0, idx).join(" "));

    streamIntervalRef.current = setInterval(() => {
      idx += 3;
      if (idx >= words.length) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
        setStreamingMsgId(null);
        setStreamedText("");
      } else {
        setStreamedText(words.slice(0, idx).join(" "));
      }
    }, 28);
  }, []);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  // Poll session messages from server (loads initial history + receives Live Team replies in real time)
  const syncSession = useCallback(
    async (isInitial = false) => {
      if (!sessionId) return;
      try {
        const params = new URLSearchParams({
          sessionId,
          preferredLang: getActiveLanguage(),
        });
        if (loggedInName) params.set("visitorName", loggedInName);
        if (loggedInEmail) params.set("visitorEmail", loggedInEmail);
        if (loggedInImage) params.set("visitorImage", loggedInImage);

        const res = await fetch(`/api/chat?${params.toString()}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();

        if (data?.session) {
          setSessionMode(data.session.mode || "ai");
          setNeedsHuman(Boolean(data.session.needsHuman));
        }

        if (Array.isArray(data?.messages) && data.messages.length > 0) {
          let newIncomingFromAdminOrBot = false;

          data.messages.forEach((m) => {
            if (!knownMessageIdsRef.current.has(m.id)) {
              knownMessageIdsRef.current.add(m.id);
              if (
                !isInitial &&
                (m.sender === "admin" || m.sender === "system")
              ) {
                newIncomingFromAdminOrBot = true;
              }
            }
          });

          setMessages([INITIAL_WELCOME, ...data.messages]);

          if (newIncomingFromAdminOrBot) {
            if (soundEnabled) playVisitorMessageSound();
            if (!isOpen) setHasUnread(true);
          }
        }
      } catch {
        // Ignore transient network errors during background poll
      }
    },
    [
      sessionId,
      soundEnabled,
      isOpen,
      loggedInName,
      loggedInEmail,
      loggedInImage,
      getActiveLanguage,
    ],
  );

  // Initial load once sessionId is ready
  useEffect(() => {
    if (sessionId) {
      syncSession(true);
    }
  }, [sessionId, syncSession]);

  // Listen for Proactive Live Chat messages triggered by Admin from Visitor Tracker
  useEffect(() => {
    const handleProactiveChat = () => {
      setIsOpen(true);
      setSessionMode("live");
      syncSession(false);
    };
    window.addEventListener("merxodev:proactive-chat", handleProactiveChat);
    return () => {
      window.removeEventListener("merxodev:proactive-chat", handleProactiveChat);
    };
  }, [syncSession]);

  // Real-time polling when chat is open OR when in Live Team / Needs Human mode
  useEffect(() => {
    if (!sessionId) return;
    if (!isOpen && sessionMode !== "live" && !needsHuman) return;

    const intervalMs = sessionMode === "live" || needsHuman ? 2500 : 4000;
    const timer = setInterval(() => {
      syncSession(false);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [sessionId, isOpen, sessionMode, needsHuman, syncSession]);

  // Lock body scroll on mobile when full-screen chat is open
  useEffect(() => {
    if (isOpen) {
      if (window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-scroll chat body
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, loading, streamedText]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setHasUnread(false);
  };

  const handleRequestLiveAdmin = async () => {
    if (requestingHuman || loading || !sessionId) return;
    setRequestingHuman(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          action: "request_human",
          preferredLang: getActiveLanguage(),
          visitorName: loggedInName || undefined,
          visitorEmail: loggedInEmail || undefined,
          visitorImage: loggedInImage || undefined,
        }),
      });
      const data = await res.json();
      if (data?.session) {
        setSessionMode(data.session.mode || "ai");
        setNeedsHuman(Boolean(data.session.needsHuman));
      }
      if (Array.isArray(data?.messages) && data.messages.length > 0) {
        data.messages.forEach((m) => knownMessageIdsRef.current.add(m.id));
        setMessages([INITIAL_WELCOME, ...data.messages]);
        if (soundEnabled) playVisitorMessageSound();
      }
    } catch {
      // Ignore error
    } finally {
      setRequestingHuman(false);
    }
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend ?? input).trim();
    if (!query || loading) return;

    // If user clicked the "Talk to Live Team" suggestion chip in any language
    const lowerQuery = query.toLowerCase();
    if (
      lowerQuery === "talk to live team" ||
      lowerQuery === "talk to live admin" ||
      query === "লাইভ টিমের সাথে কথা বলতে চাই" ||
      query === "লাইভ অ্যাডমিনের সাথে কথা বলতে চাই" ||
      query === "التحدث مع مسؤول مباشر" ||
      query === "联系人工客服"
    ) {
      setInput("");
      await handleRequestLiveAdmin();
      return;
    }

    const tempId = "temp_" + Date.now();
    const optimisticUserMsg = {
      id: tempId,
      sender: "user",
      text: query,
      createdAt: new Date().toISOString(),
    };

    knownMessageIdsRef.current.add(tempId);
    setMessages((prev) => [...prev, optimisticUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: query,
          preferredLang: getActiveLanguage(),
          visitorName: loggedInName || undefined,
          visitorEmail: loggedInEmail || undefined,
          visitorImage: loggedInImage || undefined,
        }),
      });

      const data = await res.json();

      if (data?.session) {
        setSessionMode(data.session.mode || "ai");
        setNeedsHuman(Boolean(data.session.needsHuman));
      }

      if (Array.isArray(data?.messages) && data.messages.length > 0) {
        data.messages.forEach((m) => knownMessageIdsRef.current.add(m.id));
        setMessages([INITIAL_WELCOME, ...data.messages]);

        const lastMsg = data.messages[data.messages.length - 1];
        if (lastMsg && lastMsg.sender === "bot") {
          if (soundEnabled) playVisitorMessageSound();
          triggerStreamAnimation(lastMsg.id, lastMsg.text);
        }
      } else if (data?.reply) {
        const botId = "bot_" + Date.now();
        knownMessageIdsRef.current.add(botId);
        const fallbackBotMsg = {
          id: botId,
          sender: "bot",
          text: data.reply,
          actions: data.actions || [],
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, fallbackBotMsg]);
        if (soundEnabled) playVisitorMessageSound();
        triggerStreamAnimation(botId, data.reply);
      }

      if (data?.suggestions && data.suggestions.length > 0) {
        setCustomSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          sender: "bot",
          text: tr(
            "aiChat.networkError",
            "I am experiencing a slight network delay. Please feel free to reach our developer directly on **WhatsApp (+880 1313-334279)**.",
          ),
          actions: [
            {
              label: tr("aiChat.directWhatsapp", "Direct WhatsApp"),
              href: "https://wa.me/8801313334279",
              type: "external",
            },
          ],
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    const newId =
      "mx_" +
      Date.now().toString(36) +
      "_" +
      Math.random().toString(36).slice(2, 8);
    try {
      localStorage.setItem("merxodev_chat_session_id", newId);
    } catch {}
    knownMessageIdsRef.current = new Set(["welcome"]);
    setSessionId(newId);
    setSessionMode("ai");
    setNeedsHuman(false);
    setMessages([INITIAL_WELCOME]);
    setCustomSuggestions(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (iso) => {
    if (!iso) return tr("aiChat.justNow", "Just now");
    try {
      return new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return tr("aiChat.justNow", "Just now");
    }
  };

  // Clean Markdown Renderer for bold, list bullet points, icons, contact tags
  const renderFormattedText = (content) => {
    const lines = String(content || "").split("\n");
    return lines.map((line, idx) => {
      let trimmed = line.trim();

      const formatParts = (textStr) => {
        return textStr.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong
                key={pIdx}
                className="font-bold text-violet-950 dark:text-cyan-300"
              >
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });
      };

      if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
        const itemText = trimmed.replace(/^[•\-]\s*/, "");
        return (
          <div key={idx} className="flex items-start gap-2 my-1 ml-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-2 shrink-0 shadow-xs" />
            <span className="leading-relaxed">{formatParts(itemText)}</span>
          </div>
        );
      }

      if (/^\d+[\.\)]\s+/.test(trimmed)) {
        const number = trimmed.match(/^(\d+)[\.\)]\s+/)[1];
        const itemText = trimmed.replace(/^\d+[\.\)]\s+/, "");
        return (
          <div key={idx} className="flex items-start gap-2 my-1 ml-0.5">
            <span className="w-4 h-4 rounded-md bg-violet-100 dark:bg-blue-950/80 text-violet-700 dark:text-cyan-400 text-[10px] font-black flex items-center justify-center shrink-0 border border-violet-200 dark:border-blue-900/60 mt-0.5">
              {number}
            </span>
            <span className="leading-relaxed">{formatParts(itemText)}</span>
          </div>
        );
      }

      if (
        trimmed.includes("Phone / WhatsApp") ||
        trimmed.includes("ফোন / হোয়াটসঅ্যাপ") ||
        trimmed.includes("الهاتف / واتساب") ||
        trimmed.includes("电话 / WhatsApp")
      ) {
        return (
          <div
            key={idx}
            className="flex items-start gap-2 my-1.5 text-emerald-700 dark:text-emerald-400 font-medium"
          >
            <MdPhoneInTalk className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formatParts(trimmed.replace(/^[📞\s]+/, ""))}</span>
          </div>
        );
      }

      if (
        trimmed.includes("Email:") ||
        trimmed.includes("ইমেইল:") ||
        trimmed.includes("البريد الإلكتروني:") ||
        trimmed.includes("邮箱:")
      ) {
        return (
          <div
            key={idx}
            className="flex items-start gap-2 my-1.5 text-blue-700 dark:text-cyan-400 font-medium"
          >
            <MdAlternateEmail className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formatParts(trimmed.replace(/^[✉️\s]+/, ""))}</span>
          </div>
        );
      }

      if (
        trimmed.includes("Location:") ||
        trimmed.includes("ঠিকানা:") ||
        trimmed.includes("الموقع:") ||
        trimmed.includes("地址:")
      ) {
        return (
          <div
            key={idx}
            className="flex items-start gap-2 my-1.5 text-rose-700 dark:text-rose-400 font-medium"
          >
            <MdLocationOn className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formatParts(trimmed.replace(/^[📍\s]+/, ""))}</span>
          </div>
        );
      }

      if (
        trimmed.includes("Availability:") ||
        trimmed.includes("সার্ভিস টাইম:") ||
        trimmed.includes("Available:") ||
        trimmed.includes("التوفر:") ||
        trimmed.includes("服务时间:")
      ) {
        return (
          <div
            key={idx}
            className="flex items-start gap-2 my-1.5 text-amber-700 dark:text-amber-400 font-medium"
          >
            <BsClock className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formatParts(trimmed.replace(/^[⏱️\s]+/, ""))}</span>
          </div>
        );
      }

      if (
        trimmed.startsWith("✅") ||
        trimmed.startsWith("🔔") ||
        trimmed.includes("Instant Alert Sent to Live") ||
        trimmed.includes("লাইভ অ্যাডমিনকে ইনস্ট্যান্ট নোটিফিকেশন") ||
        trimmed.includes("লাইভ টিমকে ইনস্ট্যান্ট নোটিফিকেশন") ||
        trimmed.includes("Live Team ke instant notification") ||
        trimmed.includes("Live Admin ke instant notification") ||
        trimmed.includes("تم إرسال تنبيه فوري") ||
        trimmed.includes("已向人工客服发送即时通知")
      ) {
        const cleanAlert = trimmed.replace(/^[✅🔔\s]+/, "");
        return (
          <div
            key={idx}
            className="flex items-start gap-2 my-1.5 text-emerald-700 dark:text-emerald-400 font-medium"
          >
            <BsCheckCircleFill className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
            <span>{formatParts(cleanAlert)}</span>
          </div>
        );
      }

      if (trimmed === "") {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 leading-relaxed">
          {formatParts(trimmed)}
        </p>
      );
    });
  };

  return (
    <>
      {/* ─── Main Chat Window: Full-Screen on Mobile, Floating Box on Desktop ─── */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-[999] sm:z-50 w-full sm:w-[420px] h-full sm:h-[600px] sm:max-h-[84vh] rounded-none sm:rounded-3xl bg-white dark:bg-[#060b19] sm:bg-white/95 sm:dark:bg-[#060b19]/95 backdrop-blur-2xl border-0 sm:border border-violet-200/80 dark:border-blue-900/50 shadow-2xl shadow-blue-950/30 flex flex-col overflow-hidden font-exo-extralight transition-all duration-300 transform sm:origin-bottom-right animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-violet-700 via-indigo-800 to-cyan-700 dark:from-[#091124] dark:via-[#0c1630] dark:to-[#091124] text-white flex items-center justify-between border-b border-white/10 dark:border-blue-900/40 shrink-0 shadow-md">
            <div className="flex items-center gap-2.5">
              {/* Back Arrow for mobile */}
              <button
                onClick={handleToggle}
                className="sm:hidden p-1.5 -ml-1 text-white/90 hover:text-white rounded-lg active:bg-white/10"
                aria-label={tr("aiChat.back", "Back")}
              >
                <IoArrowBack className="w-5 h-5" />
              </button>

              <div className="relative">
                {sessionMode === "live" ? (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-orange-500 dark:bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center shadow-md border border-white/20">
                    <Image
                      src="/favicon.png"
                      alt="MerxoDev Team"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-md border border-white/25 text-cyan-300">
                    <MdSupportAgent className="w-6 h-6 text-white drop-shadow-sm" />
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-violet-900 dark:border-[#091124] animate-pulse" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-extrabold tracking-wide flex items-center gap-1.5">
                  {sessionMode === "live"
                    ? tr("aiChat.headerTitleLive", "MerxoDev Live Team")
                    : tr("aiChat.headerTitleAi", "MerxoDev AI")}
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                      sessionMode === "live"
                        ? "bg-emerald-500/30 text-emerald-200 border-emerald-400/50"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {sessionMode === "live"
                      ? tr("aiChat.badgeLive", "Live Human")
                      : tr("aiChat.badgeOnline", "Online")}
                  </span>
                </h3>
                <p className="text-[10px] sm:text-[11px] text-white/80 dark:text-cyan-300 flex items-center gap-1">
                  <BsStars className="w-2.5 h-2.5 text-amber-300" />
                  {sessionMode === "live"
                    ? tr("aiChat.subtitleLive", "Direct Team Conversation")
                    : tr("aiChat.subtitleAi", "AI + Live Team Support")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Request Live Team Button */}
              {sessionMode !== "live" && (
                <button
                  type="button"
                  onClick={handleRequestLiveAdmin}
                  disabled={requestingHuman || needsHuman}
                  title={tr("aiChat.requestLiveAdminTitle", "Request Live Team")}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                    needsHuman
                      ? "bg-amber-500/25 text-amber-200 border-amber-400/40"
                      : "bg-white/15 hover:bg-emerald-500/30 text-white border-white/20"
                  }`}
                >
                  <MdSupportAgent className="w-3.5 h-3.5 text-emerald-300" />
                  <span>
                    {needsHuman
                      ? tr("aiChat.adminAlertedBtn", "Alerted")
                      : tr("aiChat.liveAdminBtn", "Live Team")}
                  </span>
                </button>
              )}

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                title={
                  soundEnabled
                    ? tr("aiChat.muteSound", "Mute Notification Sound")
                    : tr("aiChat.unmuteSound", "Unmute Notification Sound")
                }
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle Sound"
              >
                {soundEnabled ? (
                  <IoVolumeHigh className="w-4 h-4 text-emerald-300" />
                ) : (
                  <IoVolumeMute className="w-4 h-4 text-white/50" />
                )}
              </button>

              {/* Clear Chat */}
              <button
                type="button"
                onClick={handleClearChat}
                title={tr("aiChat.newChat", "New Chat")}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <BsTrash3 className="w-3.5 h-3.5" />
              </button>

              {/* Close Chat */}
              <button
                type="button"
                onClick={handleToggle}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={tr("aiChat.closeChat", "Close Chat")}
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Live Team Status Bar when in Live Mode or Needs Human */}
          {(sessionMode === "live" || needsHuman) && (
            <div
              className={`px-4 py-1.5 text-[11px] font-semibold flex items-center justify-between border-b shrink-0 ${
                sessionMode === "live"
                  ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                  : "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${
                    sessionMode === "live" ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {sessionMode === "live" ? (
                  <FaUserTie className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <BsBellFill className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                )}
                <span>
                  {sessionMode === "live"
                    ? tr(
                        "aiChat.statusLive",
                        "You are chatting live with a MerxoDev Team",
                      )
                    : tr(
                        "aiChat.statusNotified",
                        "Live Team notified! AI will assist until Team joins.",
                      )}
                </span>
              </span>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-[13px] bg-zinc-50/50 dark:bg-[#060b19]/60">
            {messages.map((msg) => {
              if (msg.sender === "system") {
                const cleanSysText = String(msg.text || "")
                  .replace(/\*\*/g, "")
                  .replace(
                    /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{200D}\u{FE0F}\s]+/u,
                    "",
                  );
                const isLiveJoin = cleanSysText.toLowerCase().includes("live");
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-center">
                      {isLiveJoin ? (
                        <FaUserTie className="w-3 h-3 shrink-0" />
                      ) : (
                        <MdSupportAgent className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span>{cleanSysText}</span>
                    </span>
                  </div>
                );
              }

              const isUser = msg.sender === "user";
              const isAdmin = msg.sender === "admin";
              const isWelcome = msg.id === "welcome";
              const rawText = isWelcome
                ? tr("aiChat.welcomeText", INITIAL_WELCOME.text)
                : msg.text;
              const displayContent =
                streamingMsgId === msg.id ? streamedText : rawText;

              const messageActions = isWelcome
                ? [
                    {
                      label: tr(
                        "aiChat.viewServices",
                        "View Services & Pricing",
                      ),
                      href: "/services",
                      type: "link",
                    },
                    {
                      label: tr("aiChat.chatWhatsapp", "Chat on WhatsApp"),
                      href: "https://wa.me/8801313334279",
                      type: "external",
                    },
                  ]
                : msg.actions;

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {/* Side Avatar for MerxoDev AI (Support Icon) vs Live Team (favicon.png) */}
                  {!isUser && (
                    <div className="shrink-0 mb-4">
                      {isAdmin ? (
                        <div className="w-7 h-7 rounded-xl bg-orange-500 dark:bg-zinc-900 border border-orange-400 dark:border-emerald-500/50 p-1 flex items-center justify-center shadow-sm">
                          <Image
                            src="/favicon.png"
                            alt="Admin"
                            width={22}
                            height={22}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white flex items-center justify-center shadow-sm">
                          <MdSupportAgent className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`flex flex-col max-w-[82%] ${isUser ? "items-end" : "items-start"}`}
                  >
                    {/* Sender Label for User, Admin, or AI */}
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      {isUser ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-700 dark:text-cyan-300">
                          {loggedInName || tr("aiChat.visitorLabel", "Visitor")}
                        </span>
                      ) : isAdmin ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                          {tr(
                            "aiChat.liveAdminLabel",
                            "Live Team (MerxoDev Team)",
                          )}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-600 dark:text-cyan-400">
                          <MdSupportAgent className="w-3 h-3" />
                          {tr("aiChat.aiSupportLabel", "MerxoDev AI Support")}
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-full rounded-2xl px-4 py-3 shadow-sm ${
                        isUser
                          ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-br-sm shadow-violet-500/10"
                          : isAdmin
                            ? "bg-emerald-50/90 dark:bg-emerald-950/40 text-zinc-900 dark:text-zinc-100 border-2 border-emerald-500/40 rounded-bl-sm shadow-sm"
                            : "bg-white dark:bg-[#0f1b38] text-zinc-800 dark:text-zinc-100 border border-zinc-200/70 dark:border-blue-900/40 rounded-bl-sm shadow-xs"
                      }`}
                    >
                      <div>{renderFormattedText(displayContent)}</div>

                      {/* Action Link Buttons inside Bot Response */}
                      {messageActions &&
                        messageActions.length > 0 &&
                        streamingMsgId !== msg.id && (
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-zinc-200/50 dark:border-white/10">
                            {messageActions.map((act, i) =>
                              act.type === "external" ? (
                                <a
                                  key={i}
                                  href={act.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-sm group"
                                >
                                  <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                                  <span>{act.label}</span>
                                </a>
                              ) : (
                                <Link
                                  key={i}
                                  href={act.href}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-500/15 text-violet-800 dark:text-cyan-300 border border-violet-500/30 text-[11px] font-bold hover:bg-violet-600 hover:text-white transition-all shadow-sm group"
                                >
                                  <FaArrowRight className="w-2.5 h-2.5 text-violet-600 dark:text-cyan-400 group-hover:text-white transition-colors" />
                                  <span>{act.label}</span>
                                </Link>
                              ),
                            )}
                          </div>
                        )}
                    </div>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 px-1 mt-1 font-medium">
                      {formatTime(msg.createdAt || msg.timestamp)}
                    </span>
                  </div>

                  {/* Side Avatar for User (User Photo like favicon.png when logged in, or User icon) */}
                  {isUser && (
                    <div className="shrink-0 mb-4">
                      {loggedInImage ? (
                        <div className="w-7 h-7 rounded-xl bg-white dark:bg-zinc-900 border border-violet-300 dark:border-cyan-500/50 overflow-hidden flex items-center justify-center shadow-sm">
                          <img
                            src={loggedInImage}
                            alt={loggedInName || "User"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-sm text-[11px] font-extrabold">
                          {loggedInName ? (
                            loggedInName.charAt(0).toUpperCase()
                          ) : (
                            <FaUser className="w-3.5 h-3.5" />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Animation */}
            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-[#0f1b38] border border-zinc-200/70 dark:border-blue-900/40 w-36 shadow-xs">
                <RiRobot2Line className="w-4 h-4 text-violet-600 dark:text-cyan-400 animate-spin" />
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {sessionMode === "live"
                    ? tr("aiChat.sending", "Sending...")
                    : tr("aiChat.aiThinking", "AI Thinking...")}
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          {suggestions.length > 0 && (
            <div className="px-3.5 py-2 border-t border-zinc-200/60 dark:border-blue-900/30 bg-white/80 dark:bg-[#080e21] overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(sug)}
                  className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-[#0f1c3d] text-violet-700 dark:text-cyan-300 border border-violet-200/80 dark:border-blue-800 hover:bg-violet-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-zinc-950 transition-all shrink-0 shadow-xs cursor-pointer"
                >
                  <BsStars className="w-2.5 h-2.5 opacity-70" />
                  <span>{sug}</span>
                </button>
              ))}
            </div>
          )}

          {/* Message Input Bar */}
          <div className="p-3 sm:p-3.5 bg-white dark:bg-[#060b19] border-t border-zinc-200/80 dark:border-blue-900/40 shrink-0">
            <div className="flex items-center gap-2 bg-zinc-100/90 dark:bg-[#0f1b38] rounded-2xl px-3.5 py-2 border border-zinc-200 dark:border-blue-900/50 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  sessionMode === "live"
                    ? tr(
                        "aiChat.placeholderLive",
                        "Write a message to Live Team...",
                      )
                    : tr(
                        "aiChat.placeholderAi",
                        "Ask anything about MerxoDev Solutions...",
                      )
                }
                className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0 cursor-pointer"
                aria-label={tr("aiChat.sendMessageAria", "Send message")}
              >
                <RiSendPlaneFill className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 px-1 mt-1.5">
              <span className="flex items-center gap-1">
                <BsShieldCheck className="w-3 h-3 text-cyan-500" />
                {sessionMode === "live"
                  ? tr("aiChat.footerLiveAgent", "MerxoDev Live Agent")
                  : tr("aiChat.footerAiSupport", "MerxoDev AI + Live Support")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {tr("aiChat.footerInstantReply", "24/7 Instant Reply")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Floating Launcher Trigger ─── */}
      <div className="fixed bottom-20 md:bottom-5 right-3.5 sm:right-5 z-50 flex flex-col items-end pointer-events-none select-none font-exo-extralight">
        <button
          onClick={handleToggle}
          className={`pointer-events-auto relative group items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-violet-600/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20 cursor-pointer ${
            isOpen ? "hidden sm:flex" : "flex"
          }`}
          aria-label={tr("aiChat.launcherOpenAria", "Open AI Chat Assistant")}
        >
          <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-30 animate-ping pointer-events-none" />

          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-zinc-950 font-black text-[10px] flex items-center justify-center shadow-md animate-bounce">
              !
            </span>
          )}

          {isOpen ? (
            <IoClose className="w-7 h-7" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <IoChatbubbleEllipsesSharp className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
              <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5">
                {sessionMode === "live"
                  ? tr("aiChat.launcherLive", "LIVE")
                  : tr("aiChat.launcherAi", "AI CHAT")}
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
