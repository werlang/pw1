import showToast from "../components/toast.js";

const errorSpan = document.querySelector('.error');

const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    const fd = new FormData(form);

    errorSpan.innerHTML = '';

    const data = await fetch('/api/users/login.php', {
        method: 'POST',
        body: fd
    }).then(res => res.json());
    console.log(data);

    if (data.error) {
        errorSpan.innerHTML = data.message;
    }
    else {
        showToast(data.message);
        setTimeout(() => {
            location.href = '/perfil';
        }, 2000);
    }
})