# Week 4 reflection

Answer each question thoughtfully. There are no wrong answers — the goal is to reflect on what you learned and how your understanding changed.

---

## 1. The enforcement ladder

What did the new linter (ESLint 9 + unicorn plugin) catch that your AGENTS.md rules alone didn't prevent? On the flip side, what kinds of things can AGENTS.md catch that a linter can't check for?

**Answer:** The unicorn plugin caught specific style patterns like negated conditions (preferring `if (x)` over `if (!x)`) and enforced modern array methods that AGENTS.md didn't explicitly mention. AGENTS.md covers broader concepts like "never use innerHTML" and "logic functions must not touch the DOM" - these are architectural rules that require understanding context, which a linter can't check. For example, a linter can block `innerHTML` syntax, but only a human (or AGENTS.md) can explain *why* it's an XSS risk and when `createElement` + `textContent` should be used instead.

---

## 2. Hooks across contexts

You've now seen hooks in five places: browser events, Git pre-commit, npm lifecycle scripts, GitHub Actions, and serverless functions. What is the common pattern across all of them?

**Answer:** They all follow the "when X happens, run this code" pattern. Browser events run code when users interact (`addEventListener`), Git hooks run code when you try to commit (`husky`), npm scripts run code at specific lifecycle moments (like `pretest`), GitHub Actions run code when you push, and serverless functions run code when an HTTP request arrives. Each one registers a callback function that executes automatically when a specific trigger event occurs, letting you inject custom behavior without modifying the core system.

---

## 3. Which enforcement layer changed your habits

Advisory (AGENTS.md), linting (ESLint + unicorn), or blocking (pre-commit hook) — which one changed how you write code the most this week? Why?

**Answer:** The pre-commit hook changed my habits the most because it's the only one that physically blocks me from proceeding. AGENTS.md is helpful guidance I can reference, and ESLint shows errors in the editor, but I *could* ignore them. The pre-commit hook won't let me commit broken code, which forced me to fix lint errors immediately rather than pushing them off. This created a habit of running `npm run lint` before attempting to commit, and writing cleaner code from the start to avoid the friction of failed commits.

---

## 4. The data swap

What surprised you about working with a real API compared to your static `data.js`? Think about things like response shape, timing, missing fields, or error cases.

**Answer:** I was most surprised by how much more defensive the code needs to be. With `data.js`, the data was always there instantly and in exactly the shape I expected. With a real API, I had to handle: loading time (adding a loading state), network failures (try/catch and error messages), missing fields (not every movie has a posterUrl), and different data shapes (TMDB uses genre IDs instead of names, 10-point ratings instead of 5-point). The async timing also meant I couldn't just assume the data was ready - I had to use `async`/`await` and think about what the UI shows while waiting.

---

## 5. The transform challenge

What was the hardest part of mapping the API response to the shape your views expect? How did you solve it?

**Answer:** The hardest part was mapping TMDB's genre IDs (numeric codes like 28, 878) to readable genre names ("Action", "Sci-Fi"). TMDB returns `genre_ids: [28, 878]` but my views expected a single `genre` string. I solved it by creating a `genreMap` object in the serverless function that translates the IDs to names, then taking the first genre from the array and mapping it. I also had to transform the 10-point `vote_average` to a 5-point `rating` by dividing by 2, and construct full poster URLs from TMDB's `poster_path` by prepending their image base URL.

---

## 6. New API fields

What new field(s) did you add from the API? How did they improve your app compared to the static version?

**Answer:** I added `posterUrl` to display movie poster images on both the result cards and detail view. This massively improved the app's visual appeal - instead of just text-based cards, users now see the actual movie posters which makes it instantly recognizable what movie they're looking at. The posters also make the app feel more professional and polished, like a real streaming service. I had to add defensive rendering with `if(item.posterUrl)` checks because not every movie in the TMDB database has poster images available.

---

## 7. Error handling philosophy

You used try/catch in four different contexts this week: the serverless function, fetch in app.js, the localStorage wrapper, and the npm lint guard. What is the common pattern across all of them? What changes between contexts?

**Answer:** The common pattern is wrapping risky operations in try/catch blocks and deciding what to do when things fail. What changes is the *response* to errors based on how critical the operation is. In `loadCache()` and `saveCache()`, I silently fail and return null or do nothing - caching is nice-to-have, not essential. In `fetchMovies()`, I catch errors and call `showError()` because users need to know why movies aren't loading. In the serverless function, I return a 500 status with an error message so the frontend knows the API call failed. The key principle: fail silently for optional features, but always inform users when something they expect to see doesn't work.
