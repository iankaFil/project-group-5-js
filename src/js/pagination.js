// НАСТРОЙКА ПАГИНАЦИИ
import { refs } from './refs';
import { setPageToUrl } from './setPageUrl';
import { getUrlFromSearchParam, getFilmsByUrl } from './api';

let totalPages = 0;
let currentPage = 1;
let pageLinks = 5; //   количество кнопок ((нечетные числа, пример - 1 2 [3] 4 5))
const paginationRange = Math.floor(pageLinks / 2);
let startPaginationPage = 1;
let stopPaginationPage = pageLinks;

refs.pagination.addEventListener('click', gotoPage); // переход на страницу в пагинаторе

// пагинация перейти на указанную  страницу
function gotoPage({ target }) {
  if (target.tagName === 'BUTTON') {
    currentPage = Number(target.dataset.gotopage);
    setPageToUrl(currentPage);
    getFilmsByUrl(getUrlFromSearchParam());
    scrollTop();
  }
}

//  функция отображения пагинации TODO устранить глюк при приближении к концу страниц, отображается меньше кнопок,
// Добавить последнюю страницу и три точки ... на версии больше мобилки
function displayPagination(response) {
  let pages = [];

  // if (totalPages > 1) {
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
      }
    }

    if (currentPage > 1) {
      pages.push(
        `<button data-gotopage="${
          currentPage - 1
        }" class="pagination__button back" type="button"></button>`
      );
    }

    for (let i = startPaginationPage; i <= stopPaginationPage; i += 1) {
      console.log('🚀 ~ file: index.js:333 ~ i', i);

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
        `<button data-gotopage="${
          currentPage + 1
        }" class="pagination__button forward" type="button"></button>`
      );
    }

    refs.pagination.innerHTML = pages.join('');
  }
}

export { gotoPage, displayPagination };
