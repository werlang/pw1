const categorySelect = document.querySelector('#category');
const productList = document.querySelector('#productList');
const productName = document.querySelector('#productName');

fetch('categories.php').then(res => res.json().then(data => {
    // console.log(data);

    categorySelect.innerHTML = '<option value="0">Todos</option>';
    data.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.innerHTML = category.name;
        categorySelect.appendChild(option);
    });

    categorySelect.addEventListener('change', changeCategory);
    changeCategory();
}));

async function changeCategory() {
    const id = categorySelect.value;
    const url = `products.php?id=${ id }`;
    const data = await fetch(url).then(res => res.json());
    // console.log(data);
    
    fillTable(data.products);
}

productName.addEventListener('input', async () => {
    const name = productName.value;
    const url = `products.php?name=${ name }`;
    const data = await fetch(url).then(res => res.json());
    // console.log(data);

    fillTable(data.products);
});

function fillTable(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ product.id }</td>
            <td>${ product.name }</td>
            <td>${ product.price }</td>
        `;
        productList.appendChild(row);
    });
}