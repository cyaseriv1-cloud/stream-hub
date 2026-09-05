export type MediaType = 'movie' | 'channel';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  category: string;
  genre: string[];
  rating: number; // e.g. 4.8
  year?: number;
  duration?: string; // e.g. "2h 15m" o "En vivo 24/7"
  resolution: '4K Ultra HD' | '1080p FHD' | '720p HD';
  posterUrl: string;
  backdropUrl: string;
  synopsis: string;
  streamUrl: string;
  isLive?: boolean;
  liveProgram?: string; // Programa actual para canales
  nextProgram?: string; // Siguiente programa
  currentViewers?: number;
  isFeatured?: boolean;
}

export type CategoryFilter = 
  | 'Todos'
  | 'Películas'
  | 'Canales TV'
  | 'Acción'
  | 'Ciencia Ficción'
  | 'Comedia'
  | 'Deportes'
  | 'Noticias'
  | 'Documentales'
  | 'Infantil';
