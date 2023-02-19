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

// Display movie details
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movieId}`);

    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="details-top">
            <div>${
                movie.poster_path
                    ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">`
                    : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}">`
            }
            </div>
            <div>
                <h2>${movie.title}</h2>
                <p><i class="fas fa-star text-primary"></i> 
                ${movie.vote_average.toFixed(1)} / 10</p>
                <p class="text-muted">Release Date: ${movie.release_date}</p>
                <p>${movie.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${movie.genres
                        .map((genre) => `<li>${genre.name}</li>`)
                        .join('')}
                </ul>
                <a href="${
                    movie.homepage
                }" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
                <li><span class="text-secondary">Budget: </span>
                $${movie.budget.toLocaleString()}
                </li>
                <li><span class="text-secondary">Revenue: </span>
                $${movie.revenue.toLocaleString()}
                </li>
                <li><span class="text-secondary">Runtime: </span>
                ${movie.runtime} minutes
                </li>
                <li><span class="text-secondary">Status: </span>
                ${movie.status}
                </li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                ${movie.production_companies
                    .map((company) => `<span>${company.name}</span>`)
                    .join(', ')}
                </div>
        </div>`;
    document.querySelector('#movie-details').appendChild(div);
}

// Display movie details
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
    const show = await fetchAPIData(`tv/${showId}`);

    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="details-top">
            <div>${
                show.poster_path
                    ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}">`
                    : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}">`
            }
            </div>
            <div>
                <h2>${show.name}</h2>
                <p><i class="fas fa-star text-primary"></i> 
                ${show.vote_average.toFixed(1)} / 10</p>
                <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
                <p>${show.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${show.genres
                        .map((genre) => `<li>${genre.name}</li>`)
                        .join('')}
                </ul>
                <a href="${
                    show.homepage
                }" target="_blank" class="btn">Visit Show Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Show Info</h2>
            <ul>
                <li><span class="text-secondary">Episodes: </span>
                ${show.number_of_episodes}
                </li>
                <li><span class="text-secondary">Last Episode to Air: </span>
                ${show.last_episode_to_air.name}
                </li>
                <li><span class="text-secondary">Status: </span>
                ${show.status}
                </li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                ${show.production_companies
                    .map((company) => `<span>${company.name}</span>`)
                    .join(', ')}
                </div>
        </div>`;
    document.querySelector('#show-details').appendChild(div);
}

// Display backdrop on details pages
function displayBackgroundImage(type, backgroundPath) {
    const divOverlay = document.createElement('div');
    divOverlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    divOverlay.style.backgroundSize = 'cover';
    divOverlay.style.backgroundPosition = 'center';
    divOverlay.style.backgroundRepeat = 'no-repeat';
    divOverlay.style.height = '100vh';
    divOverlay.style.width = '100vw';
    divOverlay.style.position = 'absolute';
    divOverlay.style.top = '0';
    divOverlay.style.left = '0';
    divOverlay.style.zIndex = '-1';
    divOverlay.style.opacity = '0.1';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(divOverlay);
    } else if (type === 'tv') {
        document.querySelector('#show-details').appendChild(divOverlay);
    }
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
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
