// den här filen kopplar allting tillsammans och är grunden för hela webbsidan. Jag har också bestämt mig att hålla två eventlisteners som jag tyckte passade inte på andra filer

import { addButton, searchButton, displayMovies } from './uielements.js';
import { getMovies, addMovie, deleteMovie, updateMovieWatchedStatus } from './firebase.js';
import { inputTitle, inputGenre, datepickerInput, inputSearch } from './inputs.js';
import { searchForMovie } from './search-movie.js'

displayMovies();

searchButton.addEventListener('click', () => {searchForMovie() })

document.addEventListener('DOMContentLoaded', function (){
    const datepickerInput = document.getElementById('datepicker-input');

    flatpickr(datepickerInput, {
        dateFormat: 'd-m-y', 
    });
});