const API_KEY = 'Y18NoBOSqXUGlrIl6vIvXTZZgSAxZl2Z';
const BASE_URL = 'https://api.giphy.com/v1/gifs/search';

const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const gifContainer = document.getElementById('gifContainer');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    performSearch();
});

searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
});

async function performSearch() {
    const searchTerm = searchInput.value;
    const url = `${BASE_URL}?api_key=${API_KEY}&q=${searchTerm}&limit=15`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGifs(data.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayGifs(gifs) {
    gifContainer.innerHTML = '';

    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.classList.add('gif');
        gifContainer.appendChild(img);
    });
}
