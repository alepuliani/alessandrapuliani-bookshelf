import axios from 'axios';

//Elements for displaying the description
const descriptionWindow = document.querySelector('.description-window');
const descriptionDiv = document.querySelector('.description-div');
const favoriteUl = document.querySelector('.favorite-list');
export const backWindow = document.querySelector('.back-window');
export const favoriteBtn = document.querySelector('.favorite-btn');

let bookTitle;
export let yourBookshelfBooks = [];

// Open the book description
export const openDescription = async function (event) {
  document.body.style.overflow = 'hidden';
  const bookCard = event.target.closest('.book-display');
  if (bookCard) {
    const bookKey = bookCard.getAttribute('data-book-key');
    await axios
      .get(`https://openlibrary.org${bookKey}.json`)
      .then(res => {
        const bookDescription = res.data.description;
        bookTitle = res.data.title;

        descriptionWindow.classList.remove('hidden');
        backWindow.classList.remove('hidden');

        const bookInfo = `
      <h1>${bookTitle}</h1>
      <p>${bookDescription}</p>`;

        descriptionDiv.innerHTML = bookInfo;

        updateBtn();
      })
      .catch(err => console.log(err));
  }
};

// Close the book description
export const closeDescription = function () {
  descriptionWindow.classList.add('hidden');
  backWindow.classList.add('hidden');
  document.body.style.overflow = 'auto';
  descriptionDiv.innerHTML = '';
};

// Add a book to favorites
export const addToYourBookshelf = function () {
  if (!yourBookshelfBooks.includes(bookTitle)) {
    yourBookshelfBooks.push(bookTitle);
  } else {
    yourBookshelfBooks.splice(yourBookshelfBooks.indexOf(bookTitle), 1);
  }
  updateBtn();
  updateBookshelf();
};

// Update the display of favorite or non-favorite buttons
export const updateBtn = function () {
  if (yourBookshelfBooks.includes(bookTitle)) {
    favoriteBtn.innerHTML = '<i class="bi bi-suit-heart-fill"></i>';
  } else {
    favoriteBtn.innerHTML = '<i class="bi bi-suit-heart"></i>';
  }
};

// Display favorite books in the personal bookshelf
export const updateBookshelf = function () {
  favoriteUl.innerHTML = '';
  if (!yourBookshelfBooks.length == 0) {
    yourBookshelfBooks.forEach(book => {
      const listElement = `<li> ${book} </li>`;
      favoriteUl.insertAdjacentHTML('beforeend', listElement);
    });
  }
  setLocalStorage(yourBookshelfBooks);
};

// Ensure that the data remains in the store even if the app is closed
const setLocalStorage = function (books) {
  localStorage.setItem('books', JSON.stringify(books));
};

// Update the library with existing data
export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('books'));
  if (data) {
    yourBookshelfBooks = data;
    updateBookshelf();
  }
};
