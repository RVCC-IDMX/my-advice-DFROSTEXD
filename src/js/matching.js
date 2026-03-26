/**
 * Matching and filtering functions for recommendation system
 * All functions are pure - they don't touch the DOM, just process data
 */

/**
 * Check if an item matches the desired genre
 * @param {Object} item - The media item to check
 * @param {string} desiredGenre - The genre to match (or "any" for all)
 * @returns {boolean} - True if item matches the genre filter
 */
export function matchesGenre(item, desiredGenre) {
  if (desiredGenre === 'any') {
    return true;
  }
  return item.genre === desiredGenre;
}

/**
 * Check if an item meets the length requirement
 * @param {Object} item - The media item to check
 * @param {string} lengthCategory - "short", "medium", "long", or "any"
 * @returns {boolean} - True if item meets the length criteria
 */
export function meetsLengthRequirement(item, lengthCategory) {
  if (lengthCategory === 'any') {
    return true;
  }

  const minutes = item.lengthMinutes;

  if (lengthCategory === 'short') {
    if (item.type === 'movie') {
      return minutes < 90;
    }
    return minutes < 30;
  }

  if (lengthCategory === 'medium') {
    if (item.type === 'movie') {
      return minutes >= 90 && minutes <= 150;
    }
    return minutes >= 30 && minutes <= 60;
  }

  if (lengthCategory === 'long') {
    if (item.type === 'movie') {
      return minutes > 150;
    }
    return minutes > 60;
  }

  return false;
}

/**
 * Check if an item meets the minimum rating threshold
 * @param {Object} item - The media item to check
 * @param {number} minRating - The minimum rating required (0 means any)
 * @returns {boolean} - True if item meets or exceeds the minimum rating
 */
export function meetsMinimumRating(item, minRating) {
  return item.rating >= minRating;
}

/**
 * Check if an item meets all specified criteria
 * @param {Object} item - The media item to check
 * @param {Object} preferences - User preferences object with genre, length, and minRating
 * @returns {boolean} - True if item meets all criteria
 */
export function meetsAllCriteria(item, preferences) {
  return (
    matchesGenre(item, preferences.genre) &&
    meetsLengthRequirement(item, preferences.length) &&
    meetsMinimumRating(item, preferences.minRating)
  );
}

/**
 * Convert numeric rating to visual star display
 * @param {number} rating - The numeric rating (1-5, decimals allowed)
 * @returns {string} - Visual star representation
 */
export function getRatingDisplay(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let display = '⭐'.repeat(fullStars);
  if (hasHalfStar) {
    display += '✨';
  }
  return display;
}
