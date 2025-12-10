'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploadedAt: string;
}

export default function Watch() {
  const params = useParams();
  const id = params.id as string;
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchVideo();
    }
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await fetch(`/api/videos/${id}`);
      const data = await res.json();
      if (res.ok) {
        setVideo(data.video);
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-4">Video not found</p>
          <Link href="/" className="text-red-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-3xl font-bold text-red-600 cursor-pointer">NETFLYX</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black rounded-lg overflow-hidden mb-6">
            <video
              controls
              autoPlay
              className="w-full aspect-video bg-gray-900"
              poster={video.thumbnailUrl}
            >
              <source src={video.videoUrl} type="video/mp4" />
              <source src={video.videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
            <p className="text-gray-400 mb-4">{video.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center text-red-600 hover:text-red-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Browse
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
