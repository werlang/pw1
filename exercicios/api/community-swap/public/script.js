// Elementos do DOM
const itemsContainer = document.getElementById('items-container');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const statusButtons = document.querySelectorAll('.status-filter-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const userAvatar = document.getElementById('user-avatar');

// Estado atual dos filtros
let currentFilters = {
    search: '',
    category: '',
    status: ''
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadItems();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Busca com debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentFilters.search = searchInput.value.trim();
            loadItems();
        }, 500);
    });
    
    // Filtro de categoria
    categorySelect.addEventListener('change', () => {
        currentFilters.category = categorySelect.value;
        loadItems();
    });
    
    // Filtros de status
    statusButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            statusButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.status = btn.dataset.status;
            loadItems();
        });
    });
    
    // Logout
    logoutBtn.addEventListener('click', logout);
}

// Carregar categorias
async function loadCategories() {
    try {
        const response = await fetch('api/database.sql');
        // Como não temos endpoint de categorias, vamos adicionar manualmente
        // Em produção, deveria haver um endpoint api/categories/list.php
        const categories = [
            { id: 1, name: 'Livros' },
            { id: 2, name: 'Eletrônicos' },
            { id: 3, name: 'Roupas e Acessórios' },
            { id: 4, name: 'Jogos e Brinquedos' },
            { id: 5, name: 'Móveis e Decoração' },
            { id: 6, name: 'Esportes e Lazer' }
        ];
        
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}

// Carregar itens
async function loadItems() {
    showLoading();
    
    try {
        // Montar URL com filtros
        const params = new URLSearchParams();
        if (currentFilters.search) params.append('q', currentFilters.search);
        if (currentFilters.category) params.append('category', currentFilters.category);
        if (currentFilters.status) params.append('status', currentFilters.status);
        
        const response = await fetch(`api/items/list.php?${params.toString()}`);
        const data = await response.json();
        
        if (data.error) {
            showToast(data.message, 'error');
            showEmpty();
            return;
        }
        
        if (!data.items || data.items.length === 0) {
            showEmpty();
            return;
        }
        
        renderItems(data.items);
    } catch (error) {
        showToast('Erro ao carregar itens', 'error');
        console.error('Erro:', error);
        showEmpty();
    }
}

// Renderizar itens
function renderItems(items) {
    hideLoading();
    hideEmpty();
    
    itemsContainer.innerHTML = items.map(item => `
        <div class="item-card">
            <div class="item-header">
                <h3 class="item-title">${escapeHtml(item.title)}</h3>
                <div class="item-meta">
                    <span class="badge badge-category">${escapeHtml(item.category_name)}</span>
                    <span class="badge badge-${item.status}">${getStatusText(item.status)}</span>
                </div>
            </div>
            <div class="item-body">
                <p class="item-description">${escapeHtml(item.description)}</p>
                <div class="item-value">${parseFloat(item.suggested_value).toFixed(2)}</div>
                <div style="font-size: 0.8125rem; color: var(--gray-500);">
                    <strong>Oferecido por:</strong> ${escapeHtml(item.owner_name)}
                </div>
            </div>
            <div class="item-footer">
                <div style="font-size: 0.75rem; color: var(--gray-400);">
                    ${formatDate(item.created_at)}
                </div>
                <div class="item-actions">
                    <a href="update-item/?id=${item.id}" class="btn btn-sm btn-secondary">Editar</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Logout
async function logout() {
    try {
        const response = await fetch('api/auth/logout.php');
        const data = await response.json();
        
        showToast(data.message, 'success');
        setTimeout(() => {
            window.location.href = 'login/';
        }, 1000);
    } catch (error) {
        showToast('Erro ao fazer logout', 'error');
        console.error('Erro:', error);
    }
}

// Funções auxiliares
function showLoading() {
    loadingDiv.style.display = 'block';
    itemsContainer.style.display = 'none';
    emptyState.style.display = 'none';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
    itemsContainer.style.display = 'grid';
}

function showEmpty() {
    loadingDiv.style.display = 'none';
    itemsContainer.style.display = 'none';
    emptyState.style.display = 'block';
}

function hideEmpty() {
    emptyState.style.display = 'none';
}

function getStatusText(status) {
    const texts = {
        'open': 'Aberto',
        'pending': 'Pendente',
        'closed': 'Fechado'
    };
    return texts[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
