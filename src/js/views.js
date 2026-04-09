/**
 * View functions for rendering different screens
 * Each function handles displaying one "view" or "screen" of the app
 */

import { getRatingDisplay } from './matching.js';

/**
 * Display a list of recommendation cards
 * @param {Array} items - Array of media items to display
 * @param {HTMLElement} container - The container to render cards into
 */
export function showResults(items, container) {
  // Clear previous content
  container.textContent = '';

  // Create and append a card for each item
  for (const item of items) {
    const card = createCard(item);
    container.append(card);
  }
}

/**
 * Display a "no results found" message
 * @param {HTMLElement} container - The container to render the message into
 */
export function showNoResults(container) {
  // Clear previous content
  container.textContent = '';

  // Create no results message
  const noResultsMessage = document.createElement('p');
  noResultsMessage.className = 'no-results';
  noResultsMessage.textContent =
    'No matches found. Try adjusting your filters!';
  container.append(noResultsMessage);
}

/**
 * Display detailed view of a single item
 * @param {Object} item - The media item to display in detail
 * @param {HTMLElement} container - The container to render the detail view into
 */
export function showDetail(item, container) {
  // Clear previous content
  container.textContent = '';

  // Create detail view wrapper
  const detailView = document.createElement('article');
  detailView.className = 'detail-view';

  // Create back button
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.textContent = '← Back to Results';
  detailView.append(backButton);

  // Create title section
  const titleSection = document.createElement('div');
  titleSection.className = 'detail-title';

  const title = document.createElement('h3');
  title.textContent = item.title;

  const typeBadge = document.createElement('span');
  typeBadge.className = 'type-badge';
  typeBadge.textContent = item.type === 'movie' ? 'Movie' : 'TV Show';

  titleSection.append(title, typeBadge);

  // Create details section
  const detailsSection = document.createElement('div');
  detailsSection.className = 'detail-info';

  // Genre
  const genre = document.createElement('p');
  const genreLabel = document.createElement('strong');
  genreLabel.textContent = 'Genre: ';
  genre.append(genreLabel);
  genre.append(document.createTextNode(item.genre));

  // Length
  const length = document.createElement('p');
  const lengthLabel = document.createElement('strong');
  lengthLabel.textContent = 'Length: ';
  length.append(lengthLabel);
  length.append(document.createTextNode(`${item.lengthMinutes} min`));

  // Rating
  const rating = document.createElement('p');
  const ratingLabel = document.createElement('strong');
  ratingLabel.textContent = 'Rating: ';
  const ratingStars = getRatingDisplay(item.rating);
  rating.append(ratingLabel);
  rating.append(document.createTextNode(`${ratingStars} (${item.rating}/5)`));

  // Year
  const year = document.createElement('p');
  const yearLabel = document.createElement('strong');
  yearLabel.textContent = 'Year: ';
  year.append(yearLabel);
  year.append(document.createTextNode(item.year));

  // Streaming
  const streaming = document.createElement('p');
  const streamingLabel = document.createElement('strong');
  streamingLabel.textContent = 'Streaming on: ';
  streaming.append(streamingLabel);
  streaming.append(document.createTextNode(item.streamingOn));

  // Description
  const description = document.createElement('p');
  description.className = 'description';
  const descLabel = document.createElement('strong');
  descLabel.textContent = 'Description: ';
  description.append(descLabel);
  description.append(document.createTextNode(item.description));

  // Append all info to details section
  detailsSection.append(genre, length, rating, year, streaming, description);

  // Append all to detail view
  detailView.append(titleSection, detailsSection);

  // Append to container
  container.append(detailView);
}

/**
 * Create a recommendation card element
 * @param {Object} item - The media item to create a card for
 * @returns {HTMLElement} - The card element
 */
function createCard(item) {
  const card = document.createElement('article');
  card.className = 'recommendation-card';
  card.dataset.id = item.title; // Store identifier for click handling

  // Create card header
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';

  const title = document.createElement('h3');
  title.textContent = item.title;

  const typeBadge = document.createElement('span');
  typeBadge.className = 'type-badge';
  typeBadge.textContent = item.type === 'movie' ? 'Movie' : 'TV Show';

  cardHeader.append(title, typeBadge);

  // Create card body
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  // Genre
  const genre = document.createElement('p');
  genre.className = 'genre';
  const genreLabel = document.createElement('strong');
  genreLabel.textContent = 'Genre: ';
  genre.append(genreLabel);
  genre.append(document.createTextNode(item.genre));

  // Length
  const length = document.createElement('p');
  length.className = 'length';
  const lengthLabel = document.createElement('strong');
  lengthLabel.textContent = 'Length: ';
  length.append(lengthLabel);
  length.append(document.createTextNode(`${item.lengthMinutes} min`));

  // Rating
  const rating = document.createElement('p');
  rating.className = 'rating';
  const ratingLabel = document.createElement('strong');
  ratingLabel.textContent = 'Rating: ';
  const ratingStars = getRatingDisplay(item.rating);
  rating.append(ratingLabel);
  rating.append(document.createTextNode(`${ratingStars} (${item.rating}/5)`));

  // Description
  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = item.description;

  // Streaming
  const streaming = document.createElement('p');
  streaming.className = 'streaming';
  const streamingLabel = document.createElement('strong');
  streamingLabel.textContent = 'Streaming on: ';
  streaming.append(streamingLabel);
  streaming.append(document.createTextNode(item.streamingOn));

  // Year
  const year = document.createElement('p');
  year.className = 'year';
  const yearLabel = document.createElement('strong');
  yearLabel.textContent = 'Year: ';
  year.append(yearLabel);
  year.append(document.createTextNode(item.year));

  // Append all to card body
  cardBody.append(genre, length, rating, description, streaming, year);

  // Append header and body to card
  card.append(cardHeader, cardBody);

  return card;
}
