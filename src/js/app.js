/**
 * Main application logic - handles form submission and DOM manipulation
 * This file wires together the data and matching logic with the user interface
 */

import { mediaData } from './data.js';
import { meetsAllCriteria } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';

// Get form and results container
const form = document.querySelector('#preferences-form');
const resultsContainer = document.querySelector('#results-container');

// Store last results so we can restore them when returning from detail view
let lastResults = [];

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
    lastResults = matches; // Store results for back button
    showResults(matches, resultsContainer);
  }
}

/**
 * Handle card click - show detail view for the clicked item
 * Uses event delegation: one listener on the container handles all cards
 * @param {Event} event - The click event
 */
function handleCardClick(event) {
  // Find the closest card element (in case user clicked a child element)
  const card = event.target.closest('.recommendation-card');

  // If click wasn't on a card, do nothing
  if (!card) return;

  // Get the title from the card's data attribute
  const title = card.dataset.id;

  // Find the matching item in the dataset
  const item = mediaData.find((item) => item.title === title);

  // If we found the item, show its detail view
  if (item) {
    showDetail(item, resultsContainer);

    // Set up the back button that was just created in the detail view
    const backButton = resultsContainer.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', handleBackClick);
    }
  }
}

/**
 * Handle back button click - return to results view
 */
function handleBackClick() {
  // Restore the last set of results
  if (lastResults.length > 0) {
    showResults(lastResults, resultsContainer);
  }
}

// Set up event listeners
form.addEventListener('submit', handleFormSubmit);
resultsContainer.addEventListener('click', handleCardClick);
