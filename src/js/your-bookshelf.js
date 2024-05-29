import {
  backWindow,
  yourBookshelfBooks,
  updateBookshelf,
  updateBtn,
} from './description';

const yourBookshelf = document.querySelector('.your-bookshelf');
const emptyBookshelfMessage = document.querySelector('.no-books-message');
export const clearBtn = document.querySelector('.clear-btn');

export const displayBookshelf = function () {
  backWindow.classList.remove('hidden');
  yourBookshelf.classList.remove('hidden');
  if (!yourBookshelfBooks.length == 0) {
    emptyBookshelfMessage.classList.add('hidden');
    clearBtn.classList.remove('hidden');
  }
};

export const closeBookshelf = function () {
  yourBookshelf.classList.add('hidden');
  backWindow.classList.add('hidden');
};

export const clearBookshelf = function () {
  yourBookshelfBooks.length = 0;
  emptyBookshelfMessage.classList.remove('hidden');
  clearBtn.classList.add('hidden');
  updateBookshelf();
  updateBtn();
};
