'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  IoSend, 
  IoClose, 
  IoChatbubbleEllipsesSharp, 
  IoSparklesSharp 
} from 'react-icons/io5';
import { 
  FaWhatsapp, 
  FaArrowRight, 
  FaCheckCircle 
} from 'react-icons/fa6';
import { 
  BsStars, 
  BsTrash3, 
  BsLightningChargeFill,
  BsShieldCheck,
  BsClock
} from 'react-icons/bs';
import { 
  RiRobot2Line, 
  RiMessage3Line, 
  RiSendPlaneFill 
} from 'react-icons/ri';
import { 
  MdPhoneInTalk, 
  MdAlternateEmail, 
  MdLocationOn 
} from 'react-icons/md';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'bot',
    text: "**Welcome to MerxoDev Solutions!**\n\nI am your **MerxoDev AI Assistant**. How can I help you today? You can ask about our **web development packages, pricing (BDT 1,000 - 4,000), technologies, delivery timelines**, or book a direct consultation!",
    actions: [
      { label: 'View Services & Pricing', href: '/services', type: 'link' },
      { label: 'Chat on WhatsApp', href: 'https://wa.me/8801313334279', type: 'external' },
    ],
    timestamp: 'Just now'
  }
];

const QUICK_SUGGESTIONS = [
  'Website pricing & packages?',
  'What services do you offer?',
  'Custom Web App & SaaS quote',
  'How to hire or contact?',
  'What technologies do you use?'
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(QUICK_SUGGESTIONS);
  const [hasUnread, setHasUnread] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Show welcoming tooltip after 3 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
        setHasUnread(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll chat body
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, loading]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setShowTooltip(false);
    setHasUnread(false);
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      const data = await res.json();

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || "Thank you for reaching out! How else can I assist you?",
        actions: data.actions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "I am experiencing a slight network delay. Please feel free to reach our developer directly on **WhatsApp (+880 1313-334279)**.",
          actions: [
            { label: 'Direct WhatsApp', href: 'https://wa.me/8801313334279', type: 'external' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clean Markdown Renderer for bold, list bullet points, icons, contact tags
  const renderFormattedText = (content) => {
    // Replace raw emoji prefixes with react icons or clean markup if present
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      let trimmed = line.trim();

      // Bold parsing **text**
      const formatParts = (textStr) => {
        return textStr.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-bold text-violet-950 dark:text-cyan-300">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });
      };

      // Bullet points
      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
        const itemText = trimmed.replace(/^[•\-]\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 ml-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-2 shrink-0 shadow-xs" />
            <span className="leading-relaxed">{formatParts(itemText)}</span>
          </div>
        );
      }

      // Ordered list items (1., 2., etc.)
      if (/^\d+[\.\)]\s+/.test(trimmed)) {
        const number = trimmed.match(/^(\d+)[\.\)]\s+/)[1];
        const itemText = trimmed.replace(/^\d+[\.\)]\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 ml-0.5">
            <span className="w-4 h-4 rounded-md bg-violet-100 dark:bg-blue-950/80 text-violet-700 dark:text-cyan-400 text-[10px] font-black flex items-center justify-center shrink-0 border border-violet-200 dark:border-blue-900/60 mt-0.5">
              {number}
            </span>
            <span className="leading-relaxed">{formatParts(itemText)}</span>
          </div>
        );
      }

      // Contact icon rows
      if (trimmed.includes('Phone / WhatsApp') || trimmed.includes('ফোন / হোয়াটসঅ্যাপ') || trimmed.includes('الهاتف / واتساب') || trimmed.includes('फोन / व्हाट्सएप')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
            <MdPhoneInTalk className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formatParts(trimmed.replace(/^[📞\s]+/, ''))}</span>
          </div>
        );
      }

      if (trimmed.includes('Email') || trimmed.includes('ইমেইল') || trimmed.includes('البريد الإلكتروني') || trimmed.includes('ईमेल') || trimmed.includes('邮箱')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1.5 text-blue-700 dark:text-cyan-400 font-medium">
            <MdAlternateEmail className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formatParts(trimmed.replace(/^[✉️\s]+/, ''))}</span>
          </div>
        );
      }

      if (trimmed.includes('Location') || trimmed.includes('ঠিকানা') || trimmed.includes('الموقع') || trimmed.includes('स्थान') || trimmed.includes('地址')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1.5 text-rose-700 dark:text-rose-400 font-medium">
            <MdLocationOn className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formatParts(trimmed.replace(/^[📍\s]+/, ''))}</span>
          </div>
        );
      }

      if (trimmed.includes('Availability') || trimmed.includes('সার্ভিস টাইম') || trimmed.includes('الاستجابة') || trimmed.includes('सपोर्ट') || trimmed.includes('Available')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1.5 text-amber-700 dark:text-amber-400 font-medium">
            <BsClock className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formatParts(trimmed.replace(/^[⏱️\s]+/, ''))}</span>
          </div>
        );
      }

      if (trimmed === '') {
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none select-none font-raleway">
      {/* ─── Welcoming Tooltip Bubble (Above Launcher) ─── */}
      {!isOpen && showTooltip && (
        <div
          onClick={handleToggle}
          className="pointer-events-auto mb-3 max-w-xs cursor-pointer rounded-2xl bg-white/95 dark:bg-[#091124]/95 backdrop-blur-xl p-3.5 shadow-2xl border border-violet-200/80 dark:border-blue-900/60 transition-all duration-300 transform hover:scale-105 animate-bounce-short"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 flex items-center justify-center shrink-0 shadow-md">
              <div className="w-full h-full bg-white dark:bg-[#060b19] rounded-[10px] flex items-center justify-center p-1">
                <Image
                  src="/favicon.png"
                  alt="MerxoDev Logo"
                  width={22}
                  height={22}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-zinc-900 dark:text-white">
                  MerxoDev Assistant
                </p>
                <BsStars className="w-3 h-3 text-amber-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-0.5 flex items-center gap-1">
                Need a website or pricing quote? Let&apos;s chat!
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-0.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <IoClose className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── Main Chat Window ─── */}
      {isOpen && (
        <div
          className="pointer-events-auto mb-4 w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] rounded-3xl bg-white/95 dark:bg-[#060b19]/95 backdrop-blur-2xl border border-violet-200/80 dark:border-blue-900/50 shadow-2xl shadow-blue-950/30 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-violet-700 via-indigo-800 to-cyan-700 dark:from-[#091124] dark:via-[#0c1630] dark:to-[#091124] text-white flex items-center justify-between border-b border-white/10 dark:border-blue-900/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center shadow-md border border-white/20">
                  <Image
                    src="/favicon.png"
                    alt="MerxoDev Solutions Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-violet-900 dark:border-[#091124] animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-wide flex items-center gap-1.5">
                  MerxoDev AI
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-white/80 dark:text-cyan-300 flex items-center gap-1">
                  <BsStars className="w-2.5 h-2.5 text-amber-300" />
                  Instant Multilingual Support
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(INITIAL_MESSAGES)}
                title="Clear Chat"
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors text-xs font-semibold"
              >
                <BsTrash3 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
              <button
                onClick={handleToggle}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-[13px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'user'
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-br-sm shadow-violet-500/10'
                    : 'bg-zinc-100/90 dark:bg-[#0f1b38] text-zinc-800 dark:text-zinc-100 border border-zinc-200/70 dark:border-blue-900/40 rounded-bl-sm'
                    }`}
                >
                  <div>
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Action Link Buttons inside Bot Response */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-zinc-200/50 dark:border-white/10">
                      {msg.actions.map((act, i) => (
                        act.type === 'external' ? (
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
                        )
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 px-1 mt-1 font-medium">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Animation */}
            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-100 dark:bg-[#0f1b38] border border-zinc-200/70 dark:border-blue-900/40 w-24">
                <RiRobot2Line className="w-4 h-4 text-violet-600 dark:text-cyan-400 animate-spin" />
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          {suggestions.length > 0 && (
            <div className="px-3 py-2 border-t border-zinc-100 dark:border-blue-900/30 bg-zinc-50/70 dark:bg-[#080e21] overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(sug)}
                  className="inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-[#0f1c3d] text-violet-700 dark:text-cyan-300 border border-violet-200 dark:border-blue-800 hover:bg-violet-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-zinc-950 transition-all shrink-0 shadow-xs"
                >
                  <BsStars className="w-2.5 h-2.5 opacity-70" />
                  <span>{sug}</span>
                </button>
              ))}
            </div>
          )}

          {/* Message Input Bar */}
          <div className="p-3 bg-white dark:bg-[#060b19] border-t border-zinc-200/80 dark:border-blue-900/40 shrink-0">
            <div className="flex items-center gap-2 bg-zinc-100/90 dark:bg-[#0f1b38] rounded-2xl px-3.5 py-2 border border-zinc-200 dark:border-blue-900/50 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about website, price, SaaS..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0"
                aria-label="Send message"
              >
                <RiSendPlaneFill className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 px-1 mt-1.5">
              <span className="flex items-center gap-1">
                <BsShieldCheck className="w-3 h-3 text-cyan-500" />
                MerxoDev AI Intelligence
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Floating Launcher Trigger Button ─── */}
      <button
        onClick={handleToggle}
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-violet-600/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20"
        aria-label="Open AI Chat Assistant"
      >
        {/* Pulse Aura */}
        <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-30 animate-ping pointer-events-none" />

        {/* Unread Alert Dot */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-zinc-950 font-black text-[10px] flex items-center justify-center shadow-md animate-pulse">
            1
          </span>
        )}

        {/* Icon (Toggle Chat / Close) */}
        {isOpen ? (
          <IoClose className="w-7 h-7" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <IoChatbubbleEllipsesSharp className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5">AI CHAT</span>
          </div>
        )}
      </button>
    </div>
  );
}
