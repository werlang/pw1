# Exercício: Painel de Consumo de Água

## Objetivo

Produzir um relatório HTML a partir de valores definidos no próprio arquivo PHP. O desafio é transformar medidas brutas em indicadores compreensíveis, sem usar arrays ou formulários, e organizar os cálculos em funções pequenas.

## Dados iniciais

Defina variáveis para quantidade de moradores, leitura anterior e leitura atual do hidrômetro e número de dias do período.

## Requisitos

- calcular o consumo total e o consumo médio diário;
- calcular o consumo médio por morador;
- classificar o consumo por morador como econômico, adequado ou alto;
- criar funções para os cálculos e para a classificação;
- impedir divisões inválidas quando moradores ou dias forem menores que `1`;
- mostrar os valores em cartões HTML e destacar visualmente a classificação;
- exibir uma recomendação diferente para cada faixa.

## Conceitos trabalhados

Variáveis numéricas, parâmetros, `return`, operadores aritméticos, `if`/`elseif`/`else`, formatação de números e PHP misturado ao HTML.

## Critérios de verificação

- alterar somente os valores iniciais deve atualizar todo o painel;
- a classificação deve depender do valor calculado, não de um texto fixo;
- nenhum cálculo pode ser repetido manualmente no HTML;
- a função de cálculo não deve montar as tags HTML do relatório.
