# Exercício Introdutório: Conta do Lanche

## Objetivo da atividade

Uma cantina precisa mostrar quanto uma pessoa vai pagar por vários lanches
iguais. Você vai montar essa pequena conta com PHP e separar o cálculo da
apresentação da página.

O cálculo ficará em uma função: ela recebe o preço de uma unidade e a
quantidade comprada, calcula o total e devolve esse valor para o restante do
programa.

## Conceito central

Pratique uma função nomeada com parâmetros e argumentos, o comando `return`,
variáveis numéricas, multiplicação e a exibição do resultado no HTML.

## Dados iniciais

Crie variáveis para o nome do produto, o preço de uma unidade e a quantidade
comprada. Na primeira versão, use:

- produto: Sanduíche;
- preço unitário: `7.50`;
- quantidade: `3`.

## O que você deve construir

Crie um arquivo `index.php` que mostre o produto, o preço unitário, a
quantidade e o total da compra. A única função própria do arquivo deve ser a
função responsável pelo cálculo. Não use formulário, array, decisão nem
repetição.

## Solução completa

A resposta completa está em [index.php](./index.php). Tente resolver o
enunciado antes de consultá-la. Depois, compare sua solução com esse arquivo.

## Regras de funcionamento

- crie `calcularTotal($precoUnitario, $quantidade)`;
- passe o preço e a quantidade por parâmetros;
- devolva o total usando `return` e guarde o resultado em uma variável;
- mostre o preço, a quantidade e o total na página;
- deixe a função cuidar apenas do cálculo: não use `echo` dentro dela;
- não escreva o total final como um número fixo no HTML.

## Casos para testar

- use quantidade `1` e confira se o total é igual ao preço unitário;
- use quantidade `4` e confira se o total corresponde a quatro unidades;
- altere o preço e observe se o total também é atualizado.

## O que observar durante a prática

O PHP calcula o valor antes de montar a página. O `return` entrega o resultado
para o trecho que chamou a função; depois, o HTML apenas apresenta os valores.
Manter essas duas responsabilidades separadas facilita testar a regra e
encontrar erros.

## Critérios de verificação

- o total está correto para pelo menos três quantidades;
- a função recebe preço e quantidade por parâmetros;
- a função devolve o resultado com `return`;
- o preço e a quantidade aparecem na página;
- mudar os dados iniciais atualiza o resultado;
- não há cálculo repetido nem número final escrito manualmente.
