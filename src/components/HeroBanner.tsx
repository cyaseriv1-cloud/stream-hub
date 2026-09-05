'use client';

import React, { useState, useEffect } from 'react';
import { Play, Info, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { MediaItem } from '@/types';

interface HeroBannerProps {
  items: MediaItem[];
  onPlayMedia: (item: MediaItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ items, onPlayMedia }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotación cada 6 segundos si no hay interacción del mouse
  useEffect(() => {
    if (items.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] overflow-hidden rounded-2xl border border-borderDark/40 group shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop Image */}
          <div
            className="w-full h-full bg-cover bg-center transform scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url(${item.backdropUrl})` }}
          />

          {/* Gradients para contraste perfecto estilo cine */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full flex flex-col justify-end max-w-2xl px-6 sm:px-12 pb-12 sm:pb-16 pointer-events-auto">
        {/* Badges de destaque */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-brand text-white px-2.5 py-1 rounded-md shadow-md shadow-brand/40">
            <Sparkles className="w-3.5 h-3.5" />
            Destacado de la Semana
          </span>
          <span className="text-xs font-semibold bg-surface/90 border border-borderDark text-accent-blue px-2.5 py-1 rounded-md">
            {currentItem.resolution}
          </span>
          <span className="text-xs font-semibold bg-surface/80 border border-borderDark text-gray-300 px-2.5 py-1 rounded-md">
            {currentItem.category}
          </span>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-black/50 px-2 py-1 rounded-md border border-amber-400/20">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {currentItem.rating.toFixed(1)}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md leading-tight mb-3">
          {currentItem.title}
        </h1>

        {/* Metadata info */}
        <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-medium mb-3">
          <span>{currentItem.year}</span>
          <span>•</span>
          <span>{currentItem.duration}</span>
          <span>•</span>
          <span>{currentItem.genre.join(', ')}</span>
        </div>

        {/* Synopsis */}
        <p className="text-gray-300 text-sm sm:text-base line-clamp-3 mb-6 font-normal drop-shadow">
          {currentItem.synopsis}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onPlayMedia(currentItem)}
            className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-brand/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-white" />
            Reproducir Ahora
          </button>
          <button
            onClick={() => onPlayMedia(currentItem)}
            className="flex items-center gap-2 bg-surface/90 hover:bg-surface text-gray-200 border border-borderDark font-semibold px-4 py-3 rounded-xl hover:text-white transition-all backdrop-blur-sm"
          >
            <Info className="w-4 h-4" />
            Ficha Técnica
          </button>
        </div>
      </div>

      {/* Manual Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-brand text-white/70 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-brand text-white/70 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-5 right-8 z-20 flex items-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-brand shadow-md shadow-brand' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Ir a slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
