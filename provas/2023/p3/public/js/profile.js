import createToast from './toast.js';

async function checkSession() {
    // Questão 1:
    // Criar a requisição para o endpoint GET /back/session.php
    // Receba a resposta em um JSON na variável data
    // Se receber um erro, redirecione para a página de login
    // Caso contrário, preencha os campos name e email com os dados do usuário
    
    const data = {
        status: 'error',
        message: 'Requsição de verificação de sessão não implementada'
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
    const data = {
        status: 'error',
        message: 'Resolva a questão 1'
    }

    createToast(data.message, data.status);
});