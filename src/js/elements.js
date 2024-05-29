import Logo from '../img/logo.png';
import { getLocalStorage } from './description';

const header = document.querySelector('.header');
export const resultContainer = document.querySelector('.results');
export const searchContainer = document.querySelector('.search-container');
export const introText = document.querySelector('.intro-text');
export const logo = new Image();

logo.src = Logo;
logo.classList.add('logo-btn');

export const init = function () {
  header.prepend(logo);
  restoreHome();
  getLocalStorage();
};

export const restoreHome = function () {
  resultContainer.classList.add('hidden');
  searchContainer.classList.remove('on-search');
  introText.classList.remove('hidden');
};

export const renderSpinner = function (parentEl) {
  const markup = `<span class="spinner"></span>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
