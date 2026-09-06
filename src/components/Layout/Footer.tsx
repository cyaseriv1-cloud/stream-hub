import React from 'react';
import { Tv, ShieldCheck, Radio, Film } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#2a2a2a] bg-[#121212] mt-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#e50914] flex items-center justify-center text-white font-black text-xs shadow-md shadow-[#e50914]/40">
            M
          </div>
          <div>
            <div className="font-extrabold text-white tracking-wider flex items-center">
              MAGIS<span className="text-[#e50914] ml-0.5">TV</span>
            </div>
            <p className="text-xs text-gray-500">Streaming en Vivo y Películas VOD</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#e50914]" />
            40+ Canales HLS
          </span>
          <span className="flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-blue-400" />
            60+ Películas HD
          </span>
          <span className="flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-emerald-400" />
            Smart TV & Android APK
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Firebase Auth
          </span>
        </div>
      </div>
    </footer>
  );
};
