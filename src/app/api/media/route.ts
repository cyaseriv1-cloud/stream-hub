import { NextRequest, NextResponse } from 'next/server';
import { ALL_MEDIA_ITEMS, MOCK_MOVIES, MOCK_CHANNELS } from '@data/mockData';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = (searchParams.get('q') || '').toLowerCase().trim();
  const category = searchParams.get('category') || 'Todos';
  const type = searchParams.get('type'); // 'movie' | 'channel'

  let filtered = ALL_MEDIA_ITEMS;

  // Filtrado por tipo si aplica
  if (type === 'movie') {
    filtered = MOCK_MOVIES;
  } else if (type === 'channel') {
    filtered = MOCK_CHANNELS;
  }

  // Filtrado por categoría
  if (category === 'Películas') {
    filtered = filtered.filter((item) => item.type === 'movie');
  } else if (category === 'Canales TV') {
    filtered = filtered.filter((item) => item.type === 'channel');
  } else if (category !== 'Todos') {
    filtered = filtered.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }

  // Búsqueda por texto (título, categoría, sinopsis, géneros)
  if (query) {
    filtered = filtered.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchCategory = item.category.toLowerCase().includes(query);
      const matchSynopsis = item.synopsis.toLowerCase().includes(query);
      const matchGenre = item.genre.some((g) => g.toLowerCase().includes(query));
      const matchProgram = item.liveProgram?.toLowerCase().includes(query);

      return matchTitle || matchCategory || matchSynopsis || matchGenre || matchProgram;
    });
  }

  return NextResponse.json({
    total: filtered.length,
    data: filtered,
  });
}
