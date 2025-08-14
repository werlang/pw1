const form = document.querySelector('form');
const error = document.querySelector('.error');
form.addEventListener('submit', async event => {
    event.preventDefault();

    const fd = new FormData(form);

    const password = fd.get('password');
    const confirm = fd.get('confirm');

    if (password != confirm) {
        error.innerHTML = 'Senhas não conferem';
        return;
    }

    const data = await fetch('user.php', {
        method: 'POST',
        body: fd,
    }).then(res => res.json());
    // console.log(data);

    if (data.error) {
        error.innerHTML = data.message;
    }
    else {
        createToast(data.message);
        form.reset();
        error.innerHTML = '';
    }

});

function createToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}