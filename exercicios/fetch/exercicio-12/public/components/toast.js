const showToast = (message, type = 'info', duration = 3000) => {
    let toastContainer = document.querySelector('#toastContainer');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.append(container);
        toastContainer = container;
    }

    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML = message;
    
    toastContainer.append(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 1);

    setTimeout(() => {
        toast.remove();
    }, duration);
};

export default showToast;
