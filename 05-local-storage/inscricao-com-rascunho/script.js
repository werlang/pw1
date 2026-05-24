const inputName = document.querySelector('#input-nome');
const inputEmail = document.querySelector('#input-email');
const selectShift = document.querySelector('#select-turno');
const buttonRegister = document.querySelector('#btn-inscrever');
const buttonClearDraft = document.querySelector('#btn-limpar-rascunho');
const message = document.querySelector('#mensagem');
const listRegister = document.querySelector('#lista-inscricoes');

const STORAGE_KEY = 'inscricoes-oficina';
const DRAFT_KEY = 'rascunho-inscricao';

// O cadastro principal é lido uma vez na inicialização.
let registerList = loadRegisters();

fillDraft();
renderRegisters();

buttonRegister.addEventListener('click', registerStudent);
buttonClearDraft.addEventListener('click', clearDraft);
inputName.addEventListener('input', saveDraft);
inputEmail.addEventListener('input', saveDraft);
selectShift.addEventListener('change', saveDraft);

function loadRegisters() {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
        return [];
    }

    return JSON.parse(json);
}

function saveRegisters() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registerList));
}

function saveDraft() {
    const draft = {
        name: inputName.value.trim(),
        email: inputEmail.value.trim(),
        shift: selectShift.value,
    };

    if (draft.name === '' && draft.email === '' && draft.shift === '') {
        sessionStorage.removeItem(DRAFT_KEY);
        return;
    }

    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

function fillDraft() {
    const json = sessionStorage.getItem(DRAFT_KEY);

    if (!json) {
        return;
    }

    const draft = JSON.parse(json);
    inputName.value = draft.name;
    inputEmail.value = draft.email;
    selectShift.value = draft.shift;
}

function registerStudent() {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const shift = selectShift.value;

    if (name === '' || email === '' || shift === '') {
        message.textContent = 'Preencha nome, e-mail e turno antes de confirmar.';
        return;
    }

    const register = {
        id: Date.now(),
        name: name,
        email: email,
        shift: shift,
    };

    registerList.push(register);
    saveRegisters();

    sessionStorage.removeItem(DRAFT_KEY);
    inputName.value = '';
    inputEmail.value = '';
    selectShift.value = '';

    renderRegisters();
    message.textContent = `Inscrição de ${register.name} confirmada com sucesso.`;
}

function clearDraft() {
    inputName.value = '';
    inputEmail.value = '';
    selectShift.value = '';
    sessionStorage.removeItem(DRAFT_KEY);
    message.textContent = 'O rascunho da inscrição foi removido.';
}

function renderRegisters() {
    listRegister.innerHTML = '';

    if (registerList.length === 0) {
        listRegister.innerHTML = '<li>Nenhuma inscrição confirmada.</li>';
        return;
    }

    registerList.forEach(function(register) {
        listRegister.innerHTML += `<li>${register.name} - ${register.email} - turno ${register.shift}</li>`;
    });
}