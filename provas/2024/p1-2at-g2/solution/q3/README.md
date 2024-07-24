# PWI - P1 - Questão 03

Escreva a função `showEvent`, que recebe um objeto do mesmo tipo que os objetos do array `events` e exibe o Evento em uma janela. Para isso, siga as instruções abaixo:

A função deverá inserir no body um código HTML com a seguinte estrutura:

```html
<div id="fog">
    <div class="modal">
        <h1>NOME DO EVENTO</h1>
        <h2>Onde?</h2>
        <div>LOCALIZAÇÃO DO EVENTO</div>
        <h2>Quando?</h2>
        <div><span class="date-time">01/01/2001</span> às <span class="date-time">00:00</span></div>
        <div id="button-container"><button>OK</button></div>
    </div>
</div>
```

Ao clicar no botão _OK_, a janela deverá ser removida da página (removendo o elemento **fog**).

Após implementada a função, use o código da [questão anterior](../q2) e faça com que a janeja com o Evento seja exibida ao clicar em um dos eventos da lista.