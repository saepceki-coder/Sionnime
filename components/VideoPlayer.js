'use client';

export default function VideoPlayer({ embedUrl }) {
  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg">
        <p className="text-gray-400 animate-pulse">Memuat video...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        referrerPolicy="no-referrer"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-presentation allow-forms"
        title="Anime Player"
      />
    </div>
  );
}
