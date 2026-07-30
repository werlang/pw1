# Exercício: Apuração da Gincana

## Objetivo

Consolidar pontuações de várias provas e montar uma classificação que trate empates de forma explícita.

## Estrutura de dados

Use um array associativo em que cada equipe possui um array com as pontuações das provas.

## Requisitos

- somar os pontos de cada equipe;
- aplicar uma penalidade informada nos dados iniciais;
- ordenar o total do maior para o menor preservando o nome das equipes;
- atribuir a mesma colocação a equipes empatadas;
- mostrar a diferença de pontos para a liderança;
- destacar apenas as equipes que atingiram a pontuação mínima de premiação.

## Conceitos trabalhados

Arrays associativos, arrays multidimensionais, agregação, `arsort()`, preservação de chaves e regra de empate.

## Critérios de verificação

- a colocação não pode ser apenas o índice da linha;
- empates devem continuar corretos quando as pontuações mudarem;
- o total consolidado deve ser a única fonte do ranking.
