# Exercício: Editor de Roteiro do Ônibus

## Objetivo

Aplicar operações de inserção, remoção e reorganização sobre uma sequência em que a ordem possui significado.

## Estrutura de dados

Comece com um array indexado de paradas e um conjunto fixo de alterações solicitadas pela coordenação.

## Requisitos

- inserir uma parada no início e outra em uma posição intermediária;
- remover uma parada cancelada pelo nome;
- eliminar nomes duplicados e reorganizar os índices;
- mostrar a parada anterior e a próxima de cada ponto intermediário;
- calcular o total de trechos do roteiro;
- gerar uma lista numerada com a versão original e a versão revisada.

## Conceitos trabalhados

Arrays indexados, `array_search()`, `array_splice()`, `array_unique()`, `array_values()` e acesso por índice.

## Critérios de verificação

- as alterações devem ser feitas sobre o array, não somente na impressão;
- a busca na posição `0` deve funcionar corretamente;
- os vizinhos de cada parada devem refletir a ordem revisada.
