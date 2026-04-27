const buttonAdd = document.querySelector('#button-add');
const tableBody = document.querySelector('#product-list');

let products = [];

buttonAdd.addEventListener('click', () => {
    buttonAdd.disabled = true;

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input id="name" placeholder="Nome"></td>
        <td><input id="amount" type="number" placeholder="Quantidade"></td>
        <td><input id="price" type="number" placeholder="Preço"></td>
        <td>
            <button id="button-confirm">✔</button>
            <button id="button-cancel">X</button>
        </td>
    `;

    const nameInput = tr.querySelector('#name');
    const amountInput = tr.querySelector('#amount');
    const priceInput = tr.querySelector('#price');
    const buttonConfirm = tr.querySelector('#button-confirm');
    const buttonCancel = tr.querySelector('#button-cancel');
    buttonConfirm.addEventListener('click', () => {
        addProduct(nameInput.value, amountInput.value, priceInput.value);
        renderTable();
        buttonAdd.disabled = false;
    });
    buttonCancel.addEventListener('click', () => {
        renderTable();
        buttonAdd.disabled = false;
    });

    tableBody.append(tr);
    nameInput.focus();
});

function addProduct(name, amount, price) {
    const product = { name, amount, price };
    products.push(product);
}

function renderTable() {
    tableBody.innerHTML = '';
    products.forEach((product, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.amount}</td>
            <td>${product.price}</td>
            <td><button id="remove-item">🗑️</button></td>
        `;

        const removeButton = tr.querySelector('#remove-item');
        removeButton.addEventListener('click', () => {
            products.splice(index, 1);
            renderTable();
        });

        tableBody.append(tr);
    });
}