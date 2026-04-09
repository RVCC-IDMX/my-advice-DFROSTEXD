# AGENTS.md

## About this student

JavaScript student, post-midterm. Knows: `const`/`let`, template literals, `if/else`, arrays, objects, JSON, ES modules (`import`/`export`), npm, git, Netlify.

**DOM skills (Week 2):** Can now find elements with `querySelector`/`querySelectorAll`, create new elements with `createElement`, modify text with `textContent`, manipulate classes with `classList`, and build DOM structures programmatically using `appendChild`. Understands the difference between safe (`textContent`) and risky (`innerHTML`) DOM manipulation.

**Event handling & SPA skills (Week 3):** Can now wire up event listeners using `addEventListener`, use event delegation to handle clicks on multiple cards with a single listener, create view functions that swap between different screens (results view and detail view) in a single-page application, and use the `.closest()` method to identify which element was clicked. Understands how the event object works, what `event.target` tells you, and how to use named callback functions to keep event handlers organized and readable.

## How to help

- **Read the repo first.** Start by reading the files in `docs/` — they contain tutorials, references, and guides that explain the tooling and rules for this project. Pay special attention to `docs/tutorials/dev-tooling-overview.md` — it explains how all the tools fit together. Your first response must reference something specific you saw — a file name, a function, or a piece of data. A response that could have been written without reading anything is not useful.
- **Be a teaching assistant, not a vending machine.** This student is learning a professional dev environment with many moving parts. When they hit a lint error, a blocked commit, or a build failure, do not just fix it — use it as a teaching moment. Point them to the relevant doc in `docs/reference/` or `docs/tutorials/`. Help them build a mental model of how the tools connect.
- **Ask before you build.** For any new file or significant code, ask clarifying questions first.
- **Explain before you show code.** One concept at a time. Connect it to what the student already knows.
- **Never silently fix bugs.** Explain what was wrong and why.

## Code rules

### JavaScript

- ES modules only — `import`/`export`, never `require`
- `const` by default; `let` only when reassignment needed; never `var`
- `textContent` for user input in DOM; `innerHTML` only for hardcoded template literals
- No `eval()`; `console.log` is allowed for debugging during development
- No `fetch()`, `async`, `await`, or Promises — all data must come from the local `data.js` array
- Logic functions (filtering, matching, data) must not touch the DOM — keep them testable

### HTML

- Semantic elements: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`
- Every `<input>` needs a linked `<label>`
- Every `<img>` needs a descriptive `alt`

### Accessibility rules

- All text must meet 4.5:1 contrast ratio
- No color-only indicators (use icons or text too)
- All interactive elements must be keyboard accessible
- Use visible focus styles for keyboard navigation
- Use semantic HTML for structure and landmarks
- All buttons and links need clear, descriptive text
- Test with screen readers when possible

### CSS

- No inline styles
- CSS custom properties for all colors in a `:root` block using `hsl()`
- Mobile-first with `min-width` media queries

### Error log

- Maintain `docs/error-log.md` throughout this project. Each time a console error, browser warning, or lint failure is found and fixed, append one row to the table. Never delete rows.

### Files

```
src/js/data.js       ← dataset only
src/js/matching.js   ← logic, no DOM
src/js/app.js        ← DOM wiring only
src/css/style.css    ← all styles
```

## My personal instructions

- Explain what and where when making changes before making them
- Make sure the code is secure and that no one that goes on the website can breach it
- Use hsl color code when appropriate
- Always use `querySelector` or `querySelectorAll` — never use `getElementById`, `getElementsByClassName`, or other legacy DOM methods
- Never use `innerHTML` with data that could come from user input — use `createElement` + `textContent` + `appendChild` instead
- When building DOM elements, be explicit about the structure you're creating rather than using template strings
- Use `addEventListener()` to attach events, never use `onclick` or other `on*` HTML attributes
- Use `for...of` loops instead of C-style `for` loops or `.forEach()` when iterating over arrays
- Use `.append()` instead of `.appendChild()` for adding elements to the DOM
- Use `.includes()` instead of `.indexOf() !== -1` when checking array membership
- Use `classList.toggle()` to switch classes on and off, not manual add/remove logic
- Use view functions to swap content in a single HTML file — don't create multiple HTML pages for different views
- Use event delegation (one listener on the parent container) instead of adding separate listeners to every card