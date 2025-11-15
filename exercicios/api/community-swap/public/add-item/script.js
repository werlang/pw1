const form = document.getElementById('add-item-form');
const logoutBtn = document.getElementById('logout-btn');

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('../api/auth/logout.php');
        const data = await response.json();
        
        showToast(data.message, 'success');
        setTimeout(() => {
            window.location.href = '../login/';
        }, 1000);
    } catch (error) {
        showToast('Erro ao fazer logout', 'error');
        console.error('Erro:', error);
    }
});

// Submeter formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const category_id = document.getElementById('category_id').value;
    const suggested_value = document.getElementById('suggested_value').value;
    const status = document.getElementById('status').value;
    
    // Validação
    if (!title || !description || !category_id || !suggested_value) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    if (parseFloat(suggested_value) < 0) {
        showToast('O valor sugerido deve ser maior ou igual a zero', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adicionando...';
    
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category_id', category_id);
        formData.append('suggested_value', suggested_value);
        formData.append('status', status);
        
        const response = await fetch('../api/items/add.php', {
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
            }, 1500);
        }
    } catch (error) {
        showToast('Erro ao adicionar item. Tente novamente.', 'error');
        console.error('Erro:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Adicionar Item';
    }
});
