const inputItem = document.querySelector('#input-item');
const buttonAdd = document.querySelector('#btn-adicionar');
const buttonClear = document.querySelector('#btn-limpar');
const message = document.querySelector('#mensagem');
const totalItems = document.querySelector('#total-itens');
const lastItem = document.querySelector('#ultimo-item');
const listItems = document.querySelector('#lista-itens');
const listText = document.querySelector('#lista-texto');

const shoppingList = [];

function renderList() {
    listItems.innerHTML = '';

    shoppingList.forEach(function(item) {
        listItems.innerHTML += `<li>${item}</li>`;
    });

    totalItems.textContent = shoppingList.length;
    lastItem.textContent = shoppingList.length > 0 ? shoppingList[shoppingList.length - 1] : 'Nenhum';
    listText.textContent = shoppingList.length > 0 ? shoppingList.join(', ') : 'Nenhum item cadastrado.';
}

buttonAdd.addEventListener('click', function() {
    const newItem = inputItem.value.trim();

    if (newItem === '') {
        message.textContent = 'Digite um item antes de adicionar.';
        inputItem.focus();
        return;
    }

    shoppingList.push(newItem);
    message.textContent = `Item ${newItem} adicionado com sucesso.`;
    inputItem.value = '';
    inputItem.focus();
    renderList();
});

buttonClear.addEventListener('click', function() {
    shoppingList.length = 0;
    message.textContent = 'A lista foi limpa.';
    renderList();
    inputItem.focus();
});

renderList();