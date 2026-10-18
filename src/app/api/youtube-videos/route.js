import { NextResponse } from 'next/server';
import { getLatestYouTubeVideos } from '@/app/lib/youtube';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const videos = await getLatestYouTubeVideos();

  return NextResponse.json(
    {
      success: true,
      count: videos.length,
      videos,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  );
}
