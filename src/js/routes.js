// Объект с обработчиками роутов (навигация)
const routes = {
  '/': home,
  '/project-group-5-js/': home, // ИСПРАВИТЬ НА ПУТЬ ПРОЕКТА НА GITHUB
  '/library': library,
  '/project-group-5-js/library': library, // ИСПРАВИТЬ НА ПУТЬ ПРОЕКТА НА GITHUB
};

// Получаем текущий роут из URL
const route = window.location.pathname;
console.log('ROUTE', route);
console.log('window.location', window.location);

// Проверяем, что у нас есть обработчик для этого роута
if (routes[route]) {
  // Вызываем обработчик роута
  routes[route]();
} else {
  console.log('Route not found');
}

// Функция, которая будет вызываться для обработки роута '/'
function home() {
  console.log('Home page');

  // Парсим параметры запроса
  const params = new URLSearchParams(window.location.search);

  // Проверяем, что есть параметр search
  if (params.has('search')) {
    console.log(`Search: ${params.get('search')}`);
  }

  searchWordToInput();

  getGenres().then(genresArray => {
    genres = genresArray;
    getFilmsByUrl(getUrlFromSearchParam());
  });
}

// Функция, которая будет вызываться для обработки роута '/library'
function library() {
  displayElement(refs.searchForm, false); // убираю форму поиска
  displayElement(refs.libraryButtonsBlock, true); // показываю кнопки watched и queue

  const mode = getRoute('mode') || 'queue'; // если маршрут пустой то по умолчанию переходим на страницу 'queue'
  console.log('🚀 ~ file: index.js:200 ~ library ~ mode', mode);

  showMoviesFromLocalstorage(mode); // показываю фильмы из сохраненных в локалсторедже
  setRoute('library', { mode: mode }); // по умочанию переходим на  список queue
  highlighteHeaderButtons(); // крашу кнопки
}
