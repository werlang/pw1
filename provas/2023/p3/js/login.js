import createToast from "./toast.js";

const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    // Questão 1:
    // Criar a requisição para o endpoint POST /back/login.php
    // Envie os dados do formulário
    // Receba a resposta em um JSON na variável data
    // Caso o status seja success, redirecione para a página de perfil

    const data = {
        status: 'error',
        message: 'Requisição de login não implementada'
    }

    createToast(data.message, data.status);
});