const buttonProduzir = document.querySelector('#produzir');
const buttonUpgrade = document.querySelector('#upgrade');

const messagePontuacao = document.querySelector('#mostra-pontuacao');
const messageCusto = document.querySelector('#mostra-custo');
const messageProducao = document.querySelector('#mostra-producao');

let pontuacao = 0;
let producao = 1;
let custo = 10;

buttonProduzir.addEventListener('click', () => {
    pontuacao += producao;
    messagePontuacao.textContent = 'Pontuação: '+ pontuacao;
});

buttonUpgrade.addEventListener('click', () => {
    if (pontuacao > custo) {
        pontuacao = pontuacao - custo;
        producao++;
        custo = custo * 1.2;

        messagePontuacao.textContent = 'Pontuação: '+ pontuacao;
        messageCusto.textContent = 'Custo: '+ custo;
        messageProducao.textContent = 'Produção: '+ producao;
    }
});