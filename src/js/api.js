
import axios from 'axios';


import {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  LANGUAGE,
} from './api-vars';

import { displayPagination } from './pagination';
import { renderMovies } from './rendering';
import { renderMovieDetails } from './backdrop';




async function getGenres() {
  return axios
    .get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`
    )
    .then(({ data }) => {
      console.log('ЖАНРЫ ', data);

      return data;
    });
}

async function loadArrayMoviesByArrayOfIds(arrayOfMovieIds) {
  const arrayOfPromises = arrayOfMovieIds.map(async movieId => {
    const { data } = await axios.get(
      `${ID_URL}${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
    );
    return data;
  });


  const movies = await Promise.all(arrayOfPromises);

  return movies;
}


function getYearFromDate(date) {
  if (!date) {
    return 'no data';
  }
  const dateRelease = new Date(date);
  return dateRelease.getFullYear();
}


function getFilmsByUrl(url) {
  axios
    .get(url)
    .then(response => {
      renderMovies(response);

      displayPagination(response.data);
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


function showMovieDetails(id) {
  console.log(id);
  const url = `${ID_URL}${id}?api_key=${API_KEY}&language=${LANGUAGE}`;
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

function getUrlFromSearchParam() {
  const currentURL = window.location.href;
  const searchWord = new URL(currentURL).searchParams.get('search');
  const page = new URL(currentURL).searchParams.get('page');
  let query = '';
  if (searchWord) {
    query = page
      ? `${SEARCH_URL}?api_key=${API_KEY}&query=${searchWord}&page=${page}&language=${LANGUAGE}`
      : `${SEARCH_URL}?api_key=${API_KEY}&query=${searchWord}&language=${LANGUAGE}`;
  } else {
    query = page
      ? `${TREND_URL}?api_key=${API_KEY}&page=${page}&language=${LANGUAGE}`
      : `${TREND_URL}?api_key=${API_KEY}&language=${LANGUAGE}`;
  }
  return query;
}

export {
  getFilmsByUrl,
  getGenres,
  getYearFromDate,
  showMovieDetails,
  getUrlFromSearchParam,
  loadArrayMoviesByArrayOfIds,
};
