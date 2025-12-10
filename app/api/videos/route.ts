import { NextResponse } from 'next/server';

// In-memory storage (for demo - in production use Cloudflare D1)
const videos = new Map<string, any>();

export async function GET() {
  try {
    const videoList = Array.from(videos.values()).sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json({
      videos: videoList,
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// Store video in global map (simulating database)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    videos.set(data.id, data);

    return NextResponse.json({
      success: true,
      video: data,
    });
  } catch (error) {
    console.error('Error storing video:', error);
    return NextResponse.json(
      { error: 'Failed to store video' },
      { status: 500 }
    );
  }
}
