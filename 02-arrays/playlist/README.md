# Exercício Prático: Playlist com Arrays

## Objetivo da Atividade

O objetivo desta prática é controlar a ordem de uma playlist usando array, trabalhando inclusão no início, inclusão no fim e remoção de um item específico.

## Conceitos trabalhados

- `push()`;
- `unshift()`;
- `indexOf()`;
- `splice()`;
- acesso ao primeiro e ao último item;
- renderização de lista e texto.

## Especificações Técnicas do Sistema

O sistema deve manter uma playlist em array e atualizar a interface sempre que a ordem das músicas mudar.

O aplicativo deve permitir:

- adicionar uma música ao fim da playlist;
- adicionar uma música ao início da playlist;
- remover uma música pelo nome digitado;
- mostrar qual é a primeira música da lista;
- mostrar qual é a última música da lista;
- exibir a playlist completa na tela.

## Estrutura mínima esperada

- um campo para digitar o nome da música;
- um botão para adicionar no fim;
- um botão para adicionar no início;
- um botão para remover pelo nome;
- uma área de resumo mostrando primeira e última música;
- uma lista com a ordem atual da playlist.

## Regras de funcionamento

- nomes vazios não devem entrar na playlist;
- a remoção deve procurar a música no array antes de usar `splice()`;
- se a música não existir, o sistema deve informar isso ao usuário;
- a interface deve ser redesenhada a partir do array após cada ação;
- se a playlist estiver vazia, a tela deve deixar isso claro.

## O que observar durante a prática

- `indexOf()` ajuda a localizar a posição exata de um item;
- `splice()` altera o array original, então a ordem realmente muda;
- início e fim do array representam papéis diferentes em listas ordenadas.