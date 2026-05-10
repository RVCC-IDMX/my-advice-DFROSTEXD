# Final project suggestions for moviepreferencesenhanced

> [!IMPORTANT]
> Before starting the final, complete and close your "Pre-final feedback" issue.

## Your Week 4 starting point (recap)

You shipped the cleanest Week 4 in the cohort. Your serverless function fetches `discover/movie`, transforms `data.results` with a genre-ID-to-name map, and synthesizes runtimes by genre bucket into a stable views shape. Your cache wrapper does two-layer shape validation (`Array.isArray` + `parsed[0].title` probe) and self-heals on bad data. Your view layer holds up under the new innerHTML restriction with `createElement` + `textContent` throughout. Your reflection was the most thorough in the cohort.

That architecture is the foundation. The final adds Groq inside the function alongside your existing TMDB fetch.

## How each pattern fits your project

### Pattern A — translate input to API params

Strong fit. Your current form already collects parameters; replacing the multi-select genre dropdowns and rating filter with a single text input is a clean swap. "An upbeat 90s comedy under 100 minutes" becomes the user's whole interaction. Groq translates to TMDB discover params; the rest of your function is unchanged.

### Pattern B — narrate the API results

Strong fit. Your result data is rich — title, overview (you can pull this from TMDB easily), genres, year, rating. A Groq commentary call could narrate "why these three" in two short sentences per pick. The chatty layer fits a movie-recommender UX naturally — film recommendations are about taste, and taste is a narrative thing.

### Pattern A+B — both, chained

Worth the two calls for movies. Both ends of the loop matter — input is hard to translate from taste to discrete params, and output benefits from narration about the picks. You have the cleanest code in the cohort and the bandwidth to handle two structured-output schemas. If anyone in the class ships A+B end-to-end, it is plausibly you.

## What carries over (and what doesn't)

- **Your genre-ID-to-name map** — stays as-is for displaying genres in your view; you can also use it in reverse to validate that Groq returned real TMDB genre IDs.
- **Your cache wrapper** — stays. Pattern A's cache decision is yours; see `docs/tutorials/pattern-a-translate-input.md` for the agency call.
- **Your shape-validation guards** — keep them; the function returning `{ books, narration }` shape (or your equivalent) means the validation grows by one field, not changes wholesale.
- **Your views.js render path** — stays. You will add a refusal renderer for `refused: true` and (for Pattern B or A+B) render hooks for narration.
- **Your serverless function structure** — unchanged; the Groq call(s) slot in alongside your TMDB fetch.
- **What changes** — your form, depending on which pattern you pick. For Pattern A, replace the genre/rating UI with a single text input. For Pattern B, keep the form mostly. For A+B, replace the form.

## A sketched Pattern A schema for TMDB discover

```js
{
  "with_genres": number[] | null,         // TMDB genre IDs (e.g., [35, 18])
  "primary_release_year": number | null,  // single year
  "year_range": [number, number] | null,  // for "the 90s" → [1990, 1999]
  "vote_average.gte": number | null,      // minimum rating 0–10
  "with_runtime.lte": number | null,      // maximum runtime in minutes
  "sort_by": string | null,               // e.g., "popularity.desc"
  "refused": boolean,
  "refusal_reason": string
}
```

Your existing genre-ID-to-name map runs in reverse here: your system prompt can list the TMDB genre IDs and their names so Groq returns IDs that match what TMDB's `discover` endpoint accepts. The same map you use to display genres is the source of truth for the system prompt.

## My soft recommendation

If I had to pick one for you, I would start with **Pattern A**. Two reasons: (1) the UX win is biggest — replacing the multi-dropdown form with a single text input is a visible, demonstrable change that fits a portfolio-quality movie recommender; (2) your code quality means you can ship A cleanly and then layer B on top toward A+B if you have time. Treat it as "ship A by Wednesday, decide whether to layer B by Friday."

## What to read next

- `INSTRUCTIONS.md` — the assignment overview
- `CHECKLIST.md` — concrete deliverables
- `docs/tutorials/pattern-a-translate-input.md` — Pattern A walkthrough with Open Library; translate the schema to TMDB discover params
- `docs/tutorials/groq-moderation-floor.md` — the four required defenses
