export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 55;

export async function GET(request, { params }) {
  const { serverId } = params;
  
  try {
    const res = await fetch(`https://sankavollerei.web.id/anime/server/${serverId}`, {
      cache: 'no-store'
    });
    const data = await res.json();
    return Response.json(data.data);
  } catch (error) {
    return Response.json({ error: 'Server tidak tersedia' }, { status: 500 });
  }
}
