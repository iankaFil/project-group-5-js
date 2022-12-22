//  проверка данных  в форме и если все гуд то отправка
import { refs } from './refs';

export function checkForm(event) {
  event.preventDefault();
  let inputValue = refs.searchForm.elements.search.value;

  inputValue = inputValue.trim();

  if (inputValue.length === 0) {
    // console.log('Search result not successful. Enter the correct movie name.');
    refs.notificationWarning.style.visibility = 'visible';
    return false;
  } else {
    refs.searchForm.elements.search.value = inputValue;
    refs.searchForm.submit();
  }
}
