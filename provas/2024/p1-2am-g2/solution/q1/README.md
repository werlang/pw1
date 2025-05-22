# PWI - P1 - Questão 01

Dado os arquivos que compõe a questão, faça com que ao clicar no botão _Cadastrar problema_ na página `index.html`, insira os dados dos campos `Título`, `Descrição` e `Entrada` e `Saída` em um array de objetos, onde cada objeto representa um problema. O array deverá possuir a seguinte estrutura:

```json
[
    {
        "title": "Título do problema",
        "description": "Descrição do problema",
        "input": "Entrada do problema",
        "output": "Saída do problema"
    }
]
```

Exemplo:

```json
[
    {
        "title": "Soma Simples",
        "description": "Leia dois valores inteiros, no caso para cada valor informado o programa deverá imprimir a soma dos dois valores.",
        "input": "1 2",
        "output": "SOMA = 3"
    },
    {
        "title": "Média 1",
        "description": "Leia N, que indica a quantidade de números que serão lidos, em seguida leia os N valores e calcule a média, com 1 casa decimal.",
        "input": "4 10 25 30 20",
        "output": "21.2"
    }
]
```

Depois de cadastro, **os _inputs_ devem ser limpos** e uma mensagem de sucesso deve ser exibida no documento, dentro do `div#message`, conforme exemplo abaixo:

```html
Problema <span id="problem-name">Soma Simples</span> cadastrado com sucesso!
```

Mostre também o array de objetos no console do navegador.
