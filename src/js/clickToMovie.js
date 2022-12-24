import { showMovieDetails } from './api';


export function addClickListenerToMovie() {
  document.querySelectorAll('.movie__link').forEach(element => {
    element.addEventListener('click', event => {
      showMovieDetails(element.dataset.movie);
      event.preventDefault();
    });
  });
}
