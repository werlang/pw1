const inputName = document.querySelector('#input-nome');
const inputEmail = document.querySelector('#input-email');
const selectShift = document.querySelector('#select-turno');
const workshopInputs = document.querySelectorAll('input[name="oficina"]');
const inputReason = document.querySelector('#input-justificativa');
const charactersCounter = document.querySelector('#contador-caracteres');
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
inputReason.addEventListener('input', handleReasonTyping);

workshopInputs.forEach(function(input) {
    input.addEventListener('change', saveDraft);
});

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
    const selectedWorkshops = getSelectedWorkshops();

    const draft = {
        name: inputName.value.trim(),
        email: inputEmail.value.trim(),
        shift: selectShift.value,
        workshops: selectedWorkshops,
        reason: inputReason.value.trim(),
    };

    if (
        draft.name === '' &&
        draft.email === '' &&
        draft.shift === '' &&
        draft.workshops.length === 0 &&
        draft.reason === ''
    ) {
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
    inputReason.value = draft.reason || '';

    workshopInputs.forEach(function(input) {
        input.checked = (draft.workshops || []).includes(input.value);
    });

    updateCharactersCounter();
}

function registerStudent() {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const shift = selectShift.value;
    const workshops = getSelectedWorkshops();
    const reason = inputReason.value.trim();

    if (name === '' || email === '' || shift === '' || workshops.length === 0 || reason === '') {
        message.textContent = 'Preencha todos os campos e selecione ao menos uma oficina.';
        return;
    }

    const register = {
        id: Date.now(),
        name: name,
        email: email,
        shift: shift,
        workshops: workshops,
        reason: reason,
    };

    registerList.push(register);
    saveRegisters();

    sessionStorage.removeItem(DRAFT_KEY);
    resetForm();

    renderRegisters();
    message.textContent = `Inscrição de ${register.name} confirmada com sucesso.`;
}

function clearDraft() {
    resetForm();
    sessionStorage.removeItem(DRAFT_KEY);
    message.textContent = 'O rascunho da inscrição foi removido.';
}

function getSelectedWorkshops() {
    const selected = [];

    workshopInputs.forEach(function(input) {
        if (input.checked) {
            selected.push(input.value);
        }
    });

    return selected;
}

function updateCharactersCounter() {
    charactersCounter.textContent = `${inputReason.value.length}/160`;
}

function handleReasonTyping() {
    updateCharactersCounter();
    saveDraft();
}

function resetForm() {
    inputName.value = '';
    inputEmail.value = '';
    selectShift.value = '';
    inputReason.value = '';

    workshopInputs.forEach(function(input) {
        input.checked = false;
    });

    updateCharactersCounter();
}

function renderRegisters() {
    listRegister.innerHTML = '';

    if (registerList.length === 0) {
        listRegister.innerHTML = '<p class="vazio">Nenhuma inscrição confirmada.</p>';
        return;
    }

    registerList.forEach(function(register) {
        listRegister.innerHTML += `
            <article class="card-inscricao">
                <h3>${register.name}</h3>
                <p><strong>E-mail:</strong> ${register.email}</p>
                <p><strong>Turno:</strong> ${register.shift}</p>
                <p><strong>Oficinas:</strong> ${register.workshops.join(', ')}</p>
                <p><strong>Motivação:</strong> ${register.reason}</p>
            </article>
        `;
    });
}

updateCharactersCounter();