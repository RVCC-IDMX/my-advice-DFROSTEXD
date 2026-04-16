# My code map — v2 additions

These sections were added in Week 4. Your Week 3 entries above are still valid.

---

## Serverless function

- File path: `netlify/functions/api.mjs`
- What does this function do? `Fetches movie data from TMDB API and transforms it into the shape my views expect`
- What external API does it call? `The Movie Database (TMDB) API`
- What HTTP method does your function use to call the API? `GET`

- What shape does the response have? (list the top-level properties)
  - `title`
  - `type`
  - `genre`
  - `lengthMinutes`
  - `rating`
  - `description`
  - `year`
  - `streamingOn`
  - `posterUrl`

---

## Environment variables

- Do you have a `.env` file in your project root? `Yes`
- What variable(s) are defined in it?
  - `TMDB_API_KEY`

- Are these same variables set in the Netlify UI (Site settings > Environment variables)? `Yes`
- Is `.env` listed in your `.gitignore`? `Yes`

---

## Data flow

How does your app get its data now compared to Week 3?

- Before (Week 3): `import { mediaData } from './data.js'`
- Now (Week 4): `fetch('/.netlify/functions/api')`
- Did you keep `data.js` as a fallback if the fetch fails? `No`
- Where does the fetch happen? (file and function name): `src/js/app.js in the fetchMovies() function`

---

## New fields from API

In Part 3A you added field(s) from the live API that your static data did not have.

- What new field(s) did you add?
  - `posterUrl` (movie poster images)

- Where do they appear in your card? (what element shows them?): `An <img> element with class "poster" at the top of the card body`
- Did you add any CSS for the new field(s)? `Not yet - using default img styling`

---

## localStorage cache

- What key do you pass to `localStorage.setItem()`? `'tmdb-movies-cache'`
- What shape is the cached data? (array of objects, single object, etc.): `Array of movie objects`
- Where is your `loadCache` function? (file and function name): `src/js/app.js - function loadCache()`
- Where is your `saveCache` function? (file and function name): `src/js/app.js - function saveCache(data)`
- When does your app use the cache instead of fetching? `When loadCache() returns valid data at the start of fetchMovies()`
