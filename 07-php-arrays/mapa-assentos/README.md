# Exercício: Mapa de Assentos da Mostra

## Objetivo

Representar uma sala como uma matriz e transformá-la em uma grade HTML. O desafio central é trabalhar com posição, e não com uma lista linear de cadastros.

## Estrutura de dados

Use um array de fileiras. Cada fileira deve conter assentos com os estados `livre`, `ocupado` ou `reservado`.

## Requisitos

- percorrer a matriz com `foreach` aninhado;
- mostrar a identificação de cada lugar, como `B-4`;
- aplicar uma classe visual para cada estado;
- contar lugares livres, ocupados e reservados;
- encontrar a primeira posição livre;
- alertar quando uma fileira inteira não possuir lugar livre.

## Conceitos trabalhados

Arrays multidimensionais, chaves e valores, laços aninhados, contagem e busca com interrupção.

## Critérios de verificação

- a grade deve ser gerada somente a partir do array;
- acrescentar uma fileira ao array deve acrescentá-la à tela sem novo HTML manual;
- o resumo deve conferir com os estados visíveis.
