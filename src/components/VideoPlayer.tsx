import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, AlertTriangle } from 'lucide-react';

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

  const hideTimeoutRef = useRef<number | null>(null);

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    let hls: Hls | null = null;
    setIsLoading(true);
    setError(null);

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
        // Fallback nativo HLS (Safari iOS / macOS)
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
      // Formato nativo MP4 / WebM
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

    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      if (hls) {
        hls.destroy();
      }
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [source, retryCount]);

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

  const handleManualRetry = () => {
    setRetryCount(0);
    setError(null);
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

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
        className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-300 z-20 flex items-center justify-between ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-ping" />
          <h3 className="text-white font-bold text-sm sm:text-base drop-shadow truncate max-w-md">
            {title || 'Lumina TV Reproductor'}
          </h3>
        </div>
        <span className="text-[11px] font-bold bg-[#181818]/80 text-gray-300 border border-[#2a2a2a] px-2 py-0.5 rounded">
          {source.includes('.m3u8') ? 'HLS LIVE' : 'MP4 VOD'}
        </span>
      </div>

      {/* Barra de Controles Inferior (Aparece en hover) */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 z-20 flex items-center justify-between gap-4 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Play/Pause y Volumen */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-xl bg-[#e50914] hover:bg-[#f40612] text-white shadow-lg shadow-[#e50914]/40 transition-all hover:scale-105"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 text-gray-300 hover:text-white transition-colors"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5 text-[#e50914]" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 sm:w-24 accent-[#e50914] h-1.5 bg-[#2a2a2a] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Indicador de buffer / Fullscreen */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Pantalla completa"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
