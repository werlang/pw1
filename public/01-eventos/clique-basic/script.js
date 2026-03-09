const buttonPontuacao = document.querySelector('#pontuacao');
const buttonRetira = document.querySelector('#retira');

let pontuacao = 0;

buttonPontuacao.addEventListener('click', () => {
    pontuacao++;
    buttonPontuacao.textContent = 'Pontuação: '+ pontuacao;
});

buttonRetira.addEventListener('click', () => {
    pontuacao = pontuacao - 10;
    if (pontuacao < 0) {
        pontuacao = 0;
    }
    buttonPontuacao.textContent = 'Pontuação: '+ pontuacao;
});