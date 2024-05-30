import Logo from '../img/logo.png';
import { getLocalStorage } from './description';

// Selecting necessary elements for the functioning of the app
const header = document.querySelector('.header');
export const resultContainer = document.querySelector('.results');
export const searchContainer = document.querySelector('.search-container');
export const introText = document.querySelector('.intro-text');
export const logo = new Image();

logo.src = Logo;
logo.classList.add('logo-btn');

// App initialization function
export const init = function () {
  header.prepend(logo);
  restoreHome();
  getLocalStorage();
};

// Restore the layout to its initial settings
export const restoreHome = function () {
  resultContainer.classList.add('hidden');
  searchContainer.classList.remove('on-search');
  introText.classList.remove('hidden');
};

// Spinner for data loading
export const renderSpinner = function (parentEl) {
  const markup = `<span class="spinner"></span>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
