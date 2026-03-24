# Exercício Prático: Busca de Nomes com Arrays

## Objetivo da Atividade

O objetivo desta prática é mostrar que arrays não servem apenas para guardar dados. Eles também permitem buscar, filtrar e localizar informações a partir do que o usuário digita.

## Conceitos trabalhados

- `filter()`;
- `includes()`;
- `indexOf()`;
- `toLowerCase()` para comparação;
- renderização de resultados filtrados.

## Especificacoes Tecnicas do Sistema

O aplicativo deve conter um array inicial com vários nomes e oferecer dois comportamentos:

- busca parcial enquanto o usuario digita;
- verificação exata da posição de um nome no array.

Requisitos principais:

- ao digitar no campo de busca, a lista exibida deve ser filtrada;
- a comparação deve ignorar maiúsculas e minúsculas;
- se nenhum resultado for encontrado, a tela deve informar isso;
- um botão deve verificar se o nome digitado existe exatamente no array;
- se existir, a interface deve mostrar o índice correspondente;
- se não existir, a interface deve mostrar que o nome não foi encontrado.

## O que observar durante a prática

- `filter()` gera um novo array com os itens aprovados na condição;
- `includes()` ajuda na busca parcial;
- `indexOf()` é mais adequado quando queremos descobrir a posição do item.