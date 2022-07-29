const cria = document.querySelector('#cria');
const remove = document.querySelector('#remove');
const texto = document.querySelector('#texto');

cria.addEventListener('click', () => {
    let n = parseInt(texto.value);
    console.log(n)
    if (!n || n < 1 || n > 9) {
        n = '';
    }

    document.querySelector('#box-container').insertAdjacentHTML('beforeend', `<div class="box">${n}</div>`);
});

remove.addEventListener('click', () => {
    document.body.querySelector('.box').remove();
});