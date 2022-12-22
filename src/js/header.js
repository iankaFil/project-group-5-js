import { refs } from './refs';
import { showMoviesFromLocalstorage } from './localstorage';
import { getRoute, setRoute } from './routes';

// подсветка активной ссылки my-library и Home
function highlightActiveLink() {
  const currentURL = window.location.href;
  const currentPage = new URL(currentURL).pathname;

  const links = document.querySelectorAll('a.header__menu-link');
  const background = document.querySelector('.header');
  for (const link of links) {
    const linkPage = new URL(link.href).pathname;
    if (currentPage === linkPage) {
      link.classList.add('active');
      background.classList.add('header--library');
      background.classList.remove('header--home');
    } else {
      link.classList.remove('active');
      background.classList.add('header--home');
      background.classList.remove('header--library');
    }
  }
}

// подсветка кнопок (Watched queue) на странице my -library
function highlighteHeaderButtons() {
  // подсветка кнопок ЦФ
  if (getRoute('mode') === 'queue') {
    refs.buttonLibraryQueue.classList.add('highlighted');
  }
  if (getRoute('mode') === 'watched') {
    refs.buttonLibraryWatched.classList.add('highlighted');
  }
}

// Клик на кнопку  WATCHED в хедере
refs.buttonLibraryWatched.addEventListener('click', () => {
  showMoviesFromLocalstorage('watched');
  refs.buttonLibraryWatched.classList.add('highlighted');
  refs.buttonLibraryWatched.classList.add('header__btn--active');
  refs.buttonLibraryQueue.classList.remove('highlighted');
  refs.buttonLibraryQueue.classList.remove('header__btn--active');
  setRoute('library', { mode: 'watched' }); // переходим на  список watched
});

// Клик на кнопку  QUEUE в хедере
refs.buttonLibraryQueue.addEventListener('click', () => {
  showMoviesFromLocalstorage('queue');
  refs.buttonLibraryQueue.classList.add('highlighted');
  refs.buttonLibraryWatched.classList.remove('highlighted');
  refs.buttonLibraryQueue.classList.add('header__btn--active');
  refs.buttonLibraryWatched.classList.remove('header__btn--active');
  setRoute('library', { mode: 'queue' }); // переходим на  список queue
});

export { highlighteHeaderButtons, highlightActiveLink };
