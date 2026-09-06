import React from 'react';
import { useNavigate } from 'react-router-dom';
import { channels } from '@/data/channels';
import { movies } from '@/data/movies';
import { Radio, Play, Star, ChevronRight, Sparkles, Flame } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Primeros 8 canales para el banner destacado
  const featuredChannels = channels.slice(0, 8);

  // Películas populares (primeras 12)
  const popularMovies = movies.slice(0, 12);

  // Nuevos estrenos (películas de 2024)
  const newReleases = movies.filter((m) => m.year === 2024).slice(0, 12);

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Banner Superior: Scroll Horizontal de Canales en Vivo Destacados */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-ping" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#e50914]" />
              Canales en Directo Destacados
            </h2>
          </div>
          <button
            onClick={() => navigate('/live')}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#e50914] hover:text-red-400 transition-colors"
          >
            Ver todos ({channels.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scroll Horizontal de Canales */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-3">
          {featuredChannels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => navigate(`/live/${channel.id}`)}
              className="flex-shrink-0 w-60 sm:w-64 bg-[#181818] hover:bg-[#242424] border border-[#2a2a2a] hover:border-[#e50914] rounded-2xl p-3.5 cursor-pointer transition-all duration-300 group shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-black/50 border border-[#2a2a2a]">
                  <img
                    src={channel.logo_url}
                    alt={channel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 fill-white text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-[#e50914] text-white px-2 py-0.5 rounded-full mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    EN VIVO
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#e50914] transition-colors truncate">
                    {channel.name}
                  </h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {channel.epg[0]?.title || channel.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Sección "Películas populares" */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#e50914]" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Películas Populares
            </h2>
          </div>
          <button
            onClick={() => navigate('/movies')}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            Explorar catálogo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              className="group relative flex flex-col bg-[#181818] rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#e50914] cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-[#e50914]/20"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#242424]">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#e50914] flex items-center justify-center shadow-lg shadow-[#e50914]/50">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-200 border border-white/10">
                  {movie.year}
                </div>
              </div>

              <div className="p-2.5 flex flex-col justify-between flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#e50914] transition-colors truncate">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                  <span className="truncate">{movie.genre[0]}</span>
                  <span>{movie.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Sección "Nuevos estrenos" */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Nuevos Estrenos (2024)
            </h2>
          </div>
          <button
            onClick={() => navigate('/movies')}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            Ver más
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {newReleases.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              className="group relative flex flex-col bg-[#181818] rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#e50914] cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-[#e50914]/20"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#242424]">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#e50914] flex items-center justify-center shadow-lg shadow-[#e50914]/50">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-2 left-2 bg-[#e50914] text-white px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shadow">
                  ESTRENO
                </div>
              </div>

              <div className="p-2.5 flex flex-col justify-between flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#e50914] transition-colors truncate">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                  <span className="truncate">{movie.genre[0]}</span>
                  <span>{movie.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
