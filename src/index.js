//244-295

// обновляет визуальное и текстовое состояния кнопок на бэкдропе TODO переписать на render и брать статус кнопок в свойствах объекта
function renderBackdropButtonsState() {
  const buttonJsWatched = backdrop.querySelector('button.js-watched');

  const buttonJsQueue = backdrop.querySelector('button.js-queue');

  // вынести этот код в отдельную функцию
  if (
    loadArayFromLocalStorage('watched').includes(
      String(buttonJsWatched.dataset.id)
    )
  ) {
    buttonJsWatched.textContent = 'remove from watched';
    buttonJsWatched.classList.add('highlighted');
  } else {
    buttonJsWatched.classList.remove('highlighted');
    buttonJsWatched.textContent = 'add to watched';
  }

  if (
    loadArayFromLocalStorage('queue').includes(String(buttonJsQueue.dataset.id))
  ) {
    buttonJsQueue.textContent = 'remove from queue';
    buttonJsQueue.classList.add('highlighted');
  } else {
    buttonJsQueue.classList.remove('highlighted');
    buttonJsQueue.textContent = 'add to queue';
  }
}

//  проверка данных  в форме и если все гуд то отправка
function checkForm(event) {
  event.preventDefault();
  let inputValue = searchForm.elements.search.value;

  inputValue = inputValue.trim();

  if (inputValue.length === 0) {
    return false;
  } else {
    searchForm.elements.search.value = inputValue;
    searchForm.submit();
  }
}

function searchWordToInput() {
  const currentURL = window.location.href;
  const searchWord = new URL(currentURL).searchParams.get('search');
  if (searchWord !== null) {
    searchMovieInput.value = searchWord.trim();
  }
}
