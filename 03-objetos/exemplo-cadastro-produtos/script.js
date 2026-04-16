const buttonAdd = document.querySelector('#button-add');
const buttonClear = document.querySelector('#button-clear');
const inputName = document.querySelector('#product-name');
const inputPrice = document.querySelector('#product-price');
const inputAmount = document.querySelector('#product-amount');
const tableList = document.querySelector('#product-list');

let products = [];

buttonClear.addEventListener('click', () => {
    products = [];
    renderTable();
});

buttonAdd.addEventListener('click', () => {
    const product = {
        name: inputName.value,
        price: inputPrice.value,
        amount: inputAmount.value,
    };
    products.push(product);
    renderTable();
    clearInput();
});

function clearInput() {
    inputName.value = '';
    inputAmount.value = '';
    inputPrice.value = '';
    inputName.focus();
}

function renderTable() {
    if (products.length === 0) {
        tableList.innerHTML = 'Nenhum produto cadastrado';
        return;
    }

    const trsArray = products.map(product => {
        const tds = `
            <td>${product.name}</td>
            <td>${product.amount}</td>
            <td>${product.price}</td>
        `;
        const tr = `<tr>${tds}</tr>`;
        return tr;
    });
    tableList.innerHTML = `<tr>
        <th>Nome</th>
        <th>Quantidade</th>
        <th>Preço</th>
    </tr>
    ${trsArray.join('')}
    `;
}
renderTable();
