const message = document.querySelector('.error');
const button = document.querySelector('button');

const form = document.querySelector('form');
form.addEventListener('submit', async event => {
    event.preventDefault();

    button.innerHTML = 'Aguarde...';
    button.setAttribute('disabled', true);

    const fd = new FormData(form);

    const data = await fetch('login.php', {
        method: 'POST',
        body: fd,
    }).then(res => res.json());
    // console.log(data);

    button.innerHTML = 'Entrar';
    button.removeAttribute('disabled');

    if (data.error) {
        message.innerHTML = data.message;
    }
    else {
        location.href = 'profile.html';
    }
})