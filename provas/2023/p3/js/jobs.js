import createToast from './toast.js';

async function checkSession() {
    // Questão 1:
    // Criar a requisição para o endpoint GET /back/session.php
    // Receba a resposta em um JSON na variável data
    // Caso receba um erro, redirecione para a página de login
    // Caso contrário, preencha o campo name com o nome do usuário

    const data = {
        status: 'error',
        message: 'Requsição de verificação de sessão não implementada'
    }
}
checkSession();

let jobs = [];
const select = document.querySelector('#jobs');
select.addEventListener('change', () => updateDetails());

const details = document.querySelector('#details');
function updateDetails() {
    const job = jobs.find(job => job.id == select.value);

    if (!job) {
        return details.innerHTML = '';
    }

    details.innerHTML = `
        <h3>${job.title}</h3>
        <p>Descrição: <b>${job.description}</b></p>
        <p>Salário: R$ <b>${parseFloat(job.salary).toFixed(2)}</b></p>
        <p>Empresa: <b>${job.company}</b></p>
        <p>Candidatos: <b>${job.applications}</b></p>
    `;
}

async function updateJobs() {
    // Questão 1:
    // Criar a requisição para o endpoint GET /back/jobs.php
    // Receba a resposta em um JSON na variável data
    // Caso o array de vagas esteja vazio, crie um option dentro do select para cada vaga
    //   O value do option deve ser o id da vaga e o conteúdo deve ser o título da vaga

    const data = {
        status: 'error',
        message: 'Requsição de vagas não implementada',
        jobs: []
    }

    if (!jobs.length) {
        // Crie aqui um option dentro do select para cada vaga
    }
    jobs = data.jobs;
    details.innerHTML = '';
    updateDetails();
}

updateJobs();

const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    // Questão 1:
    // Criar a requisição para o endpoint POST /back/apply.php
    // Envie os dados do formulário
    // Receba a resposta em um JSON na variável data
    // Caso o status seja success, chame as funções existentes para atualizar a listagem de vagas e os detalhes da vaga selecionada

    const data = {
        status: 'error',
        message: 'Requisição de candidatura não implementada'
    }

    createToast(data.message, data.status);
});