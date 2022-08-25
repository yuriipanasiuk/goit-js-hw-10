import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const countryName = refs.input.value.trim();
  if (!countryName) {
    return clearPage();
  }

  fetchCountries(countryName).then(renderPages).catch(onError);
}

function renderPages(data) {
  if (data.length >= 10) {
    clearPage();
    moreThenTenCountries();
  } else if (data.length >= 2 && data.length < 10) {
    clearPage();
    lessThenTenCountries(data);
  } else {
    onlyOneCountry(data);
  }
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
}

function moreThenTenCountries() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function lessThenTenCountries(items) {
  const markup = items
    .map(item => {
      return `<li style="list-style: none; font-size: 24px" ><img style="margin-right: 10px" src="${item.flags.png}" alt="${item.name.official}" width="30"> ${item.name.official}</li>`;
    })
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function onlyOneCountry(items) {
  clearPage();

  const lang = Object.values(items[0].languages);

  refs.countryInfo.innerHTML = `<div>
  <img style= "margin-right: 20px" src="${items[0].flags.png}" alt="${items[0].name.official}" width="50"> 
  <p class="country-name">${items[0].name.official}</p>
  <p>Capital:<span> ${items[0].capital}</span></p>
  <p>Population: <span>${items[0].population}</span></p>
  <p>Languages: <span>${lang}</span></p>
  </div> `;
}

function clearPage() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
