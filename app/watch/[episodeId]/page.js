'use client';
import { useEffect, useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import ServerSelector from '@/components/ServerSelector';
import EpisodeNavigation from '@/components/EpisodeNavigation';
import Link from 'next/link';

export default function WatchPage({ params }) {
  const { episodeId } = params;
  const [episodeData, setEpisodeData] = useState(null);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEpisode() {
      setLoading(true);
      setEmbedUrl(null);
      try {
        const res = await fetch(`/api/episode/${episodeId}`);
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);
        setEpisodeData(data);

        const qualities = data.server?.kualitas || [];
        const bestQuality = [...qualities].reverse().find(q => q.serverList.length > 0);
        
        if (bestQuality?.serverList[0]) {
          await loadServer(bestQuality.serverList[0].serverId);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEpisode();
  }, [episodeId]);

  const loadServer = async (serverId) => {
    try {
      const res = await fetch(`/api/server/${serverId}`);
      const data = await res.json();
      setEmbedUrl(data.url);
    } catch (err) {
      console.error('Gagal load server:', err);
      setEmbedUrl(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Memuat episode...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-lg">❌ {error}</p>
        <Link href="/" className="text-blue-400 underline">Kembali ke Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 line-clamp-2">
        {episodeData?.judul || 'Memuat...'}
      </h1>

      <VideoPlayer embedUrl={embedUrl} />

      <EpisodeNavigation
        prevEp={episodeData?.['Episode sebelumnya']}
        nextEp={episodeData?.['Episode Berikutnya']}
      />

      {episodeData?.server?.kualitas && (
        <ServerSelector
          servers={episodeData.server.kualitas}
          onServerChange={loadServer}
        />
      )}

      {episodeData?.info?.['Daftar episode'] && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-700 pb-2">Semua Episode</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {episodeData.info['Daftar episode'].map((ep) => (
              <Link
                key={ep.episodeId}
                href={`/watch/${ep.episodeId}`}
                className={`p-2 text-center rounded text-sm font-semibold transition-all ${
                  ep.episodeId === episodeId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Ep {ep.eps}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
