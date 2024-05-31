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
export const displayBookshelf = function () {
  backWindow.classList.remove('hidden');
  yourBookshelf.classList.remove('hidden');
  yourBookshelf.style.right = '10px';

  if (!yourBookshelfBooks.length == 0) {
    emptyBookshelfMessage.classList.add('hidden');
    clearBtn.classList.remove('hidden');
  }
};

// Close the personal bookshelf
export const closeBookshelf = function () {
  backWindow.classList.add('hidden');
  yourBookshelf.style.right = '-300px';
};

// Remove all books from favorites
export const clearBookshelf = function () {
  yourBookshelfBooks.length = 0;
  emptyBookshelfMessage.classList.remove('hidden');
  clearBtn.classList.add('hidden');
  updateBookshelf();
  updateBtn();
};
