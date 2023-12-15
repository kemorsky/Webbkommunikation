// Den här modulen ansvarar för sökning efter titel inom databasen på webbsidan. Jag tyckte det passar inte till andra moduler och därför ska den bli sin egen modul istället. 

import { getMovies } from './firebase.js'
import { displayMovies } from './uielements.js'

async function searchForMovie() {
    const inputSearch = document.querySelector('#input-search').value.trim();
    const movies = await getMovies();

    console.log('Input Title:', inputSearch);
    console.log('Movie Titles:', movies.map(movie => movie.title.trim().toLowerCase()));

    if (inputSearch === '') {
        displayMovies();
    } else {
        const movies = await getMovies();
        const titleExists = movies.some(
            movie => movie.title.trim().toLowerCase() === inputSearch.toLowerCase()
        );

        if (titleExists) {
            displayMovies(inputSearch);
        } else {
            console.log('Movie not in the database!');
        }
    }
}

export { searchForMovie }