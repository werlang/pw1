const doces = {
    bala: 0,
    chocolate: 0,
    pacoca: 0,
    torta: 0,
};

const bala = document.querySelector('#bala');
bala.addEventListener('click', () => {
    doces.bala++;
    atualiza();
});

const chocolate = document.querySelector('#chocolate');
chocolate.addEventListener('click', () => {
    doces.chocolate++;
    atualiza();
});

const pacoca = document.querySelector('#pacoca');
pacoca.addEventListener('click', () => {
    doces.pacoca++;
    atualiza();
});

const torta = document.querySelector('#torta');
torta.addEventListener('click', () => {
    doces.torta++;
    atualiza();
});

function atualiza() {
    let lista = '';
    for (let i in doces) {
        lista += `<div><span>${i}</span>: <span>${doces[i]}</span></div>`;
    }
    document.querySelector('#result').innerHTML = lista;
}