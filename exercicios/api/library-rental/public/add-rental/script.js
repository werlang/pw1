import showToast from "../components/toast.js";

const rentalForm = document.querySelector('#rentalForm');

rentalForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(rentalForm);
    
    try {
        const response = await fetch('../api/rentals/add.php', {
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
        
        // Redirecionar para a lista após 1 segundo
        setTimeout(() => {
            window.location.href = '../rentals';
        }, 1000);
        
    } catch (error) {
        showToast('Erro ao registrar aluguel', 'error');
    }
});
