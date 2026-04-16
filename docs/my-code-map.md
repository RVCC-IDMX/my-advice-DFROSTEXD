# My code map

Fill out each section below by reading your actual code. Do not guess — open each file and look. This map is your reference for the rest of the assignment. When instructions say "your results container" or "your card class," they mean what you write here.

---

## Files and their purposes

For each file, write one sentence about what it does.

| File                    | What it does |
| ----------------------- | ------------ |
| `src/js/app.js`         | Connects the form to the data, grabs user inputs, finds matches, and creates the cards that show results.                 |
| `src/js/matching.js`    | Has all the filtering functions that check if a movie or show matches what the user wants.                          |
| `src/js/data.js`        | Just the dataset -15 movies and TV shows with their info             |
| `src/js/experiments.js` | Practice file where I testes DOM methods like changing text and toggling classes.                                 |
| `src/css/style.css`     | Makes the layout of the site-colors, layout, as well as spacing. |
| `index.html`            | The page itself-has the form at the top and a container where results appear.                                  |

---

## Form

Look at your `index.html` and find the form element.

- Form ID: `#preferences-form`
- Select element ID: `#genre-select`

- What moods/options are in the select?

  - Any Genre
  - Action
  - Comedy
  - Drama
  - Sci-Fi
  - Thriller
  - Animation
  - Crime

---

## Results container

Where do results appear on the page?

- Container ID or class: `#results-container`
- What element type is it? (`div`, `section`, etc.): `div`

---

## Card structure

Look at how your app.js builds each result card. What elements make up one card?

- Card element type: `article`
- Card class name: `.recommendation-card`

- What is inside each card? (list the child elements and what data they show)
  - Inside each card: A header section with the title and a badge showing if it's a movie or TV show, then a body with all the details like genre, length, star rating, description, where to stream it, and the year.

---

## Existing event listeners

Look through your app.js for any `addEventListener` calls. List each one.

| Where in the code | Event type | What it does |
| ----------------- | ---------- | ------------ |
| app.js, line 66   | click      | Toggles dark mode on/off |
| app.js, line 199  | click      | Back button to return to results view |
| app.js, line 215  | submit     | Form submit to process and display results |
| app.js, line 216  | click      | Card click delegation to show detail view |

If you do not see any `addEventListener` calls, write "none found" — and then look again, because the form handler uses one.

---

## Data shape

Open `src/js/data.js` and look at one item in your dataset.

- How many items total? `15`

- Properties on each item

  - title
  - type
  - genre
  - lengthMinutes
  - rating
  - description
  - year
  - streamingOn

---

## CSS classes for show/hide

Do you have a `.hidden` class or similar in your CSS? If so, what does it do?

- Class name: `None yet`
- What CSS rule does it apply? `Will be created in Week 4 if needed for loading/error states`

If you do not have one, you will create one this week.
