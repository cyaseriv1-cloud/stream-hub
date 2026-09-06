import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { movies, Movie } from '@/data/movies';
import { Film, Play, Filter, RefreshCw } from 'lucide-react';

const GENRES = ['Todos', 'Acción', 'Ciencia Ficción', 'Comedia', 'Drama', 'Terror', 'Animación'] as const;
const YEARS = ['Todos', '2024', '2023', '2022'] as const;

export const MoviesGrid: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [selectedYear, setSelectedYear] = useState<string>('Todos');

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchGenre = selectedGenre === 'Todos' || movie.genre.includes(selectedGenre);
      const matchYear = selectedYear === 'Todos' || movie.year.toString() === selectedYear;
      return matchGenre && matchYear;
    });
  }, [selectedGenre, selectedYear]);

  const handleResetFilters = () => {
    setSelectedGenre('Todos');
    setSelectedYear('Todos');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2a2a] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2.5">
            <Film className="w-7 h-7 text-[#e50914]" />
            Catálogo de Películas VOD
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Explora más de 60 películas bajo demanda en calidad HD y 4K.
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs font-bold bg-[#181818] border border-[#2a2a2a] text-gray-300 px-3 py-1.5 rounded-full">
          {filteredMovies.length} Películas Encontradas
        </span>
      </div>

      {/* Filtros Superiores: Dropdowns por Género y Año */}
      <div className="bg-[#181818] border border-[#2a2a2a] p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Dropdown Género */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Género:
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[#242424] border border-[#2a2a2a] text-white text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#e50914] cursor-pointer"
            >
              {GENRES.map((g) => (
                <option key={g} value={g} className="bg-[#181818]">
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Año */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Año:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-[#242424] border border-[#2a2a2a] text-white text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#e50914] cursor-pointer"
            >
              {YEARS.map((y) => (
                <option key={y} value={y} className="bg-[#181818]">
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(selectedGenre !== 'Todos' || selectedYear !== 'Todos') && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs text-[#e50914] hover:text-red-400 font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Limpiar Filtros
          </button>
        )}
      </div>

      {/* Grid de Películas */}
      {filteredMovies.length === 0 ? (
        <div className="py-16 text-center bg-[#181818] rounded-2xl border border-[#2a2a2a] p-6">
          <Film className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Sin resultados</h3>
          <p className="text-sm text-gray-400 mb-4">
            No encontramos películas con los filtros seleccionados.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-[#e50914] hover:bg-[#f40612] text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Ver Todas las Películas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredMovies.map((movie: Movie) => (
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

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#e50914] flex items-center justify-center shadow-lg shadow-[#e50914]/50">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-200 border border-white/10">
                  {movie.year}
                </div>
              </div>

              <div className="p-2.5 flex flex-col justify-between flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[10px] font-extrabold uppercase bg-white/10 text-gray-300 px-1.5 py-0.2 rounded">
                    {movie.genre[0]}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#e50914] transition-colors truncate">
                  {movie.title}
                </h3>
                <div className="text-[11px] text-gray-400 mt-1">
                  {movie.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
