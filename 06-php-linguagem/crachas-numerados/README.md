# Exercício: Lote de Crachás Numerados

## Objetivo

Um evento da escola precisa de um lote de crachás numerados. Além do código,
cada crachá deve receber marcas visuais calculadas a partir do número do
participante.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css).
Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução
com esses arquivos.

## Dados iniciais

Crie variáveis para o primeiro número, o último número e o prefixo textual do
código. Comece com primeiro número `1`, último número `12` e prefixo `PW1`.

## O que você deve construir

Gere todos os crachás com um laço. Os códigos devem ter três algarismos, como
`PW1-001`, `PW1-002` e assim por diante.

Durante a geração:

- marque os múltiplos de `5` como responsáveis de grupo; na configuração
  inicial, são os números 5 e 10;
- aplique uma classe de cor aos números pares e outra aos números ímpares;
- conte quantos crachás comuns e quantos de responsável foram produzidos;
- mostre um resumo depois do lote.

## Conceitos trabalhados

Concatenação de strings ou interpolação, `str_pad()`, `for`, operador `%`,
contadores e HTML repetitivo.

## Critérios de verificação

- os códigos continuam corretos quando o intervalo muda;
- a contagem final é calculada durante a geração;
- a classe visual vem da regra do número, não de posições escritas
  manualmente.

Com os dados de referência, devem ser gerados 10 crachás comuns e 2 de
responsável.
