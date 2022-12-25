import { refs } from './refs';
import {
  loadArayFromLocalStorage,
  deleteMovieFromLocalStorage,
  addMovieToWatchedList,
  showMoviesFromLocalstorage,
  addMovieToQueueList,
} from './localstorage';
import { getRoute } from './routes';
import { getGenre } from './genres';
import { startLoading, stopLoading } from './loader';

function renderMovieDetails(data) {
  console.log(data);
  refs.backdrop.classList.remove('is-hidden');
  refs.bodyEl.classList.add('hidden');
  window.addEventListener('keydown', closeModalbyEscape);

  const content = `
  <div class="image-wrap">
  <img class="movie-detail__image" ${data.poster_path
      ? 'src="https://image.tmdb.org/t/p/w300' + data.poster_path + '">'
      : 'src="' + noImg + '">'
    }
  </div>

    <div class="info-wrap">
      <h1 class="movie-detail__title">${data.title}</h1>
      <table class="movie-detail__table">
        <tbody>
          <tr>
            <td><span class="movie-detail__title-table-titles">Vote / Votes</span></td>
            <td><span class="movie-detail__rating">${data.vote_average.toFixed(
      1
    )}</span>/<span class="movie-detail__info movie-votes">${data.vote_count
    }</span></td>
          </tr>
          <tr>
            <td><span class="movie-detail__title-table-titles">Popularity</span></td>
            <td><span class="movie-detail__info">${data.popularity}</span></td>
          </tr>
          <tr>
            <td><span class="movie-detail__title-table-titles">Original Title</span></td>
            <td><span class="movie-detail__info movie-detail__info--uppercase">${data.original_title
    }</span></td>
          </tr>
          <tr>
            <td><span class="movie-detail__title-table-titles">Genre</span></td>
            <td><span class="movie-detail__info">${getGenre(
      data.genres
    )}</span></td>
          </tr>
        </tbody>
      </table>
      <h2 class="movie-detail__about">About</h2>
      <p class="movie-detail__about-text">
        ${data.overview}
      </p>
      <div class="movie-detail__buttons-wrapper">
        <button
          class="movie-detail__button js-watched" data-id="${data.id
    }" type="button">add to Watched</button>
        <button
          class="movie-detail__button js-queue" data-id="${data.id
    }" type="button">add to queue</button>
      </div>
    </div>
  `;
  startLoading();
  refs.backdrop.querySelector('.movie-info-content').innerHTML = content;
  stopLoading();
  renderBackdropButtonsState();
}

refs.buttonCloseBackdrop.addEventListener('click', () => {
  refs.backdrop.classList.add('is-hidden');
  refs.bodyEl.classList.remove('hidden');
});

refs.backdrop.addEventListener('click', ({ target }) => {
  if (target === refs.backdrop) {
    refs.backdrop.classList.add('is-hidden');
    refs.bodyEl.classList.remove('hidden');
  }

  if (target.tagName === 'BUTTON' && target.classList.contains('js-watched')) {
    const idMovie = target.dataset.id;
    console.log('PRESSED js-watched', idMovie);

    if (loadArayFromLocalStorage('watched').includes(String(idMovie))) {
      console.log('УДАЛИТЬ ', idMovie);
      deleteMovieFromLocalStorage(idMovie, 'watched');
    } else {
      addMovieToWatchedList(target.dataset.id);
    }
    renderBackdropButtonsState(target);

    if (getRoute('mode')) {
      showMoviesFromLocalstorage(getRoute('mode'));
    }
  }

  if (target.tagName === 'BUTTON' && target.classList.contains('js-queue')) {
    const idMovie = target.dataset.id;
    console.log('PRESSED js-queue');

    if (loadArayFromLocalStorage('queue').includes(String(idMovie))) {
      console.log('УДАЛИТЬ ', idMovie);
      deleteMovieFromLocalStorage(idMovie, 'queue');
    } else {
      addMovieToQueueList(target.dataset.id);
    }
    renderBackdropButtonsState(target);

    if (getRoute('mode')) {
      showMoviesFromLocalstorage(getRoute('mode'));
    }
  }
  console.dir(target);
});

function renderBackdropButtonsState() {
  addAndRemoveToWatched();
  addAndRemoveToQueue();
}

function addAndRemoveToWatched() {
  const buttonJsWatched = refs.backdrop.querySelector('button.js-watched');
  if (
    loadArayFromLocalStorage('watched').includes(
      String(buttonJsWatched.dataset.id)
    )
  ) {
    onToggleClassAndText('add', buttonJsWatched, 'remove from watched')
  } else {
    onToggleClassAndText('remove', buttonJsWatched, 'add to watched')
  }
}
function addAndRemoveToQueue() {
  const buttonJsQueue = refs.backdrop.querySelector('button.js-queue');
  if (
    loadArayFromLocalStorage('queue').includes(String(buttonJsQueue.dataset.id))
  ) {
    onToggleClassAndText('add', buttonJsQueue, 'remove from queue')
  } else {
    onToggleClassAndText('remove', buttonJsQueue, 'add to queue')
  }
}
function onToggleClassAndText(method, btnName, textInBtn) {
  btnName.classList[method]('highlighted');
  btnName.textContent = `${textInBtn}`;
}

function closeModalbyEscape(event) {
  const isEscape = event.code === 'Escape';
  if (isEscape) {
    closeModal();
    refs.backdrop.classList.add('is-hidden');
    console.log(event.code);
  }
}

function closeModal() {
  if (refs.backdrop.classList.contains('is-hidden')) {
    window.removeEventListener('keydown', closeModalbyEscape);
  }
}

export { renderMovieDetails };
