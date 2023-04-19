const button = document.querySelector('button');
const user = document.querySelector('#user');
const pass = document.querySelector('#pass');

button.addEventListener('click', () => {
    if (user.value == 'aluno' && pass.value == 'underere123' || user.value == 'professor' && pass.value == 'admin789') {
        const box = document.querySelector('#box');
        box.innerHTML = `<h2><span id="highlight">${ user.value }</span> logado com sucesso.</h2>`;
    }
    else {
        const message = document.querySelector('#message');
        message.innerHTML = `Usuário ou senha inválido`;
    }
});