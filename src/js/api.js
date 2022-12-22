const axios = require('axios').default;
import { displayPagination } from './pagination';
import {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  LANGUAGE,
} from './api-vars';

// API запрос на сервер получает список жанров
export async function getGenres() {
  return axios
    .get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}` //language=en-US
    )
    .then(({ data }) => {
      // console.log('ЖАНРЫ ', data.genres);
      return data.genres;
    });
}
