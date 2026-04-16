/**
 * Main application logic - handles form submission and DOM manipulation
 * This file wires together the data and matching logic with the user interface
 */

import { meetsAllCriteria } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';

// Get form and results container
const form = document.querySelector('#preferences-form');
const resultsContainer = document.querySelector('#results-container');

// Store last results so we can restore them when returning from detail view
let lastResults = [];

// Cache key for localStorage
const CACHE_KEY = 'tmdb-movies-cache';

/**
 * Load cached movie data from localStorage
 * @returns {Array|null} Cached movie data or null if not found/invalid
 */
function loadCache() {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);

    // Validate that it's an array and has the expected shape
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    // Check first item has expected properties
    if (parsed.length > 0 && !parsed[0].title) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

/**
 * Save movie data to localStorage cache
 * @param {Array} data - Movie data to cache
 */
function saveCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Quota exceeded or private browsing - safe to ignore
  }
}

// Dark mode toggle feature
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Dark Mode';
toggleButton.className = 'dark-mode-toggle';
document.body.append(toggleButton);

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

/**
 * Fetch movie data from serverless function
 * @returns {Promise<Array>} Array of movie objects
 */
async function fetchMovies() {
  // Check cache first
  const cached = loadCache();
  if (cached) {
    console.log('Loading from cache');
    return cached;
  }

  // No cache - fetch from API
  console.log('Fetching from API');
  try {
    const response = await fetch('/.netlify/functions/api');

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Save to cache for next time
    saveCache(data);

    return data;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    throw error;
  }
}

/**
 * Show loading message in the results container
 */
function showLoading() {
  resultsContainer.textContent = '';
  const loadingMessage = document.createElement('p');
  loadingMessage.className = 'loading';
  loadingMessage.textContent = 'Loading movies...';
  resultsContainer.append(loadingMessage);
}

/**
 * Show error message in the results container
 * @param {string} message - Error message to display
 */
function showError(message) {
  resultsContainer.textContent = '';
  const errorMessage = document.createElement('p');
  errorMessage.className = 'error';
  errorMessage.textContent =
    message || 'Failed to load movies. Please try again.';
  resultsContainer.append(errorMessage);
}

/**
 * Handle form submission
 * @param {Event} event - The form submit event
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  // Show loading state
  showLoading();

  try {
    // Fetch data from serverless function
    const movieData = await fetchMovies();

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
    for (const item of movieData) {
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
  } catch {
    showError(
      'Failed to load movies. Please check your connection and try again.'
    );
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

  // Find the matching item in lastResults instead of mediaData
  const item = lastResults.find((item) => item.title === title);

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
