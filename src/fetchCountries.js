const MAIN_URL = `https://restcountries.com/v3.1/name`;
const FILTER_RESPONSE = `fields=name,capital,population,flags,languages`;

export function fetchCountries(name) {
  if (name) {
    return fetch(`${MAIN_URL}/${name}?${FILTER_RESPONSE}`).then(onSuccessFetch);
  }
}

function onSuccessFetch(response) {
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
}
