# Exercício Prático: Galeria de Cards

## Objetivo da Atividade

O objetivo desta prática é criar uma galeria dinâmica em que cada card nasce de um objeto armazenado em um array e depois é renderizado no DOM.

## Conceitos trabalhados

- `createElement()`;
- `append()`;
- arrays de objetos;
- `textContent`;
- renderização a partir de dados.

## Especificações Técnicas do Sistema

O sistema deve manter um array de cards. Cada card pode ter, por exemplo, `id`, `titulo` e `descricao`.

O aplicativo deve permitir:

- informar título e descrição de um card;
- criar um novo objeto a cada cadastro;
- inserir esse objeto no array principal;
- renderizar os cards da galeria com base nesse array;
- remover cards individualmente;
- mostrar quantos cards existem na tela.

## Estrutura mínima esperada

- um campo para título;
- um campo ou `textarea` para descrição;
- um botão para criar card;
- uma área de galeria para exibir os cards;
- um contador de cards cadastrados.

## Regras de funcionamento

- campos vazios não devem gerar novos cards;
- cada card deve ser criado como objeto antes de ser exibido;
- remover um card deve retirá-lo do array e depois atualizar a interface;
- o contador deve refletir a quantidade atual de objetos cadastrados;
- a galeria deve ser montada novamente a partir do array após cada alteração.

## O que observar durante a prática

- aqui o conteúdo de arrays e objetos aparece junto com DOM;
- criar elementos é importante, mas organizar o estado antes disso é melhor;
- a interface cresce de forma previsível quando a renderização depende do array.