'use strict';

const searchBar = document.getElementById('search-bar');
const searchSuggestions = document.getElementById('search-suggestions');
const loader = document.getElementById('loader');

let loading = false;
let searchRequest = '';
let searchResponse = [];
let timeOut;

searchBar.addEventListener('input', (event) => {
  searchRequest = event.target.value;

  if (searchRequest.length < 3 || loading) {
    loader.setAttribute('class', 'loader loader--enabled');
    clearTimeout(timeOut);
    return;
  }

  //Zrób tak, żeby jak jest wysłany event, to żeby poczekał jakoś na kolejne dopisywania
  //A no i, żeby nie wysyłał jak cały czas jest coś wpisywane, delay

  timeOut = setTimeout(async () => {
    loading = true;
    // searchSuggestions.querySelectorAll('*').forEach(childNode => childNode.remove());

    const response = await fetch(` https://dummyjson.com/products/search?q=${searchRequest}&limit=5&delay=1000`);
    const data = await response.json();

    if (data) {
      loading = false;
      loader.setAttribute('class', 'loader loader--disabled');
    }
    if (data.products.length === 0) return;

    //Dodaj obsługę braku sugestii
    searchResponse = data.products;
    searchSuggestions.querySelectorAll('p').forEach(n => n.remove()); //To musi też zniknąć jak nie nic w wyszukiwaniu, można pokazywać tylko jak jest focus na input

    searchResponse.forEach((product) => {
      const p = document.createElement('p');
      p.innerText = `${product.title} | ${product.price}`;
      searchSuggestions.appendChild(p);
    });
  }, 500);
});
