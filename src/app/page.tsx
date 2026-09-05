'use client';

import React, { useState, useMemo } from 'react';
import { ALL_MEDIA_ITEMS, MOCK_MOVIES, MOCK_CHANNELS } from '@data/mockData';
import { CategoryFilter as CategoryFilterType, MediaItem } from '@/types';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { LiveChannelBar } from '@/components/LiveChannelBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { MediaGrid } from '@/components/MediaGrid';
import { VideoPlayerModal } from '@/components/VideoPlayerModal';
import { ShieldCheck, Tv, Film, Sparkles, Smartphone } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  // 3 Slides destacados para el Hero Banner
  const featuredMovies = useMemo(() => {
    return MOCK_MOVIES.filter((m) => m.isFeatured).slice(0, 3);
  }, []);

  // Canales en directo para la barra rápida de canales
  const liveChannels = useMemo(() => {
    return MOCK_CHANNELS;
  }, []);

  // Cálculo de conteos por categoría para las píldoras
  const itemsCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Todos: ALL_MEDIA_ITEMS.length,
      Películas: MOCK_MOVIES.length,
      'Canales TV': MOCK_CHANNELS.length,
    };

    ALL_MEDIA_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return counts;
  }, []);

  // Filtrado de contenido según categoría y texto de búsqueda
  const filteredItems = useMemo(() => {
    return ALL_MEDIA_ITEMS.filter((item) => {
      // 1. Filtro por categoría
      let matchesCategory = true;
      if (selectedCategory === 'Películas') {
        matchesCategory = item.type === 'movie';
      } else if (selectedCategory === 'Canales TV') {
        matchesCategory = item.type === 'channel';
      } else if (selectedCategory !== 'Todos') {
        matchesCategory = item.category.toLowerCase() === selectedCategory.toLowerCase();
      }

      // 2. Filtro por búsqueda
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = item.title.toLowerCase().includes(query);
        const inCategory = item.category.toLowerCase().includes(query);
        const inGenre = item.genre.some((g) => g.toLowerCase().includes(query));
        const inSynopsis = item.synopsis.toLowerCase().includes(query);
        const inProgram = item.liveProgram?.toLowerCase().includes(query) ?? false;

        matchesSearch = inTitle || inCategory || inGenre || inSynopsis || inProgram;
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Título dinámico para la cuadrícula
  const gridTitle = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return `Resultados para "${searchQuery}"`;
    }
    if (selectedCategory === 'Todos') {
      return 'Explorar Todo el Catálogo';
    }
    if (selectedCategory === 'Películas') {
      return 'Películas Destacadas y Estrenos';
    }
    if (selectedCategory === 'Canales TV') {
      return 'Guía de Canales de Televisión';
    }
    return `Categoría: ${selectedCategory}`;
  }, [selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('Todos');
    setSearchQuery('');
  };

  const isBrowsingAll = selectedCategory === 'Todos' && searchQuery.trim() === '';

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-brand selection:text-white">
      {/* Navbar con buscador y navegación */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        liveChannelsCount={MOCK_CHANNELS.length}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Si estamos en la vista principal sin filtros activos, mostramos el Hero rotativo y la barra de canales */}
        {isBrowsingAll && (
          <>
            {/* 1. Hero Banner Rotativo (3 slides con autoplay y botón reproducir) */}
            <section aria-label="Contenido Destacado">
              <HeroBanner
                items={featuredMovies}
                onPlayMedia={(item) => setActiveMedia(item)}
              />
            </section>

            {/* 2. Barra de Canales en Vivo Destacados (Magis TV Live Bar) */}
            <section aria-label="Canales en Vivo">
              <LiveChannelBar
                channels={liveChannels}
                onSelectChannel={(ch) => setActiveMedia(ch)}
              />
            </section>
          </>
        )}

        {/* 3. Selector de Categorías Filtrables */}
        <section aria-label="Filtro de Categorías" className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand" />
              Filtrar por Género o Tipo
            </h3>
            {searchQuery && (
              <span className="text-xs text-brand font-semibold">
                Filtro de búsqueda activo
              </span>
            )}
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            itemsCounts={itemsCounts}
          />
        </section>

        {/* 4. Grid Responsive de Películas y Canales */}
        <section aria-label="Catálogo">
          <MediaGrid
            items={filteredItems}
            title={gridTitle}
            onSelectMedia={(item) => setActiveMedia(item)}
            onResetFilters={handleResetFilters}
          />
        </section>
      </main>

      {/* 5. Reproductor Modal HLS */}
      <VideoPlayerModal
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />

      {/* Footer Estilo Streaming */}
      <footer className="w-full border-t border-borderDark/60 bg-surface/60 backdrop-blur-sm mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand flex items-center justify-center text-white font-black text-[11px]">
              S
            </div>
            <span className="font-bold text-white tracking-wide">STREAMHUB</span>
            <span>• Plataforma de Streaming VOD & Live TV</span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <Tv className="w-3.5 h-3.5 text-accent-blue" />
              Smart TV Ready
            </span>
            <span className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-brand" />
              Android APK Ready
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              HLS 1080p/4K
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
