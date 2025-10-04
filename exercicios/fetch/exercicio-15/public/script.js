import showToast from "./components/toast.js";

// TODO: Implementar cardápio com paginação

let currentPage = 1;
let dishesPerPage = 6;

async function loadDishes(page = 1, limit = dishesPerPage) {
    // TODO: Atualizar currentPage
    // TODO: Obter categoria selecionada
    // TODO: Construir URLSearchParams com page, limit e category (se houver)
    // TODO: Fazer requisição para /api/dish/list.php
    // TODO: Chamar renderDishes e renderPagination com os dados
}

function renderDishes(dishes) {
    // TODO: Obter container #dishesList
    // TODO: Limpar conteúdo
    
    // TODO: Se não houver pratos, mostrar mensagem
    
    // TODO: Para cada prato, criar card com:
    // - dish-card
    // - dish-header (nome + categoria)
    // - dish-description
    // - dish-price (formatado como R$ 00,00)
}

function renderPagination(pagination) {
    // TODO: Remover paginação anterior se existir
    // TODO: Criar div.pagination com botões Anterior e Próxima
    // TODO: Desabilitar botões nos extremos
    // TODO: Mostrar "Página X de Y"
    // TODO: Adicionar eventos de click nos botões
    // TODO: Adicionar ao container
}

// TODO: Adicionar evento change no #categoryFilter
// Dica: Ao mudar categoria, voltar para página 1

// TODO: Carregar pratos ao iniciar

