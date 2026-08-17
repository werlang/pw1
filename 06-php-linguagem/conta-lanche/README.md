# Exercício Introdutório: Conta do Lanche

## Objetivo da atividade

Calcular o total de uma compra simples usando valores definidos no arquivo PHP. O exercício treina uma função pequena: ela recebe os dados, calcula o total e devolve o resultado para a página.

## Conceito central

- função nomeada;
- parâmetros e argumentos;
- `return`;
- variáveis numéricas e multiplicação;
- saída de valores no HTML.

## Dados iniciais

Defina:

- o nome do produto;
- o preço de uma unidade de lanche;
- a quantidade comprada.

Use, por exemplo, produto Sanduíche, preço 7.50 e quantidade 3 na primeira
versão.

## Estrutura mínima

- o arquivo `index.php` com uma implementação de referência;
- uma identificação do produto;
- uma linha com o preço unitário;
- uma linha com a quantidade;
- uma linha com o total.

Não use formulário, array, decisão ou repetição. A única função própria deve ser a função do cálculo.

Leia a implementação, altere o preço ou a quantidade no início do arquivo e
confira como o retorno da função muda o total exibido.

## Regras de funcionamento

- crie uma função `calcularTotal($precoUnitario, $quantidade)`;
- faça a função devolver o total com `return`;
- chame a função e guarde o resultado em uma variável própria;
- mostre o preço, a quantidade e o total;
- não use `echo` dentro da função;
- não escreva o resultado final diretamente como um número fixo no HTML.

## Casos para testar

- use quantidade `1` e confira que o total é o preço unitário;
- use quantidade `4` e confira que o total quadruplica;
- altere o preço e confirme que o total também muda.

## O que observar durante a prática

- o cálculo deve acontecer no PHP;
- `return` entrega um valor para a parte que chamou a função;
- a função calcula, enquanto o HTML apresenta;
- o HTML apenas apresenta os valores calculados;
- separar os dados e o resultado facilita testar a regra.

## Critérios de verificação

- o total está correto para pelo menos três quantidades;
- a função recebe os dois dados por parâmetros;
- a função devolve o resultado com `return`;
- o preço e a quantidade aparecem na página;
- mudar os dados iniciais atualiza o resultado;
- não há cálculo repetido ou número final escrito manualmente.
