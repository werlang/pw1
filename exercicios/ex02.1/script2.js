const button = document.querySelector('button');
const user = document.querySelector('#user');
const pass = document.querySelector('#pass');

function login() {
    if ((user.value == 'aluno' && pass.value == 'undererere123') || (user.value == 'professor' && pass.value == 'admin789')) {
        document.querySelector('#box').innerHTML = `<h2><span id="highlight">${ user.value }</span> logado com sucesso.</h2>`;
    }
    else {
        document.querySelector('#message').innerHTML = 'Usuário ou senha inválidos';
    }
}

function tecla(ev) {
    if (ev.key == 'Enter') {
        login();
    }
}

button.addEventListener('click', login);
user.addEventListener('keydown', tecla);
pass.addEventListener('keydown', tecla);