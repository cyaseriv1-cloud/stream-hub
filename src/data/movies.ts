export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  poster_url: string;
  video_url: string;
  duration: string;
  description: string;
}

const VIDEO_STREAMS = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
];

export const movies: Movie[] = [
  // --- ACCIÓN (1-10) ---
  {
    id: 'mov-1',
    title: 'Misión Rescate: Extracción',
    year: 2024,
    genre: ['Acción', 'Suspense'],
    poster_url: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '2h 02m',
    description: 'Un mercenario de operaciones encubiertas se adentra en una prisión de máxima seguridad para rescatar a la familia de un capo internacional.'
  },
  {
    id: 'mov-2',
    title: 'Velocidad Terminal: Redline',
    year: 2023,
    genre: ['Acción', 'Carreras'],
    poster_url: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    video_url: VIDEO_STREAMS[5],
    duration: '1h 58m',
    description: 'Corredores clandestinos modifican hiperdeportivos para un torneo sin reglas a través de autopistas intercontinentales.'
  },
  {
    id: 'mov-3',
    title: 'El Último Centinela',
    year: 2023,
    genre: ['Acción', 'Ciencia Ficción'],
    poster_url: 'https://image.tmdb.org/t/p/w500/AcoVfivMs8HGmF94yrlvE9xPmsf.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '2h 15m',
    description: 'En un puesto de avanzada en un mar devastado por el cambio climático, cuatro soldados aguardan refuerzos que jamás llegan.'
  },
  {
    id: 'mov-4',
    title: 'Operación Halcón de Acero',
    year: 2024,
    genre: ['Acción', 'Bélico'],
    poster_url: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '2h 10m',
    description: 'Pilotos de combate élite ejecutan una peligrosa misión tras las líneas enemigas para desactivar una ojiva cibernética.'
  },
  {
    id: 'mov-5',
    title: 'Venganza en la Niebla',
    year: 2022,
    genre: ['Acción', 'Drama'],
    poster_url: 'https://image.tmdb.org/t/p/w500/qA5kPY0debq59HwI2L77i4Wn2i7.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '1h 48m',
    description: 'Un ex-agente de inteligencia busca justicia cuando su familia es víctima colateral de un cártel transnacional.'
  },
  {
    id: 'mov-6',
    title: 'Asedio en el Rascacielos',
    year: 2023,
    genre: ['Acción'],
    poster_url: 'https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
    video_url: VIDEO_STREAMS[5],
    duration: '1h 52m',
    description: 'Un consultor de seguridad queda atrapado en el piso 90 cuando terroristas toman el edificio financiero más alto de la ciudad.'
  },
  {
    id: 'mov-7',
    title: 'Guerra Urbana: Distrito Cero',
    year: 2024,
    genre: ['Acción', 'Crimen'],
    poster_url: 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '2h 05m',
    description: 'Fuerzas especiales y pandillas territoriales se enfrentan por el control de los suministros energéticos subterráneos.'
  },
  {
    id: 'mov-8',
    title: 'Furia Samurai: El Filo Eterno',
    year: 2023,
    genre: ['Acción', 'Aventura'],
    poster_url: 'https://image.tmdb.org/t/p/w500/8tABSwvGhgG5S9z0Q552C9F8g9c.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '2h 14m',
    description: 'Un guerrero ronin recorre el Japón feudal protegiendo a una niña que guarda el mapa de la forja sagrada.'
  },
  {
    id: 'mov-9',
    title: 'Cazador de Sombras',
    year: 2022,
    genre: ['Acción', 'Suspense'],
    poster_url: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN2Ydgii51xQ.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '1h 55m',
    description: 'Un detective implacable persigue a un asesino a sueldo que no deja rastro digital ni evidencia forense.'
  },
  {
    id: 'mov-10',
    title: 'Protocolo de Emergencia',
    year: 2024,
    genre: ['Acción', 'Ciencia Ficción'],
    poster_url: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '1h 59m',
    description: 'Cuando la red eléctrica mundial se apaga repentinamente, un grupo táctico debe evitar la anarquía generalizada.'
  },

  // --- CIENCIA FICCIÓN (11-20) ---
  {
    id: 'mov-11',
    title: 'Crónicas de Neón: 2099',
    year: 2024,
    genre: ['Ciencia Ficción', 'Acción'],
    poster_url: 'https://image.tmdb.org/t/p/w500/5v6ioeW8eW1N2vj5g5H6zF7x3B0.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '2h 20m',
    description: 'En una megalópolis gobernada por corporaciones sintéticas, un hacker implanta un virus libertario en la red neural matriz.'
  },
  {
    id: 'mov-12',
    title: 'El Horizonte de Andrómeda',
    year: 2023,
    genre: ['Ciencia Ficción', 'Aventura'],
    poster_url: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '2h 35m',
    description: 'Una expedición científica viaja a través de un agujero de gusano para encontrar un nuevo hogar para la humanidad.'
  },
  {
    id: 'mov-13',
    title: 'Paradoja Cuántica',
    year: 2022,
    genre: ['Ciencia Ficción', 'Suspense'],
    poster_url: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '1h 50m',
    description: 'Físicos de partículas abren una grieta temporal accidental que provoca la superposición de dos realidades paralelas.'
  },
  {
    id: 'mov-14',
    title: 'Cyborg: Rebelión Cero',
    year: 2023,
    genre: ['Ciencia Ficción', 'Acción'],
    poster_url: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    video_url: VIDEO_STREAMS[5],
    duration: '2h 04m',
    description: 'Androides con conciencia emocional se rebelan contra la fábrica central que planea desmantelar sus núcleos.'
  },
  {
    id: 'mov-15',
    title: 'Estación Orbital Kepler',
    year: 2024,
    genre: ['Ciencia Ficción', 'Drama'],
    poster_url: 'https://image.tmdb.org/t/p/w500/8UlWqwvg5SD9is9vbfL8fB6Qum.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '2h 08m',
    description: 'Tres astronautas aislados en la órbita de Júpiter deben tomar una decisión irreversible cuando pierden contacto con la Tierra.'
  },
  {
    id: 'mov-16',
    title: 'Memoria Sintética',
    year: 2023,
    genre: ['Ciencia Ficción', 'Misterio'],
    poster_url: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '1h 45m',
    description: 'Un diseñador de recuerdos descubre que sus propios recuerdos de infancia pertenecen en realidad a un fugitivo peligroso.'
  },
  {
    id: 'mov-17',
    title: 'El Cielo de Cristal',
    year: 2024,
    genre: ['Ciencia Ficción'],
    poster_url: 'https://image.tmdb.org/t/p/w500/A309hJ358y0Q4z16sW53d8A0E4.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '1h 55m',
    description: 'Bajo una cúpula que protege a la última ciudad de la radiación solar, una joven ingeniera descubre que el exterior es habitable.'
  },
  {
    id: 'mov-18',
    title: 'Invasión: Frecuencia Cero',
    year: 2022,
    genre: ['Ciencia Ficción', 'Terror'],
    poster_url: 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '1h 42m',
    description: 'Señales acústicas no identificadas emitidas desde las profundidades del Atlántico empiezan a controlar a las ballenas y barcos.'
  },
  {
    id: 'mov-19',
    title: 'El Último Humano Puro',
    year: 2023,
    genre: ['Ciencia Ficción', 'Drama'],
    poster_url: 'https://image.tmdb.org/t/p/w500/eShw0EVqnOXvxIKOBnxLGW7q5vS.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '2h 12m',
    description: 'En un mundo de humanos biológicamente modificados, el último hombre sin alteraciones genéticas busca su identidad.'
  },
  {
    id: 'mov-20',
    title: 'Vórtice Galáctico',
    year: 2024,
    genre: ['Ciencia Ficción', 'Aventura'],
    poster_url: 'https://image.tmdb.org/t/p/w500/qNBAXRsQ4vMuzr3d5t7Z3u86f2b.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '2h 18m',
    description: 'Navegantes espaciales cartografían las corrientes electromagnéticas de una nebulosa inestable rica en materia oscura.'
  },

  // --- COMEDIA (21-30) ---
  {
    id: 'mov-21',
    title: 'Vacaciones de Locos',
    year: 2023,
    genre: ['Comedia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/4n8QNNdk4Rg9OPn9u5cv7vYl9j8.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 35m',
    description: 'Una familia común gana un viaje con todos los gastos pagados a una isla paradisíaca que resulta estar en medio de un reality absurdo.'
  },
  {
    id: 'mov-22',
    title: 'Espías por Accidente',
    year: 2024,
    genre: ['Comedia', 'Acción'],
    poster_url: 'https://image.tmdb.org/t/p/w500/8G5eH99t9xR15fU2z3h0A1W4Q.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 44m',
    description: 'Dos profesores de secundaria son confundidos con agentes encubiertos de la Interpol durante una excursión escolar en Roma.'
  },
  {
    id: 'mov-23',
    title: 'Boda a Todo Caos',
    year: 2023,
    genre: ['Comedia', 'Romance'],
    poster_url: 'https://image.tmdb.org/t/p/w500/1X7vQ4z4zT5N8yY9eQ0zV5k4M.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 38m',
    description: 'Los padrinos de boda pierden los anillos, el pastel y el coche de los novios horas antes de la ceremonia más elegante del año.'
  },
  {
    id: 'mov-24',
    title: 'El Chef Desastroso',
    year: 2022,
    genre: ['Comedia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/8tV9X0G1Y3A4Q2r1zZ6C9vB8N.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 32m',
    description: 'Un cocinero de comida rápida hereda un restaurante 3 estrellas Michelin y finge ser un prodigio de la gastronomía molecular.'
  },
  {
    id: 'mov-25',
    title: 'Terapia de Mascotas',
    year: 2024,
    genre: ['Comedia', 'Familiar'],
    poster_url: 'https://image.tmdb.org/t/p/w500/3kY5C1j7W2E8r4T0u9I5O8p3Q.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 30m',
    description: 'Un psicólogo estresado descubre que puede entender las quejas de los perros y gatos de sus vecinos.'
  },
  {
    id: 'mov-26',
    title: 'Detectives de Mentira',
    year: 2023,
    genre: ['Comedia', 'Misterio'],
    poster_url: 'https://image.tmdb.org/t/p/w500/5mG7o8T9v0A1b2C3d4E5f6G7h.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 42m',
    description: 'Dos fanáticos de podcasts de crímenes reales montan su propia agencia de detectives y tropiezan con un misterio millonario.'
  },
  {
    id: 'mov-27',
    title: 'El Club del Despido',
    year: 2022,
    genre: ['Comedia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/2L3k5J8H0G1F3D5S7A9Q1W4E.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 39m',
    description: 'Cuatro empleados despedidos el mismo día deciden montar su propia empresa rival trabajando en el garaje de su abuela.'
  },
  {
    id: 'mov-28',
    title: 'Vecinos al Ataque',
    year: 2024,
    genre: ['Comedia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/7gH8j9K0L1M2N3P4Q5R6S7T8U.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 36m',
    description: 'Una guerra vecinal por un límite de jardín escala hasta convertirse en un torneo de trampas caseras e inventos extravagantes.'
  },
  {
    id: 'mov-29',
    title: 'Flechazo en Manhattan',
    year: 2023,
    genre: ['Comedia', 'Romance'],
    poster_url: 'https://image.tmdb.org/t/p/w500/9xT1u2I3o4P5a6S7d8F9g0H1j.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 40m',
    description: 'Dos rivales inmobiliarios en Nueva York no saben que llevan meses enviándose cartas anónimas de amor por internet.'
  },
  {
    id: 'mov-30',
    title: 'Caza de Ofertas',
    year: 2024,
    genre: ['Comedia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/3jK4l5M6n7O8p9Q0r1S2t3U4v.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 28m',
    description: 'En el día del Black Friday más salvaje de la historia, compradores expertos compiten por el último televisor de 100 pulgadas.'
  },

  // --- DRAMA (31-40) ---
  {
    id: 'mov-31',
    title: 'El Susurro del Viento',
    year: 2023,
    genre: ['Drama'],
    poster_url: 'https://image.tmdb.org/t/p/w500/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '2h 10m',
    description: 'Un viejo guardián de faro y su nieta enfrentan el cambio generacional y las tormentas implacables en las costas de Bretaña.'
  },
  {
    id: 'mov-32',
    title: 'Cicatrices del Silencio',
    year: 2024,
    genre: ['Drama', 'Misterio'],
    poster_url: 'https://image.tmdb.org/t/p/w500/4m1Au3YkjqsxF8iwQy0fP9v0A.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '2h 05m',
    description: 'Un reconocido pianista pierde la audición tras un trágico accidente y debe redescubrir la música a través de las vibraciones.'
  },
  {
    id: 'mov-33',
    title: 'La Promesa de Otoño',
    year: 2022,
    genre: ['Drama', 'Romance'],
    poster_url: 'https://image.tmdb.org/t/p/w500/8YFLr09G5B1vC3z4D2E6F8a9.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '1h 58m',
    description: 'Dos jóvenes amantes separados por la guerra se prometen encontrarse exactamente 30 años después en el puente viejo de Praga.'
  },
  {
    id: 'mov-34',
    title: 'El Último Vuelo a Casa',
    year: 2023,
    genre: ['Drama', 'Aventura'],
    poster_url: 'https://image.tmdb.org/t/p/w500/2jH3k4L5M6n7O8p9Q0r1S2t.jpg',
    video_url: VIDEO_STREAMS[5],
    duration: '2h 02m',
    description: 'Un veterano piloto comercial realiza su último vuelo transatlántico en medio de una tormenta sin precedentes para ver nacer a su primer nieto.'
  },
  {
    id: 'mov-35',
    title: 'Bajo el Mismo Techo',
    year: 2024,
    genre: ['Drama'],
    poster_url: 'https://image.tmdb.org/t/p/w500/7aB8c9D0e1F2g3H4i5J6k7L.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '1h 50m',
    description: 'Tres generaciones de una familia deben convivir juntas tras la crisis de vivienda en un pequeño departamento de Madrid.'
  },
  {
    id: 'mov-36',
    title: 'Luz en la Mina',
    year: 2022,
    genre: ['Drama', 'Historia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/9mN0o1P2q3R4s5T6u7V8w9X.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '2h 15m',
    description: 'La conmovedora historia real de un grupo de mineros atrapados a 700 metros bajo tierra y su batalla por sobrevivir.'
  },
  {
    id: 'mov-37',
    title: 'El Heredero Olvidado',
    year: 2023,
    genre: ['Drama', 'Suspense'],
    poster_url: 'https://image.tmdb.org/t/p/w500/1pQ2r3S4t5U6v7W8x9Y0z1A.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '2h 00m',
    description: 'La lectura del testamento de un magnate naviero desata secretos familiares guardados durante medio siglo.'
  },
  {
    id: 'mov-38',
    title: 'Réquiem por un Sueño Dorado',
    year: 2024,
    genre: ['Drama'],
    poster_url: 'https://image.tmdb.org/t/p/w500/3bC4d5E6f7G8h9I0j1K2l3M.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '2h 18m',
    description: 'Una joven atleta de gimnasia artística desafía las lesiones y presiones de su entrenador para clasificar a los juegos mundiales.'
  },
  {
    id: 'mov-39',
    title: 'Cartas desde el Exilio',
    year: 2022,
    genre: ['Drama', 'Historia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/5nO6p7Q8r9S0t1U2v3W4x5Y.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '2h 04m',
    description: 'La correspondencia clandestina entre un profesor exiliado y sus alumnos revela la lucha por el libre pensamiento.'
  },
  {
    id: 'mov-40',
    title: 'El Eco de la Verdad',
    year: 2023,
    genre: ['Drama', 'Misterio'],
    poster_url: 'https://image.tmdb.org/t/p/w500/7zB8c9D0e1F2g3H4i5J6k7L.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '1h 56m',
    description: 'Una periodista independiente arriesga su carrera y seguridad al revelar el encubrimiento de un desastre ecológico.'
  },

  // --- TERROR (41-50) ---
  {
    id: 'mov-41',
    title: 'Susurros en la Cripta',
    year: 2024,
    genre: ['Terror', 'Misterio'],
    poster_url: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '1h 45m',
    description: 'Un equipo de arqueólogos desentierra un monasterio medieval sellado por el Vaticano en el año 1348.'
  },
  {
    id: 'mov-42',
    title: 'El Cuarto Oscuro',
    year: 2023,
    genre: ['Terror'],
    poster_url: 'https://image.tmdb.org/t/p/w500/bxiUXy4f4i0aG9Z6e4mK3vP1X.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '1h 38m',
    description: 'Un fotógrafo compra una cámara vintage en una venta de garaje y nota que en cada foto aparece una silueta cada vez más cerca.'
  },
  {
    id: 'mov-43',
    title: 'La Niebla del Lago Muerto',
    year: 2024,
    genre: ['Terror', 'Suspense'],
    poster_url: 'https://image.tmdb.org/t/p/w500/4X8Y9Z0a1B2C3D4E5F6g7H8i.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '1h 42m',
    description: 'Una espesa niebla cubre una cabaña en el bosque impidiendo a sus ocupantes salir mientras algo araña las paredes exteriores.'
  },
  {
    id: 'mov-44',
    title: 'Maldición en el Piso 13',
    year: 2022,
    genre: ['Terror'],
    poster_url: 'https://image.tmdb.org/t/p/w500/6jK7L8M9n0O1P2Q3R4s5T6u.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '1h 36m',
    description: 'Un ascensorista nocturno descubre por qué los botones del ascensor saltaban históricamente del piso 12 al 14.'
  },
  {
    id: 'mov-45',
    title: 'Ritual en el Pinar',
    year: 2023,
    genre: ['Terror', 'Misterio'],
    poster_url: 'https://image.tmdb.org/t/p/w500/8vW9X0y1Z2A3B4C5D6e7F8g.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '1h 48m',
    description: 'Científicos que estudian el comportamiento de los árboles en una reserva descubren una secta pagana oculta en las cavernas.'
  },
  {
    id: 'mov-46',
    title: 'La Muñeca de Porcelana',
    year: 2024,
    genre: ['Terror'],
    poster_url: 'https://image.tmdb.org/t/p/w500/1hI2J3k4L5M6n7O8p9Q0r1S.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '1h 34m',
    description: 'Una restauradora de antigüedades recibe un juguete de 1910 con una inscripción en latín que no debió ser leída en voz alta.'
  },
  {
    id: 'mov-47',
    title: 'Presencias en la Medianoche',
    year: 2023,
    genre: ['Terror', 'Suspense'],
    poster_url: 'https://image.tmdb.org/t/p/w500/3tU4v5W6x7Y8z9A0b1C2d3E.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '1h 40m',
    description: 'Una pareja que compra una mansión victoriana a precio de remate empieza a recibir llamadas telefónicas desde una línea cortada.'
  },
  {
    id: 'mov-48',
    title: 'El Sanatorio Abandonado',
    year: 2022,
    genre: ['Terror'],
    poster_url: 'https://image.tmdb.org/t/p/w500/5fG6h7I8j9K0L1M2n3O4p5Q.jpg',
    video_url: VIDEO_STREAMS[1],
    duration: '1h 46m',
    description: 'Exploradores urbanos transmiten en vivo desde un hospital psiquiátrico cerrado en 1970 y las puertas se bloquean solas.'
  },
  {
    id: 'mov-49',
    title: 'La Sombra bajo la Cama',
    year: 2024,
    genre: ['Terror'],
    poster_url: 'https://image.tmdb.org/t/p/w500/7rS8t9U0v1W2x3Y4z5A6b7C.jpg',
    video_url: VIDEO_STREAMS[2],
    duration: '1h 32m',
    description: 'Lo que los padres creían que era miedo infantil a la oscuridad resulta ser una entidad parasitaria real.'
  },
  {
    id: 'mov-50',
    title: 'Pesadilla en el Refugio',
    year: 2023,
    genre: ['Terror', 'Suspense'],
    poster_url: 'https://image.tmdb.org/t/p/w500/9dE0f1G2h3I4j5K6l7M8n9O.jpg',
    video_url: VIDEO_STREAMS[0],
    duration: '1h 44m',
    description: 'Refugiados en un búnker subterráneo durante una tormenta descubren que el verdadero peligro no está afuera.'
  },

  // --- ANIMACIÓN / INFANTIL (51-60) ---
  {
    id: 'mov-51',
    title: 'El Pequeño Gran Titán',
    year: 2024,
    genre: ['Animación', 'Aventura'],
    poster_url: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 36m',
    description: 'Un robot de reciclaje de apenas 30 centímetros despierta accidentalmente a un guardián gigante de piedra para salvar su bosque.'
  },
  {
    id: 'mov-52',
    title: 'Guardianes del Arrecife Coral',
    year: 2023,
    genre: ['Animación', 'Familiar'],
    poster_url: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 28m',
    description: 'Un caballito de mar tímido y una tortuga sabia deben recuperar la perla luminosa antes de que caiga la noche polar.'
  },
  {
    id: 'mov-53',
    title: 'Viaje a la Luna de Queso',
    year: 2024,
    genre: ['Animación', 'Comedia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/4n8QNNdk4Rg9OPn9u5cv7vYl9j8.jpg',
    video_url: VIDEO_STREAMS[4],
    duration: '1h 32m',
    description: 'Dos ratones inventores construyen un cohete de cartón para comprobar si las historias de su abuela sobre el espacio eran reales.'
  },
  {
    id: 'mov-54',
    title: 'El Dragón que Temía al Fuego',
    year: 2022,
    genre: ['Animación', 'Fantasía'],
    poster_url: 'https://image.tmdb.org/t/p/w500/AcoVfivMs8HGmF94yrlvE9xPmsf.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 35m',
    description: 'Dante es un dragón pacífico que prefiere cultivar flores en lugar de quemar castillos, hasta que su reino necesita ayuda.'
  },
  {
    id: 'mov-55',
    title: 'El Secreto del Valle Verde',
    year: 2023,
    genre: ['Animación', 'Aventura'],
    poster_url: 'https://image.tmdb.org/t/p/w500/5v6ioeW8eW1N2vj5g5H6zF7x3B0.jpg',
    video_url: VIDEO_STREAMS[4],
    duration: '1h 40m',
    description: 'Criaturas mágicas del bosque unen sus fuerzas para evitar que una máquina excavadora destruya su hogar milenario.'
  },
  {
    id: 'mov-56',
    title: 'Capitán Cometa y los Exploradores',
    year: 2024,
    genre: ['Animación', 'Ciencia Ficción'],
    poster_url: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 34m',
    description: 'Un escuadrón de animales astronautas viaja de planeta en planeta resolviendo acertijos para reactivar los faros estelares.'
  },
  {
    id: 'mov-57',
    title: 'Mundo Juguete: Misión Rescate',
    year: 2023,
    genre: ['Animación', 'Comedia'],
    poster_url: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    video_url: VIDEO_STREAMS[4],
    duration: '1h 30m',
    description: 'Cuando un osito de peluche cae por la ventana, los juguetes del ático inician una expedición por la gran ciudad.'
  },
  {
    id: 'mov-58',
    title: 'La Sinfonía de los Animales',
    year: 2022,
    genre: ['Animación', 'Familiar'],
    poster_url: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 26m',
    description: 'Un zorro director de orquesta recorre la selva reclutando pájaros, monos y ranas para el concierto del siglo.'
  },
  {
    id: 'mov-59',
    title: 'El Reino de las Nubes de Azúcar',
    year: 2024,
    genre: ['Animación', 'Fantasía'],
    poster_url: 'https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
    video_url: VIDEO_STREAMS[4],
    duration: '1h 33m',
    description: 'Dos hermanos descubren una escalera flotante que conduce a un archipiélago de nubes hechas de golosinas y algodón.'
  },
  {
    id: 'mov-60',
    title: 'Pistas de la Gran Aventura',
    year: 2023,
    genre: ['Animación', 'Aventura'],
    poster_url: 'https://image.tmdb.org/t/p/w500/qA5kPY0debq59HwI2L77i4Wn2i7.jpg',
    video_url: VIDEO_STREAMS[3],
    duration: '1h 38m',
    description: 'Un cachorro detective y su inseparable amigo el loro resuelven el misterio del mapa pirata escondido en el faro.'
  },
];
