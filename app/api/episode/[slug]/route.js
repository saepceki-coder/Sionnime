export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 55;

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const epRes = await fetch(`https://sankavollerei.web.id/anime/episode/${slug}`, {
      cache: 'no-store'
    });
    const epData = await epRes.json();

    if (!epData.ok) {
      return Response.json({ error: 'Episode tidak ditemukan' }, { status: 404 });
    }

    return Response.json(epData.data);
  } catch (error) {
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
