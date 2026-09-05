'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Radio, AlertCircle } from 'lucide-react';
import { MediaItem } from '@/types';

interface VideoPlayerModalProps {
  media: MediaItem | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ media, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!media) return;

    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    setIsLoading(true);
    setErrorMessage(null);
    setIsPlaying(true);

    const isHlsSource = media.streamUrl.includes('.m3u8');

    if (isHlsSource) {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 60,
        });

        hls.loadSource(media.streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          video.play().catch(() => {
            // Autoplay bloqueado por políticas de audio del navegador: silenciar e intentar
            video.muted = true;
            setIsMuted(true);
            video.play();
          });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls?.recoverMediaError();
                break;
              default:
                hls?.destroy();
                setErrorMessage('Error al cargar la transmisión en vivo. Intenta nuevamente.');
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback nativo para Safari en iOS / macOS
        video.src = media.streamUrl;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          video.play().catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play();
          });
        });
      } else {
        setErrorMessage('Tu navegador no admite la reproducción de transmisiones HLS.');
      }
    } else {
      // Fallback MP4 estándar
      video.src = media.streamUrl;
      video.addEventListener('canplay', () => {
        setIsLoading(false);
        video.play().catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play();
        });
      });
    }

    // Tecla Escape para cerrar
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (hls) {
        hls.destroy();
      }
    };
  }, [media, onClose]);

  if (!media) return null;

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

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      {/* Contenedor principal del reproductor */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl bg-surface border border-borderDark rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header superior con info y botón cerrar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-30">
          <div className="flex items-center gap-2 sm:gap-3">
            {media.type === 'channel' ? (
              <span className="flex items-center gap-1 text-xs font-black uppercase bg-accent-live text-white px-2.5 py-0.5 rounded shadow">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                EN VIVO
              </span>
            ) : (
              <span className="text-xs font-bold bg-brand text-white px-2.5 py-0.5 rounded shadow">
                PELÍCULA
              </span>
            )}
            <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {media.title}
            </h3>
            <span className="hidden sm:inline text-xs text-gray-400">
              ({media.resolution})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/60 hover:bg-brand text-gray-300 hover:text-white transition-all backdrop-blur-sm"
            aria-label="Cerrar reproductor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zona de Video */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            playsInline
            onClick={togglePlay}
          />

          {/* Spinner de Carga */}
          {isLoading && !errorMessage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 pointer-events-none">
              <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs sm:text-sm text-gray-300 font-medium">
                Conectando con el stream...
              </p>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-6 text-center">
              <AlertCircle className="w-10 h-10 text-brand mb-2" />
              <p className="text-sm text-gray-200 font-semibold mb-4">
                {errorMessage}
              </p>
              <button
                onClick={() => {
                  setErrorMessage(null);
                  setIsLoading(true);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Reintentar Conexión
              </button>
            </div>
          )}
        </div>

        {/* Barra de Controles Inferior */}
        <div className="bg-surface p-3 sm:p-4 border-t border-borderDark flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            {/* Controles de Reproducción y Volumen */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-lg bg-brand hover:bg-brand-hover text-white transition-all shadow-md shadow-brand/20"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-brand" />
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
                  className="w-16 sm:w-24 accent-brand h-1.5 bg-borderDark rounded-lg cursor-pointer"
                />
              </div>

              {media.type === 'channel' && media.liveProgram && (
                <span className="hidden md:inline text-xs text-accent-blue font-medium ml-2">
                  Transmisión: {media.liveProgram}
                </span>
              )}
            </div>

            {/* Selector de Pantalla Completa */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 bg-background px-2 py-1 rounded border border-borderDark">
                HLS / H.264
              </span>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-surfaceHover transition-colors"
                aria-label="Pantalla completa"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sinopsis del contenido en el reproductor */}
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {media.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
};
