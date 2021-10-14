const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const defaultTheme = {
  theme: 'light',
};

import food_card from '../partials/food_card.hbs';
import food_cards from '../json/menu.json';
import refs from './refs/refs.js';
const foodCardMarkUp = food_card(food_cards);

refs.menu.insertAdjacentHTML('beforeend', foodCardMarkUp);

refs.theme_switcher.addEventListener('change', themeSwither); //swither listener

function setTheme(val) {
  //setTheme('dark' / 'light' / maybe other...)
  if (val === 'dark') {
    setDarkTheme();
  } else if (val === 'light') {
    setLightTheme();
  }
}

function setDarkTheme() {
  //set dark theme
  refs.body.classList.remove(Theme.LIGHT);
  refs.body.classList.add(Theme.DARK);
  localStorage.setItem('themeOnFood', JSON.stringify({ theme: 'dark' })); //save to local storage
}

function setLightTheme() {
  //set light theme
  refs.body.classList.remove(Theme.DARK);
  refs.body.classList.add(Theme.LIGHT);
  localStorage.removeItem('themeOnFood'); //save to local storage
}

function themeSwither(evt) {
  //switch theme after change status on theme input check
  if (evt.target.checked === true) {
    setTheme('dark');
  } else if (evt.target.checked === false) {
    setTheme('light');
  }
}

function initialiseThemeOnDownload() {
  const initThemeFood = JSON.parse(localStorage.getItem('themeOnFood'));
  const themeInit = { ...defaultTheme, ...initThemeFood };
  setTheme(themeInit.theme); //set theme on download page
  initialiseCheckOnDownload(); //set checker on theme page
}

function initialiseCheckOnDownload() {
  if (refs.body.classList.contains(Theme.DARK)) {
    refs.theme_switcher.setAttribute('checked', 'true');
  }
}

initialiseThemeOnDownload();
