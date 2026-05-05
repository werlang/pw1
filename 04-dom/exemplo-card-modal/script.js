import { createModal } from "./modal.js";
import { createCard } from "./card.js";

const movies = [];

const addMovieButton = document.querySelector('#add-movie');
addMovieButton.addEventListener('click', () => {
    const modal = createModal('Cadastro de Filmes', `
        <span>Título</span>
        <input id="movie-title" placeholder="O Senhor dos Anéis">
        <span>Ano</span>
        <input placeholder="2001" type=number id="movie-year">
        <span>Gênero</span>
        <select id="movie-genre">
            <option>Ação</option>
            <option>Fantasia</option>
            <option>Ficção</option>
            <option>Romance</option>
            <option>Comédia</option>
            <option>Terror</option>
            <option>Drama</option>
        </select>
    `, [{
        text: 'Cadastrar',
        clickEvent: addMovie
    }]);

    const inputTitle = modal.querySelector('#movie-title');
    const inputYear = modal.querySelector('#movie-year');
    const inputGenre = modal.querySelector('#movie-genre');

    function addMovie() {
        const movie = {
            title: inputTitle.value,
            year: inputYear.value,
            genre: inputGenre.value,
        };
        movies.push(movie);
        renderMovies();
    }
});

const movieList = document.querySelector('#movie-list');

function renderMovies() {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const card = createCard(movie.title, `
            <div>Ano: <span>${movie.year}</span></div>    
            <div>Gênero: <span>${movie.genre}</span></div>
        `);
        movieList.append(card);
    });
}
