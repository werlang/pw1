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
        
        showToast('Login realizado com sucesso!', 'success');
        
        // Redirecionar para a página de posts após 1 segundo
        setTimeout(() => {
            window.location.href = '../posts';
        }, 1000);
        
    } catch (error) {
        showToast('Erro ao fazer login', 'error');
    }
});
