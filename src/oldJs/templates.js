const BASE_PATH = 'https://image.tmdb.org/t/p/';

export function templateMovie({
  id,
  title,
  poster_path,
  release_date,
  genre_ids,
}) {
  return `<li class="movies__item" id="${id}">
        <a href="#" class="movies__link">
          <div class="movies__img-wrap">
              <img
                src="${BASE_PATH}w300/${poster_path}"
                alt="${title}"
                width="395"
                height="569"
                class="movies__img"
              />
          </div>
          <div class="movies__info-wrap">
            <h2 class="movies__subtitle text-hidden">
              ${title}
            </h2>
            <p class="movies__subtitle">${getGenreById(
              genre_ids,
              genres
            )} | <span>${getYearFromDate(release_date)}</span></p></p>
          </div>
        </a>
      </li>`;
}
// function getYearFromDate(date) {
//   const dateRelease = new Date(date);
//   return dateRelease.getFullYear();
// }
