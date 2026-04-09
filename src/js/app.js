/**
 * Main application logic - handles form submission and DOM manipulation
 * This file wires together the data and matching logic with the user interface
 */

import { mediaData } from './data.js';
import { meetsAllCriteria } from './matching.js';
import { showResults, showNoResults } from './views.js';

// Get form and results container
const form = document.querySelector('#preferences-form');
const resultsContainer = document.querySelector('#results-container');

// Dark mode toggle feature
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Dark Mode';
toggleButton.className = 'dark-mode-toggle';
document.body.append(toggleButton);

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

/**
 * Handle form submission
 * @param {Event} event - The form submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();

  // Collect user preferences from form
  const genreSelect = document.querySelector('#genre-select');
  const lengthSelect = document.querySelector('#length-select');
  const ratingSelect = document.querySelector('#rating-select');

  const preferences = {
    genre: genreSelect.value,
    length: lengthSelect.value,
    minRating: Number(ratingSelect.value),
  };

  // Filter data using matching logic
  const matches = [];
  for (const item of mediaData) {
    if (meetsAllCriteria(item, preferences)) {
      matches.push(item);
    }
  }

  // Display results using view functions
  if (matches.length === 0) {
    showNoResults(resultsContainer);
  } else {
    showResults(matches, resultsContainer);
  }
}

// Set up event listener
form.addEventListener('submit', handleFormSubmit);
