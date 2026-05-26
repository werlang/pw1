/**
 * Exibe uma notificação temporária com o resultado da ação do usuário.
 * @param {string} message
 * @param {'success' | 'error'} type
 * @param {number} duration
 * @returns {HTMLDivElement}
 */
export function showToast(message, type, duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
    });

    setTimeout(() => {
        toast.classList.remove('toast-visible');

        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 200);
    }, duration);

    return toast;
}