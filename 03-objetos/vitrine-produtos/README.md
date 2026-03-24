# Exercício Prático: Vitrine de Produtos

## Objetivo da Atividade

O objetivo desta prática é usar um array de objetos para representar produtos e gerar uma vitrine visual a partir desses dados.

## Conceitos trabalhados

- array de objetos;
- `push()` com objetos;
- `forEach()`;
- `reduce()` para total e média;
- renderização de cards.

## Especificações Técnicas do Sistema

O sistema deve manter um array principal de produtos, em que cada item tenha pelo menos nome, categoria e preço.

O aplicativo deve permitir:

- cadastrar produtos com nome, categoria e preço;
- adicionar novos objetos ao array principal;
- exibir todos os produtos em formato de card;
- mostrar quantidade total de produtos;
- calcular o preço médio da vitrine;
- identificar o produto mais caro.

## Estrutura mínima esperada

- um formulário para cadastrar produto;
- um botão para inserir o novo produto no array;
- uma área de cards para renderizar os produtos;
- uma área de resumo com quantidade, média e destaque do produto mais caro.

## Regras de funcionamento

- cada cadastro deve virar um objeto antes de entrar no array;
- o preço deve ser tratado como número;
- os cards devem ser recriados ou atualizados com base no array atual;
- o resumo numérico deve ser calculado a partir do array de produtos;
- se não houver produtos cadastrados, a vitrine deve exibir um estado inicial coerente.

## O que observar durante a prática

- cada produto tem várias propriedades, então um objeto faz mais sentido do que um texto isolado;
- um único array pode alimentar tanto os cards quanto os cálculos do resumo;
- esse tipo de estrutura aparece muito em catálogos, lojas e sistemas administrativos.