# Exercício Prático: Fila de Atendimento

## Objetivo da Atividade

O objetivo desta prática é representar uma fila de atendimento com array, simulando uma situação parecida com recepção, posto de saúde ou secretaria.

## Conceitos trabalhados

- `push()`;
- `unshift()`;
- `shift()`;
- `length`;
- `join()`;
- renderização da interface a partir de um array.

## Especificações Técnicas do Sistema

O sistema deve trabalhar com um array que representa a fila atual.

O aplicativo deve permitir:

- adicionar uma pessoa no fim da fila;
- adicionar uma pessoa prioritária no início da fila;
- chamar a próxima pessoa, removendo o primeiro item do array;
- informar quantas pessoas ainda aguardam;
- mostrar quem será a próxima pessoa atendida;
- exibir a fila completa na tela, na ordem correta.

## Estrutura mínima esperada

- um campo para digitar o nome da pessoa;
- um botão para atendimento comum;
- um botão para atendimento prioritário;
- um botão para chamar a próxima pessoa;
- uma área com o resumo da fila;
- uma lista ou bloco visual mostrando todos os nomes em espera.

## Regras de funcionamento

- se o campo estiver vazio, o nome não deve ser adicionado;
- o botão de prioridade deve inserir o nome no início do array;
- o botão de chamada deve remover apenas a primeira pessoa da fila;
- quando a fila estiver vazia, o sistema deve informar isso claramente;
- sempre que o array mudar, a interface deve ser atualizada.

## O que observar durante a prática

- fila é um ótimo exemplo para perceber a diferença entre início e fim do array;
- `push()` e `unshift()` adicionam itens, mas em posições diferentes;
- `shift()` combina com situações em que o primeiro item precisa sair;
- a tela deve refletir exatamente o conteúdo atual do array.