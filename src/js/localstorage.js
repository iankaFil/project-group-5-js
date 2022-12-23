import { refs } from './refs';
import { getYearFromDate, loadArrayMoviesByArrayOfIds } from './api';
import { addClickListenerToMovie } from './clickToMovie';
import {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  LANGUAGE,
} from './api-vars';

import noImg from '../images/no-image.jpg';

// const axios = require('axios').default;
// достает массив из локалсторедж по ключу, если нет массива или переменнос этим ключем то выводит []
function loadArayFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

// удаляет фильм  из списка в локалсторедж по ключу 'key' -watched или queue и значению id фильма
function deleteMovieFromLocalStorage(movieId, key) {
  try {
    const Movies = JSON.parse(localStorage.getItem(key));
    const updatedMovies = Movies.filter(id => id !== movieId);
    localStorage.setItem(key, JSON.stringify(updatedMovies));
  } catch (error) {}
}

// сохраняет айди фильма в локалсторедж под ключем watched
function addMovieToWatchedList(id) {
  saveIdMovieToLocalStorage(id, 'watched', 'queue');
}

async function showMoviesFromLocalstorage(keyOfStorage) {
  //  показывает фильмы по ключу переменной в Localstorage
  const queueArray = loadArayFromLocalStorage(keyOfStorage);
  if (queueArray.length > 0) {
    // проверка на пустой массив
    let movies = await loadArrayMoviesByArrayOfIds(queueArray);
    console.log(
      '🚀 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ~ showMoviesFromLocalstorage ~ movies',
      movies
    );

    renderMoviesFromLocalstorageArray(movies);
  } else {
    refs.movieContainer.innerHTML = ''; // Если фильмов нет, то очищаем
  }
}

// async function loadArrayMoviesByArrayOfIds(arrayOfMovieIds) {
//   const arrayOfPromises = arrayOfMovieIds.map(async movieId => {
//     const { data } = await axios.get(
//       `${ID_URL}${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
//     );
//     return data;
//   });
//   // 2. Запускаем все промисы параллельно и ждем их завершения
//   return (movies = await Promise.all(arrayOfPromises));
// }

// сохраняет айди фильма в локалсторедж под ключем queue
function addMovieToQueueList(id) {
  saveIdMovieToLocalStorage(id, 'queue', 'watched');
}

// начинка функции addMovieToWatchedList
function saveIdMovieToLocalStorage(idMovie, key, keyToFindDuplicate) {
  let args = loadFromLocalStorage(key); // переписать на loadArayFromLocalStorage
  let duplicateKey = loadFromLocalStorage(keyToFindDuplicate); //  переписать на loadArayFromLocalStorage
  let arr = [];
  if (!args) {
    arr.push(idMovie);
  } else {
    arr.push(...args);
    if (!arr.includes(idMovie)) {
      arr.push(idMovie);
    }
  }
  saveToLocalStorage(key, arr);
  // удаление дубликата в массиве keyToFindDuplicate
  if (duplicateKey) {
    if (duplicateKey.indexOf(idMovie) !== -1) {
      duplicateKey.splice(duplicateKey.indexOf(idMovie), 1);
      saveToLocalStorage(keyToFindDuplicate, duplicateKey);
    }
  }
}

// сохраняет в локалсторедж переменную value по ключу key
function saveToLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

// достает переменную из локалсторедж по ключу
function loadFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
function cate(num) {
  return num < 0 ? Math.ceil(num) : Math.floor(num);
}
// выводит на страницу список фильмов из локалсторедж, тебует параметр data массив с списком объектов - фильмов
// TODO Неплохо бы заменить эту функцию renderMovies предварительно приготовив нормально данные с локалстореджа, которые она сможет съесть
function renderMoviesFromLocalstorageArray(data) {
  const movies = data
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
       <div class="movie__container">
        <p class="movie__description">
          ${movie.genres.map(({ name }) => name).join(', ')}
         | <span>
        ${getYearFromDate(movie.release_date)}
        </span>
        <div class="movie__container-rating"><span class="movie__rating">${movie.vote_average.toFixed(
          1
        )}</span></div>
        </p>
        </div>
        </div>
        </li>`;
    })
    .join(''); //${getYearFromDate(movie.release_date)}    ${getGenreById(
  console.log(data);

  refs.movieContainer.innerHTML = movies;

  addClickListenerToMovie();
}

export {
  loadArayFromLocalStorage,
  deleteMovieFromLocalStorage,
  addMovieToWatchedList,
  showMoviesFromLocalstorage,
  addMovieToQueueList,
};
