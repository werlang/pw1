const form = document.getElementById('update-item-form');
const formContainer = document.getElementById('form-container');
const loadingDiv = document.getElementById('loading');
const logoutBtn = document.getElementById('logout-btn');

// Pegar ID do item da URL
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');

if (!itemId) {
    showToast('ID do item não fornecido', 'error');
    setTimeout(() => {
        window.location.href = '../';
    }, 2000);
}

// Carregar dados do item
async function loadItem() {
    try {
        const response = await fetch(`../api/items/list.php`);
        const data = await response.json();
        
        if (data.error) {
            showToast(data.message, 'error');
            setTimeout(() => {
                window.location.href = '../';
            }, 2000);
            return;
        }
        
        const item = data.items.find(i => i.id == itemId);
        
        if (!item) {
            showToast('Item não encontrado', 'error');
            setTimeout(() => {
                window.location.href = '../';
            }, 2000);
            return;
        }
        
        // Preencher formulário
        document.getElementById('item-id').value = item.id;
        document.getElementById('title').value = item.title;
        document.getElementById('description').value = item.description;
        document.getElementById('category_id').value = item.category_id;
        document.getElementById('suggested_value').value = parseFloat(item.suggested_value);
        document.getElementById('status').value = item.status;
        
        // Mostrar formulário
        loadingDiv.style.display = 'none';
        formContainer.style.display = 'block';
    } catch (error) {
        showToast('Erro ao carregar item', 'error');
        console.error('Erro:', error);
        setTimeout(() => {
            window.location.href = '../';
        }, 2000);
    }
}

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
    
    const id = document.getElementById('item-id').value;
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const category_id = document.getElementById('category_id').value;
    const suggested_value = document.getElementById('suggested_value').value;
    const status = document.getElementById('status').value;
    
    // Validação
    if (!title || !description || !category_id || !suggested_value || !status) {
        showToast('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    if (parseFloat(suggested_value) < 0) {
        showToast('O valor sugerido deve ser maior ou igual a zero', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Salvando...';
    
    try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category_id', category_id);
        formData.append('suggested_value', suggested_value);
        formData.append('status', status);
        
        const response = await fetch('../api/items/update.php', {
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
        showToast('Erro ao atualizar item. Tente novamente.', 'error');
        console.error('Erro:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Salvar Alterações';
    }
});

// Carregar item ao iniciar
loadItem();
