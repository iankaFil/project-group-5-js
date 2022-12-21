import { refs } from './refs';
// import { templateMovie } from './templates';
const axios = require('axios').default;
import { SearchApiService } from './API';
const instance = new SearchApiService();

const API_KEY = '31449444226ba6345698313fe055564a';
const LANGUAGE = 'en-US';
const BASE_PATH = 'https://image.tmdb.org/t/p/';
let genres = [];
let page = 1;

export function renderMovies(data) {
  console.log(data);
  const movie = data.map(movie => templateMovie(movie)).join('');
  return (refs.moviesContainer.innerHTML = movie);
}

getGenres().then(genresArray => {
  genres = genresArray;
  console.log(genres);
  instance.getTrendingFilms().then(({ results }) => renderMovies(results));
});

function getGenreById(array) {
  return array.map(id => {
    const foundId = genres.find(genre => genre.id === id);
    return (id = foundId.name);
  });
}

// API запрос на сервер получает список жанров
async function getGenres() {
  return axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}` //language=en-US
    )
    .then(({ data }) => {
      console.log('ЖАНРЫ ', data.genres);
      return data.genres;
    });
}

function templateMovie({ id, title, poster_path, release_date, genre_ids }) {
  return `<li class="movies__item" id="${id}">
        <a href="#" class="movies__link">
          <div class="movies__img-wrap">
              <img
                src="${BASE_PATH}w300/${poster_path}"
                alt="${title}"
                width="395"
                
                class="movies__img"
              />
          </div>
          <div class="movies__info-wrap">
            <h2 class="movies__subtitle text-hidden">
              ${title}
            </h2>
            <p class="movies__data">${getGenreById(genre_ids)
      .slice(0, 2)
      .join(', ')} | <span>${getYearFromDate(release_date)}</span></p>
          </div>
        </a>
      </li>`;
}

function getYearFromDate(date) {
  const dateRelease = new Date(date);
  return dateRelease.getFullYear();
}
