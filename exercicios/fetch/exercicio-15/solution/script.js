import showToast from "./components/toast.js";

let currentPage = 1;
let dishesPerPage = 6;

async function loadDishes(page = 1, limit = dishesPerPage) {
    currentPage = page;
    const category = document.querySelector('#categoryFilter').value;
    
    const params = new URLSearchParams({
        page: page,
        limit: limit
    });
    if (category) params.append('category', category);
    
    try {
        const data = await fetch(`/api/dish/list.php?${params}`).then(res => res.json());
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        renderDishes(data.dishes);
        renderPagination(data.pagination);
    } catch (error) {
        showToast('Erro ao carregar pratos', 'error');
    }
}

function renderDishes(dishes) {
    const container = document.querySelector('#dishesList');
    container.innerHTML = '';
    
    if (!dishes || dishes.length === 0) {
        container.innerHTML = '<p class="no-dishes">Nenhum prato encontrado.</p>';
        return;
    }
    
    dishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.innerHTML = `
            <div class="dish-header">
                <h3 class="dish-name">${dish.name}</h3>
                <span class="dish-category">${dish.category}</span>
            </div>
            <p class="dish-description">${dish.description}</p>
            <p class="dish-price">R$ ${parseFloat(dish.price).toFixed(2).replace('.', ',')}</p>
        `;
        container.appendChild(card);
    });
}

function renderPagination(pagination) {
    const existingPagination = document.querySelector('.pagination');
    if (existingPagination) {
        existingPagination.remove();
    }
    
    const container = document.querySelector('#dishesList').parentElement;
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    
    paginationDiv.innerHTML = `
        <button class="btn-pagination" id="prevPage" ${pagination.page === 1 ? 'disabled' : ''}>← Anterior</button>
        <span class="page-info">Página ${pagination.page} de ${pagination.totalPages}</span>
        <button class="btn-pagination" id="nextPage" ${pagination.page === pagination.totalPages ? 'disabled' : ''}>Próxima →</button>
    `;
    
    const prevBtn = paginationDiv.querySelector('#prevPage');
    prevBtn.addEventListener('click', () => loadDishes(currentPage - 1));
    
    const nextBtn = paginationDiv.querySelector('#nextPage');
    nextBtn.addEventListener('click', () => loadDishes(currentPage + 1));
    
    container.appendChild(paginationDiv);
}

document.querySelector('#categoryFilter').addEventListener('change', () => loadDishes(1));

loadDishes();
