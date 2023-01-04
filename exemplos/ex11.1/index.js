import { request } from './utils.js';

document.querySelector('button').addEventListener('click', async () => {
    const data = await request('login.php', {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    }, 'POST');
    console.log(data);

    const error = document.querySelector('.error');

    if (data.error){
        error.innerHTML = data.error;
    }
    else if (data.status && data.status == "sucesso"){
        window.location.href = 'profile.html';
    }
});