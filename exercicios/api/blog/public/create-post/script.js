import showToast from "../components/toast.js";

const createPostForm = document.querySelector('#createPostForm');
const btnLogout = document.querySelector('#btnLogout');

// Criar post
createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(createPostForm);
    
    try {
        const response = await fetch('../api/posts/create.php', {
            method: 'POST',
            body: formData
        });
        
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
        
        showToast(data.message, 'success');
        
        // Redirecionar para página de edição após 1 segundo
        setTimeout(() => {
            window.location.href = '../edit-post';
        }, 1000);
        
    } catch (error) {
        showToast('Erro ao criar post', 'error');
    }
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
