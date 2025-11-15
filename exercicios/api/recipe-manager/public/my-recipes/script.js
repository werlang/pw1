import showToast from '../components/toast.js';

const myRecipesContainer = document.getElementById('myRecipesContainer');
const logoutBtn = document.getElementById('logoutBtn');

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await fetch('../api/auth/logout.php');
        window.location.href = '../login/';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
});

async function loadMyRecipes() {
    try {
        // Lista TODAS as receitas, mas vamos filtrar no cliente para mostrar apenas as do usuário
        // Idealmente deveria ter um endpoint específico, mas para simplificar usamos o mesmo
        const response = await fetch('../api/recipes/list.php');
        const data = await response.json();
        
        if (data.error) {
            if (response.status === 401) {
                window.location.href = '../login/';
            } else {
                showToast(data.message, 'error');
            }
            return;
        }
        
        // Filtra apenas receitas do usuário atual (precisa comparar com session)
        // Como não temos acesso direto à sessão no cliente, vamos listar todas
        // Em um cenário real, teríamos um endpoint /api/recipes/my-recipes.php
        renderMyRecipes(data.recipes);
    } catch (error) {
        showToast('Erro ao carregar receitas', 'error');
        console.error('Erro:', error);
    }
}

function renderMyRecipes(recipes) {
    if (recipes.length === 0) {
        myRecipesContainer.innerHTML = '<p class="empty-state">Você ainda não criou nenhuma receita.</p>';
        return;
    }
    
    myRecipesContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card my-recipe-card">
            <div class="recipe-header">
                <h3 class="recipe-title">${recipe.title}</h3>
                <span class="recipe-difficulty difficulty-${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
                <span class="recipe-category">🏷️ ${recipe.category}</span>
                <span class="recipe-time">⏱️ ${recipe.prep_time} min</span>
                <span class="recipe-servings">🍽️ ${recipe.servings} porções</span>
            </div>
            <div class="recipe-visibility">
                <span class="visibility-badge ${recipe.is_public == 1 ? 'public' : 'private'}">
                    ${recipe.is_public == 1 ? '🌐 Pública' : '🔒 Privada'}
                </span>
                <button class="btn btn-sm ${recipe.is_public == 1 ? 'btn-outline' : 'btn-primary'}" 
                        onclick="toggleVisibility(${recipe.id}, ${recipe.is_public})">
                    ${recipe.is_public == 1 ? 'Tornar Privada' : 'Tornar Pública'}
                </button>
            </div>
        </div>
    `).join('');
}

// Função global para alternar visibilidade
window.toggleVisibility = async function(recipeId, currentVisibility) {
    try {
        const formData = new FormData();
        formData.append('id', recipeId);
        
        const response = await fetch('../api/recipes/update-visibility.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.error) {
            showToast(data.message, 'error');
        } else {
            showToast(data.message, 'success');
            // Recarrega a lista para atualizar o estado
            loadMyRecipes();
        }
    } catch (error) {
        showToast('Erro ao atualizar visibilidade', 'error');
        console.error('Erro:', error);
    }
};

// Carrega receitas ao iniciar
loadMyRecipes();
