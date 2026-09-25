import Link from 'next/link';

export default function AnimeCard({ anime }) {
  const title = anime.title || anime.judul || 'Tanpa Judul';
  const poster = anime.poster;
  const animeId = anime.animeId;
  const episodes = anime.episodes || anime.episode || '?';
  const score = anime.score || anime.skor || null;

  return (
    <Link 
      href={`/anime/${animeId}`}
      className="group bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
    >
      <div className="relative">
        <img 
          src={poster} 
          alt={title}
          className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {score && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
            ★ {score}
          </span>
        )}
        <span className="absolute bottom-2 left-2 bg-blue-600 text-xs font-bold px-2 py-1 rounded">
          Ep {episodes}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-400">
          {title}
        </h3>
      </div>
    </Link>
  );
}
