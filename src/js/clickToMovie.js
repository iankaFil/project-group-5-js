import { showMovieDetails } from './api';

// TODO переписать на клин по родителю, а не вешать обработчики на каждую ссылку....
export function addClickListenerToMovie() {
  document.querySelectorAll('.movie__link').forEach(element => {
    element.addEventListener('click', event => {
      showMovieDetails(element.dataset.movie);
      event.preventDefault(); // предотвращаем открытие ссылки на карточке фильма
    });
  });
}
