const buttonSave = document.querySelector('#save-button');
const buttonShow = document.querySelector('#show-button');
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const message = document.querySelector('#message');
const result = document.querySelector('#result');

const productArray = [];
const priceArray = [];

buttonSave.addEventListener('click', () => {
    // console.log(productName.value, productPrice.value);

    productArray.push(productName.value);
    priceArray.push(productPrice.value);

    message.innerHTML = `Produto <span class="destaque">${productName.value}</span> cadastrado com sucesso.`;

    productName.value = '';
    productPrice.value = '';
});

buttonShow.addEventListener('click', () => {
    let menorPreco = null;
    let produtoMaisbarato = '';

    for (let indice in priceArray) {
        let valor = priceArray[indice];
        valor = Number(valor);
        if (menorPreco == null || valor < menorPreco) {
            menorPreco = valor;
            produtoMaisbarato = productArray[indice];
        }
    };

    // console.log('Final:', produtoMaisbarato, menorPreco);
    result.innerHTML = `Produto mais barato: <span class="destaque">${produtoMaisbarato}</span>. Valor: <span class="destaque">${menorPreco}</span>`;
});

