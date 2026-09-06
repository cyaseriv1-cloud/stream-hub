export interface Program {
  title: string;
  start: string;
  end: string;
}

export interface Channel {
  id: string;
  name: string;
  logo_url: string;
  category: 'Noticias' | 'Deportes' | 'Cine' | 'Series' | 'Infantil' | 'Música' | 'Documental';
  stream_url: string;
  epg: Program[];
}

const HLS_STREAMS = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
  'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
];

export const channels: Channel[] = [
  // --- DEPORTES (1-7) ---
  {
    id: 'ch-1',
    name: 'Magis Sports 1 HD',
    logo_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=80',
    category: 'Deportes',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Previa de Fútbol Internacional', start: '08:00', end: '09:30' },
      { title: 'Champions League: Directo', start: '09:30', end: '11:45' },
      { title: 'El Gran Debate Deportivo', start: '11:45', end: '13:00' },
      { title: 'Resumen de Goles y Jugadas', start: '13:00', end: '15:00' },
    ],
  },
  {
    id: 'ch-2',
    name: 'Magis Sports 2 Ultra',
    logo_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&auto=format&fit=crop&q=80',
    category: 'Deportes',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'NBA Noche de Titanes', start: '07:00', end: '09:00' },
      { title: 'Grand Slam de Tenis', start: '09:00', end: '12:00' },
      { title: 'Motor GP: Clasificación', start: '12:00', end: '14:00' },
      { title: 'UFC Combates Históricos', start: '14:00', end: '16:00' },
    ],
  },
  {
    id: 'ch-3',
    name: 'Fútbol Total TV',
    logo_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&auto=format&fit=crop&q=80',
    category: 'Deportes',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'Liga Sudamericana en Vivo', start: '10:00', end: '12:15' },
      { title: 'Análisis Táctico Post-Partido', start: '12:15', end: '13:30' },
      { title: 'Especial Clásicos de Leyenda', start: '13:30', end: '15:30' },
      { title: 'El Marcador Nocturno', start: '15:30', end: '17:00' },
    ],
  },
  {
    id: 'ch-4',
    name: 'Velocidad & Motor TV',
    logo_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&auto=format&fit=crop&q=80',
    category: 'Deportes',
    stream_url: HLS_STREAMS[3],
    epg: [
      { title: 'Mundo Rally Extremo', start: '08:00', end: '10:00' },
      { title: 'Fórmula Paddock Live', start: '10:00', end: '12:00' },
      { title: 'Superbikes Circuito de Europa', start: '12:00', end: '14:00' },
      { title: 'Top Gear Especial Carreras', start: '14:00', end: '16:00' },
    ],
  },
  {
    id: 'ch-5',
    name: 'Arena Fight Channel',
    logo_url: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=300&auto=format&fit=crop&q=80',
    category: 'Deportes',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Kickboxing Mundial', start: '09:00', end: '11:00' },
      { title: 'Boxeo de Campeonato Mundial', start: '11:00', end: '13:30' },
      { title: 'Jiu-Jitsu Pro Invitational', start: '13:30', end: '15:00' },
      { title: 'Knockouts de la Década', start: '15:00', end: '17:00' },
    ],
  },
  {
    id: 'ch-6',
    name: 'Golf & Tennis Plus',
    logo_url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&auto=format&fit=crop&q=80',
    category: 'Deportes',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'PGA Tour: Ronda Final', start: '08:30', end: '11:30' },
      { title: 'Wimbledon Clásicos', start: '11:30', end: '13:30' },
      { title: 'ATP Masters Series', start: '13:30', end: '16:00' },
      { title: 'Academia de Golf', start: '16:00', end: '17:30' },
    ],
  },
  {
    id: 'ch-7',
    name: 'Deportes Extremos TV',
    logo_url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=300&auto=format&fit=crop&q=80',
    category: 'Deportes',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'X-Games Verano', start: '09:00', end: '11:00' },
      { title: 'Surf Gigante en Nazaret', start: '11:00', end: '13:00' },
      { title: 'Downhill en Los Alpes', start: '13:00', end: '15:00' },
      { title: 'Paracaidismo Wingsuit', start: '15:00', end: '17:00' },
    ],
  },

  // --- NOTICIAS (8-13) ---
  {
    id: 'ch-8',
    name: 'Magis News 24 Horas',
    logo_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=80',
    category: 'Noticias',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'El Noticiero de la Mañana', start: '06:00', end: '09:00' },
      { title: 'Al Día: Economía y Mercados', start: '09:00', end: '12:00' },
      { title: 'Edición Central de Noticias', start: '12:00', end: '14:30' },
      { title: 'Mesa de Debate Global', start: '14:30', end: '17:00' },
    ],
  },
  {
    id: 'ch-9',
    name: 'Global Informa Directo',
    logo_url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=300&auto=format&fit=crop&q=80',
    category: 'Noticias',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'Titulares Internacionales', start: '08:00', end: '10:00' },
      { title: 'Enfoque Geopolítico', start: '10:00', end: '12:00' },
      { title: 'Reporte del Clima Mundial', start: '12:00', end: '13:30' },
      { title: 'Noticias de América y Europa', start: '13:30', end: '16:00' },
    ],
  },
  {
    id: 'ch-10',
    name: 'EcoMundo Finanzas',
    logo_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&auto=format&fit=crop&q=80',
    category: 'Noticias',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'Apertura de Wall Street', start: '09:00', end: '11:00' },
      { title: 'Criptomonedas y Tecnologías', start: '11:00', end: '13:00' },
      { title: 'Cierre de Mercados Bursátiles', start: '13:00', end: '15:30' },
      { title: 'Estrategias de Inversión', start: '15:30', end: '17:00' },
    ],
  },
  {
    id: 'ch-11',
    name: 'Planeta Hoy Noticias',
    logo_url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&auto=format&fit=crop&q=80',
    category: 'Noticias',
    stream_url: HLS_STREAMS[3],
    epg: [
      { title: 'Primera Plana', start: '07:30', end: '09:30' },
      { title: 'Entrevistas a Fondo', start: '09:30', end: '11:30' },
      { title: 'Corresponsalías en Vivo', start: '11:30', end: '14:00' },
      { title: 'Resumen Nocturno 360', start: '14:00', end: '16:30' },
    ],
  },
  {
    id: 'ch-12',
    name: 'TecnoNoticias Hoy',
    logo_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&auto=format&fit=crop&q=80',
    category: 'Noticias',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'IA y el Futuro Digital', start: '09:00', end: '10:30' },
      { title: 'Gadgets y Lanzamientos', start: '10:30', end: '12:00' },
      { title: 'Ciberseguridad en la Nube', start: '12:00', end: '14:00' },
      { title: 'Mundo Startup Global', start: '14:00', end: '16:00' },
    ],
  },
  {
    id: 'ch-13',
    name: 'Tribuna Política TV',
    logo_url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=300&auto=format&fit=crop&q=80',
    category: 'Noticias',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'Debate en el Parlamento', start: '08:00', end: '10:30' },
      { title: 'Voces de la Oposición', start: '10:30', end: '12:30' },
      { title: 'Análisis Electoral Especial', start: '12:30', end: '15:00' },
      { title: 'Mesa Redonda Semanal', start: '15:00', end: '17:00' },
    ],
  },

  // --- CINE (14-20) ---
  {
    id: 'ch-14',
    name: 'Cinema Premiere HD',
    logo_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&auto=format&fit=crop&q=80',
    category: 'Cine',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Taquillazo: Misión Sombra', start: '08:00', end: '10:15' },
      { title: 'Cine de Acción: Furia Asfáltica', start: '10:15', end: '12:30' },
      { title: 'Estreno Exclusivo de Hollywood', start: '12:30', end: '15:00' },
      { title: 'Suspense en la Niebla', start: '15:00', end: '17:15' },
    ],
  },
  {
    id: 'ch-15',
    name: 'Cine Clásico de Oro',
    logo_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&auto=format&fit=crop&q=80',
    category: 'Cine',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'Joyas del Cine Negro (1950)', start: '09:00', end: '11:00' },
      { title: 'Comedias de Época Remasterizadas', start: '11:00', end: '13:00' },
      { title: 'Grandes Westerns Clásicos', start: '13:00', end: '15:30' },
      { title: 'Homenaje a directores legendarios', start: '15:30', end: '18:00' },
    ],
  },
  {
    id: 'ch-16',
    name: 'Acción Extrema Cinema',
    logo_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80',
    category: 'Cine',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'Persecución a 300 km/h', start: '07:30', end: '09:45' },
      { title: 'Comando Sin Fronteras', start: '09:45', end: '12:00' },
      { title: 'El Vengador Solitario', start: '12:00', end: '14:15' },
      { title: 'Guerra en el Búnker', start: '14:15', end: '16:30' },
    ],
  },
  {
    id: 'ch-17',
    name: 'Sci-Fi Cosmos Cinema',
    logo_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80',
    category: 'Cine',
    stream_url: HLS_STREAMS[3],
    epg: [
      { title: 'Interestelar: Nuevas Fronteras', start: '08:00', end: '11:00' },
      { title: 'Rebelión en Marte 2100', start: '11:00', end: '13:15' },
      { title: 'La Paradoja del Tiempo', start: '13:15', end: '15:30' },
      { title: 'Contacto con Andrómeda', start: '15:30', end: '18:00' },
    ],
  },
  {
    id: 'ch-18',
    name: 'Terror Oscuro TV',
    logo_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80',
    category: 'Cine',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'La Casa en el Bosque', start: '09:00', end: '11:00' },
      { title: 'Posesión a Medianoche', start: '11:00', end: '13:00' },
      { title: 'Pesadilla en la Cripta', start: '13:00', end: '15:00' },
      { title: 'Susurros en la Oscuridad', start: '15:00', end: '17:00' },
    ],
  },
  {
    id: 'ch-19',
    name: 'Romance & Comedia TV',
    logo_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&auto=format&fit=crop&q=80',
    category: 'Cine',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'Amor en la Gran Ciudad', start: '08:30', end: '10:30' },
      { title: 'Boda por Accidente', start: '10:30', end: '12:30' },
      { title: 'Cita a Ciegas en París', start: '12:30', end: '14:30' },
      { title: 'Tres Amigos y un Destino', start: '14:30', end: '16:45' },
    ],
  },
  {
    id: 'ch-20',
    name: 'Cine de Culto Independiente',
    logo_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80',
    category: 'Cine',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'Festival de Cine Nórdico', start: '09:00', end: '11:15' },
      { title: 'Sombras en la Granja', start: '11:15', end: '13:30' },
      { title: 'Retrato de un Poeta Perdido', start: '13:30', end: '15:45' },
      { title: 'Cine Surrealista Contemporáneo', start: '15:45', end: '18:00' },
    ],
  },

  // --- SERIES (21-26) ---
  {
    id: 'ch-21',
    name: 'Magis Series Max',
    logo_url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=80',
    category: 'Series',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'El Cartel del Silicio - Cap 1 y 2', start: '08:00', end: '10:00' },
      { title: 'Detectives del Bronce - T1', start: '10:00', end: '12:00' },
      { title: 'Maratón: Reinos Caídos', start: '12:00', end: '15:00' },
      { title: 'Código de Ley: Episodio Final', start: '15:00', end: '17:00' },
    ],
  },
  {
    id: 'ch-22',
    name: 'Drama & Misterio Series',
    logo_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&auto=format&fit=crop&q=80',
    category: 'Series',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'El Crimen de la Ribera', start: '09:00', end: '11:00' },
      { title: 'Secretos de Familia T2', start: '11:00', end: '13:00' },
      { title: 'El Médico Forense - Cap 8', start: '13:00', end: '14:30' },
      { title: 'Caso Abierto: Capítulo Especial', start: '14:30', end: '16:30' },
    ],
  },
  {
    id: 'ch-23',
    name: 'Comedia & Sitcoms TV',
    logo_url: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=300&auto=format&fit=crop&q=80',
    category: 'Series',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'Vecinos Ruidosos T3', start: '08:30', end: '10:30' },
      { title: 'Oficina de Locos - Maratón', start: '10:30', end: '13:00' },
      { title: 'Los Compañeros de Piso', start: '13:00', end: '15:00' },
      { title: 'Familia a la Carta', start: '15:00', end: '17:00' },
    ],
  },
  {
    id: 'ch-24',
    name: 'Fantasía & Tronos TV',
    logo_url: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=300&auto=format&fit=crop&q=80',
    category: 'Series',
    stream_url: HLS_STREAMS[3],
    epg: [
      { title: 'La Espada del Invierno Cap 5', start: '09:00', end: '11:00' },
      { title: 'Guerra de Clanes T1', start: '11:00', end: '13:30' },
      { title: 'Misterios de la Ciudadela', start: '13:30', end: '15:30' },
      { title: 'Los Dragones del Valle', start: '15:30', end: '17:30' },
    ],
  },
  {
    id: 'ch-25',
    name: 'Hospital General Drama',
    logo_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80',
    category: 'Series',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Cirujanos de Urgencias', start: '08:00', end: '10:00' },
      { title: 'Diagnóstico Límite T4', start: '10:00', end: '12:30' },
      { title: 'Turno de Noche en Houston', start: '12:30', end: '14:30' },
      { title: 'Terapia Intensiva - Cap 12', start: '14:30', end: '16:30' },
    ],
  },
  {
    id: 'ch-26',
    name: 'Anime & Animación Series',
    logo_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80',
    category: 'Series',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'Guerrero Shinobi T1', start: '09:00', end: '11:00' },
      { title: 'Titanes del Espacio', start: '11:00', end: '13:00' },
      { title: 'Torneo de Artes Marciales Z', start: '13:00', end: '15:00' },
      { title: 'Alquimia Prohibida Cap 20', start: '15:00', end: '17:00' },
    ],
  },

  // --- INFANTIL (27-31) ---
  {
    id: 'ch-27',
    name: 'Magis Kids Toons',
    logo_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80',
    category: 'Infantil',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'La Patrulla del Parque', start: '07:00', end: '09:00' },
      { title: 'Aventuras en el Fondo del Mar', start: '09:00', end: '11:30' },
      { title: 'El Club de los Cachorros', start: '11:30', end: '13:30' },
      { title: 'Historias Mágicas de Buenas Noches', start: '13:30', end: '15:30' },
    ],
  },
  {
    id: 'ch-28',
    name: 'Mundo Junior Educativo',
    logo_url: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=300&auto=format&fit=crop&q=80',
    category: 'Infantil',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'Aprende los Números con Dino', start: '08:00', end: '10:00' },
      { title: 'Ciencia Divertida para Niños', start: '10:00', end: '12:00' },
      { title: 'Cantajuegos con el Robot Leo', start: '12:00', end: '14:00' },
      { title: 'Arte y Colores en Casa', start: '14:00', end: '16:00' },
    ],
  },
  {
    id: 'ch-29',
    name: 'Animación Clásica TV',
    logo_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
    category: 'Infantil',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'Persecuciones y Travesuras', start: '09:00', end: '11:00' },
      { title: 'El Pato Travieso y sus Amigos', start: '11:00', end: '13:00' },
      { title: 'Cuentos de Hadas Tradicionales', start: '13:00', end: '15:00' },
      { title: 'El Show del Gato y el Ratón', start: '15:00', end: '17:00' },
    ],
  },
  {
    id: 'ch-30',
    name: 'Fantasía Disney & Pixar Fan',
    logo_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80',
    category: 'Infantil',
    stream_url: HLS_STREAMS[3],
    epg: [
      { title: 'Aventuras en el Espacio de Juguetes', start: '08:30', end: '10:30' },
      { title: 'El Monstruo Amigable de la Puerta', start: '10:30', end: '12:30' },
      { title: 'En Busca del Pececillo Payaso', start: '12:30', end: '14:30' },
      { title: 'La Reina del Hielo y la Canción', start: '14:30', end: '16:45' },
    ],
  },
  {
    id: 'ch-31',
    name: 'Bebé & Descubrimiento',
    logo_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&auto=format&fit=crop&q=80',
    category: 'Infantil',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Música Relajante para Dormir', start: '07:00', end: '09:00' },
      { title: 'Figuras y Sonidos del Bosque', start: '09:00', end: '11:00' },
      { title: 'Los Animales de la Granja', start: '11:00', end: '13:00' },
      { title: 'Hora de la Canción Infantil', start: '13:00', end: '15:00' },
    ],
  },

  // --- MÚSICA (32-36) ---
  {
    id: 'ch-32',
    name: 'Magis Hits Urban & Pop',
    logo_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
    category: 'Música',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Top 40 Éxitos Globales', start: '08:00', end: '10:30' },
      { title: 'Ritmo Latino: Reggaetón y Trap', start: '10:30', end: '13:00' },
      { title: 'Lo Más Nuevo en Tendencia', start: '13:00', end: '15:00' },
      { title: 'Conciertos Acústicos Exclusivos', start: '15:00', end: '17:30' },
    ],
  },
  {
    id: 'ch-33',
    name: 'Rock & Metal Clásico',
    logo_url: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=80',
    category: 'Música',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'Leyendas del Rock de los 80', start: '09:00', end: '11:30' },
      { title: 'Baladas de Guitarra Épicas', start: '11:30', end: '13:30' },
      { title: 'Heavy Metal Festivales en Vivo', start: '13:30', end: '16:00' },
      { title: 'Maratón Grunge y Alternativo', start: '16:00', end: '18:00' },
    ],
  },
  {
    id: 'ch-34',
    name: 'Electro & Dance Festival',
    logo_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
    category: 'Música',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'Tomorrow Music Sets Directo', start: '10:00', end: '13:00' },
      { title: 'Sesiones de Ibiza al Atardecer', start: '13:00', end: '15:30' },
      { title: 'House Progresivo & Deep', start: '15:30', end: '18:00' },
      { title: 'Top DJs del Mundo', start: '18:00', end: '20:30' },
    ],
  },
  {
    id: 'ch-35',
    name: 'Jazz & Lo-Fi Lounge',
    logo_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
    category: 'Música',
    stream_url: HLS_STREAMS[3],
    epg: [
      { title: 'Café & Lo-Fi Beats Matutino', start: '08:00', end: '11:00' },
      { title: 'Blue Note Clásicos del Jazz', start: '11:00', end: '13:30' },
      { title: 'Piano Suave para Trabajar', start: '13:30', end: '16:00' },
      { title: 'Noche de Saxofón y Bossa Nova', start: '16:00', end: '18:30' },
    ],
  },
  {
    id: 'ch-36',
    name: 'Salsa & Cumbia Tropical',
    logo_url: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=300&auto=format&fit=crop&q=80',
    category: 'Música',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Clásicos de la Fania All-Stars', start: '09:00', end: '11:30' },
      { title: 'Cumbia Sabrosa para Bailar', start: '11:30', end: '14:00' },
      { title: 'Salsa Romántica de Ayer y Hoy', start: '14:00', end: '16:30' },
      { title: 'Fiesta Caribeña en Vivo', start: '16:30', end: '19:00' },
    ],
  },

  // --- DOCUMENTAL (37-42) ---
  {
    id: 'ch-37',
    name: 'BioPlaneta Salvaje TV',
    logo_url: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=300&auto=format&fit=crop&q=80',
    category: 'Documental',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Depredadores de la Sabana', start: '08:00', end: '10:00' },
      { title: 'Secretos del Océano Profundo', start: '10:00', end: '12:30' },
      { title: 'La Migración de las Aves Árticas', start: '12:30', end: '14:30' },
      { title: 'En el Reino de los Gorilas', start: '14:30', end: '17:00' },
    ],
  },
  {
    id: 'ch-38',
    name: 'Cosmos & Universo 4K',
    logo_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80',
    category: 'Documental',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'El Big Bang y los Agujeros Negros', start: '09:00', end: '11:15' },
      { title: 'Telescopio James Webb: Fotos Nuevas', start: '11:15', end: '13:00' },
      { title: 'La Colonización de Marte', start: '13:00', end: '15:15' },
      { title: 'Física Cuántica al Límite', start: '15:15', end: '17:30' },
    ],
  },
  {
    id: 'ch-39',
    name: 'Historia Antigua & Misterios',
    logo_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80',
    category: 'Documental',
    stream_url: HLS_STREAMS[2],
    epg: [
      { title: 'Las Pirámides de Egipto Reveladas', start: '08:30', end: '10:45' },
      { title: 'El Imperio Romano en Guerra', start: '10:45', end: '13:00' },
      { title: 'Misterios de la Atlántida', start: '13:00', end: '15:15' },
      { title: 'Ciudades Mayas bajo la Selva', start: '15:15', end: '17:45' },
    ],
  },
  {
    id: 'ch-40',
    name: 'TecnoFronteras Futuro',
    logo_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&auto=format&fit=crop&q=80',
    category: 'Documental',
    stream_url: HLS_STREAMS[3],
    epg: [
      { title: 'Mega-Ingeniería: Puentes y Presas', start: '09:00', end: '11:00' },
      { title: 'Energía de Fusión Nuclear', start: '11:00', end: '13:00' },
      { title: 'Robots Humanoides en Fábricas', start: '13:00', end: '15:00' },
      { title: 'El Futuro de la Medicina Genómica', start: '15:00', end: '17:00' },
    ],
  },
  {
    id: 'ch-41',
    name: 'Crimen & Investigación Real',
    logo_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80',
    category: 'Documental',
    stream_url: HLS_STREAMS[0],
    epg: [
      { title: 'Archivos Forenses del FBI', start: '08:00', end: '10:00' },
      { title: 'El Caso del Ladrón de Guante Blanco', start: '10:00', end: '12:00' },
      { title: 'Evidencia Inesperada Cap 4', start: '12:00', end: '14:00' },
      { title: 'Grandes Juicios de la Historia', start: '14:00', end: '16:30' },
    ],
  },
  {
    id: 'ch-42',
    name: 'Expediciones & Viajes 360',
    logo_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&auto=format&fit=crop&q=80',
    category: 'Documental',
    stream_url: HLS_STREAMS[1],
    epg: [
      { title: 'Travesía por la Patagonia Helada', start: '09:00', end: '11:30' },
      { title: 'Pueblos Ocultos de Japón', start: '11:30', end: '13:45' },
      { title: 'Ruta de la Seda en Tren', start: '13:45', end: '16:00' },
      { title: 'Santuarios del Amazonas', start: '16:00', end: '18:15' },
    ],
  },
];
