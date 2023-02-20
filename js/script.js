const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
        totalResults: 0,
    },
    api: {
        apiKey: '58d8325e942989954ae55037aa14f785', // Hide in production
        apiUrl: 'https://api.themoviedb.org/3',
    },
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

// Search movies/shows
async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');

    if (global.search.term !== '' && global.search.term !== null) {
        const { results, total_pages, page, total_results } =
            await searchAPIData();

        global.search.page = page;
        global.search.totalPages = total_pages;
        global.search.totalResults = total_results;

        if (results.length === 0) {
            showAlert('No results found');
            return;
        }

        displaySearchResults(results);

        document.querySelector('#search-term').value = '';
    } else {
        showAlert('Please enter a search term');
    }
}

function displaySearchResults(results) {
    // Clear previous results
    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#search-results-heading').innerHTML = '';
    document.querySelector('#pagination').innerHTML = '';

    results.forEach((result) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const a = document.createElement('a');
        a.setAttribute(
            'href',
            `${global.search.type}-details.html?id=${result.id}`
        );

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        result.poster_path
            ? img.setAttribute(
                  'src',
                  `https://image.tmdb.org/t/p/w500${result.poster_path}`
              )
            : img.setAttribute('src', '../images/no-image.jpg');
        img.setAttribute(
            'alt',
            `${global.search.type === 'movie' ? result.title : result.name}`
        );
        a.appendChild(img);

        const divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent =
            global.search.type === 'movie' ? result.title : result.name;
        divCardBody.appendChild(h5);

        const p = document.createElement('p');
        p.classList.add('card-text');
        global.search.type === 'movie'
            ? (p.innerHTML = `<small class="text-muted">Release: ${result.release_date}</small>`)
            : (p.innerHTML = `<small class="text-muted">Air Date: ${result.first_air_date}</small>`);
        divCardBody.appendChild(p);

        divCard.appendChild(a);
        divCard.appendChild(divCardBody);

        document.querySelector('#search-results-heading').innerHTML = `
            <h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>`;

        document.querySelector('#search-results').appendChild(divCard);
    });

    displayPagination();
}

// Create and display pagination for search
function displayPagination() {
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `
        <div class="pagination">
            <button class="btn btn-primary" id="prev">Prev</button>
            <button class="btn btn-primary" id="next">Next</button>
            <div class="page-counter">${global.search.page} of ${global.search.totalPages}</div>
        </div>`;

    document.querySelector('#pagination').appendChild(div);

    // Disable prev button if on first page
    if (global.search.page === 1) {
        document.querySelector('#prev').disabled = true;
    }

    // Disable next button if on last page
    if (global.search.page === global.search.totalPages) {
        document.querySelector('#next').disabled = true;
    }

    // Next page
    document.querySelector('#next').addEventListener('click', async () => {
        global.search.page++;
        const { results, total_pages } = await searchAPIData();
        displaySearchResults(results);
    });

    // Prev page
    document.querySelector('#prev').addEventListener('click', async () => {
        global.search.page--;
        const { results, total_pages } = await searchAPIData();
        displaySearchResults(results);
    });
}

// Display slider movies
async function displaySlider() {
    const { results } = await fetchAPIData('movie/now_playing');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i>
                ${movie.vote_average} / 10
            </h4>`;
        document.querySelector('.swiper-wrapper').appendChild(div);

        initSwiper();
    });
}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            dosableOnInteraction: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    showSpinner();
    const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}`);
    const data = await response.json();
    hideSpinner();
    return data;
}

// Make request to search
async function searchAPIData() {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    showSpinner();
    const response = await fetch(
        `${API_URL}/search/${global.search.type}?api_key=${API_KEY}&query=${global.search.term}&page=${global.search.page}`
    );
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

// Show alert
function showAlert(message, className = 'error') {
    const divAlert = document.createElement('div');
    divAlert.classList.add('alert', className);
    divAlert.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(divAlert);

    setTimeout(() => divAlert.remove(), 3000);
}

// Init app
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
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
            search();
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
