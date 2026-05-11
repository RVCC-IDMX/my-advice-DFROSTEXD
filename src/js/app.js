/**
 * Main application logic - handles form submission and DOM manipulation
 * This file wires together the Groq AI translation with TMDB movie data
 */

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
 * Fetch movie data from serverless function with user's text input
 * @param {string} userInput - The user's natural language movie request
 * @returns {Promise<Object>} Response object with movies or refusal
 */
async function fetchMovies(userInput) {
  const response = await fetch('/.netlify/functions/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: userInput,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
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
 * Show refusal message when Groq can't process the request
 * @param {string} reason - Refusal reason from Groq
 */
function showRefusal(reason) {
  resultsContainer.textContent = '';
  const refusalMessage = document.createElement('div');
  refusalMessage.className = 'refusal';

  const heading = document.createElement('h3');
  heading.textContent = "🤔 Hmm, I couldn't process that request";

  const message = document.createElement('p');
  message.textContent =
    reason || "Please try describing a movie you'd like to watch.";

  const hint = document.createElement('p');
  hint.className = 'hint';
  hint.textContent =
    'Try: "funny 90s comedies" or "intense sci-fi thrillers from the 2000s"';

  refusalMessage.append(heading, message, hint);
  resultsContainer.append(refusalMessage);
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
    // Get user's text input
    const textarea = document.querySelector('#movie-request');
    const userInput = textarea.value.trim();

    if (!userInput) {
      showError('Please describe what you want to watch.');
      return;
    }

    // Fetch from serverless function (Groq + TMDB)
    const response = await fetchMovies(userInput);

    // Handle refusal (Groq couldn't process the request)
    if (response.refused) {
      showRefusal(response.refusal_reason);
      return;
    }

    // Handle no results
    if (!response || response.length === 0) {
      showNoResults(resultsContainer);
      return;
    }

    // Store and display results
    lastResults = response;
    showResults(response, resultsContainer);
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
