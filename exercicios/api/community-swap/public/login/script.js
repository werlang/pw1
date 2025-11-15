const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showToast('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';
    
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        
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
                window.location.href = '../';
            }, 1000);
        }
    } catch (error) {
        showToast('Erro ao fazer login. Tente novamente.', 'error');
        console.error('Erro:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Entrar';
    }
});
