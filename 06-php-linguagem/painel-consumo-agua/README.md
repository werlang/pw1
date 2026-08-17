# Exercício: Painel de Consumo de Água

## Objetivo

Uma escola quer acompanhar o consumo de água de uma casa estudantil. As
leituras do hidrômetro são números brutos; sua tarefa é transformá-las em um
painel que mostre o consumo total, as médias e uma orientação fácil de
entender.

Os dados ficarão no próprio arquivo PHP. Organize os cálculos em funções
pequenas e use o HTML apenas para apresentar os resultados. Não use arrays nem
formulários.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css).
Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução
com esses arquivos.

## Dados iniciais

Crie variáveis para a quantidade de moradores, a leitura anterior, a leitura
atual do hidrômetro e a quantidade de dias do período. Comece com 4 moradores,
leitura anterior `12000`, leitura atual `15000` e `30` dias.

O consumo total é a leitura atual menos a leitura anterior. Para chegar à
média diária, divida esse total pelos dias; para chegar à média por morador,
divida a média diária pela quantidade de moradores.

Use estas faixas para classificar o consumo por morador e por dia: até `120`
litros é econômico; acima de `120` e até `200` é adequado; acima de `200` é
alto.

## O que você deve construir

Crie um relatório com cartões HTML para os valores calculados e destaque
visualmente a classificação. Mostre também uma recomendação diferente para
cada faixa de consumo.

Para manter o programa seguro, quando a quantidade de dias ou de moradores
for menor que `1`, não faça a divisão correspondente: use `0` como resultado.

Crie funções para os cálculos e para a classificação. As funções devem
devolver valores; elas não devem montar as tags HTML do relatório.

## Conceitos trabalhados

Variáveis numéricas, parâmetros, `return`, operadores aritméticos,
`if`/`elseif`/`else`, formatação de números e PHP misturado ao HTML.

## Critérios de verificação

- alterar somente os valores iniciais atualiza todo o painel;
- a classificação depende do valor calculado, não de um texto fixo;
- nenhum cálculo é repetido manualmente no HTML;
- as funções de cálculo não montam o relatório HTML;
- o arquivo separado [style.css](./style.css) concentra a aparência do painel.

Com os dados de referência, o painel deve mostrar 3000 litros no período, 100
litros por dia, 25 litros por morador/dia e a classificação econômica. Para
testar as outras faixas, mantenha os demais valores e use leitura atual
`30000` para obter a faixa adequada e `42000` para obter a faixa alta.
