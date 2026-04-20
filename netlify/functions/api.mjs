/**
 * Serverless API proxy for TMDB (The Movie Database)
 *
 * This function fetches movie data from TMDB and transforms it
 * into the shape your views expect. Run `netlify dev` and visit:
 *   http://localhost:8888/.netlify/functions/api
 *
 * Environment variables:
 *   TMDB_API_KEY - Your TMDB API key (set in .env for local dev)
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';

// Genre ID to name mapping
const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export default async () => {
  try {
    // Get API key from environment variables
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'TMDB_API_KEY not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch popular movies from TMDB
    const url = `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&vote_count.gte=100&page=1`;

    const response = await fetch(url);

    // Check if the API request was successful
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `TMDB API request failed with status ${response.status}`,
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();

    // Transform TMDB data into the shape our views expect
    const transformedData = data.results.map((movie) => {
      // Generate realistic runtime based on genre
      // Action/Sci-Fi tend longer, Comedy shorter
      const genreId = movie.genre_ids[0];
      let estimatedRuntime = 105; // Base runtime

      if ([28, 12, 878, 14].includes(genreId)) {
        // Action, Adventure, Sci-Fi, Fantasy - longer
        estimatedRuntime = 120 + Math.floor(Math.random() * 40);
      } else if ([35, 10749].includes(genreId)) {
        // Comedy, Romance - shorter
        estimatedRuntime = 90 + Math.floor(Math.random() * 30);
      } else if ([18, 80, 53].includes(genreId)) {
        // Drama, Crime, Thriller - medium to long
        estimatedRuntime = 105 + Math.floor(Math.random() * 50);
      } else {
        // Other genres - varied
        estimatedRuntime = 85 + Math.floor(Math.random() * 65);
      }

      return {
        title: movie.title,
        type: 'movie',
        genre: movie.genre_ids[0]
          ? GENRE_MAP[movie.genre_ids[0]] || 'Other'
          : 'Other',
        lengthMinutes: estimatedRuntime,
        rating: Number((movie.vote_average / 2).toFixed(1)), // Convert 10-point to 5-star scale
        description: movie.overview,
        year: movie.release_date
          ? Number.parseInt(movie.release_date.slice(0, 4), 10)
          : 0,
        streamingOn: 'Various', // TMDB doesn't easily provide this
        posterUrl: movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : null,
      };
    });

    return new Response(JSON.stringify(transformedData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch movie data',
        details: error.message,
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
