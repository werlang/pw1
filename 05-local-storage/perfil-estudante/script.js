const inputNome = document.querySelector('#input-nome');
const inputTurma = document.querySelector('#input-turma');
const inputEmail = document.querySelector('#input-email');
const inputCor = document.querySelector('#input-cor');
const buttonSave = document.querySelector('#btn-salvar');
const buttonClear = document.querySelector('#btn-limpar');
const message = document.querySelector('#mensagem');
const listProfile = document.querySelector('#lista-perfil');

const STORAGE_KEY = 'perfil-estudante';

// O perfil é carregado uma vez no início da aplicação.
let profile = loadProfile();

buttonSave.addEventListener('click', saveProfile);
buttonClear.addEventListener('click', clearProfile);

function loadProfile() {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
        return null;
    }

    return JSON.parse(json);
}

function saveProfile() {
    const name = inputNome.value.trim();
    const classroom = inputTurma.value.trim();
    const email = inputEmail.value.trim();
    const favoriteColor = inputCor.value.trim();

    if (name === '' || classroom === '' || email === '' || favoriteColor === '') {
        message.textContent = 'Preencha todos os campos antes de salvar o perfil.';
        return;
    }

    // A memória recebe o novo estado antes de regravar o storage.
    profile = {
        name: name,
        classroom: classroom,
        email: email,
        favoriteColor: favoriteColor,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    message.textContent = `Perfil de ${profile.name} salvo com sucesso.`;
    renderProfile();
}

function clearProfile() {
    profile = null;
    localStorage.removeItem(STORAGE_KEY);
    message.textContent = 'O perfil salvo foi removido.';
    renderProfile();
}

function renderProfile() {
    listProfile.innerHTML = '';

    if (!profile) {
        listProfile.innerHTML = '<li>Nenhum perfil salvo até o momento.</li>';
        return;
    }

    inputNome.value = profile.name;
    inputTurma.value = profile.classroom;
    inputEmail.value = profile.email;
    inputCor.value = profile.favoriteColor;

    listProfile.innerHTML += `<li><strong>Nome:</strong> ${profile.name}</li>`;
    listProfile.innerHTML += `<li><strong>Turma:</strong> ${profile.classroom}</li>`;
    listProfile.innerHTML += `<li><strong>E-mail:</strong> ${profile.email}</li>`;
    listProfile.innerHTML += `<li><strong>Cor favorita:</strong> ${profile.favoriteColor}</li>`;
}

renderProfile();