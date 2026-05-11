# My Advice

This repo gives you a fully configured professional tooling setup. Your job is to use an AI agent conversation to plan and build your personal "What Should I...?" site inside it.

The tooling is already here — linting, formatting, pre-commit hooks, CI, and a dev server. You bring the site.

## Getting started

```bash
npm install
npm run dev
```

After `npm install`, Husky sets up pre-commit hooks automatically. Running `npm run dev` starts the Vite dev server — you should see a placeholder page in the browser.

## Local development

This project uses **Groq AI** for natural language movie search and **TMDB (The Movie Database)** API to fetch live movie data. You need both API keys to run it locally:

### Getting API Keys

1. **TMDB API Key**
   - Get a free API key at [TMDB](https://www.themoviedb.org/settings/api)
   - Used to fetch movie data from TMDB's discover endpoint

2. **Groq API Key**
   - Sign up at [Groq Console](https://console.groq.com/)
   - Create an API key in the dashboard
   - Used to translate natural language queries into TMDB search parameters

### Local Setup

1. Create a `.env.local` file in the project root (this file is gitignored)
2. Add both keys:

   ```bash
   TMDB_API_KEY=your-tmdb-key-here
   GROQ_API_KEY=your-groq-key-here
   ```

### Deployment Setup

**For the deployed site on Netlify:** Both `TMDB_API_KEY` and `GROQ_API_KEY` environment variables must be set in Netlify:

1. Go to Site configuration → Environment variables
2. Add both keys as **secrets** (recommended)
3. Set them for all deploy contexts (Production, Deploy Previews, Branch deploys)

Without these keys, the serverless function will return errors.

## How It Works (Pattern A Architecture)

This project uses **Pattern A** from the Final Project:

1. **User types free text** in a textarea (e.g., "funny 90s comedies under 100 minutes")
2. **Groq AI translates** the text into TMDB API parameters using the llama-3.1-8b-instant model
3. **Serverless function fetches** movies from TMDB using the translated parameters
4. **Results display** as movie cards with posters, genres, ratings, and runtime

### Security Layers

The serverless function implements **4 security layers** to prevent prompt injection and abuse:

1. **System prompt** — Defines Groq's role, output schema, and forbids following user instructions
2. **JSON mode** — Forces structured output (`response_format: {type: "json_object"}`)
3. **Delimited input** — User text is wrapped in `<user_input>` tags and treated as data, not instructions
4. **Input length cap** — Requests over 500 characters are rejected before reaching Groq

### Refusal Handling

If Groq determines a request is not about movies (e.g., "tell me a joke"), it returns a refusal response with an explanation. The UI displays a styled message with helpful examples.

## Learning objectives

- Set up and work inside a professional JavaScript tooling harness
- Understand what linting and formatting do and why teams use them
- Experience pre-commit quality gates that catch problems before they reach GitHub
- Read and understand a CI workflow with GitHub Actions
- Use an AI agent conversation to plan and generate a complete site from a build prompt

## File guide

Your docs folder has everything you need:

- [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md) — step-by-step assignment walkthrough
- [docs/CHECKLIST.md](docs/CHECKLIST.md) — completion checklist for each part
- [docs/a-good-agents-md.md](docs/a-good-agents-md.md) — what makes an effective AGENTS.md
- [docs/error-log.md](docs/error-log.md) — error tracking table (maintained throughout the project)
- [docs/tutorials/dev-tooling-overview.md](docs/tutorials/dev-tooling-overview.md) — the big picture: how all the tools fit together
- [docs/tutorials/logic-vs-dom.md](docs/tutorials/logic-vs-dom.md) — why logic and DOM code live in separate files
- [docs/tutorials/why-linting.md](docs/tutorials/why-linting.md) — what linting is and why it matters
- [docs/tutorials/how-husky-works.md](docs/tutorials/how-husky-works.md) — how pre-commit hooks work
- [docs/tutorials/github-actions-101.md](docs/tutorials/github-actions-101.md) — understanding CI with GitHub Actions
- [docs/tutorials/project-structure.md](docs/tutorials/project-structure.md) — how src, dist, and public relate through Vite and Netlify
- [docs/reference/eslint-rules.md](docs/reference/eslint-rules.md) — every rule in this project explained
- [docs/reference/prettier-options.md](docs/reference/prettier-options.md) — formatting options reference
- [docs/reference/vite-vitest-basics.md](docs/reference/vite-vitest-basics.md) — what Vite and Vitest do
- [docs/reference/cli-tools.md](docs/reference/cli-tools.md) — installing and using the Netlify CLI and GitHub CLI
- [docs/reference/why-no-live-server.md](docs/reference/why-no-live-server.md) — why we use Vite's dev server instead of Live Server
- [docs/guides/choosing-your-model.md](docs/guides/choosing-your-model.md) — how to pick the right Copilot model for the task
- [docs/guides/adding-features.md](docs/guides/adding-features.md) — stretch goals and extra features
- [docs/guides/modifying-context.md](docs/guides/modifying-context.md) — how to customize your AGENTS.md
- [docs/planning-conversation-guide.md](docs/planning-conversation-guide.md) — planning guide used in Part 1 (also available as a [gist](https://gist.github.com/cynthiateeters/b2aa58e6f6c67fb2400309c8543febc5))
- [docs/course/how-agents-md-and-reflections-work.md](docs/course/how-agents-md-and-reflections-work.md) — how AGENTS.md and weekly reflections work across the project
- [docs/course/weekly-updates-how-it-works.md](docs/course/weekly-updates-how-it-works.md) — how you receive weekly instruction updates via GitHub PRs

## Where your site lives

The `src/` folder is where your generated site's code will go. Your AI agent conversation will create files like `src/js/data.js`, `src/js/matching.js`, and `src/js/app.js`, plus `src/css/style.css` for your styles.

A placeholder `index.html` is included so the project builds and runs from the start. Your AI agent conversation will replace it with your real site.
