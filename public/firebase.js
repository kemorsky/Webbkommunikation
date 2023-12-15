
// Jag bestämde mig att dela de har funktioner från andra filer för att den här är källan av hela projektet. Allting som behövs finns på en plats.
// Firebase config och alla 4 viktigasta funktioner finns tillsammans på en plats. 

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, getDocs, doc, collection, addDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { createMovieElement } from './uielements.js'

const firebaseConfig = {
    apiKey: "AIzaSyCX4Ei4IECl7y_uikUegOLocSwE_r8ft_U",
    authDomain: "movie-database-70c51.firebaseapp.com",
    projectId: "movie-database-70c51",
    storageBucket: "movie-database-70c51.appspot.com",
    messagingSenderId: "959131327993",
    appId: "1:959131327993:web:b4ed4d553e093e98177128",
    measurementId: "G-LYHZB34151"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getMovies() {
    try {
        const moviesRef = await getDocs(collection(db, 'movies'))
        const allMovies = [];

        moviesRef.forEach((doc => {
            const movieData = doc.data()
            const eachMovie = {
                id: doc.id,
                title: movieData.title,
                genre: movieData.genre,
                releaseDate: movieData.releaseDate,
                watched: movieData.watched
            }

            allMovies.push(eachMovie)
        }))

        return allMovies;

    } catch (error) {
        console.log('something shit the bed' + error)
    }
}

async function addMovie(movie) {
    try {
        movie.watched = movie.watched === 'true'; 
        const docRef = await addDoc(collection(db, 'movies'), {
            title: movie.title,
            genre: movie.genre,
            releaseDate: movie.releaseDate,
            watched: movie.watched,
        })
        movie.id = docRef.id;
        const moviesElem = document.querySelector('#movies-container');
        createMovieElement(movie, moviesElem);
    } catch (error) {
    }
}

async function deleteMovie(id) {
    try {
        await deleteDoc(doc(db, 'movies', id))

    } catch (error) {
        console.log('ice-cream machine broke ' + error)
    }
}

async function updateMovieWatchedStatus(movieId, watchedStatus) {
    try {
        const movieRef = doc(db, 'movies', movieId);
        console.log('Updating watched status:', movieId, watchedStatus);
        await updateDoc(movieRef, { watched: watchedStatus });
    } catch (error) {
        console.error('Failed to update watched status: ', error);
    }
}

export { getMovies, addMovie, deleteMovie, updateMovieWatchedStatus };