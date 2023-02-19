const global = {
    currentPage: window.location.pathname,
};

// Display 20 most popular movies
async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');
    results.forEach((movie) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const a = document.createElement('a');
        a.setAttribute('href', `movie-details.html?id=${movie.id}`);

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        movie.poster_path
            ? img.setAttribute(
                  'src',
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              )
            : img.setAttribute('src', '../images/no-image.jpg');
        img.setAttribute('alt', `${movie.title}`);
        a.appendChild(img);

        const divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = movie.title;
        divCardBody.appendChild(h5);

        const p = document.createElement('p');
        p.classList.add('card-text');
        p.innerHTML = `<small class="text-muted">Release: ${movie.release_date}</small>`;
        divCardBody.appendChild(p);

        divCard.appendChild(a);
        divCard.appendChild(divCardBody);

        document.querySelector('#popular-movies').appendChild(divCard);
    });
}

// Display 20 most popular tv shows
async function displayPopularShows() {
    const { results } = await fetchAPIData('tv/popular');
    results.forEach((show) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const a = document.createElement('a');
        a.setAttribute('href', `tv-details.html?id=${show.id}`);

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        show.poster_path
            ? img.setAttribute(
                  'src',
                  `https://image.tmdb.org/t/p/w500${show.poster_path}`
              )
            : img.setAttribute('src', '../images/no-image.jpg');
        img.setAttribute('alt', `${show.name}`);
        a.appendChild(img);

        const divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = show.name;
        divCardBody.appendChild(h5);

        const p = document.createElement('p');
        p.classList.add('card-text');
        p.innerHTML = `<small class="text-muted">Air Date: ${show.first_air_date}</small>`;
        divCardBody.appendChild(p);

        divCard.appendChild(a);
        divCard.appendChild(divCardBody);

        document.querySelector('#popular-shows').appendChild(divCard);
    });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = '58d8325e942989954ae55037aa14f785'; // Hide in production
    const API_URL = 'https://api.themoviedb.org/3';
    showSpinner();
    const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}`);
    const data = await response.json();
    hideSpinner();
    return data;
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

// Init app
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            console.log('Movie details');
            break;
        case '/tv-details.html':
            console.log('TV details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
