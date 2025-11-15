import showToast from '../components/toast.js';

const addRecipeForm = document.getElementById('addRecipeForm');
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

// Adicionar receita
addRecipeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(addRecipeForm);
    
    // Checkbox retorna valor apenas se marcado, precisamos garantir 0 ou 1
    if (!formData.get('is_public')) {
        formData.set('is_public', '0');
    }
    
    try {
        const response = await fetch('../api/recipes/add.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.error) {
            if (response.status === 401) {
                window.location.href = '../login/';
            } else {
                showToast(data.message, 'error');
            }
        } else {
            showToast(data.message, 'success');
            setTimeout(() => {
                window.location.href = '../recipes/';
            }, 1000);
        }
    } catch (error) {
        showToast('Erro ao adicionar receita', 'error');
        console.error('Erro:', error);
    }
});
