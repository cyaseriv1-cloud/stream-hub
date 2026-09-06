import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { channels, Channel } from '@/data/channels';
import { Radio, Play, Sparkles } from 'lucide-react';

const CATEGORIES = ['Todos', 'Deportes', 'Noticias', 'Cine', 'Series', 'Infantil', 'Música', 'Documental'] as const;

export const LiveChannels: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const filteredChannels = useMemo(() => {
    if (selectedCategory === 'Todos') return channels;
    return channels.filter((ch) => ch.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2a2a] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2.5">
            <Radio className="w-7 h-7 text-[#e50914] animate-pulse" />
            Canales de Televisión en Vivo
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Transmisiones en directo 24/7 sin cortes con guía de programación EPG.
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs font-bold bg-[#181818] border border-[#2a2a2a] text-gray-300 px-3 py-1.5 rounded-full">
          {filteredChannels.length} Canales Disponibles
        </span>
      </div>

      {/* Filtro por Categoría: Chips Seleccionables */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'Todos' ? channels.length : channels.filter((c) => c.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#e50914] text-white shadow-lg shadow-[#e50914]/40 scale-105'
                    : 'bg-[#181818] hover:bg-[#242424] text-gray-300 hover:text-white border border-[#2a2a2a]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-[#0f0f0f] text-gray-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Canales con Hover Glow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredChannels.map((channel: Channel) => (
          <div
            key={channel.id}
            onClick={() => navigate(`/live/${channel.id}`)}
            className="group relative bg-[#181818] hover:bg-[#202020] border border-[#2a2a2a] hover:border-[#e50914] rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#e50914]/20 hover:-translate-y-1"
          >
            <div className="flex items-start gap-3.5">
              {/* Logo / Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/60 shrink-0 border border-[#2a2a2a]">
                <img
                  src={channel.logo_url}
                  alt={channel.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 fill-white text-white" />
                </div>
              </div>

              {/* Channel Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-extrabold uppercase bg-white/10 text-gray-200 px-2 py-0.5 rounded">
                    {channel.category}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-black text-[#e50914] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-ping" />
                    LIVE
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#e50914] transition-colors truncate">
                  {channel.name}
                </h3>

                {/* EPG Preview */}
                <p className="text-xs text-gray-400 truncate mt-1">
                  <span className="text-gray-500 font-medium">Ahora: </span>
                  {channel.epg[0]?.title || 'Transmisión Continua'}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  <span className="text-gray-600">Horario: </span>
                  {channel.epg[0]?.start} - {channel.epg[0]?.end}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
