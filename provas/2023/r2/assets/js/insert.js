import createToast from './toast.js';

const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    // requisição para o back/insert.php
    // recebe resposta em data. Exemplo:
    const data = {
        error: true,
        message: 'JS Não implementado'
    }
    console.log(data);

    if (data.error) {
        createToast(data.message, 'error');

        if (data.logged === false) {
            setTimeout(() => {
                location.href = 'index.html';
            }, 1000);
        }
    }
    else {
        createToast(data.message, 'success');
        form.reset();
    }
});