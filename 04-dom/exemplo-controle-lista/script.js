import { showToast } from "./toast.js";

const buttonAdd = document.querySelector('#button-add');
const tableBody = document.querySelector('#product-list');

let products = [];

buttonAdd.addEventListener('click', () => {
    buttonAdd.disabled = true;

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td></td>
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
        showToast('Produto inserido com sucesso', 'success');
    });
    buttonCancel.addEventListener('click', () => {
        renderTable();
        buttonAdd.disabled = false;
        showToast('Operação Cancelada');
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
            <td><input class="select-item" type="checkbox"></td>
            <td>${product.name}</td>
            <td>${product.amount}</td>
            <td>${product.price}</td>
            <td><button id="remove-item">🗑️</button></td>
        `;

        const removeButton = tr.querySelector('#remove-item');
        removeButton.addEventListener('click', () => {
            products.splice(index, 1);
            renderTable();
            showToast(`Produto <strong>${product.name}</strong> removido`, 'success');
        });

        const selectItem = tr.querySelector('.select-item');
        selectItem.addEventListener('change', () => {
            if (selectItem.checked) {
                tr.classList.add('selected');
            }
            else {
                tr.classList.remove('selected');
            }

        });

        tableBody.append(tr);
    });
}

const selectAll = document.querySelector('th .select-item');
selectAll.addEventListener('change', () => {
    const allRows = document.querySelectorAll('tr');
    allRows.forEach((row, i) => {
        if (i === 0) {
            return;
        }

        const checkbox = row.querySelector('.select-item');
        checkbox.checked = selectAll.checked;
    })
});