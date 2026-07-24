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
