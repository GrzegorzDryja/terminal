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
  
  fetchSuggestionsTimeout = setTimeout(fetchSuggestions, 500);
});

const clearSearchSuggestions = () => {
  suggestions.setAttribute('class', 'suggestions suggestions--disabled');
  suggestions.querySelectorAll('p').forEach((p) => p.remove());
};

const fetchSuggestions = async () => {
  loading = true;
  loader.setAttribute('class', 'loader loader--enabled');

  const response = await fetch(` https://dummyjson.com/products/search?q=${searchRequest}&limit=5&delay=1000`);
  const data = await response.json();

  if (data) {
    loading = false;
    searchResponse = data.products;
    loader.setAttribute('class', 'loader loader--disabled');
    clearSearchSuggestions();
    showSuggestions();
  }

  if (data.products.length === 0) {
    searchResponse = [{ title: 'Nie znalazłem sugestii... Spróbuj wpisać inne hasło :)', price: 'To akurat nic nie kosztuje' }]
    showSuggestions()
  }
};

const showSuggestions = () => {
  suggestions.setAttribute('class', 'suggestions suggestions--enabled');
  searchResponse.forEach((product) => {
    const p = document.createElement('p');
    p.innerText = `${product.title} | ${product.price}`;
    suggestions.appendChild(p);
  });
};
