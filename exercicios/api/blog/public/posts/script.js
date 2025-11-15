import showToast from "../components/toast.js";

const postsListContainer = document.querySelector('#postsList');
const searchForm = document.querySelector('#searchForm');
const searchQuery = document.querySelector('#searchQuery');
const btnClearSearch = document.querySelector('#btnClearSearch');
const btnLogout = document.querySelector('#btnLogout');
const userName = document.querySelector('#userName');

// Função para carregar posts
async function loadPosts(query = '') {
    try {
        let url = '../api/posts/search.php';
        if (query) {
            url += `?query=${encodeURIComponent(query)}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            showToast(data.message, 'error');
            // Se não autenticado, redirecionar para login
            if (data.message.includes('autenticado')) {
                setTimeout(() => {
                    window.location.href = '../login';
                }, 1500);
            }
            return;
        }
        
        // Se retornou um objeto com name, é o usuário logado
        if (data.name) {
            userName.textContent = `Olá, ${data.name}`;
        }
        
        // Os posts vem no array principal
        const posts = Array.isArray(data) ? data : (data.posts || []);
        renderPosts(posts);
        
    } catch (error) {
        showToast('Erro ao carregar posts', 'error');
    }
}

// Função para renderizar posts
function renderPosts(posts) {
    postsListContainer.innerHTML = '';
    
    if (!posts || posts.length === 0) {
        postsListContainer.innerHTML = '<p class="no-posts">Nenhum post encontrado.</p>';
        return;
    }
    
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = `post-card ${post.is_published == 0 ? 'draft' : ''}`;
        
        const date = new Date(post.created_at);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const statusLabel = post.is_published == 1 ? 'Publicado' : 'Rascunho';
        const statusClass = post.is_published == 1 ? 'status-published' : 'status-draft';
        
        // Limitar conteúdo a 200 caracteres
        const contentPreview = post.content.length > 200 
            ? post.content.substring(0, 200) + '...' 
            : post.content;
        
        postCard.innerHTML = `
            <div class="post-header">
                <div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-author">Por ${post.author_name} • ${post.category}</p>
                </div>
                <span class="post-status ${statusClass}">${statusLabel}</span>
            </div>
            <p class="post-content">${contentPreview}</p>
            <div class="post-footer">
                <span class="post-date">${formattedDate}</span>
            </div>
        `;
        
        postsListContainer.appendChild(postCard);
    });
}

// Carregar posts ao abrir a página
loadPosts();

// Buscar posts
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchQuery.value.trim();
    
    if (!query) {
        showToast('Digite algo para buscar', 'error');
        return;
    }
    
    loadPosts(query);
});

// Limpar busca
btnClearSearch.addEventListener('click', () => {
    searchQuery.value = '';
    loadPosts();
});

// Logout
btnLogout.addEventListener('click', async () => {
    try {
        const response = await fetch('../api/auth/logout.php');
        const data = await response.json();
        
        showToast(data.message, 'success');
        
        setTimeout(() => {
            window.location.href = '../login';
        }, 1000);
        
    } catch (error) {
        showToast('Erro ao fazer logout', 'error');
    }
});
