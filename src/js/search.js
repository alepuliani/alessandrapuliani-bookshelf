import axios from 'axios';
import {
  renderSpinner,
  resultContainer,
  introText,
  searchContainer,
} from './elements';

// Selecting necessary elements for the API calls
const titleDiv = document.querySelector('.title-div');
const searchResults = document.querySelector('.results-container');
const errorDiv = document.createElement('div');

// What happens when the user enters a genre to search for
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
const wrongGenre = function (genre) {
  searchResults.append(errorDiv);
  errorDiv.innerHTML = `<p><i class="bi bi-emoji-frown"></i> Can't find '${genre}', please try another book genre.</p>`;
  errorDiv.classList.add('error-results');
  errorDiv.classList.remove('hidden');
};

// API call to the external library and display of books
const getBooks = async function (genre) {
  await axios
    .get(`https://openlibrary.org/subjects/${genre}.json?limit=100`)
    .then(res => {
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
            />
              <div class="book-info">
                <p class="book-title"><strong>${book.title}</strong></p>
                <p class="book-author">${book.authors[0].name}</p>
              </div>
            </button>`;

          searchResults.insertAdjacentHTML('beforeend', card);
        });
      } else wrongGenre(genre);
    })
    .catch(
      err => (searchResults.innerHTML = `Somenthing went wrong (Error: ${err})`)
    );
};
