'use client';

import React from 'react';
import { Search, Tv, Film, Radio, X } from 'lucide-react';
import { CategoryFilter } from '@/types';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryFilter;
  setSelectedCategory: (category: CategoryFilter) => void;
  liveChannelsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  liveChannelsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-borderDark/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Magis TV Style */}
        <div 
          onClick={() => {
            setSelectedCategory('Todos');
            setSearchQuery('');
          }}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand to-rose-600 flex items-center justify-center shadow-lg shadow-brand/30 group-hover:scale-105 transition-transform">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center tracking-wider font-extrabold text-xl leading-none">
              <span className="text-white">STREAM</span>
              <span className="text-brand ml-0.5 text-glow-brand">HUB</span>
            </div>
            <span className="text-[9px] font-semibold text-gray-400 tracking-widest uppercase">
              Live & VOD
            </span>
          </div>
        </div>

        {/* Navigation Quick Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setSelectedCategory('Todos')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              selectedCategory === 'Todos'
                ? 'bg-surface text-white font-semibold border border-borderDark'
                : 'text-gray-400 hover:text-white hover:bg-surface/50'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setSelectedCategory('Películas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              selectedCategory === 'Películas'
                ? 'bg-surface text-white font-semibold border border-borderDark'
                : 'text-gray-400 hover:text-white hover:bg-surface/50'
            }`}
          >
            <Film className="w-4 h-4 text-brand" />
            Películas
          </button>
          <button
            onClick={() => setSelectedCategory('Canales TV')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              selectedCategory === 'Canales TV'
                ? 'bg-surface text-white font-semibold border border-borderDark'
                : 'text-gray-400 hover:text-white hover:bg-surface/50'
            }`}
          >
            <Radio className="w-4 h-4 text-accent-live animate-pulse" />
            En Vivo
            <span className="text-[10px] bg-accent-live/20 text-accent-live px-1.5 py-0.5 rounded-full font-bold">
              {liveChannelsCount}
            </span>
          </button>
        </nav>

        {/* Live Search Bar */}
        <div className="flex-1 max-w-xs sm:max-w-sm relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar película, canal, género..."
              className="w-full bg-surface border border-borderDark text-sm text-gray-100 placeholder-gray-500 rounded-full pl-9 pr-8 py-1.5 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-gray-400 hover:text-white p-0.5 rounded-full"
                title="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
