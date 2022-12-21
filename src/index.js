
//244-295

// обновляет визуальное и текстовое состояния кнопок на бэкдропе TODO переписать на render и брать статус кнопок в свойствах объекта
function renderBackdropButtonsState() {
  const buttonJsWatched = backdrop.querySelector('button.js-watched');

  const buttonJsQueue = backdrop.querySelector('button.js-queue');

  // вынести этот код в отдельную функцию
  if (
    loadArayFromLocalStorage('watched').includes(
      String(buttonJsWatched.dataset.id)
    )
  ) {
    buttonJsWatched.textContent = 'remove from watched';
    buttonJsWatched.classList.add('highlighted');
  } else {
    buttonJsWatched.classList.remove('highlighted');
    buttonJsWatched.textContent = 'add to watched';
  }

  if (
    loadArayFromLocalStorage('queue').includes(String(buttonJsQueue.dataset.id))
  ) {
    buttonJsQueue.textContent = 'remove from queue';
    buttonJsQueue.classList.add('highlighted');
  } else {
    buttonJsQueue.classList.remove('highlighted');
    buttonJsQueue.textContent = 'add to queue';
  }
}

//  проверка данных  в форме и если все гуд то отправка
function checkForm(event) {
  event.preventDefault();
  let inputValue = searchForm.elements.search.value;

  inputValue = inputValue.trim();

  if (inputValue.length === 0) {
    return false;
  } else {
    searchForm.elements.search.value = inputValue;
    searchForm.submit();
  }
}

function searchWordToInput() {
  const currentURL = window.location.href;
  const searchWord = new URL(currentURL).searchParams.get('search');
  if (searchWord !== null) {
    searchMovieInput.value = searchWord.trim();
  }

const axios = require('axios').default;
const API_KEY = '31449444226ba6345698313fe055564a';
const LANGUAGE = 'ru';
//https://api.themoviedb.org/3/configuration/languages?api_key=31449444226ba6345698313fe055564a

import noImg from '../images/no-image.jpg';

let genres = [];

// НАСТРОЙКА ПАГИНАЦИИ
let totalPages = 0;
let currentPage = 1;
let pageLinks = 5; //   количество кнопок ((нечетные числа, пример - 1 2 [3] 4 5))
const paginationRange = Math.floor(pageLinks / 2);
let startPaginationPage = 1;
let stopPaginationPage = pageLinks;
//------------------------------------------------

const movieContainer = document.querySelector('.js-movies-container');
const pagination = document.querySelector('.js-paginator');
const searchMovieInput = document.querySelector('.js-search-form__input');
const searchForm = document.querySelector('.js-search-form');
const backdrop = document.querySelector('.backdrop');
const libraryButtonsBlock = document.querySelector('.js-library-buttons-block');
const buttonLibraryWatched = document.querySelector('.js-watched');
const buttonLibraryQueue = document.querySelector('.js-queue');

window.addEventListener('load', highlightActiveLink); // подсветка кнопок текущей страницы в хедере

// Клик на кнопку  WATCHED в хедере
buttonLibraryWatched.addEventListener('click', () => {
  showMoviesFromLocalstorage('watched');
  buttonLibraryWatched.classList.add('highlighted');
  buttonLibraryQueue.classList.remove('highlighted');
  setRoute('library', { mode: 'watched' }); // переходим на  список watched
});

// Клик на кнопку  QUEUE в хедере
buttonLibraryQueue.addEventListener('click', () => {
  showMoviesFromLocalstorage('queue');
  buttonLibraryQueue.classList.add('highlighted');
  buttonLibraryWatched.classList.remove('highlighted');
  setRoute('library', { mode: 'queue' }); // переходим на  список queue
});

// Объект с обработчиками роутов (навигация)
const routes = {
  '/': home,
  '/js-group-project/': home, // ИСПРАВИТЬ НА ПУТЬ ПРОЕКТА НА GITHUB
  '/library': library,
  '/js-group-project/library': library, // ИСПРАВИТЬ НА ПУТЬ ПРОЕКТА НА GITHUB
};

// Получаем текущий роут из URL
const route = window.location.pathname;
console.log('ROUTE', route);
console.log('window.location', window.location);

// Проверяем, что у нас есть обработчик для этого роута
if (routes[route]) {
  // Вызываем обработчик роута
  routes[route]();
} else {
  console.log('Route not found');

}
