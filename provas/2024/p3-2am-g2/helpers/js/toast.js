function createToast(message, error = false) {
    const container = document.createElement('div');
    container.classList.add('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast', error ? 'error' : 'success');
    toast.innerHTML = message;
    container.appendChild(toast);
    document.body.appendChild(container);

    setTimeout(() => {
        toast.classList.add('fade');
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

export default createToast;