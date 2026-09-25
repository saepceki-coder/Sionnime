import Link from 'next/link';

export default function EpisodeNavigation({ prevEp, nextEp }) {
  return (
    <div className="flex justify-between items-center gap-4 mt-6">
      {prevEp?.episodeId ? (
        <Link
          href={`/watch/${prevEp.episodeId}`}
          className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white py-3 px-4 rounded-lg text-center font-semibold transition-all"
        >
          ← Episode Sebelumnya
        </Link>
      ) : (
        <div className="flex-1 bg-gray-900 border border-gray-800 text-gray-600 py-3 px-4 rounded-lg text-center font-semibold">
          ← Episode Sebelumnya
        </div>
      )}

      {nextEp?.episodeId ? (
        <Link
          href={`/watch/${nextEp.episodeId}`}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-center font-semibold transition-all"
        >
          Episode Selanjutnya →
        </Link>
      ) : (
        <div className="flex-1 bg-gray-900 border border-gray-800 text-gray-600 py-3 px-4 rounded-lg text-center font-semibold">
          Episode Selanjutnya →
        </div>
      )}
    </div>
  );
}
