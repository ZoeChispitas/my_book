import type { Game } from '../data/games';

// Utility helper to extract YouTube ID from raw URLs or ID
export const extractYoutubeId = (input: string): string => {
  if (!input) return '';
  const trimmed = input.trim();

  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  const shortMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  const embedMatch = trimmed.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  const shortsMatch = trimmed.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  if (trimmed.length === 11) return trimmed;

  return trimmed;
};

// Helper to convert File object to Data URL
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Automatic Calculator for Total Hours Played across all games
export const calculateTotalHours = (games: Game[]): string => {
  if (!games || games.length === 0) return '0 hrs';

  let totalNum = 0;
  games.forEach(g => {
    if (!g.hoursPlayed) return;
    // Extract first continuous numeric sequence
    const match = g.hoursPlayed.match(/(\d[\d,.]*)/);
    if (match && match[1]) {
      const cleaned = match[1].replace(/,/g, '');
      const val = parseFloat(cleaned);
      if (!isNaN(val)) {
        totalNum += val;
      }
    }
  });

  if (totalNum === 0) return '0 hrs';
  return `${totalNum.toLocaleString('en-US')} hrs`;
};
