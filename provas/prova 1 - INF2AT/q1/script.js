const nomes = [
    'pablo',
    'fabio',
    'joao',
    'guilherme',
    'vinícius',
    'andre',
    'rodolfo',
    'felipe',
    'roberto',
    'sergio',
];

const input = document.querySelector('input');
input.addEventListener('input', () => {
    let texto = '';
    for (let i in nomes) {
        if (nomes[i].indexOf(input.value) != -1) {
            texto += `<div>${nomes[i]}</div>`;
        }
    }
    document.querySelector('#result').innerHTML = texto;
})