'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'bot',
    text: "👋 **Hello! Welcome to MerxoDev Solutions.**\n\nI am your **AI Assistant**. How can I help you today? You can ask about our **web development packages, pricing (BDT 1,000 - 4,000), technologies, delivery timelines**, or book a direct consultation!",
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

  // Basic Markdown Renderer for bold, bullet points, links
  const renderFormattedText = (content) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Bold parsing **text**
      const parts = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold text-violet-900 dark:text-cyan-300">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-1 my-0.5">
            <span className="text-cyan-500 font-bold">•</span>
            <span>{parts}</span>
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return <p key={idx} className="my-0.5 leading-relaxed">{parts}</p>;
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none select-none">
      {/* ─── Greeting Tooltip Bubble (Above Launcher) ─── */}
      {!isOpen && showTooltip && (
        <div
          onClick={handleToggle}
          className="pointer-events-auto mb-3 max-w-xs cursor-pointer rounded-2xl bg-white dark:bg-[#091124] p-3.5 shadow-2xl border border-violet-200/80 dark:border-blue-900/60 transition-all duration-300 transform hover:scale-105 animate-bounce-short"
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md p-1 flex items-center justify-center shrink-0 shadow-md border border-violet-200/50 dark:border-white/10">
              <Image
                src="/favicon.png"
                alt="MerxoDev Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-zinc-900 dark:text-white font-raleway flex items-center gap-1.5">
                MerxoDev Assistant
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-300 font-raleway mt-0.5">
                Need a website or pricing quote? Let&apos;s chat! ⚡
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white text-xs p-0.5"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ─── Main Chat Window ─── */}
      {isOpen && (
        <div
          className="pointer-events-auto mb-4 w-[92vw] sm:w-[400px] h-[560px] max-h-[82vh] rounded-3xl bg-white/95 dark:bg-[#060b19]/95 backdrop-blur-2xl border border-violet-200/80 dark:border-blue-900/50 shadow-2xl shadow-blue-950/30 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-violet-700 via-violet-800 to-cyan-700 dark:from-[#091124] dark:via-[#0c1630] dark:to-[#091124] text-white flex items-center justify-between border-b border-white/10 dark:border-blue-900/40 shrink-0">
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
                <h3 className="text-sm font-extrabold font-raleway tracking-wide flex items-center gap-1.5">
                  MerxoDev AI
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/20 text-white uppercase tracking-wider">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-white/80 dark:text-cyan-300 font-raleway">
                  Instant Support & Digital Quotes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(INITIAL_MESSAGES)}
                title="Clear Chat"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs font-raleway"
              >
                Clear
              </button>
              <button
                onClick={handleToggle}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 font-raleway text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'user'
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-br-sm'
                    : 'bg-zinc-100/90 dark:bg-[#0f1b38] text-zinc-800 dark:text-zinc-100 border border-zinc-200/70 dark:border-blue-900/40 rounded-bl-sm'
                    }`}
                >
                  <div className="text-xs sm:text-[13px]">
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
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                          >
                            <span>💬</span> {act.label}
                          </a>
                        ) : (
                          <Link
                            key={i}
                            href={act.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-500/15 text-violet-700 dark:text-cyan-300 border border-violet-500/30 text-[11px] font-bold hover:bg-violet-600 hover:text-white transition-all shadow-sm"
                          >
                            <span>➔</span> {act.label}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 px-1 mt-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Animation */}
            {loading && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-zinc-100 dark:bg-[#0f1b38] border border-zinc-200/70 dark:border-blue-900/40 w-20">
                <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
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
                  className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-[#0f1c3d] text-violet-700 dark:text-cyan-300 border border-violet-200 dark:border-blue-800 hover:bg-violet-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-zinc-950 transition-all shrink-0 font-raleway shadow-xs"
                >
                  {sug}
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
                className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none font-raleway"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 px-1 mt-1.5 font-raleway">
              <span>⚡ AI-Powered by Merxodevsolutions</span>
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Floating Launcher Trigger Button ─── */}
      <button
        onClick={handleToggle}
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 text-white shadow-2xl shadow-violet-600/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20"
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-tighter mt-0.5">AI CHAT</span>
          </div>
        )}
      </button>
    </div>
  );
}
