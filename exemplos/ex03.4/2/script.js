const buttonSave = document.querySelector('#save-button');
const buttonLowPrice = document.querySelector('#low-price-button');
const inputStore = document.querySelector('#store-name');
const inputPrice = document.querySelector('#product-price');
const spanSave = document.querySelector('#message-save');
const spanLowPrice = document.querySelector('#message-low-price');


const storeArray = [];
const priceArray = [];

buttonSave.addEventListener('click', () => {
    // console.log(inputPrice.value, inputStore.value);

    storeArray.push(inputStore.value);
    priceArray.push(inputPrice.value);

    spanSave.innerHTML = `A loja <span class="text-bold">${inputStore.value}</span> foi cadastrada com sucesso.`;

    inputStore.value = '';
    inputPrice.value = '';
});

buttonLowPrice.addEventListener('click', () => {
    // console.log(storeArray, priceArray);

    let lowPrice = null;
    let lowStore = '';

    for (let i in priceArray) {
        const value = Number(priceArray[i]);
        
        if (lowPrice == null || value < lowPrice) {
            lowPrice = value;
            lowStore = storeArray[i];
        }
    }

    // console.log(lowPrice, lowStore);
    spanLowPrice.innerHTML = `O produto custa <span class="text-bold">${lowPrice}</span> na loja <span class="text-bold">${lowStore}</span>`;
});