import { refs } from './refs';
import { showMoviesFromLocalstorage } from './localstorage';
import { getRoute, setRoute } from './routes';

function highlightActiveLink() {
  const currentURL = window.location.href;
  const currentPage = new URL(currentURL).pathname;

  for (const link of refs.links) {
    const linkPage = new URL(link.href).pathname;
    if (currentPage === linkPage) {
      setHeaderLibrary(link, refs.background);
    } else {
      setHeaderHome(link, refs.background);
    }
  }
}

function setHeaderLibrary(link, bg) {
  link.classList.add('active');
  bg.classList.add('header--library');
  bg.classList.remove('header--home');
}

function setHeaderHome(link, bg) {
  link.classList.remove('active');
  bg.classList.add('header--home');
  bg.classList.remove('header--library');
}

function highlighteHeaderButtons() {
  if (getRoute('mode') === 'queue') {
    refs.buttonLibraryQueue.classList.add('highlighted');
  }
  if (getRoute('mode') === 'watched') {
    refs.buttonLibraryWatched.classList.add('highlighted');
  }
}

refs.buttonLibraryWatched.addEventListener('click', () => {
  showMoviesFromLocalstorage('watched');
  setWatchedBtnActive();
  removeQueueBtnActivity();
  setRoute('library', { mode: 'watched' });
});

refs.buttonLibraryQueue.addEventListener('click', () => {
  showMoviesFromLocalstorage('queue');
  setQueueBtnActive();
  removeWatchedBtnActivity();
  setRoute('library', { mode: 'queue' });
});

function setWatchedBtnActive() {
  refs.buttonLibraryWatched.classList.add('highlighted');
  refs.buttonLibraryWatched.classList.add('header__btn--active');
}

function removeWatchedBtnActivity() {
  refs.buttonLibraryWatched.classList.remove('highlighted');
  refs.buttonLibraryWatched.classList.remove('header__btn--active');
}

function setQueueBtnActive() {
  refs.buttonLibraryQueue.classList.add('highlighted');
  refs.buttonLibraryQueue.classList.add('header__btn--active');
}

function removeQueueBtnActivity() {
  refs.buttonLibraryQueue.classList.remove('highlighted');
  refs.buttonLibraryQueue.classList.remove('header__btn--active');
}

export { highlighteHeaderButtons, highlightActiveLink };
