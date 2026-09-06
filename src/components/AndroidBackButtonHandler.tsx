import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

export const AndroidBackButtonHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastBackPressRef = useRef<number>(0);

  useEffect(() => {
    // Solo activar en plataformas nativas (Android)
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    let backListener: any = null;

    const registerListener = async () => {
      try {
        backListener = await CapApp.addListener('backButton', () => {
          // 1. Si el reproductor está en pantalla completa, salir primero de pantalla completa
          const fullscreenElem =
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            document.querySelector('.is-fullscreen-player');

          if (fullscreenElem) {
            // Disparar evento para que VideoPlayer restaure el estado
            window.dispatchEvent(new CustomEvent('lumina:exitFullscreen'));
            if (document.fullscreenElement && document.exitFullscreen) {
              document.exitFullscreen().catch(() => {});
            } else if ((document as any).webkitExitFullscreen) {
              (document as any).webkitExitFullscreen();
            }
            return;
          }

          // 2. Si estamos en una subpágina (ej: detalle de película, canal en vivo, búsqueda), volver atrás
          if (location.pathname !== '/') {
            navigate(-1);
            return;
          }

          // 3. Si ya estamos en la página principal ('/'), pedir doble toque antes de salir
          const now = Date.now();
          if (now - lastBackPressRef.current < 2000) {
            CapApp.exitApp();
          } else {
            lastBackPressRef.current = now;
            
            // Eliminar toast previo si existía
            const oldToast = document.getElementById('lumina-exit-toast');
            if (oldToast) oldToast.remove();

            // Mostrar toast elegante en pantalla
            const toast = document.createElement('div');
            toast.id = 'lumina-exit-toast';
            toast.className =
              'fixed bottom-12 left-1/2 -translate-x-1/2 z-[999999] bg-[#181818]/95 text-white text-xs font-semibold px-4 py-2 rounded-full border border-neutral-700 shadow-2xl backdrop-blur-md transition-opacity duration-300 pointer-events-none';
            toast.innerText = 'Desliza o presiona atrás otra vez para salir';
            document.body.appendChild(toast);

            setTimeout(() => {
              toast.style.opacity = '0';
              setTimeout(() => toast.remove(), 350);
            }, 1800);
          }
        });
      } catch (err) {
        console.error('Error al registrar listener de botón atrás:', err);
      }
    };

    registerListener();

    return () => {
      if (backListener) {
        backListener.remove();
      }
    };
  }, [navigate, location]);

  return null;
};
