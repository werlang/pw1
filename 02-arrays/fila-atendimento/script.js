const inputName = document.querySelector('#input-nome');
const buttonAdd = document.querySelector('#btn-adicionar');
const buttonPriority = document.querySelector('#btn-prioridade');
const buttonCall = document.querySelector('#btn-chamar');
const message = document.querySelector('#mensagem');
const totalQueue = document.querySelector('#total-fila');
const nextName = document.querySelector('#proximo-nome');
const lastCalled = document.querySelector('#ultimo-chamado');
const queueList = document.querySelector('#lista-fila');
const queueText = document.querySelector('#fila-texto');

const waitingQueue = ['Ana', 'Bruno'];

function renderQueue() {
    queueList.innerHTML = '';

    waitingQueue.forEach(function(person) {
        queueList.innerHTML += `<li>${person}</li>`;
    });

    totalQueue.textContent = waitingQueue.length;
    nextName.textContent = waitingQueue.length > 0 ? waitingQueue[0] : 'Ninguém';
    queueText.textContent = waitingQueue.length > 0 ? waitingQueue.join(' -> ') : 'A fila está vazia.';
}

function readName() {
    return inputName.value.trim();
}

buttonAdd.addEventListener('click', function() {
    const person = readName();

    if (person === '') {
        message.textContent = 'Digite um nome para entrar na fila.';
        inputName.focus();
        return;
    }

    waitingQueue.push(person);
    message.textContent = `${person} entrou no fim da fila.`;
    inputName.value = '';
    inputName.focus();
    renderQueue();
});

buttonPriority.addEventListener('click', function() {
    const person = readName();

    if (person === '') {
        message.textContent = 'Digite um nome para atendimento prioritário.';
        inputName.focus();
        return;
    }

    waitingQueue.unshift(person);
    message.textContent = `${person} entrou com prioridade.`;
    inputName.value = '';
    inputName.focus();
    renderQueue();
});

buttonCall.addEventListener('click', function() {
    if (waitingQueue.length === 0) {
        message.textContent = 'Não há ninguém na fila.';
        return;
    }

    const calledPerson = waitingQueue.shift();
    lastCalled.textContent = calledPerson;
    message.textContent = `${calledPerson} foi chamado.`;
    renderQueue();
});

renderQueue();