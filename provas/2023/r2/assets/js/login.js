import createToast from './toast.js';

const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = await fetch('back/login.php', {
        method: 'POST',
        body: new FormData(form)
    }).then(res => res.json());
    console.log(data);

    if (data.error) {
        createToast(data.message, 'error');
        return;
    }

    createToast(data.message, 'success');
    setTimeout(() => {
        location.href = 'insert.html';
    }, 1000);
});