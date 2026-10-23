'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaYoutube, FaPlay, FaCheckCircle, FaExternalLinkAlt, FaListOl, FaChevronDown } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { RiLiveFill } from 'react-icons/ri';
import '@/components/i18n';

export const DEFAULT_VIDEOS = [
  {
    id: 'i7y-W-3dgOs',
    title: 'Bangladesh GeoJSON 🔥 সব District, Upazila & Postcode এক প্যাকেজে! | npm Package for Developers',
    channel: 'MerxoDev Solutions',
    badge: 'Video 01',
    duration: 'Latest Release',
    publishedAt: '2026-10-18T05:23:48+00:00',
  },
  {
    id: 'JnX8NPrIFGc',
    title: 'আধুনিক ও প্রফেশনাল ওয়েবসাইট তৈরি করুন | Website Development Services | MERXODEV Solutions',
    channel: 'MerxoDev Solutions',
    badge: 'Video 02',
    duration: 'Full Showcase',
    publishedAt: '2026-08-18T08:59:24+00:00',
  },
  {
    id: '2DZpXXgg0tY',
    title: '🚀 আপনার ব্যবসার জন্য আধুনিক ও প্রফেশনাল ওয়েবসাইট তৈরি করুন!',
    channel: 'MerxoDev Solutions',
    badge: 'Video 03',
    duration: 'Tech Architecture',
    publishedAt: '2026-07-19T02:23:36+00:00',
  },
  {
    id: 'wHlBRzdR_AU',
    title: '🚀 আপনার ব্যবসার জন্য প্রিমিয়াম কাস্টম ওয়েবসাইট!✨ দ্রুত ডেলিভারি • আধুনিক ডিজাইন',
    channel: 'MerxoDev Solutions',
    badge: 'Video 04',
    duration: 'Engineering Demo',
    publishedAt: '2026-07-18T10:42:17+00:00',
  },
];

const CHANNEL_URL = 'https://www.youtube.com/@merxodevsolutions';
const FEATURED_LIMIT = 4;

