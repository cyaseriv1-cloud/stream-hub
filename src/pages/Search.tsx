import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { channels, Channel } from '@/data/channels';
import { movies, Movie } from '@/data/movies';
import { Search as SearchIcon, Radio, Film, Play, X } from 'lucide-react';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce de 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filtrado de canales
  const filteredChannels = useMemo(() => {
    if (!debouncedQuery) return [];
    const q = debouncedQuery.toLowerCase();
    return channels.filter(
      (ch) =>
        ch.name.toLowerCase().includes(q) ||
        ch.category.toLowerCase().includes(q) ||
        ch.epg.some((p) => p.title.toLowerCase().includes(q))
    );
  }, [debouncedQuery]);

  // Filtrado de películas
  const filteredMovies = useMemo(() => {
    if (!debouncedQuery) return [];
    const q = debouncedQuery.toLowerCase();
    return movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q)) ||
        m.description.toLowerCase().includes(q) ||
        m.year.toString().includes(q)
    );
  }, [debouncedQuery]);

  const hasSearched = debouncedQuery.length > 0;
  const noResults = hasSearched && filteredChannels.length === 0 && filteredMovies.length === 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Input de Búsqueda Grande */}
      <div className="text-center space-y-3 pt-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
          Buscador Global Lumina TV
        </h1>
        <p className="text-sm text-gray-400">
          Encuentra canales de televisión, transmisiones en vivo, películas y series al instante.
        </p>

        <div className="max-w-2xl mx-auto relative pt-2">
          <div className="relative flex items-center">
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título, canal, género (ej. Fútbol, Acción, 2024)..."
              className="w-full bg-[#181818] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-2xl pl-12 pr-10 py-3.5 text-base sm:text-lg focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] shadow-xl transition-all"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Estado cuando no hay búsqueda aún */}
      {!hasSearched && (
        <div className="py-12 text-center text-gray-500 text-sm">
          Escribe algo en el buscador para ver canales y películas en tiempo real.
        </div>
      )}

      {/* Sin Resultados */}
      {noResults && (
        <div className="py-16 text-center bg-[#181818] rounded-2xl border border-[#2a2a2a] p-6">
          <SearchIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">
            No se encontraron resultados para "{debouncedQuery}"
          </h3>
          <p className="text-sm text-gray-400">
            Verifica la ortografía o intenta buscar con términos más generales como "Noticias", "Cine" o "Acción".
          </p>
        </div>
      )}

      {/* Sección 1: Resultados de Canales en Vivo */}
      {filteredChannels.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2a2a2a] pb-3">
            <Radio className="w-5 h-5 text-[#e50914]" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Canales en Vivo ({filteredChannels.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredChannels.map((channel: Channel) => (
              <div
                key={channel.id}
                onClick={() => navigate(`/live/${channel.id}`)}
                className="bg-[#181818] hover:bg-[#222222] border border-[#2a2a2a] hover:border-[#e50914] rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all group"
              >
                <img
                  src={channel.logo_url}
                  alt={channel.name}
                  className="w-12 h-12 rounded-lg object-cover bg-black shrink-0 border border-[#2a2a2a]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-1.5 py-0.2 rounded">
                      {channel.category}
                    </span>
                    <span className="text-[9px] font-black text-[#e50914]">LIVE</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#e50914] truncate">
                    {channel.name}
                  </h4>
                  <p className="text-xs text-gray-400 truncate">
                    {channel.epg[0]?.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sección 2: Resultados de Películas */}
      {filteredMovies.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2a2a2a] pb-3">
            <Film className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Películas ({filteredMovies.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredMovies.map((movie: Movie) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/movies/${movie.id}`)}
                className="group relative flex flex-col bg-[#181818] rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#e50914] cursor-pointer transition-all duration-300 hover:scale-[1.05]"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#242424]">
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-8 h-8 fill-white text-white" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-200">
                    {movie.year}
                  </div>
                </div>

                <div className="p-2.5 flex flex-col justify-between flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#e50914] truncate">
                    {movie.title}
                  </h4>
                  <div className="text-[11px] text-gray-400 mt-1">
                    {movie.genre[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
