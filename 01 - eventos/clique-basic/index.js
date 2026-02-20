const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');

let score = 0;

b1.addEventListener('click', () => {
    score += 1;
    b1.textContent = 'Pontuação: ' + score;
}); 

b2.addEventListener('click', () => {
    score -= 10;
    if (score < 0) {
        score = 0;
    }
    b1.textContent = 'Pontuação: ' + score;
});