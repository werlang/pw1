const inputName = document.querySelector('#input-nome');
const inputPhone = document.querySelector('#input-telefone');
const inputCategory = document.querySelector('#input-categoria');
const inputSearch = document.querySelector('#input-busca');
const buttonAdd = document.querySelector('#btn-adicionar');
const message = document.querySelector('#mensagem');
const listContacts = document.querySelector('#lista-contatos');

const STORAGE_KEY = 'agenda-contatos';

// A agenda é lida no começo e depois fica sob controle da memória.
let contactList = loadContacts();

buttonAdd.addEventListener('click', addContact);
inputSearch.addEventListener('input', renderContacts);

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
    const category = inputCategory.value;

    if (name === '' || phone === '' || category === '') {
        message.textContent = 'Preencha nome, telefone e categoria antes de adicionar.';
        return;
    }

    const contact = {
        id: Date.now(),
        name: name,
        phone: phone,
        category: category,
        favorite: false,
    };

    contactList.push(contact);
    saveContacts();
    renderContacts();

    message.textContent = `Contato ${contact.name} adicionado com sucesso.`;
    inputName.value = '';
    inputPhone.value = '';
    inputCategory.value = '';
    inputName.focus();
}

function removeContact(id) {
    contactList = contactList.filter(function(contact) {
        return contact.id !== id;
    });

    saveContacts();
    renderContacts();
    message.textContent = 'Contato removido com sucesso.';
}

function toggleFavorite(id) {
    contactList = contactList.map(function(contact) {
        if (contact.id === id) {
            return {
                id: contact.id,
                name: contact.name,
                phone: contact.phone,
                category: contact.category,
                favorite: !contact.favorite,
            };
        }

        return contact;
    });

    saveContacts();
    renderContacts();
}

function createContactCard(contact) {
    const card = document.createElement('article');
    card.className = 'contato';

    if (contact.favorite) {
        card.classList.add('favorito');
    }

    const top = document.createElement('div');
    top.className = 'topo-contato';

    const name = document.createElement('strong');
    name.textContent = contact.name;

    const category = document.createElement('span');
    category.className = 'categoria';
    category.textContent = contact.category;

    top.append(name, category);

    const phone = document.createElement('p');
    phone.textContent = contact.phone;

    const actions = document.createElement('div');
    actions.className = 'acoes';

    const favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.textContent = contact.favorite ? 'Desfavoritar' : 'Favoritar';
    favoriteButton.addEventListener('click', function() {
        toggleFavorite(contact.id);
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', function() {
        removeContact(contact.id);
    });

    actions.append(favoriteButton, removeButton);
    card.append(top, phone, actions);

    return card;
}

function renderContacts() {
    const searchTerm = inputSearch.value.trim().toLowerCase();

    listContacts.innerHTML = '';

    const filteredContacts = contactList.filter(function(contact) {
        return contact.name.toLowerCase().includes(searchTerm);
    });

    if (filteredContacts.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'vazio';
        emptyMessage.textContent = 'Nenhum contato encontrado.';
        listContacts.appendChild(emptyMessage);
        return;
    }

    // Favoritos aparecem primeiro para facilitar consulta no dia a dia.
    filteredContacts.sort(function(a, b) {
        return Number(b.favorite) - Number(a.favorite);
    });

    filteredContacts.forEach(function(contact) {
        const card = createContactCard(contact);
        listContacts.appendChild(card);
    });
}

renderContacts();