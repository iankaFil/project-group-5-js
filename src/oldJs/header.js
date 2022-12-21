import { refs } from './refs';

export function onTogglePage(e) {
    onLibraryPageActive();
}

function onLibraryPageActive() {
    if (refs.pageHome.classList.contains('current')) {
        refs.pageHome.classList.toggle('current');
        refs.header.classList.remove('header--home');
        refs.pageLibrary.classList.add('current');
        refs.header.classList.add('header--library');
        onCreateLibraryPage();
    }
    if (onHomePageActive) {
        return;
    }
}
export function startAddCurentClass() {
    refs.pageHome.classList.add('current');
}

function onCreateLibraryPage() {
    refs.form.classList.toggle('visually-hidden');
    refs.btnLibrary.classList.toggle('visually-hidden');
}

export function onHomePageActive() {
    startAddCurentClass();
    refs.pageLibrary.classList.remove('current');
    refs.header.classList.remove('header--library');
    refs.header.classList.add('header--home');
    onCreateLibraryPage();
}

// Клик на кнопку  WATCHED в хедере
buttonLibraryWatched.addEventListener('click', () => {
    showMoviesFromLocalstorage('watched');
    buttonLibraryWatched.classList.add('highlighted');
    buttonLibraryQueue.classList.remove('highlighted');
});

// Клик на кнопку  QUEUE в хедере
buttonLibraryQueue.addEventListener('click', () => {
    showMoviesFromLocalstorage('queue');
    buttonLibraryQueue.classList.add('highlighted');
    buttonLibraryWatched.classList.remove('highlighted');
});
async function showMoviesFromLocalstorage(keyOfStorage) {
    //  показывает фильмы по ключу переменной в Localstorage
    const queueArray = loadArayFromLocalStorage(keyOfStorage);
    if (queueArray.length > 0) {
        // проверка на пустой массив
        const arrayOfPromises = queueArray.map(async movieId => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
            );
            return data;
        });

        const movies = await Promise.all(arrayOfPromises);
        console.log(movies);
        renderMoviesFromLocalstorageArray(movies);
    } else {
        movieContainer.innerHTML = '';
    }
}

function library() {
    displayElement(searchForm, false);
    displayElement(libraryButtonsBlock, true);
    showMoviesFromLocalstorage('queue');
    setRoute('library', { mode: 'queue' });
    highlighteHeaderButtons();
}

// подсветка кнопок (Watched queue) на странице my -library
function highlighteHeaderButtons() {
    // подсветка кнопок ЦФ
    if (getRoute('mode') === 'queue') {
        buttonLibraryQueue.classList.add('highlighted');
    }
    if (getRoute('mode') === 'watched') {
        buttonLibraryWatched.classList.add('highlighted');
    }
}

function getRoute(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

//setRoute('/', { search: 'avatar' }).
function setRoute(route, params) {
    // Генерируем URL с параметрами
    const searchParams = new URLSearchParams(params);
    const url = `${route}?${searchParams.toString()}`;

    // Задаем URL в строке браузера
    window.history.pushState({}, '', url);
}

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

// обработчик кликов на бэкдропе, закрытие его, реакция на кнопки ...
backdrop.addEventListener('click', ({ target }) => {
    // закрытие бэкдропа
    if (target === backdrop) {
        backdrop.classList.add('is-hidden');
    }

    // ловим нажатие на кнопку js-watched
    if (target.tagName === 'BUTTON' && target.classList.contains('js-watched')) {
        console.log('PRESSED js-watched');
        addMovieToWatchedList(target.dataset.id);
        renderBackdropButtonsState(target);
    }

    // ловим нажатие на кнопку js-queue
    if (target.tagName === 'BUTTON' && target.classList.contains('js-queue')) {
        console.log('PRESSED js-queue');
        addMovieToQueueList(target.dataset.id);
        renderBackdropButtonsState(target);
    }
    // в консоль выводим место куда нажали
    console.dir(target);
});