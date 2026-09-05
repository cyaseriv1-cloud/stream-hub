# 🎬 StreamHub - Plataforma de Streaming Live & VOD (Estilo Magis TV)

Plataforma de streaming moderna construida con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, y reproductor de video de baja latencia con **`hls.js`**. Diseñada con interfaz oscura de alta fidelidad, inspirada en aplicaciones para Smart TV y Android Box.

---

## 🚀 Características Implementadas (Fase 1)

1. **Hero Banner Rotativo (3 Slides)**:
   - Carrusel automático cada 6 segundos con pausa al pasar el cursor o interactuar.
   - Controles manuales por botones laterales y dots de paginación inferior.
   - Botón directo *"Reproducir Ahora"* que abre el reproductor HLS al instante.
2. **Canales en Vivo Destacados (Live TV Bar)**:
   - Carrusel horizontal con canales en directo, indicador parpadeante de transmisión, programa actual y contador de espectadores en vivo.
3. **Grid de Películas y Canales**:
   - Tarjetas verticales optimizadas para TV y móvil (póster, título, categoría, calificación, duración/programa).
   - Badges dinámicos (`4K`, `HD`, `EN VIVO`).
   - Efectos de escala y botón de play superpuesto en hover.
4. **Buscador en Tiempo Real**:
   - Barra de búsqueda reactiva por título, género, categoría o programa en emisión con botón para limpiar consulta.
5. **Selector de Categorías en Píldoras**:
   - Filtros horizontales: *Todos, Películas, Canales TV, Acción, Ciencia Ficción, Deportes, Noticias, Documentales, Infantil, Comedia*.
   - Muestra contador de elementos por cada categoría.
6. **Reproductor HLS Integral (`hls.js`)**:
   - Soporte para transmisiones HLS `.m3u8` con workers y baja latencia.
   - Fallback nativo para Safari en iOS y macOS.
   - Controles personalizados: Play/Pause, silenciar, deslizador de volumen, pantalla completa y soporte de tecla `ESC`.
7. **Mock Data Seguro (`data/mockData.ts`)**:
   - 12 películas ficticias + 10 canales en directo sin conflictos de marcas comerciales.
   - Streams de prueba funcionales y estables.

---

## 📱 Compilación Automática de APK con GitHub Actions

Para compilar el archivo `.apk` de Android sin pagar servicios externos ni instalar herramientas pesadas en tu PC:

1. Crea un repositorio en **GitHub** y sube este proyecto:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit streamhub"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```
2. Ve a la pestaña **Actions** en tu repositorio de GitHub.
3. Verás el flujo de trabajo: **Compilar APK Android (StreamHub)** ejecutándose automáticamente.
4. Una vez finalice (aprox. 3-4 minutos), haz clic sobre la ejecución y descarga el archivo comprimido en la sección **Artifacts**:
   - **`StreamHub-Android-Debug-APK`** (contiene el archivo `app-debug.apk` listo para instalar en tu teléfono o TV Box).

---

## 💻 Ejecución en Local

### 1. Iniciar Servidor de Desarrollo
```bash
cd stream-hub
npm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000).

### 2. Compilar para Producción
```bash
npm run build
npm run start
```

---

## 📂 Estructura del Proyecto

```
stream-hub/
├── .github/
│   └── workflows/
│       └── build-apk.yml          # Flujo de CI/CD para compilar APK gratis
├── capacitor.config.json          # Configuración de empaquetado Android
├── data/
│   └── mockData.ts                # 12 películas y 10 canales ficticios
├── src/
│   ├── app/
│   │   ├── api/media/route.ts     # Endpoint de consulta y filtros
│   │   ├── globals.css            # Estilos globales y utilidades
│   │   ├── layout.tsx             # Layout general y metadatos
│   │   └── page.tsx               # Página principal interactiva
│   ├── components/
│   │   ├── CategoryFilter.tsx     # Selector de categorías en píldoras
│   │   ├── HeroBanner.tsx         # Carrusel rotativo de 3 slides
│   │   ├── LiveChannelBar.tsx     # Carrusel horizontal de canales en vivo
│   │   ├── MediaCard.tsx          # Tarjeta con hover y badges
│   │   ├── MediaGrid.tsx          # Cuadrícula responsive de medios
│   │   ├── Navbar.tsx             # Barra de navegación y buscador
│   │   └── VideoPlayerModal.tsx   # Reproductor de video HLS (hls.js)
│   └── types/
│       └── index.ts               # Definiciones de TypeScript
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```
