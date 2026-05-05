export function showToast(message, type, timeout = 5000) {
    const toast = document.createElement('div');
    toast.innerHTML = message;
    toast.classList.add('toast');
    if (type !== undefined && typeof type === 'string') {
        toast.classList.add(type);
    }
    document.body.append(toast);

    setTimeout(() => {
        toast.classList.add('show');        
    }, 1);

    setTimeout(() => {
        toast.remove();
    }, timeout);

}