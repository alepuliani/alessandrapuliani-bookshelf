import {
  backWindow,
  yourBookshelfBooks,
  updateBookshelf,
  updateBtn,
} from './description';

const yourBookshelf = document.querySelector('.your-bookshelf');
const emptyBookshelfMessage = document.querySelector('.no-books-message');
export const clearBtn = document.querySelector('.clear-btn');

// Personal bookshelf display
/**
 * The function `displayBookshelf` removes the 'hidden' class from certain elements, adjusts the
 * position of `yourBookshelf`, and updates the visibility of other elements based on the presence of
 * books in `yourBookshelfBooks`.
 */
export const displayBookshelf = function () {
  backWindow.classList.remove('hidden');
  yourBookshelf.classList.remove('hidden');
  yourBookshelf.style.right = '-10px';

  if (!yourBookshelfBooks.length == 0) {
    emptyBookshelfMessage.classList.add('hidden');
    clearBtn.classList.remove('hidden');
  }
};

// Close the personal bookshelf
/**
 * The function `closeBookshelf` hides the back window and moves the bookshelf to the right by 300
 * pixels.
 */
export const closeBookshelf = function () {
  backWindow.classList.add('hidden');
  yourBookshelf.style.right = '-300px';
};

// Remove all books from favorites
/**
 * The clearBookshelf function clears the bookshelf by removing all books, displaying an empty
 * bookshelf message, hiding the clear button, and updating the bookshelf display.
 */
export const clearBookshelf = function () {
  yourBookshelfBooks.length = 0;
  emptyBookshelfMessage.classList.remove('hidden');
  clearBtn.classList.add('hidden');
  updateBookshelf();
  updateBtn();
};
