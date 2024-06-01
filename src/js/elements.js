import Logo from '../img/logo.png';
import { getLocalStorage } from './description';

// Selecting necessary elements for the functioning of the app
const header = document.querySelector('.header');
export const resultContainer = document.querySelector('.results');
export const searchContainer = document.querySelector('.search-container');
export const introText = document.querySelector('.intro-text');
export const upButton = document.querySelector('.go-up-btn');
export const logo = new Image();

logo.src = Logo;
logo.classList.add('logo-btn');

/**
 * The `init` function prepends a logo to the header, restores the home
 * state, and retrieves data from local storage.
 */

export const init = function () {
  header.prepend(logo);
  restoreHome();
  getLocalStorage();
};

// Restore the layout to its initial settings
/**
 * The `restoreHome` function hides the result container, removes the 'on-search' class from the search
 * container, and shows the intro text.
 */
export const restoreHome = function () {
  resultContainer.classList.add('hidden');
  searchContainer.classList.remove('on-search');
  introText.classList.remove('hidden');
};

// Spinner for data loading
/**
 * The `renderSpinner` function inserts a spinner element into a specified parent element.
 * @param parentEl - The `parentEl` parameter in the `renderSpinner` function is the element to which
 * the spinner markup will be added.
 */
export const renderSpinner = function (parentEl) {
  const markup = `<span class="spinner"></span>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

/**
 * The function `displayUpBtn` checks the scroll position of the document body and toggles the
 * visibility of an element based on the scroll position.
 */
export const displayUpBtn = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upButton.classList.remove('hidden');
  } else upButton.classList.add('hidden');
};

/**
 * The `goUp` function scrolls the webpage to the top when called.
 */
export const goUp = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
