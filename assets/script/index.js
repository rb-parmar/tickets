'use strict';


const movieName = document.querySelector('.movie-name');
const cityName = document.querySelector('.city-name');
const movieList = document.querySelector('.movie-list nav ul');
const cityList = document.querySelector('.city-list nav ul');




const url = './assets/script/movies.json';
const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  mode: 'cors'
}
const display = document.querySelector('.display');

function showMovies(array) {
  display.innerHTML = '';

  if (array.length > 0) {
    array.forEach(poster => {
      display.innerHTML += `
      <div class="poster">
        <img class="poster-image" src="${poster.poster}">
        <div class="poster-name">${poster.title}</div>
      </div>
      `;
    });
  }
}

async function getMovies() {
  try {
    const response = await fetch(url, options); // fetch returns a promise

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    const data = await response.json(); // json also returns a promise
    showMovies(data.movies);
  } catch(error) {
    alert(error.message);
  }
}

/* Loading movies when the page loads */
window.addEventListener('load', () => {
  getMovies();
})