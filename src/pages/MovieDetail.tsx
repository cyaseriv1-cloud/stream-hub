import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { movies } from '@/data/movies';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ChevronLeft, Heart, Clock, Calendar, Film, Check, AlertCircle } from 'lucide-react';

export const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === id);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    try {
      const stored = localStorage.getItem('magistv_favorites');
      const favs: string[] = stored ? JSON.parse(stored) : [];
      setIsFavorite(favs.includes(id));
    } catch {
      // Ignore
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;
    try {
      const stored = localStorage.getItem('magistv_favorites');
      let favs: string[] = stored ? JSON.parse(stored) : [];
      if (favs.includes(id)) {
        favs = favs.filter((item) => item !== id);
        setIsFavorite(false);
      } else {
        favs.push(id);
        setIsFavorite(true);
      }
      localStorage.setItem('magistv_favorites', JSON.stringify(favs));
    } catch {
      setIsFavorite(!isFavorite);
    }
  };

  if (!movie) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-[#181818] border border-[#2a2a2a] flex items-center justify-center mb-4 text-[#e50914]">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Película no encontrada</h2>
        <p className="text-sm text-gray-400 mb-6 max-w-sm">
          No pudimos encontrar la película seleccionada en el catálogo actual.
        </p>
        <Link
          to="/movies"
          className="bg-[#e50914] hover:bg-[#f40612] text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-[#e50914]/30 transition-all"
        >
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Botón Volver */}
      <button
        onClick={() => navigate('/movies')}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver a Películas
      </button>

      {/* Zona de Reproducción Principal */}
      <div className="space-y-4">
        <VideoPlayer source={movie.video_url} title={movie.title} />
      </div>

      {/* Ficha Técnica y Metadatos */}
      <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8">
        {/* Poster Grande */}
        <div className="w-40 sm:w-52 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-[#2a2a2a] shrink-0 mx-auto md:mx-0">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información Detallada */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Badges de género */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="text-xs font-bold bg-[#242424] text-gray-300 border border-[#2a2a2a] px-2.5 py-0.5 rounded-md"
                >
                  {g}
                </span>
              ))}
              <span className="text-xs font-bold bg-[#e50914]/20 text-[#e50914] border border-[#e50914]/40 px-2.5 py-0.5 rounded-md">
                HD 1080p
              </span>
            </div>

            {/* Título */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {movie.title}
            </h1>

            {/* Metadatos (Año, Duración) */}
            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                {movie.year}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                {movie.duration}
              </span>
            </div>

            {/* Sinopsis */}
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Sinopsis
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {movie.description}
              </p>
            </div>
          </div>

          {/* Botón Favoritos */}
          <div className="pt-4 border-t border-[#2a2a2a]">
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md ${
                isFavorite
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                  : 'bg-[#242424] hover:bg-[#2e2e2e] text-white border border-[#2a2a2a] hover:border-red-500'
              }`}
            >
              {isFavorite ? (
                <>
                  <Check className="w-4 h-4" />
                  Guardado en Favoritos
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 text-[#e50914]" />
                  Agregar a Favoritos
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
