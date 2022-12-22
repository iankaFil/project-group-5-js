function getGenreById(ids, arrGanres) {
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
    ? arrNamesGenres.slice(0, 3).join(', ')
    : 'Genre not set';
}

// функция генерирует жанры TODO пересмотреть устройство, возможно заменить просто join
function getGenre(arr) {
  let genresOutput = [];
  for (const genre of arr) {
    genresOutput.push(genre.name);
  }

  return genresOutput.join(', ');
}

export { getGenreById, getGenre };
