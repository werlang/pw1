import createToast from './toast.js';

async function checkSession() {
    // Questão 1:
    // Criar a requisição para o endpoint GET /back/session.php
    // Receba a resposta em um JSON na variável data
    // Se receber um erro, redirecione para a página de login
    // Caso contrário, preencha os campos name e email com os dados do usuário
    
    // const data = {
    //     status: 'error',
    //     message: 'Requsição de verificação de sessão não implementada'
    // }

    const data = await fetch('/back/session.php', {
        method: 'GET',
    }).then(res => res.json());
    // console.log(data);

    if (data.status == 'error') {
        location.href = 'login.html';
    }
    else {
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');

        nameInput.value = data.user.name;
        emailInput.value = data.user.email;
    }

}
checkSession();

const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    // Questão 1:
    // Criar a requisição para o endpoint POST /back/profile.php
    // Envie os dados do formulário
    // Receba a resposta em um JSON e exiba o toast com a mensagem
    // const data = {
    //     status: 'error',
    //     message: 'Resolva a questão 1'
    // }

    const data = await fetch('/back/profile.php', {
        method: 'POST',
        body: new FormData(form),
    }).then(res => res.json());

    createToast(data.message, data.status);
});