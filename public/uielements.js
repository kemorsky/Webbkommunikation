// Den här filen ansvarar för alting inom UI. Allting som visar, uppdaterar, och tar bort elementer från sidan finns här. Jag tyckte det var bra ide för att hålla alla
// elementer som ansvarar för samma sak på en plats.

import { addButton, searchButton } from './inputs.js';
import { getMovies, updateMovieWatchedStatus, deleteMovie, addMovie } from './firebase.js'

async function displayMovies(searchTerm = '') {
    try {
        const movies = await getMovies();

        const moviesElem = document.querySelector('#movies-container');
        moviesElem.innerHTML = '';

        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filteredMovies.forEach(movie => {
            createMovieElement(movie, moviesElem);
        });
    } catch (error) {
        console.log('bajs ' + error);
    }
}

function createMovieElement(movie, parentElem) {
    const movieElem = document.createElement('section');
    const movieTitle = document.createElement('h2');
    const movieGenre = document.createElement('h3');
    const movieReleaseDate = document.createElement('p');
    const movieWatchedStatus = document.createElement('button');
    const deleteButton = document.createElement('button');

    movieTitle.innerText = `${movie.title}`;
    movieGenre.innerText = `Genre: ${movie.genre}`;
    movieReleaseDate.innerText = `Release Date: ${movie.releaseDate}`;

    movieElem.classList.add('movie-container');
    movieWatchedStatus.classList.add('movie-watched');
    deleteButton.classList.add('delete-btn');

    movieWatchedStatus.innerText = movie.watched ? 'Mark as Not Watched' : 'Mark as Watched';

    movieWatchedStatus.addEventListener('click', async () => {
        movie.watched = !movie.watched;
        movieWatchedStatus.innerText = movie.watched ? 'Mark as Not Watched' : 'Mark as Watched';
        updateMovieWatchedStatus(movie.id, movie.watched);
        await displayMovies();
    });

    deleteButton.innerText = 'Delete movie';
    deleteButton.addEventListener('click', async () => {
        movieElem.remove();
        deleteMovie(movie.id);
    });

    movieElem.append(movieTitle);
    movieElem.append(movieGenre);
    movieElem.append(movieReleaseDate);
    movieElem.append(movieWatchedStatus);
    movieElem.append(deleteButton);

    parentElem.appendChild(movieElem);
}

addButton.addEventListener('click', async() => {
    const inputTitle = document.querySelector('#input-title').value;
    const movies = await getMovies()
    const titleExists = movies.some(movie => movie.title === inputTitle); // kollar om titlen finns i databasen redan

    if (titleExists) {
        console.log('This title already exists!');

    } else { // om nej adderar den ny film till databasen
        const movie = {
            title: inputTitle,
            genre: document.querySelector('#input-genre').value,
            releaseDate: document.querySelector('#datepicker-input').value,
            watched: false,
        }

        addMovie(movie);

    }
})

export { addButton, searchButton, displayMovies, createMovieElement };