// НАСТРОЙКА ПАГИНАЦИИ
import { refs } from './refs';
import { setPageToUrl } from './setPageUrl';
import { getUrlFromSearchParam, getFilmsByUrl } from './api';

let totalPages = 0;
let firstPage = 1;
let currentPage = 1;
let pageLinks = 5;
const paginationRange = Math.floor(pageLinks / 2);
let startPaginationPage = 1;
let stopPaginationPage = pageLinks;

refs.pagination.addEventListener('click', gotoPage);

function gotoPage({ target }) {
  if (target.tagName === 'BUTTON') {
    currentPage = Number(target.dataset.gotopage);
    setPageToUrl(currentPage);
    getFilmsByUrl(getUrlFromSearchParam());
    scrollTop();
  }
}

//  функция отображения пагинации
function displayPagination(response) {
  let pages = [];
  let lastPage = response.total_pages;

  if (response.total_pages > 1) {
    if (pageLinks >= response.total_pages) {
      pageLinks = response.total_pages;
    }

    if (currentPage <= 1 + paginationRange) {
      startPaginationPage = 1;
      stopPaginationPage = pageLinks;
    } else {
      startPaginationPage = currentPage - paginationRange;

      stopPaginationPage = currentPage + paginationRange;
      if (stopPaginationPage > response.total_pages) {
        stopPaginationPage = response.total_pages;
        startPaginationPage = response.total_pages - 4;
      }
    }

    if (currentPage > 1) {
      pages.push(
        `<button data-gotopage="${
          currentPage - 1
        }" class="pagination__button back" type="button"></button>`,
        `<span class="ellipsis"><sup>...</sup></span>`
      );
      if (currentPage > 4) {
        pages.splice(
          1,
          0,
          `<button data-gotopage="${firstPage}" class="pagination__button" type="button">${firstPage}</button>`
        );
      }
    }

    for (let i = startPaginationPage; i <= stopPaginationPage; i += 1) {
      if (currentPage === i) {
        pages.push(
          `<button data-gotopage="${i}" class="pagination__button current" type="button">${i}</button>`
        );
      } else {
        pages.push(
          `<button data-gotopage="${i}" class="pagination__button" type="button">${i}</button>`
        );
      }
    }

    if (currentPage < response.total_pages) {
      pages.push(
        `<span class="ellipsis"><sup>...</sup></span>`,
        `<button data-gotopage="${
          currentPage + 1
        }" class="pagination__button forward" type="button"></button>`
      );
    }
    if (currentPage < response.total_pages - 3) {
      pages.splice(
        pages.length - 1,
        0,
        `<button data-gotopage="${lastPage}" class="pagination__button" type="button">${lastPage}</button>`
      );
    }

    refs.pagination.innerHTML = pages.join('');
  }
}

// скролит страницу  вверх
function scrollTop() {
  window.scrollTo(0, 0);
}

export { gotoPage, displayPagination };
