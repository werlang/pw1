# Exercício: Catálogo de Merenda

## Objetivo

Cruzar propriedades de alimentos para montar combinações que atendam a restrições nutricionais e de estoque.

## Estrutura de dados

Represente cada alimento com nome, grupo, quantidade disponível, presença de lactose e custo por porção.

## Requisitos

- descartar itens sem estoque;
- separar os alimentos por grupo;
- listar opções sem lactose;
- calcular o custo de uma combinação com um item de cada grupo obrigatório;
- indicar quais grupos não possuem opção disponível;
- produzir, além do HTML, uma representação JSON da lista filtrada.

## Conceitos trabalhados

Arrays de objetos associativos, filtro, agrupamento por chave, soma, validação de cobertura e `json_encode()`.

## Critérios de verificação

- a seleção deve depender simultaneamente de grupo, estoque e restrição;
- o aviso de grupo ausente deve vir dos dados;
- HTML e JSON devem representar a mesma lista resultante.
