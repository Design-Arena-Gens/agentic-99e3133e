import { NextResponse } from 'next/server';

// In-memory storage (for demo)
const videos = new Map<string, any>();

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string || '';
    const videoFile = formData.get('video') as File;
    const thumbnailFile = formData.get('thumbnail') as File | null;

    if (!title || !videoFile) {
      return NextResponse.json(
        { error: 'Title and video file are required' },
        { status: 400 }
      );
    }

    // Convert files to base64 for in-memory storage
    const videoBuffer = await videoFile.arrayBuffer();
    const videoBase64 = Buffer.from(videoBuffer).toString('base64');
    const videoUrl = `data:${videoFile.type};base64,${videoBase64}`;

    let thumbnailUrl = '';
    if (thumbnailFile) {
      const thumbnailBuffer = await thumbnailFile.arrayBuffer();
      const thumbnailBase64 = Buffer.from(thumbnailBuffer).toString('base64');
      thumbnailUrl = `data:${thumbnailFile.type};base64,${thumbnailBase64}`;
    }

    const id = generateId();
    const video = {
      id,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      uploadedAt: new Date().toISOString(),
    };

    videos.set(id, video);

    return NextResponse.json({
      success: true,
      video,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}
