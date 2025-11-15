// Criar o container de toasts se não existir
let toastContainer = document.querySelector('.toast-container');
if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
}

/**
 * Exibe uma mensagem toast
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo do toast ('success' ou 'error')
 * @param {number} duration - Duração em milissegundos (padrão: 3000)
 */
export default function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✓' : '✕';
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remover o toast após a duração especificada
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}
