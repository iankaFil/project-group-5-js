const axios = require('axios').default;
const API_KEY = '31449444226ba6345698313fe055564a';
const LANGUAGE = 'ru';

// API запрос, получаем инфу о фильме по его ID
export function showMovieDetails(id) {
  console.log(id);
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`;
  axios
    .get(url)
    .then(response => {
      renderMovieDetails(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.data.status_message);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
}

// API запрос на сервер получает список жанров
export async function getGenres() {
  return axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}` //language=en-US
    )
    .then(({ data }) => {
      // console.log('ЖАНРЫ ', data.genres);
      return data.genres;
    });
}

export function getGenreById(ids, arrGanres) {
  let arrNamesGenres = [];

  for (const id of ids) {
    for (const genre of arrGanres) {
      if (genre.id === id) {
        arrNamesGenres.push(genre.name);
      }
    }
  }

  // console.log(arrNamesGenres);
  return arrNamesGenres.length > 0
    ? arrNamesGenres.join(', ')
    : 'Genre not set';
}
