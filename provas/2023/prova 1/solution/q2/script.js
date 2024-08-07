const moviesList = [
    {
        title: "Matrix",
        genre: "Ficção",
        year: 1999,
        image : "images/matrix.jpg"
    },
    {
        title: "O Poderoso Chefão",
        genre: "Crime",
        year: 1972,
        image : "images/o-poderoso-chefao.jpg"
    },
    {
        title: "Interestelar",
        genre: "Ficção",
        year: 2014,
        image : "images/interestelar.jpg"
    },
    {
        title: "O Senhor dos Anéis: O Retorno do Rei",
        genre: "Fantasia",
        year: 2003,
        image : "images/senhor-dos-aneis.jpg"
    },
    {
        title: "Vingadores: Ultimato",
        genre: "Ficção",
        year: 2019,
        image : "images/vingadores.jpg"
    },
    {
        title: "Cidade de Deus",
        genre: "Drama",
        year: 2002,
        image : "images/cidade-de-deus.jpg"
    },
    {
        title: "O Silêncio dos Inocentes",
        genre: "Suspense",
        year: 1991,
        image : "images/o-silencio-dos-inocentes.jpg"
    },
    {
        title: "Titanic",
        genre: "Romance",
        year: 1997,
        image : "images/titanic.jpg"
    },
    {
        title: "Batman: O Cavaleiro das Trevas",
        genre: "Ação",
        year: 2008,
        image : "images/batman.jpg"
    }
];

const cardContainer = document.querySelector('.movie-list');
const select = document.querySelector('#genre-select');

function selectMovie() {
    cardContainer.innerHTML = '';

    moviesList.forEach(movie => {
        if (movie.genre == select.value || select.value == 'Todos') {
            const card = `<div class="movie-card">
                <img src="${movie.image}">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-genre">${movie.genre}</div>
                <div class="movie-year">${movie.year}</div>
            </div>`;
        
            cardContainer.innerHTML += card;
        }
    });
}

select.addEventListener('change', () => {
    selectMovie();
});

selectMovie();