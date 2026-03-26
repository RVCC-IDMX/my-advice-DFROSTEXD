# Project Prompt: What Should I Watch?

## 🎬 Project Overview

Create a **movie and TV show recommendation system** that helps users discover what to watch based on their preferences. This is a complete rebuild of a previous video game recommendation project, reimagined for the movies/TV domain with new features and my own design decisions.

---

## 🎯 Core Requirements

### Domain & Purpose
- **Domain:** Movies and TV Shows
- **Question:** "What should I watch?"
- **User Problem:** Help users decide what to watch when they're browsing streaming services or feeling indecided
- **Solution:** Filter recommendations by genre, length, and include a rating system

---

## 📊 Data Structure

### Dataset Requirements
- **Total items:** Exactly 15 movies/TV shows
- **Mix:** Include both movies and TV shows in the dataset
- **Variety:** Diverse genres and lengths to provide good filtering options

### Required Properties for Each Item
```javascript
{
  title: string,           // Name of movie/show
  type: string,            // "movie" or "tv"
  genre: string,           // Primary genre
  lengthMinutes: number,   // Runtime (for movies) or typical episode length (for TV)
  rating: number,          // Rating out of 5 (use decimals like 4.5)
  description: string,     // Brief 1-2 sentence description
  year: number,           // Release year
  streamingOn: string     // Example: "Netflix", "Hulu", "Multiple", etc.
}
```

### Genre Options (Select 6-8 that work well)
Consider including: Action, Comedy, Drama, Thriller, Sci-Fi, Fantasy, Horror, Romance, Documentary, Animation, Crime, Mystery

### Length Categories (for filtering)
- **Short:** Under 30 minutes per episode / Under 90 minutes for movies
- **Medium:** 30-60 minutes per episode / 90-150 minutes for movies  
- **Long:** Over 60 minutes per episode / Over 150 minutes for movies

---

## 🎨 Design Specifications

### Visual Style
- **Overall aesthetic:** Minimalist and modern
- **Color scheme:** Use the same blue-based color palette from the original project
  - Primary: `hsl(220, 70%, 50%)` - Blue
  - Light background: `hsl(220, 20%, 98%)`
  - Surface white: `hsl(0, 0%, 100%)`
  - Text: `hsl(220, 10%, 20%)`
- **Layout:** Grid-based for recommendation cards
- **Spacing:** Use CSS custom properties (variables) for consistent spacing

### CSS Requirements
- Use CSS custom properties (CSS variables) for colors, spacing, borders, shadows
- Mobile-responsive design
- Smooth transitions and hover effects
- Box shadows for depth on cards
- Border radius for modern rounded corners

### Layout Structure
```
┌─────────────────────────────────────┐
│          Header with Title          │
│         and Description             │
├─────────────────────────────────────┤
│     Preferences Form Section        │
│  [Genre ▼] [Length ▼] [Min Rating ▼]│
│       [Get Recommendations]         │
├─────────────────────────────────────┤
│     Results Section (Grid)          │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │Card │ │Card │ │Card │           │
│  └─────┘ └─────┘ └─────┘           │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │Card │ │Card │ │Card │           │
│  └─────┘ └─────┘ └─────┘           │
└─────────────────────────────────────┘
```

### Recommendation Card Design
Each card should display:
- Title (prominent heading)
- Type badge ("Movie" or "TV Show") with subtle styling
- Genre
- Length/Runtime
- **Star rating visual** (use ⭐ emoji or star symbols)
- Brief description
- Streaming platform
- Year

**Grid specifications:**
- Use CSS Grid
- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile
- Consistent gap between cards

---

## ⚙️ Functionality Requirements

### Filter System

#### 1. Genre Filter (Dropdown)
- Options: "Any Genre" + 6-8 specific genres
- Exact match filtering
- If no genre selected, show all genres

#### 2. Length Filter (Dropdown)
- Options: 
  - "Any Length"
  - "Quick Watch (< 90 min / < 30 min episodes)"
  - "Medium (90-150 min / 30-60 min episodes)"
  - "Long (150+ min / 60+ min episodes)"
