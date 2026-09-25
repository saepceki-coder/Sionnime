async function getHomeData() {
  try {
    // Panggil API route internal, bukan langsung ke sankavollerei
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sionnime.vercel.app';
    const res = await fetch(`${baseUrl}/api/home`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}
