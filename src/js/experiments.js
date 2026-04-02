/**
 * DOM Experiments - Learning by doing
 * This file is a sandbox for trying out DOM manipulation methods
 */

// Experiment 1: Change the main heading text
const heading = document.querySelector('h1');
heading.textContent = '🎥 My Personal Movie Guide';

// Experiment 2: Toggle a class
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Dark Mode';
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Experiment 3: Count elements
const elementCount = document.querySelectorAll('p').length;
console.log(`Number of paragraphs: ${elementCount}`);

// Experiment 4: Add something new to the page
const newParagraph = document.createElement('p');
newParagraph.textContent = 'This is a new paragraph added to the page.';
document.body.appendChild(newParagraph);

// Experiment 5: Modify multiple elements
const allParagraphs = document.querySelectorAll('p');
allParagraphs.forEach((p) => {
  p.style.color = 'blue';
});
