import showToast from "./components/toast.js";

// TODO: Implementar edição de avaliações de filmes

let movies = [];

async function loadMovies() {
    // TODO: Carregar filmes da API
    // Dica: Use fetch para /api/movie/list.php
    // Dica: Armazene os filmes no array 'movies'
    // Dica: Chame renderMovies() após carregar
}

function renderMovies() {
    // TODO: Obter container #moviesList
    // TODO: Limpar conteúdo
    
    // TODO: Se não houver filmes, mostrar mensagem
    
    // TODO: Para cada filme, criar card com:
    // - movie-card
    // - movie-header (título, ano, gênero, rating em estrelas)
    // - movie-review (comentário)
    // - botão Editar com data-id
    
    // TODO: Adicionar evento de click no botão editar
}

function openEditModal(movieId) {
    // TODO: Buscar filme no array movies pelo ID
    
    // TODO: Preencher campos do modal:
    // - #movieId com o ID
    // - #modalTitle com o título
    // - Marcar o radio button da nota atual
    // - #reviewInput com o comentário
    
    // TODO: Adicionar classe 'show' ao #editModal
}

function closeModal() {
    // TODO: Remover classe 'show' do #editModal
    // TODO: Limpar formulário com reset()
}

// TODO: Adicionar evento submit no #editForm
// Dica: Enviar dados via POST para /api/movie/update.php
// Dica: Atualizar filme no array local após sucesso
// Dica: Re-renderizar lista de filmes
// Dica: Fechar modal

// TODO: Adicionar evento click no #closeModal

// TODO: Adicionar evento click no #editModal (fechar ao clicar fora)

// TODO: Carregar filmes ao iniciar a página