- Use range comparison operators

#### 3. Minimum Rating Filter (Dropdown)
- Options: "Any Rating", "3+", "3.5+", "4+", "4.5+"
- Filter to show items with rating >= selected value

### Matching Functions (in matching.js)

Create these functions demonstrating different JavaScript concepts:

1. **`matchesGenre(item, desiredGenre)`**
   - Simple conditional (if statement)
   - Returns boolean

2. **`meetsLengthRequirement(item, lengthCategory)`**
   - Range checks with comparison operators
   - Handle both movie and TV show types
   - Returns boolean

3. **`meetsMinimumRating(item, minRating)`**
   - Number comparison
   - Returns boolean

4. **`meetsAllCriteria(item, preferences)`**
   - Combine multiple checks with && operator
   - Use all three functions above
   - Returns boolean

5. **`getRatingDisplay(rating)`**
   - Classification function using if/else chain
   - Convert numeric rating to star display
   - Example: 4.5 → "⭐⭐⭐⭐✨" or "★★★★½"
   - Returns string

### App Logic (in app.js)

- Form submission handler (prevent default)
- Collect user preferences from form inputs
- Convert string values to appropriate types (numbers)
- Call matching functions to filter data
- Display results dynamically
- Handle "no results" case with helpful message
- Clear previous results before showing new ones

### DOM Manipulation
- Use `document.getElementById()` to get form elements
- Use `document.createElement()` to build cards
- Use `innerHTML` for card content (safe with hardcoded data)
- Use `appendChild()` to add cards to results container
- Add appropriate classes for styling

---

