const doces = {
    bala: 0,
    chocolate: 0,
    pacoca: 0,
    torta: 0,
};

document.querySelector('#bala').addEventListener('click', () => compra('bala'));
document.querySelector('#chocolate').addEventListener('click', () => compra('chocolate'));
document.querySelector('#pacoca').addEventListener('click', () => compra('pacoca'));
document.querySelector('#torta').addEventListener('click', () => compra('torta'));

function compra(doce) {
    doces[doce]++;

    let lista = '';
    for (let i in doces) {
        lista += `<div><span>${i}</span>: <span>${doces[i]}</span></div>`;
    }
    document.querySelector('#result').innerHTML = lista;
}