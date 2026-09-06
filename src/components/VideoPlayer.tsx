import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw, 
  AlertTriangle,
  Radio,
  Scan
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { ScreenOrientation } from '@capacitor/screen-orientation';

interface VideoPlayerProps {
  source: string;
  title?: string;
}

export type VideoScalingMode = 'contain' | 'cover' | 'fill';

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Modo de relación de aspecto / aprovechamiento de pantalla
  // 'contain' = Ajustar con barras originales 16:9
  // 'cover' = Llenar pantalla completa (Zoom sin bordes negros para pantallas 19.5:9 / 20:9)
  // 'fill' = Estirar 100% de la pantalla
  const [scalingMode, setScalingMode] = useState<VideoScalingMode>('contain');
  const [scalingToast, setScalingToast] = useState<string | null>(null);
  const scalingToastTimerRef = useRef<number | null>(null);

  // Estados de línea de tiempo
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);

  const hideTimeoutRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

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

  const showControlsTemporarily = useCallback(() => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying && !isDraggingTimeline) {
        setControlsVisible(false);
      }
    }, 3500);
  }, [isPlaying, isDraggingTimeline]);

  // Alternar visualización de controles al tocar pantalla
  const toggleControls = () => {
    if (controlsVisible) {
      setControlsVisible(false);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    } else {
      showControlsTemporarily();
    }
  };

  // Alternar modo de relación de aspecto (Ajustar vs Llenar Pantalla vs Estirar)
  const cycleScalingMode = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let nextMode: VideoScalingMode = 'contain';
    let label = '';

    if (scalingMode === 'contain') {
      nextMode = 'cover';
      label = 'Llenar Pantalla (Sin bordes negros)';
    } else if (scalingMode === 'cover') {
      nextMode = 'fill';
      label = 'Estirar Pantalla (100%)';
    } else {
      nextMode = 'contain';
      label = 'Ajustar (Original 16:9)';
    }

    setScalingMode(nextMode);
    setScalingToast(label);

    if (scalingToastTimerRef.current) {
      window.clearTimeout(scalingToastTimerRef.current);
    }
    scalingToastTimerRef.current = window.setTimeout(() => {
      setScalingToast(null);
    }, 2200);

    showControlsTemporarily();
  };

  // Doble toque en pantalla para alternar zoom / llenar pantalla
  const handleScreenTouch = (e: React.MouseEvent) => {
    // Si se hizo clic sobre controles interactivos, no interferir
    if ((e.target as HTMLElement).closest('button, input, a')) {
      return;
    }

    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      // Doble toque: alterna entre Ajustar y Llenar Pantalla
      cycleScalingMode();
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
    toggleControls();
  };

  // Entrar a Pantalla Completa
  const enterFullscreen = async () => {
    setIsFullscreen(true);
    // Cambiar automáticamente a modo Llenar para aprovechar toda la pantalla móvil
    setScalingMode('cover');
    setScalingToast('Pantalla Completa: Llenar Pantalla');
    if (scalingToastTimerRef.current) window.clearTimeout(scalingToastTimerRef.current);
    scalingToastTimerRef.current = window.setTimeout(() => setScalingToast(null), 2000);

    const container = containerRef.current;
    const video = videoRef.current;

    // 1. Android Nativo: Ocultar barras de sistema y rotar a horizontal
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.hide();
      } catch {
        // Ignore
      }
      try {
        await ScreenOrientation.lock({ orientation: 'landscape' });
      } catch {
        // Ignore
      }
    }

    // 2. DOM Fullscreen API si está disponible
    if (container) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          if ((video as any)?.webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
          }
        });
      } else if ((video as any)?.webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      }
    }

    showControlsTemporarily();
  };

  // Salir de Pantalla Completa
  const exitFullscreen = async () => {
    setIsFullscreen(false);

    // 1. Android Nativo: Restaurar barra de estado y desbloquear orientación
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.show();
      } catch {
        // Ignore
      }
      try {
        await ScreenOrientation.unlock();
      } catch {
        // Ignore
      }
    }

    // 2. Salir de DOM Fullscreen si sigue activo
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } else if ((document as any).webkitFullscreenElement && (document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }

    showControlsTemporarily();
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  // Escuchar evento personalizado del botón atrás de Android
  useEffect(() => {
    const handleExitFsEvent = () => {
      if (isFullscreen) {
        exitFullscreen();
      }
    };
    window.addEventListener('lumina:exitFullscreen', handleExitFsEvent);
    return () => {
      window.removeEventListener('lumina:exitFullscreen', handleExitFsEvent);
    };
  }, [isFullscreen]);

  // Escuchar cambios nativos de pantalla completa del navegador
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isDomFull = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      if (!isDomFull && isFullscreen) {
        setIsFullscreen(false);
        if (Capacitor.isNativePlatform()) {
          StatusBar.show().catch(() => {});
          ScreenOrientation.unlock().catch(() => {});
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  // Ciclo de vida y streaming HLS / MP4
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
        setError('Este navegador o dispositivo no soporta streaming HLS.');
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
      showControlsTemporarily();
    };
    const onPause = () => {
      setIsPlaying(false);
      setControlsVisible(true);
    };

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

    // Atajos de teclado
    const handleKeyDown = (e: KeyboardEvent) => {
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
      if (scalingToastTimerRef.current) {
        window.clearTimeout(scalingToastTimerRef.current);
      }
    };
  }, [source, retryCount, isDraggingTimeline, showControlsTemporarily]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      showControlsTemporarily();
    } else {
      video.pause();
      setIsPlaying(false);
      setControlsVisible(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    showControlsTemporarily();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
    showControlsTemporarily();
  };

  const seekBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    const target = Math.max(0, video.currentTime - 10);
    video.currentTime = target;
    setCurrentTime(target);
    showControlsTemporarily();
  };

  const seekForward = () => {
    const video = videoRef.current;
    if (!video) return;
    const maxTime = duration > 0 ? duration : video.currentTime + 10;
    const target = Math.min(maxTime, video.currentTime + 10);
    video.currentTime = target;
    setCurrentTime(target);
    showControlsTemporarily();
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleTimelineMouseDown = () => {
    setIsDraggingTimeline(true);
    if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
  };

  const handleTimelineMouseUp = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    setIsDraggingTimeline(false);
    const video = videoRef.current;
    if (video) {
      const newTime = parseFloat((e.target as HTMLInputElement).value);
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
    showControlsTemporarily();
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

  // Clase CSS según el modo de escalado
  const getScalingClass = () => {
    switch (scalingMode) {
      case 'cover':
        return 'w-full h-full object-cover';
      case 'fill':
        return 'w-full h-full object-fill';
      case 'contain':
      default:
        return 'w-full h-full object-contain';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={showControlsTemporarily}
      onClick={handleScreenTouch}
      className={`relative w-full bg-black select-none shadow-2xl transition-all duration-200 ${
        isFullscreen
          ? 'is-fullscreen-player fixed inset-0 z-[99999] w-screen h-screen m-0 p-0 rounded-none border-none overflow-hidden flex items-center justify-center bg-black'
          : 'aspect-video rounded-2xl overflow-hidden border border-[#2a2a2a]'
      }`}
    >
      {/* Video Element con escalado dinámico (Ajustar, Llenar, Estirar) */}
      <video
        ref={videoRef}
        playsInline
        className={`${getScalingClass()} cursor-pointer transition-all duration-300`}
      />

      {/* Notificación flotante de modo de pantalla/escalado */}
      {scalingToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-2xl pointer-events-none flex items-center gap-2 animate-bounce">
          <Scan className="w-4 h-4 text-[#e50914]" />
          <span>{scalingToast}</span>
        </div>
      )}

      {/* Overlay Cargando... */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none z-20">
          <div className="w-12 sm:w-14 h-12 sm:h-14 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin mb-3 shadow-lg shadow-[#e50914]/40" />
          <p className="text-white text-xs sm:text-sm font-semibold tracking-wide animate-pulse">
            Cargando transmisión...
          </p>
        </div>
      )}

      {/* Overlay de Error */}
      {error && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-auto"
        >
          <AlertTriangle className="w-12 h-12 text-[#e50914] mb-3" />
          <h4 className="text-white font-bold text-base sm:text-lg mb-1">Error de Transmisión</h4>
          <p className="text-gray-300 text-xs sm:text-sm max-w-md mb-5">{error}</p>
          <button
            onClick={handleManualRetry}
            className="flex items-center gap-2 bg-[#e50914] hover:bg-[#f40612] text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-[#e50914]/40 transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            Reintentar Conexión
          </button>
        </div>
      )}

      {/* 1. HEADER SUPERIOR */}
      <div
        className={`absolute top-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 z-20 flex items-center justify-between pointer-events-none ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-ping shrink-0" />
          <h3 className="text-white font-bold text-xs sm:text-base drop-shadow truncate">
            {title || 'Lumina TV'}
          </h3>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {isVodContent ? (
            <span className="text-[10px] sm:text-xs font-bold bg-[#181818]/90 text-gray-200 border border-[#2a2a2a] px-2 py-0.5 rounded shadow">
              PELÍCULA
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] sm:text-xs font-black bg-[#e50914] text-white px-2 py-0.5 rounded shadow uppercase">
              <Radio className="w-3 h-3" />
              EN VIVO
            </span>
          )}
        </div>
      </div>

      {/* 2. CONTROLES CENTRALES (Play/Pause y saltos de 10s) */}
      <div
        className={`absolute inset-0 flex items-center justify-center gap-6 sm:gap-10 transition-opacity duration-300 z-20 pointer-events-none ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Retroceder 10s */}
        {isVodContent && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              seekBackward();
            }}
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white border border-white/20 flex flex-col items-center justify-center transition-all shadow-xl backdrop-blur-sm"
            aria-label="Retroceder 10 segundos"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-[9px] sm:text-[10px] font-black -mt-0.5">10s</span>
          </button>
        )}

        {/* Botón Central Play / Pause */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="pointer-events-auto w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#e50914] hover:bg-[#f40612] active:scale-95 text-white flex items-center justify-center shadow-2xl shadow-[#e50914]/50 transition-all"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white ml-0.5" />
          )}
        </button>

        {/* Avanzar 10s */}
        {isVodContent && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              seekForward();
            }}
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white border border-white/20 flex flex-col items-center justify-center transition-all shadow-xl backdrop-blur-sm"
            aria-label="Avanzar 10 segundos"
          >
            <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-[9px] sm:text-[10px] font-black -mt-0.5">10s</span>
          </button>
        )}
      </div>

      {/* 3. BARRA INFERIOR DESPEJADA */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-300 z-20 flex flex-col gap-2 pointer-events-auto ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LÍNEA DE TIEMPO INTERACTIVA */}
        {isVodContent && (
          <div className="w-full flex items-center h-4 py-1">
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
              className="w-full h-2 bg-[#333333] rounded-lg appearance-none cursor-pointer accent-[#e50914] focus:outline-none"
              style={{
                background: `linear-gradient(to right, #e50914 ${progressPercent}%, #333333 ${progressPercent}%)`,
              }}
            />
          </div>
        )}

        {/* Fila de controles inferiores */}
        <div className="flex items-center justify-between gap-3 pt-0.5">
          {/* Lado Izquierdo: Timestamps y botón de Silencio */}
          <div className="flex items-center gap-3">
            {isVodContent ? (
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-gray-200">
                <span className="text-white">{formatTime(currentTime)}</span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-400">{formatTime(duration)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-[#e50914]">
                <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
                <span>Transmisión en Vivo</span>
              </div>
            )}

            {/* Control de Audio */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
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
                className="hidden sm:inline-block w-16 accent-[#e50914] h-1.5 bg-[#2a2a2a] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Lado Derecho: Botón de Llenar Pantalla / Aspect Ratio + Pantalla Completa */}
          <div className="flex items-center gap-2">
            {/* Botón para cambiar tamaño y llenar pantalla sin bordes negros */}
            <button
              onClick={cycleScalingMode}
              className="p-1.5 sm:p-2 rounded-xl bg-white/15 hover:bg-white/25 active:bg-[#e50914] text-white flex items-center gap-1.5 transition-all text-xs font-bold border border-white/10 shadow-lg"
              title="Aprovechar toda la pantalla (quitar bordes negros)"
              aria-label="Ajustar o Llenar Pantalla"
            >
              <Scan className="w-3.5 h-3.5 text-[#e50914]" />
              <span className="text-[11px] font-semibold">
                {scalingMode === 'contain' ? 'Ajustar' : scalingMode === 'cover' ? 'Llenar' : 'Estirar'}
              </span>
            </button>

            {/* Botón Pantalla Completa */}
            <button
              onClick={toggleFullscreen}
              className="p-2 sm:p-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-[#e50914] text-white flex items-center justify-center gap-1.5 transition-all text-xs font-bold border border-white/10 shadow-lg"
              aria-label="Pantalla completa"
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-4 h-4" />
                  <span className="hidden sm:inline">Salir</span>
                </>
              ) : (
                <>
                  <Maximize className="w-4 h-4" />
                  <span className="hidden sm:inline">Ampliar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
