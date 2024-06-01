import axios from 'axios';

// Selectors for DOM elements
const descriptionWindow = document.querySelector('.description-window');
const descriptionDiv = document.querySelector('.description-div');
const favoriteUl = document.querySelector('.favorite-list');
export const backWindow = document.querySelector('.back-window');
export const favoriteBtn = document.querySelector('.favorite-btn');

// State variables
let bookTitle;
let bookDescription;
export let yourBookshelfBooks = [];

// Open the book description

/**
 * The function `openDescription` is an asynchronous function that retrieves a book description from an
 * API and displays it in a modal window on a web page.
 * @param event - The `event` parameter in the `openDescription` function is an event object that
 * represents an event being handled, such as a click event on a specific element. It contains
 * information about the event, such as the target element that triggered the event. In this case, it
 * is used to retrieve the
 */
export const openDescription = async function (event) {
  document.body.style.overflow = 'hidden';
  const bookCard = event.target.closest('.book-display');
  if (bookCard) {
    const bookKey = bookCard.getAttribute('data-book-key');
    try {
      const response = await axios.get(
        `https://openlibrary.org${bookKey}.json`
      );
      const bookData = response.data;
      bookTitle = bookData.title;
      bookDescription = bookData.description;

      if (typeof bookDescription === 'object' && 'value' in bookDescription) {
        bookDescription = bookDescription.value;
      }

      if (!bookDescription) {
        bookDescription = `The description of the book "${bookTitle}" is not available`;
      }

      displayDescription(bookTitle, bookDescription);
      updateBtn();
    } catch (error) {
      console.error(`Error fetching book data: ${error}`);
    }
  }
};

/**
 * The function `displayDescription` takes a title and description as parameters, updates the HTML
 * content of a div element with the provided title and description, and removes the 'hidden' class
 * from two other elements.
 * @param title - The `title` parameter is a string that represents the title of a description to be
 * displayed.
 * @param description - The `description` parameter in the `displayDescription` function is a string
 * that represents the description content to be displayed in the description window.
 */
const displayDescription = function (title, description) {
  descriptionWindow.classList.remove('hidden');
  backWindow.classList.remove('hidden');
  descriptionDiv.innerHTML = `
      <h1>${title}</h1>
      <p>${description}</p>`;
  descriptionWindow.scrollTop = 0;
};

// CLOSE THE BOO K DESCRIPTION
/**
 * The closeDescription function hides the description window, back window, and sets the body overflow
 * style to auto.
 */
export const closeDescription = function () {
  descriptionWindow.classList.add('hidden');
  backWindow.classList.add('hidden');
  document.body.style.overflow = 'auto';
  descriptionDiv.scrollTop = 0;
  descriptionDiv.innerHTML = '';
};

// Add a book to favorites
/**
 * The function `addToYourBookshelf` adds or removes a book title from the `yourBookshelfBooks` array
 * and then updates the button and bookshelf accordingly.
 */
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

/**
 * The updateBtn function updates the inner HTML of a button based on whether a book title is included
 * in a bookshelf array.
 */
export const updateBtn = function () {
  yourBookshelfBooks.includes(bookTitle)
    ? (favoriteBtn.innerHTML = '<i class="bi bi-suit-heart-fill"></i>')
    : (favoriteBtn.innerHTML = '<i class="bi bi-suit-heart"></i>');
};

// Display favorite books in the personal bookshelf
/**
 * The `updateBookshelf` function clears the favoriteUl element and populates it with book items from
 * the yourBookshelfBooks array, updating the local storage accordingly.
 */
export const updateBookshelf = function () {
  favoriteUl.innerHTML = '';
  if (yourBookshelfBooks.length > 0) {
    yourBookshelfBooks.forEach(book => {
      const listElement = document.createElement('li');
      listElement.textContent = book;
      favoriteUl.appendChild(listElement);
    });
  }
  setLocalStorage(yourBookshelfBooks);
};

// Ensure that the data remains in the store even if the app is closed
/**
 * The function `setLocalStorage` stores an array of books in the browser's local storage after
 * converting it to a JSON string.
 * @param books - The `books` parameter is an array of book objects that you want to store in the
 * browser's local storage. The `setLocalStorage` function takes this array of books, converts it to a
 * JSON string using `JSON.stringify`, and then stores it in the local storage under the key 'books'.
 */
const setLocalStorage = function (books) {
  localStorage.setItem('books', JSON.stringify(books));
};

/**
 * This function retrieves data from the local storage and updates the bookshelf with the existing
 * data.
 */
export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('books'));
  if (data) {
    yourBookshelfBooks = data;
    updateBookshelf();
  }
};
