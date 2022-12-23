import { refs } from './refs';

export function onThemeToggle(event) {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
}

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      refs.html.classList.add('dark');
      refs.iconTheme.textContent = 'dark_mode';
    } else {
      refs.html.classList.remove('dark');
      refs.iconTheme.textContent = 'wb_sunny';
    }
  } catch (err) {}
}
addDarkClassToHTML();
