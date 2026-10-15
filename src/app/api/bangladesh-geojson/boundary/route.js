import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      'node_modules',
      'bangladesh-geojson',
      'src',
      'data',
      'bangladesh.geojson'
    );

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: 'GeoJSON file not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileStream = fs.createReadStream(filePath);

    return new Response(fileStream, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
