import { refs } from './refs';

console.log(refs.searchForm);
console.log(refs.searchMovieInput);

refs.searchForm.addEventListener('submit', checkForm); // проверка формы при поиске фильма

//  проверка данных  в форме и если все гуд то отправка
function checkForm(event) {
  event.preventDefault();

  let inputValue = refs.searchForm.elements.search.value.trim();
  // inputValue = inputValue.trim();

  if (inputValue.length === 0) {
    console.log('000');
    return false;
  } else {
    refs.searchForm.elements.search.value = inputValue;
    refs.searchForm.submit();
  }
}

function searchWordToInput() {
  const currentURL = window.location.href;
  const searchWord = new URL(currentURL).searchParams.get('search');
  if (searchWord !== null) {
    searchMovieInput.value = searchWord.trim();
  }
}
