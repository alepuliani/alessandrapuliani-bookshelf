import '../css/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Elements imported from other files
import {
  init,
  restoreHome,
  resultContainer,
  logo,
  displayUpBtn,
} from './elements';
import {
  openDescription,
  closeDescription,
  addToYourBookshelf,
  favoriteBtn,
  backWindow,
} from './description';
import {
  closeBookshelf,
  displayBookshelf,
  clearBookshelf,
  clearBtn,
} from './your-bookshelf';
import { getGenre } from './search';

// Selecting necessary elements for the functioning of the app
const searchForm = document.querySelector('.search');
const yourBookshelfButton = document.querySelector('.your-bookshelf-btn');
const closeBookshelfBtn = document.querySelector('.close-bookshelf-btn');
const closeDescriptionButton = document.querySelector('.close-description-btn');

// App initialization
init();

/* These lines of code are setting up event listeners for various interactions in the app: */
window.addEventListener('scroll', displayUpBtn);
logo.addEventListener('click', restoreHome);

// Search
searchForm.addEventListener('submit', getGenre);

// Description
resultContainer.addEventListener('click', openDescription);
backWindow.addEventListener('click', closeDescription);
closeDescriptionButton.addEventListener('click', closeDescription);

// Personal bookshelf
yourBookshelfButton.addEventListener('click', displayBookshelf);
backWindow.addEventListener('click', closeBookshelf);
favoriteBtn.addEventListener('click', addToYourBookshelf);
closeBookshelfBtn.addEventListener('click', closeBookshelf);
clearBtn.addEventListener('click', clearBookshelf);
