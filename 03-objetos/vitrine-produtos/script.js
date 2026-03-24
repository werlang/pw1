const inputProductName = document.querySelector('#input-produto');
const inputCategory = document.querySelector('#input-categoria');
const inputPrice = document.querySelector('#input-preco');
const buttonRegisterProduct = document.querySelector('#btn-cadastrar');
const productMessage = document.querySelector('#mensagem');
const productsList = document.querySelector('#lista-produtos');
const productCount = document.querySelector('#quantidade-produtos');
const averagePrice = document.querySelector('#preco-medio');
const mostExpensive = document.querySelector('#produto-caro');

const products = [
    { nome: 'Caderno', categoria: 'Papelaria', preco: 18.9 },
    { nome: 'Caneca', categoria: 'Cozinha', preco: 24.5 }
];

function renderProducts() {
    productsList.innerHTML = '';

    products.forEach(function(product) {
        productsList.innerHTML += `
            <article class="card-produto">
                <h2>${product.nome}</h2>
                <p><strong>Categoria:</strong> ${product.categoria}</p>
                <p><strong>Preço:</strong> R$ ${product.preco.toFixed(2)}</p>
            </article>
        `;
    });

    const totalPrice = products.reduce(function(accumulator, product) {
        return accumulator + product.preco;
    }, 0);

    let expensiveProduct = products[0];

    products.forEach(function(product) {
        if (product.preco > expensiveProduct.preco) {
            expensiveProduct = product;
        }
    });

    productCount.textContent = products.length;
    averagePrice.textContent = `R$ ${(totalPrice / products.length).toFixed(2)}`;
    mostExpensive.textContent = `${expensiveProduct.nome} (R$ ${expensiveProduct.preco.toFixed(2)})`;
}

buttonRegisterProduct.addEventListener('click', function() {
    const price = Number(inputPrice.value);

    if (inputProductName.value.trim() === '' || inputCategory.value.trim() === '' || Number.isNaN(price)) {
        productMessage.textContent = 'Preencha nome, categoria e preço corretamente.';
        return;
    }

    products.push({
        nome: inputProductName.value.trim(),
        categoria: inputCategory.value.trim(),
        preco: price
    });

    productMessage.textContent = 'Produto cadastrado com sucesso.';
    inputProductName.value = '';
    inputCategory.value = '';
    inputPrice.value = '';
    inputProductName.focus();
    renderProducts();
});

renderProducts();