export default function YouTubeShowcase({ initialVideos = DEFAULT_VIDEOS }) {
  const { t } = useTranslation();
  const [videos, setVideos] = useState(
    initialVideos && initialVideos.length > 0 ? initialVideos : DEFAULT_VIDEOS
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(true);
  const [mobilePlaylistOpen, setMobilePlaylistOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const playerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const videosRef = useRef(videos);
  const hoverTimeoutRef = useRef(null);

  // Sync ref with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    videosRef.current = videos;
  }, [videos]);

  // Sync initialVideos if server passes updated list
  useEffect(() => {
    if (initialVideos && initialVideos.length > 0) {
      setVideos(initialVideos);
    }
  }, [initialVideos]);

  // Client-side live polling: checks YouTube feed every 2 minutes for new video uploads
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveChannelVideos() {
      try {
        const res = await fetch(`/api/youtube-videos?t=${Date.now()}`, {
          cache: 'no-store',
          headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
          if (!isMounted) return;
          setVideos(data.videos);
        }
      } catch (err) {
        console.warn('[YouTubeShowcase] Live feed check error:', err?.message);
      }
    }

    fetchLiveChannelVideos();
    const pollInterval = setInterval(fetchLiveChannelVideos, 120000); // 2 minutes

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  const handleUserActivity = useCallback(() => {
    setIsHovered(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 1000);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const loadNextVideo = useCallback(() => {
    const list = videosRef.current;
    if (!list || list.length === 0) return;
    const nextIndex = (activeIndexRef.current + 1) % list.length;
    setActiveIndex(nextIndex);
    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.loadVideoById(list[nextIndex].id);
      setIsPlaying(true);
    }
  }, []);

  const handleSelectVideo = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.loadVideoById(videos[index].id);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Initialize YouTube IFrame API
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        if (!playerRef.current) {
          const initialId = videosRef.current[0]?.id || DEFAULT_VIDEOS[0].id;
          playerRef.current = new window.YT.Player('youtube-player-iframe', {
            videoId: initialId,
            playerVars: {
              autoplay: 0,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
              enablejsapi: 1,
              iv_load_policy: 3,
              autohide: 1,
              controls: 1,
              fs: 1,
              cc_load_policy: 0,
              showinfo: 0,
            },
            events: {
              onStateChange: (event) => {
                // event.data === 0 represents YT.PlayerState.ENDED
                if (event.data === 0) {
                  loadNextVideo();
                } else if (event.data === 1) {
                  setIsPlaying(true);
                } else if (event.data === 2) {
                  setIsPlaying(false);
                }
              },
            },
          });
        }
      }
    };

    if (!window.YT) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://www.youtube.com/iframe_api';
      scriptTag.async = true;
      window.onYouTubeIframeAPIReady = initPlayer;
      document.body.appendChild(scriptTag);
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [loadNextVideo]);

  const currentVideo = videos[activeIndex] || DEFAULT_VIDEOS[0];
  const displayedVideos = showAll ? videos : videos.slice(0, FEATURED_LIMIT);

  return (
    <section
      id="youtube-showcase"
      className="py-16 md:py-24 relative overflow-hidden"
      aria-label="YouTube Video Showcase"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-red-600/10 dark:bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-violet-600/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold mb-4 tracking-wide">
              <FaYoutube className="text-red-600 text-sm" />
              <span>{t('videoShowcase.badge') || 'YOUTUBE SHOWCASE'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              {t('videoShowcase.titlePrefix') || 'Watch Our '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-violet-600">
                {t('videoShowcase.titleHighlight') || 'Latest Videos'}
              </span>
              <br className="hidden sm:inline" />
              {t('videoShowcase.titleSuffix') || ' & Project Demos'}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {t('videoShowcase.subtitle') ||
                'Explore live product demos, tech tutorials, and software architecture walkthroughs on our official YouTube channel.'}
            </p>
          </div>

          {/* Subscribe CTA */}
          <div className="shrink-0 flex items-center gap-3">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <FaYoutube size={17} />
              <span>{t('videoShowcase.subscribeBtn') || 'Subscribe Channel'}</span>
              <FaExternalLinkAlt size={11} className="opacity-80" />
            </a>
          </div>
        </div>

        {/* Video Player & Playlist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Video Viewport (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div
              onMouseMove={handleUserActivity}
              onMouseEnter={handleUserActivity}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleUserActivity}
              className="relative rounded-sm overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-black shadow-2xl shadow-zinc-900/30 group"
            >
              {/* Responsive 16:9 Video Aspect Ratio */}
              <div className="relative w-full aspect-video">
                <div id="youtube-player-iframe" className="w-full h-full" />
              </div>

              {/* Status Bar Below Video Frame */}
              <div className="p-4 sm:p-5 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md border-t border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 shadow-sm">
                    <RiLiveFill size={18} className={isPlaying ? 'animate-pulse' : ''} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/70 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60">
                        {currentVideo.badge} • {t('videoShowcase.nowPlaying') || 'Now Playing'} ({activeIndex + 1}/{videos.length})
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mt-1 truncate" title={currentVideo.title}>
                      {currentVideo.title}
                    </h3>
                  </div>
                </div>

                {/* Desktop: Auto-sequence badge */}
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 font-medium shrink-0 border border-zinc-200 dark:border-zinc-700">
                  <BsStars className="text-amber-500" />
                  <span>{t('videoShowcase.autoPlayInfo') || 'Auto-plays next video in sequence'}</span>
                </div>

                {/* Mobile: Interactive Featured Playlist Toggle Button */}
                <button
                  type="button"
                  onClick={() => setMobilePlaylistOpen((prev) => !prev)}
                  aria-expanded={mobilePlaylistOpen}
                  className="inline-flex sm:hidden items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold shadow-md shadow-red-500/20 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <FaListOl size={12} />
                  <span>
                    {mobilePlaylistOpen
                      ? t('videoShowcase.hidePlaylistBtn') || 'Hide Playlist'
                      : t('videoShowcase.featuredPlaylistBtn') || 'Featured Playlist (4)'}
                  </span>
                  <FaChevronDown
                    size={11}
                    className={`transition-transform duration-300 ease-out ${mobilePlaylistOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Playlist Column (4 Columns on Desktop, Smooth Accordion on Mobile) */}
          <div
            className={`lg:col-span-4 grid transition-all duration-500 ease-in-out ${mobilePlaylistOpen
                ? 'grid-rows-[1fr] opacity-100 mt-2'
                : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none lg:pointer-events-auto'
              } lg:grid-rows-[1fr] lg:opacity-100 lg:mt-0`}
          >
            <div className="overflow-hidden flex flex-col gap-3 min-h-0">
              <div className="flex items-center justify-between px-1 mb-1">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  <FaListOl className="text-violet-600 dark:text-cyan-400" />
                  <span>
                    {showAll
                      ? t('videoShowcase.allVideosTitle', `All Videos (${videos.length})`, {
                        count: videos.length,
                      })
                      : t('videoShowcase.featuredTitle', 'Featured Playlist (4 Videos)')}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <FaCheckCircle size={11} /> Auto Sequence
                </span>
              </div>

              {/* Video Playlist Cards */}
              <div className="flex flex-col gap-3">
                {displayedVideos.map((video, idx) => {
                  const actualIndex = videos.findIndex((v) => v.id === video.id);
                  const isActive = actualIndex === activeIndex;
                  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => handleSelectVideo(actualIndex >= 0 ? actualIndex : idx)}
                      className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 flex gap-3.5 items-center group cursor-pointer ${isActive
                          ? 'bg-red-500/10 dark:bg-red-950/40 border-red-500/60 dark:border-red-600 shadow-md shadow-red-500/10 ring-2 ring-red-500/20'
                          : 'bg-white/80 dark:bg-zinc-900/70 border-zinc-200/80 dark:border-zinc-800 hover:border-red-400 dark:hover:border-red-700 hover:bg-white dark:hover:bg-zinc-900'
                        }`}
                    >
                      {/* Thumbnail with overlay icon */}
                      <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-colors ${isActive ? 'bg-red-600/40' : 'bg-black/30 group-hover:bg-black/10'
                            }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${isActive
                                ? 'bg-red-600 text-white animate-pulse'
                                : 'bg-white/90 text-zinc-900 group-hover:scale-110 transition-transform'
                              }`}
                          >
                            <FaPlay size={10} className="ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {video.badge}
                        </span>
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          {isActive ? (
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                              {t('videoShowcase.nowPlaying') || 'Playing Now'}
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                              {video.duration}
                            </span>
                          )}
                        </div>
                        <h4
                          className={`text-xs sm:text-[13px] font-bold line-clamp-2 leading-snug transition-colors ${isActive
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-zinc-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400'
                            }`}
                          title={video.title}
                        >
                          {video.title}
                        </h4>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                          <span>{video.channel}</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Show All / Show Less Toggle Button when more than 4 videos exist */}
              {videos.length > FEATURED_LIMIT && (
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-red-300 dark:border-red-900/60 hover:border-red-500 dark:hover:border-red-500 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50/60 dark:bg-red-950/30 hover:bg-red-100/70 dark:hover:bg-red-950/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>
                    {showAll
                      ? t('videoShowcase.showLessVideos') || 'Show 4 Featured Only'
                      : t('videoShowcase.showMoreVideos') || `Show All Videos (${videos.length})`}
                  </span>
                  <FaChevronDown
                    className={`transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
                    size={10}
                  />
                </button>
              )}

              {/* Subscribe Box in Sidebar (Desktop Only) */}
              <div className="hidden lg:block p-4 rounded-2xl bg-gradient-to-br from-red-500/10 via-rose-500/5 to-violet-500/10 border border-red-200/60 dark:border-red-900/40 text-center space-y-2 mt-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-white">
                  More Tutorials & Case Studies
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Subscribe for weekly tech & dev insights.
                </p>
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <FaYoutube size={14} />
                  <span>Visit YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
