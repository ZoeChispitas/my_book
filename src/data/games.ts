export type GameGenre = 
  | 'Open World' 
  | 'RPG' 
  | 'Acción' 
  | 'Sigilo' 
  | 'Indie' 
  | 'Survival' 
  | 'Carreras' 
  | 'Terror' 
  | 'Estrategia' 
  | 'Shooter' 
  | 'Aventura' 
  | 'Plataformas';

export interface Game {
  id: string;
  title: string;
  tagline: string;
  developer: string;
  year: number;
  genre: GameGenre;
  platforms: ('PC' | 'PS5' | 'Xbox' | 'Switch')[];
  wantedStars: 1 | 2 | 3 | 4 | 5;
  score: string; // e.g. "10 / 10"
  hoursPlayed: string; // e.g. "480 hrs"
  coverImage: string;
  bannerImage: string;
  verdict: string;
  chebgReview: string;
  highlights: string[];
  favoriteFeature: string;
  youtubeId: string;
  badge?: string; // 'GOAT' | 'MUST PLAY' | 'TOP 1' | '100% PLATINUM' | 'RECOMMENDED'
}

export const CHEBG_GAMES: Game[] = [
  {
    id: 'red-dead-2',
    title: 'Red Dead Redemption 2',
    tagline: 'Una tragedia del salvaje oeste con los mejores detalles jamás creados.',
    developer: 'Rockstar Games',
    year: 2018,
    genre: 'Open World',
    platforms: ['PC', 'PS5', 'Xbox'],
    wantedStars: 5,
    score: '10 / 10',
    hoursPlayed: '480 hrs',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    verdict: 'Arthur Morgan es el personaje mejor escrito en la historia del gaming.',
    chebgReview: 'Ningún otro juego me ha hecho sentir tan inmerso en la naturaleza salvaje. Cabalgar por las montañas cubiertas de nieve, acampar bajo las estrellas y vivir la historia es puro cine interactivo.',
    highlights: [
      'Ecosistema inmersivo de fauna y clima dinámico',
      'Desarrollo narrativo de Arthur Morgan inolvidable',
      'Físicas Euphoria de combate y tiroteos realistas',
      'Detalles diminutos que sorprenden incluso tras 400 horas'
    ],
    favoriteFeature: 'Cazar en las montañas y las conversaciones en el campamento',
    youtubeId: 'eaW0tYxi5rg',
    badge: 'GOAT'
  }
];

export const SAMPLE_GOAT_PRESETS: Game[] = [
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    tagline: 'Una obra maestra de exploración y desafíos brutales en las Tierras Intermedias.',
    developer: 'FromSoftware',
    year: 2022,
    genre: 'RPG',
    platforms: ['PC', 'PS5', 'Xbox'],
    wantedStars: 5,
    score: '10 / 10',
    hoursPlayed: '250 hrs',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop',
    verdict: 'El mejor diseño de mundo abierto en la historia de los RPGs.',
    chebgReview: 'Un mundo gigante lleno de secretos donde la libertad es total y cada jefe derrotado se siente como una victoria épica.',
    highlights: ['Mundo abierto orgánico', 'Combate refinado', 'Diseño de jefes legendario'],
    favoriteFeature: 'Explorar las Tierras Intermedias sin marcadores molestos',
    youtubeId: 'E3Huy2cdih0',
    badge: 'GOAT'
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    tagline: 'Una ciudad distópica donde la tecnología y el peligro se cruzan en cada esquina.',
    developer: 'CD Projekt RED',
    year: 2023,
    genre: 'Open World',
    platforms: ['PC', 'PS5', 'Xbox'],
    wantedStars: 5,
    score: '10 / 10',
    hoursPlayed: '180 hrs',
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1200&auto=format&fit=crop',
    verdict: 'Night City es la ciudad más impresionante visualmente.',
    chebgReview: 'La atmósfera nocturna con luces neón y la banda sonora hacen que recorrer Night City en moto sea una experiencia única.',
    highlights: ['Gráficos neón deslumbrantes', 'Misiones secundarias memorables', 'Banda sonora increíble'],
    favoriteFeature: 'Conducir de noche por Night City',
    youtubeId: 'vjF9GgrY9c0',
    badge: 'MUST PLAY'
  },
  {
    id: 'god-of-war-rag',
    title: 'God of War Ragnarök',
    tagline: 'Kratos y Atreus enfrentan el destino de los nueve reinos mitológicos.',
    developer: 'Santa Monica Studio',
    year: 2022,
    genre: 'Acción',
    platforms: ['PC', 'PS5'],
    wantedStars: 5,
    score: '10 / 10',
    hoursPlayed: '95 hrs',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    verdict: 'Combate visceral con una narrativa emocional de padre e hijo.',
    chebgReview: 'La evolución de la relación entre Kratos y Atreus combinada con el hacha Leviatán hace de cada batalla un espectáculo de acción.',
    highlights: ['Combate visceral y contundente', 'Graficazos en PS5/PC', 'Mitología nórdica épica'],
    favoriteFeature: 'Lanzar y llamar de vuelta el hacha Leviatán',
    youtubeId: 'hfJ4Km46A-0',
    badge: 'TOP 1'
  }
];

export interface GamerProfile {
  name: string;
  role: string;
  location: string;
  favoriteGenre: string;
  completionRate: string;
  specialAchievement: string;
}

export const DEFAULT_PROFILE: GamerProfile = {
  name: 'CHEBG',
  role: 'Pro Gamer & Video Game Curator',
  location: 'Pro Gaming Setup',
  favoriteGenre: 'Open World & RPGs',
  completionRate: '0%',
  specialAchievement: 'DINOBOBO'
};
