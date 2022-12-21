
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

//-------------------------------------- BACKDROP
//
// обработчик кликов на бэкдропе, закрытие его, реакция на кнопки ...
backdrop.addEventListener('click', ({ target }) => {
  // закрытие бэкдропа
  if (target === backdrop) {
    backdrop.classList.add('is-hidden');
  }

  // ловим нажатие на кнопку js-watched
  if (target.tagName === 'BUTTON' && target.classList.contains('js-watched')) {
    const idMovie = target.dataset.id;
    console.log('PRESSED js-watched', idMovie);

    // проверка, есть ли ужу в watched такой фильм если есть то deleteMovieFromLocalStorage
    if (loadArayFromLocalStorage('watched').includes(String(idMovie))) {
      console.log('УДАЛИТЬ ', idMovie);
      deleteMovieFromLocalStorage(idMovie, 'watched');
    } else {
      // если же нет, то добавляем в список watched
      addMovieToWatchedList(target.dataset.id);
    }
    renderBackdropButtonsState(target);

    //проверяем, есть ли запрос mode
    if (getRoute('mode')) {
      showMoviesFromLocalstorage(getRoute('mode')); // обновляем содержимое списка на странице
    }
  }

  // ловим нажатие на кнопку js-queue
  if (target.tagName === 'BUTTON' && target.classList.contains('js-queue')) {
    const idMovie = target.dataset.id;
    console.log('PRESSED js-queue');

    // проверка, есть ли ужу в queue такой фильм если есть то deleteMovieFromLocalStorage
    if (loadArayFromLocalStorage('queue').includes(String(idMovie))) {
      console.log('УДАЛИТЬ ', idMovie);
      deleteMovieFromLocalStorage(idMovie, 'queue');
    } else {
      // если же нет, то добавляем в список queue
      addMovieToQueueList(target.dataset.id);
    }
    renderBackdropButtonsState(target);

    //проверяем, есть ли запрос mode
    if (getRoute('mode')) {
      showMoviesFromLocalstorage(getRoute('mode')); // обновляем содержимое списка на странице
    }
  }
  // в консоль выводим место куда нажали
  console.dir(target);
});

searchForm.addEventListener('submit', checkForm); // проверка формы при поиске фильма
pagination.addEventListener('click', gotoPage); // переход на страницу в пагинаторе

// показывает или склывает элемент true показать, false скрыть, также передаем элемент
function displayElement(element, isHide) {
  if (element) {
    // Скрываем элемент
    element.style.display = isHide ? 'block' : 'none';
  }
}

async function showMoviesFromLocalstorage(keyOfStorage) {
  //  показывает фильмы по ключу переменной в Localstorage
  const queueArray = loadArayFromLocalStorage(keyOfStorage);
  if (queueArray.length > 0) {
    // проверка на пустой массив
    const arrayOfPromises = queueArray.map(async movieId => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
      );
      return data;
    });
    // 2. Запускаем все промисы параллельно и ждем их завершения
    const movies = await Promise.all(arrayOfPromises);
    console.log(movies);
    renderMoviesFromLocalstorageArray(movies);
  } else {
    movieContainer.innerHTML = ''; // Если фильмов нет, то очищаем
  }
}

// выводит на страницу список фильмов из локалсторедж, тебует параметр data массив с списком объектов - фильмов
// TODO Неплохо бы заменить эту функцию renderMovies предварительно приготовив нормально данные с локалстореджа, которые она сможет съесть
function renderMoviesFromLocalstorageArray(data) {
  const movies = data
    .map(movie => {
      return `
      <li class="movie">
        <a href="#show-moovie=${movie.id}"
         class="movie__link" data-movie="${movie.id}">
        <img class="movie__image" ${
          movie.poster_path
            ? 'src="https://image.tmdb.org/t/p/w300' + movie.poster_path + '">'
            : 'src="' + noImg + '">'
        }
        </a>
        <h2 class="movie__title">${movie.title}</h2>
        <p class="movie__description">
          ${movie.genres.map(({ name }) => name).join(', ')}
         | <span>
        ${getYearFromDate(movie.release_date)}
        </span>
        <span class="movie__rating">${movie.vote_average}</span>
        </p>
        </li>`;
    })
    .join(''); //${getYearFromDate(movie.release_date)}    ${getGenreById(
  console.log(data);

  movieContainer.innerHTML = movies;

  addClickListenerToMovie();
}

// Функция, которая будет вызываться для обработки роута '/'
function home() {
  console.log('Home page');

  // Парсим параметры запроса
  const params = new URLSearchParams(window.location.search);

  // Проверяем, что есть параметр search
  if (params.has('search')) {
    console.log(`Search: ${params.get('search')}`);
  }

  searchWordToInput();

  getGenres().then(genresArray => {
    genres = genresArray;
    getFilmsByUrl(getUrlFromSearchParam());
  });
  }
