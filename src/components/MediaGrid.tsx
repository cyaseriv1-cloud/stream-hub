'use client';

import React from 'react';
import { MediaItem } from '@/types';
import { MediaCard } from './MediaCard';
import { Film, RefreshCw } from 'lucide-react';

interface MediaGridProps {
  items: MediaItem[];
  title?: string;
  onSelectMedia: (item: MediaItem) => void;
  onResetFilters?: () => void;
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  title = 'Catálogo Disponible',
  onSelectMedia,
  onResetFilters,
}) => {
  if (items.length === 0) {
    return (
      <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-surface/40 rounded-2xl border border-borderDark/40 my-8">
        <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-gray-500 mb-4 border border-borderDark">
          <Film className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
          No se encontraron contenidos
        </h3>
        <p className="text-sm text-gray-400 max-w-md mb-6">
          No hay resultados que coincidan con los filtros o la búsqueda ingresada. Intenta con otros términos o categorías.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-brand/20"
          >
            <RefreshCw className="w-4 h-4" />
            Restablecer Filtros
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full my-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
          {title}
        </h2>
        <span className="text-xs font-semibold bg-surface border border-borderDark text-gray-300 px-2.5 py-1 rounded-full">
          {items.length} {items.length === 1 ? 'título' : 'títulos'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} onSelect={onSelectMedia} />
        ))}
      </div>
    </div>
  );
};
