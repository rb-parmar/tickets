'use strict';


const movieName = document.querySelector('.movie-name');
const cityName = document.querySelector('.city-name');
var movieList = document.querySelector('.movie-list nav ul');
var cityList = document.querySelector('.city-list nav ul');


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


const movieListName = [
  "Avengers: Infinity war", "Eternals", "The Devil Wears Prada", 
  "Spider-Man: No Way Home", "The Flash", "The Lion King", "The Shining", 
  "Toy Story 3", "No Time To Die", "The Batman", "Gone In 60 Seconds",
  "F9: The Fast Saga"
];


/* Auto complete feature for movies */

movieName.addEventListener('keyup', function() {
  let value = movieName.value.toLowerCase().trim();
  movieList.innerHTML = '';
  movieList.style.display = 'none';
  let count = 0;

  // Show options of the movies that match
  if (value.length > 1) {
    movieListName.forEach(element => {
      const name = element.toLowerCase();

      if (name.includes(value)) {
        movieList.innerHTML += `<li class="movie-element">${element}</li>`;
        movieList.style.display = 'block';
        count++;
      }
    })

    // Movie not found 
    if (count === 0) {
      movieList.style.display = 'block';
      movieList.innerHTML = `<li>Movie not found</li>`;
    }

    var movieOption = document.querySelectorAll('.movie-element');
    for (let i = 0; i < movieOption.length; i++ ) {
      movieOption[i].addEventListener('click', () => {
        movieName.value = movieOption[i].innerText;
        movieList.innerHTML = '';
        movieList.style.display = 'none';
      })
    }
    
    console.log(movieOption);
  }
})


const cityListName = [
  'Alberta', 'Ottawa', 'Halifax', 'Quebec', 'Saskatchewan', 'Vancouver',
  'Victoria', 'Winnipeg'
];

/* Auto complete feature for cities */
cityName.addEventListener('keyup', function() {
  let value = cityName.value.toLowerCase().trim();
  cityList.innerHTML = '';
  cityList.style.display = 'none';
  let count = 0;

  // Show options of the movies that match
  if (value.length > 1) {
    cityListName.forEach(element => {
      const name = element.toLowerCase();

      if (name.includes(value)) {
        cityList.innerHTML += `<li class="city-element">${element}</li>`;
        cityList.style.display = 'block';
        count++;
      }
    })

    // City not found 
    if (count === 0) {
      cityList.style.display = 'block';
      cityList.innerHTML = `<li>City not found</li>`;
    }    

    var cityOption = document.querySelectorAll('.city-element');
    for (let i = 0; i < cityOption.length; i++ ) {
      cityOption[i].addEventListener('click', () => {
        cityName.value = cityOption[i].innerText;
        cityList.innerHTML = '';
        cityList.style.display = 'none';
      })
    }    
  }
})

