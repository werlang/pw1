import showToast from '../components/toast.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    
    try {
        const response = await fetch('../api/auth/login.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.error) {
            showToast(data.message, 'error');
        } else {
            showToast(data.message, 'success');
            setTimeout(() => {
                window.location.href = '../recipes/';
            }, 1000);
        }
    } catch (error) {
        showToast('Erro ao fazer login', 'error');
        console.error('Erro:', error);
    }
});
