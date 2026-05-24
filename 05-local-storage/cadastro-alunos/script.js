const inputNome = document.querySelector('#input-nome');
const inputTurma = document.querySelector('#input-turma');
const inputNota1 = document.querySelector('#input-nota1');
const inputNota2 = document.querySelector('#input-nota2');
const inputObservacao = document.querySelector('#input-observacao');
const buttonRegister = document.querySelector('#btn-cadastrar');
const buttonClear = document.querySelector('#btn-limpar');
const message = document.querySelector('#mensagem');
const totalStudents = document.querySelector('#total-alunos');
const averageValue = document.querySelector('#media-geral');
const totalApproved = document.querySelector('#total-aprovados');
const totalRecovery = document.querySelector('#total-recuperacao');
const listStudents = document.querySelector('#lista-alunos');

const STORAGE_KEY = 'cadastro-alunos';

// O array é carregado apenas uma vez quando a aplicação inicia.
let studentList = loadStudents();

buttonRegister.addEventListener('click', registerStudent);
buttonClear.addEventListener('click', clearRegister);

function loadStudents() {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
        return [];
    }

    return JSON.parse(json);
}

function saveStudents() {
    // Sempre que a lista em memória mudar, o storage é reescrito inteiro.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studentList));
}

function registerStudent() {
    const name = inputNome.value.trim();
    const classroom = inputTurma.value.trim();
    const note1 = Number(inputNota1.value);
    const note2 = Number(inputNota2.value);
    const observation = inputObservacao.value.trim();

    if (
        name === '' ||
        classroom === '' ||
        inputNota1.value.trim() === '' ||
        inputNota2.value.trim() === ''
    ) {
        message.textContent = 'Preencha nome, turma e as duas notas antes de cadastrar.';
        return;
    }

    const average = (note1 + note2) / 2;
    const status = average >= 6 ? 'Aprovado' : 'Recuperação';

    const student = {
        id: Date.now(),
        name: name,
        classroom: classroom,
        note1: note1,
        note2: note2,
        average: average,
        status: status,
        observation: observation || '-',
    };

    studentList.push(student);
    saveStudents();
    renderStudents();

    message.textContent = `${student.name} foi adicionado(a) ao boletim.`;
    inputNome.value = '';
    inputTurma.value = '';
    inputNota1.value = '';
    inputNota2.value = '';
    inputObservacao.value = '';
    inputNome.focus();
}

function clearRegister() {
    studentList = [];
    saveStudents();
    renderStudents();
    message.textContent = 'O cadastro de alunos foi limpo.';
}

function renderStudents() {
    listStudents.innerHTML = '';

    if (studentList.length === 0) {
        listStudents.innerHTML = '<tr><td colspan="5">Nenhum estudante cadastrado.</td></tr>';
        totalStudents.textContent = '0 estudante(s)';
        averageValue.textContent = '0,0';
        totalApproved.textContent = '0';
        totalRecovery.textContent = '0';
        return;
    }

    let sumAverage = 0;
    let approved = 0;

    studentList.forEach(function(student) {
        sumAverage += student.average;

        if (student.status === 'Aprovado') {
            approved += 1;
        }

        listStudents.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.classroom}</td>
                <td>${student.average.toFixed(1).replace('.', ',')}</td>
                <td>
                    <span class="status ${student.status === 'Aprovado' ? 'ok' : 'alerta'}">${student.status}</span>
                </td>
                <td>${student.observation}</td>
            </tr>
        `;
    });

    const generalAverage = sumAverage / studentList.length;
    totalStudents.textContent = `${studentList.length} estudante(s)`;
    averageValue.textContent = generalAverage.toFixed(1).replace('.', ',');
    totalApproved.textContent = approved;
    totalRecovery.textContent = studentList.length - approved;
}

renderStudents();