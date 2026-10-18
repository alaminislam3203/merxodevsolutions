import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

const CHANNEL_ID = 'UClsrgv4hXyIbB-SVUIOOIzw';

export async function GET() {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch RSS: ${res.status}`);
    }

    const xml = await res.text();
    const entries = xml.split('<entry>');
    entries.shift(); // remove channel header

    const videos = entries.map((entry, idx) => {
      const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
      const rawTitle = entry.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const title = rawTitle
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      const publishedAt = entry.match(/<published>(.*?)<\/published>/)?.[1] || '';
      const num = String(idx + 1).padStart(2, '0');

      return {
        id,
        title,
        badge: `Video ${num}`,
        duration: idx === 0 ? 'Latest Release' : 'Showcase',
        publishedAt,
        channel: 'MerxoDev Solutions',
      };
    }).filter(v => Boolean(v.id));

    return NextResponse.json({
      success: true,
      channelId: CHANNEL_ID,
      count: videos.length,
      videos,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
