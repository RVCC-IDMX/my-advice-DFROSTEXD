/**
 * Main application logic - handles form submission and DOM manipulation
 * This file wires together the data and matching logic with the user interface
 */

import { mediaData } from './data.js';
import { meetsAllCriteria, getRatingDisplay } from './matching.js';

// Get form and results container
const form = document.getElementById('preferences-form');
const resultsContainer = document.getElementById('results-container');

/**
 * Handle form submission
 * @param {Event} event - The form submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();

  // Collect user preferences from form
  const genreSelect = document.getElementById('genre-select');
  const lengthSelect = document.getElementById('length-select');
  const ratingSelect = document.getElementById('rating-select');

  const preferences = {
    genre: genreSelect.value,
    length: lengthSelect.value,
    minRating: Number(ratingSelect.value),
  };

  // Filter data using matching logic
  const matches = [];
  for (let i = 0; i < mediaData.length; i++) {
    const item = mediaData[i];
    if (meetsAllCriteria(item, preferences)) {
      matches.push(item);
    }
  }

  // Display results
  displayResults(matches);
}

/**
 * Display recommendation cards in the results container
 * @param {Array} items - Array of media items to display
 */
function displayResults(items) {
  // Clear previous results
  resultsContainer.textContent = '';

  // Handle no results case
  if (items.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.className = 'no-results';
    noResultsMessage.textContent =
      'No matches found. Try adjusting your filters!';
    resultsContainer.appendChild(noResultsMessage);
    return;
  }

  // Create card for each matching item
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const card = createCard(item);
    resultsContainer.appendChild(card);
  }
}

/**
 * Create a recommendation card element
 * @param {Object} item - The media item to create a card for
 * @returns {HTMLElement} - The card element
 */
function createCard(item) {
  const card = document.createElement('article');
  card.className = 'recommendation-card';

  const typeBadge = item.type === 'movie' ? 'Movie' : 'TV Show';
  const ratingStars = getRatingDisplay(item.rating);

  card.innerHTML = `
    <div class="card-header">
      <h3>${item.title}</h3>
      <span class="type-badge">${typeBadge}</span>
    </div>
    <div class="card-body">
      <p class="genre"><strong>Genre:</strong> ${item.genre}</p>
      <p class="length"><strong>Length:</strong> ${item.lengthMinutes} min</p>
      <p class="rating"><strong>Rating:</strong> ${ratingStars} (${item.rating}/5)</p>
      <p class="description">${item.description}</p>
      <p class="streaming"><strong>Streaming on:</strong> ${item.streamingOn}</p>
      <p class="year"><strong>Year:</strong> ${item.year}</p>
    </div>
  `;

  return card;
}

// Set up event listener
form.addEventListener('submit', handleFormSubmit);
