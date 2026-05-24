const inputName = document.querySelector('#input-nome');
const inputPhone = document.querySelector('#input-telefone');
const inputSearch = document.querySelector('#input-busca');
const buttonAdd = document.querySelector('#btn-adicionar');
const message = document.querySelector('#mensagem');
const listContacts = document.querySelector('#lista-contatos');

const STORAGE_KEY = 'agenda-contatos';

// A agenda é lida no começo e depois fica sob controle da memória.
let contactList = loadContacts();

buttonAdd.addEventListener('click', addContact);
inputSearch.addEventListener('input', renderContacts);
listContacts.addEventListener('click', handleListClick);

function loadContacts() {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
        return [];
    }

    return JSON.parse(json);
}

function saveContacts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactList));
}

function addContact() {
    const name = inputName.value.trim();
    const phone = inputPhone.value.trim();

    if (name === '' || phone === '') {
        message.textContent = 'Preencha nome e telefone antes de adicionar.';
        return;
    }

    const contact = {
        id: Date.now(),
        name: name,
        phone: phone,
    };

    contactList.push(contact);
    saveContacts();
    renderContacts();

    message.textContent = `Contato ${contact.name} adicionado com sucesso.`;
    inputName.value = '';
    inputPhone.value = '';
    inputName.focus();
}

function handleListClick(event) {
    const button = event.target.closest('button[data-id]');

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);

    contactList = contactList.filter(function(contact) {
        return contact.id !== id;
    });

    saveContacts();
    renderContacts();
    message.textContent = 'Contato removido com sucesso.';
}

function renderContacts() {
    const searchTerm = inputSearch.value.trim().toLowerCase();

    listContacts.innerHTML = '';

    const filteredContacts = contactList.filter(function(contact) {
        return contact.name.toLowerCase().includes(searchTerm);
    });

    if (filteredContacts.length === 0) {
        listContacts.innerHTML = '<li>Nenhum contato encontrado.</li>';
        return;
    }

    filteredContacts.forEach(function(contact) {
        listContacts.innerHTML += `
            <li>
                <div>
                    <strong>${contact.name}</strong>
                    <span>${contact.phone}</span>
                </div>
                <button type="button" data-id="${contact.id}">Remover</button>
            </li>
        `;
    });
}

renderContacts();