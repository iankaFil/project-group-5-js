import { refs } from './refs';
import { getGenreById } from './genres';
import { getYearFromDate } from './api';
import { addClickListenerToMovie } from './clickToMovie';
import { objParam } from './routes';

// let listGenresArrayFromApi = [];

import noImg from '../images/no-image.jpg';
import { startLoading, stopLoading } from './loader';

// создает разметку списка фильмов и добавляет его в movieContainer
export function renderMovies({ data }) {
  const movie = data.results
    .map(movie => {
      return `
      <li class="movie__item">
        <a href="#show-moovie=${movie.id}" 
         class="movie__link" data-movie="${movie.id}">
        <div class="movie__img-wrap">
        <img class="movie__image" ${
          movie.poster_path
            ? 'src="https://image.tmdb.org/t/p/w300' + movie.poster_path + '">'
            : 'src="' + noImg + '">'
        }
        </div>
        </a>
        <div class="movie__info-wrap">
        <h2 class="movie__title">${movie.title}</h2>
        <p class="movie__description"> 
        ${getGenreById(
          movie.genre_ids,
          objParam.arrayOfGenres
        )} | <span>${getYearFromDate(movie.release_date)}</span></p>
        </div>
        </li>`;
    })
    .join('');

  startLoading();
  refs.movieContainer.innerHTML = movie;
  stopLoading();

  addClickListenerToMovie();
}
