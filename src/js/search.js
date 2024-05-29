import axios from 'axios';
import {
  renderSpinner,
  resultContainer,
  introText,
  searchContainer,
} from './elements';

const titleDiv = document.querySelector('.title-div');
const searchResults = document.querySelector('.results-container');
const errorDiv = document.createElement('div');

export const getGenre = function (event) {
  {
    event.preventDefault();
    renderSpinner(searchResults);

    const userInput = document.querySelector('.search-field').value;
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

const wrongGenre = function (genre) {
  searchResults.append(errorDiv);
  errorDiv.innerHTML = `<p><i class="bi bi-emoji-frown"></i> Can't find '${genre}', please try another book genre.</p>`;
  errorDiv.classList.add('error-results');
  errorDiv.classList.remove('hidden');
};

const getBooks = async function (genre) {
  axios
    .get(`https://openlibrary.org/subjects/${genre}.json?limit=20`)
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
              alt=""
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
