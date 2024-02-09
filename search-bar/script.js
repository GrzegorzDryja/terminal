'use strict';

const searchBar = document.getElementById('search-bar');
const suggestions = document.getElementById('suggestions');
const loader = document.getElementById('loader');

let loading = false;
let searchRequest = '';
let searchResponse = [];
let fetchSuggestionsTimeout;

searchBar.addEventListener('input', (event) => {
  searchRequest = event.target.value;
  clearTimeout(fetchSuggestionsTimeout);

  if (searchRequest.length <= 2) {
    clearSearchSuggestions();
    return;
  }

  fetchSuggestionsTimeout = setTimeout(fetchSuggestions, 200);
});

const clearSearchSuggestions = () => {
  suggestions.setAttribute('class', 'suggestions suggestions--disabled');
  suggestions.querySelectorAll('div').forEach((div) => div.remove());
};

const fetchSuggestions = async () => {
  loading = true;
  loader.setAttribute('class', 'loader loader--enabled');

  try {
    const response = await fetch(` https://dummyjson.com/products/search?q=${searchRequest}&limit=5&delay=1000`);
    const data = await response.json();

    if (data) {
      loading = false;
      searchResponse = data.products;
      clearSearchSuggestions();
    }

    if (data.products.length === 0) {
      searchResponse = [{ title: 'Nie znalazłem sugestii... Spróbuj wpisać inne hasło :)', price: '0.0' }];
    }
  } catch (error) {
    console.error(error);
  } finally {
    loader.setAttribute('class', 'loader loader--disabled');
    showSuggestions();
  }
};

const showSuggestions = () => {
  suggestions.setAttribute('class', 'suggestions suggestions--enabled');
  searchResponse.forEach((product) => {
    suggestions.appendChild(createSuggestionDiv({ title: product.title, price: product.price }));
  });
};

const createSuggestionDiv = ({ title, price }) => {
  const containerDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const priceDiv = document.createElement('div');

  titleDiv.innerText = title;
  priceDiv.innerText = `$${price}`;

  containerDiv.appendChild(titleDiv);
  containerDiv.appendChild(priceDiv);

  containerDiv.setAttribute('class', 'suggestion-item');

  return containerDiv;
};
