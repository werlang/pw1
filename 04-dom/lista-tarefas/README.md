# Exercício Prático: Lista de Tarefas com DOM

## Objetivo da Atividade

O objetivo desta prática é manipular uma lista de tarefas no DOM usando um array de objetos como base de dados da aplicação.

## Conceitos trabalhados

- `createElement()`;
- `append()`;
- arrays de objetos;
- `classList`;
- atualização de status visual.

## Especificações Técnicas do Sistema

O sistema deve manter um array de tarefas. Cada tarefa pode ter, por exemplo, `id`, `texto` e `concluida`.

O aplicativo deve permitir:

- adicionar novas tarefas;
- marcar tarefas como concluídas;
- remover tarefas individualmente;
- mostrar quantas tarefas ainda estão pendentes;
- atualizar a mensagem de status da lista.

## Estrutura mínima esperada

- um campo para digitar a tarefa;
- um botão para adicionar;
- uma lista visual para mostrar os itens;
- botões por tarefa para concluir e remover;
- uma área de status com a quantidade pendente.

## Regras de funcionamento

- tarefas vazias não devem ser cadastradas;
- ao adicionar, o sistema deve criar um objeto e inseri-lo no array;
- concluir uma tarefa deve alterar a propriedade correspondente no objeto;
- remover uma tarefa deve retirá-la do array;
- a interface deve ser renderizada novamente a partir do array após cada mudança.

## O que observar durante a prática

- o exercício junta eventos, arrays, objetos e DOM na mesma solução;
- a classe visual de concluída deve refletir o estado real da tarefa;
- quando a lista visual nasce do array, fica mais fácil manter contagem e consistência.