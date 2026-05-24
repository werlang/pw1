const inputNome = document.querySelector('#input-nome');
const inputTurma = document.querySelector('#input-turma');
const inputMedia = document.querySelector('#input-media');
const buttonRegister = document.querySelector('#btn-cadastrar');
const buttonClear = document.querySelector('#btn-limpar');
const message = document.querySelector('#mensagem');
const totalStudents = document.querySelector('#total-alunos');
const averageValue = document.querySelector('#media-geral');
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
    const average = Number(inputMedia.value);

    if (name === '' || classroom === '' || inputMedia.value.trim() === '') {
        message.textContent = 'Preencha nome, turma e média antes de cadastrar.';
        return;
    }

    const student = {
        id: Date.now(),
        name: name,
        classroom: classroom,
        average: average,
    };

    studentList.push(student);
    saveStudents();
    renderStudents();

    message.textContent = `Aluno ${student.name} cadastrado com sucesso.`;
    inputNome.value = '';
    inputTurma.value = '';
    inputMedia.value = '';
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
        listStudents.innerHTML = '<li>Nenhum aluno cadastrado.</li>';
        totalStudents.textContent = '0';
        averageValue.textContent = '0.0';
        return;
    }

    let sumAverage = 0;

    studentList.forEach(function(student) {
        sumAverage += student.average;
        listStudents.innerHTML += `<li>${student.name} - ${student.classroom} - média ${student.average.toFixed(1)}</li>`;
    });

    totalStudents.textContent = studentList.length;
    averageValue.textContent = (sumAverage / studentList.length).toFixed(1);
}

renderStudents();