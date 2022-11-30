import { request } from './utils.js';

document.querySelector('button').addEventListener('click', async () => {
    const id = document.querySelector('#user').value;
    const data = await request(`getusers.php`, { user: id });
    console.log(data);
    
    let message = '';
    if (data.status != 'OK') {
        message = `<div>Erro na requisição</div>`;
    }
    else if (!data.result) {
        message = `<div>Usuário não encontrado</div>`;
    }
    else {
        message = `
            <div>Nome: <span>${ data.result.name }</span></div>
            <div>Email: <span>${ data.result.email }</span></div>
        `;
    }

    let res = document.querySelector('#result');
    if (!res) {
        document.body.insertAdjacentHTML('beforeend', `<div id="result"></div>`);
        res = document.querySelector('#result');
    }
    res.innerHTML = message;
});
