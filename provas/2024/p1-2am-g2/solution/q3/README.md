# PWI - P1 - Questão 03

Escreva a função `showProblem`, que recebe um objeto do mesmo tipo que os objetos do array `problems` e exibe o problema em uma janela. Para isso, siga as instruções abaixo:

A função deverá inserir no body um código HTML com a seguinte estrutura:

```html
<div id="fog">
    <div class="modal">
        <h1>TÍTULO</h1>
        <div>DESCRIÇÃO</div>
        <div>Entrada:</div>
        <div><div class="square">ENTRADA</div></div>
        <div>Saída:</div>
        <div><div class="square">SAÍDA</div></div>
        <div id="button-container"><button>OK</button></div>
    </div>
</div>
```

Ao clicar no botão _OK_, a janela deverá ser removida da página (removendo o elemento **fog**).

Após implementada a função, use o código da [questão anterior](../q2) e faça com que a janeja com o problema seja exibida ao clicar em um dos problemas da lista.