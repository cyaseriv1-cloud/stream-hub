import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw, 
  AlertTriangle,
  Radio
} from 'lucide-react';

interface VideoPlayerProps {
  source: string;
  title?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ source, title }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Estados de la línea de tiempo
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);

  const hideTimeoutRef = useRef<number | null>(null);

  // Formateador de tiempo mm:ss o hh:mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 3500);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    let hls: Hls | null = null;
    setIsLoading(true);
    setError(null);
    setCurrentTime(0);
    setDuration(0);

    const isHls = source.includes('.m3u8');

    const tryAutoplay = () => {
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => setIsPlaying(false));
      });
    };

    if (isHls) {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        });

        hls.loadSource(source);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          setError(null);
          tryAutoplay();
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                if (retryCount < 3) {
                  setRetryCount((prev) => prev + 1);
                  hls?.startLoad();
                } else {
                  setError('Error de conexión con la transmisión HLS tras 3 reintentos.');
                  setIsLoading(false);
                }
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls?.recoverMediaError();
                break;
              default:
                if (retryCount < 3) {
                  setRetryCount((prev) => prev + 1);
                  hls?.loadSource(source);
                } else {
                  setError('No se pudo reproducir la transmisión multimedia.');
                  setIsLoading(false);
                }
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = source;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          tryAutoplay();
        });
      } else {
        setError('Este navegador no soporta streaming HLS.');
        setIsLoading(false);
      }
    } else {
      video.src = source;
      video.addEventListener('canplay', () => {
        setIsLoading(false);
        setError(null);
        tryAutoplay();
      });
      video.addEventListener('error', () => {
        if (retryCount < 3) {
          setRetryCount((prev) => prev + 1);
          video.load();
        } else {
          setError('Error al reproducir el video MP4 tras 3 intentos.');
          setIsLoading(false);
        }
      });
    }

    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);

    const onTimeUpdate = () => {
      if (!isDraggingTimeline) {
        setCurrentTime(video.currentTime);
      }
    };

    const onDurationChange = () => {
      if (video.duration && isFinite(video.duration)) {
        setDuration(video.duration);
      }
    };

    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('durationchange', onDurationChange);
    video.addEventListener('loadedmetadata', onDurationChange);

    // Atajos de teclado (Smart TV remote / desktop)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar si el usuario está escribiendo en un input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        seekBackward();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        seekForward();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('durationchange', onDurationChange);
      video.removeEventListener('loadedmetadata', onDurationChange);
      window.removeEventListener('keydown', handleKeyDown);
      if (hls) {
        hls.destroy();
      }
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [source, retryCount, isDraggingTimeline]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Retroceder 10 segundos
  const seekBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    const target = Math.max(0, video.currentTime - 10);
    video.currentTime = target;
    setCurrentTime(target);
    setControlsVisible(true);
  };

  // Avanzar 10 segundos
  const seekForward = () => {
    const video = videoRef.current;
    if (!video) return;
    const maxTime = duration > 0 ? duration : video.currentTime + 10;
    const target = Math.min(maxTime, video.currentTime + 10);
    video.currentTime = target;
    setCurrentTime(target);
    setControlsVisible(true);
  };

  // Cambiar posición en la línea de tiempo (Scrubbing)
  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleTimelineMouseDown = () => {
    setIsDraggingTimeline(true);
  };

  const handleTimelineMouseUp = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    setIsDraggingTimeline(false);
    const video = videoRef.current;
    if (video) {
      const newTime = parseFloat((e.target as HTMLInputElement).value);
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleManualRetry = () => {
    setRetryCount(0);
    setError(null);
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const isVodContent = isFinite(duration) && duration > 0;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setControlsVisible(false)}
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group select-none shadow-2xl border border-[#2a2a2a]"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        onClick={togglePlay}
        playsInline
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Overlay Cargando... mientras bufferiza */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none z-20">
          <div className="w-14 h-14 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin mb-3 shadow-lg shadow-[#e50914]/40" />
          <p className="text-white text-sm font-semibold tracking-wide animate-pulse">
            Cargando transmisión...
          </p>
        </div>
      )}

      {/* Overlay de Error con Retry */}
      {error && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center z-30">
          <AlertTriangle className="w-12 h-12 text-[#e50914] mb-3" />
          <h4 className="text-white font-bold text-lg mb-1">Error de Reproducción</h4>
          <p className="text-gray-300 text-sm max-w-md mb-5">{error}</p>
          <button
            onClick={handleManualRetry}
            className="flex items-center gap-2 bg-[#e50914] hover:bg-[#f40612] text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-[#e50914]/40 transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            Reintentar Conexión
          </button>
        </div>
      )}

      {/* Header superior del reproductor (Aparece en hover) */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 z-20 flex items-center justify-between ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-ping shrink-0" />
          <h3 className="text-white font-bold text-sm sm:text-base drop-shadow truncate max-w-md">
            {title || 'Lumina TV Reproductor'}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isVodContent ? (
            <span className="text-[11px] font-extrabold bg-[#242424]/90 text-gray-200 border border-[#2a2a2a] px-2.5 py-0.5 rounded-md shadow">
              PELÍCULA VOD
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-black bg-[#e50914] text-white px-2 py-0.5 rounded-md shadow uppercase">
              <Radio className="w-3 h-3" />
              EN VIVO
            </span>
          )}
        </div>
      </div>

      {/* Barra de Controles Inferior (Aparece en hover) */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-black/95 via-black/75 to-transparent transition-opacity duration-300 z-20 flex flex-col gap-2 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* LÍNEA DE TIEMPO INTERACTIVA (Solo si tiene duración medible) */}
        {isVodContent ? (
          <div className="w-full flex flex-col gap-1.5 group/slider">
            <div className="relative w-full flex items-center h-4 cursor-pointer">
              {/* Barra de progreso interactiva */}
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={currentTime}
                onChange={handleTimelineChange}
                onMouseDown={handleTimelineMouseDown}
                onMouseUp={handleTimelineMouseUp}
                onTouchStart={handleTimelineMouseDown}
                onTouchEnd={handleTimelineMouseUp}
                className="w-full h-1.5 group-hover/slider:h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer transition-all accent-[#e50914] focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #e50914 ${progressPercent}%, #333333 ${progressPercent}%)`,
                }}
              />
            </div>

            {/* Timestamps actual y total */}
            <div className="flex items-center justify-between text-xs font-mono font-medium text-gray-300 px-0.5">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-gray-400 px-1 py-1">
            <span className="flex items-center gap-1.5 font-bold text-[#e50914]">
              <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
              Transmisión continua 24/7 en tiempo real
            </span>
            <span className="text-gray-500 font-mono">1080p 60fps</span>
          </div>
        )}

        {/* Fila de Botones y Herramientas */}
        <div className="flex items-center justify-between gap-4 mt-0.5">
          {/* Controles Izquierdos: Play/Pause, Rebobinar 10s, Avanzar 10s, Volumen */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-xl bg-[#e50914] hover:bg-[#f40612] text-white shadow-lg shadow-[#e50914]/40 transition-all hover:scale-105 active:scale-95"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              title={isPlaying ? 'Pausar (Espacio)' : 'Reproducir (Espacio)'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            {/* Retroceder 10 Segundos (-10s) */}
            {isVodContent && (
              <button
                onClick={seekBackward}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-gray-200 hover:text-white border border-[#333333] transition-all hover:scale-105 active:scale-95 text-xs font-bold"
                title="Retroceder 10 segundos (Flecha izquierda)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#e50914]" />
                <span>10s</span>
              </button>
            )}

            {/* Avanzar 10 Segundos (+10s) */}
            {isVodContent && (
              <button
                onClick={seekForward}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-gray-200 hover:text-white border border-[#333333] transition-all hover:scale-105 active:scale-95 text-xs font-bold"
                title="Avanzar 10 segundos (Flecha derecha)"
              >
                <span>10s</span>
                <RotateCw className="w-3.5 h-3.5 text-[#e50914]" />
              </button>
            )}

            {/* Volumen */}
            <div className="flex items-center gap-2 ml-1">
              <button
                onClick={toggleMute}
                className="p-1.5 text-gray-300 hover:text-white transition-colors"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                title={isMuted ? 'Activar sonido (M)' : 'Silenciar (M)'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#e50914]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 sm:w-20 accent-[#e50914] h-1.5 bg-[#2a2a2a] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Controles Derechos: Atajos y Pantalla Completa */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-bold text-gray-400 bg-[#181818] border border-[#2a2a2a] px-2 py-1 rounded">
              Atajos: [Espacio] [← 10s] [10s →] [F]
            </span>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl text-gray-300 hover:text-white bg-[#242424] hover:bg-[#2e2e2e] border border-[#333333] transition-colors"
              aria-label="Pantalla completa"
              title="Pantalla completa (F)"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
