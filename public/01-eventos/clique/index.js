const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');

let score = 0;
let cost = 5;
let production = 1;

b1.addEventListener('click', () => {
    score += production;
    b1.textContent = 'Pontuação: ' + score;
});

b2.addEventListener('click', () => {
    if (score >= cost) {
        score -= cost;
        production += 1;
        cost = parseInt(cost * 1.5);
        b1.textContent = 'Pontuação: ' + score;
        b2.textContent = 'Custo: ' + cost + ' Produção: ' + production;
    }
});