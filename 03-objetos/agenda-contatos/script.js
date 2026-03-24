const inputContactName = document.querySelector('#input-nome');
const inputPhone = document.querySelector('#input-telefone');
const inputContactCity = document.querySelector('#input-cidade');
const buttonRegisterContact = document.querySelector('#btn-cadastrar');
const inputSearchContact = document.querySelector('#input-busca');
const contactMessage = document.querySelector('#mensagem');
const searchResult = document.querySelector('#resultado-busca');
const contactsList = document.querySelector('#lista-contatos');

const contacts = [
    { nome: 'Ana', telefone: '51999990000', cidade: 'Charqueadas' },
    { nome: 'Bruno', telefone: '51988880000', cidade: 'Pelotas' }
];

function renderContacts(list) {
    contactsList.innerHTML = '';

    list.forEach(function(contact) {
        contactsList.innerHTML += `
            <article class="card-contato">
                <h2>${contact.nome}</h2>
                <p><strong>Telefone:</strong> ${contact.telefone}</p>
                <p><strong>Cidade:</strong> ${contact.cidade}</p>
            </article>
        `;
    });

    if (list.length === 0) {
        contactsList.innerHTML = '<p>Nenhum contato encontrado.</p>';
    }
}

buttonRegisterContact.addEventListener('click', function() {
    const name = inputContactName.value.trim();
    const phone = inputPhone.value.trim();
    const city = inputContactCity.value.trim();

    if (name === '' || phone === '' || city === '') {
        contactMessage.textContent = 'Preencha todos os dados do contato.';
        return;
    }

    contacts.push({
        nome: name,
        telefone: phone,
        cidade: city
    });

    contactMessage.textContent = `${name} foi cadastrado com sucesso.`;
    inputContactName.value = '';
    inputPhone.value = '';
    inputContactCity.value = '';
    renderContacts(contacts);
});

inputSearchContact.addEventListener('input', function() {
    const term = inputSearchContact.value.trim().toLowerCase();

    if (term === '') {
        searchResult.textContent = 'Mostrando todos os contatos.';
        renderContacts(contacts);
        return;
    }

    const filteredContacts = contacts.filter(function(contact) {
        return contact.nome.toLowerCase().includes(term);
    });

    const firstFound = contacts.find(function(contact) {
        return contact.nome.toLowerCase().includes(term);
    });

    searchResult.textContent = firstFound ? `Primeiro encontrado: ${firstFound.nome}.` : 'Nenhum contato corresponde à busca.';
    renderContacts(filteredContacts);
});

renderContacts(contacts);
searchResult.textContent = 'Mostrando todos os contatos.';