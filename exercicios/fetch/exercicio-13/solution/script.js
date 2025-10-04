import showToast from "./components/toast.js";

let movies = [];

async function loadMovies() {
    try {
        const data = await fetch('/api/movie/list.php').then(res => res.json());
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        movies = data.movies;
        renderMovies();
    } catch (error) {
        showToast('Erro ao carregar filmes', 'error');
    }
}

function renderMovies() {
    const container = document.querySelector('#moviesList');
    container.innerHTML = '';
    
    if (!movies || movies.length === 0) {
        container.innerHTML = '<p class="no-movies">Nenhum filme avaliado.</p>';
        return;
    }
    
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="movie-header">
                <div>
                    <h3 class="movie-title">${movie.title}</h3>
                    <span class="movie-year">${movie.year} • ${movie.genre}</span>
                </div>
                <div class="movie-rating">${'⭐'.repeat(parseInt(movie.rating))}</div>
            </div>
            <p class="movie-review">${movie.review}</p>
            <button class="btn btn-update" data-id="${movie.id}">Editar Avaliação</button>
        `;
        
        const editBtn = card.querySelector('.btn-update');
        editBtn.addEventListener('click', () => openEditModal(movie.id));
        
        container.appendChild(card);
    });
}

function openEditModal(movieId) {
    const movie = movies.find(m => m.id == movieId);
    if (!movie) return;
    
    document.querySelector('#movieId').value = movie.id;
    document.querySelector('#modalTitle').textContent = `Editar: ${movie.title}`;
    document.querySelector(`input[name="rating"][value="${movie.rating}"]`).checked = true;
    document.querySelector('#reviewInput').value = movie.review;
    
    document.querySelector('#editModal').classList.add('show');
}

function closeModal() {
    document.querySelector('#editModal').classList.remove('show');
    document.querySelector('#editForm').reset();
}

// Edit form submission
document.querySelector('#editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    
    try {
        const data = await fetch('/api/movie/update.php', {
            method: 'POST',
            body: fd
        }).then(res => res.json());
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        showToast('Avaliação atualizada com sucesso!', 'success');
        
        // Update movie in local array
        const index = movies.findIndex(m => m.id == data.movie.id);
        if (index !== -1) {
            movies[index] = data.movie;
            renderMovies();
        }
        
        closeModal();
    } catch (error) {
        showToast('Erro ao atualizar avaliação', 'error');
    }
});

// Close modal button
document.querySelector('#closeModal').addEventListener('click', closeModal);

// Close modal on outside click
document.querySelector('#editModal').addEventListener('click', (e) => {
    if (e.target.id === 'editModal') {
        closeModal();
    }
});

// Load movies on page load
loadMovies();
