import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Allow CORS from any origin for Cloudflare Pages frontend
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' })); // Support base64 image uploads

// Database Connection String
let connectionString = process.env.DATABASE_URL || 'postgresql://zoe_admin:0Vt5nnMTLbTawqLAac4bplHIhkztmslh@dpg-d9ht0004n6ts73bg4aug-a.virginia-postgres.render.com/preferences_vault';

// Ensure SSL and full host domain for Render external connections
if (!connectionString.includes('.render.com') && connectionString.includes('@dpg-')) {
  connectionString = connectionString.replace(/@([^/]+)\//, '@$1.virginia-postgres.render.com/');
}

console.log('Connecting to PostgreSQL database...');

const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize Tables
const initDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to Render PostgreSQL DB successfully!');

    // Games Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS games (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        tagline TEXT,
        developer VARCHAR(255),
        year INT,
        genre VARCHAR(100),
        score VARCHAR(50),
        badge VARCHAR(50),
        hours_played VARCHAR(100),
        cover_image TEXT,
        banner_image TEXT,
        verdict TEXT,
        chebg_review TEXT,
        youtube_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Profile Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id VARCHAR(50) PRIMARY KEY,
        role TEXT,
        location TEXT,
        favorite_genre TEXT,
        completion_rate TEXT,
        special_achievement TEXT
      );
    `);

    // Seed default profile if not exists
    await client.query(`
      INSERT INTO profile (id, role, location, favorite_genre, completion_rate, special_achievement)
      VALUES ('main', 'Pro Gamer & Video Game Curator', 'Pro Gaming Setup', 'Open World & RPGs', '0%', 'DINOBOBO')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Seed default game if games table is empty
    const checkGames = await client.query('SELECT COUNT(*) FROM games');
    if (parseInt(checkGames.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO games (id, title, tagline, developer, year, genre, score, badge, hours_played, cover_image, banner_image, verdict, chebg_review, youtube_id)
        VALUES (
          'red-dead-2',
          'Red Dead Redemption 2',
          'Una tragedia del salvaje oeste con los mejores detalles jamás creados.',
          'Rockstar Games',
          2018,
          'Open World',
          '10 / 10',
          'GOAT',
          '480 hrs',
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
          'Arthur Morgan es el personaje mejor escrito en la historia del gaming.',
          'Ningún otro juego me ha hecho sentir tan inmerso en la naturaleza salvaje. Cabalgar por las montañas cubiertas de nieve, acampar bajo las estrellas y vivir la historia es puro cine interactivo.',
          'eaW0tYxi5rg'
        );
      `);
      console.log('🌱 Default game Red Dead Redemption 2 seeded!');
    }

    client.release();
  } catch (err) {
    console.error('❌ Database Initialization Error:', err.message);
  }
};

initDB();

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CHEBG Gaming Vault API is running!' });
});

// GET all games
app.get('/api/games', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM games ORDER BY created_at DESC');
    // Map snake_case to camelCase for frontend compatibility
    const games = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      tagline: row.tagline,
      developer: row.developer,
      year: row.year,
      genre: row.genre,
      score: row.score,
      badge: row.badge,
      hoursPlayed: row.hours_played,
      coverImage: row.cover_image,
      bannerImage: row.banner_image,
      verdict: row.verdict,
      chebgReview: row.chebg_review,
      youtubeId: row.youtube_id,
      platforms: ['PC', 'PS5'],
      wantedStars: 5
    }));
    res.json(games);
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// POST new game
app.post('/api/games', async (req, res) => {
  const g = req.body;
  try {
    const query = `
      INSERT INTO games (id, title, tagline, developer, year, genre, score, badge, hours_played, cover_image, banner_image, verdict, chebg_review, youtube_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;
    const values = [
      g.id || 'game-' + Date.now(),
      g.title,
      g.tagline || '',
      g.developer || 'Indie Studio',
      g.year || 2025,
      g.genre || 'Open World',
      g.score || '10 / 10',
      g.badge || 'MUST PLAY',
      g.hoursPlayed || '100 hrs',
      g.coverImage || '',
      g.bannerImage || g.coverImage || '',
      g.verdict || '',
      g.chebgReview || '',
      g.youtubeId || 'eaW0tYxi5rg'
    ];
    await pool.query(query, values);
    res.status(201).json({ success: true, game: g });
  } catch (err) {
    console.error('Error creating game:', err);
    res.status(500).json({ error: 'Failed to save game' });
  }
});

// PUT edit game
app.put('/api/games/:id', async (req, res) => {
  const { id } = req.params;
  const g = req.body;
  try {
    const query = `
      UPDATE games SET
        title = $1,
        tagline = $2,
        developer = $3,
        year = $4,
        genre = $5,
        score = $6,
        badge = $7,
        hours_played = $8,
        cover_image = $9,
        banner_image = $10,
        verdict = $11,
        chebg_review = $12,
        youtube_id = $13
      WHERE id = $14;
    `;
    const values = [
      g.title,
      g.tagline,
      g.developer,
      g.year,
      g.genre,
      g.score,
      g.badge,
      g.hoursPlayed,
      g.coverImage,
      g.bannerImage || g.coverImage,
      g.verdict,
      g.chebgReview,
      g.youtubeId,
      id
    ];
    await pool.query(query, values);
    res.json({ success: true, id });
  } catch (err) {
    console.error('Error updating game:', err);
    res.status(500).json({ error: 'Failed to update game' });
  }
});

// DELETE game
app.delete('/api/games/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM games WHERE id = $1', [id]);
    res.json({ success: true, id });
  } catch (err) {
    console.error('Error deleting game:', err);
    res.status(500).json({ error: 'Failed to delete game' });
  }
});

// GET profile
app.get('/api/profile', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM profile WHERE id = 'main'");
    if (result.rows.length === 0) {
      return res.json({
        name: 'CHEBG',
        role: 'Pro Gamer & Video Game Curator',
        location: 'Pro Gaming Setup',
        favoriteGenre: 'Open World & RPGs',
        completionRate: '0%',
        specialAchievement: 'DINOBOBO'
      });
    }
    const row = result.rows[0];
    res.json({
      name: 'CHEBG',
      role: row.role,
      location: row.location,
      favoriteGenre: row.favorite_genre,
      completionRate: row.completion_rate,
      specialAchievement: row.special_achievement
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// POST profile
app.post('/api/profile', async (req, res) => {
  const p = req.body;
  try {
    await pool.query(`
      INSERT INTO profile (id, role, location, favorite_genre, completion_rate, special_achievement)
      VALUES ('main', $1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        role = EXCLUDED.role,
        location = EXCLUDED.location,
        favorite_genre = EXCLUDED.favorite_genre,
        completion_rate = EXCLUDED.completion_rate,
        special_achievement = EXCLUDED.special_achievement;
    `, [p.role, p.location, p.favoriteGenre, p.completionRate || '0%', p.specialAchievement || 'DINOBOBO']);
    res.json({ success: true, profile: p });
  } catch (err) {
    console.error('Error saving profile:', err);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CHEBG Server listening on port ${PORT}`);
});
