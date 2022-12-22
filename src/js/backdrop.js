import { refs } from './refs';
import {
  loadArayFromLocalStorage,
  deleteMovieFromLocalStorage,
  addMovieToWatchedList,
  showMoviesFromLocalstorage,
} from './localstorage';
import { getRoute } from './routes';
import { getGenre } from './genres';

// рендерит фильм на бэкдроп
function renderMovieDetails(data) {
  console.log(data);
  refs.backdrop.classList.remove('is-hidden');
  const content = `
  
  <img class="movie-detail__image" ${
    data.poster_path
      ? 'src="https://image.tmdb.org/t/p/w300' + data.poster_path + '">'
      : 'src="' + noImg + '">'
  }
  <h1 class="movie-detail__title">${data.title}</h1>
  <table class="movie-detail__table">
<tbody>
  <tr>
    <td><span class="movie-detail__title-table-titles">Vote / Votes</span></td>
    <td>${data.vote_average} / ${data.vote_count}</td>
  </tr>
  <tr>
    <td><span class="movie-detail__title-table-titles">Popularity</span></td>
    <td>${data.popularity}</td>
  </tr>
  <tr>
    <td><span class="movie-detail__title-table-titles">Original Title</span></td>
    <td>${data.original_title}</td>
  </tr>
  <tr>
    <td><span class="movie-detail__title-table-titles">Genre</span></td>
    <td>${getGenre(data.genres)}</td>
  </tr>
</tbody>
</table>
<h2 class="movie-detail__about">About</h2>
  <p class="movie-detail__about-text">
  ${data.overview}
  </p>
  <div class="movie-detail__buttons-wrapper">
  <button
  class="movie-detail__button js-watched" data-id="${
    data.id
  }" type="button">add to Watched</button>
  <button
  class="movie-detail__button js-queue" data-id="${
    data.id
  }" type="button">add to queue</button>
  </div>
  `;
  refs.backdrop.querySelector('.movie-info').innerHTML = content;
  renderBackdropButtonsState();
}

// обработчик кликов на бэкдропе, закрытие его, реакция на кнопки ...
refs.backdrop.addEventListener('click', ({ target }) => {
  // закрытие бэкдропа
  if (target === refs.backdrop) {
    refs.backdrop.classList.add('is-hidden');
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

// обновляет визуальное и текстовое состояния кнопок на бэкдропе TODO переписать на render и брать статус кнопок в свойствах объекта
function renderBackdropButtonsState() {
  const buttonJsWatched = refs.backdrop.querySelector('button.js-watched');

  const buttonJsQueue = refs.backdrop.querySelector('button.js-queue');

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

export { renderMovieDetails };
