import showToast from "../components/toast.js";

const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(loginForm);
    
    try {
        const response = await fetch('../api/auth/login.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        showToast(data.message, 'success');
        
        // Redirecionar para a página de listagem após 1 segundo
        setTimeout(() => {
            window.location.href = '../rentals';
        }, 1000);
        
    } catch (error) {
        showToast('Erro ao fazer login', 'error');
    }
});
