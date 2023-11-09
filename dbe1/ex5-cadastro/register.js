const form = document.querySelector('form');
form.addEventListener('submit', async event => {
    event.preventDefault();

    const data = await fetch('register.php', {
        method: 'POST',
        body: new FormData(form),
    }).then(res => res.json());
    // console.log(data);

    if (data.error) {
        // Show error toast
        addToast(data.message, 'error');
        return;
    }

    // Show success toast
    addToast(data.message, 'success');
    // form.reset();
});

function addToast(message, type) {
    // Remove all current toasts
    const currentToasts = document.querySelectorAll('.toast');
    currentToasts.forEach(toast => toast.remove());

    // Create and show new toast
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}