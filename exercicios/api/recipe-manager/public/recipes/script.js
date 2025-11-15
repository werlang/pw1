import showToast from '../components/toast.js';

const recipesContainer = document.getElementById('recipesContainer');
const logoutBtn = document.getElementById('logoutBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilters = {
    category: '',
    difficulty: ''
};

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await fetch('../api/auth/logout.php');
        window.location.href = '../login/';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
});

// Filtros
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterType = btn.dataset.filterType;
        const filterValue = btn.dataset.filterValue;
        
        // Remove active da categoria certa
        document.querySelectorAll(`[data-filter-type="${filterType}"]`).forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        
        currentFilters[filterType] = filterValue;
        loadRecipes();
    });
});

async function loadRecipes() {
    try {
        let url = '../api/recipes/list.php?';
        
        if (currentFilters.category) {
            url += `category=${encodeURIComponent(currentFilters.category)}&`;
        }
        if (currentFilters.difficulty) {
            url += `difficulty=${encodeURIComponent(currentFilters.difficulty)}&`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            if (response.status === 401) {
                window.location.href = '../login/';
            } else {
                showToast(data.message, 'error');
            }
            return;
        }
        
        renderRecipes(data.recipes);
    } catch (error) {
        showToast('Erro ao carregar receitas', 'error');
        console.error('Erro:', error);
    }
}

function renderRecipes(recipes) {
    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p class="empty-state">Nenhuma receita encontrada com esses filtros.</p>';
        return;
    }
    
    recipesContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-header">
                <h3 class="recipe-title">${recipe.title}</h3>
                <span class="recipe-difficulty difficulty-${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p class="recipe-author">👨‍🍳 Por ${recipe.author_name}</p>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
                <span class="recipe-category">🏷️ ${recipe.category}</span>
                <span class="recipe-time">⏱️ ${recipe.prep_time} min</span>
                <span class="recipe-servings">🍽️ ${recipe.servings} porções</span>
            </div>
            <div class="recipe-ingredients">
                <strong>Ingredientes:</strong>
                <pre>${recipe.ingredients}</pre>
            </div>
        </div>
    `).join('');
}

// Carrega receitas ao iniciar
loadRecipes();
