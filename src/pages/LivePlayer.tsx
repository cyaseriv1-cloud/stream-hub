import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { channels } from '@/data/channels';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Radio, ChevronLeft, Calendar, Clock, AlertCircle } from 'lucide-react';

export const LivePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const channel = channels.find((c) => c.id === id);

  if (!channel) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-[#181818] border border-[#2a2a2a] flex items-center justify-center mb-4 text-[#e50914]">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Canal no encontrado</h2>
        <p className="text-sm text-gray-400 mb-6 max-w-sm">
          El canal que intentas sintonizar no existe o ha cambiado de identificador.
        </p>
        <Link
          to="/live"
          className="bg-[#e50914] hover:bg-[#f40612] text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-[#e50914]/30 transition-all"
        >
          Volver a Canales en Vivo
        </Link>
      </div>
    );
  }

  const currentProgram = channel.epg[0];
  const nextProgram = channel.epg[1];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Botón Volver */}
      <button
        onClick={() => navigate('/live')}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver a la lista de canales
      </button>

      {/* Arriba del video: Nombre del canal + Logo */}
      <div className="flex items-center justify-between gap-4 bg-[#181818] p-4 rounded-2xl border border-[#2a2a2a]">
        <div className="flex items-center gap-3.5 min-w-0">
          <img
            src={channel.logo_url}
            alt={channel.name}
            className="w-12 h-12 rounded-xl object-cover border border-[#2a2a2a] shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-white truncate">
                {channel.name}
              </h1>
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#e50914] text-white px-2 py-0.5 rounded shadow">
                EN VIVO
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Categoría: <span className="text-white font-semibold">{channel.category}</span>
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block text-xs font-bold text-gray-300 bg-[#242424] px-3 py-1.5 rounded-xl border border-[#2a2a2a]">
          Transmisión HLS 1080p
        </span>
      </div>

      {/* Reproductor de Video */}
      <VideoPlayer source={channel.stream_url} title={channel.name} />

      {/* Debajo del video: EPG (Programa actual + próximo) */}
      <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#e50914]" />
          Guía de Programación (EPG)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ahora */}
          <div className="bg-[#242424] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-black uppercase text-[#e50914] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
                Ahora
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentProgram ? `${currentProgram.start} - ${currentProgram.end}` : '--:--'}
              </span>
            </div>
            <h4 className="text-base font-bold text-white">
              {currentProgram ? currentProgram.title : 'Emisión regular'}
            </h4>
          </div>

          {/* Luego */}
          <div className="bg-[#202020] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold uppercase text-gray-400">
                Luego
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {nextProgram ? `${nextProgram.start} - ${nextProgram.end}` : '--:--'}
              </span>
            </div>
            <h4 className="text-base font-bold text-gray-200">
              {nextProgram ? nextProgram.title : 'Próxima emisión'}
            </h4>
          </div>
        </div>

        {/* Lista completa de programas */}
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-gray-400 mb-2">Resto del día:</h4>
          <div className="divide-y divide-[#2a2a2a]">
            {channel.epg.slice(2).map((prog, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs text-gray-300">
                <span className="font-medium text-white">{prog.title}</span>
                <span className="text-gray-500 font-mono">{prog.start} - {prog.end}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
