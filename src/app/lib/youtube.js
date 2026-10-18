/**
 * YouTube Channel Live Feed Integration for MerxoDev Solutions
 * Channel: https://www.youtube.com/@merxodevsolutions
 * Channel ID: UClsrgv4hXyIbB-SVUIOOIzw
 */

export const CHANNEL_ID = 'UClsrgv4hXyIbB-SVUIOOIzw';
export const CHANNEL_URL = 'https://www.youtube.com/@merxodevsolutions';

// Verified Long-form Videos only (Strictly NO YouTube Shorts)
export const FALLBACK_VIDEOS = [
  {
    id: 'i7y-W-3dgOs',
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
];

/**
 * Fetch latest LONG-FORM videos live directly from YouTube channel's /videos tab
 * (YouTube's /videos tab guarantees ONLY long videos are returned, excluding all Shorts)
 */
export async function getLatestYouTubeVideos() {
  try {
    const res = await fetch(`https://www.youtube.com/@merxodevsolutions/videos`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,bn;q=0.8',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[YouTube Videos Tab] Fetch failed with status ${res.status}. Using fallback.`);
      return FALLBACK_VIDEOS;
    }

    const html = await res.text();
    const jsonMatch = html.match(/var ytInitialData = ({.*?});<\/script>/);

    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[1]);
        const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
        const videoList = [];

        for (const t of tabs) {
          const grid = t.tabRenderer?.content?.richGridRenderer;
          if (grid && Array.isArray(grid.contents)) {
            for (const item of grid.contents) {
              const lockup = item.richItemRenderer?.content?.lockupViewModel;
              const videoRenderer = item.richItemRenderer?.content?.videoRenderer;

              if (lockup && lockup.contentId) {
                const id = lockup.contentId;
                const title =
                  lockup.metadata?.lockupMetadataViewModel?.title?.content || '';
                videoList.push({
                  id,
                  title,
                  channel: 'MerxoDev Solutions',
                });
              } else if (videoRenderer && videoRenderer.videoId) {
                const id = videoRenderer.videoId;
                const title = videoRenderer.title?.runs?.[0]?.text || '';
                videoList.push({
                  id,
                  title,
                  channel: 'MerxoDev Solutions',
                });
              }
            }
          }
        }

        if (videoList.length > 0) {
          return videoList.map((v, idx) => ({
            ...v,
            badge: `Video ${String(idx + 1).padStart(2, '0')}`,
            duration: idx === 0 ? 'Latest Release' : 'Showcase',
          }));
        }
      } catch (parseErr) {
        console.warn('[YouTube Videos Tab] JSON parse error:', parseErr.message);
      }
    }

    return FALLBACK_VIDEOS;
  } catch (err) {
    console.error('[YouTube Videos Tab] Error:', err.message);
    return FALLBACK_VIDEOS;
  }
}
