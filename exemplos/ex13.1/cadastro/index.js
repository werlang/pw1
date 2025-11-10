import showToast from "../components/toast.js";

const errorSpan = document.querySelector('.error');

const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    const fd = new FormData(form);

    if (fd.get('password').length < 8) {
        errorSpan.innerHTML = 'A senha deve possuir pelo menos 8 caracteres';
        return;
    }

    if (fd.get('password') != fd.get('confirm')) {
        errorSpan.innerHTML = 'A senha e a confirmação devem ser iguais';
        return;
    }

    errorSpan.innerHTML = '';

    const data = await fetch('/api/users/add.php', {
        method: 'POST',
        body: fd
    }).then(res => res.json());
    console.log(data);

    if (data.error) {
        errorSpan.innerHTML = data.message;
    }
    else {
        form.reset();
        showToast(data.message);
    }
})