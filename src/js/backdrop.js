import { refs } from './refs';
// нужен импорт:
// loadArayFromLocalStorage;
// deleteMovieFromLocalStorage;
// addMovieToWatchedList;
// renderBackdropButtonsState;
// +++ getRoute;------ header.js
// +++ showMoviesFromLocalstorage; -------header.js
// addMovieToQueueList;

// обработчик кликов на бэкдропе, закрытие его, реакция на кнопки ...
refs.backdrop.addEventListener('click', ({ target }) => {
  // закрытие бэкдропа
  if (target === refs.backdrop) {
    refs.backdrop.classList.add('is-hidden');
  }

  // ловим нажатие на кнопку js-watched
  if (target.tagName === 'BUTTON' && target.classList.contains('js-watched')) {
    const idMovie = target.dataset.id;
    // console.log('PRESSED js-watched', idMovie);

    // проверка, есть ли ужe в watched такой фильм если есть, то deleteMovieFromLocalStorage
    if (loadArayFromLocalStorage('watched').includes(String(idMovie))) {
      // console.log('УДАЛИТЬ ', idMovie);
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
    // console.log('PRESSED js-queue');

    // проверка, есть ли ужe в queue такой фильм если есть то deleteMovieFromLocalStorage
    if (loadArayFromLocalStorage('queue').includes(String(idMovie))) {
      //   console.log('УДАЛИТЬ ', idMovie);
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
  //   console.dir(target);
});
