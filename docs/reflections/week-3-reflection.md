# Week 3 reflection

Take a few minutes to think about what happened this week — not just what you built, but how the process went.

---

## Your code

What changed about how you think about your project's structure after creating views.js and wiring events?

> Before, app.js did everything—form handling, card creation, rendering. Now views.js handles rendering and app.js handles events, which makes it easier to find and change things. I also understand why it's called a single-page application now—I'm not making new HTML files, just swapping what's visible.

---

## Your agent

Did preparing your AGENTS.md with modern JS rules before coding change the quality of what your agent produced? What did you notice?

> Yes, after adding rules about for...of loops and .append(), the agent used those patterns automatically. Having the event delegation rule also helped—the agent used .closest() right away instead of adding listeners to every card individually.

---

## The rules

Which modern JS rule from `docs/rules/` stuck with you most? What clicked about it?

> The .find() rule stuck with me because it's so much clearer than .filter()[0] or a loop. When I needed to match a clicked card to its data, using .find() made the code read like plain English—"find this item."

---

## Biggest win or biggest loss

What was the moment this week that affected you most — something that finally worked, or something that really frustrated you?

> When I clicked a card and the detail view actually appeared. Seeing event delegation work—one listener handling all cards, figuring out which was clicked, and showing the detail—made the whole SPA pattern click for me.
