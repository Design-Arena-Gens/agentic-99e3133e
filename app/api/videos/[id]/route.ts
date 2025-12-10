import { NextResponse } from 'next/server';

// In-memory storage (shared with parent route)
const videos = new Map<string, any>();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const video = videos.get(params.id);

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      video,
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}
