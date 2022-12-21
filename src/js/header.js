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