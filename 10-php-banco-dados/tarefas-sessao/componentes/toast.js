/**
 * Mostra um aviso temporário no canto da tela.
 * Uso: showToast("Tarefa inserida", "success");
 * @param {string} message
 * @param {'success' | 'error'} type
 * @param {number} duration
 * @returns {HTMLDivElement}
 */
export function showToast(message, type, duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.append(toast);

    // A classe é adicionada no frame seguinte para a transição do CSS acontecer.
    requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
    });

    setTimeout(() => {
        toast.classList.remove('toast-visible');

        // Espera a transição terminar antes de remover o elemento da página.
        setTimeout(() => {
            toast.remove();
        }, 200);
    }, duration);

    return toast;
}
