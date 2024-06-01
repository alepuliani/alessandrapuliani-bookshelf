import BookOnerror from '../img/book-onerror.png';
import axios from 'axios';
import {
  renderSpinner,
  resultContainer,
  introText,
  searchContainer,
} from './elements';
import { backWindow } from './description';

// Selecting necessary elements for the API calls
const titleDiv = document.querySelector('.title-div');
const searchResults = document.querySelector('.results-container');
const errorDiv = document.createElement('div');

// What happens when the user enters a genre to search for
/**
 * The function `getGenre` takes user input, processes it to search for books, and updates the UI
 * accordingly.
 * @param event - The `event` parameter in the `getGenre` function is an event object that is passed as
 * an argument when the function is called. It is used to prevent the default behavior of a form
 * submission, in this case, with `event.preventDefault()`. This helps in handling form submissions and
 * performing actions
 */
export const getGenre = function (event) {
  {
    event.preventDefault();
    renderSpinner(searchResults);

    const userInput = document
      .querySelector('.search-field')
      .value.toLowerCase()
      .trim();

    if (userInput) {
      titleDiv.textContent = '';

      resultContainer.classList.remove('hidden');
      introText.classList.add('hidden');
      searchContainer.classList.add('on-search');

      getBooks(userInput);
      document.querySelector('.search-field').value = '';
    }
  }
};

// What happens when the genre is not present in the external library
/**
 * The function `wrongGenre` displays an error message indicating that a specific book genre cannot be
 * found.
 * @param genre - The `wrongGenre` function takes a `genre` parameter as input. If the genre provided
 * is not found in the search results, an error message is displayed indicating that the genre couldn't
 * be found and suggesting to try another book genre.
 */
const wrongGenre = function (genre) {
  searchResults.append(errorDiv);
  errorDiv.innerHTML = `<p><i class="bi bi-emoji-frown"></i> Can't find '${genre}', please try another book genre.</p>`;
  errorDiv.classList.add('error-results');
  errorDiv.classList.remove('hidden');
};

// API call to the external library and display of books
/**
 * The function `getBooks` asynchronously fetches and displays book information based on a specified
 * genre using the Open Library API.
 * @param genre - The `getBooks` function is an asynchronous function that fetches a list of books
 * based on a specified genre from the Open Library API. The `genre` parameter is the genre of books
 * that you want to retrieve.
 */
const getBooks = async function (genre) {
  try {
    const res = await axios.get(
      `https://openlibrary.org/subjects/${genre}.json?limit=100`
    );
    searchResults.innerHTML = '';
    errorDiv.classList.add('hidden');
    searchResults.classList.remove('error-results');

    const books = res.data.works;

    if (books.length !== 0) {
      const searchGenreTitle = `<h3><strong>${genre[0].toUpperCase()}${genre.slice(
        1
      )} books:</strong></h3>`;
      titleDiv.insertAdjacentHTML('beforeend', searchGenreTitle);

      books.forEach(book => {
        const card = `
        <button class="book-display" data-book-key=${book.key}>
              <img
              class="book-cover"
              src="https://covers.openlibrary.org/b/id/${book.cover_id}.jpg"
              alt="Book cover" 
              onerror="this.onerror=null; setTimeout(() => this.src = '${BookOnerror}', 5000)/>
              <div class="book-info">
                <p class="book-title"><strong>${book.title}</strong></p>
                <p class="book-author">${book.authors[0].name}</p>
              </div>
            </button>`;

        searchResults.insertAdjacentHTML('beforeend', card);
        console.log(book);
      });
    } else wrongGenre(genre);
  } catch (err) {
    searchResults.innerHTML = `Somenthing went wrong (Error: ${err})`;
  }
};
