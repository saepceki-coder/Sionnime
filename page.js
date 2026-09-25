import AnimeCard from '@/components/AnimeCard';

async function getHomeData() {
  try {
    const res = await fetch('https://sankavollerei.web.id/anime/home', {
      next: { revalidate: 300 },
    });
    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

export default async function HomePage() {
  const data = await getHomeData();
  
  const ongoing = data?.ongoing?.animeList || [];
  const completed = data?.completed?.animeList || [];

  return (
    <main className="max-w-6xl mx-auto p-4">
      {ongoing.length > 0 && (
        <div className="relative rounded-xl overflow-hidden mb-8 h-[300px]">
          <img 
            src={ongoing[0].poster} 
            alt={ongoing[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-6">
            <div>
              <span className="bg-blue-600 text-xs px-2 py-1 rounded font-bold">#1 TRENDING</span>
              <h1 className="text-2xl font-bold mt-2">{ongoing[0].title}</h1>
              <p className="text-gray-300 text-sm mt-1">Episode {ongoing[0].episodes} • {ongoing[0].latestReleaseDate}</p>
              <a 
                href={`/anime/${ongoing[0].animeId}`}
                className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold text-sm"
              >
                Lihat Detail →
              </a>
            </div>
          </div>
        </div>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
          🔥 Sedang Tayang
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {ongoing.map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 border-l-4 border-green-500 pl-3">
          ✅ Anime Tamat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {completed.map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} />
          ))}
        </div>
      </section>
    </main>
  );
              }
