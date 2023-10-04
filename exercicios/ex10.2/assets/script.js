const category = document.querySelector('#category');
const table = document.querySelector('#productList');
const input = document.querySelector('#productName');

fetch('api/categories-list.php')
.then(res => res.json()).then(data => {
    // console.log(data);
    category.innerHTML = '<option value="0">Todos</option>';
    data.forEach(item => {
        category.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    });

    changeCategory();
});

function insertTable(products) {
    table.innerHTML = '';
    products.forEach(item => {
        table.innerHTML += `<tr>
            <td>${ item.id }</td>
            <td>${ item.name }</td>
            <td>R$ ${ item.price.toFixed(2) }</td>
        </tr>`;
    });
}

async function changeCategory() {
    const id = category.value;
    const data = await fetch(`api/products-by-category.php?id=${ id }`)
    .then(res => res.json());
    // console.log(data);
    insertTable(data);
}

category.addEventListener('change', changeCategory);

input.addEventListener('input', async () => {
    const text = input.value;
    const data = await fetch(`api/products-by-name.php?name=${ text }`)
    .then(res => res.json());
    // console.log(data);
    insertTable(data);
});