'use client';

import React from 'react';
import { Radio, Users, ChevronRight, Play } from 'lucide-react';
import { MediaItem } from '@/types';

interface LiveChannelBarProps {
  channels: MediaItem[];
  onSelectChannel: (channel: MediaItem) => void;
}

export const LiveChannelBar: React.FC<LiveChannelBarProps> = ({
  channels,
  onSelectChannel,
}) => {
  if (!channels || channels.length === 0) return null;

  return (
    <div className="w-full my-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-live animate-ping" />
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
            Canales en Directo Destacados
          </h2>
        </div>
        <span className="text-xs text-gray-400 font-medium hidden sm:inline">
          Desliza para ver más canales
        </span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {channels.map((channel, index) => (
          <div
            key={channel.id}
            onClick={() => onSelectChannel(channel)}
            className="flex-shrink-0 w-64 sm:w-72 bg-surface hover:bg-surfaceHover border border-borderDark/70 hover:border-brand/80 rounded-xl p-3 cursor-pointer transition-all duration-200 group relative"
          >
            <div className="flex items-center gap-3">
              {/* Miniatura / Logo del canal */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black/40 border border-borderDark">
                <img
                  src={channel.posterUrl}
                  alt={channel.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-5 h-5 fill-white text-white" />
                </div>
              </div>

              {/* Info del canal */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-black text-accent-live flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    CH {index + 1}
                  </span>
                  {channel.currentViewers && (
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Users className="w-2.5 h-2.5 text-accent-blue" />
                      {(channel.currentViewers / 1000).toFixed(0)}k
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand transition-colors truncate">
                  {channel.title}
                </h4>

                <p className="text-[11px] text-gray-400 truncate mt-0.5">
                  {channel.liveProgram || channel.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
