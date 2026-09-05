'use client';

import React from 'react';
import { Play, Star, Radio, Users } from 'lucide-react';
import { MediaItem } from '@/types';

interface MediaCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onSelect }) => {
  const isChannel = item.type === 'channel';

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative flex flex-col bg-surface rounded-xl overflow-hidden border border-borderDark/60 hover:border-brand/70 hover:shadow-xl hover:shadow-brand/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Aspect ratio vertical estilo póster cine / TV */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-surfaceHover">
        <img
          src={item.posterUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradiente superior para visibilidad de badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/60 opacity-80" />

        {/* Badges superiores */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none">
          {isChannel ? (
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-accent-live text-white px-2 py-0.5 rounded shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              EN VIVO
            </span>
          ) : (
            <span className="text-[10px] font-bold bg-black/60 backdrop-blur-md text-gray-200 border border-white/10 px-1.5 py-0.5 rounded">
              {item.year}
            </span>
          )}

          <span className="text-[10px] font-extrabold bg-surface/90 text-accent-blue border border-borderDark px-1.5 py-0.5 rounded">
            {item.resolution.includes('4K') ? '4K' : 'HD'}
          </span>
        </div>

        {/* Hover Overlay Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/40 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/50 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Rating flotante en la esquina inferior del póster */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-amber-400 text-xs font-bold bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded">
          <Star className="w-3 h-3 fill-amber-400" />
          <span>{item.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              {item.category}
            </span>
          </div>

          <h3 className="text-sm font-bold text-white group-hover:text-brand transition-colors line-clamp-1">
            {item.title}
          </h3>

          {/* Si es canal, mostramos el programa actual */}
          {isChannel && item.liveProgram && (
            <p className="text-[11px] text-accent-blue font-medium mt-1 line-clamp-1 flex items-center gap-1">
              <Radio className="w-3 h-3 text-accent-live shrink-0" />
              {item.liveProgram}
            </p>
          )}

          {!isChannel && (
            <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
              {item.genre.join(', ')}
            </p>
          )}
        </div>

        {/* Footer info (duración o espectadores en vivo) */}
        <div className="mt-2 pt-2 border-t border-borderDark/50 flex items-center justify-between text-[11px] text-gray-400">
          {isChannel && item.currentViewers ? (
            <span className="flex items-center gap-1 text-gray-300 font-medium">
              <Users className="w-3 h-3 text-accent-blue" />
              {(item.currentViewers / 1000).toFixed(1)}k viendo
            </span>
          ) : (
            <span>{item.duration}</span>
          )}
          <span className="text-gray-500 font-medium">
            {isChannel ? 'Canal 24/7' : 'Película'}
          </span>
        </div>
      </div>
    </div>
  );
};
