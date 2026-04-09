/**
 * Main application logic - handles form submission and DOM manipulation
 * This file wires together the data and matching logic with the user interface
 */

import { mediaData } from './data.js';
import { meetsAllCriteria, getRatingDisplay } from './matching.js';

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

  // Create card header
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';

  const title = document.createElement('h3');
  title.textContent = item.title;

  const typeBadge = document.createElement('span');
  typeBadge.className = 'type-badge';
  typeBadge.textContent = item.type === 'movie' ? 'Movie' : 'TV Show';

  cardHeader.appendChild(title);
  cardHeader.appendChild(typeBadge);

  // Create card body
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  // Genre
  const genre = document.createElement('p');
  genre.className = 'genre';
  const genreLabel = document.createElement('strong');
  genreLabel.textContent = 'Genre: ';
  genre.appendChild(genreLabel);
  genre.appendChild(document.createTextNode(item.genre));

  // Length
  const length = document.createElement('p');
  length.className = 'length';
  const lengthLabel = document.createElement('strong');
  lengthLabel.textContent = 'Length: ';
  length.appendChild(lengthLabel);
  length.appendChild(document.createTextNode(`${item.lengthMinutes} min`));

  // Rating
  const rating = document.createElement('p');
  rating.className = 'rating';
  const ratingLabel = document.createElement('strong');
  ratingLabel.textContent = 'Rating: ';
  const ratingStars = getRatingDisplay(item.rating);
  rating.appendChild(ratingLabel);
  rating.appendChild(
    document.createTextNode(`${ratingStars} (${item.rating}/5)`)
  );

  // Description
  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = item.description;

  // Streaming
  const streaming = document.createElement('p');
  streaming.className = 'streaming';
  const streamingLabel = document.createElement('strong');
  streamingLabel.textContent = 'Streaming on: ';
  streaming.appendChild(streamingLabel);
  streaming.appendChild(document.createTextNode(item.streamingOn));

  // Year
  const year = document.createElement('p');
  year.className = 'year';
  const yearLabel = document.createElement('strong');
  yearLabel.textContent = 'Year: ';
  year.appendChild(yearLabel);
  year.appendChild(document.createTextNode(item.year));

  // Append all to card body
  cardBody.appendChild(genre);
  cardBody.appendChild(length);
  cardBody.appendChild(rating);
  cardBody.appendChild(description);
  cardBody.appendChild(streaming);
  cardBody.appendChild(year);

  // Append header and body to card
  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  return card;
}

// Set up event listener
form.addEventListener('submit', handleFormSubmit);
