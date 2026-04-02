# Week 2 reflection — DOM Fundamentals

## Reading the agent's code

**What was the hardest part of your code to understand? What made it click?**

The `createCard()` function with all the template literal HTML was hardest to understand at first. It clicked when I realized it was just building the same structure I could see in the browser's DevTools.

**Did you find anything in the agent's code that surprised you — something you would not have written yourself?**

I was surprised the agent used `getElementById` since we've been learning CSS selectors, and I didn't expect `innerHTML` to be a security risk with local data.

## Modernizing

**How many `getElementById` calls did you replace? Was the switch to `querySelector` straightforward?**

I replaced 5 `getElementById` calls. The switch was straightforward once I remembered to add the `#` before the ID name.

**Did you find any `innerHTML` that was risky? How did you decide what to replace?**

Yes, `createCard()` used `innerHTML` with data variables, which could be risky if data ever came from users. I replaced it with `createElement` and `textContent` to be safe by default.

## DOM experiments

**Which experiment was your favorite? Why?**

Experiment 5 (adding emoji badges to labels) was my favorite because it modified multiple elements at once and I could immediately see the change on every label.

**Which experiment was the hardest? What tripped you up?**

Experiment 3 (adding the subtitle) was hardest because I had to remember to both create the element AND append it—creating it alone didn't make it show up.

**Did any experiment give you an idea for a feature you want to add to your site later?**

Yes, the class toggle experiment made me think about adding a dark mode toggle or showing/hiding sections dynamically.

## AGENTS.md

**What new rules or instructions did you add to AGENTS.md this week?**

I added three rules: always use `querySelector` instead of legacy methods, never use `innerHTML` with user data, and be explicit when building DOM structures.

**Compare your "About this student" section from the start of the week to the end. What changed?**

At the start it said "learning DOM manipulation," but now it lists specific skills like `querySelector`, `createElement`, `textContent`, `appendChild`, and understanding safe vs risky DOM methods.

## Reflection

**What is one thing you understand about the DOM now that you did not understand before this week?**

I now understand that the DOM is a tree structure I can manipulate with JavaScript, and that building elements programmatically with `createElement` is safer than using `innerHTML` with variables.

**What would you do differently if you were starting this week's work over?**

I would read the reference docs first before making changes, and test each change in the browser immediately instead of making multiple changes at once.