## 🏗️ File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling
├── data.js            # Dataset with 15 movies/TV shows
├── matching.js        # Filtering/matching functions
├── app.js            # Main application logic
└── README.md         # Project documentation
```

### Code Organization Principles
- **Separation of concerns:** Keep data, logic, and presentation separate
- **Modularity:** Each file has a single clear purpose
- **Scripts load order:** data.js → matching.js → app.js
- **Comments:** JSDoc-style comments for all functions
- **Naming conventions:** camelCase for variables and functions

---

## 💻 Technical Specifications

### JavaScript Requirements
- **Pure vanilla JavaScript** - No frameworks or libraries
- ES6+ syntax where appropriate (const, let, arrow functions optional)
- Avoid `var` - use `const` and `let` only
- Strict equality (`===`) for all comparisons
- JSDoc comments for all functions

### HTML Requirements
- Semantic HTML5 elements (`<main>`, `<section>`, `<header>`, `<form>`)
- Proper form structure with labels
- Accessible markup (labels connected to inputs, alt text if images used)
- Meta tags for charset and viewport

### CSS Requirements
- CSS custom properties (variables) for theming
- Mobile-first responsive approach
- CSS Grid for card layout
- Flexbox for internal card layouts
- Hover states for interactive elements
- Focus states for accessibility

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- No server required (runs from file://)
- No build process needed

---

## ✨ Rating System Feature (NEW!)

This is a key differentiator from the original project.

### Implementation Details

**Data:** Each item has a `rating` property (number from 1-5, decimals allowed)

**Filter:** User can set minimum rating threshold (3+, 3.5+, 4+, 4.5+)

**Display:** Show rating visually on each card using stars

**Star Display Options:**
- Option 1: Use emoji stars: ⭐ for full, ✨ or 💫 for half
- Option 2: Use Unicode: ★ (filled) and ☆ (empty) or ½ for half
- Option 3: Text format: "4.5/5 ⭐"

**Suggested Implementation:**
```javascript
function getRatingDisplay(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let display = '⭐'.repeat(fullStars);
  if (hasHalfStar) display += '✨';
  return display;
}
```

---

## 📝 Sample Data Entry

Here's an example to guide the data structure:

```javascript
{
  title: "Inception",
  type: "movie",
  genre: "Sci-Fi",
  lengthMinutes: 148,
  rating: 4.5,
  description: "A thief who enters people's dreams to steal secrets faces his most challenging mission yet.",
  year: 2010,
  streamingOn: "Netflix"
}
```

---

## 🎓 Learning Objectives Demonstrated

This project should demonstrate understanding of:

1. **HTML:** Forms, semantic structure, DOM elements with IDs
2. **CSS:** Variables, Grid, responsive design, modern styling
3. **JavaScript:**
   - Variables and data types
   - Functions with parameters and return values
   - Conditionals (if/else)
   - Comparison operators (===, <, >, <=, >=)
   - Logical operators (&&, ||)
   - Loops (for loop to iterate through array)
   - DOM manipulation
   - Event listeners
   - Objects and arrays

---

## 🚀 Development Approach

### Phase 1: Structure
1. Create HTML with form and results container
2. Add all form dropdowns with appropriate options
3. Link all three JavaScript files in correct order

### Phase 2: Data
1. Create data.js with 15 movies/TV shows
2. Include all required properties
3. Ensure variety in genres, lengths, and ratings

### Phase 3: Matching Logic
1. Write all 5 matching functions in matching.js
2. Add JSDoc comments to each function
3. Test edge cases (empty preferences, no matches)

### Phase 4: App Logic
1. Set up form event listener
2. Collect and process form data
3. Filter data using matching functions
4. Create and display recommendation cards

### Phase 5: Styling
1. Set up CSS variables
2. Style form and button
3. Create grid layout for cards
4. Add card styling with rating display
5. Make responsive for mobile

### Phase 6: Polish
1. Add hover effects and transitions
2. Handle edge cases (no results)
3. Test all filter combinations
4. Add helpful placeholder text

---

## 📋 Success Criteria

The project is complete when:

- ✅ Page displays 15 movies/TV shows when no filters applied
- ✅ Genre filter correctly filters by selected genre
- ✅ Length filter correctly categorizes and filters items
- ✅ Rating filter shows only items meeting minimum rating
- ✅ All three filters work together correctly
- ✅ Cards display in a responsive grid (3/2/1 columns)
- ✅ Each card shows all required information including star rating
- ✅ "No results" message appears when filters return empty
- ✅ Design matches minimalist aesthetic with blue color scheme
- ✅ Code is well-organized and commented
- ✅ Site works without any server (open index.html directly)

---

## 🎨 Design Preferences Summary

**MY CHOICES:**
- Domain: Movies & TV Shows
- Filters: Genre, Length, Minimum Rating
- Layout: Grid-based cards
- Style: Minimalist, clean, modern
- Colors: Same blue palette from original project
- Special Feature: Star-based rating system with filtering
- Data Size: 15 items

**KEEP FROM ORIGINAL:**
- CSS variables approach
- Three-file JS structure
- Form-based filtering
- Card-style results display
- No frameworks philosophy

**NEW ADDITIONS:**
- Rating system with visual stars
- Genre and length relevant to movies/TV
- Type badges (Movie vs TV Show)
- Streaming platform information
- Grid layout instead of single column

---

## 💡 Helpful Hints for the AI Agent

- When creating data, balance movies and TV shows (don't make all one type)
- Include popular titles that users will recognize
- Make sure genres are distributed well (don't put all items in one genre)
- Ratings should vary from 3.5 to 5 to make the filter meaningful
- Length variety is important - include quick, medium, and long options
- Test that filters work independently and together
- Remember to handle the "Any" option in each filter (should match everything)
- The grid should collapse nicely on mobile (test at ~375px width)
- Star rating display should be consistent and aligned properly in cards

---

## 📚 Reference: Original Project Learnings

From my original "What Should I Play?" project, I learned:
- How to structure a recommendation system
- Form handling and event listeners
- Filtering data with matching functions
- Dynamic DOM manipulation
- CSS variables for consistent theming

This new project builds on those skills while adding:
- More complex filtering logic (3 criteria instead of 3)
- Rating system (new feature)
- Grid layout (vs single column)
- Mixed data types (movies + TV)

---

**This prompt should give you everything you need to build my new recommendation system. Take these requirements and create a complete, working "What Should I Watch?" website!**
