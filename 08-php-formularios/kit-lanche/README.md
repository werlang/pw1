# Exercício: Montador de Kit de Lanche

## Objetivo

Processar quantidades relacionadas por nome de campo e produzir um orçamento detalhado.

## Dados

Defina um catálogo PHP com código, nome, preço e limite por pessoa.

## Requisitos

- gerar os campos numéricos a partir do catálogo;
- enviar quantidades como um array associativo em `itens[codigo]`;
- rejeitar valores negativos, fracionários ou acima do limite;
- ignorar itens com quantidade zero sem tratá-los como ausentes;
- calcular subtotais e total geral;
- reapresentar o orçamento como uma tabela com somente os itens escolhidos.

## Conceitos trabalhados

POST com campos em array, conversão numérica, validação por item, arrays associativos e cálculo de totais.

## Critérios de verificação

- o preço nunca pode vir do navegador;
- um erro em um item deve identificar qual produto está incorreto;
- alterar o catálogo PHP deve atualizar formulário e cálculo.
