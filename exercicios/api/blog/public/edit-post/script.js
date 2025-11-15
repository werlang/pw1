import showToast from "../components/toast.js";

const myPostsListContainer = document.querySelector('#myPostsList');
const btnLogout = document.querySelector('#btnLogout');

let currentUserId = null;

// Função para carregar posts do usuário
async function loadMyPosts() {
    try {
        const response = await fetch('../api/posts/search.php');
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
        
        // Os posts vem no array principal
        const allPosts = Array.isArray(data) ? data : (data.posts || []);
        
        // Filtrar apenas posts do usuário logado (assumindo que o primeiro post tem o user_id correto)
        // Em produção, você precisaria de um endpoint específico ou verificar via sessão
        // Para este exercício, vamos mostrar todos e confiar no backend para filtrar
        renderMyPosts(allPosts);
        
    } catch (error) {
        showToast('Erro ao carregar posts', 'error');
    }
}

// Função para renderizar posts do usuário
function renderMyPosts(posts) {
    myPostsListContainer.innerHTML = '';
    
    if (!posts || posts.length === 0) {
        myPostsListContainer.innerHTML = '<p class="no-posts">Você ainda não criou nenhum post.</p>';
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
        const toggleButtonText = post.is_published == 1 ? 'Despublicar' : 'Publicar';
        const toggleButtonClass = post.is_published == 1 ? 'btn-secondary' : 'btn-success';
        
        // Limitar conteúdo a 150 caracteres
        const contentPreview = post.content.length > 150 
            ? post.content.substring(0, 150) + '...' 
            : post.content;
        
        postCard.innerHTML = `
            <div class="post-header">
                <div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-author">${post.category}</p>
                </div>
                <span class="post-status ${statusClass}">${statusLabel}</span>
            </div>
            <p class="post-content">${contentPreview}</p>
            <div class="post-footer">
                <span class="post-date">${formattedDate}</span>
                <div class="post-actions">
                    <button class="btn ${toggleButtonClass} btn-small" onclick="togglePublish(${post.id}, ${post.is_published})">
                        ${toggleButtonText}
                    </button>
                </div>
            </div>
        `;
        
        myPostsListContainer.appendChild(postCard);
    });
}

// Função para toggle de publicação (disponível globalmente)
window.togglePublish = async function(postId, currentStatus) {
    try {
        const formData = new FormData();
        formData.append('post_id', postId);
        
        const response = await fetch('../api/posts/toggle-publish.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        showToast(data.message, 'success');
        
        // Recarregar posts
        setTimeout(() => {
            loadMyPosts();
        }, 500);
        
    } catch (error) {
        showToast('Erro ao atualizar status', 'error');
    }
};

// Carregar posts ao abrir a página
loadMyPosts();

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
