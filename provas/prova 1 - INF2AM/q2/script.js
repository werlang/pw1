const cria = document.querySelector('#cria');
const remove = document.querySelector('#remove');
const texto = document.querySelector('#texto');
const container = document.querySelector('#box-container');

cria.addEventListener('click', () => {
    const value = parseInt(texto.value);
    let box = '<div class="box"></div>';
    if (value >= 1 && value <= 9) {
        box = `<div class="box">${value}</div>`;
    }
    container.insertAdjacentHTML('beforeend', box);
});

remove.addEventListener('click', () => {
    document.querySelector('.box').remove();
});