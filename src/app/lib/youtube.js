/**
 * YouTube Channel Live Feed Integration for MerxoDev Solutions
 * Channel: https://www.youtube.com/@merxodevsolutions
 * Channel ID: UClsrgv4hXyIbB-SVUIOOIzw
 */

export const CHANNEL_ID = 'UClsrgv4hXyIbB-SVUIOOIzw';
export const CHANNEL_URL = 'https://www.youtube.com/@merxodevsolutions';

export const FALLBACK_VIDEOS = [
  {
    id: 'klanKf8ETno',
    title: 'Bangladesh GeoJSON 🔥 সব District, Upazila & Postcode এক প্যাকেজে! | npm Package for Developers',
    badge: 'Video 01',
    duration: 'Latest Release',
    publishedAt: '2026-10-18T05:23:48+00:00',
    channel: 'MerxoDev Solutions',
  },
  {
    id: 'JnX8NPrIFGc',
    title: 'আধুনিক ও প্রফেশনাল ওয়েবসাইট তৈরি করুন | Website Development Services | MERXODEV Solutions',
    badge: 'Video 02',
    duration: 'Full Showcase',
    publishedAt: '2026-08-18T08:59:24+00:00',
    channel: 'MerxoDev Solutions',
  },
  {
    id: '2DZpXXgg0tY',
    title: '🚀 আপনার ব্যবসার জন্য আধুনিক ও প্রফেশনাল ওয়েবসাইট তৈরি করুন!',
    badge: 'Video 03',
    duration: 'Tech Architecture',
    publishedAt: '2026-07-19T02:23:36+00:00',
    channel: 'MerxoDev Solutions',
  },
  {
    id: 'wHlBRzdR_AU',
    title: '🚀 আপনার ব্যবসার জন্য প্রিমিয়াম কাস্টম ওয়েবসাইট!✨ দ্রুত ডেলিভারি • আধুনিক ডিজাইন',
    badge: 'Video 04',
    duration: 'Engineering Demo',
    publishedAt: '2026-07-18T10:42:17+00:00',
    channel: 'MerxoDev Solutions',
  },
  {
    id: 'N-2OwAPp1g8',
    title: 'MerxoDev Solutions 🚀 | Professional Web Development, Software & E-Commerce Services',
    badge: 'Video 05',
    duration: 'Brand Overview',
    publishedAt: '2026-06-21T18:00:33+00:00',
    channel: 'MerxoDev Solutions',
  },
];

/**
 * Fetch latest videos live directly from YouTube's official RSS feed
 * Sorts automatically so the newest video is always at index 0 (Video 01)
 */
export async function getLatestYouTubeVideos() {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/xml,text/xml,*/*',
      },
      next: { revalidate: 60 }, // Revalidate every 60s for near-instant updates
    });

    if (!res.ok) {
      console.warn(`[YouTube Feed] Fetch failed with status ${res.status}. Using fallback videos.`);
      return FALLBACK_VIDEOS;
    }

    const xml = await res.text();
    const entries = xml.split('<entry>');
    entries.shift(); // remove channel header

    if (!entries || entries.length === 0) {
      return FALLBACK_VIDEOS;
    }

    const rawVideos = entries
      .map((entry) => {
        const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
        const rawTitle = entry.match(/<title>(.*?)<\/title>/)?.[1] || '';
        const title = rawTitle
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
        const publishedAt = entry.match(/<published>(.*?)<\/published>/)?.[1] || '';

        return {
          id,
          title,
          publishedAt,
          channel: 'MerxoDev Solutions',
        };
      })
      .filter((v) => Boolean(v.id));

    if (rawVideos.length === 0) {
      return FALLBACK_VIDEOS;
    }

    // Sort strictly by publishedAt descending (newest first)
    rawVideos.sort((a, b) => {
      const timeA = new Date(a.publishedAt).getTime();
      const timeB = new Date(b.publishedAt).getTime();
      return timeB - timeA;
    });

    // Assign sequential serial numbers and badges
    return rawVideos.map((video, idx) => ({
      ...video,
      badge: `Video ${String(idx + 1).padStart(2, '0')}`,
      duration: idx === 0 ? 'Latest Release' : 'Showcase',
    }));
  } catch (err) {
    console.error('[YouTube Feed] Error fetching live videos:', err.message);
    return FALLBACK_VIDEOS;
  }
}
