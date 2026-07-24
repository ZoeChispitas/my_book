import type { Game, GamerProfile } from '../data/games';

// Render Web Service Live API URL
const API_BASE = import.meta.env.PUBLIC_API_URL || 'https://preferences-vault-api.onrender.com/api';

// Helper to fetch games from Render PostgreSQL DB (returns null if API server is offline)
export const fetchGamesFromAPI = async (): Promise<Game[] | null> => {
  try {
    const res = await fetch(`${API_BASE}/games`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data;
      }
    }
  } catch (e) {
    console.warn('API unavailable, using local storage fallback:', e);
  }
  return null;
};

// Helper to save a new game to API
export const saveGameToAPI = async (game: Game): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
    });
    return res.ok;
  } catch (e) {
    console.warn('Error saving game to API:', e);
    return false;
  }
};

// Helper to update a game on API
export const updateGameOnAPI = async (game: Game): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/games/${game.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
    });
    return res.ok;
  } catch (e) {
    console.warn('Error updating game on API:', e);
    return false;
  }
};

// Helper to delete a game from API
export const deleteGameFromAPI = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/games/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (e) {
    console.warn('Error deleting game from API:', e);
    return false;
  }
};

// Helper to fetch gamer profile from API
export const fetchProfileFromAPI = async (): Promise<GamerProfile | null> => {
  try {
    const res = await fetch(`${API_BASE}/profile`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.role) return data;
    }
  } catch (e) {
    console.warn('Error fetching profile from API:', e);
  }
  return null;
};

// Helper to save gamer profile to API
export const saveProfileToAPI = async (profile: GamerProfile): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    return res.ok;
  } catch (e) {
    console.warn('Error saving profile to API:', e);
    return false;
  }
};
