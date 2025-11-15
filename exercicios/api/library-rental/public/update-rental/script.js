import showToast from "../components/toast.js";

const statusForm = document.querySelector('#statusForm');
const renewForm = document.querySelector('#renewForm');

// Obter o ID do aluguel da URL
const urlParams = new URLSearchParams(window.location.search);
const rentalId = urlParams.get('id');

if (!rentalId) {
    showToast('ID do aluguel não fornecido', 'error');
    setTimeout(() => {
        window.location.href = '../rentals';
    }, 2000);
}

// Handler para alterar status
statusForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(statusForm);
    formData.append('id', rentalId);
    
    await handleUpdate(formData, 'Status atualizado!');
});

// Handler para renovar aluguel
renewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(renewForm);
    formData.append('id', rentalId);
    
    await handleUpdate(formData, 'Aluguel renovado!');
});

async function handleUpdate(formData, successMsg) {
    try {
        const response = await fetch('../api/rentals/update.php', {
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
        
        // Mostrar nova data se foi renovação
        const message = data.new_due_date 
            ? `${data.message} Nova data: ${new Date(data.new_due_date).toLocaleDateString('pt-BR')}`
            : data.message;
        
        showToast(message, 'success');
        
        // Redirecionar para a lista após 1.5 segundos
        setTimeout(() => {
            window.location.href = '../rentals';
        }, 1500);
        
    } catch (error) {
        showToast('Erro ao processar requisição', 'error');
    }
}
